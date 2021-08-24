import React from "react";
import Slider from "react-slick";
import begainArrow from "../../desktopImages/begainArrow.png";
import {
  setSpeciality,
  setDescription,
  specialityPopOver,
} from "../Common/Common.js";
import { isMobile } from "react-device-detect";
import { InlineShareButtons } from "sharethis-reactjs";
import Popover from "react-bootstrap/Popover";
import $ from "jquery";
import Form from "react-bootstrap/Form";
import AppConfig from "../config/config.js";
import { reactLocalStorage } from "reactjs-localstorage";
import { ToastsContainer, ToastsStore } from "react-toasts";
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
class PollCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      checkedRadio: null,
    };
  }

  // componentDidMount(){
  //     let temp = this;
  //     $('body').click(function() {
  //       if(def_index != -1){
  //        def_index = -1;
  //         temp.refresh();
  //       }
  //     });
  // }

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
                description: val.survey_description.substring(0, 100) + "...",       // (defaults to og:description or twitter:description)
                title: val.survey_title,            // (defaults to og:title or twitter:title)
                message: '',     // (only for email sharing)
                subject: '',  // (only for email sharing)
                username: 'Medwiki view' // (only for twitter sharing)
              }} /> */}
            {/* <a href="javascript:void(0)" className="dskDotsMenuNotRelevant">
                    Not Relevant for me
                </a> */}
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
                description: val.survey_description.substring(0, 100) + "...",       // (defaults to og:description or twitter:description)
                title: val.survey_title,            // (defaults to og:title or twitter:title)
                message: '',     // (only for email sharing)
                subject: '',  // (only for email sharing)
                username: 'Medwiki view' // (only for twitter sharing)
              }} /> */}
            {/* <a href="javascript:void(0)" className="dskDotsMenuNotRelevant">
                    Not Relevant for me
                </a> */}

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
    let survey_id = props.data.survey_id;
    let dataJson = props.data.json_data;
    let point = props.data.point;
    let mData = JSON.parse(unescape(dataJson));
    let sData = mData.surveys;
    let arr_new = Object.keys(sData).map(function (k) {
      return sData[k];
    });
    let question = arr_new[0].question;
    let type = arr_new[0].type;
    let currentOptions = arr_new[0].options;
    let correctoption = arr_new[0].correctoption;

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
            <h3 className="font500 colorBlack font_16px mblPllsSrvsContentTtl" >
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
              <div className="clearfix"></div>
              {val.sponsor_logo ? 
              <div className="full_width mblSessionbtm">
                  <span className="colorBlack font_12px font500">Powered by</span>
                  <Slider {...dskSessionClient} className="dskSessionClient"> 
                   {val.sponsor_logo.split(",").map((logo, ind) => (
                        <div className="dskSessionClientItem">
                          <img src={logo} />
                        </div>
                      ))}
                </Slider>
              </div> : null}
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
    let dataJson = props.data.json_data;
    let point = props.data.point;
    let mData = JSON.parse(unescape(dataJson));
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
              <div className="clearfix"></div>
              {val.sponsor_logo ? 
              <div className="full_width mblSessionbtm">
              <span className="colorBlack font_12px font500">Powered by</span>
                      <Slider {...mblPllsSrvsClient} className="mblSessionClient">
                        {val.sponsor_logo.split(",").map((val, ind) => (
                              <div className="mblSessionClientItem">
                                <img src={val} />
                              </div>
                            ))}
                        </Slider> 
              </div>:null}
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
export default PollCard;
