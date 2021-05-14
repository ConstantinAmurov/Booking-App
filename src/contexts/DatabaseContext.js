import { db } from "../Firebase";
import firebase from "firebase/app";

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
  var companies = [];
  await db
    .collection("companies")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        const company = { ...doc.data(), id: doc.id };

        companies.push(company);
      });
    });

  return companies;
}
export async function deleteCompany(id) {
  await db
    .collection("companies")
    .doc(id)
    .delete()
    .then(() => {
      console.log("Document successfully deleted with id :" + id);
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
}

export async function addCompany(props) {
  const { newCompany, AddedServicesIDs } = props;

  await db
    .collection("companies")
    .add({
      name: newCompany.name,
      description: newCompany.description,
      imgURL: newCompany.imgURL === undefined ? null : newCompany.imgURL,
      status: newCompany.status,
      services: AddedServicesIDs,
    })
    .then((docRef) => {
      console.log("Written Company with ID of ", docRef.id);
    });
}

export async function addServices(props) {
  const doc_ref = await db.collection("services").add({
    serviceName: props.serviceDetails.serviceName,
    description: props.serviceDetails.description,
    duration: props.serviceDetails.duration,
    price: props.serviceDetails.price,
    capacity: props.serviceDetails.capacity,
    workingDays: props.serviceDayWorking,
  });

  return doc_ref.id;
}

export async function getServices(props) {
  //props = array of IDS or one ID
  var services = [];
  if (props.length > 0) {
    await db
      .collection("services")
      .where(firebase.firestore.FieldPath.documentId(), "in", props)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          services.push({ id: doc.id, data: doc.data() });
        });
      });
  }
  return services;
}
export async function getAllServices() {
  var services = [];

  await db
    .collection("services")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        const service = { ...doc.data(), id: doc.id };

        services.push(service);
      });
    });

  return services;
}

export async function deleteService(id) {
  await db
    .collection("services")
    .doc(id)
    .delete()
    .then(() => {
      console.log("Service successfully deleted with id :" + id);
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
}
