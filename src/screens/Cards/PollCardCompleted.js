import React from "react";
import Slider from "react-slick";
import { isMobile } from "react-device-detect";
import Popover from "react-bootstrap/Popover";
import $ from "jquery";
import AppConfig from "../config/config.js";
import { reactLocalStorage } from "reactjs-localstorage";
import ProgressBar from "react-bootstrap/ProgressBar";
import Share from "../Common/Share.jsx";

const url = AppConfig.apiLoc;
const dskSessionClient = {
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

let def_index = undefined;
class PollCardCompleted extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      checkedRadio: null,
    };
  }

  pollCardMenuPopoverDesktop = (val, ind) => {
    return (
      <div className="dskDotsMenu dskPollsCardDots">
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

  pollCardMenuPopoverMobile = (val, ind) => {
    // console.log('poll mobile popover called'+this.props.deafult_popover_index)
    return (
      <div className="mblDotsMenu mblDotsMenuMedWikiCard mblPollsCardDots">
        <div>
          <span className="mblDotsMenu-dots"></span>
          <span className="mblDotsMenu-dots"></span>
          <span className="mblDotsMenu-dots"></span>
        </div>
        <Popover
          id="popover-basic"
          placement="bottom-end"
          className="mblDotsMenuSettings popoverExtra"
        >
          <Popover.Content>
            <Share
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

  refresh = () => {
    this.setState({ display: !this.state.display });
  };

  pointTextValidation(point) {
    if (point <= 1) {
      return " Point";
    } else {
      return " Points";
    }
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

  renderDesktopCard(props) {
    let ind = props.array_index;
    let val = props.data;
    let dataJson = props.data.json_result;
    let point = props.data.point;
    let mData = JSON.parse(unescape(dataJson));
    let sData = mData;
    let arr_new = Object.keys(sData).map(function (k) {
      return sData[k];
    });
    let question = arr_new[0].question;
    let selectedIndexPoll = arr_new[0].selectedIndex;
    let currentOptions = arr_new[0].options;
    return (
      <div className="col-sm-6 mblPllsSrvsCard dskPollsCard dskMasonryCard">
        <div
          href="javascript:void(0)"
          className="full_width radius-6 mblPllsSrvs_link"
        >
          <div className="full_width dskPollsTop">
            <div className="mblPllsSrvsTag">
              <span className="font500 colorWhite font_14px">Poll</span>
            </div>
            <div className="dskPollsTopRight">
              {point == "" || point == null ? null : (
                <h5 className="font400 text-center colorBlack font_14px text-uppercase mblPllsSrvsPoints">
                  <span className="font_24px font700">{point}</span> Points
                </h5>
              )}
              {this.props.deafult_popover_index == ind
                ? this.pollCardMenuPopoverDesktop(props.data, ind)
                : null}
              {this.props.deafult_popover_index != ind ? (
                <div
                  onClick={this.props.menu_click}
                  className="dskDotsMenu dskPollsCardDots popoverExtra"
                >
                  <span className="dskDotsMenu-dots"></span>
                  <span className="dskDotsMenu-dots"></span>
                  <span className="dskDotsMenu-dots"></span>
                </div>
              ) : null}
            </div>
          </div>
          <div className="full_width mblPllsSrvsContent">
            <h3 className="font500 colorBlack font_16px mblPllsSrvsContentTtl">
              {question}{" "}
            </h3>
            <div className="clearfix"></div>
            <div className="full_width srvPollsOptionSet55">
              {currentOptions.map((options, i) => {
                let inputboxid = "option3-" + i;
                return i == selectedIndexPoll ? (
                  <div className="srvPollsProgressBar">
                    <div className="srvPollsProgressBarIn font_12px colorBlue font600">
                      {options.label}
                      <span className="srvPollsProgressBarValue">
                        {options.vote} %
                      </span>
                    </div>
                    <ProgressBar now={options.vote} />
                  </div>
                ) : (
                  <div className="srvPollsProgressBar">
                    <div className="srvPollsProgressBarIn font_12px colorBlack font600">
                      {options.label}
                      <span className="srvPollsProgressBarValue">
                        {options.vote} %
                      </span>
                    </div>
                    <ProgressBar now={options.vote} />
                  </div>
                );
              })}
              <div className="clearfix"></div>
              {val.sponsor_logo ? (
                <div className="full_width mblSessionbtm">
                  <span className="colorBlack font_12px font500">
                    Powered by
                  </span>
                  <Slider {...dskSessionClient} className="dskSessionClient">
                    {val.sponsor_logo.split(",").map((logo, ind) => (
                      <div className="dskSessionClientItem">
                        <img src={logo} />
                      </div>
                    ))}
                  </Slider>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // render mobile
  renderMobileCard(props) {
    let val = props.data;
    let ind = props.array_index;
    let survey_id = props.data.survey_id;
    let dataJson = props.data.json_result;
    let point = props.data.point;
    let mData = JSON.parse(unescape(dataJson));
    let sData = mData;
    let arr_new = Object.keys(sData).map(function (k) {
      return sData[k];
    });
    let selectedIndexPoll = arr_new[0].selectedIndex;
    let question = arr_new[0].question;
    let currentOptions = arr_new[0].options;

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
              {point == "" || point == null ? null : (
                <h5 className="font400 text-center colorBlack font_14px text-uppercase mblPllsSrvsPoints">
                  <span className="font_24px font700">{point}</span> Points
                </h5>
              )}
              {this.props.deafult_popover_index == ind
                ? this.pollCardMenuPopoverMobile(props.data, ind)
                : null}
              {this.props.deafult_popover_index != ind ? (
                <div
                  onClick={this.props.menu_click}
                  className="mblDotsMenu mblDotsMenuMedWikiCard mblPollsCardDots popoverExtra"
                >
                  <span className="mblDotsMenu-dots"></span>
                  <span className="mblDotsMenu-dots"></span>
                  <span className="mblDotsMenu-dots"></span>
                </div>
              ) : null}
            </div>
          </div>
          <div className="full_width mblPllsSrvsContent">
            <h3 className="font500 colorBlack font_16px mblPllsSrvsContentTtl">
              {question}{" "}
            </h3>
            <div className="clearfix"></div>
            <div className="full_width srvPollsOptionSet55">
              {currentOptions.map((options, i) => {
                let inputboxid = "option3-" + i;
                return i == selectedIndexPoll ? (
                  <div className="srvPollsProgressBar">
                    <div className="srvPollsProgressBarIn font_12px colorBlue font600">
                      {options.label}
                      <span className="srvPollsProgressBarValue">
                        {options.vote} %
                      </span>
                    </div>
                    <ProgressBar now={options.vote} />
                  </div>
                ) : (
                  <div className="srvPollsProgressBar">
                    <div className="srvPollsProgressBarIn font_12px colorBlack font600">
                      {options.label}
                      <span className="srvPollsProgressBarValue">
                        {options.vote} %
                      </span>
                    </div>
                    <ProgressBar now={options.vote} />
                  </div>
                );
              })}
              <div className="clearfix"></div>
              {val.sponsor_logo ? (
                <div className="full_width mblSessionbtm">
                  <span className="colorBlack font_12px font500">
                    Powered by
                  </span>
                  <Slider {...mblPllsSrvsClient} className="mblSessionClient">
                    {val.sponsor_logo.split(",").map((val, ind) => (
                      <div className="mblSessionClientItem">
                        <img src={val} />
                      </div>
                    ))}
                  </Slider>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <>
        {isMobile
          ? this.renderMobileCard(this.props)
          : this.renderDesktopCard(this.props)}
      </>
    );
  }
}
export default PollCardCompleted;
