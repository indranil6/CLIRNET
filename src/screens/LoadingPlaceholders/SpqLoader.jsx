import React from "react";
import Rectangle from "./Rectangle";
import { isMobile } from 'react-device-detect';

const renderDesktopCard = (props) => {
  return (
    <div className="col-sm-6 mblPllsSrvsCard dskMasonryCard">
      <div className="full_width radius-6 mblPllsSrvs_link">
        <div className="full_width mblPllsSrvsPic">
          <div className="overlay"></div>
          {/* <Rectangle height="140" width="100%" /> */}
          {/* <div className="dskDotsMenu dskDotsCircle mblDotsMenuPllsQzsCard popoverExtra">
            <Rectangle width="26" height="26" />
          </div> */}
        </div>
        <div className="full_width mblPllsSrvsContent">
          <div className="full_width radius-6 mblPllsSrvsDrwBox">
            <div className="colorBlack font_12px font400 radius-6 mblMedWikiSpeacality">
              <Rectangle width="84" height="29" />
            </div>
            {/* <h5 className="font400 text-center colorBlack font_14px text-uppercase mblPllsSrvsPoints">
              <Rectangle width="48" height="49" />
            </h5> */}
          </div>
          <div className="clearfix"></div>
          <h3
            className="font400 colorBlack font_16px mblPllsSrvsContentTtl">
            <Rectangle width="100%" height="10" /> 
          </h3>
          <div className="clearfix"></div>
          {/* <h5 className="font400 colorGrey font_14px mblPllsSrvsContentText">
            <Rectangle width="297" height="36" />
          </h5> */}
          <div className="clearfix"></div>
          <div className="full_width mblPllsSrvsbtm">
            <div
              className="colorWhite font_14px fontExo font700 radius-6 "
            >
              <Rectangle width="94" height="40" />
            </div>
            {/* <div className="dskSessionClient">
              <div className="dskSessionClientItem">
                <Rectangle width="180" height="34" />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

const renderMobileCard = (props) => { 
  return (
    <div className="mblPllsSrvsCard mblRecentCard">
      <div className="full_width radius-6 mblPllsSrvs_link">
        <div className="full_width mblPllsSrvsPic">
          {/* <Rectangle width="100%" height="140" /> */}
          {/* <div
            className="mblDotsMenu mblDotsCircle mblDotsMenuPllsQzsCard popoverExtra"
          >
            <Rectangle width="30" height="30" />
          </div> */}

        </div>
        <div className="full_width mblPllsSrvsContent">
          <div className="full_width radius-6 mblPllsSrvsDrwBox">
            <div className="colorBlack font_14px font500 radius-6 mblMedWikiSpeacality">
              <Rectangle width="73" height="26" />
            </div>
          </div>
          <div className="clearfix"></div>
          <h3 className="font500 colorBlack font_18px mblPllsSrvsContentTtl">
            <Rectangle width="100%" height="5" />
          </h3>
          <div className="clearfix"></div>
          <div className="full_width mblPllsSrvsbtm">
            <div
              className="colorWhite font_14px fontExo font700 radius-6">
              <Rectangle width="72" height="31" />
            </div>
            {/* <div className="mblSessionClient">
              <div className="mblSessionClientItem">
                <Rectangle width="120" height="33" />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}  

const SpqLoader = (props) => (  
  isMobile ? renderMobileCard() : 
  renderDesktopCard()
)

export default SpqLoader;