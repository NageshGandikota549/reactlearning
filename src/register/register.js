import { useState } from "react";

export const Register = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const [userDetails, setUserDetails] = useState(initialState);

  const hanldleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleReset = () => {
    setUserDetails(initialState);
  };

  const handleSave = () => {
    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify({
        title: "test product",
        price: 13.5,
        description: "lorem ipsum set",
        image: "https://i.pravatar.cc",
        category: "electronic",
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form  style={{ width: "25%" }}>
        <div>
          <label for="fname">First Name:{ userDetails.firstName}</label>
          <input
            type="text"
            value={userDetails.firstName}
            onChange={hanldleChange}
            name="firstName"
            id="fname"
          />
        </div>
        <div>
          <label for="lastname">Last Name:</label>
          <input
            type="text"
            value={userDetails.lastName}
            onChange={hanldleChange}
            name="lastName"
            id="lastname"
          />
        </div>
        <div>
          <label for="email">Email:</label>
          <input
            type="email"
            value={userDetails.email}
            name="email"
            id="email"
            onChange={hanldleChange}
          />
        </div>
        <div>
          <label for="password">Password:</label>
          <input
            type="password"
            value={userDetails.password}
            name="password"
            id="password"
            onChange={hanldleChange}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
          <button type="button" onClick={handleSave}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
