import React from 'react';
import Slider from "react-slick";
import AppConfig from '../../config/config.js';
import { reactLocalStorage } from 'reactjs-localstorage';
import Loader from 'react-loader-spinner'
import $ from 'jquery';
import Form from 'react-bootstrap/Form';
import playIcon from '../../../images/playIcon.png';
import medwikiicon from '../../../images/medWikiNoImage-2.jpg';
import dskArchiveCardPlay from '../../../desktopImages/videoIcon.png';
import ssnTopBgGraphic from '../../../desktopImages/ssnTopBgGraphic.png';
import angaleWhite from '../../../desktopImages/angaleWhite.png';
import Masonry from 'react-masonry-component';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import { setSpeciality, setDescription, specialityPopOver } from '../../Common/Common.js';
import {isMobile} from 'react-device-detect';

import begainArrow from '../../../desktopImages/begainArrow.png';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Medwikicard from '../../Cards/Medwikicard'; 
import Sessioncard from '../../Cards/Sessioncard'; 
import SurveyCard from '../../Cards/SurveyCard'; 
import QuizCard from '../../Cards/QuizCard.js';

import { InlineShareButtons } from 'sharethis-reactjs';
import likeIcon from '../../../desktopImages/like-black.png';
import likeIconActive from '../../../desktopImages/like-active.png';
import vaultIcon from '../../../desktopImages/vault-black.png';
import vaultIconActive from '../../../desktopImages/vault-active.png';


const url = AppConfig.apiLoc;
const api_version = AppConfig.api_version;

var recent_list_data = []
var fetch_from = 0
var loader_status = false
var recent_api_call_permission = true;
var fetch_counter = 0;

var deafult_popover_index = -1;
var medwiki_popover_index = -1;
var survey_popover_index = -1;
var quiz_popover_index = -1;
let selected_session_popover_index = -1;
var arc_popover_index = -1;

const masonryOptions = {
  transitionDuration: 0
};


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


class RecentDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.id= this.props.id
    this.state = {
      display: false,
      recent_list_data:[],
      loader_status: false,
      page: 0,
      prevY: 0
    };
    recent_list_data = []
    recent_api_call_permission = true;
    fetch_counter = 0
    
    deafult_popover_index = -1
    medwiki_popover_index = -1
    this.handle_change = this.handle_change.bind(this);
    this.handelSessionChange = this.handelSessionChange.bind(this)
    // this.onLikeBtnPress = this.onLikeBtnPress.bind(this)
  }

  componentWillUnmount() {
    deafult_popover_index = -1
    medwiki_popover_index = -1
    survey_popover_index = -1;
    quiz_popover_index = -1;
    arc_popover_index = -1;

  }

  componentDidMount() {
    selected_session_popover_index = -1;
    arc_popover_index = -1;

    recent_list_data = []
    fetch_limit = 0
    let temp = this;
    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };
    
    this.getRecentData(this.state.page,this);
    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    ); 
    this.observer.observe(this.loadingRef);
  
		$(document).on("click", function(e){
      let ggg=$(e.target).parents('.popoverExtra').length;   
        if(ggg==0 && !$(e.target).hasClass('popoverExtra'))
        {
          arc_popover_index = -1;
          survey_popover_index = -1;
          quiz_popover_index = -1;
          deafult_popover_index = -1;
          temp.refresh();
        }  
    });

    $(document).on("click", function(e){
      let ggg=$(e.target).parents('.tanar').length;
      if(ggg==0 && !$(e.target).hasClass('tanar'))
      {
        medwiki_popover_index=-1;
        temp.refresh();
      }  
	  });

    $(document).on("click", function (e) {
      let sessgg = $(e.target).parents('.manar').length;
      if (sessgg == 0 && !$(e.target).hasClass('manar')) {
        selected_session_popover_index = -1;
        temp.refresh();
      } 

      let sessggt = $(e.target).parents('.tanar').length;
      if (sessggt == 0 && !$(e.target).hasClass('tanar')) {
        deafult_popover_index=-1;
        temp.refresh();
      }
    });
 
  }

  onNotRelevantClick(type_id, type, array_index) {
    // //console.log('not relevantClick'+array_index)
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
  // getRecentData(fetch_from,tempthis) {
  //   tempthis.setState({ loader_status: true });
  //   fetch(url + 'dashboard/trending?from=' + fetch_from + '&to=5&type=all', {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
  //       'version': api_version
  //     }
  //   }).then((response) => response.json()).then((responseJson) => {
  //     let status_code = responseJson.status_code;
  //     if (status_code == 200) {
  //       tempthis.setState({ recent_list_data: [...this.state.recent_list_data, ...responseJson.data] });
  //       tempthis.setState({ loader_status: false });
  //     }
  //   }).catch((error) => {
  //     tempthis.setState({ loader_status: false });
  //   });
  // }

  getRecentData(fetch_from) { 
    let tempr = this
    tempthis.setState({ loader_status: true });
    let clientmasterid = this.props.id
    if(clientmasterid){
      let context = this
      recent_api_call_permission = false;
      fetch(url + 'referral/fetch_recommended_data?referred_client_master_id='+clientmasterid+'&from='+ fetch_from +'&to=5', {
        method: 'GET',
        headers: {
          'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
          'version': api_version
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
          tempr.setState({ recent_list_data: [...tempr.state.recent_list_data, ...responseJson.data] });
          tempr.setState({ loader_status: false });
        }
      }).catch((error) => {
        tempr.setState({ loader_status: false });
      });
    }else{
      return false
    }
  }

  handelSessionChange(index, value, type){
    console.log('session poover clicked'+index+'\n'+type)
    if (type == 'popover_session') {
      selected_session_popover_index = index;
      this.refresh(); 
    }
    if (type == 'cancel_session') {
      selected_session_popover_index = index;
      this.refresh(); 
    }
  }

          handle_change(index, value,type)
          {
            console.log("Handel click"+index+'\n'+value+'\n'+type)
            if(type=='vault')
            {
              recent_list_data[index].vault = value;
              // this.refresh();
            }
            if(type=='like')
            {
                if (value == 0) {
                  recent_list_data[index].myrating = false;
                  recent_list_data[index].rating = parseInt(recent_list_data[index].rating) - 1;
                  // this.refresh();
                }
                else {
                  recent_list_data[index].myrating = true;
                  recent_list_data[index].rating = parseInt(recent_list_data[index].rating) + parseInt(value);
                  // this.refresh();
                }
            }
            if(type=='popover')
            {    
              medwiki_popover_index=index;
                // this.refresh();
            }
            // this.refresh();    
            this.props.callbackReciver()
          }


  renderRecentList(val, ind) {
    let category = val.trending_type
    switch (category) {
      case 'comp':
        return (
          <Medwikicard onChangeButton={this.handle_change} history={this.props.history} mobile_device={isMobile} card_data={val} clicked_index={medwiki_popover_index} elem_key={ind} custom_class="feedl_listing"/>
          //this.renderMedwikiCard(val, ind)
        )
      case 'survey':
        if (val.category === 'poll') {
          return false;
        }
        if (val.category === 'quiz') { 
          return <QuizCard data={val} status='new' array_index={ind} click={this.redirectToSpqDetail.bind(this, val.survey_id)} menu_click={this.onMenuClick.bind(this, ind)} deafult_popover_index={survey_popover_index} />;
        }if (val.category === 'survey') {
          return <SurveyCard data={val} status='new' array_index={ind} click={this.redirectToSpqDetail.bind(this, val.survey_id)} menu_click={this.onMenuClick.bind(this, ind)} deafult_popover_index={quiz_popover_index} />;
        }
        else {
          return false;
          // (
          //   //<SurveyCard data={val} status='new' array_index={ind} click={this.redirectToSpqDetail.bind(this, val.survey_id)} menu_click={this.onMenuClick.bind(this, ind)} deafult_popover_index={deafult_popover_index} />
          //   this.renderSurveyCard(val, ind)
          // )
        }
      case 'session':
        ////console.log('in session render'+val.session_id)
        if (val.session_id == '' || val.session_id == null || val.session_id == undefined) {
          return false;
        } else {
          return (
            this.renderSessionCardAsStatus(val, ind)
          )
        }
      // case 'gr':
      //   // //console.log("rendering gr////"+JSON.stringify(val))
      //   return(
      //     this.renderGrandRoundCard(val)
      //   )
      case 'video_archive':
        return (
          this.renderArchivedVideoCard(val, ind)
        );
    }
  }

  renderSessionCardAsStatus(val, ind) {
    if (val.status_name == "Close") {
      return (
        <Sessioncard onChangeButton={this.handelSessionChange} history={this.props.history} mobile_device={isMobile} card_data={val} clicked_index={selected_session_popover_index} elem_key={ind} custom_class="cmecard_session_block" />
        // this.closedSessionCard(val, ind)
      )
    } if (val.status_name == "Running") {
      return (
        <Sessioncard onChangeButton={this.handelSessionChange} history={this.props.history} mobile_device={isMobile} card_data={val} clicked_index={selected_session_popover_index} elem_key={ind} custom_class="cmecard_session_block" />
        // this.renderSessionCard(val, ind)
      )
    }
    if (val.status_name != "Running" && val.status_name != "Close") {
      return (
        <Sessioncard onChangeButton={this.handelSessionChange} history={this.props.history} mobile_device={isMobile} card_data={val} clicked_index={selected_session_popover_index} elem_key={ind} custom_class="cmecard_session_block" />
        // this.renderSessionCard(val, ind)
      )
    }
    return false;
  }
  sessionCardMenuPopover = (val, array_index) => {
    return (
      <div className="dskDotsMenu dskDotsCircle mblDotsMenuSssnCard" data-toggle="popover" data-trigger="focus">
        <div>
          <span className="dskDotsMenu-dots"></span>
          <span className="dskDotsMenu-dots"></span>
          <span className="dskDotsMenu-dots"></span>
        </div>
        <Popover id="popover-basic" placement="bottom-end" className="dskDotsMenuSettings popoverExtra">
          <Popover.Content>
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
                title: val.seesion_title,            // (defaults to og:title or twitter:title)
                message: '',     // (only for email sharing)
                subject: '',  // (only for email sharing)
                username: 'Medwiki view' // (only for twitter sharing)
              }} />
            {/* <a href="javascript:void(0)" className="dskDotsMenuNotRelevant">
                Not Relevant for me
            </a> */}
          </Popover.Content>
        </Popover>
      </div>
    )
  }
  grCardMenuPopover = (val, array_index) => {
    let popover = (
      <Popover id="popover-basic" className="dskDotsMenuSettings" data-toggle="popover" data-trigger="focus">
        <Popover.Content>
          {/* <a href="javascript:void(0)" className="dskDotsMenuSettingsIcon active" >
                    <span>
                      {(val.myrating == true) ?
                      <img src={likeIconActive} alt="Like"  className="translate_both dskGrLeftShareImgActive" onClick = {()=>{this.onLikeBtnPress(val.type_id,'gr',array_index)}}/>:
                      <img src={likeIcon} alt="Like"  className="translate_both dskGrLeftShareImg" onClick = {()=>{this.onLikeBtnPress(val.type_id,'gr',array_index)}} />
                      }
                    </span>
                      Like
                  </a>
                  <a href="javascript:void(0)" className="dskDotsMenuSettingsIcon">
                  <span>
                  {(val.vault == 0) ? 
                  <img src={vaultIcon} alt="Vault" className="translate_both dskGrLeftShareImg" onClick = {()=>{this.onvaultPress(val.type_id,'gr',array_index,0)}}/>:
                  <img src={vaultIconActive} alt="Vault" className="translate_both dskGrLeftShareImgActive"  onClick = {()=>{this.onvaultPress(val.type_id,'gr',array_index,1)}} />}
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
              description: val.title,       // (defaults to og:description or twitter:description)
              title: val.title,            // (defaults to og:title or twitter:title)
              message: '',     // (only for email sharing)
              subject: '',  // (only for email sharing)
              username: 'Medwiki view' // (only for twitter sharing)
            }} />
          {/* <a href="javascript:void(0)" className="dskDotsMenuNotRelevant" onClick={()=>{this.onNotRelevantClick(val.type_id,'gr',array_index)}}>
                Not Relevant for me
            </a> */}
        </Popover.Content>
      </Popover>
    );
    return (
      <OverlayTrigger placement="left-start" rootClose="true" rootCloseEvent="click" trigger="click" delay={{ show: 50, hide: 50 }} overlay={popover} >
        <div className="dskDotsMenu dskDotsCircle mblDotsMenuMedWikiCard">
          <span className="dskDotsMenu-dots"></span>
          <span className="dskDotsMenu-dots"></span>
          <span className="dskDotsMenu-dots"></span>
        </div>
      </OverlayTrigger>
    )
  }

  surveyCardMenuPopover = (val, array_index) => {
    return (
      <div className="dskDotsMenu dskDotsCircle mblDotsMenuPllsQzsCard" data-toggle="popover" data-trigger="focus">
        <div>
          <span className="dskDotsMenu-dots"></span>
          <span className="dskDotsMenu-dots"></span>
          <span className="dskDotsMenu-dots"></span>
        </div>
        <Popover id="popover-basic" placement="bottom-end" className="dskDotsMenuSettings popoverExtra">
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
                description: val.survey_description.substring(0, 100) + "...",       // (defaults to og:description or twitter:description)
                title: val.survey_title,            // (defaults to og:title or twitter:title)
                message: '',     // (only for email sharing)
                subject: '',  // (only for email sharing)
                username: 'Medwiki view' // (only for twitter sharing)
              }} />
            {/* <a href="javascript:void(0)" className="dskDotsMenuNotRelevant">
                Not Relevant for me
            </a> */}
          </Popover.Content>
        </Popover>
      </div>
    )
  }

  onvaultPress = (item_id, type, arr_index) => {
    var thisobjval = this;
    let formdatam = { "postid": item_id, "type": type }
    fetch(url + 'knwlg/vault_switching', {
      method: 'POST',
      headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': api_version
      },
      body: JSON.stringify(formdatam),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.data == 1) {
          recent_list_data[arr_index].vault = responseJson.data
          reactLocalStorage.set('@ClirnetStore:vault_count', (parseInt(reactLocalStorage.get('@ClirnetStore:vault_count', 0)) + 1));
        }else {
          recent_list_data[arr_index].vault = responseJson.data
          reactLocalStorage.set('@ClirnetStore:vault_count', (parseInt(reactLocalStorage.get('@ClirnetStore:vault_count', 0)) - 1));
        }
        this.props.callbackReciver();
        // this.refresh();
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
        'version': api_version
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


  cardMenuPopover = (val, array_index) => {
    console.log('card menu open' + val.myrating)
    return (
      <>
        <div className="dskDotsMenu dskPollsCardDots dskDotsMenuMedWikiCard" data-toggle="popover" data-trigger="focus">
          <div>
            <span className="dskDotsMenu-dots"></span>
            <span className="dskDotsMenu-dots"></span>
            <span className="dskDotsMenu-dots"></span>
          </div>
          <Popover id={"popover-basic" + array_index} placement="bottom-end" className="dskDotsMenuSettings popoverExtra">
            <Popover.Content>
              <a href="javascript:void(0)" className={(val.myrating == true) ? "dskDotsMenuSettingsIcon active" : "dskDotsMenuSettingsIcon"} onClick={() => this.onLikeBtnPress(val.type_id, 'comp', array_index)}>
                <span>
                  {(val.myrating == true) ?
                    <img src={likeIconActive} alt="Like" className="translate_both dskGrLeftShareImgActive" /> :
                    <img src={likeIcon} alt="Like" className="translate_both dskGrLeftShareImg" />
                  }
                </span>
              Like
            </a>
              <a href="javascript:void(0)" className={val.vault == 0 ? 'dskDotsMenuSettingsIcon ' : 'dskDotsMenuSettingsIcon active'} onClick={() => this.onvaultPress(val.type_id, 'comp', array_index)}>
                <span>
                  {(val.vault == 0) ?
                    <img src={vaultIcon} alt="Vault" className="translate_both dskGrLeftShareImg" /> :
                    <img src={vaultIconActive} alt="Vault" className="translate_both dskGrLeftShareImgActive" />}
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
              {/* <a href="javascript:void(0)" className="dskDotsMenuNotRelevant" onClick = {()=>{this.onNotRelevantClick(val.type_id,'comp',array_index)}} >
              Not Relevant for me
          </a> */}
            </Popover.Content>
          </Popover>
        </div>
      </>
    )
  }

  pollCardMenuPopover = (val) => {
    return (
      <div className="dskDotsMenu dskPollsCardDots" data-toggle="popover" data-trigger="focus">
        <div>
          <span className="dskDotsMenu-dots"></span>
          <span className="dskDotsMenu-dots"></span>
          <span className="dskDotsMenu-dots"></span>
        </div>
        <Popover id="popover-basic" placement="bottom-end" className="dskDotsMenuSettings popoverExtra">
          <Popover.Content>
            {/* <a href="javascript:void(0)" className="dskDotsMenuSettingsIcon active" >
                        <span>
                        <img src={likeIcon} alt="Like"  className="translate_both dskGrLeftShareImg" />
                        <img src={likeIconActive} alt="Like"  className="translate_both dskGrLeftShareImgActive" />
                        </span>
                        Like
                    </a> */}
            {/* <a href="javascript:void(0)" className="dskDotsMenuSettingsIcon">
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
                description: val.survey_description.substring(0, 100) + "...",       // (defaults to og:description or twitter:description)
                title: val.survey_title,            // (defaults to og:title or twitter:title)
                message: '',     // (only for email sharing)
                subject: '',  // (only for email sharing)
                username: 'Medwiki view' // (only for twitter sharing)
              }} />
            <a href="javascript:void(0)" className="dskDotsMenuNotRelevant">
              Not Relevant for me
              </a>
          </Popover.Content>
        </Popover>
      </div>
    )
  }

  onMenuClick(ind) {
    console.log("click"+ind)
    survey_popover_index = ind;
    quiz_popover_index = ind;
    deafult_popover_index = ind;
    arc_popover_index = ind;
    this.refresh()
  }

  arcCardMenuPopover = (val, array_index) => {
    return (
      <div className="dskDotsMenu dskDotsCircle mblDotsMenuMedWikiCard" data-toggle="popover" data-trigger="focus">
        <div>
          <span className="dskDotsMenu-dots"></span>
          <span className="dskDotsMenu-dots"></span>
          <span className="dskDotsMenu-dots"></span>
        </div>
        <Popover id={"popover-basic" + array_index} placement="bottom-end" className="dskDotsMenuSettings popoverExtra">
          <Popover.Content>
            <a href="javascript:void(0)" className={(val.myrating == true) ? "dskDotsMenuSettingsIcon active" : "dskDotsMenuSettingsIcon"} onClick={() => this.onLikeBtnPress(val.type_id, 'video_archive', array_index)}>
              <span>
                {(val.myrating == true) ?
                  <img src={likeIconActive} alt="Like" className="translate_both dskGrLeftShareImgActive" /> :
                  <img src={likeIcon} alt="Like" className="translate_both dskGrLeftShareImg" />
                }
              </span>
              Like
            </a>
            <a href="javascript:void(0)" className={val.vault == 0 ? 'dskDotsMenuSettingsIcon ' : 'dskDotsMenuSettingsIcon active'} onClick={() => this.onvaultPress(val.type_id, 'video_archive', array_index)}>
              <span>
                {(val.vault == 0) ?
                  <img src={vaultIcon} alt="Vault" className="translate_both dskGrLeftShareImg" /> :
                  <img src={vaultIconActive} alt="Vault" className="translate_both dskGrLeftShareImgActive" />}
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
            {/* <a href="javascript:void(0)" className="dskDotsMenuNotRelevant" onClick={()=>{this.onNotRelevantClick(val.type_id,'gr',array_index)}}>
                Not Relevant for me
            </a> */}
          </Popover.Content>
        </Popover>
      </div>
    )
  }

  renderArchivedVideoCard(val, ind) {
    return (
      <div className="col-sm-6 mblSessionCard dskArchiveCard dskMasonryCard">
        <div href="javascript:void(0)" className="full_width radius-6 mblSessionCard_link">
          <div className="full_width mblSessionTopArea">
            {(val.image == '' || val.image == null) ?
              <img src={medwikiicon} className="object_fit_cover ssnTopBgGraphic" /> :
              <img src={val.image} className="object_fit_cover ssnTopBgGraphic" />
            }
            <div className="overlay"></div>
            <img src={dskArchiveCardPlay} className="translate_both dskArchiveCardPlay" />
            <div className="full_width mblSessionTopIn">
              <div className="full_width mblSessionTop">
                <div className="row align-items-center justify-content-between">
                  {
                    (val.category_name == '' || val.category_name == null) ? null :
                      <div className="colorWhite font_14px font500 mblSessionType" >
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
                    {(arc_popover_index == ind) ? this.arcCardMenuPopover(val, ind) : null}
                    {(arc_popover_index != ind) ?
                      <div onClick={() => { this.onMenuClick(ind) }} className="dskDotsMenu dskDotsCircle mblDotsMenuMedWikiCard popoverExtra">
                        <span className="dskDotsMenu-dots"></span>
                        <span className="dskDotsMenu-dots"></span>
                        <span className="dskDotsMenu-dots"></span>
                      </div> : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="full_width mblSessionBttmArea">
            {
              (val.question == '' || val.question == null) ? null :
                <h3 className="colorBlack font_16px font400 dskArchiveCardTtl" onClick={() => { this.redirectToArchiveDetail(val.type_id) }}  style={{ "cursor": "pointer" }}>{val.question}</h3>
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
              <Slider {...dskSessionClient} className="dskSessionClient">
                {(val.sponsor_logo !== null || val.sponsor_logo == '') ?
                  val.sponsor_logo.split(',').map((val, ind) => (
                    <div className="dskSessionClientItem">
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

  renderSessionCard(val, ind) {
    return (
      <div className="col-sm-6 mblSessionCard dskMasonryCard">
        <div className="full_width radius-6 mblSessionCard_link">
          <div className="full_width mblSessionTopArea" style={{ "background-color": val.color }}>

            <img src={ssnTopBgGraphic} className="object_fit_cover ssnTopBgGraphic" />
            <div className="overlay"></div>
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
                    <div className="mblSessionTime">

                      {(val.live_mode !== true) ?
                        <h4 className="colorWhite font_14px font600">{val.start_datetime} | {val.display_date}</h4>
                        : null}
                      {(val.live_mode === true) ?
                        <div className="full_width mblSessionLive">
                          <div className="liveAni">
                            <span className="aniBx"></span>
                            <span className="aniBx"></span>
                            <span className="aniBx"></span>
                          </div>
                          <h4 className="colorWhite font_14px font600">Live</h4>
                        </div>
                        : null}
                    </div>
                    {/* {this.sessionCardMenuPopover(val)} */}
                    {(deafult_popover_index == ind) ? this.sessionCardMenuPopover(val, ind) : null}
                    {(deafult_popover_index != ind) ?
                      <div onClick={() => { this.onMenuClick(ind) }} className="dskDotsMenu dskDotsCircle mblDotsMenuSssnCard popoverExtra">
                        <span className="dskDotsMenu-dots"></span>
                        <span className="dskDotsMenu-dots"></span>
                        <span className="dskDotsMenu-dots"></span>
                      </div> : null}
                  </div>
                </div>
              </div>
              <div className="clearfix"></div>
              <h3 className="colorWhite font_16px font400" onClick={() => { this.redirectToSessionReservation(val) }} style={{ "cursor": "pointer" }} >{(val.seesion_title == '' || val.seesion_title == null) ? null : val.seesion_title}</h3>
            </div>
          </div>
          <div className="full_width mblSessionBttmArea">
            <div className="full_width mblSessionDocArea">
              <div className="full_width radius-6 mblSessionDocRow">
                {(val.session_doctor_entities.length > 0) ?
                  val.session_doctor_entities.map((val, ind) => (
                    <div className="row align-items-center">
                      <div className="radius-100 mblSessionDocPic">
                        {(val.session_doctor_image != '' && val.session_doctor_image != null) ?
                          <img src={val.session_doctor_image} alt="Vault" className="object_fit_cover" /> :
                          null
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
              <div className="text-uppercase colorWhite font_14px fontExo font400 radius-6 mblSessionbtm_a" onClick={() => { this.redirectToSessionReservation(val) }} style={{ "background-color": val.color }}>
                <span>Attend <img src={angaleWhite} /></span>
              </div>
              <Slider {...dskSessionClient} className="dskSessionClient">
                {(val.sponsor_logo !== null || val.sponsor_logo == '') ?
                  val.sponsor_logo.split(',').map((val, ind) => (
                    <div className="dskSessionClientItem">
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

  closedSessionCard(val, ind) {
    return (
      <div className="col-sm-6 mblSessionCard dskArchiveCard dskMasonryCard dskNo-ArchiveVideoCard">
        <a href="javascript:void(0)" className="full_width radius-6 mblSessionCard_link"   >
          <div className="full_width mblSessionTopArea">

            <img src={ssnTopBgGraphic} className="object_fit_cover ssnTopBgGraphic" onClick={() => { this.redirectToSessionReservation(val) }} style={{ "cursor": "pointer" }}/>

            <div className="overlay"></div>
            <h4 className="translate_top dskNo-ArchiveVideoCardInfo font700 font_18px">Session Closed</h4>

            <div className="full_width mblSessionTopIn">
              <div className="full_width mblSessionTop">
                <div className="row align-items-center justify-content-between">
                  <div className="colorWhite font_14px font500 mblSessionType">
                    {(val.category_image == '' || val.category_image == null)
                      ? null
                      :
                      <span className="radius-100 mblSessionTypeIcon">
                        <img src={val.category_image} className="translate_both" />
                      </span>
                    }
                    {val.ms_cat_name}
                  </div>
                  <div className="mblSessionTopRight">
                    {/* <div className="dskDotsMenu dskDotsCircle mblDotsMenuSssnCard">
                          <span></span>
                          <span></span>
                          <span></span> 
                        </div>*/}
                    {(deafult_popover_index == ind) ? this.sessionCardMenuPopover(val, ind) : null}
                    {(deafult_popover_index != ind) ?
                      <div onClick={() => { this.onMenuClick(ind) }} className="dskDotsMenu dskDotsCircle dskDotsMenuSssnCard popoverExtra">
                        <span className="dskDotsMenu-dots"></span>
                        <span className="dskDotsMenu-dots"></span>
                        <span className="dskDotsMenu-dots"></span>
                      </div> : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="full_width mblSessionBttmArea" onClick={() => { this.redirectToSessionReservation(val) }}>
            <h3 className="colorBlack font_16px font400 dskArchiveCardTtl" onClick={() => { this.redirectToSessionReservation(val) }}>{(val.seesion_title == '' || val.seesion_title == null) ? null : val.seesion_title}</h3>
            <div className="clearfix"></div>
            <div className="full_width mblSessionDocArea" onClick={() => { this.redirectToSessionReservation(val) }}>
              <div className="full_width radius-6 mblSessionDocRow">
                {(val.session_doctor_entities.length > 0) ?
                  val.session_doctor_entities.map((val, ind) => (
                    <div className="row align-items-center">
                      <div className="radius-100 mblSessionDocPic">
                        {(val.session_doctor_image != '' && val.session_doctor_image != null) ?
                          <img src={val.session_doctor_image} alt="Vault" className="object_fit_cover" /> :
                          null
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

              <Slider {...dskSessionClient} className="dskSessionClient">
                {(val.sponsor_logo !== null || val.sponsor_logo == '') ?
                  val.sponsor_logo.split(',').map((val, ind) => (
                    <div className="dskSessionClientItem">
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

  pointTextValidation(point) {
    if (point <= 1) {
      return ' Point'
    } else {
      return ' Points'
    }
  }

  renderMedwikiCard(val, ind) {
    return (
      <div className="col-sm-6 mblMedWikiCard dskMasonryCard"  >
        <div className="full_width radius-6 mblMedWikiCard_link">
          <div className="row align-items-center">
            <div className="mblMedWikiPic">
              <div className="mblMedWikiPicGraphic" style={{ "background-color": val.color }}></div>
              {
                (val.con_type == 'text' && val.image != '') ?
                  <div className="full_width mblMedWikiPicIn">
                    <img src={val.image} className="object_fit_cover" />
                    <div className="overlay"></div>
                  </div> :
                  (val.con_type == 'video' && val.image != '') ?
                    <div className="full_width mblMedWikiPicIn">
                      <img src={val.image} className="object_fit_cover" onClick={() => { this.redirectToFeedDetail(val.type_id) }} />
                      <div className="overlay"></div>
                      <img src={playIcon} className="translate_both" />
                    </div> :
                    <div className="full_width mblMedWikiPicIn">
                      <img src={medwikiicon} className="object_fit_cover" onClick={() => { this.redirectToFeedDetail(val.type_id) }} />
                      <div className="overlay"></div>
                    </div>
              }
            </div>
            <div className="mblMedWikiContent">
              <div className="full_width mblMedWikiContentTop">
                {(val.specialities == "" || val.specialities == 'null') ? null :
                  <div className="colorBlack font_12px font400 radius-6 mblMedWikiSpeacality">
                    {setSpeciality(val.specialities)}
                    {specialityPopOver(val.specialities)}
                  </div>
                }
                {/* {this.cardMenuPopover(val,ind)} */}
                {(deafult_popover_index == ind) ? this.cardMenuPopover(val, ind) : null}
                {(deafult_popover_index != ind) ?
                  <div onClick={() => { this.onMenuClick(ind) }} className="dskDotsMenu dskPollsCardDots dskDotsMenuMedWikiCard popoverExtra">
                    <span className="dskDotsMenu-dots"></span>
                    <span className="dskDotsMenu-dots"></span>
                    <span className="dskDotsMenu-dots"></span>
                  </div> : null}
              </div>
              <div className="clearfix"></div>
              <h4 className="font400 colorBlack font_14px mblMedWikiContentTtl" onClick={() => { this.redirectToFeedDetail(val.type_id) }}>{(val.question !== null) ? setDescription(val.question) : null}</h4>
              <div className="clearfix"></div>
              <Slider {...dskSessionClient} className="dskSessionClient mblMedWikiClient">
                {(val.sponsor_logo !== null || val.sponsor_logo == '') ?
                  val.sponsor_logo.split(',').map((val, ind) => (
                    <div className="dskSessionClientItem">
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
      <div className="col-sm-6 mblPllsSrvsCard dskMasonryCard">
        <div className="full_width radius-6 mblPllsSrvs_link">
          <div className="full_width mblPllsSrvsPic">
            <div className="overlay"></div>
            {(val.image == '' || val.image == null) ? null :
              <img src={val.image} className="object_fit_cover" />
            }
            <div className="mblPllsSrvsTag">
              <span className="font500 colorWhite font_14px">{
                (val.category == 'survey') ? "Survey" : "Quiz"
              }</span>
            </div>
            {(deafult_popover_index == ind) ? this.surveyCardMenuPopover(val, ind) : null}
            {(deafult_popover_index != ind) ?
              <div onClick={() => { this.onMenuClick(ind) }} className="dskDotsMenu dskDotsCircle mblDotsMenuPllsQzsCard popoverExtra">
                <span className="dskDotsMenu-dots"></span>
                <span className="dskDotsMenu-dots"></span>
                <span className="dskDotsMenu-dots"></span>
              </div> : null}
          </div>
          <div className="full_width mblPllsSrvsContent">
            <div className="full_width radius-6 mblPllsSrvsDrwBox">
              {(val.specialities_name === '' || val.specialities_name === null) ? null :
                <div className="colorBlack font_12px font400 radius-6 mblMedWikiSpeacality">
                  {setSpeciality(val.specialities_name)}
                  {specialityPopOver(val.specialities_name)}
                  {/* <span className="mblMedWikiSpeacalityDots">
                <span></span>
                <span></span>
                <span></span>
              </span> */}
                </div>
              }
              <h5 className="font400 text-center colorBlack font_14px text-uppercase mblPllsSrvsPoints"><span className="font_24px font700">{val.point}</span> Points</h5>
            </div>

            <div className="clearfix"></div>
            <h3 className="font400 colorBlack font_16px mblPllsSrvsContentTtl" onClick={() => { this.redirectToSpqDetail(val.survey_id) }}>{val.survey_title}</h3>
            <div className="clearfix"></div>
            <h5 className="font400 colorGrey font_14px mblPllsSrvsContentText">{setDescription(val.survey_description)}</h5>

            <div className="clearfix"></div>
            <div className="full_width mblPllsSrvsbtm">
              <div className="colorWhite font_14px fontExo font700 radius-6 mblPllsSrvsbtm_a" onClick={() => { this.redirectToSpqDetail(val.survey_id) }}>
                Begin
            <img src={begainArrow} alt="Begain" />
              </div>
              <Slider {...dskSessionClient} className="dskSessionClient">
                {(val.sponsor_logo !== null || val.sponsor_logo == '') ?
                  val.sponsor_logo.split(',').map((val, ind) => (
                    <div className="dskSessionClientItem">
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
      <div className="col-sm-6 dskgrCard dskMasonryCard"  >
        <div className="full_width radius-6 dskgrCard_link">
          <div className="full_width dskgrCardPic">
            <div className="full_width dskgrCardTop">
              {(val.specialities === '' || val.specialities === 'null') ? null :
                <div className="colorBlack font_12px font400 radius-6 bgColorWhite mblMedWikiSpeacality">
                  {setSpeciality(val.specialities)}
                  {specialityPopOver(val.specialities)}
                </div>
              }  
              {/* {this.grCardMenuPopover(val,)} */}
            </div>
            {(val.image == null || val.image == '') ? null :
              <img src={val.image} className="object_fit_cover" alt="Grand Rounds" onClick={() => { this.redirectToGrDetail(val.type_id) }} />
            }
            <div className="overlay"></div>
          </div>
          <div className="full_width dskgrCardBtm">
            <div className="full_width dskgrCardBtmIn">
              {(val.title == null || val.title == '') ? null :
                <h3 className="font500 colorBlack font_16px dskgrCardTtl" onClick={() => { this.redirectToGrDetail(val.type_id) }}>{val.title}</h3>
              }
              <div className="clearfix"></div>
              <div className="full_width colorGrey font_14px dskgrCardDescription" onClick={() => { this.redirectToGrDetail(val.type_id) }}>
                {(val.description == null || val.description == '') ? null :
                  <p>{setDescription(val.description)}</p>
                }
              </div>
              <div className="full_width dskGrMstrDoc">
                {/* <h4 className="font500 fontExo font_16px colorBlack">MasterDoctor</h4> */}
                <div className="clearfix"></div>
                <div className="row dskGrMstrDocRow">
                  {(val.session_doctor_entities.length > 0) ?
                    val.session_doctor_entities.map((val, ind) => (
                      <div className="dskGrMstrDocBox">
                        <div className="full_width dskGrMstrDocBoxIn">
                          <div className="row align-items-center">
                            <div className="radius-100 dskGrMstrDocBoxInPic">
                              {
                                (val.session_doctor_image == null || val.session_doctor_image == '') ? null :
                                  <img src={val.session_doctor_image} className="object_fit_cover" />
                              }
                            </div>
                            <div className="font_12px colorGrey font400 dskGrMstrDocBoxContent">
                              <h4 className="font_14px colorBlack font600">{val.session_doctor_name}</h4>
                              <p>{val.DepartmentName}</p>
                            </div>
                          </div>
                          <div className="radius-6 dskGrMstrDocProfile">
                            {
                              (val.session_doctor_image == null || val.session_doctor_image == '') ? null :
                                <img src={val.session_doctor_image} className="object_fit_cover" />
                            }
                            <div className="overlay"></div>
                            <div className="full_width font_12px colorWhite font400 dskGrMstrDocProfileTxt">
                              <h4 className="font_14px colorWhite font600">{val.session_doctor_name}</h4>
                              <p>{val.DepartmentName}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )) : null}
                </div>
              </div>
              <div className="full_width dskgrCardFooter">
                <div className="text-uppercase colorWhite font_14px fontExo font400 radius-6 mblSessionbtm_a" onClick={() => { this.redirectToGrDetail(val.type_id) }}>
                  <span>View Details <img src={angaleWhite} /></span>
                </div>
                <Slider {...dskSessionClient} className="dskSessionClient dskGrClient">
                  {(val.sponsor_logo !== null || val.sponsor_logo == '') ?
                    val.sponsor_logo.split(',').map((val, ind) => (
                      <div className="dskSessionClientItem">
                        <img src={val} />
                      </div>
                    )) : null
                  }
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderPoll(dataJson, survey_id, point, val) {
    let mData = JSON.parse(unescape(dataJson));
    //console.log('in ready polls'+mData)
    let sData = mData.surveys;
    let arr_new = Object.keys(sData).map(function (k) {
      return sData[k];
    });
    let question = arr_new[0].question;
    let type = arr_new[0].type;
    let currentOptions = arr_new[0].options;
    let correctoption = arr_new[0].correctoption;

    return (

      <div className="col-sm-6 mblPllsSrvsCard dskPollsCard dskMasonryCard">
        <div href="javascript:void(0)" className="full_width radius-6 mblPllsSrvs_link">
          <div className="full_width dskPollsTop">

            <div className="mblPllsSrvsTag">
              <span className="font500 colorWhite font_14px">Poll</span>
            </div>
            <div className="dskPollsTopRight">
              {
                (val.point == '' || val.point == null) ? null :
                  <h5 className="font400 text-center colorBlack font_14px text-uppercase mblPllsSrvsPoints"><span className="font_24px font700">{val.point}</span> Points</h5>
              }
              {/* {this.pollCardMenuPopover(val)} */}
            </div>

          </div>
          <div className="full_width mblPllsSrvsContent">
            <h3 className="font500 colorBlack font_16px mblPllsSrvsContentTtl">{question} </h3>
            <div className="clearfix"></div>
            <div className="full_width srvPollsOptionSet55">
              {currentOptions.map((options, i) =>
                <>
                  <Form.Check id={"option1" + survey_id + i} className={"srvPollsRadio " + "srvPollsRadio" + survey_id} type="radio" ref={'ref_' + i} name={"option1" + survey_id} onChange={this.onPollSubmit.bind(this, arr_new, options, survey_id, point, i)} value={options.value} label={options.label} checked={this.state.checkedRadio == survey_id + i} />
                  <div id={"srvPollResult" + survey_id}>
                    {
                      // (resultOption != null|| resultOption != undefined)?this.renderPollResult(resultOption):null
                    }
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  onPollSubmit(arr_new, options, survey_id, point, i)  // for single type questions
  {
    //console.log('On poll submit'+'survey_points\n'+point)
    arr_new[0].selectedIndex = i;
    this.submitPollAnswer(survey_id, arr_new, point, i)
    this.setState({ checkedRadio: survey_id + i });
  }

  submitPollAnswer(id, answerjson, point, boxIndex) {
    // //console.log('dataJson'+'survey_id'+id);
    if (id == null || id == '' || id == undefined || answerjson == null || answerjson == '' || answerjson == undefined) {
      //console.log('id or answer can not be empty')
    } else {
      let answerData = {
        'survey_id': id,
        'answer_json': JSON.stringify(answerjson)
      }
      fetch(url + 'survey/pollAnswer', {
        method: 'POST',
        headers: {
          'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
          'version': api_version
        },
        body: JSON.stringify(answerData),
      }).then((response) => response.json()).then((responseJson) => {
        // alert('Congrats! You got '+JSON.stringify(responseJson)+' Points')  
        let status_code = responseJson.status_code;
        if (status_code == 200) {
          let responseData = responseJson.data;
          this.addPoints(id, point)
          let name = 'option1' + id
          let boxId = 'option1' + id + boxIndex

          $('input[id=' + boxId + ']').attr("checked", true);
          $('input[id=' + boxId + ']').addClass("surveyPollsRadioCheckdF");
          $('input[name=' + name + ']').attr("disabled", true);
          this.getPollAnswer(id, boxIndex);
        }
      }).catch((error) => {
        //console.log("Error"+error);
      });
    }
  }

  addPoints(id, survey_points) {
    if (id == '' || id == undefined) {
      //   //console.log('addPoints'+id+'::'+survey_points)
    } else {
      let pointsData = {
        'survey_id': id,
        'point': survey_points
      }
      fetch(url + 'survey/addpoint', {
        method: 'POST',
        body: JSON.stringify(pointsData),
        headers: {
          'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
          'version': api_version
        }
      }).then((response) => response.json()).then((responseJson) => {
        let responseData = responseJson.data;
        let success = responseJson.status_code;
        if (success == 200) {
          ToastsStore.success('Congratulation! You Win ' + survey_points + ' Points')
        }
        else {
          ToastsStore.error("Failed to update point");
        }
      }).catch((error) => {
        //console.log("Error"+error);
      });
    }
  }

  getPollAnswer(id, boxIndex) {
    if (id == '' || id == undefined) {

    } else {
      fetch(url + 'survey/pollResult?id=' + id, {
        method: 'GET',
        headers: {
          'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
          'version': api_version
        }
      }).then((response) => response.json()).then((responseJson) => {
        let responseData = responseJson.data;
        let success = responseJson.status_code;
        let parentDivId = '#srvPollResult' + id;
        let boxId = '.srvPollsRadio' + id;
        if (success == 200) {
          let _this = this;
          let eleArr = [];
          let mData = JSON.parse(unescape(responseData));
          mData.map(function (i) {
            $(boxId).hide(500, function () { $(this).remove(); });
            let currentOption = i.options
            let selectedIndexPoll = i.selectedIndex;
            let resultOpt = _this.renderPollResult(currentOption, selectedIndexPoll) //ReactHtmlParser("<div class='colorBlue'>hi</div>");
            $(parentDivId).show(500, function () { $(this).html(resultOpt); });

          });
          this.refresh();
        }
        else {
          // alert("Failed to update point");
        }
      }).catch((error) => {
        //console.log("Error"+error);
      });
    }
  }

  renderPollResult = (currentOptions, selectedIndexPoll) => {
    let opt = '';
    currentOptions.map((options, i) => {
      if (i == selectedIndexPoll) {
        opt += '<div class="srvPollsProgressBar"><div class="srvPollsProgressBarIn font_12px colorBlue font600 ">' + options.label
        opt += '<span class="srvPollsProgressBarValue">' + options.vote + '%</span></div><div class="myprogress"><div class="myprogress_bar" style="width:' + options.vote + '%"></div></div></div>'
      } else {
        opt += '<div class="srvPollsProgressBar"><div class="srvPollsProgressBarIn font_12px colorBlack font600 ">' + options.label
        opt += '<span class="srvPollsProgressBarValue">' + options.vote + '%</span></div><div class="myprogress"><div class="myprogress_bar" style="width:' + options.vote + '%"></div></div></div>'
      }
    })
    return opt;
  }

  render() {
    return (
      <section className="full_width text-left dskRecent" id="recent-section">
        {(recent_list_data != null && recent_list_data.length > 0) ?
          <h3 className="font_24px fontExo colorBlack font500 text-uppercase dskRecentTTl">Recent</h3> : null}
        <div className="clearfix"></div>
        <div className="full_width dskRecentIn">
          <Masonry
            className={'dskMasonryCardArea'} // default ''
            elementType={'ul'} // default 'div'
            options={masonryOptions} // default {}
            disableImagesLoaded={false} // default false
            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
          //imagesLoadedOptions={imagesLoadedOptions} // default {}
          >
            {(recent_list_data != null && recent_list_data.length > 0) ?
              recent_list_data.map((val, ind) => (
                this.renderRecentList(val, ind)
              ))
              : null
            }
          </Masonry>
          <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={40} width={40} visible={this.state.loader_status} />
        </div>
      </section>
    );
  }
}
export default RecentDesktop;