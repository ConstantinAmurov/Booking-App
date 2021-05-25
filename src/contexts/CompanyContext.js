import toDate from "date-fns/toDate";
import getTime from "date-fns/getTime";
import { setSeconds } from "date-fns";

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

  function toDate(dStr, format) {
    var time = new Date();
    if (format == "h:m") {
      time.setHours(dStr.substr(0, dStr.indexOf(":")));
      time.setMinutes(dStr.substr(dStr.indexOf(":") + 1));
      return time;
    } else return "Invalid Format";
  }
  if (mode === "view-company") {
    services.map((service) => {
      service.data.workingDays.map((weekDay) => {
        weekDay.working == true &&
          openHours.push(toDate(weekDay.openTime, "h:m").getHours());
        weekDay.working == true &&
          closeHours.push(toDate(weekDay.closeTime, "h:m").getHours());
      });
    });
  } else if (mode === "book-service") {
    services.workingDays.map((weekDay) => {
      weekDay.working == true &&
        weekDay.day == day &&
        openHours.push(toDate(weekDay.openTime, "h:m").getTime()) &&
        closeHours.push(toDate(weekDay.closeTime, "h:m").getTime());
    });
  } else {
    services.workingDays.map((weekDay) => {
      weekDay.working == true &&
        openHours.push(toDate(weekDay.openTime, "h:m").getTime());
      weekDay.working == true &&
        closeHours.push(toDate(weekDay.closeTime, "h:m").getTime());
    });
  }

  const minOpenHour = Math.min(...openHours);
  const minCloseHour = Math.min(...closeHours);

  return [
    setSeconds(new Date(minOpenHour), 0),
    setSeconds(new Date(minCloseHour), 0),
  ];
};
