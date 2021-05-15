import { addCompany } from "./DatabaseContext";
import { addServices } from "./DatabaseContext";

export async function saveCompany(newCompany, services, servicesDayWorking) {
  var AddedServicesIDs = [];
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
    }
    try {
      await addCompany({ newCompany, AddedServicesIDs });
    } catch (error) {
      console.log("ERROR AT ADDING COMPANY");
    }
  }
}
