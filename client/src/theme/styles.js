// theme/styles.js
const styles = {
  global: {
    'html, body': {
      transition: 'background-color 0.4s ease, color 0.4s ease',
      backgroundColor: 'background', // Use semantic token
      color: 'text', // Use semantic token
    },
    '*': {
      transition: 'background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease',
    },
    // Add specific transitions for common Chakra components
    '.chakra-ui-light *, .chakra-ui-dark *': {
      transition: 'background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease',
    },
  },
};

export default styles;