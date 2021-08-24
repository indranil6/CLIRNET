import React from 'react';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner'
import HeaderStatic from '../mainscreens/HeaderStatic';
import DashboardStatic from '../mainscreens/DashboardStatic';
import Timer from 'react-compound-timer'
import $ from 'jquery';
import Form from 'react-bootstrap/Form';
import { reactLocalStorage } from 'reactjs-localstorage';
import AppConfig from '../config/config.js';
import { Helmet } from "react-helmet";
import Footer from '../mainscreens/Footer';
import Modal from 'react-bootstrap/Modal';
import Searchable from 'react-searchable-dropdown';
import { isMobile } from 'react-device-detect';
import ReactHtmlParser from 'react-html-parser';
import Slider from "react-slick";
import telemedSec2Icon1 from '../../images/telemedSec-2Icon-1.png';//telemed
import telemedSec2Icon2 from '../../images/telemedSec-2Icon-2.png';
import telemedSec2Icon3 from '../../images/telemedSec-2Icon-3.png';
import telemedSBnr from '../../images/telemedBanner.jpg';
import telemedPBnnrLogo from '../../images/telemedLOGO.png';
import download from '../../images/telemedDownload.png';
import getLink from '../../images/telemedDownloadLink.png';
import arrow from '../../images/begainArrow.png';
import mobile from '../../images/telemadePhone.png';
import telemedScreen1 from '../../images/telemed-screens-1.jpg';
import telemedScreen2 from '../../images/telemed-screens-2.jpeg';
import telemedScreen3 from '../../images/telemed-screens-3.jpeg';

import editbtn from '../../images/edit_btn_blue.png';//profile
import profileIcon1 from '../../images/my_profile_icon-1.png';
import profileIcon2 from '../../images/my_profile_icon-2.png';
import profileIcon3 from '../../images/my_profile_icon-3.png';
import profileIcon5 from '../../images/my_profile_icon-5.png';
import addPlus from '../../images/add_plus.png';


import { InlineShareButtons } from 'sharethis-reactjs'; //arcived video
import playIcon from '../../images/playIcon.png';
import likeBttn from '../../images/feedBttm_icon-1.png';
import vaultBttn from '../../images/feedBttm_icon-2.png';
import cmmntBttn from '../../images/feedBttm_icon-4.png';
import { setClientLogoRelated } from '../Common/Common.js';

import GrandRoundsDesktop from '../components/GrandRoundsDesktop.jsx';
import GrandRoundsMobile from '../components/GrandRoundsMobile.jsx';

import moment from 'moment';

const url = AppConfig.apiLoc;

var temp_token = undefined;
var browser_token = undefined;
var content_type = undefined;
var content_id = undefined;
var utm_source = undefined;
var auth_case = undefined;
var uri_user_id = undefined;
var uri_user_type = undefined;
var sign_up = true;
var verified_no = '';
var content_view = [];
var total_slider = 2;
var title_text = "Please Confirm Your Details";
var phonenoFormat = /^\d{10}$/;
let nameFormat = /^[a-zA-Z]+( [a-zA-Z]+)+$/;
var verify_mode = 'password';

const country_codes = [
  { label: "+91", value: '+91' },
  { label: "+1", value: '+1' },
  { label: "+6", value: '+6' },
  { label: "+977", value: '+977' },
  { label: "+975", value: '+975' },
  { label: "+960", value: '+960' },
  { label: "+61", value: '+61' },
  { label: "+82", value: '+82' },
  { label: "+94", value: '+94' },
  { label: "+95", value: '+95' },
];

let user_action={};
let step_counter = 1;
class Autoauth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alreadyRegistered:false,
      is_loader: true,
      sign_up: false,
      content_ready: false,
      display: false,
      showSignUpModal: true,
      full_name: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      phone_no: '',
      password: '',
      confirm_password: '',
      otp: '',
      pin_no: '',
      err_msg: '',
      isd_no: '+91',
      screen_no: 1,
      is_loader: false,
      display_call_button: false,
      terms_checkbox:true
    };
    // this.phoneInput = React.createRef();
    step_counter = 0;
    const startTime = moment(new Date().getTime()).format("HH:mm:ss");
    // let end =  "22:50:58"
    // alert("start"+end.diff(startTime))  
    // alert("start"+this.dateDiffToString("23:10:00",startTime))
    this.recordUserActivity("Execution Start::"+startTime); 
    user_action['start_time'] = startTime; 
    this.getUriParams();
    this.onInputChange = this.onInputChange.bind(this);
    this.focus = this.focus.bind(this);
  }

    recordUserActivity = (action)=>{
    user_action['user_id'] = uri_user_id; 
    user_action['user_type'] = uri_user_type;   
    user_action['Step: '+step_counter] = action;
    step_counter+=1;
    // console.log("useraction\n"+JSON.stringify(user_action))
  }

  getUtmSource() {
    let utmSource = reactLocalStorage.get('@ClirnetStore:utm_source', true);
    if (utmSource == undefined || utmSource == 'undefined' || utmSource == true || utmSource == 'true' || utmSource == '') {
      console.log("utm source not found")
      return 0;
    } else {
      // console.log("utm source:" + utmSource);
      return utmSource;
    }
  }
  
  dateDiffToString(start, end) {
    let diff = moment.duration(moment(end, "HH:mm:ss").diff(moment(start, "HH:mm:ss")));
    return Math.abs(diff.hours())+':'+Math.abs(diff.minutes())+':'+Math.abs(diff.seconds());
  }  

  componentDidMount() {
    // console.log("In component did mount")
    $('.reg_input_efect').val('');
    $(document).on("blur", ".reg_input_efect", function (event) {

      if (this.value == '') {
        $(this).parent().removeClass('regFormRowHvr').addClass('regFormRowWtoHvr');
      }
    })

    $(document).on("focus", ".reg_input_efect", function (event) {
      $(this).parent().removeClass('regFormRowWtoHvr').addClass('regFormRowHvr');
    });

    window.addEventListener('beforeunload', (ev) => {
      // this.recordUserActivity("Going to close browser");
      if (this.state.screen_no != 1) {
        this.clearLocalStorage();
      }
      ev.preventDefault();
      return ev.returnValue = 'Are you sure you want to close?';
    })

    let temp = this;
    window.addEventListener("pagehide", () => {
      if(this.props.match.params.user_type == 'doctor_master'){ 
        temp.reportTrackingData('pagehide');   
      }
    })

    try {
      let position = $(window).scrollTop();
      $(window).scroll(function () {
        let scroll = $(window).scrollTop();
        this.recordUserActivity("Scrolling window from"+position+"to"+ scroll + "px");
      });
    }
    catch (err) {
      //console.log('in catch')
    }

  }

  log(msg, val) {
    console.log(msg + "::" + val)
  }

  getUriParams() {
    this.recordUserActivity("Check parameters of URL");
    temp_token = this.props.match.params.temp_token;
    content_type = this.props.match.params.content_type;
    content_id = this.props.match.params.content_id;
    utm_source = this.props.match.params.utm_source;
    uri_user_id = this.props.match.params.user_id;
    uri_user_type = this.props.match.params.user_type;
    reactLocalStorage.set('@ClirnetStore:utm_source', utm_source);
    browser_token = reactLocalStorage.get('@ClirnetStore:refreshToken', true);
    this.checkBrowserToken();
    // console.log("uri get" + uri_user_id + "\nuri" + uri_user_type)
  }

  saveToken(token) {
    // console.log("in save token" + token)
    reactLocalStorage.set('@ClirnetStore:refreshToken', token);
  }


  componentWillUnmount(){ 
    let temp = this;
    window.removeEventListener("pagehide", temp.dummyFunction()) 
  }

  dummyFunction(){

  }

  refresh() {
    this.setState({ "display": !this.state.display });
  }

  saveDataOnLocal(responseJson) {
    this.recordUserActivity("Saving user data on local storage");
    reactLocalStorage.set('@ClirnetStore:user_master_id', responseJson.data.user_master_id);
    reactLocalStorage.set('@ClirnetStore:user_mem_id', responseJson.data.user_mem_id);
    reactLocalStorage.set('@ClirnetStore:user_name', responseJson.data.user_name);
    reactLocalStorage.set('@ClirnetStore:email', responseJson.data.email);
    reactLocalStorage.set('@ClirnetStore:mobilePrimary', responseJson.data.mobilePrimary);
    reactLocalStorage.set('@ClirnetStore:client_logo', responseJson.data.client_logo);
    reactLocalStorage.set('@ClirnetStore:first_name', responseJson.data.first_name);
    reactLocalStorage.set('@ClirnetStore:last_name', responseJson.data.last_name);
    reactLocalStorage.set('@ClirnetStore:profile_image', responseJson.data.profile_image);
    reactLocalStorage.set('@ClirnetStore:profile_type', responseJson.data.profile_type);
    reactLocalStorage.set('@ClirnetStore:phoneNumber', responseJson.data.mobilePrimary);
    this.redirectToContent(content_type, content_id);
  }

  clearLocalStorage() {
    this.recordUserActivity("Clearing data from local storage");
    reactLocalStorage.set('@ClirnetStore:user_master_id', '');
    reactLocalStorage.set('@ClirnetStore:user_mem_id', '');
    reactLocalStorage.set('@ClirnetStore:user_name', '');
    reactLocalStorage.set('@ClirnetStore:email', '');
    reactLocalStorage.set('@ClirnetStore:mobilePrimary', '');
    reactLocalStorage.set('@ClirnetStore:client_logo', '');
    reactLocalStorage.set('@ClirnetStore:first_name', '');
    reactLocalStorage.set('@ClirnetStore:last_name', '');
    reactLocalStorage.set('@ClirnetStore:profile_image', '');
    reactLocalStorage.set('@ClirnetStore:profile_type', '');
    reactLocalStorage.set('@ClirnetStore:phoneNumber', '');
    reactLocalStorage.set('@ClirnetStore:refreshToken', '');
    this.redirectToLogin();
  }

  autoPassword() {
    this.recordUserActivity("Generating auto password");
    let last_name = this.state.last_name;
    if (this.state.last_name == '' || this.state.last_name == 'undefined') {
      last_name = 'Clirnet'
    }
    let date = new Date();
    let year = date.getFullYear();
    let auto_password = year + '@' + last_name;
    return auto_password;
  }

  checkBrowserToken() {
    this.recordUserActivity("Check for token from browser");
    if (browser_token == '' || browser_token == undefined || browser_token == "true" || browser_token == true) {
      this.recordUserActivity("No token Found from browser");
      this.tokenValidation(temp_token);
    }
    else {
      this.recordUserActivity("token Found from browser");
      this.getDetail(browser_token);
    }
  }

  getDetail(token) {
    this.recordUserActivity("Requesting for new token with- user/detail API");
    fetch(url + 'user/detail', {
      method: 'GET',
      headers: {
        'Authorization': token,
        'version': 'rjsw 1.1.1'
      },
    }).then((response) => response.json()).then((responseJson) => {
      let res_code = responseJson.status_code;
      this.recordUserActivity("Successfully comming response from- user/detail API::"+res_code);
      if (res_code == 200) {
        this.saveToken(token);
        // reactLocalStorage.set('@ClirnetStore:refreshToken', token);
        this.saveDataOnLocal(responseJson);
      } else {
        // alert("Something went wrong1")
      }
    }).catch((error) => {
      console.log("Error" + error);
      this.recordUserActivity("Error comming response from- user/detail API::"+error);
    });
  }

  tokenValidation(token) {
    this.recordUserActivity("Comming for token validation with 'autologin/validate' api");
    if (token == '' || token == undefined) {
      this.recordUserActivity("Inside token validation no token found for validation");
      alert("Invalid url : null token");
      return;
    }
    fetch(url + 'autologin/validate', {
      method: 'POST',
      headers: {
        'Authorization': token,
        'version': 'rjsw 1.1.1'
      }
    }).then((response) => response.json()).then((responseJson) => {
      let responseData = responseJson.data;
      let res_code = responseJson.status_code;
      this.recordUserActivity("autologin/validate - api response comming with status code"+res_code);
      if (res_code == 200) {
        this.parseResponse(responseData, token)
      } else {
        // alert("Something went wrong6")
      }
    }).catch((error) => {
      this.recordUserActivity("autologin/validate - api response throws error"+error);
      console.log("Error" + error);
    });
  }

  checkTokenStatus(responseData, token) {
    
    let token_status = responseData.token_status;
    this.recordUserActivity("Checking token status from API response,token_status: "+token_status);
    switch (token_status) {
      case "authorized":
        console.log("full name" + responseData.first_name);
        let first_name = responseData.first_name;
        let last_name = responseData.last_name;
        let email = responseData.email;
        let mobile = responseData.mobile;
        let full_name = first_name + " " + last_name;
        reactLocalStorage.set('@ClirnetStore:auto_auth_name', first_name);
        this.setState({ "sign_up": true });
        this.setState({ "first_name": full_name });
        this.setState({ "last_name": last_name });
        this.setState({ "full_name": full_name });
        this.setState({ "email": email });
        this.fetchContent(token);
        break;
      case "unauthorized":
        this.redirectToLogin();
        break;
    }
  }



  redirectToLogin() { 
    this.recordUserActivity("Redirecting to login");
    this.props.history.push({
      pathname: '/'
    })
  }

  parseResponse(responseData, tokens) {
    let status = responseData.status;
    this.recordUserActivity("Parsing autologin/validate - API data response, Status: "+status);
    switch (status) {
      case "login":
        let res_token = responseData.token;
        // this.saveToken(res_token); 
        this.getDetail(res_token);
        break;
      case "sign_up":
        this.checkTokenStatus(responseData, tokens);
        break;
      default:
      // alert("Invalid status");
    }
  }

  startSignUp() {
    this.recordUserActivity("Sign Up started with - autologin/signup -API");
    this.setState({ 'is_loader': true });
    let first_name = this.state.first_name;
    let last_name = this.state.last_name;
    let middle_name = this.state.middle_name;
    let email = this.state.email;
    let pin_no = this.state.pin_no;
    let password = this.state.password;
    let isd_no = this.state.isd_no;
    let phone_no = this.state.phone_no;
    // console.log("first name" + first_name)

    let utm = this.getUtmSource();
    let formdata = new FormData();
    formdata.append("first_name", first_name)
    formdata.append("middle_name", "") //middle_name
    formdata.append("last_name", "") //last_name  
    formdata.append("email", email)
    formdata.append("pin_no", pin_no)
    formdata.append("device_os", 'web')
    //////////////////////////////////////////////////////new added
    formdata.append("new_password", password)
    formdata.append("isdCode", isd_no)
    formdata.append("phone_no", phone_no)
    formdata.append("utm_source", utm)
    formdata.append("user_type", uri_user_type)
    formdata.append("user_id", uri_user_id)

    fetch(url + 'autologin/signup', {
      method: 'POST',
      headers: {
        'Authorization': temp_token,
        'version': 'rjsw 1.1.1'
      },
      body: formdata,
    }).then((response) => response.json()).then((responseJson) => {
      this.reportTrackingData("sign_up");
      this.setState({ 'is_loader': false });
      let res_code = responseJson.status_code;
      this.recordUserActivity("Sign Up Response Comming with status_code: "+res_code);
      let new_token = responseJson.data.token;
      if (res_code == 203) {
        
      }
      else if (res_code == 200) {
        this.saveToken(new_token)
        this.getDetail(reactLocalStorage.get('@ClirnetStore:refreshToken', true))
      } else {
        this.setState({ 'is_loader': false });
        this.setState({ "err_msg": "Something went wrong5" })
      }
    }).catch((error) => {
      this.recordUserActivity("Sign Up Response Error: "+error);
      this.setState({ 'is_loader': false });
      console.log("Error" + error);
    });
  }

  redirectToContent(type, id) {
    this.recordUserActivity("Going to redirect on "+ type +" of id "+ id);
    switch (type) {
      case "medwiki":
        this.props.history.push({
          pathname: '/Feeddetail/' + id + ''
        })
        break;
      case "session":
        this.props.history.push({
          pathname: '/Reservesession/' + id + ''
        })
        break;
      case "survey":
        this.checkSurveyCategory(id)
        break;
      case "dashboard":
        this.props.history.push({
          pathname: '/Dashboard/'
        })
        break;
      case "profile":
        this.props.history.push({
          pathname: '/profile/'
        })
        break;
      case "telemed":
        this.fetchContent(temp_token)
        this.props.history.push({
          pathname: '/TeleMed/'
        })
        break;
      case "archived_video":
        this.props.history.push({
          pathname: '/ArchivedVideo/' + id + ''
        })
        break;
      case "Cph":
        this.props.history.push({ 
          pathname: '/CphMobile/'
        })
        break;
      case "gr":
        if (isMobile) {
          this.props.history.push({
            pathname: '/GrandRoundsMobile/' + id + ''
          })
        } else {
          this.props.history.push({
            pathname: '/GrandRoundsDesktop/' + id + ''
          })
        }
        break;
      case "login":
        this.props.history.push({
            pathname: '/'
        })
        break;
      default:
        this.recordUserActivity("Invalid content Type found when going to redirect");
        alert("Invalid content type");
    }
  }

  checkSurveyCategory(id) {
    let utm = this.getUtmSource()

    fetch(url + 'survey/detail?id=' + id + '&utm_source=' + utm + '&user_type=' + uri_user_type + '&user_id=' + uri_user_id, {
      method: 'GET',
      headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'
      }
    }).then((response) => response.json()).then((responseJson) => {

      let responseData = responseJson.data;
      responseData.map((r, index) => {
        let category = r.category;
        if (category == "poll") {
          this.props.history.push({
            pathname: '/PollDetails/' + id + ''
          })
        } else {
          this.props.history.push({
            pathname: '/SpqDetails/' + id + ''
          })
        }
      });
    }).catch((error) => {
      console.log("Error" + error);
    });
  }

  fetchContent(token) {
    let type;
    switch (content_type) {
      case "medwiki":
        type = "comp";
        break;
      case "session":
        type = "session";
        break;
      case "survey":
        type = "survey";
        break;
      case "dashboard":
        this.setState({ "content_ready": true });
        return false;
        break;
      case "profile":
        this.setState({ "content_ready": true });
        return false;
        break;
      case "telemed":
        type = "telemed";
        break;
      case "Cph":
        type = "gr";
        break;
      case "archived_video":
        type = "archived_video";
        break;
      case "gr":
        type = "gr";
        break;
      default:
        alert("Invalid content type");
    }

    let api_url = url + 'openapi/service?type=' + type + '&type_id=' + content_id + '&utm_source=' + utm_source + '&user_type=' + uri_user_type + '&user_id=' + uri_user_id
    this.recordUserActivity("Fetch content of"+type+" with :"+api_url);
    fetch(url + 'openapi/service?type=' + type + '&type_id=' + content_id + '&utm_source=' + utm_source + '&user_type=' + uri_user_type + '&user_id=' + uri_user_id, {
      method: 'GET',
      headers: {
        'Authorization': token,
        'version': 'rjsw 1.1.1'
      },
    }).then((response) => response.json()).then((responseJson) => {
      let res_code = responseJson.status_code;
      let comp_data = [];
      this.recordUserActivity("Fetch content Successfull with status code: "+res_code);
      if (res_code == 200) {
        content_view = responseJson.data;
        // this.refresh();
      }
      else {
        alert("Something went wrong4")
      }
      this.setState({ "content_ready": true });
    }).catch((error) => {
      this.recordUserActivity("Fetch content Error: "+error);
      console.log("Error" + error);
    });
  }

  onNextClick(screen) {
    this.recordUserActivity("Clicked next button to change modal screen, from screen no: "+ screen);
    this.setState({ 'err_msg': "" });
    if (!this.state.terms_checkbox) {
      this.recordUserActivity("Validation Error On changing modal screen: Please Accept Our Terms and Conditions ");
      this.setState({ 'err_msg': "Please Accept Our Terms and Conditions" });
    }  
    else if (this.state.first_name == '' || !nameFormat.test(this.state.first_name)) {  
      this.recordUserActivity("Validation error on changing modal screen: Please enter full name");
      this.setState({ 'err_msg': "Please enter full name " });
    }
    else if (this.state.email == '' && this.state.phone_no == '') {
      this.recordUserActivity("Validation error on changing modal screen: Please enter email or phone no");
      this.setState({ 'err_msg': "Please enter email or phone no" });

    } else if (this.state.phone_no !== '' && this.state.isd_no == undefined) {
      this.recordUserActivity("Validation error on changing modal screen: Please select country code");
      this.setState({ 'err_msg': "Please select country code" });
    }
    else if (this.state.phone_no !== '' && this.isPhoneNoChanged() && this.state.phone_no.match(phonenoFormat)) {
      this.checkMobile()
    }
    else if (this.state.email !== '' && this.isEmail(this.state.email)) {
      this.checkEmail(this.state.email)
    }
    else if (this.state.phone_no !== '' && this.state.phone_no.match(phonenoFormat)) {
      this.checkMobile();
    }
    else if (this.state.phone_no !== '' && !this.state.phone_no.match(phonenoFormat)) {
      this.recordUserActivity("Validation error on changing modal screen: Please Enter mobile no in correct format");
      this.setState({ 'err_msg': "Please Enter mobile no in correct format" });
    }
    else if (this.state.email !== '' && !this.isEmail(this.state.email)) {
      this.recordUserActivity("Validation error on changing modal screen: Please Enter email in correct format");
      this.setState({ 'err_msg': "Please Enter email in correct format" });
    }
    else {
      if (this.state.password == '' || this.state.confirm_password == '') {
        
        this.setState({ "password": this.autoPassword() });
        this.setState({ "confirm_password": this.autoPassword() });
      }
      if (verify_mode == "otp" && this.state.phone_no != '') {
        verify_mode = 'otp';
        this.sendOtp()
      }
      this.slideToNextPage(this.state.screen_no);
    }
  }

  slideToPrev(screen) {
    // this.setState({'err_msg':""});
    this.recordUserActivity("Change modal screen from: "+screen);
    this.setTitleText(this.state.screen_no - 1)

    this.setState({
      screen_no: screen - 1
    });
    console.log("this.state.screen_no" + this.state.screen_no)
    this.slideModal(this.state.screen_no)
  }

  slideToNextPage(screen) {
    this.recordUserActivity("Modal screen changed: "+screen);
    this.setState({ 'err_msg': "" });
    this.onDoneBtnClick();
  }

  onDoneBtnClick() {
    this.recordUserActivity("Clicked On Done Button: ");
    this.setState({ 'err_msg': "" });
    // console.log("in done:\n"+verified_no+":phone:\n"+this.state.phone_no+"email\n"+this.state.email)
    if (!this.state.terms_checkbox) {
      this.recordUserActivity("Validation Error On Done Button Click : Please Accept Our Terms and Conditions ");
      this.setState({ 'err_msg': "Please Accept Our Terms and Conditions" });
      this.slideModal(1);
    }  
    else if (this.state.first_name == '' || !nameFormat.test(this.state.first_name)) {
      this.recordUserActivity("Validation Error On Done Button Click : Please enter full name ");
      this.setState({ 'err_msg': "Please enter full name " });
      this.slideModal(1);
    }
    else if (this.state.email == '' && this.state.phone_no == '') {
      this.recordUserActivity("Validation Error On Done Button Click : Please enter email or phone no");
      this.setState({ 'err_msg': "Please enter email or phone no" });
      this.slideModal(1);

    }
    else if ((this.state.phone_no == '' || this.state.phone_no !== '' && (this.state.phone_no !== verified_no && verified_no != '')) && this.state.email !== '' && this.state.password !== this.state.confirm_password) {
      this.recordUserActivity("Validation Error On Done Button Click : Password and confirm password must be same");
      this.setState({ 'err_msg': "Password and confirm password must be same" });
      this.slideModal(2);
    }
    else {
      this.startSignUp();
    }
  }

  slideModal(screen) {
    this.recordUserActivity("Modal Screen Change From screen no"+screen);
    switch (screen) {
      case 1:
        setTimeout(() => {
          this.setCssToScreen();
        }, 100);
        return (
          this.sliderFirstScreen()
        )
      // case 2:
      //     setTimeout(() => {
      //       this.setCssToScreen();
      //     }, 100);
      //   return(
      //     this.sliderSecondScreen()
      //   );
      // case 3:
      //     setTimeout(() => {
      //       this.setCssToScreen();
      //     }, 100);
      //   return(
      //     this.sliderThirdScreen() 
      //   ); 
      default:
    }
  }


  isPhoneNoChanged() {
    let verifiedNo = verified_no;
    let newNo = this.state.phone_no;
    if (verifiedNo == newNo) {
      return false;
    } else {
      return true;
    }
  }

  onVerifyModeClick(mode) {
    this.setState({ 'err_msg': "" });
    if (this.state.phone_no == '' && verify_mode === "password") {
      this.setState({ 'err_msg': "Please enter mobile no" });
      this.slideToPrev(this.state.screen_no);
    } else {
      switch (mode) {
        case "password":
          this.sendOtp()
          verify_mode = "otp"
          break;
        case "otp":
          verify_mode = 'password'
          break;
        default:
      }
      this.setTitleText(2)
    }
  }
  toggleChange = () => {
    this.setState({
      terms_checkbox: !this.state.terms_checkbox,
    });
  }

  onInputChange = input => (val) => {
    this.recordUserActivity("Changing Input of:"+input);
    this.setState({ "err_msg": '' })
    this.setState({ alreadyRegistered:false })
    switch (input) {
      case "first_name":
        this.setState({ "first_name": val.target.value })
        break;
      case "last_name":
        this.setState({ "last_name": val.target.value })
        break;
      case "email":
        this.setState({ "email": val.target.value })
        break;
      case "phone_no":
        this.setState({ "phone_no": val.target.value })
        break;
      case "pin_no":
        this.setState({ "pin_no": val.target.value })
        break;
      case "password":
        this.setState({ "password": val.target.value })
        break;
      case "confirm_password":
        this.setState({ "confirm_password": val.target.value })
        break;
      case "otp":
        this.setState({ "otp": val.target.value })
        break;
      default:
    }
  }

  focus() {
    this.phoneInput.current.focus();
  }


  sendOtp() {
    
    this.setState({ 'otp': "" });
    this.setState({ 'err_msg': "" });
    // console.log("Send otp token" + reactLocalStorage.get('@ClirnetStore:refreshToken', true));
    if (this.state.phone_no == '' || this.state.phone_no == 'undefined') {
      this.setState({ 'err_msg': 'Please enter mobile no' });
      this.slideModal(1)
    }
    if (!this.state.phone_no.match(phonenoFormat)) {
      this.setState({ 'err_msg': 'Please Enter mobile no in correct format' });
      this.slideModal(1)
    }
    else if (this.state.isd_no == '' || this.state.isd_no == '' || this.state.isd_no == undefined) {
      this.setState({ 'err_msg': 'Please Select a country code' });
    } else {
      this.recordUserActivity("Sending OTP for mobile no varification with - autologin/otpsend - API");
      this.setState({ 'err_msg': '' });
      let formdata = new FormData();
      formdata.append("isdCode", this.state.isd_no)
      formdata.append("mobile_no", this.state.phone_no)
      this.setState({ 'is_loader': true });
      fetch(url + 'autologin/otpsend', {
        method: 'POST',
        headers: {
          'Authorization': temp_token,// reactLocalStorage.get('@ClirnetStore:refreshToken', true),
          'version': 'rjsw 1.1.1'
        },
        body: formdata,
      }).then((response) => response.json()).then((responseJson) => {
        let res_code = responseJson.status_code;
        this.recordUserActivity("Response comming of - autologin/otpsend - API with status code"+res_code);
        this.setState({ 'is_loader': false });
        if (res_code == 200) {
          // this.setState({'err_msg': 'An OTP send to your mobile number Please enter OTP'})
        }
        else {
          this.setState({ 'err_msg': 'Unable to send OTP' })
        }
      }).catch((error) => {
        this.recordUserActivity("Response Error of - autologin/otpsend - API error: "+error);
        this.setState({ 'is_loader': false });
        console.log("Error" + error);
      });
    }
  }

  sendOtpWithCall() {
    this.setState({ 'err_msg': "" });
    if (this.state.phone_no == '' || this.state.phone_no == 'undefined') {
      this.setState({ 'err_msg': 'Please enter mobile no' });
    }
    else if (!this.state.phone_no.match(phonenoFormat)) {
      this.setState({ 'err_msg': 'Please Enter mobile no in correct format' });
      this.slideModal(1)
    }
    else if (this.state.isd_no == '' || this.state.isd_no == '' || this.state.isd_no == undefined) {
      this.setState({ 'err_msg': 'Please Select a isd code' });
    } else {
      this.recordUserActivity("Sending Call for OTP - autologin/resendotpcall - API");
      this.setState({ 'err_msg': '' });
      let formdata = new FormData();
      formdata.append("isdCode", this.state.isd_no)
      formdata.append("mobile_no", this.state.phone_no)

      this.setState({ 'is_loader': true });
      fetch(url + 'autologin/resendotpcall', {
        method: 'POST',
        headers: {
          'Authorization': temp_token,//reactLocalStorage.get('@ClirnetStore:refreshToken', true),
          'version': 'rjsw 1.1.1'
        },
        body: formdata,
      }).then((response) => response.json()).then((responseJson) => {
        this.setState({ 'is_loader': false });
        let res_code = responseJson.status_code;
        this.recordUserActivity("autologin/resendotpcall - API response comming with status code: "+res_code);
        if (res_code == 200) {
          this.setState({ 'err_msg': 'Please enter OTP which get in call' })
        }
        else {
          this.setState({ 'err_msg': 'Unable to reach your number' })
        }
      }).catch((error) => {
        this.recordUserActivity("Error on response error: "+error);
        this.setState({ 'is_loader': false });
        console.log("Error" + error);
      });
    }
  }

  verifyOtp() {
    this.recordUserActivity("Comming for verify OTP: ");
    this.setState({ 'err_msg': "" });
    if (this.state.otp == '' || this.state.otp == 'undefined') {
      this.setState({ 'err_msg': 'Please enter OTP' })
    } else {
      let formdata = new FormData();
      formdata.append("isdCode", this.state.isd_no)
      formdata.append("mobile_no", this.state.phone_no)
      formdata.append("otp", this.state.otp)
      this.setState({ 'is_loader': true });

      fetch(url + 'autologin/otpverify', {
        method: 'POST',
        headers: {
          'Authorization': temp_token,
          'version': 'rjsw 1.1.1'
        },
        body: formdata,
      }).then((response) => response.json()).then((responseJson) => {
        let res_code = responseJson.status_code;
        this.recordUserActivity("Response for verify OTP: "+res_code);
        this.setState({ 'is_loader': false });
        if (res_code == 200) {
          verified_no = this.state.phone_no;
          this.setState({ 'err_msg': "Mobile no verified successfully, click DONE to finish" })
        }
        else if (res_code == 203) {
          this.setState({ 'err_msg': responseJson.message })
        }
        else {
          // alert("Something went wrong3")
        }
      }).catch((error) => {
        this.recordUserActivity("Response error for verify OTP: "+error);
        this.setState({ 'is_loader': false });
        console.log("Error" + error);
      });
    }
  }

  checkMobile() {
    this.recordUserActivity("Checking for if mobile no already exist with - autologin/check_mobile- API");
    this.setState({ 'err_msg': "" });
    if (this.state.phone_no == '' || this.state.phone_no == 'undefined') {
      this.setState({ 'err_msg': 'Please enter mobile no' })
    } if (!this.state.phone_no.match(phonenoFormat)) {
      this.recordUserActivity("Checking for if mobile no already exist, Validation error: Please Enter mobile no in correct format ");
      this.setState({ 'err_msg': 'Please Enter mobile no in correct format' });
      this.slideModal(1)
    }
    else {
      let formdata = new FormData();
      formdata.append("phone_no", this.state.phone_no)
      this.setState({ 'is_loader': true });

      fetch(url + 'autologin/check_mobile', {
        method: 'POST',
        headers: {
          'Authorization': temp_token,
          'version': 'rjsw 1.1.1'
        },
        body: formdata
      }).then((response) => response.json()).then((responseJson) => {
        let res_code = responseJson.status_code;
        this.recordUserActivity("Checking for if mobile no already exist, API status code:"+res_code);
        this.setState({ 'is_loader': false });
        if (res_code == 200) {
          if (this.state.password == '' || this.state.confirm_password == '') {
            this.setState({ "password": this.autoPassword() });
            this.setState({ "confirm_password": this.autoPassword() });
          }
          if (this.state.screen_no == 1 || this.state.screen_no == '1') {
            this.slideToNextPage(this.state.screen_no)
          }
        }
        else if (res_code == 203) {
          this.recordUserActivity("Give error in mobile number check:This mobile no is already registered");
          this.setState({ 'err_msg': "This mobile no is already registered" }); 
          this.setState({ alreadyRegistered: true});
        }
        else {
          // alert("Something went wrong3")
        }
      }).catch((error) => {
        this.recordUserActivity("Give error on API response of mobile number check:"+error);
        this.setState({ 'is_loader': false });
        console.log("Error" + error);
      });
    }
  }

  renderContent(type) {
    console.log("in render content" + type)
    switch (type) {
      case "medwiki":
        return (
          this.renderMedwiki()
        );

      case "session":
        return (
          this.renderSession()
        );

      case "survey":
        return (
          this.renderSurvey()
        )
      case "dashboard":
        return (
          this.renderDashboard()
        )
      case "profile":
        return (
          this.renderProfile()
        )
      case "telemed":
        return (
          this.renderTeleMed()
        )
      case "archived_video":
        return (
          this.renderArchivedVideo()
        )
      case "gr":
        return (
          isMobile?<GrandRoundsMobile id={content_id} token ={temp_token} history={this.props.history}/>:<GrandRoundsDesktop id={content_id} token ={temp_token} history={this.props.history}/>
          // this.renderGr()
        )
      case "Cph":
        return (
          isMobile?<GrandRoundsMobile id={content_id} token ={temp_token} history={this.props.history}/>:<GrandRoundsDesktop id={content_id} token ={temp_token} history={this.props.history}/>
          // this.renderGr()
        )
      default:
        alert("Invalid content type");
    }
  }

  checkEmail() {
    this.setState({ 'err_msg': "" });
    if (this.state.email == '' || this.state.email == 'undefined') {
      this.setState({ 'err_msg': 'Please enter email' })
    } if (!this.isEmail(this.state.email)) {
      this.setState({ 'err_msg': 'Please Enter email in correct format' });
    }
    else {
      let formdata = new FormData();
      formdata.append("email", this.state.email)
      this.setState({ 'is_loader': true });

      fetch(url + 'autologin/check_email', {
        method: 'POST',
        headers: {
          'Authorization': temp_token,
          'version': 'rjsw 1.1.1'
        },
        body: formdata
      }).then((response) => response.json()).then((responseJson) => {
        let res_code = responseJson.status_code;
        this.setState({ 'is_loader': false });

        if (res_code == 200) {
          if (this.state.password == '' || this.state.confirm_password == '') {
            this.setState({ "password": this.autoPassword() });
            this.setState({ "confirm_password": this.autoPassword() });
          }
          if (this.state.screen_no == 1 || this.state.screen_no == '1') {
            this.slideToNextPage(this.state.screen_no)
          }
        }
        else if (res_code == 203) {
          this.setState({ 'err_msg': "This email is already registered" });
          this.setState({ alreadyRegistered: true});
        }
        else {
          // alert("Something went wrong3") 
        }
      }).catch((error) => {
        this.setState({ 'is_loader': false });
        console.log("Error" + error);
      });
    }
  }

  isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  updatePassword() {
    if (this.state.password == '') {
      this.setState({ 'err_msg': 'Please enter password' });
    } else if (this.state.confirm_password == '') {
      this.setState({ 'err_msg': 'Please enter confirm password' });
    } else {
      if (this.state.password != this.state.confirm_password) {
        this.setState({ 'err_msg': 'Password and confirm password must be same' });
      } else {
        this.setState({ 'err_msg': '' });
        let formdata = new FormData();
        formdata.append("new_password", this.state.password)
        formdata.append("old_password", '')
        formdata.append("type", 'password')

        fetch(url + 'autologin/change', {
          method: 'POST',
          headers: {
            'Authorization': temp_token,//reactLocalStorage.get('@ClirnetStore:refreshToken', true),
            'version': 'rjsw 1.1.1'
          },
          body: formdata,
        }).then((response) => response.json()).then((responseJson) => {
          let res_code = responseJson.status_code;
          if (res_code == 200) {
            this.setState({ 'err_msg': 'Password updated successfully' })
            this.setState({ "showSignUpModal": false })
            // this.redirectToContent(content_type,content_id); 
            this.getDetail(reactLocalStorage.get('@ClirnetStore:refreshToken', true))
          }
          else {
            // alert("Something went wrong2")
          }
        }).catch((error) => {
          console.log("Error" + error);
        });
      }
    }
  }

  onGetOtpClick() {
    this.setState({ 'err_msg': "" });
    if (this.state.phone_no == '' || this.state.phone_no == 'null') {
      this.setState({ 'err_msg': 'Please enter mobile no' });

    } if (this.state.isd_no == '' || this.state.isd_no === 'null' || this.state.isd_no == undefined) {
      this.setState({ 'err_msg': 'Please select country code' });
    } if (!this.state.phone_no.match(phonenoFormat)) {
      this.setState({ 'err_msg': 'Please Enter mobile no in correct format' });
      this.slideModal(1)
    } if (verified_no == '' || this.isPhoneNoChanged()) {
      this.checkMobile();
    }
    else {
      if (verify_mode == 'otp') {
        this.setTitleText(2)
      } else {
        this.setTitleText(2)
      }
      verify_mode = 'otp';
      this.setState({ 'screen_no': this.state.screen_no - 1 });
      this.slideModal(this.state.screen_no)
      this.sendOtp()
    }
  }

  setCssToScreen() {
    let abc = document.getElementsByClassName('reg_input_efect');
    console.log("length" + abc.length)
    for (let i = 0; i <= abc.length; i++) {
      let inputValue = $(".regRowCount" + i).val()
      if (inputValue !== '') {
        $(".regRowCount" + i).parent().removeClass('regFormRowWtoHvr').addClass('regFormRowHvr');
      } else {
        $(".regRowCount" + i).parent().removeClass('regFormRowHvr').addClass('regFormRowWtoHvr');
      }
    }
  }

  
  reportTrackingData(closeType){
    const endTime = moment(new Date().getTime()).format("HH:mm:ss");
    this.recordUserActivity("Going to submit tracking report"+endTime);
    user_action['end_time'] = endTime; 

    let diff = this.dateDiffToString(user_action.start_time,endTime)
    user_action['duration'] = diff;  
    
    
    if (!uri_user_type && !uri_user_id) {
      alert("sorry")
      return false;
    } 
    else {
      // let formdata = new FormData();
      // formdata.append("doctor_master_id", uri_user_id);
      // formdata.append("type", uri_user_type);
      // formdata.append("body", JSON.stringify(user_action));
      // formdata.append("close_type", closeType);
      // formdata.append("start_time", user_action.start_time);
      // formdata.append("end_time", user_action.end_time); 
      // formdata.append("duration", user_action.duration);
      // fetch(url + 'autologin/skip', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': temp_token,
      //     'version': 'rjsw 1.1.1'
      //   },
      //   body: formdata
      // }).then((response) => response.json()).then((responseJson) => {
      //   // alert("reported")
      //   let res_code = responseJson.status_code;
      //   if (res_code == 200) {
      //   }
      // }).catch((error) => {
      //   console.log("Error" + error);
      // });

      let skipApiData = {};
      skipApiData.doctor_master_id = uri_user_id;
      skipApiData.type = uri_user_type;
      skipApiData.body = JSON.stringify(user_action);
      skipApiData.close_type = closeType;
      skipApiData.start_time = user_action.start_time;
      skipApiData.end_time = user_action.end_time;
      skipApiData.duration = user_action.duration;
      skipApiData.token= temp_token;
 
      var skipApiDataTemp = JSON.stringify(skipApiData);
      navigator.sendBeacon(  
        url+"/openapi/skipAutoLogin",
        skipApiDataTemp 
      );  
    }
  }

  sliderFirstScreen() {
    // console.log("isd after"+this.state.isd_no)
    let first_name = this.state.first_name;
    return (
      <>
        <div className="full_width frmPart">
          <div class="full_width form_row authLoginNAmeFld">
            <div class="full_width form_row_in regFrmRowEffct regFormRowWtoHvr">
              {(first_name == '' || first_name == 'undefined') ? null :
                <span className="font600 colorBlack authLoginNAmeFld_Span">Dr.</span>
              }
              <label class="font_14px font600 colorBlack">Full Name <span style={{ "color": "red" }}>*</span></label>
              <input type="text" class="reg_input_efect regRowCount0" name="email" autocomplete="new-password" onChange={this.onInputChange('first_name')} value={first_name} />
            </div>
          </div>
          {/* <div class="full_width form_row">
								<div class="full_width form_row_in regFrmRowEffct regFormRowWtoHvr"> 
								 <label class="font_14px font600 colorBlack">Last Name <span style={{ "color": "red" }}>*</span></label>
								 <input type="text" class="reg_input_efect regRowCount1"  onChange= {this.onInputChange('last_name')} value={this.state.last_name}/> 
								</div>
							</div> */}
          <div class="full_width form_row">
            <div class="full_width form_row_in regFrmRowEffct regFormRowWtoHvr">
              <label class="font_14px font600 colorBlack">Email</label>
              <input type="text" class="reg_input_efect regRowCount2" autocomplete="new-password" onChange={this.onInputChange('email')} value={this.state.email} />
            </div>
          </div>
          <div class="full_width form_row phoneCodePrnt">
            <Searchable
              value={this.state.isd_no} //if value is not item of options array, it would be ignored on mount
              placeholder="Select Country Code" // by default "Search"
              notFoundText="No result found" // by default "No result found"
              options={country_codes}
              className="font500 font_14px"
              onSelect={option => {
                this.dropDownChange(option.value);
              }}
              listMaxHeight={200} //by default 140
            />
            <div class="full_width form_row_in regFrmRowEffct regFormRowWtoHvr">
              <label class="font_14px font600 colorBlack">Mobile No.</label>
              <input type="tel" class="reg_input_efect regRowCount3" autocomplete="new-password" maxLength="10" onChange={this.onInputChange('phone_no')} inputRef={ref => { this.phoneInput = ref; }} value={this.state.phone_no} pattern="[6789][0-9]{9}" />
            </div>
          </div>
          {/* <div class="full_width form_row">
								<div class="full_width form_row_in regFrmRowEffct regFormRowWtoHvr"> 
								 <label class="font_14px font600 colorBlack">Pin Code</label>
								 <input class="reg_input_efect regRowCount4"  onChange= {this.onInputChange('pin_no')} value={this.state.pin_no}/> 
								</div>
							</div> */}
          <div className="full_width l_form_row">
            <div className="l_termsCondition_row">
              <input id="terms" name="accept_TC" type="checkbox" defaultChecked={this.state.terms_checkbox} onChange={this.toggleChange} className="checkbox_custom" />
              <label className="font500 font_14px  checkbox_custom_label text-dark">I Accept </label>
              <a target='_blank' href="https://doctor.clirnet.com/knowledge/registration/terms_page">Terms and Conditions</a>
            </div>
          </div>
        </div>
      </>
    );
  }

  dropDownChange(val) {
    this.recordUserActivity("Change drop down of isd_no: "+val); 
    this.setState({ "isd_no": val })
  }

  setTitleText(screen) {
    switch (screen) {
      case 1:
        title_text = "Please Confirm Your Details";
        break;
      case 2:
        if (verify_mode == 'password') {
          title_text = "Set Password";
        } else if (verify_mode == 'otp') {
          title_text = "Login via OTP";
        }
        break;
      default:
    }
    // console.log("ti???????????" + title_text)
  }

  sliderThirdScreen() {
    return (
      <>
        <div className="full_width frmPart">
          <div class="full_width form_row phoneCodePrnt">
            <Searchable
              value={this.state.isd_no} //if value is not item of options array, it would be ignored on mount
              placeholder="Select Country code" // by default "Search"
              notFoundText="Not available for this country" // by default "No result found"
              options={country_codes}
              className="font500 font_14px"
              onSelect={option => {
                this.dropDownChange(option.value);
                //  console.log(option.value); // as example - {value: '', label: 'All'}
              }}
              listMaxHeight={200} //by default 140
            />
            <div class="full_width form_row_in regFrmRowEffct regFormRowWtoHvr">
              <label class="font_14px font600 colorBlack">Enter Mobile No</label>
              <input type="tel" class="reg_input_efect regRowCount0" maxLength="10" onChange={this.onInputChange('phone_no')} value={this.state.phone_no} pattern="[6789][0-9]{9}" />
              { }
            </div>
          </div>
        </div>
      </>
    )
  }

  sliderSecondScreen() {
    // this.setCssToScreen();
    return (
      <>
        {(verify_mode == "password") ?
          <div className="full_width frmPart">
            <div class="full_width form_row">
              <div class="full_width form_row_in regFrmRowEffct regFormRowWtoHvr">
                <label class="font_14px font600 colorBlack">Password</label>
                <input class="reg_input_efect regRowCount0" type="text" onChange={this.onInputChange('password')} value={this.state.password} />
              </div>
            </div>
            <div class="full_width form_row">
              <div class="full_width form_row_in regFrmRowEffct regFormRowWtoHvr">
                <label class="font_14px font600 colorBlack">Confirm password</label>
                <input class="reg_input_efect regRowCount1" type="text" onChange={this.onInputChange('confirm_password')} value={this.state.confirm_password} />
              </div>
            </div>
          </div>
          :
          <>
            <div className="full_width frmPart">
              {(this.state.display_call_button != true) ?
                <span className="float-right">
                  <Timer className="font600 font_16px"
                    initialTime={30000}
                    direction="backward"
                    checkpoints={[
                      {
                        time: 0,
                        callback: () => this.setState({ "display_call_button": true }),
                      }
                    ]}>
                    {() => (
                      <React.Fragment>
                        0<Timer.Minutes />:
                        <Timer.Seconds />
                      </React.Fragment>
                    )}
                  </Timer>
                </span> : null}
              <div class="full_width form_row">
                <div class="full_width form_row_in regFrmRowEffct regFormRowWtoHvr">
                  <label class="font_14px font600 colorBlack">Enter OTP</label>
                  <input class="reg_input_efect regRowCount1" type="text" maxLength="4" pattern="[123456789][0-9]{9}" onChange={this.onInputChange('otp')} value={this.state.otp} required />
                </div>
              </div>

              <div className="full_width l_form_row l_form_row_dblBtn">
                {(this.state.display_call_button == true) ? <button onClick={() => { this.setState({ "is_loader": true }); this.sendOtp('send', 'text'); }} className="radius-6 font_14px font600 l_frmSubmit">Resend OTP</button>
                  : <button disabled="true" onClick={() => { this.setState({ "is_loader": true }); this.sendOtp('send', 'text'); }} className="radius-6 font_14px font600 l_frmSubmit">Resend OTP</button>
                }
                <button onClick={() => { this.verifyOtp() }} className="radius-6 font_14px font600 l_frmSubmit">Verify</button>
              </div>
              {(this.state.display_call_button == true) ?
                <div className="full_width">
                  <Form.Label className="font600 font_14px colorBlack">Did not receive OTP over message?</Form.Label>
                  <div className="full_width l_form_row l_form_row_dblBtn">
                    <button onClick={() => { this.slideToNextPage(this.state.screen_no) }} className="radius-6 font_12px font600 l_frmSubmit">Change Mobile No</button>
                    <button onClick={() => { this.setState({ "is_loader": true }); this.sendOtpWithCall() }} className="radius-6 font_12px font600 l_frmSubmit">Get OTP Via Call</button>
                  </div>
                </div>
                : null}
            </div>
          </>
        }

        <div className="text-center">
          <label className="font800 font_14px colorBlack">OR</label>
        </div>
        {
          (verify_mode == "password") ?
            <a href="javascript:void(0);" onClick={this.onVerifyModeClick.bind(this, verify_mode)} className="radius-6 full_width cmnBtn btnBlue text-center">Login via OTP</a> :
            <a href="javascript:void(0);" onClick={this.onVerifyModeClick.bind(this, verify_mode)} className="radius-6 full_width cmnBtn btnBlue text-center">Set Password</a>
        }
      </>
    );
  }

  renderDashboard() {
    console.log("render dashboard")
    return (
      <DashboardStatic />
    );
  }

  renderMedwiki() {
    return (
      <>
        <Helmet>
          <meta property="og:url" content={"https://doctor.clirnet.com/services/#/share/medwiki/" + content_view.type_id} />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={content_view.question} />
          <meta property="og:description" content={content_view.answer} />
          <meta property="og:image" content={content_view.image} />
          <meta property="og:image:secure_url" content={content_view.image} />
          <meta name="twitter:image" content={content_view.image} />
          <meta name="twitter:title" content={content_view.question + "|  CLIRNet eConnect  | Powered by CLIRNet"} />
          <meta name="twitter:card" content="summary_large_image" />
        </Helmet>
        <HeaderStatic />
        <section className="full_width body_area">
          <div className="container">
            <section className="full_width medWiki" id="maincont" ref={this.myRef}>
              <div className="medWikiLeft">
                <div className="full_width radius-6 feedRow">
                  <div className="col justify-content-between feedRowTop">
                    <div className="row">
                      <div className="col">
                        <span class="font_14px font600 colorBlack feedRow_date ssnDtl_dateDesk">{content_view.date}</span>
                      </div>
                      <div className="col-auto">

                        {(content_view.sponsor_logo != "" && content_view.sponsor_logo != undefined && content_view.sponsor_logo != null) ?
                          <a href="javascript:void(0);" className=" feedRow_sponsors">
                            <span className="font_10px font500 colorBlack">Powered by</span>
                            <img src={content_view.sponsor_logo.split(",")[0]} width="224" height="63" alt="logo" title="clirnet" />
                          </a> :
                          <a href="javascript:void(0);" className=" feedRow_sponsors">
                            <span className="font_10px font500 colorBlack">Powered by</span>
                            <img src={content_view.client_logo} width="224" height="63" alt="logo" title="clirnet" />
                          </a>}
                      </div>
                    </div>
                  </div>
                  <div className="full_width feedRow_ttl">
                    {(content_view.specialities != null) ?
                      <div className="full_width">
                        <span class="font_14px radius-6 font600 colorBlue feedRow_speciality">{content_view.specialities.replace(/,/g, ", ")}</span>
                      </div> : null}
                    <a href="javascript:void(0);" class="highlightyellow1 font_18px colorBlack font600">{content_view.question}</a>
                  </div>
                  {(content_view.image != "") ?
                    <div class="full_width feedRow_Pic">
                      <img className="object_fit_cover" src={content_view.image} />
                      <div className="overlay"></div>
                    </div> : null}
                  <div class="full_width font_16px feedRow_ans">
                    <p>{content_view.answer}</p>
                  </div>
                </div>
              </div>
              <div className="feed_right_2">
              </div>
            </section>
          </div>
        </section>
      </>
    )
  }


  renderSurvey() {
    console.log("render survey" + content_view.survey_id)
    return (
      <>
        <Helmet>
          <meta property="og:url" content={"https://doctor.clirnet.com/services/#/share/survey/" + content_view.survey_id} />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={content_view.survey_title} />
          <meta property="og:description" content={content_view.survey_description.substr(0, 100)} />
          <meta property="og:image" content={content_view.image} />
          <meta property="og:image:secure_url" content={content_view.image} />
          <meta name="twitter:image" content={content_view.image} />
          <meta name="twitter:title" content={content_view.survey_title + "|  CLIRNet eConnect  | Powered by CLIRNet"} />
          <meta name="twitter:card" content="summary_large_image" />
        </Helmet>
        <HeaderStatic />
        <section className="full_width body_area">
          <div className="container">
            <section className="full_width medWiki" id="maincont" ref={this.myRef}>
              <div className="medWikiLeft">
                <div className="full_width radius-6 feedRow">
                  <div className="col justify-content-between feedRowTop">
                    <div className="row">
                      <div className="col">
                        <span class="font_14px font600 colorBlack feedRow_date ssnDtl_dateDesk">{content_view.publishing_date}</span>
                      </div>
                      <div className="col-auto">
                        {(content_view.client_logo != "" && content_view.client_logo != undefined && content_view.client_logo != null) ?
                          <a href="javascript:void(0);" className=" feedRow_sponsors">
                            <span className="font_10px font500 colorBlack">Powered by</span>
                            <img src={content_view.client_logo} width="224" height="63" alt="logo" title="clirnet" />
                          </a> :
                          <a href="javascript:void(0);" className=" feedRow_sponsors">
                            <span className="font_10px font500 colorBlack">Powered by</span>
                            <img src={content_view.client_logo} width="224" height="63" alt="logo" title="clirnet" />
                          </a>}
                      </div>
                    </div>
                  </div>
                  <div className="full_width feedRow_ttl">
                    {(content_view.specialities_name != null) ?
                      <div className="full_width">
                        <span class="font_14px radius-6 font600 colorBlue feedRow_speciality">{content_view.specialities_name.replace(/,/g, ", ")}</span>
                      </div> : null}
                    <a href="javascript:void(0);" class="highlightyellow1 font_18px colorBlack font600">{content_view.survey_title}</a>
                  </div>
                  {(content_view.image != "") ?
                    <div class="full_width feedRow_Pic">
                      <img className="object_fit_cover" src={content_view.image} />
                      <div className="overlay"></div>
                    </div> : null}
                  <div class="full_width font_16px feedRow_ans">
                    <p>{ReactHtmlParser(content_view.survey_description)}</p>
                  </div>
                </div>
              </div>
              <div className="feed_right_2">
              </div>
            </section>
          </div>
        </section>
      </>
    )
  }

  redirectToArchivedVideo(id) {
    this.props.history.push({
      pathname: '/ArchivedVideoRelated/' + id
    })
  }

  renderProfile() {
    let first_name_profile = this.state.full_name
    console.log("first_name_profile" + first_name_profile);
    return (
      <div className="full_width warp_body">
        <HeaderStatic />
        <section className="full_width body_area">
          <div className="container">
            <div className="clearfix"></div>
            <div className="col-md-10 offset-md-1  col-xs-12">
              <div className="row">
                <section className="full_width profile">
                  <div className="full_width text-left radius-6 profileRow profileRow_1">
                    <a href="javascript:void(0);" rel="modal:open" className="radius-100 p_profile_sec_Pic">
                      <img src="https://doctor.clirnet.com/knowledge/uploads/docimg/no-image.png" className="object_fit_cover" />
                      <div className="transition6s overlay"></div>
                      <div className="transition6s radius-100 bgColorWhite profileImg_edit">
                        <img width="13" height="13" title="icon" alt="icon" src={editbtn} className="translate_both" />
                      </div>
                    </a>
                    <div className="full_width profileRow1_Right">
                      <div className="full_width colorGreyDark p_profile_sec_right_ttl">
                        <h4 className="font_20px font700 colorBlack">Dr.{this.state.full_name}</h4>
                        {/* <p>{this.state.specstr.substr(1)}</p> */}
                      </div>
                      <div className="full_width help_ans_text p_profile_sec_right_text">
                      </div>
                      <a className="radius-6 font600 font_14px cmnBtn profileRow_1_a" href="javascript:void(0)" rel="modal:open"><img width="13" height="13" title="icon" alt="icon" src={editbtn} /> <span>Edit</span></a>
                    </div>

                  </div>

                  <div className="full_width text-left radius-6 profileRow">
                    <div className="full_width p_profile_row_ttl">
                      <div className="radius-100 bgColorBlue translate_top p_profile_row_ttl_icon"><img src={profileIcon1} alt="icon" className="translate_both" /></div>
                      <h2 className="colorBlack font_24px font600 p_profile_row_ttlTxt">Education</h2>
                      <a className="translate_top font600 font_16px p_profile_row_ttl_a" href="javascript:void(0)" rel="modal:open"><img src={addPlus} width="14" height="14" /> Add</a>
                    </div>
                  </div>
                  <div className="full_width text-left radius-6 profileRow">
                    <div className="full_width p_profile_row_ttl">
                      <div className="radius-100 bgColorBlue translate_top p_profile_row_ttl_icon"><img src={profileIcon2} alt="icon" className="translate_both" /></div>
                      <h2 className="colorBlack font_24px font600 p_profile_row_ttlTxt">Affiliation & Membership</h2>
                      <a className="translate_top font600 font_16px p_profile_row_ttl_a" href="javascript:void(0)" ><img src={addPlus} width="14" height="14" /> Add</a>
                    </div>
                    <div className="full_width p_profile_row_in">

                    </div>
                  </div>

                  <div className="full_width text-left radius-6 profileRow">
                    <div className="full_width p_profile_row_ttl">
                      <div className="radius-100 bgColorBlue translate_top p_profile_row_ttl_icon"><img src={profileIcon3} alt="icon" className="translate_both" /></div>
                      <h2 className="colorBlack font_24px font600 p_profile_row_ttlTxt">Contribution / Achievements</h2>
                      <a className="translate_top font600 font_16px p_profile_row_ttl_a" href="javascript:void(0)" ><img src={addPlus} width="14" height="14" /> Add</a>
                    </div>
                  </div>
                  <div className="full_width text-left radius-6 profileRow">
                    <div className="full_width p_profile_row_ttl">
                      <div className="radius-100 bgColorBlue translate_top p_profile_row_ttl_icon"><img src={profileIcon5} alt="icon" className="translate_both" /></div>
                      <h2 className="colorBlack font_24px font600 p_profile_row_ttlTxt">Registrations</h2>
                      <a className="translate_top font600 font_16px p_profile_row_ttl_a" href="javascript:void(0);" ><img src={addPlus} width="14" height="14" /> Add</a>
                    </div>
                  </div>
                </section>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  renderGr() {
    console.log("gr data" + '\n' + content_view[0].type_id)
    let gr_detail_data = content_view[0];
    return (
      <div className="full_width">
        <HeaderStatic />
        <section className="full_width body_area medWiki">
          <div className="container">
            <div className="row">
              {

              }
              <div className="clearfix"></div>
              <div className="medWikiLeft">
                <div className="full_width radius-6 feedRow">

                  <div className="col justify-content-between feedRowTop">
                    <div className="row">
                      <div className="col">

                        {(gr_detail_data.date == '' || gr_detail_data.date == null) ? null :
                          <span class="font_14px font600 colorBlack feedRow_date ssnDtl_dateDesk">{gr_detail_data.date}</span>
                        }
                      </div>
                      <div className="col-auto">
                        {setClientLogoRelated(gr_detail_data.client_logo, gr_detail_data.sponsor_logo)}
                      </div>
                    </div>
                  </div>

                  <div className="full_width feedRow_ttl">
                    {(gr_detail_data.specialities == '' || gr_detail_data.specialities == null) ?
                      null :
                      <span class="font_14px radius-6 font600 colorBlue feedRow_speciality">{gr_detail_data.specialities.replace(/,/g, ", ")}</span>
                    }

                    <h3 href="javascript:void(0);" class="highlightyellow1 font_18px colorBlack font600">{gr_detail_data.title}</h3>
                  </div>


                  <div class="full_width feedRow_Pic">
                    <img className="object_fit_cover" src={gr_detail_data.image} />
                    <div className="overlay"></div>
                  </div>







                  <div className="full_width videoArchiveLeftT-3">
                    <div className="row  justify-content-between align-items-center">
                      <div className="feed_footer">
                        <div className="row d-flex align-items-center">
                          <a className="feedFter_left" href="javascript:void(0);"><img src={likeBttn} /><span></span></a>
                          <a className="feedFter_left" href="javascript:void(0);"><img src={vaultBttn} /></a>
                          <InlineShareButtons
                            config={{
                              alignment: 'center',  // alignment of buttons (left, center, right)
                              color: 'white',      // set the color of buttons (social, white)
                              enabled: true,        // show/hide buttons (true, false)
                              font_size: 16,        // font size for the buttons
                              labels: 'null',        // button labels (cta, counts, null)
                              language: 'en',       // which language to use (see LANGUAGES)
                              networks: [           // which networks to include (see SHARING NETWORKS)
                                'whatsapp',
                                'messenger',
                                'facebook',
                                'twitter'
                              ],
                              padding: 0,          // padding within buttons (INTEGER)
                              radius: 6,            // the corner radius on each button (INTEGER)
                              show_total: false,
                              size: 30,             // the size of each button (INTEGER)

                              // OPTIONAL PARAMETERS
                              url: gr_detail_data.deeplink,
                              image: 'https://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
                              description: gr_detail_data.description + "...",       // (defaults to og:description or twitter:description)
                              title: gr_detail_data.title,
                              message: '',     // (only for email sharing)
                              subject: '',  // (only for email sharing) 
                              username: 'Grand round' // (only for twitter sharing)
                            }} />
                          {/* <a className="feedFter_left" href="javascript:void(0);"><img src={shareBttn}/></a> */}
                          <a className="feedFter_left" href="javascript:void(0);"><img src={cmmntBttn} /><span></span></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="full_width feedDtls_comment">
                    <div className="full_width feedDtls_comment_frm">
                      <Form.Control className="font_14px font500 radius-6 feedfooterComment main_comment" type="text" placeholder="Write a comment here" />
                      <Form.Control type="submit" value="Submit" className="bgColorGreen colorWhite font600 feedDtls_commentSubmit" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
        <Footer />
        <div>
        </div>
      </div>
    )
  }

  renderArchivedVideo() {
    let video_detail_data = content_view;
    return (
      <div className="full_width">
        <HeaderStatic />
        <section className="full_width body_area seeeionPage videoArchive">
          <div className="container">
            <div className="row">
              <section className="full_width">
                <div className="clearfix"></div>
                <div className="medWikiLeft">
                  <div className="full_width radius-6 videoArchiveLeftIn">

                    <div className="col justify-content-between feedRowTop">
                      <div className="row">
                        <div className="col">


                          {(video_detail_data.date == '' || video_detail_data.date == null) ? null :
                            <span class="font_14px font600 colorBlack feedRow_date ssnDtl_dateDesk">{video_detail_data.date}</span>
                          }
                        </div>
                        <div className="col-auto">
                          {setClientLogoRelated(video_detail_data.client_logo, video_detail_data.sponsor_logo)}
                        </div>
                      </div>
                    </div>

                    <div className="full_width feedRow_ttl">
                      {(video_detail_data.specialities == '' || video_detail_data.specialities == null) ?
                        null :
                        <span class="font_14px radius-6 font600 colorBlue feedRow_speciality">{video_detail_data.specialities.replace(/,/g, ", ")}</span>
                      }

                      <h3 href="javascript:void(0);" class="highlightyellow1 font_18px colorBlack font600">{video_detail_data.question}</h3>
                    </div>



                    <div class="full_width feedRow_Pic">
                      <img className="object_fit_cover" src={video_detail_data.image} />
                      <div className="overlay"></div>
                    </div>


                    <div className="full_width videoArchiveLeftT-3">
                      <div className="row  justify-content-between align-items-center">
                        <div className="feed_footer">
                          <div className="row d-flex align-items-center">
                            {(video_detail_data.myrating == true) ?
                              <a className="feedFter_left active" href="javascript:void(0);"><img src={likeBttn} /><span>{video_detail_data.rating}</span></a> :
                              <a className="feedFter_left" href="javascript:void(0);"><img src={likeBttn} /><span>{video_detail_data.rating}</span></a>
                            }
                            {/* <a className="feedFter_left" href="javascript:void(0);"><img src={vaultBttn} /></a>  */}
                            <InlineShareButtons
                              config={{
                                alignment: 'center',  // alignment of buttons (left, center, right)
                                color: 'white',      // set the color of buttons (social, white)
                                enabled: true,        // show/hide buttons (true, false)
                                font_size: 16,        // font size for the buttons
                                labels: 'null',        // button labels (cta, counts, null)
                                language: 'en',       // which language to use (see LANGUAGES)
                                networks: [           // which networks to include (see SHARING NETWORKS)
                                  'whatsapp',
                                  'messenger',
                                  'facebook',
                                  'twitter'
                                ],
                                padding: 0,          // padding within buttons (INTEGER)
                                radius: 6,            // the corner radius on each button (INTEGER)
                                show_total: false,
                                size: 30,             // the size of each button (INTEGER)

                                // OPTIONAL PARAMETERS
                                url: video_detail_data.deeplink,
                                image: 'https://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
                                description: video_detail_data.answer.substring(0, 100) + "...",       // (defaults to og:description or twitter:description)
                                title: video_detail_data.question,
                                message: '',     // (only for email sharing)
                                subject: '',  // (only for email sharing) 
                                username: 'Archived video' // (only for twitter sharing)
                              }} />
                            {/* <a className="feedFter_left" href="javascript:void(0);"><img src={shareBttn}/></a> */}
                            {
                              (video_detail_data.comment_count == null || video_detail_data.comment_count == '' || video_detail_data.comment_count == 'null') ?
                                <a className="feedFter_left" href="javascript:void(0);"><img src={cmmntBttn} /><span>0</span></a> :
                                <a className="feedFter_left" href="javascript:void(0);"><img src={cmmntBttn} /><span>{video_detail_data.comment_count}</span></a>
                            }
                          </div>
                        </div>
                      </div>
                    </div>



                    <div className="full_width feedDtls_comment">
                      <div className="full_width feedDtls_comment_frm">
                        <Form.Control className="font_14px font500 radius-6 feedfooterComment main_comment" type="text" placeholder="Write a comment here" />
                        <Form.Control type="submit" value="Submit" className="bgColorGreen colorWhite font600 feedDtls_commentSubmit" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
        <Footer />
        <div>
        </div>
      </div>
    )
  }

  renderTeleMed() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 200,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      adaptiveHeight: false,
      autoplay: true
    };
    return (
      <div className="full_width warp_body ">
        <HeaderStatic />
        <section className="full_width telemedPBody">
          <div className="container">
            <div className="row">
              <div className="full_width radius-6 telemedPMain">

                <div className="full_width telemedPBnnr">
                  <img src={telemedSBnr} className="object_fit_cover telemedPBnnrBG" />
                  <div className="row align-items-center telemedPBnnrContent">
                    <div className="col-md-6 col-12 telemedPBnnrLeft">
                      <div className="row justify-content-center">
                        <div className="telemedPBnnrLeftMain">
                          <img src={mobile} className="telemedPBnnrLeftMobile" />
                          <Slider {...settings} className="telemedPBnnrLeftSlider">
                            <img src={telemedScreen1} className="object_fit_cover" />
                            <img src={telemedScreen2} className="object_fit_cover" />
                            <img src={telemedScreen3} className="object_fit_cover" />
                          </Slider>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12 text-left telemedPBnnrRight">
                      <div className="full_width telemedPBnnrRightIn">
                        <img src={telemedPBnnrLogo} className="telemedPBnnrLogo" />
                        <div className="clearfix"></div>
                        <h3 className="colorWhite font_22px font600">Your Virtual Clinic in Just 2 Mins!</h3>
                        <div className="clearfix"></div>
                        <h4 className="colorWhite font_20px font500">Get a free life-time access.</h4>
                        <div className="clearfix"></div>
                        <div className="clearfix"></div>
                        <h4 className="colorWhite font_18px font500">TeleMed Lite is available for use on mobile phones only.</h4>
                        <div className="clearfix"></div>
                        <h2 className="colorWhite font_36px text-uppercase font900">DOWNLOAD APP Today</h2>
                        <div className="clearfix"></div>
                        <div className="full_width">
                          <a className="font_16px  font600 telemedPBnnrDownloadBtn" href="javascript:void(0);" target="_blank" >Open Now <img src={download} /></a>

                          {/* <a className="font_16px  font600 telemedPBnnrDownloadBtn" href="javascript:void(0)" onClick={() => {this.onGetLinkClick()}}>Get Link <img src={getLink} /></a> */}

                        </div>

                        <div className="clearfix"></div>

                      </div>
                    </div>

                  </div>
                </div>


                <div className="full_width font500 font_16px colorBlack telemedSec2">
                  <h2 className="font_20px text-uppercase telemedSec2Ttl">Now enjoy a hassle-free Telemedicine <br /> platform that would ease out:</h2>
                  <div className="clearfix"></div>

                  <div className="row justify-content-center telemedSec2In">
                    <div className="col-md-9 col-12 telemedSec2GRid">
                      <div className="row">


                        <div className="col-sm-4 col-12 telemedSec2Box">
                          <div className="full_width telemedSec2BoxIn">
                            <div className="full_width telemedSec2BoxIcon">
                              <img src={telemedSec2Icon1} className="translate_both" />
                            </div>
                            <div className="clearfix"></div>
                            <h4 className="font_16px">Ad-hoc patient <br /> video/audio calls</h4>
                          </div>
                        </div>
                        <div className="col-sm-4 col-12 telemedSec2Box">
                          <div className="full_width telemedSec2BoxIn">
                            <div className="full_width telemedSec2BoxIcon">
                              <img src={telemedSec2Icon2} className="translate_both" />
                            </div>
                            <div className="clearfix"></div>
                            <h4 className="font_16px">Patient database <br /> management</h4>
                          </div>
                        </div>
                        <div className="col-sm-4 col-12 telemedSec2Box">
                          <div className="full_width telemedSec2BoxIn">
                            <div className="full_width telemedSec2BoxIcon">
                              <img src={telemedSec2Icon3} className="translate_both" />
                            </div>
                            <div className="clearfix"></div>
                            <h4 className="font_16px">Consultation <br /> payment flows</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="full_width font500 font_16px colorWhite telemedFtr">
                  <p>Set up your virtual clinic in just 2 mins using tele-medicine lite, browse over 10,000+ MedWikiâ€™s (Medicineâ€™s Wikipedia), engage in group discussions with your peers or, enjoy interesting quizzes &amp; polls. We invite you to join this vibrant community of 150,000+ doctors for a free life-time access.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  renderSession() {
    console.log("rendering session" + content_view[0].session_doctor_entities)
    return (
      <>
        <Helmet>
          <meta property="og:url" content={"https://doctor.clirnet.com/services/#/share/session/" + content_view[0].survey_id} />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={content_view[0].session_topic} />
          <meta property="og:description" content={content_view[0].session_topic} />
          {content_view[0].session_doctor_entities.map(i =>
            <meta property="og:image" content={i.session_doctor_image} />)}

          {content_view[0].session_doctor_entities.map(i =>
            <meta property="og:image" content={i.session_doctor_image} />)}

          {content_view[0].session_doctor_entities.map(i =>
            <meta property="og:image:secure_url" content={i.session_doctor_image} />)}

          {content_view[0].session_doctor_entities.map(i =>
            <meta name="twitter:image" content={i.session_doctor_image} />)}

          <meta name="twitter:title" content={content_view[0].session_topic + "|  CLIRNet eConnect  | Powered by CLIRNet"} />
          <meta name="twitter:card" content="summary_large_image" />
        </Helmet>
        <HeaderStatic page_name={content_type} />
        <section className="full_width body_area">
          <div className="container">
            <section className="full_width medWiki" id="maincont" ref={this.myRef}>
              <div className="medWikiLeft">
                <div className="full_width radius-6 feedRow">
                  <div className="col justify-content-between feedRowTop">
                    <div className="row">
                      <div className="col">
                        <span class="font_14px font600 colorBlack feedRow_date ssnDtl_dateDesk">{content_view[0].display_date}</span>
                      </div>
                      <div className="col-auto">
                        {(content_view[0].client_logo != "" && content_view[0].client_logo != undefined && content_view[0].client_logo != null) ?
                          <a href="javascript:void(0);" className=" feedRow_sponsors">
                            <span className="font_10px font500 colorBlack">Powered by</span>
                            <img src={content_view[0].client_logo} width="224" height="63" alt="logo" title="clirnet" />
                          </a> :
                          <a href="javascript:void(0);" className=" feedRow_sponsors">
                            <span className="font_10px font500 colorBlack">Powered by</span>
                            <img src={content_view[0].client_logo} width="224" height="63" alt="logo" title="clirnet" />
                          </a>}
                      </div>
                    </div>
                  </div>
                  <div className="full_width feedRow_ttl">
                    {(content_view[0].session_topic != null) ?
                      <div className="full_width">
                        <span class="font_14px radius-6 font600 colorBlue feedRow_speciality">{content_view[0].session_topic.replace(/,/g, ", ")}</span>
                      </div> : null}
                    <a href="javascript:void(0);" class="highlightyellow1 font_18px colorBlack font600">{content_view.session_topic}</a>
                  </div>
                  {content_view[0].session_doctor_entities.map(docres =>
                    <div className="col-12 ssnDtlsDoc">
                      <div className="full_width radius-6 text-center ssnDtlsDocIn ssnDtlsDocInSlider">
                        <div className="full_width ssnDtlsDocInItem">
                          {/* <div className="clearfix"></div> */}
                          <div className="radius-100 l_doctor_pic">
                            <img src={docres.session_doctor_image} className="object_fit_cover" />
                          </div>
                          <div className="clearfix"></div>
                          <h4 className="font_16px font600 colorBlack l_doc_name">{docres.session_doctor_name}
                            <span className="colorGrey font_14px font500">{docres.DepartmentName}</span>
                          </h4>
                          <div className="clearfix"></div>
                          <div className="full_width font500 font_14px">
                            <p>{docres.profile}</p></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="feed_right_2">
              </div>
            </section>
          </div>
        </section>
      </>
    )
  }

  renderSignUp() {
    if (isMobile) {
      $(".signupScreen").addClass("mblScreen");
    } else {
      $(".signupScreen").removeClass("mblScreen");
    }
    // this.log('render signup',this.state.screen_no);
    return (
      <div className="full_width dskScreen signupScreen">
        <>
          {
            (this.state.content_ready == true || this.state.content_ready == 'true') ? this.renderContent(content_type) :
              <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={40} width={40} visible={true} />
          }
        </>
        <Footer />
        <Modal id="root-modal" backdrop={'static'} keyboard={false} className="in ssnCancelPop" centered="true" animation="slide" show={this.state.showSignUpModal} onHide={() => { this.setState({ "showSignUpModal": false }); }}>
          <Modal.Header className="justify-content-center">
            <Modal.Title className="font600 font_18px colorBlack">{title_text}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="form_container_cmn">
              {/* <span className="err_hold" style={{"color":"red"}}>{this.state.err_msg}</span> */}
              <div class="col-xs-12 form_row_pop autoLoginPopFrm">
                {this.slideModal(this.state.screen_no)}
                {/* {this.setCssToScreen.bind(this)} */}
              </div>
              {(this.state.err_msg != '') ?
                <div className="full_width text-center mt-2 alert alert-danger">
                  <label>{this.state.err_msg}</label>
                </div> : null}
              {(this.state.is_loader == true || this.state.is_loader === 'true') ?
                <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={40} width={40} visible={true} /> : null}
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            {(this.state.screen_no == 1 && !this.state.alreadyRegistered) ?
              <>
                <a href="javascript:void(0)" className="radius-40 font500 btnGreen cmnBtn btnCmnSmall" variant="secondary" onClick={() => {this.onNextClick(this.state.screen_no)}}>
                  Sign Up
                </a>
              </> : null
            }
             {(this.state.screen_no == 1 && this.state.alreadyRegistered) ?
              <>
                <a href="javascript:void(0)" className="radius-40 font500 btnGreen cmnBtn btnCmnSmall" variant="secondary" onClick={() => {this.redirectToLogin()}}>
                  Sign In
                </a>
              </> : null
            }
            {(this.state.screen_no == 2 && !this.state.alreadyRegistered) ?
              <>
                <a href="javascript:void(0)" className="radius-40 font500 btnGreen cmnBtn btnCmnSmall" variant="secondary" onClick={() => { this.slideToPrev(this.state.screen_no) }}>
                  Back
                </a>
                <a href="javascript:void(0)" onClick={() => { this.onDoneBtnClick() }} className="radius-40 font500 btnGreen cmnBtn btnCmnSmall" variant="secondary"  >
                  Done
                </a>
              </> : null}
              {(this.state.screen_no == 2 && this.state.alreadyRegistered) ? 
                <>
                <a href="javascript:void(0)" className="radius-40 font500 btnGreen cmnBtn btnCmnSmall" variant="secondary" onClick={() => {this.redirectToLogin()}}>
                  Sign In
                </a>
              </> : null}
          </Modal.Footer>
        </Modal> 
      </div>
    );
  }


  render() {
    // this.log("Render",this.state.sign_up) 
    return (
      <div>
        {
          (this.state.sign_up == "true" || this.state.sign_up == true) ? this.renderSignUp()
            :
            <div></div>
        }
      </div>
    );
  }
}
export default withRouter(Autoauth);


