import {
  UPDATEWORKINGSTATE,
  ADDNEWSERVICE,
  SETEDITSERVICEMODE,
  SETADDSERVICEMODE,
  UPDATEOPENTIMESTATE,
  UPDATECLOSETIMESTATE,
  RESETSTATE,
} from "../actions/actionTypes";

const openTime = new Date(2021, 5, 27, 9, 0, 0);
const closeTime = new Date(2021, 5, 27, 18, 0, 0);

//initialState = day
const newState = [
  {
    day: "SUNDAY",
    working: true,
    openTime: openTime,
    closeTime: closeTime,
  },
  {
    day: "MONDAY",
    working: true,
    openTime: openTime,
    closeTime: closeTime,
  },
  {
    day: "TUESDAY",
    working: true,
    openTime: openTime,
    closeTime: closeTime,
  },
  {
    day: "WEDNESDAY",
    working: true,
    openTime: openTime,
    closeTime: closeTime,
  },
  {
    day: "THURSDAY",
    working: true,
    openTime: openTime,
    closeTime: closeTime,
  },
  {
    day: "FRIDAY",
    working: true,
    openTime: openTime,
    closeTime: closeTime,
  },
  {
    day: "SATURDAY",
    working: true,
    openTime: openTime,
    closeTime: closeTime,
  },
];

const initialState = [
  [
    {
      day: "SUNDAY",
      working: true,
      openTime: openTime,
      closeTime: closeTime,
    },
    {
      day: "MONDAY",
      working: true,
      openTime: openTime,
      closeTime: closeTime,
    },
    {
      day: "TUESDAY",
      working: true,
      openTime: openTime,
      closeTime: closeTime,
    },
    {
      day: "WEDNESDAY",
      working: true,
      openTime: openTime,
      closeTime: closeTime,
    },
    {
      day: "THURSDAY",
      working: true,
      openTime: openTime,
      closeTime: closeTime,
    },
    {
      day: "FRIDAY",
      working: true,
      openTime: openTime,
      closeTime: closeTime,
    },
    {
      day: "SATURDAY",
      working: true,
      openTime: openTime,
      closeTime: closeTime,
    },
  ],
];

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
    const { index, day, date } = action.payload;

    const modifiedServiceState = state[index].map((serviceDay) => {
      if (serviceDay.day === day) {
        serviceDay.openTime = date;
        return serviceDay;
      } else return serviceDay;
    });
    state[index] = modifiedServiceState;
    return [...state];
  }

  if (action.type === UPDATECLOSETIMESTATE) {
    const { index, day, date } = action.payload;
    const modifiedServiceState = state[index].map((serviceDay) => {
      if (serviceDay.day === day) {
        serviceDay.closeTime = date;
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
  if (action.type === SETEDITSERVICEMODE) {
    const newState = [];
    action.services.forEach((service) => newState.push(service));
    return [...newState];
  }
  // if (action.type === SETADDSERVICEMODE) {

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
