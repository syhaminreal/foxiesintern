import { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

function ThemeDisplay() {
  const theme = useContext(ThemeContext);
  return <p>Current theme: {theme}</p>;
}

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemeDisplay />
    </ThemeContext.Provider>
  );
}
