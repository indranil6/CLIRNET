import React from "react";
import Loader from "react-loader-spinner";
import frombg from "./images/l_frmBg.png";
import Registlogo from "./images/Registration.jpg";
import $ from "jquery";
import { reactLocalStorage } from "reactjs-localstorage";
import AppConfig from "../config/config.js";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet";
import { Scrollbars } from "react-custom-scrollbars";

const url = AppConfig.apiLoc;
var phone_no = "";
var specialities = [];
class Registrationparttwo extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: "",
      mci_registration: "",
      registration_no: "",
      speciality: [],
      err_msg: "",

      is_loader: false,
      is_refresh: true,
    };

    //Login Check
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
            responseJson.data.email != "" &&
            responseJson.data.email != undefined
          ) {
            this.props.history.push({
              pathname: `/Dashboard`,
            });
          }
        } else {
          this.props.history.push({
            pathname: `/`,
          });
        }
      })
      .catch((error) => {
        this.props.history.push({
          pathname: `/`,
        });
      });
  }

  componentDidMount() {
    //Enter Press Form Submit

    var thisobj = this;
    $(document).keypress(function (event) {
      var keycode = event.keyCode ? event.keyCode : event.which;
      if (keycode == "13") {
        thisobj.setState({ is_loader: true });
        thisobj.onSubmit();
      }
    });

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

  //Setting Values For registration part 2

  handleChange = (e) => (val) => {
    switch (e) {
      case "email":
        this.setState({ email: val.target.value });
        break;
      case "mci_registration":
        this.setState({ mci_registration: val.target.value });
        break;
      case "registration_no":
        this.setState({ registration_no: val.target.value });
        break;
      case "speciality":
        var options = val.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        this.setState({ speciality: value });

        break;

      default: {
      }
    }
  };
  componentWillMount() {
    this.getAllSpecialities();
  }

  //Getting Speciality List
  getAllSpecialities() {
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
        if (responseJson.status_code == "200") {
          responseJson.data.speciality_data.map((r) => {
            specialities.push(r);
          });
          this.setState({ is_refresh: !this.state.is_refresh });
        }
      })
      .catch((error) => {});
  }
  //Skip Registration flow 2
  skipRegistration() {
    if (
      reactLocalStorage.get("@ClirnetStore:redtype", true) != "" &&
      reactLocalStorage.get("@ClirnetStore:redid", true) != "" &&
      reactLocalStorage.get("@ClirnetStore:redtype", true) != true &&
      reactLocalStorage.get("@ClirnetStore:redid", true) != true
    ) {
      this.props.history.push({
        pathname:
          "/" +
          reactLocalStorage.get("@ClirnetStore:redtype", true) +
          "/" +
          reactLocalStorage.get("@ClirnetStore:redid", true) +
          "/social",
      });
    } else {
      this.props.history.push({
        pathname: `/Dashboard`,
      });
    }
  }

  //Submission of registration part 2
  onSubmit() {
    var reEmail =
      /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
    let has_error = 0;
    if (!this.state.email.match(reEmail)) {
      has_error = 1;
      this.setState({ err_msg: "Please enter valid Email." });
      this.setState({ is_loader: false });
    }

    if (has_error == 0) {
      let formdata = new FormData();
      formdata.append("email", this.state.email);
      formdata.append("registration_council", this.state.mci_registration);
      formdata.append("registration_no", this.state.registration_no);
      formdata.append("speciality", this.state.speciality);

      fetch(url + "settings/refistrationflow2", {
        method: "POST",
        headers: {
          Authorization: reactLocalStorage.get(
            "@ClirnetStore:refreshToken",
            true
          ),
          version: "rjsw 1.1.1",
          OS: "windows",
        },
        body: formdata,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status_code == "203") {
            this.setState({ is_loader: false });
            this.setState({ err_msg: responseJson.message });
          }
          if (responseJson.status_code == "200") {
            this.props.history.push({
              pathname: `/Dashboard`,
            });
          }
        })
        .catch((error) => {
          this.setState({ is_loader: false });

          this.setState({ err_msg: "Some Wrong." });
        });
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <meta
            property="og:url"
            content="https://doctor.clirnet.com/services/"
          />
          <meta property="og:type" content="article" />
          <meta property="og:title" content="CLIRNet Sign up" />
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
          <meta name="twitter:title" content="CLIRNet Sign up" />
          <meta name="twitter:card" content="summary_large_image" />
        </Helmet>

        <section class="full_width l_main_body">
          <div class="l_mainBox">
            <div className="l_leftBox l_session_left">
              <img src={Registlogo} className="loginGrap translate_both" />
            </div>
            <div class="l_frmPart">
              <div class="overlay"></div>
              <img src={frombg} class="l_frmPart_Bg" />
              <div class="full_width l_rightIn">
                <Scrollbars
                  renderTrackVertical={(props) => (
                    <div {...props} className="track-vertical" />
                  )}
                  style={{ width: "100%", height: "100vh" }}
                >
                  <div className="row align-items-center">
                    <div className="col">
                      <div class="full_width l_frmTtl">
                        <h2 class="colorWhite font700 font_20px text-left">
                          Insert Additional Data{" "}
                          <a
                            className="font_16px float-right"
                            onClick={() => {
                              this.skipRegistration();
                            }}
                            href="javascript:void(0)"
                          >
                            Skip >
                          </a>
                        </h2>
                      </div>
                      <div class="full_width l_frmBody">
                        <div class="full_width l_form_row l_regFrmRowEffct l_regFormRowWtoHvr">
                          <label>
                            Email ID<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            onChange={this.handleChange("email")}
                            class="l_reg_input_efect"
                          />
                        </div>

                        <div class="full_width l_form_row l_regFrmRowEffct l_regFormRowWtoHvr">
                          <label>Registration</label>
                          <select
                            onChange={this.handleChange("mci_registration")}
                            className="l_reg_input_efect"
                          >
                            <option value=""></option>
                            <option value="MCI Registration Council">
                              MCI Registration Council
                            </option>
                            <option value="Andhra Pradesh Medical Council">
                              Andhra Pradesh Medical Council
                            </option>
                            <option value="Arunachal Pradesh Medical Council">
                              Arunachal Pradesh Medical Council
                            </option>
                            <option value="Assam Council of Medical Registration">
                              Assam Council of Medical Registration
                            </option>
                            <option value="Bihar Medical Council">
                              Bihar Medical Council
                            </option>
                            <option value="Chhattisgarh Medical Council">
                              Chhattisgarh Medical Council
                            </option>
                            <option value="Delhi Medical Council">
                              Delhi Medical Council
                            </option>
                            <option value="Goa Medical Council">
                              Goa Medical Council
                            </option>
                            <option value="Gujarat Medical Council">
                              Gujarat Medical Council
                            </option>
                            <option value="Haryana Medical Council">
                              Haryana Medical Council
                            </option>
                            <option value="Himachal Pradesh Medical Council">
                              Himachal Pradesh Medical Council
                            </option>
                            <option value="Jammu &amp; Kashmir Medical Council">
                              Jammu &amp; Kashmir Medical Council
                            </option>
                            <option value="Jharkhand Medical Council">
                              Jharkhand Medical Council
                            </option>
                            <option value="Karnataka Medical Council">
                              Karnataka Medical Council
                            </option>
                            <option value="Travancore Cochin Medical Council">
                              Travancore Cochin Medical Council
                            </option>
                            <option value="Madhya Pradesh Medical Council">
                              Madhya Pradesh Medical Council
                            </option>
                            <option value="Maharashtra Medical Council">
                              Maharashtra Medical Council
                            </option>
                            <option value="Manipur Medical Council">
                              Manipur Medical Council
                            </option>
                            <option value="Mizoram Medical Council">
                              Mizoram Medical Council
                            </option>
                            <option value="Nagaland Medical Council">
                              Nagaland Medical Council
                            </option>
                            <option value="Orissa Council of Medical Registration">
                              Orissa Council of Medical Registration
                            </option>
                            <option value="Punjab Medical Council">
                              Punjab Medical Council
                            </option>
                            <option value="Rajasthan Medical Council">
                              Rajasthan Medical Council
                            </option>
                            <option value="Sikkim Medical Council">
                              Sikkim Medical Council
                            </option>
                            <option value="Tamil Nadu Medical Council">
                              Tamil Nadu Medical Council
                            </option>
                            <option value="Telangana State Medical Council">
                              Telangana State Medical Council
                            </option>
                            <option value="Tripura State Medical Council">
                              Tripura State Medical Council
                            </option>
                            <option value="Uttar Pradesh Medical Council">
                              Uttar Pradesh Medical Council
                            </option>
                            <option value="Uttarakhand Medical Council">
                              Uttarakhand Medical Council
                            </option>
                            <option value="West Bengal Medical Council">
                              West Bengal Medical Council
                            </option>
                          </select>
                        </div>
                        <div class="full_width l_form_row l_regFrmRowEffct l_regFormRowWtoHvr">
                          <label>Registration No.</label>
                          <input
                            type="text"
                            onChange={this.handleChange("registration_no")}
                            class="l_reg_input_efect"
                          />
                        </div>
                        <div class="full_width l_form_row l_regFrmRowEffct l_regFormRowWtoHvr">
                          <Form.Group controlId="exampleForm.ControlSelect2">
                            <Form.Control
                              className="multiSelect"
                              as="select"
                              multiple
                              onChange={this.handleChange("speciality")}
                            >
                              <option value="">Select Specialities</option>
                              {specialities.map((r) => (
                                <option value={r.master_specialities_id}>
                                  {r.specialities_name}
                                </option>
                              ))}
                            </Form.Control>
                          </Form.Group>
                        </div>

                        <div class="full_width l_form_row">
                          <span className="err_hold" style={{ color: "red" }}>
                            {this.state.err_msg}
                          </span>
                          <button
                            onClick={() => {
                              this.setState({ is_loader: true });
                              this.onSubmit();
                            }}
                            class="radius-6 font_16px font600 l_frmSubmit"
                          >
                            Submit Now
                          </button>
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
    );
  }
}

export default Registrationparttwo;
