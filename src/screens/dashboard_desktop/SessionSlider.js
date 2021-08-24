import React from "react";
import Slider from "react-slick";
import AppConfig from "../config/config.js";
import { reactLocalStorage } from "reactjs-localstorage";
import { ToastsContainer, ToastsStore } from "react-toasts";
import dskSlideSessionBg from "../../desktopImages/dskSlideSessionBg.png";
import blackArrow from "../../desktopImages/blackArrow.png";
import Popover from "react-bootstrap/Popover";
import $ from "jquery";
import Share from "../Common/Share.jsx";
import SessionSliderLoader from "../LoadingPlaceholders/SessionSliderLoader.jsx";

const meetConfig = {
  meetingNumber: "",
  platform_name: "",
  userName: "",
  userEmail: "",
  passWord: "",
};

var deafult_popover_index = -1;
const url = AppConfig.apiLoc;
var session_list_data = [];
let slider_active_elements = [];

let isApiCallDone = false;

class SessionSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
    };
    session_list_data = [];
    isApiCallDone = false;
  }

  refresh = () => {
    this.setState({ display: !this.state.display });
  };

  componentDidMount() {
    session_list_data = [];
    this.getSessionSliderData();
    let temp = this;

    $(document).on("click", function (e) {
      //popover dissapear func
      let ggg = $(e.target).parents(".popoverExtra").length;
      if (ggg == 0 && !$(e.target).hasClass("popoverExtra")) {
        deafult_popover_index = -1;
        temp.refresh();
      }
    });
  }

  redirectToSessionDetails(session_id, live_mode) {
    this.props.history.push({
      pathname: "/Reservesession/" + session_id + "",
    });
  }
  getSessionSliderData = () => {
    let temp = this;
    fetch(url + "dashboard/session", {
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
        let status_code = responseJson.status_code;
        isApiCallDone = true;
        if (status_code == 200) {
          let responseData = responseJson.data;
          session_list_data = responseData;
          responseData.map((r, index) => {
            //console.log("live mode"+r.live_mode)
          });
          setTimeout(function () {
            temp.setJqueryOnCard(session_list_data.length);
          }, 300);
          setTimeout(function () {
            session_list_data.map((val, ind) =>
              slider_active_elements.push(false)
            );
          }, 500);
          this.refresh();
        }
      })
      .catch((error) => {
        isApiCallDone = true;
        this.refresh();
        //console.log("Error"+error);
      });
  };

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
            meetConfig.meetingNumber != null ||
            meetConfig.meetingNumber != "" ||
            (meetConfig.meetingNumber != undefined &&
              meetConfig.userEmail != null) ||
            meetConfig.userEmail != "" ||
            (meetConfig.userEmail != undefined &&
              meetConfig.userName != null) ||
            meetConfig.userName != ""
          ) {
            let zoom_url =
              "https://developer.clirnet.com/join_webinar/#/Zoom/" +
              meetConfig.meetingNumber +
              "/" +
              meetConfig.userEmail +
              "/" +
              meetConfig.userName; //http://localhost:3001/join_webinar/#/Zoom/4858799231/sumit@mail.com/Sumit
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
        //console.log("Error"+error);
      });
  }

  getUserDetail() {
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
  }

  onViewSessionClick(val) {
    if (val.live_mode == true && val.participant_id != null) {
      this.props.history.push({
        pathname: "/LiveSessionDetails/" + val.session_id + "",
      });
    } else {
      this.props.history.push({
        pathname: "/Reservesession/" + val.session_id + "",
      });
    }
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

  sessionCardMenuPopover = (val, ind) => {
    return (
      <div
        className="dskDotsMenu dskDotsCircle dskDotsMenuSssnCard"
        data-toggle="popover"
        data-trigger="focus"
      >
        <div>
          <span className="dskDotsMenu-dots"></span>
          <span className="dskDotsMenu-dots"></span>
          <span className="dskDotsMenu-dots"></span>
        </div>
        <Popover
          id="popover-basic"
          placement="bottom-end"
          className="dskDotsMenuSettings popoverExtra"
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
                                description: val.session_topic + "...",       // (defaults to og:description or twitter:description)
                                title: val.category_name,            // (defaults to og:title or twitter:title)
                                message: '',     // (only for email sharing)
                                subject: '',  // (only for email sharing)
                                username: 'Medwiki view' // (only for twitter sharing)
                            }} /> */}
            {/* <a href="javascript:void(0)" className="dskDotsMenuNotRelevant">
                            Not Relevant for me
                        </a> */}
            <Share
              customClass="dskCphTtlExtra"
              data={{
                title: val.session_topic,
                text: val.session_description,
                url: val.deeplink,
              }}
            />
          </Popover.Content>
        </Popover>
      </div>
    );
  };

  onMenuClick(ind) {
    deafult_popover_index = ind;
    this.refresh();
  }

  setJqueryOnCard(length) {
    let count = 0;
    if (length > 0) {
      count = length - 4;
    }
    $(".dskSlideSsnDocArea").each(function (i) {
      if (parseInt($(this).find(".dskGrMstrDocBoxSsn").length) != 1) {
        $(this).find(".dskGrMstrDocBoxSsn").addClass("dskGrMstrDocPopShow");
      } else {
        $(this).find(".dskGrMstrDocBoxSsn").removeClass("dskGrMstrDocPopShow");
      }
    });

    // $(window).bind("load resize", function() {
    // console.log('inner width' + $(window).innerWidth())
    if ($(window).innerWidth() >= 991) {
      $(document)
        .on(
          "mouseenter",
          ".dskGrMstrDocPopShow .dskGrMstrDocBoxIn",
          function () {
            $(this)
              .find(".dskGrMstrDocProfile")
              .addClass("dskGrMstrDocProfileShow")
              .fadeIn(300);
            $(this).parent().addClass("dskGrMstrDocPopShowActive");
          }
        )
        .on(
          "mouseleave",
          ".dskGrMstrDocPopShow .dskGrMstrDocBoxIn",
          function () {
            $(this)
              .find(".dskGrMstrDocProfile")
              .removeClass("dskGrMstrDocProfileShow")
              .fadeOut(300);
            $(this).parent().removeClass("dskGrMstrDocPopShowActive");
          }
        );
    } else {
      $("ul.nav li.dropdown").removeClass("open_sub_menu");
    }
    // });

    // $(window).bind("load resize", function() {
    if ($(window).innerWidth() >= 991) {
      $(document)
        .on(
          "mouseenter",
          ".dskGrMstrDocPopShow .dskGrMstrDocBoxIn",
          function () {
            $(this)
              .find(".dskGrMstrDocProfile")
              .addClass("dskGrMstrDocProfileShow")
              .fadeIn(300);
            $(this).parent().addClass("dskGrMstrDocPopShowActive");
          }
        )
        .on(
          "mouseleave",
          ".dskGrMstrDocPopShow .dskGrMstrDocBoxIn",
          function () {
            $(this)
              .find(".dskGrMstrDocProfile")
              .removeClass("dskGrMstrDocProfileShow")
              .fadeOut(300);
            $(this).parent().removeClass("dskGrMstrDocPopShowActive");
          }
        );
    } else {
      $("ul.nav li.dropdown").removeClass("open_sub_menu");
    }
    // });

    $(".dskSlideSsnDocArea").each(function (index) {
      let countcir = $(this).find(".dskGrMstrDocProfileSsn").length;
      $(this)
        .find(".dskGrMstrDocBoxSsn:nth-child(5)")
        .find(".dskGrMstrDocProfileSsn")
        .remove();
      $(this)
        .find(".dskGrMstrDocBoxSsn:nth-child(5)")
        .find(".dskGrMstrDocBoxInPicSsn")
        .append(
          "<div class='overlay'></div><span id='view-master-doctor' class='dskGrMstrDocCountSsn plus_iconSsn' style='cursor: pointer;'>+" +
            (countcir - 5) +    
            "</span>"
        );
    });

    // var that = this;
    // $(".plus_iconSsn").click(function () {
    //   let key_element = parseInt($(this).parent().parent().parent().parent().parent().find('.hidden_span').text());
    //   slider_active_elements.map((val, ind) => (
    //     slider_active_elements[ind] = false
    //   ));
    //   slider_active_elements[key_element] = true;
    //   // that.refresh()
    // });
  }

  render() {
    var dskSlideTop = {
      dots: true,
      infinite: true,
      speed: 200,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      // adaptiveHeight: true,
      afterChange: () => {
        if (deafult_popover_index != -1) {
          deafult_popover_index = -1;
          this.refresh();
        }
      },
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
    };
    return session_list_data != null && session_list_data.length > 0 ? (
      <section className="full_width dskSlideSession">
        <Slider {...dskSlideTop} className="full_width text-left dskSlideTop">
          {session_list_data != null && session_list_data.length > 0
            ? session_list_data.map((val, ind) => (
                <div className="text-left dskSlideSessionCard">
                  <div
                    className="full_width radius-6 dskSlideSsnCard_link"
                    style={{ "background-color": val.color }}
                  >
                    <img
                      src={dskSlideSessionBg}
                      className="object_fit_cover dskSlideBgGraphic"
                    />
                    <div className="overlay"></div>
                    <div className="full_width dskSlideIn">
                      <div className="full_width dskSlideTop">
                        <div className="row align-items-center justify-content-between">
                          <div className="colorWhite font_14px font600 dskSessionType">
                            {val.category_image == null ||
                            val.category_image == "" ? null : (
                              <span className="radius-100 dskSessionTypeIcon">
                                <img
                                  src={val.category_image}
                                  className="translate_both"
                                />
                              </span>
                            )}
                            {val.ms_cat_name}
                          </div>

                          <div className="dskSessionTopRight">
                            <div className="dskSessionTime">
                              {val.live_mode !== true ? (
                                <h4 className="colorWhite font_14px font600">
                                  {val.start_datetime} | {val.display_date}
                                </h4>
                              ) : null}
                              {val.live_mode === true ? (
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
                            {deafult_popover_index == ind
                              ? this.sessionCardMenuPopover(val, ind)
                              : null}
                            {deafult_popover_index != ind ? (
                              <div
                                onClick={() => {
                                  this.onMenuClick(ind);
                                }}
                                className="dskDotsMenu dskDotsCircle dskDotsMenuSssnCard popoverExtra"
                              >
                                <span className="dskDotsMenu-dots"></span>
                                <span className="dskDotsMenu-dots"></span>
                                <span className="dskDotsMenu-dots"></span>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="full_width dskSlideSsnBody">
                        <div className="dskSlideSsnBodyLeft">
                          <h3
                            className="font_22px font600 colorWhite dskSlideSsnBodyLeftTtl"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              this.onViewSessionClick(val);
                            }}
                          >
                            {val.session_topic == "" ||
                            val.session_topic == null
                              ? null
                              : val.session_topic}
                          </h3>
                          <div className="clearfix"></div>
                          {/* <div className="full_width dskSlideSsnDoc">
                                                        {(val.session_doctor_entities.length > 0) ?
                                                            val.session_doctor_entities.map((val, ind) => (
                                                                <div className="full_width dskSlideSsnDocRow">
                                                                    <div className="row align-items-center">
                                                                        <div className="radius-6 dskSlideSsnDocPic">
                                                                            <div className="radius-6 dskSlideSsnDocPicBg translate_both"></div>
                                                                            <img src={val.session_doctor_image} alt="Vault" className="object_fit_cover" />
                                                                        </div>
                                                                        <div className="full_width dskSlideSsnDocTtl">
                                                                            <h4 className="colorWhite font_18px font600">{val.session_doctor_name}</h4>
                                                                            <span className="colorWhite font_14px">{val.DepartmentName}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )) : null}
                                                    </div> */}

                          {/* gr */}
                          <div className="row dskGrMstrDocRow dskSlideSsnDocArea">
                            {val.session_doctor_entities.length > 0
                              ? val.session_doctor_entities.map((val, ind) => (
                                  <div className="dskGrMstrDocBox dskGrMstrDocBoxSsn">
                                    <div className="full_width dskGrMstrDocBoxIn">
                                      <div className="row align-items-center">
                                        <div className="radius-100 dskGrMstrDocBoxInPic dskGrMstrDocBoxInPicSsn">
                                          <img
                                            src={val.session_doctor_image}
                                            className="object_fit_cover"
                                          />
                                        </div>
                                        <div className="font_12px colorGrey font400 dskGrMstrDocBoxContent">
                                          <h4 className="font_14px colorBlack font600">
                                            {val.session_doctor_name}
                                          </h4>
                                          <p>{val.DepartmentName}</p>
                                        </div>
                                      </div>
                                      <div className="radius-6 dskGrMstrDocProfile dskGrMstrDocProfileSsn">
                                        <img
                                          src={val.session_doctor_image}
                                          className="object_fit_cover"
                                        />
                                        <div className="overlay"></div>
                                        <div className="full_width font_12px colorWhite font400 dskGrMstrDocProfileTxt">
                                          <h4 className="font_14px colorWhite font600">
                                            {val.session_doctor_name}
                                          </h4>
                                          <p>{val.DepartmentName}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              : null}
                          </div>
                          {/* gr */}
                        </div>
                        <div className="dskSlideSsnBodyRight">
                          {/* {
                           (val.live_mode)? */}
                          <div
                            className="colorWhite font_20px font600 radius-40 dskSlideSsn_a"
                            style={{ "background-color": val.color }}
                            onClick={() => {
                              this.onViewSessionClick(val);
                            }}
                          >
                            <span>
                              Join Now <img src={blackArrow} />
                            </span>
                          </div>
                          {/*:null } */}

                          <div className="clearfix"></div>
                          <Slider
                            {...dskSessionClient}
                            className="dskSessionClient dskSlideSsnClient"
                          >
                            {val.sponsor_logo !== null || val.sponsor_logo == ""
                              ? val.sponsor_logo.split(",").map((val, ind) => (
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
                </div>
              ))
            : null}
        </Slider>
      </section>
    ) : isApiCallDone ? null : (
      <SessionSliderLoader />
    );
  }
}
export default SessionSlider;
