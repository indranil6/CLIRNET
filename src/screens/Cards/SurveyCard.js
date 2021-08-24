import React from "react";
import Slider from "react-slick";
import begainArrow from "../../desktopImages/begainArrow.png";
import {
  setSpeciality,
  setDescription,
  specialityPopOver,
} from "../Common/Common.js";
import { isMobile } from "react-device-detect";
import { InlineShareButtons } from "sharethis-reactjs";
import Popover from "react-bootstrap/Popover";
import $ from "jquery";
import Share from "../Common/Share.jsx";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

const dskSessionClient = {
  dots: false,
  infinite: true,
  speed: 300,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  adaptiveHeight: true,
  autoplay: true,
  fade: true,
  cssEase: "linear",
};

var mblPllsSrvsClient = {
  dots: false,
  infinite: true,
  speed: 300,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  adaptiveHeight: true,
  autoplay: true,
  fade: true,
  cssEase: "linear",
};
// var deafult_popover_index=-1;
class SurveyCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
    };
  }

  //    componentDidMount(){
  //     let temp = this;
  //     $('body').click(function() {
  //       if(this.props.deafult_popover_index != -1){
  //         this.props.deafult_popover_index = -1;
  //         temp.refresh();
  //       }
  //     });
  // }
  surveyCardMenuPopoverMobile = (val, ind) => {
    return (
      <div className="mblDotsMenu mblDotsCircle mblDotsMenuPllsQzsCard">
        <div>
          <span className="mblDotsMenu-dots"></span>
          <span className="mblDotsMenu-dots"></span>
          <span className="mblDotsMenu-dots"></span>
        </div>
        <Popover
          id="popover-basic"
          placement="bottom-end"
          className="mblDotsMenuSettings popoverExtra"
        >
          <Popover.Content>
            {/* <InlineShareButtons
              config={{
                alignment: 'center',  // alignment of buttons (left, center, right)
                color: 'white',      // set the color of buttons (social, white)
                enabled: true,        // show/hide buttons (true, false)
                font_size: 16,        // font size for the buttons
                labels: 'null',        // button labels (cta, counts, null)
                language: 'en',       // which language to use (see LANGUAGES)
                networks: [           // which networks to include (see SHARING NETWORKS)
                  'whatsapp',
                  'messenger',
                  'facebook',
                  'twitter'
                ],
                padding: 0,          // padding within buttons (INTEGER)
                radius: 6,            // the corner radius on each button (INTEGER)
                show_total: false,
                size: 30,             // the size of each button (INTEGER)
                // OPTIONAL PARAMETERS
                url: val.deeplink, // (defaults to current url)
                image: 'https://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
                description: val.survey_description.substring(0, 100) + "...",       // (defaults to og:description or twitter:description)
                title: val.survey_title,            // (defaults to og:title or twitter:title)
                message: '',     // (only for email sharing)
                subject: '',  // (only for email sharing)
                username: 'Medwiki view' // (only for twitter sharing)
              }} /> */}
            <Share
              data={{
                title: val.survey_title,
                text: val.survey_description,
                url: val.deeplink,
              }}
            />
          </Popover.Content>
        </Popover>
      </div>
    );
  };

  surveyCardMenuPopoverDesktop = (val, array_index) => {
    return (
      <div className="dskDotsMenu dskDotsCircle mblDotsMenuPllsQzsCard">
        <div>
          <span className="dskDotsMenu-dots"></span>
          <span className="dskDotsMenu-dots"></span>
          <span className="dskDotsMenu-dots"></span>
        </div>
        <Popover
          placement="bottom-end"
          id="popover-basic"
          className="dskDotsMenuSettings popoverExtra"
        >
          <Popover.Content>
            {/* <a href="javascript:void(0)" className="dskDotsMenuSettingsIcon active" >
              <span>
                <img src={likeIcon} alt="Like"  className="translate_both dskGrLeftShareImg" />
                <img src={likeIconActive} alt="Like"  className="translate_both dskGrLeftShareImgActive" />
              </span>
                Like
            </a>
            <a href="javascript:void(0)" className="dskDotsMenuSettingsIcon">
              <span>
                <img src={vaultIcon} alt="Vault" className="translate_both dskGrLeftShareImg" />
                <img src={vaultIconActive} alt="Vault" className="translate_both dskGrLeftShareImgActive" />
              </span>
                Vault
            </a> */}
            {/* <InlineShareButtons
              config={{
                alignment: 'center',  // alignment of buttons (left, center, right)
                color: 'white',      // set the color of buttons (social, white)
                enabled: true,        // show/hide buttons (true, false)
                font_size: 16,        // font size for the buttons
                labels: 'null',        // button labels (cta, counts, null)
                language: 'en',       // which language to use (see LANGUAGES)
                networks: [           // which networks to include (see SHARING NETWORKS)
                  'whatsapp',
                  'messenger',
                  'facebook',
                  'twitter'
                ],
                padding: 0,          // padding within buttons (INTEGER)
                radius: 6,            // the corner radius on each button (INTEGER)
                show_total: false,
                size: 30,             // the size of each button (INTEGER)
                // OPTIONAL PARAMETERS
                url: val.deeplink, // (defaults to current url)
                image: 'https://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
                description: val.survey_description.substring(0, 100) + "...",       // (defaults to og:description or twitter:description)
                title: val.survey_title,            // (defaults to og:title or twitter:title)
                message: '',     // (only for email sharing)
                subject: '',  // (only for email sharing)
                username: 'Medwiki view' // (only for twitter sharing)
              }} /> */}
            {/* <a href="javascript:void(0)" className="dskDotsMenuNotRelevant">
              Not Relevant for me
          </a> */}
            <Share
              data={{
                title: val.survey_title,
                text: val.survey_description,
                url: val.deeplink,
              }}
            />
          </Popover.Content>
        </Popover>
      </div>
    );
  };

  refresh = () => {
    this.setState({ display: !this.state.display });
  };

  pointTextValidation(point) {
    if (point <= 1) {
      return " Point";
    } else {
      return " Points";
    }
  }
  renderDesktopCard(props) {
    let val = props.data;
    let ind = props.array_index;
    return (
      <div className="col-sm-6 mblPllsSrvsCard dskMasonryCard">
        <div className="full_width radius-6 mblPllsSrvs_link">
          <div className="full_width mblPllsSrvsPic">
            <div className="overlay"></div>
            {val.image == "" || val.image == null ? null : (
              <img src={val.image} className="object_fit_cover" />
            )}
            <div className="mblPllsSrvsTag">
              <span className="font500 colorWhite font_14px">
                {val.category == "survey" ? "Survey" : null}
              </span>
            </div>
            {this.props.deafult_popover_index == ind
              ? this.surveyCardMenuPopoverDesktop(val, ind)
              : null}
            {this.props.deafult_popover_index != ind ? (
              <div
                onClick={this.props.menu_click}
                className="dskDotsMenu dskDotsCircle mblDotsMenuPllsQzsCard popoverExtra"
              >
                <span className="dskDotsMenu-dots"></span>
                <span className="dskDotsMenu-dots"></span>
                <span className="dskDotsMenu-dots"></span>
              </div>
            ) : null}
          </div>
          <div className="full_width mblPllsSrvsContent">
            <div className="full_width radius-6 mblPllsSrvsDrwBox">
              {val.specialities_name == null ? null : (
                <div className="colorBlack font_12px font400 radius-6 mblMedWikiSpeacality">
                  {setSpeciality(val.specialities_name)}
                  {specialityPopOver(val.specialities_name)}
                </div>
              )}
              {val.point == "" || val.point == null ? null : (
                <h5 className="font400 text-center colorBlack font_14px text-uppercase mblPllsSrvsPoints">
                  <span className="font_24px font700">{val.point}</span> Points
                </h5>
              )}
            </div>
            <div className="clearfix"></div>
            {val.survey_title == "" || val.survey_title == null ? null : (
              <h3
                className="font400 colorBlack font_16px mblPllsSrvsContentTtl"
                onClick={this.props.click}
              >
                {val.survey_title}
              </h3>
            )}
            <div className="clearfix"></div>
            <h5 className="font400 colorGrey font_14px mblPllsSrvsContentText">
              {ReactHtmlParser(setDescription(val.survey_description))}
            </h5>
            <div className="clearfix"></div>
            <div className="full_width mblPllsSrvsbtm">
              <div
                className="colorWhite font_14px fontExo font700 radius-6 mblPllsSrvsbtm_a"
                onClick={this.props.click}
              >
                {this.props.status == "completed" ? "Review" : "Begin"}
                <img src={begainArrow} alt="Begain" />
              </div>
              <Slider {...dskSessionClient} className="dskSessionClient">
                {val.sponsor_logo !== null || val.sponsor_logo == ""
                  ? val.sponsor_logo.split(",").map((logo, ind) => (
                      <div className="dskSessionClientItem">
                        <img src={logo} />
                      </div>
                    ))
                  : null}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderMobileCard(props) {
    let val = props.data;
    let ind = this.props.array_index;
    return (
      <div className="mblPllsSrvsCard mblRecentCard">
        <div className="full_width radius-6 mblPllsSrvs_link">
          <div className="full_width mblPllsSrvsPic">
            <div className="overlay"></div>
            {val.image == "" || val.image == null ? null : (
              <img src={val.image} className="object_fit_cover" />
            )}
            <div className="mblPllsSrvsTag">
              <span className="font600 colorWhite font_16px">
                {val.category == "survey" ? "Survey" : null}
              </span>
            </div>
            {this.props.deafult_popover_index == ind
              ? this.surveyCardMenuPopoverMobile(val, ind)
              : null}
            {this.props.deafult_popover_index != ind ? (
              <div
                onClick={this.props.menu_click}
                className="mblDotsMenu mblDotsCircle mblDotsMenuPllsQzsCard popoverExtra"
              >
                <span className="mblDotsMenu-dots"></span>
                <span className="mblDotsMenu-dots"></span>
                <span className="mblDotsMenu-dots"></span>
              </div>
            ) : null}
          </div>
          <div className="full_width mblPllsSrvsContent">
            <div className="full_width radius-6 mblPllsSrvsDrwBox">
              {val.specialities_name === null ||
              val.specialities_name === "" ? null : (
                <div className="colorBlack font_14px font500 radius-6 mblMedWikiSpeacality">
                  {setSpeciality(val.specialities_name)}
                  {specialityPopOver(val.specialities_name)}
                </div>
              )}
              <h5 className="font400 text-center colorBlack font_14px text-uppercase mblPllsSrvsPoints">
                <span className="font_30px font900">{val.point}</span>{" "}
                {this.pointTextValidation(val.point)}
              </h5>
            </div>

            <div className="clearfix"></div>
            {val.survey_title == "" || val.survey_title == null ? null : (
              <h3
                className="font500 colorBlack font_18px mblPllsSrvsContentTtl"
                onClick={this.props.click}
              >
                {val.survey_title}
              </h3>
            )}
            <div className="clearfix"></div>
            <h5 className="font400 colorGrey font_14px mblPllsSrvsContentText">
              {ReactHtmlParser(setDescription(val.survey_description))}
            </h5>

            <div className="clearfix"></div>
            <div className="full_width mblPllsSrvsbtm">
              <div
                className="colorWhite font_14px fontExo font700 radius-6 mblPllsSrvsbtm_a"
                onClick={this.props.click}
              >
                {this.props.status == "completed" ? "Review" : "Begin"}
                <img src={begainArrow} alt="Begain" />
              </div>
              <Slider {...mblPllsSrvsClient} className="mblSessionClient">
                {val.sponsor_logo !== null || val.sponsor_logo == ""
                  ? val.sponsor_logo.split(",").map((val, ind) => (
                      <div className="mblSessionClientItem">
                        <img src={val} />
                      </div>
                    ))
                  : null}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <>
        {isMobile
          ? this.renderMobileCard(this.props)
          : this.renderDesktopCard(this.props)}
      </>
    );
  }
}
export default SurveyCard;
