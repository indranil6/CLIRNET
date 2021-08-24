import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import './css/session_waiting_room.css';
import Countdown from './CountDown.jsx';
import * as utils from '../session/utils.js';
import { Countdown as TimeCounter } from '../Common/Common.js';

export default function SessionWaitingRoom(props) {

  const [sessionId, setSessionId] = useState(props.match.params.id);
  const [display, setDisplay] = useState(false);
  const SESSION_BEGIN_TIME = 0;

  var contentSliderSettings = {
    autoplay: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true
  };

  useEffect(() => {
    // setSessionId(props.match.params.id);

    utils.getSessionDetails(props.match.params.id).then(response => {
      if (response.status_code == 200) {
        parseResponseJson(response.data)
      } else {
        // utils.redirectToLogin(props.history)
      }
    });

  }, []);

  const parseResponseJson = (data) => {
    // alert(data[0].start_datetime) 
    let startDateTime = '2021-08-02 00:39:00';
    let endDateTime = '2021-08-02 00:39:20';
    // startDateTime = data[0].start_datetime;
    // endDateTime = data[0].end_datetime; 
    runServiceForLiveSession(startDateTime, endDateTime);
  }

  const runServiceForLiveSession = (startTime, endTime) => {
    let startTimeDif = utils.getTimeDifference(startTime);
    let endTimeDif = utils.getTimeDifference(endTime);
    startTimeDif = Math.round(startTimeDif);
    endTimeDif = Math.round(endTimeDif);
    let myCounter;

    if (startTimeDif >= 0 && endTimeDif <= 0) {
      myCounter.stop()
      utils.redirectToLiveSession(props.history, sessionId)
      // context.setState({ isLiveStart: true },()=>console.log("running live start state changed"));
    } else {
      // console.log("not live\n"+startTimeDif+"\nend\n"+endTimeDif)
    }

    let beginTime = startTimeDif; //- SESSION_BEGIN_TIME; 
    if (startTimeDif && startTimeDif < SESSION_BEGIN_TIME) {
      myCounter = new TimeCounter({
        seconds: Math.abs(Math.ceil(startTimeDif)),
        onUpdateStatus: function (sec) {
          // console.log("live Start in "+sec+" Sec");
        },
        onCounterEnd: function () {
          // alert("live start1\n")
          myCounter.stop()
          utils.redirectToLiveSession(props.history, sessionId)
        },
      });
      myCounter.start();
    }
    // else {
    if (endTimeDif && endTimeDif < 0) {
      myCounter = new TimeCounter({
        seconds: Math.abs(Math.ceil(endTimeDif)),
        onUpdateStatus: function (sec) {
          // console.log("live end in "+sec+" Sec");
        },
        onCounterEnd: function () {
          myCounter.stop()
          utils.redirectToReservesession(props.history, sessionId)
        },
      });
      myCounter.start();
    }
    // }
  }

  return (
    <div className="full_width waiting_room">
      <div className="container">
        <div className="row  d-flex justify-content-center">
          <div className="col-md-12 col-sm-12">
            <Countdown timeTillDate="2021-10-13 15:00:00" />
            <h1 className="font200 font_14px colorWhite">Session Will Starting In, Please Wait We Will Join You Automatically</h1>
          </div>
          <div class="clearfix"></div>
          <div className="col-md-12 col-sm-12">
            <div className="sessionTopicBox">
              <h2 class="colorWhite font_18px font400">COVID-19: Management of Dermatology Patients
                amidst the Pandemic</h2>
            </div>
          </div>
          <div className="col-md-12">
            <Slider {...contentSliderSettings} className="session_waiting_room_slider">
              <div className="home_slider">
                <div className="full_width radius-6 home_slider_3">
                  <div className="full_width ssn_p_BoxTop">
                    <h4 className="font_12px font600 my_session_box_type"><img src="https://developer.clirnet.com/knowledge//themes/front/images/session/MasterCircle.png" width="24" height="24" alt="icon" /> <span className="colorGreen">Medwiki</span> </h4>
                    {/* <div className="colorBlack font_12px font600 session_time ssnDtl_dateDesk">
                    <img src={calenderIcon} />
                    <span><Moment format="MMMM Do YYYY">{r.publishing_date}</Moment></span>
                  </div>  */}
                    <div className="my_session_box_sponsors">
                      <span className="font_12px font600 colorBlack">Powered by</span>
                      <img src="https://doctor.clirnet.com/knowledge/uploads/logo/Cf555B257F8b7546e224ED5c8d.png" alt="logo" />
                    </div>
                  </div>
                  <div className="clearfix"></div>
                  <h2 className="colorBlack font700 font_16px my_session_box_ttl">Diabetology</h2>
                  <div className="full_width session_Row">
                    <div className="radius-100 session_RowPIc">
                      <img src="https://storage.googleapis.com/medwiki/35_server_testing/video/1615709272_external_the-potential-and-perils-of-the-iot-in-healthcare-630x330.jpg" className="object_fit_cover radius-100" />
                    </div>
                    <h2 className="colorBlack font700 font_16px session_doctor">Test Survey
                      <span className="colorGrey font_14px font600">Survey description</span></h2>
                  </div>
                </div>
              </div>
            </Slider>
          </div>  
          <div className="col-md-12">
            <section className="full_width adsArea">
              <div className="full_width adsFrame">
                <div class="full_width text-center add_area_top top_banner_div view_image_top">
                  <a className="banner_href_top"
                    href="javascript:void(0)"
                  >
                    <h4 className="font_10px font500 colorBlack text-right Ad_ttl">
                      Ad
                    </h4>
                    <img src="https://storage.googleapis.com/medwiki/43_server/images/1626851381_2021-07-14.jpg?v=852" alt="banner" />
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>{/*END OF ROW */}
      </div>
    </div>
  )
}

