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

const gtag = window.gtag;

//new card
var vault = [];
const url = AppConfig.apiLoc;
const pageNames = "Vault";
let deafult_popover_index = -1;
let isApiCallDone = false;

const masonryOptions = {
  transitionDuration: 0,
};

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
  onvaultPress = (item_id, type, array_index) => {
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
        //this.renderagain();

        $("#vault_item" + array_index + "").remove();

        reactLocalStorage.set(
          "@ClirnetStore:vault_count",
          parseInt(reactLocalStorage.get("@ClirnetStore:vault_count", true) - 1)
        );
        thisobjval.setState({ viewrefresh: !this.state.viewrefresh });
      })
      .catch((error) => {});
  };

  componentDidMount() {
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
                      <SpqLoader /> <SpqLoader />{" "}
                      
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
