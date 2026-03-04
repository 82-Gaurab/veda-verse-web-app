import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ExplorePage, { Book, Genre } from "@/app/explore/_component/Explore";
import {
  handleGetAllBooks,
  handleGetBookByGenre,
} from "@/lib/action/book-action";
import { handleGetAllGenres } from "@/lib/action/genre-action";
import ExplorePageRoute from "@/app/(public)/user/dashboard/page";

// Define the expected response types
interface ActionResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Mock the actions
jest.mock("@/lib/action/book-action", () => ({
  handleGetAllBooks: jest.fn(),
  handleGetBookByGenre: jest.fn(),
}));

jest.mock("@/lib/action/genre-action", () => ({
  handleGetAllGenres: jest.fn(),
}));

// Mock the card components
jest.mock("@/app/(public)/_component/BookCard", () => ({
  __esModule: true,
  default: ({ title, author, price }: Partial<Book>) => (
    <div data-testid="public-book-card">
      {title} - {author} - ${price}
    </div>
  ),
}));

jest.mock("@/app/(public)/user/dashboard/_component/UserBookCard", () => ({
  __esModule: true,
  default: ({ title, author, price }: Partial<Book>) => (
    <div data-testid="user-book-card">
      {title} - {author} - ${price} (User)
    </div>
  ),
}));

// Type the mocked functions
const mockGetAllBooks = handleGetAllBooks as jest.MockedFunction<
  typeof handleGetAllBooks
>;
const mockGetBookByGenre = handleGetBookByGenre as jest.MockedFunction<
  typeof handleGetBookByGenre
>;
const mockGetAllGenres = handleGetAllGenres as jest.MockedFunction<
  typeof handleGetAllGenres
>;

// Mock console.error to avoid noise in tests
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

// Test data factories
const createMockBook = (overrides: Partial<Book> = {}): Book => ({
  _id: "b1",
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  price: 19.99,
  coverImg: "/cover.jpg",
  genre: [{ _id: "g1", name: "Fiction" }],
  ...overrides,
});

const createMockGenre = (overrides: Partial<Genre> = {}): Genre => ({
  _id: "g1",
  name: "Fiction",
  ...overrides,
});

// Test data
const mockGenres: Genre[] = [
  createMockGenre(),
  createMockGenre({ _id: "g2", name: "Mystery" }),
  createMockGenre({ _id: "g3", name: "Science Fiction" }),
];

const mockBooks: Book[] = [
  createMockBook(),
  createMockBook({
    _id: "b2",
    title: "1984",
    author: "George Orwell",
    genre: [{ _id: "g2", name: "Mystery" }],
  }),
  createMockBook({
    _id: "b3",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    price: 24.99,
    genre: [{ _id: "g3", name: "Fantasy" }],
  }),
];

// Helper functions to create proper mock responses
const createSuccessResponse = <T,>(data: T): ActionResponse<T> => ({
  success: true,
  message: "Success",
  data,
  pagination: {
    page: 1,
    limit: 50,
    total: Array.isArray(data) ? data.length : 1,
    totalPages: 1,
  },
});

const createErrorResponse = (message: string): ActionResponse<null> => ({
  success: false,
  message,
  data: null,
  pagination: undefined,
});

describe("ExplorePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock implementations with proper response structure
    mockGetAllGenres.mockResolvedValue(createSuccessResponse(mockGenres));
    mockGetAllBooks.mockResolvedValue(createSuccessResponse(mockBooks));
    mockGetBookByGenre.mockResolvedValue(createSuccessResponse([mockBooks[0]]));
  });

  describe("Initial Load", () => {
    it("fetches genres and books on mount", async () => {
      render(<ExplorePage />);

      await waitFor(() => {
        expect(mockGetAllGenres).toHaveBeenCalledTimes(1);
        expect(mockGetAllBooks).toHaveBeenCalledTimes(1);
        expect(mockGetAllBooks).toHaveBeenCalledWith(undefined);
      });
    });

    it("shows loading state while fetching books", async () => {
      mockGetAllBooks.mockImplementation(() => new Promise(() => {}));

      render(<ExplorePage />);

      expect(screen.getByText("Loading books...")).toBeInTheDocument();
    });

    it("renders all genre buttons including 'All'", async () => {
      render(<ExplorePage />);

      await waitFor(() => {
        expect(screen.getByText("All")).toBeInTheDocument();
        expect(screen.getByText("Fiction")).toBeInTheDocument();
        expect(screen.getByText("Mystery")).toBeInTheDocument();
        expect(screen.getByText("Science Fiction")).toBeInTheDocument();
      });
    });

    it("renders books after successful fetch", async () => {
      render(<ExplorePage />);

      await waitFor(() => {
        expect(screen.getAllByTestId("public-book-card")).toHaveLength(3);
        expect(screen.getByText(/The Great Gatsby/)).toBeInTheDocument();
        expect(screen.getByText(/1984/)).toBeInTheDocument();
        expect(screen.getByText(/The Hobbit/)).toBeInTheDocument();
      });
    });
  });

  describe("Authentication States", () => {
    it("renders public BookCard when isLoggedIn is false", async () => {
      render(<ExplorePage isLoggedIn={false} />);

      await waitFor(() => {
        const cards = screen.getAllByTestId("public-book-card");
        expect(cards).toHaveLength(3);
        expect(screen.queryByTestId("user-book-card")).not.toBeInTheDocument();
      });
    });

    it("renders UserBookCard when isLoggedIn is true", async () => {
      render(<ExplorePage isLoggedIn={true} />);

      await waitFor(() => {
        const cards = screen.getAllByTestId("user-book-card");
        expect(cards).toHaveLength(3);
        expect(cards[0]).toHaveTextContent("(User)");
      });
    });
  });

  describe("Search Functionality", () => {
    it("renders search input and button", () => {
      render(<ExplorePage />);

      expect(
        screen.getByPlaceholderText("Search books..."),
      ).toBeInTheDocument();
      expect(screen.getByText("Search")).toBeInTheDocument();
    });

    it("calls handleGetAllBooks with search term when search button is clicked", async () => {
      render(<ExplorePage />);

      const searchInput = screen.getByPlaceholderText("Search books...");
      const searchButton = screen.getByText("Search");

      fireEvent.change(searchInput, { target: { value: "Gatsby" } });
      fireEvent.click(searchButton);

      await waitFor(() => {
        expect(mockGetAllBooks).toHaveBeenCalledWith("Gatsby");
      });
    });

    it("calls handleGetAllBooks with search term when Enter key is pressed", async () => {
      render(<ExplorePage />);

      const searchInput = screen.getByPlaceholderText("Search books...");

      fireEvent.change(searchInput, { target: { value: "Orwell" } });
      fireEvent.keyDown(searchInput, { key: "Enter", code: "Enter" });

      await waitFor(() => {
        expect(mockGetAllBooks).toHaveBeenCalledWith("Orwell");
      });
    });

    it("resets genre selection when searching", async () => {
      render(<ExplorePage />);

      // First select a genre
      await waitFor(() => {
        fireEvent.click(screen.getByText("Mystery"));
      });

      // Then search
      const searchInput = screen.getByPlaceholderText("Search books...");
      fireEvent.change(searchInput, { target: { value: "Gatsby" } });
      fireEvent.click(screen.getByText("Search"));

      await waitFor(() => {
        // Verify 'All' button is active (genre reset to null)
        const allButton = screen.getByText("All");
        expect(allButton).toHaveClass("bg-emerald-700");
      });
    });

    it("calls fetchBooks with undefined when search term is empty", async () => {
      render(<ExplorePage />);

      const searchButton = screen.getByText("Search");
      fireEvent.click(searchButton);

      await waitFor(() => {
        expect(mockGetAllBooks).toHaveBeenCalledWith(undefined);
      });
    });
  });

  describe("Genre Filtering", () => {
    it("calls fetchBooksByGenre when a genre button is clicked", async () => {
      render(<ExplorePage />);

      await waitFor(() => {
        fireEvent.click(screen.getByText("Mystery"));
      });

      expect(mockGetBookByGenre).toHaveBeenCalledWith("g2");
    });

    it("highlights the active genre button", async () => {
      render(<ExplorePage />);

      await waitFor(() => {
        const mysteryButton = screen.getByText("Mystery");
        fireEvent.click(mysteryButton);
      });

      // Check that Mystery button has active styling
      const mysteryButton = screen.getByText("Mystery");
      expect(mysteryButton).toHaveClass("bg-emerald-700");

      // Check that All button doesn't have active styling
      const allButton = screen.getByText("All");
      expect(allButton).not.toHaveClass("bg-emerald-700");
    });

    it("resets to All books when 'All' button is clicked", async () => {
      render(<ExplorePage />);

      // Click on a genre first
      await waitFor(() => {
        fireEvent.click(screen.getByText("Mystery"));
      });

      // Then click on All
      fireEvent.click(screen.getByText("All"));

      await waitFor(() => {
        expect(mockGetAllBooks).toHaveBeenCalledWith(undefined);
        const allButton = screen.getByText("All");
        expect(allButton).toHaveClass("bg-emerald-700");
      });
    });

    it("updates books display when genre changes", async () => {
      mockGetBookByGenre.mockResolvedValue(
        createSuccessResponse([mockBooks[0]]),
      );

      render(<ExplorePage />);

      await waitFor(() => {
        fireEvent.click(screen.getByText("Mystery"));
      });

      await waitFor(() => {
        const books = screen.getAllByTestId("public-book-card");
        expect(books).toHaveLength(1);
        expect(books[0]).toHaveTextContent("The Great Gatsby");
      });
    });
  });

  describe("Empty and Error States", () => {
    it("shows 'No books found' when books array is empty", async () => {
      mockGetAllBooks.mockResolvedValue(createSuccessResponse([]));

      render(<ExplorePage />);

      await waitFor(() => {
        expect(screen.getByText("No books found.")).toBeInTheDocument();
      });
    });

    it("handles error when fetching books fails", async () => {
      mockGetAllBooks.mockRejectedValue(new Error("Failed to fetch"));

      render(<ExplorePage />);

      await waitFor(() => {
        expect(screen.getByText("No books found.")).toBeInTheDocument();
      });

      expect(console.error).toHaveBeenCalled();
    });

    it("handles error when fetching genres fails", async () => {
      mockGetAllGenres.mockRejectedValue(new Error("Failed to fetch genres"));

      render(<ExplorePage />);

      await waitFor(() => {
        // Should still show books but no genre buttons (except All)
        expect(screen.getByText("All")).toBeInTheDocument();
        expect(screen.queryByText("Fiction")).not.toBeInTheDocument();
        expect(screen.queryByText("Mystery")).not.toBeInTheDocument();
      });

      expect(console.error).toHaveBeenCalled();
    });

    it("handles error when fetching books by genre fails", async () => {
      mockGetBookByGenre.mockRejectedValue(new Error("Failed to fetch"));

      render(<ExplorePage />);

      await waitFor(() => {
        fireEvent.click(screen.getByText("Mystery"));
      });

      await waitFor(() => {
        expect(screen.getByText("No books found.")).toBeInTheDocument();
      });

      expect(console.error).toHaveBeenCalled();
    });

    it("handles API response with success: false for books", async () => {
      mockGetAllBooks.mockResolvedValue(
        createErrorResponse("Failed to fetch books"),
      );

      render(<ExplorePage />);

      await waitFor(() => {
        expect(screen.getByText("No books found.")).toBeInTheDocument();
      });
    });

    it("handles API response with success: false for genres", async () => {
      mockGetAllGenres.mockResolvedValue(
        createErrorResponse("Failed to fetch genres"),
      );

      render(<ExplorePage />);

      await waitFor(() => {
        // Should still show books but only 'All' button
        expect(screen.getByText("All")).toBeInTheDocument();
        expect(screen.getAllByTestId("public-book-card")).toHaveLength(3);
      });
    });
  });

  describe("Interactive Behavior", () => {
    it("shows loading state when changing genres", async () => {
      mockGetBookByGenre.mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () => resolve(createSuccessResponse([mockBooks[0]])),
              100,
            ),
          ),
      );

      render(<ExplorePage />);

      await waitFor(() => {
        fireEvent.click(screen.getByText("Mystery"));
      });

      expect(screen.getByText("Loading books...")).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.queryByText("Loading books...")).not.toBeInTheDocument();
      });
    });

    it("maintains search input value", () => {
      render(<ExplorePage />);

      const searchInput = screen.getByPlaceholderText(
        "Search books...",
      ) as HTMLInputElement;
      fireEvent.change(searchInput, { target: { value: "Test Search" } });

      expect(searchInput.value).toBe("Test Search");
    });
  });

  describe("Page Component Integration", () => {
    it("renders ExplorePage with isLoggedIn=true from page component", async () => {
      // Dynamic import to avoid hoisting issues

      mockGetAllBooks.mockResolvedValue(createSuccessResponse(mockBooks));

      render(<ExplorePageRoute />);

      await waitFor(() => {
        expect(screen.getAllByTestId("user-book-card")).toHaveLength(3);
      });
    });
  });
});
