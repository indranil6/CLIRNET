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
import { hotjar } from "react-hotjar";

var is_render = 0;
const url = AppConfig.apiLoc;
const gtag = window.gtag;

hotjar.initialize("2432833", "6");

class Login extends React.Component {
  constructor(props) {
    super(props);
    console.warn(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangewithparam = this.handleChangewithparam.bind(this);
    reactLocalStorage.set("@ClirnetStore:redirect_url", "");
    this.state = {
      phone_no: "",
      isd_code: "+91",
      err_msg: "",
      tootp: false,
      is_loader: false,
      is_refresh: false,
      login_type: 1,
      email: "",
      password: "",
    };

    if (
      reactLocalStorage.get("@ClirnetStore:jugar_url", 0) != "" &&
      reactLocalStorage.get("@ClirnetStore:jugar_url", 0) != undefined &&
      reactLocalStorage.get("@ClirnetStore:jugar_url", 0) != 0 &&
      reactLocalStorage.get("@ClirnetStore:jugar_url", 0) != null
    ) {
      //alert();

      this.props.history.push({
        pathname: "" + reactLocalStorage.get("@ClirnetStore:jugar_url", 0) + "",
      });
      reactLocalStorage.set("@ClirnetStore:jugar_url", 0);
    }

    this._handleKeyDown = this._handleKeyDown.bind(this);
    reactLocalStorage.set("@ClirnetStore:my_sessions", 0);
    reactLocalStorage.set(
      "@ClirnetStore:utm_source",
      this.props.match.params.source
    );
    if (reactLocalStorage.get("@ClirnetStore:page_reload", true) == "1111") {
      reactLocalStorage.set("@ClirnetStore:page_reload", "2222");
      window.location.reload();
    }
    reactLocalStorage.set("@ClirnetStore:page_reload", "2222");
  }

  getUtmSource() {
    let utmSource = reactLocalStorage.get("@ClirnetStore:utm_source", true);
    if (
      utmSource == undefined ||
      utmSource == "undefined" ||
      utmSource == true ||
      utmSource == "true" ||
      utmSource == ""
    ) {
      console.log("utm source not found");
      return 0;
    } else {
      console.log("utm source:" + utmSource);
      return utmSource;
    }
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
          if (
            reactLocalStorage.get("@ClirnetStore:jugar_url", 0) != "" &&
            reactLocalStorage.get("@ClirnetStore:jugar_url", 0) != undefined &&
            reactLocalStorage.get("@ClirnetStore:jugar_url", 0) != 0 &&
            reactLocalStorage.get("@ClirnetStore:jugar_url", 0) != null
          ) {
            let temp_url = reactLocalStorage.get("@ClirnetStore:jugar_url", 0);
            reactLocalStorage.set("@ClirnetStore:jugar_url", 0);
            //alert();
            // window.location = "https://doctor.clirnet.com/services_development/#/"+temp_url+"";

            this.props.history.push({
              pathname:
                "" + reactLocalStorage.get("@ClirnetStore:jugar_url", 0) + "",
            });
          } else {
            this.props.history.push({
              pathname: `/Dashboard`,
            });
          }
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
    window.document.title = "CLIRNET - Login";
    //   var thisobj=this
    //   $(document).keypress(function(event){
    //     var keycode = (event.keyCode ? event.keyCode : event.which);
    //     if(keycode == '13'){
    //       thisobj.setState({"is_loader":true});
    //       thisobj.otp_send_or_login_password()
    //     }
    // });
    //alert(reactLocalStorage.get('@ClirnetStore:email', true))
    reactLocalStorage.set("@ClirnetStore:redtype", "");
    reactLocalStorage.set("@ClirnetStore:redid", "");

    //reactLocalStorage.set('@ClirnetStore:deals_url','');

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
  otp_send_or_login_password() {
    let has_error = 0;
    if (this.state.login_type == 1) {
      gtag("config", AppConfig.gtag_measure_id, {
        page_title: "LOGIN _OTP",
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
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
        let utm = this.getUtmSource();
        let formdata = new FormData();
        formdata.append("isdCode", this.state.isd_code);
        formdata.append("phone_no", this.state.phone_no);
        formdata.append("utm_source", utm);

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
    } else {
      gtag("config", AppConfig.gtag_measure_id, {
        page_title: "LOGIN _PASSWORD",
        page_location: window.location.href,
        page_path: window.location.pathname,
      });

      if (this.state.password === "") {
        has_error = 1;
        this.setState({ is_loader: false });
        this.setState({ err_msg: "Please Enter Password." });
      }

      if (this.state.email === "") {
        has_error = 1;
        this.setState({ is_loader: false });
        this.setState({ err_msg: "Please Enter Email ID." });
      }

      if (this.state.email != "") {
        var reEmail =
          /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
        if (!this.state.email.match(reEmail)) {
          has_error = 1;
          this.setState({ err_msg: "Please enter valid Email." });
          this.setState({ is_loader: false });
        }
      }

      if (has_error == 0) {
        let utm = this.getUtmSource();
        let formdata = new FormData();
        formdata.append("email", this.state.email);
        formdata.append("password", this.state.password);
        formdata.append("utm_source", utm);

        fetch(url + "Authrjs/loginEmail", {
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
              if (responseJson.data.status === 3) {
                //Old User to dashboard and setting values

                reactLocalStorage.set(
                  "@ClirnetStore:refreshToken",
                  responseJson.data.refresh_token
                );

                fetch(url + "user/detail", {
                  method: "GET",
                  headers: {
                    Authorization: responseJson.data.refresh_token,
                    version: "rjsw 1.1.1",
                  },
                })
                  .then((response) => response.json())
                  .then((responseJson) => {
                    if (responseJson.status_code == "200") {
                      reactLocalStorage.set(
                        "@ClirnetStore:user_master_id",
                        responseJson.data.user_master_id
                      );
                      reactLocalStorage.set(
                        "@ClirnetStore:user_mem_id",
                        responseJson.data.user_mem_id
                      );
                      reactLocalStorage.set(
                        "@ClirnetStore:client_logo",
                        responseJson.data.client_logo
                      );
                      reactLocalStorage.set(
                        "@ClirnetStore:user_name",
                        responseJson.data.user_name
                      );
                      reactLocalStorage.set(
                        "@ClirnetStore:email",
                        responseJson.data.email
                      );
                      reactLocalStorage.set(
                        "@ClirnetStore:phoneNumber",
                        responseJson.data.mobilePrimary
                      );
                      reactLocalStorage.set(
                        "@ClirnetStore:mobilePrimary",
                        responseJson.data.mobilePrimary
                      );
                      reactLocalStorage.set(
                        "@ClirnetStore:password",
                        responseJson.data.password
                      );
                      reactLocalStorage.set(
                        "@ClirnetStore:first_name",
                        responseJson.data.first_name
                      );
                      reactLocalStorage.set(
                        "@ClirnetStore:last_name",
                        responseJson.data.last_name
                      );
                      reactLocalStorage.set(
                        "@ClirnetStore:profile_image",
                        responseJson.data.profile_image
                      );
                      reactLocalStorage.set(
                        "@ClirnetStore:profile_type",
                        responseJson.data.profile_type
                      );

                      var vault = [];
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
                          responseJson.data.map((r) => {
                            this.setState({ is_loader: false });

                            vault.push(r);
                          });

                          reactLocalStorage.set(
                            "@ClirnetStore:vault_count",
                            vault.length
                          );
                        })
                        .catch((error) => {
                          this.setState({ is_loader: false });
                        });

                      if (
                        reactLocalStorage.get("@ClirnetStore:redtype", true) !=
                          "" &&
                        reactLocalStorage.get("@ClirnetStore:redid", true) !=
                          "" &&
                        reactLocalStorage.get("@ClirnetStore:redtype", true) !=
                          true &&
                        reactLocalStorage.get("@ClirnetStore:redid", true) !=
                          true
                      ) {
                        this.props.history.push({
                          pathname:
                            "/" +
                            reactLocalStorage.get(
                              "@ClirnetStore:redtype",
                              true
                            ) +
                            "/" +
                            reactLocalStorage.get("@ClirnetStore:redid", true) +
                            "/social",
                        });
                      } else {
                        if (
                          reactLocalStorage.get("@ClirnetStore:email", 0) ==
                            0 ||
                          reactLocalStorage.get("@ClirnetStore:email", 0) ==
                            "" ||
                          reactLocalStorage.get("@ClirnetStore:email", 0) ==
                            undefined ||
                          reactLocalStorage.get("@ClirnetStore:email", 0) ==
                            null ||
                          reactLocalStorage.get("@ClirnetStore:email", 0) ==
                            "undefined"
                        ) {
                          this.props.history.push({
                            pathname:
                              "/Store/" +
                              reactLocalStorage.get(
                                "@ClirnetStore:deals_url",
                                true
                              ) +
                              "",
                          });
                        } else {
                          if (
                            reactLocalStorage.get(
                              "@ClirnetStore:redtype",
                              true
                            ) == "CphMobile"
                          ) {
                            this.props.history.push({
                              pathname: `/CphMobile`,
                            });
                          } else {
                            this.props.history.push({
                              pathname: `/Dashboard`,
                            });
                          }
                        }
                      }
                    }
                  })
                  .catch((error) => {
                    this.props.history.push({
                      pathname: `/`,
                    });
                  });
              } else {
                this.setState({ is_loader: false });
                this.setState({ err_msg: "Email Not Registered." });
              }
            }
          })
          .catch((error) => {
            //alert(error)
            this.setState({ is_loader: false });
            this.setState({ err_msg: "Something went Wrong" });
          });
      }
    }
  }
  handleChange(e) {
    this.setState({ err_msg: "" });

    this.setState({ phone_no: e.target.value });
  }

  handleChangewithparam = (e) => (val) => {
    switch (e) {
      case "email":
        this.setState({ email: val.target.value });
        break;
      case "password":
        this.setState({ password: val.target.value });
        break;

      default: {
      }
    }
  };

  holdfunc() {
    alert();
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
      this.otp_send_or_login_password();
    }
  }

  render() {
    return (
      <div>
        {is_render == 1 &&
        reactLocalStorage.get("@ClirnetStore:jugar_url", 0) == 0 ? (
          <div>
            <section className="full_width l_main_body">
              <Helmet>
                <meta
                  property="og:url"
                  content="https://doctor.clirnet.com/services/"
                />
                <meta property="og:type" content="article" />
                <meta property="og:title" content="CLIRNET - Login" />
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
                <meta name="twitter:title" content="CLIRNET - Login" />
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
                            {this.state.login_type == 1 ? (
                              <div className="full_width loginWithMobile">
                                <div className="full_width mobleNoCont">
                                  <select
                                    style={{ color: "white" }}
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

                                  <div className="full_width l_form_row l_regFrmRowEffct l_regFormRowHvr">
                                    <label>Mobile Number</label>

                                    <input
                                      style={{ color: "white" }}
                                      type="text"
                                      maxLength="10"
                                      onChange={this.handleChange}
                                      className="l_reg_input_efect"
                                      pattern="[6789][0-9]{9}"
                                      required
                                    />
                                  </div>
                                </div>

                                <span
                                  className="err_hold"
                                  style={{ color: "red" }}
                                >
                                  {this.state.err_msg}
                                </span>

                                <div className="full_width l_form_row">
                                  <button
                                    onClick={() => {
                                      this.setState({ is_loader: true });
                                      this.otp_send_or_login_password();
                                    }}
                                    className="radius-6 font_16px font600 l_frmSubmit"
                                  >
                                    Login/Register
                                  </button>
                                </div>

                                <div className="full_width">
                                  <h3 className="loginDvdr colorBlack font_14px">
                                    <span>OR</span>
                                  </h3>
                                  <div className="clearfix"></div>
                                  <a
                                    href="javascript:void(0)"
                                    onClick={() => {
                                      this.setState({ login_type: 2 });
                                      this.setState({ err_msg: "" });
                                    }}
                                    className="radius-6 font_16px font600 l_frm2na"
                                  >
                                    Login/Register With Email ID
                                  </a>
                                </div>
                              </div>
                            ) : (
                              <div className="full_width loginWithEmail">
                                <div className="full_width l_form_row l_regFrmRowEffct l_regFormRowHvr">
                                  <label>Email ID</label>

                                  <input
                                    type="email"
                                    onChange={this.handleChangewithparam(
                                      "email"
                                    )}
                                    className="l_reg_input_efect"
                                    required
                                  />
                                </div>
                                <div className="full_width l_form_row l_regFrmRowEffct l_regFormRowHvr">
                                  <label>Password</label>

                                  <input
                                    type="password"
                                    onChange={this.handleChangewithparam(
                                      "password"
                                    )}
                                    className="l_reg_input_efect"
                                    required
                                  />
                                </div>

                                <span
                                  className="err_hold"
                                  style={{ color: "red" }}
                                >
                                  {this.state.err_msg}
                                </span>

                                <div className="full_width l_form_row">
                                  <button
                                    onClick={() => {
                                      this.setState({ is_loader: true });
                                      this.otp_send_or_login_password();
                                    }}
                                    className="radius-6 font_16px font600 l_frmSubmit"
                                  >
                                    Login
                                  </button>
                                </div>

                                {/* <div className="full_width l_form_row">
                        <a className="colorWhite font600 l_form_forgot" href="javascript:void(0)">Forgot Password ?</a>
                        </div> */}
                                <div className="full_width l_form_row">
                                  <a
                                    className="colorWhite font600 l_form_forgot"
                                    onClick={() => {
                                      this.props.history.push({
                                        pathname: `/Registerwithemail`,
                                      });
                                    }}
                                    href="javascript:void(0)"
                                  >
                                    New User ?
                                  </a>
                                </div>
                                <div className="full_width">
                                  <h3 className="loginDvdr colorBlack font_14px">
                                    <span>OR</span>
                                  </h3>
                                  <div className="clearfix"></div>
                                  <a
                                    href="javascript:void(0)"
                                    onClick={() => {
                                      this.setState({ login_type: 1 });
                                      this.setState({ err_msg: "" });
                                    }}
                                    className="radius-6 font_16px font600 l_frm2na"
                                  >
                                    Login/Register With Mobile No.
                                  </a>
                                </div>
                              </div>
                            )}
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
