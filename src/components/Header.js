import React from "react";
import {
  Button,
  Heading,
  HStack,
  Switch,
  useColorMode,
} from "@chakra-ui/react";

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack justifyContent="space-between" w="full">
      <Heading size="lg">Locate Peers</Heading>
      <HStack>
        <Switch
          defaultChecked={colorMode === "dark"}
          size="lg"
          onChange={toggleColorMode}
        />
        <Button
          variant="solid"
          colorScheme="whatsapp"
          onClick={() =>
            (window.location.href =
              "https://github.com/harshmangalam/live-location-tracker-nextjs-client")
          }
        >
          Github Repo
        </Button>
      </HStack>
    </HStack>
  );
}

export default Header;
