import React from "react";
import announcementBg from "../../mobImages/announcementBg.png";
import announcmentIcon from "../../mobImages/announcmentIcon.png";
import announcementClose from "../../mobImages/announcementClose.png";
import { reactLocalStorage } from "reactjs-localstorage";
import AppConfig from "../config/config.js";
import $ from "jquery";
import AnnouncementLoader from "../LoadingPlaceholders/AnnouncementLoader.jsx";

const url = AppConfig.apiLoc;
var announcementId = undefined;
var announcementTitile = undefined;
var announcementDescription = undefined;
var announcementUrl = undefined;
var announcementUrlType = undefined;

let isApiCallDone = false;
class Announcement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
    };
    announcementId = undefined;
    announcementTitile = undefined;
    announcementDescription = undefined;
    announcementUrl = undefined;
    announcementUrlType = undefined;

    isApiCallDone = false;
  }

  closeAnnouncementClick() {
    $("#announcement-section").slideUp();
    this.reportAnnouncementClose();
  }

  onAnnouncementClick() {
    switch (announcementUrlType) {
      case "blank":
        this.openurl(announcementUrl, "_blank");
        break;
      case "self":
        this.openurl(announcementUrl, "_self");
        break;
      default:
        break;
    }
  }

  openurl(url, type) {
    var win = window.open(url, type);
    if (url != undefined || url != "") {
      if (win) {
        win.focus();
      } else {
        alert("Please allow popups for this website");
      }
    }
  }

  getAnnouncement = () => {
    fetch(url + "dashboard/announcement", {
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
          announcementId = responseData.id;
          announcementTitile = responseData.title;
          announcementDescription = responseData.text;
          announcementUrl = responseData.url;
          announcementUrlType = responseData.url_type;
          $("#announcement-section").slideDown();
          this.refresh();
        }
      })
      .catch((error) => {
        isApiCallDone = true;
        //console.log("Error"+error);
      });
  };

  reportAnnouncementClose = () => {
    let jsonData = {
      type_id: announcementId,
    };
    fetch(url + "dashboard/announcementClose", {
      method: "POST",
      headers: {
        Authorization: reactLocalStorage.get(
          "@ClirnetStore:refreshToken",
          true
        ),
        version: "rjsw 1.1.1",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let status_code = responseJson.status_code;
        if (status_code == 200) {
          this.getAnnouncement();
        } else {
          $("#announcement-section").slideDown();
        }
      })
      .catch((error) => {
        //console.log("Error"+error);
      });
  };

  refresh = () => {
    this.setState({ display: !this.state.display });
  };

  componentDidMount() {
    announcementId = undefined;
    announcementTitile = undefined;
    announcementDescription = undefined;
    announcementUrl = undefined;
    announcementUrlType = undefined;
    this.getAnnouncement();
  }

  render() {
    return (
      <>
        {!announcementDescription ? (
          <>{isApiCallDone ? null : <AnnouncementLoader />}</>
        ) : (
          <div
            className="full_width text-left dskAnnouncment"
            id="announcement-section"
          >
            <div className="full_width radius-6 dskAnnouncmentIn">
              <div className="radius-100 dskAnnouncmentIcon">
                <img
                  src={announcmentIcon}
                  alt="announcement"
                  className="translate_both"
                />
              </div>
              <img
                src={announcementBg}
                alt="announcement"
                className="translate_top dskAnnouncmentBigMike"
              />
              <div
                className="radius-100 dskAnnouncmentClose"
                style={{ cursor: "pointer" }}
                onClick={this.closeAnnouncementClick.bind(this)}
              >
                <img src={announcementClose} className="translate_both" />
              </div>
              <div
                className="full_width colorWhite font_14px dskAnnouncmentContent"
                onClick={() => {
                  this.onAnnouncementClick();
                }}
                style={{ cursor: "pointer" }}
              >
                {/* {(announcementTitile === undefined || announcementTitile === null || announcementTitile === '' )?null:
                 <h3 className="font600 font_16px colorWhite" >{announcementTitile}</h3>
                }  */}
                <div class="clearfix"></div>
                {announcementDescription === undefined ||
                announcementDescription === null ||
                announcementDescription === "" ? null : (
                  <p style={{ cursor: "pointer" }}>{announcementDescription}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
export default Announcement;
