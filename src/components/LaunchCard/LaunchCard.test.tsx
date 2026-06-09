/** @format */

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MantineProvider } from "@mantine/core";
import { LaunchCard } from "./LaunchCard";
import type { Launch } from "../../types/launch";

const mockLaunch: Launch = {
  flight_number: 99,
  mission_name: "Test Mission",
  launch_year: "2020",
  rocket: { rocket_name: "Falcon Heavy" },
  links: { mission_patch_small: null, mission_patch: null },
  details: "Test details",
};

describe("LaunchCard", () => {
  it("отображает название миссии и ракету", () => {
    render(
      <MantineProvider>
        <LaunchCard
          launch={mockLaunch}
          onSeeMore={() => {}}
        />
      </MantineProvider>,
    );
    expect(screen.getByText("Test Mission")).toBeInTheDocument();
    expect(screen.getByText("Falcon Heavy")).toBeInTheDocument();
  });

  it("вызывает onSeeMore при клике на кнопку", async () => {
    const mockOnSeeMore = vi.fn();
    const user = userEvent.setup();
    render(
      <MantineProvider>
        <LaunchCard
          launch={mockLaunch}
          onSeeMore={mockOnSeeMore}
        />
      </MantineProvider>,
    );
    const button = screen.getByRole("button", { name: /see more/i });
    await user.click(button);
    expect(mockOnSeeMore).toHaveBeenCalledTimes(1);
  });
});
