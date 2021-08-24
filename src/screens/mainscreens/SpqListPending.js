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
import {isMobile} from 'react-device-detect';
import SurveyCard from '../Cards/SurveyCard.js'; 
import QuizCard from '../Cards/QuizCard.js'; 
import begainArrowLeft from '../../images/begainArrowLeft.png'; 
import Banner from '../mainscreens/Banner'; 
import SpqLoader from '../LoadingPlaceholders/SpqLoader.jsx';

const gtag = window.gtag;

const pageNames = "Polls & Quizzes"
const url = AppConfig.apiLoc;
// var surveyCategory;
var button_val = "all";
var question_no = 0;
var is_loader= true;
var isCalled = false;

var survey_list_data = []; 
var poll_list_data = [];
var quiz_list_data = []; 
var all_list_data = []; 
var deafult_popover_index=-1;  

const masonryOptions = {
  transitionDuration: 0
}; 

class SpqListPending extends React.Component { 
    constructor(props) {
    super(props);
    this.state= {
        user_point: '',
        completed_count:'',
        incomplete_count:'',
        banner_display:false,
        display:false
    }; 
    
    button_val = "all";
    this.getUserPoint(); 
    this.getCompletedCount();
    this.getInCompletedCount();
    this.getCompletedSurveyList();
    }

    display_banner(datam)
    {
        this.setState({"banner_display":true})
    }
    componentDidMount(){
        window.document.title = "CLIRNET - Pending SPQ"
        gtag('config', AppConfig.gtag_measure_id, {
			'page_title': window.document.title,
			'page_location': window.location.href,
			'page_path': window.location.pathname
			});
        let temp = this; 
        $('body').click(function() {
          if(deafult_popover_index != -1){
            deafult_popover_index = -1;
            temp.refresh();
          }
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
        console.log('in refresh')
        this.setState({ "display": !this.state.display}); 
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
            // console.log("User point"+ responseData);
            this.setState({user_point:responseData})
            // console.log('user state point',this.state.user_point)
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
            // if(survey_list_data.length == 0){
            //     this.setState({"is_loader":false})
            // }
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
        // console.log('all_counter\n'+all_counter)  
        let responseData;
        switch(category)
        {
            case 'all':
                all_list_data=[];
                responseData = responseJson.data;
                if(responseData == null || responseData == 'null'){ 
                    is_loader = false;
                    // console.log('in all')
                    this.refresh();
                }else{
                    all_list_data = responseData;
                    this.refresh();
                }
                console.log('parse all') 
                break;
            case 'survey':
                survey_list_data=[];
                responseData = responseJson.data;
                // survey_list_data.push(responseData);
                if(responseData == null || responseData == 'null'){
                    is_loader = false;
                    this.refresh();
                }else{
                    survey_list_data = responseData;
                    this.refresh();
                }
                
                break;
            case 'poll':
                poll_list_data = []; 
                responseData = responseJson.data;
                if(responseData == null || responseData == 'null'){
                    is_loader = false;
                    this.refresh();
                }else{
                    poll_list_data = responseData;
                    this.refresh();
                }
                break;
            case 'quiz': 
                quiz_list_data=[]; 
                responseData = responseJson.data;
                // quiz_list_data.push(responseData);
                if(responseData == null || responseData == 'null'){
                    is_loader = false;
                    this.refresh();
                }else{
                    quiz_list_data = responseData;
                    this.refresh();
                }
                break;
            case 'honorarium':
               
                break;
            default:   
        }
    }

    
    makeFirstLaterCapital(txt){
        let modText = txt[0].toUpperCase() +  
        txt.slice(1);
        return modText;
    }

    setLoaderStatus(arr){
        console.log('array length'+arr.length) 
        if(arr.length == 0 || arr.length == null || arr.length == undefined || arr.length <1){
            // this.setState({ "is_loader": false });
            is_loader = false;
        }
    }

    getCompletedSurveyList = () =>
    {  
        fetch(url+'survey/surveyIncompList', {  
        method: 'GET',
            headers: { 
            'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
            'version': 'rjsw 1.1.1'
            }
            }).then((response) => response.json()).then((responseJson) => {  
            let status_code = responseJson.status_code;
            if(status_code == 200){
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
    
    redirect_to_survey_detail = (id,surveyCategory) => {
        console.log('surveyCategory'+surveyCategory);
        if(surveyCategory == 'quiz'){
            this.props.history.push({ 
                pathname: '/SpqDetails/'+ id + '' 
            })
        }else{ 
            this.props.history.push({ 
                pathname: '/SpqDetailsPending/'+ id + '' 
            })
        }
    }

    getListByCategory(category){
        console.log('category'+category)
        fetch(url+'survey/surveyIncompList?category='+category, {  
            method: 'GET',
            headers: {
            'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
            'version': 'rjsw 1.1.1'
            }
            }).then((response) => response.json()).then((responseJson) => {   
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
    
    renderPoll(dataJson,survey_id) {  
        // console.log('render Polls'+JSON.stringify(dataJson))
        let mData = JSON.parse(unescape(dataJson));
        let sData = mData;
        let arr_new = Object.keys(sData).map(function (k){
        return sData[k];
        });

        let question = arr_new[question_no].question;
        let type = arr_new[question_no].type; 
        let currentOptions = arr_new[question_no].options;
        let correctoption = arr_new[question_no].correctoption;
        console.log('currentOptions'+JSON.stringify(arr_new[0].selectedIndex))
            return(
                <div className="col-sm-6 col-xs-12 masonryBoxFeed">
                    
                    <div className="full_width radius-6 feedRow srvPolls">
                        <h4 className="font_16px colorBlack font600 srvPollsTtl">{question}</h4>
                        <div className="full_width srvPollsOptionSet"> 
                        {currentOptions.map((options,i)=>
                            {
                                let inputboxid= 'option3-'+i   
                                let optionSelect = undefined;  
                                // console.log("in if option"+inputboxid)
                                if(JSON.stringify(arr_new[0].selectedIndex) == ''){
                                }
                                else{ 
                                  optionSelect = arr_new[0].selectedIndex.value; 
                                //   console.log("option\n"+options.value+'optionSelect\n'+optionSelect)
                                } 
                                return (  
                                <>
                                <div className="srvPollsRadio cmnRadio_row">
                                    <input id={inputboxid} className="form-check-input" type="radio" 
                                    checked={options.value == optionSelect} 
                                    value={options.value} />
                                    <label for={inputboxid} className="form-check-label srvQus_QusCheck3" key={i}> 
                                        {options.label}
                                    </label> 
                                </div>
                               </>
                            );})       
                        }
                        </div>
                    </div>
                </div>
            ) 
    } 

    renderQuiz = () =>
    {
            // console.log('In render quiz\n'+quiz_list_data.length)
            return(
                <>
                {(quiz_list_data.length==0)? 
                <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={80} width={80} visible={is_loader} />:null}
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
                        {quiz_list_data.map((val, ind) => (
                            <QuizCard data={val} status='new' array_index={ind} click={this.redirect_to_survey_detail.bind(this,val.survey_id,val.category)} menu_click= {this.onMenuClick.bind(this,ind)} deafult_popover_index={deafult_popover_index}/> 
                        ))}                                 
                    </Masonry>
                </div>: 
                <div>
                {(is_loader == false) ?
                    <div className="full_width">
                        <div className="full_width text-center alert alert-danger">
                            <strong>Don't Have Any Pending Quiz</strong>
                        </div>
                    </div> : null}
                </div>
                }
                </> 
            )
        } 
    
        onMenuClick(ind){
            deafult_popover_index = ind;
            this.refresh() 
        }

        renderPolls = () => 
        {
            console.log('in render polls:'+poll_list_data.length+'is loader:'+is_loader) 
            return(
                <>
                    {(poll_list_data.length == 0 || poll_list_data.length < 1)?
                    <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={80} width={80} visible={is_loader} />
                    :null}
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
                            {poll_list_data.map((r, index) => (
                             this.renderPoll(r.json_data,r.survey_id)
                            ))}
                        </Masonry>
                        </>
                    </div>: 
                    <>
                        {(is_loader == false)?
                        <div className="medWikiLeft">
                            <div className="full_width alert alert-danger">
                                <strong>No Polls Found</strong>
                            </div>
                        </div> : null}
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
            {(survey_list_data.length==0 || survey_list_data.length < 1)?
             <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={80} width={80} visible={is_loader} />
            :null}
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
                      <SurveyCard data={val} status='new' array_index={ind} click={this.redirect_to_survey_detail.bind(this,val.survey_id,val.category)} menu_click= {this.onMenuClick.bind(this,ind)} deafult_popover_index={deafult_popover_index}/> 
                     ))}                                 
                 </Masonry>
             </div>:
             <div>  
             {(is_loader == false) ?
                 <div className="full_width">
                     <div className="full_width text-center alert alert-danger">
                         <strong>Don't Have Any Pending Survey</strong>
                     </div> 
                 </div> : null}
             </div>
             }
            </>
        )
    }

    renderAll(){
        return(
            <>
            {/* {(all_list_data.length == 0 || all_list_data.length < 1)?   
             <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={80} width={80} visible={is_loader} /> 
             :null} */}
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
                        <SurveyCard data={val} status='new' array_index={ind} click={this.redirect_to_survey_detail.bind(this,val.survey_id,val.category)} menu_click= {this.onMenuClick.bind(this,ind)} deafult_popover_index={deafult_popover_index}/> :null}
                        {(val.category == 'quiz')?
                        <QuizCard data={val} status='new' array_index={ind} click={this.redirect_to_survey_detail.bind(this,val.survey_id,val.category)} menu_click= {this.onMenuClick.bind(this,ind)} deafult_popover_index={deafult_popover_index}/> :null}
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
               </Masonry>
           </div>: !is_loader ?
              <div className="col-12"> 
                <div className="full_width text-center alert alert-danger">
                  <strong>You Don't have any Pending Survey</strong>
                </div>
            </div> : null 
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
           
                                    <section className="text-left full_width survey_p surveyLanding_p">   
                                        <div className="surveyLeft surveyLanding_left_p">
                                        <h2 className="font600 font_20px colorBlack surveyLeftTTl surveyLeftTTl_inner"><a href="javascript:void(0);" onClick={this.redirect_to_survey} className="colorBlack"><img src={surveyTTl}/> Polls &amp; Quizzes</a>
                                            <div class="surveyCollaps"><span></span></div> </h2>
                                            <div className="full_width surveyLeftBoxArea">
                                            {this.state.banner_display?<Banner type_id={0} banner_position={3} unmount_call={1} type={"surveylist"}  api_call={1} before_unload_call={1}/>:null}

                                                <div className="full_width text-center surveyLeftBoxAreaBavkBtn"> 
                                                    <a href="javascript:void(0)" onClick={() => { this.redirect_to_survey(); }} className="full_width radius-6 cmnBtn btnBlue font_16px font600"><img src={begainArrowLeft} /> Back to Polls &amp; Quizzes</a>
                                                </div>
                                                <ul>
                                                    <li>
                                                        <a href="javascript:void(0);" onClick={this.redirect_to_user_point} className="radius-6">
                                                            <div className="radius-100 translate_top surveyLeftBoxIcon">
                                                                <img src={surveyLefticon1} className="translate_both"/>
                                                            </div>
                                                            <h4 className="font500 font_16px colorBlack surveyLeftBoxTxt"><span className="font700 font_30px">{(this.state.user_point == '' || this.state.user_point == null )? 0: this.state.user_point}</span> Points</h4>
                                                        </a>
                                                    </li>
                                                    <li> 
                                                        <a href="javascript:void(0);"  onClick={this.redirect_to_completed_list}  className="radius-6">
                                                            <div className="radius-100 translate_top surveyLeftBoxIcon">
                                                                <img src={surveyLefticon2} className="translate_both"/>
                                                            </div> 
                                                            <h4 className="font500 font_16px colorBlack surveyLeftBoxTxt"><span className="font700 font_30px">{(this.state.completed_count == '' || this.state.completed_count == null)? 0:this.state.completed_count}</span> Completed</h4>
                                                        </a>
                                                    </li>
                                                    <li className="active">
                                                        <a href="javascript:void(0);" className="radius-6">
                                                            <div className="radius-100 translate_top surveyLeftBoxIcon">
                                                                <img src={surveyLefticon3} className="translate_both"/>
                                                            </div>  
                                                            <h4 className="font500 font_16px colorBlack surveyLeftBoxTxt"><span className="font700 font_30px">{(this.state.incomplete_count == '' || this.state.incomplete_count == null)? 0:this.state.incomplete_count}</span> Pending</h4> 
                                                        </a>
                                                    </li>
                                                </ul>
                                                {this.state.banner_display?<Banner type_id={0} banner_position={4} unmount_call={1} type={"surveylist"}  api_call={1} before_unload_call={1}/>:null}

                                            </div> 
                                        </div> 
                                        <div className="surveyRight">
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
export default SpqListPending;  