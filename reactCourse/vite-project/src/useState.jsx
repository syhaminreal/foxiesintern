import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // State declaration

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
