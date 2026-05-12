import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Navbar from "./navbar";

// Mock next/link
vi.mock("next/link", () => {
  const MockedLink = ({ href, children, ...props }: React.ComponentProps<"a">) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
  MockedLink.displayName = "MockedLink";
  return { default: MockedLink };
});

// Mock next-themes
vi.mock("@/components/theme-toggle", () => {
  const MockedThemeToggle = () => (
    <button data-testid="theme-toggle">ThemeToggle</button>
  );
  MockedThemeToggle.displayName = "MockedThemeToggle";
  return { ThemeToggle: MockedThemeToggle };
});

describe("Navbar Component", () => {
  it("renders correctly with all desktop navigation links", () => {
    render(<Navbar />);

    const homeLinks = screen.getAllByText("Home");
    const projectsLinks = screen.getAllByText("Projects");
    const cvLinks = screen.getAllByText("CV");
    const hireMeLinks = screen.getAllByText("Hire Me");

    // There are 2 of each (one desktop, one mobile)
    expect(homeLinks).toHaveLength(2);
    expect(projectsLinks).toHaveLength(2);
    expect(cvLinks).toHaveLength(2);
    expect(hireMeLinks).toHaveLength(2);

    expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
  });

  it("toggles mobile menu when hamburger icon is clicked", () => {
    render(<Navbar />);

    // Initially, the mobile menu is closed (header does not have 'is-opened' class)
    const header = screen.getByRole("banner");
    expect(header).not.toHaveClass("is-opened");

    // The hamburger button should be visible (Open Menu)
    const menuButton = screen.getByRole("button", { name: /open menu/i });
    expect(menuButton).toBeInTheDocument();

    // Click to open
    fireEvent.click(menuButton);
    expect(header).toHaveClass("is-opened");

    // Click again to close
    fireEvent.click(menuButton);
    expect(header).not.toHaveClass("is-opened");
  });

  it("closes mobile menu when a navigation link is clicked in mobile view", () => {
    render(<Navbar />);

    const header = screen.getByRole("banner");
    const menuButton = screen.getByRole("button", { name: /open menu/i });

    // Open menu
    fireEvent.click(menuButton);
    expect(header).toHaveClass("is-opened");

    // Find the mobile link (the one inside the mobile menu container)
    // The second link with 'Home' is the mobile one based on DOM order in the component
    const mobileHomeLink = screen.getAllByText("Home")[1];

    // Click the mobile link
    fireEvent.click(mobileHomeLink);

    // Menu should be closed
    expect(header).not.toHaveClass("is-opened");
  });
});
