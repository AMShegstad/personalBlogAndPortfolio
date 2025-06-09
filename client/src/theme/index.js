// // src/theme/index.js

// src/theme/index.js
import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const colors = {
  brand: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3',
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
  },
};

const semanticTokens = {
  colors: {
    background: {
      default: 'gray.50',
      _dark: 'gray.900',
    },
    text: {
      default: 'gray.800',
      _dark: 'gray.100',
    },
    primary: {
      default: 'brand.500',
      _dark: 'brand.300',
    },
  },
};

const theme = extendTheme({ config, colors, semanticTokens });

export default theme;

// import { extendTheme } from "@chakra-ui/react";

// const 

// const config = {
//   initialColorMode: "system",
//   useSystemColorMode: true,
// },
// colors: {
//   brand: {
//     50: '#f5f7ff',
//     100: '#e0e6ff',
//     200: "#c2cfff',
//     300: "#a3b8ff',
//     400: "#849fff',
//     500: "#667fff',
//     600: "#4a5f66',
//     700: "#2d3f4d',
//     800: "#101f33',
//     900: "#000000'
//   },
//   background: '#fffaf0',
//   text: '#2d3748',
// };

// const theme = extendTheme({ config });

// export default theme;