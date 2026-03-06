import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { handleGetMyData } from "@/lib/action/auth-action";
import { handleCreateOrder } from "@/lib/action/order-action";

import toast from "react-hot-toast";
import Page from "@/app/(public)/user/cart/page";
import CartList from "@/app/(public)/user/cart/_component/CartList";
import CartItemCard from "@/app/(public)/user/cart/_component/CartItemCard";

// Mocks

jest.mock("@/lib/action/auth-action", () => ({
  handleGetMyData: jest.fn(),
}));

jest.mock("@/lib/action/order-action", () => ({
  handleCreateOrder: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: jest.fn(),
  }),
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

// Mock Data

const mockCart = [
  {
    _id: "1",
    quantity: 2,
    bookId: {
      _id: "book1",
      title: "Atomic Habits",
      author: "James Clear",
      price: 500,
      publishedYear: "2018",
      coverImg: "/img1.jpg",
    },
  },
  {
    _id: "2",
    quantity: 1,
    bookId: {
      _id: "book2",
      title: "Deep Work",
      author: "Cal Newport",
      price: 300,
      publishedYear: "2016",
      coverImg: "/img2.jpg",
    },
  },
];

// SERVER PAGE TESTS

describe("Cart Page (Server Component)", () => {
  it("renders empty message if cart is empty", async () => {
    (handleGetMyData as jest.Mock).mockResolvedValue({
      success: true,
      data: { cart: [] },
    });

    const PageComponent = await Page();
    render(<>{PageComponent}</>);

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it("renders cart items when cart has data", async () => {
    (handleGetMyData as jest.Mock).mockResolvedValue({
      success: true,
      data: { cart: mockCart },
    });

    const PageComponent = await Page();
    render(<>{PageComponent}</>);

    expect(screen.getByText(/my cart/i)).toBeInTheDocument();
    expect(screen.getByText("Atomic Habits")).toBeInTheDocument();
    expect(screen.getByText("Deep Work")).toBeInTheDocument();
  });
});

// CART LIST COMPONENT TESTS

describe("CartList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders cart items correctly", () => {
    render(<CartList cart={mockCart} />);

    expect(screen.getByText("Atomic Habits")).toBeInTheDocument();
    expect(screen.getByText("Deep Work")).toBeInTheDocument();
  });

  it("calculates and displays grand total correctly", () => {
    render(<CartList cart={mockCart} />);

    // 500*2 + 300*1 = 1300
    expect(screen.getByText(/grand total: rs\.1300/i)).toBeInTheDocument();
  });

  it("shows empty message when cart is empty", () => {
    render(<CartList cart={[]} />);

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it("creates order successfully", async () => {
    (handleCreateOrder as jest.Mock).mockResolvedValue({
      success: true,
    });

    render(<CartList cart={mockCart} />);

    fireEvent.click(screen.getByText(/create order/i));

    await waitFor(() => {
      expect(handleCreateOrder).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("Order created successfully");
    });
  });

  it("shows error when order creation fails", async () => {
    (handleCreateOrder as jest.Mock).mockResolvedValue({
      success: false,
      message: "Failed to create order.",
    });

    render(<CartList cart={mockCart} />);

    fireEvent.click(screen.getByText(/create order/i));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Failed to create order.");
    });
  });

  it("shows fallback error if no response returned", async () => {
    (handleCreateOrder as jest.Mock).mockResolvedValue(undefined);

    render(<CartList cart={mockCart} />);

    fireEvent.click(screen.getByText(/create order/i));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Something went wrong. Please try again.",
      );
    });
  });

  it("does not show create order button when cart is empty", () => {
    render(<CartList cart={[]} />);

    expect(screen.queryByText(/create order/i)).not.toBeInTheDocument();
  });
});

// CART ITEM CARD TESTS

describe("CartItemCard Component", () => {
  it("renders book details correctly", () => {
    render(<CartItemCard item={mockCart[0]} />);

    expect(screen.getByText("Atomic Habits")).toBeInTheDocument();
    expect(screen.getByText(/by james clear/i)).toBeInTheDocument();
    expect(screen.getByText("Rs.500")).toBeInTheDocument();
    expect(screen.getByText("Rs.1000")).toBeInTheDocument();
  });

  it("renders view book link correctly", () => {
    render(<CartItemCard item={mockCart[0]} />);

    const link = screen.getByRole("link", { name: /view book/i });
    expect(link).toHaveAttribute("href", "/user/dashboard/book1");
  });
});
