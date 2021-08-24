import React from "react";
import Slider from "react-slick";
import begainArrow from "../../desktopImages/begainArrow.png";
import {
  setSpeciality,
  setDescription,
  specialityPopOver,
} from "../Common/Common.js";
import { isMobile } from "react-device-detect";
import Popover from "react-bootstrap/Popover";
import ReactHtmlParser from "react-html-parser";
import Share from "../Common/Share.jsx";

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

let def_index = undefined;
class QuizCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
    };
  }

  // componentDidMount(){
  //     let temp = this;
  //     $('body').click(function() {
  //       if(def_index != -1){
  //        def_index = -1;
  //         temp.refresh();
  //       }
  //     });
  // }

  quizCardMenuPopoverMobile = (val, ind) => {
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

  quizCardMenuPopoverDesktop = (val, array_index) => {
    return (
      <div className="dskDotsMenu dskDotsCircle mblDotsMenuPllsQzsCard">
        <div>
          <span className="dskDotsMenu-dots"></span>
          <span className="dskDotsMenu-dots"></span>
          <span className="dskDotsMenu-dots"></span>
        </div>
        <Popover
          id="popover-basic"
          placement="bottom-end"
          className="dskDotsMenuSettings popoverExtra"
        >
          <Popover.Content>
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
    //alert(JSON.stringify(props))
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
                {val.category == "quiz" ? "Quiz" : null}
              </span>
            </div>
            {this.props.deafult_popover_index == ind
              ? this.quizCardMenuPopoverDesktop(val, ind)
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
                {val.category == "quiz" ? "Quiz" : null}
              </span>
            </div>
            {this.props.deafult_popover_index == ind
              ? this.quizCardMenuPopoverMobile(val, ind)
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
export default QuizCard;
