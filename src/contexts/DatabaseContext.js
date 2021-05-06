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

  db.collection("users").doc(user.uid).set({
    userId: user.uid,
    firstName: firstName,
    lastName: lastName,
    email: user.email,
  });
}

export async function getCompanies() {
  debugger;
  var companies = [];
  await db
    .collection("companies")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        debugger;
        const company = doc.data();
        debugger;
        companies.push(company);
      });
    });

  return companies;
}

export async function addCompany(props) {
  var added = false;
  await db
    .collection("companies")
    .add(props)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      added = true;
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });

  return added;
}
