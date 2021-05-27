import { min, setSeconds } from "date-fns";
import getSeconds from "date-fns/getSeconds";
import format from "date-fns/format";
import { toDate } from "../services/Booking.service";
export const getWorkingDays = (services, mode) => {
  const prepareString = (day) => {
    var temp = null;
    temp = day.charAt(0).toUpperCase() + day.slice(1, 3).toLowerCase();
    return temp;
  };

  var servicesWorkingDays = [];
  var serviceWorkingDays = [];

  if (mode === "view-company") {
    services.map((service) => {
      service.data.workingDays.map((weekDay) => {
        const day = prepareString(weekDay.day);

        weekDay.working == true && serviceWorkingDays.push(day);
      });

      servicesWorkingDays.push(serviceWorkingDays);
      serviceWorkingDays = [];
    });
  } else {
    services.workingDays.map((weekDay) => {
      const day = prepareString(weekDay.day);
      weekDay.working == true && serviceWorkingDays.push(day);
    });
    servicesWorkingDays.push(serviceWorkingDays);
  }

  return servicesWorkingDays;
};
export const getWorkingHours = (services, mode, day) => {
  var openHours = [];
  var closeHours = [];

  if (mode === "view-company") {
    services.map((service) => {
      service.data.workingDays.map((weekDay) => {
        weekDay.working == true && openHours.push(toDate(weekDay.openTime));
        weekDay.working == true && closeHours.push(toDate(weekDay.closeTime));
      });
    });
  } else if (mode === "book-service") {
    services.workingDays.map((weekDay) => {
      weekDay.working == true &&
        weekDay.day == day &&
        openHours.push(toDate(weekDay.openTime)) &&
        closeHours.push(toDate(weekDay.closeTime));
    });
  } else {
    services.workingDays.map((weekDay) => {
      weekDay.working == true && openHours.push(toDate(weekDay.openTime));
      weekDay.working == true && closeHours.push(toDate(weekDay.closeTime));
    });
  }

  return [min(openHours), min(closeHours)];
};
