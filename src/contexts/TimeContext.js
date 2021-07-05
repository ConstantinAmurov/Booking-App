export function filterOpenTime(days, weekDay, value) {
  var foundDay = days.filter((day) => {
    return day.day === weekDay;
  });
  var otherDays = days.filter((day) => {
    return day.day != weekDay;
  });

  if (foundDay.length != 0) {
    foundDay[0] = { ...foundDay[0], openTime: value, working: true };
  }
  return {
    days:
      foundDay.length > 0
        ? [...otherDays, foundDay[0]]
        : [...days, { day: weekDay, openTime: value, working: true }],
  };
}

export function filterCloseTime(days, weekDay, value) {
  var foundDay = days.filter((day) => {
    return day.day === weekDay;
  });
  var otherDays = days.filter((day) => {
    return day.day != weekDay;
  });

  if (foundDay.length != 0) {
    foundDay[0] = { ...foundDay[0], closeTime: value, working: true };
  }
  return {
    ...days,
    days:
      foundDay.length > 0
        ? [...otherDays, foundDay[0]]
        : [...days, { day: weekDay, closeTime: value, working: true }],
  };
}

export function setWorking(days, day, value) {
  const copyDays = [...days];
  for (var i in copyDays) {
    if (copyDays[i].day === day) {
      copyDays[i].working = value;
      if (value === false) {
        copyDays[i].openTime = new Date(2021, 5, 27, 9, 0, 0);
        copyDays[i].closeTime = new Date(2021, 5, 27, 18, 0, 0);
      }

      break;
    }
  }

  //return { ...days, days }; nu mergea

  return copyDays; // merge
}
