import React from 'react';
import Slider from "react-slick";
import AppConfig from '../../config/config.js';
import { reactLocalStorage } from 'reactjs-localstorage';
import Loader from 'react-loader-spinner'
import { ToastsContainer, ToastsStore } from 'react-toasts';
import $ from 'jquery';
import { isInViewport, setDescription, setSpeciality, specialityPopOver } from '../../Common/Common.js';
import dskArchiveCardPlay from '../../../desktopImages/videoIcon.png';
import { InlineShareButtons } from 'sharethis-reactjs';
import playIcon from '../../../images/playIcon.png';
import medwikiicon from '../../../images/medWikiNoImage-2.jpg';
import ssnTopBgGraphic from '../../../mobImages/ssnTopBgGraphic.png';
import critiCare from '../../../mobImages/critiCare.png';
import strathspeyLogo from '../../../mobImages/strathspeyLogo.png';
import begainArrow from '../../../mobImages/begainArrow.png';
import Popover from 'react-bootstrap/Popover'
import angaleWhite from '../../../desktopImages/angaleWhite.png';
import likeIcon from '../../../desktopImages/like-black.png';
import likeIconActive from '../../../desktopImages/like-active.png';
import vaultIcon from '../../../desktopImages/vault-black.png';
import vaultIconActive from '../../../desktopImages/vault-active.png';


const url = AppConfig.apiLoc;
const api_version = AppConfig.api_version;

let recent_list_data = []
var loader_status = true
var recent_api_call_permission = true;
var fetch_counter = 0;
var deafult_popover_index = -1;

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
  cssEase: 'linear'
};


var mblSessionClient = {
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
var mblMedWikiClient = {
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
var mblGrClient = {
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
var mblPllsSrvsClient = {
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


var mblGrSlider = {
  dots: false,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  centerMode: true,
  centerPadding: '12%',
  autoplay: true,
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


class RecentMobile extends React.Component {
  constructor(props) {
    super(props);
    this.id= this.props.id
    this.state = {
      display: false,
      loader_status: true
    };
    recent_list_data = []
    fetch_counter = 0
  }

  componentDidMount() {
    let temp = this
    recent_list_data = []
    fetch_counter = 0
    if (fetch_counter == 0) {
      this.fetchData()
    }
    try {
      let position = $(window).scrollTop();
      const recentSection = document.querySelector("#recent-section");
      $(window).scroll(function () {
        let scroll = $(window).scrollTop();
        var nav = $('#recent-section');
        if (nav.length) {
          if ($(window).scrollTop() >= $("#recent-section").offset().top + $("#recent-section").outerHeight() - window.innerHeight) {
            if (scroll > position) {
              temp.fetchData();
            } else {
              recent_api_call_permission = true;
            }
          }
        }
      });
    }
    catch (err) {
      //console.log('in catch')
    }

    $(document).on("click", function (e) {
      //popover dissapear func
      let ggg = $(e.target).parents('.popoverExtra').length;
      if (ggg == 0 && !$(e.target).hasClass('popoverExtra')) {
        deafult_popover_index = -1;
        temp.refresh();
      }
    });
  }


  onMenuClick(ind) {
    deafult_popover_index = ind;
    this.refresh()
  }

  fetchData() {
    const recentSection = document.querySelector("#recent-section");
    let recent_list_length = parseInt(recent_list_data.length)+parseInt(1);
    let fetch_from = recent_list_length;
    if (recent_api_call_permission === true && fetch_counter !== 0 && fetch_from !== undefined) {
      this.setState({ 'loader_status': true })
      this.getRecentData(fetch_from)
    } if (recent_api_call_permission === true && fetch_counter == 0) {
      //console.log('in fetch data function if 2')
      this.getRecentData(0)
    } else {
      // //console.log('in fetch data function else')
    }
  }

  redirectToSpqDetail = (id) => {
    this.props.history.push({
      pathname: '/SpqDetails/' + id + ''
    })
  }

  redirectToFeedDetail = (id) => {
    this.props.history.push({
      pathname: '/Feeddetail/' + id + ''
    })
  }


  redirectToSessionReservation(val) {
    if (val.status_name == "Close") {
      if (val.video_archive_id != null && val.video_archive_id != 'null' && val.video_archive_id != undefined && val.video_archive_id != '') {
        this.props.history.push({
          pathname: '/ArchivedVideo/' + val.video_archive_id
        })
      }

      else {
        this.props.history.push({
          pathname: '/Reservesession/' + val.session_id + ''
        })
      }
    }
    if (val.status_name == "Running") {
      this.props.history.push({
        pathname: '/LiveSessionDetails/' + val.session_id + ''
      })
    }

    if (val.status_name != "Running" && val.status_name != "Close") {
      this.props.history.push({
        pathname: '/Reservesession/' + val.session_id + ''
      })
    }
  }

  redirectToArchiveDetail = (id) => {
    this.props.history.push({
      pathname: '/ArchivedVideo/' + id + ''
    })
  }

  redirectToGrDetail = (id) => {
    this.props.history.push({
      pathname: '/GrandRounds/' + id + ''
    })
  }
  refresh = () => {
    this.setState({ "display": !this.state.display });
  }

  getRecentData(fetch_from) { 
    let clientmasterid = this.props.id
    if(clientmasterid){
      let context = this
      recent_api_call_permission = false;
      fetch(url + 'referral/fetch_recommended_data?referred_client_master_id='+clientmasterid+'&from='+ fetch_from +'&to=5', {
        method: 'GET',
        headers: {
          'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
          'version': 'rjsw 1.1.1'
        }
      }).then((response) => response.json()).then((responseJson) => {
        this.setState({ 'loader_status': false })
        recent_api_call_permission = true;
        let status_code = responseJson.status_code;
        if (status_code == 200) {
          fetch_counter++;
          let responseData = []
          if (responseJson.data.data && responseJson.data.status) {
            responseData = responseJson.data.data;
          }
          if (responseData.length > 0) {    
            responseData.map((r, index) => {
              recent_list_data.push(r)
              if (index + 1 === responseData.length) {
                  console.log('in last index'+recent_list_data.length)
              }
            })
          }
          if (responseData.length <= 0) {
            recent_api_call_permission = false;
            // this.refresh()
          }
          console.log("before ////state changed")
          context.setState({'display':!context.state.display}, () => {
            console.log("state changed"+recent_list_data)
          })
          console.log("after ////state changed")
        }
      }).catch((error) => {
  
        recent_api_call_permission = true;
        // //console.log("Error"+error);
      });
    }else{
      return false
    }

  }

  renderRecentList(val, ind) {
    let category = val.trending_type
    //console.log("render session//"+val.trending_type+'\n'+val.category)
    switch (category) {
      case 'comp':
        return (
          this.renderMedwikiCard(val, ind)
        )
      case 'survey':
        if (val.category === 'poll') {
          return false;
        }
        else {
          //console.log('in survey render')
          return (
            this.renderSurveyCard(val, ind)
          )
        }
      case 'session':
        if (val.session_id == '' || val.session_id == null || val.session_id == undefined) {
          return false;
        } else {
          return (
            this.renderSessionCardAsStatus(val, ind)
          )
        }
        break;
      // case 'gr':
      //   //console.log("rendering gr////"+JSON.stringify(val))
      //   return(
      //     this.renderGrandRoundCard(val,ind)
      //   )
      case 'video_archive':
        return (
          this.renderArchivedVideoCard(val, ind)
        );
    }
  }


  onvaultPress = (item_id, type, arr_index) => {
    var thisobjval = this;
    let formdatam = { "postid": item_id, "type": type }
    fetch(url + 'knwlg/vault_switching', {
      method: 'POST',
      headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'
      },
      body: JSON.stringify(formdatam),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.data == 1) {
          recent_list_data[arr_index].vault = responseJson.data
          reactLocalStorage.set('@ClirnetStore:vault_count', (parseInt(reactLocalStorage.get('@ClirnetStore:vault_count', true)) + 1));
        }
        else{
          recent_list_data[arr_index].vault = responseJson.data
          reactLocalStorage.set('@ClirnetStore:vault_count', (parseInt(reactLocalStorage.get('@ClirnetStore:vault_count', true)) - 1));
        }
        // this.refresh();
        this.props.callbackReciver();
      })
      .catch((error) => {
      });
  }

  onLikeBtnPress = (item_id, type, arr_index) => {
    console.log("like btn")
    let formdatam = { "type_id": item_id, "type": type }
    fetch(url + 'knwlg/save_like', {
      method: 'POST',
      headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'
      },
      body: JSON.stringify(formdatam),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status_code == 200) {
          if (responseJson.data.like) {
            recent_list_data[arr_index].rating = responseJson.data.rating
            recent_list_data[arr_index].myrating = true
          } else {
            recent_list_data[arr_index].rating = responseJson.data.rating
            recent_list_data[arr_index].myrating = false
          }
        }
        this.refresh()
      })
      .catch((error) => {
      });
  }


  arcCardMenuPopover = (val, array_index) => {
    return (
      <div className="mblDotsMenu mblDotsCircle mblDotsMenuSssnCard" data-toggle="popover" data-trigger="focus">
        <div>
          <span className="mblDotsMenu-dots"></span>
          <span className="mblDotsMenu-dots"></span>
          <span className="mblDotsMenu-dots"></span>
        </div>
        <Popover id="popover-basic" placement="bottom-end" className="mblDotsMenuSettings popoverExtra">
          <Popover.Content>
            <a href="javascript:void(0)" className={(val.myrating == true) ? "mblDotsMenuSettingsIcon active" : "mblDotsMenuSettingsIcon"} onClick={() => this.onLikeBtnPress(val.type_id, 'video_archive', array_index)}>
              <span>
                {(val.myrating == true) ?
                  <img src={likeIconActive} alt="Like" className="translate_both mblGrLeftShareImgActive" /> :
                  <img src={likeIcon} alt="Like" className="translate_both mblGrLeftShareImg" />
                }
              </span>
              Like
            </a>
            <a href="javascript:void(0)" className={val.vault == 0 ? 'mblDotsMenuSettingsIcon ' : 'mblDotsMenuSettingsIcon active'} onClick={() => this.onvaultPress(val.type_id, 'video_archive', array_index)}>
              <span>
                {(val.vault == 0) ?
                  <img src={vaultIcon} alt="Vault" className="translate_both mblGrLeftShareImg" /> :
                  <img src={vaultIconActive} alt="Vault" className="translate_both mblGrLeftShareImgActive" />}
              </span>
                Vault
            </a>
            <InlineShareButtons
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
                description: val.question.substring(0, 100) + "...",       // (defaults to og:description or twitter:description)
                title: val.question,            // (defaults to og:title or twitter:title)
                message: '',     // (only for email sharing)
                subject: '',  // (only for email sharing)
                username: 'Medwiki view' // (only for twitter sharing)
              }} />
            {/* <a href="javascript:void(0)" className="mblDotsMenuNotRelevant" onClick={()=>{this.onNotRelevantClick(val.type_id,'gr',array_index)}}>
                Not Relevant for me
            </a> */}
          </Popover.Content>
        </Popover>
      </div>
    )
  }

  renderArchivedVideoCard(val, ind) {
    return (
      <div className="mblSessionCard mblArchiveCard mblRecentCard">
        <a href="javascript:void(0)" className="full_width radius-6 mblSessionCard_link">
          <div className="full_width mblSessionTopArea">
            {(val.image == '' || val.image == null) ?
              <img src={medwikiicon} className="object_fit_cover ssnTopBgGraphic" /> :
              <img src={val.image} className="object_fit_cover ssnTopBgGraphic" />
            }
            <div className="overlay" onClick={() => { this.redirectToArchiveDetail(val.type_id) }} style={{ "cursor": "pointer" }}></div>
            <img src={dskArchiveCardPlay} className="translate_both mblArchiveCardPlay" />
            <div className="full_width mblSessionTopIn">
              <div className="full_width mblSessionTop">
                <div className="row align-items-center justify-content-between">
                  {
                    (val.category_name == '' || val.category_name == null) ? null :
                      <div className="colorWhite font_14px font500 mblSessionType">
                        {(val.category_image == null || val.category_image == '') ?
                          null :
                          <span className="radius-100 mblSessionTypeIcon">
                            <img src={val.category_image} className="translate_both" />
                          </span>
                        }
                        {val.category_name}
                      </div>
                  }
                  <div className="mblSessionTopRight">
                    {(deafult_popover_index == ind) ? this.arcCardMenuPopover(val, ind) : null}
                    {(deafult_popover_index != ind) ?
                      <div onClick={() => { this.onMenuClick(ind) }} className="mblDotsMenu mblDotsCircle mblDotsMenuSssnCard popoverExtra">
                        <span className="mblDotsMenu-dots"></span>
                        <span className="mblDotsMenu-dots"></span>
                        <span className="mblDotsMenu-dots"></span>
                      </div> : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="full_width mblSessionBttmArea">
            {
              (val.question == '' || val.question == null) ? null :
                <h3 className="colorBlack font_16px font400 mblArchiveCardTtl">{val.question}</h3>
            }
            <div className="clearfix"></div>
            <div className="full_width mblSessionDocArea">
              {(val.session_doctor_entities.length > 0) ?
                val.session_doctor_entities.map((val, ind) => (
                  <div className="full_width radius-6 mblSessionDocRow">
                    <div className="row align-items-center">
                      <div className="radius-100 mblSessionDocPic">
                        {(val.session_doctor_image != '' || val.session_doctor_image != null) ?
                          <img src={val.session_doctor_image} alt="Vault" className="object_fit_cover" /> :
                          <img src={medwikiicon} alt="Vault" className="object_fit_cover" />}
                      </div>
                      <div className="full_width mblSessionDocTtl">
                        <h4 className="colorBlack font_16px font500">{val.session_doctor_name}</h4>
                        <span className="font_12px colorGrey">{val.DepartmentName}</span>
                      </div>
                    </div>
                  </div>
                )) : null}
              {/* mblSessionDocRow */}
            </div>

            <div className="full_width mblSessionbtm">
              <div className="text-uppercase colorWhite font_14px fontExo font400 radius-6 mblSessionbtm_a" onClick={() => { this.redirectToArchiveDetail(val.type_id) }}>
                <span>Attend <img src={angaleWhite} /></span>
              </div>
              <Slider {...mblSessionClient} className="mblSessionClient">
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


  renderSessionCardAsStatus(val, ind) {
    if (val.status_name == "Close") {
      return (
        this.closedSessionCard(val, ind)
      )
    } if (val.status_name == "Running") {
      return (
        this.renderSessionCard(val, ind)
      )
    }
    if (val.status_name != "Running" && val.status_name != "Close") {
      return (
        this.renderSessionCard(val, ind)
      )

    }
    return false;
  }

  closedSessionCard(val, ind) {
    return (
      <div className="mblSessionCard mblArchiveCard mblNo-ArchiveVideoCard mblRecentCard ">
        <a href="javascript:void(0)" className="full_width radius-6 mblSessionCard_link"  >
          <div className="full_width mblSessionTopArea">
            <img src={ssnTopBgGraphic} className="object_fit_cover ssnTopBgGraphic" onClick={() => { this.redirectToSessionReservation(val) }} />
            <div className="overlay" style={{ "cursor": "pointer" }}></div>
            <h4 className="translate_top mblNo-ArchiveVideoCardInfo font700 font_18px">Session Closed</h4>

            <div className="full_width mblSessionTopIn">
              <div className="full_width mblSessionTop">
                <div className="row align-items-center justify-content-between">
                  <div className="colorWhite font_14px font500 mblSessionType">
                    {
                      (val.category_image == null || val.category_image == '') ?
                        null :
                        <span className="radius-100 mblSessionTypeIcon">
                          <img src={val.category_image} className="translate_both" />
                        </span>
                    }
                    {val.ms_cat_name}
                  </div>
                  <div className="mblSessionTopRight">
                    {(deafult_popover_index == ind) ? this.sessionCardMenuPopover(val, ind) : null}
                    {(deafult_popover_index != ind) ?
                      <div onClick={() => { this.onMenuClick(ind) }} className="mblDotsMenu mblDotsCircle mblDotsMenuSssnCard popoverExtra">
                        <span className="mblDotsMenu-dots"></span>
                        <span className="mblDotsMenu-dots"></span>
                        <span className="mblDotsMenu-dots"></span>
                      </div> : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="full_width mblSessionBttmArea" onClick={() => { this.redirectToSessionReservation(val) }}>
            <h3 className="colorBlack font_16px font400 mblArchiveCardTtl" onClick={() => { this.redirectToSessionReservation(val) }}>{(val.seesion_title == '' || val.seesion_title == null) ? null : val.seesion_title}</h3>
            <div className="clearfix"></div>
            <div className="full_width mblSessionDocArea">
              <div className="full_width radius-6 mblSessionDocRow">
                {(val.session_doctor_entities.length > 0) ?
                  val.session_doctor_entities.map((val, ind) => (
                    <div className="row align-items-center">
                      <div className="radius-100 mblSessionDocPic">
                        {(val.session_doctor_image == '' || val.session_doctor_image == null) ? null
                          : <img src={val.session_doctor_image} alt="Vault" className="object_fit_cover" />
                        }
                      </div>
                      <div className="full_width mblSessionDocTtl">
                        <h4 className="colorBlack font_16px font500">{val.session_doctor_name}</h4>
                        <span className="font_12px colorGrey">{val.DepartmentName}</span>
                      </div>
                    </div>
                  )) : null}
              </div>

            </div>

            <div className="full_width mblSessionbtm">

              <Slider {...mblSessionClient} className="mblSessionClient">
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

  sessionCardMenuPopover = (val, ind) => {
    return (
      <div className="mblDotsMenu mblDotsCircle mblDotsMenuSssnCard" data-toggle="popover" data-trigger="focus">
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
            <InlineShareButtons
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
                description: val.seesion_title,       // (defaults to og:description or twitter:description)
                title: val.seesion_title,       // (defaults to og:title or twitter:title)
                message: '',     // (only for email sharing)
                subject: '',  // (only for email sharing)
                username: 'Session view' // (only for twitter sharing)
              }} />
            {/* <a href="javascript:void(0)" className="dskDotsMenuNotRelevant">
                Not Relevant for me
            </a> */}
          </Popover.Content>
        </Popover>
      </div>
    )
  }
  grCardMenuPopover = (val, ind) => {
    return (
      <div className="mblDotsMenu mblDotsCircle" data-toggle="popover" data-trigger="focus">
        <div>
          <span className="mblDotsMenu-dots"></span>
          <span className="mblDotsMenu-dots"></span>
          <span className="mblDotsMenu-dots"></span>
        </div>
        <Popover id="popover-basic" placement="bottom-end" className="mblDotsMenuSettings popoverExtra">
          <Popover.Content>
            {/* <a href="javascript:void(0)" className="mblDotsMenuSettingsIcon active" >
                      <span>
                      <img src={likeIcon} alt="Like"  className="translate_both mblGrLeftShareImg" />
                      <img src={likeIconActive} alt="Like"  className="translate_both mblGrLeftShareImgActive" />
                      </span>
                      Like
                  </a>
                  <a href="javascript:void(0)" className="mblDotsMenuSettingsIcon">
                      <span>
                  <img src={vaultIcon} alt="Vault" className="translate_both mblGrLeftShareImg" />
                  <img src={vaultIconActive} alt="Vault" className="translate_both mblGrLeftShareImgActive" />
                  </span>
                      Vault
                  </a> */}
            <InlineShareButtons
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
                description: val.description.substring(0, 100) + "...",       // (defaults to og:description or twitter:description)
                title: val.title,            // (defaults to og:title or twitter:title)
                message: '',     // (only for email sharing)
                subject: '',  // (only for email sharing)
                username: 'Medwiki view' // (only for twitter sharing)
              }} />
            {/* <a href="javascript:void(0)" className="mblDotsMenuNotRelevant">
                Not Relevant for me
            </a> */}
          </Popover.Content>
        </Popover>
      </div>
    )
  }

  surveyCardMenuPopover = (val, ind) => {
    return (
      <div className="mblDotsMenu mblDotsCircle mblDotsMenuPllsQzsCard" data-toggle="popover" data-trigger="focus">
        <div>
          <span className="mblDotsMenu-dots"></span>
          <span className="mblDotsMenu-dots"></span>
          <span className="mblDotsMenu-dots"></span>
        </div>
        <Popover id="popover-basic" placement="bottom-end" className="mblDotsMenuSettings popoverExtra">
          <Popover.Content>
            {/* <a href="javascript:void(0)" className="mblDotsMenuSettingsIcon active" >
                      <span>
                      <img src={likeIcon} alt="Like"  className="translate_both mblGrLeftShareImg" />
                      <img src={likeIconActive} alt="Like"  className="translate_both mblGrLeftShareImgActive" />
                      </span>
                      Like
                  </a>
                  <a href="javascript:void(0)" className="mblDotsMenuSettingsIcon">
                      <span>
                  <img src={vaultIcon} alt="Vault" className="translate_both mblGrLeftShareImg" />
                  <img src={vaultIconActive} alt="Vault" className="translate_both mblGrLeftShareImgActive" />
                  </span>
                      Vault
                  </a> */}
            <InlineShareButtons
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
              }} />
            {/* <a href="javascript:void(0)" className="mblDotsMenuNotRelevant">
                Not Relevant for me
            </a> */}
          </Popover.Content>
        </Popover>
      </div>
    )
  }
  cardMenuPopover = (val, array_index) => {
    return (
      <div className="mblDotsMenu mblDotsMenuMedWikiCard" data-toggle="popover" data-trigger="focus">
        <div>
          <span className="mblDotsMenu-dots"></span>
          <span className="mblDotsMenu-dots"></span>
          <span className="mblDotsMenu-dots"></span>
        </div>
        <Popover id="popover-basic" placement="bottom-end" className="mblDotsMenuSettings popoverExtra">
          <Popover.Content>
            <a href="javascript:void(0)" className={(val.myrating == true) ? "mblDotsMenuSettingsIcon active" : "mblDotsMenuSettingsIcon"} onClick={() => this.onLikeBtnPress(val.type_id, 'comp', array_index)}>
              <span>
                {(val.myrating == true) ?
                  <img src={likeIconActive} alt="Like" className="translate_both mblGrLeftShareImgActive" /> :
                  <img src={likeIcon} alt="Like" className="translate_both mblGrLeftShareImg" />
                }
              </span>
              Like
            </a>
            <a href="javascript:void(0)" className={val.vault == 0 ? 'mblDotsMenuSettingsIcon ' : 'mblDotsMenuSettingsIcon active'} onClick={() => this.onvaultPress(val.type_id, 'comp', array_index)}>
              <span>
                {(val.vault == 0) ?
                  <img src={vaultIcon} alt="Vault" className="translate_both mblGrLeftShareImg" /> :
                  <img src={vaultIconActive} alt="Vault" className="translate_both mblGrLeftShareImgActive" />}
              </span>
                Vault
            </a>
            <InlineShareButtons
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
                description: val.question.substring(0, 100) + "...",       // (defaults to og:description or twitter:description)
                title: val.answer,            // (defaults to og:title or twitter:title)
                message: '',     // (only for email sharing)
                subject: '',  // (only for email sharing)
                username: 'Medwiki view' // (only for twitter sharing)
              }} />
            {/* <a href="javascript:void(0)" className="mblDotsMenuNotRelevant">
                Not Relevant for me
            </a> */}
          </Popover.Content>
        </Popover>
      </div>
    )
  }

  pollCardMenuPopover = (val, ind) => {
    return (
      <div className="mblDotsMenu mblDotsMenuMedWikiCard mblPollsCardDots">
        <div>
          <span className="mblDotsMenu-dots"></span>
          <span className="mblDotsMenu-dots"></span>
          <span className="mblDotsMenu-dots"></span>
        </div>
        <Popover id="popover-basic" placement="bottom-end" className="mblDotsMenuSettings popoverExtra">
          <Popover.Content>
            {/* <a href="javascript:void(0)" className="mblDotsMenuSettingsIcon active" >
                      <span>
                      <img src={likeIcon} alt="Like"  className="translate_both mblGrLeftShareImg" />
                      <img src={likeIconActive} alt="Like"  className="translate_both mblGrLeftShareImgActive" />
                      </span>
                      Like
                  </a> */}
            {/* <a href="javascript:void(0)" className="mblDotsMenuSettingsIcon">
                      <span>
                  <img src={vaultIcon} alt="Vault" className="translate_both mblGrLeftShareImg" />
                  <img src={vaultIconActive} alt="Vault" className="translate_both mblGrLeftShareImgActive" />
                  </span>
                      Vault 
                  </a> */}
            <InlineShareButtons
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
              }} />
            {/* <a href="javascript:void(0)" className="mblDotsMenuNotRelevant">
                Not Relevant for me
            </a> */}
          </Popover.Content>
        </Popover>
      </div>
    )
  }

  pointTextValidation(point) {
    if (point <= 1) {
      return ' Point'
    } else {
      return ' Points'
    }
  }

  renderSessionCard(val, ind) {
    var mblSessionClient = {
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
    return (
      <div className="mblSessionCard mblRecentCard"  >
        <div className="full_width radius-6 mblSessionCard_link">
          <div className="full_width mblSessionTopArea" style={{ "background-color": val.color }}>

            <img src={ssnTopBgGraphic} className="object_fit_cover ssnTopBgGraphic" />
            <div className="overlay"></div>
            <div className="full_width mblSessionTopIn">
              <div className="full_width mblSessionTop">
                <div className="row align-items-center justify-content-between">
                  <div className="colorWhite font_14px font700 mblSessionType">
                    {
                      (val.category_image == null || val.category_image == '') ?
                        null :
                        <span className="radius-100 mblSessionTypeIcon">
                          <img src={val.category_image} className="translate_both" />
                        </span>
                    }
                    {val.ms_cat_name}
                  </div>
                  <div className="mblSessionTopRight">
                    <div className="mblSessionTime">
                      {(val.live_mode !== true) ?
                        <h4 className="colorWhite font_14px font700">{val.start_datetime} | {val.display_date}</h4>
                        : null}
                      {(val.live_mode === true) ?
                        <div className="full_width mblSessionLive">
                          <div className="liveAni">
                            <span className="aniBx"></span>
                            <span className="aniBx"></span>
                            <span className="aniBx"></span>
                          </div>
                          <h4 className="colorWhite font_14px font700">Live</h4>
                        </div>
                        : null}
                    </div>
                    {(deafult_popover_index == ind) ? this.sessionCardMenuPopover(val, ind) : null}
                    {(deafult_popover_index != ind) ?
                      <div onClick={() => { this.onMenuClick(ind) }} className="mblDotsMenu mblDotsCircle mblDotsMenuSssnCard popoverExtra">
                        <span className="mblDotsMenu-dots"></span>
                        <span className="mblDotsMenu-dots"></span>
                        <span className="mblDotsMenu-dots"></span>
                      </div> : null}
                  </div>
                </div>
              </div>
              <div className="clearfix"></div>
              <h3 className="colorWhite font_18px font600">{(val.seesion_title !== '' || val.seesion_title !== null) ? val.seesion_title : null}</h3>
            </div>
          </div>
          <div className="full_width mblSessionBttmArea">
            <div className="full_width mblSessionDocArea">
              {(val.session_doctor_entities.length > 0) ?
                val.session_doctor_entities.map((val, ind) => (
                  <div className="full_width radius-6 mblSessionDocRow">
                    <div className="row align-items-center">
                      <div className="radius-100 mblSessionDocPic">
                        <img src={val.session_doctor_image} alt="Vault" className="object_fit_cover" />
                      </div>
                      <div className="full_width mblSessionDocTtl">
                        <h4 className="colorBlack font_18px font600">{val.session_doctor_name}</h4>
                        <span className="font_12px colorGrey">{val.DepartmentName}</span>
                      </div>
                    </div>
                  </div>
                )) : null}
            </div>
            <div className="full_width mblSessionbtm">
              <div className="text-uppercase colorWhite font_14px fontExo font600 radius-6 mblSessionbtm_a" onClick={() => { this.redirectToSessionReservation(val) }} style={{ "background-color": val.color }}>
                <span>View Session</span>
              </div>
              <Slider {...mblSessionClient} className="mblSessionClient">
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

  renderMedwikiCard(val, ind) {
    return (
      <div className="mblMedWikiCard mblRecentCard" onClick={() => { this.redirectToFeedDetail(val.type_id) }}>
        <div className="full_width radius-6 mblMedWikiCard_link">
          <div className="row align-items-center">
            <div className="mblMedWikiPic">
              <div className="radius-6 mblMedWikiPicGraphic" style={{ "background-color": val.color }}></div>
              {
                (val.con_type == 'text' && val.image != '') ?
                  <div className="full_width mblMedWikiPicIn">
                    <img src={val.image} className="object_fit_cover" />
                    <div className="overlay"></div>
                  </div> :
                  (val.con_type == 'video' && val.image != '') ?
                    <div className="full_width mblMedWikiPicIn">
                      <img src={val.image} className="object_fit_cover" />
                      <div className="overlay"></div>
                      <img src={playIcon} className="translate_both" />
                    </div> :
                    <div className="full_width mblMedWikiPicIn">
                      <img src={medwikiicon} className="object_fit_cover" />
                      <div className="overlay"></div>
                    </div>
              }
            </div>
            <div className="mblMedWikiContent">
              <div className="full_width mblMedWikiContentTop">

                {(val.specialities == "" || val.specialities == 'null') ? null :
                  <div className="colorBlack font_14px font500 radius-6 mblMedWikiSpeacality">
                    {setSpeciality(val.specialities)}
                    {specialityPopOver(val.specialities)}
                  </div>}
                {(deafult_popover_index == ind) ? this.cardMenuPopover(val, ind) : null}
                {(deafult_popover_index != ind) ?
                  <div onClick={() => { this.onMenuClick(ind) }} className="mblDotsMenu mblDotsMenuMedWikiCard popoverExtra">
                    <span className="mblDotsMenu-dots"></span>
                    <span className="mblDotsMenu-dots"></span>
                    <span className="mblDotsMenu-dots"></span>
                  </div> : null}
              </div>
              <div className="clearfix"></div>
              <h4 className="font500 colorBlack font_16px mblMedWikiContentTtl" onClick={() => { this.redirectToFeedDetail(val.type_id) }}>{(val.question !== '') ? setDescription(val.question) : null} </h4>
              <div className="clearfix"></div>
              <Slider {...mblMedWikiClient} className="mblSessionClient mblMedWikiClient">
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

  renderSurveyCard(val, ind) {
    return (
      <div className="mblPllsSrvsCard mblRecentCard" >
        <div className="full_width radius-6 mblPllsSrvs_link">
          <div className="full_width mblPllsSrvsPic">
            <div className="overlay"></div>
            {(val.image == '' || val.image == null) ? null :
              <img src={val.image} className="object_fit_cover" />
            }
            <div className="mblPllsSrvsTag">
              <span className="font600 colorWhite font_16px">{(val.category == 'quiz') ? "Quiz" : "Survey"}</span>
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

              {(val.specialities_name === null || val.specialities_name === '') ? null :
                <div className="colorBlack font_14px font500 radius-6 mblMedWikiSpeacality">
                  {setSpeciality(val.specialities_name)}
                  {specialityPopOver(val.specialities_name)}
                </div>
              }
              <h5 className="font400 text-center colorBlack font_14px text-uppercase mblPllsSrvsPoints"><span className="font_30px font900">{val.point}</span> {this.pointTextValidation(val.point)}</h5>
            </div>

            <div className="clearfix"></div>
            {(val.survey_title == '' || val.survey_title == null) ? null :
              <h3 className="font500 colorBlack font_18px mblPllsSrvsContentTtl" onClick={() => { this.redirectToSpqDetail(val.survey_id) }}>{val.survey_title}</h3>
            }
            <div className="clearfix"></div>
            <h5 className="font400 colorGrey font_14px mblPllsSrvsContentText">{setDescription(val.survey_description)}</h5>

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


  renderGrandRoundCard(val) {
    return (
      <div className="mblGrCard mblRecentCard">
        <div className="full_width radius-6 mblGrCard_link" >
          <div className="full_width mblGrPic">
            <div className="overlay"></div>
            <img src="https://monilekhospital.com/wp-content/uploads/2020/08/department_Gastroenterology.jpg" className="object_fit_cover" />
          </div>
          <div className="full_width mblGrContent">
            <h3 className="font500 colorBlack font_18px mblGrContentTtl">Lorem Ipsum is simply dummy text of the printing typesetting industry. dummy text </h3>
            <div className="clearfix"></div>
            <h5 className="font400 colorGrey font_14px mblGrContentText">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the 1500s,</h5>

            <div className="clearfix"></div>
            <Slider {...mblGrClient} className="mblSessionClient mblGrClient">
              <div className="mblSessionClientItem">
                <img src={strathspeyLogo} />
              </div>
              <div className="mblSessionClientItem">
                <img src={critiCare} />
              </div>
            </Slider>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <section className="full_width text-left mblRecent" id="recent-section">
        {(recent_list_data != null && recent_list_data.length > 0) ?
          <h3 className="font700 fontExo colorBlack font_24px mblRecentTtl">Recent</h3>
          : null}
        <div className="clearfix"></div>
        <div className="full_width mblRecentSroll">
          {(recent_list_data != null && recent_list_data.length > 0) ?
            recent_list_data.map((val, ind) => (
              this.renderRecentList(val, ind)
            ))
            : null
          }
        </div>
        <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={40} width={40} visible={this.state.loader_status} />
      </section>
    );
  }
}
export default RecentMobile;