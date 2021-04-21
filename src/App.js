import React, { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Login></Login>
    </>
  );
}

export default App;
