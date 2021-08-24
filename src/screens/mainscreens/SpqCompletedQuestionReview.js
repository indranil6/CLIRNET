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
import Form from 'react-bootstrap/Form'; 
import "react-datepicker/dist/react-datepicker.css";
import _ from 'lodash';
import Modal from 'react-bootstrap/Modal';
import {isMobile} from 'react-device-detect';
import Slider from "react-slick"; 
import Banner from '../mainscreens/Banner';
import SpqQuestionLoader from '../LoadingPlaceholders/SpqQuestionLoader.jsx';

const gtag = window.gtag;

const url = AppConfig.apiLoc;
var now = 0;
const pageNames = "Polls & Quizzes"

var optionReady = false;
var surveySubmit = false;
var isPending = false;
var surveyTime = undefined;
var isSubmitProgress = false;

var arr_new = [];
var surveyTitle;
var surveyPoints;
var surveyCategory;
var question,type,options,answer_status;
var correctoption = [];
var question_no = 0;
var selectedValue = undefined;
var textAnswer = undefined;
var surveyPoint = undefined;
var browser_change = 0;
var clientLogo = '';
let question_image = '';
class SpqCompletedQuestionReview extends React.Component
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
      banner_display:false
    };
    question_image = '';
    question = '';
    optionReady = false;
    clientLogo = '';
    
    this.getSurveyDetails(this.uri_data); 
    // this.getAnswerDetails(this.uri_data); 
    this.display_banner = this.display_banner.bind(this);
  } 

  display_banner(datam)
  {
    this.setState({"banner_display":true})
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
    window.document.title = "CLIRNET - Completed SPQ Answer Review"
    gtag('config', AppConfig.gtag_measure_id, {
			'page_title': window.document.title,
			'page_location': window.location.href,
			'page_path': window.location.pathname
			});
    $('.li_survey').attr('id', 'survey_cal'); 
   
    $(".survey_mobile").addClass("active");    
    $('.li_survey').attr('id', 'survey_cal');
    $(".surveyCollaps").click(function () {
      $(this).toggleClass("surveyCollapsActive");
      $(".surveyLeftBoxArea").slideToggle();
    });

    $(window).bind("load resize", function () {
      if ($(window).innerWidth() <= 991) {
        $(window).scroll(function () {
          var scroll = $(window).scrollTop();
          if (scroll >= 100) {
            $(".surveyCollaps").removeClass("surveyCollapsActive");
            $(".surveyLeftBoxArea").slideUp();
          }
        });
      }
    });

    
    window.onhashchange = () => { 
      console.log('window change')
      question_no = 0;
      now = 0;
    }
    
    let _this = this;
    window.addEventListener('beforeunload',(ev)=>{
      console.log('Window reloaded'); 
      ev.preventDefault();  
    })
  }

  getSurveyDetails = (id) => { 
    fetch(url+'survey/detail?id='+id, { 
        method: 'GET',
        headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'
        }
        }).then((response) => response.json()).then((responseJson) => {
         arr_new = [];
        let responseData = responseJson.data;
        let userSurveyStatus;
        responseData.map((r) =>{
          surveyTitle = r.survey_title;
          surveyPoint = r.survey_points; 
          surveyCategory = r.category; 
          userSurveyStatus = r.user_survey_status; 
          if(r.sponsor_logo == null || r.sponsor_logo === 'null' || r.sponsor_logo == ''){
            // clientLogo = r.client_logo;
          }else{
            clientLogo = r.sponsor_logo;
          }
        });

        if(surveyCategory == 'poll'){
          this.redirect_to_poll_detail(); 
          }else{
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
      this.getAnswerDetails(this.uri_data); 
    break;
    case 'incomplete':
      this.redirect_to_survey(this.uri_data);
    break;
    case 'pending':
      this.redirect_to_pending(this.uri_data);
    break;
  } 
} 
   redirect_to_poll_detail = () =>{
  let ids = this.uri_data;
  this.props.history.push({
    pathname: '/PollDetails/' + ids + '' 
  })   
}

redirect_to_survey = (id) => { 
  this.props.history.push({ 
    pathname: '/SpqDetails/'+ id + ''
})
}

redirect_to_pending = (id) => { 
  this.props.history.push({ 
    pathname: '/SpqDetailsPending/'+ id + ''
})
}


  getAnswerDetails(id){
    optionReady = false; 
    fetch(url+'survey/detailAnswer?survey_id='+id, {
        method: 'GET',
        headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'
        }
        }).then((response) => response.json()).then((responseJson) => {
        arr_new = [];
        let responseData = responseJson.data;
        this.parseResponseJson(responseData);
        }).catch((error) => {
            console.log("Error"+error);
      });
  } 

  redirect_to_survey_detail = (id) => {
    // console.log("ready to reddirect"+id);
    this.props.history.push({ 
        pathname: '/SpqCompletedDetails/'+ id + ''
    })
}

parseResponseJson = (responseData) =>
 {
  let dataJson = responseData;
  let mData = JSON.parse(unescape(dataJson));
   arr_new = Object.keys(mData).map(function (k){
    return mData[k]; 
  });
  this.arrayData(arr_new)
 }
 
 arrayData(arr_new){
  question_image = '';
  question_image = arr_new[question_no].questionImageURL;
  question = arr_new[question_no].question;
  type = arr_new[question_no].type;
  options = arr_new[question_no].options;
  let correctArray = arr_new[question_no].correctOption;
  correctoption.push(correctArray);
  answer_status = arr_new[question_no].answer_status;
  // console.log("new array created"+JSON.stringify(arr_new));
  optionReady = true;
  this.refresh();
 }

 reset_arr_new = () => {
  //  alert('array reset')
   arr_new = [];
   question_no = 0;
   now = 0; 
 }

 renderOptions = (type,arr) => {
  // arr_new = arr 
  console.log("in array"+JSON.stringify(arr_new[question_no])+'\n question no'+question_no)
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
              <input disabled id="booleanID"
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
              <input disabled id="booleanID"
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
                  <input disabled id={inputboxid}
                  className="form-check-input" 
                  type="radio" 
                  checked={options.value == optionSelect} 
                  onChange={this.onRadioButtonChange.bind(this,options.value,options)} 
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
            <Form.Check disabled checked onChange={() => {this.onCheckBoxChange(options);}} id={options.id} className="cmnCheckBox_row" type="checkbox" label={options.value} />:
            <Form.Check disabled onChange={() => {this.onCheckBoxChange(options);}} id={options.id} className="cmnCheckBox_row" type="checkbox" label={options.value} />
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
              <input disabled checked onChange={this.onImageChange.bind(this,options)} className="form-check-input" id={options.id} type="radio" name="arngDiscus" />
                <label className="form-check-label" for={options.id}>
                  <img src={options.value} className="translate_both"/>  
                </label>
            </div>:
          < div className="col-md-6  full_width p-1 cmnCheckBox_row">
            <input disabled onChange={this.onImageChange.bind(this,options)} className="form-check-input" id={options.id} type="radio" name="arngDiscus" />
            <label className="form-check-label" for={options.id}>
              <img src={options.value} className="translate_both"/>
            </label>
          </div>  
        )}
        </div>
        </div>          
      );
      break; 
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
                  <input id={inputboxid} disabled
                  className="form-check-input "
                  type="radio" 
                  checked={options.value == optionSelect} 
                  value={options.value} />
                  <label for={inputboxid} className="form-check-label srvQus_QusCheck3" key={i}> 
                    {options.label}
                  </label> 
                  </div>  
                  { 
                  (options.value == optionSelect && options.specify === 'true')? 
                  <Form.Control disabled as="textarea" rows="4"
                  value={((arr_new[question_no].textAnswer) == ''|| (arr_new[question_no].textAnswer) == undefined)?'':arr_new[question_no].textAnswer} name="body" className={"font_14px full_width srvQus_QusCheck3Textarea " +textBoxTempClass} placeholder="Type here..."  />  
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
    arr_new = arr;
    if (question_no < arr_new.length - 1) {
      question_no++; 
      let len = arr_new.length;
      let roundOf = 100 / len;
      now = now +roundOf;
      // console.log("progress"+now);
      this.arrayData(arr_new); 
      }
      else{  
        this.reset_arr_new();
        this.redirect_to_survey();
      }
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
    textAnswer = text;
    arr_new[question_no].textAnswer = text;
    textAnswer = text;
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
      'answer_json': JSON.stringify(answers) 
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

    render() {
      // console.log("now"+now);
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
                      {optionReady?
                      <div className="col-md-8 offset-md-2 col-12 radius-6 srvQus_Box">
                        <h2 class="font_22px colorBlack font600 srvQus_BoxTtl">{(surveyTitle == ''||surveyTitle == undefined)? "":surveyTitle}
                        {/* {(optionReady == true && surveyCategory == 'quiz')?
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
                        } */}
                        </h2>
                        <div className="clearfix"></div>
                        <div className="clearfix"></div>
                        <div className="full_width srvQus_QusArea">
                        {question_image?<img src={question_image} className="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|} srvImg" alt="Question Image"/>:null}
                          <h4 className="font_18px colorBlack font600 srvQus_QusTtl">{question}</h4>
                          <div className="clearfix"></div>
                          {(optionReady == true)?
                            this.renderOptions(type,arr_new):
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
                          <button href="javascript:void(0)" disabled={isSubmitProgress} type="button" id="next-btn" onClick={this.onNextBtnClick.bind(this,arr_new)} className="cmnBtn btnBlue radius-6 font_14px m-1 font600 survey_detailsBtmBtn">{question_no=== arr_new.length - 1 ? "Go back to polls and quizzes" : "Next"} <img src={begainArrow} /></button>
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
          <Footer  history={this.props.history}/>  
          {/* <div></div> */}
        </div>
      );
    }
  }
export default SpqCompletedQuestionReview;