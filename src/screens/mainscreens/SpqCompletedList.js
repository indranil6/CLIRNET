import React from 'react';
import Loader from 'react-loader-spinner'
import { reactLocalStorage } from 'reactjs-localstorage';
import AppConfig from '../config/config.js';
import Header from './Header';
import Footer from './Footer';
import $ from 'jquery';
import Masonry from 'react-masonry-component';
import surveyTTl from '../../images/surveyTTl.png';
import surveyLefticon1 from '../../images/surveyLeft-icon-1.png';
import surveyLefticon2 from '../../images/surveyLeft-icon-2.png';
import surveyLefticon3 from '../../images/surveyLeft-icon-3.png';
import ProgressBar from 'react-bootstrap/ProgressBar';
import {isMobile} from 'react-device-detect';
import begainArrowLeft from '../../images/begainArrowLeft.png';
import QuizCard from '../Cards/QuizCard.js'; 
import SurveyCard from '../Cards/SurveyCard.js'; 
import PollCardCompleted from '../Cards/PollCardCompleted.js'; 
import Banner from '../mainscreens/Banner';

import PollCardLoader from '../LoadingPlaceholders/PollCardLoader.jsx';
import SpqLoader from '../LoadingPlaceholders/SpqLoader.jsx';

const gtag = window.gtag;

const pageNames = "Polls & Quizzes"
const url = AppConfig.apiLoc;
var surveyCategory;
var button_val = "poll";
var question_no = 0;
var is_loader = true;
var isCalled = false;

var survey_list_data = []; 
var poll_list_data = [];
var quiz_list_data = []; 
var all_list_data = [];
var deafult_popover_index=-1;  
const masonryOptions = {
  transitionDuration: 0
};

class SpqCompletedList extends React.Component { 
    constructor(props) {
    super(props);
    this.state= {
        // is_loader: true,
        user_point: '',
        completed_count:'',
        incomplete_count:'',
        display:false,
        banner_display:false
    };
    deafult_popover_index = -1;
    button_val = "poll";
    // this.getCompletedSurveyList();
    this.getListByCategory('poll'); 
    this.getUserPoint();
    this.getCompletedCount();
    this.getInCompletedCount();
    }

    display_banner(datam)
    {
        this.setState({"banner_display":true})
    }
    onMenuClick(ind){
        deafult_popover_index = ind;
        this.refresh() 
    }

    componentDidMount(){

        window.document.title = "CLIRNET - Completed SPQ"
        gtag('config', AppConfig.gtag_measure_id, {
			'page_title': window.document.title,
			'page_location': window.location.href,
			'page_path': window.location.pathname
			});
        let temp = this; 
        
        $(document).on("click", function (e) {
            let ggg = $(e.target).parents('.popoverExtra').length;
            if (ggg == 0 && !$(e.target).hasClass('popoverExtra')) {
              deafult_popover_index = -1;
              temp.refresh();
            }
          });
      
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
    }

      
    componentWillUnmount(){
        button_val = "poll";

        $('html, body').css({
            overflow: 'auto',
            height: 'auto'
          });
    }
    
    refresh = () => {
        console.log('in refresh')
        this.setState({ "display": !this.state.display}); 
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

    getUserPoint = () =>
    {  
        fetch(url+'survey/userpoint', { 
        method: 'GET',
            headers: {
            'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
            'version': 'rjsw 1.1.1'
            }
            }).then((response) => response.json()).then((responseJson) => {    
            let responseData = responseJson.data;
            console.log("User point"+ responseData);
            this.setState({user_point:responseData})
            console.log('user state point',this.state.user_point)
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

    redirect_to_complete_detail(id){
        this.props.history.push({ 
            pathname: `/SpqCompletedDetails/` + id + '',  
          })  
    }

    getCompletedList = (category) =>
    { 
        // console.log("Get Completed List");     
        fetch(url+'survey/user_survey_list?category='+category, { 
        method: 'GET',
            headers: {
            'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
            'version': 'rjsw 1.1.1'
            }
            }).then((response) => response.json()).then((responseJson) => {    
            let responseData = responseJson.data;
            survey_list_data = responseData;
            // console.log('surveyCategory'+surveyCategory)
            if(survey_list_data.length == 0){
                this.setState({"is_loader":false})
            }
            }).catch((error) => {
                console.log("Error"+error); 
            });
    }

    tabChangeHandler = (btn_val) =>{
        let honoriumCheckboxId = $("#Honorarium-1")
        switch(btn_val)
        {  
            case 'all':
                honoriumCheckboxId.prop("checked", false);
                button_val = btn_val;
                isCalled = true;
                this.refresh();
                break;
            case 'survey':
                honoriumCheckboxId.prop("checked", false);
                button_val = btn_val;
                isCalled = true;
                this.refresh();
                break;
            case 'poll':
                honoriumCheckboxId.prop("checked", false);
                button_val = btn_val;
                isCalled = true;
                this.refresh();
                break;
            case 'quiz':
                honoriumCheckboxId.prop("checked", false);
                button_val = btn_val;
                isCalled = true;
                this.refresh(); 
                break;
            case 'honorarium':
                button_val = btn_val;
                isCalled = true; 
                this.refresh();
                break;
            default:   
        }
    }

    parseListResponse(responseJson,category){ 
        let responseData;
        switch(category)
        {
            case 'all':
                all_list_data=[];
                responseData = responseJson.data;
                if(responseData == null || responseData == 'null'){
                    is_loader = false;
                }else{
                    all_list_data = responseData;
                   
                }
                this.refresh();
                break;
            case 'survey':
                survey_list_data=[];
                responseData = responseJson.data;
                // survey_list_data.push(responseData);
                if(responseData == null || responseData == 'null'){
                    is_loader = false;
                }else{
                    survey_list_data = responseData;
                    //this.refresh();
                }
                this.refresh();
                break;
            case 'poll':
                poll_list_data = []; 
                responseData = responseJson.data;
                if(responseData == null || responseData == 'null'){
                    is_loader = false;
                }else{
                    poll_list_data = responseData;
                    
                }
                this.refresh();
                break;
            case 'quiz': 
                quiz_list_data=[]; 
                responseData = responseJson.data;
                if(responseData == null || responseData == 'null'){
                    is_loader = false;
                }else{
                    quiz_list_data = responseData;
                    
                }
                this.refresh();
                break;
            case 'honorarium':
               
                break;
            default:   
        }
    }


    setLoaderStatus(arr){
        console.log('array length'+arr.length)
        if(arr.length == 0 || arr.length == null || arr.length == undefined){
           is_loader= false
        }
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
                isCalled = false;
                this.parseListResponse(responseJson,'all');
            }  
            }).catch((error) => {
                console.log("Error"+error);
            });
    }

    functionCallCallback = (btn_val) =>{
        console.log('functionCallCallback'+btn_val)
        switch(btn_val)
        {
            case 'all':
                if(isCalled){ 
                this.getCompletedSurveyList();
                } 
                return( 
                    this.renderAll()
                )
                break;
            case 'survey':
                if(isCalled){ 
                this.getListByCategory('survey');
                }
                return(
                    this.renderSurveyList()
                )
                break;
            case 'poll':
                if(isCalled){ 
                this.getListByCategory('poll');
                }
                return(
                    this.renderPolls()
                )
                break;
            case 'quiz':
                if(isCalled){ 
                this.getListByCategory('quiz'); 
                }
                return(
                    this.renderQuiz()
                )
                break; 
            case 'honorarium': 
                return(
                    this.renderHonorium()
                )
                break;
            default:   
        }
    }
   
    checkBoxChangeHander = () =>
    {
        if($("#Honorarium-1").prop('checked') == true){
            this.tabChangeHandler('honorarium')
        }else{
        }
    }

    redirect_to_survey_detail = (id) => {
        // console.log("ready to reddirect"+id);
        this.props.history.push({ 
            pathname: '/SpqCompletedDetails/'+ id + ''
        })
    }

    
    redirect_to_incompleted_list = () => {
        console.log("user point click");
        this.props.history.push ({ 
            pathname: '/SpqListPending/' 
        })
    }

    getListByCategory(category){
        console.log('categr'+category)
        fetch(url+'survey/user_survey_list?category='+category, {  
            method: 'GET',
            headers: {
            'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
            'version': 'rjsw 1.1.1'
            }
            }).then((response) => response.json()).then((responseJson) => {    
            let responseData = responseJson.data;
            let cat='';
            // console.log('cate'+category+JSON.stringify(responseJson))
            isCalled = false;
            this.parseListResponse(responseJson,category);
            }).catch((error) => {
                console.log("Error"+error);
            });
    }
    
    redirect_to_completed_list = () => {
        this.props.history.push ({ 
            pathname: '/SpqCompletedList/' 
        })
    }

    redirect_to_user_point  = () => {
        this.props.history.push ({ 
            pathname: '/UserPoint/' 
        })
    }

    redirect_to_survey = () => {
        this.props.history.push ({ 
            pathname: '/Spq/' 
        })
    }

    makeFirstLaterCapital(txt){
        let modText = txt[0].toUpperCase() +  
        txt.slice(1);
        return modText;
    }

    

    renderPoll(dataJson,survey_id) {   
        let mData = JSON.parse(unescape(dataJson));
        let sData = mData;
        let arr_new = Object.keys(sData).map(function (k){
        return sData[k];
        });

        let question = arr_new[question_no].question;
        let selectedIndexPoll = arr_new[question_no].selectedIndex; 
        let currentOptions = arr_new[question_no].options;
        // let percentage =0;
        // let correctoption = arr_new[question_no].correctoption; 
            return(

                <div className="col-sm-6 col-xs-12 masonryBoxFeed">
                    <div className="full_width radius-6 feedRow srvPolls">
                        <h4 className="font_16px colorBlack font600 srvPollsTtl">{question}</h4>
                        <div className="full_width srvPollsOptionSet"> 
                        {currentOptions.map((options,i)=>
                            { 
                                // percentage = percentage + 20;
                                let inputboxid= 'option3-'+i   
                                return ( 
                                (i == selectedIndexPoll)? 
                                <div className="srvPollsProgressBar">
                                    <div className="srvPollsProgressBarIn font_12px colorBlue font600">
                                   {options.label}
                                     <span className="srvPollsProgressBarValue">{options.vote} %</span>
                                   </div>
                                    <ProgressBar now={options.vote}/> 
                                </div>:
                                <div className="srvPollsProgressBar">
                                    <div className="srvPollsProgressBarIn font_12px colorBlack font600">
                                    {options.label}
                                        <span className="srvPollsProgressBarValue">{options.vote} %</span>
                                    </div>
                                    <ProgressBar now={options.vote}/> 
                                </div>
                            );})       
                        }
                        </div>
                    </div>
                </div>
            ) 
    } 

    setProgressBarClass(progress){
        if(progress >= 0 && progress <= 33){
            return " progressBarRed";
        }else if(progress >= 33 && progress <=66){
            return " progressBarYellow";
        }else if(progress >= 66 && progress <=100){
            return " progressBarGreen"; 
        }else{
            console.log('progress in else')
            return "";
        }
         
    }

    renderQuiz = () =>
    {
            console.log('In render quiz\n'+quiz_list_data.length)
            return(
                <>
                {/* {(quiz_list_data.length==0)?
                <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={80} width={80} visible={is_loader} />:null} */}
                {(quiz_list_data.length > 0) ?
                <div className="full_width surveyRightMasonry">
                    <Masonry
                        className={'my-gallery-class'} // default ''
                        elementType={'ul'} // default 'div'
                        options={masonryOptions} // default {}
                        disableImagesLoaded={false} // default false
                        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                        //imagesLoadedOptions={imagesLoadedOptions} // default {}
                        >
                        {quiz_list_data.map((val, index) => (
                            <QuizCard  status='completed'  data={val} array_index={index} click={this.redirect_to_survey_detail.bind(this,val.survey_id)} menu_click= {this.onMenuClick.bind(this,index)} deafult_popover_index={deafult_popover_index}/>
                        ))}                                  
                    </Masonry>
                </div>:
           is_loader?
           <div className="full_width surveyRightMasonry">
               <Masonry
                 className={'dskMasonryCardArea'} // default ''
                 elementType={'ul'} // default 'div'
                 options={masonryOptions} // default {}
                 disableImagesLoaded={false} // default false
                 updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
               //imagesLoadedOptions={imagesLoadedOptions} 
               >
                 <SpqLoader/>
                 <SpqLoader/>
                 <SpqLoader/>
                 <SpqLoader/>
                 <SpqLoader/>
                 <SpqLoader/>
                 <SpqLoader/>
               </Masonry>
           </div>:
                <div>
                {(is_loader == false) ?
                    <div>
                        <div className="full_width">
                            <div className="full_width text-center alert alert-danger">
                                <strong>You Haven't Completed Any Quiz Yet!</strong>
                            </div>
                        </div> 
                        <div className="full_width text-center">
                            <a href="javascript:void(0)" onClick={() => { this.redirect_to_survey(); }} className="cmnBtn btnBlue radius-6 font_16px  font600 survey_detailsBtmBtn">Complete now</a>
                        </div>
                    </div> : null}
                </div>
                }
                </> 
            )
        } 
    
        renderPolls = () => 
        {
            console.log('in render polls'+poll_list_data.length)
            return(
                <>
                    {/* {(poll_list_data.length == 0 || poll_list_data.length == null)?
                    <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={80} width={80} visible={is_loader} />:null} */}
                    {(poll_list_data.length > 0) ?
                    <div  className="full_width surveyRightMasonry">
                        <>
                        <Masonry
                            className={'my-gallery-class'} // default ''
                            elementType={'ul'} // default 'div'
                            options={masonryOptions} // default {}
                            disableImagesLoaded={false} // default false
                            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                            //imagesLoadedOptions={imagesLoadedOptions} // default {}
                            >  
                            {poll_list_data.map((val, ind) => (
                             <PollCardCompleted  data={val} array_index={ind} menu_click= {this.onMenuClick.bind(this,ind)} deafult_popover_index={deafult_popover_index}/> 
                            ))}
                        </Masonry>
                        </>
                    </div>
                     : is_loader?
                     <div className="full_width surveyRightMasonry">
                         <Masonry
                           className={'dskMasonryCardArea'} // default ''
                           elementType={'ul'} // default 'div'
                           options={masonryOptions} // default {}
                           disableImagesLoaded={false} // default false
                           updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                         //imagesLoadedOptions={imagesLoadedOptions} 
                         >
                           <PollCardLoader/>
                           <PollCardLoader/>
                           <PollCardLoader/>
                           <PollCardLoader/>
                           <PollCardLoader/>
                           <PollCardLoader/>
                         </Masonry>
                     </div>
                    :
                    <>
                    {(is_loader == false) ?
                    <div>
                        <div className="full_width">
                            <div className="full_width text-center alert alert-danger">
                                <strong>You Haven't Completed Any Poll Yet!</strong>
                            </div>
                        </div>
                        <div className="full_width text-center">
                            <a href="javascript:void(0)" onClick={() => { this.redirect_to_survey(); }} className="cmnBtn btnBlue radius-6 font_16px  font600 survey_detailsBtmBtn">Complete now</a>
                        </div>
                    </div>: null}
                    </>
                    }
                </>
            )
        }

        renderHonorium = () =>
        {
            return(
                <div className="medWikiLeft">
                    <div className="full_width alert alert-danger">
                        <strong>Honorium Comming soon</strong>
                    </div>
                </div>
            )
        }

    renderSurveyList = () => {
        // console.log('In survey list\n'+survey_list_data.length)
        return(
            <>
            {/* {(survey_list_data.length=='null' || survey_list_data.length==null || survey_list_data.length==0)?
             <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={80} width={80} visible={is_loader} />:null} */}
             {(survey_list_data.length > 0) ?
             <div className="full_width surveyRightMasonry">
                 <Masonry
                     className={'my-gallery-class'} // default ''
                     elementType={'ul'} // default 'div'
                     options={masonryOptions} // default {}
                     disableImagesLoaded={false} // default false
                     updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                     //imagesLoadedOptions={imagesLoadedOptions} // default {}
                     >
                     {survey_list_data.map((val, ind) => (
                          <SurveyCard  data={val} status='completed' array_index={ind} click={this.redirect_to_survey_detail.bind(this,val.survey_id)} menu_click= {this.onMenuClick.bind(this,ind)} deafult_popover_index={deafult_popover_index}/>
                     ))}                                 
                 </Masonry>
             </div>:
           is_loader?
           <div className="full_width surveyRightMasonry">
               <Masonry
                 className={'dskMasonryCardArea'} // default ''
                 elementType={'ul'} // default 'div'
                 options={masonryOptions} // default {}
                 disableImagesLoaded={false} // default false
                 updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
               //imagesLoadedOptions={imagesLoadedOptions} 
               >
                 <SpqLoader/>
                 <SpqLoader/>
                 <SpqLoader/>
                 <SpqLoader/>
                 <SpqLoader/>
                 <SpqLoader/>
                 <SpqLoader/>
               </Masonry>
           </div>:
             <div>
             {(is_loader == false) ?
                <div>
                    <div className="full_width">
                        <div className="full_width text-center alert alert-danger">
                            <strong>You Haven't Completed Any Survey Yet!</strong>
                        </div>
                    </div>
                    <div className="full_width text-center">
                        <a href="javascript:void(0)" onClick={() => { this.redirect_to_survey(); }} className="cmnBtn btnBlue radius-6 font_16px  font600 survey_detailsBtmBtn">Complete now</a>
                    </div>
                </div> : null}
             </div>
             }
            </>
        )
    }

    renderAll(){
        console.log('In all list\n'+all_list_data.length) 
        return(
            <>
            {/* {(all_list_data.length == null || all_list_data.length == 'null'   || all_list_data.length == 0 || all_list_data.length < 1)? 
             <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={80} width={80} visible={is_loader} />:null} */}
             {(all_list_data.length > 0) ?
             <div className="full_width surveyRightMasonry">
                 <Masonry
                     className={'my-gallery-class'} // default ''
                     elementType={'ul'} // default 'div'
                     options={masonryOptions} // default {}
                     disableImagesLoaded={false} // default false
                     updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                    > 
                     {all_list_data.map((val, ind) => (
                        <>
                        {(val.category == 'survey')?
                            <SurveyCard data={val} status='completed' array_index={ind} click={this.redirect_to_survey_detail.bind(this,val.survey_id)} menu_click= {this.onMenuClick.bind(this,ind)} deafult_popover_index={deafult_popover_index}/>:null
                        }  
                        {(val.category == 'quiz')?
                            <QuizCard  data={val} status='completed' array_index={ind} click={this.redirect_to_survey_detail.bind(this,val.survey_id)} menu_click= {this.onMenuClick.bind(this,ind)} deafult_popover_index={deafult_popover_index}/>  :null
                        } 
                        {(val.category == 'poll')?
                           <PollCardCompleted  data={val} array_index={ind} menu_click= {this.onMenuClick.bind(this,ind)} deafult_popover_index={deafult_popover_index}/>  :null
                        }   
                        </>
                     ))}                                 
                 </Masonry>
             </div>:
           is_loader?
           <div className="full_width surveyRightMasonry">
               <Masonry
                 className={'dskMasonryCardArea'} // default ''
                 elementType={'ul'} // default 'div'
                 options={masonryOptions} // default {}
                 disableImagesLoaded={false} // default false
                 updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
               //imagesLoadedOptions={imagesLoadedOptions} 
               >
                 <SpqLoader/>
                 <SpqLoader/>
                 <SpqLoader/>
                 <SpqLoader/>
                 <SpqLoader/>
                 <SpqLoader/>
                 <SpqLoader/>
               </Masonry>
           </div>:
             <div>
             {(is_loader == false) ?
                <div>
                    <div className="full_width">
                        <div className="full_width text-center alert alert-danger">
                            <strong>You Haven't Completed Any Survey Yet!</strong>
                        </div>
                    </div>
                    <div className="full_width text-center">
                          <a href="javascript:void(0)" onClick={() => { this.redirect_to_survey(); }} className="cmnBtn btnBlue radius-6 font_16px  font600 survey_detailsBtmBtn">Complete now</a>
                    </div>
                 </div> : null}
             </div>
             }
            </>
        );
    }


    render() {
        // console.log("render"+this.state.is_loader+"size"+survey_list_data.length)
            return (
                <div className={ isMobile == true ? 'full_width wrap_body mblScreen' : 'full_width wrap_body dskScreen'}>
                    <Header history={this.props.history}  page_name={pageNames}/>                   
                        <section className="full_width body_area surveyPageFixation">
                            <div className="container">
                                <div className="row surveyrow">  
                                <Banner type_id={0} type={"surveylist"}  apiresponserecieved={this.display_banner.bind(this)} api_call_detail={1} api_call={0}/> 
                                {this.state.banner_display?<Banner type_id={0} banner_position={1} unmount_call={1} type={"surveylist"}  api_call={1} before_unload_call={1}/>:null}
                                    <section className="text-left full_width survey_p surveyLanding_p completedSurvey_p">   
                                        <div className="surveyLeft surveyLanding_left_p">
                                        <h2 className="font600 font_20px colorBlack surveyLeftTTl surveyLeftTTl_inner"><a href="javascript:void(0);" onClick={this.redirect_to_survey} className="colorBlack"><img src={surveyTTl}/> Polls &amp; Quizzes</a>
                                            <div class="surveyCollaps"><span></span></div> </h2>
                                            <div className="full_width surveyLeftBoxArea">
                                            {this.state.banner_display?<Banner type_id={0} banner_position={3} unmount_call={1} type={"surveylist"}  api_call={1} before_unload_call={1}/>:null}

                                            <div className="full_width text-center surveyLeftBoxAreaBavkBtn"> 
                                                    <a href="javascript:void(0)" onClick={() => { this.redirect_to_survey(); }} className="full_width radius-6 cmnBtn btnBlue font_16px font600"><img src={begainArrowLeft} /> Back to Polls &amp; Quizzes </a>
                                                </div>
                                                <ul>
                                                    <li>
                                                        <a href="javascript:void(0);" onClick={this.redirect_to_user_point} className="radius-6">
                                                            <div className="radius-100 translate_top surveyLeftBoxIcon">
                                                                <img src={surveyLefticon1} className="translate_both"/>
                                                            </div>
                                                            <h4 className="font500 font_16px colorBlack surveyLeftBoxTxt"><span className="font700 font_30px">{(this.state.user_point == '' || this.state.user_point == null )? 0:this.state.user_point}</span> Points</h4>
                                                        </a>
                                                    </li>
                                                    <li className="active">
                                                        <a href="javascript:void(0);" className="radius-6">
                                                            <div className="radius-100 translate_top surveyLeftBoxIcon">
                                                                <img src={surveyLefticon2} className="translate_both"/>
                                                            </div> 
                                                            <h4 className="font500 font_16px colorBlack surveyLeftBoxTxt"><span className="font700 font_30px">{(this.state.completed_count == '' || this.state.completed_count == null )? 0:this.state.completed_count}</span> Completed</h4>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);" onClick={this.redirect_to_incompleted_list} className="radius-6">
                                                            <div className="radius-100 translate_top surveyLeftBoxIcon">
                                                                <img src={surveyLefticon3} className="translate_both"/>
                                                            </div>   
                                                            <h4 className="font500 font_16px colorBlack surveyLeftBoxTxt"><span className="font700 font_30px">{(this.state.incomplete_count == ''|| this.state.incomplete_count == null)? 0:this.state.incomplete_count}</span> Pending</h4> 
                                                        </a>
                                                    </li>
                                                </ul>

                                                {this.state.banner_display?<Banner type_id={0} banner_position={4} unmount_call={1} type={"surveylist"}  api_call={1} before_unload_call={1}/>:null}

                                            </div> 
                                        </div>
                                        <div className="surveyRight">
                                        {/* <h2 className="font600 font_20px colorBlack surveyLeftTTl surveyLeftTTl_forDesk">
                      <a href="javascript:void(0);" onClick={this.redirect_to_survey} className="colorBlack"><img src={surveyTTl}/> My Surveys</a></h2> */}
                                            <div className="radius-6  col-12 surveyRight_top">
                                            <ul className="font_16px font600">

                                                    {(button_val=='poll')?
                                                    <li className="active"><a onClick={() => this.tabChangeHandler('poll')} href="javascript:void(0);">Polls</a></li>:
                                                    <li ><a onClick={() => this.tabChangeHandler('poll')} href="javascript:void(0);">Polls</a></li>}

                                                    {(button_val=='quiz')?
                                                    <li className="active"><a  onClick={() => this.tabChangeHandler('quiz')} href="javascript:void(0);">Quizzes</a></li>:
                                                    <li ><a  onClick={() => this.tabChangeHandler('quiz')} href="javascript:void(0);">Quizzes</a></li>}

                                                    {(button_val=='survey')?
                                                    <li className="active"><a onClick={() => this.tabChangeHandler('survey')} href="javascript:void(0);">Surveys</a></li>:
                                                    <li><a onClick={() => this.tabChangeHandler('survey')} href="javascript:void(0);">Surveys</a></li>}

                                                    {(button_val=='all')?
                                                    <li className="active"><a onClick={()=> this.tabChangeHandler('all')} href="javascript:void(0);">All</a></li>:
                                                    <li><a  onClick={()=> this.tabChangeHandler('all')} href="javascript:void(0);">All</a></li>}

                                                </ul>  
                                                <div className="float-right surveyHonorarium">
                                            {/* <div className="cmnCheckBox_row">
                                                <input  className="form-check-input" onClick={() => this.checkBoxChangeHander()} id="Honorarium-1" type="checkbox" name="Honorarium"/>
                                                    <label className="font600 font_16px colorBlack form-check-label" for="Honorarium-1">Honorarium</label>
                                            </div> */}
                                        </div>
                                            </div>
                                            {this.functionCallCallback(button_val)}
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
export default SpqCompletedList;