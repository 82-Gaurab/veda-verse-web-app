/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";

import Page from "@/app/admin/messages/page";
import DisplayMessageTable from "@/app/admin/messages/_components/DisplayMessageTable";
import {
  handleGetAllMessages,
  handleDeleteMessage,
} from "@/lib/action/admin/message-action";

// ---------------- MOCKS ----------------

// next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// next/link
jest.mock("next/link", () => {
  return ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

// toast
jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

// actions
jest.mock("@/lib/action/admin/message-action", () => ({
  handleGetAllMessages: jest.fn(),
  handleDeleteMessage: jest.fn(),
}));

// DeleteModal
jest.mock("@/app/(public)/_component/DeleteModal", () => {
  return ({ isOpen, onConfirm }: any) =>
    isOpen ? (
      <div>
        <button onClick={onConfirm}>Confirm</button>
      </div>
    ) : null;
});

// MessageModal
jest.mock("@/app/admin/messages/_components/MessageModel", () => {
  return ({ isOpen }: any) => (isOpen ? <div>MessageModal</div> : null);
});

// UpdateMessageModal
jest.mock("@/app/admin/messages/_components/UpdateMessage", () => {
  return ({ isOpen }: any) => (isOpen ? <div>UpdateMessageModal</div> : null);
});

// ---------------- ROUTER MOCK ----------------

const mockPush = jest.fn();
const mockRefresh = jest.fn();
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
mockUseRouter.mockReturnValue({
  push: mockPush,
  refresh: mockRefresh,
  replace: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
} as any);

// ---------------- MOCK DATA ----------------

const mockMessages = [
  {
    _id: "msg1",
    username: "John Doe",
    userEmail: "john@example.com",
    message: "Hello world!",
    isTestimonial: true,
  },
  {
    _id: "msg2",
    username: "Jane Smith",
    userEmail: "jane@example.com",
    message: "Test message",
    isTestimonial: false,
  },
];

const mockPagination = {
  page: 1,
  size: 5,
  totalPages: 2,
  total: 10,
};

const createMockResponse = (
  success: boolean,
  data: any,
  pagination?: any,
  message = "",
) => ({
  success,
  data,
  pagination,
  message,
});

// ============================================================
// ====================== PAGE TESTS ==========================
// ============================================================

describe("Admin Messages Page", () => {
  beforeEach(() => jest.clearAllMocks());

  it("renders messages table when API succeeds", async () => {
    (handleGetAllMessages as jest.Mock).mockResolvedValue(
      createMockResponse(true, mockMessages, mockPagination),
    );

    const PageComponent = await Page({ searchParams: Promise.resolve({}) });
    render(PageComponent);

    await waitFor(() => {
      expect(screen.getByText("Hello world!")).toBeInTheDocument();
      expect(screen.getByText("Test message")).toBeInTheDocument();
    });
  });

  it("calls API with search params", async () => {
    (handleGetAllMessages as jest.Mock).mockResolvedValue(
      createMockResponse(true, mockMessages, mockPagination),
    );

    const searchParams = Promise.resolve({
      page: "2",
      size: "10",
      search: "John",
    });
    const PageComponent = await Page({ searchParams });
    render(PageComponent);

    await waitFor(() => {
      expect(handleGetAllMessages).toHaveBeenCalledWith("2", "10", "John");
    });
  });

  it("throws error when API fails", async () => {
    (handleGetAllMessages as jest.Mock).mockResolvedValue(
      createMockResponse(false, null, null, "Failed"),
    );

    await expect(Page({ searchParams: Promise.resolve({}) })).rejects.toThrow(
      "Failed",
    );
  });
});

// ============================================================
// ================= DISPLAY TABLE TESTS ======================
// ============================================================

describe("DisplayMessageTable Component", () => {
  beforeEach(() => jest.clearAllMocks());

  it("renders message rows", () => {
    render(
      <DisplayMessageTable
        messages={mockMessages}
        pagination={mockPagination}
        search=""
      />,
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Hello world!")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();

    const viewButtons = screen.getAllByText("View");
    const editButtons = screen.getAllByText("Edit");
    const deleteButtons = screen.getAllByText("Delete");

    expect(viewButtons).toHaveLength(2);
    expect(editButtons).toHaveLength(2);
    expect(deleteButtons).toHaveLength(2);
  });

  // ---------------- Search ----------------
  it("triggers search on Enter key", () => {
    render(
      <DisplayMessageTable
        messages={mockMessages}
        pagination={mockPagination}
        search=""
      />,
    );
    const input = screen.getByPlaceholderText("Search messages...");
    fireEvent.change(input, { target: { value: "Hello" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockPush).toHaveBeenCalledWith(
      "/admin/messages?page=1&size=5&search=Hello",
    );
  });

  it("triggers search on button click", () => {
    render(
      <DisplayMessageTable
        messages={mockMessages}
        pagination={mockPagination}
        search=""
      />,
    );
    const input = screen.getByPlaceholderText("Search messages...");
    fireEvent.change(input, { target: { value: "Hello" } });
    fireEvent.click(screen.getByText(/search/i));

    expect(mockPush).toHaveBeenCalledWith(
      "/admin/messages?page=1&size=5&search=Hello",
    );
  });

  // ---------------- Page size ----------------
  it("changes page size", () => {
    render(
      <DisplayMessageTable
        messages={mockMessages}
        pagination={mockPagination}
        search=""
      />,
    );
    const select = screen.getByLabelText("Rows per page:");
    fireEvent.change(select, { target: { value: "10" } });

    expect(mockPush).toHaveBeenCalledWith("/admin/messages?page=1&size=10");
  });

  // ---------------- Pagination ----------------
  it("renders pagination correctly", () => {
    render(
      <DisplayMessageTable
        messages={mockMessages}
        pagination={mockPagination}
        search=""
      />,
    );
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  // ---------------- Delete ----------------
  it("calls delete and refreshes on success", async () => {
    (handleDeleteMessage as jest.Mock).mockResolvedValue({});
    render(
      <DisplayMessageTable
        messages={mockMessages}
        pagination={mockPagination}
        search=""
      />,
    );
    fireEvent.click(screen.getAllByText("Delete")[0]);
    fireEvent.click(screen.getByText("Confirm"));

    await waitFor(() => {
      expect(handleDeleteMessage).toHaveBeenCalledWith("msg1");
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  it("shows error toast on delete failure", async () => {
    (handleDeleteMessage as jest.Mock).mockRejectedValue(
      new Error("Failed delete"),
    );
    render(
      <DisplayMessageTable
        messages={mockMessages}
        pagination={mockPagination}
        search=""
      />,
    );
    fireEvent.click(screen.getAllByText("Delete")[0]);
    fireEvent.click(screen.getByText("Confirm"));

    await waitFor(() => {
      expect(handleDeleteMessage).toHaveBeenCalled();
    });
  });

  // ---------------- Modals ----------------
  it("opens view modal", () => {
    render(
      <DisplayMessageTable
        messages={mockMessages}
        pagination={mockPagination}
        search=""
      />,
    );
    fireEvent.click(screen.getAllByText("View")[0]);
    expect(screen.getByText("MessageModal")).toBeInTheDocument();
  });

  it("opens edit modal", () => {
    render(
      <DisplayMessageTable
        messages={mockMessages}
        pagination={mockPagination}
        search=""
      />,
    );
    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(screen.getByText("UpdateMessageModal")).toBeInTheDocument();
  });

  // ---------------- Empty state ----------------
  it("renders empty table correctly", () => {
    render(
      <DisplayMessageTable
        messages={[]}
        pagination={{ ...mockPagination, totalPages: 1, total: 0 }}
        search=""
      />,
    );
    expect(screen.getByText("Page 1 of 1")).toBeInTheDocument();
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
  });
});
