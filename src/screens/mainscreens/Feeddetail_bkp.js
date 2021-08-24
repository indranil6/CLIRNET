import React, { Component } from "react";
import Loader from "react-loader-spinner";
import $ from "jquery";
import { reactLocalStorage } from "reactjs-localstorage";
import ReactPlayer from "react-player";
import AppConfig from "../config/config.js";
import Slider from "react-slick";
import { isMobile } from "react-device-detect";
import Header from "../mainscreens/Header";
import Footer from "../mainscreens/Footer";
import ReactHtmlParser from "react-html-parser";
import "react-html5video/dist/styles.css";
import Banner from "../mainscreens/Banner";

import likeBttn from "../../images/feedBttm_icon-1.png";
import vaultBttn from "../../images/feedBttm_icon-2.png";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet";
import Moment from "react-moment";
import Masonry from "react-masonry-component";
import Disclaimer from "../Common/Common.js";
import Medwikicard from "../Cards/Medwikicard";
import FeedDetailLoader from '../LoadingPlaceholders/FeedDetailLoader.jsx';
import RelatedMedwikiLoader from '../LoadingPlaceholders/RelatedMedwikiLoader.jsx';

import PollCard from "../Cards/PollCard.js";

// import HlsPlayer from '../CustomLibrary/HlsPlayer.jsx';
import ShareDetailPage from "../Common/ShareDetailPage.jsx";

const gtag = window.gtag;

let VideoJson = {
  type_id: "",
  artist: "",
  cover: "",
  name: "",
  mainUrl: "", //"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  ad: [],
};

let readyCounter = 0;

const pageNames = "MedWiki";
var selected_medwiki_popover_index = -1;
let disclaimer = "";
var clientLogo = "";
var isSponsored = false;
var prev_compendium = [];
var prev_comment = [];
var main_cont_wirhout_citation = "";
var citation_text_parsed = [];
let related_comp = [];
const url = AppConfig.apiLoc;
var view_more = 0;

var question_no = 0;
var poll_list_data = [];

const masonryOptions = {
  transitionDuration: 0,
};
let  poll_default_index = -1;
class Feeddetail extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
    this.state = {
      phone_no: "",
      err_msg: "",
      otp: "",
      session_listing_upcoming: [],
      session_listing_cme: [],
      viewrefresh: false,
      is_loader: true,
      is_loader_more: false,
      single_data: {},
      query: "",
      image: "",
      upload_url: "",
      banner_display: false,
      firebase_token: "",
      button_disabled: 0,
      file_name_diaplay: "",
      compendium_view: [],
      comments: [],
      related_comp: [],
      rerender: false,
      display: false,
      source: reactLocalStorage.get("@ClirnetStore:source", true),
    };
    this.handle_change = this.handle_change.bind(this);
    this.display_banner = this.display_banner.bind(this);
    this.myRef = React.createRef();
    poll_default_index = -1;
    clientLogo = "";
    isSponsored = false;

    readyCounter = 0;
  }

  refresh = () => {
    this.setState({ display: !this.state.display });
  };

  parseFeedResponseData(response) {
    if (response) {
      let rData = response.data;
      if (rData.con_type === "video") {
        VideoJson.type_id = rData.type_id;
        if (rData.question) {
          VideoJson.name = rData.question.substring(0, 30) + "...";
        } else {
          VideoJson.name = "MedWiki Video";
        }
        VideoJson.artist = rData.client_name;
        console.log("cover" + rData.image);
        if (rData.image) {
          VideoJson.cover = rData.image;
        } else {
          VideoJson.cover =
            "https://www.who.int/images/default-source/departments/epi-win/fitting-masks-video-thumbnail.tmb-549v.png?sfvrsn=2143ad14_2";
        }
        VideoJson.mainUrl = rData.src;
      }
    }
    readyCounter++;
  }

  parseAdsResponseData(response) {
    if (response) {
      let videoAdsArr = [];
      let aData = response.data[0];
      if (aData) {
        videoAdsArr = aData.items;
        if (videoAdsArr.length > 0) {
          videoAdsArr.map((item) => {
            VideoJson.ad.push(item);
          });
        }
      }
    }
    readyCounter++;
    this.setState({ display: !this.state.display });
  }

  generate_first_name(name) {
    if (name != "" && name != null) {
      let firstnamefirst_letter = name.substring(0, 1);

      return firstnamefirst_letter;
    } else {
      return "NA";
    }
  }
  componentDidMount() {
    window.document.title = "CLIRNET - Medwiki Detail";
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

    $(".medwiki_mobile").addClass("active");

    //alert(reactLocalStorage.get('@ClirnetStore:utm_source', true))

    setTimeout(function () {
      $(".feedRow_ans").find("sup").remove();
    }, 1000);

    // Citation Functionality
    $(document).click(function (event) {
      $(".creta").css("background-color", "white");
      if ($(event.target).text() == "[1]") {
        $("html, body").animate(
          {
            scrollTop: $("#cita_1").offset().top,
          },
          200
        );

        $("#cita_1").css("background-color", "yellow");

        setTimeout(function () {
          $("#cita_1").css("background-color", "white");
        }, 2000);
      }
      if ($(event.target).text() == "[2]") {
        $("#cita_2").css("background-color", "yellow");
        $("html, body").animate(
          {
            scrollTop: $("#cita_2").offset().top,
          },
          200
        );

        setTimeout(function () {
          $("#cita_2").css("background-color", "white");
        }, 2000);
      }
      if ($(event.target).text() == "[3]") {
        $("html, body").animate(
          {
            scrollTop: $("#cita_3").offset().top,
          },
          200
        );
        $("#cita_3").css("background-color", "yellow");

        setTimeout(function () {
          $("#cita_3").css("background-color", "white");
        }, 2000);
      }
      if ($(event.target).text() == "[4]") {
        $("html, body").animate(
          {
            scrollTop: $("#cita_4").offset().top,
          },
          200
        );
        $("#cita_4").css("background-color", "yellow");

        setTimeout(function () {
          $("#cita_4").css("background-color", "white");
        }, 2000);
      }
      if ($(event.target).text() == "[5]") {
        $("html, body").animate(
          {
            scrollTop: $("#cita_5").offset().top,
          },
          200
        );
        $("#cita_5").css("background-color", "yellow");

        setTimeout(function () {
          $("#cita_5").css("background-color", "white");
        }, 2000);
      }
      if ($(event.target).text() == "[6]") {
        $("html, body").animate(
          {
            scrollTop: $("#cita_6").offset().top,
          },
          200
        );
        $("#cita_6").css("background-color", "yellow");

        setTimeout(function () {
          $("#cita_6").css("background-color", "white");
        }, 2000);
      }
    });

    related_comp = [];
    prev_comment = [];

    this.load_all_data();
    $(".li_medwiki").attr("id", "medwiki_cal");

    //start rendering from top of the page
  }

  handle_change(index, value, type) {
    if (type == "vault") {
      related_comp[index].vault = value;

      this.setState({ related_comp: related_comp });
    }

    if (type == "like") {
      if (value != true) {
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
  //Load medwiki data
  load_all_data() {
    related_comp = [];
    prev_comment = [];
    var thisobj = this;

    let pageSource = this.state.source;
    if (pageSource == "" || pageSource == undefined) {
      pageSource = "Not detected";
    }
    console.log("page source" + pageSource);

    if (this.props.location.pathname.includes("social")) {
      var extrapop = "";
    } else {
      var extrapop = "";
    }

    var extrautm = "";
    if (
      reactLocalStorage.get("@ClirnetStore:utm_source", "") != "" &&
      reactLocalStorage.get("@ClirnetStore:utm_source", "") != undefined &&
      reactLocalStorage.get("@ClirnetStore:utm_source", "") != null
    ) {
      extrautm =
        "&utm_source=" +
        reactLocalStorage.get("@ClirnetStore:utm_source", "") +
        "";
    }
    fetch(
      url +
        "knwlg/feedDetail?type_id=" +
        this.props.match.params.id +
        "&type=comp" +
        extrapop +
        "&source=" +
        pageSource +
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
        }

        this.parseFeedResponseData(responseJson);
        disclaimer = responseJson.data.disclaimer;

        prev_compendium[0] = responseJson.data;

        if (responseJson.data.answer.indexOf("Citation") != -1) {
          var citation_text_parsed_temp =
            responseJson.data.answer.split("Citation");

          citation_text_parsed = citation_text_parsed_temp[1].split("^");

          main_cont_wirhout_citation = citation_text_parsed_temp[0];
        } else {
          citation_text_parsed = [];
          main_cont_wirhout_citation = responseJson.data.answer;
        }

        ////////////////////---Added by sumit---/////////////////////////
        poll_list_data = [];
        poll_list_data = prev_compendium[0].survey;

        if (poll_list_data.length != 0) {
          poll_list_data.map((r) => {
            if (r.survey_id != null && r.json_data != false) {
              if (
                r.sponsor_logo == null ||
                r.sponsor_logo === "null" ||
                r.sponsor_logo == ""
              ) {
                clientLogo = r.client_logo;
              } else {
                isSponsored = true;
                clientLogo = r.sponsor_logo;
              }
              poll_list_data = prev_compendium[0].survey;
            } else {
              poll_list_data = [];
            }
          });
        }
        ////////////////////////////////////////////
        this.setState({ compendium_view: prev_compendium });
        this.setState({ is_loader: false });

        //Generate Comment data
        fetch(
          url +
            "knwlg/nested_comment?type_id=" +
            prev_compendium[0].type_id +
            "&type=" +
            prev_compendium[0].type +
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
          .then((responseJsoncom) => {
            var final_comment = JSON.parse(responseJsoncom.data);

            final_comment.map((r) => {
              prev_comment.push(r);
            });

            this.setState({ comments: prev_comment });
          })
          .catch((error) => {});

        if (isMobile) {
          var type_id_val = 2;
        } else {
          var type_id_val = 1;
        }

        var speccs = prev_compendium[0].type_id;
        related_comp = [];
        //Related Compendium
        fetch(
          url +
            "knwlg/related?type=comp&speciality=" +
            speccs +
            "&type_id=" +
            prev_compendium[0].type_id +
            "&from=" +
            view_more +
            "&to=5",
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
      })
      .catch((error) => {});
  }

  componentWillUnmount() {
    $("html, body").css({
      overflow: "auto",
      height: "auto",
    });
    view_more = 4;
    selected_medwiki_popover_index = -1;
  }

  //Like Unlike Function
  onLikeBtnPress = (item_id, type, array_index) => {
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
          prev_compendium[array_index].myrating = false;
          prev_compendium[array_index].rating =
          parseInt(prev_compendium[array_index].rating) - 1;
        } else {
          prev_compendium[array_index].myrating = true;
          prev_compendium[array_index].rating =
          parseInt(prev_compendium[array_index].rating) +
          parseInt(responseJson.data.rating);
        }

        this.setState({ compendium_view: prev_compendium });
      })
      .catch((error) => {});
  };

  //compendium detail from related section
  redirect_to_compendium_detail(id) {
    console.log("clicked");
    reactLocalStorage.set("@ClirnetStore:source", "FeedDetails Page");
    this.props.history.push({
      pathname: "/Feeddetailrelated/" + id + "",
    });
  }

  redirect_to_feed_demo() {
    console.log("clicked");
    this.props.history.push({
      pathname: "/FeedDemo/",
    });
  }

  //Vault Press Function
  onvaultPress = (item_id, type, array_index, flag) => {
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
        prev_compendium[array_index].vault = responseJson.data;

        if (flag == 0) {
          reactLocalStorage.set(
            "@ClirnetStore:vault_count",
            parseInt(reactLocalStorage.get("@ClirnetStore:vault_count", true)) +
              1
          );
        }

        if (flag == 1) {
          reactLocalStorage.set(
            "@ClirnetStore:vault_count",
            parseInt(reactLocalStorage.get("@ClirnetStore:vault_count", true)) -
              1
          );
        }

        this.setState({ compendium_view: prev_compendium });
      })
      .catch((error) => {});
  };

  //Open Subcomment Section
  opensub(data) {
    $(".off").css("display", "none");
    $(".hh_" + data + "").css("display", "block");
  }
  //Comment Reply Submission
  submitreply(type_id, type, index, parent_comment) {
    let commentsub = $(".reply_text_" + index + "").val();

    if (commentsub != "") {
      let thisobj = this;
      let parser = {
        type_id: type_id,
        type: type,
        parent_id: parent_comment,
        comment: commentsub,
      };
      fetch(url + "knwlg/nested_save_comment", {
        method: "POST",
        headers: {
          Authorization: reactLocalStorage.get(
            "@ClirnetStore:refreshToken",
            true
          ),
          version: "rjsw 1.1.1",
        },
        body: JSON.stringify(parser),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status_code == "200") {
            $(".reply_text_" + index + "").val("");
            this.load_all_data();
          } else {
          }
        })
        .catch((error) => {});
    }
  }

  //Comment Submission
  submitcomment(type_id, type, index, parent_comment) {
    let commentsub = $(".main_comment").val();

    if (commentsub != "") {
      let thisobj = this;
      let parser = {
        type_id: type_id,
        type: type,
        parent_id: 0,
        comment: commentsub,
      };
      fetch(url + "knwlg/nested_save_comment", {
        method: "POST",
        headers: {
          Authorization: reactLocalStorage.get(
            "@ClirnetStore:refreshToken",
            true
          ),
          version: "rjsw 1.1.1",
        },
        body: JSON.stringify(parser),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status_code == "200") {
            $(".main_comment").val("");
            this.load_all_data();
          } else {
          }
        })
        .catch((error) => {});
    }
  }

  pointTextValidation(point) {
    if (point <= 1) {
      return " Point";
    } else {
      return " Points";
    }
  }

  onMenuClick(ind) {
   poll_default_index = ind;
  this.refresh();
  }

  renderPolls = () => {
    return (
      <>
        {poll_list_data.length > 0 ? (
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
                {poll_list_data.map((val, ind) =>
                   <PollCard
                   data={val}
                   status="new"
                   array_index={ind}
                   menu_click={this.onMenuClick.bind(this, ind)}
                   deafult_popover_index={poll_default_index}
                 />
                )}
              </Masonry>
            </>
          </div>
        ) : null}
      </>
    );
  };
  view_more_func() {
    view_more = view_more + 5;
    var speccs = prev_compendium[0].type_id;
    fetch(
      url +
        "knwlg/related?type=comp&speciality=" +
        speccs +
        "&type_id=" +
        prev_compendium[0].type_id +
        "&from=" +
        view_more +
        "&to=5",
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

        if (responseJson.data.length == 0) {
          $(".relatedButtns").remove();
        }

        this.setState({ related_comp: related_comp });
      });

    this.setState({ rerender: !this.state.rerender });
  }

 

  display_banner(datam) {
    this.setState({ banner_display: true });

    //alert(datam)
  }



  render() {
    var that = this;
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
        {this.state.compendium_view.map((r, index) => (
          <Helmet>
            <meta
              property="og:url"
              content={
                "https://doctor.clirnet.com/services/#/share/medwiki/" +
                r.type_id
              }
            />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={r.question} />
            <meta property="og:description" content={r.answer.substr(0, 100)} />
            <meta property="og:image" content={r.image} />
            <meta property="og:image:secure_url" content={r.image} />
            <meta name="twitter:image" content={r.image} />
            <meta
              name="twitter:title"
              content={r.question + "|  CLIRNet eConnect  | Powered by CLIRNet"}
            />
            <meta name="twitter:card" content="summary_large_image" />
          </Helmet>
        ))}
        <Header history={this.props.history} page_name={pageNames} />
        <section className="full_width body_area">
          <div className="container">
            <Banner
              type_id={this.id}
              type={"comp"}
              apiresponserecieved={this.display_banner}
              api_call_detail={1}
              api_call={0}
            />
            {this.state.banner_display ? (
              <Banner
                type_id={this.id}
                banner_position={1}
                unmount_call={1}
                type={"comp"}
                api_call={1}
                before_unload_call={1}
              />
            ) : null}
            <section
              className="full_width medWiki"
              id="maincont"
              ref={this.myRef}
            >
              {/* <Loader
                className="loader_cmn"
                type="ThreeDots"
                color="#355ed3"
                height={80}
                width={80}
                visible={this.state.is_loader}
              /> */}
              {(this.state.compendium_view.length==0)?
                <div className="medWikiLeft"><FeedDetailLoader/><br></br><FeedDetailLoader/></div>:null}
              {this.state.compendium_view.map((r, index) => (
                <div className="medWikiLeft">
                  <div className="full_width radius-6 feedRow">
                    <div className="col justify-content-between feedRowTop">
                      <div className="row">
                        <div className="col">
                          {/* <span class="font_14px radius-6 font600 colorBlue feedRow_speciality"><marquee>{r.specialities}</marquee></span> */}
                          {/* <span class="font_14px font600 colorBlack feedRow_date ssnDtl_dateDesk">{r.date}</span> */}
                        </div>
                        <div className="col-auto">
                          {r.sponsor_logo != "" &&
                          r.sponsor_logo != undefined &&
                          r.sponsor_logo != null ? (
                            <div
                              href="javascript:void(0);"
                              className=" feedRow_sponsors"
                            >
                              {/* <span className="font_10px font500 colorBlack">Powered by</span> */}
                              {r.sponsor_logo.split(",").length == 1 ? (
                                <img
                                  src={r.sponsor_logo.split(",")[0]}
                                  width="224"
                                  height="63"
                                  alt="logo"
                                />
                              ) : (
                                <Slider
                                  {...dskSessionClient}
                                  className="dskSessionClient mblMedWikiClient"
                                >
                                  {r.sponsor_logo.split(",").map((val, ind) => (
                                    <div className="dskSessionClientItem">
                                      <img src={val} />
                                    </div>
                                  ))}
                                </Slider>
                              )}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    {/* <span class="font_14px font600 feedRow_date ssnDtl_dateRes">{r.date}</span> */}
                    <div className="full_width feedRow_ttl">
                      {r.specialities != null ? (
                        <div className="full_width">
                          <span class="font_14px radius-6 font600 colorBlue feedRow_speciality">
                            {r.specialities.replace(/,/g, ", ")}
                          </span>
                        </div>
                      ) : null}
                      <p class="highlightyellow1 font_18px colorBlack font600">
                        {r.question}
                      </p>
                    </div>
                    {r.image != "" &&
                    r.con_type == "text" &&
                    r.con_type != undefined ? (
                      <div class="full_width feedRow_IMg">
                        <img className="object_fit_cover" src={r.image} />
                        <div className="overlay"></div>
                      </div>
                    ) : null}
                    {r.con_type == "video" &&
                    r.vendor == "flow" &&
                    r.con_type != undefined &&
                    r.vendor != undefined ? (
                      <div class="full_width feedRow_Pic">
                        {/* <HlsPlayer data={VideoJson} />    */}
                        <video
                          playsInline
                          loop="true"
                          autoplay="autoplay"
                          controls="true"
                        >
                          <source id="video_top" src={r.src} type="video/mp4" />
                        </video>
                        {/* <ReactFlowPlayer
  playerInitScript="http://releases.flowplayer.org/7.2.1/flowplayer.min.js"
  playerId="reactFlowPlayer"
  sources={[
    {
      type: "video/mp4",
      src: r.src
    }
  ]}
  customButton={[
    {
      component: <a id="custom-btn">Custom React Component</a>,
      class: "fp-controls > .fp-volume",
      id: "custom-btn",
      place: "before"
    }
  ]}
/> */}
                      </div>
                    ) : null}

                    {r.con_type == "video" &&
                    r.vendor != "flow" &&
                    r.con_type != undefined &&
                    r.vendor != undefined ? (
                      <div class="full_width feedRow_Pic">
                        {/* <HlsPlayer data={VideoJson} />     */}
                        <ReactPlayer
                          playing={true}
                          controls={true}
                          url={r.src}
                          width="100%"
                        />
                      </div>
                    ) : null}
                    <div class="full_width font_16px feedRow_ans">
                      {}
                      {/* <p>{ReactHtmlParser(main_cont_wirhout_citation)}</p> */}
                      <p>{ReactHtmlParser(r.answer_htm)}</p>
                      {/* {(citation_text_parsed.length>0)?
                        <p class="font_18px colorBlack font600" >Citation(s) </p>:null}
                        {citation_text_parsed.map((rcit, indexs) => (
                          <div>
                            {(indexs > 0) ?
                              <p className="creta" id={"cita_" + indexs}>{indexs}: {rcit}</p> : null}
                          </div>
                        ))} */}
                    </div>
                    <div className="full_width feed_footer">
                      <div className="row d-flex align-items-center">
                        {r.myrating == true ? (
                          <a
                            className="feedFter_left active"
                            onClick={() =>
                              this.onLikeBtnPress(r.type_id, r.type, index)
                            }
                            href="javascript:void(0);"
                          >
                            <img src={likeBttn} />
                            <span>{r.rating}</span>
                          </a>
                        ) : (
                          <a
                            className="feedFter_left"
                            onClick={() =>
                              this.onLikeBtnPress(r.type_id, r.type, index)
                            }
                            href="javascript:void(0);"
                          >
                            <img src={likeBttn} />
                            <span>{r.rating}</span>
                          </a>
                        )}
                        {r.vault == 0 ? (
                          <a
                            className="feedFter_left"
                            onClick={() =>
                              this.onvaultPress(r.type_id, r.type, index, 0)
                            }
                            href="javascript:void(0);"
                          >
                            <img src={vaultBttn} />
                          </a>
                        ) : (
                          <a
                            className="feedFter_left active"
                            onClick={() =>
                              this.onvaultPress(r.type_id, r.type, index, 1)
                            }
                            href="javascript:void(0);"
                          >
                            <img src={vaultBttn} />
                          </a>
                        )}

                        {/* <a className="feedFter_left" href="javascript:void(0);"><img src={shareBttn}/></a> */}
                        {/* <a className="feedFter_left" href="javascript:void(0);"><img src={cmmntBttn} /><span>{r.comment_count}</span></a> */}

                        <ShareDetailPage
                          data={{
                            title: r.question,
                            text: r.answer,
                            url: r.deeplink,
                          }}
                        />
                      </div>
                    </div>

                    {this.state.comments.length > 0 ? (
                      <div className="full_width feedcommentsArea">
                        <>
                          {this.props.match.params.id == "6268" ||
                          this.props.match.params.id == 6268 ? (
                            <div className="full_width mb-3 ssn_p_BoxTop">
                              <span class="font_12px radius-6 font600 colorBlue feed_right_SsnBoxLive">
                                Live chat
                              </span>
                            </div>
                          ) : null}
                        </>
                        {this.state.comments.map((r, index) => (
                          <div className="full_width feedcommentsRow">
                            <div className="radius-100 feedcommentsPic">
                              {r.images != "" &&
                              r.images != "null" &&
                              r.images != null ? (
                                <img
                                  className="object_fit_cover"
                                  src={r.images}
                                />
                              ) : (
                                <h5 className="font600 colorBlack font_30px text-uppercase translate_both header_profile_ttl">
                                  {this.generate_first_name(r.first_name)}
                                </h5>
                              )}
                            </div>
                            <h5 className="font_16px font600 colorBlack feedcommentsBy">
                              Dr. {r.last_name}
                            </h5>
                            <p>{r.body}</p>
                            <h6 className="font_14px font600 feedcommentsByBtm">
                              {/* <span>
                                <Moment format="MMMM Do YYYY">
                                  {r.created_at}
                                </Moment>
                              </span> */}
                              <a
                                href="javascript:void(0)"
                                onClick={() => {
                                  this.opensub(index);
                                }}
                                className="colorBlack append_divv"
                              >
                                {r.children.length > 0 ? (
                                  <span>{r.children.length}</span>
                                ) : null}{" "}
                                Reply
                              </a>
                            </h6>
                            {/* <h6 className="font_14px font600 feedcommentsByBtm"><span>{r.created_at}</span> <a href="javascript:void(0)" onClick={() => { this.opensub(index); }} className="colorBlack append_divv">{(r.children.length > 0) ? <span>{r.children.length}</span> : null} Reply</a></h6> */}
                            <div
                              className={"hh_" + index + " " + "off"}
                              style={{ display: "none" }}
                            >
                              {r.children.map((rchild, index) => (
                                <div className="full_width feedcommentsRowReply">
                                  <div className="full_width feedcommentsRow">
                                    <div className="radius-100 feedcommentsPic">
                                      {rchild.images != "" &&
                                      rchild.images != "null" &&
                                      rchild.images != null ? (
                                        <img
                                          className="object_fit_cover"
                                          src={rchild.images}
                                        />
                                      ) : (
                                        <h5 className="font600 colorBlack font_30px text-uppercase translate_both header_profile_ttl">
                                          {this.generate_first_name(
                                            r.first_name
                                          )}
                                        </h5>
                                      )}
                                    </div>
                                    <h5 className="font_16px font600 colorBlack feedcommentsBy">
                                      Dr. {rchild.last_name}
                                    </h5>
                                    <p>{rchild.body}</p>
                                    <h6 className="font_14px font600 feedcommentsByBtm">
                                      <span>
                                        <Moment format="MMMM Do YYYY">
                                          {rchild.created_at}
                                        </Moment>
                                      </span>
                                    </h6>
                                  </div>
                                </div>
                              ))}

                              <div className="full_width feedDtls_comment_frm">
                                <Form.Control
                                  className={
                                    "font_14px" +
                                    "font500 radius-6 feedfooterComment reply_text_" +
                                    index
                                  }
                                  type="text"
                                  placeholder="Write a reply here"
                                />
                                <Form.Control
                                  type="submit"
                                  value="Submit"
                                  onClick={() =>
                                    this.submitreply(
                                      r.type_id,
                                      r.type,
                                      index,
                                      r.commentId
                                    )
                                  }
                                  className="bgColorGreen colorWhite font600 feedDtls_commentSubmit"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    <div className="full_width feedDtls_comment">
                      {/* {(this.props.match.params.id == '6268' || this.props.match.params.id == 6268)?
                        <div className="full_width feedDtls_comment_frm">
                          <Form.Control className="font_14px font500 radius-6 feedfooterComment main_comment" type="text" placeholder={(reactLocalStorage.get('@ClirnetStore:first_name', true) == true)?"Write a comment here":"Chat publically as "+ reactLocalStorage.get('@ClirnetStore:first_name', true)+' ...'} />
                          <Form.Control type="submit" onClick={() => this.submitcomment(r.type_id, r.type, 0, 0)} value="Send" className="bgColorGreen colorWhite font600 feedDtls_commentSubmit" />
                        </div>: */}
                      <div className="full_width feedDtls_comment_frm">
                        <Form.Control
                          className="font_14px font500 radius-6 feedfooterComment main_comment"
                          type="text"
                          placeholder="Write a comment here"
                        />
                        <Form.Control
                          type="submit"
                          onClick={() =>
                            this.submitcomment(r.type_id, r.type, 0, 0)
                          }
                          value="Submit"
                          className="bgColorGreen colorWhite font600 feedDtls_commentSubmit"
                        />
                      </div>
                      {/* } */}
                    </div>
                  </div>
                  {/* //////////////////////Added by sumit//////////////////////// */}
                  {poll_list_data.length == 0 ? null : this.renderPolls()}
                  {/* ////////////////////////////////////////////////// */}

                  <Disclaimer val={disclaimer}></Disclaimer>
                </div>
              ))}

              <div className="feed_right_2">
                {isMobile ? null : (
                  <>
                    {this.state.banner_display ? (
                      <Banner
                        type_id={this.id}
                        banner_position={3}
                        unmount_call={0}
                        type={"comp"}
                        api_call={1}
                        before_unload_call={0}
                      />
                    ) : null}
                  </>
                )}
      
                <div class="clearfix"></div>
                {(this.state.related_comp.length == 0)?
                <div class="full_width radius-6 text-left specialty_comp_right">
                <h2 class="bgColorBlue font600 colorWhite font600 font_20px specialtyTtl">
                  Related
                </h2>

                <div class="clearfix"></div>
                <div class="full_width font600 specialty_comp_right_text">
                <RelatedMedwikiLoader/><RelatedMedwikiLoader/><RelatedMedwikiLoader/><RelatedMedwikiLoader/><RelatedMedwikiLoader/>
                </div>
                </div>
                :null}
                {this.state.related_comp.length > 0 ? (
                  <div class="full_width radius-6 text-left specialty_comp_right">
                    <h2 class="bgColorBlue font600 colorWhite font600 font_20px specialtyTtl">
                      Related
                    </h2>

                    <div class="clearfix"></div>
                    {this.state.related_comp.length > 0 ? (
                      <div class="full_width font600 specialty_comp_right_text">
                        {this.state.related_comp.map((r, indexw) => (
                          <Medwikicard
                            onChangeButton={this.handle_change}
                            history={this.props.history}
                            mobile_device={isMobile}
                            card_data={r}
                            clicked_index={selected_medwiki_popover_index}
                            elem_key={indexw}
                            custom_class="dskTrendingMedwikiCard feeddetail_related"
                          />
                        ))}
                        <div className="clearfix"></div>
                        <div className="col relatedButtns">
                          <div
                            className="text-uppercase text-center colorWhite font_14px fontExo font400 radius-6 mblSessionbtm_a"
                            onClick={() => {
                              this.view_more_func();
                            }}
                          >
                            <span>View More</span>
                          </div>
                        </div>
                      </div>
                    ) : // <div className="col">
                    //   <div class="full_width font600 specialty_comp_right_text"><div className="full_width alert alert-danger">
                    //     <strong>No Matches</strong>
                    //   </div></div></div>
                    null}
                    <div class="clearfix"></div>
                  </div>
                ) : null}
                {isMobile ? null : (
                  <>
                    {this.state.banner_display ? (
                      <Banner
                        type_id={this.id}
                        banner_position={4}
                        unmount_call={0}
                        type={"comp"}
                        api_call={1}
                        before_unload_call={0}
                      />
                    ) : null}
                  </>
                )}
              </div>
            </section>
            {this.state.banner_display ? (
              <Banner
                type_id={this.id}
                banner_position={2}
                unmount_call={0}
                type={"comp"}
                api_call={1}
                before_unload_call={0}
              />
            ) : null}

            {/* /////////////////////////////Disclaimer//////////////////////////////// */}

            {/* //////////////////////////////////////////////////////////////////////// */}
          </div>
        </section>

        <Footer history={this.props.history} />
      </div>
    );
  }
}

export default Feeddetail;
