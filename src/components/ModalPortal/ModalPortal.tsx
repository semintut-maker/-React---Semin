/** @format */

import ReactDOM from "react-dom";
import { Button } from "@mantine/core";
import { useEffect } from "react";
import type { Launch } from "../../types/launch";
import starlink2 from "../../assets/images/starlink 2.webp";
import crewDragon from "../../assets/images/crew dragon.webp";
import starlink3 from "../../assets/images/starlink 3.webp";
import starlink4 from "../../assets/images/starlink 4.webp";
import crs20 from "../../assets/images/crs-20.webp";
import starlink5 from "../../assets/images/starlink 5.webp";

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

interface ModalPortalProps {
  opened: boolean;
  onClose: () => void;
  launch: Launch | null;
}

export const ModalPortal = ({ opened, onClose, launch }: ModalPortalProps) => {
  const modalRoot = document.getElementById("modal-root");

  useEffect(() => {
    if (opened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  if (!opened || !launch || !modalRoot) return null;

  const image = getImage(launch.mission_name);

  return ReactDOM.createPortal(
    <div
      className='modal-overlay'
      onClick={onClose}>
      <div
        className='modal-content'
        onClick={(e) => e.stopPropagation()}>
        {/* Заголовок (название миссии) в левом верхнем углу */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}>
          <h2 style={{ margin: 0 }}>{launch.mission_name}</h2>
          <Button
            variant='subtle'
            onClick={onClose}
            style={{ padding: 0, minWidth: "32px" }}>
            ×
          </Button>
        </div>

        {/* Картинка по центру */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <img
            src={image}
            alt={launch.mission_name}
            style={{ width: "150px", height: "150px", objectFit: "contain" }}
          />
        </div>

        {/* Поля с информацией – метка и значение на разных строках */}
        <div>
          <p>
            <strong>Mission name: </strong>
            <br />
            {launch.mission_name}
          </p>
          <p>
            <strong>Rocket name:</strong>
            <br />
            {launch.rocket?.rocket_name}
          </p>
          <p>
            <strong>Details:</strong>
            <br />
            {launch.details || "No details available"}
          </p>
        </div>
      </div>
    </div>,
    modalRoot,
  );
};
