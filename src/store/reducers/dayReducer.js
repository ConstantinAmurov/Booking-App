import { ADDTIME } from "../actions/actionTypes";

const initialState = {
  days: [
    { day: "SUNDAY", working: true, openTime: "09:00", closeTime: "18:00" },
    { day: "MONDAY", working: true, openTime: "09:00", closeTime: "18:00" },
    { day: "TUESDAY", working: true, openTime: "09:00", closeTime: "18:00" },
    { day: "WEDNESDAY", working: true, openTime: "09:00", closeTime: "18:00" },
    { day: "THURSDAY", working: true, openTime: "09:00", closeTime: "18:00" },
    { day: "FRIDAY", working: true, openTime: "09:00", closeTime: "18:00" },
    { day: "SATURDAY", working: true, openTime: "09:00", closeTime: "18:00" },
  ],
};

const dayReducer = (state = initialState, action) => {
  if (action.type === ADDTIME) {
    return { ...state, days: action.filteredState };
  }
  return state;
};

export default dayReducer;
