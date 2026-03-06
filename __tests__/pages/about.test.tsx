/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Page from "@/app/about/page";
import AboutPage from "@/app/about/_component/AboutUs";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // render an img tag with same props
    return <img {...props} alt={props.alt} />;
  },
}));

describe("About Us Page", () => {
  it("renders the AboutPage component", () => {
    const page = Page();
    render(page);

    expect(
      screen.getByText("A Calm Sanctuary for Readers"),
    ).toBeInTheDocument();
    expect(screen.getByText("Our Story")).toBeInTheDocument();
  });
});

describe("AboutPage Component", () => {
  beforeEach(() => render(<AboutPage />));

  it("renders hero section with heading and description", () => {
    expect(
      screen.getByText("A Calm Sanctuary for Readers"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/We believe books should feel like a warm space/i),
    ).toBeInTheDocument();
  });

  it("renders image with overlay text", () => {
    const image = screen.getByAltText("Library");
    expect(image).toBeInTheDocument();

    const overlayText = screen.getByText("Where Stories Feel Like Home");
    expect(overlayText).toBeInTheDocument();
  });

  it("renders purpose section", () => {
    expect(screen.getByText("Our Purpose")).toBeInTheDocument();
    expect(
      screen.getByText(
        /We curate meaningful books that nurture calm thinking/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Every title is selected with intention/i),
    ).toBeInTheDocument();
  });

  it("renders commitments card", () => {
    expect(screen.getByText("Our Commitments")).toBeInTheDocument();
    expect(
      screen.getByText("• Curate thoughtfully selected titles."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("• Create a peaceful digital browsing experience."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("• Encourage curiosity and reflection."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("• Blend tradition with modern simplicity."),
    ).toBeInTheDocument();
  });

  it("renders core values section", () => {
    expect(screen.getByText("Our Core Values")).toBeInTheDocument();
    expect(screen.getByText("Thoughtful Curation")).toBeInTheDocument();
    expect(
      screen.getByText("Books selected with care and intention."),
    ).toBeInTheDocument();
    expect(screen.getByText("Accessibility")).toBeInTheDocument();
    expect(
      screen.getByText("Knowledge made simple and approachable."),
    ).toBeInTheDocument();
    expect(screen.getByText("Timelessness")).toBeInTheDocument();
    expect(
      screen.getByText("Stories that resonate across generations."),
    ).toBeInTheDocument();
  });

  it("renders quote section", () => {
    expect(
      screen.getByText(
        "“A good book feels like a quiet conversation that stays with you.”",
      ),
    ).toBeInTheDocument();
  });

  it("renders decorative background elements", () => {
    // check for presence of divs with blur classes
    expect(document.querySelectorAll("div.blur-3xl")).toHaveLength(2);
  });

  it("renders all mapped core value cards", () => {
    const cards = screen.getAllByText(
      /Books selected with care|Knowledge made simple|Stories that resonate/,
    );
    expect(cards).toHaveLength(3);
  });
});
