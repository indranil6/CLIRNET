import React, { useEffect, useState } from 'react';
import { Countdown as TimeCounter, openNewTab } from '../Common/Common.js';
import * as utils from '../session/utils.js';
import Countdown from './CountDown.jsx';
import './css/session_waiting_room.css';

export default function SessionWaitingRoom(props) {

  const [sessionId, setSessionId] = useState(props.match.params.id);
  const [sessionTopic, setSessionTopic] = useState('');

  const [sessionStartTime, setSessionStartTime] = useState('');
  const [sessionEndTime, setSsessionEndtTime] = useState('');

  const [vendorId, setVendorId] = useState('');
  const [sessionMeetingUrl, setSessionMeetingUrl] = useState('');

  const [display, setDisplay] = useState(false);
  const SESSION_BEGIN_TIME = 15*60;

  const contentSliderSettings = {
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
    let startDateTime = '';
    let endDateTime = '';
    startDateTime = data[0].start_datetime;
    endDateTime = data[0].end_datetime;
 
    // let startDateTime = "2021-08-16 10:20:00";  
    // let endDateTime = "2021-08-16 10:30:00";  
    
    setSessionStartTime(startDateTime);
    setSsessionEndtTime(endDateTime);
    setSessionTopic(data[0].session_topic);
    setSessionMeetingUrl(data[0].vendor_id ? data[0].video_embed_src : "")

    if (startDateTime && endDateTime) {
      runServiceForLiveSession(startDateTime, endDateTime,data[0].vendor_id);
    }
  }

  const runServiceForLiveSession = (startTime, endTime,vendorId) => {
    let startTimeDif = utils.getTimeDifference(startTime);
    let endTimeDif = utils.getTimeDifference(endTime);
    startTimeDif = Math.round(startTimeDif);
    endTimeDif = Math.round(endTimeDif);
    let myCounter;

    /////////////////////////running live condition-start/////////////////////////////////
    if (startTimeDif >= 0 && endTimeDif <= 0) {
      console.log("session start");
      handleSessionVendor(vendorId);
      myCounter.stop();
    } else {
      // utils.redirectToReservesession(props.history,sessionId);
    }
    /////////////////////////running live condition-end////////////////////////////////////

    /////////////////////////start live condition-start////////////////////////////////////
    if (startTimeDif && startTimeDif < 0) {
      myCounter = new TimeCounter({
        seconds: Math.abs(Math.ceil(startTimeDif)),
        onUpdateStatus: function (sec) {
          console.log("live Start in "+sec+" Sec");
          if(sec >= SESSION_BEGIN_TIME){
            utils.redirectToReservesession(props.history,sessionId)
          }
        },
        onCounterEnd: function () {
          handleSessionVendor(vendorId);
          myCounter.stop();
        },
      });
      myCounter.start();
    }else{
      // utils.redirectToReservesession(props.history,sessionId)
    }
    /////////////////////////start live condition-end//////////////////////////////////////

    /////////////////////////end live condition-start/////////////////////////////////////
    if (endTimeDif && endTimeDif < 0) {
      myCounter = new TimeCounter({
        seconds: Math.abs(Math.ceil(endTimeDif)),
        onUpdateStatus: function (sec) {
          console.log("live end in "+sec+" Sec");
        },
        onCounterEnd: function () {
          utils.redirectToReservesession(props.history, sessionId);
          myCounter.stop();
        },
      });
      myCounter.start();
    }else{
      utils.redirectToReservesession(props.history,sessionId)
    }
    /////////////////////////end live condition-end/////////////////////////////////////
  }

  const handleSessionVendor = (vendorId) => {
    console.log("handleSessionVendor",vendorId)
    switch (vendorId) {
      case "0": //clirnet recorded session
        utils.redirectToLiveSession(props.history, sessionId);
        break;
      case "2": //vouchpro 
        openNewTab(sessionMeetingUrl);
        break;
      case "4": //zoom
        openNewTab(sessionMeetingUrl);
        break;
      case "5": //clirnet live
        utils.redirectToLiveSession(props.history, sessionId);
        break;
      default: return false;
    }
  };

  return (
    <div className="full_width waiting_room">
      <div className="container">
        <div className="row  justify-content-center align-items-center waiting_room_row">
          <div className="full_width">
            <div className="full_width waitingTimer">
              {sessionStartTime ? <Countdown timeTillDate={sessionStartTime} /> : null}
              <div className="clearfix"></div>
              <h1 className="font500 font_16px colorWhite waitingTimerCount">Session Will Starting In, Please Wait We Will Join You Automatically</h1>
            </div>
            <h2 class="colorWhite font_20px font600">{sessionTopic}</h2>
            <div class="clearfix"></div>
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
          {/* <div className="col-md-12">
            <Slider {...contentSliderSettings} className="session_waiting_room_slider">
              <div className="home_slider">
                <div className="full_width radius-6 home_slider_3">
                  <div className="full_width ssn_p_BoxTop">
                    <h4 className="font_12px font600 my_session_box_type"><img src="https://developer.clirnet.com/knowledge//themes/front/images/session/MasterCircle.png" width="24" height="24" alt="icon" /> <span className="colorGreen">Medwiki</span> </h4>
                    <div className="colorBlack font_12px font600 session_time ssnDtl_dateDesk">
                    <img src={calenderIcon} />
                    <span><Moment format="MMMM Do YYYY">{r.publishing_date}</Moment></span>
                  </div> 
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
          </div>   */}
        </div>{/*END OF ROW */}
      </div>
    </div>
  )
}

