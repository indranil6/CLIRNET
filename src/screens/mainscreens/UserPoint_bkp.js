import React from 'react';
import Loader from 'react-loader-spinner';
import $ from 'jquery';
import { reactLocalStorage } from 'reactjs-localstorage';
import AppConfig from '../config/config.js';
import Header from './Header';
import Footer from './Footer'; 
import surveyTTl from '../../images/surveyTTl.png';
import surveyLefticon1 from '../../images/surveyLeft-icon-1.png'; 
import begainArrowLeft from '../../images/begainArrowLeft.png';
import spqDefaultImage from '../../mobImages/nav-pollsQuiz-active.png';
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';
import {isMobile} from 'react-device-detect';
import Banner from '../mainscreens/Banner'; 
import Rectangle from '../LoadingPlaceholders/Rectangle.jsx';
const gtag = window.gtag;

const pageNames = "Polls & Quizzes"
const url = AppConfig.apiLoc;
var trending_data=[];
var all_list_data = []; 
var surveyPoints = undefined;
var surveyTitle = undefined;
var  is_loader = true;

class UserPoint extends React.Component { 
 constructor(props) {
  super(props); 
    this.state= {
      user_point: '',
      display:false,
      banner_display:false,
      incomplete_count:'',
      completed_count:''
    };

    this.getCompletedCount();
    this.getInCompletedCount();
    this.getPoints();
    this.getCompletedSurveyList();
 }

 display_banner(datam)
    {
        this.setState({"banner_display":true})
    }

  componentDidMount(){
    window.document.title = "CLIRNET - SPQ User Points";

    gtag('config', AppConfig.gtag_measure_id, {
			'page_title': window.document.title,
			'page_location': window.location.href,
			'page_path': window.location.pathname
			});
    $(".survey_mobile").addClass("active");

    $('.li_survey').attr('id', 'survey_cal');
    
    $(".surveyCollaps").click(function(){
        $(this).toggleClass("surveyCollapsActive");
        $(".surveyLeftBoxArea").slideToggle();
    });

      $(window).bind("load resize", function() {
        if($(window).innerWidth() <= 991) {
            $(window).scroll(function() {    
            var scroll = $(window).scrollTop();
            if (scroll >= 100) {
                $(".surveyCollaps").removeClass("surveyCollapsActive");
                $(".surveyLeftBoxArea").slideUp();   
            } 
        });
    }
    });  
  }
    refresh = () => {
    this.setState({ "display": !this.state.display}); 
    }
 
finishSurvey(){ 
  this.props.history.push({ 
    pathname: `/Spq/`, 
  })   
 }
  
 redirect_to_incompleted_list = () => {
  console.log("user point click"); 
  this.props.history.push ({ 
      pathname: '/SpqListPending/' 
  })
} 


 getPoints(){ 
    fetch(url+'survey/userpoint', { 
        method: 'GET',
            headers: {
            'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
            'version': 'rjsw 1.1.1'
            }
            }).then((response) => response.json()).then((responseJson) => {    
            let responseData = responseJson.data;
            surveyPoints = responseData; 
            this.setState({user_point:responseData})
            this.refresh(); 
            }).catch((error) => {
                console.log("Error"+error);
            });
 }


         
 getCompletedCount = () =>
 { 
     // console.log("Get Completed Count");  
     fetch(url+'survey/completed_count', { 
     method: 'GET',
         headers: {
         'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
         'version': 'rjsw 1.1.1'
         }
         }).then((response) => response.json()).then((responseJson) => {    
         let responseData = responseJson.data;
         this.setState({completed_count:responseData})
         }).catch((error) => {
             console.log("Error"+error);
         });
 }

 getInCompletedCount = () =>
 { 
     // console.log("Get Completed Count");  
     fetch(url+'survey/incompleted_count', { 
     method: 'GET',
         headers: {
         'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
         'version': 'rjsw 1.1.1'
         }
         }).then((response) => response.json()).then((responseJson) => {    
         let responseData = responseJson.data;
         this.setState({incomplete_count:responseData})
         }).catch((error) => {
             console.log("Error"+error);
         });
 }
 
  getCompletedSurveyList = () => 
  {  
      fetch(url+'survey/user_survey_list', {   
      method: 'GET',
          headers: { 
          'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
          'version': 'rjsw 1.1.1'
          }
          }).then((response) => response.json()).then((responseJson) => {  
          let status_code = responseJson.status_code;
          if(status_code == 200){
              let responseData = responseJson.data;
              is_loader = false;
              if(responseData == null ||responseData == 'null'){
                this.refresh();   
              }else{
                all_list_data = responseData;
                this.refresh(); 
              }
              // if(all_list_data.length == 0){ 
              //  is_loader = false;
              // }
              // console.log('all_list_data'+JSON.stringify(responseData)) 
          }  
          }).catch((error) => {
              console.log("Error"+error);
          });
  }

  redirect_to_survey = () => {
    this.props.history.push({ 
      pathname: '/Spq/'
    })
  }

  redirect_to_completed_list = () => {
    this.props.history.push ({ 
        pathname: '/SpqCompletedList/' 
    })
  }

  makeFirstLaterCapital(txt){
    let modText = txt[0].toUpperCase() +  
    txt.slice(1);
    return modText;
  }

  
pointTextValidation(point){
  if(point <= 1){
    return ' Point'
  }else{
    return ' Points'
  }
}

 render() 
  {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        adaptiveHeight: true
      };

    return (
        <div className={ isMobile == true ? 'full_width wrap_body mblScreen' : 'full_width wrap_body dskScreen'}>
          <Header history={this.props.history}  page_name={pageNames}/>
            <section className="full_width body_area surveyPageFixation">
            {/* {this.state.survey_data.map((r, index) => ( */}
              <div className="container">
                <div className="row">
                <Banner type_id={0} type={"surveylist"}  apiresponserecieved={this.display_banner.bind(this)} api_call_detail={1} api_call={0}/> 
                {this.state.banner_display?<Banner type_id={0} banner_position={1} unmount_call={1} type={"surveylist"}  api_call={1} before_unload_call={1}/>:null}
                  <section className="text-left full_width survey_p surveyLanding_p">
                  <div className="surveyLeft surveyLanding_left_p">
                                            
                                            <h2 className="font600 font_20px colorBlack surveyLeftTTl surveyLeftTTl_inner"><a href="javascript:void(0);" onClick={this.redirect_to_survey} className="colorBlack"><img src={surveyTTl}/> Polls &amp; Quizzes</a>
                                            <div class="surveyCollaps"><span></span></div> </h2>
                                            <div className="full_width surveyLeftBoxArea">
                                                <div className="full_width text-center surveyLeftBoxAreaBavkBtn"> 
                                                    <a href="javascript:void(0)" onClick={() => { this.redirect_to_survey(); }} className="full_width radius-6 cmnBtn btnBlue font_16px font600"><img src={begainArrowLeft} /> Back to Polls &amp; Quizzes </a>
                                                </div>
                                                <ul>
                                                 
                                                    <li className='active'>
                                                        <a href="javascript:void(0);" className="radius-6 ">
                                                            <div className="radius-100 translate_top surveyLeftBoxIcon">
                                                                <img src={surveyLefticon1} className="translate_both"/> 
                                                            </div> 
                                                            <h4 className="font500 font_16px colorBlack surveyLeftBoxTxt"><span className="font700 font_30px">{(this.state.user_point == '' || this.state.user_point == 'null' || this.state.user_point == undefined)? 0:this.state.user_point}</span> {this.pointTextValidation(this.state.user_point)}</h4>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);" onClick={this.redirect_to_completed_list} className="radius-6">
                                                            <div className="radius-100 translate_top surveyLeftBoxIcon">
                                                                <img src={surveyLefticon1} className="translate_both"/>
                                                            </div> 
                                                            <h4 className="font500 font_16px colorBlack surveyLeftBoxTxt"><span className="font700 font_30px">{(this.state.completed_count == '' || this.state.completed_count == null)? 0:this.state.completed_count}</span> Completed</h4>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);" onClick={this.redirect_to_incompleted_list} className="radius-6">
                                                            <div className="radius-100 translate_top surveyLeftBoxIcon">
                                                                <img src={surveyLefticon1} className="translate_both"/>
                                                            </div>  
                                                            <h4 className="font500 font_16px colorBlack surveyLeftBoxTxt"><span className="font700 font_30px">{(this.state.incomplete_count == '' || this.state.incomplete_count == 'null')? 0:this.state.incomplete_count}</span> Pending</h4> 
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div> 
                                        </div>
                    <div className="surveyRight">
                    {/* <h2 className="font600 font_20px colorBlack surveyLeftTTl surveyLeftTTl_forDesk">
                      <a href="javascript:void(0);" onClick={this.redirect_to_survey} className="colorBlack"><img src={surveyTTl}/> My Surveys</a></h2> */}
                  <div className="full_width radius-6 text-center srvSubmit_pMainBox">  
                    <h2 className="font_22px font700 text-uppercase colorGreen">You Have Collected</h2>
                    <div className="clearfix"></div>
                    <h2 className="font_18px font700 colorBlack text-uppercase srvSubmit_pMainBoxpoints"><span className="colorGreen font_48px font900">+{(surveyPoints == undefined || surveyPoints == '' || surveyPoints == null)?0:surveyPoints}</span> {this.pointTextValidation(surveyPoints)}</h2>
                   <div className="clearfix"></div>
                 
                      
                  </div>
                  
                  <div className="full_width srvPointsHstry"> 
                  {/* {(all_list_data.length == '' || all_list_data.length==0)?
                  <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={80} width={80} visible={is_loader} />:null} */}
                  {/* Row start */}
                  {(all_list_data.length > 0) ? 
                  <>
                   {all_list_data.map((r, index) => (
                    <div className="full_width radius-6 srvPointsHstryRow"> 
                      <div className="row align-items-center">
                      {(!r.sponsor_logo)?
                       <div className="col-sm-2 col-12 text-center srvPointsHstryRow-1">
                       <img src={spqDefaultImage} width="224" height="63" alt="logo" title="clirnet" />
                        </div>:
                        <div className="col-sm-2 col-12 text-center srvPointsHstryRow-1">
                            <img src={r.sponsor_logo.split(',')[0]} width="224" height="63" alt="logo" title="clirnet" />
                        </div>}
                        <div className="col-sm-5 col-12 srvPointsHstryRow-2">
                          <h2 className="font_16px font700 colorBlack">{r.survey_title}</h2>
                        </div>
                        {/* ////////////////added by sumit//////////////////// */}
                        <div className="col-sm-2 col-12 srvPointsHstryRow-4">
                          <h5 className="font_12px font500 colorBlack"><Moment format="MMMM Do YYYY">{r.added_on}</Moment></h5>
                        </div>
                        {/* //////////////////////////////////// */} 

                        <div className="col-sm-3 col-12 text-center srvPointsHstryRow-3">
                          <span className="colorBlack font_12px font600 srvTagTop">{this.makeFirstLaterCapital(r.category)}</span>
                          <h4 className="font_14px text-uppercase font600 colorBlack">
                            <span className="colorBlue font_18px font700">{(r.user_point == 'null' || r.user_point == null)?0: r.user_point}</span>{this.pointTextValidation(r.user_point)}
                          </h4>
                        </div>
                      </div>
                    </div> 
                   ))}
                  </>: 
                  <>
                  {(is_loader == false) ?
                    <div>
                      <div className="full_width">
                          <div className="full_width text-center alert alert-danger">
                              <strong>Complete Survey / Quiz / Poll To Win Points</strong>
                          </div>
                      </div>
                      <div className="full_width text-center">
                          <a href="javascript:void(0)" onClick={() => { this.redirect_to_survey(); }} className="cmnBtn btnBlue radius-6 font_16px  font600 survey_detailsBtmBtn">Complete now</a>
                      </div>
                  </div>: <><div className="full_width radius-6 srvPointsHstryRow"><Rectangle/></div>
                  <div className="full_width radius-6 srvPointsHstryRow"><Rectangle/></div>
                  <div className="full_width radius-6 srvPointsHstryRow"><Rectangle/></div>
                  <div className="full_width radius-6 srvPointsHstryRow"><Rectangle/></div></>
                  }
                  </>
                  }
                  {/* Row end */}
                  </div>
                </div>
                
                  </section> 
                </div>
              </div>
              {/* ))} */}
            </section>
          <Footer  history={this.props.history}/>     
        <div>   
      </div>
    </div>
  );}
}
export default UserPoint;