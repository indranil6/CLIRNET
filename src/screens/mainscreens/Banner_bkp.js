import React from "react";
import $ from "jquery";
import { reactLocalStorage } from "reactjs-localstorage";
import AppConfig from "../config/config.js";
import { isMobile } from "react-device-detect";
var myvarsidebar_bottom = "";
var myvarsidebar_top = "";
var myvartop = "";
var myvarbottom = "";
var banner_call = "";
var reporting_json_array = [];
var banner_top_reporting_json = {
  start_time: "",
  start_timestamp: "",
  banner_id: "",
  banner_cat_id: "",
  position: "Top",
  duration: 0,
  type: "comp",
  type_id: "",
  end_time: "",
  end_timestamp: "",
  timestamp_get: "",
};
var banner_bottom_reporting_json = {
  start_time: "",
  start_timestamp: "",
  banner_id: "",
  banner_cat_id: "",
  position: "Bottom",
  duration: 0,
  type: "comp",
  type_id: "",
  end_time: "",
  end_timestamp: "",
  timestamp_get: "",
};
var banner_sidebar_bottom_reporting_json = {
  start_time: "",
  start_timestamp: "",
  banner_id: "",
  banner_cat_id: "",
  position: "Sidebar_Bottom",
  duration: 0,
  type: "comp",
  type_id: "",
  end_time: "",
  end_timestamp: "",
  timestamp_get: "",
};
var banner_sidebar_top_reporting_json = {
  start_time: "",
  start_timestamp: "",
  banner_id: "",
  banner_cat_id: "",
  position: "Sidebar_Top",
  duration: 0,
  type: "comp",
  type_id: "",
  end_time: "",
  end_timestamp: "",
  timestamp_get: "",
};
var main_cont_wirhout_citation = "";
var citation_text_parsed = [];
let related_comp = [];
const url = AppConfig.apiLoc;

var banner_sidebar_top_type = "";
var banner_sidebar_top_label = "";
var banner_sidebar_top_category_id = "";
var banner_sidebar_top_width = "";
var banner_sidebar_top_height = "";
var banner_sidebar_top_duration = "";
var banner_sidebar_top_url_and_redirect = [];
var banner_sidebar_top_play_key = 0;
var banner_sidebar_top_video_change_permission = 0;
var banner_sidebar_top_onclick_pause = 0;
var myTimer_sidebar_top = "";
var timerval_sidebar_top = "";
var myTimer_sidebar_top_temp = "";
var myTimer_sidebar_top_main = "";
var myTimer_small_value_sidebar_top = "";
var myTimer_small_value_sidebar_top_temp = "";

var top_image_change_time = 0;
var sidebar_top_image_change_time = 0;
var sidebar_bottom_image_change_time = 0;
var bottom_image_change_time = 0;
var clientLogo = "";
var isSponsored = false;

var banner_sidebar_bottom_type = "";
var banner_sidebar_bottom_label = "";
var banner_sidebar_bottom_category_id = "";
var banner_sidebar_bottom_width = "";
var banner_sidebar_bottom_height = "";
var banner_sidebar_bottom_duration = "";
var banner_sidebar_bottom_url_and_redirect = [];
var banner_sidebar_bottom_play_key = 0;
var banner_sidebar_bottom_video_change_permission = 0;
var banner_sidebar_bottom_onclick_pause = 0;
var myTimer_sidebar_bottom = "";
var timerval_sidebar_bottom = "";
var myTimer_sidebar_bottom_temp = "";
var myTimer_sidebar_bottom_main = "";
var myTimer_small_value_sidebar_bottom = "";
var myTimer_small_value_sidebar_bottom_temp = "";
var useriduse = "";

var banner_bottom_type = "";
var banner_bottom_label = "";
var banner_bottom_category_id = "";
var banner_bottom_width = "";
var banner_bottom_height = "";
var banner_bottom_duration = "";
var banner_bottom_url_and_redirect = [];
var banner_bottom_play_key = 0;
var banner_bottom_video_change_permission = 0;
var banner_bottom_onclick_pause = 0;
var myTimer_bottom = "";
var timerval_bottom = "";
var myTimer_bottom_temp = "";
var myTimer_bottom_main = "";
var myTimer_small_value_bottom = "";
var myTimer_small_value_bottom_temp = "";

var banner_top_type = "";
var banner_top_label = "";
var banner_top_category_id = "";
var banner_top_width = "";
var banner_top_height = "";
var banner_top_duration = "";
var banner_top_url_and_redirect = [];
var banner_top_play_key = 0;
var banner_top_video_change_permission = 0;
var banner_top_onclick_pause = 0;
var myTimer_top = "";
var timerval_top = "";
var myTimer_top_temp = "";
var myTimer_top_main = "";
var myTimer_small_value_top = "";
var myTimer_small_value_top_temp = "";
var duration_value_top = 0;

var view_top_per = 0;
var view_bottom_per = 0;
var view_sidebar_bottom_per = 0;
var view_sidebar_top_per = 0;

var top_height_val = 0;
var top_width_val = 0;

var bottom_height_val = 0;
var bottom_width_val = 0;

var sidebar_bottom_height_val = 0;
var sidebar_bottom_width_val = 0;

var sidebar_top_height_val = 0;
var sidebar_top_width_val = 0;
var local_video_time_top = 0;
var local_video_time_sidebar_top = 0;
var local_video_time_bottom = 0;
var local_video_time_sidebar_bottom = 0;
//

let hidden = null;
let visibilityChange = null;
if (typeof document.hidden !== "undefined") {
  // Opera 12.10 and Firefox 18 and later support
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewrefresh: false,
      rerenderbanner: false,
    };
  }

  handleVisibilityChange = () => {
    if (document[hidden]) {
      let ttyuip = this;

      let videovistop = $("#video_top_container").get(0);

      if (
        videovistop != undefined &&
        videovistop.paused &&
        ttyuip.is_on_screen_top("video_imagecont")
      ) {
        if (
          banner_top_reporting_json.start_time != "" &&
          banner_top_reporting_json.start_time != undefined
        ) {
          let today = new Date();

          let time =
            today.getHours() +
            ":" +
            today.getMinutes() +
            ":" +
            today.getSeconds();
          let unix_tmp = Math.round(+new Date() / 1000);

          let temp_json = {
            start_time: "",
            start_timestamp: "",
            banner_id: "",
            banner_cat_id: "",
            position: "Top",
            duration: "",
            type: ttyuip.props.type,
            type_id: "",
            end_time: "",
            end_timestamp: "",
            timestamp_get: "",
          };
          if (banner_top_url_and_redirect[banner_top_play_key] != undefined) {
            let vidunsave_top = document.getElementById("video_top_container");

            let unsave_durationtop = vidunsave_top.currentTime;
            let durationtop =
              unsave_durationtop.toFixed(3) -
              banner_top_reporting_json.start_timestamp.toFixed(3);
            temp_json = {
              start_time: banner_top_reporting_json.start_time,
              start_timestamp: "",
              banner_id:
                banner_top_url_and_redirect[banner_top_play_key].banner_id,
              banner_cat_id: banner_top_reporting_json.banner_cat_id,
              position: "Top",
              duration: Math.abs(Math.abs(durationtop.toFixed(3))),
              type: ttyuip.props.type,
              type_id: banner_top_reporting_json.type_id,
              end_time: time,
              end_timestamp: "",
              timestamp_get: banner_call,
            };

            reporting_json_array.push(temp_json);
          }

          banner_top_reporting_json.start_time = "";
          banner_top_reporting_json.end_time = "";

          temp_json = {
            start_time: "",
            start_timestamp: "",
            banner_id: "",
            banner_cat_id: "",
            position: "Top",
            duration: "",
            type: ttyuip.props.type,
            type_id: "",
            end_time: "",
            end_timestamp: "",
            timestamp_get: "",
          };
        }
      }

      let videovisbottom = $("#video_bottom_container").get(0);

      if (
        videovisbottom != undefined &&
        videovisbottom.paused &&
        ttyuip.is_on_screen_bottom("video_imagecont_bottom")
      ) {
        if (
          banner_bottom_reporting_json.start_time != "" &&
          banner_bottom_reporting_json.start_time != undefined
        ) {
          let today = new Date();

          let time =
            today.getHours() +
            ":" +
            today.getMinutes() +
            ":" +
            today.getSeconds();
          let unix_tmp = Math.round(+new Date() / 1000);

          let vidunsave_bottom = document.getElementById(
            "video_bottom_container"
          );

          let unsave_durationbottom = vidunsave_bottom.currentTime;
          let durationbottom =
            unsave_durationbottom.toFixed(3) -
            banner_bottom_reporting_json.start_timestamp.toFixed(3);
          let temp_json = {
            start_time: banner_bottom_reporting_json.start_time,
            start_timestamp: "",
            banner_id:
              banner_bottom_url_and_redirect[banner_bottom_play_key].banner_id,
            banner_cat_id: banner_bottom_reporting_json.banner_cat_id,
            position: "Bottom",
            duration: Math.abs(Math.abs(durationbottom.toFixed(3))),
            type: ttyuip.props.type,
            type_id: banner_bottom_reporting_json.type_id,
            end_time: time,
            end_timestamp: "",
            timestamp_get: banner_call,
          };

          reporting_json_array.push(temp_json);

          banner_bottom_reporting_json.start_time = "";
          banner_bottom_reporting_json.end_time = "";

          temp_json = {
            start_time: "",
            start_timestamp: "",
            banner_id: "",
            banner_cat_id: "",
            position: "Bottom",
            duration: "",
            type: ttyuip.props.type,
            type_id: "",
            end_time: "",
            end_timestamp: "",
            timestamp_get: "",
          };
        }
      }

      let videovissidebarbottom = $("#video_sidebar_bottom_container").get(0);

      if (
        videovissidebarbottom != undefined &&
        videovissidebarbottom.paused &&
        ttyuip.is_on_screen_sidebar_bottom("video_imagecont_sidebar_bottom")
      ) {
        if (
          banner_sidebar_bottom_reporting_json.start_time != "" &&
          banner_sidebar_bottom_reporting_json.start_time != undefined
        ) {
          let today = new Date();

          let time =
            today.getHours() +
            ":" +
            today.getMinutes() +
            ":" +
            today.getSeconds();
          let unix_tmp = Math.round(+new Date() / 1000);

          let vidunsave_sidebar_bottom = document.getElementById(
            "video_sidebar_bottom_container"
          );

          let unsave_durationsidebar_bottom =
            vidunsave_sidebar_bottom.currentTime;
          let durationsidebarbottom =
            unsave_durationsidebar_bottom.toFixed(3) -
            banner_sidebar_bottom_reporting_json.start_timestamp.toFixed(3);
          let temp_json = {
            start_time: "",
            start_timestamp: "",
            banner_id: "",
            banner_cat_id: "",
            position: "Sidebar-bottom",
            duration: "",
            type: ttyuip.props.type,
            type_id: "",
            end_time: "",
            end_timestamp: "",
            timestamp_get: "",
          };

          if (
            banner_sidebar_bottom_url_and_redirect[
              banner_sidebar_bottom_play_key
            ] != undefined
          ) {
            temp_json = {
              start_time: banner_sidebar_bottom_reporting_json.start_time,
              start_timestamp: "",
              banner_id:
                banner_sidebar_bottom_url_and_redirect[
                  banner_sidebar_bottom_play_key
                ].banner_id,
              banner_cat_id: banner_sidebar_bottom_reporting_json.banner_cat_id,
              position: "Sidebar-bottom",
              duration: Math.abs(Math.abs(durationsidebarbottom.toFixed(3))),
              type: ttyuip.props.type,
              type_id: banner_sidebar_bottom_reporting_json.type_id,
              end_time: time,
              end_timestamp: "",
              timestamp_get: banner_call,
            };
          }
          reporting_json_array.push(temp_json);

          banner_sidebar_bottom_reporting_json.start_time = "";
          banner_sidebar_bottom_reporting_json.end_time = "";

          temp_json = {
            start_time: "",
            start_timestamp: "",
            banner_id: "",
            banner_cat_id: "",
            position: "Sidebar-bottom",
            duration: "",
            type: ttyuip.props.type,
            type_id: "",
            end_time: "",
            end_timestamp: "",
            timestamp_get: "",
          };
        }
      }

      let videovissidebartop = $("#video_sidebar_top_container").get(0);

      if (
        videovissidebartop != undefined &&
        videovissidebartop.paused &&
        ttyuip.is_on_screen_sidebar_top("video_imagecont_sidebar_top")
      ) {
        if (
          banner_sidebar_top_reporting_json.start_time != "" &&
          banner_sidebar_top_reporting_json.start_time != undefined
        ) {
          let today = new Date();

          let time =
            today.getHours() +
            ":" +
            today.getMinutes() +
            ":" +
            today.getSeconds();
          let unix_tmp = Math.round(+new Date() / 1000);

          let vidunsave_sidebar_top = document.getElementById(
            "video_sidebar_top_container"
          );

          let unsave_durationsidebartop = vidunsave_sidebar_top.currentTime;
          let durationsidebartop =
            unsave_durationsidebartop.toFixed(3) -
            banner_sidebar_top_reporting_json.start_timestamp.toFixed(3);

          let temp_json = {
            start_time: "",
            start_timestamp: "",
            banner_id: "",
            banner_cat_id: "",
            position: "Sidebar-Top",
            duration: "",
            type: ttyuip.props.type,
            type_id: "",
            end_time: "",
            end_timestamp: "",
            timestamp_get: "",
          };
          if (
            banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key] !=
            undefined
          ) {
            temp_json = {
              start_time: banner_sidebar_top_reporting_json.start_time,
              start_timestamp: "",
              banner_id:
                banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key]
                  .banner_id,
              banner_cat_id: banner_sidebar_top_reporting_json.banner_cat_id,
              position: "Sidebar-Top",
              duration: Math.abs(Math.abs(durationsidebartop.toFixed(3))),
              type: ttyuip.props.type,
              type_id: banner_sidebar_top_reporting_json.type_id,
              end_time: time,
              end_timestamp: "",
              timestamp_get: banner_call,
            };

            reporting_json_array.push(temp_json);
          }

          banner_sidebar_top_reporting_json.start_time = "";
          banner_sidebar_top_reporting_json.end_time = "";

          temp_json = {
            start_time: "",
            start_timestamp: "",
            banner_id: "",
            banner_cat_id: "",
            position: "Sidebar-Top",
            duration: "",
            type: ttyuip.props.type,
            type_id: "",
            end_time: "",
            end_timestamp: "",
            timestamp_get: "",
          };
        }
      }

      if (reporting_json_array.length > 0) {
        //console.log(reporting_json_array)

        var userAgent = window.navigator.userAgent,
          platform = window.navigator.platform,
          macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
          windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
          iosPlatforms = ["iPhone", "iPad", "iPod"],
          os = null;

        if (macosPlatforms.indexOf(platform) !== -1) {
          os = "Mac OS";
        } else if (iosPlatforms.indexOf(platform) !== -1) {
          os = "iOS";
        } else if (windowsPlatforms.indexOf(platform) !== -1) {
          os = "Windows";
        } else if (/Android/.test(userAgent)) {
          os = "Android";
        } else if (!os && /Linux/.test(platform)) {
          os = "Linux";
        }

        fetch(url + "banner/addreport", {
          method: "POST",
          headers: {
            Authorization: reactLocalStorage.get(
              "@ClirnetStore:refreshToken",
              true
            ),

            version: "rjsw 1.1.1",
            OS: os,
          },
          body: JSON.stringify(reporting_json_array),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            reporting_json_array = [];
          })
          .catch((error) => {
            reporting_json_array = [];
          });
      }
    } else {
    }
  };

  componentDidMount() {
    reactLocalStorage.set("@ClirnetStore:latest_url", window.location.href);

    var unsavetype = this.props.type;
    var temp_token = reactLocalStorage.get("@ClirnetStore:refreshToken", true);

    useriduse = reactLocalStorage.get("@ClirnetStore:user_master_id", true);

    if (this.props.banner_position == 1) {
      setTimeout(function () {
        var video1 = $(".top_banner_div video").height();
        //$(".top_banner_div").height(video1 + 25 + 'px');
      }, 4000);

      var that67 = this;

      document.addEventListener("visibilitychange", function logData() {
        if (document.visibilityState === "hidden") {
          if (document.getElementById("video_top_container") != undefined) {
            if (that67.is_on_screen_top("video_imagecont")) {
              banner_top_video_change_permission = 0;
              if (document.getElementById("video_top_container") != undefined) {
                document.getElementById("video_top_container").pause();
              }
            }
          }
        }
      });

      $(window).focus(function () {
        if (document.getElementById("video_top_container") != undefined) {
          if (that67.is_on_screen_top("video_imagecont")) {
            banner_top_video_change_permission = 1;
            if (document.getElementById("video_top_container") != undefined) {
              document.getElementById("video_top_container").play();
            }
          }
        }

        //do something
      });

      var ddj_top;

      var thattemp2 = this;
      var is_first_time_apply_top = 1;

      var is_first_time_apply_down_top = 1;
      $(window).scroll(function () {
        // bind window scroll event
        if ($("#video_imagecont").length > 0) {
          // if target element exists in DOM
          var videocontainertopscroll = document.getElementById(
            "video_top_container"
          );

          if (thattemp2.is_on_screen_top("video_imagecont")) {
            if (
              videocontainertopscroll != undefined &&
              banner_top_onclick_pause == 0
            ) {
              if (
                is_first_time_apply_top == 1 &&
                is_first_time_apply_down_top == 0
              ) {
                banner_top_video_change_permission = 1;

                //tempthis12.start_timer_top(myTimer_small_value_top)
                clearTimeout(myTimer_top_main);

                //thattemp2.start_timer_top(ddj_top)
                videocontainertopscroll.play();
                is_first_time_apply_top = 0;
                is_first_time_apply_down_top = 1;
              }
            }
          } else {
            if (is_first_time_apply_down_top == 1) {
              is_first_time_apply_down_top = 0;

              is_first_time_apply_top = 1;

              clearTimeout(myTimer_top_main);

              if (myTimer_small_value_top != "") {
                var videochtop = $("#video_top_container").get(0);
                if (videochtop != undefined && videochtop.paused) {
                } else {
                  ddj_top = myTimer_small_value_top;
                }

                // tempthis12.start_timer_top(myTimer_small_value_top)
              } else {
                if (videochtop != undefined && videochtop.paused) {
                } else {
                  ddj_top = myTimer_small_value_top_temp;
                }
                // tempthis12.start_timer_top(myTimer_small_value_top_temp)
              }

              banner_top_video_change_permission = 0;

              if (videocontainertopscroll != undefined) {
                videocontainertopscroll.pause();
              }
            }
          }
        }
      });

      var thatint = this;

      window.setInterval(function () {
        if ($("#video_top_container").get(0) != undefined) {
          var video = $("#video_top_container").get(0);

          if (video.paused) {
            if (
              banner_top_reporting_json.start_time != "" &&
              banner_top_reporting_json.start_time != undefined
            ) {
              let today = new Date();

              let time =
                today.getHours() +
                ":" +
                today.getMinutes() +
                ":" +
                today.getSeconds();
              let unix_tmp = Math.round(+new Date() / 1000);

              let temp_json = {
                start_time: "",
                start_timestamp: "",
                banner_id: "",
                banner_cat_id: "",
                position: "Top",
                duration: "",
                type: thatint.props.type,
                type_id: "",
                end_time: "",
                end_timestamp: "",
                timestamp_get: "",
              };
              if (
                banner_top_url_and_redirect[banner_top_play_key] != undefined
              ) {
                let vidunsave_top = document.getElementById(
                  "video_top_container"
                );

                let unsave_durationtop = vidunsave_top.currentTime;
                let durationtop =
                  unsave_durationtop.toFixed(3) -
                  banner_top_reporting_json.start_timestamp.toFixed(3);
                temp_json = {
                  start_time: banner_top_reporting_json.start_time,
                  start_timestamp: "",
                  banner_id:
                    banner_top_url_and_redirect[banner_top_play_key].banner_id,
                  banner_cat_id: banner_top_reporting_json.banner_cat_id,
                  position: "Top",
                  duration: Math.abs(Math.abs(durationtop.toFixed(3))),
                  type: thatint.props.type,
                  type_id: banner_top_reporting_json.type_id,
                  end_time: time,
                  end_timestamp: "",
                  timestamp_get: banner_call,
                };

                reporting_json_array.push(temp_json);
              }

              banner_top_reporting_json.start_time = "";
              banner_top_reporting_json.end_time = "";

              temp_json = {
                start_time: "",
                start_timestamp: "",
                banner_id: "",
                banner_cat_id: "",
                position: "Top",
                duration: "",
                type: thatint.props.type,
                type_id: "",
                end_time: "",
                end_timestamp: "",
                timestamp_get: "",
              };

              //console.log(reporting_json_array)
            }
          } else {
            if (
              banner_top_reporting_json.start_time === "" ||
              banner_top_reporting_json.start_time == undefined
            ) {
              let today = new Date();
              let vidunsave_top = document.getElementById(
                "video_top_container"
              );
              local_video_time_top = vidunsave_top.currentTime;
              let unsave_durationtop = vidunsave_top.currentTime;
              let time =
                today.getHours() +
                ":" +
                today.getMinutes() +
                ":" +
                today.getSeconds();
              let unix_tmp = Math.round(+new Date() / 1000);
              banner_top_reporting_json.start_time = time;
              banner_top_reporting_json.start_timestamp = unsave_durationtop;
              //console.log(banner_top_reporting_json)
            }
          }

          //return false;
        }
      }, 500);

      let rrthat = this;

      myvartop = window.setInterval(function () {
        //console.log(banner_top_type+"llllllll")

        if (banner_top_type === "image") {
          //console.log(top_image_change_time+"increement")
          top_image_change_time = top_image_change_time + 1;
          if (banner_top_duration == parseInt(top_image_change_time)) {
            //console.log(banner_top_url_and_redirect)
            if (banner_top_play_key < banner_top_url_and_redirect.length - 1) {
              banner_top_play_key = parseInt(banner_top_play_key) + parseInt(1);

              //reactLocalStorage.set('@ClirnetStore:global_top_play_key',banner_top_play_key);

              if (
                banner_top_url_and_redirect[banner_top_play_key] != undefined
              ) {
                let new_img =
                  banner_top_url_and_redirect[banner_top_play_key].image;
                let imagecontainertop = document.getElementById("top_image");
                imagecontainertop.setAttribute("src", new_img);

                if (
                  banner_top_url_and_redirect[banner_top_play_key].format ==
                  "video"
                ) {
                  banner_top_type = "video";
                  $(".view_image_top").css("display", "none");
                  $(".view_video_top").css("display", "block");
                  let videocontainertoplet = document.getElementById(
                    "video_top_container"
                  );
                  let videosourcetoplet = document.getElementById("video_top");
                  if (videocontainertoplet != undefined) {
                    videocontainertoplet.pause();

                    videosourcetoplet.setAttribute("src", new_img);
                  }

                  if (videocontainertoplet != undefined) {
                    videocontainertoplet.load();
                    if (rrthat.is_on_screen_top("video_imagecont")) {
                      videocontainertoplet.play();
                    }
                  }
                }
              }
            } else {
              banner_top_play_key = 0;

              if (
                banner_top_url_and_redirect[banner_top_play_key] != undefined
              ) {
                //reactLocalStorage.set('@ClirnetStore:global_top_play_key',banner_top_play_key);

                let new_img =
                  banner_top_url_and_redirect[banner_top_play_key].image;
                let imagecontainertop = document.getElementById("top_image");
                imagecontainertop.setAttribute("src", new_img);
                if (
                  banner_top_url_and_redirect[banner_top_play_key].format ==
                  "video"
                ) {
                  banner_top_type = "video";
                  $(".view_image_top").css("display", "none");
                  $(".view_video_top").css("display", "block");
                  let videocontainertoplet = document.getElementById(
                    "video_top_container"
                  );
                  let videosourcetoplet = document.getElementById("video_top");
                  if (videocontainertoplet != undefined) {
                    videocontainertoplet.pause();

                    videosourcetoplet.setAttribute("src", new_img);
                  }

                  if (videocontainertoplet != undefined) {
                    videocontainertoplet.load();
                    if (rrthat.is_on_screen_top("video_imagecont")) {
                      videocontainertoplet.play();
                    }
                  }
                }
              }
            }
            let today = new Date();

            let time =
              today.getHours() +
              ":" +
              today.getMinutes() +
              ":" +
              today.getSeconds();

            top_image_change_time = 0;
            let temp_json = {
              start_time: banner_top_reporting_json.start_time,
              start_timestamp: "",
              banner_id:
                banner_top_url_and_redirect[banner_top_play_key].banner_id,
              banner_cat_id: banner_top_reporting_json.banner_cat_id,
              position: "Top",
              duration: Math.abs(Math.abs(banner_top_duration)),
              type: "comp",
              type_id: 0,
              end_time: time,
              end_timestamp: "",
              timestamp_get: banner_call,
            };
            reporting_json_array.push(temp_json);
          }
        }
      }, 1000);
    }

    if (this.props.banner_position == 2) {
      setTimeout(function () {
        var video4 = $(".bottom_banner_div video").height();
        //$(".bottom_banner_div").height(video4 + 25 + 'px');
      }, 4000);

      var that67 = this;

      document.addEventListener("visibilitychange", function logData() {
        if (document.visibilityState === "hidden") {
          if (document.getElementById("video_imagecont_bottom") != undefined) {
            if (!that67.is_on_screen_bottom("video_imagecont_bottom")) {
              // alert()

              banner_bottom_video_change_permission = 0;
              if (
                document.getElementById("video_imagecont_bottom") != undefined
              ) {
                document.getElementById("video_imagecont_bottom").pause();
              }
            }
          }
        }
      });

      // $(window).blur(function () {

      //   if (document.getElementById('video_imagecont_bottom') != undefined) {
      //     if (!that67.is_on_screen_bottom('video_imagecont_bottom')) {

      //       // alert()

      //       banner_bottom_video_change_permission = 0;
      //       if (document.getElementById('video_imagecont_bottom') != undefined) {
      //         document.getElementById('video_imagecont_bottom').pause();
      //       }

      //     }
      //   }

      //   //do something
      // });

      $(window).focus(function () {
        if (document.getElementById("video_imagecont_bottom") != undefined) {
          if (that67.is_on_screen_bottom("video_imagecont_bottom")) {
            // alert()

            banner_bottom_video_change_permission = 1;
            if (
              document.getElementById("video_imagecont_bottom") != undefined
            ) {
              document.getElementById("video_imagecont_bottom").pause();
            }
          }
        }

        //do something
      });

      var ddj_bottom;

      var tthy = this;

      var is_first_time_apply_bottom = 0;

      var is_first_time_apply_down_bottom = 1;
      $(window).scroll(function () {
        // bind window scroll event
        if ($("#video_imagecont_bottom").length > 0) {
          // if target element exists in DOM
          var videocontainerbottomscroll = document.getElementById(
            "video_bottom_container"
          );

          if (tthy.is_on_screen_bottom("video_imagecont_bottom")) {
            if (
              videocontainerbottomscroll != undefined &&
              banner_bottom_onclick_pause == 0
            ) {
              if (
                is_first_time_apply_bottom == 1 &&
                is_first_time_apply_down_bottom == 0 &&
                ddj_bottom != ""
              ) {
                //alert();

                banner_bottom_video_change_permission = 1;

                //tempthis12.start_timer_top(myTimer_small_value_top)
                clearTimeout(myTimer_bottom_main);

                //thattemp2.start_timer_bottom(ddj_bottom)
                videocontainerbottomscroll.play();
                is_first_time_apply_bottom = 0;
                is_first_time_apply_down_bottom = 1;
              }
            }
          } else {
            if (
              is_first_time_apply_down_bottom == 1 &&
              videocontainerbottomscroll != undefined
            ) {
              is_first_time_apply_down_bottom = 0;

              is_first_time_apply_bottom = 1;

              clearTimeout(myTimer_bottom_main);

              if (myTimer_small_value_bottom != "") {
                var videochbottom = $("#video_bottom_container").get(0);
                if (videochbottom != undefined && videochbottom.paused) {
                } else {
                  ddj_bottom = myTimer_small_value_bottom;
                }

                // tempthis12.start_timer_top(myTimer_small_value_top)
              } else {
                if (videochbottom != undefined && videochbottom.paused) {
                } else {
                  if (myTimer_small_value_bottom_temp != "") {
                    ddj_bottom = myTimer_small_value_bottom_temp;
                  } else {
                    ddj_bottom = banner_bottom_duration;

                    //alert(ddj_bottom)
                  }
                }
                // tempthis12.start_timer_top(myTimer_small_value_top_temp)
              }

              banner_bottom_video_change_permission = 0;

              if (videocontainerbottomscroll != undefined) {
                videocontainerbottomscroll.pause();
              }
            }
          }
        }
      });

      var ggghyi = this;

      window.setInterval(function () {
        if ($("#video_bottom_container").get(0) != undefined) {
          var video_bottom_track = $("#video_bottom_container").get(0);

          if (video_bottom_track.paused) {
            if (
              banner_bottom_reporting_json.start_time != "" &&
              banner_bottom_reporting_json.start_time != undefined
            ) {
              let today = new Date();

              let time =
                today.getHours() +
                ":" +
                today.getMinutes() +
                ":" +
                today.getSeconds();
              let unix_tmp = Math.round(+new Date() / 1000);

              let vidunsave_bottom = document.getElementById(
                "video_bottom_container"
              );

              let unsave_durationbottom = vidunsave_bottom.currentTime;
              let durationbottom =
                unsave_durationbottom.toFixed(3) -
                banner_bottom_reporting_json.start_timestamp.toFixed(3);
              let temp_json = {
                start_time: banner_bottom_reporting_json.start_time,
                start_timestamp: "",
                banner_id:
                  banner_bottom_url_and_redirect[banner_bottom_play_key]
                    .banner_id,
                banner_cat_id: banner_bottom_reporting_json.banner_cat_id,
                position: "Bottom",
                duration: Math.abs(Math.abs(durationbottom.toFixed(3))),
                type: ggghyi.props.type,
                type_id: banner_bottom_reporting_json.type_id,
                end_time: time,
                end_timestamp: "",
                timestamp_get: banner_call,
              };

              reporting_json_array.push(temp_json);

              banner_bottom_reporting_json.start_time = "";
              banner_bottom_reporting_json.end_time = "";

              temp_json = {
                start_time: "",
                start_timestamp: "",
                banner_id: "",
                banner_cat_id: "",
                position: "Bottom",
                duration: "",
                type: ggghyi.props.type,
                type_id: "",
                end_time: "",
                end_timestamp: "",
                timestamp_get: "",
              };

              //console.log(reporting_json_array)
            }
          } else {
            if (
              banner_bottom_reporting_json.start_time === "" ||
              banner_bottom_reporting_json.start_time == undefined
            ) {
              let today = new Date();
              let vidunsave_bottom = document.getElementById(
                "video_bottom_container"
              );
              local_video_time_bottom = vidunsave_bottom.currentTime;
              let unsave_durationsidebartop = vidunsave_bottom.currentTime;
              let time =
                today.getHours() +
                ":" +
                today.getMinutes() +
                ":" +
                today.getSeconds();
              let unix_tmp = Math.round(+new Date() / 1000);
              banner_bottom_reporting_json.start_time = time;
              banner_bottom_reporting_json.start_timestamp =
                unsave_durationsidebartop;
              //console.log(banner_top_reporting_json)
            }
          }

          //return false;
        }
      }, 500);

      var ggui = this;

      myvarbottom = window.setInterval(function () {
        if (banner_bottom_type === "image") {
          bottom_image_change_time = bottom_image_change_time + 1;
          if (banner_bottom_duration == parseInt(bottom_image_change_time)) {
            if (
              banner_bottom_play_key <
              banner_bottom_url_and_redirect.length - 1
            ) {
              banner_bottom_play_key =
                parseInt(banner_bottom_play_key) + parseInt(1);
              //reactLocalStorage.set('@ClirnetStore:global_bottom_play_key',banner_bottom_play_key);

              if (
                banner_bottom_url_and_redirect[banner_bottom_play_key] !=
                undefined
              ) {
                let new_img =
                  banner_bottom_url_and_redirect[banner_bottom_play_key].image;
                let imagecontainerbottom =
                  document.getElementById("bottom_image");
                imagecontainerbottom.setAttribute("src", new_img);
                if (
                  banner_bottom_url_and_redirect[banner_bottom_play_key]
                    .format == "video"
                ) {
                  banner_bottom_type = "video";
                  $(".view_image_bottom").css("display", "none");
                  $(".view_video_bottom").css("display", "block");
                  let videocontainerbottomlet = document.getElementById(
                    "video_bottom_container"
                  );
                  let videosourcebottomlet =
                    document.getElementById("video_bottom");
                  if (videocontainerbottomlet != undefined) {
                    videocontainerbottomlet.pause();

                    videosourcebottomlet.setAttribute("src", new_img);
                  }

                  if (videocontainerbottomlet != undefined) {
                    videocontainerbottomlet.load();
                    if (ggui.is_on_screen_bottom("video_imagecont_bottom")) {
                      videocontainerbottomlet.play();
                    }
                  }
                }
              }
            } else {
              banner_bottom_play_key = 0;
              //reactLocalStorage.set('@ClirnetStore:global_bottom_play_key',banner_bottom_play_key);
              if (
                banner_bottom_url_and_redirect[banner_bottom_play_key] !=
                undefined
              ) {
                let new_img =
                  banner_bottom_url_and_redirect[banner_bottom_play_key].image;
                let imagecontainerbottom =
                  document.getElementById("bottom_image");
                imagecontainerbottom.setAttribute("src", new_img);
                if (
                  banner_bottom_url_and_redirect[banner_bottom_play_key]
                    .format == "video"
                ) {
                  banner_bottom_type = "video";
                  $(".view_image_bottom").css("display", "none");
                  $(".view_video_bottom").css("display", "block");
                  let videocontainerbottomlet = document.getElementById(
                    "video_bottom_container"
                  );
                  let videosourcebottomlet =
                    document.getElementById("video_bottom");
                  if (videocontainerbottomlet != undefined) {
                    videocontainerbottomlet.pause();

                    videosourcebottomlet.setAttribute("src", new_img);
                  }

                  if (videocontainerbottomlet != undefined) {
                    videocontainerbottomlet.load();
                    if (ggui.is_on_screen_bottom("video_imagecont_bottom")) {
                      videocontainerbottomlet.play();
                    }
                  }
                }
              }
            }
            bottom_image_change_time = 0;
            let today = new Date();

            let time =
              today.getHours() +
              ":" +
              today.getMinutes() +
              ":" +
              today.getSeconds();

            let temp_json = {
              start_time: banner_bottom_reporting_json.start_time,
              start_timestamp: "",
              banner_id:
                banner_bottom_url_and_redirect[banner_bottom_play_key]
                  .banner_id,
              banner_cat_id: banner_bottom_url_and_redirect.banner_cat_id,
              position: "Bottom",
              duration: Math.abs(Math.abs(banner_bottom_duration)),
              type: "comp",
              type_id: 0,
              end_time: time,
              end_timestamp: "",
              timestamp_get: banner_call,
            };
            reporting_json_array.push(temp_json);
          }
        }
      }, 1000);
    }

    if (this.props.banner_position == 3) {
      reactLocalStorage.set("@ClirnetStore:global_sidebar_top_play_key", 0);
      //document.getElementById('video_sidebar_top_container').load();

      setTimeout(function () {
        var video2 = $(".sidebar_top_banner_div video").height();
        //$(".sidebar_top_banner_div").height(video2 + 25 + 'px');
      }, 4000);

      var that67 = this;

      document.addEventListener("visibilitychange", function logData() {
        if (document.visibilityState === "hidden") {
          if (
            document.getElementById("video_sidebar_top_container") != undefined
          ) {
            if (
              that67.is_on_screen_sidebar_top("video_imagecont_sidebar_top")
            ) {
              banner_sidebar_top_video_change_permission = 0;
              if (
                document.getElementById("video_sidebar_top_container") !=
                this.undefined
              ) {
                document.getElementById("video_sidebar_top_container").pause();
              }
            }
          }
        }
      });

      // $(window).blur(function () {

      //   if (document.getElementById('video_sidebar_top_container') != undefined) {

      //     if (that67.is_on_screen_sidebar_top('video_imagecont_sidebar_top')) {

      //       banner_sidebar_top_video_change_permission = 0;
      //       if (document.getElementById('video_sidebar_top_container') != this.undefined) {
      //         document.getElementById('video_sidebar_top_container').pause();
      //       }

      //     }
      //   }

      //   //do something
      // });

      $(window).focus(function () {
        //console.log("focussed")
        if (
          document.getElementById("video_sidebar_top_container") != undefined
        ) {
          if (that67.is_on_screen_sidebar_top("video_imagecont_sidebar_top")) {
            banner_sidebar_top_video_change_permission = 1;
            if (
              document.getElementById("video_sidebar_top_container") !=
              undefined
            ) {
              document.getElementById("video_sidebar_top_container").play();
            }
          }
        }

        //do something
      });

      var ddj_sidebar_top;

      var thattemp2 = this;

      var is_first_time_apply_sidebar_top = 0;

      var is_first_time_apply_down_sidebar_top = 1;
      $(window).scroll(function () {
        // bind window scroll event
        if ($("#video_imagecont_sidebar_top").length > 0) {
          // if target element exists in DOM
          var videocontainersidebar_topscroll = document.getElementById(
            "video_sidebar_top_container"
          );

          if (
            thattemp2.is_on_screen_sidebar_top("video_imagecont_sidebar_top")
          ) {
            //console.log("present")

            if (
              videocontainersidebar_topscroll != undefined &&
              banner_sidebar_top_onclick_pause == 0
            ) {
              if (
                is_first_time_apply_sidebar_top == 1 &&
                is_first_time_apply_down_sidebar_top == 0 &&
                ddj_sidebar_top != ""
              ) {
                //alert();

                banner_sidebar_top_video_change_permission = 1;

                //tempthis12.start_timer_top(myTimer_small_value_top)
                clearTimeout(myTimer_sidebar_top_main);

                //thattemp2.start_timer_sidebar_top(ddj_sidebar_top)
                videocontainersidebar_topscroll.play();
                is_first_time_apply_sidebar_top = 0;
                is_first_time_apply_down_sidebar_top = 1;
              }
            }
          } else {
            if (
              is_first_time_apply_down_sidebar_top == 1 &&
              videocontainersidebar_topscroll != undefined
            ) {
              is_first_time_apply_down_sidebar_top = 0;

              is_first_time_apply_sidebar_top = 1;

              clearTimeout(myTimer_sidebar_top_main);

              if (myTimer_small_value_sidebar_top != "") {
                var videochsidebar_top = $("#video_sidebar_top_container").get(
                  0
                );
                if (
                  videochsidebar_top != undefined &&
                  videochsidebar_top.paused
                ) {
                } else {
                  ddj_sidebar_top = myTimer_small_value_sidebar_top;
                }

                // tempthis12.start_timer_top(myTimer_small_value_top)
              } else {
                if (
                  videochsidebar_top != undefined &&
                  videochsidebar_top.paused
                ) {
                } else {
                  if (myTimer_small_value_sidebar_top_temp != "") {
                    ddj_sidebar_top = myTimer_small_value_sidebar_top_temp;
                  } else {
                    ddj_sidebar_top = banner_sidebar_top_duration;

                    //alert(ddj_sidebar_top)
                  }
                }
                // tempthis12.start_timer_top(myTimer_small_value_top_temp)
              }

              banner_sidebar_top_video_change_permission = 0;

              videocontainersidebar_topscroll.pause();
            }
          }
        }
      });

      var thatgghy = this;
      window.setInterval(function () {
        if ($("#video_sidebar_top_container").get(0) != undefined) {
          var video = $("#video_sidebar_top_container").get(0);

          if (video.paused) {
            if (
              banner_sidebar_top_reporting_json.start_time != "" &&
              banner_sidebar_top_reporting_json.start_time != undefined
            ) {
              let today = new Date();

              let time =
                today.getHours() +
                ":" +
                today.getMinutes() +
                ":" +
                today.getSeconds();
              let unix_tmp = Math.round(+new Date() / 1000);

              let vidunsave_sidebar_top = document.getElementById(
                "video_sidebar_top_container"
              );

              let unsave_durationsidebartop = vidunsave_sidebar_top.currentTime;
              let durationsidebartop =
                unsave_durationsidebartop.toFixed(3) -
                banner_sidebar_top_reporting_json.start_timestamp.toFixed(3);

              let temp_json = {
                start_time: "",
                start_timestamp: "",
                banner_id: "",
                banner_cat_id: "",
                position: "Sidebar-Top",
                duration: "",
                type: thatgghy.props.type,
                type_id: "",
                end_time: "",
                end_timestamp: "",
                timestamp_get: "",
              };
              if (
                banner_sidebar_top_url_and_redirect[
                  banner_sidebar_top_play_key
                ] != undefined
              ) {
                temp_json = {
                  start_time: banner_sidebar_top_reporting_json.start_time,
                  start_timestamp: "",
                  banner_id:
                    banner_sidebar_top_url_and_redirect[
                      banner_sidebar_top_play_key
                    ].banner_id,
                  banner_cat_id:
                    banner_sidebar_top_reporting_json.banner_cat_id,
                  position: "Sidebar-Top",
                  duration: Math.abs(Math.abs(durationsidebartop.toFixed(3))),
                  type: thatgghy.props.type,
                  type_id: banner_sidebar_top_reporting_json.type_id,
                  end_time: time,
                  end_timestamp: "",
                  timestamp_get: banner_call,
                };

                reporting_json_array.push(temp_json);
              }

              banner_sidebar_top_reporting_json.start_time = "";
              banner_sidebar_top_reporting_json.end_time = "";

              temp_json = {
                start_time: "",
                start_timestamp: "",
                banner_id: "",
                banner_cat_id: "",
                position: "Sidebar-Top",
                duration: "",
                type: thatgghy.props.type,
                type_id: "",
                end_time: "",
                end_timestamp: "",
                timestamp_get: "",
              };

              //console.log(reporting_json_array)
            }
          } else {
            if (
              banner_sidebar_top_reporting_json.start_time === "" ||
              banner_sidebar_top_reporting_json.start_time == undefined
            ) {
              let today = new Date();
              let vidunsave_sidebar_top = document.getElementById(
                "video_sidebar_top_container"
              );
              local_video_time_sidebar_top = vidunsave_sidebar_top.currentTime;
              let unsave_durationsidebartop = vidunsave_sidebar_top.currentTime;
              let time =
                today.getHours() +
                ":" +
                today.getMinutes() +
                ":" +
                today.getSeconds();
              let unix_tmp = Math.round(+new Date() / 1000);
              banner_sidebar_top_reporting_json.start_time = time;
              banner_sidebar_top_reporting_json.start_timestamp =
                unsave_durationsidebartop;
              //console.log(banner_top_reporting_json)
            }
          }

          //return false;
        }
      }, 500);

      var thatroy = this;
      myvarsidebar_top = window.setInterval(function () {
        if (banner_sidebar_top_type === "image") {
          sidebar_top_image_change_time = sidebar_top_image_change_time + 1;

          if (
            banner_sidebar_top_duration ==
            parseInt(sidebar_top_image_change_time)
          ) {
            if (
              banner_sidebar_top_play_key <
              banner_sidebar_top_url_and_redirect.length - 1
            ) {
              banner_sidebar_top_play_key =
                parseInt(banner_sidebar_top_play_key) + parseInt(1);
              //reactLocalStorage.set('@ClirnetStore:global_sidebar_top_play_key',banner_sidebar_top_play_key);

              if (
                banner_sidebar_top_url_and_redirect[
                  banner_sidebar_top_play_key
                ] != undefined
              ) {
                let new_img =
                  banner_sidebar_top_url_and_redirect[
                    banner_sidebar_top_play_key
                  ].image;
                //let imagecontainersidebartop = document.getElementById('sidebar_top_image');
                document
                  .getElementById("sidebar_top_image")
                  .setAttribute("src", new_img);

                if (
                  banner_sidebar_top_url_and_redirect[
                    banner_sidebar_top_play_key
                  ].format == "video"
                ) {
                  banner_sidebar_top_type = "video";
                  $(".view_image_sidebar_top").css("display", "none");
                  $(".view_video_sidebar_top").css("display", "block");
                  let videocontainersidebar_toplet = document.getElementById(
                    "video_sidebar_top_container"
                  );
                  let videosourcesidebar_toplet =
                    document.getElementById("video_sidebar_top");
                  if (videocontainersidebar_toplet != undefined) {
                    videocontainersidebar_toplet.pause();

                    videosourcesidebar_toplet.setAttribute("src", new_img);
                  }

                  if (videocontainersidebar_toplet != undefined) {
                    videocontainersidebar_toplet.load();
                    if (
                      thatroy.is_on_screen_sidebar_top(
                        "video_imagecont_sidebar_top"
                      )
                    ) {
                      videocontainersidebar_toplet.play();
                    }
                  }
                }
              }
            } else {
              banner_sidebar_top_play_key = 0;
              //reactLocalStorage.set('@ClirnetStore:global_sidebar_top_play_key',banner_sidebar_top_play_key);

              if (
                banner_sidebar_top_url_and_redirect[
                  banner_sidebar_top_play_key
                ] != undefined
              ) {
                let new_img =
                  banner_sidebar_top_url_and_redirect[
                    banner_sidebar_top_play_key
                  ].image;
                //let imagecontainersidebartop = document.getElementById('sidebar_top_image');
                document
                  .getElementById("sidebar_top_image")
                  .setAttribute("src", new_img);
                if (
                  banner_sidebar_top_url_and_redirect[
                    banner_sidebar_top_play_key
                  ].format == "video"
                ) {
                  banner_sidebar_top_type = "video";
                  $(".view_image_sidebar_top").css("display", "none");
                  $(".view_video_sidebar_top").css("display", "block");
                  let videocontainersidebar_toplet = document.getElementById(
                    "video_sidebar_top_container"
                  );
                  let videosourcesidebar_toplet =
                    document.getElementById("video_sidebar_top");
                  if (videocontainersidebar_toplet != undefined) {
                    videocontainersidebar_toplet.pause();

                    videosourcesidebar_toplet.setAttribute("src", new_img);
                  }

                  if (videocontainersidebar_toplet != undefined) {
                    videocontainersidebar_toplet.load();
                    if (
                      thatroy.is_on_screen_sidebar_top(
                        "video_imagecont_sidebar_top"
                      )
                    ) {
                      videocontainersidebar_toplet.play();
                    }
                  }
                }
              }
            }
            sidebar_top_image_change_time = 0;
            let today = new Date();

            let time =
              today.getHours() +
              ":" +
              today.getMinutes() +
              ":" +
              today.getSeconds();

            let temp_json = {
              start_time: banner_sidebar_top_reporting_json.start_time,
              start_timestamp: "",
              banner_id:
                banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key]
                  .banner_id,
              banner_cat_id: banner_sidebar_top_url_and_redirect.banner_cat_id,
              position: "Sidebar-Top",
              duration: Math.abs(Math.abs(banner_sidebar_top_duration)),
              type: "comp",
              type_id: 0,
              end_time: time,
              end_timestamp: "",
              timestamp_get: banner_call,
            };
            reporting_json_array.push(temp_json);
          }
        }
      }, 1000);
    }

    if (this.props.banner_position == 4) {
      setTimeout(function () {
        var video3 = $(".sidebar_bottom_banner_div video").height();
        //$(".sidebar_bottom_banner_div").height(video3 + 25 + 'px');
      }, 4000);

      var that67 = this;

      document.addEventListener("visibilitychange", function logData() {
        if (document.visibilityState === "hidden") {
          if (
            document.getElementById("video_imagecont_sidebar_bottom") !=
            undefined
          ) {
            if (
              that67.is_on_screen_sidebar_bottom(
                "video_imagecont_sidebar_bottom"
              )
            ) {
              banner_sidebar_bottom_video_change_permission = 0;
              //alert(document.getElementById('video_imagecont_sidebar_bottom'))
              if (
                document.getElementById("video_imagecont_sidebar_bottom") !=
                  undefined &&
                document.getElementById("video_imagecont_sidebar_bottom") !=
                  null
              ) {
                //alert()
                document
                  .getElementById("video_sidebar_bottom_container")
                  .pause();
              }
            }
          }
        }
      });

      // $(window).blur(function () {

      //   if (document.getElementById('video_imagecont_sidebar_bottom') != undefined) {
      //     if (that67.is_on_screen_sidebar_bottom('video_imagecont_sidebar_bottom')) {

      //       banner_sidebar_bottom_video_change_permission = 0;
      //       //alert(document.getElementById('video_imagecont_sidebar_bottom'))
      //       if (document.getElementById('video_imagecont_sidebar_bottom') != undefined && document.getElementById('video_imagecont_sidebar_bottom') != null) {
      //         //alert()
      //         document.getElementById('video_sidebar_bottom_container').pause();
      //       }

      //     }
      //   }

      //   //do something
      // });

      $(window).focus(function () {
        if (
          document.getElementById("video_imagecont_sidebar_bottom") != undefined
        ) {
          if (
            that67.is_on_screen_sidebar_bottom("video_imagecont_sidebar_bottom")
          ) {
            banner_sidebar_bottom_video_change_permission = 1;
            if (
              document.getElementById("video_imagecont_sidebar_bottom") !=
              undefined
            ) {
              document.getElementById("video_sidebar_bottom_container").play();
            }
          }
        }
        //do something
      });

      var ddj_sidebar_bottom;

      var natvar = this;

      var is_first_time_apply_sidebar_bottom = 0;

      var is_first_time_apply_down_sidebar_bottom = 1;
      $(window).scroll(function () {
        // bind window scroll event
        if ($("#video_imagecont_sidebar_bottom").length > 0) {
          //console.log("kkkkkkkkk");

          // if target element exists in DOM
          var videocontainersidebar_bottomscroll = document.getElementById(
            "video_sidebar_bottom_container"
          );

          if (
            natvar.is_on_screen_sidebar_bottom("video_imagecont_sidebar_bottom")
          ) {
            if (
              videocontainersidebar_bottomscroll != undefined &&
              banner_sidebar_bottom_onclick_pause == 0
            ) {
              if (
                is_first_time_apply_sidebar_bottom == 1 &&
                is_first_time_apply_down_sidebar_bottom == 0 &&
                ddj_sidebar_bottom != ""
              ) {
                //alert();

                banner_sidebar_bottom_video_change_permission = 1;

                //tempthis12.start_timer_top(myTimer_small_value_top)
                clearTimeout(myTimer_sidebar_bottom_main);

                //thattemp2.start_timer_sidebar_bottom(ddj_sidebar_bottom)
                videocontainersidebar_bottomscroll.play();
                is_first_time_apply_sidebar_bottom = 0;
                is_first_time_apply_down_sidebar_bottom = 1;
              }
            }
          } else {
            if (
              is_first_time_apply_down_sidebar_bottom == 1 &&
              videocontainersidebar_bottomscroll != undefined
            ) {
              // console.log("param disable")

              is_first_time_apply_down_sidebar_bottom = 0;

              is_first_time_apply_sidebar_bottom = 1;

              clearTimeout(myTimer_sidebar_bottom_main);

              if (myTimer_small_value_sidebar_bottom != "") {
                var videochsidebar_bottom = $(
                  "#video_sidebar_bottom_container"
                ).get(0);
                if (
                  videochsidebar_bottom != undefined &&
                  videochsidebar_bottom.paused
                ) {
                } else {
                  ddj_sidebar_bottom = myTimer_small_value_sidebar_bottom;
                }

                // tempthis12.start_timer_top(myTimer_small_value_top)
              } else {
                if (
                  videochsidebar_bottom != undefined &&
                  videochsidebar_bottom.paused
                ) {
                } else {
                  if (myTimer_small_value_sidebar_bottom_temp != "") {
                    ddj_sidebar_bottom =
                      myTimer_small_value_sidebar_bottom_temp;
                  } else {
                    ddj_sidebar_bottom = banner_sidebar_bottom_duration;

                    //alert(ddj_sidebar_bottom)
                  }
                }
                // tempthis12.start_timer_top(myTimer_small_value_top_temp)
              }

              banner_sidebar_bottom_video_change_permission = 0;

              if (videocontainersidebar_bottomscroll != undefined) {
                //alert()
                videocontainersidebar_bottomscroll.pause();
              }
            }
          }
        }
      });

      var natthis = this;

      window.setInterval(function () {
        if ($("#video_sidebar_bottom_container").get(0) != undefined) {
          var video_sidebar_bottom_track = $(
            "#video_sidebar_bottom_container"
          ).get(0);

          if (video_sidebar_bottom_track.paused) {
            if (
              banner_sidebar_bottom_reporting_json.start_time != "" &&
              banner_sidebar_bottom_reporting_json.start_time != undefined
            ) {
              let today = new Date();

              let time =
                today.getHours() +
                ":" +
                today.getMinutes() +
                ":" +
                today.getSeconds();
              let unix_tmp = Math.round(+new Date() / 1000);

              let vidunsave_sidebar_bottom = document.getElementById(
                "video_sidebar_bottom_container"
              );

              let unsave_durationsidebar_bottom =
                vidunsave_sidebar_bottom.currentTime;
              let durationsidebarbottom =
                unsave_durationsidebar_bottom.toFixed(3) -
                banner_sidebar_bottom_reporting_json.start_timestamp.toFixed(3);
              let temp_json = {
                start_time: "",
                start_timestamp: "",
                banner_id: "",
                banner_cat_id: "",
                position: "Sidebar-bottom",
                duration: "",
                type: natthis.props.type,
                type_id: "",
                end_time: "",
                end_timestamp: "",
                timestamp_get: "",
              };

              if (
                banner_sidebar_bottom_url_and_redirect[
                  banner_sidebar_bottom_play_key
                ] != undefined
              ) {
                temp_json = {
                  start_time: banner_sidebar_bottom_reporting_json.start_time,
                  start_timestamp: "",
                  banner_id:
                    banner_sidebar_bottom_url_and_redirect[
                      banner_sidebar_bottom_play_key
                    ].banner_id,
                  banner_cat_id:
                    banner_sidebar_bottom_reporting_json.banner_cat_id,
                  position: "Sidebar-bottom",
                  duration: Math.abs(
                    Math.abs(durationsidebarbottom.toFixed(3))
                  ),
                  type: natthis.props.type,
                  type_id: banner_sidebar_bottom_reporting_json.type_id,
                  end_time: time,
                  end_timestamp: "",
                  timestamp_get: banner_call,
                };
              }
              reporting_json_array.push(temp_json);

              banner_sidebar_bottom_reporting_json.start_time = "";
              banner_sidebar_bottom_reporting_json.end_time = "";

              temp_json = {
                start_time: "",
                start_timestamp: "",
                banner_id: "",
                banner_cat_id: "",
                position: "Sidebar-bottom",
                duration: "",
                type: natthis.props.type,
                type_id: "",
                end_time: "",
                end_timestamp: "",
                timestamp_get: "",
              };

              //console.log(reporting_json_array)
            }
          } else {
            if (
              banner_sidebar_bottom_reporting_json.start_time === "" ||
              banner_sidebar_bottom_reporting_json.start_time == undefined ||
              banner_sidebar_bottom_reporting_json.start_time == "NaN"
            ) {
              let today = new Date();
              let vidunsave_sidebar_bottom = document.getElementById(
                "video_sidebar_bottom_container"
              );
              local_video_time_sidebar_bottom =
                vidunsave_sidebar_bottom.currentTime;
              let unsave_durationsidebar_bottom =
                vidunsave_sidebar_bottom.currentTime;
              let time =
                today.getHours() +
                ":" +
                today.getMinutes() +
                ":" +
                today.getSeconds();
              let unix_tmp1 = Math.round(+new Date() / 1000);
              banner_sidebar_bottom_reporting_json.start_time = time;
              banner_sidebar_bottom_reporting_json.start_timestamp =
                unsave_durationsidebar_bottom;
              // console.log(banner_sidebar_bottom_reporting_json)
            }
          }

          //return false;
        }
      }, 500);

      var thty = this;

      myvarsidebar_bottom = window.setInterval(function () {
        if (banner_sidebar_bottom_type === "image") {
          sidebar_bottom_image_change_time =
            sidebar_bottom_image_change_time + 1;
          if (
            banner_sidebar_bottom_duration ==
            parseInt(sidebar_bottom_image_change_time)
          ) {
            if (
              banner_sidebar_bottom_play_key <
              banner_sidebar_bottom_url_and_redirect.length - 1
            ) {
              banner_sidebar_bottom_play_key =
                parseInt(banner_sidebar_bottom_play_key) + parseInt(1);
              //reactLocalStorage.set('@ClirnetStore:global_sidebar_bottom_play_key',banner_sidebar_bottom_play_key);

              if (
                banner_sidebar_bottom_url_and_redirect[
                  banner_sidebar_bottom_play_key
                ] != undefined
              ) {
                let new_img =
                  banner_sidebar_bottom_url_and_redirect[
                    banner_sidebar_bottom_play_key
                  ].image;
                let imagecontainersidebarbottom = document.getElementById(
                  "sidebar_bottom_image"
                );
                imagecontainersidebarbottom.setAttribute("src", new_img);

                if (
                  banner_sidebar_bottom_url_and_redirect[
                    banner_sidebar_bottom_play_key
                  ].format == "video"
                ) {
                  banner_sidebar_bottom_type = "video";
                  $(".view_image_sidebar_bottom").css("display", "none");
                  $(".view_video_sidebar_bottom").css("display", "block");
                  let videocontainersidebar_bottomlet = document.getElementById(
                    "video_sidebar_bottom_container"
                  );
                  let videosourcesidebar_bottomlet = document.getElementById(
                    "video_sidebar_bottom"
                  );
                  if (videocontainersidebar_bottomlet != undefined) {
                    videocontainersidebar_bottomlet.pause();

                    videosourcesidebar_bottomlet.setAttribute("src", new_img);
                  }

                  if (videocontainersidebar_bottomlet != undefined) {
                    videocontainersidebar_bottomlet.load();
                    if (
                      thty.is_on_screen_sidebar_bottom(
                        "video_imagecont_sidebar_bottom"
                      )
                    ) {
                      videocontainersidebar_bottomlet.play();
                    }
                  }
                }
              }
            } else {
              banner_sidebar_bottom_play_key = 0;
              //reactLocalStorage.set('@ClirnetStore:global_sidebar_bottom_play_key',banner_sidebar_bottom_play_key);

              if (
                banner_sidebar_bottom_url_and_redirect[
                  banner_sidebar_bottom_play_key
                ] != undefined
              ) {
                let new_img =
                  banner_sidebar_bottom_url_and_redirect[
                    banner_sidebar_bottom_play_key
                  ].image;
                let imagecontainersidebarbottom = document.getElementById(
                  "sidebar_bottom_image"
                );
                imagecontainersidebarbottom.setAttribute("src", new_img);

                if (
                  banner_sidebar_bottom_url_and_redirect[
                    banner_sidebar_bottom_play_key
                  ].format == "video"
                ) {
                  banner_sidebar_bottom_type = "video";
                  $(".view_image_sidebar_bottom").css("display", "none");
                  $(".view_video_sidebar_bottom").css("display", "block");
                  let videocontainersidebar_bottomlet = document.getElementById(
                    "video_sidebar_bottom_container"
                  );
                  let videosourcesidebar_bottomlet = document.getElementById(
                    "video_sidebar_bottom"
                  );
                  if (videocontainersidebar_bottomlet != undefined) {
                    videocontainersidebar_bottomlet.pause();

                    videosourcesidebar_bottomlet.setAttribute("src", new_img);
                  }

                  if (videocontainersidebar_bottomlet != undefined) {
                    videocontainersidebar_bottomlet.load();
                    if (
                      thty.is_on_screen_sidebar_bottom(
                        "video_imagecont_sidebar_bottom"
                      )
                    ) {
                      videocontainersidebar_bottomlet.play();
                    }
                  }
                }
              }
            }

            sidebar_bottom_image_change_time = 0;
            let today = new Date();

            let time =
              today.getHours() +
              ":" +
              today.getMinutes() +
              ":" +
              today.getSeconds();

            let temp_json = {
              start_time: banner_sidebar_bottom_reporting_json.start_time,
              start_timestamp: "",
              banner_id:
                banner_sidebar_bottom_url_and_redirect[
                  banner_sidebar_bottom_play_key
                ].banner_id,
              banner_cat_id:
                banner_sidebar_bottom_url_and_redirect.banner_cat_id,
              position: "Sudebar-Bottom",
              duration: Math.abs(Math.abs(banner_sidebar_bottom_duration)),
              type: "comp",
              type_id: 0,
              end_time: time,
              end_timestamp: "",
              timestamp_get: banner_call,
            };
            reporting_json_array.push(temp_json);
          }
        }
      }, 1000);
    }

    if (this.props.before_unload_call == 1) {
      if (reporting_json_array.length > 0) {
        window.addEventListener("beforeunload", (ev) => {
          $("html, body").css({
            overflow: "auto",
            height: "auto",
          });

          top_image_change_time = 0;
          sidebar_top_image_change_time = 0;
          sidebar_bottom_image_change_time = 0;
          bottom_image_change_time = 0;

          reactLocalStorage.set("@ClirnetStore:global_bottom_play_key", 0);

          reactLocalStorage.set("@ClirnetStore:global_top_play_key", 0);

          reactLocalStorage.set(
            "@ClirnetStore:global_sidebar_bottom_play_key",
            0
          );

          reactLocalStorage.set("@ClirnetStore:global_sidebar_top_play_key", 0);

          //console.log("hazarddddddddd")

          if (
            document.getElementById("video_top_container") != undefined &&
            document.getElementById("video_top_container") != null
          ) {
            var vidunsave_top = document.getElementById("video_top_container");

            var unsave_durationtop = vidunsave_top.currentTime;
            if (
              unsave_durationtop != 0 &&
              banner_top_reporting_json.start_time != ""
            ) {
              let today = new Date();

              let time =
                today.getHours() +
                ":" +
                today.getMinutes() +
                ":" +
                today.getSeconds();

              let temp_json = {
                start_time: banner_top_reporting_json.start_time,
                start_timestamp: "",
                banner_id:
                  banner_top_url_and_redirect[banner_top_play_key].banner_id,
                banner_cat_id: banner_top_reporting_json.banner_cat_id,
                position: "Top",
                duration: Math.abs(Math.abs(unsave_durationtop)),
                type: this.props.type,
                type_id: banner_top_reporting_json.type_id,
                end_time: time,
                end_timestamp: "",
                timestamp_get: banner_call,
              };
              reporting_json_array.push(temp_json);
            }
          }

          if (
            document.getElementById("video_bottom_container") != undefined &&
            document.getElementById("video_bottom_container") != null
          ) {
            var vidunsave_bottom = document.getElementById(
              "video_bottom_container"
            );

            var unsave_durationbottom = vidunsave_bottom.currentTime;
            if (
              unsave_durationbottom != 0 &&
              banner_bottom_reporting_json.start_time != ""
            ) {
              let today = new Date();

              let time =
                today.getHours() +
                ":" +
                today.getMinutes() +
                ":" +
                today.getSeconds();

              let temp_json = {
                start_time: banner_bottom_reporting_json.start_time,
                start_timestamp: "",
                banner_id:
                  banner_bottom_url_and_redirect[banner_bottom_play_key]
                    .banner_id,
                banner_cat_id: banner_bottom_reporting_json.banner_cat_id,
                position: "Bottom",
                duration: Math.abs(Math.abs(unsave_durationbottom)),
                type: this.props.type,
                type_id: banner_bottom_reporting_json.type_id,
                end_time: time,
                end_timestamp: "",
                timestamp_get: banner_call,
              };
              reporting_json_array.push(temp_json);
            }
          }

          if (
            document.getElementById("video_sidebar_bottom_container") !=
              undefined &&
            document.getElementById("video_sidebar_bottom_container") != null
          ) {
            var vidunsave_sidebar_bottom = document.getElementById(
              "video_sidebar_bottom_container"
            );

            var unsave_durationsidebar_bottom =
              vidunsave_sidebar_bottom.currentTime;
            if (
              unsave_durationsidebar_bottom != 0 &&
              banner_sidebar_bottom_reporting_json.start_time != ""
            ) {
              let today = new Date();

              let time =
                today.getHours() +
                ":" +
                today.getMinutes() +
                ":" +
                today.getSeconds();

              let temp_json = {
                start_time: banner_sidebar_bottom_reporting_json.start_time,
                start_timestamp: "",
                banner_id:
                  banner_sidebar_bottom_url_and_redirect[
                    banner_sidebar_bottom_play_key
                  ].banner_id,
                banner_cat_id:
                  banner_sidebar_bottom_reporting_json.banner_cat_id,
                position: "sidebar_bottom",
                duration: Math.abs(Math.abs(unsave_durationsidebar_bottom)),
                type: this.props.type,
                type_id: banner_sidebar_bottom_reporting_json.type_id,
                end_time: time,
                end_timestamp: "",
                timestamp_get: banner_call,
              };
              reporting_json_array.push(temp_json);
            }
          }

          if (
            document.getElementById("video_sidebar_top_container") !=
              undefined &&
            document.getElementById("video_sidebar_top_container") != null
          ) {
            var vidunsave_sidebar_top = document.getElementById(
              "video_sidebar_top_container"
            );

            var unsave_durationsidebar_top = vidunsave_sidebar_top.currentTime;
            if (
              unsave_durationsidebar_top != 0 &&
              banner_sidebar_top_reporting_json.start_time != ""
            ) {
              let today = new Date();

              let time =
                today.getHours() +
                ":" +
                today.getMinutes() +
                ":" +
                today.getSeconds();

              let temp_json = {
                start_time: banner_sidebar_top_reporting_json.start_time,
                start_timestamp: "",
                banner_id:
                  banner_sidebar_top_url_and_redirect[
                    banner_sidebar_top_play_key
                  ].banner_id,
                banner_cat_id: banner_sidebar_top_reporting_json.banner_cat_id,
                position: "sidebar_top",
                duration: Math.abs(Math.abs(unsave_durationsidebar_top)),
                type: this.props.type,
                type_id: banner_sidebar_top_reporting_json.type_id,
                end_time: time,
                end_timestamp: "",
                timestamp_get: banner_call,
              };
              reporting_json_array.push(temp_json);
            }
          }

          if (reporting_json_array.length > 0) {
            var userAgent = window.navigator.userAgent,
              platform = window.navigator.platform,
              macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
              windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
              iosPlatforms = ["iPhone", "iPad", "iPod"],
              os = null;

            if (macosPlatforms.indexOf(platform) !== -1) {
              os = "Mac OS";
            } else if (iosPlatforms.indexOf(platform) !== -1) {
              os = "iOS";
            } else if (windowsPlatforms.indexOf(platform) !== -1) {
              os = "Windows";
            } else if (/Android/.test(userAgent)) {
              os = "Android";
            } else if (!os && /Linux/.test(platform)) {
              os = "Linux";
            }

            fetch(url + "banner/addreport", {
              method: "POST",
              headers: {
                Authorization: reactLocalStorage.get(
                  "@ClirnetStore:refreshToken",
                  true
                ),

                version: "rjsw 1.1.1",
                OS: os,
              },
              body: JSON.stringify(reporting_json_array),
            })
              .then((response) => response.json())
              .then((responseJson) => {
                reporting_json_array = [];
              })
              .catch((error) => {
                reporting_json_array = [];
              });
          }

          ev.preventDefault();
          return (ev.returnValue = "Are you sure you want to close?");
        });
      }
    }
    if (this.props.api_call == 1) {
      var that12 = this;
      setTimeout(function () {
        //alert(reactLocalStorage.get('@ClirnetStore:global_banner_data', true))
        that12.banner_work(
          JSON.parse(
            reactLocalStorage.get("@ClirnetStore:global_banner_data", true)
          ),
          that12.props.type_id
        );
      }, 50);
    }

    if (this.props.api_call_detail == 1) {
      let ttyuip = this;
      //window.addEventListener("unload", ttyuip.onUnload());
      window.addEventListener("pagehide", () => {
        let todaylet = new Date();

        let time =
          todaylet.getHours() +
          ":" +
          todaylet.getMinutes() +
          ":" +
          todaylet.getSeconds();

        if (local_video_time_top != 0) {
          let vidunsave_top = document.getElementById("video_top_container");

          let unsave_durationtop = vidunsave_top.currentTime;
          //let durationtop = (unsave_durationtop.toFixed(3)) - (banner_top_reporting_json.start_timestamp.toFixed(3));
          let temp_json = {
            start_time: banner_top_reporting_json.start_time,
            start_timestamp: "",
            banner_id:
              banner_top_url_and_redirect[banner_top_play_key].banner_id,
            banner_cat_id: banner_top_reporting_json.banner_cat_id,
            position: "Top",
            duration: Math.abs(Math.abs(local_video_time_top.toFixed(3))),
            type: unsavetype,
            type_id: banner_top_reporting_json.type_id,
            end_time: time,
            end_timestamp: "",
            timestamp_get: banner_call,
          };
          reporting_json_array.push(temp_json);
        }

        if (local_video_time_bottom != 0) {
          let vidunsave_bottom = document.getElementById(
            "video_bottom_container"
          );

          let unsave_durationbottom = vidunsave_bottom.currentTime;
          //let durationbottom = (unsave_durationbottom.toFixed(3)) - (banner_bottom_reporting_json.start_timestamp.toFixed(3));
          let temp_json = {
            start_time: banner_bottom_reporting_json.start_time,
            start_timestamp: "",
            banner_id:
              banner_bottom_url_and_redirect[banner_bottom_play_key].banner_id,
            banner_cat_id: banner_bottom_reporting_json.banner_cat_id,
            position: "Bottom",
            duration: Math.abs(Math.abs(local_video_time_bottom.toFixed(3))),
            type: unsavetype,
            type_id: banner_bottom_reporting_json.type_id,
            end_time: time,
            end_timestamp: "",
            timestamp_get: banner_call,
          };
          reporting_json_array.push(temp_json);
        }

        if (local_video_time_sidebar_bottom != 0) {
          let vidunsave_sidebar_bottom = document.getElementById(
            "video_sidebar_bottom_container"
          );

          let unsave_durationsidebar_bottom =
            vidunsave_sidebar_bottom.currentTime;
          //let durationsidebarbottom = (unsave_durationsidebar_bottom.toFixed(3)) - (banner_sidebar_bottom_reporting_json.start_timestamp.toFixed(3));
          let temp_json = {
            start_time: banner_sidebar_bottom_reporting_json.start_time,
            start_timestamp: "",
            banner_id:
              banner_sidebar_bottom_url_and_redirect[
                banner_sidebar_bottom_play_key
              ].banner_id,
            banner_cat_id: banner_sidebar_bottom_reporting_json.banner_cat_id,
            position: "Sidebar-bottom",
            duration: Math.abs(
              Math.abs(local_video_time_sidebar_bottom.toFixed(3))
            ),
            type: unsavetype,
            type_id: banner_sidebar_bottom_reporting_json.type_id,
            end_time: time,
            end_timestamp: "",
            timestamp_get: banner_call,
          };
          reporting_json_array.push(temp_json);
        }
        if (local_video_time_sidebar_top != 0) {
          let vidunsave_sidebar_top = document.getElementById(
            "video_sidebar_top_container"
          );

          let unsave_durationsidebartop = vidunsave_sidebar_top.currentTime;
          //let durationsidebartop = (unsave_durationsidebartop.toFixed(3)) - (banner_sidebar_top_reporting_json.start_timestamp.toFixed(3));

          let temp_json = {
            start_time: banner_sidebar_top_reporting_json.start_time,
            start_timestamp: "",
            banner_id:
              banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key]
                .banner_id,
            banner_cat_id: banner_sidebar_top_reporting_json.banner_cat_id,
            position: "Sidebar-Top",
            duration: Math.abs(
              Math.abs(local_video_time_sidebar_top.toFixed(3))
            ),
            type: unsavetype,
            type_id: banner_sidebar_top_reporting_json.type_id,
            end_time: time,
            end_timestamp: "",
            timestamp_get: banner_call,
          };
          reporting_json_array.push(temp_json);
        }
        var datajson = reporting_json_array;

        let reporting_array_temp = {};
        reporting_array_temp.data = reporting_json_array;
        reporting_array_temp.version = "rjsw 1.1.1";
        reporting_array_temp.os = "Mac OS";
        reporting_array_temp.token = temp_token;

        var text = JSON.stringify(reporting_array_temp);
        console.log("beacon1 1");
        navigator.sendBeacon(
          "https://doctor.clirnet.com/knowledge/rnv11/openapi/sendData2",
          text
        );
      });

      document.addEventListener(
        visibilityChange,
        this.handleVisibilityChange,
        false
      );

      let unixbannerglobe = Math.round(+new Date() / 1000);

      var difference_time =
        unixbannerglobe -
        reactLocalStorage.get("@ClirnetStore:banner_call_time", 0);

      // alert(difference_time)

      // if (difference_time < 100) {

      //   //alert(unix);
      //   banner_sidebar_top_play_key = reactLocalStorage.get('@ClirnetStore:global_sidebar_top_play_key', '0');
      //   banner_sidebar_bottom_play_key = reactLocalStorage.get('@ClirnetStore:global_sidebar_bottom_play_key', '0');
      //   banner_bottom_play_key = reactLocalStorage.get('@ClirnetStore:global_bottom_play_key', '0');
      //   banner_top_play_key = reactLocalStorage.get('@ClirnetStore:global_top_play_key', '0');
      //   //console.log(reactLocalStorage.get('@ClirnetStore:global_banner_data', true))

      //   var that12 = this;
      //   setTimeout(function () {

      //     that12.banner_work(JSON.parse(reactLocalStorage.get('@ClirnetStore:global_banner_data', true)), that12.props.type_id);

      //   }, 50);

      // }

      if (isMobile) {
        var type_id_val = 2;
      } else {
        var type_id_val = 1;
      }

      fetch(
        url +
          "banner/dataLikeAlgo?banner_type=" +
          type_id_val +
          "&content_type_id=" +
          this.props.type_id +
          "&content_type=" +
          this.props.type +
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
        .then((responseJsonban) => {
          reactLocalStorage.set(
            "@ClirnetStore:global_banner_data",
            JSON.stringify(responseJsonban)
          );

          reactLocalStorage.set("@ClirnetStore:global_bottom_play_key", 0);
          reactLocalStorage.set(
            "@ClirnetStore:global_sidebar_bottom_play_key",
            0
          );

          reactLocalStorage.set("@ClirnetStore:global_sidebar_top_play_key", 0);

          reactLocalStorage.set("@ClirnetStore:global_top_play_key", 0);

          let unixbanner = Math.round(+new Date() / 1000);

          reactLocalStorage.set("@ClirnetStore:banner_call_time", unixbanner);
          var that1234 = this;
          setTimeout(function () {
            that1234.props.apiresponserecieved(responseJsonban);
          }, 300);
          //this.props.apiresponserecieved(1)

          //this.banner_work(responseJsonban, this.props.type_id);
        })
        .catch((error) => {});
    }
  }

  banner_work(responseJsonban, parsed_comp_id) {
    banner_call = responseJsonban.timestamp_added;
    banner_top_reporting_json.timestamp_get = banner_call;
    banner_bottom_reporting_json.timestamp_get = banner_call;
    banner_sidebar_top_reporting_json.timestamp_get = banner_call;
    banner_sidebar_bottom_reporting_json.timestamp_get = banner_call;

    for (let inc = 0; inc < responseJsonban.data.length; inc++) {
      switch (responseJsonban.data[inc].position) {
        case "sidebar - top":
          sidebar_top_height_val = responseJsonban.data[inc].min_height + "px";
          sidebar_top_width_val = responseJsonban.data[inc].min_width + "px";
          if (this.props.banner_position == 3) {
            // banner_sidebar_top_type='video';
            banner_sidebar_top_label = responseJsonban.data[inc].lable;
            banner_sidebar_top_category_id =
              responseJsonban.data[inc].banner_cat_id;
            //banner_sidebar_top_width='300';
            //banner_sidebar_top_height='200';
            if (responseJsonban.data[inc].items.length > 0) {
              if (
                responseJsonban.data[inc].items[banner_sidebar_top_play_key] ==
                undefined
              ) {
                banner_sidebar_top_play_key = 0;
              }
              banner_sidebar_top_duration = responseJsonban.data[inc].duration;
              banner_sidebar_top_url_and_redirect =
                responseJsonban.data[inc].items;
              banner_sidebar_top_type =
                responseJsonban.data[inc].items[banner_sidebar_top_play_key]
                  .format;
              banner_sidebar_top_width =
                responseJsonban.data[inc].items[banner_sidebar_top_play_key]
                  .width;
              banner_sidebar_top_height =
                responseJsonban.data[inc].items[banner_sidebar_top_play_key]
                  .height;
              //banner_sidebar_top_play_key=reactLocalStorage.get('@ClirnetStore:global_sidebar_top_play_key', '0');
              banner_sidebar_top_reporting_json.banner_cat_id =
                responseJsonban.data[inc].banner_cat_id;
              banner_sidebar_top_reporting_json.type_id = parsed_comp_id;

              banner_sidebar_top_video_change_permission = 1;
              view_sidebar_top_per = 1;
              this.setState({ rerenderbanner: !this.state.rerenderbanner });
              if (banner_sidebar_top_type == "image") {
                $(".view_image_sidebar_top").css("display", "block");
              } else {
                $(".view_video_sidebar_top").css("display", "block");
              }
            }

            //var videocontainertopmount = document.getElementById('video_top_container');
            //videocontainertopmount.play();
          }
          break;
        case "sidebar - bottom":
          sidebar_bottom_height_val =
            responseJsonban.data[inc].min_height + "px";
          sidebar_bottom_width_val = responseJsonban.data[inc].min_width + "px";
          if (this.props.banner_position == 4) {
            if (responseJsonban.data[inc].items.length > 0) {
              if (
                responseJsonban.data[inc].items[
                  banner_sidebar_bottom_play_key
                ] == undefined
              ) {
                banner_sidebar_bottom_play_key = 0;
              }
              banner_sidebar_bottom_type =
                responseJsonban.data[inc].items[banner_sidebar_bottom_play_key]
                  .format;
              banner_sidebar_bottom_label = responseJsonban.data[inc].lable;
              banner_sidebar_bottom_category_id =
                responseJsonban.data[inc].banner_cat_id;
              banner_sidebar_bottom_width =
                responseJsonban.data[inc].items[banner_sidebar_bottom_play_key]
                  .width;
              banner_sidebar_bottom_height =
                responseJsonban.data[inc].items[banner_sidebar_bottom_play_key]
                  .height;
              banner_sidebar_bottom_duration =
                responseJsonban.data[inc].duration;
              banner_sidebar_bottom_url_and_redirect =
                responseJsonban.data[inc].items;
              //banner_sidebar_bottom_play_key=reactLocalStorage.get('@ClirnetStore:global_sidebar_bottom_play_key', '0');;

              banner_sidebar_bottom_reporting_json.banner_cat_id =
                responseJsonban.data[inc].banner_cat_id;
              banner_sidebar_bottom_reporting_json.type_id = parsed_comp_id;
              banner_sidebar_bottom_video_change_permission = 1;
              view_bottom_per = 1;
              this.setState({ rerenderbanner: !this.state.rerenderbanner });

              if (banner_sidebar_bottom_type == "image") {
                $(".view_image_sidebar_bottom").css("display", "block");
              } else {
                $(".view_video_sidebar_bottom").css("display", "block");
              }
            }
          }
          break;
        case "top":
          top_height_val = responseJsonban.data[inc].min_height + "px";
          top_width_val = responseJsonban.data[inc].min_width + "px";

          if (this.props.banner_position == 1) {
            //   if(responseJsonban.data[inc].format=="video")
            //   {
            // $('html, body').css({
            //   overflow: 'hidden',
            //   height: '100%'
            // });
            //   }
            if (responseJsonban.data[inc].items.length > 0) {
              //alert(inc+"kk"+banner_top_play_key)
              //console.log(JSON.stringify(responseJsonban)+"hhhjjj")
              if (
                (banner_top_type =
                  responseJsonban.data[inc].items[banner_top_play_key] ==
                  undefined)
              ) {
                banner_top_play_key = 0;
              }
              banner_top_type =
                responseJsonban.data[inc].items[banner_top_play_key].format;
              banner_top_label = responseJsonban.data[inc].lable;
              banner_top_category_id = responseJsonban.data[inc].banner_cat_id;
              banner_top_width =
                responseJsonban.data[inc].items[banner_top_play_key].width;
              banner_top_height =
                responseJsonban.data[inc].items[banner_top_play_key].height;
              banner_top_duration = responseJsonban.data[inc].duration;
              banner_top_url_and_redirect = responseJsonban.data[inc].items;
              //banner_top_play_key=reactLocalStorage.get('@ClirnetStore:global_top_play_key', '0');;
              banner_top_video_change_permission = 1;
              view_top_per = 1;

              this.setState({ rerenderbanner: !this.state.rerenderbanner });
              if (
                responseJsonban.data[inc].items[banner_top_play_key].format ==
                "image"
              ) {
                // alert("image")
                $(".view_image_top").css("display", "block");
                $(".view_video_top").css("display", "none");
              } else {
                //alert("video")
                $(".view_video_top").css("display", "block");
                $(".view_image_top").css("display", "none");
              }

              banner_top_reporting_json.banner_cat_id =
                responseJsonban.data[inc].banner_cat_id;
              banner_top_reporting_json.type_id = parsed_comp_id;
            }

            if (banner_top_type == "video") {
              if (
                responseJsonban.message != "" &&
                responseJsonban.message != 0
              ) {
                $("html, body").css({
                  overflow: "hidden",
                  height: "100%",
                });

                setTimeout(function () {
                  $("html, body").css({
                    overflow: "auto",
                    height: "auto",
                  });
                }, parseInt(responseJsonban.message));
              }
            }

            //videocontainertop.setAttribute('height', banner_top_height);
            //videocontainertop.setAttribute('width', banner_top_width);
            // videocontainertoptemp.load();
            // //videocontainer.setAttribute('poster', newposter); //Changes video poster image
            // videocontainertoptemp.play();

            //this.start_timer_top("")
          }
          break;
        case "bottom":
          bottom_height_val = responseJsonban.data[inc].min_height + "px";
          bottom_width_val = responseJsonban.data[inc].min_width + "px";
          if (this.props.banner_position == 2) {
            if (responseJsonban.data[inc].items.length > 0) {
              if (
                responseJsonban.data[inc].items[banner_bottom_play_key] ==
                undefined
              ) {
                banner_bottom_play_key = 0;
              }

              banner_bottom_type =
                responseJsonban.data[inc].items[banner_bottom_play_key].format;
              banner_bottom_label = responseJsonban.data[inc].lable;
              banner_bottom_category_id =
                responseJsonban.data[inc].banner_cat_id;
              banner_bottom_width =
                responseJsonban.data[inc].items[banner_bottom_play_key].width;
              banner_bottom_height =
                responseJsonban.data[inc].items[banner_bottom_play_key].height;
              banner_bottom_duration = responseJsonban.data[inc].duration;
              banner_bottom_url_and_redirect = responseJsonban.data[inc].items;

              banner_bottom_reporting_json.banner_cat_id =
                responseJsonban.data[inc].banner_cat_id;
              banner_bottom_reporting_json.type_id = parsed_comp_id;

              //console.log(responseJsonban.data[inc].items)
              banner_bottom_video_change_permission = 1;
              view_bottom_per = 1;

              //banner_bottom_play_key=reactLocalStorage.get('@ClirnetStore:global_bottom_play_key', '0');
              this.setState({ rerenderbanner: !this.state.rerenderbanner });
              if (banner_bottom_type == "image") {
                // console.log("imagessssss")

                $(".view_image_bottom").css("display", "block");
              } else {
                //console.log("videossssss"+this.props.banner_position)
                $(".view_video_bottom").css("display", "block");
              }

              //this.start_timer_bottom("")
            }
          }
          break;
        default: {
        }
      }
    }
    var thatset = this;
    setTimeout(function () {
      if (
        document.getElementById("video_top_container") != "undefined" &&
        document.getElementById("video_top_container") != null &&
        thatset.props.banner_position == 1
      ) {
        document
          .getElementById("video_top_container")
          .addEventListener("ended", function (e) {
            //alert(banner_top_play_key);

            if (banner_top_video_change_permission == 1) {
              if (
                banner_top_play_key <
                banner_top_url_and_redirect.length - 1
              ) {
                var videocontainertop = document.getElementById(
                  "video_top_container"
                );
                var videosourcetop = document.getElementById("video_top");
                if (
                  banner_top_reporting_json.start_time != "" &&
                  banner_top_reporting_json.start_time != undefined
                ) {
                  let today = new Date();

                  let time =
                    today.getHours() +
                    ":" +
                    today.getMinutes() +
                    ":" +
                    today.getSeconds();
                  let unix_tmp = Math.round(+new Date() / 1000);

                  let temp_json = {
                    start_time: "",
                    start_timestamp: "",
                    banner_id: "",
                    banner_cat_id: "",
                    position: "Top",
                    duration: "",
                    type: thatset.props.type,
                    type_id: "",
                    end_time: "",
                    end_timestamp: "",
                    timestamp_get: "",
                  };
                  if (
                    banner_top_url_and_redirect[banner_top_play_key] !=
                    undefined
                  ) {
                    let vidunsave_top = document.getElementById(
                      "video_top_container"
                    );

                    let unsave_durationtop = vidunsave_top.currentTime;
                    let durationtop =
                      unsave_durationtop.toFixed(3) -
                      banner_top_reporting_json.start_timestamp.toFixed(3);

                    temp_json = {
                      start_time: banner_top_reporting_json.start_time,
                      start_timestamp: "",
                      banner_id:
                        banner_top_url_and_redirect[banner_top_play_key]
                          .banner_id,
                      banner_cat_id: banner_top_reporting_json.banner_cat_id,
                      position: "Top",
                      duration: Math.abs(Math.abs(durationtop.toFixed(3))),
                      type: thatset.props.type,
                      type_id: banner_top_reporting_json.type_id,
                      end_time: time,
                      end_timestamp: "",
                      timestamp_get: banner_call,
                    };

                    reporting_json_array.push(temp_json);
                  }

                  banner_top_reporting_json.start_time = "";
                  banner_top_reporting_json.end_time = "";

                  temp_json = {
                    start_time: "",
                    start_timestamp: "",
                    banner_id: "",
                    banner_cat_id: "",
                    position: "Top",
                    duration: "",
                    type: thatset.props.type,
                    type_id: "",
                    end_time: "",
                    end_timestamp: "",
                    timestamp_get: "",
                  };

                  //console.log(reporting_json_array)
                }

                banner_top_play_key =
                  parseInt(banner_top_play_key) + parseInt(1);

                //reactLocalStorage.set('@ClirnetStore:global_top_play_key',banner_top_play_key);

                //alert(reactLocalStorage.get('@ClirnetStore:global_top_play_key', '0'))
                if (
                  banner_top_url_and_redirect[banner_top_play_key] != undefined
                ) {
                  var newmp4top =
                    banner_top_url_and_redirect[banner_top_play_key].image;
                }

                if (
                  banner_top_url_and_redirect[banner_top_play_key].format ==
                  "image"
                ) {
                  banner_top_type = "image";
                  $(".view_image_top").css("display", "block");
                  $(".view_video_top").css("display", "none");

                  let imagecontainertop = document.getElementById("top_image");
                  imagecontainertop.setAttribute("src", newmp4top);
                }

                if (videocontainertop != undefined) {
                  videocontainertop.pause();

                  videosourcetop.setAttribute("src", newmp4top);
                }
                if (
                  banner_top_url_and_redirect[banner_top_play_key] != undefined
                ) {
                  if (
                    banner_top_url_and_redirect[banner_top_play_key].url != ""
                  ) {
                    $("#banner_href_top").removeClass("disabled_href");
                    $("#banner_href_top").attr("target", "_blank");
                    var par_url =
                      banner_top_url_and_redirect[banner_top_play_key].url;
                  } else {
                    $("#banner_href_top").addClass("disabled_href");

                    var par_url = "javascript:void(0)";
                  }

                  $("#banner_href_top").attr("href", par_url);
                }
                if (videocontainertop != undefined) {
                  local_video_time_top = 0;
                  videocontainertop.load();

                  videocontainertop.play();
                }

                //this.start_timer_top("");
              } else {
                var videocontainertop = document.getElementById(
                  "video_top_container"
                );
                var videosourcetop = document.getElementById("video_top");
                if (
                  banner_top_reporting_json.start_time != "" &&
                  banner_top_reporting_json.start_time != undefined
                ) {
                  let today = new Date();

                  let time =
                    today.getHours() +
                    ":" +
                    today.getMinutes() +
                    ":" +
                    today.getSeconds();
                  let unix_tmp = Math.round(+new Date() / 1000);

                  let temp_json = {
                    start_time: "",
                    start_timestamp: "",
                    banner_id: "",
                    banner_cat_id: "",
                    position: "Top",
                    duration: "",
                    type: thatset.props.type,
                    type_id: "",
                    end_time: "",
                    end_timestamp: "",
                    timestamp_get: "",
                  };
                  if (
                    banner_top_url_and_redirect[banner_top_play_key] !=
                    undefined
                  ) {
                    let vidunsave_top = document.getElementById(
                      "video_top_container"
                    );

                    let unsave_durationtop = vidunsave_top.currentTime;
                    let durationtop =
                      unsave_durationtop.toFixed(3) -
                      banner_top_reporting_json.start_timestamp.toFixed(3);
                    temp_json = {
                      start_time: banner_top_reporting_json.start_time,
                      start_timestamp: "",
                      banner_id:
                        banner_top_url_and_redirect[banner_top_play_key]
                          .banner_id,
                      banner_cat_id: banner_top_reporting_json.banner_cat_id,
                      position: "Top",
                      duration: Math.abs(Math.abs(durationtop.toFixed(3))),
                      type: thatset.props.type,
                      type_id: banner_top_reporting_json.type_id,
                      end_time: time,
                      end_timestamp: "",
                      timestamp_get: banner_call,
                    };

                    reporting_json_array.push(temp_json);
                  }

                  banner_top_reporting_json.start_time = "";
                  banner_top_reporting_json.end_time = "";

                  temp_json = {
                    start_time: "",
                    start_timestamp: "",
                    banner_id: "",
                    banner_cat_id: "",
                    position: "Top",
                    duration: "",
                    type: thatset.props.type,
                    type_id: "",
                    end_time: "",
                    end_timestamp: "",
                    timestamp_get: "",
                  };

                  //console.log(reporting_json_array)
                }

                banner_top_play_key = 0;
                //reactLocalStorage.set('@ClirnetStore:global_top_play_key',0);

                if (
                  banner_top_url_and_redirect[banner_top_play_key] != undefined
                ) {
                  var newmp4top =
                    banner_top_url_and_redirect[banner_top_play_key].image;
                }

                if (
                  banner_top_url_and_redirect[banner_top_play_key].format ==
                  "image"
                ) {
                  banner_top_type = "image";
                  $(".view_image_top").css("display", "block");
                  $(".view_video_top").css("display", "none");

                  let imagecontainertop = document.getElementById("top_image");
                  imagecontainertop.setAttribute("src", newmp4top);
                }

                if (videocontainertop != undefined) {
                  videocontainertop.pause();

                  videosourcetop.setAttribute("src", newmp4top);
                }
                if (
                  banner_top_url_and_redirect[banner_top_play_key] != undefined
                ) {
                  if (
                    banner_top_url_and_redirect[banner_top_play_key].url != ""
                  ) {
                    $("#banner_href_top").removeClass("disabled_href");
                    $("#banner_href_top").attr("target", "_blank");
                    var par_url =
                      banner_top_url_and_redirect[banner_top_play_key].url;
                  } else {
                    $("#banner_href_top").addClass("disabled_href");
                    var par_url = "javascript:void(0)";
                  }

                  $("#banner_href_top").attr("href", par_url);
                }
                if (videocontainertop != undefined) {
                  videocontainertop.load();
                  local_video_time_top = 0;
                  videocontainertop.play();
                }

                //this.start_timer_top("");
              }
            }
          });
      }

      if (
        document.getElementById("video_bottom_container") != "undefined" &&
        document.getElementById("video_bottom_container") != null &&
        thatset.props.banner_position == 2
      ) {
        document
          .getElementById("video_bottom_container")
          .addEventListener("ended", function (e) {
            // console.log('The End bottom');

            if (banner_bottom_video_change_permission == 1) {
              if (
                banner_bottom_play_key <
                banner_bottom_url_and_redirect.length - 1
              ) {
                var videocontainerbottom = document.getElementById(
                  "video_bottom_container"
                );
                var videosourcebottom = document.getElementById("video_bottom");

                if (
                  banner_bottom_reporting_json.start_time != "" &&
                  banner_bottom_reporting_json.start_time != undefined
                ) {
                  let today = new Date();

                  let time =
                    today.getHours() +
                    ":" +
                    today.getMinutes() +
                    ":" +
                    today.getSeconds();
                  let unix_tmp = Math.round(+new Date() / 1000);

                  let vidunsave_bottom = document.getElementById(
                    "video_bottom_container"
                  );

                  let unsave_durationbottom = vidunsave_bottom.currentTime;
                  let durationbottom =
                    unsave_durationbottom.toFixed(3) -
                    banner_bottom_reporting_json.start_timestamp.toFixed(3);

                  let temp_json = {
                    start_time: banner_bottom_reporting_json.start_time,
                    start_timestamp: "",
                    banner_id:
                      banner_bottom_url_and_redirect[banner_bottom_play_key]
                        .banner_id,
                    banner_cat_id: banner_bottom_reporting_json.banner_cat_id,
                    position: "Bottom",
                    duration: Math.abs(Math.abs(durationbottom.toFixed(3))),
                    type: thatset.props.type,
                    type_id: banner_bottom_reporting_json.type_id,
                    end_time: time,
                    end_timestamp: "",
                    timestamp_get: banner_call,
                  };

                  reporting_json_array.push(temp_json);

                  banner_bottom_reporting_json.start_time = "";
                  banner_bottom_reporting_json.end_time = "";

                  temp_json = {
                    start_time: "",
                    start_timestamp: "",
                    banner_id: "",
                    banner_cat_id: "",
                    position: "Bottom",
                    duration: "",
                    type: thatset.props.type,
                    type_id: "",
                    end_time: "",
                    end_timestamp: "",
                    timestamp_get: "",
                  };

                  //console.log(reporting_json_array)
                }
                banner_bottom_play_key =
                  parseInt(banner_bottom_play_key) + parseInt(1);

                //reactLocalStorage.set('@ClirnetStore:global_bottom_play_key',banner_bottom_play_key);
                if (
                  banner_bottom_url_and_redirect[banner_bottom_play_key] !=
                  undefined
                ) {
                  var newmp4bottom =
                    banner_bottom_url_and_redirect[banner_bottom_play_key]
                      .image;
                }

                if (videocontainerbottom != undefined) {
                  videocontainerbottom.pause();

                  videosourcebottom.setAttribute("src", newmp4bottom);

                  if (
                    banner_bottom_url_and_redirect[banner_bottom_play_key]
                      .format == "image"
                  ) {
                    banner_bottom_type = "image";
                    $(".view_image_bottom").css("display", "block");
                    $(".view_video_bottom").css("display", "none");

                    document
                      .getElementById("bottom_image")
                      .setAttribute("src", newmp4bottom);
                  }
                }
                if (
                  banner_bottom_url_and_redirect[banner_bottom_play_key] !=
                  undefined
                ) {
                  if (
                    banner_bottom_url_and_redirect[banner_bottom_play_key]
                      .url != ""
                  ) {
                    $("#banner_href_bottom").removeClass("disabled_href");
                    $("#banner_href_bottom").attr("target", "_blank");
                    var par_url =
                      banner_bottom_url_and_redirect[banner_bottom_play_key]
                        .url;
                  } else {
                    $("#banner_href_bottom").addClass("disabled_href");

                    var par_url = "javascript:void(0)";
                  }

                  $("#banner_href_bottom").attr("href", par_url);
                }
                if (videocontainerbottom != undefined) {
                  videocontainerbottom.load();
                  local_video_time_bottom = 0;
                  videocontainerbottom.play();
                }

                //this.start_timer_bottom("");
              } else {
                var videocontainerbottom = document.getElementById(
                  "video_bottom_container"
                );
                var videosourcebottom = document.getElementById("video_bottom");
                if (
                  banner_bottom_reporting_json.start_time != "" &&
                  banner_bottom_reporting_json.start_time != undefined
                ) {
                  let today = new Date();

                  let time =
                    today.getHours() +
                    ":" +
                    today.getMinutes() +
                    ":" +
                    today.getSeconds();
                  let unix_tmp = Math.round(+new Date() / 1000);

                  let vidunsave_bottom = document.getElementById(
                    "video_bottom_container"
                  );

                  let unsave_durationbottom = vidunsave_bottom.currentTime;
                  let durationbottom =
                    unsave_durationbottom.toFixed(3) -
                    banner_bottom_reporting_json.start_timestamp.toFixed(3);
                  let temp_json = {
                    start_time: banner_bottom_reporting_json.start_time,
                    start_timestamp: "",
                    banner_id:
                      banner_bottom_url_and_redirect[banner_bottom_play_key]
                        .banner_id,
                    banner_cat_id: banner_bottom_reporting_json.banner_cat_id,
                    position: "Bottom",
                    duration: Math.abs(Math.abs(durationbottom.toFixed(3))),
                    type: thatset.props.type,
                    type_id: banner_bottom_reporting_json.type_id,
                    end_time: time,
                    end_timestamp: "",
                    timestamp_get: banner_call,
                  };

                  reporting_json_array.push(temp_json);

                  banner_bottom_reporting_json.start_time = "";
                  banner_bottom_reporting_json.end_time = "";

                  temp_json = {
                    start_time: "",
                    start_timestamp: "",
                    banner_id: "",
                    banner_cat_id: "",
                    position: "Bottom",
                    duration: "",
                    type: thatset.props.type,
                    type_id: "",
                    end_time: "",
                    end_timestamp: "",
                    timestamp_get: "",
                  };

                  // console.log(reporting_json_array)
                }

                banner_bottom_play_key = 0;

                //reactLocalStorage.set('@ClirnetStore:global_bottom_play_key',banner_bottom_play_key);
                if (
                  banner_bottom_url_and_redirect[banner_bottom_play_key] !=
                  undefined
                ) {
                  var newmp4bottom =
                    banner_bottom_url_and_redirect[banner_bottom_play_key]
                      .image;
                }

                if (videocontainerbottom != undefined) {
                  videocontainerbottom.pause();

                  videosourcebottom.setAttribute("src", newmp4bottom);

                  if (
                    banner_bottom_url_and_redirect[banner_bottom_play_key]
                      .format == "image"
                  ) {
                    banner_bottom_type = "image";
                    $(".view_image_bottom").css("display", "block");
                    $(".view_video_bottom").css("display", "none");

                    document
                      .getElementById("bottom_image")
                      .setAttribute("src", newmp4bottom);
                  }
                }
                if (
                  banner_bottom_url_and_redirect[banner_bottom_play_key] !=
                  undefined
                ) {
                  if (
                    banner_bottom_url_and_redirect[banner_bottom_play_key]
                      .url != ""
                  ) {
                    $("#banner_href_bottom").removeClass("disabled_href");
                    $("#banner_href_bottom").attr("target", "_blank");
                    var par_url =
                      banner_bottom_url_and_redirect[banner_bottom_play_key]
                        .url;
                  } else {
                    $("#banner_href_bottom").addClass("disabled_href");
                    var par_url = "javascript:void(0)";
                  }

                  $("#banner_href_bottom").attr("href", par_url);
                }
                if (videocontainerbottom != undefined) {
                  videocontainerbottom.load();
                  local_video_time_bottom = 0;

                  videocontainerbottom.play();
                }

                //this.start_timer_bottom("");
              }
            }
          });
      }

      if (
        document.getElementById("video_sidebar_top_container") != "undefined" &&
        document.getElementById("video_sidebar_top_container") != null &&
        thatset.props.banner_position == 3
      ) {
        document
          .getElementById("video_sidebar_top_container")
          .addEventListener("ended", function (e) {
            //console.log('The End sidebar_top');

            if (banner_sidebar_top_video_change_permission == 1) {
              if (
                banner_sidebar_top_play_key <
                banner_sidebar_top_url_and_redirect.length - 1
              ) {
                var videocontainersidebar_top = document.getElementById(
                  "video_sidebar_top_container"
                );
                var videosourcesidebar_top =
                  document.getElementById("video_sidebar_top");

                if (
                  banner_sidebar_top_reporting_json.start_time != "" &&
                  banner_sidebar_top_reporting_json.start_time != undefined
                ) {
                  let today = new Date();

                  let time =
                    today.getHours() +
                    ":" +
                    today.getMinutes() +
                    ":" +
                    today.getSeconds();
                  let unix_tmp = Math.round(+new Date() / 1000);

                  let vidunsave_sidebar_top = document.getElementById(
                    "video_sidebar_top_container"
                  );

                  let unsave_durationsidebar_top =
                    vidunsave_sidebar_top.currentTime;
                  let durationsidebartop =
                    unsave_durationsidebar_top.toFixed(3) -
                    banner_sidebar_top_reporting_json.start_timestamp.toFixed(
                      3
                    );
                  let temp_json = {
                    start_time: "",
                    start_timestamp: "",
                    banner_id: "",
                    banner_cat_id: "",
                    position: "Sidebar-Top",
                    duration: "",
                    type: thatset.props.type,
                    type_id: "",
                    end_time: "",
                    end_timestamp: "",
                    timestamp_get: "",
                  };
                  if (
                    banner_sidebar_top_url_and_redirect[
                      banner_sidebar_top_play_key
                    ] != undefined
                  ) {
                    temp_json = {
                      start_time: banner_sidebar_top_reporting_json.start_time,
                      start_timestamp: "",
                      banner_id:
                        banner_sidebar_top_url_and_redirect[
                          banner_sidebar_top_play_key
                        ].banner_id,
                      banner_cat_id:
                        banner_sidebar_top_reporting_json.banner_cat_id,
                      position: "Sidebar-Top",
                      duration: Math.abs(
                        Math.abs(durationsidebartop.toFixed(3))
                      ),
                      type: thatset.props.type,
                      type_id: banner_sidebar_top_reporting_json.type_id,
                      end_time: time,
                      end_timestamp: "",
                      timestamp_get: banner_call,
                    };

                    reporting_json_array.push(temp_json);
                  }

                  banner_sidebar_top_reporting_json.start_time = "";
                  banner_sidebar_top_reporting_json.end_time = "";

                  temp_json = {
                    start_time: "",
                    start_timestamp: "",
                    banner_id: "",
                    banner_cat_id: "",
                    position: "Sidebar-Top",
                    duration: "",
                    type: thatset.props.type,
                    type_id: "",
                    end_time: "",
                    end_timestamp: "",
                    timestamp_get: "",
                  };

                  //console.log(reporting_json_array)
                }
                banner_sidebar_top_play_key =
                  parseInt(banner_sidebar_top_play_key) + parseInt(1);

                //reactLocalStorage.set('@ClirnetStore:global_sidebar_top_play_key',banner_sidebar_top_play_key);

                if (
                  banner_sidebar_top_url_and_redirect[
                    banner_sidebar_top_play_key
                  ] != undefined
                ) {
                  var newmp4sidebar_top =
                    banner_sidebar_top_url_and_redirect[
                      banner_sidebar_top_play_key
                    ].image;
                }

                if (videocontainersidebar_top != undefined) {
                  videocontainersidebar_top.pause();

                  videosourcesidebar_top.setAttribute("src", newmp4sidebar_top);

                  if (
                    banner_sidebar_top_url_and_redirect[
                      banner_sidebar_top_play_key
                    ].format == "image"
                  ) {
                    banner_sidebar_top_type = "image";
                    $(".view_image_sidebar_top").css("display", "block");
                    $(".view_video_sidebar_top").css("display", "none");
                    //let imagecontainersdtopside = document.getElementById('sidebar_top_image');

                    document
                      .getElementById("sidebar_top_image")
                      .setAttribute("src", newmp4sidebar_top);
                  }
                }
                if (
                  banner_sidebar_top_url_and_redirect[
                    banner_sidebar_top_play_key
                  ] != undefined
                ) {
                  if (
                    banner_sidebar_top_url_and_redirect[
                      banner_sidebar_top_play_key
                    ].url != ""
                  ) {
                    $("#banner_href_sidebar_top").removeClass("disabled_href");
                    $("#banner_href_sidebar_top").attr("target", "_blank");
                    var par_url =
                      banner_sidebar_top_url_and_redirect[
                        banner_sidebar_top_play_key
                      ].url;
                  } else {
                    $("#banner_href_sidebar_top").addClass("disabled_href");

                    var par_url = "javascript:void(0)";
                  }

                  $("#banner_href_sidebar_top").attr("href", par_url);
                }
                if (videocontainersidebar_top != undefined) {
                  videocontainersidebar_top.load();
                  local_video_time_sidebar_top = 0;
                  videocontainersidebar_top.play();
                }

                //this.start_timer_sidebar_top("");
              } else {
                var videocontainersidebar_top = document.getElementById(
                  "video_sidebar_top_container"
                );
                var videosourcesidebar_top =
                  document.getElementById("video_sidebar_top");
                if (
                  banner_sidebar_top_reporting_json.start_time != "" &&
                  banner_sidebar_top_reporting_json.start_time != undefined
                ) {
                  let today = new Date();

                  let time =
                    today.getHours() +
                    ":" +
                    today.getMinutes() +
                    ":" +
                    today.getSeconds();
                  let unix_tmp = Math.round(+new Date() / 1000);

                  let vidunsave_sidebar_top = document.getElementById(
                    "video_sidebar_top_container"
                  );

                  let unsave_durationsidebar_top =
                    vidunsave_sidebar_top.currentTime;
                  let durationsidebartop =
                    unsave_durationsidebar_top.toFixed(3) -
                    banner_sidebar_top_reporting_json.start_timestamp.toFixed(
                      3
                    );
                  let temp_json = {
                    start_time: "",
                    start_timestamp: "",
                    banner_id: "",
                    banner_cat_id: "",
                    position: "Sidebar-Top",
                    duration: "",
                    type: thatset.props.type,
                    type_id: "",
                    end_time: "",
                    end_timestamp: "",
                    timestamp_get: "",
                  };
                  if (
                    banner_sidebar_top_url_and_redirect[
                      banner_sidebar_top_play_key
                    ] != undefined
                  ) {
                    temp_json = {
                      start_time: banner_sidebar_top_reporting_json.start_time,
                      start_timestamp: "",
                      banner_id:
                        banner_sidebar_top_url_and_redirect[
                          banner_sidebar_top_play_key
                        ].banner_id,
                      banner_cat_id:
                        banner_sidebar_top_reporting_json.banner_cat_id,
                      position: "Sidebar-Top",
                      duration: Math.abs(
                        Math.abs(durationsidebartop.toFixed(3))
                      ),
                      type: thatset.props.type,
                      type_id: banner_sidebar_top_reporting_json.type_id,
                      end_time: time,
                      end_timestamp: "",
                      timestamp_get: banner_call,
                    };

                    reporting_json_array.push(temp_json);
                  }

                  banner_sidebar_top_reporting_json.start_time = "";
                  banner_sidebar_top_reporting_json.end_time = "";

                  temp_json = {
                    start_time: "",
                    start_timestamp: "",
                    banner_id: "",
                    banner_cat_id: "",
                    position: "Sidebar-Top",
                    duration: "",
                    type: thatset.props.type,
                    type_id: "",
                    end_time: "",
                    end_timestamp: "",
                    timestamp_get: "",
                  };

                  //console.log(reporting_json_array)
                }

                banner_sidebar_top_play_key = 0;

                //reactLocalStorage.set('@ClirnetStore:global_sidebar_top_play_key',banner_sidebar_top_play_key);

                if (
                  banner_sidebar_top_url_and_redirect[
                    banner_sidebar_top_play_key
                  ] != undefined
                ) {
                  var newmp4sidebar_top =
                    banner_sidebar_top_url_and_redirect[
                      banner_sidebar_top_play_key
                    ].image;
                }

                if (videocontainersidebar_top != undefined) {
                  videocontainersidebar_top.pause();

                  videosourcesidebar_top.setAttribute("src", newmp4sidebar_top);

                  if (
                    banner_sidebar_top_url_and_redirect[
                      banner_sidebar_top_play_key
                    ].format == "image"
                  ) {
                    banner_sidebar_top_type = "image";
                    $(".view_image_sidebar_top").css("display", "block");
                    $(".view_video_sidebar_top").css("display", "none");

                    //let imagecontainersdtopside = document.getElementById('sidebar_top_image');

                    document
                      .getElementById("sidebar_top_image")
                      .setAttribute("src", newmp4sidebar_top);
                  }
                }
                if (
                  banner_sidebar_top_url_and_redirect[
                    banner_sidebar_top_play_key
                  ] != undefined
                ) {
                  if (
                    banner_sidebar_top_url_and_redirect[
                      banner_sidebar_top_play_key
                    ].url != ""
                  ) {
                    $("#banner_href_sidebar_top").removeClass("disabled_href");
                    $("#banner_href_sidebar_top").attr("target", "_blank");
                    var par_url =
                      banner_sidebar_top_url_and_redirect[
                        banner_sidebar_top_play_key
                      ].url;
                  } else {
                    $("#banner_href_sidebar_top").addClass("disabled_href");
                    var par_url = "javascript:void(0)";
                  }

                  $("#banner_href_sidebar_top").attr("href", par_url);
                }
                if (videocontainersidebar_top != undefined) {
                  videocontainersidebar_top.load();
                  local_video_time_sidebar_top = 0;
                  videocontainersidebar_top.play();
                }

                //this.start_timer_sidebar_top("");
              }
            }
          });
      }

      if (
        document.getElementById("video_sidebar_bottom_container") !=
          "undefined" &&
        document.getElementById("video_sidebar_bottom_container") != null &&
        thatset.props.banner_position == 4
      ) {
        document
          .getElementById("video_sidebar_bottom_container")
          .addEventListener("ended", function (e) {
            // console.log('The End sidebar_bottom');

            if (banner_sidebar_bottom_video_change_permission == 1) {
              if (
                banner_sidebar_bottom_play_key <
                banner_sidebar_bottom_url_and_redirect.length - 1
              ) {
                var videocontainersidebar_bottom = document.getElementById(
                  "video_sidebar_bottom_container"
                );
                var videosourcesidebar_bottom = document.getElementById(
                  "video_sidebar_bottom"
                );
                if (
                  banner_sidebar_bottom_reporting_json.start_time != "" &&
                  banner_sidebar_bottom_reporting_json.start_time != undefined
                ) {
                  let today = new Date();

                  let time =
                    today.getHours() +
                    ":" +
                    today.getMinutes() +
                    ":" +
                    today.getSeconds();
                  let unix_tmp = Math.round(+new Date() / 1000);

                  let vidunsave_sidebar_bottom = document.getElementById(
                    "video_sidebar_bottom_container"
                  );

                  let unsave_durationsidebar_bottom =
                    vidunsave_sidebar_bottom.currentTime;
                  let durationsidebarbottom =
                    unsave_durationsidebar_bottom.toFixed(3) -
                    banner_sidebar_bottom_reporting_json.start_timestamp.toFixed(
                      3
                    );
                  //console.log(parseInt(unix_tmp)+"jjj"+banner_sidebar_bottom_reporting_json.start_timestamp);
                  let temp_json = {
                    start_time: "",
                    start_timestamp: "",
                    banner_id: "",
                    banner_cat_id: "",
                    position: "Sidebar-bottom",
                    duration: "",
                    type: thatset.props.type,
                    type_id: "",
                    end_time: "",
                    end_timestamp: "",
                    timestamp_get: "",
                  };

                  if (
                    banner_sidebar_bottom_url_and_redirect[
                      banner_sidebar_bottom_play_key
                    ] != undefined
                  ) {
                    temp_json = {
                      start_time:
                        banner_sidebar_bottom_reporting_json.start_time,
                      start_timestamp: "",
                      banner_id:
                        banner_sidebar_bottom_url_and_redirect[
                          banner_sidebar_bottom_play_key
                        ].banner_id,
                      banner_cat_id:
                        banner_sidebar_bottom_reporting_json.banner_cat_id,
                      position: "Sidebar-bottom",
                      duration: Math.abs(
                        Math.abs(durationsidebarbottom.toFixed(3))
                      ),
                      type: thatset.props.type,
                      type_id: banner_sidebar_bottom_reporting_json.type_id,
                      end_time: time,
                      end_timestamp: "",
                      timestamp_get: banner_call,
                    };
                  }
                  reporting_json_array.push(temp_json);

                  banner_sidebar_bottom_reporting_json.start_time = "";
                  banner_sidebar_bottom_reporting_json.end_time = "";

                  temp_json = {
                    start_time: "",
                    start_timestamp: "",
                    banner_id: "",
                    banner_cat_id: "",
                    position: "Sidebar-bottom",
                    duration: "",
                    type: thatset.props.type,
                    type_id: "",
                    end_time: "",
                    end_timestamp: "",
                    timestamp_get: "",
                  };

                  //console.log(reporting_json_array)
                }

                banner_sidebar_bottom_play_key =
                  parseInt(banner_sidebar_bottom_play_key) + parseInt(1);

                //reactLocalStorage.set('@ClirnetStore:global_sidebar_bottom_play_key',banner_sidebar_bottom_play_key);
                if (
                  banner_sidebar_bottom_url_and_redirect[
                    banner_sidebar_bottom_play_key
                  ] != undefined
                ) {
                  var newmp4sidebar_bottom =
                    banner_sidebar_bottom_url_and_redirect[
                      banner_sidebar_bottom_play_key
                    ].image;
                }

                if (videocontainersidebar_bottom != undefined) {
                  videocontainersidebar_bottom.pause();

                  videosourcesidebar_bottom.setAttribute(
                    "src",
                    newmp4sidebar_bottom
                  );

                  if (
                    banner_sidebar_bottom_url_and_redirect[
                      banner_sidebar_bottom_play_key
                    ].format == "image"
                  ) {
                    banner_sidebar_bottom_type = "image";
                    $(".view_image_sidebar_bottom").css("display", "block");
                    $(".view_video_sidebar_bottom").css("display", "none");
                    document
                      .getElementById("sidebar_bottom_image")
                      .setAttribute("src", newmp4sidebar_bottom);
                  }
                }
                if (
                  banner_sidebar_bottom_url_and_redirect[
                    banner_sidebar_bottom_play_key
                  ] != undefined
                ) {
                  if (
                    banner_sidebar_bottom_url_and_redirect[
                      banner_sidebar_bottom_play_key
                    ].url != ""
                  ) {
                    $("#banner_href_sidebar_bottom").removeClass(
                      "disabled_href"
                    );
                    $("#banner_href_sidebar_bottom").attr("target", "_blank");
                    var par_url =
                      banner_sidebar_bottom_url_and_redirect[
                        banner_sidebar_bottom_play_key
                      ].url;
                  } else {
                    $("#banner_href_sidebar_bottom").addClass("disabled_href");

                    var par_url = "javascript:void(0)";
                  }

                  $("#banner_href_sidebar_bottom").attr("href", par_url);
                }
                if (videocontainersidebar_bottom != undefined) {
                  videocontainersidebar_bottom.load();
                  local_video_time_sidebar_bottom = 0;
                  videocontainersidebar_bottom.play();
                }

                //this.start_timer_sidebar_bottom("");
              } else {
                var videocontainersidebar_bottom = document.getElementById(
                  "video_sidebar_bottom_container"
                );
                var videosourcesidebar_bottom = document.getElementById(
                  "video_sidebar_bottom"
                );

                if (
                  banner_sidebar_bottom_reporting_json.start_time != "" &&
                  banner_sidebar_bottom_reporting_json.start_time != undefined
                ) {
                  let today = new Date();

                  let time =
                    today.getHours() +
                    ":" +
                    today.getMinutes() +
                    ":" +
                    today.getSeconds();
                  let unix_tmp = Math.round(+new Date() / 1000);

                  let vidunsave_sidebar_bottom = document.getElementById(
                    "video_sidebar_bottom_container"
                  );

                  let unsave_durationsidebar_bottom =
                    vidunsave_sidebar_bottom.currentTime;
                  let durationsidebarbottom =
                    unsave_durationsidebar_bottom.toFixed(3) -
                    banner_sidebar_bottom_reporting_json.start_timestamp.toFixed(
                      3
                    );
                  console.log(
                    parseInt(unix_tmp) +
                      "jjj" +
                      banner_sidebar_bottom_reporting_json.start_timestamp
                  );
                  let temp_json = {
                    start_time: "",
                    start_timestamp: "",
                    banner_id: "",
                    banner_cat_id: "",
                    position: "Sidebar-bottom",
                    duration: "",
                    type: thatset.props.type,
                    type_id: "",
                    end_time: "",
                    end_timestamp: "",
                    timestamp_get: "",
                  };

                  if (
                    banner_sidebar_bottom_url_and_redirect[
                      banner_sidebar_bottom_play_key
                    ] != undefined
                  ) {
                    temp_json = {
                      start_time:
                        banner_sidebar_bottom_reporting_json.start_time,
                      start_timestamp: "",
                      banner_id:
                        banner_sidebar_bottom_url_and_redirect[
                          banner_sidebar_bottom_play_key
                        ].banner_id,
                      banner_cat_id:
                        banner_sidebar_bottom_reporting_json.banner_cat_id,
                      position: "Sidebar-bottom",
                      duration: Math.abs(
                        Math.abs(durationsidebarbottom.toFixed(3))
                      ),
                      type: thatset.props.type,
                      type_id: banner_sidebar_bottom_reporting_json.type_id,
                      end_time: time,
                      end_timestamp: "",
                      timestamp_get: banner_call,
                    };
                  }
                  reporting_json_array.push(temp_json);

                  banner_sidebar_bottom_reporting_json.start_time = "";
                  banner_sidebar_bottom_reporting_json.end_time = "";

                  temp_json = {
                    start_time: "",
                    start_timestamp: "",
                    banner_id: "",
                    banner_cat_id: "",
                    position: "Sidebar-bottom",
                    duration: "",
                    type: thatset.props.type,
                    type_id: "",
                    end_time: "",
                    end_timestamp: "",
                    timestamp_get: "",
                  };

                  // console.log(reporting_json_array)
                }
                banner_sidebar_bottom_play_key = 0;

                //reactLocalStorage.set('@ClirnetStore:global_sidebar_bottom_play_key',banner_sidebar_bottom_play_key);

                if (
                  banner_sidebar_bottom_url_and_redirect[
                    banner_sidebar_bottom_play_key
                  ] != undefined
                ) {
                  var newmp4sidebar_bottom =
                    banner_sidebar_bottom_url_and_redirect[
                      banner_sidebar_bottom_play_key
                    ].image;
                }

                if (videocontainersidebar_bottom != undefined) {
                  videocontainersidebar_bottom.pause();

                  videosourcesidebar_bottom.setAttribute(
                    "src",
                    newmp4sidebar_bottom
                  );

                  if (
                    banner_sidebar_bottom_url_and_redirect[
                      banner_sidebar_bottom_play_key
                    ].format == "image"
                  ) {
                    banner_sidebar_bottom_type = "image";
                    $(".view_image_sidebar_bottom").css("display", "block");
                    $(".view_video_sidebar_bottom").css("display", "none");
                    //let imagecontainersdbottom = document.getElementById('sidebar_bottom_image');
                    document
                      .getElementById("sidebar_bottom_image")
                      .setAttribute("src", newmp4sidebar_bottom);
                  }
                }
                if (
                  banner_sidebar_bottom_url_and_redirect[
                    banner_sidebar_bottom_play_key
                  ] != undefined
                ) {
                  if (
                    banner_sidebar_bottom_url_and_redirect[
                      banner_sidebar_bottom_play_key
                    ].url != ""
                  ) {
                    $("#banner_href_sidebar_bottom").removeClass(
                      "disabled_href"
                    );
                    $("#banner_href_sidebar_bottom").attr("target", "_blank");
                    var par_url =
                      banner_sidebar_bottom_url_and_redirect[
                        banner_sidebar_bottom_play_key
                      ].url;
                  } else {
                    $("#banner_href_sidebar_bottom").addClass("disabled_href");
                    var par_url = "javascript:void(0)";
                  }

                  $("#banner_href_sidebar_bottom").attr("href", par_url);
                }
                if (videocontainersidebar_bottom != undefined) {
                  videocontainersidebar_bottom.load();
                  local_video_time_sidebar_bottom = 0;

                  videocontainersidebar_bottom.play();
                }

                //this.start_timer_sidebar_bottom("");
              }
            }
          });
      }
    }, 2000);
  }

  componentWillUnmount() {
    document.removeEventListener(visibilityChange, this.handleVisibilityChange);

    banner_top_type = "";
    $("html, body").css({
      overflow: "auto",
      height: "auto",
    });

    if (this.props.type_id == 1) {
      banner_top_reporting_json = {
        start_time: "",
        start_timestamp: "",
        banner_id: "",
        banner_cat_id: "",
        position: "Top",
        duration: 0,
        type: "comp",
        type_id: "",
        end_time: "",
        end_timestamp: "",
        timestamp_get: "",
      };

      banner_top_type = "";
      banner_top_label = "";
      banner_top_category_id = "";
      banner_top_width = "";
      banner_top_height = "";
      banner_top_duration = "";
      banner_top_url_and_redirect = [];
      banner_top_play_key = 0;
      banner_top_video_change_permission = 0;
      banner_top_onclick_pause = 0;
      myTimer_sidebar_top = "";
      myTimer_small_value_top = "";
      myTimer_small_value_top_temp = "";
      clearInterval(myTimer_top);
      clearTimeout(myTimer_top_main);
      clearInterval(myTimer_top_temp);
      myTimer_top = "";
      myTimer_top_main = "";
      myTimer_top_temp = "";
      timerval_top = "";
    }
    if (this.props.type_id == 2) {
      banner_bottom_reporting_json = {
        start_time: "",
        start_timestamp: "",
        banner_id: "",
        banner_cat_id: "",
        position: "Bottom",
        duration: 0,
        type: "comp",
        type_id: "",
        end_time: "",
        end_timestamp: "",
        timestamp_get: "",
      };
      banner_bottom_type = "";
      banner_bottom_label = "";
      banner_bottom_category_id = "";
      banner_bottom_width = "";
      banner_bottom_height = "";
      banner_bottom_duration = "";
      banner_bottom_url_and_redirect = [];
      banner_bottom_play_key = 0;
      banner_bottom_video_change_permission = 0;
      banner_bottom_onclick_pause = 0;
      myTimer_bottom = "";
      clearInterval(myTimer_bottom);
      clearTimeout(myTimer_bottom_main);
      clearInterval(myTimer_bottom_temp);
      myTimer_bottom_main = "";
      myTimer_bottom_temp = "";
      timerval_bottom = "";
    }
    if (this.props.type_id == 3) {
      banner_sidebar_top_reporting_json = {
        start_time: "",
        start_timestamp: "",
        banner_id: "",
        banner_cat_id: "",
        position: "Sidebar_Top",
        duration: 0,
        type: "comp",
        type_id: "",
        end_time: "",
        end_timestamp: "",
        timestamp_get: "",
      };
      banner_sidebar_top_type = "";
      banner_sidebar_top_label = "";
      banner_sidebar_top_category_id = "";
      banner_sidebar_top_width = "";
      banner_sidebar_top_height = "";
      banner_sidebar_top_duration = "";
      banner_sidebar_top_url_and_redirect = [];
      banner_sidebar_top_play_key = 0;
      banner_sidebar_top_video_change_permission = 0;
      banner_sidebar_top_onclick_pause = 0;
      myTimer_sidebar_top = "";
      clearInterval(myTimer_sidebar_top);
      clearTimeout(myTimer_sidebar_top_main);
      clearInterval(myTimer_sidebar_top_temp);
      myTimer_sidebar_top_main = "";
      myTimer_sidebar_top_temp = "";
      timerval_sidebar_top = "";
    }
    if (this.props.type_id == 4) {
      banner_sidebar_bottom_reporting_json = {
        start_time: "",
        start_timestamp: "",
        banner_id: "",
        banner_cat_id: "",
        position: "Sidebar_Bottom",
        duration: 0,
        type: "comp",
        type_id: "",
        end_time: "",
        end_timestamp: "",
        timestamp_get: "",
      };
      banner_sidebar_bottom_type = "";
      banner_sidebar_bottom_label = "";
      banner_sidebar_bottom_category_id = "";
      banner_sidebar_bottom_width = "";
      banner_sidebar_bottom_height = "";
      banner_sidebar_bottom_duration = "";
      banner_sidebar_bottom_url_and_redirect = [];
      banner_sidebar_bottom_play_key = 0;
      banner_sidebar_bottom_video_change_permission = 0;
      banner_sidebar_bottom_onclick_pause = 0;
      myTimer_sidebar_bottom = "";

      clearInterval(myTimer_sidebar_bottom);
      clearTimeout(myTimer_sidebar_bottom_main);
      clearInterval(myTimer_sidebar_bottom_temp);
      myTimer_sidebar_bottom_main = "";
      myTimer_sidebar_bottom_temp = "";
      timerval_sidebar_bottom = "";
    }

    if (this.props.unmount_call == 1) {
      reactLocalStorage.set("@ClirnetStore:global_bottom_play_key", 0);

      reactLocalStorage.set("@ClirnetStore:global_top_play_key", 0);

      reactLocalStorage.set("@ClirnetStore:global_sidebar_bottom_play_key", 0);

      reactLocalStorage.set("@ClirnetStore:global_sidebar_top_play_key", 0);

      reactLocalStorage.set("@ClirnetStore:global_banner_data", true);
      clearInterval(myvarbottom);
      clearInterval(myvarsidebar_bottom);
      clearInterval(myvarsidebar_top);
      clearInterval(myvartop);
      local_video_time_top = 0;
      local_video_time_sidebar_top = 0;
      local_video_time_bottom = 0;
      local_video_time_sidebar_bottom = 0;

      top_image_change_time = 0;
      sidebar_top_image_change_time = 0;
      sidebar_bottom_image_change_time = 0;
      bottom_image_change_time = 0;

      if (
        document.getElementById("video_top_container") != undefined &&
        document.getElementById("video_top_container") != null
      ) {
        var vidunsave_top = document.getElementById("video_top_container");

        var unsave_durationtop = vidunsave_top.currentTime;
        if (
          unsave_durationtop != 0 &&
          banner_top_reporting_json.start_time != ""
        ) {
          let today = new Date();

          let time =
            today.getHours() +
            ":" +
            today.getMinutes() +
            ":" +
            today.getSeconds();

          let temp_json = {
            start_time: banner_top_reporting_json.start_time,
            start_timestamp: "",
            banner_id:
              banner_top_url_and_redirect[banner_top_play_key].banner_id,
            banner_cat_id: banner_top_reporting_json.banner_cat_id,
            position: "Top",
            duration: Math.abs(Math.abs(unsave_durationtop)),
            type: "comp",
            type_id: banner_top_reporting_json.type_id,
            end_time: time,
            end_timestamp: "",
            timestamp_get: banner_call,
          };
          reporting_json_array.push(temp_json);
        }
      }

      if (
        document.getElementById("video_bottom_container") != undefined &&
        document.getElementById("video_bottom_container") != null
      ) {
        var vidunsave_bottom = document.getElementById(
          "video_bottom_container"
        );

        var unsave_durationbottom = vidunsave_bottom.currentTime;
        if (
          unsave_durationbottom != 0 &&
          banner_bottom_reporting_json.start_time != ""
        ) {
          let today = new Date();

          let time =
            today.getHours() +
            ":" +
            today.getMinutes() +
            ":" +
            today.getSeconds();

          let temp_json = {
            start_time: banner_bottom_reporting_json.start_time,
            start_timestamp: "",
            banner_id:
              banner_bottom_url_and_redirect[banner_bottom_play_key].banner_id,
            banner_cat_id: banner_bottom_reporting_json.banner_cat_id,
            position: "Bottom",
            duration: Math.abs(Math.abs(unsave_durationbottom)),
            type: "comp",
            type_id: banner_bottom_reporting_json.type_id,
            end_time: time,
            end_timestamp: "",
            timestamp_get: banner_call,
          };
          reporting_json_array.push(temp_json);
        }
      }

      if (
        document.getElementById("video_sidebar_bottom_container") !=
          undefined &&
        document.getElementById("video_sidebar_bottom_container") != null
      ) {
        var vidunsave_sidebar_bottom = document.getElementById(
          "video_sidebar_bottom_container"
        );

        var unsave_durationsidebar_bottom =
          vidunsave_sidebar_bottom.currentTime;
        if (
          unsave_durationsidebar_bottom != 0 &&
          banner_sidebar_bottom_reporting_json.start_time != ""
        ) {
          let today = new Date();

          let time =
            today.getHours() +
            ":" +
            today.getMinutes() +
            ":" +
            today.getSeconds();

          let temp_json = {
            start_time: banner_sidebar_bottom_reporting_json.start_time,
            start_timestamp: "",
            banner_id:
              banner_sidebar_bottom_url_and_redirect[
                banner_sidebar_bottom_play_key
              ].banner_id,
            banner_cat_id: banner_sidebar_bottom_reporting_json.banner_cat_id,
            position: "sidebar_bottom",
            duration: Math.abs(Math.abs(unsave_durationsidebar_bottom)),
            type: "comp",
            type_id: banner_sidebar_bottom_reporting_json.type_id,
            end_time: time,
            end_timestamp: "",
            timestamp_get: banner_call,
          };
          reporting_json_array.push(temp_json);
        }
      }

      if (
        document.getElementById("video_sidebar_top_container") != undefined &&
        document.getElementById("video_sidebar_top_container") != null
      ) {
        var vidunsave_sidebar_top = document.getElementById(
          "video_sidebar_top_container"
        );

        var unsave_durationsidebar_top = vidunsave_sidebar_top.currentTime;
        if (
          unsave_durationsidebar_top != 0 &&
          banner_sidebar_top_reporting_json.start_time != ""
        ) {
          let today = new Date();

          let time =
            today.getHours() +
            ":" +
            today.getMinutes() +
            ":" +
            today.getSeconds();

          let temp_json = {
            start_time: banner_sidebar_top_reporting_json.start_time,
            start_timestamp: "",
            banner_id:
              banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key]
                .banner_id,
            banner_cat_id: banner_sidebar_top_reporting_json.banner_cat_id,
            position: "sidebar_top",
            duration: Math.abs(Math.abs(unsave_durationsidebar_top)),
            type: "comp",
            type_id: banner_sidebar_top_reporting_json.type_id,
            end_time: time,
            end_timestamp: "",
            timestamp_get: banner_call,
          };
          reporting_json_array.push(temp_json);
        }
      }

      if (reporting_json_array.length > 0) {
        var userAgent = window.navigator.userAgent,
          platform = window.navigator.platform,
          macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
          windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
          iosPlatforms = ["iPhone", "iPad", "iPod"],
          os = null;

        if (macosPlatforms.indexOf(platform) !== -1) {
          os = "Mac OS";
        } else if (iosPlatforms.indexOf(platform) !== -1) {
          os = "iOS";
        } else if (windowsPlatforms.indexOf(platform) !== -1) {
          os = "Windows";
        } else if (/Android/.test(userAgent)) {
          os = "Android";
        } else if (!os && /Linux/.test(platform)) {
          os = "Linux";
        }

        fetch(url + "banner/addreport", {
          method: "POST",
          headers: {
            Authorization: reactLocalStorage.get(
              "@ClirnetStore:refreshToken",
              true
            ),

            version: "rjsw 1.1.1",
            OS: os,
          },
          body: JSON.stringify(reporting_json_array),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            reporting_json_array = [];
          })
          .catch((error) => {
            reporting_json_array = [];
          });
      }

      reporting_json_array = [];

      //banner_top_reporting_json={};
    }
  }

  is_on_screen_top(id) {
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

  is_on_screen_bottom(id) {
    var temp_is_sc_bottom = $("#" + id + "");
    var win_bottom = $(window);
    var viewport_bottom = {
      top: win_bottom.scrollTop(),
      left: win_bottom.scrollLeft(),
    };
    viewport_bottom.right = viewport_bottom.left + win_bottom.width();
    viewport_bottom.bottom = viewport_bottom.top + win_bottom.height();
    var bounds_bottom = temp_is_sc_bottom.offset();
    if (bounds_bottom != undefined) {
      bounds_bottom.right = bounds_bottom.left + temp_is_sc_bottom.outerWidth();
      bounds_bottom.bottom =
        bounds_bottom.top + temp_is_sc_bottom.outerHeight();

      return !(
        viewport_bottom.right < bounds_bottom.left ||
        viewport_bottom.left > bounds_bottom.right ||
        viewport_bottom.bottom < bounds_bottom.top ||
        viewport_bottom.top > bounds_bottom.bottom
      );
    }
  }

  is_on_screen_sidebar_bottom(id) {
    var temp_is_sc_sidebar_bottom = $("#" + id + "");
    var win_sidebar_bottom = $(window);
    var viewport_sidebar_bottom = {
      top: win_sidebar_bottom.scrollTop(),
      left: win_sidebar_bottom.scrollLeft(),
    };
    viewport_sidebar_bottom.right =
      viewport_sidebar_bottom.left + win_sidebar_bottom.width();
    viewport_sidebar_bottom.sidebar_bottom =
      viewport_sidebar_bottom.top + win_sidebar_bottom.height();
    var bounds_sidebar_bottom = temp_is_sc_sidebar_bottom.offset();
    if (bounds_sidebar_bottom != undefined) {
      bounds_sidebar_bottom.right =
        bounds_sidebar_bottom.left + temp_is_sc_sidebar_bottom.outerWidth();
      bounds_sidebar_bottom.sidebar_bottom =
        bounds_sidebar_bottom.top + temp_is_sc_sidebar_bottom.outerHeight();

      return !(
        viewport_sidebar_bottom.right < bounds_sidebar_bottom.left ||
        viewport_sidebar_bottom.left > bounds_sidebar_bottom.right ||
        viewport_sidebar_bottom.sidebar_bottom < bounds_sidebar_bottom.top ||
        viewport_sidebar_bottom.top > bounds_sidebar_bottom.sidebar_bottom
      );
    }
  }

  is_on_screen_sidebar_top(id) {
    var temp_is_sc_sidebar_top = $("#" + id + "");
    var win_sidebar_top = $(window);
    var viewport_sidebar_top = {
      top: win_sidebar_top.scrollTop(),
      left: win_sidebar_top.scrollLeft(),
    };
    viewport_sidebar_top.right =
      viewport_sidebar_top.left + win_sidebar_top.width();
    viewport_sidebar_top.sidebar_top =
      viewport_sidebar_top.top + win_sidebar_top.height();
    var bounds_sidebar_top = temp_is_sc_sidebar_top.offset();
    if (bounds_sidebar_top != undefined) {
      bounds_sidebar_top.right =
        bounds_sidebar_top.left + temp_is_sc_sidebar_top.outerWidth();
      bounds_sidebar_top.sidebar_top =
        bounds_sidebar_top.top + temp_is_sc_sidebar_top.outerHeight();

      return !(
        viewport_sidebar_top.right < bounds_sidebar_top.left ||
        viewport_sidebar_top.left > bounds_sidebar_top.right ||
        viewport_sidebar_top.sidebar_top < bounds_sidebar_top.top ||
        viewport_sidebar_top.top > bounds_sidebar_top.sidebar_top
      );
    }
  }

  banner_click_track(
    banner_id,
    content_type,
    content_type_id,
    banner_position
  ) {
    let formdataban = new FormData();
    formdataban.append("banner_id", banner_id);
    formdataban.append("content_type", content_type);
    formdataban.append("content_type_id", content_type_id);
    formdataban.append("banner_position", banner_position);

    var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
      windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
      iosPlatforms = ["iPhone", "iPad", "iPod"],
      os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = "Mac OS";
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = "iOS";
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = "Windows";
    } else if (/Android/.test(userAgent)) {
      os = "Android";
    } else if (!os && /Linux/.test(platform)) {
      os = "Linux";
    }
    fetch(url + "banner/bannerclick", {
      method: "POST",
      headers: {
        Authorization: reactLocalStorage.get(
          "@ClirnetStore:refreshToken",
          true
        ),

        version: "rjsw 1.1.1",
        OS: os,
      },
      body: formdataban,
    })
      .then((response) => response.json())
      .then((responseJson) => {})
      .catch((error) => {});
  }

  render() {
    return (
      <>
        {this.props.banner_position == 1 ? (
          <>
            {(banner_top_type === "video" || banner_top_type === "image") &&
            view_top_per == 1 ? (
              <div
                onClick={() => {
                  this.banner_click_track(
                    banner_top_url_and_redirect[banner_top_play_key].banner_id,
                    this.props.type,
                    this.props.type_id,
                    "Top"
                  );
                }}
                className="full_width text-center add_area_top   top_banner_div view_video_top"
                style={{ display: "none" }}
              >
                <div
                  className="full_width addAreaVideo video_imagecont"
                  id="video_imagecont"
                >
                  {banner_top_url_and_redirect[banner_top_play_key].url !=
                  "" ? (
                    <a
                      id="banner_href_top"
                      target="_blank"
                      href={
                        banner_top_url_and_redirect[banner_top_play_key].url
                      }
                    >
                      <h4 className="font_10px font500 colorBlack text-right Ad_ttl">
                        Ad
                      </h4>
                      <div
                        className="bannerVideoManiPrnt"
                        style={{ height: top_height_val }}
                      >
                        <video
                          autoplay="autoplay"
                          muted
                          defaultMuted
                          playsInline
                          oncontextmenu="return false;"
                          preload="auto"
                          style={{ "pointer-events": "none" }}
                          id="video_top_container"
                          width={banner_top_width}
                          height={banner_top_height}
                        >
                          <source
                            id="video_top"
                            src={
                              banner_top_url_and_redirect[banner_top_play_key]
                                .image
                            }
                            type="video/mp4"
                          />
                        </video>
                      </div>
                    </a>
                  ) : (
                    <a id="banner_href_top" href="javascript:void(0)">
                      <h4 className="font_10px font500 colorBlack text-right Ad_ttl">
                        Ad
                      </h4>
                      <div
                        className="bannerVideoManiPrnt"
                        style={{ height: top_height_val }}
                      >
                        <video
                          autoplay="autoplay"
                          preload="auto"
                          muted
                          defaultMuted
                          playsInline
                          style={{ "pointer-events": "none" }}
                          id="video_top_container"
                          width={banner_top_width}
                          height={banner_top_height}
                        >
                          <source
                            id="video_top"
                            src={
                              banner_top_url_and_redirect[banner_top_play_key]
                                .image
                            }
                            type="video/mp4"
                          />
                        </video>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            ) : null}

            {(banner_top_type === "image" || banner_top_type === "video") &&
            view_top_per == 1 ? (
              <div
                onClick={() => {
                  this.banner_click_track(
                    banner_top_url_and_redirect[banner_top_play_key].banner_id,
                    this.props.type,
                    this.props.type_id,
                    "Top"
                  );
                }}
                className="full_width text-center add_area_top   top_banner_div view_image_top"
                style={{ display: "none" }}
              >
                {banner_top_url_and_redirect[banner_top_play_key].url != "" ? (
                  <a
                    id="banner_href_top"
                    target="_blank"
                    href={banner_top_url_and_redirect[banner_top_play_key].url}
                  >
                    <h4 className="font_10px font500 colorBlack text-right Ad_ttl">
                      Ad
                    </h4>
                    <img
                      id="top_image"
                      src={
                        banner_top_url_and_redirect[banner_top_play_key].image
                      }
                    />
                  </a>
                ) : (
                  <a id="banner_href_top" href="javascript:void(0)">
                    <h4 className="font_10px font500 colorBlack text-right Ad_ttl">
                      Ad
                    </h4>
                    <img
                      id="top_image"
                      src={
                        banner_top_url_and_redirect[banner_top_play_key].image
                      }
                    />
                  </a>
                )}
              </div>
            ) : null}
          </>
        ) : null}

        {this.props.banner_position == 2 ? (
          <>
            {banner_bottom_type === "video" ||
            banner_bottom_type === "image " ? (
              <div
                onClick={() => {
                  this.banner_click_track(
                    banner_bottom_url_and_redirect[banner_bottom_play_key]
                      .banner_id,
                    this.props.type,
                    this.props.type_id,
                    "Bottom"
                  );
                }}
                className="full_width text-center add_area_top bottom_banner_div view_video_bottom"
                style={{ display: "none" }}
              >
                <div
                  className="full_width addAreaVideo video_imagecont_bottom"
                  id="video_imagecont_bottom"
                >
                  {banner_bottom_url_and_redirect[banner_bottom_play_key].url !=
                  "" ? (
                    <a
                      id="banner_href_bottom"
                      target="__blank"
                      href={
                        banner_bottom_url_and_redirect[banner_bottom_play_key]
                          .url
                      }
                    >
                      <h4 className="font_10px font500 colorBlack text-right Ad_ttl">
                        Ad
                      </h4>
                      <div
                        className="bannerVideoManiPrnt"
                        style={{ height: bottom_height_val }}
                      >
                        <video
                          playsInline
                          style={{ "pointer-events": "none" }}
                          muted="muted"
                          id="video_bottom_container"
                          autoplay="autoplay"
                          width={banner_bottom_width}
                          height={banner_bottom_height}
                        >
                          <source
                            id="video_bottom"
                            src={
                              banner_bottom_url_and_redirect[
                                banner_bottom_play_key
                              ].image
                            }
                            type="video/mp4"
                          />
                        </video>
                      </div>
                    </a>
                  ) : (
                    <a id="banner_href_bottom" href="javascript:void(0)">
                      <h4 className="font_10px font500 colorBlack text-right Ad_ttl">
                        Ad
                      </h4>
                      <div
                        className="bannerVideoManiPrnt"
                        style={{ height: bottom_height_val }}
                      >
                        <video
                          playsInline
                          style={{ "pointer-events": "none" }}
                          muted="muted"
                          id="video_bottom_container"
                          autoplay="autoplay"
                          width={banner_bottom_width}
                          height={banner_bottom_height}
                        >
                          <source
                            id="video_bottom"
                            src={
                              banner_bottom_url_and_redirect[
                                banner_bottom_play_key
                              ].image
                            }
                            type="video/mp4"
                          />
                        </video>
                      </div>
                    </a>
                  )}
                </div>
                {/* <Slider {...settings} className="addSlider">
<div className="full_width adSlider-in">
<img src="https://www.f-covers.com/cover/slick-diagonal-line-pattern-facebook-cover-timeline-banner-for-fb.jpg"/>
</div>
<div className="full_width adSlider-in">
<img src="https://www.bluepixeldesign.co.uk/wp-content/uploads/2015/08/new-slick-banner.jpg"/>
</div>
</Slider> */}
              </div>
            ) : null}

            {banner_bottom_type === "image" ||
            banner_bottom_type === "video" ? (
              <div
                onClick={() => {
                  this.banner_click_track(
                    banner_bottom_url_and_redirect[banner_bottom_play_key]
                      .banner_id,
                    this.props.type,
                    this.props.type_id,
                    "Bottom"
                  );
                }}
                className="full_width text-center add_area_top   bottom_banner_div view_image_bottom"
                style={{ display: "none" }}
              >
                {banner_bottom_url_and_redirect[banner_bottom_play_key].url !=
                "" ? (
                  <a
                    id="banner_href_bottom"
                    target="_blank"
                    href={
                      banner_bottom_url_and_redirect[banner_bottom_play_key].url
                    }
                  >
                    <h4 className="font_10px font500 colorBlack text-right Ad_ttl">
                      Ad
                    </h4>
                    <img
                      id="bottom_image"
                      src={
                        banner_bottom_url_and_redirect[banner_bottom_play_key]
                          .image
                      }
                    />
                  </a>
                ) : (
                  <a id="banner_href_bottom" href="javascript:void(0)">
                    <h4 className="font_10px font500 colorBlack text-right Ad_ttl">
                      Ad
                    </h4>
                    <img
                      id="bottom_image"
                      src={
                        banner_bottom_url_and_redirect[banner_bottom_play_key]
                          .image
                      }
                    />
                  </a>
                )}
              </div>
            ) : null}
          </>
        ) : null}

        {this.props.banner_position == 3 ? (
          <>
            {banner_sidebar_top_type === "video" ||
            banner_sidebar_top_type === "image" ? (
              <div
                onClick={() => {
                  this.banner_click_track(
                    banner_sidebar_top_url_and_redirect[
                      banner_sidebar_top_play_key
                    ].banner_id,
                    this.props.type,
                    this.props.type_id,
                    "Sidebar-Top"
                  );
                }}
                className="full_width text-center add_area_top sidebar_top_banner_div view_video_sidebar_top"
                style={{ display: "none" }}
              >
                <div
                  className="full_width addAreaVideo video_imagecont_sidebar_top"
                  id="video_imagecont_sidebar_top"
                >
                  {banner_sidebar_top_url_and_redirect[
                    banner_sidebar_top_play_key
                  ].url != "" ? (
                    <a
                      id="banner_href_sidebar_top"
                      target="__blank"
                      href={
                        banner_sidebar_top_url_and_redirect[
                          banner_sidebar_top_play_key
                        ].url
                      }
                    >
                      <h4 className="font_10px font500 colorBlack text-right Ad_ttl">
                        Ad
                      </h4>
                      <div
                        className="bannerVideoRightPrnt"
                        style={{ height: sidebar_top_height_val }}
                      >
                        <video
                          playsInline
                          style={{ "pointer-events": "none" }}
                          muted="muted"
                          id="video_sidebar_top_container"
                          autoplay="autoplay"
                          width={banner_sidebar_top_width}
                          height={banner_sidebar_top_height}
                        >
                          <source
                            id="video_sidebar_top"
                            src={
                              banner_sidebar_top_url_and_redirect[
                                banner_sidebar_top_play_key
                              ].image
                            }
                            type="video/mp4"
                          />
                        </video>
                      </div>
                    </a>
                  ) : (
                    <a id="banner_href_sidebar_top" href="javascript:void(0)">
                      <h4 className="font_10px font500 colorBlack text-right Ad_ttl">
                        Ad
                      </h4>
                      <div
                        className="bannerVideoRightPrnt"
                        style={{ height: sidebar_top_height_val }}
                      >
                        <video
                          playsInline
                          style={{ "pointer-events": "none" }}
                          muted="muted"
                          id="video_sidebar_top_container"
                          autoplay="autoplay"
                          width={banner_sidebar_top_width}
                          height={banner_sidebar_top_height}
                        >
                          <source
                            id="video_sidebar_top"
                            src={
                              banner_sidebar_top_url_and_redirect[
                                banner_sidebar_top_play_key
                              ].image
                            }
                            type="video/mp4"
                          />
                        </video>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            ) : null}

            {banner_sidebar_top_type === "image" ||
            banner_sidebar_top_type === "video" ? (
              <div
                onClick={() => {
                  this.banner_click_track(
                    banner_sidebar_top_url_and_redirect[
                      banner_sidebar_top_play_key
                    ].banner_id,
                    this.props.type,
                    this.props.type_id,
                    "Sidebar-Top"
                  );
                }}
                className="full_width text-center add_area_top   sidebar_top_banner_div view_image_sidebar_top"
                style={{ display: "none" }}
              >
                {banner_sidebar_top_url_and_redirect[
                  banner_sidebar_top_play_key
                ].url != "" ? (
                  <a
                    id="banner_href_sidebar_top"
                    target="_blank"
                    href={
                      banner_sidebar_top_url_and_redirect[
                        banner_sidebar_top_play_key
                      ].url
                    }
                  >
                    <h4 className="font_10px font500 colorBlack text-right Ad_ttl">
                      Ad
                    </h4>
                    <img
                      id="sidebar_top_image"
                      src={
                        banner_sidebar_top_url_and_redirect[
                          banner_sidebar_top_play_key
                        ].image
                      }
                    />
                  </a>
                ) : (
                  <a id="banner_href_sidebar_top" href="javascript:void(0)">
                    <h4 className="font_10px font500 colorBlack text-right Ad_ttl">
                      Ad
                    </h4>
                    <img
                      id="sidebar_top_image"
                      src={
                        banner_sidebar_top_url_and_redirect[
                          banner_sidebar_top_play_key
                        ].image
                      }
                    />
                  </a>
                )}
              </div>
            ) : null}
          </>
        ) : null}

        {this.props.banner_position == 4 ? (
          <>
            {banner_sidebar_bottom_type === "video" ||
            banner_sidebar_bottom_type === "image" ? (
              <div
                onClick={() => {
                  this.banner_click_track(
                    banner_sidebar_bottom_url_and_redirect[
                      banner_sidebar_bottom_play_key
                    ].banner_id,
                    this.props.type,
                    this.props.type_id,
                    "Sidebar-Bottom"
                  );
                }}
                className="full_width text-center add_area_top banner_sidebar_bottom_type view_video_sidebar_bottom"
                style={{ display: "none" }}
              >
                <div
                  className="full_width addAreaVideo video_imagecont_sidebar_bottom"
                  id="video_imagecont_sidebar_bottom"
                >
                  {banner_sidebar_bottom_url_and_redirect[
                    banner_sidebar_bottom_play_key
                  ].url != "" ? (
                    <a
                      id="banner_href_sidebar_bottom"
                      target="__blank"
                      href={
                        banner_sidebar_bottom_url_and_redirect[
                          banner_sidebar_bottom_play_key
                        ].url
                      }
                    >
                      <h4 className="font_10px font500 colorBlack text-right Ad_ttl">
                        Ad
                      </h4>
                      <div
                        className="bannerVideoRightPrnt"
                        style={{ height: sidebar_bottom_height_val }}
                      >
                        <video
                          playsInline
                          style={{ "pointer-events": "none" }}
                          muted="muted"
                          id="video_sidebar_bottom_container"
                          autoplay="autoplay"
                          width={banner_sidebar_bottom_width}
                          height={banner_sidebar_bottom_height}
                        >
                          <source
                            id="video_sidebar_bottom"
                            src={
                              banner_sidebar_bottom_url_and_redirect[
                                banner_sidebar_bottom_play_key
                              ].image
                            }
                            type="video/mp4"
                          />
                        </video>
                      </div>
                    </a>
                  ) : (
                    <a
                      id="banner_href_sidebar_bottom"
                      href="javascript:void(0)"
                    >
                      <div
                        className="bannerVideoRightPrnt"
                        style={{ height: sidebar_bottom_height_val }}
                      >
                        <video
                          playsInline
                          style={{ "pointer-events": "none" }}
                          muted="muted"
                          id="video_sidebar_bottom_container"
                          autoplay="autoplay"
                          width={banner_sidebar_bottom_width}
                          height={banner_sidebar_bottom_height}
                        >
                          <source
                            id="video_sidebar_bottom"
                            src={
                              banner_sidebar_bottom_url_and_redirect[
                                banner_sidebar_bottom_play_key
                              ].image
                            }
                            type="video/mp4"
                          />
                        </video>
                      </div>
                    </a>
                  )}
                </div>

                {/* <Slider {...settings} className="addSlider">
<div className="full_width adSlider-in">
<img src="https://www.f-covers.com/cover/slick-diagonal-line-pattern-facebook-cover-timeline-banner-for-fb.jpg"/>
</div>
<div className="full_width adSlider-in">
<img src="https://www.bluepixeldesign.co.uk/wp-content/uploads/2015/08/new-slick-banner.jpg"/>
</div>
</Slider> */}
              </div>
            ) : null}

            {banner_sidebar_bottom_type === "image" ||
            banner_sidebar_bottom_type === "video" ? (
              <div
                onClick={() => {
                  this.banner_click_track(
                    banner_sidebar_bottom_url_and_redirect[
                      banner_sidebar_bottom_play_key
                    ].banner_id,
                    this.props.type,
                    this.props.type_id,
                    "Sidebar-Bottom"
                  );
                }}
                className="full_width text-center add_area_top   banner_sidebar_bottom_type view_image_sidebar_bottom"
                style={{ display: "none" }}
              >
                {banner_sidebar_bottom_url_and_redirect[
                  banner_sidebar_bottom_play_key
                ].url != "" ? (
                  <a
                    id="banner_href_sidebar_bottom"
                    target="_blank"
                    href={
                      banner_sidebar_bottom_url_and_redirect[
                        banner_sidebar_bottom_play_key
                      ].url
                    }
                  >
                    <h4 className="font_10px font500 colorBlack text-right Ad_ttl">
                      Ad
                    </h4>
                    <img
                      id="sidebar_bottom_image"
                      src={
                        banner_sidebar_bottom_url_and_redirect[
                          banner_sidebar_bottom_play_key
                        ].image
                      }
                    />
                  </a>
                ) : (
                  <a id="banner_href_sidebar_bottom" href="javascript:void(0)">
                    <h4 className="font_10px font500 colorBlack text-right Ad_ttl">
                      Ad
                    </h4>
                    <img
                      id="sidebar_bottom_image"
                      src={
                        banner_sidebar_bottom_url_and_redirect[
                          banner_sidebar_bottom_play_key
                        ].image
                      }
                    />
                  </a>
                )}
              </div>
            ) : null}
          </>
        ) : null}
      </>
    );
  }
}

export default Banner;
