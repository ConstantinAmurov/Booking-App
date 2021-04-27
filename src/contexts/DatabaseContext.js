import { db } from "../Firebase";

export function addNewUser(props, user) {
  const { firstName, lastName, email, password } = props;
  db.collection("users").doc(user.uid).set({
    userId: user.uid,
    firstName: firstName,
    lastName: lastName,
    email: email,
  });
}
export function addNewSocialUser(user) {
  const firstName = user.displayName.split(" ").slice(0, -1).join(" ");
  const lastName = user.displayName.split(" ").slice(-1).join(" ");
  debugger;
  db.collection("users").doc(user.uid).set({
    userId: user.uid,
    firstName: firstName,
    lastName: lastName,
    email: user.email,
  });
}
