/** @format */

export interface Launch {
  flight_number: number;
  mission_name: string;
  launch_year: string;
  rocket: {
    rocket_name: string;
  };
  links: {
    mission_patch: string | null;
    mission_patch_small: string | null;
  };
  details: string | null;
}
