// // src/theme/index.js

// src/theme/index.js
import { extendTheme } from '@chakra-ui/react';
import styles from './styles.js';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const colors = {
  brand: {
    50: '#f5f7ff',
    100: '#e0e6ff',
    200: '#c2cfff',
    300: '#a3b8ff',
    400: '#849fff',
    500: '#667fff',
    600: '#4a5f66',
    700: '#2d3f4d',
    800: '#101f33',
    900: '#000000',
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
  },
};

const theme = extendTheme({ config, colors, semanticTokens, styles });

export default theme;