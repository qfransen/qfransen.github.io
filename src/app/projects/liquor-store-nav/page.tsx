"use client";

import React, { useState, useEffect } from "react";

interface Store {
  id: number;
  lat: number;
  lon: number;
  tags: {
    name?: string;
    [key: string]: string | undefined;
  };
  distance?: number;
  direction?: string;
}

// Haversine formula to calculate distance in meters
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371e3; // Earth radius in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// Calculate bearing and cardinal direction
function getDirection(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): string {
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const lambda1 = (lon1 * Math.PI) / 180;
  const lambda2 = (lon2 * Math.PI) / 180;

  const y = Math.sin(lambda2 - lambda1) * Math.cos(phi2);
  const x =
    Math.cos(phi1) * Math.sin(phi2) -
    Math.sin(phi1) * Math.cos(phi2) * Math.cos(lambda2 - lambda1);
  const theta = Math.atan2(y, x);
  const bearing = ((theta * 180) / Math.PI + 360) % 360;

  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return directions[Math.round(bearing / 45) % 8];
}

export default function LiquorStoreNav() {
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [stores, setStores] = useState<Store[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);

  const fetchStores = async (lat: number, lon: number) => {
    setLoading(true);
    setApiError(null);
    try {
      const radius = 2500; // 2.5 km
      const query = `
        [out:json][timeout:25];
        (
          node["shop"="alcohol"](around:${radius},${lat},${lon});
          way["shop"="alcohol"](around:${radius},${lat},${lon});
          relation["shop"="alcohol"](around:${radius},${lat},${lon});
        );
        out center;
      `;
      const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // For ways and relations, overpass with 'out center;' provides lat/lon directly on the element
      const fetchedStores = data.elements.map(
        (el: {
          id: number;
          lat?: number;
          lon?: number;
          center?: { lat: number; lon: number };
          tags?: Record<string, string>;
        }) => {
          const storeLat = el.lat || el.center?.lat || 0;
          const storeLon = el.lon || el.center?.lon || 0;
          return {
            id: el.id,
            lat: storeLat,
            lon: storeLon,
            tags: el.tags || {},
            distance: calculateDistance(lat, lon, storeLat, storeLon),
            direction: getDirection(lat, lon, storeLat, storeLon),
          };
        },
      );

      // Sort stores by distance (closest first)
      fetchedStores.sort(
        (a: Store, b: Store) => (a.distance || 0) - (b.distance || 0),
      );

      setStores(fetchedStores);
    } catch {
      setApiError("Failed to fetch liquor stores. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords);
        fetchStores(position.coords.latitude, position.coords.longitude);
      },
      () => {
        setLocationError(
          "Unable to retrieve your location. Please ensure location services are enabled.",
        );
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Liquor Store Navigator</h1>
      <p className="text-muted-foreground mb-8">
        Find liquor stores within 2.5km of your current location.
      </p>

      {/* Container for content */}
      <div className="bg-card text-card-foreground rounded-lg border shadow-sm p-6">
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">
              {!location
                ? "Getting your location..."
                : "Searching for liquor stores..."}
            </p>
          </div>
        )}

        {locationError && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            {locationError}
          </div>
        )}

        {apiError && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            {apiError}
          </div>
        )}

        {!loading && !locationError && !apiError && location && (
          <div>
            {stores.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No liquor stores found within 2.5km.
              </p>
            ) : (
              <div>
                <p className="mb-4">
                  Found {stores.length} store(s) within 2.5km:
                </p>
                <ul className="space-y-3">
                  {stores.map((store) => {
                    const distanceDisplay = store.distance
                      ? store.distance >= 1000
                        ? `${(store.distance / 1000).toFixed(1)} km`
                        : `${Math.round(store.distance)} m`
                      : "Unknown distance";

                    return (
                      <li
                        key={store.id}
                        className="p-4 border rounded-md bg-card hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <strong className="text-lg">
                              {store.tags.name || "Unknown Store"}
                            </strong>
                            <div className="text-sm text-muted-foreground mt-1">
                              {distanceDisplay} - {store.direction}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
