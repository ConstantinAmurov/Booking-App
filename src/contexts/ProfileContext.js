import { addCompany, addServices } from "./DatabaseContext";
import firebase from "firebase/app";
import { createIntervals } from "../services/Booking.service";

export async function saveCompany(
  newCompany,
  services,
  servicesDayWorking,
  userId
) {
  const TimeStamps = servicesDayWorking.map((workingDays) => {
    var updated = workingDays.map((day) => {
      return {
        ...day,
        openTime: firebase.firestore.Timestamp.fromDate(day.openTime),
        closeTime: firebase.firestore.Timestamp.fromDate(day.closeTime),
      };
    });
    return updated;
  });

  var AddedServicesIDs = [];

  if (services === undefined) {
    await addCompany({ newCompany, AddedServicesIDs, userId });
  } else {
    const arrayOfServices = [];
    for (var i = 0; i < services.length; i++) {
      arrayOfServices[i] = {
        serviceDetails: services[i],
        serviceDayWorking: TimeStamps[i],
      };
    }

    for (const service of arrayOfServices) {
      const extractedID = await addServices(service);
      AddedServicesIDs.push(extractedID);
    }
    try {
      await addCompany({ newCompany, AddedServicesIDs, userId });
    } catch (error) {
      console.log("ERROR AT ADDING COMPANY");
    }
  }
}
