import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "./theme-toggle";
import { useTheme } from "next-themes";

jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
}));

describe("ThemeToggle", () => {
  const mockSetTheme = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully", () => {
    (useTheme as jest.Mock).mockReturnValue({
      resolvedTheme: "light",
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: /toggle theme/i })).toBeInTheDocument();
  });

  it("should switch to dark theme when current theme is light", () => {
    (useTheme as jest.Mock).mockReturnValue({
      resolvedTheme: "light",
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: /toggle theme/i }));

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("should switch to light theme when current theme is dark", () => {
    (useTheme as jest.Mock).mockReturnValue({
      resolvedTheme: "dark",
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: /toggle theme/i }));

    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });
});
