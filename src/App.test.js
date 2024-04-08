// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


import React from 'react';
import { render } from '@testing-library/react';

function MyComponent() {
  return <div>Hello, World!</div>;
}

test('renders hello world', () => {
  const { getByText } = render(<MyComponent />);
  const helloWorldElement = getByText(/Hello, World!/i);
  expect(helloWorldElement).toBeInTheDocument();
});