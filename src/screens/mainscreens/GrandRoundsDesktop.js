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

import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { InlineShareButtons } from "sharethis-reactjs";
import AppConfig from "../config/config.js";
import angaleWhite from "../../desktopImages/angaleWhite.png";
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
import Sessioncard from "../Cards/Sessioncard";
import ReactPlayer from "react-player";
import QuizCard from "../Cards/QuizCard.js";
import PollCard from "../Cards/PollCard.js";
import SurveyCard from "../Cards/SurveyCard.js";
import ArcVideoSmallCard from "../Cards/ArcVideoSmallCard.js";
import FeedDetailLoader from "../LoadingPlaceholders/FeedDetailLoader.jsx";
import RelatedMedwikiLoader from "../LoadingPlaceholders/RelatedMedwikiLoader.jsx";
import AttachedFileLoader from "../LoadingPlaceholders/AttachedFileLoader.jsx";
import Moment from "react-moment";

import "react-toastify/dist/ReactToastify.css";
import { ToastsContainer, ToastsStore } from "react-toasts";
import announcementClose from "../../mobImages/announcementClose.png";
import Banner from "../mainscreens/Banner";
import AssociationDescription from "../components/AssociationDescription.jsx";
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

const popover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">Popover right</Popover.Title>
    <Popover.Content>
      And here's some <strong>amazing</strong> content. It's very engaging.
      right?
    </Popover.Content>
  </Popover>
);
var selected_medwiki_popover_index = -1;

var selected_session_popover_index = -1;
const pageNames = "Grand Rounds";
var main_cont_wirhout_citation = "";
var citation_text_parsed = [];
let related_comp = [];
const url = AppConfig.apiLoc;

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
  is_loader: true,
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
class GrandRoundsDesktop extends React.Component {
  constructor(props) {
    console.log("-------->>props", props);
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
      banner_display: false,
      association_status: 1,
      association_setting: "",
    };
    gr_survey_list = [];
    selected_arc_popover_index = -1;
    arcDataFetchLimit = 0;
    this.fetchArchiveData(this.id, arcDataFetchLimit);
    gr_survey_default_index = -1;
    this.handle_change_arc = this.handle_change_arc.bind(this);

    this.fetchSurveyData(this.props.match.params.id);

    this.handle_change = this.handle_change.bind(this);

    if (isMobile) {
      this.props.history.push({
        pathname: "/GrandRoundsMobile/" + this.props.match.params.id + "",
      });
    } else {
    }

    readyCounter = 0;
    this.display_banner = this.display_banner.bind(this);
  }

  display_banner(datam) {
    this.setState({ banner_display: true });

    //alert(datam)
  }

  parseFeedResponseData(response) {
    if (response) {
      let rData = response.data;
      if (rData.con_type === "video") {
        VideoJson.type_id = rData.type_id;
        if (rData.question) {
          VideoJson.name = rData.title.substring(0, 30) + "...";
        } else {
          VideoJson.name = "GR Video";
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

      let arc_extra = $(e.target).parents(".arc_extra_class").length;
      if (arc_extra == 0 && !$(e.target).hasClass("arc_extra_class")) {
        selected_arc_popover_index = -1;
        that.setState({ is_loader: false });
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
          this.parseFeedResponseData(responseJson);
          console.log("=====>>data_main", responseJson.data);
          responseJson.data.map((r) => {
            main_data.push(r);
          });
          this.setState({ data_main: main_data });

          this.setState({ is_loader_main: 0 });
          this.setState({ is_loader: false });

          this.setState({
            association_status: main_data[0].association_status,
          });
          if (main_data[0].association_setting) {
            let tempSetting = JSON.parse(main_data[0].association_setting);
            this.setState({ association_setting: tempSetting });
          }
          // alert("status:"+main_data[0].association_status+'\nsettings\n'+main_data[0].association_setting);
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
                "<div class='overlay'></div><span id='view-master-doctor'  class='dskGrMstrDocCount plus_icon' style='cursor: pointer;'>+" +
                  (countcir - 4) +
                  "</span>"
              );
            // this.refresh()
          });

          //$(".dskGrMstrDocBox:nth-child(5)").find(".dskGrMstrDocProfile").remove();
          //$(".dskGrMstrDocBox:nth-child(5)").find(".dskGrMstrDocBoxInPic").append("<div  class='overlay'></div><span  class='dskGrMstrDocCount plus_icon'>+"+Math.abs(extra_val)+"</span>");
          var that = this;
          $(".plus_icon").click(function () {
            that.setState({ showModal_doc: true });
          });

          //let file_data=JSON.parse(main_data[0].gr_files);

          //alert(main_data[0].gr_files)
        } else {
          this.props.history.push({
            pathname: `/`,
          });
        }
      })
      .catch((error) => {});

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
          ////console.log(medwiki_data[0].specialities)
        } else {
          this.props.history.push({
            pathname: `/`,
          });
        }
      })
      .catch((error) => {});

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
        } else {
          this.props.history.push({
            pathname: `/`,
          });
        }
      })
      .catch((error) => {});

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
      .catch((error) => {});

    //dskGrMstrDocBox dskGrMstrDocPopShow
    $(".dskGrMstrDocRow").each(function () {
      if ($(this).children(".dskGrMstrDocBox").length > 1) {
        $(".dskGrMstrDocBox").addClass("dskGrMstrDocPopShow");
      } else {
        $(this).children(".dskGrMstrDocBox").removeClass("dskGrMstrDocPopShow");
      }
    });
    $(window).bind("load resize", function () {
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
    });

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
        this.refresh();
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
      .catch((error) => {});
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

        //this.setState({ "data_session": session_data })

        this.refresh();
      })
      .catch((error) => {});
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

        // this.setState({ "data_session": session_data })
        this.refresh();
      })
      .catch((error) => {});
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
      .catch((error) => {});
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

  onViewMoreClick() {
    this.fetchArchiveData(this.id, arcDataFetchLimit);
  }

  fetchArchiveData(id, fetchForm) {
    fetch(
      url + "gr/archiveVideoList?type_id=" + id + "&to=10&from=" + fetchForm,
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
        if (status_code == 200) {
          if (responseJson.data.length < 10) {
            $(".more_but_switch").remove();
          }
          arcDataFetchLimit += 10;
          if (responseJson.data.length > 0) {
            this.setState({
              data_archive: [...this.state.data_archive, ...responseJson.data],
            });
          }
        }
      })
      .catch((error) => {
        //console.log("Error"+error);
      });
  }

  handle_change_arc(index, value, type) {
    temp_data_archive = this.state.data_archive;
    if (type == "vault") {
      temp_data_archive[index].vault = value;
      this.setState({ data_archive: temp_data_archive });
    }
    if (type == "like") {
      if (value != true) {
        temp_data_archive[index].myrating = false;
        temp_data_archive[index].rating =
          parseInt(temp_data_archive[index].rating) - 1;
      } else {
        temp_data_archive[index].myrating = true;
        temp_data_archive[index].rating =
          parseInt(temp_data_archive[index].rating) + parseInt(value);
      }
      this.setState({ data_archive: temp_data_archive });
    }
    if (type == "popover") {
      selected_arc_popover_index = index;
      this.setState({ rerender: !this.state.rerender });
    }
    if (type == "popover_session") {
      selected_session_popover_index = index;
      this.setState({ rerender: !this.state.rerender });
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
      .catch((error) => {});
  };

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
                  this.onvaultPressMedwiki(val.type_id, "comp", index, 1)
                }
                className="translate_both dskGrLeftShareImg"
              />
              <img
                src={vaultIconActive}
                alt="Vault"
                onClick={() =>
                  this.onvaultPressMedwiki(val.type_id, "comp", index, 0)
                }
                className="translate_both dskGrLeftShareImgActive"
              />
            </span>
            Vault
          </a>

          {/* <a href="javascript:void(0)" className="dskDotsMenuNotRelevant">
					Not Relevant for me
				</a> */}
          <ShareDetailPage
            data={{
              title: val.question,
              text: val.answer,
              url: val.deeplink,
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
          <div className="dskDotsMenu mblDotsMenuMedWikiCard">
            <span></span>
            <span></span>
            <span></span>
          </div>
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
      <Popover id="popover-basic" className="specialty_popOver">
        <Popover.Content className="font_12px">
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
              .catch((error) => {});
          } else {
          }
        })
        .catch((error) => {});
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
              .catch((error) => {});
          } else {
          }
        })
        .catch((error) => {});
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
        <div className="col-md-3 dskGrDtlsAttachedBox dskGrAttchdFileType-img">
          <div className="full_width radius-6 dskGrDtlsAttachedBoxIn">
            <img src={data.gr_content_url} className="dskGrDtlsAttachedPic" />
            <a target="_blank" href={data.gr_content_url} download>
              <div className="dskGrDtlsAttachedDownl transition6s">
                <img
                  src={downloadIcon}
                  alt="download"
                  className="translate_both"
                />
              </div>
              {data.gr_content_title ? (
                <span className="colorWhite font_10px dskGrDtlsAttachedName">
                  {data.gr_content_title}
                </span>
              ) : null}
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
        <div className="col-md-3 dskGrDtlsAttachedBox dskGrAttchdFileType-doc">
          <div className="full_width radius-6 dskGrDtlsAttachedBoxIn">
            <img src={fileTypeWord} className="dskGrDtlsAttachedPic" />
            <a target="_blank" href={data.gr_content_url} download>
              <div className="dskGrDtlsAttachedDownl transition6s">
                <img
                  src={downloadIcon}
                  alt="download"
                  className="translate_both"
                />
              </div>
              {data.gr_content_title ? (
                <span className="colorWhite font_10px dskGrDtlsAttachedName">
                  {data.gr_content_title}
                </span>
              ) : null}
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
        <div className="col-md-3 dskGrDtlsAttachedBox dskGrAttchdFileType-doc">
          <div className="full_width radius-6 dskGrDtlsAttachedBoxIn">
            <img src={fileTypePdf} className="dskGrDtlsAttachedPic" />
            <a target="_blank" href={data.gr_content_url} download>
              <div className="dskGrDtlsAttachedDownl transition6s">
                <img
                  src={downloadIcon}
                  alt="download"
                  className="translate_both"
                />
              </div>
              {data.gr_content_title ? (
                <span className="colorWhite font_10px dskGrDtlsAttachedName">
                  {data.gr_content_title}
                </span>
              ) : null}
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
        <div className="col-md-3 dskGrDtlsAttachedBox dskGrAttchdFileType-doc">
          <div className="full_width radius-6 dskGrDtlsAttachedBoxIn">
            <img src={fileTypeWord} className="dskGrDtlsAttachedPic" />
            <a target="_blank" href={data.gr_content_url} download>
              <div className="dskGrDtlsAttachedDownl transition6s">
                <img
                  src={downloadIcon}
                  alt="download"
                  className="translate_both"
                />
              </div>
              {data.gr_content_title ? (
                <span className="colorWhite font_10px dskGrDtlsAttachedName">
                  {data.gr_content_title}
                </span>
              ) : null}
            </a>
          </div>
        </div>
      );
    }
  }
  refresh = () => {
    this.setState({ display: !this.state.display });
  };

  redirectToSpqDetail = (id) => {
    this.props.history.push({
      pathname: "/SpqDetails/" + id + "",
    });
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

  handle_change(index, value, type) {
    if (type == "vault") {
      medwiki_data[index].vault = value;

      this.setState({ data_medwiki: medwiki_data });
    }

    if (type == "like") {
      if (value != true) {
        medwiki_data[index].myrating = false;
        medwiki_data[index].rating = parseInt(medwiki_data[index].rating) - 1;
      } else {
        medwiki_data[index].myrating = true;
        medwiki_data[index].rating =
          parseInt(medwiki_data[index].rating) + parseInt(value);
      }

      this.setState({ data_medwiki: medwiki_data });
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

  onReadMoreClick() {
    this.setState({ rerender: !this.state.rerender });
  }

  render() {
    return (
      <div
        className={
          isMobile == true ? "full_width mblScreen" : "full_width dskScreen"
        }
      >
        <Header history={this.props.history} page_name={pageNames} />
        {this.state.data_main.length == 0 ? (
          <div className="full_width dskGr">
            <div className="container mycontainer">
              <div className="row">
                <div className="full_width">
                  <div className="full_width dskBody">
                    <div className="row">
                      <div className="col-lg-9 col-12 dskLeft">
                        <FeedDetailLoader />
                      </div>
                      <div className="col-lg-3 col-12 dskRight">
                        <AttachedFileLoader />
                        <AttachedFileLoader />
                        <AttachedFileLoader />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {
          this.state.data_main.length > 0 ? (
            <div className="full_width dskGr">
              <div className="container mycontainer">
                <div className="row">
                  <div className="full_width">
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

                    <div className="full_width dskBody">
                      <div className="row">
                        <div className="col-lg-9 col-12 dskLeft">
                          {this.state.data_main.map((r, indexii) => (
                            <section className="full_width text-left dskGrLeftMain">
                              <div className="full_width dskGrLeftTop">
                                <div className="colorBlack font_12px font400 radius-6 bgColorWhite mblMedWikiSpeacality">
                                  {this.first_spec(r.specialities)}
                                  {r.specialities.split(",").length > 1
                                    ? this.popover_view_spec(r.specialities)
                                    : null}
                                </div>
                              </div>
                              <div className="clearfix"></div>

                              <h1
                                className={
                                  this.state.association_status == 1
                                    ? "font_20px font500 colorBlack dskMainGrTtl"
                                    : "font_20px font500 colorBlack dskMainGrTtl text-center"
                                }
                              >
                                {r.title}
                              </h1>

                              <div className="clearfix"></div>

                              <div className="full_width dskGrLeftVideo">
                                {r.media_type === "video" ? (
                                  //  <HlsPlayer data={VideoJson} />
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
                              {r.title_video ? (
                                <h1 className="font_20px font500 colorBlack dskMainGrTtl">
                                  {r.title_video}
                                </h1>
                              ) : null}
                              <div className="clearfix"></div>

                              <div className="full_width dskGrLeftVideoSharePnl">
                                <div className="dskGrLeftVideoSharePnlLeft">
                                  <a
                                    href="javascript:void(0)"
                                    className={
                                      r.myrating == true ? "active" : ""
                                    }
                                  >
                                    <img
                                      src={likeIcon}
                                      alt="Like"
                                      onClick={() =>
                                        this.onLikeBtnPress(
                                          r.type_id,
                                          r.type,
                                          indexii
                                        )
                                      }
                                      className="translate_both dskGrLeftShareImg"
                                    />
                                    <img
                                      src={likeIconActive}
                                      alt="Like"
                                      onClick={() =>
                                        this.onLikeBtnPress(
                                          r.type_id,
                                          r.type,
                                          indexii
                                        )
                                      }
                                      className="translate_both dskGrLeftShareImgActive"
                                    />
                                  </a>

                                  <a
                                    href="javascript:void(0)"
                                    onClick={() =>
                                      this.onvaultPress(
                                        r.type_id,
                                        r.type,
                                        indexii,
                                        0
                                      )
                                    }
                                    className={r.vault != 0 ? "active" : ""}
                                  >
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
                                {this.state.association_status == 1 ? (
                                  <a
                                    href="javascript:void(0)"
                                    onClick={() => this.scroll_to_comment()}
                                  >
                                    <img src={commentsIcon} alt="comments" />{" "}
                                    <span className="colorBlack font_14px">
                                      {r.comment_count} Comments
                                    </span>
                                  </a>
                                ) : null}
                              </div>

                              <div className="full_width colorGrey font400 font_16px dskGrLeftDescription">
                                {this.state.association_status == 1 ? (
                                  <>{r.description}</>
                                ) : (
                                  <AssociationDescription
                                    data={r.description}
                                    onReadMoreClick={this.onReadMoreClick.bind(
                                      this
                                    )}
                                  />
                                )}
                              </div>

                              {this.state.doctors.length != 0 ? (
                                <Modal
                                  className="in dskSharePop"
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
                                        this.setState({
                                          showModal_main: false,
                                        });
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
                                          r.description.substring(0, 100) +
                                          "...", // (defaults to og:description or twitter:description)
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
                          ))}
                          {/* /////////////Added by sumit/////////////////// */}
                          {this.state.data_archive.length > 0 ? (
                            <section className="full_width text-left dskGrMoreList dskgrMedwikiList">
                              {this.state.association_setting &&
                              this.state.association_setting.video_archive ? (
                                <h4 className="font_24px font400 colorBlack dskGrMoreTtl">
                                  {this.state.association_setting.video_archive}
                                  <span className="font_16px">
                                    ({this.state.video_archive.length})
                                  </span>
                                </h4>
                              ) : null}
                              {/* <h4 className="font_24px font400 colorBlack dskGrMoreTtl">
								{(this.state.association_setting && this.state.association_setting.video_archive)?this.state.association_setting.video_archive:'Archive\'s '} 
									<span className="font_16px">({this.state.data_archive.length})
									</span>
								</h4> */}
                              {/* <div className="clearfix"></div> */}
                              <Masonry
                                className={"dskMasonryCardArea"} // default ''
                                elementType={"ul"} // default 'div'
                                options={masonryOptions} // default {}
                                disableImagesLoaded={false} // default false
                                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                                //imagesLoadedOptions={imagesLoadedOptions} // default {}
                              >
                                {this.state.data_archive.map(
                                  (rmed, indexmed) => (
                                    <ArcVideoSmallCard
                                      onChangeButton={this.handle_change_arc}
                                      history={this.props.history}
                                      mobile_device={isMobile}
                                      card_data={rmed}
                                      clicked_index={selected_arc_popover_index}
                                      elem_key={indexmed}
                                      custom_class="gr_page_medwiki"
                                    />
                                  )
                                )}
                              </Masonry>
                              <a
                                href="javascript:void(0)"
                                onClick={() => {
                                  this.onViewMoreClick();
                                }}
                                className="text-uppercase colorWhite font_16px fontExo font400 radius-6 mblSessionbtm_a dskGrMoreBtn vanish_class_session_but more_but_switch"
                              >
                                <span>
                                  View More <img src={angaleWhite} />
                                </span>
                              </a>
                            </section>
                          ) : null}
                          {/* /////////////Added by sumit/////////////////// */}
                          {this.state.data_medwiki.length > 0 ? (
                            <section className="full_width text-left dskGrMoreList dskgrMedwikiList">
                              <h4 className="font_24px font400 colorBlack dskGrMoreTtl">
                                {this.state.association_setting &&
                                this.state.association_setting.medwiki
                                  ? this.state.association_setting.medwiki
                                  : "Medwiki's"}
                                <span className="font_16px">
                                  ({this.state.data_medwiki.length})
                                </span>
                              </h4>
                              <div className="clearfix"></div>
                              <Masonry
                                className={"dskMasonryCardArea"} // default ''
                                elementType={"ul"} // default 'div'
                                options={masonryOptions} // default {}
                                disableImagesLoaded={false} // default false
                                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                                //imagesLoadedOptions={imagesLoadedOptions} // default {}
                              >
                                {this.state.data_medwiki.map(
                                  (rmed, indexmed) => (
                                    <Medwikicard
                                      onChangeButton={this.handle_change}
                                      history={this.props.history}
                                      mobile_device={isMobile}
                                      card_data={rmed}
                                      clicked_index={
                                        selected_medwiki_popover_index
                                      }
                                      elem_key={indexmed}
                                      custom_class="gr_page_medwiki"
                                    />
                                  )
                                )}
                              </Masonry>

                              {/* <a href="javascript:void(0)" onClick={()=>{ this.remove_class('vanish_class')}} className="text-uppercase colorWhite font_16px fontExo font400 radius-6 mblSessionbtm_a dskGrMoreBtn vanish_class_but">
										<span>View All <img src={angaleWhite} /></span>
									</a> */}
                            </section>
                          ) : null}
                          {this.state.data_session.length > 0 ? (
                            <section className="full_width text-left dskGrMoreList dskgrSsnList">
                              <h4 className="font_24px font400 colorBlack dskGrMoreTtl">
                                {this.state.association_setting &&
                                this.state.association_setting.live_CME
                                  ? this.state.association_setting.live_CME
                                  : "LiveCME's"}
                                <span className="font_16px">
                                  ({this.state.data_session.length})
                                </span>
                              </h4>
                              <div className="clearfix"></div>
                              <Masonry
                                className={"dskMasonryCardArea"} // default ''
                                elementType={"ul"} // default 'div'
                                options={masonryOptions} // default {}
                                disableImagesLoaded={false} // default false
                                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                                //imagesLoadedOptions={imagesLoadedOptions} // default {}
                              >
                                {this.state.data_session.map(
                                  (rsession, indexsession) => (
                                    <Sessioncard
                                      onChangeButton={this.handle_change}
                                      history={this.props.history}
                                      mobile_device={isMobile}
                                      card_data={rsession}
                                      clicked_index={
                                        selected_session_popover_index
                                      }
                                      elem_key={indexsession}
                                      custom_class="gr_page_session_desktop"
                                    />
                                  )
                                )}
                              </Masonry>
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

                          <section className="full_width text-left dskGrMoreList dskgrSurvPllsList">
                            {gr_survey_list != null &&
                            gr_survey_list.length > 0 ? (
                              <h4 className="font_24px font400 colorBlack dskGrMoreTtl">
                                {this.state.association_setting &&
                                this.state.association_setting.activities
                                  ? this.state.association_setting.activities
                                  : "Activities "}
                                <span className="font_16px">
                                  ({gr_survey_list.length})
                                </span>
                              </h4>
                            ) : (
                              <h1>{gr_survey_list.lenght}</h1>
                            )}
                            <div className="clearfix"></div>
                            <Masonry
                              className={"dskMasonryCardArea"} // default ''
                              elementType={"ul"} // default 'div'
                              options={masonryOptions} // default {}
                              disableImagesLoaded={false} // default false
                              updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                              //imagesLoadedOptions={imagesLoadedOptions} // default {}
                            >
                              {gr_survey_list.length > 0 ? (
                                <>
                                  {gr_survey_list.map((val, index) =>
                                    this.renderActivities(val, index)
                                  )}
                                </>
                              ) : null}
                            </Masonry>
                            {/* <a href="javascript:void(0)" className="text-uppercase colorWhite font_16px fontExo font400 radius-6 mblSessionbtm_a dskGrMoreBtn">
										<span>View All <img src={angaleWhite} /></span>
									</a> */}
                          </section>
                          {this.state.association_status != 2 ? (
                            <section
                              className="full_width text-left dskGrMoreList dskComments"
                              id="comment_section"
                            >
                              {main_data.map((r, indexii) => (
                                <h4 className="font_24px font400 colorBlack dskGrMoreTtl">
                                  {this.state.association_setting &&
                                  this.state.association_setting.comments
                                    ? this.state.association_setting.comments
                                    : "Comment(s) "}
                                  {/* Comments{" "} */}
                                  <span className="font_16px">
                                    (
                                    <span class="count_com">
                                      {r.comment_count}
                                    </span>
                                    )
                                  </span>
                                </h4>
                              ))}
                              <div className="clearfix"></div>
                              {this.state.comments.length > 0 ? (
                                <div className="full_width dskCommentsArea">
                                  {this.state.comments.map((r, index) => (
                                    <div className="full_width radius-6 dskCommentsAreaRow">
                                      <div className="radius-100 dskCommentsAreaPic">
                                        {r.images != "" &&
                                        r.images != "null" &&
                                        r.images != null ? (
                                          <img
                                            className="object_fit_cover"
                                            src={r.images}
                                          />
                                        ) : (
                                          <h5 className="font600 colorWhite font_30px text-uppercase translate_both header_profile_ttl">
                                            {this.generate_first_name(
                                              r.first_name
                                            )}
                                          </h5>
                                        )}
                                      </div>
                                      <div className="colorGrey font400 dskCommentsContent">
                                        <h5 className="font_20px font500 colorBlack dskCommentsAreaBy">
                                          Dr. {r.last_name}
                                        </h5>
                                        <p>{r.body}</p>
                                        <h6 className="font_14px dskCommentsByBtm">
                                          <span className="colorBlack">
                                            <Moment format="MMMM Do YYYY">
                                              {r.created_at}
                                            </Moment>
                                          </span>
                                          <a
                                            href="javascript:void(0)"
                                            className="dskCommentsAreaReply_a append_divv"
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
                                            "full_width dskCommentsReply hh_" +
                                            index +
                                            " " +
                                            "off"
                                          }
                                          style={{ display: "none" }}
                                        >
                                          {r.children.map((rchild, index) => (
                                            <div className="full_width radius-6 dskCommentsAreaRow">
                                              <div className="radius-100 dskCommentsAreaPic">
                                                {rchild.images != "" &&
                                                rchild.images != "null" &&
                                                rchild.images != null ? (
                                                  <img
                                                    className="object_fit_cover"
                                                    src={rchild.images}
                                                  />
                                                ) : (
                                                  <h5 className="font600 colorWhite font_30px text-uppercase translate_both header_profile_ttl">
                                                    {this.generate_first_name(
                                                      r.first_name
                                                    )}
                                                  </h5>
                                                )}
                                                {/* <img className="object_fit_cover" src={rchild.images} />  */}
                                              </div>
                                              <div className="colorGrey font400 dskCommentsContent">
                                                <h5 className="font_18px font500 colorBlack dskCommentsAreaBy">
                                                  Dr. {rchild.last_name}
                                                </h5>
                                                <p>{rchild.body}</p>
                                                <h6 className="font_14px dskCommentsByBtm">
                                                  <span className="colorBlack">
                                                    <Moment format="MMMM Do YYYY">
                                                      {rchild.created_at}
                                                    </Moment>
                                                  </span>
                                                </h6>
                                              </div>
                                            </div>
                                          ))}

                                          <div className="full_width radius-6 dskComments_frm">
                                            <Form.Control
                                              className={
                                                "font_14px" +
                                                "font500 radius-6 dskComments_frmInput reply_text_" +
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
                                              className="transition6s font_14px font600 dskComments_frmSubmit"
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
                              <div className="full_width radius-6 dskComments_frm">
                                <Form.Control
                                  className="dskComments_frmInput main_comment"
                                  type="text"
                                  placeholder="Write a comment here"
                                />
                                <Form.Control
                                  type="submit"
                                  onClick={() =>
                                    this.submitcomment(
                                      this.props.match.params.id,
                                      "gr",
                                      0,
                                      0
                                    )
                                  }
                                  value="Submit"
                                  className="font_14px font600 transition6s dskComments_frmSubmit"
                                />
                              </div>
                              {/* } */}
                            </section>
                          ) : null}

                          {/* Ads------------- */}
                          {/* <section className="full_width adsArea">
										<div className="full_width adsFrame">
											<img src={ads} alt="demoAds" />     
										</div>
									</section> */}
                          {/* Ads------------- */}
                        </div>
                        <div className="col-lg-3 col-12 dskRight">
                          {/* Ads------------- */}
                          <section className="full_width radius-6 adsAreaRight">
                            {this.state.banner_display == true ? (
                              <Banner
                                type_id={this.id}
                                banner_position={3}
                                unmount_call={0}
                                type={"gr"}
                                api_call={1}
                                before_unload_call={0}
                              />
                            ) : null}
                          </section>
                          {/* Ads------------- */}
                          {this.state.association_status == 1 ? (
                            <>
                              {this.state.files.length == 0 ? (
                                <div className="full_width text-left radius-6 dskGrDtlsAttached"></div>
                              ) : null}
                              {this.state.files.length > 0 ? (
                                <div className="full_width text-left radius-6 dskGrDtlsAttached">
                                  <h4 className="font500 fontExo font_20px colorBlack">
                                    {this.state.association_setting &&
                                    this.state.association_setting.attached_file
                                      ? this.state.association_setting
                                          .attached_file
                                      : "Attached file(s)"}
                                  </h4>
                                  <div className="clearfix"></div>
                                  <div className="row dskGrDtlsAttachedRow">
                                    {this.state.files.map((rfile, indexfile) =>
                                      this.get_files_view(rfile)
                                    )}
                                  </div>
                                </div>
                              ) : null}
                            </>
                          ) : (
                            <>
                              {main_data[0].sponsor_logo !== null ||
                              main_data[0].sponsor_logo == "" ? (
                                <div className="full_width text-left radius-6 dskGrDtlsSponserd">
                                  <h4 className="font_14px colorBlack font400 dskGrDtlsSponserdTtl">
                                    {this.state.association_setting &&
                                    this.state.association_setting
                                      .brought_to_you_by
                                      ? this.state.association_setting
                                          .brought_to_you_by
                                      : "Brought to you by"}
                                  </h4>
                                  {main_data.map((r, indexii) => (
                                    <Slider
                                      {...dskSessionClient}
                                      className="dskSessionClient dskGrDtlsClient"
                                    >
                                      {r.sponsor_logo !== null ||
                                      r.sponsor_logo == ""
                                        ? r.sponsor_logo
                                            .split(",")
                                            .map((val, ind) => (
                                              <div className="dskSessionClientItem">
                                                <img src={val} />
                                              </div>
                                            ))
                                        : null}
                                    </Slider>
                                  ))}
                                </div>
                              ) : null}
                            </>
                          )}
                          <div className="full_width dskRightsticky">
                            <div className="full_width text-left radius-6 dskGrDtlsMasterDoc">
                              <h4 className="font500 fontExo font_20px colorBlack">
                                {this.state.association_setting &&
                                this.state.association_setting.master_doctor
                                  ? this.state.association_setting.master_doctor
                                  : " Master Doctor(s)"}
                              </h4>
                              <div className="clearfix"></div>
                              <div className="row dskGrMstrDocRow">
                                {this.state.doctors.map(
                                  (rdoctor, indexdoctor) => (
                                    <div className="dskGrMstrDocBox">
                                      <div className="full_width dskGrMstrDocBoxIn">
                                        <div className="row align-items-center">
                                          <div className="radius-100 dskGrMstrDocBoxInPic">
                                            <img
                                              src={rdoctor.session_doctor_image}
                                              className="object_fit_cover"
                                            />
                                          </div>
                                          <div className="font_12px colorGrey font400 font700 dskGrMstrDocBoxContent">
                                            <h4 className="font_14px colorBlack font600">
                                              {rdoctor.session_doctor_name}
                                            </h4>
                                            {this.state.association_status !=
                                              1 &&
                                            rdoctor.gr_doc_description ? (
                                              <h4 className="font_12px colorBlack font400">
                                                {rdoctor.gr_doc_description}
                                              </h4>
                                            ) : (
                                              <h4 className="font_12px colorBlack font400">
                                                {rdoctor.subtitle}
                                              </h4>
                                            )}
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
                                            {this.state.association_status !=
                                              1 &&
                                            rdoctor.gr_doc_description ? (
                                              <h4 className="font_12px colorWhite font400">
                                                {rdoctor.gr_doc_description}
                                              </h4>
                                            ) : (
                                              <h4 className="font_12px colorWhite font400">
                                                {rdoctor.subtitle}
                                              </h4>
                                            )}
                                            {/* {(rdoctor.subtitle) ? <h4 className="font_12px colorWhite font400">{rdoctor.subtitle}</h4> : null} */}
                                            <p>{rdoctor.DepartmentName}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                            {this.state.association_status == 1 ? (
                              <>
                                {main_data[0].sponsor_logo !== null ||
                                main_data[0].sponsor_logo == "" ? (
                                  <div className="full_width text-left radius-6 dskGrDtlsSponserd">
                                    <h4 className="font_14px colorBlack font400 dskGrDtlsSponserdTtl">
                                      {this.state.association_setting &&
                                      this.state.association_setting
                                        .brought_to_you_by
                                        ? this.state.association_setting
                                            .brought_to_you_by
                                        : "Brought to you by"}
                                    </h4>
                                    {main_data.map((r, indexii) => (
                                      <Slider
                                        {...dskSessionClient}
                                        className="dskSessionClient dskGrDtlsClient"
                                      >
                                        {r.sponsor_logo !== null ||
                                        r.sponsor_logo == ""
                                          ? r.sponsor_logo
                                              .split(",")
                                              .map((val, ind) => (
                                                <div className="dskSessionClientItem">
                                                  <img src={val} />
                                                </div>
                                              ))
                                          : null}
                                      </Slider>
                                    ))}
                                  </div>
                                ) : null}
                              </>
                            ) : (
                              <>
                                {this.state.files.length > 0 ? (
                                  <div className="full_width text-left radius-6 dskGrDtlsAttached">
                                    <h4 className="font500 fontExo font_20px colorBlack">
                                      {this.state.association_setting &&
                                      this.state.association_setting
                                        .attached_file
                                        ? this.state.association_setting
                                            .attached_file
                                        : "Attached file(s)"}
                                    </h4>
                                    <div className="clearfix"></div>
                                    <div className="row dskGrDtlsAttachedRow">
                                      {this.state.files.map(
                                        (rfile, indexfile) =>
                                          this.get_files_view(rfile)
                                      )}
                                    </div>
                                  </div>
                                ) : null}
                              </>
                            )}
                            {/* {main_data[0].sponsor_logo !== null ||
                          main_data[0].sponsor_logo == "" ? (
                            <div className="full_width text-left radius-6 dskGrDtlsSponserd">
                              <h4 className="font_14px colorBlack font400 dskGrDtlsSponserdTtl">
                                Brought to you by
                              </h4>
                              {main_data.map((r, indexii) => (
                                <Slider
                                  {...dskSessionClient}
                                  className="dskSessionClient dskGrDtlsClient"
                                >
                                  {r.sponsor_logo !== null ||
                                  r.sponsor_logo == ""
                                    ? r.sponsor_logo
                                        .split(",")
                                        .map((val, ind) => (
                                          <div className="dskSessionClientItem">
                                            <img src={val} />
                                          </div>
                                        ))
                                    : null}
                                </Slider>
                              ))}
                            </div>
                          ) : null} */}

                            {/* Ads------------- */}
                            <section className="full_width radius-6 adsAreaRight">
                              {this.state.banner_display == true ? (
                                <Banner
                                  type_id={this.id}
                                  banner_position={4}
                                  unmount_call={0}
                                  type={"gr"}
                                  api_call={1}
                                  before_unload_call={0}
                                />
                              ) : null}
                            </section>
                            {/* Ads------------- */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null
          // <Loader
          //   className="loader_cmn"
          //   type="ThreeDots"
          //   color="#355ed3"
          //   height={80}
          //   width={80}
          //   visible={this.state.is_loader}
          // />
        }
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
                {this.state.association_setting &&
                this.state.association_setting.master_doctor
                  ? this.state.association_setting.master_doctor
                  : " Master Doctor(s)"}
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
                        {this.state.association_status != 1 &&
                        rdoctor.gr_doc_description ? (
                          <h4 className="font_12px colorBlack font400">
                            {rdoctor.gr_doc_description}
                          </h4>
                        ) : (
                          <h4 className="font_12px colorBlack font400">
                            {rdoctor.subtitle}
                          </h4>
                        )}
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

                        {this.state.association_status != 1 &&
                        rdoctor.gr_doc_description ? (
                          <h4 className="font_12px colorBlack font400">
                            {rdoctor.gr_doc_description}
                          </h4>
                        ) : (
                          <h4 className="font_12px colorBlack font400">
                            {rdoctor.subtitle}
                          </h4>
                        )}
                        {/* {(rdoctor.subtitle) ? <h4 className="font_12px colorBlack font400">{rdoctor.subtitle}</h4> : null} */}
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

export default GrandRoundsDesktop;
