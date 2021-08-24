import React from "react";
import Rectangle from "./Rectangle";
import { isMobile } from 'react-device-detect';

const returnDesktopCard = () => (
  <div className="full_width mblMedWikiCard dskTrendingMedwikiCard">
    <div className="full_width mblMedWikiCard_link">
      <div className="row align-items-center">
        <div className="mblMedWikiPic">
          <div className="mblMedWikiPicGraphic" style={{ "background-color": "#2c3e50" }}></div>
          <div className="full_width mblMedWikiPicIn">
            <Rectangle width="100%" height="100%" />
            <div className="overlay"></div>
          </div>
        </div>
        <div className="mblMedWikiContent">
          <div className="full_width mblMedWikiContentTop">
            <div className="colorBlack font_12px font400 radius-6 mblMedWikiSpeacality">
              <Rectangle width="100" height="25" />
            </div>
            <div className="dskDotsMenu mblDotsMenuMedWikiCard popoverExtra">
              <Rectangle width="22" height="22" />
            </div>
          </div>
          <div className="clearfix"></div>
          <h4 className="font400 colorBlack font_14px mblMedWikiContentTtl"><Rectangle width="160" height="10" /></h4>
        </div>
      </div>
    </div>
  </div>
)
const returnMobileCard = () => (
  <div className="mblMedWikiCard">
    <div className="full_width radius-6 mblMedWikiCard_link">
      <div className="row align-items-center">
        <div className="mblMedWikiPic">
          <div className="radius-6 mblMedWikiPicGraphic" style={{ "background-color": "#bdc3c7" }}></div>

          <div className="full_width mblMedWikiPicIn">
            <Rectangle width="86" height="100" />
            <div className="overlay"></div>
          </div>
        </div>
        <div className="mblMedWikiContent">
          <div className="full_width mblMedWikiContentTop">
            <div className="colorBlack font_14px font500 radius-6 mblMedWikiSpeacality">
              <Rectangle width="98" height="26" />
            </div>
            
          </div>
          <div className="clearfix"></div>
          <h4 className="font500 colorBlack font_16px mblMedWikiContentTtl">
            <Rectangle width="80%" height="10" />
          </h4>
        </div>
      </div>
    </div>
  </div>
)
const RelatedMedwikiLoader = (props) => (
  isMobile ? returnMobileCard() : returnDesktopCard()
)

export default RelatedMedwikiLoader;