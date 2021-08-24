import React from "react";
import Rectangle from './Rectangle.jsx';
import { isMobile } from 'react-device-detect';

const returnDesktopCard = (props) => (
  <div className="col-sm-6 dskTrandingGrandRounds">
    <h3 className="font_18px fontExo colorBlack font600 text-uppercase">
      Trending Grand Rounds
    </h3>
    <div className="clearfix"></div>
    <div className="full_width dskTrandingGrSlider">
      <div className="dskgrCard grCard mamama">
        <div className="full_width radius-6 dskgrCard_link">
          <div className="full_width dskgrCardPic">
            <div className="full_width dskgrCardTop">
              <div className="colorBlack font_12px font400 radius-6 bgColorWhite mblMedWikiSpeacality">
                <Rectangle width="74" height="26" />
              </div>
              {/* <div className="dskDotsMenu dskDotsCircle mblDotsMenuMedWikiCard popoverExtra">
                <Rectangle width="26" height="26" />
              </div> */}
            </div>
            <div
              className="object_fit_cover">
              <Rectangle width="100%" height="180" />
            </div>
            <div className="overlay"></div>
          </div>
          <div className="full_width dskgrCardBtm">
            <div className="full_width dskgrCardBtmIn">
              <h3 className="font500 colorBlack font_16px dskgrCardTtl">
                <Rectangle width="231" height="10" />
              </h3>
              <div className="clearfix"></div>
              <div className="full_width colorGrey font_14px dskgrCardDescription">
                <Rectangle width="220" height="10" />
              </div>
              <div className="full_width dskGrMstrDoc">
                <div className="clearfix"></div>
                <div className="row dskGrMstrDocRow">
                  <div className="dskGrMstrDocBox">
                    <div className="full_width dskGrMstrDocBoxIn">
                      <div className="row align-items-center">
                        <div className="radius-100 dskGrMstrDocBoxInPic">
                          <Rectangle width="50" height="50" />
                        </div>
                        <div className="font_12px colorGrey font400 dskGrMstrDocBoxContent">
                          <h4 className="font_14px colorBlack font600">
                            <Rectangle width="140" height="10" />
                          </h4>
                          <Rectangle width="140" height="10" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="full_width dskgrCardFooter">
                <div className="text-uppercase colorWhite font_14px fontExo font400 radius-6">
                  <Rectangle width="150" height="52" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
const returnMobileCard = (props) => (
  <section className="full_width text-left mblGR">

    <h3 className="font700 fontExo colorBlack font_22px mblGRTtl"> <span>Trending Grand Rounds</span></h3>
    <div className="clearfix"></div>
    <div className="full_width text-left mblGrSlider">

      <div className="mblGrCard" >
        <div className="full_width radius-6 mblGrCard_link">
          <div className="full_width mblGrPic">
            <div className="full_width mblGrPicOverBox">
              <div className="overlay"></div>
              {/* {(val.image == null || val.image == '') ? null :
                    <img src={val.image} className="object_fit_cover" alt="Grand Rounds" />
                  } */}

            </div>
            <div className="mblGrCardTop">
              <div className="colorBlack font_14px font500 radius-6 mblMedWikiSpeacality">
                <Rectangle width="75" height="26" />
              </div>
              {/* <div className="mblDotsMenu mblDotsCircle mblDotsMenuGrCard popoverExtra">
                <Rectangle width="30" height="30" />
              </div> */}
            </div>
          </div>
          <div className="full_width mblGrContent">
            <h3 className="font500 colorBlack font_18px mblGrContentTtl"> <Rectangle width="80%" height="10" /></h3>
            <div className="clearfix"></div>
            <div className="full_width mblGrMstrDoc">
              <div className="clearfix"></div>
              <div className="row mblGrMstrDocRow">
                <div className="mblGrMstrDocBox mblGrMstrDocPopShow">
                  <div className="full_width mblGrMstrDocBoxIn">
                    <div className="row align-items-center">
                      <div className="radius-100 mblGrMstrDocBoxInPic">
                        {/* <Rectangle width="60%" height="5" /> */}
                      </div> 
                      <div className="font_12px colorGrey font400 mblGrMstrDocBoxContent">
                        <h4 className="font_14px colorBlack font600"><Rectangle width="100" height="10" /></h4>
                        <p> <Rectangle width="60%" height="10" /></p>
                      </div>
                      <div className="radius-6 mblGrMstrDocProfile">

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="clearfix"></div>
            <h5 className="font400 colorGrey font_14px mblGrContentText"> <Rectangle width="80%" height="10" /></h5>
          </div>
        </div>
      </div>
    </div>
  </section>
)
const TrandingGrLoader = (props) => (
  isMobile ? returnMobileCard() : returnDesktopCard()

)
export default TrandingGrLoader;