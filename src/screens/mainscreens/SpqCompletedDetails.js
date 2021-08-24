import React from "react";
import $ from "jquery";
import Slider from "react-slick";
import { reactLocalStorage } from "reactjs-localstorage";
import AppConfig from "../config/config.js";
import Header from "./Header";
import Footer from "./Footer";
import Moment from "react-moment";
import { isMobile } from "react-device-detect";
import Banner from "../mainscreens/Banner";
import ReactHtmlParser from "react-html-parser";

import ShareDetailPage from "../Common/ShareDetailPage.jsx";
import SpqDetailsLoader from "../LoadingPlaceholders/SpqDetailsLoader";

import SpqSmallCard from '../Cards/SpqSmallCard.js';

const gtag = window.gtag;

const pageNames = "Polls & Quizzes";
const url = AppConfig.apiLoc;
let surveyCategory = undefined;
let msg = "";
let selected_spq_popover_index = -1; 
class SpqCompletedDetails extends React.Component {
  constructor(props) {
    super(props);
    this.uri_data = this.props.match.params.id;
    this.state = {
      survey_data: [],
      survey_question: [],
      survey_related: [],
      is_loader: true,
      survey_id: this.props.match.params.id,
      quizTotQus: "",
      quizTotcorrectAns: "",
      quizTotwrongAns: "",
      quizToPoints: "",
      banner_display: false,
      refresh:false
    };

    selected_spq_popover_index = -1;
    this.getDetails(this.uri_data);
    this.getRelatedSurvey(this.uri_data);

    this.display_banner = this.display_banner.bind(this);
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

  componentDidMount() {
    window.document.title = "CLIRNET - Completed SPQ Detail";
    gtag("config", AppConfig.gtag_measure_id, {
      page_title: window.document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
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

  getDetails = (id) => {
    console.log("pending identified");
    fetch(url + "survey/detail?id=" + id, {
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
        let userSurveyStatus;
        responseData.map((r) => {
          surveyCategory = r.category;
          userSurveyStatus = r.user_survey_status;
        });
        if (surveyCategory == "poll") {
          this.redirect_to_poll_detail();
        } else {
          this.checkSurveyUserStatus(userSurveyStatus, responseData);
        }
      })
      .catch((error) => {
        console.log("Error" + error);
      });
  };

  checkSurveyUserStatus(status, responseData) {
    switch (status) {
      case "completed":
        this.getSurveyDetails(this.uri_data);
        break;
      case "incomplete":
        this.redirect_to_incomplete();
        break;
      case "pending":
        this.redirect_to_pending();
        break;
    }
  }

  getSurveyDetails = (id) => {
    //  console.log("In survey Details"+id);
    fetch(url + "survey/detailCompleted?id=" + id, {
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
        //  console.log("Fetch data"+JSON.stringify(responseJson));
        let responseData = responseJson.data;
        let lengths, question_counts, points;
        let finalReportJson;
        responseData.map((r, index) => {
          let dataJson = r.data_json;
          finalReportJson = r.final_report_json;
          surveyCategory = r.category;
          lengths = r.survey_time;
          question_counts = r.question_count;
          points = r.survey_points;
          // console.log('dataJson'+JSON.stringify(finalReportJson).totalPoint)
        });
        if (surveyCategory == "quiz") {
          let mData = JSON.parse(unescape(finalReportJson));
          // console.log("wrong answer"+mData.totwrongAns);
          this.setState({ quizTotQus: mData.totQus });
          this.setState({ quizTotcorrectAns: mData.totcorrectAns });
          this.setState({ quizTotwrongAns: mData.totwrongAns });
          this.setState({ quizToPoints: mData.totalPoint });
        } else if (surveyCategory == "survey") {
          msg = "Completed";
        }
        if (responseData.length > 0) {
          this.setState({ is_loader: false });
        }
        this.setState({ survey_data: responseData });
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
      pathname: "/SpqDetails/" + id + "",
    });
  };

  makeFirstLaterCapital(txt) {
    let modText = txt[0].toUpperCase() + txt.slice(1);
    return modText;
  }

  redirect_to_pending = () => {
    let ids = this.uri_data;
    this.props.history.push({
      pathname: "/SpqDetailsPending/" + ids + "",
    });
  };

  redirect_to_incomplete = () => {
    let ids = this.uri_data;
    this.props.history.push({
      pathname: "/SpqDetails/" + ids + "",
    });
  };

  redirect_to_poll_detail = () => {
    let ids = this.uri_data;
    this.props.history.push({
      pathname: "/PollDetails/" + ids + "",
    });
  };

  redirect_for_survey_review = () => {
    let ids = this.uri_data;
    console.log("redirect for survey review" + ids);
    this.props.history.push({
      pathname: "/SpqCompletedQuestionReview/" + ids + "",
    });
  };

  redirect_for_quiz_review = () => {
    let ids = this.uri_data;
    this.props.history.push({
      pathname: "/SpqQuestionReview/" + ids + "",
    });
  };

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
          {/* <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={80} width={80} visible={this.state.is_loader} /> */}
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
              <section className="text-left full_width survey_p survey_details">
              {this.state.survey_data && this.state.survey_data.length > 0 ? (
                <div className="surveyRight">
                  <div className="col-xs-12 masonryBoxFeed">
                    <div className="full_width radius-6 feedRow">
                      <div className="col justify-content-between feedRowTop">
                        <div className="row">
                          <div className="col">
                            <span class="font_12px colorBlack font600 feedRow_date ssnDtl_dateDesk">
                              <Moment format="MMMM Do YYYY">
                                {this.state.survey_data[0].publishing_date}
                              </Moment>
                            </span>
                            <div className="clearfix"></div>
                            <span class="font_12px colorBlack font600 srvTagTop">
                              {this.makeFirstLaterCapital(this.state.survey_data[0].category)}
                            </span>
                          </div>
                          <div className="col-auto">
                            <ShareDetailPage
                              data={{
                                title: this.state.survey_data[0].survey_title,
                                text: this.state.survey_data[0]
                                  .survey_description,
                                url: this.state.survey_data[0].deeplink,
                              }}
                            />
                            {/* {this.setClientLogo(r.client_logo,r.sponsor_logo)} */}
                          </div>
                        </div>
                      </div>
                      <div class="full_width feedRow_IMg">
                        <img className="object_fit_cover" src={this.state.survey_data[0].image} />
                        <div className="overlay"></div>
                      </div>
                      <div className="full_width feedRow_ttl">
                        <div className="full_width">
                          <span class="font_10px radius-6 font600 colorBlue feedRow_speciality">
                            {!this.state.survey_data[0].specialities_name
                              ? null
                              : this.state.survey_data[0].specialities_name.replace(/,/g, ", ")}
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
                        <p>{ReactHtmlParser(this.state.survey_data[0].survey_description)}</p>
                      </div>
                      {surveyCategory == "survey" ? (
                        <div className="full_width survey_detailsBtm">
                          <div className="col-lg-8 offset-lg-2 col-12 radius-6 survey_detailsBtmIn">
                            <div className="row align-items-center text-center">
                              <div className="col survey_detailsBtmBox">
                                <h3 className="font_14px font600 colorBlack survey_detailsBtmBoxTtl">
                                  <span className="font_24px font700">
                                    {!this.state.survey_data[0].question_count
                                      ? 0
                                      : this.state.survey_data[0].question_count}
                                  </span>
                                  Questions
                                </h3>
                              </div>
                              <div className="col survey_detailsBtmBox">
                                <h3 className="font_14px font600 colorBlack survey_detailsBtmBoxTtl">
                                  <span className="font_24px font700">
                                    {!this.state.survey_data[0].survey_time 
                                      ? 0
                                      : this.state.survey_data[0].survey_time}
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
                                    {!this.state.survey_data[0].survey_points
                                      ? 0
                                      : this.state.survey_data[0].survey_points}
                                  </span>{" "}
                                  Points
                                </h3>
                              </div>
                            </div>
                          </div>
                          <div className="full_width mt-2 text-center">
                            {/* <h2 className="greenBlue font_16px  font600 survey_detailsBtmBtn">{msg}</h2>  */}
                            <a
                              className="cmnBtn btnBlue radius-6 font_14px font600 text-uppercase srvSbmtStstcBox_a"
                              onClick={this.redirect_for_survey_review.bind(
                                this
                              )}
                              href="javascript:void(0)"
                            >
                              View Result
                            </a>
                          </div>
                        </div>
                      ) : null}
                      {surveyCategory == "quiz" ? (
                        <div className="full_width survey_detailsBtm">
                          <div className="col-lg-8 offset-lg-2 col-12 radius-6 survey_detailsBtmIn">
                            <div className="row align-items-center text-center">
                              <div className="col survey_detailsBtmBox">
                                <h3 className="font_14px font600 colorBlack survey_detailsBtmBoxTtl">
                                  <span className="font_22px">
                                    {this.state.quizTotQus == true ||
                                    this.state.quizTotQus == undefined ||
                                    this.state.quizTotQus == null ||
                                    this.state.quizTotQus == ""
                                      ? 0
                                      : this.state.quizTotQus}
                                  </span>
                                  Question
                                </h3>
                              </div>
                              <div className="col survey_detailsBtmBox">
                                <h3 className="font_14px font600 colorBlack survey_detailsBtmBoxTtl">
                                  <span className="font_22px">
                                    {this.state.quizTotcorrectAns ==
                                      undefined ||
                                    this.state.quizTotcorrectAns == "null" ||
                                    this.state.quizTotcorrectAns == null ||
                                    this.state.quizTotcorrectAns == ""
                                      ? 0
                                      : this.state.quizTotcorrectAns}
                                  </span>
                                  Correct
                                </h3>
                              </div>
                              <div className="col survey_detailsBtmBox">
                                <h3 className="font_14px font600 colorBlack survey_detailsBtmBoxTtl">
                                  <span className="font_22px">
                                    {this.state.quizTotwrongAns == "null" ||
                                    this.state.quizTotwrongAns == null ||
                                    this.state.quizTotwrongAns == ""
                                      ? 0
                                      : this.state.quizTotwrongAns}
                                  </span>
                                  Incorrect
                                </h3>
                              </div>
                              <div className="col survey_detailsBtmBox">
                                <h3 className="font_14px font600 colorBlack survey_detailsBtmBoxTtl">
                                  <span className="font_22px">
                                    {this.state.quizToPoints == undefined ||
                                    this.state.quizToPoints == null ||
                                    this.state.quizToPoints == ""
                                      ? 0
                                      : this.state.quizToPoints}
                                  </span>
                                  Points
                                </h3>
                              </div>
                            </div>
                          </div>
                          <div className="full_width mt-2 text-center">
                            <a
                              className="cmnBtn btnBlue radius-6 font_14px font600 text-uppercase srvSbmtStstcBox_a"
                              onClick={this.redirect_for_quiz_review.bind(this)}
                              href="javascript:void(0)"
                            >
                              View Result
                            </a>
                          </div>
                        </div>
                      ) : null}
                       <div className="full_width text-center">
                            {this.setClientLogo(
                              this.state.survey_data[0].sponsor_logo
                            )}
                          </div>
                    </div>
                  </div>
                </div> ) : this.state.is_loader ? (
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
                {this.state.survey_related.slice(0,5).map((r,ind) => 
                          <SpqSmallCard history={this.props.history} mobile_device={isMobile} onChangeButton={this.handle_change_spq.bind(this)} card_data={r} clicked_index={selected_spq_popover_index} elem_key={ind} custom_class="dskTrendingMedwikiCard feeddetail_related" />
                          )}  
                        </div>
                      ) : null}
                      <div class="clearfix"></div>
                    </div>
                  ) : null}
                </div>
              </section>
            </div>
          </div>
          {/* ))} */}
        </section>
        <Footer history={this.props.history} />
        <div></div>
      </div>
    );
  }
}
export default SpqCompletedDetails;
