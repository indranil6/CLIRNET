import React, { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import $ from "jquery";
import { isMobile } from "react-device-detect";
import HeaderDesktop from "./HeaderDesktop";
import FooterDesktop from "./FooterDesktop";
import AppConfig from "../config/config.js";
import DoctorVoice from "../dashboard_desktop/DoctorVoice.func";
import SessionSlider from "../dashboard_desktop/SessionSlider";
import Announcement from "../dashboard_desktop/Announcement";
import TrendingGrandRound from "../dashboard_desktop/TrendingGrandRound";
import TrendingMedwiki from "../dashboard_desktop/TrendingMedwiki";
import TrendingSurvey from "../dashboard_desktop/TrendingSurvey";
import Recent from "../dashboard_desktop/Recent";
import Banner from "./Banner";
const gtag = window.gtag;

const masonryOptions = {
  transitionDuration: 0,
};
const url = AppConfig.apiLoc;

const DashboardDesktopFunc = (props) => {
  const [rerender, setReRender] = useState(false);
  const [banner_display, setBanner_display] = useState(false);
  function display_banner(datam) {
    setBanner_display(true);

    //alert(datam)
  }
  function refresh() {
    setReRender(!rerender);
  }
  function redirectToPage() {
    if (isMobile) {
      redirectToMobileDashboard();
    } else {
      redirectToDesktopDashboard();
    }
  }
  function redirectToDesktopDashboard() {
    props.history.push({
      pathname: `/DashboardDesktop`,
    });
  }
  function redirectToMobileDashboard() {
    props.history.push({
      pathname: `/DashboardMobile`,
    });
  }
  useEffect(() => {
    redirectToPage();
    window.document.title = "CLIRNET - Home";
    gtag("config", AppConfig.gtag_measure_id, {
      page_title: window.document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });

    $(".li_home").attr("id", "dashboard_cal");

    return () => {
      $("html, body").css({
        overflow: "auto",
        height: "auto",
      });
    };
  }, []);
  return (
    <>
      <div className="full_width dskScreen">
        <HeaderDesktop history={props.history} />
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
                      apiresponserecieved={display_banner}
                      api_call_detail={1}
                      api_call={0}
                    />

                    {banner_display == true ? (
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
                      <DoctorVoice history={props.history} />
                      <div className="clearfix"></div>
                      {/* Doctor Voice End------------- */}
                      {/* Live & reserved Session Start------------- */}
                      <SessionSlider history={props.history} />
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
                            history={props.history}
                            callbackReciver={refresh}
                          />
                          {/* ////////////////trending gr slider end//////////////////// */}
                          {/* //////////////////// */}
                          {/* //////////trending -survey-quiz-start///////////////// */}
                          <TrendingSurvey history={props.history} />
                          {/* //////////trendin survey-end///////////// */}
                        </div>
                      </section>
                      {/* Recent------------- */}
                      <Recent
                        history={props.history}
                        callbackReciver={refresh}
                      />
                      {/* Recent------------- */}
                    </div>
                    <div className="col-md-3 dskRight">
                      {banner_display == true ? (
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
                      <Announcement history={props.history} />
                      {/* ////////announcement- end/////// */}
                      {/* ////trending medwiki start///// */}
                      <TrendingMedwiki
                        history={props.history}
                        callbackReciver={refresh}
                      />
                      {/* //////////trending medwiki end///////////// */}
                      {/* Ads------------- */}
                      <section className="full_width radius-6 adsAreaRight">
                        {banner_display == true ? (
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
    </>
  );
};

export default DashboardDesktopFunc;
