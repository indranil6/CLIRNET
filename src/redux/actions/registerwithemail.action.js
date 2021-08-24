import axios from "axios";

import appConfig from "../../screens/config/config";
import { reactLocalStorage } from "reactjs-localstorage";
import { registerConstants } from "../constants/registerwithemail.constant";

const url = appConfig.apiLoc;
export const fetchUserDetails = (authHeader, callback) => {
  return async (dispatch) => {
    axios({
      method: "GET",
      url: url + "user/detail",
      headers: {
        Authorization: authHeader,

        version: "rjsw 1.1.1",
      },
    })
      .then((response) => {
        callback(response);
        dispatch({
          type: registerConstants.AUTHENTICATION_SUCCESS,
          payload: response,
        });
      })
      .catch((error) => {
        callback(error);
        dispatch({
          type: registerConstants.AUTHENTICATION_FAILURE,
          payload: error,
        });
      });
  };
};
export const getAllSpecialities = (callback) => {
  return async (dispatch) => {
    axios({
      method: "GET",
      url: url + "authnew/getallspeciality",
      headers: {
        Authorization: reactLocalStorage.get(
          "@ClirnetStore:refreshToken",
          true
        ),

        version: "rjsw 1.1.1",
      },
    })
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  };
};

export const compendiumShare = (callback) => {
  return async (dispatch) => {
    axios({
      method: "GET",
      url:
        url +
        "openapi/service?type=comp&type_id=" +
        reactLocalStorage.get("@ClirnetStore:redid", true) +
        "",
      headers: {
        Authorization: reactLocalStorage.get(
          "@ClirnetStore:refreshToken",
          true
        ),
        version: "rjsw 1.1.1",
      },
    })
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  };
};

export const sessionShare = (callback) => {
  return async (dispatch) => {
    axios({
      method: "GET",
      url:
        url +
        "openapi/service?type=session&type_id=" +
        reactLocalStorage.get("@ClirnetStore:redid", true) +
        "",
      headers: {
        Authorization: reactLocalStorage.get(
          "@ClirnetStore:refreshToken",
          true
        ),
        version: "rjsw 1.1.1",
      },
    })
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  };
};

export const signUpEmail = (formData, callback) => {
  return async (dispatch) => {
    axios({
      method: "POST",
      url: url + "Authrjs/signupEmail",
      data: formData,
      headers: {
        version: "rjsw 1.1.1",
      },
    })
      .then((response) => {
        callback(response);
        dispatch({
          type: registerConstants.REGISTRATION_SUCCESS,
          payload: response,
        });
      })
      .catch((error) => {
        callback(error);
        dispatch({
          type: registerConstants.REGISTRATION_FAILURE,
          payload: error,
        });
      });
  };
};
