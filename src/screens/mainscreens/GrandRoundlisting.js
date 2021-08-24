import React from "react";
import Loader from "react-loader-spinner";
import { reactLocalStorage } from "reactjs-localstorage";
import $ from "jquery";
import { isMobile } from "react-device-detect";
import Form from "react-bootstrap/Form";
import Header from "./Header";
import Footer from "./Footer";
import Masonry from "react-masonry-component";
import Slider from "react-slick";
import "firebase/storage";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { InlineShareButtons } from "sharethis-reactjs";
import AppConfig from "../config/config.js";
import ads from "../../desktopImages/ads.png";
import critiCare from "../../desktopImages/critiCare.png";
import strathspeyLogo from "../../desktopImages/strathspeyLogo.png";
import clirnetLogo from "../../desktopImages/logo.png";
import angaleWhite from "../../desktopImages/angaleWhite.png";
import ssnTopBgGraphic from "../../desktopImages/ssnTopBgGraphic.png";
import ssnTypeExpressCME from "../../desktopImages/typeExpressCME.png";
import ssnTypeMasterCast from "../../desktopImages/typeMasterCast.png";
import begainArrow from "../../desktopImages/begainArrow.png";
import commentsIcon from "../../desktopImages/comments-black.png";
import likeIcon from "../../desktopImages/like-black.png";
import likeIconActive from "../../desktopImages/like-active.png";
import vaultIcon from "../../desktopImages/vault-black.png";
import vaultIconActive from "../../desktopImages/vault-active.png";
import ShareIcon from "../../desktopImages/share-black.png";
import downloadIcon from "../../desktopImages/downloadWhite.png";
import fileTypeWord from "../../desktopImages/fileTypeWord.png";
import fileTypePdf from "../../desktopImages/fileTypePdf.png";
import Moment from "react-moment";
import { setSpeciality, setDescription } from "../Common/Common.js";
import { ToastsContainer, ToastsStore } from "react-toasts";
import add_plus from "../../images/add_plus.png";
import Banner from "../mainscreens/Banner";
import GrandRoundListLoader from "../LoadingPlaceholders/GrandRoundListLoader.jsx";
import Share from "../Common/Share.jsx";

const gtag = window.gtag;
var pagination_val = 0;
var api_call_pemission = 0;

const popover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">Popover right</Popover.Title>
    <Popover.Content>
      And here's some <strong>amazing</strong> content. It's very engaging.
      right?
    </Popover.Content>
  </Popover>
);

const pageNames = "Grand Rounds";
var var_popover_key = -1;

const masonryOptions = {
  transitionDuration: 0,
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
const url = AppConfig.apiLoc;
var data_medwiki_pegination = 0;
var data_session_pegination = 0;
var data_survey_pegination = 0;
var grandround_data = [];
var prev_comment = [];
var files = [];
var main_data = [];
var grandround_data = [];
var session_data = [];
var extra_val = 0;
var gr_survey_list = [];

var myInterval = "";
var duration_value_top = 0;
class GrandRoundlisting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      is_loader_main: 1,
      is_loader_medwiki: 0,
      is_loader_session: 0,
      is_loader_survey: 0,
      grandround_data: [],
      is_loader: true,
      rerender: false,
      banner_display: false,
    };

    this.display_banner = this.display_banner.bind(this);
  }

  display_banner(datam) {
    this.setState({ banner_display: true });

    //alert(datam)
  }

  componentWillUnmount() {
    api_call_pemission = 0;
    pagination_val = 0;
    $("html, body").css({
      overflow: "auto",
      height: "auto",
    });
    grandround_data = [];

    //reinitiALIZE Scroll
    $(window).unbind("scroll");
    //window.scrollTo(0, 0);
  }

  componentDidMount() {
    window.document.title = "CLIRNET - Grand Rounds Feed";
    gtag("config", AppConfig.gtag_measure_id, {
      page_title: window.document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });

    var that = this;
    $(document).on("click", function (e) {
      //popover dissapear func

      let ggg = $(e.target).parents(".tanar").length;

      if (ggg == 0 && !$(e.target).hasClass("tanar")) {
        var_popover_key = -1;
        that.setState({ rerender: false });
      }
    });
    $(".li_grandround").attr("id", "grandround_cal");
    $(".grandround_mobile").addClass("active");

    $(".grandround_mobile").addClass("active");

    let ttr = this;

    $(window).scroll(function () {
      if (api_call_pemission == 1) {
        ttr.setState({ is_loader: true });

        api_call_pemission = 0;
        pagination_val = pagination_val + 9;

        fetch(url + "gr/listing?from=" + pagination_val + "&to=10", {
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
            if (responseJson.status_code == "200") {
              console.log(responseJson);
              responseJson.data.map((r) => {
                grandround_data.push(r);
              });

              ttr.setState({ grandround_data: grandround_data });

              if (responseJson.data.length > 0) {
                api_call_pemission = 1;
              } else {
                api_call_pemission = 0;
              }

              ttr.setState({ is_loader_main: 0 });
              ttr.setState({ is_loader: false });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });

    fetch(url + "gr/listing?from=" + pagination_val + "&to=9", {
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
        if (responseJson.status_code == "200") {
          responseJson.data.map((r) => {
            grandround_data.push(r);
          });

          this.setState({ grandround_data: grandround_data });

          this.setState({ is_loader_main: 0 });
          this.setState({ is_loader: false });
          api_call_pemission = 1;

          $(".dskGrMstrDocRow").each(function (i) {
            //console.log('in each function'+i+'\n'+$(this).find(".dskGrMstrDocBox").length)
            if (parseInt($(this).find(".dskGrMstrDocBox").length) != 1) {
              $(this).find(".dskGrMstrDocBox").addClass("dskGrMstrDocPopShow");
            } else {
              // alert()
              //console.log("in each else")
              //$(this).children(".dskGrMstrDocBox").removeClass("dskGrMstrDocPopShow");
            }
          });

          setTimeout(function () {
            if (isMobile) {
              $(document).on(
                "click",
                ".dskGrMstrDocPopShow .dskGrMstrDocBoxIn",
                function () {
                  $(".dskGrMstrDocBox").removeClass(
                    "dskGrMstrDocPopShowActive"
                  );
                  $(this).parent().addClass("dskGrMstrDocPopShowActive");
                  $(".dskGrMstrDocProfile")
                    .removeClass("dskGrMstrDocProfileShow")
                    .fadeOut(300);
                  $(this)
                    .find(".dskGrMstrDocProfile")
                    .addClass("dskGrMstrDocProfileShow")
                    .fadeIn(300);
                }
              );
              $(document).on(
                "click",
                ".dskGrMstrDocPopShowActive.dskGrMstrDocPopShow .dskGrMstrDocBoxIn",
                function () {
                  $(this).parent().removeClass("dskGrMstrDocPopShowActive");
                  $(this)
                    .find(".dskGrMstrDocProfile")
                    .removeClass("dskGrMstrDocProfileShow")
                    .fadeOut(300);
                }
              );
            } else {
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
            }
          }, 500);

          $(".dskGrMstrDocRow").each(function (index) {
            let countcir = $(this).find(".dskGrMstrDocProfile").length;

            $(this)
              .find(".dskGrMstrDocBox:nth-child(5)")
              .find(".dskGrMstrDocProfile")
              .remove();

            $(this)
              .find(".dskGrMstrDocBox:nth-child(5)")
              .find(".dskGrMstrDocBoxInPic")
              .append(
                "<div class='overlay'></div><span id='view-master-doctor'  class='dskGrMstrDocCount' style='cursor: default;'>+" +
                  (countcir - 4) +
                  "</span>"
              );
            // this.refresh()
          });

          //let file_data=JSON.parse(this.state.data_main[0].gr_files);

          //alert(this.state.data_main[0].gr_files)
        } else {
          this.props.history.push({
            pathname: `/`,
          });
        }
      })
      .catch((error) => {});

    if (isMobile) {
      var type_id_val = 2;
    } else {
      var type_id_val = 1;
    }
  }

  first_spec(spec) {
    var res = spec.split(",");

    return res[0];
  }

  render_client(logos) {
    if (logos != undefined && logos != "=undefined" && logos != "=null") {
      var reslogo = logos.split(",");

      return (
        <>
          {reslogo.map((rimg, indeximg) => (
            <div className="dskSessionClientItem">
              <img src={rimg} />
            </div>
          ))}
        </>
      );
    }
  }

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
        if (responseJson.data.like != true) {
          grandround_data[array_index].myrating = false;
          grandround_data[array_index].rating =
            parseInt(grandround_data[array_index].rating) - 1;
        } else {
          grandround_data[array_index].myrating = true;
          grandround_data[array_index].rating =
            parseInt(grandround_data[array_index].rating) +
            parseInt(responseJson.data.rating);
        }

        console.log(grandround_data);

        this.setState({ grandround_data: grandround_data });
      })
      .catch((error) => {});
  };

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
        grandround_data[array_index].vault = responseJson.data;

        if (responseJson.data == 0) {
          reactLocalStorage.set(
            " ",
            parseInt(reactLocalStorage.get("@ClirnetStore:vault_count", true)) -
              1
          );
        }

        if (responseJson.data == 1) {
          reactLocalStorage.set(
            "@ClirnetStore:vault_count",
            parseInt(reactLocalStorage.get("@ClirnetStore:vault_count", true)) +
              1
          );
        }

        this.setState({ grandround_data: grandround_data });
      })
      .catch((error) => {});
  };

  popover_view_key(index) {
    var_popover_key = index;
    this.setState({ rerender: !this.state.rerender });

    //$("#overlaydiv_"+index+"").click();

    //$('#element').popover('show');
  }

  popover_view(val, index) {
    return (
      <>
        <div
          className="dskDotsMenu dskDotsCircle dskDotsMenuMedWikiCard"
          data-toggle="popover"
          data-trigger="focus"
        >
          <div>
            <span className="dskDotsMenu-dots"></span>
            <span className="dskDotsMenu-dots"></span>
            <span className="dskDotsMenu-dots"></span>
          </div>
          <Popover
            isOpen={true}
            placement="bottom-end"
            id={"popover-basic-" + index}
            className="dskDotsMenuSettings tanar"
          >
            <Popover.Content>
              <a
                href="javascript:void(0)"
                onClick={() => this.onLikeBtnPress(val.type_id, "gr", index)}
                className={
                  val.myrating == true
                    ? "dskDotsMenuSettingsIcon active"
                    : "dskDotsMenuSettingsIcon"
                }
              >
                <span>
                  <img
                    src={likeIcon}
                    alt="Like"
                    className="translate_both dskGrLeftShareImg"
                  />
                  <img
                    src={likeIconActive}
                    alt="Like"
                    className="translate_both dskGrLeftShareImgActive"
                  />
                </span>
                Like
              </a>

              {val.vault == 0 ? (
                <a
                  href="javascript:void(0)"
                  onClick={() => this.onvaultPress(val.type_id, "gr", index, 1)}
                  className={
                    val.vault == 0
                      ? "dskDotsMenuSettingsIcon "
                      : "dskDotsMenuSettingsIcon active"
                  }
                >
                  <span>
                    <img
                      src={vaultIcon}
                      alt="Vault"
                      className="translate_both dskGrLeftShareImg"
                    />
                    <img
                      src={vaultIconActive}
                      alt="Vault"
                      className="translate_both dskGrLeftShareImgActive"
                    />
                  </span>
                  Vault
                </a>
              ) : (
                <a
                  href="javascript:void(0)"
                  onClick={() => this.onvaultPress(val.type_id, "gr", index, 0)}
                  className={
                    val.vault == 0
                      ? "dskDotsMenuSettingsIcon "
                      : "dskDotsMenuSettingsIcon active"
                  }
                >
                  <span>
                    <img
                      src={vaultIcon}
                      alt="Vault"
                      className="translate_both dskGrLeftShareImg"
                    />
                    <img
                      src={vaultIconActive}
                      alt="Vault"
                      className="translate_both dskGrLeftShareImgActive"
                    />
                  </span>
                  Vault
                </a>
              )}

              <Share
                data={{
                  title: val.title,
                  text: val.description.substring(0, 100) + "...",
                  url: val.deeplink,
                }}
              />

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
                  description: val.description.substring(0, 100) + "...",       // (defaults to og:description or twitter:description)
                  title: val.title,            // (defaults to og:title or twitter:title)
                  message: '',     // (only for email sharing)
                  subject: '',  // (only for email sharing)
                  username: 'Medwiki view' // (only for twitter sharing)
                }}
              /> */}
              {/* <a href="javascript:void(0)" className="dskDotsMenuNotRelevant">
					Not Relevant for me
				</a> */}
            </Popover.Content>
          </Popover>
        </div>
      </>
    );
  }

  popover_view_mob(val, index) {
    return (
      <>
        <div className="mblDotsMenu mblDotsCircle mblDotsMenuGrCard">
          <div>
            <span className="mblDotsMenu-dots"></span>
            <span className="mblDotsMenu-dots"></span>
            <span className="mblDotsMenu-dots"></span>
          </div>
          <Popover
            placement="bottom-end"
            id={"popover-basic" + index}
            className="mblDotsMenuSettings tanar"
          >
            <Popover.Content>
              <a
                href="javascript:void(0)"
                onClick={() => this.onLikeBtnPress(val.type_id, "gr", index)}
                className={
                  val.myrating == true
                    ? "mblDotsMenuSettingsIcon active"
                    : "mblDotsMenuSettingsIcon"
                }
              >
                <span>
                  <img
                    src={likeIcon}
                    alt="Like"
                    className="translate_both mblGrLeftShareImg"
                  />
                  <img
                    src={likeIconActive}
                    alt="Like"
                    className="translate_both mblGrLeftShareImgActive"
                  />
                </span>
                Like
              </a>

              {val.vault == 0 ? (
                <a
                  href="javascript:void(0)"
                  onClick={() => this.onvaultPress(val.type_id, "gr", index, 1)}
                  className={
                    val.vault == 0
                      ? "mblDotsMenuSettingsIcon "
                      : "mblDotsMenuSettingsIcon active"
                  }
                >
                  <span>
                    <img
                      src={vaultIcon}
                      alt="Vault"
                      className="translate_both dskGrLeftShareImg"
                    />
                    <img
                      src={vaultIconActive}
                      alt="Vault"
                      className="translate_both dskGrLeftShareImgActive"
                    />
                  </span>
                  Vault
                </a>
              ) : (
                <a
                  href="javascript:void(0)"
                  onClick={() => this.onvaultPress(val.type_id, "gr", index, 0)}
                  className={
                    val.vault == 0
                      ? "mblDotsMenuSettingsIcon "
                      : "mblDotsMenuSettingsIcon active"
                  }
                >
                  <span>
                    <img
                      src={vaultIcon}
                      alt="Vault"
                      className="translate_both dskGrLeftShareImg"
                    />
                    <img
                      src={vaultIconActive}
                      alt="Vault"
                      className="translate_both dskGrLeftShareImgActive"
                    />
                  </span>
                  Vault
                </a>
              )}

              <Share
                data={{
                  title: val.title,
                  text: val.description.substring(0, 100) + "...",
                  url: val.deeplink,
                }}
              />

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
                description: val.description.substring(0, 100) + "...",       // (defaults to og:description or twitter:description)
              title: val.title,             // (defaults to og:title or twitter:title)
                message: '',     // (only for email sharing)
                subject: '',  // (only for email sharing)
                username: 'Medwiki view' // (only for twitter sharing)
              }}
            /> */}
              {/* <a href="javascript:void(0)" className="mblDotsMenuNotRelevant">
        Not Relevant for me
      </a> */}
            </Popover.Content>
          </Popover>
        </div>
      </>
    );
  }

  popover_view_spec(val) {
    let tempdata;
    if (val) {
      tempdata = val.substring(val.indexOf(",") + 1);
    }
    let popover = (
      <Popover id="popover-basic">
        <Popover.Content className="font_12px specialty_popOver">
          {tempdata ? tempdata.replace(/,/g, ", ") : null}
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

  opensub(data) {
    $(".off").css("display", "none");
    $(".hh_" + data + "").css("display", "block");
  }

  redirectToGrDetail = (id) => {
    if (isMobile) {
      this.props.history.push({
        pathname: "/GrandRoundsMobile/" + id + "",
      });
    } else {
      this.props.history.push({
        pathname: "/GrandRoundsDesktop/" + id + "",
      });
    }
  };

  render() {
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
      cssEase: "linear",
    };
    return (
      <div
        className={
          isMobile == true ? "full_width mblScreen" : "full_width dskScreen"
        }
      >
        <Header history={this.props.history} page_name={pageNames} />
        <div className="full_width dskGr">
          <div className="container mycontainer">
            <div className="row">
              <div className="full_width">
                {/* Ads------------- */}
                <section className="full_width adsArea">
                  <div className="full_width adsFrame">
                    <Banner
                      type_id={0}
                      type={"grlist"}
                      apiresponserecieved={this.display_banner}
                      api_call_detail={1}
                      api_call={0}
                    />

                    {this.state.banner_display == true ? (
                      <Banner
                        type_id={0}
                        banner_position={1}
                        unmount_call={1}
                        type={"grlist"}
                        api_call={1}
                        before_unload_call={1}
                      />
                    ) : null}
                  </div>
                </section>
                {/* Ads------------- */}

                <div className="full_width dskGrListPage">
                  <div className="row">
                    {/* <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={80} width={80} visible={this.state.is_loader} /> */}

                    {isMobile != true ? (
                      <div className="col-sm-12 dskLeft">
                        <section className="full_width text-left dskGrMoreList dskgrMedwikiList">
                          <h4 className="font_24px font400 colorBlack dskGrMoreTtl">
                            Grandrounds{" "}
                            <span className="font_16px">
                              ({this.state.grandround_data.length})
                            </span>
                          </h4>
                          <div className="clearfix"></div>
                          {this.state.grandround_data.length == 0 ? (
                            <Masonry
                              className={"dskMasonryCardArea"} // default ''
                              elementType={"ul"} // default 'div'
                              options={masonryOptions} // default {}
                              disableImagesLoaded={false} // default false
                              updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                              //imagesLoadedOptions={imagesLoadedOptions} // default {}
                            >
                              <GrandRoundListLoader />
                              <GrandRoundListLoader />
                              <GrandRoundListLoader />
                            </Masonry>
                          ) : null}
                          <Masonry
                            className={"dskMasonryCardArea"} // default ''
                            elementType={"ul"} // default 'div'
                            options={masonryOptions} // default {}
                            disableImagesLoaded={false} // default false
                            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                            //imagesLoadedOptions={imagesLoadedOptions} // default {}
                          >
                            {this.state.grandround_data.map((val, ind) => (
                              <div className="col-lg-4 col-md-6 col-12 dskgrCard dskMasonryCard grCard mamama">
                                <div className="full_width radius-6 dskgrCard_link">
                                  <div className="full_width dskgrCardPic">
                                    <div className="full_width dskgrCardTop">
                                      {val.specialities == null ? null : (
                                        <div className="colorBlack font_12px font400 radius-6 bgColorWhite mblMedWikiSpeacality">
                                          {this.first_spec(val.specialities)}
                                          {val.specialities.split(",").length >
                                          1
                                            ? this.popover_view_spec(
                                                val.specialities
                                              )
                                            : null}
                                        </div>
                                      )}
                                      {var_popover_key == ind
                                        ? this.popover_view(val, ind)
                                        : null}
                                      {var_popover_key != ind ? (
                                        <div
                                          onClick={() => {
                                            this.popover_view_key(ind);
                                          }}
                                          data-toggle="popover"
                                          data-trigger="focus"
                                          className={
                                            "dskDotsMenu dskDotsCircle tanar dskDotsMenuMedWikiCard " +
                                            ind +
                                            "_dynamicclass"
                                          }
                                        >
                                          <div>
                                            <span className="dskDotsMenu-dots"></span>
                                            <span className="dskDotsMenu-dots"></span>
                                            <span className="dskDotsMenu-dots"></span>
                                          </div>
                                        </div>
                                      ) : null}
                                    </div>
                                    {val.image == null ||
                                    val.image == "" ? null : (
                                      <img
                                        src={val.image}
                                        className="object_fit_cover"
                                        alt="Grand Rounds"
                                      />
                                    )}
                                    <div className="overlay"></div>
                                  </div>
                                  <div className="full_width dskgrCardBtm">
                                    <div className="full_width dskgrCardBtmIn">
                                      {val.title == null ||
                                      val.title == "" ? null : (
                                        <h3
                                          onClick={() => {
                                            this.redirectToGrDetail(
                                              val.type_id
                                            );
                                          }}
                                          className="font500 colorBlack font_16px dskgrCardTtl pointercursorcss"
                                        >
                                          {val.title}
                                        </h3>
                                      )}
                                      <div className="clearfix"></div>
                                      <div className="full_width colorGrey font_14px dskgrCardDescription">
                                        {val.description == null ||
                                        val.description == "" ? null : (
                                          <p>
                                            {setDescription(val.description)}
                                          </p>
                                        )}
                                      </div>
                                      <div className="full_width dskGrMstrDoc">
                                        {/* <h4 className="font500 fontExo font_16px colorBlack">MasterDoctor</h4> */}
                                        <div className="clearfix"></div>
                                        <div className="row dskGrMstrDocRow">
                                          {val.session_doctor_entities.length >
                                          0
                                            ? val.session_doctor_entities.map(
                                                (val, ind) => (
                                                  <div className="dskGrMstrDocBox">
                                                    <div className="full_width dskGrMstrDocBoxIn">
                                                      <div className="row align-items-center">
                                                        <div className="radius-100 dskGrMstrDocBoxInPic">
                                                          {val.session_doctor_image ==
                                                            null ||
                                                          val.session_doctor_image ==
                                                            "" ? null : (
                                                            <img
                                                              src={
                                                                val.session_doctor_image
                                                              }
                                                              className="object_fit_cover"
                                                            />
                                                          )}
                                                        </div>
                                                        <div className="font_12px colorGrey font400 dskGrMstrDocBoxContent">
                                                          <h4 className="font_14px colorBlack font600">
                                                            {
                                                              val.session_doctor_name
                                                            }
                                                          </h4>
                                                          <p>
                                                            {val.DepartmentName}
                                                          </p>
                                                        </div>
                                                      </div>
                                                      <div className="radius-6 dskGrMstrDocProfile">
                                                        {val.session_doctor_image ==
                                                          null ||
                                                        val.session_doctor_image ==
                                                          "" ? null : (
                                                          <img
                                                            src={
                                                              val.session_doctor_image
                                                            }
                                                            className="object_fit_cover"
                                                          />
                                                        )}
                                                        <div className="overlay"></div>
                                                        <div className="full_width font_12px colorWhite font400 dskGrMstrDocProfileTxt">
                                                          <h4 className="font_14px colorWhite font600">
                                                            {
                                                              val.session_doctor_name
                                                            }
                                                          </h4>
                                                          <p>
                                                            {val.DepartmentName}
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    {}
                                                  </div>
                                                )
                                              )
                                            : null}
                                        </div>
                                      </div>
                                      <div className="full_width dskgrCardFooter">
                                        <div
                                          className="text-uppercase colorWhite font_14px fontExo font400 radius-6 mblSessionbtm_a"
                                          onClick={() => {
                                            this.redirectToGrDetail(
                                              val.type_id
                                            );
                                          }}
                                        >
                                          <span>
                                            View Details{" "}
                                            <img src={angaleWhite} />
                                          </span>
                                        </div>
                                        <Slider
                                          {...dskSessionClient}
                                          className="dskSessionClient dskGrClient"
                                        >
                                          {val.sponsor_logo !== null ||
                                          val.sponsor_logo == ""
                                            ? val.sponsor_logo
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
                              </div>
                            ))}
                          </Masonry>

                          {this.state.is_loader ? (
                            <Masonry
                              className={"dskMasonryCardArea"} // default ''
                              elementType={"ul"} // default 'div'
                              options={masonryOptions} // default {}
                              disableImagesLoaded={false} // default false
                              updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                              //imagesLoadedOptions={imagesLoadedOptions} // default {}
                            >
                              <GrandRoundListLoader />
                              <GrandRoundListLoader />
                              <GrandRoundListLoader />
                            </Masonry>
                          ) : null}

                          {/* <a href="javascript:void(0)" onClick={()=>{ this.remove_class('vanish_class')}} className="text-uppercase colorWhite font_16px fontExo font400 radius-6 mblSessionbtm_a dskGrMoreBtn vanish_class_but">
										<span>View All <img src={angaleWhite} /></span>
									</a> */}
                        </section>

                        {/* Ads------------- */}

                        {/* Ads------------- */}
                      </div>
                    ) : null}

                    {isMobile == true ? (
                      <div className="full_width mblLeft">
                        <section className="full_width text-left mblRecent mblGrList">
                          <h3 className="font700 fontExo colorBlack font_24px mblRecentTtl">
                            Grandrounds{" "}
                            <span className="font_16px">
                              ({this.state.grandround_data.length})
                            </span>
                          </h3>
                          <div className="clearfix"></div>
                          <div className="full_width mblRecentSroll">
                            {this.state.grandround_data.length == 0 ? (
                              <>
                                <GrandRoundListLoader />
                                <GrandRoundListLoader />
                                <GrandRoundListLoader />
                              </>
                            ) : null}

                            {this.state.grandround_data.map((val, ind) => (
                              <div className="mblGrCard mblRecentCard">
                                <div
                                  href="javascript:void(0)"
                                  className="full_width radius-6 mblGrCard_link"
                                >
                                  <div className="full_width mblGrPic">
                                    <div className="overlay"></div>
                                    {val.image == null ||
                                    val.image == "" ? null : (
                                      <img
                                        src={val.image}
                                        className="object_fit_cover"
                                        alt="Grand Rounds"
                                      />
                                    )}

                                    <div className="mblGrCardTop">
                                      <div className="colorBlack font_14px font500 radius-6 mblMedWikiSpeacality">
                                        {this.first_spec(val.specialities)}
                                        {val.specialities.split(",").length > 1
                                          ? this.popover_view_spec(
                                              val.specialities
                                            )
                                          : null}
                                      </div>

                                      {var_popover_key == ind
                                        ? this.popover_view_mob(val, ind)
                                        : null}
                                      {var_popover_key != ind ? (
                                        <div
                                          onClick={() => {
                                            this.popover_view_key(ind);
                                          }}
                                          data-toggle="popover"
                                          data-trigger="focus"
                                          className={
                                            "dskDotsMenu dskDotsCircle tanar dskDotsMenuMedWikiCard " +
                                            ind +
                                            "_dynamicclass"
                                          }
                                        >
                                          <div className="mblDotsMenu mblDotsCircle mblDotsMenuGrCard">
                                            <span className="mblDotsMenu-dots"></span>
                                            <span className="mblDotsMenu-dots"></span>
                                            <span className="mblDotsMenu-dots"></span>
                                          </div>
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>
                                  <div className="full_width mblGrContent">
                                    {val.title == null ||
                                    val.title == "" ? null : (
                                      <h3
                                        onClick={() => {
                                          this.redirectToGrDetail(val.type_id);
                                        }}
                                        className="font500 colorBlack font_18px mblGrContentTtl pointercursorcss"
                                      >
                                        {val.title}
                                      </h3>
                                    )}
                                    <div className="clearfix"></div>
                                    {val.description == null ||
                                    val.description == "" ? null : (
                                      <h5 className="font400 colorGrey font_14px mblGrContentText">
                                        {setDescription(val.description)}...
                                        <a
                                          className="font_14px font600"
                                          href="javascript:void(0);"
                                          onClick={() => {
                                            this.redirectToGrDetail(
                                              val.type_id
                                            );
                                          }}
                                        >
                                          &nbsp; Read More
                                        </a>{" "}
                                      </h5>
                                    )}

                                    <div className="full_width dskGrMstrDoc">
                                      {/* <h4 className="font500 fontExo font_16px colorBlack">MasterDoctor</h4> */}
                                      <div className="clearfix"></div>
                                      <div className="row dskGrMstrDocRow">
                                        <span class="hidden_span">{ind}</span>
                                        {val.session_doctor_entities.length > 0
                                          ? val.session_doctor_entities.map(
                                              (val, ind) => (
                                                <div className="dskGrMstrDocBox">
                                                  <div className="full_width dskGrMstrDocBoxIn">
                                                    <div className="row align-items-center">
                                                      <div className="radius-100 dskGrMstrDocBoxInPic">
                                                        {val.session_doctor_image ==
                                                          null ||
                                                        val.session_doctor_image ==
                                                          "" ? null : (
                                                          <img
                                                            src={
                                                              val.session_doctor_image
                                                            }
                                                            className="object_fit_cover"
                                                          />
                                                        )}
                                                      </div>
                                                      <div className="font_12px colorGrey font400 dskGrMstrDocBoxContent">
                                                        <h4 className="font_14px colorBlack font600">
                                                          {
                                                            val.session_doctor_name
                                                          }
                                                        </h4>
                                                        <p>
                                                          {val.DepartmentName}
                                                        </p>
                                                      </div>
                                                    </div>
                                                    <div className="radius-6 dskGrMstrDocProfile">
                                                      {val.session_doctor_image ==
                                                        null ||
                                                      val.session_doctor_image ==
                                                        "" ? null : (
                                                        <img
                                                          src={
                                                            val.session_doctor_image
                                                          }
                                                          className="object_fit_cover"
                                                        />
                                                      )}
                                                      <div className="overlay"></div>
                                                      <div className="full_width font_12px colorWhite font400 dskGrMstrDocProfileTxt">
                                                        <h4 className="font_14px colorWhite font600">
                                                          {
                                                            val.session_doctor_name
                                                          }
                                                        </h4>
                                                        <p>
                                                          {val.DepartmentName}
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              )
                                            )
                                          : null}
                                      </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <Slider
                                      {...mblGrClient}
                                      className="mblSessionClient mblGrClient"
                                    >
                                      {val.sponsor_logo !== null ||
                                      val.sponsor_logo == ""
                                        ? val.sponsor_logo
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
                            ))}
                          </div>

                          {/* <a href="javascript:void(0)" onClick={()=>{ this.remove_class('vanish_class')}} className="text-uppercase colorWhite font_16px fontExo font400 radius-6 mblSessionbtm_a dskGrMoreBtn vanish_class_but">
										<span>View All <img src={angaleWhite} /></span>
									</a> */}
                        </section>

                        {/* Ads------------- */}

                        {/* Ads------------- */}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastsContainer store={ToastsStore} />
          <Footer history={this.props.history} />
        </div>
      </div>
    );
  }
}

export default GrandRoundlisting;
