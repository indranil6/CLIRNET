import React from "react";
import Loader from "react-loader-spinner";
import { reactLocalStorage } from "reactjs-localstorage";
import $ from "jquery";
import { isMobile } from "react-device-detect";
import Form from "react-bootstrap/Form";
import Footer from "../mainscreens/Footer";
import Slider from "react-slick";
import "firebase/storage";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { InlineShareButtons } from "sharethis-reactjs";
import AppConfig from "../config/config.js";
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
import Medwikicard from "../Cards/Medwikicard";
import Moment from "react-moment";
import Sessioncard from "../Cards/Sessioncard";
import ReactPlayer from "react-player";

import QuizCard from "../Cards/QuizCard.js";
import PollCard from "../Cards/PollCard.js";
import SurveyCard from "../Cards/SurveyCard.js";
import Banner from "../mainscreens/Banner";
import HeaderStatic from "../mainscreens/HeaderStatic";

import { setDescription } from "../Common/Common.js";
import { ToastsContainer, ToastsStore } from "react-toasts";
import announcementClose from "../../mobImages/announcementClose.png";
var selected_medwiki_popover_index = -1;
const gtag = window.gtag;

const pageNames = "Grand Rounds";
var selected_session_popover_index = -1;
var main_cont_wirhout_citation = "";
var citation_text_parsed = [];
let related_comp = [];
const url = AppConfig.apiLoc;

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
  cssEase: "linear",
};

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
var data_medwiki_pegination = 0;
var data_session_pegination = 0;
var data_survey_pegination = 0;
var prev_comment = [];
var files = [];
var main_data = [];
var medwiki_data = [];
var session_data = [];
var extra_val = 0;
var gr_survey_list = [];
var gr_survey_default_index = -1;
class GrandRoundsMobile extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.id;
    this.token = this.props.token;
    this.state = {
      is_loader_main: 1,
      is_loader_medwiki: 0,
      is_loader_session: 0,
      is_loader_survey: 0,
      data_main: [],
      data_medwiki: [],
      data_session: [],
      data_survey: [],
      comments: [],
      files: [],
      doctors: [],
      showModal_doc: false,
      showModal_main: false,
      display: false,
      rerender: false,
      is_loader: true,
      banner_display: false,
      association_status: 1,
      association_setting: {}
    };
    gr_survey_list = [];
    gr_survey_default_index = -1;
    this.fetchSurveyData(this.id);
    this.handle_change = this.handle_change.bind(this);

    this.display_banner = this.display_banner.bind(this);
  }

  display_banner(datam) {
    this.setState({ banner_display: true });

    //alert(datam)
  }

  fetchSurveyData(id) {
    fetch(url + "openapi/grsurvey?type_id=" + id, {
      method: "GET",
      headers: {
        Authorization: this.token,
        version: "rjsw 1.1.1",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let status_code = responseJson.status_code;
        if (status_code == 200) {
          //console.log('inside response ok')
          gr_survey_list = [];
          let responseData = responseJson.data;
          responseData.map((r, index) => {
            //console.log('inside array')
            gr_survey_list.push(r);
          });
          this.refresh();
          //console.log('survey_list'+gr_survey_list.length+'\n'+responseData.length)
        }
      })
      .catch((error) => {
        //console.log("Error"+error);
      });
  }

  handle_change(index, value, type) {
    if (type == "vault") {
      medwiki_data[index].vault = value;

      this.setState({ data_medwiki: medwiki_data });
    }

    if (type == "like") {
      if (value == 0) {
        medwiki_data[index].myrating = false;
        medwiki_data[index].rating = parseInt(medwiki_data[index].rating) - 1;
        this.setState({ data_medwiki: medwiki_data });

        this.setState({ rerender: !this.state.rerender });
      } else {
        medwiki_data[index].myrating = true;
        medwiki_data[index].rating =
          parseInt(medwiki_data[index].rating) + parseInt(value);
        this.setState({ data_medwiki: medwiki_data });

        this.setState({ rerender: !this.state.rerender });
      }
    }

    if (type == "popover") {
      selected_medwiki_popover_index = index;
      this.setState({ rerender: !this.state.rerender });
    }

    if (type == "popover_session") {
      selected_session_popover_index = index;
      this.setState({ rerender: !this.state.rerender });
    }
  }

  componentWillUnmount() {
    $("html, body").css({
      overflow: "auto",
      height: "auto",
    });
    prev_comment = [];
    selected_medwiki_popover_index = -1;
    selected_session_popover_index = -1;
    main_data = [];
    medwiki_data = [];
    session_data = [];
    gr_survey_list = [];
  }

  componentDidMount() {
    window.document.title = "CLIRNET - Grand Rounds Detail";
    gtag("config", AppConfig.gtag_measure_id, {
      page_title: window.document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
    gr_survey_default_index = -1;
    var temp = this;
    $(document).on("click", function (e) {
      //popover dissapear func
      let ggg = $(e.target).parents(".popoverExtra").length;
      if (ggg == 0 && !$(e.target).hasClass("popoverExtra")) {
        gr_survey_default_index = -1;
        temp.refresh();
      }
    });

    gr_survey_default_index = -1;
    var that = this;
    $(document).on("click", function (e) {
      //popover dissapear func

      let ggg = $(e.target).parents(".tanar").length;

      if (ggg == 0 && !$(e.target).hasClass("tanar")) {
        selected_medwiki_popover_index = -1;
        that.setState({ is_loader: false });
      }

      let sessgg = $(e.target).parents(".manar").length;

      if (sessgg == 0 && !$(e.target).hasClass("manar")) {
        selected_session_popover_index = -1;
        that.setState({ is_loader: false });
      }
    });

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

    $(".li_grandround").attr("id", "grandround_cal");
    $(".grandround_mobile").addClass("active");
    fetch(
      url +
      "openapi/grdetail?type_id=" +
      this.id +
      "&source=" +
      extrautm +
      "",
      {
        method: "GET",
        headers: {
          Authorization: this.token,
          version: "rjsw 1.1.1",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status_code == "200") {
          responseJson.data.map((r) => {
            main_data.push(r);
          });

          this.setState({ data_main: main_data });
          this.setState({ is_loader_main: 0 });
          this.setState({ is_loader: false });
          //console.log(this.state.data_main[0].specialities)
          this.setState({ association_status: main_data[0].association_status });
          if (main_data[0].association_setting) {
            let tempSetting = JSON.parse(main_data[0].association_setting)
            this.setState({ association_setting: tempSetting });
          }
          this.setState({ files: this.state.data_main[0].gr_files });

          this.setState({
            doctors: this.state.data_main[0].session_doctor_entities,
          });

          extra_val =
            this.state.data_main[0].session_doctor_entities.length - 4;

          $(".dskGrMstrDocRow").each(function () {
            if ($(this).children(".dskGrMstrDocBox").length > 1) {
              $(".dskGrMstrDocBox").addClass("dskGrMstrDocPopShow");
            } else {
              $(this)
                .children(".dskGrMstrDocBox")
                .removeClass("dskGrMstrDocPopShow");
            }
          });
          // $(window).bind("load resize", function() {

          // 	if($(window).innerWidth() >= 991) {
          // 		$(document).on('mouseenter', '.dskGrMstrDocPopShow .dskGrMstrDocBoxIn', function () {
          // 			$(this).find('.dskGrMstrDocProfile').addClass('dskGrMstrDocProfileShow').fadeIn(300);
          // 			$(this).parent().addClass("dskGrMstrDocPopShowActive");
          // 		}).on('mouseleave', '.dskGrMstrDocPopShow .dskGrMstrDocBoxIn', function () {
          // 			$(this).find('.dskGrMstrDocProfile').removeClass('dskGrMstrDocProfileShow').fadeOut(300);
          // 			$(this).parent().removeClass("dskGrMstrDocPopShowActive");
          // 		});
          // 	}else{
          // 		$("ul.nav li.dropdown").removeClass("open_sub_menu");
          // 	}
          // });

          $(".dskGrMstrDocBox:nth-child(5)")
            .find(".dskGrMstrDocProfile")
            .remove();
          $(".dskGrMstrDocBox:nth-child(5)")
            .find(".dskGrMstrDocBoxInPic")
            .append(
              "<div  class='overlay'></div><span  class='dskGrMstrDocCount plus_icon'>+" +
              Math.abs(extra_val) +
              "</span>"
            );
          var that = this;
          $(".plus_icon").click(function () {
            that.setState({ showModal_doc: true });
          });

          //let file_data=JSON.parse(this.state.data_main[0].gr_files);

          //alert(this.state.data_main[0].gr_files)
        } else {
          this.props.history.push({
            pathname: `/`,
          });
        }
      })
      .catch((error) => { });

    fetch(url + "openapi/grmedwiki?type_id=" + this.id + "", {
      method: "GET",
      headers: {
        Authorization: this.token,
        version: "rjsw 1.1.1",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status_code == "200") {
          responseJson.data.map((r) => {
            medwiki_data.push(r);
          });

          this.setState({ data_medwiki: medwiki_data });
          this.setState({ is_loader_main: 0 });

          ////console.log(this.state.data_medwiki[0].specialities)
        } else {
          this.props.history.push({
            pathname: `/`,
          });
        }
      })
      .catch((error) => { });

    fetch(url + "openapi/grsession?type_id=" + this.id + "", {
      method: "GET",
      headers: {
        Authorization: this.token,
        version: "rjsw 1.1.1",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status_code == "200") {
          responseJson.data.map((r) => {
            session_data.push(r);
          });

          this.setState({ data_session: session_data });
          this.setState({ is_loader_main: 0 });

          ////console.log(this.state.data_medwiki[0].specialities)
        } else {
          this.props.history.push({
            pathname: `/`,
          });
        }
      })
      .catch((error) => { });


    //dskGrMstrDocBox dskGrMstrDocPopShow
    $(".dskGrMstrDocRow").each(function () {
      if ($(this).children(".dskGrMstrDocBox").length > 1) {
        $(".dskGrMstrDocBox").addClass("dskGrMstrDocPopShow");
      } else {
        $(this).children(".dskGrMstrDocBox").removeClass("dskGrMstrDocPopShow");
      }
    });

    if (isMobile) {
      $(document).on(
        "click",
        ".dskGrMstrDocPopShow .dskGrMstrDocBoxIn",
        function () {
          $(".dskGrMstrDocBox").removeClass("dskGrMstrDocPopShowActive");
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

    $(".dskGrMstrDocBox:nth-child(5)").find(".dskGrMstrDocProfile").remove();
    $(".dskGrMstrDocBox:nth-child(5)")
      .find(".dskGrMstrDocBoxInPic")
      .append(
        "<div class='overlay'></div><span class='dskGrMstrDocCount'>+4</span>"
      );

    setTimeout(function () {
      $(".feedRow_ans").find("sup").remove();
    }, 1000);

    window.scrollTo(0, 0);

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
  generate_first_name(name) {
    if (name != "" && name != null) {
      let firstnamefirst_letter = name.substring(0, 1);

      return firstnamefirst_letter;
    } else {
      return "NA";
    }
  }

  //Like Unlike Function
  onLikeBtnPress = (item_id, type, array_index) => {
    this.props.history.push({
      pathname: `/`,
    });
  };

  //Vault Press Function
  onvaultPress = (item_id, type, array_index, flag) => {
    this.props.history.push({
      pathname: `/`,
    });
  };

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

  remove_class(classname) {
    $("." + classname + "").removeClass("" + classname + "");
    $("." + classname + "_but").remove();
  }

  opensub(data) {
    $(".off").css("display", "none");
    $(".hh_" + data + "").css("display", "block");
  }

  get_files_view(data) {
    if (
      data != undefined &&
      data != "=undefined" &&
      data != "=null" &&
      data.gr_content_type == "image"
    ) {
      return (
        <div className="col-3 mblGrDtlsAttachedBox mblGrAttchdFileType-img">
          <div className="full_width radius-6 mblGrDtlsAttachedBoxIn">
            <img src={data.gr_content_url} className="mblGrDtlsAttachedPic" />
            <a target="_blank" href={data.gr_content_url} download>
              <div className="mblGrDtlsAttachedDownl transition6s">
                <img
                  src={downloadIcon}
                  alt="download"
                  className="translate_both"
                />
              </div>
              {data.gr_content_title?<span className="colorWhite font_10px dskGrDtlsAttachedName">{data.gr_content_title}</span>:null}
            </a>
          </div>
        </div>
      );
    }

    if (
      data != undefined &&
      data != "=undefined" &&
      data != "=null" &&
      data.gr_content_type == "doc"
    ) {
      return (
        <div className="col-3 mblGrDtlsAttachedBox mblGrAttchdFileType-doc">
          <div className="full_width radius-6 mblGrDtlsAttachedBoxIn">
            <img src={fileTypeWord} className="mblGrDtlsAttachedPic" />
            <a target="_blank" href={data.gr_content_url} download>
              <div className="mblGrDtlsAttachedDownl transition6s">
                <img
                  src={downloadIcon}
                  alt="download"
                  className="translate_both"
                />
              </div>
              {data.gr_content_title?<span className="colorWhite font_10px dskGrDtlsAttachedName">{data.gr_content_title}</span>:null}
            </a>
          </div>
        </div>
      );
    }

    if (
      data != undefined &&
      data != "=undefined" &&
      data != "=null" &&
      data.gr_content_type == "pdf"
    ) {
      return (
        <div className="col-3 mblGrDtlsAttachedBox mblGrAttchdFileType-doc">
          <div className="full_width radius-6 mblGrDtlsAttachedBoxIn">
            <img src={fileTypePdf} className="mblGrDtlsAttachedPic" />
            <a target="_blank" href={data.gr_content_url} download>
              <div className="mblGrDtlsAttachedDownl transition6s">
                <img
                  src={downloadIcon}
                  alt="download"
                  className="translate_both"
                />
              </div>
              {data.gr_content_title?<span className="colorWhite font_10px dskGrDtlsAttachedName">{data.gr_content_title}</span>:null}
            </a>
          </div>
        </div>
      );
    }

    if (
      data != undefined &&
      data != "=undefined" &&
      data != "=null" &&
      data.gr_content_type == "video"
    ) {
      return (
        <div className="col-3 mblGrDtlsAttachedBox mblGrAttchdFileType-doc">
          <div className="full_width radius-6 mblGrDtlsAttachedBoxIn">
            <img src={fileTypeWord} className="mblGrDtlsAttachedPic" />
            <a target="_blank" href={data.gr_content_url} download>
              <div className="mblGrDtlsAttachedDownl transition6s">
                <img
                  src={downloadIcon}
                  alt="download"
                  className="translate_both"
                />
              </div>
              {data.gr_content_title?<span className="colorWhite font_10px dskGrDtlsAttachedName">{data.gr_content_title}</span>:null}
            </a>
          </div>
        </div>
      );
    }
  }
  
  refresh = () => {
    this.setState({ display: !this.state.display });
  };

  onMenuClick(ind) {
    gr_survey_default_index = ind;
    this.refresh();
  }

  redirect_to_survey_detail = (id) => {
    this.props.history.push({
      pathname: "/",
    });
  };

  renderActivities(val, ind) {
    let cat = val.category;
    //console.log('in render'+cat)
    switch (cat) {
      case "survey":
        return (
          <SurveyCard
            data={val}
            status="new"
            array_index={ind}
            click={this.redirect_to_survey_detail.bind(this, val.survey_id)}
            menu_click={this.onMenuClick.bind(this, ind)}
            deafult_popover_index={gr_survey_default_index}
          />
        );
      case "poll":
        return (
          <PollCard
            data={val}
            status="new"
            array_index={ind}
            menu_click={this.onMenuClick.bind(this, ind)}
            deafult_popover_index={gr_survey_default_index}
          />
        );
      case "quiz":
        return (
          <QuizCard
            data={val}
            status="new"
            array_index={ind}
            click={this.redirect_to_survey_detail.bind(this, val.survey_id)}
            menu_click={this.onMenuClick.bind(this, ind)}
            deafult_popover_index={gr_survey_default_index}
          />
        );
      default:
        return false;
    }
  }


  scroll_to_comment() {
    $("html, body").animate(
      {
        scrollTop: $("#comment_section").offset().top - 100,
      },
      2000
    );
  }

  render() {
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
      cssEase: "linear",
    };

    return (
      <div
        className={
          isMobile == true ? "full_width mblScreen" : "full_width dskScreen"
        }
      >
        <HeaderStatic />
        {this.state.data_main.length > 0 ? (
          <div className="full_width mblGrDtls">
            {/* Ads------------- */}
            <section className="full_width adsArea">
              <div className="full_width adsFrame">
              </div>
            </section>
            {/* Ads------------- */}

            <div className="full_width">
              <Loader
                className="loader_cmn"
                type="ThreeDots"
                color="#355ed3"
                height={80}
                width={80}
                visible={this.state.is_loader}
              />

              {this.state.data_main.map((r, indexii) => (
                <section className="full_width text-left mblGrLeftMain">
                  <div className="full_width mblGrLeftTop">
                    <div className="colorBlack font_12px font400 radius-6 bgColorWhite mblMedWikiSpeacality">
                      {this.first_spec(r.specialities)}
                      {r.specialities.split(",").length > 1
                        ? this.popover_view_spec(r.specialities)
                        : null}
                    </div>
                  </div>
                  <div className="clearfix"></div>
                  <h1 className="font_20px font500 colorBlack mblMainGrTtl">
                    {r.title}
                  </h1>
                  <div className="clearfix"></div>
                  {(r.title_video) ? <h1 className="font_16px font300 colorBlack mblMainGrTtl">
                    {r.title_video}
                  </h1> : null}
                  <div className="clearfix"></div>
                  <div className="full_width mblGrLeftVideo">
                    {r.media_type === "video" ? (
                      <ReactPlayer
                        controls={true}
                        playing={false}
                        url={r.video}
                        width="100%"
                      />
                    ) : null}

                    {r.media_type === "image" ? (
                      <img
                        width="560"
                        height="315"
                        src={r.image}
                        className="object_fit_cover"
                      />
                    ) : null}
                  </div>

                  <div className="full_width mblGrLeftVideoSharePnl">
                    <div className="mblGrLeftVideoSharePnlLeft">
                      <a
                        href="javascript:void(0)"
                        className={r.myrating == true ? "active" : ""}
                      >
                        <img
                          src={likeIcon}
                          alt="Like"
                          onClick={() =>
                            this.onLikeBtnPress(r.type_id, r.type, indexii)
                          }
                          className="translate_both mblGrLeftShareImg"
                        />
                        <img
                          src={likeIconActive}
                          alt="Like"
                          onClick={() =>
                            this.onLikeBtnPress(r.type_id, r.type, indexii)
                          }
                          className="translate_both mblGrLeftShareImgActive"
                        />
                      </a>

                      <a
                        href="javascript:void(0)"
                        onClick={() =>
                          this.onvaultPress(r.type_id, r.type, indexii, 0)
                        }
                        className={r.vault != 0 ? "active" : ""}
                      >
                        <img
                          src={vaultIcon}
                          alt="Vault"
                          className="translate_both mblGrLeftShareImg"
                        />
                        <img
                          src={vaultIconActive}
                          alt="Vault"
                          className="translate_both mblGrLeftShareImgActive"
                        />
                      </a>
                      <a
                        onClick={() => {
                          this.setState({ showModal_main: true });
                        }}
                        href="javascript:void(0)"
                      >
                        <img src={ShareIcon} alt="Share" />
                      </a>
                    </div>
                    <a
                      href="javascript:void(0)"
                      onClick={() => this.scroll_to_comment()}
                    >
                      <img src={commentsIcon} alt="comments" />{" "}
                      <span className="colorBlack font_14px">
                        {r.comment_count} Comments
                      </span>
                    </a>
                  </div>

                  <div className="full_width colorGrey font400 font_16px mblGrLeftDescription">
                    {r.description}
                  </div>
                  {this.state.association_status == 1 ? <>
                    {this.state.files.length > 0 ? (
                      <div className="full_width text-left radius-6 mblGrDtlsAttached">
                        <h4 className="font500 fontExo font_20px colorBlack">
                          {(this.state.association_setting && this.state.association_setting.attached_file) ? this.state.association_setting.attached_file : 'Attached file(s)'}
                        </h4>
                        <div className="clearfix"></div>
                        <div className="row mblGrDtlsAttachedRow">
                          {this.state.files.map((rfile, indexfile) =>
                            this.get_files_view(rfile)
                          )}
                        </div>
                      </div>
                    ) : null}
                  </> : <>
                    {this.state.data_main[0].sponsor_logo !== null ||
                      this.state.data_main[0].sponsor_logo == "" ? (
                      <div className="full_width text-left radius-6 mblGrDtlsSponserd">
                        <h4 className="font_14px colorBlack font400 mblGrDtlsSponserdTtl">
                          {(this.state.association_setting && this.state.association_setting.brought_to_you_by) ? this.state.association_setting.brought_to_you_by : 'Brought to you by'}
                        </h4>
                        {this.state.data_main.map((r, indexii) => (
                          <Slider
                            {...dskSessionClient}
                            className="mblSessionClient mblGrDtlsClient"
                          >
                            {r.sponsor_logo !== null || r.sponsor_logo == ""
                              ? r.sponsor_logo.split(",").map((val, ind) => (
                                <div className="mblSessionClientItem">
                                  <img src={val} />
                                </div>
                              ))
                              : null}
                          </Slider>
                        ))}
                      </div>
                    ) : null}
                  </>}

                  <div className="full_width text-left radius-6 mblGrDtlsMasterDoc">
                    <h4 className="font500 fontExo font_20px colorBlack">
                      {(this.state.association_setting && this.state.association_setting.master_doctor) ? this.state.association_setting.master_doctor : ' MasterDoctor'}
                    </h4>
                    <div className="clearfix"></div>
                    <div className="row dskGrMstrDocRow">
                      {this.state.doctors.map((rdoctor, indexdoctor) => (
                        <div className="dskGrMstrDocBox">
                          <div className="full_width dskGrMstrDocBoxIn">
                            <div className="row align-items-center">
                              <div className="radius-100 dskGrMstrDocBoxInPic">
                                <img
                                  src={rdoctor.session_doctor_image}
                                  className="object_fit_cover"
                                />
                              </div>
                              <div className="font_12px colorGrey font400 dskGrMstrDocBoxContent">
                                <h4 className="font_14px colorBlack font600">
                                  {rdoctor.session_doctor_name}
                                </h4>
                                {(rdoctor.subtitle) ? <p>{rdoctor.subtitle}</p> : null}
                                <p>{rdoctor.DepartmentName}</p>
                              </div>
                            </div>
                            <div className="radius-6 dskGrMstrDocProfile">
                              <img
                                src={rdoctor.session_doctor_image}
                                className="object_fit_cover"
                              />
                              <div className="overlay"></div>
                              <div className="full_width font_12px colorWhite font400 dskGrMstrDocProfileTxt">
                                <h4 className="font_14px colorWhite font600">
                                  {rdoctor.session_doctor_name}
                                </h4>
                                {(rdoctor.subtitle) ? <p>{rdoctor.subtitle}</p> : null}
                                <p>{rdoctor.DepartmentName}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {this.state.association_status == 1 ? <>

                    {this.state.data_main[0].sponsor_logo !== null ||
                      this.state.data_main[0].sponsor_logo == "" ? (
                      <div className="full_width text-left radius-6 mblGrDtlsSponserd">
                        <h4 className="font_14px colorBlack font400 mblGrDtlsSponserdTtl">
                          {(this.state.association_setting && this.state.association_setting.brought_to_you_by) ? this.state.association_setting.brought_to_you_by : 'Brought to you by'}
                        </h4>
                        {this.state.data_main.map((r, indexii) => (
                          <Slider
                            {...dskSessionClient}
                            className="mblSessionClient mblGrDtlsClient"
                          >
                            {r.sponsor_logo !== null || r.sponsor_logo == ""
                              ? r.sponsor_logo.split(",").map((val, ind) => (
                                <div className="mblSessionClientItem">
                                  <img src={val} />
                                </div>
                              ))
                              : null}
                          </Slider>
                        ))}
                      </div>
                    ) : null}
                  </> : <>
                    {this.state.files.length > 0 ? (
                      <div className="full_width text-left radius-6 mblGrDtlsAttached">
                        <h4 className="font500 fontExo font_20px colorBlack">
                          {(this.state.association_setting && this.state.association_setting.attached_file) ? this.state.association_setting.attached_file : 'Attached file(s)'}
                        </h4>
                        <div className="clearfix"></div>
                        <div className="row mblGrDtlsAttachedRow">
                          {this.state.files.map((rfile, indexfile) =>
                            this.get_files_view(rfile)
                          )}
                        </div>
                      </div>
                    ) : null}
                  </>}
                  {/* {this.state.data_main[0].sponsor_logo !== null ||
                  this.state.data_main[0].sponsor_logo == "" ? (
                    <div className="full_width text-left radius-6 mblGrDtlsSponserd">
                      <h4 className="font_14px colorBlack font400 mblGrDtlsSponserdTtl">
                        Brought to you by
                      </h4>
                      {this.state.data_main.map((r, indexii) => (
                        <Slider
                          {...dskSessionClient}
                          className="mblSessionClient mblGrDtlsClient"
                        >
                          {r.sponsor_logo !== null || r.sponsor_logo == ""
                            ? r.sponsor_logo.split(",").map((val, ind) => (
                                <div className="mblSessionClientItem">
                                  <img src={val} />
                                </div>
                              ))
                            : null}
                        </Slider>
                      ))}
                    </div>
                  ) : null} */}

                  {this.state.doctors.length != 0 ? (
                    <Modal
                      className="in dskMasterDoctorPop mblSharePop"
                      centered="true"
                      animation="slide"
                      show={this.state.showModal_main}
                      onHide={() => {
                        this.setState({ showModal_main: false });
                      }}
                    >
                      <Modal.Header className="align-items-center justify-content-between">
                        <Modal.Title className="font600 font_20px colorBlack">
                          Share
                        </Modal.Title>
                        <a
                          href="javascript:void(0)"
                          className="radius-100 popClose"
                          variant="secondary"
                          onClick={() => {
                            this.setState({ showModal_main: false });
                          }}
                        >
                          <img
                            src={announcementClose}
                            className="translate_both"
                          />
                        </a>
                      </Modal.Header>
                      <Modal.Body>
                        <InlineShareButtons
                          config={{
                            alignment: "center", // alignment of buttons (left, center, right)
                            color: "white", // set the color of buttons (social, white)
                            enabled: true, // show/hide buttons (true, false)
                            font_size: 16, // font size for the buttons
                            labels: "null", // button labels (cta, counts, null)
                            language: "en", // which language to use (see LANGUAGES)
                            networks: [
                              // which networks to include (see SHARING NETWORKS)
                              "whatsapp",
                              "messenger",
                              "facebook",
                              "twitter",
                            ],
                            padding: 0, // padding within buttons (INTEGER)
                            radius: 6, // the corner radius on each button (INTEGER)
                            show_total: false,
                            size: 30, // the size of each button (INTEGER)

                            // OPTIONAL PARAMETERS
                            url: r.deeplink, // (defaults to current url)
                            image: "https://bit.ly/2CMhCMC", // (defaults to og:image or twitter:image)
                            description:
                              r.description.substring(0, 100) + "...", // (defaults to og:description or twitter:description)
                            title: r.title, // (defaults to og:title or twitter:title)
                            message: "", // (only for email sharing)
                            subject: "", // (only for email sharing)
                            username: "Medwiki view", // (only for twitter sharing)
                          }}
                        />
                      </Modal.Body>
                    </Modal>
                  ) : null}
                </section>
              ))}{/* /////////////Added by sumit/////////////////// */}
              {/* {(this.state.data_archive.length > 0) ?
							  <section className="full_width text-left dskGrMoreList dskgrMedwikiList">
								  {/* {(this.state.association_setting && this.state.association_setting.video_archive)?this.state.association_setting.video_archive:'Archive\'s '}  
								  <div className="clearfix"></div>
								  <Masonry
									  className={'dskMasonryCardArea'} // default ''
									  elementType={'ul'} // default 'div'
									  options={masonryOptions} // default {} 
									  disableImagesLoaded={false} // default false
									  updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
								  //imagesLoadedOptions={imagesLoadedOptions} // default {}
								  >
									  {this.state.data_archive.map((rmed, indexmed) => (
										  <ArcVideoSmallCard onChangeButton={this.handle_change_arc} history={this.props.history} mobile_device={isMobile}  card_data={rmed} clicked_index={selected_arc_popover_index} elem_key={indexmed} custom_class="gr_page_medwiki" />
									  ))}
									  <div className="col relatedButtns" >
										  <div className="text-uppercase text-center colorWhite font_14px fontExo font400 radius-6 mblSessionbtm_a" onClick={() => { this.onViewMoreClick() }}>
											  <span>View More</span>
										  </div>
									  </div>
								  </Masonry>
							  </section>:null} */}
              {/* /////////////Added by sumit/////////////////// */}
              {this.state.data_medwiki.length > 0 ? (
                <section className="full_width text-left mblGrMoreList mblgrMedwikiList">
                  <h4 className="font_24px font400 colorBlack mblGrMoreTtl">
                    {(this.state.association_setting && this.state.association_setting.medwiki) ? this.state.association_setting.medwiki : 'Medwiki '}
                    <span className="font_16px">
                      ({this.state.data_medwiki.length})
                    </span>
                  </h4>
                  <div className="clearfix"></div>
                  <div className="full_width mblRecentSroll">
                    {this.state.data_medwiki.map((rmed, indexmed) => (
                      <Medwikicard
                        onChangeButton={this.handle_change}
                        history={this.props.history}
                        mobile_device={isMobile}
                        card_data={rmed}
                        clicked_index={selected_medwiki_popover_index}
                        elem_key={indexmed}
                        custom_class="gr_page_medwiki"
                      />
                    ))}
                  </div>

                  {/* <a href="javascript:void(0)" onClick={()=>{ this.remove_class('vanish_class')}} className="text-uppercase colorWhite font_16px fontExo font400 radius-6 mblSessionbtm_a dskGrMoreBtn vanish_class_but">
										<span>View All <img src={angaleWhite} /></span>
									</a> */}
                </section>
              ) : null}
              {this.state.data_session.length > 0 ? (
                <section className="full_width text-left mblGrMoreList mblgrSsnList">
                  <h4 className="font_24px font400 colorBlack mblGrMoreTtl">
                    {(this.state.association_setting && this.state.association_setting.live_CME) ? this.state.association_setting.live_CME : 'LiveCME '}
                    <span className="font_16px">
                      ({this.state.data_session.length})
                    </span>
                  </h4>
                  <div className="clearfix"></div>
                  <div className="full_width mblRecentSroll">
                    {this.state.data_session.map((rsession, indexsession) => (
                      <Sessioncard
                        onChangeButton={this.handle_change}
                        history={this.props.history}
                        mobile_device={isMobile}
                        card_data={rsession}
                        clicked_index={selected_session_popover_index}
                        elem_key={indexsession}
                        custom_class="gr_page_session_mobile"
                      />
                    ))}
                  </div>
                  {/* <a href="javascript:void(0)" onClick={()=>{ this.remove_class('vanish_class_session')}} className="text-uppercase colorWhite font_16px fontExo font400 radius-6 mblSessionbtm_a dskGrMoreBtn vanish_class_session_but">
										<span>View All <img src={angaleWhite} /></span>
									</a> */}
                </section>
              ) : null}

              {/* Ads------------- */}
              <section className="full_width adsArea">
                <div className="full_width adsFrame">

                </div>
              </section>
              {/* Ads------------- */}

              <section className="full_width text-left mblGrMoreList mblgrSurvPllsList">
                {gr_survey_list != null && gr_survey_list.length > 0 ? (
                  <h4 className="font_24px font400 colorBlack mblGrMoreTtl">
                    {(this.state.association_setting && this.state.association_setting.activities) ? this.state.association_setting.activities : 'Activities '}
                    <span className="font_16px">({gr_survey_list.length})</span>
                  </h4>
                ) : (
                  <h1>{gr_survey_list.lenght}</h1>
                )}
                <div className="clearfix"></div>
                <div className="full_width mblRecentSroll">
                  {gr_survey_list.length > 0 ? (
                    <>
                      {gr_survey_list.map((val, index) =>
                        this.renderActivities(val, index)
                      )}
                    </>
                  ) : null}
                </div>
                {/* <a href="javascript:void(0)" className="text-uppercase colorWhite font_16px fontExo font400 radius-6 mblSessionbtm_a dskGrMoreBtn">
										<span>View All <img src={angaleWhite} /></span>
									</a> */}
              </section>
              {this.state.association_status != 2 ?
                <section
                  className="full_width text-left mblGrMoreList mblComments"
                  id="comment_section"
                >
                  {this.state.data_main.map((r, indexii) => (
                    <h4 className="font_24px font400 colorBlack mblGrMoreTtl">
                      Comments{" "}
                      <span className="font_16px">
                        (<span class="count_com">{r.comment_count}</span>)
                      </span>
                    </h4>
                  ))}
                  <div className="clearfix"></div>
                  {this.state.comments.length > 0 ? (
                    <div className="full_width mblCommentsArea">
                      {this.state.comments.map((r, index) => (
                        <div className="full_width radius-6 mblCommentsAreaRow">
                          <div className="radius-100 mblCommentsAreaPic">
                            {r.images != "" &&
                              r.images != "null" &&
                              r.images != null ? (
                              <img className="object_fit_cover" src={r.images} />
                            ) : (
                              <h5 className="font600 colorWhite font_30px text-uppercase translate_both header_profile_ttl">
                                {this.generate_first_name(r.first_name)}
                              </h5>
                            )}
                          </div>
                          <div className="colorGrey font400 mblCommentsContent">
                            <h5 className="font_16px font500 colorBlack mblCommentsAreaBy">
                              Dr. {r.last_name}
                            </h5>
                            <p>{r.body}</p>
                            <h6 className="font_12px mblCommentsByBtm">
                              <span className="colorBlack">
                                <Moment format="MMMM Do YYYY">
                                  {r.created_at}
                                </Moment>
                              </span>
                              <a
                                href="javascript:void(0)"
                                className="mblCommentsAreaReply_a append_divv"
                                onClick={() => {
                                  this.opensub(index);
                                }}
                              >
                                {r.children.length > 0 ? (
                                  <span>{r.children.length}</span>
                                ) : null}{" "}
                                Reply
                              </a>
                            </h6>
                            <div
                              className={
                                "full_width mblCommentsReply hh_" +
                                index +
                                " " +
                                "off"
                              }
                              style={{ display: "none" }}
                            >
                              {r.children.map((rchild, index) => (
                                <div className="full_width radius-6 mblCommentsAreaRow">
                                  <div className="radius-100 mblCommentsAreaPic">
                                    {rchild.images != "" &&
                                      rchild.images != "null" &&
                                      rchild.images != null ? (
                                      <img
                                        className="object_fit_cover"
                                        src={rchild.images}
                                      />
                                    ) : (
                                      <h5 className="font600 colorWhite font_30px text-uppercase translate_both header_profile_ttl">
                                        {this.generate_first_name(r.first_name)}
                                      </h5>
                                    )}
                                    {/* <img className="object_fit_cover" src={rchild.images} />  */}
                                  </div>
                                  <div className="colorGrey font400 mblCommentsContent">
                                    <h5 className="font_16px font500 colorBlack mblCommentsAreaBy">
                                      Dr. {rchild.last_name}
                                    </h5>
                                    <p>{rchild.body}</p>
                                    <h6 className="font_12px mblCommentsByBtm">
                                      <span className="colorBlack">
                                        <Moment format="MMMM Do YYYY">
                                          {rchild.created_at}
                                        </Moment>
                                      </span>
                                    </h6>
                                  </div>
                                </div>
                              ))}

                              <div className="full_width radius-6 mblComments_frm">
                                <Form.Control
                                  className={
                                    "font_14px" +
                                    "font500 radius-6 mblComments_frmInput reply_text_" +
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
                                  className="transition6s font_14px font600 mblComments_frmSubmit"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {/* {(this.props.match.params.id == '6268' || this.props.match.params.id == 6268)?
                        <div className="full_width feedDtls_comment_frm">
                          <Form.Control className="font_14px font500 radius-6 feedfooterComment main_comment" type="text" placeholder={(reactLocalStorage.get('@ClirnetStore:first_name', true) == true)?"Write a comment here":"Chat publically as "+ reactLocalStorage.get('@ClirnetStore:first_name', true)+' ...'} />
                          <Form.Control type="submit" onClick={() => this.submitcomment(r.type_id, r.type, 0, 0)} value="Send" className="bgColorGreen colorWhite font600 feedDtls_commentSubmit" />
                        </div>: */}
                  <div className="full_width radius-6 mblComments_frm">
                    <Form.Control
                      className="mblComments_frmInput main_comment"
                      type="text"
                      placeholder="Write a comment here"
                    />
                    <Form.Control
                      type="submit"
                      onClick={() =>
                        this.submitcomment(this.props.match.params.id, "gr", 0, 0)
                      }
                      value="Submit"
                      className="font_14px font600 transition6s mblComments_frmSubmit"
                    />
                  </div>
                  {/* } */}
                </section> : null}

              {/* Ads------------- */}
              {/* <section className="full_width adsArea">
										<div className="full_width adsFrame">
											<img src={ads} alt="demoAds" />     
										</div>
									</section> */}
              {/* Ads------------- */}
            </div>
          </div>
        ) : (
          <Loader
            className="loader_cmn"
            type="ThreeDots"
            color="#355ed3"
            height={80}
            width={80}
            visible={this.state.is_loader}
          />
        )}
        <ToastsContainer store={ToastsStore} />
        <Footer history={this.props.history} />

        {this.state.doctors.length != 0 ? (
          <Modal
            className="in dskMasterDoctorPop"
            centered="true"
            animation="slide"
            show={this.state.showModal_doc}
            onHide={() => {
              this.setState({ showModal_doc: false });
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
              {this.state.doctors.map((rdoctor, indexdoctor) => (
                <div className="text-left dskGrMstrDocBox">
                  <div className="full_width dskGrMstrDocBoxIn">
                    <div className="row align-items-center">
                      <div className="radius-100 dskGrMstrDocBoxInPic">
                        <img
                          src={rdoctor.session_doctor_image}
                          className="object_fit_cover"
                        />
                      </div>
                      <div className="font_12px colorGrey font400 dskGrMstrDocBoxContent">
                        <h4 className="font_14px colorBlack font600">
                          {rdoctor.session_doctor_name}
                        </h4>
                        {(rdoctor.subtitle) ? <p>{rdoctor.subtitle}</p> : null}
                        <p>{rdoctor.DepartmentName}</p>
                      </div>
                    </div>
                    <div className="radius-6 dskGrMstrDocProfile">
                      <img
                        src={rdoctor.session_doctor_image}
                        className="object_fit_cover"
                      />
                      <div className="overlay"></div>
                      <div className="full_width font_12px colorWhite font400 dskGrMstrDocProfileTxt">
                        <h4 className="font_14px colorWhite font600">
                          {rdoctor.session_doctor_name}
                        </h4>
                        {(rdoctor.subtitle) ? <p>{rdoctor.subtitle}</p> : null}
                        <p>{rdoctor.DepartmentName}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Modal.Body>
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default GrandRoundsMobile;
