import React, { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

// Create a context
const ThemeContext = createContext();

const HooksDemo = () => {
  return (
    <Router>
      <ThemeContext.Provider value={{ theme: "light" }}>
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1>React Hooks & Routing Demo</h1>
          <nav>
            <Link to="/">Home</Link> | <Link to="/counter">Counter</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/counter" element={<Counter />} />
          </Routes>
        </div>
      </ThemeContext.Provider>
    </Router>
  );
};

const Home = () => <h2>Welcome to the Home Page</h2>;

const Counter = () => {
  // useState hook
  const [count, setCount] = useState(0);

  // useEffect hook
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div>
      <h2>Counter Page</h2>
      <h3>Count: {count}</h3>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <ThemeComponent />
    </div>
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