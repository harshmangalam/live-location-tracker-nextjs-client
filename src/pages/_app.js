import { Box, ChakraProvider, Container, VStack } from "@chakra-ui/react";
import AppProvider from "../AppProvider";
import Header from "../components/Header"
import theme from "../theme"
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AppProvider>
        <VStack>
          <Box w="full" maxW="container.md" minH="100vh"  p="4">
            <Header />
            <Component {...pageProps} />
          </Box>
        </VStack>
      </AppProvider>
    </ChakraProvider>
  );
}
export default MyApp;
