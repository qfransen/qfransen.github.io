import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn utility", () => {
  it("should handle basic string class names", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
  });

  it("should handle arrays of class names", () => {
    expect(cn(["class1", "class2"])).toBe("class1 class2");
  });

  it("should handle object conditionals", () => {
    expect(cn({ class1: true, class2: false, class3: true })).toBe(
      "class1 class3",
    );
  });

  it("should handle falsy values", () => {
    expect(cn("class1", null, undefined, false, 0, "", "class2")).toBe(
      "class1 class2",
    );
  });

  it("should override conflicting tailwind classes", () => {
    expect(cn("p-2 p-4")).toBe("p-4");
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
  });

  it("should handle complex mixed inputs", () => {
    expect(
      cn(
        "base-class",
        ["array-class1", "array-class2"],
        { "conditional-true": true, "conditional-false": false },
        null,
        "p-2 p-4 bg-red-500",
        "bg-blue-500",
      ),
    ).toBe(
      "base-class array-class1 array-class2 conditional-true p-4 bg-blue-500",
    );
  });
});
