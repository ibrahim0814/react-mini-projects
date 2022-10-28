import React, { useState } from "react";

const CounterFunctionalComponent = () => {
  const [currCount, setCurrCount] = useState(0);

  const increment = () => {
    setCurrCount((current) => current + 1);
  };

  const decrement = () => {
    setCurrCount((current) => current - 1);
  };

  return (
    <div>
      <h2>{currCount}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement} disabled={currCount === 0}>
        Decrement
      </button>
    </div>
  );
};

export default CounterFunctionalComponent;
