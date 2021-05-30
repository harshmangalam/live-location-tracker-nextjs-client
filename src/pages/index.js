import React, { useContext } from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import { useApp } from "../AppProvider";

function Home() {
  const { initUserLocation } = useApp();
  return (
    <Box
      minH="60vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Heading>
        Track Peer Location in Realtime using Socket.IO and browser geolocation
        API
      </Heading>
      <Box mt="9">
        <Button
          size="lg"
          onClick={() => initUserLocation()}
          variant="solid"
          colorScheme="telegram"
        >
          Track My Location
        </Button>
      </Box>
    </Box>
  );
}

export default Home;
