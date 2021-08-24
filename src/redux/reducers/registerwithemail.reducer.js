import { registerConstants } from "../constants/registerwithemail.constant";

export const registrationReducer = (state = {}, action) => {
  switch (action.type) {
    case registerConstants.REGISTRATION_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case registerConstants.REGISTRATION_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case registerConstants.AUTHENTICATION_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case registerConstants.AUTHENTICATION_FAILURE:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};
