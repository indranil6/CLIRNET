import React, { Component } from "react";
import pluslogo from "../../images/file_add.png";
import calenderIcon from "../../images/cal.png";
import firebase from "firebase/app";
import deletelogo from "../../images/delete_icon.png";
import $ from "jquery";
import "firebase/storage";
import { reactLocalStorage } from "reactjs-localstorage";
import AppConfig from "../config/config.js";
import Header from "../mainscreens/Header";
import Footer from "../mainscreens/Footer";
import masterconsultlogo from "../../images/session_box_type-3.png";
import { isMobile } from "react-device-detect";
import mastercirclelogo from "../../images/session_box_type-2.png";
import Form from "react-bootstrap/Form";
import Medwikicard from "../Cards/Medwikicard";
import Disclaimer from "../Common/Common.js";
import Banner from "../mainscreens/Banner";
import Modal from "react-bootstrap/Modal";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";

import Masonry from "react-masonry-component";
import ReactHtmlParser from "react-html-parser";
import FeedDetailLoader from "../LoadingPlaceholders/FeedDetailLoader.jsx";
import RelatedMedwikiLoader from "../LoadingPlaceholders/RelatedMedwikiLoader.jsx";
import PollCard from "../Cards/PollCard.js";

import { Countdown } from "../Common/Common.js";
import * as utils from "../session/utils";
import { openNewTab } from "../Common/Common";

require("firebase/auth");
const gtag = window.gtag;

var firebase_config = {
  apiKey: "AIzaSyB4yxW3LklwGsHHMqWQXuR2GCSusqJ8Ubk",
  authDomain: "http://clirnetapp.appspot.com/",
  databaseURL: "https://clirnetapp.firebaseio.com/",
  projectId: "clirnetapp",
  storageBucket: "clirnetapp.appspot.com",
  messagingSenderId: "66526267590",
};
var selected_medwiki_popover_index = -1;
firebase.initializeApp(firebase_config);
const storage = firebase.storage();
const url = AppConfig.apiLoc;
const pageNames = "Live CME";
var disclaimer = "";
let single_data;
var img_name_temp = "";
let related_comp = [];
var random_str = "";
var sponser_img = "";
var session_queries = [];

var modalImage = "";
var modalName = "";
var modalDepartment = "";
var modalProfile = "";
let poll_default_index = -1;

const masonryOptions = {
  transitionDuration: 0,
};

const SESSION_BEGIN_TIME = 60 * 2;
class Askquestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phone_no: "",
      err_msg: "",
      otp: "",
      session_listing_upcoming: [],
      session_listing_cme: [],
      viewrefresh: false,
      is_loader: true,
      is_loader_more: false,
      single_data: [],
      query: "",
      image: "",
      upload_url: "",
      firebase_token: "",
      button_disabled: 0,
      file_name_diaplay: "",
      showModal: false,
      related_comp: [],
      poll_list_data: [],
      rerender: false,
      banner_display: false,
      isLiveStart: false,
      isMeetingStart: false,
    };

    poll_default_index = -1;
    this.id = this.props.match.params.id;
    this.handleChange = this.handleChange.bind(this);
    this.fileuploadfirebase = this.fileuploadfirebase.bind(this);
    reactLocalStorage.set("@ClirnetStore:source", "");

    this.handle_change = this.handle_change.bind(this);

    this.display_banner = this.display_banner.bind(this);
  }

  runServiceForLiveSession(startTime, endTime) {
    let context = this;
    // alert("service run"+utils.getTimeDifference(startTime));
    let startTimeDif = utils.getTimeDifference(startTime);
    let endTimeDif = utils.getTimeDifference(endTime);
    startTimeDif = Math.round(startTimeDif);
    endTimeDif = Math.round(endTimeDif);
    // alert("service run"+startTimeDif);
    let myCounter;

    if (startTimeDif >= 0 && endTimeDif <= 0) {
      context.setState({ isLiveStart: true, isMeetingStart: true });
      // context.setState({ isMeetingStart: true });
    } else {
      // console.log("not live\n"+startTimeDif+"\nend\n"+endTimeDif)
    }

    let beginTime = startTimeDif; //- SESSION_BEGIN_TIME;
    if (startTimeDif && startTimeDif < 0) {
      myCounter = new Countdown({
        seconds: Math.abs(Math.ceil(startTimeDif)),
        onUpdateStatus: function (sec) {
          if (sec <= SESSION_BEGIN_TIME) {
            context.setState({ isLiveStart: true });
          }
        },
        onCounterEnd: function () {
          // alert("live start1\n");
          // window.location.reload();
        },
      });
      myCounter.start();
    }
    // else {
    if (endTimeDif && endTimeDif < 0) {
      myCounter = new Countdown({
        seconds: Math.abs(Math.ceil(endTimeDif)),
        onUpdateStatus: function (sec) {
          // console.log("live end in " + sec + " Sec");
        },
        onCounterEnd: function () {
          // alert("live end\n");
          context.setState({ isLiveStart: false });
        },
      });
      myCounter.start();
    }
    // }
  }

  display_banner(datam) {
    this.setState({ banner_display: true });
  }

  handle_change(index, value, type) {
    if (type == "vault") {
      related_comp[index].vault = value;

      this.setState({ related_comp: related_comp });
    }

    if (type == "like") {
      if (value == 0) {
        related_comp[index].myrating = false;
        related_comp[index].rating = parseInt(related_comp[index].rating) - 1;
        this.setState({ related_comp: related_comp });

        this.setState({ rerender: !this.state.rerender });
      } else {
        related_comp[index].myrating = true;
        related_comp[index].rating =
          parseInt(related_comp[index].rating) + parseInt(value);
        this.setState({ related_comp: related_comp });

        this.setState({ rerender: !this.state.rerender });
      }
    }

    if (type == "popover") {
      selected_medwiki_popover_index = index;
      this.setState({ rerender: !this.state.rerender });
    }
  }

  redirect_to_session_booking(id) {
    this.props.history.push({
      pathname: "/Reservesession/" + id + "",
    });
  }

  //Generating random string to show image url
  randomString(len, bits) {
    bits = bits || 36;
    var outStr = "",
      newStr;
    while (outStr.length < len) {
      newStr = Math.random().toString(bits).slice(2);
      outStr += newStr.slice(0, Math.min(newStr.length, len - outStr.length));
    }
    return outStr.toUpperCase();
  }

  ////////////////////////////////Added By Sumit////////////////////////////////////////////
  onViewDetailsClick(i) {
    modalImage =
      this.state.single_data.session_doctor_entities[i].session_doctor_image;
    modalName =
      this.state.single_data.session_doctor_entities[i].session_doctor_name;
    modalDepartment =
      this.state.single_data.session_doctor_entities[i].description;
    modalProfile = this.state.single_data.session_doctor_entities[i].profile;
    this.setState({ showModal: false });
    // console.log("onViewDetailsClick"+i)
  }
  ///////////////////////////////////////////////////////////////////////////

  componentDidMount() {
    window.document.title = "CLIRNET - Live CME Detail";
    gtag("config", AppConfig.gtag_measure_id, {
      page_title: window.document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
    var that12 = this;
    $(document).on("click", function (e) {
      //popover dissapear func

      let ggg = $(e.target).parents(".tanar").length;

      if (ggg == 0 && !$(e.target).hasClass("tanar")) {
        selected_medwiki_popover_index = -1;
        that12.setState({ is_loader: false });
      }
    });

    poll_default_index = -1;
    let temp = this;
    $(document).on("click", function (e) {
      //popover dissapear func
      let ggg = $(e.target).parents(".popoverExtra").length;
      if (ggg == 0 && !$(e.target).hasClass("popoverExtra")) {
        poll_default_index = -1;
        temp.refresh();
      }
    });

    $(".ses_mobile").addClass("active");

    session_queries = [];
    random_str = this.randomString(12, 16) + ".png";

    if (this.props.location.pathname.includes("social")) {
      var extrapop = "&source=social";
    } else {
      var extrapop = "";
    }
    var extrautm = "";
    if (
      reactLocalStorage.get("@ClirnetStore:utm_source", true) != "" &&
      reactLocalStorage.get("@ClirnetStore:utm_source", true) != undefined &&
      reactLocalStorage.get("@ClirnetStore:utm_source", true) != null
    ) {
      extrautm =
        "&utm_source=" +
        reactLocalStorage.get("@ClirnetStore:utm_source", true) +
        "";
    }
    //Fetching Session Detail of given ID
    fetch(
      url +
        "knwlgmastersession/sessiondetail?session_id=" +
        this.props.match.params.id +
        "" +
        extrapop +
        "" +
        extrautm +
        "",
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
        if (responseJson.status_code == "401") {
          this.props.history.push({
            pathname: `/`,
          });
        } else {
          disclaimer = responseJson.data.disclaimer;
          single_data = responseJson.data;
          let startDateTime = "";
          let endDateTime = "";
          startDateTime = single_data[0].start_datetime;
          endDateTime = single_data[0].end_datetime;

          if (single_data[0].session_queries != undefined) {
            session_queries = single_data[0].session_queries;
          }
          sponser_img = single_data[0].sponsor_entities.sponsor_logo;
          var speccs =
            single_data[0].speciality + "," + single_data[0].speciality_id;
          this.setState({ poll_list_data: single_data[0].survey });
          this.setState({ single_data: single_data[0] });
          this.setState({ query: single_data[0].asked_query });
          this.setState({ upload_url: single_data[0].upload_documents });
          this.setState({ file_name_diaplay: single_data[0].upload_documents });

          disclaimer = single_data[0].disclaimer;
          //start run service for timer 
          this.runServiceForLiveSession(startDateTime, endDateTime);
          //end run service for session
          related_comp = [];

          fetch(
            url +
              "knwlg/related?type=session&type_id=" +
              this.props.match.params.id +
              "",
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
              responseJson.data.map((r) => {
                related_comp.push(r);
              });

              this.setState({ related_comp: related_comp });
            });

          if (isMobile) {
            var type_id_val = 2;
          } else {
            var type_id_val = 1;
          }
        }
      });

    //generating FCM Token For firebase auth
    fetch(url + "fcm/token", {
      method: "GET",
      headers: {
        Authorization: reactLocalStorage.get(
          "@ClirnetStore:refreshToken",
          true
        ),
        version: "rjsw 1.1.1",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ firebase_token: responseJson.data.token });
      });

    $(".li_session").attr("id", "session_cal");
  }
  //Setting query value
  handleChange(e) {
    this.setState({ query: e.target.value });
  }

  //Image Upload to firebase
  fileuploadfirebase = (e) => {
    let thisobj = this;

    if (e.target.files["0"] && this.state.firebase_token != "") {
      this.setState({ button_disabled: 1 });

      const imageUri = e.target.files["0"];
      this.setState({ image: e.target.files["0"] });

      var unix_time = Math.round(+new Date() / 1000);
      var rand = Math.floor(Math.random() * 100000 + 1);

      img_name_temp = imageUri.name;
      const ext = imageUri.name.split(".").pop(); // Extract image extension
      const filename = `${
        reactLocalStorage.get("@ClirnetStore:user_mem_id", true) +
        unix_time +
        rand
      }.${ext}`;
      firebase
        .auth()
        .signInWithCustomToken(this.state.firebase_token)
        .then(() => {
          // Generate unique name

          const uploadTask = storage
            .ref(
              `${AppConfig.imgFolder}${reactLocalStorage.get(
                "@ClirnetStore:user_mem_id",
                true
              )}/${filename}`
            )
            .put(imageUri);
          uploadTask.on(
            "state_changed",
            function (snapshot) {
              var progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                  console.log("Upload is paused");
                  break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                  console.log("Upload is running");
                  break;
              }
            },
            function (error) {
              this.setState({ button_disabled: 0 });
            },
            function () {
              storage
                .ref(
                  `${AppConfig.imgFolder}${reactLocalStorage.get(
                    "@ClirnetStore:user_mem_id",
                    true
                  )}`
                )
                .child(filename)
                .getDownloadURL()
                .then((url) => {
                  //alert();
                  thisobj.setState({ upload_url: url });
                  thisobj.setState({ button_disabled: 0 });
                  thisobj.setState({ file_name_diaplay: filename });
                });
            }
          );
        })
        .catch((error) => this.setState({ button_disabled: 0 }));
    }
  };

  //Send session reservation request

  reserve_send() {
    this.setState({ "this.state.button_disabled": 1 });
    var error_flag = 0;

    if (this.state.query == "" && single_data[0].category_id == 3) {
      this.setState({ "this.state.button_disabled": 0 });

      this.setState({ err_msg: "Please Enter Your Query." });
    } else {
      if (this.state.single_data.my_participant_id == "") {
        let extrautmlet = "";
        if (
          reactLocalStorage.get("@ClirnetStore:utm_source", true) != "" &&
          reactLocalStorage.get("@ClirnetStore:utm_source", true) !=
            undefined &&
          reactLocalStorage.get("@ClirnetStore:utm_source", true) != null
        ) {
          extrautmlet = reactLocalStorage.get("@ClirnetStore:utm_source", true);
        }
        let parser = {
          session_id: this.props.match.params.id,
          question: this.state.query,
          my_participant_id: "",
          attachFilePath:
            this.state.upload_url == undefined ? "" : this.state.upload_url,
          utm_source: extrautmlet,
          redirect_to_live: this.state.isLiveStart ? 1 : 0,
          first_name: reactLocalStorage.get("@ClirnetStore:first_name", true),
          last_name: reactLocalStorage.get("@ClirnetStore:last_name", true),
        };

        fetch(url + "knwlgmastersession/submitquery", {
          method: "POST",
          headers: {
            Authorization: reactLocalStorage.get(
              "@ClirnetStore:refreshToken",
              true
            ),
            version: "rjsw 2.4.6",
            attachFilePath: this.state.upload_url,
            Utm_source: extrautmlet,
            Session_id: this.props.match.params.id,
          },
          body: JSON.stringify(parser),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status_code == "200") {
              /////////////////////////////////API parse start/////////////////////////////////////////////////////
              reactLocalStorage.set("@ClirnetStore:my_sessions", 1);
              var context = this;
              if (
                context.state.isLiveStart &&
                responseJson.data.is_redirect_to_live_thirdparty
              ) {
                let url = responseJson.data.redirect_to_live;
                openNewTab(url);
              } else if (
                context.state.isLiveStart &&
                !responseJson.data.is_redirect_to_live_thirdparty
              ) {
                utils.redirectToLiveSession(context.props.history, context.id);
              } else {
                // setTimeout(function () {
                context.props.history.push({
                  pathname: `/Sessions`,
                });
                // }, 100);
              }
              /////////////////////////////////API parse end/////////////////////////////////////////////////////
            } else {
              this.setState({ err_msg: responseJson.message });
            }
          })
          .catch((error) => {
            this.setState({ err_msg: "Something went Wrong" });
          });
      } else {
        let extrautmlet = "";
        if (
          reactLocalStorage.get("@ClirnetStore:utm_source", true) != "" &&
          reactLocalStorage.get("@ClirnetStore:utm_source", true) !=
            undefined &&
          reactLocalStorage.get("@ClirnetStore:utm_source", true) != null
        ) {
          extrautmlet = reactLocalStorage.get("@ClirnetStore:utm_source", true);
        }

        let parser = {
          session_id: this.props.match.params.id,
          question: this.state.query,
          my_participant_id: this.state.single_data.my_participant_id,
          attachFilePath: this.state.upload_url,
          utm_source: extrautmlet,
        };

        //Edit Session reservation query

        fetch(url + "knwlgmastersession/editquery", {
          method: "POST",
          headers: {
            Authorization: reactLocalStorage.get(
              "@ClirnetStore:refreshToken",
              true
            ),
            version: "rjsw 2.4.6",
            Utm_source: extrautmlet,
            Session_id: this.props.match.params.id,
          },
          body: JSON.stringify(parser),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status_code == "200") {
              reactLocalStorage.set("@ClirnetStore:my_sessions", 1);
              var obr = this;
              setTimeout(function () {
                obr.props.history.push({
                  pathname: `/Sessions`,
                });
              }, 100);
            } else {
              this.setState({ err_msg: responseJson.message });
            }
          })
          .catch((error) => {
            this.setState({ err_msg: "Something went Wrong" });
          });
      }
    }
  }

  onJoinBtnClick = () => {
    const context = this;
    if (context.state.isLiveStart && !context.state.single_data.is_booked) {
      context.reserve_send();
    } else {
      const tempContext = context;
      utils.getSessionDetails(context.id).then((response) => {
        if (response.status_code == 200) {
          context.handleSessionVendor(response.data);
        } else {
          // utils.redirectToLogin(props.history)
        }
      });
    }
  };

  handleSessionVendor = (data) => {
    //redirecting session meeting page as per vendor
    let context = this;
    let vendorId = 0;
    let sessionMeetingUrl = "";
    vendorId = data[0].vendor_id ? data[0].vendor_id : 0;
    sessionMeetingUrl = data[0].vendor_id ? data[0].video_embed_src : "";
    switch (vendorId) {
      case "0": //clirnet recorded session
        if (context.state.isMeetingStart) {
          utils.redirectToLiveSession(context.props.history, context.id);
        } else {
          utils.redirectToSessionWaitingRoom(context.props.history, context.id);
        }
        break;
      case "2": //vouchpro
        if (context.state.isMeetingStart) {
          openNewTab(sessionMeetingUrl);
        } else {
          utils.redirectToSessionWaitingRoom(context.props.history, context.id);
        }
        // openNewTab(sessionMeetingUrl);
        break;
      case "4": //zoom
        if (context.state.isMeetingStart) {
          openNewTab(sessionMeetingUrl);
        } else {
          utils.redirectToSessionWaitingRoom(context.props.history, context.id);
        }
        // openNewTab(sessionMeetingUrl);
        break;
      case "5": //clirnet live
        if (context.state.isMeetingStart) { 
          utils.redirectToLiveSession(context.props.history, context.id);
        } else { 
          utils.redirectToSessionWaitingRoom(context.props.history, context.id);
        }
        break;
      default:return false;
    }
  };

  //Redirect to medwiki detail from related listing
  redirect_to_compendium_detail(id) {
    reactLocalStorage.set(
      "@ClirnetStore:source",
      "Session Reservation Section"
    );
    this.props.history.push({
      pathname: "/Feeddetail/" + id + "",
    });
  }

  //Select predefined query
  open_other(text) {
    this.setState({ query: text });
  }

  componentWillUnmount() {
    $("html, body").css({
      overflow: "auto",
      height: "auto",
    });
  }

  onMenuClick(ind) {
    poll_default_index = ind;
    this.refresh();
  }

  refresh = () => {
    this.setState({ rerender: !this.state.rerender });
  };

  renderPolls = () => {
    return (
      <>
        {this.state.poll_list_data.length > 0 ? (
          <div className="full_width surveyRightMasonry">
            <>
              <Masonry
                className={"my-gallery-class"} // default ''
                elementType={"ul"} // default 'div'
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                //imagesLoadedOptions={imagesLoadedOptions} // default {}
              >
                {this.state.poll_list_data.map((val, ind) => (
                  <PollCard
                    data={val}
                    status="new"
                    array_index={ind}
                    menu_click={this.onMenuClick.bind(this, ind)}
                    deafult_popover_index={poll_default_index}
                  />
                ))}
              </Masonry>
            </>
          </div>
        ) : null}
      </>
    );
  };

  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 400,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      autoplay: true,
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
      cssEase: "linear",
      is_loader: true,
    };

    return (
      <div
        className={
          isMobile == true
            ? "full_width wrap_body mblScreen"
            : "full_width wrap_body dskScreen"
        }
      >
        <Header history={this.props.history} page_name={pageNames} />
        <section className="full_width body_area">
          <div className="container">
            <div className="row">
              <Banner
                type_id={this.id}
                type={"session"}
                apiresponserecieved={this.display_banner}
                api_call_detail={1}
                api_call={0}
              />

              {this.state.banner_display == true ? (
                <Banner
                  type_id={this.id}
                  banner_position={1}
                  unmount_call={1}
                  type={"session"}
                  api_call={1}
                  before_unload_call={1}
                />
              ) : null}
              <section className="full_width ssnDtls">
                {this.state.single_data.session_topic != undefined &&
                this.state.single_data.session_topic != null &&
                this.state.single_data.session_topic != "" ? (
                  <div className="medWikiLeft">
                    <div className="full_width radius-6 ssnDtlsMain">
                      <div className="col justify-content-between feedRowTop">
                        <div className="row">
                          <div className="col">
                            <span class="font_14px radius-6 font600 colorBlue ssnDtlType">
                              {this.state.single_data.ms_cat_name ==
                              "MasterCircle" ? (
                                <img
                                  src={mastercirclelogo}
                                  width="24"
                                  height="24"
                                  alt="icon"
                                />
                              ) : null}
                              {this.state.single_data.ms_cat_name ==
                              "MasterConsult" ? (
                                <img
                                  src={masterconsultlogo}
                                  width="24"
                                  height="24"
                                  alt="icon"
                                />
                              ) : null}

                              {this.state.single_data.ms_cat_name ==
                              "MasterCircle" ? (
                                <span className="colorGreen">
                                  {" "}
                                  MasterCircle
                                </span>
                              ) : null}
                              {this.state.single_data.ms_cat_name ==
                              "MasterConsult" ? (
                                <span className="colorGreen">
                                  {" "}
                                  MasterConsult
                                </span>
                              ) : null}
                            </span>
                            {this.state.single_data.session_status != 4 ? (
                              <span class="font_14px font600 feedRow_date ssnDtl_date ssnDtl_dateDesk">
                                <img src={calenderIcon} />{" "}
                                {this.state.single_data.display_date_format}
                                <span> | </span>
                                {this.state.single_data.display_date}
                              </span>
                            ) : (
                              <span class="font_14px font600 feedRow_date ssnDtl_date ssnDtl_dateDesk">
                                Upcoming TBA
                              </span>
                            )}
                          </div>
                          <div className="col-auto">
                            {/* {(sponser_img != this.state.single_data.client_logo) ?
                            <div className="feedRow_sponsors">
                              <span className="font_10px font500 colorBlack">Powered by</span>
                              {(sponser_img != "" && sponser_img != undefined) ?
                                <div>
                                  <img src={sponser_img} width="224" height="63" alt="logo"  />
                                  <span className="feedRow_sponsorsDvdr"></span>
                                </div>
                                :
                                null}
                              {(this.state.single_data.client_logo != "" && this.state.single_data.client_logo != undefined) ?
                                <img src={this.state.single_data.client_logo} width="224" height="63" alt="logo"  /> :
                                null}
                            </div> : */}
                            {this.state.single_data.sponsor_logo != "" &&
                            this.state.single_data.sponsor_logo != null &&
                            this.state.single_data.sponsor_logo != undefined ? (
                              <div className="feedRow_sponsors">
                                {/* <span className="font_10px font500 colorBlack">Powered by</span> */}

                                {this.state.single_data.sponsor_logo.split(",")
                                  .length == 1 ? (
                                  <img
                                    src={
                                      this.state.single_data.sponsor_logo.split(
                                        ","
                                      )[0]
                                    }
                                    width="224"
                                    height="63"
                                    alt="logo"
                                  />
                                ) : (
                                  <Slider
                                    {...dskSessionClient}
                                    className="dskSessionClient mblMedWikiClient"
                                  >
                                    {this.state.single_data.sponsor_logo
                                      .split(",")
                                      .map((val, ind) => (
                                        <div className="dskSessionClientItem">
                                          <img src={val} />
                                        </div>
                                      ))}
                                  </Slider>
                                )}

                                {/* <img src={this.state.single_data.sponsor_logo} width="224" height="63" alt="logo"  /> */}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>

                      <span class="font_14px font600 feedRow_date ssnDtl_date ssnDtl_dateRes">
                        <img src={calenderIcon} />{" "}
                        {this.state.single_data.display_date_format}
                        <span> | </span>
                        {this.state.single_data.display_date}
                      </span>
                      {this.state.isLiveStart ? (
                        <span className="font600 colorBlack feed_right_SsnBoxLive ml-2 mb-2">
                          Live
                        </span>
                      ) : null}
                      <div className="full_width feedRow_ttl">
                        <a
                          href="javascript:void(0);"
                          class="font_18px colorBlack font600"
                        >
                          {this.state.single_data.session_topic}
                        </a>
                      </div>

                      <div className="clearfix"></div>
                      <div className="col ssnDtls2nd">
                        <div className="row">
                          {this.state.single_data.length != 0 ? (
                            <div className="col-sm-6 col-12 ssnDtlsDoc">
                              <Slider
                                {...settings}
                                className="full_width radius-6 text-center ssnDtlsDocIn ssnDtlsDocInSlider"
                              >
                                {this.state.single_data.session_doctor_entities.map(
                                  (single_data, i) => (
                                    <div className="ssnDtlsDocInItem">
                                      <div className="radius-100 ssnDtlsDocPic">
                                        <img
                                          src={single_data.session_doctor_image}
                                          className="object_fit_cover radius-100"
                                        />
                                      </div>
                                      <div className="clearfix"></div>
                                      <h2 className="colorBlack font700 font_16px ssnDtlsDocName">
                                        {single_data.session_doctor_name}
                                        <span className="colorGrey font_12px font600">
                                          {single_data.DepartmentName}
                                        </span>
                                      </h2>
                                      <div className="full_width ssnDtlsDocCont">
                                        {single_data.profile.substring(0, 100)}
                                        ....
                                      </div>
                                      <a
                                        href="javascript:void(0);"
                                        onClick={() => {
                                          this.onViewDetailsClick(i);
                                          this.setState({ showModal: true });
                                        }}
                                        className="colorBlue font700 font_14px"
                                      >
                                        View Details
                                      </a>
                                    </div>
                                  )
                                )}
                              </Slider>
                            </div>
                          ) : null}

                          <div className="col-sm-6 col-12 ssnDtlsfrm">
                            <div className="full_width ssnDtlsfrmIn">
                              {/* <div className="full_width slotsAvl">
                              <h2 className="font600 font_16px colorBlack">Slots Available :
                     <span> {this.state.single_data.total_booking_left}/{this.state.single_data.total_seat}</span></h2>
                              <ProgressBar now={this.state.single_data.percentage} />
                            </div> */}
                              <div className="full_width ssnDtlQuery">
                                {this.state.single_data.session_status == 2 &&
                                this.state.single_data.session_status != 4 &&
                                this.state.single_data.is_booked == true ? (
                                  <h2 className="font600 font_16px colorBlack">
                                    Edit Your Question or Case
                                  </h2>
                                ) : (
                                  <h2 className="font600 font_16px colorBlack">
                                    Your Question or Case
                                  </h2>
                                )}
                                {this.state.single_data.session_status == 2 &&
                                this.state.single_data.session_status != 4 &&
                                this.state.single_data.is_booked == true ? (
                                  <>
                                    {session_queries.map((r, index) => (
                                      <div className="cmnCheckBox_row cmnRadio_row">
                                        {r === this.state.query ? (
                                          <input
                                            className="form-check-input"
                                            checked={true}
                                            id="cancelation-1"
                                            type="radio"
                                            disabled="disabled"
                                          />
                                        ) : (
                                          <input
                                            className="form-check-input"
                                            id="cancelation-1"
                                            type="radio"
                                            disabled="disabled"
                                          />
                                        )}
                                        <label
                                          className="font600 font_12px colorBlack form-check-label"
                                          for="cancelation-1"
                                          disabled="disabled"
                                        >
                                          {r}
                                        </label>
                                      </div>
                                    ))}
                                  </>
                                ) : (
                                  <>
                                    {session_queries.map((r, index) => (
                                      <div className="cmnCheckBox_row cmnRadio_row">
                                        {r === this.state.query ? (
                                          <input
                                            className="form-check-input"
                                            checked={true}
                                            onClick={() => {
                                              this.open_other(r);
                                            }}
                                            id="cancelation-1"
                                            type="radio"
                                          />
                                        ) : (
                                          <input
                                            className="form-check-input"
                                            onClick={() => {
                                              this.open_other(r);
                                            }}
                                            id="cancelation-1"
                                            type="radio"
                                          />
                                        )}
                                        <label
                                          className="font600 font_12px colorBlack form-check-label"
                                          for="cancelation-1"
                                        >
                                          {r}
                                        </label>
                                      </div>
                                    ))}
                                  </>
                                )}
                                {/* {session_queries.map((r, index) => (
                                <div className="cmnCheckBox_row cmnRadio_row">
                                  {(r === this.state.query) ?
                                    <input className="form-check-input" checked={true} onClick={() => { this.open_other(r); }} id="cancelation-1" type="radio" /> :
                                    <input className="form-check-input" onClick={() => { this.open_other(r); }} id="cancelation-1" type="radio" />}
                                  <label className="font600 font_12px colorBlack form-check-label" for="cancelation-1">{r}</label>
                                </div>
                              ))} */}

                                <Form.Control
                                  as="textarea"
                                  rows="4"
                                  name="body"
                                  className="font_14px"
                                  onChange={this.handleChange}
                                  value={this.state.query}
                                  placeholder="Type here..."
                                  disabled={
                                    this.state.isLiveStart ? true : false
                                  }
                                />
                                <div className="clearfix"></div>
                                <span style={{ color: "red" }}>
                                  {this.state.err_msg}
                                </span>
                                {!this.state.isLiveStart ? (
                                  <div className="file_upload_design">
                                    <p className="transition6s font600 colorGreen file_upload_text">
                                      <img
                                        src={pluslogo}
                                        width="32"
                                        height="32"
                                        alt="icon"
                                        title="icon"
                                        className="translate_top"
                                      />{" "}
                                      Attach a File
                                    </p>
                                    <input
                                      type="file"
                                      onChange={this.fileuploadfirebase}
                                      className="file_upload_btn"
                                    />
                                  </div>
                                ) : null}
                                {this.state.upload_url != "" &&
                                this.state.upload_url != undefined ? (
                                  <div className="col-xs-12 form_row_cmn">
                                    <ul className="askQuestion_files">
                                      <li>
                                        <div className="translate_top askQuestion_files_left">
                                          <img
                                            src={this.state.upload_url}
                                            className="translate_top object_fit_cover"
                                            alt="image"
                                            title="image"
                                            width="38"
                                            height="45"
                                          />
                                        </div>
                                        <div className="askQuestion_files_right">
                                          {this.state.single_data
                                            .my_participant_id == "" ? (
                                            <h3
                                              style={{ "font-size": "13px" }}
                                              className="font_16px colorBlack font600"
                                            >
                                              {img_name_temp}
                                            </h3>
                                          ) : (
                                            <h3
                                              style={{ "font-size": "13px" }}
                                              className="font_16px colorBlack font600"
                                            >
                                              {random_str}
                                            </h3>
                                          )}

                                          <a
                                            className="translate_top askQuestion_files_right_a"
                                            onClick={() => {
                                              if (
                                                window.confirm("Are You Sure?")
                                              ) {
                                                this.setState({
                                                  upload_url: "",
                                                  file_name_diaplay: "",
                                                });
                                              } else {
                                              }
                                            }}
                                            href="javascript:void(0)"
                                          >
                                            <img
                                              src={deletelogo}
                                              alt="icon"
                                              title="icon"
                                              width="14"
                                              height="16"
                                              className="pull-left"
                                            />
                                          </a>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                ) : null}
                                {!this.state.isLiveStart ? (
                                  <div className="full_width ssnDtlBtn">
                                    {this.state.single_data.session_status ==
                                    3 ? null : (
                                      <button
                                        onClick={() => {
                                          if (
                                            reactLocalStorage.get(
                                              "@ClirnetStore:dashboard",
                                              true
                                            ) != 1
                                          ) {
                                            this.props.history.push({
                                              pathname: `/Sessions`,
                                            });
                                          } else {
                                            this.props.history.push({
                                              pathname: `/Dashboard`,
                                            });
                                          }
                                        }}
                                        className="cmnBtn btnRed cmnBtnHalf"
                                        type="button"
                                      >
                                        Cancel
                                      </button>
                                    )}
                                    {this.state.button_disabled == 1 ? (
                                      <span className="text-center">
                                        Uploading...
                                      </span>
                                    ) : (
                                      <>
                                        {this.state.single_data
                                          .session_status != 4 &&
                                        this.state.single_data.session_status !=
                                          3 &&
                                        this.state.single_data.is_booked !=
                                          true ? (
                                          <button
                                            onClick={() => {
                                              this.reserve_send();
                                            }}
                                            className="cmnBtn btnBlue cmnBtnHalf"
                                            type="button"
                                          >
                                            Submit
                                          </button>
                                        ) : null}
                                        {this.state.single_data
                                          .session_status != 2 &&
                                        this.state.single_data.session_status !=
                                          3 &&
                                        this.state.single_data.session_status !=
                                          4 &&
                                        this.state.single_data.is_booked ==
                                          true ? (
                                          <button
                                            onClick={() => {
                                              this.reserve_send();
                                            }}
                                            className="cmnBtn btnBlue cmnBtnHalf"
                                            type="button"
                                          >
                                            Update Query
                                          </button>
                                        ) : null}

                                        {/* ////////////////////start session closed validation///////////////////////// */}
                                        {this.state.single_data
                                          .session_status == 3 &&
                                        this.state.single_data.status_name ==
                                          "Close" ? (
                                          <label className="font600 font_16px colorRed text-center">
                                            Session Closed
                                          </label>
                                        ) : null}
                                        {/* ////////////////////end session closed validation///////////////////////// */}
                                        {this.state.single_data
                                          .session_status == 4 &&
                                        this.state.single_data.is_booked ==
                                          true ? (
                                          <button
                                            onClick={() => {
                                              this.reserve_send();
                                            }}
                                            className="cmnBtn btnBlue mt-2 cmnBtnHalf"
                                            type="button"
                                          >
                                            Update Query
                                          </button>
                                        ) : null}

                                        {this.state.single_data
                                          .session_status == 4 &&
                                        this.state.single_data.is_booked ==
                                          false ? (
                                          <button
                                            onClick={() => {
                                              this.reserve_send();
                                            }}
                                            className="cmnBtn btnBlue mt-2 cmnBtnHalf"
                                            type="button"
                                          >
                                            Notify Me!
                                          </button>
                                        ) : null}
                                      </>
                                    )}
                                  </div>
                                ) : (
                                  <div className="full_width ssnDtlBtn">
                                    <button
                                      className="colorWhite font_14px fontExo font700 radius-6 mblPllsSrvsbtm_a"
                                      id="join-url"
                                      onClick={() => {
                                        this.onJoinBtnClick();
                                      }}
                                      disabled={false}
                                      // target="_blank"
                                      // href={"/#/LiveSession/"+this.id}
                                    >
                                      Join Now
                                    </button>
                                  </div>
                                )}
                                {/* {isLiveStar} */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* {this.state.poll_list_data.length > 0
                      ? this.renderPolls()
                      : null} */}
                    {this.state.banner_display == true ? (
                      <Banner
                        type_id={this.id}
                        banner_position={2}
                        unmount_call={0}
                        type={"session"}
                        api_call={1}
                        before_unload_call={0}
                      />
                    ) : null}
                    <Disclaimer val={disclaimer}></Disclaimer>
                  </div>
                ) : (
                  <div className="medWikiLeft">
                    <div className="full_width radius-6 ssnDtlsMain">
                      <FeedDetailLoader />
                      <br></br>
                      <FeedDetailLoader />
                    </div>
                  </div>
                )}

                <div className="feed_right_2">
                  {isMobile ? null : (
                    <>
                      {this.state.banner_display == true ? (
                        <Banner
                          type_id={this.id}
                          banner_position={3}
                          unmount_call={0}
                          type={"session"}
                          api_call={1}
                          before_unload_call={0}
                        />
                      ) : null}
                    </>
                  )}
                  <div class="full_width radius-6 text-left specialty_comp_right">
                    <h2 class="bgColorBlue font600 colorWhite font600 font_20px specialtyTtl">
                      Related
                    </h2>
                    <div class="clearfix"></div>
                    <div class="full_width font600 specialty_comp_right_text">
                      {this.state.related_comp.length == 0 ? (
                        <>
                          <RelatedMedwikiLoader />
                          <RelatedMedwikiLoader />
                          <RelatedMedwikiLoader />
                          <RelatedMedwikiLoader />
                          <RelatedMedwikiLoader />
                        </>
                      ) : null}
                      {this.state.related_comp.map((r, indexc) => (
                        <Medwikicard
                          onChangeButton={this.handle_change}
                          history={this.props.history}
                          mobile_device={isMobile}
                          card_data={r}
                          clicked_index={selected_medwiki_popover_index}
                          elem_key={indexc}
                          custom_class="dskTrendingMedwikiCard feeddetail_related"
                        />
                      ))}
                    </div>
                    <div class="clearfix"></div>
                  </div>
                  {this.state.banner_display == true ? (
                    <Banner
                      type_id={this.id}
                      banner_position={4}
                      unmount_call={0}
                      type={"session"}
                      api_call={1}
                      before_unload_call={0}
                    />
                  ) : null}
                </div>
              </section>
            </div>
          </div>
        </section>
        {this.state.single_data.length != 0 ? (
          <Modal
            className="in doctorDtlsPop"
            centered="true"
            animation="slide"
            show={this.state.showModal}
            onHide={() => {
              this.setState({ showModal: false });
            }}
          >
            <Modal.Header className="justify-content-center">
              <Modal.Title className="font600 font_20px colorBlack">
                Doctor Details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="radius-100 ssnDtlsDocPic">
                <img src={modalImage} className="object_fit_cover radius-100" />
              </div>
              <div className="clearfix"></div>
              <h2 className="colorBlack font700 font_16px ssnDtlsDocName">
                {modalName}
                <span className="colorGrey font_12px font600">
                  {ReactHtmlParser(modalDepartment)}
                </span>
              </h2>
              <div className="full_width ssnDtlsDocCont">{modalProfile}</div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <a
                href="javascript:void(0)"
                className="radius-40 font500 btnRed cmnBtn btnCmnSmall"
                variant="secondary"
                onClick={() => {
                  this.setState({ showModal: false });
                }}
              >
                Close
              </a>
            </Modal.Footer>
          </Modal>
        ) : null}
        <Footer history={this.props.history} />
      </div>
    );
  }
}

export default Askquestion;
