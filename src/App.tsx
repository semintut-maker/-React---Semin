/** @format */

import { useEffect } from "react";
import { MantineProvider, Container, Loader, Text } from "@mantine/core";
import { useSpaceXReducer } from "./hooks/useSpaceXReducer";
import { fetchLaunchesByYear } from "./services/api";
import { LaunchCard } from "./components/LaunchCard/LaunchCard";
import { ModalPortal } from "./components/ModalPortal/ModalPortal";
import type { Launch } from "./types/launch";
import "./App.css";

function App() {
  const [state, dispatch] = useSpaceXReducer();

  useEffect(() => {
    const loadLaunches = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const data = await fetchLaunchesByYear(2020);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        console.error(err);
        dispatch({ type: "FETCH_ERROR", payload: "Failed to load launches" });
      }
    };
    loadLaunches();
  }, [dispatch]);

  const handleSeeMore = (launch: Launch) => {
    dispatch({ type: "SELECT_LAUNCH", payload: launch });
    dispatch({ type: "SET_MODAL_OPEN", payload: true });
  };

  const handleCloseModal = () => {
    dispatch({ type: "SET_MODAL_OPEN", payload: false });
    setTimeout(() => dispatch({ type: "SELECT_LAUNCH", payload: null }), 200);
  };

  return (
    <MantineProvider>
      <Container
        size='xl'
        py='xl'>
        <h1>SpaceX Launches 2020</h1>
        {state.loading && <Loader size='xl' />}
        {state.error && <Text c='red'>{state.error}</Text>}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}>
          {state.launches.map((launch) => (
            <LaunchCard
              key={launch.flight_number}
              launch={launch}
              onSeeMore={() => handleSeeMore(launch)}
            />
          ))}
        </div>
        <ModalPortal
          opened={state.modalOpen}
          onClose={handleCloseModal}
          launch={state.selectedLaunch}
        />
      </Container>
    </MantineProvider>
  );
}

export default App;
