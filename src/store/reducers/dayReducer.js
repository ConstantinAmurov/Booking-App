import {
  UPDATEWORKINGSTATE,
  ADDNEWSERVICE,
  SETEDITSERVICEMODE,
  SETADDSERVICEMODE,
  UPDATEOPENTIMESTATE,
  UPDATECLOSETIMESTATE,
  RESETSTATE,
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

// var mode = "add-service";

const dayReducer = (state = [...initialState], action) => {
  if (action.type === UPDATEWORKINGSTATE) {
    const { index, day, isWorking } = action.payload;

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
    debugger;
    return [...state];
  }

  if (action.type === ADDNEWSERVICE) {
    const newService = [];

    newState.forEach((day) => newService.push({ ...day }));
    return [...state, [...newService]];
  }
  if (action.type === SETEDITSERVICEMODE) {
    const newState = [];
    action.services.forEach((service) => newState.push(service));
    return [...newState];
  }
  // if (action.type === SETADDSERVICEMODE) {
  //   debugger;
  //   if (mode == "add-service") {
  //     return state;
  //   }
  //   mode = "add-service";
  //   const newService = [];

  //   newState.forEach((day) => newService.push({ ...day }));

  //   return [[...newService]];
  // }

  if (action.type === RESETSTATE) {
    const newService = [];

    newState.forEach((day) => newService.push({ ...day }));
    return [[...newService]];
  }

  return state;
};

export default dayReducer;
