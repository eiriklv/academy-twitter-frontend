import React from 'react';
import { render } from '@testing-library/react';
import Login from './Login';

test('renders login header', () => {
  const { getAllByText } = render(<Login />);
  const h1Element = getAllByText(/Login/i)[0];
  expect(h1Element).toBeInTheDocument();
});
