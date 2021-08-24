import React from "react";
import $ from "jquery";
import { reactLocalStorage } from "reactjs-localstorage";
import { setSpeciality, setDescription } from "../Common/Common.js";
import Slider from "react-slick";
import AppConfig from "../config/config.js";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import medwikiicon from "../../images/medWikiBg.png";
import videoIcon from "../../images/playBTn.png";
import Share from "../Common/Share.jsx";

const url = AppConfig.apiLoc;
var image_url = [];
var value = "";

class SpqSmallCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  first_spec(spec) {
    var res = spec.split(",");
    return res[0];
  }

  redirect_to_compendium_detail(id, nameclass = "") {
    if (window.location.href.includes("/SpqDetailsRelated")) {
      this.props.history.push({
        pathname: "/SpqDetails/" + id + "",
      });
    } else {
      this.props.history.push({ 
        pathname: "/SpqDetailsRelated/" + id + "",
      });
    }
  }

  popover_view_spec(val) {
    let tempdata;
    if (val) {
      tempdata = val.substring(val.indexOf(",") + 1);
    }
    let popover = (
      <Popover id="popover-basic" className="specialty_popOver">
        <Popover.Content className="font_12px">
          {tempdata ? tempdata.replace(/,/g, ", ") : null}
        </Popover.Content>
      </Popover>
    );
    return (
      <>
        <OverlayTrigger
          placement="right"
          rootClose="true"
          rootCloseEvent="click"
          trigger="click"
          delay={{ show: 50, hide: 50 }}
          overlay={popover}
        >
          <span className="mblMedWikiSpeacalityDots">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </OverlayTrigger>
      </>
    );
  }

  popover_view(val, index) {
    return (
      <>
        <div className="dskDotsMenu dskPollsCardDots dskDotsMenuMedWikiCard">
          <div>
            <span className="dskDotsMenu-dots"></span>
            <span className="dskDotsMenu-dots"></span>
            <span className="dskDotsMenu-dots"></span>
          </div>

          <Popover
            placement="bottom-end"
            id={"popover-basic" + index}
            className="dskDotsMenuSettings spq_extra_class"
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
      </>
    );
  }

  onvaultPressMedwiki = (item_id, type, array_index, flag) => {
    var thisobjval = this;
    let formdatam = { postid: item_id, type: type };
    fetch(url + "knwlg/vault_switching", {
      method: "POST",
      headers: {
        Authorization: reactLocalStorage.get(
          "@ClirnetStore:refreshToken",
          true
        ),
        version: "rjsw 1.1.1",
      },
      body: JSON.stringify(formdatam),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //medwiki_data[array_index].vault = responseJson.data;

        if (responseJson.data == 1) {
          reactLocalStorage.set(
            "@ClirnetStore:vault_count",
            parseInt(reactLocalStorage.get("@ClirnetStore:vault_count", 0)) + 1
          );
          this.props.onChangeButton(array_index, responseJson.data, "vault");
        }

        if (responseJson.data == 0) {
          reactLocalStorage.set(
            "@ClirnetStore:vault_count",
            parseInt(reactLocalStorage.get("@ClirnetStore:vault_count", 0)) - 1
          );
          this.props.onChangeButton(array_index, responseJson.data, "vault");
        }
      })
      .catch((error) => {});
  };

  onLikeBtnPressmedwiki = (item_id, type, array_index) => {
    let formdatam = { type_id: item_id, type: type };
    fetch(url + "knwlg/save_like", {
      method: "POST",
      headers: {
        Authorization: reactLocalStorage.get(
          "@ClirnetStore:refreshToken",
          true
        ),
        version: "rjsw 1.1.1",
      },
      body: JSON.stringify(formdatam),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.data.like != true) {
          this.props.onChangeButton(
            array_index,
            responseJson.data.like,
            "like"
          );
        } else {
          this.props.onChangeButton(
            array_index,
            responseJson.data.like,
            "like"
          );
        }
      })
      .catch((error) => {});
  };

  popover_view_spec_mobile(val) {
    let popover = (
      <Popover id="popover-basic">
        <Popover.Content className="font_12px specialty_popOver">
          {val}
        </Popover.Content>
      </Popover>
    );
    return (
      <>
        <OverlayTrigger
          placement="right"
          rootClose="true"
          rootCloseEvent="click"
          trigger="click"
          delay={{ show: 50, hide: 50 }}
          overlay={popover}
        >
          <span className="mblMedWikiSpeacalityDots">
            <span className="mblDotsMenu-dots"></span>
            <span className="mblDotsMenu-dots"></span>
            <span className="mblDotsMenu-dots"></span>
          </span>
        </OverlayTrigger>
      </>
    );
  }

  popover_view_mobile(val, index) {
    return (
      <>
        <div className="mblDotsMenu mblDotsMenuMedWikiCard">
          <div>
            <span className="mblDotsMenu-dots"></span>
            <span className="mblDotsMenu-dots"></span>
            <span className="mblDotsMenu-dots"></span>
          </div>
          <Popover
            placement="bottom-end"
            id={"popover-basic" + index}
            className="mblDotsMenuSettings spq_extra_class"
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
      </>
    );
  }

  popover_view_key(index) {
    this.props.onChangeButton(index, 0, "popover");
  }

  render() {
    var dskSessionClient = {
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
      is_loader: true,
    };

    var mblMedWikiClient = {
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

    return (
      <>
        {this.props.mobile_device == true ? (
          <div
            className={
              "mblMedWikiCard mblRecentCard " + this.props.custom_class
            }
          >
            <div className="full_width radius-6 mblMedWikiCard_link">
              <div className="row align-items-center">
                <div className="mblMedWikiPic">
                  <div
                    className="radius-6 mblMedWikiPicGraphic"
                    style={{ "background-color": this.props.card_data.color }}
                  ></div>
                  <div className="full_width mblMedWikiPicIn">
                    {this.props.card_data.image ? (
                      <img
                        src={this.props.card_data.image}
                        className="object_fit_cover"
                      />
                    ) :<img className="object_fit_cover" src={medwikiicon} />} 
                    <div className="overlay"></div>
                  </div>
                </div>
                <div className="mblMedWikiContent">
                  <div className="full_width mblMedWikiContentTop">
                    <div className="colorBlack font_14px font500 radius-6 mblMedWikiSpeacality">
                      {this.props.card_data.specialities_name.split(",")[0]}
                      {this.props.card_data.specialities_name.split(",").length > 1
                        ? this.popover_view_spec_mobile(
                            this.props.card_data.specialities_name
                          )
                        : null}
                    </div>

                    {this.props.clicked_index == this.props.elem_key
                      ? this.popover_view_mobile(
                          this.props.card_data,
                          this.props.elem_key
                        )
                      : null}
                    {this.props.clicked_index != this.props.elem_key ? (
                      <div
                        onClick={() => {
                          this.popover_view_key(this.props.elem_key);
                        }}
                        className={
                          "mblDotsMenu mblDotsMenuMedWikiCard spq_extra_class " +
                          this.props.elem_key +
                          "_dynamicclass"
                        }
                      >
                        <span className="mblDotsMenu-dots"></span>
                        <span className="mblDotsMenu-dots"></span>
                        <span className="mblDotsMenu-dots"></span>
                      </div>
                    ) : null}
                  </div>
                  <div className="clearfix"></div>
                  <h4 className="font500 colorBlack font_16px mblMedWikiContentTtl">
                    {setDescription(this.props.card_data.survey_title)}...
                    <a
                      className="font_14px font600"
                      href="javascript:void(0);"
                      onClick={() => {
                        this.redirect_to_compendium_detail(
                          this.props.card_data.survey_id,
                          this.props.custom_class
                        );
                      }}
                    >
                      &nbsp; View More
                    </a>
                  </h4>
                  <div className="clearfix"></div>
                  <Slider
                    {...mblMedWikiClient}
                    className="mblSessionClient mblMedWikiClient"
                  >
                    {this.props.card_data.sponsor_logo !== null ||
                    this.props.card_data.sponsor_logo == ""
                      ? this.props.card_data.sponsor_logo
                          .split(",")
                          .map((val, ind) => (
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
        ) : (
          <div
            className={
              this.props.elem_key > 1
                ? "col-sm-6 mblMedWikiCard dskMasonryCard " +
                  this.props.custom_class +
                  ""
                : "col-sm-6 mblMedWikiCard dskMasonryCard " +
                  this.props.custom_class +
                  ""
            }
          >
            <div className="full_width radius-6 mblMedWikiCard_link">
              <div className="row align-items-center">
                <div className="mblMedWikiPic">
                  <div
                    className="mblMedWikiPicGraphic"
                    style={{ "background-color": this.props.card_data.color }}
                  ></div>
                  <div className="full_width mblMedWikiPicIn">
                    {this.props.card_data.image ? (
                      <img
                        src={this.props.card_data.image}
                        className="object_fit_cover"
                      />
                    ) :  <img className="object_fit_cover" src={medwikiicon} />}
                    <div className="overlay"></div>
                  </div>
                </div>
                <div className="mblMedWikiContent">
                  <div className="full_width mblMedWikiContentTop">
                    <div className="colorBlack font_12px font400 radius-6 mblMedWikiSpeacality">
                      {this.props.card_data.specialities_name.split(",")[0]}
                      {this.props.card_data.specialities_name.split(",").length > 1
                        ? this.popover_view_spec(
                            this.props.card_data.specialities_name
                          )
                        : null}
                    </div>

                    {this.props.clicked_index == this.props.elem_key
                      ? this.popover_view(
                          this.props.card_data,
                          this.props.elem_key
                        )
                      : null}
                    {this.props.clicked_index != this.props.elem_key ? (
                      <div
                        onClick={() => {
                          this.popover_view_key(this.props.elem_key);
                        }}
                        data-toggle="popover"
                        data-trigger="focus"
                        className={
                          "dskDotsMenu dskPollsCardDots spq_extra_class dskDotsMenuMedWikiCard " +
                          this.props.elem_key +
                          "_dynamicclass"
                        }
                      >
                        <span className="dskDotsMenu-dots"></span>
                        <span className="dskDotsMenu-dots"></span>
                        <span className="dskDotsMenu-dots"></span>
                      </div>
                    ) : null}
                  </div>
                  <div className="clearfix"></div>
                  <h4 className="font400 colorBlack font_14px mblMedWikiContentTtl">
                    {setDescription(this.props.card_data.survey_title)}
                    <a
                      className="font_14px font600"
                      href="javascript:void(0);"
                      onClick={() => {
                        this.redirect_to_compendium_detail(
                          this.props.card_data.survey_id,
                          this.props.custom_class
                        );
                      }}
                    >
                      &nbsp; View More
                    </a>
                  </h4>
                  <div className="clearfix"></div>
                  <Slider
                    {...dskSessionClient}
                    className="dskSessionClient mblMedWikiClient"
                  >
                    {this.props.card_data.sponsor_logo !== null ||
                    this.props.card_data.sponsor_logo == ""
                      ? this.props.card_data.sponsor_logo
                          .split(",")
                          .map((val, ind) => (
                            <div className="dskSessionClientItem">
                              <img src={val} />
                            </div>
                          )) 
                      : null}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
export default SpqSmallCard;
