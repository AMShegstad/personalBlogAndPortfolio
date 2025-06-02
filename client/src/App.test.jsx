// @vitest-environment jsdom
import { render } from '@testing-library/react';
import App from './App';
import React from 'react';

test('renders App without crashing', () => {
  render(<App />);
});