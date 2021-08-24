import React,{useCallback} from 'react';
import AppConfig from '../../config/config.js';
import { reactLocalStorage } from 'reactjs-localstorage';
import debounce from "lodash.debounce";
import { isMobile } from 'react-device-detect';

const url = AppConfig.apiLoc;
const api_version = AppConfig.api_version;

export function getLandingPage(){
    return fetch(url+'referral/fetch_landing_page', {   
        method: 'GET',
        headers: { 
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': api_version
        }
        }).then((response) => response.json()).then((responseJson) => {  
        let status_code = responseJson.status_code;
        if(status_code == 200){
        return responseJson;
        }else{
            return false;
        }
        }).catch((error) => {
            return false; 
            //console.log("Error"+error);
        });
}

export function getHospitalProfile(id,type){
    return fetch(url+'referral/fetch_user_activity?all_referral='+type+'&referred_client_master_id='+id, {   
        method: 'GET',
        headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': api_version
        }
        }).then((response) => response.json()).then((responseJson) => {  
        let status_code = responseJson.status_code;
        if(status_code == 200){
        // console.log('comming for return')
        return responseJson;
        }else{
            return false;
        }
        }).catch((error) => {
            return false; 
            //console.log("Error"+error);
        });
}

export function getActivities(type){ 
    return fetch(url+'referral/fetch_user_activity?all_referral='+type, {   
        method: 'GET',
        headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': api_version
        }
        }).then((response) => response.json()).then((responseJson) => {  
        let status_code = responseJson.status_code;
        if(status_code == 200){
        // console.log('comming for return')
        return responseJson;
        }else{
            return false;
        }
        }).catch((error) => {
            return false; 
            //console.log("Error"+error);
        });
}

export function getFcmToken(type){ 
    return fetch(url+'fcm/token', {   
        method: 'GET',
        headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': api_version
        }
        }).then((response) => response.json()).then((responseJson) => {  
        let status_code = responseJson.status_code;
        if(status_code == 200){
        // console.log('comming for return')
        return responseJson.data.token;
        }else{
            return false;
        }
        }).catch((error) => {
            return false; 
            //console.log("Error"+error);
        });
}

export function getActivityDetail(id){
    return fetch(url+'referral/fetch_user_activity?all_referral=true&master_referral_discussion_id='+id, {   
        method: 'GET',
        headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': api_version
        }
        }).then((response) => response.json()).then((responseJson) => {  
        let status_code = responseJson.status_code;
        if(status_code == 200){
        // console.log('comming for return')
        return responseJson;
        }else{
            return false;
        }
        }).catch((error) => {
            return false; 
            //console.log("Error"+error);
        });
}

export function submitForms(details){ 
    return fetch(url+'referral/add_referral_discussion', {   
        method: 'POST',
        body: JSON.stringify(details), 
        headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': api_version
        }
        }).then((response) => response.json()).then((responseJson) => {  
        let status_code = responseJson.status_code;
        if(status_code == 200){
        // console.log('comming for return')
        return responseJson;
        }else{
            return false;
        }
        }).catch((error) => {
            return false; 
            //console.log("Error"+error);
        });
}

export function submitReInnitiateForms(details){ 
    return fetch(url+'referral/reInitiate_referral_discussion', {   
        method: 'POST',
        body: JSON.stringify(details), 
        headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': api_version
        }
        }).then((response) => response.json()).then((responseJson) => {  
        let status_code = responseJson.status_code;
        if(status_code == 200){
        // console.log('comming for return')
        return responseJson;
        }else{
            return false;
        }
        }).catch((error) => {
            return false; 
            //console.log("Error"+error);
        });
}

export function updateDiscussToReferStatus(history,id){ 
    let historyData = history
    let formdata = new FormData(); 
    formdata.append("master_referral_discussion_id", id)
    return fetch(url+'referral/update_discuss_to_refer', {   
        method: 'POST',
        body: JSON.stringify({'master_referral_discussion_id':id}), 
        headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': api_version
        }
        }).then((response) => response.json()).then((responseJson) => {  
        let status_code = responseJson.status_code;
        if(status_code == 200){
        // console.log('comming for return')
        if(historyData){
            historyData.push({
                pathname: '/ReInitiateRefer/'+ id 
            })
        }
        return responseJson;
        }else{
            alert("Unable To Update Status. Reload Page Again")
            return false;
        }
        }).catch((error) => {
            return false; 
            //console.log("Error"+error);
        });
}

export function useDebounce(callback, delay) {
    const debouncedFn = useCallback(
      debounce((...args) => callback(...args), delay),
      [delay]
    );
    return debouncedFn;
}

// export const debounce = function(callback,timeDiff){
//     let timer;
//     return function(){
//         let context = this;
//         clearTimeout(timer);
//         timer = setTimeout(()=>(
//             callback
//         ),timeDiff)
//     }
// } 

export function redirectToHospitalProfile(history,id){
    if(id && history){
        return( 
            history.push({
                pathname: '/HospitalProfile/' + id
            })
        )
    }
    return false
}

export function redirectToDiscussAndRefer(history){
    if(history){
        return( 
            history.push({
                pathname: '/DiscussAndRefer'
            })
        )
    }
    return false
}

export function redirectToDashboard(history){
    if(history){
        return( 
            history.push({
                pathname: '/Dashboard'
            })
        )
    }
    return false
}

export function redirectToLogin(history){
    if(history){
        return( 
            history.push({
                pathname: '/'
            })
        )
    }
    return false
}

export function redirectToActivity(history,type){
    if(type && history){
        return( 
            history.push({
                pathname: '/Activities/' + type
            })
        )
    }
}

export function redirectToReferForm(history,id){
    if(id && history){
        return( 
            history.push({
                pathname: '/ReferForm/' + id, 
            })
        )
    }
    return false
}

  
export function redirectToDiscussForm(history,id){
    if(id && history){
        return( 
            history.push({
                pathname: '/DiscussForm/' + id, 
            })
        )
    }
    return false
}

export function redirectToReferalThankYou(history,id){
    if(id && history){
        return( 
            history.push({
                pathname: '/ReferThankYou/' + id 
            })
        )
    }
    return false
}

export function redirectToReferalReinitiate(history,id){
    if(id && history){ 
        return( 
            history.push({
                pathname: '/ReInitiateRefer/'+ id
            })
        )
    }
    return false
}

export function redirectToNotFound(history){
    if(history){ 
        return( 
            history.push({
                pathname: '/PageNotFound/'
            })
        )
    }
    return false
}

export function redirectToUnavailable(history,con_url){
    if(history&&con_url){ 
        return( 
            history.push({
                pathname: '/Unavailable/'+con_url
            })
        )
    }
    return false
}

export function onPreviewClick(url){
    if(url){ 
        var win = window.open(url, '_blank');
        if (win) {
            //Browser has allowed it to be opened
            win.focus();
        } else {
            //Browser has blocked it
            alert('Please allow popups for this website');
        }
    }
    return false;
}


export const setDescription = (str) =>{ 
    // console.log("in set desi")
    let description = str
    if(str.length > 100) {
      description = str.substring(0,100)+'...';
    }
    return description;
}

export function getFeedDetils(id){ 
    return fetch(url+'knwlg/feedDetail?type_id=' + id + '&type=comp', {   
        method: 'GET',
        headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': api_version
        }
        }).then((response) => response.json()).then((responseJson) => {  
        let status_code = responseJson.status_code;
        if(status_code == 200){
        // console.log('comming for return')
        return responseJson;
        }else{
            return false;
        }
        }).catch((error) => {
            return false; 
            //console.log("Error"+error);
        });
}

export function getAds(id, type){ 
    let bannerType = 1;
    if(isMobile){
        bannerType =  2;
    }
    return fetch(url+'banner/data?banner_type='+bannerType+'&content_type_id='+id+'&content_type='+type, {   
        method: 'GET',
        headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': api_version
        }
        }).then((response) => response.json()).then((responseJson) => {  
        let status_code = responseJson.status_code;
        if(status_code == 200){
        // console.log('comming for return')
        return responseJson;
        }else{
            return false;
        }
        }).catch((error) => {
            return false; 
            //console.log("Error"+error);
        });
}

export function fetchArchiveData(id) {   
    return fetch(url + 'gr/archiveVideoList?type_id='+id+'&to=10&from=0', {
        method: 'GET',
        headers: {
            'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
            'version': api_version
        }
    }).then((response) => response.json()).then((responseJson) => {
        let status_code = responseJson.status_code;
        if (status_code == 200) {
           return responseJson;
        }else{
            return false;
        }
    }).catch((error) => {
        return error;
    });
}

export function sendOtp(isd, mobile) {
    let formdata = new FormData();
    formdata.append("isdCode", isd)
    formdata.append("mobile_no", mobile)
    return fetch(url + 'autologin/otpsend', {
        method: 'POST',
        headers: {
            'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
            'version': api_version
        },
        body: formdata,
    }).then((response) => response.json()).then((responseJson) => {
        let status_code = responseJson.status_code;
        if (status_code == 200) {
            return responseJson;
        } else {
            return false;
        }
    }).catch((error) => {

        return error;
    });
}

export async function verifyOtp(isd, mobile, otp) {
    let formdata = new FormData();
    formdata.append("isdCode", isd);
    formdata.append("phone_no", mobile);
    formdata.append("otp", otp);
    try {
        const response = await fetch(url + 'Authrjs/loginotpverify', {
            method: 'POST',
            headers: {
                'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
                'version': api_version
            },
            body: formdata,
        });
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return error;
    }
}

export async function updateProfile(isd, mobile, email, utm) {
    let formdata = new FormData();
    formdata.append("isdCode", isd);
    formdata.append("mobile_no", mobile);
    formdata.append("email", email); 
    formdata.append("utm_source", utm)
    try {
        const response = await fetch(url + 'referral/update_user_email_phone', {
            method: 'POST',
            headers: {
                'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
                'version': api_version
            },
            body: formdata,
        });
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return error;
    }
}


