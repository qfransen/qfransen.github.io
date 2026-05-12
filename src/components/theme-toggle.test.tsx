import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "./theme-toggle";
import { useTheme } from "next-themes";
import type { UseThemeProps } from "next-themes";
import { vi } from "vitest";

vi.mock("next-themes", () => ({
  useTheme: vi.fn(),
}));

describe("ThemeToggle", () => {
  const mockSetTheme: UseThemeProps["setTheme"] = vi.fn();

  const mockUseTheme = (resolvedTheme: "light" | "dark") => {
    vi.mocked(useTheme).mockReturnValue({
      themes: ["light", "dark"],
      setTheme: mockSetTheme,
      resolvedTheme,
      theme: resolvedTheme,
      systemTheme: undefined,
      forcedTheme: undefined,
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render successfully", () => {
    mockUseTheme("light");

    render(<ThemeToggle />);
    expect(
      screen.getByRole("button", { name: /toggle theme/i }),
    ).toBeInTheDocument();
  });

  it("should switch to dark theme when current theme is light", () => {
    mockUseTheme("light");

    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: /toggle theme/i }));

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("should switch to light theme when current theme is dark", () => {
    mockUseTheme("dark");

    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: /toggle theme/i }));

    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });
});
