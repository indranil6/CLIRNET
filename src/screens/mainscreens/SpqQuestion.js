import React,{ Component } from 'react';
import Loader from 'react-loader-spinner'
import $ from 'jquery';
import ProgressBar from 'react-bootstrap/ProgressBar'
import { reactLocalStorage } from 'reactjs-localstorage';
import AppConfig from '../config/config.js';
import Header from './Header';
import Footer from './Footer';
import begainArrow from '../../images/begainArrow.png'; 
import begainArrowLeft from '../../images/begainArrowLeft.png';
import Slider from "react-slick"; 
import Form from 'react-bootstrap/Form'; 
import "react-datepicker/dist/react-datepicker.css";
import Timer from 'react-compound-timer'; 
import _ from 'lodash';
import Modal from 'react-bootstrap/Modal';
import Searchable from 'react-searchable-dropdown'; 
import {isMobile} from 'react-device-detect';
import Banner from '../mainscreens/Banner';
import SpqQuestionLoader from '../LoadingPlaceholders/SpqQuestionLoader.jsx';

const gtag = window.gtag;

const pageNames = "Polls & Quizzes"
const url = AppConfig.apiLoc;
var now = 0;


var optionReady = false;
var surveySubmit = false;
var isPending = false;
var surveyTime = undefined;
var isSubmitProgress = false;

var arr_new = [];
var surveyTitle;
var surveyPoints;
var surveyCategory;
var question,type,options,correctoption;
var question_no = 0;
var selectedValue = undefined;
var textAnswer = undefined;
var surveyPoint = undefined;
var browser_change = 0;
var clientLogo = '';
let question_image = '';

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
var phonenoFormat = /^\d{10}$/;
var isDone = false; 

class SpqQuestion extends React.Component
{
  constructor(props){
    super(props); 
    this.uri_data = this.props.match.params.id;
    this.action = this.props.match.params.action; 
    this.state= { 
      display:false,
      checkedRadio: null,
      showSubmitModal: false,
      errorMsgModal: false,
      showSubmitModal: false,
      errorMsg:'',
      is_loader: true, 
      phone_no: undefined,  
      err_msg:'',
      isd_no: '+91',
      otp: '', 
      showVerifyUpModal:false,
      buttonName: "verify",
      new_mobile:undefined,
      display_call_button: false,
    };
    question = '';
    question_image = '';
    optionReady = false;
    isDone = false;
    clientLogo = '';
    this.getDetails(this.uri_data);

    this.display_banner = this.display_banner.bind(this);

    // this.onTextSpecify.bind(this);
  } 
                             
                             

  setClientLogo(clientLogo, sponsorLogo) {
    var dskSessionClient = {
      dots: false,
      infinite: true,
      speed: 300,
      autoplaySpeed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      adaptiveHeight: true,
      autoplay: true,
      fade: true,
      cssEase: "linear",
      is_loader: true,
    };
    if (!sponsorLogo) {
      return false;
    } else {
      return sponsorLogo.split(",").length == 1 ? (
        <div className="full_width text-center srvQus_QusPowerBy">
          <span>Powered by</span>
          <img
            className="spqDtlSponsorImg"
            src={sponsorLogo.split(",")[0]}
            width="224"
            height="63"
            alt="logo"
          />
        </div>
      ) : (
        <Slider {...dskSessionClient}>
          {sponsorLogo.split(",").map((val, ind) => (
            <div className="full_width text-center srvQus_QusPowerBy">
              <span>Powered by</span>
              <img className="spqDtlSponsorImg" src={val} alt="sponsor" />
            </div>
          ))}
        </Slider>
      );
    }
  }
  componentDidMount() {
    window.document.title = "CLIRNET - Answer SPQ"
    gtag('config', AppConfig.gtag_measure_id, {
			'page_title': window.document.title,
			'page_location': window.location.href,
			'page_path': window.location.pathname
			});
    $(".survey_mobile").addClass("active");

  $('.reg_input_efect').val('');
  $(document).on("blur", ".reg_input_efect", function(event){
    if (this.value == '') {
          $(this).parent().removeClass('regFormRowHvr').addClass('regFormRowWtoHvr');
    }
  })
  $(document).on("focus", ".reg_input_efect", function(event){
    $(this).parent().removeClass('regFormRowWtoHvr').addClass('regFormRowHvr');
  });

    $('.li_survey').attr('id', 'survey_cal');  
      $(".surveyCollaps").click(function(){
        $(this).toggleClass("surveyCollapsActive");
        $(".surveyLeftBoxArea").slideToggle();
    });

    
    window.onhashchange = () => { 
      console.log('window change')
      question_no = 0;
      now = 0;
    }
    
    let _this = this;
    window.addEventListener('beforeunload',(ev)=>{
      console.log('Window reloaded'); 
      //let url_path = '/survey/surveySave';
     // _this.saveToImcomplete(url_path);  
      ev.preventDefault();  
      // return ev.returnValue = 'Are you sure you want to close?';
    })
  }

  showVerifyModal(){  
    return( 
     <div className="full_width warp_body">
     <h1>Hi</h1>
   </div>  
   )
  }
 
  onInputChange = input => (val) => {
   this.setState({"err_msg":''})
   switch(input)
   {
     case "phone_no":
       this.setState({"phone_no":val.target.value})
     break;
     case "otp":
       this.setState({"otp":val.target.value})
     break;
     case "new_mobile":
       console.log("new mobile no ="+val.target.value)
       this.setState({"new_mobile":val.target.value})
     break;
     default:
   }
 }
 
 onAddMobileClick(){  
   this.setState({'err_msg':""});
     if(this.state.new_mobile == '' || this.state.new_mobile == 'undefined' ){
       this.setState({'err_msg':'Oops! invalid mobile no'});
     }
     if(!this.state.new_mobile.match(phonenoFormat)){
       this.setState({'err_msg':'Enter Mobile no in correct format'});
     }
     else if(this.state.isd_no == '' || this.state.isd_no == '' || this.state.isd_no == undefined){
       this.setState({'err_msg':'Invalid country code'});
     }else{  
     this.setState({'err_msg':''}); 
     let formdata = {
       'mobilenumber':this.state.new_mobile,
       'countrycode':this.state.isd_no 
     }  
     this.setState({'is_loader': true}); 
     fetch(url+'user/updatemobilenumber',{  
       method: 'POST', 
       headers: {
         'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
         'version': 'rjsw 1.1.1'
       }, 
       body: JSON.stringify(formdata), 
       }).then((response) => response.json()).then((responseJson) => {     
       let res_code = responseJson.status_code;
       this.setState({'is_loader': false});
       if(res_code == 200){  
         this.setState({"phone_no":this.state.new_mobile}) 
         this.sendOtp()
       }
       else{
         this.setState({'err_msg': 'Unable to Add Mobile NO'})
       }
       }).catch((error) => { 
         this.setState({'is_loader': false});
           console.log("Error"+error);
       });
     }  
 }
 
 sendOtp(){
   this.setState({'otp':""});
   this.setState({'err_msg':""});
   if(this.state.phone_no == '' || this.state.phone_no == 'undefined' ){
     this.setState({'err_msg':'Oops! invalid mobile no'});
   }
   if(!this.state.phone_no.match(phonenoFormat)){
     this.setState({'err_msg':'Mobile no in correct format'});
   }
   else if(this.state.isd_no == '' || this.state.isd_no == '' || this.state.isd_no == undefined){
     this.setState({'err_msg':'Invalid country code'});
   }else{  
   this.setState({'err_msg':''});
   let formdata = new FormData();
   formdata.append("isdCode", this.state.isd_no) 
   formdata.append("mobile_no", this.state.phone_no)
   this.setState({'is_loader': true}); 
   fetch(url+'autologin/otpsend',{  
     method: 'POST', 
     headers: {
       'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
       'version': 'rjsw 1.1.1'
     }, 
     body: formdata,
     }).then((response) => response.json()).then((responseJson) => {     
     let res_code = responseJson.status_code;
     this.setState({'is_loader': false});
     if(res_code == 200){ 
       // this.setState({'err_msg': 'An OTP send to your mobile number Please enter OTP'})
     }
     else{
       this.setState({'err_msg': 'Unable to send OTP'})
     }
     }).catch((error) => { 
       this.setState({'is_loader': false});
         console.log("Error"+error);
     });
   }  
 }
 
 getUtmSource(){
   let utmSource = reactLocalStorage.get('@ClirnetStore:utm_source', true);
   if(utmSource == undefined || utmSource == 'undefined' || utmSource == true || utmSource == 'true' || utmSource == ''){
     console.log("utm source not found")
     return 0;
   }else{
     console.log("utm source:"+utmSource);
     return utmSource;
   }
 }
 
 verifyOtp(){
   let utm = this.getUtmSource();
   this.setState({'err_msg':""});
   if(this.state.otp == '' || this.state.otp == 'undefined'){
     this.setState({'err_msg': 'Please enter OTP'})
   }else{ 
   let formdata = new FormData();
   formdata.append("isdCode", this.state.isd_no)
   formdata.append("phone_no", this.state.phone_no)
   formdata.append("otp", this.state.otp) 
   formdata.append("utm_source", utm) 
   this.setState({'is_loader': true});
 
   fetch(url+'Authrjs/loginotpverify',{  //'autologin/otpverify'  
     method: 'POST',
     headers: { 
       'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
       'version': 'rjsw 1.1.1'
     }, 
     body: formdata, 
     }).then((response) => response.json()).then((responseJson) => {     
     let res_code = responseJson.status_code;
     this.setState({'is_loader': false});
     if(res_code == 200){ 
       this.setState({'err_msg': "Mobile no verified successfully! Thank You"})
        let new_utm = utm+"-Done";
        console.log("new utm"+new_utm) 
       reactLocalStorage.set('@ClirnetStore:utm_source', new_utm)
       optionReady = false;
       isDone = true;
       this.getDetails(this.uri_data);    
       this.setState({ "showVerifyUpModal": false});
         
     }
     else if(res_code == 203){
       this.setState({'err_msg': responseJson.message})
     }
     else{
       // alert("Something went wrong3")
     }
     }).catch((error) => {
       this.setState({'is_loader': false});
       console.log("Error"+error);
     }); 
   }
 } 
  
   dropDownChange(val){
     console.log("isd before"+val)
     this.setState({"isd_no": val})
   }

   setCssToScreen(){ 
    let abc = document.getElementsByClassName('reg_input_efect'); 
    for(let i=0; i<=abc.length; i++){
      let inputValue = $(".regRowCount"+i).val()
          if(inputValue !== '') { 
              $(".regRowCount"+i).parent().removeClass('regFormRowWtoHvr').addClass('regFormRowHvr');
      }else{
        $(".regRowCount"+i).parent().removeClass('regFormRowHvr').addClass('regFormRowWtoHvr');  
      }
    } 
  }
  
  sendOtpWithCall(){
    this.setState({'err_msg':""});
    if(this.state.phone_no == '' || this.state.phone_no == 'undefined'){
      this.setState({'err_msg':'Please enter mobile no'});
    }
    else if(!this.state.phone_no.match(phonenoFormat)){
      this.setState({'err_msg':'Please Enter mobile no in correct format'});
      this.slideModal(1)
    }
    else if(this.state.isd_no == '' || this.state.isd_no == ''  || this.state.isd_no == undefined){
      this.setState({'err_msg':'Please Select a isd code'});
    }else{
    this.setState({'err_msg':''});
    let formdata = new FormData();
    formdata.append("isdCode", this.state.isd_no) 
    formdata.append("mobile_no", this.state.phone_no)
  
    this.setState({'is_loader': true});
    fetch(url+'autologin/resendotpcall',{  
      method: 'POST', 
      headers: { 
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'
      }, 
      body: formdata,
      }).then((response) => response.json()).then((responseJson) => {  
        this.setState({'is_loader': false});   
      let res_code = responseJson.status_code;
      if(res_code == 200){ 
        this.setState({'err_msg': 'Please enter OTP which get in call'})
      }
      else{
        this.setState({'err_msg': 'Unable to reach your number'})
      }
      }).catch((error) => { 
        this.setState({'is_loader': false});
          console.log("Error"+error);
      });
    }  
  }
  
  
   getMobileNO(){
    let mob =  reactLocalStorage.get('@ClirnetStore:mobilePrimary',true)
    let phone = reactLocalStorage.get('@ClirnetStore:phoneNumber',true) 
    console.log("mobil no///////////////// "+mob+"phone\n"+phone) 

    if(mob == undefined || mob == "undefined" ){
      if(phone == undefined || phone == 'undefined'){
        return undefined;
      }else{
        return phone;
      }
      return undefined;
    }else{
      return mob;
    }
 }

    getDetails = (id) => { 
         let utm = this.getUtmSource(); 
       fetch(url+'survey/detail?id='+id+"&utm_source="+utm, { 
           method: 'GET',
           headers: {
           'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
           'version': 'rjsw 1.1.1'
           }
           }).then((response) => response.json()).then((responseJson) => {
            arr_new = [];
           let responseData = responseJson.data;
           let userSurveyStatus;
           let clientName, isVerify;
           responseData.map((r) =>{
            surveyTitle = r.survey_title;
            surveyPoint = r.survey_points; 
            surveyCategory = r.category;
            surveyTime = r.survey_time;
            clientName = r.client_name;
            isVerify = r.verified; 

            userSurveyStatus = r.user_survey_status;
            if(!r.sponsor_logo){
              // clientLogo = r.client_logo;
            }else{
              clientLogo = r.sponsor_logo;
            }
           })
           if(surveyCategory == 'poll'){
             this.redirect_to_poll_detail();
           }else{
            if(isVerify == 1 && isDone == false){  
              this.setState({"phone_no":this.getMobileNO()})  
              console.log("in if//////////"+this.state.phone_no)   
              if(this.state.phone_no == undefined || this.state.phone_no == 'undefined'){
                this.setState({ "is_loader": false});
              } else{ 
                this.sendOtp(); 
              }

              this.setState({ "showVerifyUpModal": true});  
            }  
            this.checkSurveyUserStatus(userSurveyStatus,responseData)
           } 
           }).catch((error) => { 
               console.log("Error"+error);
           });
   }

   checkSurveyUserStatus(status,responseData){
    switch(status)
    {
      case 'completed':
        this.redirect_to_survey_detail(this.uri_data)
      break;
      case 'incomplete':
        this.parseResponseJson(responseData)
      break;
      case 'pending':
        isPending = true;    
        this.parseResponseJson(responseData)  
      break;
    }
  } 

  redirect_to_poll_detail = () =>{
    let ids = this.uri_data;
    this.props.history.push({
      pathname: '/PollDetails/' + ids + '' 
    })   
  }

  redirect_to_survey_detail = (id) => {
    // console.log("ready to reddirect"+id);
    this.props.history.push({ 
        pathname: '/SpqCompletedDetails/'+ id + ''
    })
}

redirect_to_spq_detail = (id) => {
  // console.log("ready to reddirect"+id);
  this.props.history.push({ 
      pathname: '/SpqDetails/'+ id + ''
  })
}
 
 parseResponseJson = (responseData) =>
 {
  let dataJson;
  responseData.map((r) => {dataJson =  r.data_json});  
  console.log("user status"+"\n"+dataJson)
  let mData = JSON.parse(unescape(dataJson)); 
  console.log("Data \n"+mData);
  let sData = mData.surveys;
  arr_new = Object.keys(sData).map(function (k){
    return sData[k]; 
  });
  // console.log('in array log'+arr_new)
  this.arrayData(arr_new)
 }
 
 arrayData(arr_new){
  question = arr_new[question_no].question;
  question_image = '';
  question_image = arr_new[question_no].questionImageURL;
  type = arr_new[question_no].type;
  options = arr_new[question_no].options;
  correctoption = arr_new[question_no].correctoption;
  optionReady = true;
  // console.log('in array log'+question)
  this.refresh();
 }

 reset_arr_new = () => {
   arr_new = [];
   question_no = 0;
   now = 0; 
 }
 
 renderOptions = (type) => {
  // console.log("in array\n"+JSON.stringify(arr_new[question_no])+'\n question no'+question_no)
  let currentOptions = options;
  switch (type) { 
    case "boolean":
      let optionSelect = undefined; 
      let yesFlag = false;
      let noFlag = false;
      if(arr_new[question_no].selectedIndex == null || arr_new[question_no].selectedIndex === '' || arr_new[question_no].selectedIndex == undefined){
        console.log('in if'+arr_new[question_no].selectedIndex)
      }
      else{ 
        if(arr_new[question_no].selectedIndex!=undefined && arr_new[question_no].selectedIndex!=null && arr_new[question_no].selectedIndex!="null")
        {
          optionSelect = arr_new[question_no].selectedIndex;
        }
        if(currentOptions[0].value == optionSelect){
          yesFlag = true;
        }if(currentOptions[1].value == optionSelect){
          noFlag = true;
        }else{
          optionSelect=100;
        }
        console.log('yesflag'+yesFlag+'no flag'+noFlag)
      }
      return ( 
        <div>
            <div className="cmnCheckBox_row booleanTypeRadio">
              <input id="booleanID"
              className="form-check-input"  
              type="radio" name="abc"
              onClick={this.onRadioButtonChange.bind(this,currentOptions[0].value,currentOptions[0])}
              value={currentOptions[0].value} 
              checked={yesFlag} />
              <label for="booleanID" className="form-check-label">
                Yes
              </label> 
            </div>
            <div className="cmnCheckBox_row booleanTypeRadio">
              <input id="booleanID"
              className="form-check-input"
              type="radio" name="abc"
              onClick={this.onRadioButtonChange.bind(this,currentOptions[1].value,currentOptions[1])}
              value="No"
              checked={noFlag}  />
              <label for="booleanID" className="form-check-label">
                No 
              </label> 
            </div>
          </div>
        );
      break;
    case "single": 
      return (
        <div className="full_width srvQus_QusCheck3">
          {currentOptions.map((options,i)=>
            {
              let inputboxid= 'option3-'+i
              let optionSelect = undefined;
              if(arr_new[question_no].selectedIndex == null || arr_new[question_no].selectedIndex === '' || arr_new[question_no].selectedIndex == undefined){
                console.log("in if ")
                optionSelect=100;
              } 
              else{
                console.log("in else")
                optionSelect = arr_new[question_no].selectedIndex;
              }
              return (
                <div className="cmnCheckBox_row cmnRadio_row">
                  <input id={inputboxid}
                  className="form-check-input" 
                  type="radio" 
                  checked={options.value == optionSelect} 
                  onChange={this.onRadioButtonChange.bind(this,options.value,i,options)} 
                  value={options.value} />
              <label for={inputboxid} className="form-check-label srvQus_QusCheck3" key={i}>  
                {options.label}
              </label> 
              </div>
          );})
          }
        </div>
      );
      break;
    case "multiple":
        return (
          <div className="full_width srvQus_QusCheck1">
           {currentOptions.map((options) =>
           (options.isChecked == true || options.isChecked == "true")?
            <Form.Check checked onChange={() => {this.onCheckBoxChange(options);}} id={options.id} className="cmnCheckBox_row" type="checkbox" label={options.value} />:
            <Form.Check onChange={() => {this.onCheckBoxChange(options);}} id={options.id} className="cmnCheckBox_row" type="checkbox" label={options.value} />
           )}
          </div>
        ); 
      break;
    case "text":
      return (
        <Form.Control 
        as="textarea"
        rows="4"
        onChange={this.onTextUpdate.bind(this)}  value={((arr_new[question_no].textAnswer) == ''|| (arr_new[question_no].textAnswer) == undefined)?'':arr_new[question_no].textAnswer} name="body" className="font_14px" placeholder="Type here..."  />
      );  
      break; 
    case "image":   
      return (
        <div className="full_width srvQus_QusCheck4">
          <div className="row">
        {currentOptions.map((options,index) =>
          (options.isChecked == true || options.isChecked == "true")?
            <div className="col-md-6 full_width p-1 cmnCheckBox_row">
              <input checked onChange={this.onImageChange.bind(this,options)} className="form-check-input" id={options.id} type="radio" name="arngDiscus" />
                <label className="form-check-label" for={options.id}>
                  <img src={options.value} className="translate_both"/>  
                </label>
            </div>:
          < div className="col-md-6  full_width p-1 cmnCheckBox_row">
            <input onChange={this.onImageChange.bind(this,options)} className="form-check-input" id={options.id} type="radio" name="arngDiscus" />
            <label className="form-check-label" for={options.id}>
              <img src={options.value} className="translate_both"/>
            </label>
          </div>  
        )}
        </div>
        </div>          
      );
      case "other":
        return (
          <div className="full_width srvQus_QusCheck3">
            {currentOptions.map((options,i)=>
              {
                let inputboxid= 'option3-'+i
                let optionSelect = undefined;
                let textBoxTempClass = 'temp-class-text-box'+i 
             
                if(arr_new[question_no].selectedIndex == null || arr_new[question_no].selectedIndex === '' || arr_new[question_no].selectedIndex == undefined){
                  console.log("in if ")
                  optionSelect=100;
                } 
                else{
                  console.log("in else")
                  optionSelect = arr_new[question_no].selectedIndex;
                } 
                return (
                <>
                  <div className="full_width cmnCheckBox_row cmnRadio_row">
                    <div className="full_width position-relative">
                    <input id={inputboxid}
                    className="form-check-input "
                    type="radio" 
                    checked={options.value == optionSelect} 
                    onChange={this.onSpecifyButtonChange.bind(this,i,options)} 
                    value={options.value} />
                    <label for={inputboxid} className="form-check-label srvQus_QusCheck3" key={i}> 
                      {options.label}
                    </label> 
                    </div>
                  { 
                  (options.value == optionSelect && options.specify === 'true')? 
                  <Form.Control as="textarea" rows="4" onChange={this.onTextSpecify.bind(this,i)} 
                  value={((arr_new[question_no].textAnswer) == ''|| (arr_new[question_no].textAnswer) == undefined)?'':arr_new[question_no].textAnswer} name="body" className={"font_14px full_width srvQus_QusCheck3Textarea " + textBoxTempClass} placeholder="Type here..."  />  
                  :null
                  }
                </div>
                </>
            );})
            }
          </div>
        );
      break; 
    }
  }

  onTextSpecify(i) //for text type question 
  {
    let textBoxTempClass = 'temp-class-text-box'+i 
    let text = $('.'+textBoxTempClass).val();//e.target.value;     
    arr_new[question_no].textAnswer = text;
    arr_new[question_no].nextTime = this.getDateTime();
    this.refresh();
  }

  getDateTime = () =>{
    var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    return datetime;
  }

  showProgress = (now) =>{
    return(
      <ProgressBar now={now} label={`${now}%`}/>
    ); 
  }

////////////////////////Util functions/////////////////////////////////////////
  refresh = () => {
    this.setState({ "display": !this.state.display});
  }
  
  checkUndefined = (value) =>{
     if(value == undefined || value == ''){
       return true;
     }else{
       return false;
     }
  }
  
  ///////////////////Callback functions////////////////////////
   onNextBtnClick(arr){
    // console.log('arr'+arr)
    arr_new = arr;
    let questionType = type;
    var isValidate = false;
    let _this = this;
    var errorMessage = "Please Select Or Add a Answer";
    console.log("question type"+questionType);
    switch (questionType) {
      case "boolean":
      case "single":
          if (
             arr_new[question_no].selectedIndex == undefined ||
             arr_new[question_no].selectedIndex === ''
          ) { 
            // console.log("button single"+JSON.stringify(arr_new[question_no].selectedIndex))
            errorMessage = "Please Select Any Of The Given Option";
          } else {
            isValidate = true;
          }
        break;

      case "multiple":
        arr_new[question_no].options.map((option) => {
          if (option.isChecked == true) {
            isValidate = true;
          } else { 
            errorMessage = "Please Select Any Of The Given Option";
          }
        }); 
        break;
        case "image":
          arr_new[question_no].options.map((option) => {
          if (option.isChecked == true) {
            isValidate = true;
          } else {
            errorMessage = "Please Select Any Of The Given Images";
          }
        }
        );
        break;
      case "text":
        // if ((arr_new[question_no].textAnswer) == ''|| (arr_new[question_no].textAnswer) == undefined || (arr_new[question_no].textAnswer) == 'undefined') {
        //   errorMessage = "Please Enter Your Answer";
        // } else {
          isValidate = true;
        // }
        break;
      case "other":
        let val = this.validateSpecify(arr_new)
         if(val == true || val === 'true'){
           console.log('inside if') 
           isValidate = true
         }else{
          console.log('inside else'+val)
           errorMessage = val 
         }
      break; 
    } 

    if (!isValidate)  
    {
      console.log("Error \n"+errorMessage)
      this.setState({"errorMsg":errorMessage});
      this.setState({"errorMsgModal":true});
      return;
    }
    if (question_no < arr_new.length - 1) {
    question_no++;
    let len = arr_new.length;
    let roundOf = 100 / len;
    now = now +roundOf;
    this.arrayData(arr_new);  
    }
    else{
      if (isValidate){
        this.setState({'showSubmitModal':true}); 
      }else{
        this.setState({"errorMsg":errorMessage});
        this.setState({"errorMsgModal":true});
      }
    }
  }

  validateSpecify(arr_new){
    // console.log("inside validae/////////////////////////////////")
    let errorMessage = "Please Select Or Add a Answer";
    let isValidate = false;
    let option = []; 
    option = arr_new[question_no].options;
    let returnVal;
    // let i = 0; 
        for(let i in option)
        { 
          // console.log("in loop specify\n"+option[i].specify+'\nin label\n'+option[i].value+'\nin label\n'+option[i].value)
          let optionSelect = undefined;
          if(arr_new[question_no].selectedIndex == null || arr_new[question_no].selectedIndex === '' || arr_new[question_no].selectedIndex == undefined){
            // optionSelect=100;
          }else{
            // console.log("in else optionSelect:"+arr_new[question_no].selectedIndex)
            optionSelect = arr_new[question_no].selectedIndex;
          } 
          //////////////////////////////////////////////////////////////// 
          
          if (option[i].value == optionSelect && option[i].specify === 'true') {
            if (arr_new[question_no].textAnswer == undefined || 
              arr_new[question_no].textAnswer === '') {
              // console.log('in if 1 \n'+option[i].specify+'\nin label\n'+option[i].label)
              errorMessage = "Please Tell Us Why You Say " + option[i].label; 
              returnVal = errorMessage;
              break;
            } else {  
              // console.log("in else 1\n"+option[i].specify+'\nin label\n'+option[i].label)
              isValidate = true;
              returnVal = isValidate;
              break;
            }
          } else { 
            // console.log("inelse enter\n"+optionSelect+'\nin specify\n'+option[i].specify+'\nin label\n'+option[i].label)
            if (
              optionSelect == undefined ||
              optionSelect === '' && option[i].specify == false
            ) {
            // console.log("in if 2\n"+option[i].specify+'\nin label\n'+option[i].label)
             errorMessage = "Please Select Any Of The Given Option";
             returnVal = errorMessage; 
             break;
            }
            else if (
              option[i].value == optionSelect && option[i].specify === 'false'
            ) {
            // console.log("in if 3\n"+option[i].specify+'\nin label\n'+optionSelect)
            isValidate = true;
            returnVal = isValidate;
            break;
            }
          }
        }
        // console.log("go for return >>>"+returnVal)
        return returnVal
    }
  
    onPrevBtnClick(arr){
      arr_new = arr;
      question_no--;
      let len = arr_new.length;
      let roundOf = 100 / len;
      now = now - roundOf;
      this.arrayData(arr_new);
    } 
  
  
    showConfirmationAlert =() =>{
      // let len = arr_new.length;
      // let roundOf = 100 / len;
      // now = now +roundOf; 
    
      // if (window.confirm('Are You Sure?')) {
      //   now = now +roundOf; 
      //   console.log('in if now'+now)
      //   this.refresh();
      //   this.submitAnswerProcess(); 
      // }
    } 
  
  redirect_to_dashboard = () => {
    this.props.history.push({
      pathname: `/Dashboard`
    })
  }  
  
  redirect_to_success = () => {
    let id = this.uri_data; 
    this.props.history.push({ 
        pathname: '/SpqSubmitSuccessful/'+ id + ''
    })
  }

  redirect_to_survey = () => {
    this.props.history.push({ 
        pathname: '/Spq/' 
    })
  }
   
  onRadioButtonChange(value,selectedOption)  // for single type questions
  {
    console.log("radio button changer"+this.getDateTime())
    arr_new[question_no].selectedIndex = value;
    arr_new[question_no].nextTime = this.getDateTime();
    this.refresh()
    this.onNextBtnClick(arr_new);
  }

  // $("#"+inputboxid).prop('checked') == true && 
  onSpecifyButtonChange(boxIndex,selectedOption)  // for single type questions
  {
    this.refresh();
    let inputboxid= 'option3-'+boxIndex
    let inputBoxIsChecked = $("#"+inputboxid).prop("checked");
    // console.log("onSpecifyButtonChange\n"+inputboxid+"selectedOption\n"+selectedOption.specify);
    if($("#"+inputboxid).is(':checked') && (selectedOption.specify == true || selectedOption.specify == 'true')){ 
      arr_new[question_no].selectedIndex = selectedOption.value;
      this.refresh();
      // console.log("in change if")
    }else{
      arr_new[question_no].selectedIndex = selectedOption.value;
      arr_new[question_no].nextTime = this.getDateTime();
      // console.log("in change else"+arr_new[question_no].selectedIndex)
      this.onNextBtnClick(arr_new);
    }
    // this.refresh();
  }

  onImageChange(e) //for image type question 
  {
    let id = e.id;
    let isChecked = e.isChecked;
    arr_new[question_no].nextTime = this.getDateTime();
    this.setDataOnOptions(id,isChecked)
    // console.log("\nAfter\n"+JSON.stringify(arr_new[question_no].options)) 
    this.refresh();
    this.onNextBtnClick(arr_new);
  }

  onCheckBoxChange(e) //for multiple type question 
  {
    let id = e.id;
    let isChecked = e.isChecked; 
    arr_new[question_no].nextTime = this.getDateTime();
    this.setDataOnOptions(id,isChecked)
    this.refresh();
  }  

  componentWillUnmount(){

    arr_new=[];

    //let url_path = '/survey/surveySave';
    if(surveySubmit == false){
      //this.saveToImcomplete(url_path);
    }
  }

  setDataOnOptions(ids,data) 
  {
    let optionArray = arr_new[question_no].options;
    for (var i = 0; i < optionArray.length; i++) {
      if (optionArray[i].id === ids) {
        optionArray[i].isChecked = !data;
        return; 
      }
    }
  } 


  onTextUpdate(e) //for text type question 
  {
    let text = e.target.value; 
    arr_new[question_no].textAnswer = text;
    arr_new[question_no].nextTime = this.getDateTime();
    this.refresh();
  }


  savePoints = () => {
    console.log("survey points" + surveyPoint)
    reactLocalStorage.set('@ClirnetStore:survey_point', surveyPoint)
    reactLocalStorage.set('@ClirnetStore:survey_title', surveyTitle)
  }
////////////////////Network functions/////////////////////// 
submitAnswerProcess() {
    let len = arr_new.length;
    let roundOf = 100 / len;
    now = now +roundOf;  
    isSubmitProgress = true;
    let category = surveyCategory;
    // console.log('category answer'+category)
    let url_path = '';
    switch(category)
    {
    case 'survey':
      url_path = 'survey/surveyAnswer' 
      this.submitAnswer(url_path);
    break;
    case 'quiz':
      
      if(isPending == true || isPending == 'true'){ 
        url_path = 'survey/quizIncompAnswer'
        console.log('in quiz pending')
      }else{
        url_path = 'survey/quizAnswer'
        console.log('in quiz new')
      }
      this.submitAnswer(url_path);                    
    break;
  }
}
 
  submitAnswer(url_path){
    let id = this.uri_data;  
    let answers = arr_new;
    
    let answerData = { 
      'survey_id': id,  
      'answer_json': JSON.stringify(answers)
    }
    // console.log("submit answer"+id);
    fetch(url+url_path, { 
      method: 'POST',
      body: JSON.stringify(answerData),    
      headers: {  
      'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
      'version': 'rjsw 1.1.1'
      }
      }).then((response) => response.json()).then((responseJson) => {
       let success = responseJson.status_code;
       console.log('survey answer submit'+JSON.stringify(responseJson)) 
       if(success == 200){
        surveySubmit = true;
         if(surveyCategory != 'quiz'){
          this.addPoints();
          this.reset_arr_new();
          this.redirect_to_success();
         }else{ 
          // this.setPoints(responseJson);
          isSubmitProgress = false;
          this.reset_arr_new();
          this.redirect_to_success();
         }
       }
       else{
        isSubmitProgress = false;
        alert("Failed to submit");
       }
      }).catch((error) => { 
          isSubmitProgress = false;
          console.log("Error"+error);
      });  
  }

  timerStop(){
    if(surveySubmit == false && surveyCategory == 'quiz'){
      this.submitAnswerProcess(); 
    }
  }

  setPoints(responseJson){
    // let quizData = []; 
    let quizData = responseJson.data;
    console.log('quiz wrong answer'+quizData.totwrongAns)
    // quizData.map(r => {
      reactLocalStorage.set('@ClirnetStore:totalPoint', quizData.totalPoint);
      reactLocalStorage.set('@ClirnetStore:totcorrectAns', quizData.totcorrectAns);
      reactLocalStorage.set('@ClirnetStore:totwrongAns', quizData.totwrongAns);
      reactLocalStorage.set('@ClirnetStore:totQus', quizData.totQus); 

      console.log('in set points:'+ quizData.totalPoint+'\n'+quizData.totcorrectAns+'\n'+quizData.totwrongAns+'\n'+quizData.totQus);
    // })
  }

  addPoints()
  {
    let id = this.uri_data;
    if(id == '' || id == undefined){
      console.log('Id can not be empty')
    }else{
    let pointsData = {
      'survey_id':id,
      'point':surveyPoint
    }    

    fetch(url+'survey/addpoint', { 
      method: 'POST',
      body: JSON.stringify(pointsData), 
      headers: {
      'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
      'version': 'rjsw 1.1.1'
      }
      }).then((response) => response.json()).then((responseJson) => {
        isSubmitProgress = false;
       let responseData = responseJson.data;
       let success = responseJson.status_code;
       if(success == 200){
         console.log('point added') 
       }
       else{
        alert("Failed to update point");
       }
      }).catch((error) => { 
        isSubmitProgress = false;
          console.log("Error"+error);
      });  
    }
  }

  onSaveLaterClick(arr){  
    arr_new = arr
    this.setState({"showCompleteLaterModal":true})  
  }

  onSaveLaterConfirm(arr){
    arr_new = arr
    isSubmitProgress = true;
    let url_path = 'survey/surveySave';
    this.saveToImcomplete(url_path);   
  }


  saveToImcomplete(url_path){
    let id = this.uri_data;  
    let answers = arr_new;
   
    let answerData = { 
      'survey_id': id,  
      'answer_json': JSON.stringify(answers),
      'question_no': question_no
    }
    
    fetch(url+url_path, {  
      method: 'POST',
      body: JSON.stringify(answerData),    
      headers: {  
      'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
      'version': 'rjsw 1.1.1'
      }
      }).then((response) => response.json()).then((responseJson) => {
       let success = responseJson.status_code;
        isSubmitProgress = false;
        if(success == 200){  
          this.reset_arr_new();
          this.redirect_to_survey();  
        }else{
        alert("Failed to submit");
       }
      }).catch((error) => { 
        isSubmitProgress = false;
          console.log("Error"+error);
      });
  }
  
  convertToMinutes(mail_time){
    let sec;
    if(mail_time == '' || mail_time == undefined || mail_time == null){  
      sec = 0
    }
    sec = parseInt(mail_time)* parseInt(1000) * parseInt(60);
    console.log('min'+sec);
    return sec; 
  }

  display_banner(datam)
  {
     this.setState({"banner_display":true})
  }

    render() {
      // console.log("now"+now);
      setTimeout(() => {
        this.setCssToScreen.bind(this); 
      }, 300); 
      return (
        <div className={ isMobile == true ? 'full_width wrap_body mblScreen' : 'full_width wrap_body dskScreen'}> 
          <Header history={this.props.history}  page_name={pageNames}/>
            <section className="full_width body_area">
            
            {/* {this.arr_new.map((r, index) => ( */}
              <div className="container"> 
                <div className="row">
                <Banner type_id={this.uri_data} type={"survey"}  apiresponserecieved={this.display_banner.bind(this)} api_call_detail={1} api_call={0}/>          

{this.state.banner_display?<Banner type_id={this.uri_data} banner_position={1} unmount_call={1} type={"survey"}  api_call={1} before_unload_call={1}/>:null}

                  <section className="text-left full_width srvQus_p">
                    <div className="row">
                      {optionReady == true?
                      <div className="col-md-8 offset-md-2 col-12 radius-6 srvQus_Box">
                        <h2 class="font_22px colorBlack font600 srvQus_BoxTtl">{(surveyTitle == ''||surveyTitle == undefined)? "":surveyTitle}
                        {(optionReady == true && surveyCategory == 'quiz')?
                        <span className="font_16px colorWhite font600 timerQuizQus">
                            <Timer className="font_22px colorBlack font600"
                              initialTime={this.convertToMinutes(surveyTime)}
                              direction="backward"
                              checkpoints={[
                                {
                                  time: 0,
                                  callback: () => this.timerStop(),
                                }]}>
                                {() => (
                                  <React.Fragment>0<Timer.Minutes />:
                                  <Timer.Seconds/></React.Fragment> 
                                )}
                            </Timer></span>: 
                            null
                        }
                        </h2>
                        <div className="clearfix"></div>
                        <div className="clearfix"></div>
                        <div className="full_width srvQus_QusArea"> 
                          {question_image?<img src={question_image} className="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|} srvImg" alt="Question Image"/>:null}
                          <h4 className="font_18px colorBlack font600 srvQus_QusTtl">{question}</h4>
                          <div className="clearfix"></div>
                          {(optionReady == true)?
                            this.renderOptions(type):
                          <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={80} width={80} visible={true} />}
                     
                          <div className="clearfix"></div>
                          <div className="full_width text-center">
                            <div className="srvQus_QusProgress">
                              {this.showProgress(Math.round(now))} 
                            </div> 
                          </div>  
                          <div className="clearfix"></div>
                          <div className="full_width text-center">
                          {question_no> 0 ?(
                          <button href="javascript:void(0)" disabled={isSubmitProgress} type="button" id="prev-btn" onClick={this.onPrevBtnClick.bind(this,arr_new)} className="cmnBtn btnBlue radius-6 font_14px m-1 font600 survey_detailsBtmBtn survey_detailsBtmBtnLeft"><img src={begainArrowLeft} /> Prev </button>
                          ):null}
                          <button href="javascript:void(0)" disabled={isSubmitProgress} type="button" id="next-btn" onClick={this.onNextBtnClick.bind(this,arr_new)} className="cmnBtn btnBlue radius-6 font_14px m-1 font600 survey_detailsBtmBtn">{question_no=== arr_new.length - 1 ? "Submit" : "Next"} <img src={begainArrow} /></button>
                          {question_no> 0 && surveyCategory == 'survey' ?(
                          <button href="javascript:void(0)" disabled={isSubmitProgress} id="save-later-btn" type="button" onClick={this.onSaveLaterClick.bind(this,arr_new)} className="cmnBtn btnBlue radius-6 font_14px m-1 font600 survey_detailsBtmBtn survey_detailsBtmBtnLeft">Complete Later </button>
                          ):null}
                          </div>
                          <div className="clearfix"></div>
                          {(isSubmitProgress)?
                            <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={80} width={80} visible={true} />:null}
                          {(clientLogo == '' || clientLogo == null)?null:
                          <div className="full_width text-center">
                           { this.setClientLogo('',clientLogo)}
                          </div>}
                        </div>
                      </div>
                    :<SpqQuestionLoader/>}
                    </div>
                  </section> 
                </div>
              </div>
              {/* ))} */}
            </section>

            <Modal className="in ssnCancelPop" centered="true" animation="slide" backdrop={ 'static' } keyboard={ false }  show={this.state.errorMsgModal} onHide={()=>{ this.setState({"errorMsgModal":false});}}>
              <Modal.Header className="justify-content-center">
                <Modal.Title className="font600 font_18px colorBlack">Warning</Modal.Title>
              </Modal.Header>
              <Modal.Body> 
              <div className="full_width">
                <div className="full_width cmnCheckBox_row cmnRadio_row">
                  <label className="font600 font_12px colorBlack form-check-label" for="cancelation-1">{this.state.errorMsg}</label>
                </div>
              </div>
              </Modal.Body>
              <Modal.Footer className="justify-content-center">
                <a href="javascript:void(0)" className="radius-40 font500 btnRed cmnBtn btnCmnSmall" variant="secondary" onClick={()=>{ this.setState({"errorMsgModal":false});}}>
                  OK
                </a>
              </Modal.Footer>
            </Modal>
            {/* ////////////////////////////////////////////////////////////////////////////////////////// */}
            
              <Modal className="in ssnCancelPop" centered="true" animation="slide" backdrop={ 'static' } keyboard={ false }  show={this.state.showSubmitModal} onHide={()=>{ this.setState({"showSubmitModal":false});}}>
                  <Modal.Header className="justify-content-center">
                    <Modal.Title className="font600 font_18px colorBlack">Confirm</Modal.Title>
                  </Modal.Header>
                <Modal.Body>
                <div className="full_width">
                  <div className="full_width cmnCheckBox_row cmnRadio_row">
                    <label className="font600 font_12px colorBlack form-check-label" for="cancelation-1">Are you sure you want to submit?</label>
                  </div>
                </div>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                  <a href="javascript:void(0)" className="radius-40 font500 btnRed cmnBtn btnCmnSmall" variant="secondary" onClick={()=>{ this.setState({"showSubmitModal":false});}}>
                    No
                  </a>
                  <a href="javascript:void(0)" className="radius-40 font500 btnGreen cmnBtn btnCmnSmall" variant="secondary" onClick={()=>{this.submitAnswerProcess(); this.setState({"showSubmitModal":false});}}>
                    Yes
                  </a>
                </Modal.Footer>
              </Modal>
      {/* ///////////////////////////////////////////////////////////////////////// */}

              <Modal className="in ssnCancelPop" centered="true" animation="slide" backdrop={ 'static' } keyboard={ false }  show={this.state.showCompleteLaterModal} onHide={()=>{ this.setState({"showSubmitModal":false});}}>
                  <Modal.Header className="justify-content-center">
                    <Modal.Title className="font600 font_18px colorBlack">Confirm</Modal.Title>
                  </Modal.Header>
                <Modal.Body>
                <div className="full_width">
                  <div className="full_width cmnCheckBox_row cmnRadio_row">
                    <label className="font600 font_12px colorBlack form-check-label" for="cancelation-1">Are you sure you want to complete later?</label>
                  </div>
                </div>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                  <a href="javascript:void(0)" className="radius-40 font500 btnRed cmnBtn btnCmnSmall" variant="secondary" onClick={()=>{this.setState({"showCompleteLaterModal":false});}}>
                    No
                  </a>
                  <a href="javascript:void(0)" className="radius-40 font500 btnGreen cmnBtn btnCmnSmall" variant="secondary" onClick={()=>{this.onSaveLaterConfirm(arr_new); this.setState({"showCompleteLaterModal":false});}}>
                    Yes
                  </a>
                </Modal.Footer>
              </Modal>

              {/* /////////////////////////////////////////////// */}

              <Modal id="root-modal" backdrop={ 'static' } keyboard={ false } className="in ssnCancelPop" centered="true" animation="slide" show={this.state.showVerifyUpModal} onHide={() => { this.setState({ "showVerifyUpModal": false }); }} >
                <Modal.Header className="justify-content-center">
                  <Modal.Title  className="font600 font_18px colorBlack">
                    {
                      (this.state.phone_no == undefined || this.state.phone_no == 'undefined')?
                      "Please Add Phone No First!":
                      "Please Verify First!"
                    }
                  </Modal.Title>
                </Modal.Header>  
              <Modal.Body> 
                <div class="form_container_cmn">
                  <div class="col-xs-12 form_row_pop autoLoginPopFrm">
                    {
                      (this.state.phone_no == undefined || this.state.phone_no == 'undefined' )?
                      <div className="full_width frmPart">
                         <div class="full_width form_row phoneCodePrnt">
                        <Searchable  
                      value={this.state.isd_no} //if value is not item of options array, it would be ignored on mount
                      placeholder="Select Country Code" // by default "Search"
                      notFoundText="No result found" // by default "No result found"
                      options={country_codes}
                      className="font500 font_14px"
                      onSelect={option => {
                          this.dropDownChange(option.value);
                        //  console.log(option.value); // as example - {value: '', label: 'All'}
                      }}
                      listMaxHeight={200} //by default 140
                      />
                        <div class="full_width form_row_in regFrmRowEffct regFormRowWtoHvr"> 
                        <label class="font_14px font600 colorBlack">Mobile No.</label>
                        <input type="tel" class="reg_input_efect regRowCount3"   maxLength="10" onChange= {this.onInputChange('new_mobile')} inputRef={ref => { this.phoneInput = ref; }}  value={this.state.phone_no} pattern="[6789][0-9]{9}"/> 
                        </div>
                      </div> 
                        <a href="javascript:void(0)" className="radius-40 font500 btnGreen cmnBtn btnCmnSmall" variant="secondary"  onClick={() => { this.onAddMobileClick()}}>
                            Add
                        </a> 
                        <a href="javascript:void(0)" className="radius-40 font500 btnGreen cmnBtn btnCmnSmall" variant="secondary"  onClick={() => { this.redirect_to_spq_detail(this.uri_data)}}>
                            Cancel
                        </a> 
                      </div>:
                      //////////////////////////verification modal////////////////////////////

                        <div className="full_width frmPart"> 
                        <div class="full_width">     
                        <label class="font_12px font600 colorBlack">To complete this survey, please verify it's you </label>
                        <label class="font_12px font600 colorBlack">One OTP Send To Your Number ******{
                          this.state.phone_no.slice(this.state.phone_no.length - 4)} </label>
                        </div> 
                        {(this.state.display_call_button!=true)?
                          <span className="float-right">
                            <Timer className="font600 font_16px"
                              initialTime={30000}
                              direction="backward" 
                              checkpoints={[
                              {
                                time: 0,
                                callback: () => this.setState({"display_call_button":true}),
                              }
                            ]}>
                            {() => (
                                <React.Fragment>
                                0<Timer.Minutes />:
                                    <Timer.Seconds />
                                </React.Fragment>
                            )} 
                            </Timer>
                          </span>:null}
                          <div class="full_width form_row">
                            <div class="full_width form_row_in regFrmRowEffct regFormRowWtoHvr"> 
                              <label class="font_14px font600 colorBlack"> Enter OTP</label>
                                <input class="reg_input_efect regRowCount1"  type="text" maxLength="4" pattern="[123456789][0-9]{9}" onChange= {this.onInputChange('otp')}  value={this.state.otp} required /> 
                            </div>  
                          </div> 
                          <div className="full_width l_form_row l_form_row_dblBtn"> 
                            {(this.state.display_call_button==true)?<button onClick={() => { this.setState({ "is_loader": true }); this.sendOtp('send','text'); }} className="radius-6 font_14px font600 l_frmSubmit">Resend OTP</button>
                            :<button  disabled="true" onClick={() => { this.setState({ "is_loader": true }); this.sendOtp('send','text'); }} className="radius-6 font_14px font600 l_frmSubmit">Resend OTP</button>
                            }

                            <button onClick={() => { this.verifyOtp() }} className="radius-6 font_14px font600 l_frmSubmit">Verify</button>
                          </div>
                          {(this.state.display_call_button==true)?
                          <div className="full_width form_row">  
                          <Form.Label className="font600 font_14px colorBlack ">Did not receive OTP over message?</Form.Label>  
                          <div className="full_width l_form_row  l_form_row l_form_row_dblBtn"> 
                          <button onClick={() => { this.setState({ "is_loader": true }); this.redirect_to_spq_detail(this.uri_data)}} className="radius-6 font_12px font600 l_frmSubmit">Cancel</button>
                          <button onClick={() => { this.setState({ "is_loader": true }); this.sendOtpWithCall() }} className="radius-6 font_12px font600 l_frmSubmit">Get OTP Via Call</button> 
                        </div>
                        </div>  
                          :
                          <div className="full_width form_row text-center">  
                          <a href="javascript:void(0)" className="radius-40 font500 btnGreen cmnBtn btnCmnSmall" variant="secondary"  onClick={() => { this.redirect_to_spq_detail(this.uri_data)}}>
                            Cancel
                          </a></div>}
                      </div> 
                      ///////////////////////////////////
                    }
                  </div>
                  {(this.state.err_msg !='')?
                  <div className="full_width text-center mt-2 alert alert-danger">
                    <label>{this.state.err_msg}</label>
                  </div>:null}
                </div>
              </Modal.Body>
              <Modal.Footer className="justify-content-center">
              {(this.state.is_loader == true || this.state.is_loader === 'true')? 
                  <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={40} width={40} visible={true} />:null} 
              </Modal.Footer>
            </Modal>
          <Footer  history={this.props.history}/>  
          {/* <div></div> */}
        </div>
      );
    }
  }
export default SpqQuestion;