import { dashboardConstants } from "../constants/dashboardDesktop.constant";

export const dashboardReducer = (state = {}, action) => {
  switch (action.type) {
    case dashboardConstants.DOCTOR_VOICE_SUCCESS:
      return {
        ...state,
        doctor_voice_list: action.payload.data,
      };
    case dashboardConstants.DOCTOR_VOICE_FAILURE:
      return {
        ...state,
        error: action.payload.message,
      };

    default:
      return state;
  }
};
