import getDay from "date-fns/getDay";
import { getCompanyById } from "../contexts/DatabaseContext";

function filterServicesByName(value, services) {
  const filteredServices = services.filter((service) =>
    service.serviceName.toLowerCase().includes(value.toLowerCase())
  );
  return filteredServices;
}

function filterServicesByDay(value, services) {
  var filteredServices = [];

  services.filter((service) =>
    service.workingDays.filter((day) => {
      if (day.day === value.toUpperCase() && day.working === true)
        filteredServices.push(service);
    })
  );

  return filteredServices;
}

export function filterServices(value, services, day) {
  const filteredServicesByName = filterServicesByName(value, services);
  const filteredServicesByDay = filterServicesByDay(
    getDayName(day),
    filteredServicesByName
  );

  return filteredServicesByDay;
}

export function getDayName(value) {
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var dayName = days[value];
  return dayName;
}
function getDayIndex(dayName) {
  var days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  return days.indexOf(dayName);
}

export async function filterCompaniesByServices(foundServices) {
  const foundServicesIds = foundServices.map((service) => service.id);

  const promises = foundServices.map(async (service) => {
    const foundCompany = await getCompanyById(service.companyId);
    debugger;
    return {
      ...service,
      companyName: foundCompany.name,
      companyDescription: foundCompany.description,
      imgURL: foundCompany.imgURL,
    };
  });
  debugger;
  const filteredServices = await Promise.all(promises);
  return filteredServices;
}

export function getIndexDaysWorking(workingDays) {
  var indexes = [];
  workingDays.filter((day, index) => {
    if (day.working == true) indexes.push(getDayIndex(day.day));
  });

  return indexes;
}

export function isWorking(workingDaysIndexes, date) {
  const day = getDay(date);
  return workingDaysIndexes.includes(day);
}
