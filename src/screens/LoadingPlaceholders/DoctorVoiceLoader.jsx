import React from "react"
import Rectangle from './Rectangle.jsx';
import { isMobile } from 'react-device-detect';
// import doctorVoice1 from "../../mobImages/doctorVoice-1.png";
// import doctorVoice2 from "../../mobImages/doctorVoice-2.jpg";
// import doctorVoice3 from "../../mobImages/doctorVoice-3.jpg";

import loader_config from "./loader_config";

const returnDesktopCard = (props) => (
  <div className="full_width text-left dskSlideDocVoice">
    <div className="dskSlideDocVoiceIn">
      <div
        className="full_width radius-6  dskDoctorVoice"
        style={{ "background-color": "#bdc3c7" }}>
        {/* <img src={doctorVoice1} className="dskDoctorVoiceGraph1" />
      <img src={doctorVoice2} className="dskDoctorVoiceGraph2" /> */}
        <div className="overlay"></div>
        <div className="full_width dskDoctorVoiceContent text-left">
          <h2 className="colorWhite font900 font_36px dskDoctorVoiceTtl">
            Doctor’s Voice
          </h2>
          <h3 className="colorWhite font600 font_18px">
            <Rectangle width="498" height="20" />
          </h3>
          <div className="full_width font_14px mblDoctorVoiceAns">
            <div className={"dskDoctorVoiceAnsRadio " + "srvPollsRadio"}>
              <Rectangle width="150" height="49" />
            </div>
            <div className={"dskDoctorVoiceAnsRadio " + "srvPollsRadio"}>
              <Rectangle width="150" height="49" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
const returnMobileCard = (props) => (
  <section className="full_width mblDoctorVoiceArea">
    <div className="full_width mblDoctorVoiceSlide">
      <div className="mblDoctorVoiceCard" style={{ "background-color": "#bdc3c7" }}>
        <div className="full_width radius-6  mblDoctorVoice">
          {/* <img src={doctorVoice2} className="mblDoctorVoiceGraph2" />
          <img src={doctorVoice3} className="mblDoctorVoiceGraph3" />
          <img src={doctorVoice1} className="mblDoctorVoiceGraph1" /> */}
          <div className="overlay"></div>
          <div className="full_width mblDoctorVoiceContent text-left">
            <h2 className="colorWhite font600 font_18px"> <Rectangle width="100%" height="15" /></h2>
            <div className="full_width font_14px mblDoctorVoiceAns">
              <div
                id={"option1"}
                className={"mblDoctorVoiceAnsRadio " + "srvPollsRadio"}>
                <Rectangle width="100%" height="39" />
              </div>
              <div
                id={"option1"}
                className={"mblDoctorVoiceAnsRadio " + "srvPollsRadio"}>
                <Rectangle width="100%" height="39" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)
const DoctorVoiceLoader = (props) => (
  isMobile ? returnMobileCard() : returnDesktopCard()
)

export default DoctorVoiceLoader;