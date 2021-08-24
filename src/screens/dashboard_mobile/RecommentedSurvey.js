import React from 'react';
import Slider from "react-slick";
import begainArrow from '../../mobImages/begainArrow.png';
import AppConfig from '../config/config.js';
import { reactLocalStorage } from 'reactjs-localstorage';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import $ from 'jquery';
import { isInViewport, setDescription, setSpeciality, specialityPopOver } from '../Common/Common.js';
import Popover from 'react-bootstrap/Popover'

import Share from "../Common/Share.jsx"; 

import SpqLoader from '../LoadingPlaceholders/SpqLoader.jsx';  


const url = AppConfig.apiLoc;
var survey_list_data = [];
var survey_api_call_permission = true;
var fetch_counter = 0;
var deafult_popover_index = -1;
let isApiCallDone = false;

const mblPllsSrvsClient = {
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
  cssEase: 'linear'
};

class RecommentedSurvey extends React.Component {
  constructor(props) {
    super(props);
    survey_list_data = [];
    this.state = {
      display: false
    };
    isApiCallDone = false;
  }

  refresh = () => {
    this.setState({ "display": !this.state.display });
  }

  componentDidMount() {
    isApiCallDone = false;
    this.getSurveyData(0);
    let temp = this
    
		$(document).on("click", function(e){
      //popover dissapear func
      let ggg=$(e.target).parents('.popoverExtra').length;   
      if(ggg==0 && !$(e.target).hasClass('popoverExtra'))
      {
        deafult_popover_index = -1;
        temp.refresh();
      }  
    });
  }

  surveyFetchValidate(currentSlide) {
    const surveySection = document.querySelector('#surveySlider');
    let comp_list_length = survey_list_data.length
    let fetch_from = comp_list_length;
    let currentState = (comp_list_length - 1) - currentSlide;
    // //console.log("data::"+comp_list_length+'\n'+isInViewport(medwikiSection)+'\n'+currentState+'\n')
    if (isInViewport(surveySection) === true && survey_api_call_permission === true && fetch_counter !== 0 && fetch_from !== undefined && currentState == 0) {
      this.getSurveyData(fetch_from);
    } if (fetch_counter == 0 || fetch_counter == '0' && survey_api_call_permission == true) {
      this.getSurveyData(0);
    } else {
      // //console.log('unable to fetch comp')   
    }
  }

  getSurveyData(fetch_from) {
    survey_api_call_permission = false;
    fetch(url + 'dashboard/trending?from=' + fetch_from + '&to=10&type=spq', {
      method: 'GET',
      headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'
      }
    }).then((response) => response.json()).then((responseJson) => {
      let status_code = responseJson.status_code;
      isApiCallDone = true;
      if (status_code == 200) {
        survey_api_call_permission = true;
        let responseData = responseJson.data;
        if (fetch_counter == 0 || fetch_counter == '0') {
          fetch_counter++;
        }
        // survey_list_data = responseData
        responseData.map((r, index) => {
          survey_list_data.push(r)
        })
        this.refresh()
        setTimeout(function () {
          if (survey_list_data.length == 1) {
            $(".mblPllsSrvsCard").addClass("mblSingleCard");
          } else {
            $(".mblPllsSrvsCard").removeClass("mblSingleCard");
          }
        }, 300);
      }
    }).catch((error) => {
      isApiCallDone = true;
      survey_api_call_permission = true;
      //console.log("Error"+error);
    });
  }

  redirectToSpqDetail = (id) => {
    this.props.history.push({
      pathname: '/SpqDetails/' + id + ''
    })
  }

  pointTextValidation(point) {
    if (point <= 1) {
      return ' Point'
    } else {
      return ' Points'
    }
  }

  renderRecomentedSurveyList(val, ind) {
    let category = val.category
    switch (category) {
      case 'survey':
        return (
          this.renderSurveyCard(val, ind)
        )
      case 'quiz':
        return (
          this.renderQuizCard(val, ind)
        )
    }
  }
  onMenuClick(ind) {
    deafult_popover_index = ind;
    this.refresh()
  }

  renderQuizCard(val, ind) {
    return (
      <div className="mblPllsSrvsCard">
        <a href="javascript:void(0);" className="full_width radius-6 mblPllsSrvs_link">
          <div className="full_width mblPllsSrvsPic">
            <div className="overlay"></div>
            {(val.image == '' || val.image == null) ? null :
              <img src={val.image} className="object_fit_cover" />
            }
            <div className="mblPllsSrvsTag">
              <span className="font600 colorWhite font_16px">Quiz</span>
            </div>
            {(deafult_popover_index == ind) ? this.surveyCardMenuPopover(val, ind) : null}
            {(deafult_popover_index != ind) ?
              <div onClick={() => { this.onMenuClick(ind) }} className="mblDotsMenu mblDotsCircle mblDotsMenuPllsQzsCard popoverExtra">
                <span className="mblDotsMenu-dots"></span>
                <span className="mblDotsMenu-dots"></span>
                <span className="mblDotsMenu-dots"></span>
              </div> : null}
          </div>
          <div className="full_width mblPllsSrvsContent">
            <div className="full_width radius-6 mblPllsSrvsDrwBox">

              {(val.specialities_name !== '' || val.specialities_name !== null) ?
                <div className="colorBlack font_14px font500 radius-6 mblMedWikiSpeacality">
                  {setSpeciality(val.specialities_name)}
                  {specialityPopOver(val.specialities_name)}
                </div>
                : null}
              {
                (val.point == '' || val.point == null) ? null :
                  <h5 className="font400 text-center colorBlack font_14px text-uppercase mblPllsSrvsPoints"><span className="font_30px font900">{val.point}</span> {this.pointTextValidation(val.point)}</h5>
              }
            </div>

            <div className="clearfix"></div>
            {(val.survey_title == '' || val.survey_title == null) ? null :
              <h3 className="font500 colorBlack font_18px mblPllsSrvsContentTtl">{val.survey_title}</h3>
            }
            <div className="clearfix"></div>
            <h5 className="font400 colorGrey font_14px mblPllsSrvsContentText">{setDescription(val.survey_description)}...</h5>

            <div className="clearfix"></div>
            <div className="full_width mblPllsSrvsbtm">
              <div className="colorWhite font_14px fontExo font700 radius-6 mblPllsSrvsbtm_a" onClick={() => { this.redirectToSpqDetail(val.survey_id) }}>
                Begin
              <img src={begainArrow} alt="Begain" />
              </div>
              <Slider {...mblPllsSrvsClient} className="mblSessionClient">
                {(val.sponsor_logo !== null || val.sponsor_logo == '') ?
                  val.sponsor_logo.split(',').map((val, ind) => (
                    <div className="mblSessionClientItem">
                      <img src={val} />
                    </div>
                  )) : null
                }
              </Slider>
            </div>
          </div>
        </a>
      </div>
    )
  }
  renderSurveyCard(val, ind) {
    return (
      <div className="mblPllsSrvsCard">
        <div className="full_width radius-6 mblPllsSrvs_link">
          <div className="full_width mblPllsSrvsPic">
            <div className="overlay"></div>
            {(val.image == '' || val.image == null) ? null :
              <img src={val.image} className="object_fit_cover" onClick={() => { this.redirectToSpqDetail(val.survey_id) }} />
            }
            <div className="mblPllsSrvsTag">
              <span className="font600 colorWhite font_16px">Survey</span>
            </div>
            {(deafult_popover_index == ind) ? this.surveyCardMenuPopover(val, ind) : null}
            {(deafult_popover_index != ind) ?
              <div onClick={() => { this.onMenuClick(ind) }} className="mblDotsMenu mblDotsCircle mblDotsMenuPllsQzsCard popoverExtra">
                <span className="mblDotsMenu-dots"></span>
                <span className="mblDotsMenu-dots"></span>
                <span className="mblDotsMenu-dots"></span>
              </div> : null}
          </div>
          <div className="full_width mblPllsSrvsContent">
            <div className="full_width radius-6 mblPllsSrvsDrwBox">

              {(val.specialities_name !== '' || val.specialities_name !== null) ?
                <div className="colorBlack font_14px font500 radius-6 mblMedWikiSpeacality">
                  {setSpeciality(val.specialities_name)}
                  {specialityPopOver(val.specialities_name)}

                </div>
                : null}
              {
                (val.point == '' || val.point == null) ? null :
                  <h5 className="font400 text-center colorBlack font_14px text-uppercase mblPllsSrvsPoints"><span className="font_30px font900">{val.point}</span> {this.pointTextValidation(val.point)}</h5>
              }
            </div>

            <div className="clearfix"></div>
            {(val.survey_title == '' || val.survey_title == null) ? null :
              <h3 className="font500 colorBlack font_18px mblPllsSrvsContentTtl" onClick={() => { this.redirectToSpqDetail(val.survey_id) }}>{val.survey_title}</h3>
            }
            <div className="clearfix"></div>
            <h5 className="font400 colorGrey font_14px mblPllsSrvsContentText" onClick={() => { this.redirectToSpqDetail(val.survey_id) }}>{setDescription(val.survey_description)}</h5>

            <div className="clearfix"></div>
            <div className="full_width mblPllsSrvsbtm">
              <div className="colorWhite font_14px fontExo font700 radius-6 mblPllsSrvsbtm_a" onClick={() => { this.redirectToSpqDetail(val.survey_id) }}>
                Begin
            <img src={begainArrow} alt="Begain" />
              </div>
              <Slider {...mblPllsSrvsClient} className="mblSessionClient">
                {(val.sponsor_logo !== null || val.sponsor_logo == '') ?
                  val.sponsor_logo.split(',').map((val, ind) => (
                    <div className="mblSessionClientItem">
                      <img src={val} />
                    </div>
                  )) : null
                }
              </Slider>
            </div>
          </div>
        </div>
      </div>
    )
  }

  surveyCardMenuPopover = (val, ind) => {
    return (
      <div className="mblDotsMenu mblDotsCircle mblDotsMenuPllsQzsCard" data-toggle="popover" data-trigger="focus" >
        <div>
          <span className="mblDotsMenu-dots"></span>
          <span className="mblDotsMenu-dots"></span>
          <span className="mblDotsMenu-dots"></span>
        </div>
        <Popover id="popover-basic" placement="bottom-end" className="mblDotsMenuSettings popoverExtra">
          <Popover.Content>
            {/* <a href="javascript:void(0)" className="dskDotsMenuSettingsIcon active" >
                    <span>
                    <img src={likeIcon} alt="Like"  className="translate_both dskGrLeftShareImg" />
                    <img src={likeIconActive} alt="Like"  className="translate_both dskGrLeftShareImgActive" />
                    </span>
                    Like
                </a>
                <a href="javascript:void(0)" className="dskDotsMenuSettingsIcon">
                    <span>
                <img src={vaultIcon} alt="Vault" className="translate_both dskGrLeftShareImg" />
                <img src={vaultIconActive} alt="Vault" className="translate_both dskGrLeftShareImgActive" />
                </span>
                    Vault
                </a> */}
            {/* <InlineShareButtons
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
                url: val.deeplink, // (defaults to current url)
                image: 'https://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
                description: val.survey_description.substring(0, 100) + "...",       // (defaults to og:description or twitter:description)
                title: val.survey_title,            // (defaults to og:title or twitter:title)
                message: '',     // (only for email sharing)
                subject: '',  // (only for email sharing)
                username: 'Medwiki view' // (only for twitter sharing)
              }} /> */}
            {/* <a href="javascript:void(0)" className="dskDotsMenuNotRelevant">
              Not Relevant for me
          </a> */}
          <Share customClass="dskCphTtlExtra"
              data={{
                title: val.survey_title,
                text: val.survey_description,
                url: val.deeplink,
              }}
            />
          </Popover.Content>
        </Popover>
      </div>
    )
  }
  render() {
    var mblPllsSrvsSlider = {
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      centerMode: true,
      centerPadding: '12%',
      autoplay: false,
      afterChange: (currentSlide) => {
        // //console.log("survey slider no"+currentSlide); 
        // this.surveyFetchValidate(currentSlide)
      },
      responsive: [
        {
          breakpoint: 640,
          settings: {
            centerPadding: '6%',

          }
        },
        {
          breakpoint: 360,
          settings: {
            centerPadding: '5%',

          }
        }
      ]
    };
    return (
      <section className="full_width text-left mblPllsSrvs" id='surveySlider'>
        {(survey_list_data != null && survey_list_data.length > 0) ?
          <h3 className="font700 fontExo colorBlack font_20px mblPllsSrvsTtl">Trending Quizzes</h3> : null}
        <div className="clearfix"></div>
        <Slider {...mblPllsSrvsSlider} className="full_width text-left mblPllsSrvsSlider" >
          {(survey_list_data != null && survey_list_data.length > 0) ?
            survey_list_data.map((val, ind) => (
              <>
                {this.renderRecomentedSurveyList(val, ind)}
              </>
            ))
            : null
          } 
        </Slider> 
        {(survey_list_data.length <= 0 && !isApiCallDone) ?<div className="full_width text-left mblPllsSrvsSlider"><SpqLoader/></div>:null}
      </section> 
    )
  }
}
export default RecommentedSurvey;