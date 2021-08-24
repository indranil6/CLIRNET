import React from "react";
import Rectangle from "./Rectangle";
import { isMobile } from 'react-device-detect';

const returnMobileCard = (props) => (
  <div className="full_width text-left mblSessionSlider">
    <div className="mblSessionCard">
      <div className="full_width radius-6 mblSessionCard_link">
        <div className="full_width mblSessionTopArea" style={{ "background-color": "#bdc3c7" }}>
          {/* <Rectangle width="317" height="143" /> */}
          <div className="overlay"></div>
          <div className="full_width mblSessionTopIn">
            <div className="full_width mblSessionTop">
              <div className="row align-items-center justify-content-between">
                <div className="colorWhite font_14px font700 mblSessionType">
                  <span className="radius-100 mblSessionTypeIcon">
                  </span>
                  <Rectangle width="67" height="15" />
                </div>
                <div className="mblSessionTopRight">
                  <div className="mblSessionTime">
                  </div> 
                  <div className="mblDotsMenu mblDotsCircle mblDotsMenuSssnCard popoverExtra">
                    <Rectangle width="30" height="30" />
                  </div>
                </div>
              </div>
            </div>
            <div className="clearfix"></div>
            <h3 className="colorWhite font_18px font600">  <Rectangle width="300" height="10" /></h3>
          </div>
        </div>
        <div className="full_width mblSessionBttmArea">
          <div className="row mblGrMstrDocRow mblGrMstrDocRowExtra">

            <div className="mblGrMstrDocBox mblGrMstrDocBoxSsn">
              <div className="full_width mblGrMstrDocBoxIn">
                <div className="row align-items-center">
                  <div className="radius-100 mblGrMstrDocBoxInPic mblGrMstrDocBoxInPicSsn">
                    <Rectangle width="42" height="42" />
                  </div>
                  <div className="font_12px colorGrey font400 mblGrMstrDocBoxContent">
                    <h4 className="font_14px colorBlack font600">   <Rectangle width="80%" height="10" /></h4>
                    <p><Rectangle width="60%" height="5" /></p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="full_width mblSessionbtm">
            <div className="text-uppercase colorWhite font_14px fontExo font600 radius-6" style={{ "background-color": "#bdc3c7" }}>
              <span><Rectangle width="120" height="30" /></span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
)

const returnDesktopCard = (props) => (
  <section className="full_width dskSlideSession">
    <div className="full_width text-left dskSlideTop">
      <div className="text-left dskSlideSessionCard">
        <div className="full_width radius-6 dskSlideSsnCard_link">
          <div className="overlay"></div>
          <div className="full_width dskSlideIn">
            <div className="full_width dskSlideTop">
              <div className="row align-items-center justify-content-between">
                <div className="colorWhite font_14px font600 dskSessionType">
                  <span className="radius-100 dskSessionTypeIcon">
                    <Rectangle width="40" height="40" />
                  </span>
                  <Rectangle width="106" height="20" />
                </div>
                <div className="dskSessionTopRight">
                  <div className="dskSessionTime">
                    <h4 className="colorWhite font_14px font600" style={{width:"198px"}}>
                      {/* <Rectangle width="198" height="18" /> */}
                    </h4>
                  </div>
                  <div
                    className="dskDotsMenu dskDotsCircle dskDotsMenuSssnCard popoverExtra">
                    <Rectangle width="26" height="26" />
                  </div>
                </div>
              </div>
            </div>
            <div className="full_width dskSlideSsnBody">
              <div className="dskSlideSsnBodyLeft">
                <h3
                  className="font_22px font600 colorWhite dskSlideSsnBodyLeftTtl">
                  <Rectangle width="498" height="15" />
                </h3>
                <div className="clearfix"></div>
                <div className="row dskGrMstrDocRow dskSlideSsnDocArea">
                  <div className="dskGrMstrDocBox dskGrMstrDocBoxSsn">
                    <div className="full_width dskGrMstrDocBoxIn">
                      <div className="row align-items-center">
                        <div className="radius-100 dskGrMstrDocBoxInPic dskGrMstrDocBoxInPicSsn">
                          <Rectangle width="50" height="50" />
                        </div>
                        <div className="font_12px colorGrey font400 dskGrMstrDocBoxContent">
                          <h4 className="font_14px colorBlack font600">
                            <Rectangle width="402" height="10" />
                          </h4>
                          <h4 className="font_14px colorBlack font600">
                            <Rectangle width="250" height="10" />
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)
const SessionSliderLoader = (props) => (
  isMobile ? returnMobileCard() : returnDesktopCard()
)

export default SessionSliderLoader;