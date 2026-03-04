import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { format } from "date-fns";

import Page from "@/app/(public)/user/reviews/page";

import { handleGetMyReviews } from "@/lib/action/review-action";
import MyReviews from "@/app/(public)/user/reviews/_components/MyReviews";
import MyReviewCard from "@/app/(public)/user/reviews/_components/MyReviewCard";
import { ReviewSchema } from "@/app/(public)/user/reviews/schema";

//  MOCKS

jest.mock("@/lib/action/review-action", () => ({
  handleGetMyReviews: jest.fn(),
}));

// MOCK DATA

const mockReviews = [
  {
    _id: "rev1",
    userId: "user1",
    rating: 4,
    title: "Great Book",
    comment: "Very helpful and practical.",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    bookId: {
      _id: "book1",
      title: "Atomic Habits",
      price: 500,
    },
  },
];

//  SERVER PAGE TESTS

describe("My Reviews Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders empty state if no reviews", async () => {
    (handleGetMyReviews as jest.Mock).mockResolvedValue({
      success: true,
      data: [],
    });

    const PageComponent = await Page();
    render(<>{PageComponent}</>);

    expect(screen.getByText(/no reviews yet/i)).toBeInTheDocument();
  });

  it("renders reviews when data exists", async () => {
    (handleGetMyReviews as jest.Mock).mockResolvedValue({
      success: true,
      data: mockReviews,
    });

    const PageComponent = await Page();
    render(<>{PageComponent}</>);

    expect(screen.getByText(/my reviews/i)).toBeInTheDocument();
    expect(screen.getByText("Atomic Habits")).toBeInTheDocument();
    expect(screen.getByText("Very helpful and practical.")).toBeInTheDocument();
  });
});

//  MyReviews COMPONENT

describe("MyReviews Component", () => {
  it("renders empty state when reviews array is empty", () => {
    render(<MyReviews reviews={[]} />);

    expect(screen.getByText(/no reviews yet/i)).toBeInTheDocument();
  });

  it("renders review cards correctly", () => {
    render(<MyReviews reviews={mockReviews} />);

    expect(screen.getByText("Atomic Habits")).toBeInTheDocument();
    expect(screen.getByText("Very helpful and practical.")).toBeInTheDocument();
  });
});

//  MyReviewCard COMPONENT

describe("MyReviewCard Component", () => {
  it("renders review details correctly", () => {
    render(<MyReviewCard review={mockReviews[0]} />);

    // Book title
    expect(screen.getByText("Atomic Habits")).toBeInTheDocument();

    // Comment
    expect(screen.getByText("Very helpful and practical.")).toBeInTheDocument();

    // Rating formatted to 1 decimal
    expect(screen.getByText("4.0")).toBeInTheDocument();
  });

  it("formats and displays review date correctly", () => {
    render(<MyReviewCard review={mockReviews[0]} />);

    const formattedDate = format(
      new Date(mockReviews[0].createdAt),
      "dd MMM yyyy",
    );

    expect(
      screen.getByText(`Reviewed on: ${formattedDate}`),
    ).toBeInTheDocument();
  });
});

// ReviewSchema VALIDATION

describe("ReviewSchema Validation", () => {
  it("validates correct review data", () => {
    const validData = {
      title: "Great Book",
      comment: "Very helpful book!",
      rating: 5,
      bookId: "book1",
    };

    const result = ReviewSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("fails if title is too short", () => {
    const result = ReviewSchema.safeParse({
      title: "Hi",
      comment: "Valid comment here",
      rating: 4,
      bookId: "book1",
    });

    expect(result.success).toBe(false);
  });

  it("fails if comment is too short", () => {
    const result = ReviewSchema.safeParse({
      title: "Valid Title",
      comment: "Bad",
      rating: 4,
      bookId: "book1",
    });

    expect(result.success).toBe(false);
  });

  it("fails if rating is below 1", () => {
    const result = ReviewSchema.safeParse({
      title: "Valid Title",
      comment: "Valid comment",
      rating: 0,
      bookId: "book1",
    });

    expect(result.success).toBe(false);
  });

  it("fails if rating exceeds 5", () => {
    const result = ReviewSchema.safeParse({
      title: "Valid Title",
      comment: "Valid comment",
      rating: 6,
      bookId: "book1",
    });

    expect(result.success).toBe(false);
  });
});
