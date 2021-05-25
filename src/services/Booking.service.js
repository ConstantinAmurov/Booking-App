import {
  addMilliseconds,
  addMinutes,
  differenceInMinutes,
  getSeconds,
  isEqual,
} from "date-fns";
import setMilliseconds from "date-fns/setMilliseconds";

export function setDuration(newDuration) {
  const duration = ["30", "60", "90", "120", "150", "180", "210"];
  if (duration.includes(newDuration)) {
    return duration;
  } else {
    duration.push(newDuration);
    duration.sort(function (a, b) {
      return a - b;
    });
    return duration;
  }
}

export function setHour(hour) {
  var seconds = convertToSeconds(hour);
  var hours = convertToHours(seconds);
}

export function convertToSeconds(hour) {
  const [hours, minutes] = hour.split(":");
  return Number(hours) * 60 * 60 + Number(minutes) * 60;
}
export function convertToHours(seconds) {
  return Math.floor(seconds / 60 / 60);
}
export function convertToMinutes(seconds) {
  var hours = Math.floor(seconds / 60 / 60);
  return Math.floor(seconds / 60);
}

export function convertSecondsToString(seconds) {
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);
  var hDisplay = hours > 0 ? hours : "00";
  var mDisplay = minutes > 0 ? minutes : "00";

  return (
    (hours < 9 ? "0" + hours : hours) +
    ":" +
    (minutes < 9 ? "0" + minutes : minutes)
  );
}
function convertMinutesToSeconds(minutes) {
  return minutes * 60;
}
function convertSecondsToMinutes(seconds) {
  return seconds / 60;
}

export function createIntervals(serviceDuration, startTime, endTime) {
  var generatedInterval = [];
  var minutesTotalWorking = differenceInMinutes(endTime, startTime);

  for (var i = 0; i < minutesTotalWorking / serviceDuration; i++) {
    if (i == 0) {
      generatedInterval.push({
        startTime: startTime,
        endTime: addMinutes(startTime, serviceDuration),
      });
    } else {
      var lastItemEndTime = generatedInterval[i - 1].endTime;
      generatedInterval.push({
        startTime: lastItemEndTime,
        endTime: addMinutes(lastItemEndTime, serviceDuration),
      });
    }
  }

  return generatedInterval;
}
export function verifyAvailabity(
  newReservationIntervals,
  foundReservationIntervals,
  totalCapacity,
  requestCapacity
) {
  var tempCapacity = [];
  var valid = false;
  newReservationIntervals.map(async (interval, index) => {
    tempCapacity[index] = 0;
    foundReservationIntervals.map((secondInterval) => {
      secondInterval.intervals.map((thirdInterval) => {
        if (
          isEqual(
            setMilliseconds(thirdInterval.startTime, 0),
            setMilliseconds(interval.startTime, 0)
          ) &&
          isEqual(
            setMilliseconds(thirdInterval.endTime, 0),
            setMilliseconds(interval.endTime, 0)
          )
        ) {
          tempCapacity[index] += secondInterval.capacity;
        }
      });
    });

    if (tempCapacity[index] + requestCapacity <= totalCapacity) {
      valid = true;
    }
  });

  return valid == true ? tempCapacity.some((el) => el < totalCapacity) : false;
}
