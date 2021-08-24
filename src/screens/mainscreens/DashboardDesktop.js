import React from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import $ from "jquery";
import { isMobile } from "react-device-detect";
import HeaderDesktop from "./HeaderDesktop";
import FooterDesktop from "./FooterDesktop";
import AppConfig from "../config/config.js";
import DoctorVoice from "../dashboard_desktop/DoctorVoice.js";
import SessionSlider from "../dashboard_desktop/SessionSlider";
import Announcement from "../dashboard_desktop/Announcement";
import TrendingGrandRound from "../dashboard_desktop/TrendingGrandRound";
import TrendingMedwiki from "../dashboard_desktop/TrendingMedwiki";
import TrendingSurvey from "../dashboard_desktop/TrendingSurvey";
import Recent from "../dashboard_desktop/Recent";
import Banner from "./Banner";
const gtag = window.gtag;

// import GA4React, { useGA4React } from "ga-4-react";
// const ga4react = new GA4React("G-MMRQERMH4E");
// ga4react.initialize().then((ga4) => {
// 	ga4.pageview('CLIRNET - Homes')

//   },(err) => {
// 	console.error(err)
//   })

const masonryOptions = {
  transitionDuration: 0,
};

const url = AppConfig.apiLoc;

class DashboardDesktop extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.reirectToPage();
    this.state = {
      rerender: false,
      banner_display: false,
    };

    if (reactLocalStorage.get("@ClirnetStore:page_reload", true) == "1111") {
      reactLocalStorage.set("@ClirnetStore:page_reload", "2222");
      //window.location.reload();
    }

    this.display_banner = this.display_banner.bind(this);
  }

  display_banner(datam) {
    this.setState({ banner_display: true });

    //alert(datam)
  }

  refresh() {
    this.setState({ rerender: !this.state.rerender });
  }

  reirectToPage() {
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

  componentDidMount() {
    window.document.title = "CLIRNET - yo";
    gtag("config", AppConfig.gtag_measure_id, {
      page_title: window.document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });

    $(".li_home").attr("id", "dashboard_cal");
  }

  componentWillUnmount() {
    $("html, body").css({
      overflow: "auto",
      height: "auto",
    });
  }

  render() {
    return (
      <div className="full_width dskScreen">
        <HeaderDesktop history={this.props.history} />
        <div className="full_width dskHome">
          <div className="container mycontainer">
            <div className="row">
              <div className="full_width">
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
                <div className="full_width dskBody">
                  <div className="row">
                    <div className="col-sm-9 dskLeft">
                      {/* Doctor Voice Start------------- */}
                      <DoctorVoice history={this.props.history} />
                      <div className="clearfix"></div>
                      {/* Doctor Voice End------------- */}
                      {/* Live & reserved Session Start------------- */}
                      <SessionSlider history={this.props.history} />
                      {/* Session Start------------- */}
                      {/* Ads------------- */}
                      {/* {(banner_bottom_type === 'video' || banner_bottom_type === 'image') ?
												<section className="full_width adsArea">
													<div className="full_width adsFrame">
														<Banner type_id={0} banner_position={2} unmount_call={0} type={"DashboardDesktop"} api_call={1} before_unload_call={0}/>
													</div>
												</section> : null} */}
                      {/* Ads------------- */}
                      {/* trendig slider-	----------- */}
                      <section className="full_width text-left dskTrendingSlider">
                        <div className="row">
                          {/* ///////////////trending gr///////////////// */}
                          <TrendingGrandRound
                            history={this.props.history}
                            callbackReciver={this.refresh.bind(this)}
                          />
                          {/* ////////////////trending gr slider end//////////////////// */}
                          {/* //////////////////// */}
                          {/* //////////trending -survey-quiz-start///////////////// */}
                          <TrendingSurvey history={this.props.history} />
                          {/* //////////trendin survey-end///////////// */}
                        </div>
                      </section>
                      {/* Recent------------- */}
                      <Recent
                        history={this.props.history}
                        callbackReciver={this.refresh.bind(this)}
                      />
                      {/* Recent------------- */}
                    </div>
                    <div className="col-md-3 dskRight">
                      {this.state.banner_display == true ? (
                        <Banner
                          type_id={0}
                          banner_position={3}
                          unmount_call={0}
                          type={"dashboard"}
                          api_call={1}
                          before_unload_call={0}
                        />
                      ) : null}
                      {/* ///////announcement -start/////// */}
                      <Announcement history={this.props.history} />
                      {/* ////////announcement- end/////// */}
                      {/* ////trending medwiki start///// */}
                      <TrendingMedwiki
                        history={this.props.history}
                        callbackReciver={this.refresh.bind(this)}
                      />
                      {/* //////////trending medwiki end///////////// */}
                      {/* Ads------------- */}
                      <section className="full_width radius-6 adsAreaRight">
                        {this.state.banner_display == true ? (
                          <Banner
                            type_id={0}
                            banner_position={4}
                            unmount_call={0}
                            type={"dashboard"}
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
        <FooterDesktop />
      </div>
    );
  }
}

export default DashboardDesktop;
