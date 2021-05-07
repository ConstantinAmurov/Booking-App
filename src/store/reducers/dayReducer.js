import { ADDOPENTIME } from "../actions/actionTypes";

const initialState = { days: [] };

const dayReducer = (state = initialState, action) => {
  if (action.type === ADDOPENTIME) {
    console.log(state.days);

    debugger;
    var foundDay = state.days.filter((day) => {
      return day.day === action.day;
    });
    var otherDays = state.days.filter((day) => {
      return day.day != action.day;
    });
    debugger;
    if (foundDay.length != 0) {
      foundDay[0] = { ...foundDay[0], openTime: action.openTime };
    }

    // days: {day: action.day, openTime: action.openTime }
    //  state.map();
    return {
      ...state,
      days:
        foundDay.length > 0
          ? [...otherDays, foundDay[0]]
          : [...state.days, { day: action.day, openTime: action.openTime }],
    };
  }

  return state;
};

export default dayReducer;
