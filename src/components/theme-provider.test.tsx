import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ThemeProvider } from "./theme-provider";

// Mock next-themes to isolate the wrapper logic
vi.mock("next-themes", () => ({
  ThemeProvider: ({ children, attribute, defaultTheme, ...props }: any) => (
    <div
      data-testid="mock-next-themes-provider"
      data-attribute={attribute}
      data-default-theme={defaultTheme}
      {...props}
    >
      {children}
    </div>
  ),
}));

describe("ThemeProvider", () => {
  it("renders children correctly", () => {
    const testMessage = "Test Child Content";

    render(
      <ThemeProvider>
        <div>{testMessage}</div>
      </ThemeProvider>
    );

    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  it("passes props to NextThemesProvider", () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="system">
        <div>Content</div>
      </ThemeProvider>
    );

    const provider = screen.getByTestId("mock-next-themes-provider");
    expect(provider).toHaveAttribute("data-attribute", "class");
    expect(provider).toHaveAttribute("data-default-theme", "system");
  });
});
