import React from "react";
import Loader from "react-loader-spinner";
import $ from "jquery";
import "firebase/storage";
import medwikiBg from "../../images/medWikiBg.png";
import { reactLocalStorage } from "reactjs-localstorage";
import AppConfig from "../config/config.js";
import Header from "./Header";
import Footer from "./Footer";
import filterWhite from "../../images/filter-white.png";
import filterTtlIcon from "../../images/filterIcon.png";
import add_plus from "../../images/add_plus.png";
import closeIcon from "../../images/close.png";
import Masonry from "react-masonry-component";
import Form from "react-bootstrap/Form";
import { isMobile } from "react-device-detect";
import "react-datepicker/dist/react-datepicker.css";
import Medwikicard from "../Cards/Medwikicard";
import { createBrowserHistory } from "history";
import Banner from "../mainscreens/Banner";
import FeedListLoader from "../LoadingPlaceholders/FeedListLoader.jsx";
import FeedListSidebarLoader from "../LoadingPlaceholders/FeedListSidebarLoader.jsx";

const gtag = window.gtag;

// import GA4React, { useGA4React } from "ga-4-react";

// const ga4react = new GA4React("G-MMRQERMH4E");
// ga4react.initialize().then((ga4) => {
// 	ga4.pageview('CLIRNET - Homes')

//   },(err) => {
// 	console.error(err)
//   })

const history = createBrowserHistory();
var selected_medwiki_popover_index = -1;

const pageNames = "MedWiki";
const masonryOptions = {
  transitionDuration: 0,
};
const app_url = AppConfig.app_url;
var is_again_fetch = 1;
const url = AppConfig.apiLoc;
var selected_spec = [];
var compendium_pagination_limit = 0;
var speciality = [];
var prev_compendium = [];
var parse_id = "";
var sub_speciality = [];
var cur_sel_spec = 0;
var sub_sub_speciality = [];
var api_call_pemission = 1;
var myInterval = "";

var cur_sel_subspec = 0;
class Feeds extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phone_no: "",
      err_msg: "",
      otp: "",
      compendium_listing_upcoming: [],
      session_listing_reserved: [],
      session_listing_cme: [],
      viewrefresh: false,
      is_loader: true,
      rerender: false,
      showPopup: false,
      other_on: 0,
      speciality: [],
      sub_speciality: [],
      sub_sub_speciality: [],
      change_flag: false,
      is_more_spec: false,
      is_only_video: false,
      banner_display: false,
    };
    //Login Check

    this.get_more_data = this.get_more_data.bind(this);
    this.getsubspec = this.getsubspec.bind(this);
    this.selectspec_nested = this.selectspec_nested.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.get_spec_search = this.get_spec_search.bind(this);

    this.display_banner = this.display_banner.bind(this);

    reactLocalStorage.set("@ClirnetStore:source", "");

    this.handle_change = this.handle_change.bind(this);
  }

  display_banner(datam) {
    this.setState({ banner_display: true });

    //alert(datam)
  }

  componentWillUnmount() {
    $("html, body").css({
      overflow: "auto",
      height: "auto",
    });
    selected_medwiki_popover_index = -1;
    is_again_fetch = 1;
  }
  //on scroll load more data call
  onScroll() {
    var tempobj = this;

    if (tempobj.is_on_screen_top_check("on_screen_check")) {
      tempobj.get_more_data(tempobj);
    }

    tempobj.setState({ is_loader: true });
  }

  //Select and deselect Speciality from filter
  selectspec(id) {
    if (selected_spec.indexOf(id) != -1) {
      var index = selected_spec.indexOf(id);
      selected_spec.splice(index, 1);

      $("." + id + "id").each(function (index) {
        var index1 = selected_spec.indexOf($(this).val());
        selected_spec.splice(index1, 1);
      });

      $("." + id + "main_id").each(function (index) {
        var index1 = selected_spec.indexOf($(this).val());

        selected_spec.splice(index1, 1);
      });

      this.get_spec_search();
    } else {
      selected_spec.push(id);

      $("." + id + "id").each(function (index) {
        selected_spec.push($(this).val());
      });

      $("." + id + "main_id").each(function (index) {
        selected_spec.push($(this).val());
      });

      this.get_spec_search();
    }

    this.setState({ change_flag: !this.state.change_flag });
  }

  //Search By Speciality
  get_spec_search() {
    this.setState({ compendium_listing_upcoming: [] });
    this.setState({ is_loader: true });

    if (this.state.is_only_video) {
      var typevid = 1;
    } else {
      var typevid = "";
    }
    parse_id = selected_spec.join();
    compendium_pagination_limit = 0;
    prev_compendium = [];
    if (parse_id != "") {
      fetch(
        url +
          "knwlg/feed?from=" +
          compendium_pagination_limit +
          "&to=10&spIds=" +
          parse_id +
          "&type=" +
          typevid +
          "",
        {
          method: "GET",
          headers: {
            Authorization: reactLocalStorage.get(
              "@ClirnetStore:refreshToken",
              true
            ),
            version: "rjsw 1.1.1",
          },
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          responseJson.data.map((r) => {
            prev_compendium.push(r);
          });

          this.setState({ compendium_listing_upcoming: prev_compendium });
          setTimeout(function () {
            api_call_pemission = 1;
          }, 300);

          compendium_pagination_limit = compendium_pagination_limit + 10;
          this.setState({ is_loader: false });
        })
        .catch((error) => {});
    } else {
      console.log("1111111111");
      if (this.state.is_only_video) {
        var typevid = 1;
      } else {
        var typevid = "";
      }
      fetch(
        url +
          "knwlg/feed?from=" +
          compendium_pagination_limit +
          "&to=10&type=" +
          typevid +
          "",
        {
          method: "GET",
          headers: {
            Authorization: reactLocalStorage.get(
              "@ClirnetStore:refreshToken",
              true
            ),
            version: "rjsw 1.1.1",
          },
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          responseJson.data.map((r) => {
            prev_compendium.push(r);
          });

          this.setState({ compendium_listing_upcoming: prev_compendium });
          setTimeout(function () {
            api_call_pemission = 1;
          }, 300);

          compendium_pagination_limit = compendium_pagination_limit + 10;
          this.setState({ is_loader: false });
        })
        .catch((error) => {});
    }
  }

  //Get More medwiki data after scroll
  get_more_data(obj) {
    if (this.state.is_only_video) {
      var typevid = 1;
    } else {
      var typevid = "";
    }
    if (parse_id != "") {
      if (is_again_fetch == 1) {
        setTimeout(function () {
          obj.setState({ is_loader: false });
        }, 2000);
        is_again_fetch = 0;
        fetch(
          url +
            "knwlg/feed?from=" +
            compendium_pagination_limit +
            "&to=10&spIds=" +
            parse_id +
            "&type=" +
            typevid +
            "",
          {
            method: "GET",
            headers: {
              Authorization: reactLocalStorage.get(
                "@ClirnetStore:refreshToken",
                true
              ),
              version: "rjsw 1.1.1",
            },
          }
        )
          .then((response) => response.json())
          .then((responseJson) => {
            responseJson.data.map((r) => {
              prev_compendium.push(r);
            });

            obj.setState({ compendium_listing_upcoming: prev_compendium });

            compendium_pagination_limit = compendium_pagination_limit + 10;

            is_again_fetch = 1;
            if (responseJson.data.length > 0) {
              setTimeout(function () {
                api_call_pemission = 1;
              }, 300);
            }
          })
          .catch((error) => {});
      }
    } else {
      setTimeout(function () {
        obj.setState({ is_loader: false });
      }, 2000);

      if (is_again_fetch == 1) {
        is_again_fetch = 0;
        fetch(
          url +
            "knwlg/feed?from=" +
            compendium_pagination_limit +
            "&to=10&type=" +
            typevid +
            "",
          {
            method: "GET",
            headers: {
              Authorization: reactLocalStorage.get(
                "@ClirnetStore:refreshToken",
                true
              ),
              version: "rjsw 1.1.1",
            },
          }
        )
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status_code == "401") {
              obj.props.history.push({
                pathname: `/`,
              });
            }

            responseJson.data.map((r) => {
              prev_compendium.push(r);
            });

            obj.setState({ compendium_listing_upcoming: prev_compendium });
            console.log(obj.state.compendium_listing_upcoming);
            is_again_fetch = 1;
            if (responseJson.data.length > 0) {
              setTimeout(function () {
                api_call_pemission = 1;
              }, 300);
            }
            compendium_pagination_limit = compendium_pagination_limit + 10;
          })
          .catch((error) => {});
      }
    }
  }

  componentDidMount() {
    window.document.title = "CLIRNET - Medwiki Feed";
    gtag("config", AppConfig.gtag_measure_id, {
      page_title: "CLIRNET - Medwiki Feed",
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
    //alert(history.location.pathname)

    var that = this;
    $(document).on("click", function (e) {
      //popover dissapear func

      let ggg = $(e.target).parents(".tanar").length;

      if (ggg == 0 && !$(e.target).hasClass("tanar")) {
        selected_medwiki_popover_index = -1;
        that.setState({ is_loader: true });
      }
    });

    $(".medwiki_mobile").addClass("active");

    is_again_fetch = 1;

    this.setState({ is_loader: true });

    window.scrollTo(0, 0);
    $(document.body).on("touchmove", this.onScroll);
    selected_spec = [];
    speciality = [];

    compendium_pagination_limit = 0;
    prev_compendium = [];

    var tempobj = this;
    $(window).scroll(function () {
      if (tempobj.is_on_screen_top_check("on_screen_check")) {
        tempobj.setState({ is_loader: true });
        tempobj.get_more_data(tempobj);
        let mainvar = tempobj;
        if (api_call_pemission == 1) {
          api_call_pemission = 0;

          //mainvar.get_more_data()
        }
      }
    });

    //Get All Specialities for sidebar
    fetch(url + "authnew/getallspeciality", {
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
        responseJson.data.speciality_data.map((r) => {
          speciality.push(r);
        });

        this.setState({ speciality: speciality });
      })
      .catch((error) => {});

    //Pagination For Feed
    fetch(url + "knwlg/feed?from=" + compendium_pagination_limit + "&to=10", {
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
          prev_compendium.push(r);
        });

        this.setState({ compendium_listing_upcoming: prev_compendium });
        if (compendium_pagination_limit == 0) {
        }
        console.log(this.state.compendium_listing_upcoming);

        compendium_pagination_limit = compendium_pagination_limit + 10;
        this.setState({ is_loader: false });
      })
      .catch((error) => {});

    $(".tRright_popClose").on("click", function () {
      $("body").removeClass("right_PopShowBody");
    });
    $(".tRright_popShow").on("click", function () {
      $("body").addClass("right_PopShowBody");
    });

    $(".tmobFilterClose").on("click", function () {
      $("body").removeClass("tmobFilterShow");
    });
    $(".tmobFilter").on("click", function () {
      $("body").addClass("tmobFilterShow");
    });

    $(".li_medwiki").attr("id", "medwiki_cal");

    if (isMobile) {
      var type_id_val = 2;
    } else {
      var type_id_val = 1;
    }
  }

  is_on_screen_top_check(id) {
    //alert()

    var temp_is_sc = $("#" + id + "");
    var win = $(window);
    var viewport = {
      top: win.scrollTop(),
      left: win.scrollLeft(),
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
    var bounds = temp_is_sc.offset();
    if (bounds != undefined) {
      bounds.right = bounds.left + temp_is_sc.outerWidth();
      bounds.bottom = bounds.top + temp_is_sc.outerHeight();

      return !(
        viewport.right < bounds.left ||
        viewport.left > bounds.right ||
        viewport.bottom < bounds.top ||
        viewport.top > bounds.bottom
      );
    }
  }

  //Like Button Press
  onLikeBtnPress = (item_id, type, array_index) => {
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
        if (responseJson.data.rating == 0) {
          prev_compendium[array_index].myrating = false;
          prev_compendium[array_index].rating =
            parseInt(prev_compendium[array_index].rating) - 1;
        } else {
          prev_compendium[array_index].myrating = true;
          prev_compendium[array_index].rating =
            parseInt(prev_compendium[array_index].rating) +
            parseInt(responseJson.data.rating);
        }

        this.setState({ compendium_listing_upcoming: prev_compendium });
      })
      .catch((error) => {});
  };

  //Vault Unvault
  onvaultPress = (item_id, type, array_index, flag) => {
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
        prev_compendium[array_index].vault = responseJson.data;

        if (flag == 0) {
          reactLocalStorage.set(
            "@ClirnetStore:vault_count",
            parseInt(reactLocalStorage.get("@ClirnetStore:vault_count", true)) +
              1
          );
        }

        if (flag == 1) {
          reactLocalStorage.set(
            "@ClirnetStore:vault_count",
            parseInt(reactLocalStorage.get("@ClirnetStore:vault_count", true)) -
              1
          );
        }

        this.setState({ compendium_view: prev_compendium });
      })
      .catch((error) => {});
  };

  selectspec_nested(id) {
    if ($("#lispec_" + id + "").hasClass("phrame") == true) {
    }
  }

  //Compendium detail redirecton
  redirect_to_compendium_detail(id) {
    reactLocalStorage.set("@ClirnetStore:source", "Medwiki Page");
    this.props.history.push({
      pathname: "/Feeddetail/" + id + "",
    });
  }
  //get sub speciality in filter
  getsubspec(id, spacecal) {
    var that = this;
    fetch(url + "authnew/getSpecialityNamesByParentID?pid=" + id + "", {
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
        var onj = this;
        var html = "";
        responseJson.data.speciality_data.map((r) => {
          html =
            html +
            '<div id="param_' +
            r.id +
            '" class="lispec_' +
            r.id +
            " canremove space" +
            spacecal +
            '"><div class="form-check cmnCheckBox_row"><input onClick="(this)=>this.selectspec_nested(' +
            r.id +
            ')" class="form-check-input" type="checkbox" ><label class="form-check-label">' +
            r.name +
            "</label></div></div>";
        });

        $(".canremove").remove();

        $(html).insertAfter(".lispec_" + id + "");

        $(".canremove").addClass("phrame");
      })
      .catch((error) => {});
  }

  get_sub_spec(id, step) {
    this.setState({ is_more_spec: true });

    sub_speciality = [];
    var spacecal = 1;

    var that = this;
    fetch(url + "authnew/getSpecialityNamesByParentID?pid=" + id + "", {
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
        responseJson.data.speciality_data.map((r) => {
          sub_speciality.push(r);
        });

        cur_sel_spec = id;
        that.setState({ sub_speciality: sub_speciality });

        $("." + id + "id").each(function (index) {
          if (selected_spec.indexOf(id) != -1) {
            selected_spec.push($(this).val());
          }
        });

        this.setState({ is_more_spec: false });
      })
      .catch((error) => {});
  }

  get_sub_sub_spec(id, step) {
    this.setState({ is_more_spec: true });

    sub_sub_speciality = [];
    var spacecal = 2;

    var that = this;
    fetch(url + "authnew/getSpecialityNamesByParentID?pid=" + id + "", {
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
        responseJson.data.speciality_data.map((r) => {
          sub_sub_speciality.push(r);
        });

        cur_sel_subspec = id;
        that.setState({ sub_sub_speciality: sub_sub_speciality });
        $("." + id + "id").each(function (index) {
          if (selected_spec.indexOf(id) != -1) {
            selected_spec.push($(this).val());
          }
        });

        this.setState({ is_more_spec: false });
      })
      .catch((error) => {});
  }

  popup_close() {
    $("body").removeClass("right_PopShowBody");
  }

  change_video_flag() {
    this.setState({ is_only_video: !this.state.is_only_video });
    var thitemp = this;
    setTimeout(function () {
      compendium_pagination_limit = 0;
      api_call_pemission = 0;

      thitemp.get_spec_search();
    }, 10);
  }

  handle_change(index, value, type) {
    if (type == "vault") {
      prev_compendium[index].vault = value;

      this.setState({ compendium_listing_upcoming: prev_compendium });
    }

    if (type == "like") {
      if (value == 0) {
        prev_compendium[index].myrating = false;
        prev_compendium[index].rating =
          parseInt(prev_compendium[index].rating) - 1;
        this.setState({ compendium_listing_upcoming: prev_compendium });

        this.setState({ rerender: !this.state.rerender });
      } else {
        prev_compendium[index].myrating = true;
        prev_compendium[index].rating =
          parseInt(prev_compendium[index].rating) + parseInt(value);
        this.setState({ compendium_listing_upcoming: prev_compendium });

        this.setState({ rerender: !this.state.rerender });
      }
    }

    if (type == "popover") {
      selected_medwiki_popover_index = index;
      this.setState({ rerender: !this.state.rerender });
    }
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
        <img src={medwikiBg} className="medWikiBg" />
        <Header history={this.props.history} page_name={pageNames} />
        <section className="full_width body_area">
          <div className="container">
            <div className="row">
              <Banner
                type_id={0}
                type={"compendiumlist"}
                apiresponserecieved={this.display_banner}
                api_call_detail={1}
                api_call={0}
              />

              {this.state.banner_display == true ? (
                <Banner
                  type_id={0}
                  banner_position={1}
                  unmount_call={1}
                  type={"compendiumlist"}
                  api_call={1}
                  before_unload_call={1}
                />
              ) : null}
              <section className="full_width medWiki">
                {this.state.compendium_listing_upcoming.length == 0 ? (
                  <div>
                    {/* <FeedListLoader/>
  <FeedListLoader/>
  <FeedListLoader/>
  <FeedListLoader/>
  <FeedListLoader/>
  <FeedListLoader/>
  <FeedListLoader/> */}
                  </div>
                ) : null}

                {this.state.compendium_listing_upcoming.length > 0 ? (
                  <div className="medWikiLeft">
                    <Masonry
                      className={"my-gallery-class"} // default ''
                      elementType={"ul"} // default 'div'
                      options={masonryOptions} // default {}
                      disableImagesLoaded={false} // default false
                      updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                      //imagesLoadedOptions={imagesLoadedOptions} // default {}
                    >
                      {this.state.compendium_listing_upcoming.map(
                        (r, index) => (
                          <Medwikicard
                            onChangeButton={this.handle_change}
                            history={this.props.history}
                            mobile_device={isMobile}
                            card_data={r}
                            clicked_index={selected_medwiki_popover_index}
                            elem_key={index}
                            custom_class="feedl_listing"
                          />
                        )
                      )}
                    </Masonry>
                    {this.state.compendium_listing_upcoming.length > 0 &&
                    this.state.is_loader == true ? (
                      <>
                        <Masonry
                          className={"my-gallery-class"} // default ''
                          elementType={"ul"} // default 'div'
                          options={masonryOptions} // default {}
                          disableImagesLoaded={false} // default false
                          updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                          //imagesLoadedOptions={imagesLoadedOptions} // default {}
                        >
                          <FeedListLoader />
                          <FeedListLoader />
                          <FeedListLoader />
                          <FeedListLoader />
                        </Masonry>
                      </>
                    ) : null}
                    <div id="on_screen_check"></div>
                  </div>
                ) : (
                  <div>
                    {this.state.is_loader == false ? (
                      <div className="medWikiLeft">
                        <div className="full_width alert alert-danger">
                          <strong>No Records Found</strong>
                        </div>
                      </div>
                    ) : (
                      <div className="medWikiLeft">
                        <Masonry
                          className={"my-gallery-class"} // default ''
                          elementType={"ul"} // default 'div'
                          options={masonryOptions} // default {}
                          disableImagesLoaded={false} // default false
                          updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                          //imagesLoadedOptions={imagesLoadedOptions} // default {}
                        >
                          <FeedListLoader />
                          <FeedListLoader />
                          <FeedListLoader />
                          <FeedListLoader />
                        </Masonry>
                      </div>
                    )}
                  </div>
                )}

                <div className="feed_right">
                  {this.state.banner_display == true ? (
                    <Banner
                      type_id={0}
                      banner_position={3}
                      unmount_call={0}
                      type={"compendiumlist"}
                      api_call={1}
                      before_unload_call={0}
                    />
                  ) : null}

                  {/* <div className="full_width bannerRight top">
  <img src={riGhtBnnr} />
   </div> */}
                  <div className="full_width radius-6 k_medWikiFilter">
                    <h4 className="font600 font_24px colorBlack k_medWikiFilterTtl">
                      <span className="radius-100 bgColorGreen k_medWikiFilterTtlIcon">
                        <img src={filterTtlIcon} className="translate_both" />
                      </span>
                      Filter
                      <a
                        href="javascript:void(0)"
                        className="radius-100 font_14px tmobFilterClose"
                      >
                        Ok
                      </a>
                    </h4>
                    <div className="clearfix"></div>
                    <div className="full_width k_medWikiFilterIn">
                      <Form.Check
                        onClick={() => {
                          this.change_video_flag();
                        }}
                        className="font600 font_16px k_MedWikiVideoOnOff"
                        type="checkbox"
                        label="Videos Only"
                      />
                      <div className="full_width radius-6 k_medwikiSpeacialty">
                        <div className="row align-items-center justify-content-between">
                          <h3 className="font_14px font600 colorBlack k_medwikiSpeacialtyTtl">
                            {selected_spec.length > 0 ? (
                              <span className="colorBlue font700 font_30px">
                                {selected_spec.length}
                              </span>
                            ) : null}
                            Select Specialty
                          </h3>
                          <a
                            className="radius-100 bgColorBlue k_medwikiSpeacialtyTtlAdd tRright_popShow"
                            href="javascript:void(0)"
                          >
                            <img src={add_plus} className="translate_both" />
                          </a>
                        </div>
                        <div className="full_width k_medwikiSpeacialtyIn">
                          <div className="full_width k_medwikiSpeacialtyFirst">
                            {this.state.speciality.length == 0 ? (
                              <div>
                                <FeedListSidebarLoader />
                                <FeedListSidebarLoader />
                                <FeedListSidebarLoader />
                                <FeedListSidebarLoader />
                                <FeedListSidebarLoader />
                              </div>
                            ) : null}

                            {this.state.speciality.map((r, index) => (
                              <div>
                                {index < 5 ? (
                                  <Form.Group
                                    className={
                                      "chada feedRightSpecilityPrnt lispec_" +
                                      r.master_specialities_id
                                    }
                                    controlId="formBasicCheckbox"
                                  >
                                    <div className="full_width fdSpcltyRowStp1">
                                      {selected_spec.indexOf(
                                        r.master_specialities_id
                                      ) != -1 ? (
                                        <Form.Check
                                          checked
                                          onClick={() => {
                                            this.selectspec(
                                              r.master_specialities_id
                                            );
                                          }}
                                          className="cmnCheckBox_row"
                                          type="checkbox"
                                          label="&nbsp;"
                                        />
                                      ) : (
                                        <Form.Check
                                          onClick={() =>
                                            this.selectspec(
                                              r.master_specialities_id
                                            )
                                          }
                                          className="cmnCheckBox_row"
                                          type="checkbox"
                                          label="&nbsp;"
                                        />
                                      )}

                                      {cur_sel_spec !=
                                      r.master_specialities_id ? (
                                        <a
                                          className="font_14px feedRightSpecilityShow"
                                          onClick={() =>
                                            this.get_sub_spec(
                                              r.master_specialities_id,
                                              1
                                            )
                                          }
                                          href="javascript:void(0);"
                                        >
                                          {r.specialities_name + " "}
                                          {/* <span className="feedRightSpecilityShowIcon">+</span> */}
                                        </a>
                                      ) : (
                                        <a
                                          className="font_14px feedRightSpecilityShow"
                                          onClick={() => {
                                            cur_sel_spec = 0;
                                            this.setState({
                                              is_more_spec: false,
                                            });
                                          }}
                                          href="javascript:void(0);"
                                        >
                                          {r.specialities_name + " "}
                                          {/* <span className="feedRightSpecilityShowIcon">-</span> */}
                                        </a>
                                      )}
                                    </div>
                                  </Form.Group>
                                ) : null}
                              </div>
                            ))}
                          </div>
                          <a
                            className="full_width radius-6 cmnBtn btnBlue btnCmnSmall font600 text-center k_medwikiSpeacialtyInAdd tRright_popShow"
                            href="javascript:void(0)"
                          >
                            View All
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {this.state.banner_display == true ? (
                    <Banner
                      type_id={0}
                      banner_position={4}
                      unmount_call={0}
                      type={"compendiumlist"}
                      api_call={1}
                      before_unload_call={0}
                    />
                  ) : null}

                  {/* <div className="full_width bannerRight bottom">
  <img src={riGhtBnnr} />
   </div> */}
                </div>
                <div className="tRright_popClose right_fixedBg"></div>
                <a
                  className="radius-100 bgColorBlue tmobFilter medWikifilterRes"
                  href="javascript:void(0)"
                >
                  <img className="translate_both" src={filterWhite} />
                </a>
              </section>
            </div>
          </div>
        </section>
        <div className="right_fix_pop_JS">
          <div className="tRright_popClose right_fixedBg"></div>
          <div className="right_pop transition6s text-left ssnFilterPop">
            <div className="bgColorBlue text-left right_popTtl">
              <h2 className="colorWhite font600 font_20px right_popTtlTxt">
                Select Specialty
              </h2>
              <a
                href="javascript:void(0)"
                className="radius-100 right_popClose tRright_popClose"
              >
                <img src={closeIcon} className="translate_both" />
              </a>
            </div>
            <div className="right_popIn">
              {this.state.speciality.map((r, index) => (
                <Form.Group
                  className={
                    "chada feedRightSpecilityPrnt lispec_" +
                    r.master_specialities_id
                  }
                  controlId="formBasicCheckbox"
                >
                  <div className="full_width fdSpcltyRowStp1">
                    {selected_spec.indexOf(r.master_specialities_id) != -1 ? (
                      <Form.Check
                        checked
                        onClick={() => {
                          this.selectspec(r.master_specialities_id);
                        }}
                        className="cmnCheckBox_row"
                        type="checkbox"
                        label="&nbsp;"
                      />
                    ) : (
                      <Form.Check
                        onClick={() =>
                          this.selectspec(r.master_specialities_id)
                        }
                        className="cmnCheckBox_row"
                        type="checkbox"
                        label="&nbsp;"
                      />
                    )}

                    {cur_sel_spec != r.master_specialities_id ? (
                      <a
                        className="font_14px feedRightSpecilityShow"
                        onClick={() =>
                          this.get_sub_spec(r.master_specialities_id, 1)
                        }
                        href="javascript:void(0);"
                      >
                        {r.specialities_name + " "}
                        <span className="feedRightSpecilityShowIcon">+</span>
                      </a>
                    ) : (
                      <a
                        className="font_14px feedRightSpecilityShow"
                        onClick={() => {
                          cur_sel_spec = 0;
                          this.setState({ is_more_spec: false });
                        }}
                        href="javascript:void(0);"
                      >
                        {r.specialities_name + " "}
                        <span className="feedRightSpecilityShowIcon">-</span>
                      </a>
                    )}
                  </div>

                  {cur_sel_spec == r.master_specialities_id ? (
                    <div
                      className="full_width"
                      style={{ "margin-top": "10px" }}
                    >
                      <Loader
                        className="loader_cmn"
                        type="ThreeDots"
                        color="#355ed3"
                        height={20}
                        width={20}
                        visible={this.state.is_more_spec}
                      />
                      {this.state.sub_speciality.map((rsub, indexi) => (
                        <div class="full_width canremove">
                          <div class="full_width fdSpcltyRowStp1">
                            <div class="form-check cmnCheckBox_row">
                              {selected_spec.indexOf(rsub.id) != -1 ? (
                                <input
                                  class={
                                    r.master_specialities_id +
                                    "id form-check-input"
                                  }
                                  checked
                                  onClick={() => this.selectspec(rsub.id)}
                                  value={rsub.id}
                                  type="checkbox"
                                />
                              ) : (
                                <input
                                  onClick={() => {
                                    this.selectspec(rsub.id);
                                  }}
                                  class={
                                    r.master_specialities_id +
                                    "id form-check-input"
                                  }
                                  value={rsub.id}
                                  type="checkbox"
                                />
                              )}
                              <label class="form-check-label">&nbsp;</label>
                            </div>
                            <a
                              className="font_14px feedRightSpecilityShow"
                              onClick={() => {
                                this.get_sub_sub_spec(rsub.id, 2);
                              }}
                              href="javascript:void(0);"
                            >
                              {rsub.name + ""}
                            </a>
                          </div>

                          {cur_sel_subspec == rsub.id ? (
                            <div
                              className="full_width"
                              style={{ "margin-top": "10px" }}
                            >
                              {this.state.sub_sub_speciality.map(
                                (rsubsub, indexii) => (
                                  <div class="canremove">
                                    <div class="form-check cmnCheckBox_row">
                                      {selected_spec.indexOf(rsubsub.id) !=
                                      -1 ? (
                                        <input
                                          class={
                                            rsub.id +
                                            "id " +
                                            r.master_specialities_id +
                                            "main_id form-check-input"
                                          }
                                          checked
                                          onClick={() =>
                                            this.selectspec(rsubsub.id)
                                          }
                                          value={rsubsub.id}
                                          type="checkbox"
                                        />
                                      ) : (
                                        <input
                                          onClick={() => {
                                            this.selectspec(rsubsub.id);
                                          }}
                                          class={
                                            rsub.id +
                                            "id " +
                                            r.master_specialities_id +
                                            "main_id form-check-input"
                                          }
                                          value={rsubsub.id}
                                          type="checkbox"
                                        />
                                      )}
                                      <label class="form-check-label">
                                        {rsubsub.name + ""}
                                      </label>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </Form.Group>
              ))}
            </div>
          </div>
        </div>
        <Footer history={this.props.history} />

        <div></div>
      </div>
    );
  }
}

export default Feeds;
