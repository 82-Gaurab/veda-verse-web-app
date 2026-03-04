/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";

import Page from "@/app/admin/books/page";
import DisplayBookTable from "@/app/admin/books/_component/DisplayBookTable";
import {
  handleGetAllBooks,
  handleDeleteBook,
} from "@/lib/action/admin/book-action";

//  MOCKS

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/link", () => {
  return ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

jest.mock("@/lib/action/admin/book-action", () => ({
  handleGetAllBooks: jest.fn(),
  handleDeleteBook: jest.fn(),
}));

jest.mock("@/app/(public)/_component/DeleteModal", () => {
  return ({ isOpen, onConfirm }: any) =>
    isOpen ? (
      <div>
        <button onClick={onConfirm}>Confirm</button>
      </div>
    ) : null;
});

//  ROUTER MOCK

const mockPush = jest.fn();
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

mockUseRouter.mockReturnValue({
  push: mockPush,
  refresh: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
} as any);

//  MOCK DATA

const mockBooks = [
  {
    _id: "book1",
    title: "Atomic Habits",
    author: "James Clear",
    price: 500,
    stockAmount: 10,
    publishedYear: "2018",
  },
  {
    _id: "book2",
    title: "Deep Work",
    author: "Cal Newport",
    price: 300,
    stockAmount: 5,
    publishedYear: "2016",
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

// ======================================================
// 🟢 PAGE (SERVER COMPONENT) TESTS
// ======================================================

describe("Admin Books Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPush.mockClear();
  });

  it("renders books when data exists", async () => {
    (handleGetAllBooks as jest.Mock).mockResolvedValue(
      createMockResponse(true, mockBooks, mockPagination),
    );

    const PageComponent = await Page({ searchParams: Promise.resolve({}) });
    render(PageComponent);

    await waitFor(() => {
      expect(screen.getByText("Atomic Habits")).toBeInTheDocument();
      expect(screen.getByText("Deep Work")).toBeInTheDocument();
      expect(screen.getByText("Create Book")).toBeInTheDocument();
    });
  });

  it("renders error message when API fails", async () => {
    (handleGetAllBooks as jest.Mock).mockResolvedValue(
      createMockResponse(false, null),
    );

    const PageComponent = await Page({ searchParams: Promise.resolve({}) });
    render(PageComponent);

    expect(screen.getByText("Failed to Load Users")).toBeInTheDocument();
  });

  it("calls API with search params correctly", async () => {
    (handleGetAllBooks as jest.Mock).mockResolvedValue(
      createMockResponse(true, mockBooks, mockPagination),
    );

    const searchParams = Promise.resolve({
      page: "2",
      size: "10",
      search: "atomic",
    });

    await Page({ searchParams });

    expect(handleGetAllBooks).toHaveBeenCalledWith("2", "10", "atomic");
  });
});

// ======================================================
// 🟢 DISPLAYBOOKTABLE COMPONENT TESTS
// ======================================================

describe("DisplayBookTable Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //  RENDERING

  it("renders book rows correctly", () => {
    render(
      <DisplayBookTable
        books={mockBooks}
        pagination={mockPagination}
        search=""
      />,
    );

    expect(screen.getByText("Atomic Habits")).toBeInTheDocument();
    expect(screen.getByText("James Clear")).toBeInTheDocument();
    expect(screen.getByText("Deep Work")).toBeInTheDocument();

    expect(screen.getAllByText("View")).toHaveLength(2);
    expect(screen.getAllByText("Edit")).toHaveLength(2);
    expect(screen.getAllByText("Delete")).toHaveLength(2);
  });

  //  SEARCH

  it("triggers search on Enter key", () => {
    render(
      <DisplayBookTable
        books={mockBooks}
        pagination={mockPagination}
        search=""
      />,
    );

    const input = screen.getByPlaceholderText("Search books...");
    fireEvent.change(input, { target: { value: "atomic" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockPush).toHaveBeenCalledWith(
      "/admin/books?page=1&size=5&search=atomic",
    );
  });

  it("triggers search on button click", () => {
    render(
      <DisplayBookTable
        books={mockBooks}
        pagination={mockPagination}
        search=""
      />,
    );

    const input = screen.getByPlaceholderText("Search books...");
    fireEvent.change(input, { target: { value: "atomic" } });

    fireEvent.click(screen.getByText("Search"));

    expect(mockPush).toHaveBeenCalledWith(
      "/admin/books?page=1&size=5&search=atomic",
    );
  });

  //  PAGE SIZE

  it("changes page size correctly", () => {
    render(
      <DisplayBookTable
        books={mockBooks}
        pagination={mockPagination}
        search=""
      />,
    );

    const select = screen.getByLabelText("Rows per page:");
    fireEvent.change(select, { target: { value: "10" } });

    expect(mockPush).toHaveBeenCalledWith("/admin/books?page=1&size=10");
  });

  //  PAGINATION

  it("renders pagination correctly", () => {
    render(
      <DisplayBookTable
        books={mockBooks}
        pagination={mockPagination}
        search=""
      />,
    );

    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("disables Previous on first page", () => {
    render(
      <DisplayBookTable
        books={mockBooks}
        pagination={{ ...mockPagination, page: 1 }}
        search=""
      />,
    );

    const prev = screen.getByText("Previous").closest("a");
    expect(prev).toHaveAttribute("href", "#");
  });

  it("disables Next on last page", () => {
    render(
      <DisplayBookTable
        books={mockBooks}
        pagination={{ ...mockPagination, page: 2, totalPages: 2 }}
        search=""
      />,
    );

    const next = screen.getByText("Next").closest("a");
    expect(next).toHaveAttribute("href", "#");
  });

  //  DELETE

  it("deletes book successfully", async () => {
    (handleDeleteBook as jest.Mock).mockResolvedValue({});

    render(
      <DisplayBookTable
        books={mockBooks}
        pagination={mockPagination}
        search=""
      />,
    );

    fireEvent.click(screen.getAllByText("Delete")[0]);
    fireEvent.click(screen.getByText("Confirm"));

    await waitFor(() => {
      expect(handleDeleteBook).toHaveBeenCalledWith("book1");
    });
  });

  it("shows error if delete fails", async () => {
    (handleDeleteBook as jest.Mock).mockRejectedValue(
      new Error("Delete failed"),
    );

    render(
      <DisplayBookTable
        books={mockBooks}
        pagination={mockPagination}
        search=""
      />,
    );

    fireEvent.click(screen.getAllByText("Delete")[0]);
    fireEvent.click(screen.getByText("Confirm"));

    await waitFor(() => {
      expect(handleDeleteBook).toHaveBeenCalled();
    });
  });

  //  EMPTY STATE

  it("renders empty table correctly", () => {
    render(
      <DisplayBookTable
        books={[]}
        pagination={{ ...mockPagination, totalPages: 1 }}
        search=""
      />,
    );

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Page 1 of 1")).toBeInTheDocument();
  });
});
