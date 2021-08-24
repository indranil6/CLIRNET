import React,{ Component } from 'react';
import Loader from 'react-loader-spinner'
import $, { parseJSON } from 'jquery';
import 'firebase/storage'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { reactLocalStorage } from 'reactjs-localstorage';
import AppConfig from '../config/config.js';
import Header from './Header';
import Footer from './Footer';
import begainArrow from '../../images/begainArrow.png'; 
import begainArrowLeft from '../../images/begainArrowLeft.png';
import Form from 'react-bootstrap/Form';  
import "react-datepicker/dist/react-datepicker.css";
import Slider from "react-slick"; 
import Modal from 'react-bootstrap/Modal';
import {isMobile} from 'react-device-detect';
import Banner from '../mainscreens/Banner';
import SpqQuestionLoader from '../LoadingPlaceholders/SpqQuestionLoader.jsx';

const gtag = window.gtag;

const pageNames = "Polls & Quizzes"
const url = AppConfig.apiLoc;
var now = 0;
var optionReady = false;
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
var clientLogo = '';
let question_image = '';

class SpqQuestionPending extends React.Component 
{
  constructor(props){
    super(props); 
    this.uri_data = this.props.match.params.id;
    this.action = this.props.match.params.action; 
    this.state= { 
      display:false,
      showSubmitModal: false,
      errorMsgModal: false,
      errorMsg:'',
      banner_display:false
    }; 
    question_image = '';
    clientLogo = '';
    optionReady = false;
    this.getSurveyDetails(this.uri_data); 
    this.display_banner = this.display_banner.bind(this);
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
  display_banner(datam)
    {
        this.setState({"banner_display":true})
    }

  componentDidMount() { 
    window.document.title = "CLIRNET - Answer Incomplete SPQ"
    gtag('config', AppConfig.gtag_measure_id, {
			'page_title': window.document.title,
			'page_location': window.location.href,
			'page_path': window.location.pathname
			});
    $('.li_survey').attr('id', 'survey_cal'); 
    $(".survey_mobile").addClass("active");

    $(".surveyCollaps").click(function(){
      $(this).toggleClass("surveyCollapsActive");
      $(".surveyLeftBoxArea").slideToggle();
  });

    window.onhashchange = function(){
      question_no = 0;
      now = 0
    }
  }

  getAnswerDetails(id){
    optionReady = false; 
    fetch(url+'survey/surveyIncompGet?id='+id, {   
        method: 'GET',
        headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'
        }
        }).then((response) => response.json()).then((responseJson) => {
        arr_new = [];
        let responseData = responseJson.data;
        let questionData = responseData.data;
        question_no = responseData.question_no; 
        if(questionData == null || questionData == 'null'){

        }else{
          this.parseResponseJson(questionData); 
        }
        }).catch((error) => {
            console.log("Error"+error);
      });
  }

  getSurveyDetails = (id) => { 
    //  console.log("In survey Question");  
     fetch(url+'survey/detail?id='+id, { 
         method: 'GET',
         headers: {
         'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
         'version': 'rjsw 1.1.1'
         }
         }).then((response) => response.json()).then((responseJson) => {
          arr_new = [];
          let userSurveyStatus;
         let responseData = responseJson.data;
         responseData.map((r) =>{
           surveyTitle = r.survey_title;
           surveyPoint = r.survey_points; 
           surveyCategory = r.category;
           surveyTime = r.survey_time;
           userSurveyStatus = r.user_survey_status;
           if(r.sponsor_logo == null || r.sponsor_logo === 'null' || r.sponsor_logo == ''){
            // clientLogo = r.client_logo;
          }else{
            clientLogo = r.sponsor_logo;
          }
         })

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
      this.redirect_to_survey_detail(this.uri_data);
    break;
    case 'incomplete':
      this.redirect_to_survey();
    break;
    case 'pending':
      this.getAnswerDetails(this.uri_data);
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

 parseResponseJson = (responseData) =>
 {
  console.log('parse response')
  let dataJson = responseData;
  let mData = JSON.parse(unescape(dataJson));
  arr_new = Object.keys(mData).map(function (k){
    return mData[k]; 
  });

  if(question_no != 0){
    let len = arr_new.length;
    let roundOf = 100 / len;
    let i;
    for(i=0;i<question_no;i++){
      now = now +roundOf;
    }
  }
  this.arrayData(arr_new)
 } 
 
 arrayData(arr_new){
  question_image = '';
  question = arr_new[question_no].question;
  question_image = arr_new[question_no].questionImageURL;
  type = arr_new[question_no].type;
  options = arr_new[question_no].options;
  correctoption = arr_new[question_no].correctoption;
  optionReady = true;
  this.refresh(); 
 }

 reset_arr_new = () => {
   arr_new = [];
   question_no = 0; 
 }
 
 renderOptions(type) { 
  console.log("question mp \n"+JSON.stringify(arr_new[question_no]))
  let currentOptions = options;
  switch (type) { 
    case "boolean":
      let optionSelect = undefined; 
      let yesFlag = false;
      let noFlag = false;
      // optionSelect = JSON.stringify(arr_new[question_no].selectedIndex.value)
      if(arr_new[question_no].selectedIndex == null || arr_new[question_no].selectedIndex === '' || arr_new[question_no].selectedIndex == undefined){
        console.log('in if'+arr_new[question_no].selectedIndex)
      }
      else{  
        optionSelect = arr_new[question_no].selectedIndex;
        if(currentOptions[0].value == optionSelect){
          yesFlag = true; 
        }if(currentOptions[1].value == optionSelect){
          noFlag = true;
        }else{
          console.log('in else')
        }
      }
      return ( 
        <div>
            <div className="cmnCheckBox_row booleanTypeRadio">
              <input id="booleanID"
              className="form-check-input" 
              type="radio" name="abc"
              onClick={this.onRadioButtonChange.bind(this,currentOptions[0].value,arr_new)}
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
              onClick={this.onRadioButtonChange.bind(this,currentOptions[1].value,arr_new)}
              value="No"
              checked={noFlag}  />
              <label for="booleanID" className="form-check-label">
                No 
              </label> 
            </div>
          </div>
        );
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
                  checked={i == optionSelect} 
                  onChange={this.onRadioButtonChange.bind(this,i,arr_new)}
                  value={options.value} />
              <label for={inputboxid} className="form-check-label srvQus_QusCheck3" key={i}> 
                
                {options.label}
              </label> 
              </div>
          );})
          }
        </div>
      );
    case "multiple":
        return (
          <div className="full_width srvQus_QusCheck1">
           {currentOptions.map((options) =>
           (options.isChecked == true || options.isChecked == "true")?
            <Form.Check checked onChange={() => {this.onCheckBoxChange(options,arr_new);}} id={options.id} className="cmnCheckBox_row" type="checkbox" label={options.value} />:
            <Form.Check onChange={() => {this.onCheckBoxChange(options,arr_new);}} id={options.id} className="cmnCheckBox_row" type="checkbox" label={options.value} />
           )}
          </div>
        ); 
    case "text":
      return (
        <Form.Control 
        as="textarea"
        rows="4"
        onChange={this.onTextUpdate.bind(this)}  value={((arr_new[question_no].textAnswer) == ''|| (arr_new[question_no].textAnswer) == undefined)?'':arr_new[question_no].textAnswer} name="body" className="font_14px" placeholder="Type here..."  />
      );  
    case "image":   
      return (
        <div className="full_width srvQus_QusCheck4">
          <div className="row">
        {currentOptions.map((options,index) =>
          (options.isChecked == true || options.isChecked == "true")?
            <div className="col-md-6 full_width p-1 cmnCheckBox_row">
              <input checked onChange={this.onImageChange.bind(this,options,arr_new)} className="form-check-input" id={options.id} type="radio" name="arngDiscus" />
                <label className="form-check-label" for={options.id}>
                  <img src={options.value} className="translate_both"/>
                </label>
            </div>:
          < div className="col-md-6  full_width p-1 cmnCheckBox_row">
            <input onChange={this.onImageChange.bind(this,options,arr_new)} className="form-check-input" id={options.id} type="radio" name="arngDiscus" />
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

  onTextSpecify(i) //for text type question 
  {
    let textBoxTempClass = 'temp-class-text-box'+i 
    let text = $('.'+textBoxTempClass).val();//e.target.value; 
   
    arr_new[question_no].textAnswer = text; 
    arr_new[question_no].nextTime = this.getDateTime();
    this.refresh();
  }
  
  validateSpecify(arr_new){
    console.log("inside validae/////////////////////////////////")
    let errorMessage = "Please Select Or Add a Answer";
    let isValidate = false;
    let option = []; 
    option = arr_new[question_no].options;
    let returnVal;
    // let i = 0; 
        for(let i in option)
        { 
          console.log("in loop specify\n"+option[i].specify+'\nin label\n'+option[i].value+'\nin label\n'+option[i].value)
          let optionSelect = undefined;
          if(arr_new[question_no].selectedIndex == null || arr_new[question_no].selectedIndex === '' || arr_new[question_no].selectedIndex == undefined){
            // optionSelect=100;
          }else{
            console.log("in else optionSelect:"+arr_new[question_no].selectedIndex)
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
              //console.log("in else 1\n"+option[i].specify+'\nin label\n'+option[i].label)
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
  showProgress = (now) =>{
    return(
      <ProgressBar now={now} label={`${now}%`}/>
    ); 
  }

////////////////////////Util functions/////////////////////////////////////////
  refresh = () => {
    console.log('in refresh'+JSON.stringify(arr_new))
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
    console.log('arr'+arr)
     arr_new = arr;
    console.log('next btn'+JSON.stringify(arr))
    console.log("question next:\n"+JSON.stringify(arr_new)) 
    let questionType = type;
    var isValidate = false;
    let _this = this; 
    var errorMessage = "Please select or add a answer";
    console.log("question type"+questionType);
    switch (questionType) {
      case "boolean": 
      case "single":
          if(arr_new[question_no].selectedIndex === '' || arr_new[question_no].selectedIndex == undefined){
            errorMessage = "Please Select any of the given option"; 
          } else {
            isValidate = true;
          }
      break; 

      case "multiple":
        arr_new[question_no].options.map((option) => {
          if (option.isChecked == true) {
            isValidate = true;
          } else { 
            errorMessage = "Please select any of the given options";
          }
        }); 
        break;
        case "image":
          arr_new[question_no].options.map((option) => {
          if (option.isChecked == true) {
            isValidate = true;
          } else {
            errorMessage = "Please Select any of the given images";
          }
        }
        );
      break;
      case "text":
        // if ((arr_new[question_no].textAnswer) == ''|| (arr_new[question_no].textAnswer) == undefined || (arr_new[question_no].textAnswer) == 'undefined') {
        //   errorMessage = "Please enter your comment or answer";
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
      // alert("Error \n"+errorMessage)
      this.setState({"errorMsg":errorMessage});
      this.setState({"errorMsgModal":true});
      return;
    }
    if (question_no < arr_new.length - 1) {
    question_no++;
    let len = arr_new.length;
    let roundOf = 100 / len;
    now = now +roundOf;
    // console.log("progress"+now);
    // console.log('next click array:'+JSON.stringify(arr_new))
    this.arrayData(arr_new);
    }
    else{
      this.setState({'showSubmitModal':true});
      // this.showConfirmationAlert();
    }
  }

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
  
    onPrevBtnClick(arr){
      arr_new = arr
      question_no--; 
      let len = arr_new.length;
      let roundOf = 100 / len;
      now = now - roundOf;
      this.arrayData(arr_new);
    }
  
    showConfirmationAlert =() =>{
      let len = arr_new.length;
      let roundOf = 100 / len;
      if (window.confirm('Are You Sure?')) {
        now = now + roundOf;
        // console.log('in if now'+now)
        this.refresh();
        this.submitAnswerProcess();
      }
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

   
  onRadioButtonChange(value,arr)  // for single type questions
  {
    arr_new = arr;
    arr_new[question_no].selectedIndex = value;
    arr_new[question_no].nextTime = this.getDateTime();
    this.refresh()
    this.onNextBtnClick(arr_new);
    // console.log("radio button changer"+JSON.stringify(arr_new))
  }

  onImageChange(e,arr) //for image type question 
  {
    arr_new = arr;
    let id = e.id;
    let isChecked = e.isChecked;
    arr_new[question_no].nextTime = this.getDateTime();
    // console.log("Pre json\n"+JSON.stringify(arr_new[question_no].options))
    this.setDataOnOptions(id,isChecked)
    // console.log("\nAfter\n"+JSON.stringify(arr_new[question_no].options)) 
    this.refresh();
    // this.onNextBtnClick(arr_new);   
  }

  onCheckBoxChange(e,arr) //for multiple type question 
  {
    arr_new = arr;
    let id = e.id;
    let isChecked = e.isChecked;
    // console.log("Pre json\n"+JSON.stringify(arr_new[question_no].options))
    this.setDataOnOptions(id,isChecked)
    // console.log("\nAfter\n"+JSON.stringify(arr_new[question_no].options)) 
    this.refresh();
  } 

  setDataOnOptions(ids,data) 
  {
    let optionArray = arr_new[question_no].options;
    for (var i = 0; i < optionArray.length; i++) {
      // console.log("inside loop"+optionArray[i].isChecked);
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
    this.savePoints();
    let category = surveyCategory;
    console.log('category answer'+category)
    let url_path = '';
    switch(category)
    { 
    case 'survey':
      url_path = 'survey/surveyIncompAnswer' 
      this.submitAnswer(url_path);
    break;
    case 'quiz':
      url_path = 'survey/quizIncompAnswer'
      this.submitAnswer(url_path);                    
    break;
  }
}
 
  submitAnswer(url_path){
    let id = this.uri_data;  
    let answers = arr_new;
    // console.log("Answer\n"+JSON.stringify(answers));
    
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
      //  let responseData = responseJson.data;
       let success = responseJson.status_code;
       console.log('survey answer submit'+JSON.stringify(responseJson)) 
       if(success == 200){
         if(surveyCategory != 'quiz'){
          this.addPoints();
          this.reset_arr_new();
          this.redirect_to_success();
         }else{
          isSubmitProgress = false;
          this.setPoints(responseJson);
          this.reset_arr_new();
          this.redirect_to_success();
         }
       }
       else{
        alert("Failed to submit");
       }
      }).catch((error) => { 
          console.log("Error"+error);
      });  
  }

  setPoints(responseJson){
    // let quizData = []; 
    let quizData = responseJson.data;
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
       let responseData = responseJson.data;
       isSubmitProgress = false;
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
    arr_new = arr;
    this.setState({"showCompleteLaterModal":true}); 
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
      //  let responseData = responseJson.data;
       let success = responseJson.status_code;
       isSubmitProgress = false;
      //  console.log('survey answer submit'+JSON.stringify(responseJson)) 
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
    let min;
    if(mail_time == '' || mail_time == undefined || mail_time == null){  
      min = 0
    }
    min = parseInt(mail_time) * parseInt(1000);
    return min; 
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
                        <h2 class="font_22px colorBlack font600 srvQus_BoxTtl">{(surveyTitle == ''||surveyTitle == undefined)? "":surveyTitle}</h2>
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
                              {this.showProgress(Math.floor(now))} 
                            </div>
                          </div>  
                          <div className="clearfix"></div>
                          <div className="full_width text-center">
                          {question_no> 0 ?(
                          <button href="javascript:void(0)" disabled={isSubmitProgress} type="button" id="prev-btn" onClick={this.onPrevBtnClick.bind(this,arr_new)} className="cmnBtn btnBlue radius-6 font_14px m-1 font600 survey_detailsBtmBtn survey_detailsBtmBtnLeft"><img src={begainArrowLeft} /> Prev </button>
                          ):null}
                          <button href="javascript:void(0)" disabled={isSubmitProgress} type="button" id="next-btn" onClick={this.onNextBtnClick.bind(this,arr_new)} className="cmnBtn btnBlue radius-6 font_14px m-1 font600 survey_detailsBtmBtn">{question_no=== arr_new.length - 1 ? "Submit" : "Next"} <img src={begainArrow} /></button>
                          {question_no> 0 ?(
                          <button href="javascript:void(0)" disabled={isSubmitProgress} id="save-later-btn" type="button" onClick={this.onSaveLaterClick.bind(this,arr_new)} className="cmnBtn btnBlue radius-6 font_14px m-1 font600 survey_detailsBtmBtn survey_detailsBtmBtnLeft">Complete Later </button>
                          ):null}
                          </div>
                          <div className="clearfix"></div>
                          {(isSubmitProgress)?
                            <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={80} width={80} visible={true} />:null}
                          <div className="clearfix"></div>
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

            {/* ///////////////////////////////////////////////////// */}
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
            {/* /////////////////////////////////////////////////////////// */}
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
export default SpqQuestionPending;