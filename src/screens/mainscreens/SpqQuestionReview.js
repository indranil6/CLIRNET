import React,{ Component } from 'react';
import Loader from 'react-loader-spinner'
import $, { parseJSON } from 'jquery';
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
import {isMobile} from 'react-device-detect';
import Banner from '../mainscreens/Banner';
import SpqQuestionLoader from '../LoadingPlaceholders/SpqQuestionLoader.jsx';

const gtag = window.gtag;

const pageNames = "Polls & Quizzes"
const url = AppConfig.apiLoc;
var now = 0;
var optionReady = false;  

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
var clientLogo = '';
let question_image = '';
class SpqQuestionReview extends React.Component
{
  constructor(props){
    super(props); 
    this.uri_data = this.props.match.params.id;
    this.state= { 
      display:false,
      banner_display:false
    };
    question_image = '';
    clientLogo = '';
    optionReady = false; 
    this.getSurveyDetails(this.uri_data);  
    this.display_banner = this.display_banner.bind(this);
  }  

  display_banner(datam)
  {
     this.setState({"banner_display":true})
  }

  componentDidMount() { 
    window.document.title = "CLIRNET - Quiz Review"
    gtag('config', AppConfig.gtag_measure_id, {
			'page_title': window.document.title,
			'page_location': window.location.href,
			'page_path': window.location.pathname
			});

    console.log("this.uri_data"+this.uri_data);
    $(".survey_mobile").addClass("active");

    $('.li_survey').attr('id', 'survey_cal');
    $(".surveyCollaps").click(function(){
      $(this).toggleClass("surveyCollapsActive");
      $(".surveyLeftBoxArea").slideToggle();
    });


    window.onhashchange = () => {  
      console.log('window change')
      question_no = 0
      now = 0
    }
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
           userSurveyStatus = r.user_survey_status
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
  question = arr_new[question_no].question;
  question_image = arr_new[question_no].questionImageURL;
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
  // alert('array reset')
   arr_new = [];
   question_no = 0;
 }

 renderAnswer(){
   
 }

 renderOptions(type,arr) {
  arr_new = arr; 
  if(arr_new[0]==undefined || arr_new[0]=="undefined")
  {
   this.props.history.push({
     pathname: `/Spq`
   })
  }
  else 
  {
  // console.log("render question "+JSON.stringify(arr_new[question_no]))
  let currentOptions = options;
  let optionSelect = undefined;
  let correct = undefined;
  let answer = undefined; 
  switch (type) { 
    case "boolean":
      let addYesClass = '';
      let addNoClass = ''; 
      let yesBtnCheck = false;
      let noBtnCheck = false;
      correct = arr_new[question_no].correctOption;
      answer = arr_new[question_no].answer_status;
      optionSelect = arr_new[question_no].selectedIndex;
      console.log("render question "+correct+'::'+answer+'::'+optionSelect+'::'+JSON.stringify(currentOptions[0])+'::'+JSON.stringify(currentOptions[1]))  
      if(JSON.stringify(currentOptions[0].value) == optionSelect && answer == 0){
        addYesClass = ' incorrectRadio'
        yesBtnCheck = true;
      }if(JSON.stringify(currentOptions[1].value) == optionSelect && answer == 0){
        addNoClass = ' incorrectRadio'
        noBtnCheck = true;
      }if(JSON.stringify(currentOptions[0].value) == optionSelect && answer == 1){
        addYesClass = ' correctRadio'
        yesBtnCheck = true;
      }if(JSON.stringify(currentOptions[1].value) == optionSelect && answer == 1){
        addNoClass = ' correctRadio'
        noBtnCheck = true;
      }if(JSON.stringify(currentOptions[0].value) == correct){
        addYesClass = ' correctRadio' 
        yesBtnCheck = false;
      }if(JSON.stringify(currentOptions[1].value) == correct){ 
        addNoClass = ' correctRadio'
        noBtnCheck = false;
      }
      console.log('ty'+noBtnCheck+'\n'+yesBtnCheck)
      return(
        <>
          <div className="cmnCheckBox_row booleanTypeRadio">
            <input id="booleanID"
            className="form-check-input" 
            checked={yesBtnCheck}
            type="radio" name="abc"
            value={currentOptions[0].value} />
            <label for="booleanID1" className={"form-check-label "+addYesClass}> 
              Yes
            </label> 
          </div>
          <div className="cmnCheckBox_row booleanTypeRadio">
            <input id="booleanID" 
            className="form-check-input"
            checked={noBtnCheck}
            type="radio"  name="abc"
            value={currentOptions[1].value} /> 
            <label for="booleanID2" className={"form-check-label "+addNoClass}>
              No
            </label> 
          </div>
        </>
      );
      break;
    case "single": 
      return (
            <div className="full_width srvQus_QusCheck3">
          {currentOptions.map((options,i)=>
            { 
              let inputboxid= 'option3-'+i
              if(JSON.stringify(arr_new[question_no].selectedIndex) == '' || JSON.stringify( arr_new[question_no].selectedIndex) == undefined){
              }
              else{ 
                optionSelect = arr_new[question_no].selectedIndex;
                answer = arr_new[question_no].answer_status;
                correct = arr_new[question_no].correctOption;
                // console.log("in if option"+optionSelect)
              } 
              return (
                <div className="cmnCheckBox_row cmnRadio_row">
                  {(options.value == optionSelect && answer == 0)?
                  <>
                    <input id={inputboxid}
                    className="form-check-input" 
                    type="radio" 
                    disabled
                    checked={options.value == optionSelect} 
                    value={options.value} />
                    <label for={inputboxid} className="form-check-label incorrectRadio srvQus_QusCheck3" key={i}> 
                      {options.label}
                    </label>  
                  </>:
                  (options.value == optionSelect && answer == 1)?
                  <>
                    <input id={inputboxid}
                    className="form-check-input" 
                    type="radio" 
                    disabled
                    checked={options.value == optionSelect} 
                    value={options.value} />
                    <label for={inputboxid} className="form-check-label srvQus_QusCheck3" key={i}> 
                      {options.label}
                    </label> 
                  </>:
                  (options.value == correct)?
                  <>
                    <input id={inputboxid}
                    className="form-check-input" 
                    type="radio" 
                    disabled
                    checked={options.value == optionSelect} 
                    value={options.value} />
                    <label for={inputboxid} className="form-check-label correctRadio srvQus_QusCheck3" key={i}> 
                      {options.label}
                    </label> 
                  </>:
                  <>  
                    <input id={inputboxid}
                    className="form-check-input" 
                    type="radio" 
                    disabled
                    checked={options.value == optionSelect} 
                    value={options.value} />
                    <label for={inputboxid} className="form-check-label srvQus_QusCheck3" key={i}> 
                      {options.label}
                    </label> 
                  </>
                  }
                </div>
            );})
          }
        </div> 
      );
      break;
    case "multiple":
          let correctArray = [];
          answer = arr_new[question_no].answer_status;
          correct = arr_new[question_no].correctOption;
          correctArray = correct.split(',')
          console.log('this is multiple:'+correctArray.length)  
          
        return (   
          <div className={"full_width srvQus_QusCheck1" + (answer == 1 ? ' correct' : ' incorrect')}> 
            <>
            {
            currentOptions.map((options,i) =>
                (options.isChecked == true)?
                <span>
                {(correctArray.indexOf(''+i+'') != '-1')?
                  <Form.Check checked  id={options.id} disabled className="cmnCheckBox_row first correctRadio" type="checkbox" label={options.value} />:
                  <Form.Check checked  id={options.id} disabled className="cmnCheckBox_row first incorrectRadio" type="checkbox" label={options.value} />
                }
                </span>
                : 
                <span>
                  {(correctArray.indexOf(''+i+'') != '-1')?
                  <Form.Check  id={options.id} disabled className="cmnCheckBox_row second correctRadio" type="checkbox" label={options.value} />:
                  <Form.Check  id={options.id} disabled className="cmnCheckBox_row second incorrectRadio" type="checkbox" label={options.value} />
                  }
                </span>              
              )
            }
            </>
            <> 
            {/* {
               correctArray.map((options) =>
                <Form.Check className="cmnCheckBox_row text-danger" disabled type="checkbox" id={options.id} label={options} /> 
              )
            }  */}
            </>  
          </div>
        ); 
      break;
    case "text":
      return (
        <Form.Control 
        as="textarea"
        rows="4"
        onChange={this.onTextUpdate.bind(this)} disabled value={((arr_new[question_no].textAnswer) == ''|| (arr_new[question_no].textAnswer) == undefined)?'':arr_new[question_no].textAnswer} name="body" className="font_14px" placeholder="Type here..."  />
      );  
      break; 
    case "image":   
    answer = arr_new[question_no].answer_status;
    correct = arr_new[question_no].correctOption;
      return (
        <div className="full_width srvQus_QusCheck4">
          <div className="row">
        {currentOptions.map((options,index) =>
          (options.isChecked == true || options.isChecked == "true" && answer == 1)?
            <div className="col-md-6 full_width p-1 cmnCheckBox_row">
              <input disabled checked className="form-check-input" id={options.id} type="radio" name="arngDiscus" />
                <label className="form-check-label correctRadio" for={options.id}>
                  <img src={options.value} className="translate_both correctRadio"/>
                </label>
            </div>:
            (options.isChecked == true || options.isChecked == "true" && answer == 0)?
            <div className="col-md-6 full_width p-1 cmnCheckBox_row incorrectRadio">
              <input disabled checked className="form-check-input incorrectRadio" id={options.id} type="radio" name="arngDiscus" />
                <label className="form-check-label incorrectRadio" for={options.id}>
                  <img src={options.value} className="translate_both incorrectRadio"/>
                </label>
            </div>:
             (index == correct)?
             <div className="col-md-6 full_width p-1 cmnCheckBox_row correctRadio">
               <input disabled checked className="form-check-input correctRadio" id={options.id} type="radio" name="arngDiscus" />
                 <label className="form-check-label correctRadio" for={options.id}>
                   <img src={options.value} className="translate_both correctRadio"/>
                 </label>
             </div>:
          <div className="col-md-6  full_width p-1 cmnCheckBox_row">
            <input disabled className="form-check-input" id={options.id} type="radio" name="arngDiscus" />
            <label className="form-check-label" for={options.id}>
              <img src={options.value} className="translate_both"/>
            </label>
          </div>  
        )}
        </div>
        </div>          
      );
      break; 
    } 
  }
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
    //  console.log('next click'+question_no+'::\n'+JSON.stringify(arr_new))
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
      this.redirectToSurvey();
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
  
  redirectToSurvey = () => {
    this.props.history.push({
      pathname: `/Spq/`
    })
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
    textAnswer = text;
    arr_new[question_no].textAnswer = text;
    textAnswer = text;
    this.refresh();
  }


  savePoints = () => {
    console.log("survey points" + surveyPoint)
    reactLocalStorage.set('@ClirnetStore:survey_point', surveyPoint)
    reactLocalStorage.set('@ClirnetStore:survey_title', surveyTitle)
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
                      {optionReady == true?
                      <div className="col-md-8 offset-md-2 col-12 radius-6 srvQus_Box">  
                        <h2 class="font_22px colorBlack font600 srvQus_BoxTtl">{(surveyTitle == ''||surveyTitle == undefined)? "":surveyTitle}</h2>
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
                              {this.showProgress(Math.floor(now))} 
                            </div>
                          </div>  
                          <div className="clearfix"></div> 
                          <div className="full_width text-center"> 
                          {question_no> 0 ?(
                          <a href="javascript:void(0)"  onClick={this.onPrevBtnClick.bind(this,arr_new)} className="cmnBtn btnBlue radius-6 font_14px m-1 font600 survey_detailsBtmBtn survey_detailsBtmBtnLeft"><img src={begainArrowLeft} /> Prev </a>
                          ):null}
                          <a href="javascript:void(0)"  onClick={this.onNextBtnClick.bind(this,arr_new)} className="cmnBtn btnBlue radius-6 font_14px m-1 font600 survey_detailsBtmBtn">{question_no=== arr_new.length - 1 ? "Go back to polls and quizzes" : "Next"} <img src={begainArrow} /></a>
                          </div>
                          <div className="clearfix"></div>
                          {(clientLogo == '' || clientLogo == null)?null:
                          <div className="full_width text-center srvQus_QusPowerBy">
                            <span>Powered by</span> 
                            <img src={clientLogo} width="224" height="63" alt="logo" title="clirnet" />
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
          <Footer  history={this.props.history}/>  
          {/* <div></div> */}
        </div>
      );
    }
  }
export default SpqQuestionReview;