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
import Medwikicard from "../Cards/Medwikicard";
import Moment from "react-moment";
import Sessioncard from "../Cards/Sessioncard";
import ReactPlayer from "react-player";

import QuizCard from "../Cards/QuizCard.js";
import PollCard from "../Cards/PollCard.js";
import SurveyCard from "../Cards/SurveyCard.js";
import ArcVideoSmallCard from "../Cards/ArcVideoSmallCard.js";
import Banner from "../mainscreens/Banner";
import FeedDetailLoader from '../LoadingPlaceholders/FeedDetailLoader.jsx';
import RelatedMedwikiLoader from '../LoadingPlaceholders/RelatedMedwikiLoader.jsx';
import { setSpeciality, setDescription, associationDescription } from "../Common/Common.js";

import AssociationDescription from "../components/AssociationDescription.jsx";

import "react-toastify/dist/ReactToastify.css";  
import { ToastsContainer, ToastsStore } from "react-toasts";
import announcementClose from "../../mobImages/announcementClose.png";
import ShareDetailPage from "../Common/ShareDetailPage.jsx";
var selected_medwiki_popover_index = -1;
const gtag = window.gtag;

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
var selected_arc_popover_index = -1;
var temp_data_archive = [];
let arcDataFetchLimit = 0;

class GrandRoundsMobile extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
    this.state = {
      is_loader_main: 1,
      is_loader_medwiki: 0,
      is_loader_session: 0,
      is_loader_survey: 0,
      data_main: [],
      data_medwiki: [],
      data_session: [],
      data_survey: [],
      data_archive: [],
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
    selected_arc_popover_index = -1;
    arcDataFetchLimit = 0;
    this.fetchArchiveData(this.id, arcDataFetchLimit)
    this.handle_change_arc = this.handle_change_arc.bind(this);

    this.fetchSurveyData(this.props.match.params.id);
    this.handle_change = this.handle_change.bind(this);

    if (!isMobile) {
      this.props.history.push({
        pathname: "/GrandRoundsDesktop/" + this.props.match.params.id + "",
      });
    }

    this.display_banner = this.display_banner.bind(this);
  }

  onViewMoreClick() {
    this.fetchArchiveData(this.id, arcDataFetchLimit)
  }

  fetchArchiveData(id, fetchForm) {
    fetch(url + 'gr/archiveVideoList?type_id=' + id + '&to=10&from=' + fetchForm, {
      method: 'GET',
      headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'
      }
    }).then((response) => response.json()).then((responseJson) => {
      let status_code = responseJson.status_code;
      if (status_code == 200) {
        if (responseJson.data.length < 10) {
          $(".more_but_switch").remove();
        }
        arcDataFetchLimit += 10;
        if (responseJson.data.lenght > 0) {
          this.setState({ data_archive: [...this.state.data_archive, ...responseJson.data] });
        }
      }
    }).catch((error) => {
      //console.log("Error"+error);
    });
  }


  handle_change_arc(index, value, type) {
    temp_data_archive = this.state.data_archive;
    if (type == 'vault') {
      temp_data_archive[index].vault = value;
      this.setState({ "data_archive": temp_data_archive })
    }
    if (type == 'like') {

      if (value != true) {
        temp_data_archive[index].myrating = false;
        temp_data_archive[index].rating = parseInt(temp_data_archive[index].rating) - 1;
      }
      else {
        temp_data_archive[index].myrating = true;
        temp_data_archive[index].rating = parseInt(temp_data_archive[index].rating) + parseInt(value);
      }
      this.setState({ "data_archive": temp_data_archive })
    }
    if (type == 'popover') {
      selected_arc_popover_index = index;
      this.setState({ "rerender": !this.state.rerender });
    }
    if (type == 'popover_session') {
      selected_session_popover_index = index;
      this.setState({ "rerender": !this.state.rerender });
    }
  }


  display_banner(datam) {
    this.setState({ banner_display: true });

    //alert(datam)
  }

  fetchSurveyData(id) {
    fetch(url + "gr/survey?type_id=" + id, {
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

      let arc_extra = $(e.target).parents('.arc_extra_class').length;
      if (arc_extra == 0 && !$(e.target).hasClass('arc_extra_class')) {
        selected_arc_popover_index = -1;
        that.setState({ "is_loader": false });
      }
    });

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

    $(".li_grandround").attr("id", "grandround_cal");
    $(".grandround_mobile").addClass("active");
    fetch(
      url +
      "gr/detail?type_id=" +
      this.props.match.params.id +
      "&source=" +
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
        if (responseJson.status_code == "200") {
          responseJson.data.map((r) => {
            main_data.push(r);
          });

          this.setState({ data_main: main_data });
          this.setState({ is_loader_main: 0 });
          this.setState({ is_loader: false });

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

          //$(".dskGrMstrDocBox:nth-child(5)").find(".dskGrMstrDocProfile").remove();
          //$(".dskGrMstrDocBox:nth-child(5)").find(".dskGrMstrDocBoxInPic").append("<div  class='overlay'></div><span  class='dskGrMstrDocCount plus_icon'>+"+Math.abs(extra_val)+"</span>");
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
                "<div class='overlay'></div><span id='view-master-doctor'  class='dskGrMstrDocCount plus_icon' style='cursor: default;'>+" +
                (countcir - 4) +
                "</span>"
              );
            // this.refresh()
          });

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

    fetch(url + "gr/medwiki?type_id=" + this.props.match.params.id + "", {
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

    fetch(url + "gr/session?type_id=" + this.props.match.params.id + "", {
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

    fetch(
      url +
      "knwlg/nested_comment?type_id=" +
      this.props.match.params.id +
      "&type=gr",
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
          main_data[array_index].myrating = false;
          main_data[array_index].rating =
            parseInt(main_data[array_index].rating) - 1;
        } else {
          main_data[array_index].myrating = true;
          main_data[array_index].rating =
            parseInt(main_data[array_index].rating) +
            parseInt(responseJson.data.rating);
        }

        this.setState({ data_main: main_data });
      })
      .catch((error) => { });
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
          medwiki_data[array_index].myrating = false;
          medwiki_data[array_index].rating =
            parseInt(medwiki_data[array_index].rating) - 1;
        } else {
          medwiki_data[array_index].myrating = true;
          medwiki_data[array_index].rating =
            parseInt(medwiki_data[array_index].rating) +
            parseInt(responseJson.data.rating);
        }

        this.setState({ data_medwiki: medwiki_data });
      })
      .catch((error) => { });
  };

  onLikeBtnPresssession = (item_id, type, array_index) => {
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
          session_data[array_index].myrating = false;
          session_data[array_index].rating =
            parseInt(session_data[array_index].rating) - 1;
        } else {
          session_data[array_index].myrating = true;
          session_data[array_index].rating =
            parseInt(session_data[array_index].rating) +
            parseInt(responseJson.data.rating);
        }

        this.setState({ data_session: session_data });
      })
      .catch((error) => { });
  };
  onLikeBtnPresssurvey = (item_id, type, array_index) => {
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
          session_data[array_index].myrating = false;
          session_data[array_index].rating =
            parseInt(session_data[array_index].rating) - 1;
        } else {
          session_data[array_index].myrating = true;
          session_data[array_index].rating =
            parseInt(session_data[array_index].rating) +
            parseInt(responseJson.data.rating);
        }

        this.setState({ data_session: session_data });
      })
      .catch((error) => { });
  };

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
        main_data[array_index].vault = responseJson.data;

        if (responseJson.data == 0) {
          reactLocalStorage.set(
            "@ClirnetStore:vault_count",
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

        this.setState({ data_main: main_data });
      })
      .catch((error) => { });
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

  popover_view_poll(val, index) {
    let popover = (
      <Popover id="popover-basic" className="dskDotsMenuSettings">
        <Popover.Content>
          {/* <a href="javascript:void(0)" onClick={() => this.onLikeBtnPresssession(val.type_id, 'Survey', index)} className={ val.myrating == true ? 'dskDotsMenuSettingsIcon active' : 'dskDotsMenuSettingsIcon' } >
					<span>
					<img src={likeIcon} alt="Like"    className="translate_both dskGrLeftShareImg" />
					<img src={likeIconActive} alt="Like"   className="translate_both dskGrLeftShareImgActive" />
					</span>
					Like
				</a>

        

				<a href="javascript:void(0)" className={ val.vault == 0 ? 'dskDotsMenuSettingsIcon ' : 'dskDotsMenuSettingsIcon active' } >
					<span>
				<img src={vaultIcon} alt="Vault" onClick={() => this.onvaultPress(val.type_id, 'gr', index, 1)} className="translate_both dskGrLeftShareImg" />
				<img src={vaultIconActive} alt="Vault"onClick={() => this.onvaultPress(val.type_id, 'gr', index, 0)}  className="translate_both dskGrLeftShareImgActive" />
				</span>
					Vault
				</a> */}
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
              url: val.deeplink, // (defaults to current url)
              image: "https://bit.ly/2CMhCMC", // (defaults to og:image or twitter:image)
              description: val.survey_title.substring(0, 100) + "...", // (defaults to og:description or twitter:description)
              title: val.survey_description, // (defaults to og:title or twitter:title)
              message: "", // (only for email sharing)
              subject: "", // (only for email sharing)
              username: "Medwiki view", // (only for twitter sharing)
            }}
          />
          {/* <a href="javascript:void(0)" className="dskDotsMenuNotRelevant">
					Not Relevant for me
				</a> */}
        </Popover.Content>
      </Popover>
    );
    return (
      <>
        <OverlayTrigger
          placement="left-start"
          rootClose="true"
          rootCloseEvent="click"
          trigger="click"
          delay={{ show: 50, hide: 50 }}
          overlay={popover}
        >
          <div className="mblDotsMenu mblDotsMenuMedWikiCard mblPollsCardDots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </OverlayTrigger>
      </>
    );
  }

  popover_view_surv(val, index) {
    let popover = (
      <Popover id="popover-basic" className="dskDotsMenuSettings">
        <Popover.Content>
          {/* <a href="javascript:void(0)" onClick={() => this.onLikeBtnPresssurvey(val.type_id, 'survey', index)} className={ val.myrating == true ? 'dskDotsMenuSettingsIcon active' : 'dskDotsMenuSettingsIcon' } >
					<span>
					<img src={likeIcon} alt="Like"    className="translate_both dskGrLeftShareImg" />
					<img src={likeIconActive} alt="Like"   className="translate_both dskGrLeftShareImgActive" />
					</span>
					Like
				</a>

        

				<a href="javascript:void(0)" className={ val.vault == 0 ? 'dskDotsMenuSettingsIcon ' : 'dskDotsMenuSettingsIcon active' } >
					<span>
				<img src={vaultIcon} alt="Vault" onClick={() => this.onvaultPress(val.type_id, 'gr', index, 1)} className="translate_both dskGrLeftShareImg" />
				<img src={vaultIconActive} alt="Vault"onClick={() => this.onvaultPress(val.type_id, 'gr', index, 0)}  className="translate_both dskGrLeftShareImgActive" />
				</span>
					Vault
				</a> */}
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
              url: val.deeplink, // (defaults to current url)
              image: "https://bit.ly/2CMhCMC", // (defaults to og:image or twitter:image)
              description: val.survey_title.substring(0, 100) + "...", // (defaults to og:description or twitter:description)
              title: val.survey_description, // (defaults to og:title or twitter:title)
              message: "", // (only for email sharing)
              subject: "", // (only for email sharing)
              username: "Medwiki view", // (only for twitter sharing)
            }}
          />
          {/* <a href="javascript:void(0)" className="dskDotsMenuNotRelevant">
					Not Relevant for me
				</a> */}
        </Popover.Content>
      </Popover>
    );
    return (
      <>
        <OverlayTrigger
          placement="left-start"
          rootClose="true"
          rootCloseEvent="click"
          trigger="click"
          delay={{ show: 50, hide: 50 }}
          overlay={popover}
        >
          <div className="dskDotsMenu dskDotsCircle mblDotsMenuPllsQzsCard">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </OverlayTrigger>
      </>
    );
  }

  popover_view_session(val, index) {
    let popover = (
      <Popover id="popover-basic" className="dskDotsMenuSettings">
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
              url: val.deeplink, // (defaults to current url)
              image: "https://bit.ly/2CMhCMC", // (defaults to og:image or twitter:image)
              description: val.session_topic.substring(0, 100) + "...", // (defaults to og:description or twitter:description)
              title: val.session_topic, // (defaults to og:title or twitter:title)
              message: "", // (only for email sharing)
              subject: "", // (only for email sharing)
              username: "Medwiki view", // (only for twitter sharing)
            }}
          />
        </Popover.Content>
      </Popover>
    );
    return (
      <>
        <OverlayTrigger
          placement="left-start"
          rootClose="true"
          rootCloseEvent="click"
          trigger="click"
          delay={{ show: 50, hide: 50 }}
          overlay={popover}
        >
          <div className="mblDotsMenu mblDotsMenuSssnCard">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </OverlayTrigger>
      </>
    );
  }

  popover_view(val, index) {
    let popover = (
      <Popover id="popover-basic" className="dskDotsMenuSettings">
        <Popover.Content>
          <a
            href="javascript:void(0)"
            onClick={() =>
              this.onLikeBtnPressmedwiki(val.type_id, "comp", index)
            }
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

          <a
            href="javascript:void(0)"
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
                onClick={() =>
                  this.onvaultPressMedwiki(val.type_id, "gr", index, 1)
                }
                className="translate_both dskGrLeftShareImg"
              />
              <img
                src={vaultIconActive}
                alt="Vault"
                onClick={() =>
                  this.onvaultPressMedwiki(val.type_id, "gr", index, 0)
                }
                className="translate_both dskGrLeftShareImgActive"
              />
            </span>
            Vault
          </a>

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
              url: val.deeplink, // (defaults to current url)
              image: "https://bit.ly/2CMhCMC", // (defaults to og:image or twitter:image)
              description: val.answer.substring(0, 100) + "...", // (defaults to og:description or twitter:description)
              title: val.question, // (defaults to og:title or twitter:title)
              message: "", // (only for email sharing)
              subject: "", // (only for email sharing)
              username: "Medwiki view", // (only for twitter sharing)
            }}
          />
          {/* <a href="javascript:void(0)" className="dskDotsMenuNotRelevant">
					Not Relevant for me
				</a> */}
        </Popover.Content>
      </Popover>
    );
    return (
      <>
        <OverlayTrigger
          placement="left-start"
          rootClose="true"
          rootCloseEvent="click"
          trigger="click"
          delay={{ show: 50, hide: 50 }}
          overlay={popover}
        >
          <div className="mblDotsMenu mblDotsMenuMedWikiCard">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </OverlayTrigger>
      </>
    );
  }

  popover_view_mobile(val) {
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
            //this.load_all_data();

            prev_comment = [];

            fetch(
              url +
              "knwlg/nested_comment?type_id=" +
              this.props.match.params.id +
              "&type=gr",
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

                $(".count_com").text(
                  "" + (parseInt($(".count_com").text()) + 1) + ""
                );
              })
              .catch((error) => { });
          } else {
          }
        })
        .catch((error) => { });
    }
  }

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
            // this.load_all_data();

            prev_comment = [];

            fetch(
              url +
              "knwlg/nested_comment?type_id=" +
              this.props.match.params.id +
              "&type=gr",
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

                $(".count_com").text(
                  "" + (parseInt($(".count_com").text()) + 1) + ""
                );
              })
              .catch((error) => { });
          } else {
          }
        })
        .catch((error) => { });
    }
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
              {data.gr_content_title ? <span className="colorWhite font_10px dskGrDtlsAttachedName">{data.gr_content_title}</span> : null}
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
              {data.gr_content_title ? <span className="colorWhite font_10px dskGrDtlsAttachedName">{data.gr_content_title}</span> : null}
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
              {data.gr_content_title ? <span className="colorWhite font_10px dskGrDtlsAttachedName">{data.gr_content_title}</span> : null}
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
              {data.gr_content_title ? <span className="colorWhite font_10px dskGrDtlsAttachedName">{data.gr_content_title}</span> : null}
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
    console.log("ready to reddirect" + id);
    this.props.history.push({
      pathname: "/SpqDetails/" + id + "",
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
          // this.renderSurvey(val,index)
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
          // this.renderPoll(val.json_data,val.survey_id, val.point,val,index)
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
          // this.renderSurvey(val,index)
        );
      default:
        return false;
    }
  }

  redirectToSpqDetail = (id) => {
    this.props.history.push({
      pathname: "/SpqDetails/" + id + "",
    });
  };

  renderSurvey(val, index1) {
    return (
      <div className="mblPllsSrvsCard mblRecentCard">
        <div className="full_width radius-6 mblPllsSrvs_link">
          <div className="full_width mblPllsSrvsPic">
            <div className="overlay"></div>
            {val.image == "" || val.image == null ? null : (
              <img src={val.image} className="object_fit_cover" />
            )}
            <div className="mblPllsSrvsTag">
              <span className="font500 colorWhite font_14px">
                {val.category == "survey" ? "Survey" : "Quiz"}
              </span>
            </div>
            {this.popover_view_surv(val, index1)}
          </div>
          <div className="full_width mblPllsSrvsContent">
            <div className="full_width radius-6 mblPllsSrvsDrwBox">
              {val.specialities_name === "" ||
                val.specialities_name === null ? null : (
                <div className="colorBlack font_12px font400 radius-6 mblMedWikiSpeacality">
                  {this.first_spec(val.specialities_name)}
                  {this.popover_view_spec(val.specialities)}
                  {/* <span className="mblMedWikiSpeacalityDots">
			<span></span>
			<span></span>
			<span></span>
		  </span> */}
                </div>
              )}
              <h5 className="font400 text-center colorBlack font_14px text-uppercase mblPllsSrvsPoints">
                <span className="font_24px font700">{val.point}</span> Points
              </h5>
            </div>

            <div className="clearfix"></div>
            <h3 className="font400 colorBlack font_16px mblPllsSrvsContentTtl">
              {val.survey_title}
            </h3>
            <div className="clearfix"></div>
            <h5 className="font400 colorGrey font_14px mblPllsSrvsContentText">
              {setDescription(val.survey_description)}
            </h5>

            <div className="clearfix"></div>
            <div className="full_width mblPllsSrvsbtm">
              <div
                className="colorWhite font_14px fontExo font700 radius-6 mblPllsSrvsbtm_a"
                onClick={() => {
                  this.redirectToSpqDetail(val.survey_id);
                }}
              >
                Begin
                <img src={begainArrow} alt="Begain" />
              </div>
              <Slider {...dskSessionClient} className="dskSessionClient">
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
    );
  }

  renderPoll(dataJson, survey_id, point, val, index1) {
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
      <div className="mblPllsSrvsCard mblPollsCard mblRecentCard">
        <div
          href="javascript:void(0)"
          className="full_width radius-6 mblPllsSrvs_link"
        >
          <div className="full_width mblPollsTop">
            <div className="mblPllsSrvsTag">
              <span className="font500 colorWhite font_14px">Poll</span>
            </div>
            <div className="mblPollsTopRight">
              {val.point == "" || val.point == null ? null : (
                <h5 className="font400 text-center colorBlack font_14px text-uppercase mblPllsSrvsPoints">
                  <span className="font_24px font700">{val.point}</span> Points
                </h5>
              )}

              {this.popover_view_poll(val, index1)}
            </div>
          </div>
          <div className="full_width mblPllsSrvsContent">
            <h3 className="font500 colorBlack font_16px mblPllsSrvsContentTtl">
              {question}{" "}
            </h3>
            <div className="clearfix"></div>
            <div className="full_width srvPollsOptionSet55">
              {currentOptions.map((options, i) => (
                <>
                  <Form.Check
                    id={"option1" + survey_id + i}
                    className={"srvPollsRadio " + "srvPollsRadio" + survey_id}
                    type="radio"
                    ref={"ref_" + i}
                    name={"option1" + survey_id}
                    onChange={this.onPollSubmit.bind(
                      this,
                      arr_new,
                      options,
                      survey_id,
                      point,
                      i
                    )}
                    value={options.value}
                    label={options.label}
                    checked={this.state.checkedRadio == survey_id + i}
                  />
                  <div id={"srvPollResult" + survey_id}>
                    {
                      // (resultOption != null|| resultOption != undefined)?this.renderPollResult(resultOption):null
                    }
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  onPollSubmit(
    arr_new,
    options,
    survey_id,
    point,
    i // for single type questions
  ) {
    //console.log('On poll submit'+'survey_points\n'+point)
    arr_new[0].selectedIndex = i;
    this.submitPollAnswer(survey_id, arr_new, point, i);
    this.setState({ checkedRadio: survey_id + i });
  }

  submitPollAnswer(id, answerjson, point, boxIndex) {
    // //console.log('dataJson'+'survey_id'+id);
    if (
      id == null ||
      id == "" ||
      id == undefined ||
      answerjson == null ||
      answerjson == "" ||
      answerjson == undefined
    ) {
      //console.log('id or answer can not be empty')
    } else {
      let answerData = {
        survey_id: id,
        answer_json: JSON.stringify(answerjson),
      };
      fetch(url + "survey/pollAnswer", {
        method: "POST",
        headers: {
          Authorization: reactLocalStorage.get(
            "@ClirnetStore:refreshToken",
            true
          ),
          version: "rjsw 1.1.1",
        },
        body: JSON.stringify(answerData),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          // alert('Congrats! You got '+JSON.stringify(responseJson)+' Points')
          let status_code = responseJson.status_code;
          if (status_code == 200) {
            let responseData = responseJson.data;
            this.addPoints(id, point);
            let name = "option1" + id;
            let boxId = "option1" + id + boxIndex;

            $("input[id=" + boxId + "]").attr("checked", true);
            $("input[id=" + boxId + "]").addClass("surveyPollsRadioCheckdF");
            $("input[name=" + name + "]").attr("disabled", true);
            this.getPollAnswer(id, boxIndex);
          }
        })
        .catch((error) => {
          //console.log("Error"+error);
        });
    }
  }

  addPoints(id, survey_points) {
    if (id == "" || id == undefined) {
      //   //console.log('addPoints'+id+'::'+survey_points)
    } else {
      let pointsData = {
        survey_id: id,
        point: survey_points,
      };
      fetch(url + "survey/addpoint", {
        method: "POST",
        body: JSON.stringify(pointsData),
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
          let responseData = responseJson.data;
          let success = responseJson.status_code;
          if (success == 200) {
            ToastsStore.success(
              "Congratulation! You Win " + survey_points + " Points"
            );
          } else {
            ToastsStore.error("Failed to update point");
          }
        })
        .catch((error) => {
          //console.log("Error"+error);
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
        medwiki_data[array_index].vault = responseJson.data;

        if (responseJson.data == 1) {
          reactLocalStorage.set(
            "@ClirnetStore:vault_count",
            parseInt(reactLocalStorage.get("@ClirnetStore:vault_count", 0)) + 1
          );
        }

        if (responseJson.data == 0) {
          reactLocalStorage.set(
            "@ClirnetStore:vault_count",
            parseInt(reactLocalStorage.get("@ClirnetStore:vault_count", 0)) - 1
          );
        }

        this.setState({ data_medwiki: medwiki_data });
      })
      .catch((error) => { });
  };

  getPollAnswer(id, boxIndex) {
    if (id == "" || id == undefined) {
    } else {
      fetch(url + "survey/pollResult?id=" + id, {
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
          let responseData = responseJson.data;
          let success = responseJson.status_code;
          let parentDivId = "#srvPollResult" + id;
          let boxId = ".srvPollsRadio" + id;
          if (success == 200) {
            let _this = this;
            let eleArr = [];
            let mData = JSON.parse(unescape(responseData));
            mData.map(function (i) {
              $(boxId).hide(500, function () {
                $(this).remove();
              });
              let currentOption = i.options;
              let selectedIndexPoll = i.selectedIndex;
              let resultOpt = _this.renderPollResult(
                currentOption,
                selectedIndexPoll
              ); //ReactHtmlParser("<div class='colorBlue'>hi</div>");
              $(parentDivId).show(500, function () {
                $(this).html(resultOpt);
              });
            });
            this.refresh();
          } else {
            // alert("Failed to update point");
          }
        })
        .catch((error) => {
          //console.log("Error"+error);
        });
    }
  }

  renderPollResult = (currentOptions, selectedIndexPoll) => {
    let opt = "";
    currentOptions.map((options, i) => {
      if (i == selectedIndexPoll) {
        opt +=
          '<div class="srvPollsProgressBar"><div class="srvPollsProgressBarIn font_12px colorBlue font600 ">' +
          options.label;
        opt +=
          '<span class="srvPollsProgressBarValue">' +
          options.vote +
          '%</span></div><div class="myprogress"><div class="myprogress_bar" style="width:' +
          options.vote +
          '%"></div></div></div>';
      } else {
        opt +=
          '<div class="srvPollsProgressBar"><div class="srvPollsProgressBarIn font_12px colorBlack font600 ">' +
          options.label;
        opt +=
          '<span class="srvPollsProgressBarValue">' +
          options.vote +
          '%</span></div><div class="myprogress"><div class="myprogress_bar" style="width:' +
          options.vote +
          '%"></div></div></div>';
      }
    });
    return opt;
  };

  scroll_to_comment() {
    $("html, body").animate(
      {
        scrollTop: $("#comment_section").offset().top - 100,
      },
      2000
    );
  }

  redirect_session(val) {
    if (val.status_name == "Close") {
      if (
        val.video_archive_id != null &&
        val.video_archive_id != "null" &&
        val.video_archive_id != undefined &&
        val.video_archive_id != ""
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

  //Compendium detail redirecton
  redirect_to_compendium_detail(id) {
    reactLocalStorage.set("@ClirnetStore:source", "Medwiki Page");
    this.props.history.push({
      pathname: "/Feeddetail/" + id + "",
    });
  }

  onReadMoreClick(){
    this.setState({ rerender: !this.state.rerender });
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
        <Header history={this.props.history} page_name={pageNames} />
        {(this.state.data_main.length==0)?
        <div className="full_width dskGr">
            <div className="container mycontainer">
              <div className="row">
                <div className="full_width">
                  <div className="full_width dskBody">
                    <div className="row">
                      <div className="col-lg-9 col-12 dskLeft">
                        <FeedDetailLoader/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>:null}
        {this.state.data_main.length > 0 ? (
          <div className="full_width mblGrDtls">
            {/* Ads------------- */}
            <section className="full_width adsArea">
              <div className="full_width adsFrame">
                <Banner
                  type_id={this.id}
                  type={"gr"}
                  apiresponserecieved={this.display_banner}
                  api_call_detail={1}
                  api_call={0}
                />

                {this.state.banner_display == true ? (
                  <Banner
                    type_id={this.id}
                    banner_position={1}
                    unmount_call={1}
                    type={"gr"}
                    api_call={1}
                    before_unload_call={1}
                  />
                ) : null}
              </div>
            </section>
            {/* Ads------------- */}

            <div className="full_width">
              {/* <Loader
                className="loader_cmn"
                type="ThreeDots"
                color="#355ed3"
                height={80}
                width={80}
                visible={this.state.is_loader}
              /> */}

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
                  <h1 className={this.state.association_status ==1 ?"font_20px font500 colorBlack mblMainGrTtl":"font_20px font500 colorBlack mblMainGrTtl text-center"}>
                    {r.title}
                  </h1>
                  <div className="clearfix"></div>
                  <div className="full_width mblGrLeftVideo">
                    {r.media_type === "video" ? (
                      <ReactPlayer
                        controls={true}
                        playing={true}
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
                  <div className="clearfix"></div>
                  {(r.title_video) ? <h1 className="font_20px font500 colorBlack mblMainGrTtl">
                    {r.title_video}
                  </h1> : null}
                  <div className="clearfix"></div>
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
                      {/* <a
                        onClick={() => {
                          this.setState({ showModal_main: true });
                        }}
                        href="javascript:void(0)"
                      >
                        <img src={ShareIcon} alt="Share" />
                      </a> */}
                          <ShareDetailPage     
                                  data={{
                                    title: r.title,
                                    text: r.description,
                                    url: r.deeplink,
                                  }}
                                />
                    </div>
                    {(this.state.association_status==1)?
                    <a
                      href="javascript:void(0)"
                      onClick={() => this.scroll_to_comment()}
                    >
                      <img src={commentsIcon} alt="comments" />{" "}
                      <span className="colorBlack font_14px">
                        {r.comment_count} Comments
                      </span>
                    </a>:null}
                  </div>

                  <div className="full_width colorGrey font400 font_16px mblGrLeftDescription">
                    {/* {this.state.association_status ===1 ? r.description: associationDescription(r.description)}   */}
                    {this.state.association_status == 1 ? <>{r.description}</>: <AssociationDescription data={r.description} onReadMoreClick={this.onReadMoreClick.bind(this)}/>}  
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
                      {(this.state.association_setting && this.state.association_setting.master_doctor) ? this.state.association_setting.master_doctor : ' Master Doctor'}
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
                              <div className="font_12px colorGrey font700 dskGrMstrDocBoxContent">
                                <h4 className="font_14px colorBlack font600">
                                  {rdoctor.session_doctor_name}
                                </h4>
                                {this.state.association_status !=1 && rdoctor.gr_doc_description? <h4 className="font_12px colorBlack font400">{rdoctor.gr_doc_description}</h4>:<h4 className="font_12px colorBlack font400">{rdoctor.subtitle}</h4>}
                                {/* {(rdoctor.subtitle) ? <h4 className="font_12px colorWhite font400">{rdoctor.subtitle}</h4> : null} */}
                                <p>{rdoctor.DepartmentName}</p>
                              </div>
                            </div>
                            <div className="radius-6 dskGrMstrDocProfile">
                              <img
                                src={rdoctor.session_doctor_image}
                                className="object_fit_cover"
                              />
                              <div className="overlay"></div>
                              <div className="full_width font_12px colorWhite font700 dskGrMstrDocProfileTxt">
                                <h4 className="font_14px colorWhite font600">
                                  {rdoctor.session_doctor_name}
                                </h4>
                                {this.state.association_status !=1 && rdoctor.gr_doc_description? <h4 className="font_12px colorWhite font400">{rdoctor.gr_doc_description}</h4>:<h4 className="font_12px colorWhite font400">{rdoctor.subtitle}</h4>}
                                {/* {(rdoctor.subtitle) ? <h4 className="font_12px colorWhite font400">{rdoctor.subtitle}</h4> : null} */}
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
              {(this.state.data_archive.length > 0) ?
                <section className="full_width text-left dskGrMoreList dskgrMedwikiList">
                  {(this.state.association_setting && this.state.association_setting.video_archive) ?
                    <h4 className="font_24px font400 colorBlack mblGrMoreTtl">
                      {this.state.association_setting.video_archive}
                      <span className="font_16px">
                        ({this.state.video_archive.length})
                      </span>
                    </h4> : null}
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
                      <ArcVideoSmallCard onChangeButton={this.handle_change_arc} history={this.props.history} mobile_device={isMobile} card_data={rmed} clicked_index={selected_arc_popover_index} elem_key={indexmed} custom_class="gr_page_medwiki" />
                    ))}
                    <div className="col relatedButtns" >
                      <div className="text-uppercase text-center colorWhite font_14px fontExo font400 radius-6 mblSessionbtm_a more_but_switch" onClick={() => { this.onViewMoreClick() }}>
                        <span>View More</span>
                      </div>
                    </div>
                  </Masonry>
                </section> : null}
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
                    {(this.state.association_setting && this.state.association_setting.live_CME) ? this.state.association_setting.live_CME : 'LiveCME\'s'}
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
                  {this.state.banner_display == true ? (
                    <Banner
                      type_id={this.id}
                      banner_position={2}
                      unmount_call={0}
                      type={"gr"}
                      api_call={1}
                      before_unload_call={0}
                    />
                  ) : null}
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
          null
          // <Loader
          //   className="loader_cmn"
          //   type="ThreeDots"
          //   color="#355ed3"
          //   height={80}
          //   width={80}
          //   visible={this.state.is_loader}
          // />
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
                {/* Master Doctors */}
                {(this.state.association_setting && this.state.association_setting.master_doctor) ? this.state.association_setting.master_doctor : ' Master Doctor'}
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
                      <div className="font_12px colorGrey font700 dskGrMstrDocBoxContent">
                        <h4 className="font_14px colorBlack font600">
                          {rdoctor.session_doctor_name}
                        </h4>
                        {this.state.association_status !=1 && rdoctor.gr_doc_description? <h4 className="font_12px colorBlack font400">{rdoctor.gr_doc_description}</h4>:<h4 className="font_12px colorBlack font400">{rdoctor.subtitle}</h4>}
                        {/* {(rdoctor.subtitle) ? <h4 className="font_12px colorBlack font400">{rdoctor.subtitle}</h4> : null} */}
                        <p>{rdoctor.DepartmentName}</p>
                      </div>
                    </div>
                    <div className="radius-6 dskGrMstrDocProfile">
                      <img
                        src={rdoctor.session_doctor_image}
                        className="object_fit_cover"
                      />
                      <div className="overlay"></div>
                      <div className="full_width font_12px colorWhite font700 dskGrMstrDocProfileTxt">
                        <h4 className="font_14px colorWhite font600">
                          {rdoctor.session_doctor_name}
                        </h4>
                        {/* {(rdoctor.subtitle) ? <h4 className="font_12px colorBlack font400">{rdoctor.subtitle}</h4> : null} */}
                        {this.state.association_status !=1 && rdoctor.gr_doc_description? <h4 className="font_12px colorBlack font400">{rdoctor.gr_doc_description}</h4>:<h4 className="font_12px colorBlack font400">{rdoctor.subtitle}</h4>}
                        <p>{rdoctor.profile}</p>
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
