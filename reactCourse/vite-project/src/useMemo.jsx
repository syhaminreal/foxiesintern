import { useState, useMemo } from 'react';

function ExpensiveCalculation({ num }) {
  const squared = useMemo(() => {
    console.log('Calculating...');
    return num * num;
  }, [num]); // Runs only if num changes

  return <p>Squared: {squared}</p>;
}
