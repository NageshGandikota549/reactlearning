import useCounter from "../counter";

export const Dashboard = () => {
  const { counter, increment, decrement, reset } = useCounter(10, 5);

  return (
    <div>
      <div>
        <b>{counter}</b>
      </div>

      <button style={{ marginRight: "20px" }} onClick={increment}>
        Increment
      </button>
      <button style={{ marginRight: "20px" }} onClick={decrement}>
        Decrement
      </button>
      <button style={{ marginRight: "20px" }} onClick={reset}>
        Reset
      </button>
    </div>
  );
};
