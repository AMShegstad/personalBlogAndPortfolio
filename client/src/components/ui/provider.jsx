import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "../../theme/index.js";

export function Provider({ children }) {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config?.initialColorMode || "light"} />
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </>
  );
}