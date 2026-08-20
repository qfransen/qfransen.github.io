import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Section from "./section";

describe("Section Component", () => {
  it("renders correctly with default props (open)", () => {
    render(
      <Section title="Test Section">
        <div data-testid="child-content">Content</div>
      </Section>
    );

    expect(screen.getByText("Test Section")).toBeInTheDocument();
    expect(screen.getByText("−")).toBeInTheDocument();

    // The content wrapper should have the 'open' class
    const contentWrapper = screen.getByText("Content").parentElement;
    expect(contentWrapper).toHaveClass("section-content", "open");
  });

  it("renders correctly when defaultOpen is false", () => {
    render(
      <Section title="Test Section" defaultOpen={false}>
        <div data-testid="child-content">Content</div>
      </Section>
    );

    expect(screen.getByText("Test Section")).toBeInTheDocument();
    expect(screen.getByText("v")).toBeInTheDocument();

    const contentWrapper = screen.getByText("Content").parentElement;
    expect(contentWrapper).toHaveClass("section-content", "closed");
  });

  it("toggles the section open and closed when clicking the button", () => {
    render(
      <Section title="Test Section">
        <div data-testid="child-content">Content</div>
      </Section>
    );

    const button = screen.getByRole("button", { name: /test section/i });
    const contentWrapper = screen.getByText("Content").parentElement;

    // Initially open
    expect(contentWrapper).toHaveClass("open");
    expect(screen.getByText("−")).toBeInTheDocument();

    // Click to close
    fireEvent.click(button);
    expect(contentWrapper).toHaveClass("closed");
    expect(contentWrapper).not.toHaveClass("open");
    expect(screen.getByText("v")).toBeInTheDocument();

    // Click to open again
    fireEvent.click(button);
    expect(contentWrapper).toHaveClass("open");
    expect(contentWrapper).not.toHaveClass("closed");
    expect(screen.getByText("−")).toBeInTheDocument();
  });
});
