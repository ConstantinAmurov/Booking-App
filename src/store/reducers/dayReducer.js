import {
  UPDATEWORKINGSTATE,
  ADDNEWSERVICE,
  UPDATEOPENTIMESTATE,
  UPDATECLOSETIMESTATE,
} from "../actions/actionTypes";

//initialState = day
const newState = [
  { day: "SUNDAY", working: true, openTime: "09:00", closeTime: "18:00" },
  { day: "MONDAY", working: true, openTime: "09:00", closeTime: "18:00" },
  {
    day: "TUESDAY",
    working: true,
    openTime: "09:00",
    closeTime: "18:00",
  },
  {
    day: "WEDNESDAY",
    working: true,
    openTime: "09:00",
    closeTime: "18:00",
  },
  {
    day: "THURSDAY",
    working: true,
    openTime: "09:00",
    closeTime: "18:00",
  },
  { day: "FRIDAY", working: true, openTime: "09:00", closeTime: "18:00" },
  {
    day: "SATURDAY",
    working: true,
    openTime: "09:00",
    closeTime: "18:00",
  },
];

const initialState = [
  [
    { day: "SUNDAY", working: true, openTime: "09:00", closeTime: "18:00" },
    { day: "MONDAY", working: true, openTime: "09:00", closeTime: "18:00" },
    {
      day: "TUESDAY",
      working: true,
      openTime: "09:00",
      closeTime: "18:00",
    },
    {
      day: "WEDNESDAY",
      working: true,
      openTime: "09:00",
      closeTime: "18:00",
    },
    {
      day: "THURSDAY",
      working: true,
      openTime: "09:00",
      closeTime: "18:00",
    },
    { day: "FRIDAY", working: true, openTime: "09:00", closeTime: "18:00" },
    {
      day: "SATURDAY",
      working: true,
      openTime: "09:00",
      closeTime: "18:00",
    },
  ],
];

const dayReducer = (state = [...initialState], action) => {
  if (action.type === UPDATEWORKINGSTATE) {
    const { index, day, isWorking } = action.payload;
    console.log("UPDATE STATE", initialState);
    const modifiedServiceState = state[index].map((serviceDay) => {
      if (serviceDay.day === day) {
        serviceDay.working = isWorking;
        return serviceDay;
      } else return serviceDay;
    });
    state[index] = modifiedServiceState;
    return [...state];
  }

  if (action.type === UPDATEOPENTIMESTATE) {
    const { index, day, value } = action.payload;
    const modifiedServiceState = state[index].map((serviceDay) => {
      if (serviceDay.day === day) {
        serviceDay.openTime = value;
        return serviceDay;
      } else return serviceDay;
    });
    state[index] = modifiedServiceState;
    return [...state];
  }

  if (action.type === UPDATECLOSETIMESTATE) {
    const { index, day, value } = action.payload;
    const modifiedServiceState = state[index].map((serviceDay) => {
      if (serviceDay.day === day) {
        serviceDay.closeTime = value;
        return serviceDay;
      } else return serviceDay;
    });
    state[index] = modifiedServiceState;
    return [...state];
  }

  if (action.type === ADDNEWSERVICE) {
    const newService = [];
    newState.forEach((day) => newService.push({ ...day }));
    return [...state, [...newService]];
  }

  return state;
};

export default dayReducer;
