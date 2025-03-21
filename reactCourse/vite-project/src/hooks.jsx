import React, { useState, useEffect, createContext, useContext } from "react";

// Create a context
const ThemeContext = createContext();

const HooksDemo = () => {
  // useState hook
  const [count, setCount] = useState(0);

  // useEffect hook
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <ThemeContext.Provider value={{ theme: "light" }}>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>React Hooks Demo</h1>
        <h2>Count: {count}</h2>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <ThemeComponent />
      </div>
    </ThemeContext.Provider>
  );
};

const ThemeComponent = () => {
  // useContext hook
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ marginTop: "20px", padding: "10px", border: "1px solid black" }}>
      <h3>Current Theme: {theme}</h3>
    </div>
  );
};

export default HooksDemo;
