import React, { useState, useEffect } from "react";
import firebase from "./../Firebase";

const ref = firebase.firestore().collection("users");

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  function getUsers() {
    setLoading(true);
    ref.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      setUsers(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.firstName}</h2>
          <h3>{user.email}</h3>
        </div>
      ))}
    </div>
  );
};

export default Users;
