import React from "react";
import Slider from "react-slick";
import begainArrow from "../../mobImages/begainArrow.png";
import AppConfig from "../config/config.js";
import { reactLocalStorage } from "reactjs-localstorage";
import $ from "jquery";
import { isInViewport, specialityPopOver } from "../Common/Common.js";
import { setSpeciality, setDescription } from "../Common/Common.js";
import Popover from "react-bootstrap/Popover";
import Share from "../Common/Share.jsx";
import TrandingQuizzesLoader from "../LoadingPlaceholders/TrandingQuizzesLoader";

const url = AppConfig.apiLoc;
var survey_list_data = [];
var survey_api_call_permission = true;
var fetch_counter = 0;
var deafult_popover_index = -1;
let  isApiCallDone = false;
class TrendingSurvey extends React.Component {
  constructor(props) {
    super(props);
    survey_list_data = [];
    this.state = {
      display: false,
    };
    isApiCallDone = false;
  }

  redirectToSpqDetail = (id) => {
    this.props.history.push({
      pathname: "/SpqDetails/" + id + "",
    });
  };

  refresh = () => {
    this.setState({ display: !this.state.display });
  };

  componentDidMount() {
    let temp = this;
    this.getSurveyData(0);

    $(document).on("click", function (e) {
      //popover dissapear func
      let ggg = $(e.target).parents(".popoverExtra").length;
      if (ggg == 0 && !$(e.target).hasClass("popoverExtra")) {
        deafult_popover_index = -1;
        temp.refresh();
      }
    });
  }

  surveyFetchValidate(currentSlide) {
    const surveySection = document.querySelector("#surveySlider");
    let comp_list_length = survey_list_data.length;
    let fetch_from = comp_list_length;
    let currentState = comp_list_length - 3 - currentSlide;
    //console.log('ready to fetch'+currentState)
    // //console.log("data::"+comp_list_length+'\n'+isInViewport(medwikiSection)+'\n'+currentState+'\n')
    if (
      isInViewport(surveySection) === true &&
      survey_api_call_permission === true &&
      fetch_counter !== 0 &&
      fetch_from !== undefined &&
      currentState == 0
    ) {
      //console.log('ready to fetch from'+fetch_from)
      this.getSurveyData(fetch_from);
    }
    if (
      fetch_counter == 0 ||
      (fetch_counter == "0" && survey_api_call_permission == true)
    ) {
      //console.log('ready to fetch from 0')
      this.getSurveyData(0);
    } else {
      //console.log('unable to fetch comp')
    }
  }

  getSurveyData(fetch_from) {
    survey_api_call_permission = false;
    fetch(url + "dashboard/trending?from=" + fetch_from + "&to=10&type=spq", {
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
        isApiCallDone = true;
        if (status_code == 200) {
          survey_api_call_permission = true;
          let responseData = responseJson.data;
          if (fetch_counter == 0 || fetch_counter == "0") {
            fetch_counter++;
          }
          // survey_list_data = responseData
          responseData.map((r, index) => {
            survey_list_data.push(r);
          });
          this.refresh();
        }
      })
      .catch((error) => {
        isApiCallDone = true;
        survey_api_call_permission = true;
        this.refresh();
        //console.log("Error"+error);
      });
  }

  pointTextValidation(point) {
    if (point <= 1) {
      return " Point";
    } else {
      return " Points";
    }
  }

  onMenuClick(ind) {
    deafult_popover_index = ind;
    this.refresh();
  }
  surveyCardMenuPopover = (val, ind) => {
    return (
      <div
        className="dskDotsMenu dskDotsCircle mblDotsMenuPllsQzsCard"
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
            <Share
              customClass="dskCphTtlExtra"
              data={{
                title: val.survey_title,
                text: val.survey_description,
                url: val.deeplink,
              }}
            />
          </Popover.Content>
        </Popover>
      </div>
    );
  };

  render() {
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

    var trandingSurveySlider = {
      dots: true,
      infinite: true,
      speed: 600,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      afterChange: () => {
        if (deafult_popover_index != -1) {
          deafult_popover_index = -1;
          this.refresh();
        }
      },
    };

    return survey_list_data && survey_list_data.length > 0 ? (
      <div className="col-sm-6 dskTrandingSurvey">
        {survey_list_data != null && survey_list_data.length > 0 ? (
          <h3 className="font_18px fontExo colorBlack font600 text-uppercase">
            Trending Quizzes
          </h3>
        ) : null}
        <div className="clearfix"></div>
        <Slider
          {...trandingSurveySlider}
          className="full_width dskTrandingSurveySlider"
        >
          {survey_list_data != null && survey_list_data.length > 0
            ? survey_list_data.map((val, ind) => (
                <div className="mblPllsSrvsCard">
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
                      {deafult_popover_index == ind
                        ? this.surveyCardMenuPopover(val, ind)
                        : null}
                      {deafult_popover_index != ind ? (
                        <div
                          onClick={() => {
                            this.onMenuClick(ind);
                          }}
                          className="dskDotsMenu dskDotsCircle mblDotsMenuPllsQzsCard popoverExtra"
                        >
                          <span className="dskDotsMenu-dots"></span>
                          <span className="dskDotsMenu-dots"></span>
                          <span className="dskDotsMenu-dots"></span>
                        </div>
                      ) : null}
                      {/* {this.surveyCardMenuPopover(val)} */}
                    </div>
                    <div className="full_width mblPllsSrvsContent">
                      <div className="full_width radius-6 mblPllsSrvsDrwBox">
                        {val.specialities_name == null ? null : (
                          <div className="colorBlack font_12px font400 radius-6 mblMedWikiSpeacality">
                            {setSpeciality(val.specialities_name)}
                            {specialityPopOver(val.specialities_name)}
                          </div>
                        )}
                        <h5 className="font400 text-center colorBlack font_14px text-uppercase mblPllsSrvsPoints">
                          <span className="font_24px font700">{val.point}</span>{" "}
                          Points
                        </h5>
                      </div>
                      <div className="clearfix"></div>
                      {val.survey_title == "" ||
                      val.survey_title == null ? null : (
                        <h3
                          className="font400 colorBlack font_16px mblPllsSrvsContentTtl"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            this.redirectToSpqDetail(val.survey_id);
                          }}
                        >
                          {val.survey_title}
                        </h3>
                      )}
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
                        <Slider
                          {...dskSessionClient}
                          className="dskSessionClient"
                        >
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
              ))
            : null}
        </Slider>
      </div>
    ) : isApiCallDone?null:(  <TrandingQuizzesLoader />
      // <div className="col-sm-6 dskTrandingSurvey">
      //   <h3 className="font_18px fontExo colorBlack font600 text-uppercase">
      //     Trending Quizzes
      //   </h3>
      //   <div className="full_width dskTrandingSurveySlider">
      //     <div className="mblPllsSrvsCard">
      //       <TrandingQuizzesLoader />
      //     </div>
      //   </div>
      // </div>
    );
  }
}
export default TrendingSurvey;
