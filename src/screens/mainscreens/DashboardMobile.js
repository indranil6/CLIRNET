import React from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import $ from "jquery";
import { isMobile } from "react-device-detect";
import HeaderMobile from "./HeaderMobile";
import FooterMobile from "./FooterMobile";
import AppConfig from "../config/config.js";
import DoctorVoice from "../dashboard_mobile/DoctorVoice.js";
import SessionSlider from "../dashboard_mobile/SessionSlider";
import Announcement from "../dashboard_mobile/Announcement";
import TrendingMedwiki from "../dashboard_mobile/TrendingMedwiki";
import RecommentedSurvey from "../dashboard_mobile/RecommentedSurvey";
import Recent from "../dashboard_mobile/Recent";
import GrandRoundSlider from "../dashboard_mobile/GrandRoundSlider";
import Banner from "../mainscreens/Banner";
const gtag = window.gtag;

const pageNames = "Home";

// const history = createBrowserHistory()
class DashboardMobile extends React.Component {
  constructor(props) {
    super(props);
    this.reirectToPage();

    this.state = {
      rerender: false,
      banner_display: false,
    };

    if (reactLocalStorage.get("@ClirnetStore:page_reload", true) == "1111") {
      reactLocalStorage.set("@ClirnetStore:page_reload", "2222");
      // window.location.reload();
    }
    this.display_banner = this.display_banner.bind(this);
  }
  display_banner(datam) {
    this.setState({ banner_display: true });

    //alert(datam)
  }

  refresh() {
    // console.log('dashboard refreshed')
    this.setState({ rerender: !this.state.rerender });
  }
  componentDidMount() {
    window.document.title = "CLIRNET - Home";
    gtag("config", AppConfig.gtag_measure_id, {
      page_title: window.document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
    $(".dashboard_mobile").addClass("active");
  }

  reirectToPage() {
    //console.log("inRedirectFun"+isMobile)
    if (isMobile) {
      this.redirectToMobileDashboard();
    } else {
      this.redirectToDesktopDashboard();
    }
  }

  redirectToDesktopDashboard() {
    this.props.history.push({
      pathname: `/DashboardDesktop`,
    });
  }

  redirectToMobileDashboard() {
    this.props.history.push({
      pathname: `/DashboardMobile`,
    });
  }

  componentWillUnmount() {
    $("html, body").css({
      overflow: "auto",
      height: "auto",
    });
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

    var mblGrSlider = {
      dots: false,
      infinite: true,
      speed: 600,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      centerMode: true,
      centerPadding: "12%",
      autoplay: true,
      responsive: [
        {
          breakpoint: 640,
          settings: {
            centerPadding: "6%",
          },
        },
        {
          breakpoint: 360,
          settings: {
            centerPadding: "5%",
          },
        },
      ],
    };

    return (
      <div className="full_width mblScreen">
        <HeaderMobile history={this.props.history} page_name={pageNames} />
        <div className="full_width mblHome">
          {/* Ads------------- */}
          <section className="full_width adsArea">
            <div className="full_width adsFrame">
              <Banner
                type_id={0}
                type={"dashboard"}
                apiresponserecieved={this.display_banner}
                api_call_detail={1}
                api_call={0}
              />
              {this.state.banner_display == true ? (
                <Banner
                  type_id={0}
                  banner_position={1}
                  unmount_call={1}
                  type={"dashboard"}
                  api_call={1}
                  before_unload_call={1}
                />
              ) : null}
            </div>
          </section>
          {/* Ads------------- */}
          {/* announcement Star--------------*/}
          <Announcement history={this.props.history} />
          {/* announcement End---------------*/}

          {/* Doctor Voice Start------------- */}
          <DoctorVoice history={this.props.history} />
          {/* Doctor Voice End------------- */}

          {/* Session Start------------- */}
          <SessionSlider history={this.props.history} />
          {/* Session End------------- */}

          {/* Medwiki Start------------- */}
          <TrendingMedwiki
            history={this.props.history}
            callbackReciver={this.refresh.bind(this)}
          />
          {/* Medwiki End------------- */}

          {/* gr Start------------- */}
          <GrandRoundSlider
            history={this.props.history}
            callbackReciver={this.refresh.bind(this)}
          />
          {/* gr End------------- */}

          {/* Surveys & Quizzes Start------------- */}
          <RecommentedSurvey history={this.props.history} />
          {/* Surveys & Quizzes End------------- */}

          {/* Ads------------- */}
          <section className="full_width adsArea">
            <div className="full_width adsFrame">
              {this.state.banner_display == true ? (
                <Banner
                  type_id={0}
                  banner_position={2}
                  unmount_call={0}
                  type={"dashboard"}
                  api_call={1}
                  before_unload_call={0}
                />
              ) : null}
            </div>
          </section>
          {/* Ads------------- */}

          {/* Recent------------- */}
          <Recent
            history={this.props.history}
            callbackReciver={this.refresh.bind(this)}
          />
          {/* Recent------------- */}
        </div>
        <FooterMobile history={this.props.history} />
      </div>
    );
  }
}

export default DashboardMobile;
