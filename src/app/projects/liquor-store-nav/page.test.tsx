import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import LiquorStoreNav from "./page";

// Mock global fetch
global.fetch = vi.fn();

describe("LiquorStoreNav Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();

    // Mock geolocation
    const mockGeolocation = {
      getCurrentPosition: vi.fn(),
      watchPosition: vi.fn(),
      clearWatch: vi.fn(),
    };

    Object.defineProperty(global.navigator, "geolocation", {
      value: mockGeolocation,
      configurable: true,
    });
  });

  it("shows loading state initially", () => {
    render(<LiquorStoreNav />);
    expect(screen.getByText("Getting your location...")).toBeDefined();
  });

  it("handles geolocation error", async () => {
    vi.mocked(global.navigator.geolocation.getCurrentPosition).mockImplementationOnce(
      (_, errorCallback) => {
        if (errorCallback) {
          errorCallback({
            code: 1,
            message: "User denied Geolocation",
            PERMISSION_DENIED: 1,
            POSITION_UNAVAILABLE: 2,
            TIMEOUT: 3,
          } as GeolocationPositionError);
        }
      }
    );

    render(<LiquorStoreNav />);

    await waitFor(() => {
      expect(screen.getByText("Unable to retrieve your location. Please ensure location services are enabled.")).toBeDefined();
    });
  });

  it("handles fetch stores success", async () => {
    vi.mocked(global.navigator.geolocation.getCurrentPosition).mockImplementationOnce(
      (successCallback) => {
        successCallback({
          coords: {
            latitude: 42.7325,
            longitude: -84.4822,
            accuracy: 10,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
          },
          timestamp: Date.now(),
        });
      }
    );

    const mockApiResponse = {
      elements: [
        {
          id: 1,
          lat: 42.7335,
          lon: -84.4822,
          tags: { name: "Test Liquor Store" },
        },
      ],
    };

    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    } as Response);

    render(<LiquorStoreNav />);

    // Wait for the location to load and API call to complete
    await waitFor(() => {
      expect(screen.getByText(/Found 1 store\(s\) within 2.5km:/)).toBeDefined();
    });

    expect(screen.getByText("Test Liquor Store")).toBeDefined();
    expect(screen.getByText(/111 m • N/)).toBeDefined();
  });

  it("handles empty results", async () => {
    vi.mocked(global.navigator.geolocation.getCurrentPosition).mockImplementationOnce(
      (successCallback) => {
        successCallback({
          coords: {
            latitude: 42.7325,
            longitude: -84.4822,
            accuracy: 10,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
          },
          timestamp: Date.now(),
        });
      }
    );

    const mockApiResponse = {
      elements: [], // No stores found
    };

    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    } as Response);

    render(<LiquorStoreNav />);

    await waitFor(() => {
      expect(screen.getByText("No liquor stores found within 2.5km.")).toBeDefined();
    });
  });

  it("handles fetch error", async () => {
    vi.mocked(global.navigator.geolocation.getCurrentPosition).mockImplementationOnce(
      (successCallback) => {
        successCallback({
          coords: {
            latitude: 42.7325,
            longitude: -84.4822,
            accuracy: 10,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
          },
          timestamp: Date.now(),
        });
      }
    );

    vi.mocked(global.fetch).mockRejectedValueOnce(new Error("Network Error"));

    render(<LiquorStoreNav />);

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch liquor stores. Please try again later.")).toBeDefined();
    });
  });
});
