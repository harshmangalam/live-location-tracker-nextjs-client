import { Box, Heading, VStack } from "@chakra-ui/react";
import LocationCoords from "../components/LocationCoords";
import React from "react";
import { useApp } from "../AppProvider";
function Location() {
  const { users, currentUser } = useApp();

  return (
    <Box>
      <Heading size="lg" my="8">
        Active Users
      </Heading>
      <VStack align="flex-start">
        {users.map((user) => (
          <LocationCoords
            isCurrentUser={user.socketId === currentUser.socketId}
            text={user.socketId}
            coords={user.coords}
          />
        ))}
      </VStack>
    </Box>
  );
}

export default Location;
