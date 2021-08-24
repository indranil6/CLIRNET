import React from "react";
import Rectangle from "./Rectangle";
import { isMobile } from 'react-device-detect';

const returnDesktopCard = () =>
(

  <div className="col-sm-6 dskTrandingSurvey">
    <h3 className="font_18px fontExo colorBlack font600 text-uppercase">
      Trending Quizzes
    </h3>
    <div className="clearfix"></div>
    <div className="full_width dskTrandingSurveySlider">
      <div className="mblPllsSrvsCard">
        <div className="full_width radius-6 mblPllsSrvs_link">
          <div className="full_width mblPllsSrvsPic">
            <div className="overlay"></div>
            {/* <Rectangle width="100%" height="140" /> */}

            {/* <div className="dskDotsMenu dskDotsCircle mblDotsMenuPllsQzsCard popoverExtra">
              <Rectangle width="26" height="26" />
            </div> */}
          </div>
          <div className="full_width mblPllsSrvsContent">
            <div className="full_width radius-6 mblPllsSrvsDrwBox">
              <div className="colorBlack font_12px font400 radius-6 mblMedWikiSpeacality">
                <Rectangle width="73" height="26" />
              </div>
            </div>
            <div className="clearfix"></div>
            <h3
              className="font400 colorBlack font_16px mblPllsSrvsContentTtl"
            >
              <Rectangle width="100%" height="10" />
            </h3>
            <div className="clearfix"></div>
            <h5 className="font400 colorGrey font_14px mblPllsSrvsContentText">
              <Rectangle width="100%" height="10" />
            </h5>
            <div className="clearfix"></div>
            <div className="full_width mblPllsSrvsbtm">
              <div
                className="colorWhite font_14px fontExo font700 radius-6"
              >
                <Rectangle width="94" height="42" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

)

const returnMobileCard = () =>
(
  <div>
    <div className="col-sm-6 dskTrandingSurvey">
      <h3 className="font_18px fontExo colorBlack font600 text-uppercase">
        Trending Quizzes
      </h3>
      <div className="clearfix"></div>
      <div className="full_width dskTrandingSurveySlider">
        <div className="mblPllsSrvsCard">
          <div className="full_width radius-6 mblPllsSrvs_link">
            <div className="full_width mblPllsSrvsPic">
              <div className="overlay"></div>
              {/* <Rectangle width="100%" height="140" /> */}

              {/* <div className="dskDotsMenu dskDotsCircle mblDotsMenuPllsQzsCard popoverExtra">
                <Rectangle width="26" height="26" />
              </div> */}
            </div>
            <div className="full_width mblPllsSrvsContent">
              <div className="full_width radius-6 mblPllsSrvsDrwBox">
                <div className="colorBlack font_12px font400 radius-6 mblMedWikiSpeacality">
                  <Rectangle width="73" height="26" />
                </div>
              </div>
              <div className="clearfix"></div>
              <h3
                className="font400 colorBlack font_16px mblPllsSrvsContentTtl"
              >
                <Rectangle width="100%" height="10" />
              </h3>
              <div className="clearfix"></div>
              <h5 className="font400 colorGrey font_14px mblPllsSrvsContentText">
                <Rectangle width="100%" height="10" />
              </h5>
              <div className="clearfix"></div>
              <div className="full_width mblPllsSrvsbtm">
                <div
                  className="colorWhite font_14px fontExo font700 radius-6"
                >
                  <Rectangle width="94" height="42" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)


const TrandingQuizzesLoader = (props) => (
  isMobile ? returnMobileCard() : returnDesktopCard()
)

export default TrandingQuizzesLoader;