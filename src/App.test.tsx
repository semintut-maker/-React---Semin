/** @format */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import App from "./App";
import type { Launch } from "./types/launch";

const mockLaunches: Launch[] = [
  {
    flight_number: 1,
    mission_name: "Starlink 2",
    launch_year: "2020",
    rocket: { rocket_name: "Falcon 9" },
    links: { mission_patch_small: "test.jpg", mission_patch: "test.jpg" },
    details: "Launch of Starlink 2",
  },
  {
    flight_number: 2,
    mission_name: "Crew Dragon In Flight Abort",
    launch_year: "2020",
    rocket: { rocket_name: "Falcon 9" },
    links: { mission_patch_small: "test.jpg", mission_patch: "test.jpg" },
    details: "In-flight abort test",
  },
];

describe("App", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockLaunches),
        }),
      ),
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("отображает заголовок страницы", () => {
    render(
      <MantineProvider>
        <App />
      </MantineProvider>,
    );
    expect(screen.getByText("SpaceX Launches 2020")).toBeInTheDocument();
  });

  it("отображает карточки после загрузки данных", async () => {
    render(
      <MantineProvider>
        <App />
      </MantineProvider>,
    );
    await waitFor(() => {
      expect(screen.getByText("Starlink 2")).toBeInTheDocument();
      expect(
        screen.getByText("Crew Dragon In Flight Abort"),
      ).toBeInTheDocument();
    });
    expect(screen.getAllByText("Falcon 9")).toHaveLength(2);
  });

  it("обрабатывает ошибку загрузки", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new Error("Network error"))),
    );
    render(
      <MantineProvider>
        <App />
      </MantineProvider>,
    );
    await waitFor(() => {
      expect(screen.getByText("Failed to load launches")).toBeInTheDocument();
    });
  });
});
