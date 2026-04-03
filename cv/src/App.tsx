import { useState } from "react";
import "./App.css";

function App() {
  function CVform() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [number, setNumber] = useState("");

    return (
      <>
        <h1>CV Form</h1>
        <label>
          Your Name:{" "}
          <input
            type="text"
            onChange={(event) => setName(event.target.value)}
          ></input>
        </label>
        <label>
          Your Age:{" "}
          <input
            type="text"
            onChange={(event) => setAge(event.target.value)}
          ></input>
        </label>
        <label>
          Your Number:{" "}
          <input
            type="text"
            onChange={(event) => setNumber(event.target.value)}
          ></input>
        </label>
        {name !== "" && <p>Your name is {name}.</p>}
        {age !== "" && <p>Your age is {age}.</p>}
        {number !== "" && <p>Your phone number is {number}.</p>}
      </>
    );
  }

  return (
    <>
      <CVform />
    </>
  );
}

export default App;
