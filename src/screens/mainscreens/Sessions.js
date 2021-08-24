import React from "react";
import Loader from "react-loader-spinner";
import $ from "jquery";
import DatePicker from "react-datepicker";
import medwikiicon from "../../images/medwiki.jpg";
import "react-datepicker/dist/react-datepicker.css";
import { reactLocalStorage } from "reactjs-localstorage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import AppConfig from "../config/config.js";
import Header from "../mainscreens/Header";
import Footer from "../mainscreens/Footer";
import Sessioncard from "../Cards/Sessioncard";
import filterIcon from "../../images/filterIcon.png";
import Banner from "../mainscreens/Banner";
import { Helmet } from "react-helmet";
import mastercastlogo from "../../images/session_box_type-1.png";
import { isMobile } from "react-device-detect";
import playIcon from "../../images/playIcon.png";
import closeIcon from "../../images/close.png";
import filterWhite from "../../images/filter-white.png";
import reload from "../../images/reload.png";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Masonry from "react-masonry-component";
import { setClientLogoRelated } from "../Common/Common.js";
import Popover from "react-bootstrap/Popover";
import angaleWhite from "../../desktopImages/angaleWhite.png";
import Slider from "react-slick";
import dskArchiveCardPlay from "../../desktopImages/videoIcon.png";
import likeIcon from "../../desktopImages/like-black.png";
import likeIconActive from "../../desktopImages/like-active.png";
import vaultIcon from "../../desktopImages/vault-black.png";
import vaultIconActive from "../../desktopImages/vault-active.png";
import Share from "../Common/Share.jsx";
import SessionCardLoader from "../LoadingPlaceholders/SessionCardLoader.jsx";
import ArcVideoSmallCard from "../Cards/ArcVideoSmallCard.js";


const gtag = window.gtag;

var selected_session_popover_index = -1;

const pageNames = "Live CME";
const masonryOptions = {
  transitionDuration: 0,
};

var dateFormat = require("dateformat");
var api_call_pemission = 1;
const url = AppConfig.apiLoc;
let button_val = "cme";
var upcoming_session_pagination_limit = 0;
var cme_session_pagination_limit = 0;
var archived_session_pagination_limit = 0;
var reserved_session_pagination_limit = 0;
var searched_session_pagination_limit = 0;
var prev_upcoming_session = [];
var prev_searched_session = [];
var prev_cme_session = [];
var prev_archived_session = [];

var prev_reserved_session = [];
var is_upcoming_block_display = 0;
var is_cme_block_display = 0;
var is_archived_block_display = 0;

var is_reserved_block_display = 0;
var is_more_upcoming = 1;
var is_more_searched = 1;
var is_more_cme = 1;
var is_more_reserved = 1;

var is_more_archived = 1;

var is_more_searched = 1;
let booked_session = [];
var is_other_on = 0;
var speciality = [];
var selected_spec = [];

var is_searched = 0;

var temp_data_archive = [];
let selected_arc_popover_index = -1;

var deafult_popover_index = -1;
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
class Sessions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phone_no: "",
      banner_display: false,

      err_msg: "",
      otp: "",
      session_listing_upcoming: [],
      session_listing_reserved: [],
      session_listing_searched: [],
      session_listing_archived: [],
      is_refresh: false,
      session_listing_cme: [],
      viewrefresh: false,
      is_loader: true,
      is_loader_more: false,
      showPopup: false,
      other_on: 0,
      other_reason: "",
      reason: "",
      cancel_session_id: "",
      cancel_particiment_id: "",
      showModal: false,
      startDate: "",
      endDate: "",
      sel_ses: 0,
      speciality: [],
      change_flag: true,
      mastercast_search: false,
      mastercircle_search: false,
      masterconsult_search: false,
      search_err: "",
      is_cal_start: 0,
      archived_video_loader: true,
    };

    temp_data_archive = [];
    selected_arc_popover_index = -1;

    this.handleDateChange = this.handleDateChange.bind(this);
    this.redirect_to_session_booking =
      this.redirect_to_session_booking.bind(this);

    this.handleChangeto = this.handleChangeto.bind(this);
    this.handleChangeother = this.handleChangeother.bind(this);
    this.get_search_result = this.get_search_result.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.handle_change = this.handle_change.bind(this);
    this.display_banner = this.display_banner.bind(this);

    if (
      this.props.match.params.is_reserved != undefined &&
      this.props.match.params.is_reserved != ""
    ) {
      reactLocalStorage.set("@ClirnetStore:my_sessions", 1);

      reactLocalStorage.set("@ClirnetStore:redirect_direct_to_session", 1);
    }
    this.getArchivedVideoList();
  }

  handle_change_arc(index, value, type) {
    temp_data_archive = this.state.session_listing_archived;
    if (type == "vault") {
      temp_data_archive[index].vault = value;
      this.setState({ session_listing_archived: temp_data_archive });
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
    }
    if (type == "popover") {
      selected_arc_popover_index = index;
      this.setState({ is_refresh: !this.state.is_refresh });
    }
    this.setState({ session_listing_archived: temp_data_archive });
  }

  display_banner(datam) {
    this.setState({ banner_display: true });

    //alert(datam)
  }

  handle_change(index, value, type) {
    if (type == "popover_session") {
      selected_session_popover_index = index;
      this.setState({ rerender: !this.state.rerender });
    }
    if (type == "cancel_session") {
      this.setState({ reason: "" });
      this.setState({ showModal: true });
      this.setState({ cancel_session_id: value, sel_ses: value });
      this.get_part(value);
    }
  }

  selectspec(id) {
    if (selected_spec.indexOf(id) != -1) {
      var index = selected_spec.indexOf(id);
      selected_spec.splice(index, 1);
      // element found
    } else {
      selected_spec.push(id);
    }

    this.setState({ change_flag: !this.state.change_flag });
  }

  componentWillUnmount() {
    $("html, body").css({
      overflow: "auto",
      height: "auto",
    });

    temp_data_archive = [];
    selected_arc_popover_index = -1;

    selected_session_popover_index = -1;
    deafult_popover_index = -1;
    archived_session_pagination_limit = 0;

    //alert();
    $("body").removeClass("right_PopShowBody");
    $(window).unbind("scroll");
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  open_other(val) {
    if (val == "others") {
      is_other_on = 1;
      this.setState({ reason: val });
      this.setState({ other_on: !this.state.other_on });
    } else {
      is_other_on = 0;
      this.setState({ other_on: !this.state.other_on });
      this.setState({ reason: val });

      this.setState({ other_reason: "" });
    }
  }

  cancel_session(val) {
    let has_error = 0;
    if (this.state.reason === "others" && this.state.other_reason === "") {
      has_error = 1;

      this.setState({ err_msg: "Please Enter Reason Of Cancellation." });
    } else {
      if (this.state.reason === "") {
        has_error = 1;

        this.setState({ err_msg: "Please Enter Reason Of Cancellation." });
      }
    }

    if (has_error == 0) {
      let parsers = {
        session_id: this.state.cancel_session_id,
        cancelation_reason: this.state.reason,
        other_reason: this.state.other_reason,
        participant_id: this.state.cancel_particiment_id,
      };

      fetch(url + "knwlgmastersession/cancelsession", {
        method: "POST",
        headers: {
          Authorization: reactLocalStorage.get(
            "@ClirnetStore:refreshToken",
            true
          ),
          version: "rjsw 1.1.1",
        },
        body: JSON.stringify(parsers),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status_code == "203") {
            this.setState({ err_msg: responseJson.message });
          }
          if (responseJson.status_code == "200") {
            $("#res_" + val + "").remove();
            this.setState({ showModal: false });
            this.setState({ is_loader: false });
            if ($(".resggg").length == 0) {
              $(".ssn_main").append(
                "<div class='full_width alert alert-danger deldiv'><strong>You have no reserved CMEs</strong></div>"
              );
              toast.success(
                "Your Reservation Has Been Cancelled. And You Have No Reserved Session"
              );
            } else {
              toast.success("Your Reservation Has Been Cancelled.");
            }
          }
        })
        .catch((error) => {
          //alert(error)

          this.setState({ err_msg: "Something went Wrong" });
        });
    }
  }

  componentWillMount() {
    window.scrollTo(0, 0);
  }

  onScroll() {
    //alert();

    var tempobj = this;

    //alert("scrolled")
    tempobj.setState({ is_loader_more: true });

    if (is_searched == 0) {
      tempobj.redirect_to_session_type_automatic(button_val);

      switch (button_val) {
        case "allinone":
          upcoming_session_pagination_limit =
            upcoming_session_pagination_limit + 4;
          break;

        case "cme":
          cme_session_pagination_limit = cme_session_pagination_limit + 4;
          break;

        case "reserved":
          reserved_session_pagination_limit =
            reserved_session_pagination_limit + 4;
          break;

        case "archived":
          archived_session_pagination_limit =
            archived_session_pagination_limit + 4;
          break;
        default: {
        }
      }
    } else {
      searched_session_pagination_limit = searched_session_pagination_limit + 4;
      tempobj.get_search_result_pagination();
    }
  }

  componentDidMount() {
    window.document.title = "CLIRNET - Live CME Feed";
    gtag("config", AppConfig.gtag_measure_id, {
      page_title: window.document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });

    temp_data_archive = [];
    let that = this;
    var that12 = this;
    $(document).on("click", function (e) {
      let sessgg = $(e.target).parents(".manar").length;
      if (sessgg == 0 && !$(e.target).hasClass("manar")) {
        selected_session_popover_index = -1;
        that12.setState({ is_refresh: true });
      }
      let sessggt = $(e.target).parents(".tanar").length;
      if (sessggt == 0 && !$(e.target).hasClass("tanar")) {
        deafult_popover_index = -1;
        that12.setState({ is_refresh: true });
      }

      let arc_extra = $(e.target).parents(".arc_extra_class").length;
      if (arc_extra == 0 && !$(e.target).hasClass("arc_extra_class")) {
        selected_arc_popover_index = -1;
        that.setState({ is_refresh: !that.state.is_refresh });
      }
    });

    reactLocalStorage.set("@ClirnetStore:dashboard", 0);
    api_call_pemission = 1;
    is_searched = 0;
    speciality = [];
    selected_spec = [];
    window.scrollTo(0, 0);

    //this.setState({"session_listing_upcoming":[]})

    var tempobj = this;
    $(document.body).on("touchmove", this.onScroll);
    var kkkl = this;
    $(window).scroll(function () {
      var to_bottom = 0;

      if (kkkl.is_on_screen_finddiv("finddiv")) {
        to_bottom = 1;
      }

      if (api_call_pemission == 1 && to_bottom == 1) {
        api_call_pemission = 0;

        //alert("scrolled")
        tempobj.setState({ is_loader_more: true });

        if (is_searched == 0) {
          tempobj.redirect_to_session_type_automatic(button_val);

          switch (button_val) {
            case "allinone":
              upcoming_session_pagination_limit =
                upcoming_session_pagination_limit + 4;
              break;

            case "cme":
              cme_session_pagination_limit = cme_session_pagination_limit + 4;
              break;

            case "reserved":
              reserved_session_pagination_limit =
                reserved_session_pagination_limit + 4;
              break;
            default: {
            }
          }
        } else {
          searched_session_pagination_limit =
            searched_session_pagination_limit + 4;
          tempobj.get_search_result_pagination();
        }
      }
    });

    is_other_on = 0;

    upcoming_session_pagination_limit = 0;
    searched_session_pagination_limit = 0;
    cme_session_pagination_limit = 0;
    reserved_session_pagination_limit = 0;
    prev_upcoming_session = [];
    prev_cme_session = [];
    prev_searched_session = [];
    prev_reserved_session = [];
    is_upcoming_block_display = 0;
    is_cme_block_display = 0;
    is_reserved_block_display = 0;
    is_more_upcoming = 1;
    is_more_searched = 1;
    is_more_cme = 1;
    is_more_reserved = 1;
    booked_session = [];

    var tempobj = this;
    if (reactLocalStorage.get("@ClirnetStore:my_sessions", true) == 1) {
      //alert();

      button_val = "reserved";
      //reserved_session_pagination_limit=0;
      tempobj.redirect_to_session_type(button_val);
      reactLocalStorage.set("@ClirnetStore:my_sessions", 0);
    } else {
      fetch(
        url +
          "knwlgmastersession/upcomingmastersession?from=" +
          upcoming_session_pagination_limit +
          "&to=4",
        {
          method: "GET",
          headers: {
            //Accept: 'application/json',
            //"cache-control": "no-cache",

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

          responseJson.data.map((r) => {
            prev_upcoming_session.push(r);
          });

          console.log(prev_upcoming_session);

          is_upcoming_block_display = 1;
          this.setState({ session_listing_upcoming: prev_upcoming_session });
          button_val = "allinone";
          //upcoming_session_pagination_limit=upcoming_session_pagination_limit+3;
          this.setState({ is_loader: false });

          ///pranabesh New Added Code For cME Default START////
          this.redirect_to_session_type("cme");
          this.setState({ is_loader: true });

          ///pranabesh New Added Code For cME Default END////

          //console.log(this.state.session_listing_upcoming[0]);
        })
        .catch((error) => {});

      upcoming_session_pagination_limit = upcoming_session_pagination_limit + 4;
      $(".tRright_popClose").on("click", function () {
        $("body").removeClass("right_PopShowBody");
      });
      $(".tRright_popShow").on("click", function () {
        $("body").addClass("right_PopShowBody");
      });
    }

    $(".li_session").attr("id", "session_cal");

    $(".ses_mobile").addClass("active");

    fetch(url + "authnew/getallspeciality", {
      method: "GET",
      headers: {
        //Accept: 'application/json',
        //"cache-control": "no-cache",
        Authorization: reactLocalStorage.get(
          "@ClirnetStore:refreshToken",
          true
        ),
        version: "rjsw 1.1.1",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        responseJson.data.speciality_data.map((r) => {
          speciality.push(r);
        });

        this.setState({ speciality: speciality });

        console.log(this.state.speciality);
      })
      .catch((error) => {});

    if (isMobile) {
      var type_id_val = 2;
    } else {
      var type_id_val = 1;
    }
  }

  is_on_screen_finddiv(classes) {
    //alert()

    var temp_is_sc = $("." + classes + "");
    var win = $(window);
    var viewport = {
      top: win.scrollTop(),
      left: win.scrollLeft(),
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
    var bounds = temp_is_sc.offset();
    if (bounds != undefined) {
      bounds.right = bounds.left + temp_is_sc.outerWidth();
      bounds.bottom = bounds.top + temp_is_sc.outerHeight();

      return !(
        viewport.right < bounds.left ||
        viewport.left > bounds.right ||
        viewport.bottom < bounds.top ||
        viewport.top > bounds.bottom
      );
    }
  }

  handleDateChange(e) {
    this.setState({ startDate: e });

    this.setState({ endDate: "" });
  }

  handleChangeto(e) {
    this.setState({ endDate: e });
  }

  redirect_to_session_type(val) {
    deafult_popover_index = -1;

    $(".deldiv").remove();
    switch (val) {
      case "allinone":
        fetch(
          url +
            "knwlgmastersession/upcomingmastersession?from=" +
            upcoming_session_pagination_limit +
            "&to=4",
          {
            method: "GET",
            headers: {
              //Accept: 'application/json',
              //"cache-control": "no-cache",

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

            responseJson.data.map((r) => {
              prev_upcoming_session.push(r);
            });

            if (responseJson.data.length == 0) {
              is_more_upcoming = 0;
            } else {
              is_more_upcoming = 1;
            }

            is_upcoming_block_display = 1;
            is_cme_block_display = 0;
            is_reserved_block_display = 0;
            is_archived_block_display = 0;

            button_val = "allinone";
            this.setState({ session_listing_upcoming: prev_upcoming_session });

            upcoming_session_pagination_limit =
              upcoming_session_pagination_limit + 4;
            this.setState({ is_loader: false });
            this.setState({ is_loader_more: false });
            //console.log(this.state.session_listing_upcoming[0]);
          })
          .catch((error) => {});
        break;
      case "cme":
        fetch(
          url +
            "knwlgmastersession/upcomingmastersessioncme?from=" +
            cme_session_pagination_limit +
            "&to=4",
          {
            method: "GET",
            headers: {
              //Accept: 'application/json',
              //"cache-control": "no-cache",

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

            responseJson.data.map((r) => {
              prev_cme_session.push(r);
            });

            if (responseJson.data.length == 0) {
              is_more_cme = 0;
            } else {
              is_more_cme = 1;
            }

            is_upcoming_block_display = 0;
            is_reserved_block_display = 0;
            is_cme_block_display = 1;
            is_archived_block_display = 0;

            cme_session_pagination_limit = cme_session_pagination_limit + 4;
            button_val = "cme";
            this.setState({ session_listing_cme: prev_cme_session });
            this.setState({ is_loader: false });
            this.setState({ is_loader_more: false });
            //console.log(this.state.session_listing_upcoming[0]);
          })
          .catch((error) => {});
        break;
      case "reserved":
        reserved_session_pagination_limit = 0;
        prev_reserved_session = [];
        fetch(
          url +
            "knwlgmastersession/bookedmastersession?from=" +
            reserved_session_pagination_limit +
            "&to=4",
          {
            method: "GET",
            headers: {
              //Accept: 'application/json',
              //"cache-control": "no-cache",

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

            responseJson.data.map((r) => {
              prev_reserved_session.push(r);
            });

            if (responseJson.data.length == 0) {
              is_more_reserved = 0;
            } else {
              is_more_reserved = 1;
            }

            is_upcoming_block_display = 0;
            is_cme_block_display = 0;
            is_reserved_block_display = 1;
            is_archived_block_display = 0;

            reserved_session_pagination_limit =
              reserved_session_pagination_limit + 4;
            button_val = "reserved";
            this.setState({ session_listing_reserved: prev_reserved_session });
            this.setState({ is_loader: false });
            this.setState({ is_loader_more: false });
            //console.log(this.state.session_listing_upcoming[0]);
          })
          .catch((error) => {});
        break;

      case "archived":
        fetch(
          url +
            "knwlg/archiveVideoList?from=" +
            archived_session_pagination_limit +
            "&to=4",
          {
            method: "GET",
            headers: {
              //Accept: 'application/json',
              //"cache-control": "no-cache",

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

            responseJson.data.map((r) => {
              prev_archived_session.push(r);
            });

            if (responseJson.data.length == 0) {
              is_more_archived = 0;
            } else {
              is_more_archived = 1;
            }

            is_upcoming_block_display = 0;
            is_reserved_block_display = 0;
            is_cme_block_display = 0;
            is_archived_block_display = 1;
            archived_session_pagination_limit =
              archived_session_pagination_limit + 4;
            button_val = "archived";
            this.setState({ session_listing_archived: prev_archived_session });
            this.setState({ is_loader: false });
            this.setState({ is_loader_more: false });
            //console.log(this.state.session_listing_upcoming[0]);
          })
          .catch((error) => {});
        break;

      default: {
      }
    }
  }

  redirect_to_session_type_automatic(val) {
    switch (val) {
      case "allinone":
        fetch(
          url +
            "knwlgmastersession/upcomingmastersession?from=" +
            upcoming_session_pagination_limit +
            "&to=4",
          {
            method: "GET",
            headers: {
              //Accept: 'application/json',
              //"cache-control": "no-cache",

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

            responseJson.data.map((r) => {
              prev_upcoming_session.push(r);
            });

            if (responseJson.data.length == 0) {
              is_more_upcoming = 0;
            } else {
              is_more_upcoming = 1;
            }

            api_call_pemission = 1;

            is_upcoming_block_display = 1;
            is_cme_block_display = 0;
            is_reserved_block_display = 0;
            is_archived_block_display = 0;

            button_val = "allinone";
            this.setState({ session_listing_upcoming: prev_upcoming_session });

            //upcoming_session_pagination_limit=upcoming_session_pagination_limit+3;
            this.setState({ is_loader: false });
            this.setState({ is_loader_more: false });
            //console.log(this.state.session_listing_upcoming[0]);
          })
          .catch((error) => {});
        break;
      case "cme":
        fetch(
          url +
            "knwlgmastersession/upcomingmastersessioncme?from=" +
            cme_session_pagination_limit +
            "&to=4",
          {
            method: "GET",
            headers: {
              //Accept: 'application/json',
              //"cache-control": "no-cache",

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
            responseJson.data.map((r) => {
              prev_cme_session.push(r);
            });

            if (responseJson.data.length == 0) {
              is_more_cme = 0;
            } else {
              is_more_cme = 1;
            }

            api_call_pemission = 1;

            is_upcoming_block_display = 0;
            is_reserved_block_display = 0;
            is_cme_block_display = 1;
            is_archived_block_display = 0;

            //cme_session_pagination_limit=cme_session_pagination_limit+3;
            button_val = "cme";
            this.setState({ session_listing_cme: prev_cme_session });
            this.setState({ is_loader: false });
            this.setState({ is_loader_more: false });
            //console.log(this.state.session_listing_upcoming[0]);
          })
          .catch((error) => {});
        break;
      case "reserved":
        fetch(
          url +
            "knwlgmastersession/bookedmastersession?from=" +
            reserved_session_pagination_limit +
            "&to=4",
          {
            method: "GET",
            headers: {
              //Accept: 'application/json',
              //"cache-control": "no-cache",

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

            responseJson.data.map((r) => {
              prev_reserved_session.push(r);
            });

            console.log(prev_reserved_session);

            if (responseJson.data.length == 0) {
              is_more_reserved = 0;
            } else {
              is_more_reserved = 1;
            }

            api_call_pemission = 1;

            is_upcoming_block_display = 0;
            is_cme_block_display = 0;
            is_reserved_block_display = 1;
            is_archived_block_display = 0;

            //reserved_session_pagination_limit=reserved_session_pagination_limit+3;
            button_val = "reserved";
            this.setState({ session_listing_reserved: prev_reserved_session });
            this.setState({ is_loader: false });
            this.setState({ is_loader_more: false });
            //console.log(this.state.session_listing_upcoming[0]);
          })
          .catch((error) => {});
        break;

      case "archived":
        fetch(
          url +
            "knwlg/archiveVideoList?from=" +
            archived_session_pagination_limit +
            "&to=4",
          {
            method: "GET",
            headers: {
              //Accept: 'application/json',
              //"cache-control": "no-cache",

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

            responseJson.data.map((r) => {
              prev_archived_session.push(r);
            });

            console.log(prev_archived_session);

            if (responseJson.data.length == 0) {
              is_more_archived = 0;
            } else {
              is_more_archived = 1;
            }

            api_call_pemission = 1;

            is_upcoming_block_display = 0;
            is_cme_block_display = 0;
            is_reserved_block_display = 0;
            is_archived_block_display = 1;

            archived_session_pagination_limit =
              archived_session_pagination_limit + 4;
            button_val = "archived";
            this.setState({ session_listing_archived: prev_archived_session });
            this.setState({ is_loader: false });
            this.setState({ is_loader_more: false });
            //console.log(this.state.session_listing_upcoming[0]);
          })
          .catch((error) => {});
        break;

      default: {
      }
    }
  }

  get_search_result() {
    searched_session_pagination_limit = 0;
    prev_searched_session = [];
    is_more_searched = 0;
    this.setState({ is_loader: true });
    this.setState({ search_err: "" });
    if (
      this.state.mastercast_search == false &&
      this.state.mastercircle_search == false &&
      this.state.masterconsult_search == false &&
      selected_spec.length <= 0 &&
      this.state.startDate == "" &&
      this.state.endDate == ""
    ) {
      this.setState({ search_err: "Plese Select Atleast One Option." });
      this.setState({ is_loader: false });
    } else {
      if (
        (this.state.startDate == "" && this.state.endDate != "") ||
        (this.state.startDate != "" && this.state.endDate == "")
      ) {
        this.setState({ search_err: "Plese Select Both Dates." });
        this.setState({ is_loader: false });
      } else {
        var fasstartdate = "";
        var myDatelast = "";
        if (this.state.startDate != "" && this.state.endDate != "") {
          var fasstartdate = "";
          fasstartdate = dateFormat(this.state.startDate, "dd-mm-yyyy");

          var myDatestart = fasstartdate.split("-");
          var newDatestart =
            myDatestart[1] + "/" + myDatestart[0] + "/" + myDatestart[2];

          var faslastdate = dateFormat(this.state.endDate, "dd-mm-yyyy");

          myDatelast = faslastdate.split("-");
          var newDatelast =
            myDatelast[1] + "/" + myDatelast[0] + "/" + myDatelast[2];
        }

        if (
          new Date(newDatelast).getTime() < new Date(newDatestart).getTime()
        ) {
          this.setState({ is_loader: false });
          this.setState({ search_err: "Plese Enter Dates Correctly" });
        } else {
          is_searched = 1;
          //alert(this.state.mastercast_search+"hhh"+this.state.masterconsult_search+"hhh"+this.state.mastercircle_search)
          if (
            this.state.mastercast_search == false &&
            this.state.masterconsult_search == false &&
            this.state.mastercircle_search == false
          ) {
            this.setState({ mastercast_search: true });
            this.setState({ masterconsult_search: true });
            this.setState({ mastercircle_search: true });
          }
          var tmobj = this;

          setTimeout(function () {
            fasstartdate = fasstartdate + "";
            myDatelast = faslastdate + "";

            if (myDatelast == undefined || myDatelast == "undefined") {
              //alert(myDatelast)
              myDatelast = "";
            }

            if (fasstartdate == undefined || myDatelast == "undefined") {
              fasstartdate = "";
            }
            //alert(fasstartdate)
            var search_json = {
              short_options: {
                shortBySpeakerName: "",
                shortByAddOn: "",
              },
              filter_options: {
                dateTo: myDatelast,
                dateFrom: fasstartdate,
                showMasterCast: tmobj.state.mastercast_search,
                showMasterConsult: tmobj.state.masterconsult_search,
                showMasterCircle: tmobj.state.mastercircle_search,
                showAvailableSession: true,
                showUpcomingSession: true,
                showCompleteSession: false,
                speakerType: "",
                specialityIds: selected_spec.join(),
              },
              type: "session",
              from: searched_session_pagination_limit,
              to: 4,
            };

            //return;

            fetch(url + "knwlgmastersession/filterSession", {
              method: "POST",
              headers: {
                Authorization: reactLocalStorage.get(
                  "@ClirnetStore:refreshToken",
                  true
                ),
                version: "rjsw 1.1.1",
              },
              body: JSON.stringify(search_json),
            })
              .then((response) => response.json())
              .then((responseJson) => {
                console.log(responseJson.data);
                responseJson.data.map((r) => {
                  prev_searched_session.push(r);
                });

                if (responseJson.data.length == 0) {
                  is_more_searched = 0;
                } else {
                  is_more_searched = 1;
                }

                tmobj.setState({ is_loader: false });
                $("body").removeClass("right_PopShowBody");
                tmobj.setState({
                  session_listing_searched: prev_searched_session,
                });
              })
              .catch((error) => {
                //alert(error)
                tmobj.setState({ is_loader: false });
                tmobj.setState({ err_msg: "Something went Wrong" });
              });
          }, 10);
        }
      }
    }
  }

  get_search_result_pagination() {
    this.setState({ is_loader: true });
    this.setState({ search_err: "" });
    if (
      this.state.mastercast_search == false &&
      this.state.mastercircle_search == false &&
      this.state.masterconsult_search == false &&
      selected_spec.length <= 0 &&
      this.state.startDate == "" &&
      this.state.endDate == ""
    ) {
      this.setState({ search_err: "Plese Select Atleast One Option." });
      this.setState({ is_loader: false });
    } else {
      if (
        (this.state.startDate == "" && this.state.endDate != "") ||
        (this.state.startDate != "" && this.state.endDate == "")
      ) {
        this.setState({ search_err: "Plese Select Both Dates." });
        this.setState({ is_loader: false });
      } else {
        var fasstartdate = "";
        var myDatelast = "";
        if (this.state.startDate != "" && this.state.endDate != "") {
          var fasstartdate = "";
          fasstartdate = dateFormat(this.state.startDate, "dd-mm-yyyy");

          var myDatestart = fasstartdate.split("-");
          var newDatestart =
            myDatestart[1] + "/" + myDatestart[0] + "/" + myDatestart[2];

          var faslastdate = dateFormat(this.state.endDate, "dd-mm-yyyy");

          myDatelast = faslastdate.split("-");
          var newDatelast =
            myDatelast[1] + "/" + myDatelast[0] + "/" + myDatelast[2];
        }

        if (
          new Date(newDatelast).getTime() < new Date(newDatestart).getTime()
        ) {
          this.setState({ is_loader: false });
          this.setState({ search_err: "Plese Enter Dates Correctly" });
        } else {
          is_searched = 1;
          //  alert(fasstartdate+"hhh"+myDatelast)
          fasstartdate = fasstartdate + "";
          myDatelast = faslastdate + "";

          if (myDatelast == undefined || myDatelast == "undefined") {
            //alert(myDatelast)
            myDatelast = "";
          }

          if (fasstartdate == undefined || myDatelast == "undefined") {
            fasstartdate = "";
          }
          if (
            this.state.mastercast_search == false &&
            this.state.masterconsult_search == false &&
            this.state.mastercircle_search == false
          ) {
            this.setState({ mastercast_search: true });
            this.setState({ masterconsult_search: true });
            this.setState({ mastercircle_search: true });
          }

          var tmobj = this;

          setTimeout(function () {
            //alert(fasstartdate)
            var search_json = {
              short_options: {
                shortBySpeakerName: "",
                shortByAddOn: "",
              },
              filter_options: {
                dateTo: myDatelast,
                dateFrom: fasstartdate,
                showMasterCast: tmobj.state.mastercast_search,
                showMasterConsult: tmobj.state.masterconsult_search,
                showMasterCircle: tmobj.state.mastercircle_search,
                showAvailableSession: true,
                showUpcomingSession: true,
                showCompleteSession: false,
                speakerType: "",
                specialityIds: selected_spec.join(),
              },
              type: "session",
              from: searched_session_pagination_limit,
              to: 4,
            };

            //return;

            fetch(url + "knwlgmastersession/filterSession", {
              method: "POST",
              headers: {
                Authorization: reactLocalStorage.get(
                  "@ClirnetStore:refreshToken",
                  true
                ),
                version: "rjsw 1.1.1",
              },
              body: JSON.stringify(search_json),
            })
              .then((response) => response.json())
              .then((responseJson) => {
                responseJson.data.map((r) => {
                  prev_searched_session.push(r);
                });

                if (responseJson.data.length == 0) {
                  is_more_searched = 0;
                } else {
                  is_more_searched = 1;
                }
                api_call_pemission = 1;
                tmobj.setState({ is_loader: false });
                $("body").removeClass("right_PopShowBody");
                tmobj.setState({
                  session_listing_searched: prev_searched_session,
                });
              })
              .catch((error) => {
                //alert(error)
                tmobj.setState({ is_loader: false });
                tmobj.setState({ err_msg: "Something went Wrong" });
              });
          }, 10);
        }
      }
    }
  }
  redirect_to_filt() {
    $("body").addClass("right_PopShowBody");
  }

  get_part(session_id) {
    fetch(
      url + "knwlgmastersession/sessiondetail?session_id=" + session_id + "",
      {
        method: "GET",
        headers: {
          //Accept: 'application/json',
          //"cache-control": "no-cache",

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
        //alert(responseJson.data[0].my_participant_id)

        this.setState({
          cancel_particiment_id: responseJson.data[0].my_participant_id,
        });
      });
  }

  handleChangeother(e) {
    this.setState({ other_reason: e.target.value });
  }

  redirect_to_session_booking(id) {
    this.props.history.push({
      pathname: "/Reservesession/" + id + "",
    });
  }

  redirect_to_main() {
    this.setState({ startDate: "" });
    this.setState({ endDate: "" });
    selected_spec = [];
    this.setState({ mastercast_search: false });
    this.setState({ mastercircle_search: false });
    this.setState({ masterconsult_search: false });
    is_searched = 0;
  }

  redirect_to_live_details(id) {
    this.props.history.push({
      pathname: "/LiveSessionDetails/" + id + "",
    });
  }

  redirectToArchivedVideo(id) {
    this.props.history.push({
      pathname: "/ArchivedVideo/" + id,
    });
  }

  getArchivedVideoList() {
    fetch(url + "knwlg/archiveVideoList", {
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
          let responseData = responseJson.data;
          archived_video_list = responseData;
          this.setState({ archived_video_loader: false });
        }
      })
      .catch((error) => {
        console.log("Error" + error);
      });
  }

  //redire to video detail
  redirect_to_video_detail(type, id) {
    switch (type) {
      case "comp":
        this.props.history.push({
          pathname: "/Feeddetail/" + id + "",
        });
        break;
      case "video_archive":
        this.props.history.push({
          pathname: "/ArchivedVideo/" + id + "",
        });
        break;
      default:
        console.log("problem happen on redirection");
        break;
    }
  }

  renderArchivedVideo(video_list, loader) {
    return (
      <div className="feed_right_2">
        <div class="full_width radius-6 text-left specialty_comp_right">
          <h2 class="bgColorBlue font600 colorWhite font600 font_20px specialtyTtl">
            Recorded{" "}
          </h2>
          <div class="full_width font600 specialty_comp_right_text">
            <div className="full_width relatedRow withImg">
              {video_list.length > 0 ? (
                <>
                  {video_list.map((r, index) => (
                    <a
                      href="javascript:void(0)"
                      onClick={() => {
                        this.redirectToArchivedVideo(r.type_id);
                      }}
                    >
                      <div className="full_width font_12px relatedRowTop">
                        <span className="colorBlack font600">
                          {r.specialities.replace(/,/g, ", ")}
                        </span>{" "}
                        <span className="float-right colorGrey">{r.date}</span>
                      </div>
                      <div className="full_width relatedRowIn">
                        <div className="radius-6 relatedRowPic">
                          {r.image == "" || r.image == null ? (
                            <img
                              className="object_fit_cover"
                              src={mastercastlogo}
                            />
                          ) : (
                            <img className="object_fit_cover" src={r.image} />
                          )}
                          <div className="overlay"></div>
                          <img src={playIcon} className="translate_both" />
                        </div>
                        <h2 className="font500 transition6s font_12px colorBlack relatedRowTtl">
                          {" "}
                          {r.question.substring(0, 100)}...
                        </h2>
                        <div className="full_width">
                          {setClientLogoRelated(r.client_logo, r.sponsor_logo)}
                        </div>
                      </div>
                    </a>
                  ))}
                </>
              ) : (
                <>
                  {loader == true || loader == "true" ? (
                    <Loader
                      className="loader_cmn"
                      type="ThreeDots"
                      color="#355ed3"
                      height={40}
                      width={40}
                      visible={true}
                    />
                  ) : (
                    <div className="full_width text-center alert alert-danger">
                      <strong>No Video Found </strong>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
    );
  }

  setCssToSession(archived_video) {
    if (archived_video.length <= 0) {
      $(".sessionArcPage").addClass("sessionArcWithOutPage");
      $(".ssn_p_box")
        .removeClass("col-sm-6 col-md-6 col-xs-12")
        .addClass("col-md-4 col-sm-6 col-xs-12");
    } else {
      $(".sessionArcPage").removeClass("sessionArcWithOutPage");
      $(".ssn_p_box")
        .addClass("col-sm-6 col-md-6 col-xs-12")
        .removeClass("col-md-4 col-sm-6 col-xs-12");
    }
  }

  redirectToArchiveDetail = (id) => {
    this.props.history.push({
      pathname: "/ArchivedVideo/" + id + "",
    });
  };

  refresh = () => {
    this.setState({ display: !this.state.display });
  };

  onMenuClick(ind) {
    deafult_popover_index = ind;
    this.refresh();
  }

  arcCardMenuPopoverDesktop = (val, array_index) => {
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
          id={"popover-basic" + array_index}
          placement="bottom-end"
          className="dskDotsMenuSettings tanar"
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
                this.onLikeBtnPress(val.type_id, "video_archive", array_index)
              }
            >
              <span>
                <img
                  src={likeIconActive}
                  alt="Like"
                  className="translate_both dskGrLeftShareImgActive"
                />
                <img
                  src={likeIcon}
                  alt="Like"
                  className="translate_both dskGrLeftShareImg"
                />
              </span>
              Like
            </a>

            {val.vault == 0 ? (
              <a
                href="javascript:void(0)"
                onClick={() =>
                  this.onvaultPressvideo(
                    val.type_id,
                    "video_archive",
                    array_index,
                    1
                  )
                }
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
                onClick={() =>
                  this.onvaultPressvideo(
                    val.type_id,
                    "video_archive",
                    array_index,
                    0
                  )
                }
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
                description: val.question.substring(0, 100) + "...",       // (defaults to og:description or twitter:description)
                title: val.question,            // (defaults to og:title or twitter:title)
                message: '',     // (only for email sharing)
                subject: '',  // (only for email sharing)
                username: 'Medwiki view' // (only for twitter sharing)
              }} /> */}
            {/* <a href="javascript:void(0)" className="dskDotsMenuNotRelevant" onClick={()=>{this.onNotRelevantClick(val.type_id,'gr',array_index)}}>
                Not Relevant for me
            </a> */}

            <Share
              data={{
                title: val.question,
                text: val.answer,
                url: val.deeplink,
              }}
            />
          </Popover.Content>
        </Popover>
      </div>
    );
  };

  arcCardMenuPopoverMobile = (val, array_index) => {
    return (
      <div
        className="mblDotsMenu mblDotsCircle mblDotsMenuSssnCard"
        data-toggle="popover"
        data-trigger="focus"
      >
        <div>
          <span className="mblDotsMenu-dots"></span>
          <span className="mblDotsMenu-dots"></span>
          <span className="mblDotsMenu-dots"></span>
        </div>
        <Popover
          id="popover-basic"
          placement="bottom-end"
          className="mblDotsMenuSettings tanar"
        >
          <Popover.Content>
            <a
              href="javascript:void(0)"
              className={
                val.myrating == true
                  ? "mblDotsMenuSettingsIcon active"
                  : "mblDotsMenuSettingsIcon"
              }
              onClick={() =>
                this.onLikeBtnPress(val.type_id, "video_archive", array_index)
              }
            >
              <span>
                {val.myrating == true ? (
                  <img
                    src={likeIconActive}
                    alt="Like"
                    className="translate_both mblGrLeftShareImgActive"
                  />
                ) : (
                  <img
                    src={likeIcon}
                    alt="Like"
                    className="translate_both mblGrLeftShareImg"
                  />
                )}
              </span>
              Like
            </a>
            {val.vault == 0 ? (
              <a
                href="javascript:void(0)"
                onClick={() =>
                  this.onvaultPressvideo(
                    val.type_id,
                    "video_archive",
                    array_index,
                    1
                  )
                }
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
                    className="translate_both mblGrLeftShareImg"
                  />
                  <img
                    src={vaultIconActive}
                    alt="Vault"
                    className="translate_both mblGrLeftShareImgActive"
                  />
                </span>
                Vault
              </a>
            ) : (
              <a
                href="javascript:void(0)"
                onClick={() =>
                  this.onvaultPressvideo(
                    val.type_id,
                    "video_archive",
                    array_index,
                    0
                  )
                }
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
                    className="translate_both mblGrLeftShareImg"
                  />
                  <img
                    src={vaultIconActive}
                    alt="Vault"
                    className="translate_both mblGrLeftShareImgActive"
                  />
                </span>
                Vault
              </a>
            )}

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
                description: val.question.substring(0, 100) + "...",       // (defaults to og:description or twitter:description)
                title: val.question,            // (defaults to og:title or twitter:title)
                message: '',     // (only for email sharing)
                subject: '',  // (only for email sharing)
                username: 'Medwiki view' // (only for twitter sharing)
              }} /> */}
            {/* <a href="javascript:void(0)" className="mblDotsMenuNotRelevant" onClick={()=>{this.onNotRelevantClick(val.type_id,'gr',array_index)}}>
                Not Relevant for me
            </a> */}
            <Share
              data={{
                title: val.question,
                text: val.answer,
                url: val.deeplink,
              }}
            />
          </Popover.Content>
        </Popover>
      </div>
    );
  };

  archivedVideoCardDesktop(val, ind) {
    return (
      <div className="col-sm-6 mblSessionCard dskArchiveCard dskMasonryCard">
        <div
          href="javascript:void(0)"
          className="full_width radius-6 mblSessionCard_link"
        >
          <div className="full_width mblSessionTopArea">
            {val.image == "" || val.image == null ? (
              <img
                src={medwikiicon}
                className="object_fit_cover ssnTopBgGraphic"
              />
            ) : (
              <img
                src={val.image}
                className="object_fit_cover ssnTopBgGraphic"
              />
            )}
            <div
              className="overlay"
              onClick={() => {
                this.redirectToArchiveDetail(val.type_id);
              }}
              style={{ cursor: "pointer" }}
            ></div>
            <img
              src={dskArchiveCardPlay}
              className="translate_both dskArchiveCardPlay"
            />
            <div className="full_width mblSessionTopIn">
              <div className="full_width mblSessionTop">
                <div className="row align-items-center justify-content-between">
                  {val.category_name == "" ||
                  val.category_name == null ? null : (
                    <div className="colorWhite font_14px font500 mblSessionType">
                      {val.category_image == null ||
                      val.category_image == "" ? null : (
                        <span className="radius-100 mblSessionTypeIcon">
                          <img
                            src={val.category_image}
                            className="translate_both"
                          />
                        </span>
                      )}

                      {val.category_name}
                    </div>
                  )}
                  <div className="mblSessionTopRight">
                    {deafult_popover_index == ind
                      ? this.arcCardMenuPopoverDesktop(val, ind)
                      : null}
                    {deafult_popover_index != ind ? (
                      <div
                        onClick={() => {
                          this.onMenuClick(ind);
                        }}
                        className="dskDotsMenu dskDotsCircle mblDotsMenuMedWikiCard tanar"
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
          <div className="full_width mblSessionBttmArea">
            {val.question == "" || val.question == null ? null : (
              <h3 className="colorBlack font_16px font400 dskArchiveCardTtl">
                {val.question}
              </h3>
            )}
            <div className="clearfix"></div>
            <div className="full_width mblSessionDocArea">
              {val.session_doctor_entities.length > 0
                ? val.session_doctor_entities.map((val, ind) => (
                    <div className="full_width radius-6 mblSessionDocRow">
                      <div className="row align-items-center">
                        <div className="radius-100 mblSessionDocPic">
                          {val.session_doctor_image != "" ||
                          val.session_doctor_image != null ? (
                            <img
                              src={val.session_doctor_image}
                              alt="Vault"
                              className="object_fit_cover"
                            />
                          ) : (
                            <img
                              src={medwikiicon}
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
                    </div>
                  ))
                : null}
              {/* mblSessionDocRow */}
            </div>

            <div className="full_width mblSessionbtm">
              <div
                className="text-uppercase colorWhite font_14px fontExo font400 radius-6 mblSessionbtm_a"
                onClick={() => {
                  this.redirectToArchiveDetail(val.type_id);
                }}
              >
                <span>
                  View <img src={angaleWhite} />
                </span>
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

  archivedVideoCardMobile(val, ind) {
    return (
      <div className="mblSessionCard mblArchiveCard mblRecentCard">
        <a
          href="javascript:void(0)"
          className="full_width radius-6 mblSessionCard_link"
        >
          <div className="full_width mblSessionTopArea">
            {val.image == "" || val.image == null ? (
              <img
                src={medwikiicon}
                className="object_fit_cover ssnTopBgGraphic"
              />
            ) : (
              <img
                src={val.image}
                className="object_fit_cover ssnTopBgGraphic"
              />
            )}
            <div
              className="overlay"
              onClick={() => {
                this.redirectToArchiveDetail(val.type_id);
              }}
              style={{ cursor: "pointer" }}
            ></div>
            <img
              src={dskArchiveCardPlay}
              className="translate_both mblArchiveCardPlay"
            />
            <div className="full_width mblSessionTopIn">
              <div className="full_width mblSessionTop">
                <div className="row align-items-center justify-content-between">
                  {val.category_name == "" ||
                  val.category_name == null ? null : (
                    <div className="colorWhite font_14px font500 mblSessionType">
                      {val.category_image == null ||
                      val.category_image == "" ? null : (
                        <span className="radius-100 mblSessionTypeIcon">
                          <img
                            src={val.category_image}
                            className="translate_both"
                          />
                        </span>
                      )}
                      {val.category_name}
                    </div>
                  )}
                  <div className="mblSessionTopRight">
                    {deafult_popover_index == ind
                      ? this.arcCardMenuPopoverMobile(val, ind)
                      : null}
                    {deafult_popover_index != ind ? (
                      <div
                        onClick={() => {
                          this.onMenuClick(ind);
                        }}
                        className="mblDotsMenu mblDotsCircle mblDotsMenuSssnCard tanar"
                      >
                        <span className="mblDotsMenu-dots"></span>
                        <span className="mblDotsMenu-dots"></span>
                        <span className="mblDotsMenu-dots"></span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="full_width mblSessionBttmArea">
            {val.question == "" || val.question == null ? null : (
              <h3 className="colorBlack font_16px font400 mblArchiveCardTtl">
                {val.question}
              </h3>
            )}
            <div className="clearfix"></div>
            <div className="full_width mblSessionDocArea">
              {val.session_doctor_entities.length > 0
                ? val.session_doctor_entities.map((val, ind) => (
                    <div className="full_width radius-6 mblSessionDocRow">
                      <div className="row align-items-center">
                        <div className="radius-100 mblSessionDocPic">
                          {val.session_doctor_image != "" ||
                          val.session_doctor_image != null ? (
                            <img
                              src={val.session_doctor_image}
                              alt="Vault"
                              className="object_fit_cover"
                            />
                          ) : (
                            <img
                              src={medwikiicon}
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
                    </div>
                  ))
                : null}
              {/* mblSessionDocRow */}
            </div>

            <div className="full_width mblSessionbtm">
              <div
                className="text-uppercase colorWhite font_14px fontExo font400 radius-6 mblSessionbtm_a"
                onClick={() => {
                  this.redirectToArchiveDetail(val.type_id);
                }}
              >
                <span>
                  View <img src={angaleWhite} />
                </span>
              </div>
              <Slider {...mblSessionClient} className="mblSessionClient">
                {val.sponsor_logo !== null || val.sponsor_logo == ""
                  ? val.sponsor_logo.split(",").map((val, ind) => (
                      <div className="mblSessionClientItem">
                        <img src={val} />
                      </div>
                    ))
                  : null}
              </Slider>
            </div>
          </div>
        </a>
      </div>
    );
  }

  onvaultPress = (item_id, type, arr_index, flag) => {
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
        if (flag == 0) {
          this.state.session_listing_archived[arr_index].vault =
            responseJson.data;
          reactLocalStorage.set(
            "@ClirnetStore:vault_count",
            parseInt(reactLocalStorage.get("@ClirnetStore:vault_count", true)) +
              1
          );
        }
        if (flag == 1) {
          this.state.session_listing_archived[arr_index].vault =
            responseJson.data;
          reactLocalStorage.set(
            "@ClirnetStore:vault_count",
            parseInt(reactLocalStorage.get("@ClirnetStore:vault_count", true)) -
              1
          );
        }
        this.refresh();
      })
      .catch((error) => {});
  };

  onvaultPressvideo = (item_id, type, arr_index, flag) => {
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
        if (responseJson.data == 1) {
          reactLocalStorage.set(
            "@ClirnetStore:vault_count",
            parseInt(reactLocalStorage.get("@ClirnetStore:vault_count", 0)) + 1
          );
          this.state.session_listing_archived[arr_index].vault =
            responseJson.data;
        }

        if (responseJson.data == 0) {
          reactLocalStorage.set(
            "@ClirnetStore:vault_count",
            parseInt(reactLocalStorage.get("@ClirnetStore:vault_count", 0)) - 1
          );
          this.state.session_listing_archived[arr_index].vault =
            responseJson.data;
        }

        this.refresh();
      })
      .catch((error) => {});
  };

  onLikeBtnPress = (item_id, type, arr_index) => {
    console.log("like btn");
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
          if (responseJson.data.rating == 1) {
            this.state.session_listing_archived[arr_index].rating =
              responseJson.data.rating;
            this.state.session_listing_archived[arr_index].myrating = true;
          } else {
            this.state.session_listing_archived[arr_index].rating =
              responseJson.data.rating;
            this.state.session_listing_archived[arr_index].myrating = false;
          }
        }
        this.refresh();
      })
      .catch((error) => {});
  };

  renderArchivedVideoList(val, ind) {
    // if (isMobile) {
    //   return (
    //     this.archivedVideoCardMobile(val, ind)
    //   )
    // } else {
    //   return (
    //     this.archivedVideoCardDesktop(val, ind)
    //   )
    // }
    return (
      <ArcVideoSmallCard
        history={this.props.history}
        mobile_device={isMobile}
        onChangeButton={this.handle_change_arc.bind(this)}
        card_data={val}
        clicked_index={selected_arc_popover_index}
        elem_key={ind}
        custom_class="gr_page_medwiki"
      />
    );
  }

  render() {
    var that = this;
    // this.setCssToSession(archived_video_list);
    return (
      <div
        className={
          isMobile == true
            ? "full_width wrap_body mblScreen"
            : "full_width wrap_body dskScreen"
        }
      >
        <Helmet>
          <meta
            property="og:url"
            content="https://doctor.clirnet.com/services/"
          />
          <meta property="og:type" content="article" />
          <meta property="og:title" content="CMEs powered by CLIRNet" />
          <meta
            property="og:description"
            content="Pratical answers to discussions and questions. Created by Doctors for Doctors."
          />
          <meta
            property="og:image"
            content="https://www.clirnet.com/wp-content/themes/clirnet/fav/android-icon-192x192.png"
          />
          <meta
            property="og:image:secure_url"
            content="https://www.clirnet.com/wp-content/themes/clirnet/fav/android-icon-192x192.png"
          />
          <meta
            name="twitter:image"
            content="https://www.clirnet.com/wp-content/themes/clirnet/fav/android-icon-192x192.png"
          />
          <meta name="twitter:title" content="CMEs powered by CLIRNet" />
          <meta name="twitter:card" content="summary_large_image" />
        </Helmet>
        <Header history={this.props.history} page_name={pageNames} />
        <section className="full_width body_area seeeionPage sessionArcWithOutPage">
          {/*seeeionPage sessionArcPage commented  */}
          <div className="container">
            <div className="row">
              <Banner
                type_id={0}
                type={"sessionlist"}
                apiresponserecieved={this.display_banner}
                api_call_detail={1}
                api_call={0}
              />

              {this.state.banner_display == true ? (
                <Banner
                  type_id={0}
                  banner_position={1}
                  unmount_call={1}
                  type={"sessionlist"}
                  api_call={1}
                  before_unload_call={1}
                />
              ) : null}
              <div className="clearfix"></div>
              {is_searched == 0 ? (
                <section className="full_width my_session">
                  <div className="clearfix"></div>
                  <div className="medWikiLeft">
                    <div className="justify-content-md-center">
                      <div className="radius-6 col-xs-12 my_session_top">
                        <ul className="font_16px font600">
                          {button_val == "cme" ? (
                            <li className="active">
                              <a
                                href="javascript:void(0);"
                                onClick={() => {
                                  this.redirect_to_session_type("cme");
                                  this.setState({ is_loader: true });
                                }}
                              >
                                CME
                              </a>
                            </li>
                          ) : (
                            <li>
                              <a
                                href="javascript:void(0);"
                                onClick={() => {
                                  this.redirect_to_session_type("cme");
                                  this.setState({ is_loader: true });
                                }}
                              >
                                CME
                              </a>
                            </li>
                          )}
                          {button_val == "allinone" ? (
                            <li className="active">
                              <a
                                href="javascript:void(0);"
                                onClick={() => {
                                  this.redirect_to_session_type("allinone");
                                  this.setState({ is_loader: true });
                                }}
                              >
                                One On One
                              </a>
                            </li>
                          ) : (
                            <li>
                              <a
                                href="javascript:void(0);"
                                onClick={() => {
                                  this.redirect_to_session_type("allinone");
                                  this.setState({ is_loader: true });
                                }}
                              >
                                One On One
                              </a>
                            </li>
                          )}
                          {button_val == "reserved" ? (
                            <li className="active">
                              <a
                                href="javascript:void(0);"
                                onClick={() => {
                                  this.redirect_to_session_type("reserved");
                                  this.setState({ is_loader: true });
                                }}
                              >
                                Reserved
                              </a>
                            </li>
                          ) : (
                            <li>
                              <a
                                href="javascript:void(0);"
                                onClick={() => {
                                  this.redirect_to_session_type("reserved");
                                  this.setState({ is_loader: true });
                                }}
                              >
                                Reserved
                              </a>
                            </li>
                          )}

                          {button_val == "archived" ? (
                            <li className="active">
                              <a
                                href="javascript:void(0);"
                                onClick={() => {
                                  button_val = "archived";
                                  this.redirect_to_session_type("archived");
                                  this.setState({ is_loader: true });
                                }}
                              >
                                Recorded
                              </a>
                            </li>
                          ) : (
                            <li>
                              <a
                                href="javascript:void(0);"
                                onClick={() => {
                                  button_val = "archived";
                                  this.redirect_to_session_type("archived");
                                  this.setState({ is_loader: true });
                                }}
                              >
                                Recorded
                              </a>
                            </li>
                          )}
                        </ul>
                        <div className="float-right">
                          <a
                            className="radius-100 ssn_filter tRright_popShow ssn_filterDesk"
                            onClick={() => {
                              this.redirect_to_filt();
                            }}
                            href="javascript:void(0)"
                          >
                            <img className="translate_both" src={filterIcon} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <a
                      className="radius-100 bgColorGreen tRright_popShow medWikifilterRes"
                      href="javascript:void(0)"
                    >
                      <img className="translate_both" src={filterWhite} />
                    </a>
                    <div className="clearfix"></div>
                    {button_val != "archived" ? (
                      <div className="full_width ssn_main">
                        {this.state.is_loader ? (
                          <Masonry
                            className={"dskMasonryCardArea"} // default ''
                            elementType={"ul"} // default 'div'
                            options={masonryOptions} // default {}
                            disableImagesLoaded={false} // default false
                            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                          >
                            {" "}
                            <SessionCardLoader />
                            <SessionCardLoader />
                          </Masonry>
                        ) : null}
                        {/* <Loader className="loader_cmn" type="ThreeDots" color="#3393df" height={80} width={80} visible={this.state.is_loader} /> */}

                        {is_upcoming_block_display == 1 ? (
                          <div>
                            {this.state.session_listing_upcoming.length == 0 &&
                            this.state.is_loader == false ? (
                              <div className="full_width alert alert-danger">
                                <strong>No Records Found</strong>
                              </div>
                            ) : null}
                            {isMobile ? (
                              <div className="full_width mblRecentSroll">
                                {this.state.session_listing_upcoming.map(
                                  (r, index) => (
                                    <Sessioncard
                                      onChangeButton={this.handle_change}
                                      history={this.props.history}
                                      mobile_device={isMobile}
                                      card_data={r}
                                      clicked_index={
                                        selected_session_popover_index
                                      }
                                      elem_key={index}
                                      custom_class="upcoming_sessioncard_session_block"
                                    />
                                  )
                                )}
                              </div>
                            ) : (
                              <Masonry
                                className={"dskMasonryCardArea"} // default ''
                                elementType={"ul"} // default 'div'
                                options={masonryOptions} // default {}
                                disableImagesLoaded={false} // default false
                                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                              >
                                {this.state.session_listing_upcoming.map(
                                  (r, index) => (
                                    <Sessioncard
                                      onChangeButton={this.handle_change}
                                      history={this.props.history}
                                      mobile_device={isMobile}
                                      card_data={r}
                                      clicked_index={
                                        selected_session_popover_index
                                      }
                                      elem_key={index}
                                      custom_class="upcoming_sessioncard_session_block"
                                    />
                                  )
                                )}

                                <div class="finddiv" style={{ color: "white" }}>
                                  ...
                                </div>
                              </Masonry>
                            )}

                            {button_val == "allinone" &&
                            is_more_upcoming == 1 ? (
                              <div>
                                {this.state.is_loader_more ? (
                                  <Masonry
                                    className={"dskMasonryCardArea"} // default ''
                                    elementType={"ul"} // default 'div'
                                    options={masonryOptions} // default {}
                                    disableImagesLoaded={false} // default false
                                    updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                                  >
                                    {" "}
                                    <SessionCardLoader />
                                    <SessionCardLoader />
                                  </Masonry>
                                ) : null}

                                {/* <Loader className="loader_cmn" type="ThreeDots" color="#3393df" height={80} width={80} visible={this.state.is_loader_more} /> */}
                              </div>
                            ) : null}
                          </div>
                        ) : null}

                        {is_cme_block_display == 1 ? (
                          <div>
                            {this.state.session_listing_cme.length == 0 &&
                            this.state.is_loader == false ? (
                              <div className="full_width alert alert-danger">
                                <strong>No Records Found</strong>
                              </div>
                            ) : null}

                            {isMobile ? (
                              <div className="full_width mblRecentSroll">
                                {this.state.session_listing_cme.map(
                                  (r, index) => (
                                    <Sessioncard
                                      onChangeButton={this.handle_change}
                                      history={this.props.history}
                                      mobile_device={isMobile}
                                      card_data={r}
                                      clicked_index={
                                        selected_session_popover_index
                                      }
                                      elem_key={index}
                                      custom_class="cmecard_session_block"
                                    />
                                  )
                                )}
                              </div>
                            ) : (
                              <Masonry
                                className={"dskMasonryCardArea"} // default ''
                                elementType={"ul"} // default 'div'
                                options={masonryOptions} // default {}
                                disableImagesLoaded={false} // default false
                                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                                //imagesLoadedOptions={imagesLoadedOptions} // default {}
                              >
                                {this.state.session_listing_cme.map(
                                  (r, index) => (
                                    <Sessioncard
                                      onChangeButton={this.handle_change}
                                      history={this.props.history}
                                      mobile_device={isMobile}
                                      card_data={r}
                                      clicked_index={
                                        selected_session_popover_index
                                      }
                                      elem_key={index}
                                      custom_class="cmecard_session_block"
                                    />
                                  )
                                )}

                                <div class="finddiv" style={{ color: "white" }}>
                                  ...
                                </div>
                              </Masonry>
                            )}
                          </div>
                        ) : null}
                        {button_val == "cme" && is_more_cme == 1 ? (
                          <div>
                            {this.state.is_loader_more ? (
                              <Masonry
                                className={"dskMasonryCardArea"} // default ''
                                elementType={"ul"} // default 'div'
                                options={masonryOptions} // default {}
                                disableImagesLoaded={false} // default false
                                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                              >
                                {" "}
                                <SessionCardLoader />
                                <SessionCardLoader />
                              </Masonry>
                            ) : null}
                            {/* <Loader className="loader_cmn" type="ThreeDots" color="#3393df" height={80} width={80} visible={this.state.is_loader_more} /> */}
                          </div>
                        ) : null}

                        {is_reserved_block_display == 1 ? (
                          <>
                            {isMobile ? (
                              <div className="full_width mblRecentSroll">
                                {this.state.session_listing_reserved.map(
                                  (r, index) => (
                                    <Sessioncard
                                      onChangeButton={this.handle_change}
                                      history={this.props.history}
                                      mobile_device={isMobile}
                                      card_data={r}
                                      clicked_index={
                                        selected_session_popover_index
                                      }
                                      elem_key={index}
                                      custom_class="searched_sessioncard_session_block"
                                      custom_id={"res_" + index}
                                    />
                                  )
                                )}
                              </div>
                            ) : (
                              <Masonry
                                className={"dskMasonryCardArea"} // default ''
                                elementType={"ul"} // default 'div'
                                options={masonryOptions} // default {}
                                disableImagesLoaded={false} // default false
                                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                                //imagesLoadedOptions={imagesLoadedOptions} // default {}
                              >
                                {this.state.session_listing_reserved.map(
                                  (r, index) => (
                                    <Sessioncard
                                      onChangeButton={this.handle_change}
                                      history={this.props.history}
                                      mobile_device={isMobile}
                                      card_data={r}
                                      clicked_index={
                                        selected_session_popover_index
                                      }
                                      elem_key={index}
                                      custom_class="searched_sessioncard_session_block"
                                      custom_id={"res_" + index}
                                    />
                                  )
                                )}
                                <div class="finddiv" style={{ color: "white" }}>
                                  ...
                                </div>
                              </Masonry>
                            )}

                            {this.state.session_listing_reserved.length == 0 &&
                            this.state.is_loader == false ? (
                              <div className="full_width alert alert-danger">
                                <strong>You have no reserved CMEs</strong>
                              </div>
                            ) : null}
                          </>
                        ) : null}
                        {button_val == "reserved" && is_more_reserved == 1 ? (
                          <div>
                            {this.state.is_loader_more ? (
                              <Masonry
                                className={"dskMasonryCardArea"} // default ''
                                elementType={"ul"} // default 'div'
                                options={masonryOptions} // default {}
                                disableImagesLoaded={false} // default false
                                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                              >
                                {" "}
                                <SessionCardLoader />
                                <SessionCardLoader />
                              </Masonry>
                            ) : null}
                            {/* <Loader className="loader_cmn" type="ThreeDots" color="#3393df" height={80} width={80} visible={this.state.is_loader_more} /> */}
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <div className="full_width ssn_main">
                        <div className="full_width">
                          {this.state.session_listing_archived.length == 0 &&
                          this.state.is_loader == false ? (
                            <div className="full_width alert alert-danger">
                              <strong>No Records Found</strong>
                            </div>
                          ) : (
                            <div>
                              {this.state.is_loader == true ? (
                                <Masonry
                                  className={"dskMasonryCardArea"} // default ''
                                  elementType={"ul"} // default 'div'
                                  options={masonryOptions} // default {}
                                  disableImagesLoaded={false} // default false
                                  updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                                >
                                  <SessionCardLoader />
                                  <SessionCardLoader />
                                </Masonry>
                              ) : null}
                            </div>
                          )}

                          <Masonry
                            className={"dskMasonryCardArea"} // default ''
                            elementType={"ul"} // default 'div'
                            options={masonryOptions} // default {}
                            disableImagesLoaded={false} // default false
                            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                          >
                            {this.state.session_listing_archived.map(
                              (val, ind) =>
                                this.renderArchivedVideoList(val, ind)
                            )}

                            <div class="finddiv" style={{ color: "white" }}>
                              ...
                            </div>
                          </Masonry>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* ///////////////////////////////////////////////////////// */}

                  {/* {(archived_video_list.length <=0 )?null:this.renderArchivedVideo(archived_video_list,this.state.archived_video_loader)} */}
                  {/* ///////////////////////////////////////////////////////// */}
                </section>
              ) : (
                <section className="full_width my_session">
                  <div className="clearfix"></div>

                  <div className="full_width">
                    <div className="float-right filterSsnPBtn">
                      <a
                        className="radius-100 ssn_filter"
                        onClick={() => {
                          this.redirect_to_main();
                        }}
                        href="javascript:void(0)"
                      >
                        <img className="translate_both" src={reload} />
                      </a>
                      <a
                        className="radius-100 ssn_filter   tRright_popShow"
                        onClick={() => {
                          this.redirect_to_filt();
                        }}
                        href="javascript:void(0)"
                      >
                        <img className="translate_both" src={filterIcon} />
                      </a>
                    </div>
                  </div>

                  <div className="clearfix"></div>
                  {/* <Loader className="loader_cmn" type="ThreeDots" color="#3393df" height={80} width={80} visible={this.state.is_loader} /> */}

                  <div className="full_width text-left ssn_main">
                    {this.state.session_listing_searched.length == 0 &&
                    this.state.is_loader == false ? (
                      <div className="full_width alert alert-danger">
                        <strong>No Records Found</strong>
                      </div>
                    ) : null}

                    {isMobile ? (
                      <div className="full_width mblRecentSroll">
                        {this.state.session_listing_searched.map((r, index) => (
                          <Sessioncard
                            onChangeButton={this.handle_change}
                            history={this.props.history}
                            mobile_device={isMobile}
                            card_data={r}
                            clicked_index={selected_session_popover_index}
                            elem_key={index}
                            custom_class="searched_sessioncard_session_block"
                          />
                        ))}
                      </div>
                    ) : (
                      <Masonry
                        className={"dskMasonryCardArea"} // default ''
                        elementType={"ul"} // default 'div'
                        options={masonryOptions} // default {}
                        disableImagesLoaded={false} // default false
                        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                        //imagesLoadedOptions={imagesLoadedOptions} // default {}
                      >
                        {this.state.session_listing_searched.map((r, index) => (
                          <Sessioncard
                            onChangeButton={this.handle_change}
                            history={this.props.history}
                            mobile_device={isMobile}
                            card_data={r}
                            clicked_index={selected_session_popover_index}
                            elem_key={index}
                            custom_class="searched_sessioncard_session_block"
                          />
                        ))}

                        <div class="finddiv" style={{ color: "white" }}>
                          ...
                        </div>
                      </Masonry>
                    )}

                    {is_searched == 1 && is_more_searched == 1 ? (
                      <div>
                        {this.state.is_loader_more ? (
                          <Masonry
                            className={"dskMasonryCardArea"} // default ''
                            elementType={"ul"} // default 'div'
                            options={masonryOptions} // default {}
                            disableImagesLoaded={false} // default false
                            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                          >
                            {" "}
                            <SessionCardLoader />
                            <SessionCardLoader />
                          </Masonry>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </section>
              )}
            </div>
          </div>
        </section>
        <Modal
          className="in ssnCancelPop"
          centered="true"
          animation="slide"
          show={this.state.showModal}
          onHide={() => {
            this.setState({ showModal: false });
          }}
        >
          <Modal.Header className="justify-content-center">
            <Modal.Title className="font600 font_18px colorBlack">
              Reason For Cancellation
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="full_width">
              <div className="full_width cmnCheckBox_row cmnRadio_row">
                <input
                  className="form-check-input"
                  checked={this.state.reason == "Emergency" ? true : false}
                  onClick={() => {
                    this.open_other("Emergency");
                  }}
                  id="cancelation-1"
                  type="radio"
                />
                <label
                  className="font600 font_12px colorBlack form-check-label"
                  for="cancelation-1"
                >
                  Emergency
                </label>
              </div>
              <div className="full_width cmnCheckBox_row cmnRadio_row">
                <input
                  className="form-check-input"
                  checked={this.state.reason == "notInterested" ? true : false}
                  onClick={() => {
                    this.open_other("notInterested");
                  }}
                  id="cancelation-2"
                  type="radio"
                />
                <label
                  className="font600 font_12px colorBlack form-check-label"
                  for="cancelation-2"
                >
                  Not Interested
                </label>
              </div>
              <div className="full_width cmnCheckBox_row cmnRadio_row">
                <input
                  className="form-check-input"
                  checked={
                    this.state.reason == "alreadyAnswered" ? true : false
                  }
                  onClick={() => {
                    this.open_other("alreadyAnswered");
                  }}
                  id="cancelation-3"
                  type="radio"
                />
                <label
                  className="font600 font_12px colorBlack form-check-label"
                  for="cancelation-3"
                >
                  Already Answered
                </label>
              </div>
              <div className="full_width cmnCheckBox_row cmnRadio_row">
                <input
                  className="form-check-input"
                  checked={this.state.reason == "outofStation" ? true : false}
                  onClick={() => {
                    this.open_other("outofStation");
                  }}
                  id="cancelation-4"
                  type="radio"
                />
                <label
                  className="font600 font_12px colorBlack form-check-label"
                  for="cancelation-4"
                >
                  Out of Station
                </label>
              </div>

              <div className="full_width cmnCheckBox_row cmnRadio_row">
                <input
                  checked={this.state.reason == "others" ? true : false}
                  onClick={() => {
                    this.open_other("others");
                  }}
                  className="form-check-input"
                  id="cancelation-5"
                  type="radio"
                />
                <label
                  className="font600 font_12px colorBlack form-check-label"
                  for="cancelation-5"
                >
                  Others
                </label>
              </div>
              <span className="err_hold" style={{ color: "red" }}>
                {this.state.err_msg}
              </span>
              {is_other_on == 1 ? (
                <div className="full_width form_row_pop">
                  <Form.Control
                    onChange={this.handleChangeother}
                    className="full_width font_14px font500 radius-6"
                    value={this.state.other_reason}
                    type="text"
                    placeholder="Type Here.."
                  />
                </div>
              ) : null}
            </div>
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
              Back
            </a>
            <a
              href="javascript:void(0)"
              className="radius-40 font500 btnGreen cmnBtn btnCmnSmall"
              variant="secondary"
              onClick={() => {
                this.cancel_session(this.state.sel_ses);
              }}
            >
              Apply
            </a>
          </Modal.Footer>
        </Modal>
        <Footer history={this.props.history} />

        <div className="right_fix_pop_JS">
          <div className="tRright_popClose right_fixedBg"></div>
          <div className="right_pop transition6s text-left ssnFilterPop">
            <div className="bgColorBlue text-left right_popTtl">
              <h2 className="colorWhite font600 font_20px right_popTtlTxt">
                Filter
              </h2>
              <a
                href="javascript:void(0)"
                className="radius-100 right_popClose tRright_popClose"
              >
                <img src={closeIcon} className="translate_both" />
              </a>
            </div>
            <div className="right_popIn">
              <div className="full_width ssnFilterFrmRow">
                <h3 className="font600 colorBlack font_16px ssnFilterFrmTtl">
                  Select Date Range
                </h3>
                <div className="row justify-content-between ssnFilterDateCont">
                  <DatePicker
                    popperPlacement="top-end"
                    className="font_14px font500 radius-6 ssnFltrCalenderInp"
                    selected={this.state.startDate}
                    onChange={this.handleDateChange}
                    minDate={new Date()}
                  />

                  <span className="ssnFilterDtaeTo">To</span>
                  <DatePicker
                    className="font_14px font500 radius-6 ssnFltrCalenderInp"
                    selected={this.state.endDate}
                    onChange={this.handleChangeto}
                    startDate={this.state.startDate}
                    minDate={new Date()}
                  />
                </div>
              </div>

              <div className="full_width ssnFilterFrmRow">
                <h3 className="font600 colorBlack font_16px ssnFilterFrmTtl">
                  Select Session Type
                </h3>
                <div className="full_width">
                  <div class="full_width font600">
                    {/* <ul>
                {this.state.speciality.map((r, index) => (
                <li className={"lispec_"+r.master_specialities_id}><a onClick = {()=> this.getsubspec(r.master_specialities_id,1 ) } href="javascript:void(0);">{r.specialities_name}</a></li>

                
                ))} 
                </ul> */}

                    {/* <Form.Group className="feedRightSpecilityPrnt" controlId="formBasicCheckbox">
                {(this.state.mastercast_search==true)?
                  <Form.Check checked onClick = {()=>{this.setState({"mastercast_search":!this.state.mastercast_search})}}  className="cmnCheckBox_row" type="checkbox" label="Mastercast" />:
<Form.Check  onClick = {()=>{this.setState({"mastercast_search":!this.state.mastercast_search})}}  className="cmnCheckBox_row" type="checkbox" label="Mastercast" />}
                
                  
                  
                </Form.Group> */}
                    <Form.Group
                      className="feedRightSpecilityPrnt"
                      controlId="formBasicCheckbox"
                    >
                      {this.state.masterconsult_search == true ? (
                        <Form.Check
                          checked
                          onClick={() => {
                            this.setState({
                              masterconsult_search:
                                !this.state.masterconsult_search,
                            });
                          }}
                          className="cmnCheckBox_row"
                          type="checkbox"
                          label="Masterconsult"
                        />
                      ) : (
                        <Form.Check
                          onClick={() => {
                            this.setState({
                              masterconsult_search:
                                !this.state.masterconsult_search,
                            });
                          }}
                          className="cmnCheckBox_row"
                          type="checkbox"
                          label="Masterconsult"
                        />
                      )}
                    </Form.Group>
                    <Form.Group
                      className="feedRightSpecilityPrnt"
                      controlId="formBasicCheckbox"
                    >
                      {this.state.mastercircle_search == true ? (
                        <Form.Check
                          checked
                          onClick={() => {
                            this.setState({
                              mastercircle_search:
                                !this.state.mastercircle_search,
                            });
                          }}
                          className="cmnCheckBox_row"
                          type="checkbox"
                          label="Mastercircle"
                        />
                      ) : (
                        <Form.Check
                          onClick={() => {
                            this.setState({
                              mastercircle_search:
                                !this.state.mastercircle_search,
                            });
                          }}
                          className="cmnCheckBox_row"
                          type="checkbox"
                          label="Mastercircle"
                        />
                      )}
                    </Form.Group>
                  </div>
                </div>
              </div>

              <div className="full_width ssnFilterFrmRow">
                <h3 className="font600 colorBlack font_16px ssnFilterFrmTtl">
                  Speaker Speciality
                </h3>
                <div className="full_width font600">
                  {this.state.speciality.map((r, index) => (
                    <Form.Group
                      className={
                        "chada feedRightSpecilityPrnt lispec_" +
                        r.master_specialities_id
                      }
                      controlId="formBasicCheckbox"
                    >
                      {selected_spec.indexOf(r.master_specialities_id) != -1 ? (
                        <Form.Check
                          checked
                          onClick={() =>
                            this.selectspec(r.master_specialities_id)
                          }
                          className="cmnCheckBox_row"
                          type="checkbox"
                          label={r.specialities_name}
                        />
                      ) : (
                        <Form.Check
                          onClick={() =>
                            this.selectspec(r.master_specialities_id)
                          }
                          className="cmnCheckBox_row"
                          type="checkbox"
                          label={r.specialities_name}
                        />
                      )}
                    </Form.Group>
                  ))}
                </div>
              </div>
              <span style={{ color: "red" }}>{this.state.search_err}</span>
              <a
                href="javascript:void(0);"
                onClick={() => this.get_search_result()}
                className="radius-6 full_width text-center font600 btnGreen cmnBtn"
              >
                Apply
              </a>
            </div>
          </div>
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
        />
      </div>
    );
  }
}

export default Sessions;
