import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

import Page from "@/app/(public)/user/history/page";

import { handleGetOrderByUserId } from "@/lib/action/order-action";
import OrderHistory from "@/app/(public)/user/history/_component/OrderHistory";
import OrderCard from "@/app/(public)/user/history/_component/OrderCard";

// Mocks

jest.mock("@/lib/action/order-action", () => ({
  handleGetOrderByUserId: jest.fn(),
}));

// Mock Data

const mockOrders = [
  {
    _id: "order123",
    status: "completed",
    totalPrice: 1300,
    createdAt: "2024-01-01T00:00:00.000Z",
    books: [
      {
        _id: "1",
        quantity: 2,
        bookId: {
          _id: "book1",
          title: "Atomic Habits",
          price: 500,
        },
      },
      {
        _id: "2",
        quantity: 1,
        bookId: {
          _id: "book2",
          title: "Deep Work",
          price: 300,
        },
      },
    ],
  },
];

// SERVER PAGE TESTS

describe("Order History Page (Server Component)", () => {
  it("renders empty message if no orders", async () => {
    (handleGetOrderByUserId as jest.Mock).mockResolvedValue({
      success: true,
      data: [],
    });

    const PageComponent = await Page();
    render(<>{PageComponent}</>);

    expect(screen.getByText(/no order history/i)).toBeInTheDocument();
  });

  it("renders order history when data exists", async () => {
    (handleGetOrderByUserId as jest.Mock).mockResolvedValue({
      success: true,
      data: mockOrders,
    });

    const PageComponent = await Page();
    render(<>{PageComponent}</>);

    expect(screen.getByText(/order history/i)).toBeInTheDocument();
    expect(screen.getByText("order123")).toBeInTheDocument();
    expect(screen.getByText("Atomic Habits")).toBeInTheDocument();
    expect(screen.getByText("Deep Work")).toBeInTheDocument();
  });
});

// ORDER HISTORY COMPONENT

describe("OrderHistory Component", () => {
  it("renders all order cards", () => {
    render(<OrderHistory orders={mockOrders} />);

    expect(screen.getByText("order123")).toBeInTheDocument();
    expect(screen.getByText("Atomic Habits")).toBeInTheDocument();
    expect(screen.getByText("Deep Work")).toBeInTheDocument();
  });
});

// ORDER CARD COMPONENT

describe("OrderCard Component", () => {
  it("renders order details correctly", () => {
    render(<OrderCard order={mockOrders[0]} />);

    // Order ID
    expect(screen.getByText("order123")).toBeInTheDocument();

    // Status
    expect(screen.getByText(/completed/i)).toBeInTheDocument();

    // Books
    expect(screen.getByText("Atomic Habits")).toBeInTheDocument();
    expect(screen.getByText("Deep Work")).toBeInTheDocument();

    // Per-book totals
    expect(screen.getByText("Rs.1000")).toBeInTheDocument(); // 500*2
    expect(screen.getByText("Rs.300")).toBeInTheDocument(); // 300*1

    // Grand total
    expect(screen.getByText(/total: rs\.1300/i)).toBeInTheDocument();
  });

  it("renders formatted date correctly", () => {
    render(<OrderCard order={mockOrders[0]} />);

    const formattedDate = new Date(
      mockOrders[0].createdAt,
    ).toLocaleDateString();

    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  it("renders book links correctly", () => {
    render(<OrderCard order={mockOrders[0]} />);

    const link = screen.getByRole("link", {
      name: /atomic habits/i,
    });

    expect(link).toHaveAttribute("href", "/user/dashboard/book1");
  });
});
