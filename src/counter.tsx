import { useState } from "react";

export type CounterReturnType = {
  counter: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

const useCounter = (
  intialValue: number,
  incrementBy: number
): CounterReturnType => {
  const [counter, setCounter] = useState<number>(intialValue);

  const increment = () => setCounter(counter + incrementBy);
  const decrement = () => setCounter(counter - incrementBy);
  const reset = () => setCounter(intialValue);

  return { counter, increment, decrement, reset };
};

export default useCounter;
