import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import doctorVoice1 from "../../desktopImages/doctorVoice-1.png";
import doctorVoice2 from "../../desktopImages/doctorVoice-2.png";
import Form from "react-bootstrap/Form";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import $ from "jquery";
import DoctorVoiceLoader from "../LoadingPlaceholders/DoctorVoiceLoader.jsx";
import {
  addPoint,
  getDoctorVoice,
  getPollResultById,
  submitPollAns,
} from "../../redux/actions/dashboardDesktop.action";
import { useDispatch, useSelector } from "react-redux";

var dskSlideDocVoice = {
  dots: false,
  infinite: true,
  speed: 500,
  fade: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
};

let isApiCallDone = false;
const DoctorVoiceFunc = () => {
  const dispatch = useDispatch();
  const doctor_voice_list = useSelector(
    (state) => state.dashboard.doctor_voice_list
  );
  const [display, setDisplay] = useState(false);
  const [checkedRadio, setCheckedRadio] = useState(null);
  function refresh() {
    setDisplay(!display);
  }
  useEffect(() => {
    dispatch(getDoctorVoice((responseJson) => {}));
  }, []);

  function submitPollAnswer(id, answerjson, point, boxIndex) {
    if (
      id == null ||
      id == "" ||
      id == undefined ||
      answerjson == null ||
      answerjson == "" ||
      answerjson == undefined
    ) {
      console.log("id or answer can not be empty");
    } else {
      let answerData = {
        survey_id: id,
        answer_json: JSON.stringify(answerjson),
      };
      dispatch(
        submitPollAns(answerData, (response) => {
          if (response !== "error") {
            let status_code = response.status_code;
            if (status_code == 200) {
              addPoints(id, point);
              let name = "option1" + id;
              let boxId = "option1" + id + boxIndex;

              $("input[id=" + boxId + "]").attr("checked", true);
              $("input[id=" + boxId + "]").addClass("surveyPollsRadioCheckdF");
              $("input[name=" + name + "]").attr("disabled", true);
              getPollAnswer(id, boxIndex);
            }
          } else {
          }
        })
      );
    }
  }
  function addPoints(id, survey_points) {
    if (id == "" || id == undefined) {
      console.log("addPoints" + id + "::" + survey_points);
    } else {
      let pointsData = {
        survey_id: id,
        point: survey_points,
      };
      dispatch(
        addPoint(pointsData, (response) => {
          console.log("===>>add point", response);
          if (response.status_code === 200) {
            toast.success(
              "Congratulation! You Won " + survey_points + " Points"
            );
          } else {
            toast.error("Failed to update point");
          }
        })
      );
    }
  }
  function getPollAnswer(id, boxIndex) {
    if (id == "" || id == undefined) {
    } else {
      dispatch(
        getPollResultById(id, (response) => {
          console.log("===>>poll response", response);
          if (response.status_code === 200) {
            let responseData = response.data;

            let parentDivId = "#srvPollResult" + id;
            let boxId = ".srvPollsRadio" + id;
            let mData = JSON.parse(unescape(responseData));
            mData.map((i) => {
              $(boxId).hide(500, function () {
                $(this).remove();

                let currentOption = i.options;
                let selectedIndexPoll = i.selectedIndex;
                console.log(
                  "==>>curr opt & selected poll",
                  currentOption,
                  selectedIndexPoll
                );
                let resultOpt = renderPollResult(
                  currentOption,
                  selectedIndexPoll
                );
                $(parentDivId).show(500, function () {
                  $(this).html(resultOpt);
                });
              });
            });
            refresh();
          } else {
          }
        })
      );
    }
  }
  function renderPollResult(currentOptions, selectedIndexPoll) {
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
  }
  function onPollSubmit(
    arr_new,
    options,
    survey_id,
    point,
    i // for single type questions
  ) {
    // console.log('On poll submit'+'survey_points\n'+point)
    arr_new[0].selectedIndex = i;
    submitPollAnswer(survey_id, arr_new, point, i);
    setCheckedRadio(survey_id + i);
  }
  function renderPollOption(dataJson, survey_id, point) {
    // console.log('render Polls'+point)
    let mData = JSON.parse(unescape(dataJson));
    let sData = mData.surveys;
    let arr_new = Object.keys(sData).map(function (k) {
      return sData[k];
    });
    let currentOptions = arr_new[0].options;
    let question = arr_new[0].question;
    return (
      <div className="full_width dskDoctorVoiceContent text-left">
        <h2 className="colorWhite font900 font_36px dskDoctorVoiceTtl">
          Doctor’s Voice
        </h2>
        <h3 className="colorWhite font600 font_18px">{question}</h3>
        <div className="full_width font_14px mblDoctorVoiceAns">
          {currentOptions.map((options, i) => (
            <>
              <Form.Check
                id={"option1" + survey_id + i}
                className={
                  "dskDoctorVoiceAnsRadio " + "srvPollsRadio" + survey_id
                }
                type="radio"
                // ref={"ref_" + i}
                name={"option1" + survey_id}
                onChange={() => {
                  onPollSubmit(arr_new, options, survey_id, point, i);
                }}
                value={options.value}
                label={options.label}
                checked={checkedRadio == survey_id + i}
              />
              <div id={"srvPollResult" + survey_id}>{}</div>
            </>
          ))}
        </div>
      </div>
    );
  }
  return doctor_voice_list != null && doctor_voice_list.length > 0 ? (
    <section id="doctor-voice">
      <Slider
        {...dskSlideDocVoice}
        className="full_width text-left dskSlideDocVoice"
      >
        {doctor_voice_list != null && doctor_voice_list.length > 0
          ? doctor_voice_list.map((val, ind) => (
              <div className="dskSlideDocVoiceIn">
                <div
                  className="full_width radius-6  dskDoctorVoice"
                  style={{ "background-color": "#0ea6b5" }}
                >
                  <img src={doctorVoice1} className="dskDoctorVoiceGraph1" />
                  <img src={doctorVoice2} className="dskDoctorVoiceGraph2" />
                  <div className="overlay"></div>
                  {/* <div className="full_width dskDoctorVoiceContent text-left">
                          <h2 className="colorWhite font900 font_36px dskDoctorVoiceTtl">Doctor’s Voice</h2>
                          <h3 className="colorWhite font600 font_18px">{(val.survey_title !== ''|| val.survey_title !== null)?val.survey_title:null}</h3>
                          <div className="full_width font_14px dskDoctorVoiceAns">
                            {this.renderPollOption(val.json_data,val.survey_id, val.point)} 
                          </div>
                        </div> */}
                  {renderPollOption(val.json_data, val.survey_id, val.point)}
                </div>
              </div>
            ))
          : null}
      </Slider>
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
};

export default DoctorVoiceFunc;
