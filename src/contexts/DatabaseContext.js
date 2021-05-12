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
  var companies = [];
  await db
    .collection("companies")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        const company = doc.data();

        companies.push(company);
      });
    });

  return companies;
}

export async function addCompany(props) {
  const { newCompany, AddedServicesIDs } = props;
  debugger;
  await db
    .collection("companies")
    .add({
      name: newCompany.name,
      description: newCompany.description,
      imgURL: newCompany.imgURL === undefined ? null : newCompany.imgURL,
      status: newCompany.status,
      services: AddedServicesIDs === undefined ? null : AddedServicesIDs,
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
  debugger;

  return doc_ref.id;
}
