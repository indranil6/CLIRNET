import React from 'react';
import Loader from 'react-loader-spinner'
import Slider from "react-slick";
import $ from 'jquery';
import { reactLocalStorage } from 'reactjs-localstorage';
import AppConfig from '../config/config.js';
import Header from './Header';
import Footer from './Footer'; 
import surveyTTl from '../../images/surveyTTl.png';
import calenderIcon from '../../images/cal-black.png';
import masterconsultlogo from '../../images/session_box_type-3.png';
import Moment from 'react-moment';
import {isMobile} from 'react-device-detect';
import Banner from '../mainscreens/Banner';
import ReactHtmlParser from 'react-html-parser';

import RelatedMedwikiLoader from '../LoadingPlaceholders/RelatedMedwikiLoader';
import SpqSuccessfullSliderLoader from '../LoadingPlaceholders/SpqSuccessfullSliderLoader';

import SpqSmallCard from '../Cards/SpqSmallCard.js';
import Rectangle from '../LoadingPlaceholders/Rectangle.jsx';

const gtag = window.gtag;

const pageNames = "Polls & Quizzes"
const url = AppConfig.apiLoc;
var trending_data=[];
var surveyPoints = 0;
var category = undefined;
var surveyTitle = undefined; 
  
var quizTotalPoint = undefined;
var quizTotcorrectAns = undefined;
var quizTotwrongAns = undefined; 
var quizTotQus = undefined;
let isApiCallDone = false;
let isgetPointApiCallDone = false;
let isSliderApiDone = false;
let selected_spq_popover_index = -1;
class SpqSubmitSuccessful extends React.Component { 
 constructor(props) { 
  super(props); 
  this.uri_data = this.props.match.params.id;
    this.state= { 
      survey_data: [],
      survey_question: [],
      survey_related: [],
      trending_data: [],
      display:false,
      banner_display:false,
      survey_id: this.props.match.params.id,
      is_loader :true, 
      refresh:false
    };
     isApiCallDone = false;
     isgetPointApiCallDone = false;
     isSliderApiDone = false;
     selected_spq_popover_index = -1;
    this.getSurveyDetails(this.state.survey_id); 
    this.getRelatedSurvey(this.state.survey_id);
    this.getSliderData();
    // this.getPoints();
 }

  refresh = () => {
  this.setState({ "display": !this.state.display});
  }

  componentWillUnmount() {
 
    isApiCallDone = false;
    isgetPointApiCallDone = false;
    isSliderApiDone = false;
    selected_spq_popover_index = -1;
   
    // this.setState({survey_data: []});
    // this.setState({survey_question: []});
    // this.setState({survey_related: []});
    // this.setState({trending_data: []})
  }


 componentDidMount() { 
  window.document.title = "CLIRNET - SPQ Results"
  gtag('config', AppConfig.gtag_measure_id, {
    'page_title': window.document.title,
    'page_location': window.location.href,
    'page_path': window.location.pathname
    });

    isApiCallDone = false;
    isgetPointApiCallDone = false;
    isSliderApiDone = false;

   console.log('uri data'+this.uri_data) 
  $('.li_survey').attr('id', 'survey_cal'); 
  $(".survey_mobile").addClass("active");

  $(".surveyCollaps").click(function(){
    $(this).toggleClass("surveyCollapsActive");
    $(".surveyLeftBoxArea").slideToggle();
});

selected_spq_popover_index = -1;

let that = this;
$(document).on("click", function (e) {  
  let arc_extra = $(e.target).parents('.spq_extra_class').length;
  if (arc_extra == 0 && !$(e.target).hasClass('spq_extra_class')) {
    selected_spq_popover_index = -1;
    that.setState({ "refresh": !that.state.refresh }); 
  }
});
 }

 handle_change_spq(index, value, type) {
  // if (type == 'popover') {
    selected_spq_popover_index = index;
    this.setState({ "refresh": !this.state.refresh }); 
  // }
}
 getSurveyDetails = (id) =>
 { 
     fetch(url+'survey/detail?id='+id, { 
         method: 'GET',
         headers: {
         'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
         'version': 'rjsw 1.1.1'
         }
         }).then((response) => response.json()).then((responseJson) => {    
          isgetPointApiCallDone = true;
          this.setState({ "is_loader": false }); 
          let responseData = responseJson.data;
          responseData.map((r,index) => {
          surveyTitle = r.survey_title;
          surveyPoints = r.survey_points;
          category = r.category;
          console.log('fetch details'+category); 
          if(category == 'quiz'){
            this.getPoints(this.uri_data );
          }
        });
          this.setState({ "survey_data": responseData});
         }).catch((error) => {

          isgetPointApiCallDone = true;
          this.setState({ "is_loader": false }); 
         
             console.log("Error"+error);
         });
 }
  
 getPoints(id){
  fetch(url+'survey/detailCompleted?id='+id, {  
    method: 'GET',
    headers: {
    'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
    'version': 'rjsw 1.1.1'
    }
    }).then((response) => response.json()).then((responseJson) => {    
    isgetPointApiCallDone = true;
    let responseData = responseJson.data;
    let lengths,question_counts,points;
    let finalReportJson;
    let surveyCategory;
    responseData.map((r,index) => {
     surveyTitle = r.survey_title;
     surveyPoints = r.survey_points;
     let dataJson =  r.data_json;
     finalReportJson = r.final_report_json;
     category = r.category;
     question_counts = r.question_count;
     points = r.survey_points; 
     console.log('dataJson'+JSON.stringify(finalReportJson).totalPoint) 
   });
   if(category == 'quiz'){
     let mData = JSON.parse(unescape(finalReportJson)); 
      quizTotalPoint = mData.totalPoint;// reactLocalStorage.get('@ClirnetStore:totalPoint', true);
      quizTotcorrectAns =  mData.totcorrectAns; //reactLocalStorage.get('@ClirnetStore:totcorrectAns', true);
      quizTotwrongAns = mData.totwrongAns;//reactLocalStorage.get('@ClirnetStore:totwrongAns', true);
      quizTotQus = mData.totQus;//reactLocalStorage.get('@ClirnetStore:totQus', true); 
      surveyPoints = mData.totalPoint;
      this.refresh();
   }
   this.setState({ "survey_data": responseData});
    }).catch((error) => {
      isgetPointApiCallDone = true;
      this.refresh();
        console.log("Error"+error);
    });
    // console.log('in get points:'+ quizTotalPoint+'\n'+quizTotcorrectAns+'\n'+quizTotwrongAns+'\n'+quizTotQus);
}


resetPoints(){
  reactLocalStorage.set('@ClirnetStore:totalPoint', '');
  reactLocalStorage.set('@ClirnetStore:totcorrectAns', '');
  reactLocalStorage.set('@ClirnetStore:totwrongAns', '');
  reactLocalStorage.set('@ClirnetStore:totQus', ''); 
  console.log('in reset points');
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
            
        isApiCallDone = true;
         let responseData = responseJson.data;
         let new_related = []; 
         responseData.map((r, index) => {
           if(r.category != 'poll'){
             new_related.push(r)
           } 
         })
         this.setState({ "survey_related": new_related});
         this.setState({ "is_loader": false }); 
         }).catch((error) => {

          isApiCallDone = true;
          this.refresh();
             console.log("Error"+error);
         });
 }

 
 getSliderData = () =>
 { 
     fetch(url+'knwlg/trending', { 
     method: 'GET',
     headers: {
     'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
     'version': 'rjsw 1.1.1'
     }
     }).then((response) => response.json()).then((responseJson) => {    
       isSliderApiDone = true;
         trending_data = [];
         responseJson.data.map(r => {
         trending_data.push(r);
         })
         this.setState({ "trending_data": trending_data })
         this.setState({ "is_loader": false }); 
     }).catch((error) => {
      isSliderApiDone = true;
      this.refresh();
             console.log("Error"+error);
     });
 }

relatedClick =(id)=>{
  this.props.history.push({ 
      pathname: '/SpqDetails/'+ id + '' 
  })
}

finishSurvey(){ 
  // if(category == 'quiz'){

  // }else{
  this.props.history.push({ 
    pathname: `/Spq/`, 
  })   
  // }
 }

//  getPoints(){ 
//     surveyPoints = reactLocalStorage.get('@ClirnetStore:survey_point', true);
//     surveyTitle = reactLocalStorage.get('@ClirnetStore:survey_title', true);
//     console.log("surveyPoints"+surveyPoints)
//  }

 redirect_to_compendium_detail(id) 
  {
    reactLocalStorage.set('@ClirnetStore:source','Survey Successful Page'); 
    this.props.history.push({
      pathname:'/Feeddetail/' + id + ''
    })
  }

  redirect_for_review=()=>{
    console.log('redirect_to_question_review'+  this.uri_data)
    let ids = this.uri_data;
    this.props.history.push({ 
      pathname: '/SpqQuestionReview/' + ids + '' 
    })   
  }

  
  redirect_to_survey_detail = (id) => {
    console.log("ready to reddirect"+id);
    this.props.history.push({ 
        pathname: '/SpqDetails/'+ id + ''
    })
}

  makeFirstLaterCapital(txt){
    let modText = txt[0].toUpperCase() +  
    txt.slice(1);
    return modText;
  }
  display_banner(datam)
  {
      this.setState({"banner_display":true})
  }
 render() 
  {
    var settings = {
        autoplay: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        adaptiveHeight: true
      };

      const rectangleSettings = {
       width: "100%",
        height: "200",
        viewBox: "0 0 100% 200"  
      }; 

    return (
        <div className={ isMobile == true ? 'full_width wrap_body mblScreen' : 'full_width wrap_body dskScreen'}>
          <Header history={this.props.history}  page_name={pageNames}/>
          <Banner type_id={this.uri_data} type={"survey"}  apiresponserecieved={this.display_banner.bind(this)} api_call_detail={1} api_call={0}/> 
          {this.state.banner_display?<Banner type_id={this.uri_data} banner_position={1} unmount_call={1} type={"survey"}  api_call={1} before_unload_call={1}/>:null}
            <section className="full_width body_area">
            {/* {this.state.survey_data.map((r, index) => ( */}
              <div className="container">
                <div className="row">
                {/* <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={80} width={80} visible={this.state.is_loader} /> */}
                  <section className="text-left full_width survey_p survey_details">
                    <div className="surveyRight">
                    {isgetPointApiCallDone?
                  <div className="full_width radius-6 text-center srvSubmit_pMainBox">
                    {
                      (category == 'quiz')?null: 
                      <h2 className="font_18px font600 colorBlack srvSubmit_pMainBoxTopic">{(surveyPoints == undefined || surveyTitle == '' || surveyTitle == 'Nan' || surveyTitle == true)?0:surveyTitle}</h2>
                    }
                    <div className="clearfix"></div>  
                    <h2 className="font_22px font700 text-uppercase colorBlack srvSubmit_pMainBoxTtl">Submitted Successfully</h2> 
                    <div className="clearfix"></div>
                    <h2 className="font_30px font700 colorGreen srvSubmit_pMainBoxpoints">{(surveyPoints == undefined || surveyPoints == '' || surveyTitle == true)?0:surveyPoints} Points</h2>
                   <div className="clearfix"></div>
                 <div className="clearfix"></div> 
                  </div>:  <div className="full_width radius-6 text-center srvSubmit_pMainBox"><Rectangle/></div>}
                  {isgetPointApiCallDone?
                  <div className="full_width radius-6 srvSbmtStstc">
                    {
                      (category == 'quiz')?
                      <div className="row align-items-center">
                      <div className="col-sm-3 col-12 srvSbmtStstcBox">
                      <h3 className="font_14px text-uppercase font700 colorWhite">
                            <span className="font_22px">{(
                              quizTotQus == null || quizTotQus == '')?0 :quizTotQus}</span>
                            Total Question
                            <div className="clearfix"></div>
                            
                          </h3>
                      </div>
                      <div className="col-sm-3 col-12 srvSbmtStstcBox">
                          <h3 className="font_14px text-uppercase font700 colorBlack">
                            <span className="font_22px">{(
                              quizTotcorrectAns == 'null' ||  quizTotcorrectAns == null || quizTotcorrectAns == '')?0 :quizTotcorrectAns}</span>
                            Correct 
                          </h3>
                      </div>
                      <div className="col-sm-3 col-12 srvSbmtStstcBox">
                          <h3 className="font_14px text-uppercase font700 colorBlack">
                            <span className="font_22px">{(quizTotwrongAns == 'null' ||
                              quizTotwrongAns == null || quizTotwrongAns == '')?0 :quizTotwrongAns}</span>
                            Incorrect 
                          </h3>
                      </div>   
                      <div className="col-sm-3 col-12 srvSbmtStstcBox">
                      <a className="cmnBtn btnBlue radius-6 font_14px font600 text-uppercase srvSbmtStstcBox_a"  onClick={this.redirect_for_review} href="javascript:void(0)">View Result</a> 
                      </div>
                    </div>:null
                    }
                  </div>: <div className="full_width radius-6 srvSbmtStstc"><Rectangle/></div>}
                  {isgetPointApiCallDone?<a href="javascript:void(0)" onClick={() => { this.finishSurvey(); }} className="cmnBtn btnGreen radius-6 font_16px  font600 text-uppercase survey_detailsBtmBtn2">Go Back To Polls &amp; Quizzes</a>:null}
                  <div className="full_width">
                    {/* <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={80} width={80} visible={this.state.is_loader} /> */}
                    {this.state.survey_related.length>0?
                    <Slider {...settings} className="dashboardSlider">
                      {this.state.survey_related.map(r =>
                        <div>
                          {/* {(r.type == "session") ? */}
                            <div className="home_slider" onClick={() => { this.redirect_to_survey_detail(r.survey_id); }}>
                              <div className="full_width radius-6 home_slider_3">
                                <div className="full_width ssn_p_BoxTop ssn_p_Boxsidebar_top ">
                                  <h4 className="font_12px font600 my_session_box_type"><img src={masterconsultlogo} width="24" height="24" alt="icon" /> <span className="colorGreen">{this.makeFirstLaterCapital(r.category)}</span> </h4>
                                  <div className="colorBlack font_12px font600 session_time ssnDtl_dateDesk">
                                    <img src={calenderIcon} />
                                    <span><Moment format="MMMM Do YYYY">{r.publishing_date}</Moment></span> 
                                  </div>
                                  {
                                  (r.sponsor_logo)?
                                  <div className="my_session_box_sponsors">
                                    <span className="font_12px font600 colorBlack">Powered by</span>
                                      <img src={r.sponsor_logo} alt="logo" />
                                  </div> :null }
                                </div>  
                                {/* <div className="colorBlack font_12px font600 session_time ssnDtl_dateRes">
                                  <img src={calenderIcon} />
                                  <span>{r.publishing_date}</span>
                                </div> */}
                                <div className="clearfix"></div>
                                <h2 className="colorBlack font700 font_16px my_session_box_ttl">{r.specialities_name.replace(/,/g, ", ")}</h2>
                                {/* {r.session_doctor_entities.map(docres => */}
                                  <div className="full_width session_Row">
                                    <div className="radius-100 session_RowPIc">
                                      <img src={r.image} className="object_fit_cover radius-100" />
                                    </div>
                                    <h2 className="colorBlack font700 font_16px session_doctor">{r.survey_title}
                                      <span className="colorGrey font_14px font600">{ReactHtmlParser(r.survey_description)}</span></h2>
                                  </div>
                                {/* )} */}  
                              </div>
                            </div>
                        </div>
                      )}
                    </Slider>:!isSliderApiDone?<SpqSuccessfullSliderLoader/>:null} 
                    {this.state.banner_display?<Banner type_id={this.uri_data} banner_position={2} unmount_call={0} type={"survey"}  api_call={1} before_unload_call={0}/>:null}
                  </div>
                </div>
                <div className="surveyLeft">
                {(this.state.survey_related.length > 0) ?
                  <div class="full_width radius-6 text-left specialty_comp_right">
                    <h2 class="bgColorBlue font600 colorWhite font600 font_20px specialtyTtl">Related</h2> 
                      <div class="clearfix"></div>
                      {(this.state.survey_related.length > 0) ?
                        <div class="full_width font600 specialty_comp_right_text">
                       {this.state.survey_related.slice(0, 5).map((r,ind) => (
                            <SpqSmallCard history={this.props.history} mobile_device={isMobile} onChangeButton={this.handle_change_spq.bind(this)} card_data={r} clicked_index={selected_spq_popover_index} elem_key={ind} custom_class="dskTrendingMedwikiCard feeddetail_related" />
                          ))}
                        </div>:null}
                        <div class="clearfix"></div>
                      </div>:!isApiCallDone? <div className="full_width relatedRow withImg"><RelatedMedwikiLoader/><RelatedMedwikiLoader/><RelatedMedwikiLoader/><RelatedMedwikiLoader/><RelatedMedwikiLoader/></div>:null} 
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
export default SpqSubmitSuccessful;