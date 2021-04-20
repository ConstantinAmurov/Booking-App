
import './App.css';
import Login from "./components/Login"
import React, { useState, useEffect } from "react";
import firebase from "./Firebase"

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = firebase.firestore().collection("users");

  function getUsers() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setUsers(items);
      setLoading(false);
    })
  }

  useEffect(() => {
    getUsers();
  }, []);


  if (loading) {
    return <h1>Loading...</h1>
  }

  console.log(users);
  return (
    <div>
      {


        users.map((user) => {
          return (
            <div key={user.id}>asd
              <h2>{user.firstName}</h2>
              <h3>{user.email}</h3>
            </div>
          )


        })
      }
    </div>
  );
}

export default App;
