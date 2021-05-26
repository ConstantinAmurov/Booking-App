import { db } from "../Firebase";
import firebase from "firebase/app";
import { addMilliseconds, addMinutes, isEqual } from "date-fns";
import { createIntervals, verifyAvailabity } from "../services/Booking.service";
import setMilliseconds from "date-fns/setMilliseconds";
import format from "date-fns/format";
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
export async function getCompanyById(id) {
  var company = null;
  debugger;
  await db
    .collection("companies")
    .doc(id)
    .get()
    .then((snapshot) => {
      company = snapshot.data();
      debugger;
      console.log("succesfuly  found company with id " + snapshot.id);
    });

  return company;
}
export async function getUserCompanies(companies) {
  var extractedCompanies = [];
  await db
    .collection("companies")
    .where(firebase.firestore.FieldPath.documentId(), "in", companies)
    .get()
    .then((querySnapshots) => {
      querySnapshots.forEach((doc) => extractedCompanies.push(doc.data()));
    });
  return extractedCompanies;
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
  var docRef_id;
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
      docRef_id = docRef.id;
    });

  for (const serviceId of AddedServicesIDs) {
    await editServices(serviceId, docRef_id);
  }
}

export async function editServices(serviceId, companyId) {
  await db.collection("services").doc(serviceId).update({
    companyId: companyId,
  });
}
export async function editCompany(id, editedCompany) {
  await db
    .collection("companies")
    .doc(id)
    .update({
      name: editedCompany.name,
      description: editedCompany.description,
      imgURL: editedCompany.imgURL === undefined ? null : editedCompany.imgURL,
      status: editedCompany.status,
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

export async function addService(
  company,
  editedServiceWorkingDays,
  editedService
) {
  //adding service to DB

  const service_doc_ref = await db.collection("services").add({
    serviceName: editedService.serviceName,
    description: editedService.description,
    duration: editedService.duration,
    price: editedService.price,
    capacity: editedService.capacity,
    workingDays: editedServiceWorkingDays,
  });

  //adding ID of the added service to company
  company.services.push(service_doc_ref.id);
  await db.collection("companies").doc(company.id).update({
    services: company.services,
  });
}

export async function editService(
  id,

  editedServiceWorkingDays,
  editedService
) {
  await db.collection("services").doc(id).update({
    capacity: editedService.capacity,
    description: editedService.description,
    duration: editedService.duration,
    price: editedService.price,
    serviceName: editedService.serviceName,
    workingDays: editedServiceWorkingDays,
  });
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

export async function getServicesByName(serviceName) {
  var foundServices = [];

  await db
    .collection("services")
    .where("serviceName", ">=", serviceName)
    .where("serviceName", "<", serviceName + "z")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        foundServices.push({ id: doc.id, data: doc.data() });
      });
    });

  return foundServices;
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

export async function isValidReservation(
  serviceId,
  serviceDuration,
  serviceCapacity,
  values
) {
  const { duration, capacity, hour } = values;

  const startTimeStamp = firebase.firestore.Timestamp.fromDate(hour);
  const endTimeStamp = firebase.firestore.Timestamp.fromDate(
    addMinutes(hour, duration)
  );

  var foundReservationIntervals = [];

  await db
    .collection("reservations")
    .where("serviceId", "==", serviceId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var reservation = doc.data();
        var createdIntervals = createIntervals(
          serviceDuration,
          reservation.startTime.toDate(),
          reservation.endTime.toDate()
        );

        foundReservationIntervals.push({
          intervals: createdIntervals,
          capacity: reservation.capacity,
        });
      });
    });

  if (foundReservationIntervals == null) {
    // const reservation = await db
    //   .collection("reservations")
    //   .add({
    //     serviceId: serviceId,
    //     startTime: startTimeStamp,
    //     endTime: endTimeStamp,
    //     capacity: capacity,
    //   })
    //   .then((docRef) => {
    //     console.log("Written Reservation with ID of ", docRef.id);
    //   })
    //   .catch((error) => {
    //     console.error("Error adding reservation: ", error);
    //   });
  } else {
    //algorithm for finding similar reservations and verifying their capcity
    var newReservationIntervals = createIntervals(
      serviceDuration,
      hour,
      addMinutes(hour, duration)
    );
    var valid = verifyAvailabity(
      newReservationIntervals,
      foundReservationIntervals,
      serviceCapacity,
      capacity
    );
    return valid;
  }
}

export async function addReservation(reservation) {
  debugger;
  const { capacity, totalPrice, serviceId, startTime, endTime, values } =
    reservation;
  const startTimeStamp = firebase.firestore.Timestamp.fromDate(startTime);
  const endTimeStamp = firebase.firestore.Timestamp.fromDate(endTime);

  var reservationId = null;
  await db
    .collection("reservations")
    .add({
      serviceId: serviceId,
      startTime: startTimeStamp,
      endTime: endTimeStamp,
      capacity: capacity,
      clientInfo: values,
      price: totalPrice,
    })
    .then((docRef) => {
      console.log("Written Reservation with ID of ", docRef.id);
      reservationId = docRef.id;
    })
    .catch((error) => {
      console.error("Error adding reservation: ", error);
    });

  return reservationId;
}

export async function getReservations() {
  var extractedReservations = [];
  await db
    .collection("reservations")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc, index) => {
        extractedReservations.push(doc.data());
      });
    });

  var extractedServicesIds = extractedReservations.map(
    (reservation) => reservation.serviceId
  );
  var extractedServices = await getServices(extractedServicesIds);

  var extractedCompaniesIds = extractedServices.map(
    (service) => service.data.companyId
  );

  var extractedCompanies = await getUserCompanies(extractedCompaniesIds);

  // var filteredReservations = extractedReservations.map((reservation) => {
  //   var serviceName = extractedServices.map((service) => {
  //     if (service.id === reservation.serviceId) {
  //       return service.data.serviceName;
  //     }
  //   });

  //   var companyName = extractedCompanies.map((company) => {
  //     if (company.services.includes(reservation.serviceId)) {
  //       return company.name;
  //     }
  //   });

  //   return {
  //     ...reservation,
  //     serviceName: serviceName,
  //     companyName: companyName,
  //   };
  // });

  var filteredReservations = extractedCompanies.map((company) => {
    var reservations = extractedReservations.map((reservation) => {
      return {
        ...reservation,
        serviceName: extractedServices
          .map((service) => {
            if (service.id === reservation.serviceId)
              return service.data.serviceName;
          })
          .toString(),
      };
    });

    return {
      companyName: company.name,
      reservations: reservations,
    };
  });
  return filteredReservations;
}
