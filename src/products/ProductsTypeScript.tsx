import React, {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
} from "react";


export interface IProducts{
    
}

export const Products: React.FC = (): React.ReactElement => {
  let userName: string = "nagesh";
  let age: number = 123;
  let dob: Date = new Date();
  let address: null = null;
  let pin: undefined = undefined;

  const hanldeClick: MouseEventHandler<HTMLButtonElement> = (): void => {
  };

  const hanldeOnChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
  };

  return (
    <div>
      <button onClick={hanldeClick}>Submit</button>
      <input type="text" onChange={hanldeOnChange} />
      some cotent {userName} {age} {dob.toDateString()} {address} {pin}
    </div>
  );
};
