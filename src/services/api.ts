/** @format */

import type { Launch } from "../types/launch";

export const fetchLaunchesByYear = async (year: number): Promise<Launch[]> => {
  const response = await fetch("/launches-2020.json");
  if (!response.ok) throw new Error("Failed to load mock data");
  const data = await response.json();
  return data.filter((launch: Launch) => launch.launch_year === String(year));
};
