/** @format */

import { Card, Text, Button } from "@mantine/core";
import type { Launch } from "../../types/launch";
import starlink2 from "../../assets/images/starlink 2.webp";
import crewDragon from "../../assets/images/crew dragon.webp";
import starlink3 from "../../assets/images/starlink 3.webp";
import starlink4 from "../../assets/images/starlink 4.webp";
import crs20 from "../../assets/images/crs-20.webp";
import starlink5 from "../../assets/images/starlink 5.webp";

interface LaunchCardProps {
  launch: Launch;
  onSeeMore: () => void;
}

const getImage = (missionName: string) => {
  switch (missionName) {
    case "Starlink 2":
      return starlink2;
    case "Crew Dragon In Flight Abort":
      return crewDragon;
    case "Starlink 3":
      return starlink3;
    case "Starlink 4":
      return starlink4;
    case "CRS-20":
      return crs20;
    case "Starlink 5":
      return starlink5;
    default:
      return starlink2;
  }
};

export const LaunchCard = ({ launch, onSeeMore }: LaunchCardProps) => {
  const image = getImage(launch.mission_name);
  return (
    <Card
      shadow='sm'
      padding='md'
      radius='md'
      withBorder
      style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Card.Section
        style={{ display: "flex", justifyContent: "center", padding: "16px" }}>
        <img
          src={image}
          alt={launch.mission_name}
          style={{ width: "70px", height: "70px", objectFit: "contain" }}
        />
      </Card.Section>
      <Text
        size='lg'
        fw={500}
        mt='sm'>
        {launch.mission_name}
      </Text>
      <Text
        size='sm'
        c='dimmed'
        mb='md'>
        {launch.rocket?.rocket_name}
      </Text>
      <div style={{ marginTop: "auto" }}>
        <Button
          onClick={onSeeMore}
          fullWidth
          mt='md'
          color='blue'>
          See more
        </Button>
      </div>
    </Card>
  );
};
