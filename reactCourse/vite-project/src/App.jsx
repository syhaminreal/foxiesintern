import React from "react";
import Counter from "./Counter.jsx";
import Props from "./Props.jsx";
 

// Use Counter inside App
const App = () => {
  return (
    <div>
      <h1>App Component</h1>
      <Counter />
      <Props/>
    </div>
  );
};

export default App;
//kj