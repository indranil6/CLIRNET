import React from "react";
import Loader from "react-loader-spinner";
import { withRouter } from "react-router-dom";
import frombg from "./images/l_frmBg.png";
import logiInLeft from "./images/Web LoginPage.png";
import $ from "jquery";
import { reactLocalStorage } from "reactjs-localstorage";
import { Scrollbars } from "react-custom-scrollbars";
import AppConfig from "../config/config.js";
import { Helmet } from "react-helmet";

import Form from "react-bootstrap/Form";
var thisobj1 = this;
var is_render = 0;
const url = AppConfig.apiLoc;

class Login extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.handleChange = this.handleChange.bind(this);

    reactLocalStorage.set("@ClirnetStore:redirect_url", "");
    this.state = {
      phone_no: "",
      isd_code: "+91",
      err_msg: "",
      tootp: false,
      is_loader: false,
      is_refresh: false,
    };

    this._handleKeyDown = this._handleKeyDown.bind(this);
    reactLocalStorage.set("@ClirnetStore:my_sessions", 0);
    reactLocalStorage.set(
      "@ClirnetStore:utm_source",
      this.props.match.params.source
    );
  }

  componentWillUnmount() {
    is_render = 0;
  }

  componentWillMount() {
    fetch(url + "user/detail", {
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
        if (responseJson.status_code == "200") {
          this.props.history.push({
            pathname: `/Dashboard`,
          });
        } else {
          is_render = 1;
          this.setState({ is_refresh: !this.state.is_refresh });
          $(".l_reg_input_efect").val("");

          $(".l_reg_input_efect")
            .on("blur", function () {
              if (this.value == "") {
                $(this)
                  .parent()
                  .removeClass("l_regFormRowHvr")
                  .addClass("l_regFormRowWtoHvr");
              }
            })
            .on("focus", function () {
              $(this)
                .parent()
                .removeClass("l_regFormRowWtoHvr")
                .addClass("l_regFormRowHvr");
            });

          var abc = document.getElementsByClassName("l_reg_input_efect");
          for (var i = 0; i <= abc.length; i++) {
            if ($(".l_regRowCount-" + i).val() !== "") {
              $(".l_regRowCount-" + i)
                .parent()
                .removeClass("l_regFormRowWtoHvr")
                .addClass("l_regFormRowHvr");
            }
          }
        }
      })
      .catch((error) => {
        this.props.history.push({
          pathname: `/`,
        });
        is_render = 1;
        this.setState({ is_refresh: !this.state.is_refresh });
        $(".l_reg_input_efect").val("");

        $(".l_reg_input_efect")
          .on("blur", function () {
            if (this.value == "") {
              $(this)
                .parent()
                .removeClass("l_regFormRowHvr")
                .addClass("l_regFormRowWtoHvr");
            }
          })
          .on("focus", function () {
            $(this)
              .parent()
              .removeClass("l_regFormRowWtoHvr")
              .addClass("l_regFormRowHvr");
          });

        var abc = document.getElementsByClassName("l_reg_input_efect");
        for (var i = 0; i <= abc.length; i++) {
          if ($(".l_regRowCount-" + i).val() !== "") {
            $(".l_regRowCount-" + i)
              .parent()
              .removeClass("l_regFormRowWtoHvr")
              .addClass("l_regFormRowHvr");
          }
        }
      });
  }

  componentDidMount() {
    //   var thisobj=this
    //   $(document).keypress(function(event){
    //     var keycode = (event.keyCode ? event.keyCode : event.which);
    //     if(keycode == '13'){
    //       thisobj.setState({"is_loader":true});
    //       thisobj.otp_send()
    //     }
    // });
    //alert(reactLocalStorage.get('@ClirnetStore:email', true))
    reactLocalStorage.set("@ClirnetStore:redtype", "");
    reactLocalStorage.set("@ClirnetStore:redid", "");

    //reactLocalStorage.set('@ClirnetStore:deals_url','');
    document.title = "CLIRNet";
    $(".l_reg_input_efect").val("");

    $(".l_reg_input_efect")
      .on("blur", function () {
        if (this.value == "") {
          $(this)
            .parent()
            .removeClass("l_regFormRowHvr")
            .addClass("l_regFormRowWtoHvr");
        }
      })
      .on("focus", function () {
        $(this)
          .parent()
          .removeClass("l_regFormRowWtoHvr")
          .addClass("l_regFormRowHvr");
      });

    var abc = document.getElementsByClassName("l_reg_input_efect");
    for (var i = 0; i <= abc.length; i++) {
      if ($(".l_regRowCount-" + i).val() !== "") {
        $(".l_regRowCount-" + i)
          .parent()
          .removeClass("l_regFormRowWtoHvr")
          .addClass("l_regFormRowHvr");
      }
    }
  }
  otp_send() {
    let has_error = 0;
    if (this.state.phone_no === "") {
      has_error = 1;
      this.setState({ is_loader: false });
      this.setState({ err_msg: "Please Enter Phone No." });
    }

    let phoneno = /^\d{10}$/;
    if (this.state.phone_no.match(phoneno)) {
    } else {
      has_error = 1;
      this.setState({ is_loader: false });
      this.setState({ err_msg: "Please Enter Phone No In Correct Format." });
    }

    if (has_error == 0) {
      let formdata = new FormData();
      formdata.append("isdCode", this.state.isd_code);
      formdata.append("phone_no", this.state.phone_no);

      fetch(url + "Authrjs/login", {
        method: "POST",
        headers: {
          version: "rjsw 1.1.1",
        },
        body: formdata,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status_code == "203") {
            this.setState({ err_msg: responseJson.message });
            this.setState({ is_loader: false });
          }
          if (responseJson.status_code == "200") {
            this.setState({ is_loader: false });
            this.props.history.push({
              pathname: `/otpverify`,

              state: {
                phone_no: this.state.phone_no,
                isd_code: this.state.isd_code,
              },
            });
            this.setState({ test: 1 });
          }
        })
        .catch((error) => {
          //alert(error)
          this.setState({ is_loader: false });
          this.setState({ err_msg: "Something went Wrong" });
        });
    }
  }
  handleChange(e) {
    this.setState({ err_msg: "" });

    this.setState({ phone_no: e.target.value });
  }

  handleChangeisd = (e) => (val) => {
    this.setState({ err_msg: "" });

    switch (e) {
      case "isd":
        this.setState({ isd_code: val.target.value });

        break;

      default: {
      }
    }
  };

  _handleKeyDown(e) {
    if (e.key === "Enter") {
      this.setState({ is_loader: true });
      this.otp_send();
    }
  }

  render() {
    return (
      <div>
        {is_render == 1 ? (
          <div>
            <section className="full_width l_main_body">
              <Helmet>
                <title>CLIRNet</title>
                <meta
                  property="og:url"
                  content="https://doctor.clirnet.com/services/"
                />
                <meta property="og:type" content="article" />
                <meta property="og:title" content="CLIRNet" />
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
                <meta name="twitter:title" content="CLIRNet" />
                <meta name="twitter:card" content="summary_large_image" />
              </Helmet>
              <div className="l_mainBox" onKeyDown={this._handleKeyDown}>
                <div className="l_leftBox l_session_left">
                  <img src={logiInLeft} className="loginGrap translate_both" />
                </div>

                <div className="l_frmPart">
                  <div className="overlay"></div>
                  <img src={frombg} className="l_frmPart_Bg" />
                  <div className="full_width l_rightIn">
                    <Scrollbars
                      renderTrackVertical={(props) => (
                        <div {...props} className="track-vertical" />
                      )}
                      style={{ width: "100%", height: "100vh" }}
                    >
                      <div className="row align-items-center">
                        <div className="col">
                          <div className="full_width text-left l_frmTtl">
                            <h2 className="colorWhite font700 font_20px">
                              Join the movement now!
                            </h2>
                          </div>
                          <div className="full_width l_frmBody">
                            <div className="full_width mobleNoCont">
                              <select
                                onChange={this.handleChangeisd("isd")}
                                className="mobleNoSelect"
                              >
                                <option selected value="1">
                                  +91
                                </option>
                                <option value="+1">+1</option>
                                <option value="+6">+6</option>
                                <option value="+977">+977</option>
                                <option value="+975">+975</option>
                                <option value="+960">+960</option>
                                <option value="+61">+61</option>
                                <option value="+82">+82</option>
                                <option value="+94">+94</option>
                                <option value="+95">+95</option>
                              </select>

                              <div className="full_width l_form_row l_regFrmRowEffct l_regFormRowWtoHvr">
                                <label>Mobile Number</label>

                                <input
                                  type="text"
                                  maxLength="10"
                                  onChange={this.handleChange}
                                  className="l_reg_input_efect"
                                  pattern="[6789][0-9]{9}"
                                  required
                                />
                              </div>
                            </div>

                            <span className="err_hold" style={{ color: "red" }}>
                              {this.state.err_msg}
                            </span>

                            <div className="full_width l_form_row">
                              <button
                                onClick={() => {
                                  this.setState({ is_loader: true });
                                  this.otp_send();
                                }}
                                className="radius-6 font_16px font600 l_frmSubmit"
                              >
                                Login/Register
                              </button>
                            </div>
                            <div className="full_width l_form_row">
                              <h2 className="font500 font_18px colorWhite fontItalic">
                                "Exclusive and Free for Doctors"
                              </h2>
                            </div>
                            <Loader
                              type="ThreeDots"
                              color="#3393df"
                              height={80}
                              width={80}
                              visible={this.state.is_loader}
                            />
                          </div>
                        </div>
                      </div>
                    </Scrollbars>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(Login);
