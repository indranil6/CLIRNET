import React from "react";
import $ from "jquery";
import { reactLocalStorage } from "reactjs-localstorage";
import { setSpeciality, setDescription } from "../Common/Common.js";
import Slider from "react-slick";
import AppConfig from "../config/config.js";
import { Helmet } from "react-helmet";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { InlineShareButtons } from "sharethis-reactjs";
import angaleWhite from "../../desktopImages/angaleWhite.png";

import ssnTopBgGraphic from "../../desktopImages/ssnTopBgGraphic.png";
import ssnTypeExpressCME from "../../desktopImages/typeExpressCME.png";
import ssnTypeMasterCast from "../../desktopImages/typeMasterCast.png";
import likeIcon from "../../desktopImages/like-black.png";
import likeIconActive from "../../desktopImages/like-active.png";
import vaultIcon from "../../desktopImages/vault-black.png";
import vaultIconActive from "../../desktopImages/vault-active.png";
import medwikiicon from "../../images/medwiki.jpg";
import videoIcon from "../../images/playBTn.png";
import ReactPlayer from "react-player";
import ShareIcon from "../../desktopImages/share-black.png";
import Share from "../Common/Share.jsx";

import "react-toastify/dist/ReactToastify.css";
import { ToastsContainer, ToastsStore } from "react-toasts";

const url = AppConfig.apiLoc;
const zoom_root_url = AppConfig.zoom_root_url;
const meetConfig = {
  meetingNumber: "",
  platform_name: "",
  userName: "",
  userEmail: "",
  passWord: "",
};
var image_url = [];
var value = "";

class Sessioncard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  first_spec(spec) {
    var res = spec.split(",");

    return res[0];
  }

  redirect_to_compendium_detail(id) {
    reactLocalStorage.set("@ClirnetStore:source", "Medwiki Page");
    this.props.history.push({
      pathname: "/Feeddetail/" + id + "",
    });
  }

  popover_view_spec(val) {
    let popover = (
      <Popover id="popover-basic" className="specialty_popOver">
        <Popover.Content className="font_12px">{val}</Popover.Content>
      </Popover>
    );
    return (
      <>
        <OverlayTrigger
          placement="right"
          rootClose="true"
          rootCloseEvent="click"
          trigger="click"
          delay={{ show: 50, hide: 50 }}
          overlay={popover}
        >
          <span className="mblMedWikiSpeacalityDots">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </OverlayTrigger>
      </>
    );
  }

  share_url(val) {
    let shareData = {
      title: val.session_topic,
      text: val.session_description,
      url: val.deeplink,
    };

    navigator.share(shareData);
  }

  popover_view_session_desktop(val, index) {
    return (
      <>
        <div className="dskDotsMenu dskDotsCircle mblDotsMenuSssnCard">
          <div>
            <span className="dskDotsMenu-dots"></span>
            <span className="dskDotsMenu-dots"></span>
            <span className="dskDotsMenu-dots"></span>
          </div>
          <Popover
            placement="bottom-end"
            id={"popover-basic" + index}
            className="dskDotsMenuSettings manar"
          >
            <Popover.Content>
              {/* <a href="javascript:void(0)" onClick={() => this.onLikeBtnPresssession(val.session_id, 'session', index)} className={ val.myrating == true ? 'dskDotsMenuSettingsIcon active' : 'dskDotsMenuSettingsIcon' } >
            <span>
            <img src={likeIcon} alt="Like"    className="translate_both dskGrLeftShareImg" />
            <img src={likeIconActive} alt="Like"   className="translate_both dskGrLeftShareImgActive" />
            </span>
            Like
          </a>
  
          
  
          <a href="javascript:void(0)" className={ val.vault == 0 ? 'dskDotsMenuSettingsIcon ' : 'dskDotsMenuSettingsIcon active' } >
            <span>
          <img src={vaultIcon} alt="Vault" onClick={() => this.onvaultPress(val.session_id, 'gr', index, 1)} className="translate_both dskGrLeftShareImg" />
          <img src={vaultIconActive} alt="Vault"onClick={() => this.onvaultPress(val.session_id, 'gr', index, 0)}  className="translate_both dskGrLeftShareImgActive" />
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
                  description: val.session_topic.substring(0, 100) + "...",       // (defaults to og:description or twitter:description)
                  title: val.session_topic,            // (defaults to og:title or twitter:title)
                  message: '',     // (only for email sharing)
                  subject: '',  // (only for email sharing)
                  username: 'Medwiki view' // (only for twitter sharing)
                }}
              /> */}
              {/* 
              <br></br>
              <a href="javascript:void(0)" className="dskCphTtlShare" onClick={() => this.share_url(val)}><img src={ShareIcon} /> Share</a><br></br>
<br></br> */}
              <Share
                data={{
                  title: val.session_topic,
                  text: val.session_description,
                  url: val.deeplink,
                }}
              />
            </Popover.Content>
          </Popover>
        </div>
      </>
    );
  }

  redirect_session(val, nameclass = "") {
    if (val.status_name == "Close") {
      if (
        val.video_archive_id != null &&
        val.video_archive_id != "null" &&
        val.video_archive_id != undefined &&
        val.video_archive_id != ""
      ) {
        if (nameclass == "cph_pages_dev") {
          reactLocalStorage.set(
            "@ClirnetStore:jugar_url",
            "/FeeddArchivedVideoetail/" + val.video_archive_id + ""
          );
        }
        this.props.history.push({
          pathname: "/ArchivedVideo/" + val.video_archive_id,
        });
      } else {
        if (nameclass == "cph_pages_dev") {
          reactLocalStorage.set(
            "@ClirnetStore:jugar_url",
            "/Reservesession/" + val.session_id + ""
          );
        }
        this.props.history.push({
          pathname: "/Reservesession/" + val.session_id + "",
        });
      }
    }

    if (val.status_name == "Running") {
      if (nameclass == "cph_pages_dev") {
        reactLocalStorage.set(
          "@ClirnetStore:jugar_url",
          "/LiveSessionDetails/" + val.session_id + ""
        );
      }
      this.props.history.push({
        pathname: "/LiveSessionDetails/" + val.session_id + "",
      });
    }

    if (val.status_name != "Running" && val.status_name != "Close") {
      if (nameclass == "cph_pages_dev") {
        reactLocalStorage.set(
          "@ClirnetStore:jugar_url",
          "/Reservesession/" + val.session_id + ""
        );
      }
      this.props.history.push({
        pathname: "/Reservesession/" + val.session_id + "",
      });
    }
  }

  onvaultPressMedwiki = (item_id, type, array_index, flag) => {
    var thisobjval = this;
    let formdatam = { postid: item_id, type: type };
    fetch(url + "knwlg/vault_switching", {
      method: "POST",
      headers: {
        Authorization: reactLocalStorage.get(
          "@ClirnetStore:refreshToken",
          true
        ),
        version: "rjsw 1.1.1",
      },
      body: JSON.stringify(formdatam),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //medwiki_data[array_index].vault = responseJson.data;

        if (responseJson.data == 1) {
          reactLocalStorage.set(
            "@ClirnetStore:vault_count",
            parseInt(reactLocalStorage.get("@ClirnetStore:vault_count", 0)) + 1
          );
          this.props.onChangeButton(array_index, responseJson.data, "vault");
        }

        if (responseJson.data == 0) {
          reactLocalStorage.set(
            "@ClirnetStore:vault_count",
            parseInt(reactLocalStorage.get("@ClirnetStore:vault_count", 0)) - 1
          );
          this.props.onChangeButton(array_index, responseJson.data, "vault");
        }
      })
      .catch((error) => {});
  };

  onLikeBtnPressmedwiki = (item_id, type, array_index) => {
    let formdatam = { type_id: item_id, type: type };
    fetch(url + "knwlg/save_like", {
      method: "POST",
      headers: {
        Authorization: reactLocalStorage.get(
          "@ClirnetStore:refreshToken",
          true
        ),
        version: "rjsw 1.1.1",
      },
      body: JSON.stringify(formdatam),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.data.rating == 0) {
          this.props.onChangeButton(
            array_index,
            responseJson.data.rating,
            "like"
          );
        } else {
          this.props.onChangeButton(
            array_index,
            responseJson.data.rating,
            "like"
          );
        }
      })
      .catch((error) => {});
  };

  popover_view_spec_mobile(val) {
    let popover = (
      <Popover id="popover-basic">
        <Popover.Content className="font_12px specialty_popOver">
          {val}
        </Popover.Content>
      </Popover>
    );
    return (
      <>
        <OverlayTrigger
          placement="right"
          rootClose="true"
          rootCloseEvent="click"
          trigger="click"
          delay={{ show: 50, hide: 50 }}
          overlay={popover}
        >
          <span className="mblMedWikiSpeacalityDots">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </OverlayTrigger>
      </>
    );
  }

  redirectToSessionReservation(val) {
    if (val.status_name == "Close") {
      if (
        val.video_archive_id 
      ) {
        this.props.history.push({
          pathname: "/ArchivedVideo/" + val.video_archive_id,
        });
      } else {
        this.props.history.push({
          pathname: "/Reservesession/" + val.session_id + "",
        });
      }
    }
    if (val.status_name == "Running") {
      this.props.history.push({
        pathname: "/LiveSessionDetails/" + val.session_id + "",
      });
    }

    if (val.status_name != "Running" && val.status_name != "Close") {
      this.props.history.push({
        pathname: "/Reservesession/" + val.session_id + "",
      });
    }
  }

  popover_view_session_mobile(val, index) {
    return (
      <>
        <div className="mblDotsMenu mblDotsCircle mblDotsMenuSssnCard">
          <div>
            <span className="mblDotsMenu-dots"></span>
            <span className="mblDotsMenu-dots"></span>
            <span className="mblDotsMenu-dots"></span>
          </div>

          <Popover
            placement="bottom-end"
            id={"popover-basic" + index}
            className="mblDotsMenuSettings manar"
          >
            <Popover.Content>
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
                  description: val.session_topic.substring(0, 100) + "...",       // (defaults to og:description or twitter:description)
                  title: val.session_topic,            // (defaults to og:title or twitter:title)
                  message: '',     // (only for email sharing)
                  subject: '',  // (only for email sharing)
                  username: 'Medwiki view' // (only for twitter sharing)
                }}
              /> */}
              {/* 
<br></br>
              <a href="javascript:void(0)" className="dskCphTtlShare" onClick={() => this.share_url(val)}><img src={ShareIcon} /> Share</a><br></br>
<br></br> */}

              <Share
                data={{
                  title: val.session_topic,
                  text: val.session_description,
                  url: val.deeplink, 
                }}
              />
            </Popover.Content>
          </Popover>
        </div>
      </>
    );
  }

  popover_view_key(index) {
    this.props.onChangeButton(index, 0, "popover_session");
  }

  cancel_session(session_id) {
    if(!window.location.href.includes("/Sessions")){
      this.props.history.push({
        pathname: "/Reservesession/" +session_id,
      });
    }else{
      this.props.onChangeButton(0, session_id, "cancel_session");
    }
  }

  onJoinBtnClick(id) {
    this.getUserDetail(id);
  }

  getUserDetail(id) {
    let first_name = reactLocalStorage.get("@ClirnetStore:first_name", true);
    let last_name = reactLocalStorage.get("@ClirnetStore:last_name", true);
    let email = reactLocalStorage.get("@ClirnetStore:email", true);
    if (first_name == "true" || first_name == "undefined") {
      first_name = "";
    }
    if (last_name == "true" || last_name == "undefined") {
      last_name = "";
    }
    let full_name = "Dr. " + first_name + " " + last_name;
    if (email == "true" || email == "undefined") {
      email = first_name + "@Clirnet.com";
    } else {
      meetConfig.userEmail = email;
    }
    meetConfig.userName = full_name;
    this.getMeetingDetails(id);
  }

  getMeetingDetails(session_id) {
    ToastsStore.error("Please wait");
    fetch(
      url + "knwlgmastersession/getMeetingDetailsBySessionID?id=" + session_id,
      {
        method: "GET",
        headers: {
          Authorization: reactLocalStorage.get(
            "@ClirnetStore:refreshToken",
            true
          ),
          version: "rjsw 1.1.1",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        let status_code = responseJson.status_code;
        let responseData = responseJson.data;
        let session_status;
        if (status_code == 200) {
          meetConfig.platform_name = responseData.platform_name;
          meetConfig.meetingNumber = responseData.meeting_login_id;
          meetConfig.passWord = responseData.meeting_login_password;
          session_status = responseData.session_status;
          if (
            meetConfig.meetingNumber &&
            meetConfig.userEmail &&
            meetConfig.userName
          ) {
            let zoom_url =
              zoom_root_url +
              meetConfig.meetingNumber +
              "/" +
              meetConfig.userEmail +
              "/" +
              meetConfig.userName +
              "/" +
              meetConfig.passWord; //http://localhost:3001/join_webinar/#/Zoom/4858799231/sumit@mail.com/Sumit
            this.JoinMeeting(zoom_url);
          } else {
            ToastsStore.error("Sorry! unable to create meeting link");
          }
        } else {
          ToastsStore.error("unable to fetch meeting details! check network");
        }
        if (session_status == "2" && session_status != "undefined") {
        } else {
          ToastsStore.error("This session is not live now");
        }
      })
      .catch((error) => {
        console.log("Error" + error);
      });
  }

  JoinMeeting(url) {
    var win = window.open(url, "_blank");
    if (win) {
      //Browser has allowed it to be opened
      win.focus();
    } else {
      //Browser has blocked it
      alert("Please allow popups for this website");
    }
  }

  render() {
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
      cssEase: "linear",
    };

    return (
      <>
        {this.props.mobile_device == true ? (
          <>
            {this.props.card_data.status_name == "Close" ? (
              <div
                className={
                  "col-sm-6 mblSessionCard mblArchiveCard mblMasonryCard mblNo-ArchiveVideoCard " +
                  this.props.custom_class
                }
                id={"res_" + this.props.card_data.session_id}
              >
                <div className="full_width radius-6 mblSessionCard_link">
                  <div className="full_width mblSessionTopArea">
                    <img
                      src={ssnTopBgGraphic}
                      className="object_fit_cover ssnTopBgGraphic"
                      onClick={() => {
                        this.redirectToSessionReservation(this.props.card_data);
                      }}
                    />
                    <div
                      className="overlay"
                      style={{ cursor: "pointer" }}
                    ></div>
                    <h4 className="translate_top mblNo-ArchiveVideoCardInfo font700 font_18px">
                      Session Closed
                    </h4>

                    <div className="full_width mblSessionTopIn">
                      <div className="full_width mblSessionTop">
                        <div className="row align-items-center justify-content-between">
                          <div className="colorWhite font_14px font500 mblSessionType">
                            {this.props.card_data.category_image == null ||
                            this.props.card_data.category_image == "" ? null : (
                              <span className="radius-100 mblSessionTypeIcon">
                                <img
                                  src={this.props.card_data.category_image}
                                  className="translate_both"
                                />
                              </span>
                            )}
                            {this.props.card_data.ms_cat_name}
                          </div>
                          <div className="mblSessionTopRight">
                            {this.props.clicked_index == this.props.elem_key
                              ? this.popover_view_session_mobile(
                                  this.props.card_data,
                                  this.props.elem_key
                                )
                              : null}
                            {this.props.clicked_index != this.props.elem_key ? (
                              <div
                                onClick={() => {
                                  this.popover_view_key(this.props.elem_key);
                                }}
                                className={
                                  "mblDotsMenu mblDotsMenuSssnCard manar " +
                                  this.props.elem_key +
                                  "_dynamicclass"
                                }
                              >
                                <span></span>
                                <span></span>
                                <span></span>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="full_width mblSessionBttmArea"
                    onClick={() => {
                      this.redirectToSessionReservation(this.props.card_data);
                    }}
                  >
                    <h3
                      className="colorBlack font_16px font400 mblArchiveCardTtl"
                      onClick={() => {
                        this.redirectToSessionReservation(this.props.card_data);
                      }}
                    >
                      {this.props.card_data.session_topic == "" ||
                      this.props.card_data.session_topic == null
                        ? null
                        : this.props.card_data.session_topic}
                    </h3>
                    <div className="clearfix"></div>
                    <div className="full_width mblSessionDocArea">
                      <div className="full_width radius-6 mblSessionDocRow">
                        {this.props.card_data.session_doctor_entities.length > 0
                          ? this.props.card_data.session_doctor_entities.map(
                              (val, ind) => (
                                <div className="row align-items-center">
                                  <div className="radius-100 mblSessionDocPic">
                                    {val.session_doctor_image == "" ||
                                    val.session_doctor_image == null ? null : (
                                      <img
                                        src={val.session_doctor_image}
                                        alt="Vault"
                                        className="object_fit_cover"
                                      />
                                    )}
                                  </div>
                                  <div className="full_width mblSessionDocTtl">
                                    <h4 className="colorBlack font_16px font500">
                                      {val.session_doctor_name}
                                    </h4>
                                    <span className="font_12px colorGrey">
                                      {val.DepartmentName}
                                    </span>
                                  </div>
                                </div>
                              )
                            )
                          : null}
                      </div>
                    </div>

                    <div className="full_width mblSessionbtm">
                      <Slider
                        {...mblSessionClient}
                        className="mblSessionClient"
                      >
                        {this.props.card_data.sponsor_logo !== null ||
                        this.props.card_data.sponsor_logo == ""
                          ? this.props.card_data.sponsor_logo
                              .split(",")
                              .map((val, ind) => (
                                <div className="mblSessionClientItem">
                                  <img src={val} />
                                </div>
                              ))
                          : null}
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                id={"res_" + this.props.card_data.session_id}
                className={
                  "mblSessionCard resggg mblRecentCard " +
                  this.props.custom_class
                }
              >
                <div className="full_width radius-6 mblSessionCard_link">
                  <div
                    className="full_width mblSessionTopArea"
                    style={{ "background-color": this.props.card_data.color }}
                  >
                    <img
                      src={ssnTopBgGraphic}
                      className="object_fit_cover ssnTopBgGraphic"
                    />
                    <div className="overlay"></div>
                    <div className="full_width mblSessionTopIn">
                      <div className="full_width mblSessionTop">
                        <div className="row align-items-center justify-content-between">
                          <div className="colorWhite font_14px font700 mblSessionType">
                            <span className="radius-100 mblSessionTypeIcon">
                              <img
                                src={this.props.card_data.category_image}
                                className="translate_both"
                              />
                            </span>
                            {this.props.card_data.ms_cat_name}
                          </div>
                          <div className="mblSessionTopRight">
                            <div className="mblSessionTime">
                              {this.props.card_data.status_name == "Close" ? (
                                <h4 className="colorWhite font_14px font700">
                                  Session Closed
                                </h4>
                              ) : null}
                              {this.props.card_data.session_status !== 2 &&
                              this.props.card_data.session_status != 4 ? (
                                <h4 className="colorWhite font_14px font700">
                                  {this.props.card_data.start_datetime}{" "}
                                  {this.props.card_data.display_date}
                                </h4>
                              ) : (
                                <h4 className="colorWhite font_14px font700">
                                  Upcoming TBA
                                </h4>
                              )}
                              {this.props.card_data.session_status == 2 ? (
                                <div className="full_width mblSessionLive">
                                  <div className="liveAni">
                                    <span className="aniBx"></span>
                                    <span className="aniBx"></span>
                                    <span className="aniBx"></span>
                                  </div>
                                  <h4 className="colorWhite font_14px font700">
                                    Live
                                  </h4>
                                </div>
                              ) : null}
                            </div>

                            {this.props.clicked_index == this.props.elem_key
                              ? this.popover_view_session_mobile(
                                  this.props.card_data,
                                  this.props.elem_key
                                )
                              : null}
                            {this.props.clicked_index != this.props.elem_key ? (
                              <div
                                onClick={() => {
                                  this.popover_view_key(this.props.elem_key);
                                }}
                                className={
                                  "mblDotsMenu mblDotsCircle mblDotsMenuSssnCard manar " +
                                  this.props.elem_key +
                                  "_dynamicclass"
                                }
                              >
                                <span className="mblDotsMenu-dots"></span>
                                <span className="mblDotsMenu-dots"></span>
                                <span className="mblDotsMenu-dots"></span>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="clearfix"></div>
                      <h3 className="colorWhite font_18px font600">
                        {this.props.card_data.session_topic == "" ||
                        this.props.card_data.session_topic == null
                          ? null
                          : setDescription(this.props.card_data.session_topic)}
                      </h3>
                    </div>
                  </div>
                  <div className="full_width mblSessionBttmArea">
                    <div className="full_width mblSessionDocArea">
                      {/* mblSessionDocRow */}
                      {this.props.card_data.session_doctor_entities.length > 0
                        ? this.props.card_data.session_doctor_entities.map(
                            (val, ind) => (
                              <div className="full_width radius-6 mblSessionDocRow">
                                <div className="row align-items-center">
                                  <div className="radius-100 mblSessionDocPic">
                                    <img
                                      src={val.session_doctor_image}
                                      alt="Vault"
                                      className="object_fit_cover"
                                    />
                                  </div>
                                  <div className="full_width mblSessionDocTtl">
                                    <h4 className="colorBlack font_18px font600">
                                      {val.session_doctor_name}
                                    </h4>
                                    <span className="font_12px colorGrey">
                                      {val.DepartmentName}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )
                          )
                        : null}
                    </div>

                    <div className="full_width mblSessionbtm">
                      <div
                        className="text-uppercase colorWhite font_14px fontExo font600 radius-6 mblSessionbtm_a"
                        style={{
                          "background-color": this.props.card_data.color,
                        }}
                      >
                        {this.props.card_data.participant_id != undefined &&
                        this.props.card_data.participant_id != null &&
                        this.props.card_data.participant_id != "" ? (
                          <span
                            onClick={() =>
                              this.redirect_session(
                                this.props.card_data,
                                this.props.custom_class
                              )
                            }
                          >
                            View Case/Query
                          </span>
                        ) : (
                          <span
                            onClick={() =>
                              this.redirect_session(
                                this.props.card_data,
                                this.props.custom_class
                              )
                            }
                          >
                            Attend
                          </span>
                        )}
                      </div>

                      <Slider
                        {...mblSessionClient}
                        className="mblSessionClient"
                      >
                        {this.props.card_data.sponsor_logo !== null ||
                        this.props.card_data.sponsor_logo == ""
                          ? this.props.card_data.sponsor_logo
                              .split(",")
                              .map((val, ind) => (
                                <div className="mblSessionClientItem">
                                  <img src={val} />
                                </div>
                              ))
                          : null}
                      </Slider>
                    </div> 
                    {this.props.card_data.participant_id ? (
                      <div className="full_width text-center mblIcantAttnd">
                        <button
                          onClick={() => {
                            this.cancel_session(
                              this.props.card_data.session_id
                            );
                          }}
                          className="colorRed font500 mblIcantAttndBtn"
                        >
                          I can't Attend
                        </button>{" "}
                      </div>
                    ) : null}

                    {this.props.card_data.participant_id &&
                    this.props.card_data.session_status == 2 ? (
                      <div className="full_width text-center mblIcantAttnd">
                        <button
                          onClick={() => {
                            this.onJoinBtnClick(
                              this.props.card_data.session_id
                            );
                          }}
                          className="colorRed font500 mblIcantAttndBtn"
                        >
                          Join Now
                        </button>{" "}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {this.props.card_data.status_name == "Close" ? (
              <div
                className={
                  "col-sm-6 mblSessionCard dskArchiveCard dskMasonryCard dskNo-ArchiveVideoCard " +
                  this.props.custom_class
                }
              >
                <div className="full_width radius-6 mblSessionCard_link">
                  <div className="full_width mblSessionTopArea">
                    <img
                      src={ssnTopBgGraphic}
                      className="object_fit_cover ssnTopBgGraphic"
                      onClick={() => {
                        this.redirectToSessionReservation(this.props.card_data);
                      }}
                    />

                    <div className="overlay"></div>
                    <h4 className="translate_top dskNo-ArchiveVideoCardInfo font700 font_18px">
                      Session Closed
                    </h4>

                    <div className="full_width mblSessionTopIn">
                      <div className="full_width mblSessionTop">
                        <div className="row align-items-center justify-content-between">
                          <div className="colorWhite font_14px font500 mblSessionType">
                            {this.props.card_data.category_image == "" ||
                            this.props.card_data.category_image ==
                              null ? null : (
                              <span className="radius-100 mblSessionTypeIcon">
                                <img
                                  src={this.props.card_data.category_image}
                                  className="translate_both"
                                />
                              </span>
                            )}

                            {this.props.card_data.ms_cat_name}
                          </div>
                          <div className="mblSessionTopRight">
                            {/* <div className="dskDotsMenu dskDotsCircle mblDotsMenuSssnCard">
    <span></span>
    <span></span>
    <span></span> 
  </div>*/}
                            {this.props.clicked_index == this.props.elem_key
                              ? this.popover_view_session_desktop(
                                  this.props.card_data,
                                  this.props.elem_key
                                )
                              : null}
                            {this.props.clicked_index != this.props.elem_key ? (
                              <div
                                onClick={() => {
                                  this.popover_view_key(this.props.elem_key);
                                }}
                                data-toggle="popover"
                                data-trigger="focus"
                                className={
                                  "dskDotsMenu dskDotsCircle mblDotsMenuSssnCard  manar  " +
                                  this.props.elem_key +
                                  "_dynamicclass"
                                }
                              >
                                <span className="dskDotsMenu-dots"></span>
                                <span className="dskDotsMenu-dots"></span>
                                <span className="dskDotsMenu-dots"></span>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="full_width mblSessionBttmArea"
                    onClick={() => {
                      this.redirectToSessionReservation(this.props.card_data);
                    }}
                  >
                    <h3
                      className="colorBlack font_16px font400 dskArchiveCardTtl"
                      onClick={() => {
                        this.redirectToSessionReservation(this.props.card_data);
                      }}
                    >
                      {this.props.card_data.session_topic == "" ||
                      this.props.card_data.session_topic == null
                        ? null
                        : this.props.card_data.session_topic}
                    </h3>
                    <div className="clearfix"></div>
                    <div
                      className="full_width mblSessionDocArea"
                      onClick={() => {
                        this.redirectToSessionReservation(this.props.card_data);
                      }}
                    >
                      <div className="full_width radius-6 mblSessionDocRow">
                        {this.props.card_data.session_doctor_entities.length > 0
                          ? this.props.card_data.session_doctor_entities.map(
                              (val, ind) => (
                                <div className="row align-items-center">
                                  <div className="radius-100 mblSessionDocPic">
                                    {val.session_doctor_image != "" &&
                                    val.session_doctor_image != null ? (
                                      <img
                                        src={val.session_doctor_image}
                                        alt="Vault"
                                        className="object_fit_cover"
                                      />
                                    ) : null}
                                  </div>
                                  <div className="full_width mblSessionDocTtl">
                                    <h4 className="colorBlack font_16px font500">
                                      {val.session_doctor_name}
                                    </h4>
                                    <span className="font_12px colorGrey">
                                      {val.DepartmentName}
                                    </span>
                                  </div>
                                </div>
                              )
                            )
                          : null}
                      </div>
                    </div>

                    <div className="full_width mblSessionbtm">
                      <Slider
                        {...dskSessionClient}
                        className="dskSessionClient"
                      >
                        {this.props.card_data.sponsor_logo !== null ||
                        this.props.card_data.sponsor_logo == ""
                          ? this.props.card_data.sponsor_logo
                              .split(",")
                              .map((val, ind) => (
                                <div className="dskSessionClientItem">
                                  <img src={val} />
                                </div>
                              ))
                          : null}
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                id={"res_" + this.props.card_data.session_id}
                className={
                  this.props.elem_key > 1
                    ? "col-sm-6 mblSessionCard dskMasonryCard "
                    : "col-sm-6 resggg mblSessionCard dskMasonryCard " +
                      this.props.custom_class
                }
              >
                <div className="full_width radius-6 mblSessionCard_link">
                  <div
                    className="full_width mblSessionTopArea"
                    style={{ "background-color": this.props.card_data.color }}
                  >
                    <img
                      src={ssnTopBgGraphic}
                      className="object_fit_cover ssnTopBgGraphic"
                    />
                    <div className="overlay"></div>
                    <div className="full_width mblSessionTopIn">
                      <div className="full_width mblSessionTop">
                        <div className="row align-items-center justify-content-between">
                          <div className="colorWhite font_14px font500 mblSessionType">
                            <span className="radius-100 mblSessionTypeIcon">
                              <img
                                src={this.props.card_data.category_image}
                                className="translate_both"
                              />
                            </span>
                            {this.props.card_data.ms_cat_name}
                          </div>
                          <div className="mblSessionTopRight">
                            <div className="mblSessionTime">
                              {this.props.card_data.session_status !== 2 &&
                              this.props.card_data.session_status != 4 ? (
                                <h4 className="colorWhite font_14px font600">
                                  {this.props.card_data.start_datetime}{" "}
                                  {this.props.card_data.display_date}
                                </h4>
                              ) : (
                                <h4 className="colorWhite font_14px font600">
                                  Upcoming TBA
                                </h4>
                              )}
                              {this.props.card_data.session_status == 2 ? (
                                <div className="full_width mblSessionLive">
                                  <div className="liveAni">
                                    <span className="aniBx"></span>
                                    <span className="aniBx"></span>
                                    <span className="aniBx"></span>
                                  </div>
                                  <h4 className="colorWhite font_14px font600">
                                    Live
                                  </h4>
                                </div>
                              ) : null}
                            </div>

                            {this.props.clicked_index == this.props.elem_key
                              ? this.popover_view_session_desktop(
                                  this.props.card_data,
                                  this.props.elem_key
                                )
                              : null}
                            {this.props.clicked_index != this.props.elem_key ? (
                              <div
                                onClick={() => {
                                  this.popover_view_key(this.props.elem_key);
                                }}
                                data-toggle="popover"
                                data-trigger="focus"
                                className={
                                  "dskDotsMenu dskDotsCircle mblDotsMenuSssnCard  manar  " +
                                  this.props.elem_key +
                                  "_dynamicclass"
                                }
                              >
                                <span className="dskDotsMenu-dots"></span>
                                <span className="dskDotsMenu-dots"></span>
                                <span className="dskDotsMenu-dots"></span>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="clearfix"></div>
                      <h3 className="colorWhite font_16px font400">
                        {this.props.card_data.session_topic == "" ||
                        this.props.card_data.session_topic == null
                          ? null
                          : setDescription(this.props.card_data.session_topic)}
                      </h3>
                    </div>
                  </div>
                  <div className="full_width mblSessionBttmArea">
                    <div className="full_width mblSessionDocArea">
                      {/* mblSessionDocRow */}
                      {this.props.card_data.session_doctor_entities.length > 0
                        ? this.props.card_data.session_doctor_entities.map(
                            (val, ind) => (
                              <div className="full_width radius-6 mblSessionDocRow">
                                <div className="row align-items-center">
                                  <div className="radius-100 mblSessionDocPic">
                                    <img
                                      src={val.session_doctor_image}
                                      alt="Vault"
                                      className="object_fit_cover"
                                    />
                                  </div>
                                  <div className="full_width mblSessionDocTtl">
                                    <h4 className="colorBlack font_16px font500">
                                      {val.session_doctor_name}
                                    </h4>
                                    <span className="font_12px colorGrey">
                                      {val.DepartmentName}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )
                          )
                        : null}
                    </div>

                    <div className="full_width mblSessionbtm">
                      <div
                        className="text-uppercase colorWhite font_14px fontExo font400 radius-6 mblSessionbtm_a"
                        style={{
                          "background-color": this.props.card_data.color,
                        }}
                      >
                        {this.props.card_data.participant_id != undefined &&
                        this.props.card_data.participant_id != null &&
                        this.props.card_data.participant_id != "" ? (
                          <span
                            onClick={() =>
                              this.redirect_session(
                                this.props.card_data,
                                this.props.custom_class
                              )
                            }
                          >
                            View Case/Query <img src={angaleWhite} />
                          </span>
                        ) : (
                          <span
                            onClick={() =>
                              this.redirect_session(
                                this.props.card_data,
                                this.props.custom_class
                              )
                            }
                          >
                            Attend <img src={angaleWhite} />
                          </span>
                        )}
                      </div>

                      <Slider
                        {...dskSessionClient}
                        className="dskSessionClient"
                      >
                        {this.props.card_data.sponsor_logo !== null ||
                        this.props.card_data.sponsor_logo == ""
                          ? this.props.card_data.sponsor_logo
                              .split(",")
                              .map((val, ind) => (
                                <div className="dskSessionClientItem">
                                  <img src={val} />
                                </div>
                              ))
                          : null}
                      </Slider>
                    </div>

                    {this.props.card_data.participant_id != "" &&
                    this.props.card_data.participant_id != "null" &&
                    this.props.card_data.participant_id != undefined ? (
                      <div className="full_width text-center dskIcantAttnd">
                        <button
                          onClick={() => {
                            this.cancel_session(
                              this.props.card_data.session_id
                            );
                          }}
                          className="colorRed font500 dskIcantAttndBtn"
                        >
                          I can't Attend
                        </button>
                      </div>
                    ) : null}

                    {this.props.card_data.participant_id &&
                    this.props.card_data.session_status == 2 ? (
                      <div className="full_width text-center mblIcantAttnd">
                        <button
                          onClick={() => {
                            this.onJoinBtnClick(
                              this.props.card_data.session_id
                            );
                          }}
                          className="colorRed font500 mblIcantAttndBtn"
                        >
                          Join Now
                        </button>{" "}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <ToastsContainer store={ToastsStore} />
      </>
    );
  }
}

export default Sessioncard;
