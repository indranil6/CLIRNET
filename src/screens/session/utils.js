import AppConfig from "../config/config.js";
import { authHeader } from "../helper";
// import history from '../helper'
const api_url = AppConfig.apiLoc;

export function getTimeDifference(from) {
  let d2 = new Date();
  let d1 = new Date(from);
  let seconds = (d2 - d1) / 1000;
  return seconds.toString();
}
 
export function redirectToLiveSession(history,id){
  if(history){
      return( 
          history.push({ 
              pathname: '/LiveSession/'+id
          })
      )
  }
  return false
}

export function redirectToSessionWaitingRoom(history,id){
  if(history){
      return( 
          history.push({ 
              pathname: '/SessionWaitingRoom/'+id
          })
      )
  }
  return false
}


export function redirectToReservesession(history,id){
  if(history){
      return( 
          history.push({ 
              pathname: '/Reservesession/'+id
          })
      )
  }
  return false
}
export async function getSessionDetails(id) {
  try {
    const response = await fetch(api_url + "knwlgmastersession/sessiondetail?session_id=" + id, {
      method: "GET",
      headers: authHeader(),
    });
    const responseJson = await response.json();
    let status_code = responseJson.status_code;
    if (status_code == 200) {
      return responseJson;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export async function getRelattedMedwiki(id) {
  try {
    const response = await fetch(api_url + "knwlgmastersession/sessiondetail?session_id=" + id, {
      method: "GET",
      headers: authHeader(),
    });
    const responseJson = await response.json();
    let status_code = responseJson.status_code;
    if (status_code == 200) {
      return responseJson;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export async function submitComments(data) {
  try {
    const response = await fetch(api_url + "knwlgmastersession/submitsessioncomment", {
      method: "POST",
      headers: authHeader(),
      body:JSON.stringify(data)
    });
    const responseJson = await response.json();
    let status_code = responseJson.status_code;
    if (status_code == 200) {
      return responseJson;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export async function getComments(id) {
  try {
    const response = await fetch(api_url + "knwlgmastersession/sessioncomments?session_id="+id, {
      method: "GET",
      headers: authHeader()
    });
    const responseJson = await response.json();
    let status_code = responseJson.status_code;
    if (status_code == 200) {
      return responseJson;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}