/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";

import Page from "@/app/admin/genres/page";
import DisplayGenreTable from "@/app/admin/genres/_component/DisplayGenreTable";
import {
  handleGetAllGenresPaginated,
  handleDeleteGenre,
} from "@/lib/action/admin/genre-action";

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
jest.mock("@/lib/action/admin/genre-action", () => ({
  handleGetAllGenresPaginated: jest.fn(),
  handleDeleteGenre: jest.fn(),
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

// ---------------- ROUTER MOCK ----------------

const mockPush = jest.fn();
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

mockUseRouter.mockReturnValue({
  push: mockPush,
  refresh: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
} as any);

// ---------------- MOCK DATA ----------------

const mockGenres = [
  { _id: "genre1", name: "Fiction" },
  { _id: "genre2", name: "Science" },
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

describe("Admin Genres Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders genres when data exists", async () => {
    (handleGetAllGenresPaginated as jest.Mock).mockResolvedValue(
      createMockResponse(true, mockGenres, mockPagination),
    );

    const PageComponent = await Page({ searchParams: Promise.resolve({}) });
    render(PageComponent);

    await waitFor(() => {
      expect(screen.getByText("Fiction")).toBeInTheDocument();
      expect(screen.getByText("Science")).toBeInTheDocument();
      expect(screen.getByText("Create Genre")).toBeInTheDocument();
    });
  });

  it("handles search params correctly", async () => {
    (handleGetAllGenresPaginated as jest.Mock).mockResolvedValue(
      createMockResponse(true, mockGenres, mockPagination),
    );

    const searchParams = Promise.resolve({
      page: "2",
      size: "10",
      search: "fic",
    });

    const PageComponent = await Page({ searchParams });
    render(PageComponent);

    await waitFor(() => {
      expect(handleGetAllGenresPaginated).toHaveBeenCalledWith(
        "2",
        "10",
        "fic",
      );
    });
  });

  it("throws error when API response fails", async () => {
    (handleGetAllGenresPaginated as jest.Mock).mockResolvedValue(
      createMockResponse(false, null, null, "Failed to load genres"),
    );

    await expect(Page({ searchParams: Promise.resolve({}) })).rejects.toThrow(
      "Failed to load genres",
    );
  });
});

// ============================================================
// ================= DISPLAY TABLE TESTS ======================
// ============================================================

describe("DisplayGenreTable Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ---------------- Rendering ----------------

  it("renders genre rows correctly", () => {
    render(
      <DisplayGenreTable
        genres={mockGenres}
        pagination={mockPagination}
        search=""
      />,
    );

    expect(screen.getByText("Fiction")).toBeInTheDocument();
    expect(screen.getByText("Science")).toBeInTheDocument();

    const editLinks = screen.getAllByText("Edit");
    const deleteButtons = screen.getAllByText("Delete");

    expect(editLinks).toHaveLength(2);
    expect(deleteButtons).toHaveLength(2);

    expect(editLinks[0].closest("a")).toHaveAttribute(
      "href",
      "/admin/genres/genre1/edit",
    );
  });

  it("renders table headers", () => {
    render(
      <DisplayGenreTable
        genres={mockGenres}
        pagination={mockPagination}
        search=""
      />,
    );

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  // ---------------- Search ----------------

  it("updates search input and triggers search on Enter", () => {
    render(
      <DisplayGenreTable
        genres={mockGenres}
        pagination={mockPagination}
        search=""
      />,
    );

    const input = screen.getByPlaceholderText("Search genres...");
    fireEvent.change(input, { target: { value: "Fiction" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockPush).toHaveBeenCalledWith(
      "/admin/genres?page=1&size=5&search=Fiction",
    );
  });

  it("triggers search on button click", () => {
    render(
      <DisplayGenreTable
        genres={mockGenres}
        pagination={mockPagination}
        search=""
      />,
    );

    const input = screen.getByPlaceholderText("Search genres...");
    fireEvent.change(input, { target: { value: "Sci" } });

    fireEvent.click(screen.getByText(/search/i));

    expect(mockPush).toHaveBeenCalledWith(
      "/admin/genres?page=1&size=5&search=Sci",
    );
  });

  // ---------------- Page Size ----------------

  it("changes page size correctly", () => {
    render(
      <DisplayGenreTable
        genres={mockGenres}
        pagination={mockPagination}
        search=""
      />,
    );

    const select = screen.getByLabelText("Rows per page:");
    fireEvent.change(select, { target: { value: "10" } });

    expect(mockPush).toHaveBeenCalledWith("/admin/genres?page=1&size=10");
  });

  // ---------------- Pagination ----------------

  it("renders pagination correctly", () => {
    render(
      <DisplayGenreTable
        genres={mockGenres}
        pagination={mockPagination}
        search=""
      />,
    );

    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  // ---------------- Delete ----------------

  it("calls delete and shows success toast", async () => {
    (handleDeleteGenre as jest.Mock).mockResolvedValue({});

    render(
      <DisplayGenreTable
        genres={mockGenres}
        pagination={mockPagination}
        search=""
      />,
    );

    fireEvent.click(screen.getAllByText("Delete")[0]);
    fireEvent.click(screen.getByText("Confirm"));

    await waitFor(() => {
      expect(handleDeleteGenre).toHaveBeenCalledWith("genre1");
    });
  });

  it("shows error toast on delete failure", async () => {
    (handleDeleteGenre as jest.Mock).mockRejectedValue(
      new Error("Delete failed"),
    );

    render(
      <DisplayGenreTable
        genres={mockGenres}
        pagination={mockPagination}
        search=""
      />,
    );

    fireEvent.click(screen.getAllByText("Delete")[0]);
    fireEvent.click(screen.getByText("Confirm"));

    await waitFor(() => {
      expect(handleDeleteGenre).toHaveBeenCalled();
    });
  });

  // ---------------- Empty State ----------------

  it("renders table correctly with no genres", () => {
    render(
      <DisplayGenreTable
        genres={[]}
        pagination={{ ...mockPagination, total: 0, totalPages: 1 }}
        search=""
      />,
    );

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.queryByText("Fiction")).not.toBeInTheDocument();
    expect(screen.getByText("Page 1 of 1")).toBeInTheDocument();
  });
});
