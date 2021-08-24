import React from "react";
// import Loader from "react-loader-spinner";
import $ from "jquery";
import { reactLocalStorage } from "reactjs-localstorage";
import AppConfig from "../config/config.js";
import Slider from "react-slick";
import Header from "./Header";
import Footer from "./Footer";
import surveyTTl from "../../images/surveyTTl.png";
import begainArrow from "../../images/begainArrow.png";
import "react-datepicker/dist/react-datepicker.css";
import { isMobile } from "react-device-detect";
import Moment from "react-moment";
import Disclaimer from "../Common/Common.js";
import Banner from "../mainscreens/Banner";
import ReactHtmlParser from "react-html-parser";

import ShareDetailPage from "../Common/ShareDetailPage.jsx";
import SpqDetailsLoader from "../LoadingPlaceholders/SpqDetailsLoader";
import SpqSmallCard from '../Cards/SpqSmallCard.js';

const gtag = window.gtag;

const pageNames = "Polls & Quizzes";
const url = AppConfig.apiLoc;

var surveyCategory = undefined;
var disclaimer = "";
let selected_spq_popover_index = -1;  
class SpqDetailsRelated extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      survey_data: [],
      survey_question: [],
      survey_related: [],
      is_loader: true,
      banner_display: false,
      survey_id: this.props.match.params.id,
      banner_display: false,
      refresh:false
    };

    this.getSurveyDetails(this.state.survey_id);
    this.getRelatedSurvey(this.state.survey_id);

    this.display_banner = this.display_banner.bind(this);

    
    selected_spq_popover_index = -1;
  }

  handle_change_spq(index, value, type) {
    // if (type == 'popover') {
      selected_spq_popover_index = index;
      this.setState({ "refresh": !this.state.refresh }); 
    // }
  }

  display_banner(datam) {
    this.setState({ banner_display: true });
  }
  componentWillUnmount() {
    $("html, body").css({
      overflow: "auto",
      height: "auto",
    });
  }

  componentDidMount() {
    window.document.title = "CLIRNET - SPQ Detail";
    gtag("config", AppConfig.gtag_measure_id, {
      page_title: window.document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
    $(".survey_mobile").addClass("active");

    $(".survey_mobile").addClass("active");
    $(".li_survey").attr("id", "survey_cal");
    $(".surveyCollaps").click(function () {
      $(this).toggleClass("surveyCollapsActive");
      $(".surveyLeftBoxArea").slideToggle();
    });

    $(window).bind("load resize", function () {
      if ($(window).innerWidth() <= 991) {
        $(window).scroll(function () {
          var scroll = $(window).scrollTop();
          if (scroll >= 100) {
            $(".surveyCollaps").removeClass("surveyCollapsActive");
            $(".surveyLeftBoxArea").slideUp();
          }
        });
      }
    });

    selected_spq_popover_index = -1;

    let that = this;
		$(document).on("click", function (e) {  
			let arc_extra = $(e.target).parents('.spq_extra_class').length;
			if (arc_extra == 0 && !$(e.target).hasClass('spq_extra_class')) {
				selected_spq_popover_index = -1;
				that.setState({ "refresh": !that.state.refresh }); 
			}
		});

  }

  getSurveyDetails = (id) => {
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
    console.log("In survey Details");
    fetch(url + "survey/detail?id=" + id + extrautm, {
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
        let clientName, isVerify;
        responseData.map((r, index) => {
          clientName = r.client_name;
          isVerify = r.verified;
          surveyCategory = r.category;
          disclaimer = r.disclaimer;
        });
        if (responseData.length > 0) {
          this.setState({ is_loader: false });
        }
        if (surveyCategory == "poll") {
          this.props.history.push({
            pathname: `/PollDetails/` + this.state.survey_id + "",
          });
        } else {
          this.setState({ survey_data: responseData });
        }
      })
      .catch((error) => {
        console.log("Error" + error);
      });
  };

  getRelatedSurvey = (id) => {
    console.log("In survey Details" + id);
    fetch(url + "survey/related?survey_id=" + id, {
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
        let new_related = [];
        responseData.map((r, index) => {
          // console.log('in if new'+r.category)
          if (r.category != "poll") {
            new_related.push(r);
          }
        });
        this.setState({ survey_related: new_related });
      })
      .catch((error) => {
        console.log("Error" + error);
      });
  };

  relatedClick = (id) => {
    this.props.history.push({
      pathname: "/SpqDetailsRelated/" + id + "",
    });
  };

  makeFirstLaterCapital(txt) {
    let modText = txt[0].toUpperCase() + txt.slice(1);
    return modText;
  }

  beginSurvey() {
    let id = this.props.match.params.id;
    if (surveyCategory == "poll") {
      this.props.history.push({
        pathname: `/PollDetails/` + id + "",
      });
    } else {
      this.props.history.push({
        pathname: `/SpqQuestion/` + id + "",
      });
    }
  }

  setClientLogo(sponsorLogo) {
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
    if (!sponsorLogo) {
      return false;
    } else {
      return sponsorLogo.split(",").length == 1 ? (
        <div className="full_width text-center srvQus_QusPowerBy">
          <span>Powered by</span>
          <img
            className="spqDtlSponsorImg"
            src={sponsorLogo.split(",")[0]}
            width="224"
            height="63"
            alt="logo"
          />
        </div>
      ) : (
        <Slider {...dskSessionClient}>
          {sponsorLogo.split(",").map((val, ind) => (
            <div className="full_width text-center srvQus_QusPowerBy">
              <span>Powered by</span>
              <img className="spqDtlSponsorImg" src={val} alt="sponsor" />
            </div>
          ))}
        </Slider>
      );
    }
  }

  display_banner(datam) {
    this.setState({ banner_display: true });

    //alert(datam)
  }

  render() {
    return (
      <div
        className={
          isMobile == true
            ? "full_width wrap_body mblScreen"
            : "full_width wrap_body dskScreen"
        }
      >
        <Header history={this.props.history} page_name={pageNames} />
        <section className="full_width body_area">
          {/* <Loader
            className="loader_cmn"
            type="ThreeDots"
            color="#355ed3"
            height={80}
            width={80}
            visible={this.state.is_loader}
          /> */}
          {/* {this.state.survey_data.map((r, index) => ( */}
          <div className="container">
            <div className="row">
              <Banner
                type_id={this.state.survey_id}
                type={"survey"}
                apiresponserecieved={this.display_banner.bind(this)}
                api_call_detail={1}
                api_call={0}
              />
              {this.state.banner_display ? (
                <Banner
                  type_id={this.state.survey_id}
                  banner_position={1}
                  unmount_call={1}
                  type={"survey"}
                  api_call={1}
                  before_unload_call={1}
                />
              ) : null}
              {/* <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={80} width={80} visible={this.state.is_loader} /> */}
              <section className="text-left full_width survey_p survey_details">
                {this.state.survey_data && this.state.survey_data.length > 0 ? (
                  <div className="surveyRight">
                    <div className="col-xs-12 masonryBoxFeed">
                      <div className="full_width radius-6 feedRow">
                        <div className="col justify-content-between feedRowTop">
                          <div className="row">
                            <div className="col">
                              {/* <span class="font_14px radius-6 font600 colorBlue feedRow_speciality"><marquee>{r.specialities}</marquee></span> */}
                              <span class="font_12px colorBlack font600 feedRow_date ssnDtl_dateDesk">
                                <Moment format="MMMM Do YYYY">
                                  {this.state.survey_data[0].publishing_date}
                                </Moment>
                              </span>
                              <div className="clearfix"></div>
                              <span class="font_12px colorBlack font600 srvTagTop">
                                {this.makeFirstLaterCapital(
                                  this.state.survey_data[0].category
                                )}
                              </span>
                            </div>
                            <div className="col-auto">
                              {/* <a href="javascript:void(0);" className="feedRow_sponsors">
                               <span className="font_10px font500 colorBlack">Powered by</span>
                                <img src={r.client_logo} width="224" height="63" alt="logo" title="clirnet" />
                              </a> */}
                              <ShareDetailPage 
                                data={{
                                  title: this.state.survey_data[0].survey_title,
                                  text: this.state.survey_data[0].survey_description,
                                  url: this.state.survey_data[0].deeplink,
                                }}
                              />
                              {/* {this.setClientLogo(r.client_logo,r.sponsor_logo)} */}
                            </div>
                          </div>
                        </div>
                        <div class="full_width feedRow_IMg">
                          <img
                            className="object_fit_cover"
                            src={this.state.survey_data[0].image}
                          />
                          <div className="overlay"></div>
                        </div>
                        {/* <span class="font_14px font600 feedRow_date ssnDtl_dateRes">{r.date}</span> */}
                        <div className="full_width feedRow_ttl">
                          <div className="full_width">
                            <span class="font_10px radius-6 font600 colorBlue feedRow_speciality">
                              {!this.state.survey_data[0].specialities_name
                                ? null
                                : this.state.survey_data[0].specialities_name.replace(
                                    /,/g,
                                    ", "
                                  )}
                            </span>
                          </div>
                          <a
                            href="javascript:void(0)"
                            class="font_16px colorBlack font700"
                          >
                            {this.state.survey_data[0].survey_title}
                          </a>
                        </div>

                        <div className="clearfix"></div>
                        <div class="full_width font_14px feedRow_ans">
                          <p>
                            {ReactHtmlParser(
                              this.state.survey_data[0].survey_description
                            )}
                          </p>
                        </div>
                        {/* ///////////////inlineshare////// */}
                        <div className="full_width survey_detailsBtm">
                          <div className="col-lg-8 offset-lg-2 col-12 radius-6 survey_detailsBtmIn">
                            <div className="row align-items-center text-center">
                              <div className="col survey_detailsBtmBox">
                                <h3 className="font_14px font600 colorBlack survey_detailsBtmBoxTtl">
                                  <span className="font_24px font700">
                                    {this.state.survey_data[0].question_count}
                                  </span>
                                  Questions
                                </h3>
                              </div>
                              <div className="col survey_detailsBtmBox">
                                <h3 className="font_14px font600 colorBlack survey_detailsBtmBoxTtl">
                                  <span className="font_24px font700">
                                    {this.state.survey_data[0].survey_time}
                                    <small className="font_14px font600">
                                      {" "}
                                      Mins
                                    </small>
                                  </span>
                                  Duration
                                </h3>
                              </div>
                              <div className="col survey_detailsBtmBox">
                                <h3 className="font_14px font600 colorBlack survey_detailsBtmBoxTtl">
                                  <span className="font_24px font700">
                                    {this.state.survey_data[0].survey_points}
                                  </span>{" "}
                                  Points
                                </h3>
                              </div>
                            </div>
                          </div>
                          <div className="full_width text-center">
                            <a
                              href="javascript:void(0)"
                              onClick={() => {
                                this.beginSurvey();
                              }}
                              className="cmnBtn btnBlue radius-6 font_16px  font600 survey_detailsBtmBtn"
                            >
                              Begin <img src={begainArrow} />
                            </a>
                          </div>
                          <div className="full_width text-center">
                            {this.setClientLogo(
                              this.state.survey_data[0].sponsor_logo
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Disclaimer val={disclaimer}></Disclaimer>
                  </div>
                ) : this.state.is_loader ? (
                  <SpqDetailsLoader />
                ) : null}
                <div className="surveyLeft">
                  {this.state.banner_display ? (
                    <Banner
                      type_id={this.state.survey_id}
                      banner_position={3}
                      unmount_call={0}
                      type={"survey"}
                      api_call={1}
                      before_unload_call={0}
                    />
                  ) : null}
                  {this.state.survey_related.length > 0 ? (
                    <div class="full_width radius-6 text-left specialty_comp_right">
                      <h2 class="bgColorBlue font600 colorWhite font600 font_20px specialtyTtl">
                        Related
                      </h2>
                      <div class="clearfix"></div>
                      {this.state.survey_related.length > 0 ? (
                        <div class="full_width font600 specialty_comp_right_text">
                          {this.state.survey_related.slice(0, 5).map((r,ind) => (
                            <SpqSmallCard history={this.props.history} mobile_device={isMobile} onChangeButton={this.handle_change_spq.bind(this)} card_data={r} clicked_index={selected_spq_popover_index} elem_key={ind} custom_class="dskTrendingMedwikiCard feeddetail_related" />
                          ))}
                        </div>
                      ) : null}
                      <div class="clearfix"></div>
                    </div>
                  ) : null}

                  {this.state.banner_display ? (
                    <Banner
                      type_id={this.state.survey_id}
                      banner_position={4}
                      unmount_call={0}
                      type={"survey"}
                      api_call={1}
                      before_unload_call={0}
                    />
                  ) : null}
                </div>
              </section>
            </div>
            {/* /////////////////////////////Disclaimer//////////////////////////////// */}
            {/* <Disclaimer val={disclaimer}></Disclaimer>   */}
            {/* //////////////////////////////////////////////////////////////////////// */}
          </div>
          {/* ))} */}
        </section>
        <Footer history={this.props.history} />
        <div></div>
      </div>
    );
  }
}
export default SpqDetailsRelated;