import React from 'react';
import Loader from 'react-loader-spinner'
import $ from 'jquery';
import { reactLocalStorage } from 'reactjs-localstorage';
import AppConfig from '../config/config.js';
import Header from './Header';
import Footer from './Footer'; 
import surveyTTl from '../../images/surveyTTl.png';
import "react-datepicker/dist/react-datepicker.css"; 
import Form from 'react-bootstrap/Form'; 
import {isMobile} from 'react-device-detect';
import Slider from "react-slick"; 

import Banner from '../mainscreens/Banner'; 
import PollDetailsLoader from '../LoadingPlaceholders/PollDetailsLoader.jsx';
const gtag = window.gtag;

const url = AppConfig.apiLoc;
var question_no = 0; 
var isReady = false;
const pageNames = "Polls & Quizzes"
let isPollDataFetched = false;
class SurveyDetails extends React.Component {
 constructor(props) {
  super(props); 
    this.state= {
      display:false,
      poll_data: [],
      poll_point:'',
      survey_question: [],
      survey_related: [],
      is_loader: true,  
      checkedRadio: null,
      survey_id:this.props.match.params.id,
      banner_display:false,
      sponsor_logo:''
    };

    isPollDataFetched = false;
    this.display_banner = this.display_banner.bind(this);
    this.getSurveyDetails(this.state.survey_id);  
    this.getRelatedSurvey(this.state.survey_id);
 }

 
 setClientLogo(sponsorLogo) {
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

 getUtmSource(){
  let utmSource = reactLocalStorage.get('@ClirnetStore:utm_source', true);
  if(utmSource == true || utmSource == 'true' || utmSource == ''){
    console.log("utm source not found")
    return 0;
  }else{
    console.log("utm source:"+utmSource);
    return utmSource;
  }
}

 componentDidMount() { 
  window.document.title = "CLIRNET - Poll Details"
  gtag('config', AppConfig.gtag_measure_id, {
    'page_title': window.document.title,
    'page_location': window.location.href,
    'page_path': window.location.pathname
    });
  $('.li_survey').attr('id', 'survey_cal');
  $(".surveyCollaps").click(function(){
      $(this).toggleClass("surveyCollapsActive");
      $(".surveyLeftBoxArea").slideToggle();
  });
 }

 getSurveyDetails = (id) => 
 { 
  var extrautm="";
  if(reactLocalStorage.get('@ClirnetStore:utm_source', '')!="" && reactLocalStorage.get('@ClirnetStore:utm_source', '')!=undefined && reactLocalStorage.get('@ClirnetStore:utm_source', '')!=null)
  {
     extrautm="&utm_source="+reactLocalStorage.get('@ClirnetStore:utm_source', '')+"";
  }
     fetch(url+'survey/detail?id='+id+extrautm, { 
         method: 'GET',
         headers: {
         'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
         'version': 'rjsw 1.1.1'
         }
         }).then((response) => response.json()).then((responseJson) => { 
         isPollDataFetched = true;   
        
         let responseData = responseJson.data;
         let category;
         let userSurveyStatus;
         responseData.map((r,index) => {
          category =  r.category;
          userSurveyStatus = r.user_survey_status;
          this.setState({ "sponsor_logo": r.sponsor_logo});
          if(category == "poll"){
            if(userSurveyStatus === "completed"){
              isReady = true;
              this.setState({ "poll_data": r.data_json});
              this.setState({ "poll_point": r.survey_points});
              this.getPollAnswer(id); 
            }
            else{
              isReady = true;
              this.setState({ "poll_data": r.data_json});
              this.setState({ "poll_point": r.survey_points});
            }
          }else{
            this.redirect_to_survey();
          }
        });
        if(responseData.length >0){
          this.setState({ "is_loader": false});
        }
         }).catch((error) => {
          isPollDataFetched = true;   
        this.refresh();
             console.log("Error"+error);
         });
 }

 getRelatedSurvey = (id) =>
 { 
     fetch(url+'survey/related?survey_id='+id, { 
         method: 'GET',
         headers: {
         'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
         'version': 'rjsw 1.1.1'
         }
         }).then((response) => response.json()).then((responseJson) => {    
         let responseData = responseJson.data;
         let new_related = [];
         if(responseJson.status_code == 200){
          responseData.map((r, index) => {
             if(r.category != 'poll'){ 
               new_related.push(r)
             }  
           })
         }

         this.setState({ "survey_related": new_related});
         }).catch((error) => {
             console.log("Error"+error);
         });
 }

 relatedClick =(id)=>{
    this.props.history.push({ 
      pathname: '/SpqDetailsRelated/'+ id + ''
  })
  }

  makeFirstLaterCapital(txt){
    let modText = txt[0].toUpperCase() +  
    txt.slice(1);
    return modText;
  }



  beginSurvey(){ 
  let id = this.props.match.params.id;
  this.props.history.push({ 
    pathname: `/SpqQuestion/` + id + '', 
  })  
 }


pointTextValidation(point){
  if(point <= 1){
    return ' Point'
  }else{
    return ' Points'
  }
}



onPollSubmit(arr_new,options,survey_id,point,i)  // for single type questions
{
  console.log('On poll submit'+'survey_points\n'+point)
  arr_new[0].selectedIndex = i;  
  // if (window.confirm('Do You To Submit Poll?')) {  
      this.submitPollAnswer(survey_id,arr_new,point,i)
      this.setState({checkedRadio: survey_id+i});
  // }
}

submitPollAnswer(id,answerjson,point,boxIndex)
{ 
    // console.log('dataJson'+'survey_id'+id);
    if(id == null || id == '' || id == undefined || answerjson == null || answerjson == ''|| answerjson == undefined){
        console.log('id or answer can not be empty')
    }else{
    let answerData = { 
        'survey_id': id,  
        'answer_json': JSON.stringify(answerjson)
    }
    fetch(url+'survey/pollAnswer', {  
    method: 'POST',
        headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true), 
        'version': 'rjsw 1.1.1'
        },
        body:JSON.stringify(answerData),  
        }).then((response) => response.json()).then((responseJson) => {  
        // alert('Congrats! You got '+JSON.stringify(responseJson)+' Points')  
        let status_code = responseJson.status_code;
        if(status_code == 200){ 
            let responseData = responseJson.data;  
            this.addPoints(id,point) 
            let name = 'option1'+id
            let boxId = 'option1'+id+boxIndex

            $('input[id='+boxId+']').attr("checked",true);
            $('input[id='+boxId+']').addClass("surveyPollsRadioCheckdF"); 
            $('input[name='+name+']').attr("disabled",true);  
            this.getPollAnswer(id);
        } 
        }).catch((error) => {
            console.log("Error"+error);
        });
    }
}
   
refresh = () => {
  this.setState({ "display": !this.state.display});
}

  redirect_to_survey(){ 
      this.props.history.push({  
        pathname: `/SpqDetails/` + this.state.survey_id + '', 
      }) 
  }

getPollAnswer(id){
  if(id == '' || id == undefined)
  {
  
  }else{    
      fetch(url+'survey/pollResult?id='+id, { 
        method: 'GET', 
        headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'
        }
        }).then((response) => response.json()).then((responseJson) => {
         let responseData = responseJson.data;
         let success = responseJson.status_code;
         let parentDivId = '#srvPollResult'+id;
         let boxId = '.srvPollsRadio'+id;
         if(success == 200){
          let _this = this; 
          let eleArr = [];
          let mData = JSON.parse(unescape(responseData)); 
          mData.map(function (i){   
          $(boxId).hide(500, function(){ $(this).remove();});
          let currentOption = i.options
          let selectedIndexPoll = i.selectedIndex;
          let resultOpt = _this.renderPollResult(currentOption,selectedIndexPoll) //ReactHtmlParser("<div class='colorBlue'>hi</div>");
          $(parentDivId).show(500, function(){$(this).html(resultOpt);});

          });    
          this.refresh();  
         } 
         else{
          // alert("Failed to update point");
         }
        }).catch((error) => { 
            console.log("Error"+error);
        });  
  }
}

renderPollResult = (currentOptions,selectedIndexPoll)=>{ 
  let opt ='';
      currentOptions.map((options,i)=>
      {  
          if(i == selectedIndexPoll){
              opt+='<div class="srvPollsProgressBar"><div class="srvPollsProgressBarIn font_12px colorBlue font600 ">'+options.label
              opt+='<span class="srvPollsProgressBarValue">'+options.vote+'%</span></div><div class="myprogress"><div class="myprogress_bar" style="width:'+options.vote+'%"></div></div></div>' 
          }else{
              opt+='<div class="srvPollsProgressBar"><div class="srvPollsProgressBarIn font_12px colorBlack font600 ">'+options.label
              opt+='<span class="srvPollsProgressBarValue">'+options.vote+'%</span></div><div class="myprogress"><div class="myprogress_bar" style="width:'+options.vote+'%"></div></div></div>' 
          }
      })
  return opt;    
}

addPoints(id,survey_points)
{
if(id == '' || id == undefined){
//   console.log('addPoints'+id+'::'+survey_points)
}else{
let pointsData = {
  'survey_id':id,
  'point':survey_points
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
   let success = responseJson.status_code;
   if(success == 200){
     console.log('point added\n')
   }
   else{
    alert("Failed to update point");
   }
  }).catch((error) => { 
      console.log("Error"+error);
  });  
}
}

        renderPoll(dataJson,survey_id,point) { 
          let question ='';
          let currentOptions = '';
          let arr_new ;
          if(dataJson){
            let mData = JSON.parse(unescape(dataJson));
            let sData = mData.surveys;
            arr_new = Object.keys(sData).map(function (k){
            return sData[k]; 
            });
            question = arr_new[question_no].question;
             currentOptions = arr_new[question_no].options;
          }
              return(
                  <div className="col-md-12 col-sm-12 masonryBoxFeed"> 
                      <div className="full_width radius-6 feedRow srvPolls">
                      
                          <h4 className="font_14px colorBlack font700 srvPollsTtl srvPollsTtlPnt">
                          <span class="font_12px colorWhite radius-40 text-center font600 srvPollsPoint">{point} {this.pointTextValidation(point)}</span>
                          <div className="clearfix"></div>
                          {question}   
                          </h4>
                              
                          <div className="clearfix"></div>
                          <div className="full_width srvPollsOptionSet55">  
                          {currentOptions.map((options,i)=>
                          <>  
                              <Form.Check id={"option1"+survey_id+i} className={"srvPollsRadio "+ "srvPollsRadio"+survey_id} type="radio" ref={'ref_' + i} name={"option1"+survey_id} onChange={this.onPollSubmit.bind(this,arr_new,options,survey_id,point,i)}  value={options.value} label={options.label} checked={this.state.checkedRadio == survey_id+i}/>
                              <div id={"srvPollResult"+survey_id}>
                              {
                                  // (resultOption != null|| resultOption != undefined)?this.renderPollResult(resultOption):null
                              }
                              </div>
                          </>
                          )}
                          </div>                       
                      </div> 
                      <div className="clearfix"></div>
                        {this.setClientLogo(this.state.sponsor_logo)}
                  </div>
              ) 
      }

      display_banner(datam)
      {
        this.setState({"banner_display":true})
      }

 render() 
  { 
    return (
        <div className={ isMobile == true ? 'full_width wrap_body mblScreen' : 'full_width wrap_body dskScreen'}>
          <Header history={this.props.history}  page_name={pageNames}/>
            <section className="full_width body_area">
            {/* <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={80} width={80} visible={this.state.is_loader} /> */}
              <div className="container">
                <div className="row"> 
                <Banner type_id={this.state.survey_id} type={"survey"}  apiresponserecieved={this.display_banner.bind(this)} api_call_detail={1} api_call={0}/> 
                {this.state.banner_display?<Banner type_id={this.state.survey_id} banner_position={1} unmount_call={1} type={"survey"}  api_call={1} before_unload_call={1}/>:null}
                  <section className="text-left full_width survey_p survey_details">
                    <div className="surveyRight">
                      <div className="col-xs-12 masonryBoxFeed">
                        <div className="full_width radius-6 feedRow">
                          <div className="col justify-content-between feedRowTop"> 
                            {(isReady)?  
                            this.renderPoll(this.state.poll_data,this.state.survey_id,this.state.poll_point):!isPollDataFetched?<PollDetailsLoader/>:null}
                        </div>
                      </div>
                      {this.state.banner_display?<Banner type_id={this.state.survey_id} banner_position={2} unmount_call={0} type={"survey"}  api_call={1} before_unload_call={0}/>:null}
                    </div>
                  </div>
                <div className="surveyLeft">
                {this.state.banner_display && !isMobile? <Banner type_id={this.state.survey_id} banner_position={3} unmount_call={0} type={"survey"}  api_call={1} before_unload_call={0}/>:null}
                {(this.state.survey_related.length > 0) ?
                  <div class="full_width radius-6 text-left specialty_comp_right">
                    <h2 class="bgColorBlue font600 colorWhite font600 font_20px specialtyTtl">Related</h2> 
                      <div class="clearfix"></div>
                      {(this.state.survey_related.length > 0) ?
                        <div class="full_width font600 specialty_comp_right_text">
                          {this.state.survey_related.slice(0,5).map(r =>
                          <div className="full_width relatedRow withImg">
                            <a href="javascript:void(0)">
                          <div className="full_width font_12px relatedRowTop"><span className="colorBlack font700">{r.specialities_name.replace(/,/g, ", ")}</span>
                            <span className="float-right colorGrey"> {r.date}</span>
                              </div>
                              <div className="full_width relatedRowIn"> 
                              {(r.image != "") ?
                                <div className="radius-6 relatedRowPic">
                                  <img className="object_fit_cover" src={r.image } />
                                </div>:
                                <div className="radius-6 relatedRowPic">
                                  <img className="object_fit_cover" src={surveyTTl} />
                                </div> 
                              } 
                              <h2 onClick={() => { this.relatedClick(r.survey_id); }} className="font600 transition6s font_12px colorBlack relatedRowTtl">{r.survey_description.substring(0, 100)}...</h2>
                              {/* /////////////////////////////////////////////// */}
                              {/* <div className="full_width">
                                {(r.sponsor_logo!="" && r.sponsor_logo!=undefined && r.sponsor_logo!=null)?
                                <a href="javascript:void(0);" className="full_width relatedRow_sponsors">  
                                <span className="font_10px font500 colorBlack">Powered by</span>
                                <img src={r.sponsor_logo} width="224" height="63" alt="logo" title="clirnet" />
                                </a>: 
                                null}
                              </div> */}
                              {/* //////////////////////////////////////////////////// */}
                              </div>
                            </a>
                          </div>
                          )} 
                        </div>:null}
                        <div class="clearfix"></div> 
                      </div>:null}
                      {this.state.banner_display && !isMobile?<Banner type_id={this.state.survey_id} banner_position={4} unmount_call={0} type={"survey"}  api_call={1} before_unload_call={0}/>:null}
                    </div>
                  </section>
                </div>
              </div>
            </section>
          <Footer  history={this.props.history}/>     
        <div>   
      </div>
    </div>
  );}
}
export default SurveyDetails;