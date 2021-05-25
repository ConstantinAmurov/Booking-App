import { addCompany, addServices, addReservation } from "./DatabaseContext";

import { createIntervals } from "../services/Booking.service";

export async function saveCompany(newCompany, services, servicesDayWorking) {
  var AddedServicesIDs = [];
  var generatedIntervals = [];
  if (services === undefined) {
    await addCompany({ newCompany, AddedServicesIDs });
  } else {
    const arrayOfServices = [];
    for (var i = 0; i < services.length; i++) {
      arrayOfServices[i] = {
        serviceDetails: services[i],
        serviceDayWorking: servicesDayWorking[i],
      };
    }

    for (const service of arrayOfServices) {
      const extractedID = await addServices(service);
      AddedServicesIDs.push(extractedID);
      generatedIntervals = createIntervals(
        service.serviceDetails.capacity,
        service.serviceDetails.duration,
        service.serviceDayWorking
      );

      // await addReservation(extractedID, generatedIntervals);
    }
    try {
      await addCompany({ newCompany, AddedServicesIDs });
    } catch (error) {
      console.log("ERROR AT ADDING COMPANY");
    }
  }
}
