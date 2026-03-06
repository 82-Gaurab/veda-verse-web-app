import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ContactPage from "@/app/contact/_component/Contact";
import { handleUserMessage } from "@/lib/action/auth-action";
import toast from "react-hot-toast";

// Mocks
jest.mock("@/lib/action/auth-action", () => ({
  handleUserMessage: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe("ContactPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 1️⃣ Renders
  it("renders form fields", () => {
    render(<ContactPage />);

    expect(screen.getByPlaceholderText("Your name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your email")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Write your message..."),
    ).toBeInTheDocument();
  });

  // 2️⃣ Validation Errors (FIXED)
  it("shows validation errors when submitting empty form", async () => {
    const user = userEvent.setup();
    render(<ContactPage />);

    await user.click(screen.getByRole("button", { name: /send message/i }));

    // Check actual zod messages
    expect(await screen.findByText("Enter your name")).toBeInTheDocument();
    expect(await screen.findByText("Enter a valid email")).toBeInTheDocument();
    expect(await screen.findByText("Enter a message")).toBeInTheDocument();
  });

  // 3️⃣ Successful Submit
  it("submits successfully", async () => {
    const user = userEvent.setup();

    (handleUserMessage as jest.Mock).mockResolvedValue({
      success: true,
    });

    render(<ContactPage />);

    await user.type(screen.getByPlaceholderText("Your name"), "John");
    await user.type(
      screen.getByPlaceholderText("Your email"),
      "john@example.com",
    );
    await user.type(
      screen.getByPlaceholderText("Write your message..."),
      "Hello there!",
    );

    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(handleUserMessage).toHaveBeenCalledWith({
        username: "John",
        userEmail: "john@example.com",
        message: "Hello there!",
      });

      expect(toast.success).toHaveBeenCalledWith("Message sent successfully!");
    });

    // Form reset check
    expect(screen.getByPlaceholderText("Your name")).toHaveValue("");
  });

  // 4️⃣ API Returns success: false
  it("shows error when API returns failure", async () => {
    const user = userEvent.setup();

    (handleUserMessage as jest.Mock).mockResolvedValue({
      success: false,
      message: "Failed to send message",
    });

    render(<ContactPage />);

    await user.type(screen.getByPlaceholderText("Your name"), "John");
    await user.type(
      screen.getByPlaceholderText("Your email"),
      "john@example.com",
    );
    await user.type(
      screen.getByPlaceholderText("Write your message..."),
      "Hello there!",
    );

    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Failed to send message");
    });
  });

  // 5️⃣ API Throws Error
  it("shows error when API throws", async () => {
    const user = userEvent.setup();

    (handleUserMessage as jest.Mock).mockRejectedValue(
      new Error("Server error"),
    );

    render(<ContactPage />);

    await user.type(screen.getByPlaceholderText("Your name"), "John");
    await user.type(
      screen.getByPlaceholderText("Your email"),
      "john@example.com",
    );
    await user.type(
      screen.getByPlaceholderText("Write your message..."),
      "Hello there!",
    );

    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Server error");
    });
  });
});
