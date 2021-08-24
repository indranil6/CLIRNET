import React from "react";
import Slider from "react-slick";
import angaleWhite from "../../desktopImages/angaleWhite.png";
import critiCare from "../../desktopImages/critiCare.png";
import strathspeyLogo from "../../desktopImages/strathspeyLogo.png";
import AppConfig from "../config/config.js";
import $ from "jquery";
import { reactLocalStorage } from "reactjs-localstorage";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { ToastsContainer, ToastsStore } from "react-toasts";
import {
  setSpeciality,
  setDescription,
  specialityPopOver,
} from "../Common/Common.js";
import Modal from "react-bootstrap/Modal";
import announcementClose from "../../mobImages/announcementClose.png";
import { isMobile } from "react-device-detect";
import { InlineShareButtons } from "sharethis-reactjs";
import likeIcon from "../../desktopImages/like-black.png";
import likeIconActive from "../../desktopImages/like-active.png";
import vaultIcon from "../../desktopImages/vault-black.png";
import vaultIconActive from "../../desktopImages/vault-active.png";
import Share from "../Common/Share.jsx";
import TrandingGrLoader from "../LoadingPlaceholders/TrandingGrLoader";

const url = AppConfig.apiLoc;
var trending_gr_list_data = [];
var slider_active_elements = [];
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
  cssEase: "linear",
};

var trandingGrSlider;
let popupShow = false;
let isApiCallDone = false;
class TrendingGrandRound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      modal_show: false,
      trending_gr_list_data: [],
    };
    isApiCallDone = false;
    trending_gr_list_data = [];
    popupShow = false;
  }

  refresh = () => {
    this.setState({ display: !this.state.display });
  };

  onClickDetail() {
    popupShow = true;
    this.setState({ modal_show: true });
  }
  componentDidMount() {
    //dskGrMstrDocBox dskGrMstrDocPopShow
    let temp = this;
    trending_gr_list_data = [];
    this.getTrendingGrData(0);

    $(document).on("click", function (e) {
      //popover dissapear func
      let ggg = $(e.target).parents(".popoverExtra").length;
      if (ggg == 0 && !$(e.target).hasClass("popoverExtra")) {
        deafult_popover_index = -1;
        temp.refresh();
      }
    });
  }

  componentWillMount() {
    this.setState({ trending_gr_list_data: [] });
  }

  setJqueryOnCard(length) {
    let count = 0;
    if (length > 0) {
      count = length - 4;
    }
    $(".dskGrMstrDocRow").each(function (i) {
      // console.log('in each function'+i+'\n'+$(this).find(".dskGrMstrDocBox").length)
      if (parseInt($(this).find(".dskGrMstrDocBox").length) != 1) {
        $(this).find(".dskGrMstrDocBox").addClass("dskGrMstrDocPopShow");
      } else {
        $(this).find(".dskGrMstrDocBox").removeClass("dskGrMstrDocPopShow");
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
    });

    var that = this;
    $(".plus_icon").click(function () {
      let key_element = parseInt(
        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .find(".hidden_span")
          .text()
      );
      slider_active_elements.map(
        (val, ind) => (slider_active_elements[ind] = false)
      );
      slider_active_elements[key_element] = true;
      // that.refresh()
    });
  }

  renderDoctorMasterModal(doctors, visiblity) {
    return (
      <>
        <Modal
          className="in dskMasterDoctorPop"
          centered="true"
          animation="slide"
          show={visiblity}
          onHide={() => {
            popupShow = true;
          }}
        >
          <Modal.Header className="align-items-center justify-content-between">
            <Modal.Title className="font600 font_20px colorBlack">
              Master Doctors
            </Modal.Title>
            <a
              href="javascript:void(0)"
              className="radius-100 popClose"
              variant="secondary"
              onClick={() => {
                this.setState({ showModal_doc: false });
              }}
            >
              <img src={announcementClose} className="translate_both" />
            </a>
          </Modal.Header>
          <Modal.Body>
            {doctors.map((val) => (
              <div className="text-left dskGrMstrDocBox">
                <div className="full_width dskGrMstrDocBoxIn">
                  <div className="row align-items-center">
                    <div className="radius-100 dskGrMstrDocBoxInPic">
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
                  <div className="radius-6 dskGrMstrDocProfile">
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
            ))}
          </Modal.Body>
        </Modal>
      </>
    );
  }
  onViewDoctorSpanClick() {
    console.log("clicked");
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
  getTrendingGrData = (fetch_from) => {
    fetch(url + "dashboard/trending?from=" + fetch_from + "&to=10&type=gr", {
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
        isApiCallDone = true;
        let status_code = responseJson.status_code;
        let temp = this;
        if (status_code == 200) {
          let responseData = responseJson.data;
          trending_gr_list_data = responseData;
          // this.setState({ "trending_gr_list_data": trending_gr_list_data });
          this.refresh();
          setTimeout(function () {
            temp.setJqueryOnCard(trending_gr_list_data.length);
          }, 300);
          setTimeout(function () {
            trending_gr_list_data.map((val, ind) =>
              slider_active_elements.push(false)
            );
          }, 500);
        }
      })
      .catch((error) => {
        isApiCallDone = true;
        this.refresh();
        console.log("Error" + error);
      });
  };

  onMenuClick(ind) {
    deafult_popover_index = ind;
    this.refresh();
  }

  onvaultPress = (item_id, type, array_index) => {
    //console.log("on vault press"+item_id+'\n'+type)
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
        // console.log("vault count before"+reactLocalStorage.get('@ClirnetStore:vault_count', true))
        if (responseJson.data == 1) {
          trending_gr_list_data[array_index].vault = responseJson.data;
          reactLocalStorage.set(
            "@ClirnetStore:vault_count",
            parseInt(reactLocalStorage.get("@ClirnetStore:vault_count", 0)) + 1
          );
        } else {
          trending_gr_list_data[array_index].vault = responseJson.data;
          reactLocalStorage.set(
            "@ClirnetStore:vault_count",
            parseInt(reactLocalStorage.get("@ClirnetStore:vault_count", 0)) - 1
          );
        }
        this.props.callbackReciver();
        // console.log("vault count after"+reactLocalStorage.get('@ClirnetStore:vault_count', true))
        // this.refresh();
      })
      .catch((error) => {});
  };

  onLikeBtnPress = (item_id, type, arr_index) => {
    // console.log("like btn")
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
        if (responseJson.status_code == 200) {
          if (responseJson.data.like) {
            trending_gr_list_data[arr_index].rating = responseJson.data.rating;
            trending_gr_list_data[arr_index].myrating = true;
          } else {
            trending_gr_list_data[arr_index].rating = responseJson.data.rating;
            trending_gr_list_data[arr_index].myrating = false;
          }
        }
        this.refresh();
      })
      .catch((error) => {});
  };

  grCardMenuPopover = (val, array_index) => {
    return (
      <div
        className="dskDotsMenu dskDotsCircle mblDotsMenuMedWikiCard"
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
            <a
              href="javascript:void(0)"
              className={
                val.myrating == true
                  ? "dskDotsMenuSettingsIcon active"
                  : "dskDotsMenuSettingsIcon"
              }
              onClick={() =>
                this.onLikeBtnPress(val.type_id, "gr", array_index)
              }
            >
              <span>
                {val.myrating == true ? (
                  <img
                    src={likeIconActive}
                    alt="Like"
                    className="translate_both dskGrLeftShareImgActive"
                  />
                ) : (
                  <img
                    src={likeIcon}
                    alt="Like"
                    className="translate_both dskGrLeftShareImg"
                  />
                )}
              </span>
              Like
            </a>
            <a
              href="javascript:void(0)"
              className={
                val.vault == 0
                  ? "dskDotsMenuSettingsIcon "
                  : "dskDotsMenuSettingsIcon active"
              }
              onClick={() => this.onvaultPress(val.type_id, "gr", array_index)}
            >
              <span>
                {val.vault == 0 ? (
                  <img
                    src={vaultIcon}
                    alt="Vault"
                    className="translate_both dskGrLeftShareImg"
                  />
                ) : (
                  <img
                    src={vaultIconActive}
                    alt="Vault"
                    className="translate_both dskGrLeftShareImgActive"
                  />
                )}
              </span>
              Vault
            </a>
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
                description: val.title,       // (defaults to og:description or twitter:description)
                title: val.title,            // (defaults to og:title or twitter:title)
                message: '',     // (only for email sharing)
                subject: '',  // (only for email sharing)
                username: 'GrandRound view' // (only for twitter sharing)
              }} /> */}
            {/* <a href="javascript:void(0)" className="dskDotsMenuNotRelevant">
                Not Relevant for me
            </a> */}
            <Share
              customClass="dskCphTtlExtra"
              data={{
                title: val.title,
                text: val.description,
                url: val.deeplink,
              }}
            />
          </Popover.Content>
        </Popover>
      </div>
    );
  };

  render() {
    trandingGrSlider = {
      dots: true,
      infinite: true,
      speed: 300,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      afterChange: () => {
        if (deafult_popover_index != -1) {
          deafult_popover_index = -1;
          this.refresh();
        }
      },
    };

    return (
      <>
        {" "}
        {trending_gr_list_data != null && trending_gr_list_data.length > 0 ? (
          <div className="col-sm-6 dskTrandingGrandRounds">
            {trending_gr_list_data != null &&
            trending_gr_list_data.length > 0 ? (
              <h3 className="font_18px fontExo colorBlack font600 text-uppercase">
                Trending Grand Rounds
              </h3>
            ) : null}
            <div className="clearfix"></div>
            <Slider
              {...trandingGrSlider}
              className="full_width dskTrandingGrSlider"
            >
              {trending_gr_list_data != null && trending_gr_list_data.length > 0
                ? trending_gr_list_data.map((val, ind) => (
                    <div className="dskgrCard grCard mamama">
                      {/* <Modal className="in dskMasterDoctorPop" centered="true" animation="slide" show={slider_active_elements[ind]} onHide={() => { slider_active_elements[ind] = false; this.refresh(); }}>
                    <Modal.Header className="align-items-center justify-content-between">
                      <Modal.Title className="font600 font_20px colorBlack">Master Doctors</Modal.Title>
                      <a href="javascript:void(0)" className="radius-100 popClose" variant="secondary" onClick={() => { slider_active_elements[ind] = false; this.refresh(); }}>
                        <img src={announcementClose} className="translate_both" />
                      </a>
                    </Modal.Header>
                    <Modal.Body>
                      {val.session_doctor_entities.map((rdoctor, indexdoctor1) => (
                        <div className="text-left dskGrMstrDocBox">
                          <div className="full_width dskGrMstrDocBoxIn">
                            <div className="row align-items-center">
                              <div className="radius-100 dskGrMstrDocBoxInPic">
                                <img src={rdoctor.session_doctor_image} className="object_fit_cover" />

                              </div>
                              <div className="font_12px colorGrey font400 dskGrMstrDocBoxContent">
                                <h4 className="font_14px colorBlack font600">{rdoctor.session_doctor_name}</h4>
                                <p>{rdoctor.DepartmentName}</p>

                              </div>
                            </div>
                            <div className="radius-6 dskGrMstrDocProfile">
                              <img src={rdoctor.session_doctor_image} className="object_fit_cover" />
                              <div className="overlay"></div>
                              <div className="full_width font_12px colorWhite font400 dskGrMstrDocProfileTxt">
                                <h4 className="font_14px colorWhite font600">{rdoctor.session_doctor_name}</h4>
                                <p>{rdoctor.profile}</p>

                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Modal.Body>
                  </Modal> */}
                      <div className="full_width radius-6 dskgrCard_link">
                        <div className="full_width dskgrCardPic">
                          <div className="full_width dskgrCardTop">
                            {val.specialities == null ||
                            val.specialities == "" ? null : (
                              <div className="colorBlack font_12px font400 radius-6 bgColorWhite mblMedWikiSpeacality">
                                {setSpeciality(val.specialities)}
                                {specialityPopOver(val.specialities)}
                              </div>
                            )}
                            {deafult_popover_index == ind
                              ? this.grCardMenuPopover(val, ind)
                              : null}
                            {deafult_popover_index != ind ? (
                              <div
                                onClick={() => {
                                  this.onMenuClick(ind);
                                }}
                                className="dskDotsMenu dskDotsCircle mblDotsMenuMedWikiCard popoverExtra"
                              >
                                <span className="dskDotsMenu-dots"></span>
                                <span className="dskDotsMenu-dots"></span>
                                <span className="dskDotsMenu-dots"></span>
                              </div>
                            ) : null}
                          </div>
                          {val.image == null || val.image == "" ? null : (
                            <img
                              src={val.image}
                              className="object_fit_cover"
                              alt="Grand Rounds "
                              onClick={() => {
                                this.redirectToGrDetail(val.type_id);
                              }}
                            />
                          )}
                          <div className="overlay"></div>
                        </div>
                        <div className="full_width dskgrCardBtm">
                          <div className="full_width dskgrCardBtmIn">
                            {val.title == null || val.title == "" ? null : (
                              <h3
                                className="font500 colorBlack font_16px dskgrCardTtl"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  this.redirectToGrDetail(val.type_id);
                                }}
                              >
                                {val.title}
                              </h3>
                            )}
                            <div className="clearfix"></div>
                            <div className="full_width colorGrey font_14px dskgrCardDescription">
                              {val.description == null ||
                              val.description == "" ? null : (
                                <p>{setDescription(val.description)}</p>
                              )}
                            </div>
                            <div className="full_width dskGrMstrDoc">
                              {/* <h4 className="font500 fontExo font_16px colorBlack">MasterDoctor</h4> */}
                              <div className="clearfix"></div>
                              <div className="row dskGrMstrDocRow">
                                {/* <span class="hidden_span">{ind}</span> */}
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
                                                  {val.session_doctor_name}
                                                </h4>
                                                <p>{val.DepartmentName}</p>
                                              </div>
                                            </div>
                                            <div className="radius-6 dskGrMstrDocProfile">
                                              {val.session_doctor_image ==
                                                null ||
                                              val.session_doctor_image ==
                                                "" ? null : (
                                                <img
                                                  src={val.session_doctor_image}
                                                  className="object_fit_cover"
                                                />
                                              )}
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
                                      )
                                    )
                                  : null}
                              </div>
                            </div>
                            <div className="full_width dskgrCardFooter">
                              <div
                                className="text-uppercase colorWhite font_14px fontExo font400 radius-6 mblSessionbtm_a"
                                onClick={() => {
                                  this.redirectToGrDetail(val.type_id);
                                }}
                              >
                                <span>
                                  View Details <img src={angaleWhite} />
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
                  ))
                : null}
            </Slider>
          </div>
        ) : isApiCallDone ? null : (
          // <div className="col-sm-6 dskTrandingGrandRounds">
          //   <h3 className="font_18px fontExo colorBlack font600 text-uppercase">
          //     Trending Grand Rounds
          //   </h3>
          //   <div className="full_width dskTrandingGrSlider">
          //     <div className="dskgrCard grCard mamama">
                <TrandingGrLoader />
          //     </div>
          //   </div>
          // </div>
        )}
        {/* /////////////////master doctor list modal////////////////// */}
      </>
    );
  }
}
export default TrendingGrandRound;
