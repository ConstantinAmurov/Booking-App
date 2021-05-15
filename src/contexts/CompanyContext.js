export const getWorkingDays = (services) => {
  const prepareString = (day) => {
    var temp = null;
    temp = day.charAt(0).toUpperCase() + day.slice(1, 3).toLowerCase();
    return temp;
  };

  var servicesWorkingDays = [];

  services.map((service) => {
    var serviceWorkingDays = [];

    service.data.workingDays.map((weekDay) => {
      const day = prepareString(weekDay.day);
      weekDay.working == true && serviceWorkingDays.push(day);
    });
    servicesWorkingDays.push(serviceWorkingDays);
  });

  return servicesWorkingDays;
};
export const getWorkingHours = (services) => {
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

  services.map((service) => {
    service.data.workingDays.map((weekDay) => {
      weekDay.working == true &&
        openHours.push(toDate(weekDay.openTime, "h:m").getHours());
      weekDay.working == true &&
        closeHours.push(toDate(weekDay.closeTime, "h:m").getHours());
    });
  });

  const minOpenHour = Math.min(...openHours);
  const minCloseHour = Math.min(...closeHours);

  return [minOpenHour, minCloseHour];
};
