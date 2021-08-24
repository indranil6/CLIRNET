import React from "react";
import $ from "jquery";
import Loader from "react-loader-spinner";
import { reactLocalStorage } from "reactjs-localstorage";
import AppConfig from "../config/config.js";
import Header from "./Header";
import Footer from "./Footer";
import { isMobile } from "react-device-detect";
import Masonry from "react-masonry-component";
import { Helmet } from "react-helmet";
import Medwikicard from "../Cards/Medwikicard.js";
import ArchivedVideoCard from "../Cards/ArchivedVideoCard.js";
import Banner from "../mainscreens/Banner";
import SpqLoader from "../LoadingPlaceholders/SpqLoader.jsx";
import angaleWhite from "../../desktopImages/angaleWhite.png";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import likeIcon from "../../desktopImages/like-black.png";
import likeIconActive from "../../desktopImages/like-active.png";
import vaultIcon from "../../desktopImages/vault-black.png";
import vaultIconActive from "../../desktopImages/vault-active.png";
import { setSpeciality, setDescription } from "../Common/Common.js";
import Share from "../Common/Share.jsx";
const gtag = window.gtag;
var var_popover_key = -1;
//new card
var vault = [];
const url = AppConfig.apiLoc;
const pageNames = "Vault";
let deafult_popover_index = -1;
let isApiCallDone = false;

const masonryOptions = {
  transitionDuration: 0,
};

var grandround_data = [];
class Vault extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phone_no: "",
      err_msg: "",
      otp: "",
      is_loader: true,
      compendium_listing_upcoming: [],
      session_listing_reserved: [],
      session_listing_cme: [],
      viewrefresh: false,
      banner_display: false,
      grandround_data: [],
      other_on: 0,
      vault: [],
    };
    isApiCallDone = false;

    //login check
    this.display_banner = this.display_banner.bind(this);
  }

  display_banner(datam) {
    this.setState({ banner_display: true });

    //alert(datam)
  }

  componentWillUnmount() {
    isApiCallDone = false;
    $("html, body").css({
      overflow: "auto",
      height: "auto",
    });
  }

  setJqueryOnCard(){
    $(".dskGrMstrDocRow").each(function () {
      if ($(this).children(".dskGrMstrDocBox").length > 1) {
        $(".dskGrMstrDocBox").addClass("dskGrMstrDocPopShow");
      } else {
        $(this)
          .children(".dskGrMstrDocBox")
          .removeClass("dskGrMstrDocPopShow");
      }
    });

    if (isMobile) {
      $(document).on(
        "click",
        ".dskGrMstrDocPopShow .dskGrMstrDocBoxIn",
        function () {
          $(".dskGrMstrDocBox").removeClass("dskGrMstrDocPopShowActive");
          $(this).parent().addClass("dskGrMstrDocPopShowActive");
          $(".dskGrMstrDocProfile")
            .removeClass("dskGrMstrDocProfileShow")
            .fadeOut(300);
          $(this)
            .find(".dskGrMstrDocProfile")
            .addClass("dskGrMstrDocProfileShow")
            .fadeIn(300);
        }
      );
      $(document).on(
        "click",
        ".dskGrMstrDocPopShowActive.dskGrMstrDocPopShow .dskGrMstrDocBoxIn",
        function () {
          $(this).parent().removeClass("dskGrMstrDocPopShowActive");
          $(this)
            .find(".dskGrMstrDocProfile")
            .removeClass("dskGrMstrDocProfileShow")
            .fadeOut(300);
        }
      );
    } else {
      $(document)
        .on(
          "mouseenter",
          ".dskGrMstrDocPopShow .dskGrMstrDocBoxIn",
          function () {
            $(this)
              .find(".dskGrMstrDocProfile")
              .addClass("dskGrMstrDocProfileShow")
              .fadeIn(300);
            $(this).parent().addClass("dskGrMstrDocPopShowActive");
          }
        )
        .on(
          "mouseleave",
          ".dskGrMstrDocPopShow .dskGrMstrDocBoxIn",
          function () {
            $(this)
              .find(".dskGrMstrDocProfile")
              .removeClass("dskGrMstrDocProfileShow")
              .fadeOut(300);
            $(this).parent().removeClass("dskGrMstrDocPopShowActive");
          }
        );
    }

    $(".dskGrMstrDocRow").each(function (index) {
      let countcir = $(this).find(".dskGrMstrDocProfile").length;

      $(this)
        .find(".dskGrMstrDocBox:nth-child(5)")
        .find(".dskGrMstrDocProfile")
        .remove();

      $(this)
        .find(".dskGrMstrDocBox:nth-child(5)")
        .find(".dskGrMstrDocBoxInPic")
        .append(
          "<div class='overlay'></div><span id='view-master-doctor'  class='dskGrMstrDocCount plus_icon' style='cursor: pointer;'>+" +
          (countcir - 4) +
          "</span>"
        );
      // this.refresh()
    });

    //$(".dskGrMstrDocBox:nth-child(5)").find(".dskGrMstrDocProfile").remove();
    //$(".dskGrMstrDocBox:nth-child(5)").find(".dskGrMstrDocBoxInPic").append("<div  class='overlay'></div><span  class='dskGrMstrDocCount plus_icon'>+"+Math.abs(extra_val)+"</span>");
    var that = this;
    // $(".plus_icon").click(function () {
    //   that.setState({ showModal_doc: true });
    // });

  }

  //redire to medwiki detail
  redirect_to_compendium_detail(id) {
    this.props.history.push({
      pathname: "/Feeddetail/" + id + "",
    });
  }

  //redire to video detail
  redirect_to_video_detail(type, id) {
    switch (type) {
      case "comp":
        this.props.history.push({
          pathname: "/Feeddetail/" + id + "",
        });
        break;
      case "video_archive":
        this.props.history.push({
          pathname: "/ArchivedVideo/" + id + "",
        });
        break;
      default:
        console.log("problem happen on redirection");
        break;
    }
  }

  //remove from vault
  onvaultPress = (item_id, type, array_index, extra) => {
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
        // alert()
        //this.renderagain();

        $("#vault_item" + array_index + "").remove();

        reactLocalStorage.set(
          "@ClirnetStore:vault_count",
          parseInt(reactLocalStorage.get("@ClirnetStore:vault_count", true) - 1)
        );
        thisobjval.setState({ viewrefresh: !thisobjval.state.viewrefresh });

        // location.reload();
      })
      .catch((error) => {});
  };

  popover_view_key(index) {
    var_popover_key = index;
    this.setState({ rerender: !this.state.rerender });

    //$("#overlaydiv_"+index+"").click();

    //$('#element').popover('show');
  }

  componentDidMount() {
    var_popover_key = -1;
    window.document.title = "CLIRNET - Vault";

    gtag("config", AppConfig.gtag_measure_id, {
      page_title: window.document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });

    //$(".survey_mobile").addClass("active");

    deafult_popover_index = -1;
    var that = this;
    $(document).on("click", function (e) {
      //popover dissapear func
      let ggg = $(e.target).parents(".tanar").length;
      if (ggg == 0 && !$(e.target).hasClass("tanar")) {
        deafult_popover_index = -1;
        that.refresh();
      }
    });

    window.scrollTo(0, 0);
    var tempobj = this;

    vault = [];

    //fetch valut of a user
    fetch(url + "knwlg/myvault", {
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
        if (responseJson.status_code == "401") {
          this.props.history.push({
            pathname: `/`,
          });
        }

        responseJson.data.map((r) => {
          this.setState({ is_loader: false });

          vault.push(r);
        });
        const context = this;
        setTimeout(function () {
          context.setJqueryOnCard()
        }, 300);
        this.setState({ vault: vault });
      })
      .catch((error) => {
        this.setState({ is_loader: false });
      });

    if (isMobile) {
      var type_id_val = 2;
    } else {
      var type_id_val = 1;
    }
  }

  renderagain() {
    var tempobj = this;
    vault = [];

    fetch(url + "knwlg/myvault", {
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
        
        isApiCallDone = true;
        if (responseJson.status_code == "401") {
          this.props.history.push({
            pathname: `/`,
          });
        }

        responseJson.data.map((r) => {
          this.setState({ is_loader: false });

          vault.push(r);
        });


        this.setState({ vault: vault });
      })
      .catch((error) => {
        isApiCallDone = true;
        this.setState({ is_loader: false });
      });
  }

  refresh() {
    this.setState({ display: !this.state.display });
  }

  handle_change(index, value, type) {
    let temp = this;
    let tempData = [];
    tempData = this.state.vault;
    if (type == "vault") {
      if (value == 1) {
        tempData[index].vault = value;
      } else {
        tempData.splice(index, 1);
      }
      this.setState({ vault: tempData });
      // temp.refresh()
    }
    if (type == "like") {
      if (value == 0) {
        tempData[index].myrating = false;
        tempData[index].rating = parseInt(tempData[index].rating) - 1;
        temp.setState({ vault: tempData });
      } else {
        tempData[index].myrating = true;
        tempData[index].rating =
          parseInt(tempData[index].rating) + parseInt(value);
        temp.setState({ vault: tempData });
      }
    }
    if (type == "popover") {
      deafult_popover_index = index;
      this.setState({ display: !this.state.display });
    }
  }

  redirectToArchiveDetail = (id) => {
    this.props.history.push({
      pathname: "/ArchivedVideo/" + id + "",
    });
  };

  onMenuClick(ind) {
    deafult_popover_index = ind;
    this.refresh();
  }
  first_spec(spec) {
    var res = spec.split(",");

    return res[0];
  }

  redirectToGrDetail = (id) => {
    if (isMobile) {
      this.props.history.push({
        pathname: "/GrandRoundsMobile/" + id + "",
      });
    } else {
      this.props.history.push({
        pathname: "/GrandRoundsDesktop/" + id + "",
      });
    }
  }; 

  onLikeBtnPress = (item_id, type, array_index) => {
    let grandround_data = [];
     grandround_data = this.state.vault;
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
          grandround_data[array_index].myrating = false;
          grandround_data[array_index].rating =
            parseInt(grandround_data[array_index].rating) - 1;
        } else {
          grandround_data[array_index].myrating = true;
          grandround_data[array_index].rating =
            parseInt(grandround_data[array_index].rating) +
            parseInt(responseJson.data.rating);
        }

        console.log(grandround_data);

        this.setState({ vault: grandround_data });
      })
      .catch((error) => {});
  };

  onvaultPressG = (item_id, type, array_index, flag) => {
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
        grandround_data[array_index].vault = responseJson.data;

        if (responseJson.data == 0) {
          reactLocalStorage.set(
            "@ClirnetStore:vault_count",
            parseInt(reactLocalStorage.get("@ClirnetStore:vault_count", true)) -
              1
          );
        }

        if (responseJson.data == 1) {
          reactLocalStorage.set(
            "@ClirnetStore:vault_count",
            parseInt(reactLocalStorage.get("@ClirnetStore:vault_count", true)) +
              1
          );
        }

        this.setState({ grandround_data: grandround_data });
      })
      .catch((error) => {});
  };

  popover_view_spec(val) {
    let tempdata;
    if (val) {
      tempdata = val.substring(val.indexOf(",") + 1);
    }
    let popover = (
      <Popover id="popover-basic">
        <Popover.Content className="font_12px specialty_popOver">
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
        <div
          className="dskDotsMenu dskDotsCircle dskDotsMenuMedWikiCard"
          data-toggle="popover"
          data-trigger="focus"
        >
          <div>
            <span className="dskDotsMenu-dots"></span>
            <span className="dskDotsMenu-dots"></span>
            <span className="dskDotsMenu-dots"></span>
          </div>
          <Popover
            isOpen={true}
            placement="bottom-end"
            id={"popover-basic-" + index}
            className="dskDotsMenuSettings tanar"
          >
            <Popover.Content>
              <a
                href="javascript:void(0)"
                onClick={() => this.onLikeBtnPress(val.type_id, "gr", index)}
                className={
                  val.myrating == true
                    ? "dskDotsMenuSettingsIcon active"
                    : "dskDotsMenuSettingsIcon"
                }
              >
                <span>
                  <img
                    src={likeIcon}
                    alt="Like"
                    className="translate_both dskGrLeftShareImg"
                  />
                  <img
                    src={likeIconActive}
                    alt="Like"
                    className="translate_both dskGrLeftShareImgActive"
                  />
                </span>
                Like
              </a>

              {val.vault == 0 ? (
                <a
                  href="javascript:void(0)"
                  onClick={() => this.onvaultPress(val.type_id, "gr", index, 1)}
                  className={
                    val.vault == 0
                      ? "dskDotsMenuSettingsIcon "
                      : "dskDotsMenuSettingsIcon active"
                  }
                >
                  <span>
                    <img
                      src={vaultIcon}
                      alt="Vault"
                      className="translate_both dskGrLeftShareImg"
                    />
                    <img
                      src={vaultIconActive}
                      alt="Vault"
                      className="translate_both dskGrLeftShareImgActive"
                    />
                  </span>
                  Vault
                </a>
              ) : (
                <a
                  href="javascript:void(0)"
                  onClick={() => this.onvaultPress(val.type_id, "gr", index, 0)}
                  className={
                    val.vault == 0
                      ? "dskDotsMenuSettingsIcon "
                      : "dskDotsMenuSettingsIcon active"
                  }
                >
                  <span>
                    <img
                      src={vaultIcon}
                      alt="Vault"
                      className="translate_both dskGrLeftShareImg"
                    />
                    <img
                      src={vaultIconActive}
                      alt="Vault"
                      className="translate_both dskGrLeftShareImgActive"
                    />
                  </span>
                  Vault
                </a>
              )}

              <Share
                data={{
                  title: val.title,
                  text: val.description.substring(0, 100) + "...",
                  url: val.deeplink,
                }}
              />

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
                  description: val.description.substring(0, 100) + "...",       // (defaults to og:description or twitter:description)
                  title: val.title,            // (defaults to og:title or twitter:title)
                  message: '',     // (only for email sharing)
                  subject: '',  // (only for email sharing)
                  username: 'Medwiki view' // (only for twitter sharing)
                }}
              /> */}
              {/* <a href="javascript:void(0)" className="dskDotsMenuNotRelevant">
					Not Relevant for me
				</a> */}
            </Popover.Content>
          </Popover>
        </div>
      </>
    );
  }

  popover_view_mob(val, index) {
    return (
      <>
        <div className="mblDotsMenu mblDotsCircle mblDotsMenuGrCard">
          <div>
            <span className="mblDotsMenu-dots"></span>
            <span className="mblDotsMenu-dots"></span>
            <span className="mblDotsMenu-dots"></span>
          </div>
          <Popover
            placement="bottom-end"
            id={"popover-basic" + index}
            className="mblDotsMenuSettings tanar"
          >
            <Popover.Content>
              <a
                href="javascript:void(0)"
                onClick={() => this.onLikeBtnPress(val.type_id, "gr", index)}
                className={
                  val.myrating == true
                    ? "mblDotsMenuSettingsIcon active"
                    : "mblDotsMenuSettingsIcon"
                }
              >
                <span>
                  <img
                    src={likeIcon}
                    alt="Like"
                    className="translate_both mblGrLeftShareImg"
                  />
                  <img
                    src={likeIconActive}
                    alt="Like"
                    className="translate_both mblGrLeftShareImgActive"
                  />
                </span>
                Like
              </a>

              {val.vault == 0 ? (
                <a
                  href="javascript:void(0)"
                  onClick={() => this.onvaultPress(val.type_id, "gr", index, 1)}
                  className={
                    val.vault == 0
                      ? "mblDotsMenuSettingsIcon "
                      : "mblDotsMenuSettingsIcon active"
                  }
                >
                  <span>
                    <img
                      src={vaultIcon}
                      alt="Vault"
                      className="translate_both dskGrLeftShareImg"
                    />
                    <img
                      src={vaultIconActive}
                      alt="Vault"
                      className="translate_both dskGrLeftShareImgActive"
                    />
                  </span>
                  Vault
                </a>
              ) : (
                <a
                  href="javascript:void(0)"
                  onClick={() => this.onvaultPress(val.type_id, "gr", index, 0)}
                  className={
                    val.vault == 0
                      ? "mblDotsMenuSettingsIcon "
                      : "mblDotsMenuSettingsIcon active"
                  }
                >
                  <span>
                    <img
                      src={vaultIcon}
                      alt="Vault"
                      className="translate_both dskGrLeftShareImg"
                    />
                    <img
                      src={vaultIconActive}
                      alt="Vault"
                      className="translate_both dskGrLeftShareImgActive"
                    />
                  </span>
                  Vault
                </a>
              )}

              <Share
                data={{
                  title: val.title,
                  text: val.description.substring(0, 100) + "...",
                  url: val.deeplink,
                }}
              />

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
                description: val.description.substring(0, 100) + "...",       // (defaults to og:description or twitter:description)
              title: val.title,             // (defaults to og:title or twitter:title)
                message: '',     // (only for email sharing)
                subject: '',  // (only for email sharing)
                username: 'Medwiki view' // (only for twitter sharing)
              }}
            /> */}
              {/* <a href="javascript:void(0)" className="mblDotsMenuNotRelevant">
        Not Relevant for me
      </a> */}
            </Popover.Content>
          </Popover>
        </div>
      </>
    );
  }

  renderVaultList(type, item, list_index) {
    switch (type) {
      case "video_archive":
        return (
          <ArchivedVideoCard
            data={item}
            onChangeButton={this.handle_change.bind(this)}
            array_index={list_index}
            click={this.redirectToArchiveDetail.bind(this, item.type_id)}
            menu_click={this.onMenuClick.bind(this, list_index)}
            deafult_popover_index={deafult_popover_index}
            extra_class=""
          />
          // this.renderVideoItem(item, list_index)
        );
        break;
      case "comp":
        return (
          <Medwikicard
            onChangeButton={this.handle_change.bind(this)}
            history={this.props.history}
            mobile_device={isMobile}
            card_data={item}
            clicked_index={deafult_popover_index}
            elem_key={list_index}
            custom_class="feedl_listing"
          />
          // this.renderCompItem(item, list_index)
        );
      case "gr":
        return (
          <>
            {!isMobile? (
              <div
                className="col-lg-6 col-md-6 col-12 dskgrCard dskMasonryCard grCard mamama"
                id={"vault_item" + list_index}
              >
                <div className="full_width radius-6 dskgrCard_link">
                  <div className="full_width dskgrCardPic">
                    <div className="full_width dskgrCardTop">
                      {item.specialities == null ? null : (
                        <div className="colorBlack font_12px font400 radius-6 bgColorWhite mblMedWikiSpeacality">
                          {this.first_spec(item.specialities)}
                          {item.specialities.split(",").length > 1
                            ? this.popover_view_spec(item.specialities)
                            : null}
                        </div>
                      )}
                      {var_popover_key == list_index
                        ? this.popover_view(item, list_index)
                        : null}
                      {var_popover_key != list_index ? (
                        <div
                          onClick={() => {
                            this.popover_view_key(list_index);
                          }}
                          data-toggle="popover"
                          data-trigger="focus"
                          className={
                            "dskDotsMenu dskDotsCircle tanar dskDotsMenuMedWikiCard " +
                            list_index +
                            "_dynamicclass"
                          }
                        >
                          <div>
                            <span className="dskDotsMenu-dots"></span>
                            <span className="dskDotsMenu-dots"></span>
                            <span className="dskDotsMenu-dots"></span>
                          </div>
                        </div>
                      ) : null}
                    </div>
                    {item.image == null || item.image == "" ? null : (
                      <img
                        src={item.image}
                        className="object_fit_cover"
                        alt="Grand Rounds"
                      />
                    )}
                    <div className="overlay"></div>
                  </div>
                  <div className="full_width dskgrCardBtm">
                    <div className="full_width dskgrCardBtmIn">
                      {item.title == null || item.title == "" ? null : (
                        <h3
                          onClick={() => {
                            this.redirectToGrDetail(item.type_id);
                          }}
                          className="font500 colorBlack font_16px dskgrCardTtl pointercursorcss"
                        >
                          {item.title}
                        </h3>
                      )}
                      <div className="clearfix"></div>
                      <div className="full_width colorGrey font_14px dskgrCardDescription">
                        {item.description == null ||
                        item.description == "" ? null : (
                          <p>{setDescription(item.description)}</p>
                        )}
                      </div>
                      <div className="full_width dskGrMstrDoc">
                        {/* <h4 className="font500 fontExo font_16px colorBlack">MasterDoctor</h4> */}
                        <div className="clearfix"></div>
                        <div className="row dskGrMstrDocRow">
                          {item.session_doctor_entities.length > 0
                            ? item.session_doctor_entities.map((val, ind) => (
                                <div className="dskGrMstrDocBox">
                                  <div className="full_width dskGrMstrDocBoxIn">
                                    <div className="row align-items-center">
                                      <div className="radius-100 dskGrMstrDocBoxInPic">
                                        {val.session_doctor_image == null ||
                                        val.session_doctor_image ==
                                          "" ? null : (
                                          <img
                                            src={val.session_doctor_image}
                                            className="object_fit_cover"
                                          />
                                        )}
                                      </div>
                                      <div className="font_12px colorGrey font400 dskGrMstrDocBoxContent">
                                        <h4 className="font_14px colorBlack font600">
                                          {val.session_doctor_name}
                                        </h4>
                                        <p>{val.DepartmentName}</p>
                                      </div>
                                    </div>
                                    <div className="radius-6 dskGrMstrDocProfile">
                                      {val.session_doctor_image == null ||
                                      val.session_doctor_image == "" ? null : (
                                        <img
                                          src={val.session_doctor_image}
                                          className="object_fit_cover"
                                        />
                                      )}
                                      <div className="overlay"></div>
                                      <div className="full_width font_12px colorWhite font400 dskGrMstrDocProfileTxt">
                                        <h4 className="font_14px colorWhite font600">
                                          {val.session_doctor_name}
                                        </h4>
                                        <p>{val.DepartmentName}</p>
                                      </div>
                                    </div>
                                  </div>
                                  {}
                                </div>
                              ))
                            : null}
                        </div>
                      </div>
                      <div className="full_width dskgrCardFooter">
                        <div
                          className="text-uppercase colorWhite font_14px fontExo font400 radius-6 mblSessionbtm_a"
                          onClick={() => {
                            this.redirectToGrDetail(item.type_id);
                          }}
                        >
                          <span>
                            View Details <img src={angaleWhite} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="mblGrCard mblRecentCard"
                id={"vault_item" + list_index}
              >
                <div
                  href="javascript:void(0)"
                  className="full_width radius-6 mblGrCard_link"
                >
                  <div className="full_width mblGrPic">
                    <div className="overlay"></div>
                    {item.image == null || item.image == "" ? null : (
                      <img
                        src={item.image}
                        className="object_fit_cover"
                        alt="Grand Rounds"
                      />
                    )}

                    <div className="mblGrCardTop">
                      <div className="colorBlack font_14px font500 radius-6 mblMedWikiSpeacality">
                        {this.first_spec(item.specialities)}
                        {item.specialities.split(",").length > 1
                          ? this.popover_view_spec(item.specialities)
                          : null}
                      </div>

                      {var_popover_key == list_index
                        ? this.popover_view_mob(item, list_index)
                        : null}
                      {var_popover_key != list_index ? (
                        <div
                          onClick={() => {
                            this.popover_view_key(list_index);
                          }}
                          data-toggle="popover"
                          data-trigger="focus"
                          className={
                            "dskDotsMenu dskDotsCircle tanar dskDotsMenuMedWikiCard " +
                            list_index +
                            "_dynamicclass"
                          }
                        >
                          <div className="mblDotsMenu mblDotsCircle mblDotsMenuGrCard">
                            <span className="mblDotsMenu-dots"></span>
                            <span className="mblDotsMenu-dots"></span>
                            <span className="mblDotsMenu-dots"></span>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="full_width mblGrContent">
                    {item.title == null || item.title == "" ? null : (
                      <h3
                        onClick={() => {
                          this.redirectToGrDetail(item.type_id);
                        }}
                        className="font500 colorBlack font_18px mblGrContentTtl pointercursorcss"
                      >
                        {item.title}
                      </h3>
                    )}
                    <div className="clearfix"></div>
                    {item.description == null ||
                    item.description == "" ? null : (
                      <h5 className="font400 colorGrey font_14px mblGrContentText">
                        {setDescription(item.description)}...
                        <a
                          className="font_14px font600"
                          href="javascript:void(0);"
                          onClick={() => {
                            this.redirectToGrDetail(item.type_id);
                          }}
                        >
                          &nbsp; Read More
                        </a>{" "}
                      </h5>
                    )}

                    <div className="full_width dskGrMstrDoc">
                      {/* <h4 className="font500 fontExo font_16px colorBlack">MasterDoctor</h4> */}
                      <div className="clearfix"></div>
                      <div className="row dskGrMstrDocRow">
                        <span class="hidden_span">{list_index}</span>
                        {item.session_doctor_entities.length > 0
                          ? item.session_doctor_entities.map((val, ind) => (
                              <div className="dskGrMstrDocBox">
                                <div className="full_width dskGrMstrDocBoxIn">
                                  <div className="row align-items-center">
                                    <div className="radius-100 dskGrMstrDocBoxInPic">
                                      {val.session_doctor_image == null ||
                                      val.session_doctor_image == "" ? null : (
                                        <img
                                          src={val.session_doctor_image}
                                          className="object_fit_cover"
                                        />
                                      )}
                                    </div>
                                    <div className="font_12px colorGrey font400 dskGrMstrDocBoxContent">
                                      <h4 className="font_14px colorBlack font600">
                                        {val.session_doctor_name}
                                      </h4>
                                      <p>{val.DepartmentName}</p>
                                    </div>
                                  </div>
                                  <div className="radius-6 dskGrMstrDocProfile">
                                    {val.session_doctor_image == null ||
                                    val.session_doctor_image == "" ? null : (
                                      <img
                                        src={val.session_doctor_image}
                                        className="object_fit_cover"
                                      />
                                    )}
                                    <div className="overlay"></div>
                                    <div className="full_width font_12px colorWhite font400 dskGrMstrDocProfileTxt">
                                      <h4 className="font_14px colorWhite font600">
                                        {val.session_doctor_name}
                                      </h4>
                                      <p>{val.DepartmentName}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          : null}
                      </div>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                </div>
              </div>
            )}
          </>
          // this.renderCompItem(item, list_index)
        );
    }
  }

  renderVault(vault_list) {
    return (
      <div className="medWikiLeft">
        <Masonry
          className={"my-gallery-class"} // default ''
          elementType={"ul"} // default 'div'
          options={masonryOptions} // default {}
          disableImagesLoaded={false} // default false
          updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
        >
          {vault_list.map((item, index) =>
            this.renderVaultList(item.type, item, index)
          )}
        </Masonry>
      </div>
    );
  }

  render() {
    var that = this;
    return (
      <div
        className={
          isMobile == true
            ? "full_width wrap_body mblScreen"
            : "full_width wrap_body dskScreen"
        }
      >
        <Helmet>
          {/* <title>Vault powered by CLIRNet</title> */}
          <meta
            property="og:url"
            content="https://doctor.clirnet.com/services/"
          />
          <meta property="og:type" content="article" />
          <meta property="og:title" content="Vault powered by CLIRNet" />
          <meta
            property="og:description"
            content="CLIRNet is India’s largest live digital CME & Doctor Generated Content (DGC) Platform. We curate and execute over hundreds of live CMEs every month over digital and analogue communication."
          />
          <meta
            property="og:image"
            content="https://www.clirnet.com/wp-content/themes/clirnet/fav/android-icon-192x192.png"
          />
          <meta
            property="og:image:secure_url"
            content="https://www.clirnet.com/wp-content/themes/clirnet/fav/android-icon-192x192.png"
          />
          <meta
            name="twitter:image"
            content="https://www.clirnet.com/wp-content/themes/clirnet/fav/android-icon-192x192.png"
          />
          <meta name="twitter:title" content="Vault powered by CLIRNet" />
          <meta name="twitter:card" content="summary_large_image" />
        </Helmet>
        <Header history={this.props.history} page_name={pageNames} />
        <section className="full_width body_area">
          <div className="container">
            <div className="row">
              {/* <Banner /> */}
              <section className="full_width adsArea">
                <div className="full_width adsFrame">
                  <Banner
                    type_id={0}
                    type={"vault"}
                    apiresponserecieved={this.display_banner}
                    api_call_detail={1}
                    api_call={0}
                  />

                  {this.state.banner_display == true ? (
                    <Banner
                      type_id={0}
                      banner_position={1}
                      unmount_call={1}
                      type={"vault"}
                      api_call={1}
                      before_unload_call={1}
                    />
                  ) : null}
                </div>
              </section>
              {/* <Loader
                className="loader_cmn"
                type="ThreeDots"
                color="#3393df"
                height={80}
                width={80}
                visible={this.state.is_loader}
              /> */}
              {this.state.vault.length > 0 ? (
                <section className="full_width vaultPage">
                  {this.renderVault(this.state.vault)}
                </section>
              ) : !isApiCallDone ? (
                <section className="full_width vaultPage">
                  {" "}
                  <div className="medWikiLeft">
                    <Masonry
                      className={"my-gallery-class"} // default ''
                      elementType={"ul"} // default 'div'
                      options={masonryOptions} // default {}
                      disableImagesLoaded={false} // default false
                      updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                    >
                      <SpqLoader /> <SpqLoader /> <SpqLoader /> <SpqLoader />{" "}
                    </Masonry>
                  </div>
                </section>
              ) : (
                <div className="full_width vaultPage">
                  {this.state.is_loader == false ? (
                    <section className="full_width vaultPage">
                      <div className="full_width alert alert-danger">
                        <strong>Nothing In Your Vault</strong>
                      </div>
                    </section>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </section>
        <Footer history={this.props.history} />
      </div>
    );
  }
}

export default Vault;
