import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

// Simple theme for testing
const theme = {
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
};

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) =>
      React.createElement(
        ChakraProvider,
        { theme },
        React.createElement(
          BrowserRouter,
          null,
          React.createElement(Story)
        )
      ),
  ],
};

export default preview;