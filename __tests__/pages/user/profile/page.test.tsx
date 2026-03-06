/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ProfilePage from "@/app/(public)/user/_component/ProfilePage";
import Page from "@/app/(public)/user/profile/page";
import { handleGetMyData, handleUpdateMyself } from "@/lib/action/auth-action";
import userEvent from "@testing-library/user-event";

// Global Setup
beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => "blob:mock-url");
  global.URL.revokeObjectURL = jest.fn();
});

// Mocks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

jest.mock("@/lib/action/auth-action", () => ({
  handleGetMyData: jest.fn(),
  handleUpdateMyself: jest.fn(),
}));

jest.mock("@/app/(public)/user/_component/ConfirmationModal", () => ({
  __esModule: true,
  default: ({ message, onCancel }: any) => (
    <div data-testid="confirmation-modal">
      <p>{message}</p>
      <button onClick={onCancel} data-testid="modal-cancel">
        Cancel
      </button>
    </div>
  ),
}));

jest.mock("@/app/(public)/user/_component/ChangePassword", () => ({
  __esModule: true,
  default: ({ email }: any) => (
    <div data-testid="change-password-component">
      Change Password for {email}
    </div>
  ),
}));

// Typed Mocks
const mockHandleGetMyData = handleGetMyData as jest.MockedFunction<
  typeof handleGetMyData
>;
const mockHandleUpdateMyself = handleUpdateMyself as jest.MockedFunction<
  typeof handleUpdateMyself
>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockToastSuccess = toast.success as jest.MockedFunction<
  typeof toast.success
>;
const mockToastError = toast.error as jest.MockedFunction<typeof toast.error>;

// Router Mock
const mockRefresh = jest.fn();
mockUseRouter.mockReturnValue({
  refresh: mockRefresh,
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
} as any);

// Test Data
const createMockUser = (overrides = {}) => ({
  id: "user123",
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  username: "johndoe",
  role: "user",
  profilePicture: null,
  ...overrides,
});

const createMockResponse = (success: boolean, data: any, message = "") => ({
  success,
  data,
  message,
});

const mockUser = createMockUser();

const createMockFile = (name: string, type: string) =>
  new File(["dummy content"], name, { type });

// Tests
describe("Profile Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockHandleGetMyData.mockResolvedValue(createMockResponse(true, mockUser));
  });

  // Server Component
  describe("Page Component (Server Component)", () => {
    it("fetches user data", async () => {
      const PageComponent = await Page();
      render(PageComponent);
      expect(mockHandleGetMyData).toHaveBeenCalledTimes(1);
    });

    it("shows error if fetch fails", async () => {
      mockHandleGetMyData.mockResolvedValue(
        createMockResponse(false, null, "Failed"),
      );

      const PageComponent = await Page();
      render(PageComponent);

      expect(screen.getByText("Failed To Fetch Your Data")).toBeInTheDocument();
    });
  });

  // Client Component

  describe("ProfilePage Component", () => {
    it("renders form with user data", () => {
      render(<ProfilePage user={mockUser} />);

      expect(
        screen.getByRole("heading", { name: /edit profile/i }),
      ).toBeInTheDocument();

      expect(screen.getByDisplayValue("John")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Doe")).toBeInTheDocument();
      expect(screen.getByDisplayValue("john@example.com")).toBeInTheDocument();
      expect(screen.getByDisplayValue("johndoe")).toBeInTheDocument();
    });

    it("switches to password tab", () => {
      render(<ProfilePage user={mockUser} />);

      fireEvent.click(screen.getByText("Change password"));

      expect(
        screen.getByTestId("change-password-component"),
      ).toBeInTheDocument();
    });

    it("shows validation error", async () => {
      render(<ProfilePage user={mockUser} />);

      fireEvent.change(screen.getByLabelText(/username/i), {
        target: { value: "ab" },
      });

      await userEvent.click(screen.getByText("Save"));

      await waitFor(() => {
        expect(
          screen.getByText(/username must be at least 3 characters/i),
        ).toBeInTheDocument();
      });
    });

    it("uploads image preview", async () => {
      render(<ProfilePage user={mockUser} />);

      const file = createMockFile("test.jpg", "image/jpeg");
      const fileInput = document.querySelector(
        'input[type="file"]',
      ) as HTMLInputElement;

      fireEvent.change(fileInput, { target: { files: [file] } });

      await waitFor(() => {
        expect(screen.getByAltText("Profile Preview")).toBeInTheDocument();
      });
    });

    it("submits form successfully", async () => {
      mockHandleUpdateMyself.mockResolvedValue(
        createMockResponse(true, mockUser),
      );

      render(<ProfilePage user={mockUser} />);

      fireEvent.change(screen.getByDisplayValue("John"), {
        target: { value: "Jane" },
      });

      await userEvent.click(screen.getByText("Save"));

      await waitFor(() => {
        expect(mockHandleUpdateMyself).toHaveBeenCalled();
      });

      expect(mockToastSuccess).toHaveBeenCalledWith(
        "Profile updated successfully",
      );
      expect(mockRefresh).toHaveBeenCalled();
    });

    it("handles submission error", async () => {
      mockHandleUpdateMyself.mockResolvedValue(
        createMockResponse(false, null, "Update failed"),
      );

      render(<ProfilePage user={mockUser} />);

      fireEvent.change(screen.getByDisplayValue("John"), {
        target: { value: "Jane" },
      });

      await userEvent.click(screen.getByText("Save"));

      await waitFor(() => {
        expect(mockToastError).toHaveBeenCalledWith("Update failed");
      });
    });

    it("resets form correctly", async () => {
      render(<ProfilePage user={mockUser} />);

      fireEvent.change(screen.getByDisplayValue("John"), {
        target: { value: "Jane" },
      });

      fireEvent.click(screen.getByText("Reset"));

      expect(screen.getByDisplayValue("John")).toBeInTheDocument();
      expect(mockToastSuccess).toHaveBeenCalledWith("Changes reset");
    });

    it("shows logout modal", () => {
      render(<ProfilePage user={mockUser} />);
      fireEvent.click(screen.getByText("Logout"));
      expect(screen.getByTestId("confirmation-modal")).toBeInTheDocument();
    });
  });
});
