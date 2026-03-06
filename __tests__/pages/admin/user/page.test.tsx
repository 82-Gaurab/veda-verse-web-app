/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";

import Page from "@/app/admin/users/page";
import DisplayUserTable from "@/app/admin/users/_components/DisplayUserTable";
import { handleGetAllUsers } from "@/lib/action/admin/user-action";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, className }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} data-testid="next-image" />
  ),
}));

// Mock react-hot-toast
jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

// Mock admin actions
jest.mock("@/lib/action/admin/user-action", () => ({
  handleGetAllUsers: jest.fn(),
  handleDeleteUser: jest.fn(),
}));

// Mock DeleteModal
jest.mock("@/app/(public)/_component/DeleteModal", () => {
  return ({ isOpen, onConfirm }: any) =>
    isOpen ? (
      <div>
        <button onClick={onConfirm}>Confirm</button>
      </div>
    ) : null;
});

// Mock environment variable
const mockApiBaseUrl = "http://localhost:3000";
process.env.NEXT_PUBLIC_API_BASE_URL = mockApiBaseUrl;

// Mock router
const mockPush = jest.fn();
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
mockUseRouter.mockReturnValue({
  push: mockPush,
  refresh: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
} as any);

// MOCK DATA
const mockUsers = [
  {
    _id: "user1",
    username: "johndoe",
    email: "john@example.com",
    role: "admin",
    profilePicture: null,
  },
  {
    _id: "user2",
    username: "janedoe",
    email: "jane@example.com",
    role: "user",
    profilePicture: "/images/jane.jpg",
  },
];

const mockPagination = {
  page: 1,
  size: 5,
  totalPages: 2,
  total: 10,
};

// Helper to create mock response
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

// ADMIN PAGE TESTS
describe("Admin Users Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPush.mockClear();
  });

  describe("Page Component (Server Component)", () => {
    it("renders empty state if no users", async () => {
      (handleGetAllUsers as jest.Mock).mockResolvedValue(
        createMockResponse(true, [], {
          page: 1,
          size: 5,
          totalPages: 1,
          total: 0,
        }),
      );

      const PageComponent = await Page({ searchParams: Promise.resolve({}) });
      render(PageComponent);

      await waitFor(() => {
        expect(screen.getByText(/create user/i)).toBeInTheDocument();
        expect(screen.queryByText("johndoe")).not.toBeInTheDocument();
      });
    });

    it("renders users when data exists", async () => {
      (handleGetAllUsers as jest.Mock).mockResolvedValue(
        createMockResponse(true, mockUsers, mockPagination),
      );

      const PageComponent = await Page({ searchParams: Promise.resolve({}) });
      render(PageComponent);

      await waitFor(() => {
        expect(screen.getByText("johndoe")).toBeInTheDocument();
        expect(screen.getByText("janedoe")).toBeInTheDocument();
        expect(screen.getByText("Create User")).toBeInTheDocument();
      });
    });

    it("handles search params correctly", async () => {
      (handleGetAllUsers as jest.Mock).mockResolvedValue(
        createMockResponse(true, [mockUsers[0]], mockPagination),
      );

      const searchParams = Promise.resolve({
        page: "2",
        size: "10",
        search: "john",
      });

      const PageComponent = await Page({ searchParams });
      render(PageComponent);

      await waitFor(() => {
        expect(handleGetAllUsers).toHaveBeenCalledWith("2", "10", "john");
      });
    });

    it("throws error when API response fails", async () => {
      (handleGetAllUsers as jest.Mock).mockResolvedValue(
        createMockResponse(false, null, null, "Failed to load users"),
      );

      await expect(Page({ searchParams: Promise.resolve({}) })).rejects.toThrow(
        "Failed to load users",
      );
    });
  });
});

// DisplayUserTable COMPONENT TESTS
describe("DisplayUserTable Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPush.mockClear();
  });

  describe("Rendering", () => {
    it("renders user rows correctly", () => {
      render(
        <DisplayUserTable
          users={mockUsers}
          pagination={mockPagination}
          search=""
        />,
      );

      // Check user data
      expect(screen.getByText("johndoe")).toBeInTheDocument();
      expect(screen.getByText("john@example.com")).toBeInTheDocument();
      expect(screen.getByText("admin")).toBeInTheDocument();
      expect(screen.getByText("janedoe")).toBeInTheDocument();
      expect(screen.getByText("user")).toBeInTheDocument();

      // Check action links
      const viewLinks = screen.getAllByText("View");
      const editLinks = screen.getAllByText("Edit");
      const deleteButtons = screen.getAllByText("Delete");

      expect(viewLinks).toHaveLength(2);
      expect(editLinks).toHaveLength(2);
      expect(deleteButtons).toHaveLength(2);

      // Check first user's links
      expect(viewLinks[0].closest("a")).toHaveAttribute(
        "href",
        "/admin/users/user1",
      );
      expect(editLinks[0].closest("a")).toHaveAttribute(
        "href",
        "/admin/users/user1/edit",
      );
    });

    it("displays N/A when user has no profile picture", () => {
      render(
        <DisplayUserTable
          users={[mockUsers[0]]}
          pagination={mockPagination}
          search=""
        />,
      );

      expect(screen.getByText("N/A")).toBeInTheDocument();
    });

    it("displays image when user has profile picture", () => {
      render(
        <DisplayUserTable
          users={[mockUsers[1]]}
          pagination={mockPagination}
          search=""
        />,
      );

      const image = screen.getByTestId("next-image");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute(
        "src",
        `${mockApiBaseUrl}${mockUsers[1].profilePicture}`,
      );
    });

    it("renders table headers correctly", () => {
      render(
        <DisplayUserTable
          users={mockUsers}
          pagination={mockPagination}
          search=""
        />,
      );

      expect(screen.getByText("ID")).toBeInTheDocument();
      expect(screen.getByText("Image")).toBeInTheDocument();
      expect(screen.getByText("Username")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("Role")).toBeInTheDocument();
      expect(screen.getByText("Actions")).toBeInTheDocument();
    });
  });

  describe("Search Functionality", () => {
    it("renders search input with initial value", () => {
      render(
        <DisplayUserTable
          users={mockUsers}
          pagination={mockPagination}
          search="john"
        />,
      );

      const searchInput = screen.getByPlaceholderText("Search users...");
      expect(searchInput).toHaveValue("john");
    });

    it("updates search input on change", () => {
      render(
        <DisplayUserTable
          users={mockUsers}
          pagination={mockPagination}
          search=""
        />,
      );

      const searchInput = screen.getByPlaceholderText("Search users...");
      fireEvent.change(searchInput, { target: { value: "test search" } });

      expect(searchInput).toHaveValue("test search");
    });

    it("triggers search on Enter key", () => {
      render(
        <DisplayUserTable
          users={mockUsers}
          pagination={mockPagination}
          search=""
        />,
      );

      const input = screen.getByPlaceholderText("Search users...");
      fireEvent.change(input, { target: { value: "john" } });
      fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

      expect(mockPush).toHaveBeenCalledWith(
        "/admin/users?page=1&size=5&search=john",
      );
    });

    it("triggers search on button click", () => {
      render(
        <DisplayUserTable
          users={mockUsers}
          pagination={mockPagination}
          search=""
        />,
      );

      const input = screen.getByPlaceholderText("Search users...");
      fireEvent.change(input, { target: { value: "john" } });

      const button = screen.getByText(/search/i);
      fireEvent.click(button);

      expect(mockPush).toHaveBeenCalledWith(
        "/admin/users?page=1&size=5&search=john",
      );
    });

    it("preserves search term in pagination links", () => {
      render(
        <DisplayUserTable
          users={mockUsers}
          pagination={mockPagination}
          search="john"
        />,
      );

      const nextButton = screen.getByText("Next");
      expect(nextButton.closest("a")).toHaveAttribute(
        "href",
        "/admin/users?page=2&size=5&search=john",
      );
    });
  });

  describe("Page Size Selection", () => {
    it("renders page size selector with current value", () => {
      render(
        <DisplayUserTable
          users={mockUsers}
          pagination={mockPagination}
          search=""
        />,
      );

      const select = screen.getByLabelText("Rows per page:");
      expect(select).toHaveValue("5");
    });

    it("navigates when page size is changed", () => {
      render(
        <DisplayUserTable
          users={mockUsers}
          pagination={mockPagination}
          search=""
        />,
      );

      const select = screen.getByLabelText("Rows per page:");
      fireEvent.change(select, { target: { value: "10" } });

      expect(mockPush).toHaveBeenCalledWith("/admin/users?page=1&size=10");
    });

    it("preserves search term when changing page size", () => {
      render(
        <DisplayUserTable
          users={mockUsers}
          pagination={mockPagination}
          search="john"
        />,
      );

      const select = screen.getByLabelText("Rows per page:");
      fireEvent.change(select, { target: { value: "25" } });

      expect(mockPush).toHaveBeenCalledWith(
        "/admin/users?page=1&size=25&search=john",
      );
    });

    it("renders all size options", () => {
      render(
        <DisplayUserTable
          users={mockUsers}
          pagination={mockPagination}
          search=""
        />,
      );

      const select = screen.getByLabelText("Rows per page:");
      const options = Array.from(select.querySelectorAll("option"));

      expect(options.map((o) => o.value)).toEqual([
        "5",
        "10",
        "25",
        "50",
        "100",
      ]);
    });
  });

  describe("Pagination", () => {
    it("displays current page and total pages", () => {
      render(
        <DisplayUserTable
          users={mockUsers}
          pagination={mockPagination}
          search=""
        />,
      );

      expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
    });

    it("renders all pagination buttons", () => {
      render(
        <DisplayUserTable
          users={mockUsers}
          pagination={mockPagination}
          search=""
        />,
      );

      expect(screen.getByText("Previous")).toBeInTheDocument();
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.getByText("Next")).toBeInTheDocument();
    });
  });

  describe("Empty State", () => {
    it("renders table with no users", () => {
      render(
        <DisplayUserTable
          users={[]}
          pagination={{ ...mockPagination, total: 0, totalPages: 1 }}
          search=""
        />,
      );

      // Table headers should still be there
      expect(screen.getByText("ID")).toBeInTheDocument();
      expect(screen.getByText("Username")).toBeInTheDocument();

      // No user data should be present
      expect(screen.queryByText("johndoe")).not.toBeInTheDocument();

      // Pagination should still work
      expect(screen.getByText("Page 1 of 1")).toBeInTheDocument();
    });
  });
});
