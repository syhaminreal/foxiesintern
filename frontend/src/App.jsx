import React from 'react';
import './App.css';

// Class component (commented out since not used)
// class Components extends React.Component {
//   render() {
//     return <h2>Class Components</h2>;
//   }
// }

const Card = () => {
  return (
    <h2>Arrow function working here</h2>
  );
};

const App = () => {
  return (
    <div>
      <h1>Welcome to the App</h1>
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default App;
