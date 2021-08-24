import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import AppConfig from "../../screens/config/config";
import { dashboardConstants } from "../constants/dashboardDesktop.constant";

const url = AppConfig.apiLoc;
export const getDoctorVoice = (callback) => {
  return async (dispatch) => {
    axios({
      method: "GET",
      url: url + "dashboard/poll",
      headers: {
        Authorization: reactLocalStorage.get(
          "@ClirnetStore:refreshToken",
          true
        ),

        version: "rjsw 1.1.1",
      },
    })
      .then((response) => {
        callback(response.data);
        dispatch({
          type: dashboardConstants.DOCTOR_VOICE_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        callback(error);
        dispatch({
          type: dashboardConstants.DOCTOR_VOICE_FAILURE,
          payload: error,
        });
      });
  };
};

export const submitPollAns = (answerjson, callback) => {
  return async (dispatch) => {
    axios({
      method: "POST",
      url: url + "survey/pollAnswer",
      headers: {
        Authorization: reactLocalStorage.get(
          "@ClirnetStore:refreshToken",
          true
        ),

        version: "rjsw 1.1.1",
      },
      data: answerjson,
    })
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        callback(error);
      });
  };
};

export const addPoint = (jsonObj, callback) => {
  return async (dispatch) => {
    axios({
      method: "POST",
      url: url + "survey/addpoint",
      headers: {
        Authorization: reactLocalStorage.get(
          "@ClirnetStore:refreshToken",
          true
        ),

        version: "rjsw 1.1.1",
      },
      data: jsonObj,
    })
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        callback(error);
      });
  };
};

export const getPollResultById = (id, callback) => {
  return async (dispatch) => {
    axios({
      method: "GET",
      url: url + "survey/pollResult?id=" + id,
      headers: {
        Authorization: reactLocalStorage.get(
          "@ClirnetStore:refreshToken",
          true
        ),

        version: "rjsw 1.1.1",
      },
    })
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        callback(error);
      });
  };
};
