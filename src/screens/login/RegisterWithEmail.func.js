import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import frombg from "./images/l_frmBg.png";
import Registlogo from "./images/Registration.jpg";
import Loader from "react-loader-spinner";
import $ from "jquery";
import Form from "react-bootstrap/Form";
import medwikiicon from "./images/medwiki.jpg";
import calbg from "./images/l_cal-black.png";
import { reactLocalStorage } from "reactjs-localstorage";
import AppConfig from "../config/config.js";
import { Scrollbars } from "react-custom-scrollbars";
import { Helmet } from "react-helmet";
import plusIcon from "../../images/add_plus.png";
import editIcon from "../../images/edit_btn_blue.png";
import { getReferalCode } from "../Common/Common.js";
import {
  fetchUserDetails,
  getAllSpecialities,
  compendiumShare,
  sessionShare,
  signUpEmail,
} from "../../redux/actions/registerwithemail.action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const gtag = window.gtag;
const url = AppConfig.apiLoc;
var phone_no = "";
var specialities = [];
var spec_array = [];
var prev_compendium = [];
var per_cpmp = 0;

var prev_session = [];
const RegisterWithEmail = (props) => {
  const [phone_no, setPhone_no] = useState("");
  const [err_msg, setErr_msg] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [middle_name, setMiddle_name] = useState("");
  const [gender, setGender] = useState("");
  const [pincode, setPincode] = useState("");
  const [referal, setReferal] = useState("");
  const [usertype, setUserType] = useState(1);
  const [full_name, setFull_name] = useState("");
  const [honarific, setHonarific] = useState("Dr.");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_Password] = useState("");
  const [terms, setTerms] = useState(1);
  const [is_loader, setIs_loader] = useState(false);
  const [speciality, setSpeciality] = useState([]);
  const [flag_ch, setFlag_ch] = useState(true);
  const [email, setEmail] = useState("");
  const [compendium_view, setCompendium_view] = useState([]);
  const [prev_session, setPrev_session] = useState([]);
  const [display, setDisplay] = useState(0);
  const [share_type, setShare_type] = useState("");
  const [is_refresh, setIs_refresh] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(
    //   fetchUserDetails(
    //     reactLocalStorage.get("@ClirnetStore:refreshToken", true),
    //     (data) => {
    //       if (data !== "error") {
    //         if (data.data.status_code === "200") {
    //           props.history.push({
    //             pathname: `/Dashboard`,
    //           });
    //         } else {
    //         }
    //       } else {
    //       }
    //     }
    //   )
    // );
    window.document.title = "CLIRNET - Registration (Email)";
    isHaveReferalCode();
    window.addEventListener("beforeunload", (ev) => {
      props.history.push({
        pathname: `/`,
      });

      ev.preventDefault();
      return (ev.returnValue = "Are you sure you want to close?");
    });
    $(document).keypress(function (event) {
      var keycode = event.keyCode ? event.keyCode : event.which;
      if (keycode == "13") {
        setIs_loader(true);
        registration();
      }
    });
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
    dispatch(
      getAllSpecialities((data) => {
        if (data !== "error") {
          console.log(data);
          if (data.data.status_code === 200) {
            data.data.data.speciality_data.map((r) => {
              specialities.push(r);
            });
            setIs_refresh(!is_refresh);
          }
        }
      })
    );

    $(".tRright_popClose").on("click", function () {
      $("body").removeClass("right_PopShowBody");
    });
    $(".l_Specialities_a").on("click", function () {
      $("body").addClass("right_PopShowBody");
    });
    if (
      reactLocalStorage.get("@ClirnetStore:redtype", true) != "" &&
      reactLocalStorage.get("@ClirnetStore:redid", true) != "" &&
      reactLocalStorage.get("@ClirnetStore:redtype", true) != true &&
      reactLocalStorage.get("@ClirnetStore:redid", true) != true
    ) {
      if (
        reactLocalStorage.get("@ClirnetStore:redtype", true) == "Feeddetail"
      ) {
        prev_compendium = [];
        prev_session = [];
        dispatch(
          compendiumShare((data) => {
            if (data !== "error") {
              prev_compendium[0] = data.data.data;
              setCompendium_view(prev_compendium);
              setShare_type("comp");
              var len_comp = prev_compendium[0].answer.length;
              per_cpmp = Math.round(len_comp / 5);
              console.log(per_cpmp);
              setDisplay(1);
            }
          })
        );
      }
      if (
        reactLocalStorage.get("@ClirnetStore:redtype", true) == "Reservesession"
      ) {
        prev_compendium = [];
        prev_session = [];
        dispatch(
          sessionShare((data) => {
            if (data !== "error") {
              prev_session[0] = data.data.data;
              setPrev_session(prev_session);
              setShare_type("session");
            }
          })
        );
      }
    }
  }, []);
  // function randomString(length, chars) {
  //   var result = "";
  //   for (var i = length; i > 0; --i)
  //     result += chars[Math.floor(Math.random() * chars.length)];
  //   return result;
  // }

  function isHaveReferalCode() {
    $("#referal_code_input").val("");
    if (getReferalCode() != 0 || getReferalCode() != "0") {
      setReferal(getReferalCode());
      $("#referal_code_input").prop("disabled", true);
      $(".regRowCount")
        .removeClass("l_regFormRowWtoHvr")
        .addClass("l_regFormRowHvr");
    } else {
      $("#referal_code_input").prop("disabled", false);
      $(".regRowCount")
        .removeClass("l_regFormRowHvr")
        .addClass("l_regFormRowWtoHvr");
    }
  }
  function getUtmSource() {
    let utmSource = reactLocalStorage.get("@ClirnetStore:utm_source", true);
    if (
      utmSource == undefined ||
      utmSource == "undefined" ||
      utmSource == true ||
      utmSource == "true" ||
      utmSource == ""
    ) {
      if (
        reactLocalStorage.get("@ClirnetStore:redtype", true) != "session" &&
        reactLocalStorage.get("@ClirnetStore:redtype", true) != "medwiki" &&
        reactLocalStorage.get("@ClirnetStore:redtype", true) != "survey" &&
        reactLocalStorage.get("@ClirnetStore:redtype", true) != true &&
        reactLocalStorage.get("@ClirnetStore:redtype", true) != ""
      ) {
        return reactLocalStorage.get("@ClirnetStore:redtype", true);
      } else {
        console.log("utm source not found");
        return 0;
      }
    } else {
      console.log("utm source:" + utmSource);
      return utmSource;
    }
  }
  function registration() {
    gtag("config", AppConfig.gtag_measure_id, {
      page_title: "EMAIL_REGISTRATION",
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
    setErr_msg("");
    setIs_loader(true);
    let has_error = 0;
    if (terms == 0) {
      setIs_loader(false);
      has_error = 1;
      setErr_msg("Please Accept Terms & Conditions");
    }
    if (password.trim() == "" || confirm_password.trim() == "") {
      has_error = 1;
      setErr_msg("Please Enter Password & Confirm Password");
      setIs_loader(false);
    } else {
      if (password.trim() != confirm_password.trim()) {
        has_error = 1;
        setErr_msg("Password and confirm password must be same");
        setIs_loader(false);
      }
    }
    if (email != "") {
      var reEmail =
        /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
      if (!email.match(reEmail)) {
        has_error = 1;
        setErr_msg("Please Enter valid email");
        setIs_loader(false);
      }
    } else {
      has_error = 1;
      setErr_msg("Please Enter email ID");
      setIs_loader(false);
    }
    if (full_name == "") {
      setIs_loader(false);
      has_error = 1;
      setErr_msg("Please Enter Your Name");
    } else {
      var namep = [];
      namep = full_name.trim().split(" ");

      if (namep.length == 1) {
        setIs_loader(false);
        has_error = 1;
        setErr_msg("Please Enter Your Last Name");
      }
    }
    if (has_error == 0) {
      if (spec_array.length != 0) {
        var speciality_val = spec_array.join();
      } else {
        var speciality_val = "";
      }

      let submitData = {
        phone_no: phone_no,
        pin: pincode,
        name: full_name,
        gender: gender,
        // age: age,
        referal_code: referal,
        user_type: usertype,
        speciality: speciality_val,
        honarific: honarific,
        email: email,
        password: password,
        confirm_password: confirm_password,
      };
      var rString = "";
      let utm = getUtmSource();
      let formdata = new FormData();
      formdata.append("phone_no", submitData.phone_no);
      formdata.append("device_id", rString);
      formdata.append("pin", submitData.pin);
      formdata.append("fcm_id", submitData.fcm_id);
      formdata.append("name", submitData.name);
      formdata.append("gender", submitData.gender);
      formdata.append("speciality", submitData.speciality);
      formdata.append("honarific", submitData.honarific);
      formdata.append("email", submitData.email);
      formdata.append("age", submitData.age);
      formdata.append("password", submitData.password);
      formdata.append("confirm_password", submitData.confirm_password);
      formdata.append("referal_code", submitData.referal_code);
      formdata.append("user_type", submitData.user_type);
      formdata.append("device_os", "Windows");
      formdata.append("utm_source", utm);
      dispatch(
        signUpEmail(formdata, (responseData) => {
          console.log(formdata);
          console.log(responseData);
          if (responseData !== "error") {
            if (responseData.data.status_code == "203") {
              setErr_msg(responseData.data.message);
            }
            if (responseData.data.status_code === 200) {
              console.log(
                "====>>refresh token",
                responseData.data.data.refresh_token
              );
              reactLocalStorage.set("@ClirnetStore:referal_code", 0);
              reactLocalStorage.set(
                "@ClirnetStore:refreshToken",
                responseData.data.data.refresh_token
              );
              reactLocalStorage.set(
                "@ClirnetStore:phoneNumber",
                submitData.phone_no
              );
              dispatch(
                fetchUserDetails(
                  responseData.data.data.refresh_token,
                  (responseJson) => {
                    console.log(
                      "====>>refresh token",
                      responseData.data.data.refresh_token
                    );
                    console.log("===>>auth response", responseJson);
                    if (responseJson !== "error") {
                      if (responseJson.data.status_code === 200) {
                        reactLocalStorage.set(
                          "@ClirnetStore:user_master_id",
                          responseJson.data.data.user_master_id
                        );
                        reactLocalStorage.set(
                          "@ClirnetStore:user_mem_id",
                          responseJson.data.data.user_mem_id
                        );
                        reactLocalStorage.set(
                          "@ClirnetStore:client_logo",
                          responseJson.data.data.client_logo
                        );
                        reactLocalStorage.set(
                          "@ClirnetStore:user_name",
                          responseJson.data.data.user_name
                        );
                        reactLocalStorage.set(
                          "@ClirnetStore:email",
                          responseJson.data.data.email
                        );
                        reactLocalStorage.set(
                          "@ClirnetStore:mobilePrimary",
                          responseJson.data.data.mobilePrimary
                        );
                        reactLocalStorage.set(
                          "@ClirnetStore:password",
                          responseJson.data.data.password
                        );
                        reactLocalStorage.set(
                          "@ClirnetStore:first_name",
                          responseJson.data.data.first_name
                        );
                        reactLocalStorage.set(
                          "@ClirnetStore:last_name",
                          responseJson.data.data.last_name
                        );
                        reactLocalStorage.set(
                          "@ClirnetStore:profile_image",
                          responseJson.data.data.profile_image
                        );
                        reactLocalStorage.set(
                          "@ClirnetStore:profile_type",
                          responseJson.data.data.profile_type
                        );
                        if (
                          reactLocalStorage.get(
                            "@ClirnetStore:redtype",
                            true
                          ) != "" &&
                          reactLocalStorage.get("@ClirnetStore:redid", true) !=
                            "" &&
                          reactLocalStorage.get(
                            "@ClirnetStore:redtype",
                            true
                          ) != true &&
                          reactLocalStorage.get("@ClirnetStore:redid", true) !=
                            true
                        ) {
                          if (
                            reactLocalStorage.get(
                              "@ClirnetStore:redtype",
                              true
                            ) != "Feeddetail" &&
                            reactLocalStorage.get(
                              "@ClirnetStore:redtype",
                              true
                            ) != "PollDetails" &&
                            reactLocalStorage.get(
                              "@ClirnetStore:redtype",
                              true
                            ) != "SpqDetails" &&
                            reactLocalStorage.get(
                              "@ClirnetStore:redtype",
                              true
                            ) != "Reservesession" &&
                            reactLocalStorage.get(
                              "@ClirnetStore:redtype",
                              true
                            ) != "GrandRoundsMobile" &&
                            reactLocalStorage.get(
                              "@ClirnetStore:redtype",
                              true
                            ) != "GrandRoundsDesktop" &&
                            reactLocalStorage.get(
                              "@ClirnetStore:redtype",
                              true
                            ) != "ArchivedVideo"
                          ) {
                            props.history.push({
                              pathname: "/Dashboard",
                            });
                          } else {
                            props.history.push({
                              pathname:
                                "/" +
                                reactLocalStorage.get(
                                  "@ClirnetStore:redtype",
                                  true
                                ) +
                                "/" +
                                reactLocalStorage.get(
                                  "@ClirnetStore:redid",
                                  true
                                ) +
                                "",
                            });
                          }
                        } else {
                          if (
                            reactLocalStorage.get(
                              "@ClirnetStore:deals_url",
                              true
                            ) != "" &&
                            reactLocalStorage.get(
                              "@ClirnetStore:deals_url",
                              true
                            ) != true &&
                            reactLocalStorage.get("@ClirnetStore:email", 0) !=
                              0 &&
                            reactLocalStorage.get("@ClirnetStore:email", 0) !=
                              "" &&
                            reactLocalStorage.get("@ClirnetStore:email", 0) !=
                              undefined &&
                            reactLocalStorage.get("@ClirnetStore:email", 0) !=
                              null &&
                            reactLocalStorage.get("@ClirnetStore:email", 0) !=
                              "undefined"
                          ) {
                            let emailId = reactLocalStorage.get(
                              "@ClirnetStore:email",
                              0
                            );
                            let redirect =
                              "https://doctor.clirnet.com/store/wp.php";
                            let values = new Array(
                              emailId,
                              reactLocalStorage.get(
                                "@ClirnetStore:deals_url",
                                true
                              )
                            );
                            let keys = new Array("email", "route");
                            // console.log("email Id"+emailId)
                            openWindowWithPost(redirect, "", keys, values);
                          } else {
                            if (
                              reactLocalStorage.get(
                                "@ClirnetStore:redirect_direct_to_session",
                                0
                              ) == 1
                            ) {
                              reactLocalStorage.set(
                                "@ClirnetStore:redirect_direct_to_session",
                                0
                              );

                              props.history.push({
                                pathname: `/Sessions`,
                              });
                            } else {
                              if (
                                reactLocalStorage.get(
                                  "@ClirnetStore:redtype",
                                  true
                                ) == "CphMobile"
                              ) {
                                props.history.push({
                                  pathname: `/CphMobile`,
                                });
                              } else {
                                props.history.push({
                                  pathname: `/Dashboard`,
                                });
                              }
                            }
                          }
                        }
                        setIs_loader(false);
                      }
                    } else {
                    }
                  }
                )
              );
            } else {
              reactLocalStorage.set("@ClirnetStore:refreshToken", "");
              props.history.push({ pathname: "/" });
            }
          } else {
            setIs_loader(false);
            setErr_msg("Something went wrong");
          }
        })
      );
    }
  }
  //Checking Whether User Accepted Terms And Conditions
  function check_check() {
    if ($("#terms").prop("checked") == true) {
      //   this.setState({ "terms": 1 });
      // }
      // else {
      //   this.setState({ "terms": 0 });
      // }
    }
  }
  const openWindowWithPost = (url, name, keys, values) => {
    var postFormStr = "<form method='POST' action='" + url + "'>\n";

    if (keys && values && keys.length == values.length) {
      for (var i = 0; i < keys.length; i++) {
        postFormStr +=
          "<input type='hidden' name='" +
          keys[i] +
          "' value='" +
          values[i] +
          "'></input>";
      }
    }

    postFormStr += "</form>";

    var formElement = $(postFormStr);

    $("body").append(formElement);
    $(formElement).submit();
  };
  const handleChange = (e) => (val) => {
    switch (e) {
      case "email":
        setEmail(val.target.value);
        break;
      case "first_name":
        setFirst_name(val.target.value);
        break;
      case "last_name":
        setLast_name(val.target.value);
        break;
      case "middle_name":
        setMiddle_name(val.target.value);
        break;
      case "gender":
        setGender(val.target.value);
        break;
      //   case "age":
      //     setAge
      //     break;
      case "pincode":
        setPincode(val.target.value);
        break;
      case "referal":
        setReferal(val.target.value);
      case "usertype":
        setUserType(val.target.value);
        break;

      case "password":
        setPassword(val.target.value);
        break;

      case "confirm_password":
        setConfirm_Password(val.target.value);
        break;

      case "full_name":
        setFull_name(val.target.value);
        break;

      case "honarific":
        setHonarific(val.target.value);
        break;

      default: {
      }
    }
  };
  function selectspec(id) {
    if (spec_array.indexOf(id) != -1) {
      var index = spec_array.indexOf(id);
      spec_array.splice(index, 1);

      setFlag_ch(!flag_ch);
    } else {
      spec_array.push(id);

      setFlag_ch(!flag_ch);
    }

    console.log(spec_array);
  }
  return (
    <>
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

        <section className="full_width l_main_body">
          <div className="l_mainBox">
            {reactLocalStorage.get("@ClirnetStore:redtype", true) != "" &&
            reactLocalStorage.get("@ClirnetStore:redid", true) != "" &&
            reactLocalStorage.get("@ClirnetStore:redtype", true) != true &&
            reactLocalStorage.get("@ClirnetStore:redid", true) != true &&
            (reactLocalStorage.get("@ClirnetStore:redtype", true) == "survey" ||
              reactLocalStorage.get("@ClirnetStore:redtype", true) ==
                "medwiki" ||
              reactLocalStorage.get("@ClirnetStore:redtype", true) ==
                "session") ? (
              <div className="l_leftBox">
                {compendium_view.map((r, index) => (
                  <div className="full_width l_medWiki_left">
                    <div className="full_width l_medwiki_pic">
                      {r.image != "" && r.image != undefined ? (
                        <img src={r.image} className="object_fit_cover" />
                      ) : (
                        <img src={medwikiicon} className="object_fit_cover" />
                      )}
                      <div className="overlay"></div>
                    </div>
                    <div className="full_width text-left l_medwiki_Body">
                      <Scrollbars
                        renderTrackVertical={(props) => (
                          <div {...props} className="track-vertical" />
                        )}
                        style={{ width: "100%", height: "100%" }}
                      >
                        <h4 className="font_16px font700 colorBlack l_medWiki_spec">
                          <span class="font_20px colorBlue">[</span>
                          {r.specialities}
                          <span className="font_20px colorBlue">]</span>
                        </h4>
                        <div className="clearfix"></div>
                        <h2 className="font600 colorBlack font_20px l_medwikiTtl">
                          {r.question}
                        </h2>
                        <div className="clearfix"></div>
                        <div className="font500 full_width l_medwiki_content">
                          <p>
                            {r.answer.substring(0, per_cpmp)}...
                            <span style={{ color: "#38b49b" }}>
                              <a
                                href="javascript:void(0)"
                                onClick={() => {
                                  nameInput.focus();
                                }}
                              >
                                Login To Read More
                              </a>
                            </span>
                          </p>
                        </div>
                      </Scrollbars>
                    </div>
                  </div>
                ))}

                {prev_session.map((rses, index) => (
                  <div className="full_width l_session_left">
                    <div className="full_width l_session_top">
                      <span className="font600 colorBlack radius-40 l_session_type">
                        {rses[0].ms_cat_name}
                      </span>
                      <h3 className="colorBlack font_14px font600 l_session_time">
                        <img src={calbg} />{" "}
                        <span>
                          {rses[0].display_date_format} - {rses[0].display_date}
                        </span>
                      </h3>
                    </div>
                    <div className="full_width text-center l_session_body">
                      <Scrollbars
                        renderTrackVertical={(props) => (
                          <div {...props} className="track-vertical" />
                        )}
                        style={{ width: "100%", height: "100%" }}
                      >
                        <h1 className="font_18px colorBlack font600 l_session_topic">
                          {rses[0].session_topic}
                        </h1>
                        {rses[0].session_doctor_entities.map((docres) => (
                          <div>
                            <div className="clearfix"></div>
                            <div className="radius-100 l_doctor_pic">
                              <img
                                src={docres.session_doctor_image}
                                className="object_fit_cover"
                              />
                            </div>
                            <div className="clearfix"></div>
                            <h4 className="font_16px font600 colorBlack l_doc_name">
                              {docres.session_doctor_name}
                              <span className="colorGrey font_14px font500">
                                {docres.DepartmentName}
                              </span>
                            </h4>
                            <div className="clearfix"></div>
                            <div className="full_width font500 font_14px">
                              <p>{docres.profile}</p>
                            </div>
                          </div>
                        ))}
                        <div className="full_width l_poweredBy">
                          <h3 className="font_16px colorBlack font600 l_poweredByTtl">
                            <span className="l_poweredByGraph l_poweredByGraphLeft"></span>{" "}
                            Powered by
                            <span className="l_poweredByGraph l_poweredByGraphRight"></span>{" "}
                          </h3>
                          <img
                            src={rses[0].client_logo}
                            className="l_poweredByLogo"
                          />
                        </div>
                      </Scrollbars>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="l_leftBox">
                <img src={Registlogo} className="loginGrap translate_both" />
              </div>
            )}

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
                      <div className="full_width l_frmTtl">
                        <h2 className="colorWhite font700 font_20px text-left">
                          Create your CLIRNet Account
                        </h2>
                      </div>
                      <div className="full_width font_10px colorWhite l_frmInfo">
                        <span className="font_16px radius-100 bgColorBlue colorWhite l_frmInfoIcon">
                          i
                        </span>
                        <p>
                          This content is for use by Healthcare Professionals
                          (HCP) only. HCP are advised to use independent
                          clinical judgement and/or discretion before using the
                          information.
                        </p>
                      </div>
                      <div className="full_width l_frmBody">
                        <div className="full_width mobleNoCont">
                          <select
                            onChange={handleChange("honarific")}
                            className="mobleNoSelect"
                          >
                            <option value="Dr.">Dr.</option>
                            <option value="Prof.">Prof.</option>
                            <option value="Mr.">Mr.</option>
                            <option value="Mrs.">Mrs.</option>
                            <option value="Ms.">Ms.</option>
                          </select>

                          <div className="full_width l_form_row l_regFrmRowEffct l_regFormRowWtoHvr">
                            <label>
                              Full Name<span style={{ color: "red" }}>*</span>
                            </label>

                            <input
                              style={{ color: "white" }}
                              type="text"
                              value={full_name}
                              onChange={handleChange("full_name")}
                              className="l_reg_input_efect fullnamesss"
                              required
                            />
                          </div>
                        </div>

                        <div class="full_width l_form_row l_regFrmRowEffct l_regFormRowWtoHvr">
                          <label>
                            Email ID<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            style={{ color: "white" }}
                            value={email}
                            type="text"
                            autocomplete="off"
                            onChange={handleChange("email")}
                            class="l_reg_input_efect emailsss"
                          />
                        </div>
                        <div className="full_width l_form_row l_regFrmRowEffct l_regFormRowWtoHvr">
                          <label>
                            Password<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            style={{ color: "white" }}
                            type="password"
                            autocomplete="off"
                            value={password}
                            onChange={handleChange("password")}
                            className="l_reg_input_efect password"
                          />
                        </div>
                        <div className="full_width l_form_row l_regFrmRowEffct l_regFormRowWtoHvr">
                          <label>
                            Confirm Password
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            style={{ color: "white" }}
                            type="password"
                            value={confirm_password}
                            onChange={handleChange("confirm_password")}
                            className="l_reg_input_efect confirm_password"
                          />
                        </div>

                        {/* <div className="l_form_Gender l_form_row">
                          <label className="colorWhite font500 font_14px">Gender : </label>

                          <div className="l_gender_cont">
                            <div className="checkbox_custom_row">
                              {(this.state.gender == "M") ?
                                <input name="gender" value="M" checked onChange={this.handleChange('gender')} type="radio" className="checkbox_custom" /> :
                                <input name="gender" value="M" onChange={this.handleChange('gender')} type="radio" className="checkbox_custom" />}
                              <label className="checkbox_custom_label">M</label>
                            </div>
                            <div className="checkbox_custom_row">
                              {(this.state.gender == "F") ?
                                <input name="gender" value="F" checked onChange={this.handleChange('gender')} type="radio" className="checkbox_custom" /> :
                                <input name="gender" value="F" onChange={this.handleChange('gender')} type="radio" className="checkbox_custom" />}
                              <label className="checkbox_custom_label">F</label>
                            </div>
                            <div className="checkbox_custom_row">
                              {(this.state.gender == "T") ?
                                <input name="gender" value="T" checked onChange={this.handleChange('gender')} type="radio" className="checkbox_custom" /> :
                                <input name="gender" value="T" onChange={this.handleChange('gender')} type="radio" className="checkbox_custom" />}
                              <label className="checkbox_custom_label">T</label>
                            </div>
                          </div>

                        </div> */}
                        {/* <div className="l_form_Age l_form_row l_regFrmRowEffct l_regFormRowWtoHvr">
                          <label>Age<span style={{ "color": "red" }}>*</span></label>
                          <input type="text" value={this.state.age} onChange={this.handleChange('age')} className="l_reg_input_efect agesss" pattern="[123456789][0-9]{9}" />
                        </div> */}
                        <div className="full_width l_form_row l_regFrmRowEffct l_regFormRowWtoHvr">
                          <label>Pin Code</label>
                          <input
                            style={{ color: "white" }}
                            type="text"
                            value={pincode}
                            onChange={handleChange("pincode")}
                            className="l_reg_input_efect pincodesss"
                          />
                        </div>

                        {/* <div className="full_width l_form_row l_regFrmRowEffct l_regFormRowWtoHvr">
                            <label>User Type</label>
                        <select onChange={this.handleChange('usertype')} className="l_reg_input_efect">
<option selected value="1">Doctor</option>
<option value="4">Medical Student</option>
<option value="5">Other Healthcare Professional</option>
<option value="6">Not a Healthcare Professional</option>

       </select>
       </div> */}

                        <div class="full_width l_form_row l_Specialities">
                          {/* <Form.Group controlId="exampleForm.ControlSelect2">
                            <Form.Control className="multiSelect" as="select" multiple onChange={this.handleChange('speciality')}>
                              <option value="">Select Specialities</option>
                              {specialities.map(r =>

                                <option value={r.master_specialities_id} >{r.specialities_name}</option>
                              )}
                            </Form.Control>
                          </Form.Group> */}
                          <a
                            className="font_14px radius-6 font600 l_Specialities_a"
                            href="javascript:void(0)"
                          >
                            Select Specialities
                            {/* -----------if any Specialities Selected Show "editIcon". If no Selected then Show "plusIcon"-------------- */}
                            {/* <span className="radius-100"><img className="translate_both" src={plusIcon} /></span> */}
                            <span className="radius-100">
                              <img className="translate_both" src={editIcon} />
                            </span>
                          </a>
                          <div className="clearfix"></div>
                          {spec_array.length != 0 ? (
                            <div className="full_width text-center font500 font_14px colorWhite l_SpecialitiesSelected">
                              {spec_array.length} Speciality Selected
                            </div>
                          ) : null}
                        </div>
                        <div className="full_width l_form_row l_regFrmRowEffct l_regFormRowWtoHvr regRowCount">
                          <label>Referral Code</label>
                          <input
                            style={{ color: "white" }}
                            type="text"
                            value={referal}
                            onChange={handleChange("referal")}
                            className="l_reg_input_efect"
                            id="referal_code_input"
                          />
                        </div>

                        <div className="full_width l_form_row">
                          <div className="l_termsCondition_row">
                            <input
                              id="terms"
                              checked
                              onClick={() => {
                                check_check();
                              }}
                              name="accept_TC"
                              onChange={handleChange("terms")}
                              type="checkbox"
                              className="checkbox_custom"
                            />
                            <label className="font500 font_14px checkbox_custom_label">
                              I Accept{" "}
                            </label>
                            <a
                              target="_blank"
                              href="https://doctor.clirnet.com/knowledge/registration/terms_page"
                            >
                              Terms and Conditions
                            </a>
                          </div>
                        </div>

                        <div className="full_width l_form_row">
                          <span className="err_hold" style={{ color: "red" }}>
                            {err_msg}
                          </span>
                          <button
                            onClick={() => {
                              setIs_loader(true);
                              registration();
                            }}
                            className="radius-6 font_16px font600 l_frmSubmit"
                          >
                            Register Now
                          </button>
                        </div>
                        <Loader
                          type="ThreeDots"
                          color="#3393df"
                          height={80}
                          width={80}
                          visible={is_loader}
                        />
                      </div>
                    </div>
                  </div>
                </Scrollbars>
              </div>
            </div>
          </div>

          <div className="right_fix_pop_JS">
            <div className="tRright_popClose right_fixedBg"></div>
            <div className="right_pop transition6s text-left ssnFilterPop">
              <div className="bgColorBlue text-left right_popTtl">
                <h2 className="colorWhite font600 font_20px right_popTtlTxt">
                  Select Specialities
                </h2>
                <a
                  href="javascript:void(0)"
                  className="radius-100 right_popClose tRright_popClose"
                >
                  <span className="translate_both colorWhite font600 font_14px ">
                    Ok
                  </span>
                </a>
              </div>
              <div className="right_popIn">
                {specialities.map((r) => (
                  <div className="cmnCheckBox_row">
                    {spec_array.indexOf(r.master_specialities_id) != -1 ? (
                      <input
                        checked
                        onClick={() => {
                          selectspec(r.master_specialities_id);
                        }}
                        type="checkbox"
                        className="form-check-input"
                      />
                    ) : (
                      <input
                        onClick={() => {
                          selectspec(r.master_specialities_id);
                        }}
                        type="checkbox"
                        className="form-check-input"
                      />
                    )}
                    <label className="font500 font_14px form-check-label">
                      {r.specialities_name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default RegisterWithEmail;
