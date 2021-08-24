import React from "react";
import Slider from "react-slick";
import doctorVoice1 from "../../mobImages/doctorVoice-1.png";
import doctorVoice2 from "../../mobImages/doctorVoice-2.jpg";
import doctorVoice3 from "../../mobImages/doctorVoice-3.jpg";
import Form from "react-bootstrap/Form";
import AppConfig from "../config/config.js";
import { reactLocalStorage } from "reactjs-localstorage";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
// import { ToastsContainer, ToastsStore } from 'react-toasts';
import $ from "jquery";
import DoctorVoiceLoader from "../LoadingPlaceholders/DoctorVoiceLoader.jsx";

const url = AppConfig.apiLoc;
var doctor_voice_list = [];

let isApiCallDone = false;
class DoctorVoice extends React.Component {
  constructor(props) {
    super(props);
    doctor_voice_list = [];
    this.state = {
      display: false,
      checkedRadio: null,
    };

    isApiCallDone = false;
  }

  refresh = () => {
    this.setState({ display: !this.state.display });
  };

  componentDidMount() {
    isApiCallDone = false;
    doctor_voice_list = [];
    this.getDoctorVoice();
  }

  getDoctorVoice = () => {
    fetch(url + "dashboard/poll", {
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
          let responseData = responseJson.data;
          //
          if (
            doctor_voice_list != null &&
            doctor_voice_list.length != undefined
          ) {
            // doctor_voice_list = responseData;
            responseData.map((r, index) => {
              if (index == 0 || index == "0") doctor_voice_list.push(r);
            });
          }
          this.refresh();
          setTimeout(function () {
            if (doctor_voice_list.length == 1) {
              $(".mblDoctorVoiceCard").addClass("mblSingleCard");
            } else {
              $(".mblDoctorVoiceCard").removeClass("mblSingleCard");
            }
          }, 300);
        }
      })
      .catch((error) => {
        isApiCallDone = false;
        //console.log("Error"+error);
      });
  };

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
            toast.success(
              "Congratulation! You Won " + survey_points + " Points"
            );
          } else {
            toast.error("Failed to update point");
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

  renderPollOption(dataJson, survey_id, point) {
    // //console.log('render Polls'+point)
    let mData = JSON.parse(unescape(dataJson));
    let sData = mData.surveys;
    let arr_new = Object.keys(sData).map(function (k) {
      return sData[k];
    });
    let currentOptions = arr_new[0].options;
    let question = arr_new[0].question;
    return (
      <div className="full_width mblDoctorVoiceContent text-left">
        <h2 className="colorWhite font600 font_18px">{question}</h2>
        <div className="full_width font_14px mblDoctorVoiceAns">
          {currentOptions.map((options, i) => (
            <>
              <Form.Check
                id={"option1" + survey_id + i}
                className={
                  "mblDoctorVoiceAnsRadio " + "srvPollsRadio" + survey_id
                }
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
              <div id={"srvPollResult" + survey_id}>{}</div>
            </>
          ))}
        </div>
      </div>
    );
  }

  render() {
    var mblDoctorVoiceSlide = {
      dots: false,
      infinite: true,
      speed: 600,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      centerMode: false,
      centerPadding: "0%",
      autoplay: true,
      responsive: [
        {
          breakpoint: 640,
          settings: {
            centerPadding: "0%",
          },
        },
        {
          breakpoint: 360,
          settings: {
            centerPadding: "0%",
          },
        },
      ],
    };
    return doctor_voice_list != null && doctor_voice_list.length > 0 ? (
      <section className="full_width mblDoctorVoiceArea">
        <Slider
          {...mblDoctorVoiceSlide}
          className="full_width mblDoctorVoiceSlide"
        >
          {doctor_voice_list != null && doctor_voice_list.length > 0
            ? doctor_voice_list.map((val, ind) => (
                <div className="mblDoctorVoiceCard">
                  <div className="full_width radius-6  mblDoctorVoice">
                    <img src={doctorVoice2} className="mblDoctorVoiceGraph2" />
                    <img src={doctorVoice3} className="mblDoctorVoiceGraph3" />
                    <img src={doctorVoice1} className="mblDoctorVoiceGraph1" />
                    <div className="overlay"></div>
                    {/* <div className="full_width mblDoctorVoiceContent text-left">
                            <h2 className="colorWhite font600 font_18px">{(val.survey_title !== ''|| val.survey_title !== null)?val.survey_title:null}</h2> 
                            <div className="full_width font_14px mblDoctorVoiceAns">
                            {this.renderPollOption(val.json_data,val.survey_id, val.point)}  
                            </div>
                        </div> */}
                    {this.renderPollOption(
                      val.json_data,
                      val.survey_id,
                      val.point
                    )}
                  </div>
                </div>
              ))
            : null}
        </Slider>
        {/* <ToastsContainer store={ToastsStore} /> */}
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
      </section>
    ) : isApiCallDone ? null : (
          <DoctorVoiceLoader />
    );
  }
}
export default DoctorVoice;
