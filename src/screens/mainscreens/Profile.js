import React from "react";
import Loader from "react-loader-spinner";
import Popup from "reactjs-popup";
import $ from "jquery";
import { isMobile } from "react-device-detect";
import { reactLocalStorage } from "reactjs-localstorage";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import AppConfig from "../config/config.js";
import { Helmet } from "react-helmet";
import Header from "../mainscreens/Header";
import Footer from "../mainscreens/Footer";
import editbtn from "../../images/edit_btn_blue.png";
import calenderIcon from "../../images/cal-black.png";
import profileIcon1 from "../../images/my_profile_icon-1.png";
import profileIcon2 from "../../images/my_profile_icon-2.png";
import profileIcon3 from "../../images/my_profile_icon-3.png";
import profileIcon5 from "../../images/my_profile_icon-5.png";
import addPlus from "../../images/add_plus.png";
import delete_icon from "../../images/delete_icon.png";
import edit_icon from "../../images/edit_btn_blue.png";
import Banner from "../mainscreens/Banner";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import ProfileLoader from "../LoadingPlaceholders/ProfileLoader.jsx";

import "firebase/storage";
import firebase from "firebase/app";
require("firebase/auth");

const url = AppConfig.apiLoc;
const gtag = window.gtag;

const firebase_config = {
  apiKey: "AIzaSyB4yxW3LklwGsHHMqWQXuR2GCSusqJ8Ubk",
  authDomain: "http://clirnetapp.appspot.com/",
  databaseURL: "https://clirnetapp.firebaseio.com/",
  projectId: "clirnetapp",
  storageBucket: "clirnetapp.appspot.com",
  messagingSenderId: "66526267590",
};
firebase.initializeApp(firebase_config);
const storage = firebase.storage();

const pageNames = "Profile";

var speciality = [];
var achievement_array = [];
var education_array = [];
var membership_array = [];
var registration_array = [];
var specialities = [];
var arrui = [];
var sel_cat = [];
var sel_cat_id = [];

let isEducationFetched = false;
let isMembershipFetched = false;
let isAchievementFetched = false;
let isRegistrationsFetched = false;

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      showModalpr_edit: false,
      speciality: [],
      description: "",
      banner_display: false,

      profile_image: "",
      showModalprimage_edit: false,
      firebase_token: "",
      is_loader_profile_image: false,
      profileimage_error: "",
      achievement_array: [],
      education_array: [],
      membership_array: [],
      registration_array: [],
      open_education: false,
      open_membership: false,
      open_achievement: false,
      open_registration: false,
      add_edit_education_id: "",
      add_edit_membership_id: "",
      add_edit_achievement_id: "",
      add_edit_registration_id: "",
      education_degree: "",
      education_college: "",
      education_start_year: "",
      education_end_year: "",
      education_description: "",
      membership_institute_name: "",
      membership_start_year: "",
      membership_end_year: "",
      membership_is_current_member: true,
      achievement_institute: "",
      achievement_description: "",
      achievement_year: "",
      registration_institute_name: "",
      registration_registration_no: "",
      registration_year: "",
      education_error: "",
      membership_error: "",
      achievement_error: "",
      registration_error: "",
      speciality: [],
      user_specs: [],
      specstr: "",
      is_edit_submitted:true
    };

    isEducationFetched = false;
    isMembershipFetched = false;
    isAchievementFetched = false;
    isRegistrationsFetched = false;

    this.handleChangeprofile = this.handleChangeprofile.bind(this);

    this.fileuploadfirebase = this.fileuploadfirebase.bind(this);

    this.handleChange = this.handleChange.bind(this);

    this.display_banner = this.display_banner.bind(this);
  }

  display_banner(datam) {
    this.setState({ banner_display: true });

    //alert(datam)
  }

  //set all the values
  handleChange = (e) => (val) => {
    switch (e) {
      case "education_degree":
        this.setState({ education_degree: val.target.value });
        break;
      case "education_college":
        this.setState({ education_college: val.target.value });
        break;
      case "education_start_year":
        if (val.target.value.length == 4) {
          if (val.target.value > 1900 && val.target.value < 2100) {
            this.setState({ education_start_year: val.target.value });
          } else {
            this.setState({ education_start_year: "" });
          }
        } else {
          if (val.target.value.length == 5) {
            this.setState({ education_start_year: "" });
          } else {
            this.setState({ education_start_year: val.target.value });
          }
        }
        break;
      case "education_end_year":
        if (val.target.value.length == 4) {
          if (val.target.value > 1900 && val.target.value < 2100) {
            this.setState({ education_end_year: val.target.value });
          } else {
            this.setState({ education_end_year: "" });
          }
        } else {
          if (val.target.value.length == 5) {
            this.setState({ education_end_year: "" });
          } else {
            this.setState({ education_end_year: val.target.value });
          }
        }
        break;
      case "education_description":
        this.setState({ education_description: val.target.value });
        break;
      case "membership_institute_name":
        this.setState({ membership_institute_name: val.target.value });
        break;
      case "membership_start_year":
        if (val.target.value.length == 4) {
          if (val.target.value > 1900 && val.target.value < 2100) {
            this.setState({ membership_start_year: val.target.value });
          } else {
            this.setState({ membership_start_year: "" });
          }
        } else {
          if (val.target.value.length == 5) {
            this.setState({ membership_start_year: "" });
          } else {
            this.setState({ membership_start_year: val.target.value });
          }
        }
        break;
      case "membership_end_year":
        if (val.target.value.length == 4) {
          if (val.target.value > 1900 && val.target.value < 2100) {
            this.setState({ membership_end_year: val.target.value });
          } else {
            this.setState({ membership_end_year: "" });
          }
        } else {
          if (val.target.value.length == 5) {
            this.setState({ membership_end_year: "" });
          } else {
            this.setState({ membership_end_year: val.target.value });
          }
        }
        break;
      case "membership_is_current_member":
        this.setState({
          membership_is_current_member:
            !this.state.membership_is_current_member,
        });
        var thistemp = this;
        setTimeout(function () {
          if (thistemp.state.membership_is_current_member == true) {
            $("#ender").prop("readonly", true);

            thistemp.setState({
              membership_end_year: new Date().getFullYear(),
            });
          } else {
            $("#ender").prop("readonly", false);
            thistemp.setState({ membership_end_year: "" });
          }
        }, 100);

        break;
      case "achievement_institute":
        this.setState({ achievement_institute: val.target.value });
        break;

      case "achievement_description":
        this.setState({ achievement_description: val.target.value });
        break;
      case "achievement_year":
        if (val.target.value.length == 4) {
          if (val.target.value > 1900 && val.target.value < 2100) {
            this.setState({ achievement_year: val.target.value });
          } else {
            this.setState({ achievement_year: "" });
          }
        } else {
          if (val.target.value.length == 5) {
            this.setState({ achievement_year: "" });
          } else {
            this.setState({ achievement_year: val.target.value });
          }
        }
        break;
      case "registration_institute_name":
        this.setState({ registration_institute_name: val.target.value });
        break;
      case "registration_registration_no":
        this.setState({ registration_registration_no: val.target.value });
        break;
      case "registration_year":
        if (val.target.value.length == 4) {
          if (val.target.value > 1900 && val.target.value < 2100) {
            this.setState({ registration_year: val.target.value });
          } else {
            this.setState({ registration_year: "" });
          }
        } else {
          if (val.target.value.length == 5) {
            this.setState({ registration_year: "" });
          } else {
            this.setState({ registration_year: val.target.value });
          }
        }
        break;

      default: {
      }
    }
  };
  //Get All Data of profile
  get_all_data() {
    achievement_array = [];
    education_array = [];
    membership_array = [];
    registration_array = [];

    fetch(url + "profile/get_all_achievement", {
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
        isAchievementFetched = true;

        if (responseJson.status_code == "200") {
          achievement_array = [];
          responseJson.data.map((r) => {
            achievement_array.push(r);
          });

          this.setState({ achievement_array: achievement_array });
        } else {
          this.props.history.push({
            pathname: `/`,
          });
        }
      });

    fetch(url + "profile/get_all_education", {
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
        isEducationFetched = true;
        if (responseJson.status_code == 200) {
          education_array = [];
          responseJson.data.map((r) => {
            education_array.push(r);
          });

          this.setState({ education_array: education_array });
        } else {
          this.props.history.push({
            pathname: `/`,
          });
        }
      });

    fetch(url + "profile/get_all_membership", {
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
        isMembershipFetched = true;
        if (responseJson.status_code == 200) {
          //this.setState({ "membership_array":[] })
          membership_array = [];
          responseJson.data.map((r) => {
            membership_array.push(r);
          });

          this.setState({ membership_array: membership_array });
        } else {
          this.props.history.push({
            pathname: `/`,
          });
        }
      });

    fetch(url + "profile/get_all_registration", {
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
        isRegistrationsFetched = true;
        if (responseJson.status_code == 200) {
          registration_array = [];
          responseJson.data.map((r) => {
            registration_array.push(r);
          });

          this.setState({ registration_array: registration_array });
        } else {
          this.props.history.push({
            pathname: `/`,
          });
        }
      });

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
        if (responseJson.status_code == 200) {
          responseJson.data.speciality_data.map((r) => {
            speciality.push(r);
          });

          this.setState({ speciality: speciality });
        } else {
          this.props.history.push({
            pathname: `/`,
          });
        }
      })
      .catch((error) => {});
  }

  componentDidMount() {
    isEducationFetched = false;
    isMembershipFetched = false;
    isAchievementFetched = false;
    isRegistrationsFetched = false;

    this.getAllSpecialities(); //new
    window.document.title = "CLIRNET - User Profile";

    gtag("config", AppConfig.gtag_measure_id, {
      page_title: window.document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });

    $("#chooseFile").bind("change", function () {
      var filename = $("#chooseFile").val();
      if (/^\s*$/.test(filename)) {
        $(".file-upload").removeClass("active");
        $("#noFile").text("No file chosen...");
      } else {
        $(".file-upload").addClass("active");
        $("#noFile").text(filename.replace("C:\\fakepath\\", ""));
      }
    });

    window.scrollTo(0, 0);
    //login check and speciality fetch
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
          if (responseJson.data.speciality != undefined) {
            this.setState({ user_specs: responseJson.data.speciality });
            arrui = JSON.parse(this.state.user_specs);
          }
          sel_cat = [];
          sel_cat_id = [];
          var specstr = "";

          arrui.map((r) => {
            sel_cat_id.push(r.master_specialities_id);
            sel_cat.push(r.specialities_name);
            specstr = specstr + "," + r.specialities_name;
          });
          this.setState({ speciality: sel_cat_id });

          this.setState({ specstr: specstr });

          this.setState({
            description: responseJson.data.description,
            profile_image: responseJson.data.profile_image,
          });

          fetch(url + "fcm/token", {
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
              this.setState({ firebase_token: responseJson.data.token });

              this.get_all_data();

              if (isMobile) {
                var type_id_val = 2;
              } else {
                var type_id_val = 1;
              }
            });
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

  componentWillUnmount() {
    $("html, body").css({
      overflow: "auto",
      height: "auto",
    });
  }

  // componentWillMount() {
  //   this.getAllSpecialities();
  // }

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
        } else {
          this.props.history.push({
            pathname: `/`,
          });
        }
      })
      .catch((error) => {});
  }
  //profile name edit and speciality
  onSubmit_profile() {
    this.setState({ is_edit_submitted: false });
    let temp = {
      speciality: this.state.speciality.join(),
      about: this.state.description,
    };
    fetch(url + "profile/add_profile_about", {
      method: "POST",
      headers: {
        Authorization: reactLocalStorage.get(
          "@ClirnetStore:refreshToken",
          true
        ),
        version: "rjsw 1.1.1",
        OS: "windows",
      },
      body: JSON.stringify(temp),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ is_edit_submitted: true });
        this.get_all_data();
        toast.success("Data Edited Successfully.");
        this.setState({ showModalpr_edit: false });
      })
      .catch((error) => {
        this.setState({ is_edit_submitted: true });
        this.setState({ err_msg: "Some Wrong." });
      });
  }
  //name description and speciality value change function
  handleChangeprofile = (e) => (val) => {
    switch (e) {
      case "description":
        this.setState({ description: val.target.value });
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

  //profile image upload to firebase
  fileuploadfirebase = (e) => {
    let thisobj = this;

    if (e.target.files["0"] && this.state.firebase_token != "") {
      this.setState({ is_loader_profile_image: true });

      const imageUri = e.target.files["0"];
      this.setState({ image: e.target.files["0"] });

      var unix_time = Math.round(+new Date() / 1000);
      var rand = Math.floor(Math.random() * 100000 + 1);

      const ext = imageUri.name.split(".").pop(); // Extract image extension
      //alert(ext)
      const filename = `${
        reactLocalStorage.get("@ClirnetStore:user_mem_id", true) +
        unix_time +
        rand
      }.${ext}`;
      firebase
        .auth()
        .signInWithCustomToken(this.state.firebase_token)
        .then(() => {
          // Generate unique name

          const uploadTask = storage
            .ref(
              `${AppConfig.imgFolder}${reactLocalStorage.get(
                "@ClirnetStore:user_mem_id",
                true
              )}/${filename}`
            )
            .put(imageUri);
          uploadTask.on(
            "state_changed",
            function (snapshot) {
              var progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                  console.log("Upload is paused");
                  break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                  console.log("Upload is running");
                  break;
              }
            },
            function (error) {
              thisobj.setState({
                profile_image: reactLocalStorage.get(
                  "@ClirnetStore:profile_image",
                  true
                ),
              });
            },
            function () {
              storage
                .ref(
                  `${AppConfig.imgFolder}${reactLocalStorage.get(
                    "@ClirnetStore:user_mem_id",
                    true
                  )}`
                )
                .child(filename)
                .getDownloadURL()
                .then((url) => {
                  thisobj.setState({ profile_image: url });
                  thisobj.setState({ is_loader_profile_image: false });
                });
            }
          );
        })
        .catch((error) => {
          thisobj.setState({ is_loader_profile_image: false });
          thisobj.setState({
            profile_image: reactLocalStorage.get(
              "@ClirnetStore:profile_image",
              true
            ),
          });
        });
    } else {
      thisobj.setState({
        profile_image: reactLocalStorage.get(
          "@ClirnetStore:profile_image",
          true
        ),
      });
    }
  };

  //profile image submit
  onSubmit_profile_image() {
    
    if (this.state.profile_image == "") {
      this.setState({ profileimage_error: "Please Select Image." });
    } else {
      let temp = {
        image: this.state.profile_image,
      };
      fetch(url + "profile/update_profile_image", {
        method: "POST",
        headers: {
          Authorization: reactLocalStorage.get(
            "@ClirnetStore:refreshToken",
            true
          ),
          version: "rjsw 1.1.1",
          OS: "windows",
        },
        body: JSON.stringify(temp),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status_code == "200") {
            reactLocalStorage.set(
              "@ClirnetStore:profile_image",
              this.state.profile_image
            );
            this.setState({ showModalprimage_edit: false });
            toast.success("Data Edited Successfully.");
          }
        })
        .catch((error) => {
          this.setState({ err_msg: "Some Wrong." });
        });
    }
  }

  //delete education
  delete_education(index, education_id) {
    let temp = {
      education_id: education_id,
    };

    fetch(url + "profile/delete_education", {
      method: "POST",
      headers: {
        Authorization: reactLocalStorage.get(
          "@ClirnetStore:refreshToken",
          true
        ),
        version: "rjsw 1.1.1",
      },
      body: JSON.stringify(temp),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status_code == "200") {
          this.get_all_data();
          //$(".education_" + index + "").remove();
          toast.success("Data Deleted Successfully.");
        }
      });
  }

  //delete membership
  delete_membership(index, membership_id) {
    let temp = {
      membership_id: membership_id,
    };

    fetch(url + "profile/delete_membership", {
      method: "POST",
      headers: {
        Authorization: reactLocalStorage.get(
          "@ClirnetStore:refreshToken",
          true
        ),
        version: "rjsw 1.1.1",
      },
      body: JSON.stringify(temp),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status_code == "200") {
          this.get_all_data();
          //$(".membership_" + index + "").remove();
          toast.success("Data Deleted Successfully.");
        }
      });
  }

  //delete achievement
  delete_achievement(index, achievement_id) {
    let temp = {
      achv_id: achievement_id,
    };

    fetch(url + "profile/delete_achievement", {
      method: "POST",
      headers: {
        Authorization: reactLocalStorage.get(
          "@ClirnetStore:refreshToken",
          true
        ),
        version: "rjsw 1.1.1",
      },
      body: JSON.stringify(temp),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status_code == "200") {
          this.get_all_data();
          //$(".achievement_" + index + "").remove();

          toast.success("Data Deleted Successfully.");
        }
      });
  }

  //delete registration
  delete_registration(index, registration_id) {
    let temp = {
      registration_id: registration_id,
    };

    fetch(url + "profile/delete_registration", {
      method: "POST",
      headers: {
        Authorization: reactLocalStorage.get(
          "@ClirnetStore:refreshToken",
          true
        ),
        version: "rjsw 1.1.1",
      },
      body: JSON.stringify(temp),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status_code == "200") {
          this.get_all_data();
          //$(".registration_" + index + "").remove();
          toast.success("Data Deleted Successfully.");
        }
      });
  }

  //education submit add and edit
  onSubmit_education() {
    var errorflag = 0;
    this.setState({ education_error: "" });
    if (
      this.state.education_degree == "" ||
      this.state.education_college == "" ||
      this.state.education_start_year == "" ||
      this.state.education_end_year == ""
    ) {
      errorflag = 1;

      this.setState({ education_error: "Please Fill All The Required Fields" });
    }

    if (this.state.education_start_year > this.state.education_end_year) {
      this.setState({ education_error: "Please Fill Years Correctly" });
    }

    if (errorflag == 0) {
      if (this.state.add_edit_education_id == "") {
        var temp = {
          education_school: this.state.education_college,
          education_degree: this.state.education_degree,
          education_from_year: this.state.education_start_year,
          education_to_year: this.state.education_end_year,
          education_description: this.state.education_description,
        };

        fetch(url + "profile/submit_education", {
          method: "POST",
          headers: {
            Authorization: reactLocalStorage.get(
              "@ClirnetStore:refreshToken",
              true
            ),
            version: "rjsw 1.1.1",
          },
          body: JSON.stringify(temp),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status_code == "200") {
              this.setState({ open_education: false });
              this.get_all_data();
              toast.success("Data Added Successfully.");
            }
          });
      } else {
        var temp = {
          education_id: this.state.add_edit_education_id,
          education_school: this.state.education_college,
          education_degree: this.state.education_degree,
          education_from_year: this.state.education_start_year,
          education_to_year: this.state.education_end_year,
          education_description: this.state.education_description,
        };

        fetch(url + "profile/edit_education", {
          method: "POST",
          headers: {
            Authorization: reactLocalStorage.get(
              "@ClirnetStore:refreshToken",
              true
            ),
            version: "rjsw 1.1.1",
          },
          body: JSON.stringify(temp),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status_code == "200") {
              this.setState({ open_education: false });

              this.get_all_data();
              toast.success("Data Edited Successfully.");
            } else {
              toast.error("Please Make Some Changes");
            }
          });
      }
    }
  }

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
        var html = "";
        responseJson.data.speciality_data.map((r) => {
          html =
            html +
            '<li id="3_' +
            r.id +
            '" className="lispec_' +
            r.id +
            " canremove space" +
            spacecal +
            '"><a   href="javascript:void(0);">' +
            r.name +
            "</a></li>";
        });
        $(".canremove").remove();
        $(html).insertAfter(".lispec_" + id + "");
      })
      .catch((error) => {});
  }

  //membership submit add and edit

  onSubmit_membership() {
    var errorflag = 0;
    this.setState({ membership_error: "" });
    if (
      this.state.membership_institute_name == "" ||
      this.state.membership_start_year == "" ||
      this.state.membership_end_year == ""
    ) {
      errorflag = 1;

      toast.error("Fill All Reaquired Fields");
    }
    if (this.state.membership_start_year > this.state.membership_end_year) {
      toast.error("Please Fill Years Correctly");
      errorflag = 1;
    }

    if (errorflag == 0) {
      if (this.state.add_edit_membership_id == "") {
        if (this.state.membership_is_current_member == true) {
          var temp = {
            institute_name: this.state.membership_institute_name,
            start_year: this.state.membership_start_year,
            end_year: this.state.membership_end_year,
            is_current_member: 1,
          };
        } else {
          var temp = {
            institute_name: this.state.membership_institute_name,
            start_year: this.state.membership_start_year,
            end_year: this.state.membership_end_year,
            is_current_member: 0,
          };
        }

        fetch(url + "profile/submit_membership", {
          method: "POST",
          headers: {
            Authorization: reactLocalStorage.get(
              "@ClirnetStore:refreshToken",
              true
            ),
            version: "rjsw 1.1.1",
          },
          body: JSON.stringify(temp),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status_code == "200") {
              this.setState({ open_membership: false });

              this.get_all_data();
              toast.success("Data Added Successfully.");
            }
          });
      } else {
        if (this.state.membership_is_current_member == true) {
          var temp = {
            membership_id: this.state.add_edit_membership_id,
            institute_name: this.state.membership_institute_name,
            start_year: this.state.membership_start_year,
            end_year: this.state.membership_end_year,
            is_current_member: 1,
          };
        } else {
          var temp = {
            membership_id: this.state.add_edit_membership_id,
            institute_name: this.state.membership_institute_name,
            start_year: this.state.membership_start_year,
            end_year: this.state.membership_end_year,
            is_current_member: 0,
          };
        }

        fetch(url + "profile/edit_membership", {
          method: "POST",
          headers: {
            Authorization: reactLocalStorage.get(
              "@ClirnetStore:refreshToken",
              true
            ),
            version: "rjsw 1.1.1",
          },
          body: JSON.stringify(temp),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status_code == "200") {
              this.setState({ open_membership: false });

              this.get_all_data();
              toast.success("Data Edited Successfully.");
            } else {
              toast.error("Please Make Some Changes");
            }
          });
      }
    }
  }

  //achievement submit add and edit

  onSubmit_achievement() {
    var errorflag = 0;
    this.setState({ achievement_error: "" });
    if (
      this.state.achievement_institute == "" ||
      this.state.achievement_year == "" ||
      this.state.achievement_description == ""
    ) {
      errorflag = 1;

      this.setState({
        achievement_error: "Please Fill All The Required Fields",
      });
    }

    if (errorflag == 0) {
      if (this.state.add_edit_achievement_id == "") {
        let temp = {
          institute: this.state.achievement_institute,
          year: this.state.achievement_year,
          description: this.state.achievement_description,
        };

        fetch(url + "profile/submit_achievement", {
          method: "POST",
          headers: {
            Authorization: reactLocalStorage.get(
              "@ClirnetStore:refreshToken",
              true
            ),
            version: "rjsw 1.1.1",
          },
          body: JSON.stringify(temp),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status_code == "200") {
              this.setState({ open_achievement: false });

              this.get_all_data();
              toast.success("Data Added Successfully.");
            }
          });
      } else {
        let temp = {
          achv_id: this.state.add_edit_achievement_id,
          institute: this.state.achievement_institute,
          year: this.state.achievement_year,
          description: this.state.achievement_description,
        };

        fetch(url + "profile/edit_achievement", {
          method: "POST",
          headers: {
            Authorization: reactLocalStorage.get(
              "@ClirnetStore:refreshToken",
              true
            ),
            version: "rjsw 1.1.1",
          },
          body: JSON.stringify(temp),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status_code == "200") {
              this.setState({ open_achievement: false });

              this.get_all_data();
              toast.success("Data Edited Successfully.");
            } else {
              toast.error("Please Make Some Changes");
            }
          });
      }
    }
  }

  //registration submit add and edit

  onSubmit_registration() {
    var errorflag = 0;
    this.setState({ registration_error: "" });
    if (
      this.state.registration_institute_name == "" ||
      this.state.registration_registration_no == "" ||
      this.state.registration_year == ""
    ) {
      errorflag = 1;

      this.setState({
        registration_error: "Please Fill All The Required Fields",
      });
    }

    if (errorflag == 0) {
      if (this.state.add_edit_registration_id == "") {
        let temp = {
          registration_number: this.state.registration_registration_no,
          institute_name: this.state.registration_institute_name,
          year: this.state.registration_year,
        };

        fetch(url + "profile/submit_registration", {
          method: "POST",
          headers: {
            Authorization: reactLocalStorage.get(
              "@ClirnetStore:refreshToken",
              true
            ),
            version: "rjsw 1.1.1",
          },
          body: JSON.stringify(temp),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status_code == "200") {
              this.setState({ open_registration: false });

              this.get_all_data();
              toast.success("Data Added Successfully.");
            }
          });
      } else {
        let temp = {
          registration_id: this.state.add_edit_registration_id,
          registration_number: this.state.registration_registration_no,
          institute_name: this.state.registration_institute_name,
          year: this.state.registration_year,
        };

        fetch(url + "profile/edit_registration", {
          method: "POST",
          headers: {
            Authorization: reactLocalStorage.get(
              "@ClirnetStore:refreshToken",
              true
            ),
            version: "rjsw 1.1.1",
          },
          body: JSON.stringify(temp),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status_code == "200") {
              this.setState({ open_registration: false });

              this.get_all_data();
              toast.success("Data Edited Successfully.");
            } else {
              toast.error("Please Make Some Changes");
            }
          });
      }
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
        <Helmet>
          {/* <title>Profiles powered by CLIRNet</title> */}
          <meta
            property="og:url"
            content="https://doctor.clirnet.com/services/"
          />
          <meta property="og:type" content="article" />
          <meta property="og:title" content="Profiles powered by CLIRNet" />
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
          <meta name="twitter:title" content="Profiles powered by CLIRNet" />
          <meta name="twitter:card" content="summary_large_image" />
        </Helmet>
        <Header history={this.props.history} page_name={pageNames} />
        <section className="full_width body_area">
          <div className="container">
            <div className="clearfix"></div>
            <div className="col-md-10 offset-md-1  col-xs-12">
              <div className="row">
                <section className="full_width adsArea">
                  <div className="full_width adsFrame">
                    {/* <Banner
                      type_id={0}
                      type={"Profile"}
                      apiresponserecieved={this.display_banner}
                      api_call_detail={1}
                      api_call={0}
                    />
                    {this.state.banner_display == true ? (
                      <Banner
                        type_id={0}
                        banner_position={1}
                        unmount_call={1}
                        type={"Profile"}
                        api_call={1}
                        before_unload_call={1}
                      />
                    ) : null} */}
                  </div>
                </section>

                <section className="full_width profile">
                  <div className="full_width text-left radius-6 profileRow profileRow_1">
                    <a
                      onClick={() => {
                        this.setState({ showModalprimage_edit: true });
                      }}
                      href="javascript:void(0);"
                      rel="modal:open"
                      className="radius-100 p_profile_sec_Pic"
                    >
                      <img
                        src={reactLocalStorage.get(
                          "@ClirnetStore:profile_image",
                          true
                        )}
                        className="object_fit_cover"
                      />
                      <div className="transition6s overlay"></div>
                      <div className="transition6s radius-100 bgColorWhite profileImg_edit">
                        <img
                          width="13"
                          height="13"
                          title="icon"
                          alt="icon"
                          src={editbtn}
                          className="translate_both"
                        />
                      </div>
                    </a>
                    <div className="full_width profileRow1_Right">
                      <div className="full_width colorGreyDark p_profile_sec_right_ttl">
                        <h4 className="font_20px font700 colorBlack">
                          Dr.{" "}
                          {reactLocalStorage.get(
                            "@ClirnetStore:first_name",
                            true
                          )}{" "}
                          {reactLocalStorage.get(
                            "@ClirnetStore:last_name",
                            true
                          )}
                        </h4>
                        {/* <p>{this.state.specstr.substr(1)}</p> */}
                      </div>
                      <div className="full_width help_ans_text p_profile_sec_right_text">
                        <p>{this.state.description}</p>
                      </div>
                      <a
                        onClick={() => {
                          this.setState({ showModalpr_edit: true });
                        }}
                        className="radius-6 font600 font_14px cmnBtn profileRow_1_a"
                        href="javascript:void(0)"
                        rel="modal:open"
                      >
                        <img
                          width="13"
                          height="13"
                          title="icon"
                          alt="icon"
                          src={editbtn}
                        />{" "}
                        <span>Edit</span>
                      </a>
                    </div>
                  </div>
                  {isEducationFetched ? (
                    <div className="full_width text-left radius-6 profileRow">
                      <div className="full_width p_profile_row_ttl">
                        <div className="radius-100 bgColorBlue translate_top p_profile_row_ttl_icon">
                          <img
                            src={profileIcon1}
                            alt="icon"
                            className="translate_both"
                          />
                        </div>
                        <h2 className="colorBlack font_24px font600 p_profile_row_ttlTxt">
                          Education
                        </h2>
                        <a
                          className="translate_top font600 font_16px p_profile_row_ttl_a"
                          href="javascript:void(0)"
                          onClick={() => {
                            this.setState({
                              education_college: "",
                              education_start_year: "",
                              education_end_year: "",
                              education_description: "",
                              add_edit_education_id: "",
                              open_education: true,
                              education_degree: "",
                            });
                          }}
                          rel="modal:open"
                        >
                          <img src={addPlus} width="14" height="14" /> Add
                        </a>
                      </div>
                      <div className="full_width p_profile_row_in">
                        {this.state.education_array.map((r, index) => (
                          <div
                            className={
                              "full_width p_profile_row_sub education_" +
                              index +
                              ""
                            }
                          >
                            <div className="full_width p_profile_row_subTop">
                              <h3 className="font_14px colorBlack font600 p_profile_row_Date">
                                <img src={calenderIcon} /> Added : {r.added_on}
                              </h3>
                              <div className="p_profile_row_subTopBtns">
                                <a
                                  className="radius-100 p_profile_sub_a delete_icon"
                                  onClick={() => {
                                    if (window.confirm("Delete the item?")) {
                                      this.delete_education(
                                        index,
                                        r.education_id
                                      );
                                    }
                                  }}
                                  href="javascript:void(0);"
                                >
                                  <img
                                    src={delete_icon}
                                    className="translate_both"
                                  />
                                </a>
                                <a
                                  className="radius-100 p_profile_sub_a edit_icon"
                                  href="javascript:void(0)"
                                  onClick={() => {
                                    this.setState({
                                      education_college: r.college,
                                      education_start_year: r.start_year,
                                      education_end_year: r.end_year,
                                      education_description: r.description,
                                      add_edit_education_id: r.education_id,
                                      education_degree: r.degree,
                                      open_education: true,
                                    });
                                  }}
                                >
                                  <img
                                    src={edit_icon}
                                    className="translate_both"
                                  />
                                </a>
                              </div>
                            </div>
                            <h4 className="colorBlack font_16px font700">
                              {r.college}
                            </h4>
                            <h4 className="font_14px font600">
                              {r.start_year} - {r.end_year}
                            </h4>
                            <h4 className="font_16px font700">{r.degree}</h4>
                            <h4 className="font_14px font600">
                              {r.description}
                            </h4>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <ProfileLoader />
                  )}
                  {isAchievementFetched ? (
                    <div className="full_width text-left radius-6 profileRow">
                      <div className="full_width p_profile_row_ttl">
                        <div className="radius-100 bgColorBlue translate_top p_profile_row_ttl_icon">
                          <img
                            src={profileIcon2}
                            alt="icon"
                            className="translate_both"
                          />
                        </div>
                        <h2 className="colorBlack font_24px font600 p_profile_row_ttlTxt">
                          Affiliation & Membership
                        </h2>
                        <a
                          className="translate_top font600 font_16px p_profile_row_ttl_a"
                          href="javascript:void(0)"
                          onClick={() => {
                            this.setState({
                              membership_institute_name: "",
                              membership_start_year: "",
                              membership_end_year: "",
                              membership_is_current_member: false,
                              add_edit_membership_id: "",
                              open_membership: true,
                            });
                          }}
                        >
                          <img src={addPlus} width="14" height="14" /> Add
                        </a>
                      </div>
                      <div className="full_width p_profile_row_in">
                        {this.state.membership_array.map((r, index) => (
                          <div
                            className={
                              "full_width p_profile_row_sub membership_" +
                              index +
                              ""
                            }
                          >
                            <div className="full_width p_profile_row_subTop">
                              <h3 className="font_14px colorBlack font600 p_profile_row_Date">
                                <img src={calenderIcon} /> Added : {r.added_on}
                              </h3>
                              <div className="p_profile_row_subTopBtns">
                                <a
                                  className="radius-100 p_profile_sub_a delete_icon"
                                  onClick={() => {
                                    if (window.confirm("Delete the item?")) {
                                      this.delete_membership(
                                        index,
                                        r.membership_id
                                      );
                                    }
                                  }}
                                >
                                  <img
                                    src={delete_icon}
                                    className="translate_both"
                                  />
                                </a>
                                {r.is_current_member != 1 ? (
                                  <a
                                    className="radius-100 p_profile_sub_a edit_icon"
                                    href="javascript:void(0)"
                                    onClick={() => {
                                      this.setState({
                                        membership_institute_name:
                                          r.institute_name,
                                        membership_start_year: r.start_year,
                                        membership_end_year: r.end_year,
                                        membership_is_current_member: false,
                                        add_edit_membership_id: r.membership_id,
                                        open_membership: true,
                                      });
                                    }}
                                  >
                                    <img
                                      src={edit_icon}
                                      className="translate_both"
                                    />
                                  </a>
                                ) : (
                                  <a
                                    className="radius-100 p_profile_sub_a edit_icon"
                                    href="javascript:void(0)"
                                    onClick={() => {
                                      this.setState({
                                        membership_institute_name:
                                          r.institute_name,
                                        membership_start_year: r.start_year,
                                        membership_end_year: r.end_year,
                                        membership_is_current_member: true,
                                        add_edit_membership_id: r.membership_id,
                                        open_membership: true,
                                      });
                                    }}
                                  >
                                    <img
                                      src={edit_icon}
                                      className="translate_both"
                                    />
                                  </a>
                                )}
                              </div>
                            </div>
                            <h4 className="colorBlack font_16px font700">
                              {r.institute_name}
                            </h4>
                            {r.is_current_member != 1 ? (
                              <h4 className="font_14px font600">
                                {r.start_year} - {r.end_year}
                              </h4>
                            ) : (
                              <h4 className="font_14px font600">
                                {r.start_year} - Present
                              </h4>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <ProfileLoader />
                  )}
                  {isAchievementFetched ? (
                    <div className="full_width text-left radius-6 profileRow">
                      <div className="full_width p_profile_row_ttl">
                        <div className="radius-100 bgColorBlue translate_top p_profile_row_ttl_icon">
                          <img
                            src={profileIcon3}
                            alt="icon"
                            className="translate_both"
                          />
                        </div>
                        <h2 className="colorBlack font_24px font600 p_profile_row_ttlTxt">
                          Contribution / Achievements
                        </h2>
                        <a
                          className="translate_top font600 font_16px p_profile_row_ttl_a"
                          href="javascript:void(0)"
                          onClick={() => {
                            this.setState({
                              achievement_institute: "",
                              achievement_description: "",
                              achievement_year: "",
                              add_edit_achievement_id: "",
                              open_achievement: true,
                            });
                          }}
                        >
                          <img src={addPlus} width="14" height="14" /> Add
                        </a>
                      </div>
                      <div className="full_width p_profile_row_in">
                        {this.state.achievement_array.map((r, index) => (
                          <div
                            className={
                              "full_width p_profile_row_sub achievement_" +
                              index +
                              ""
                            }
                          >
                            <div className="full_width p_profile_row_subTop">
                              <h3 className="font_14px colorBlack font600 p_profile_row_Date">
                                <img src={calenderIcon} /> Added : {r.added_on}
                              </h3>
                              <div className="p_profile_row_subTopBtns">
                                <a
                                  className="radius-100 p_profile_sub_a delete_icon"
                                  onClick={() => {
                                    if (window.confirm("Delete the item?")) {
                                      this.delete_achievement(index, r.achv_id);
                                    }
                                  }}
                                >
                                  <img
                                    src={delete_icon}
                                    className="translate_both"
                                  />
                                </a>
                                <a
                                  className="radius-100 p_profile_sub_a edit_icon"
                                  href="javascript:void(0)"
                                  onClick={() => {
                                    this.setState({
                                      achievement_institute: r.institute,
                                      achievement_description: r.description,
                                      achievement_year: r.year,
                                      add_edit_achievement_id: r.achv_id,
                                      open_achievement: true,
                                    });
                                  }}
                                >
                                  <img
                                    src={edit_icon}
                                    className="translate_both"
                                  />
                                </a>
                              </div>
                            </div>
                            <h4 className="colorBlack font_16px font700">
                              {r.institute}
                            </h4>
                            <h4 className="font_14px font600">{r.year}</h4>
                            <h4 className="font_14px font600">
                              {r.description}
                            </h4>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <ProfileLoader />
                  )}

                  {isRegistrationsFetched ? (
                    <div className="full_width text-left radius-6 profileRow">
                      <div className="full_width p_profile_row_ttl">
                        <div className="radius-100 bgColorBlue translate_top p_profile_row_ttl_icon">
                          <img
                            src={profileIcon5}
                            alt="icon"
                            className="translate_both"
                          />
                        </div>
                        <h2 className="colorBlack font_24px font600 p_profile_row_ttlTxt">
                          Registrations
                        </h2>
                        <a
                          className="translate_top font600 font_16px p_profile_row_ttl_a"
                          href="javascript:void(0);"
                          onClick={() => {
                            this.setState({
                              registration_institute_name: "",
                              registration_registration_no: "",
                              registration_year: "",
                              add_edit_registration_id: "",
                              open_registration: true,
                            });
                          }}
                        >
                          <img src={addPlus} width="14" height="14" /> Add
                        </a>
                      </div>
                      <div className="full_width p_profile_row_in">
                        {this.state.registration_array.map((r, index) => (
                          <div
                            className={
                              "full_width p_profile_row_sub registration_" +
                              index +
                              ""
                            }
                          >
                            <div className="full_width p_profile_row_subTop">
                              <h3 className="font_14px colorBlack font600 p_profile_row_Date">
                                <img src={calenderIcon} /> Added : {r.added_on}
                              </h3>
                              <div className="p_profile_row_subTopBtns">
                                <a
                                  className="radius-100 p_profile_sub_a delete_icon"
                                  onClick={() => {
                                    if (window.confirm("Delete the item?")) {
                                      this.delete_registration(
                                        index,
                                        r.registration_id
                                      );
                                    }
                                  }}
                                >
                                  <img
                                    src={delete_icon}
                                    className="translate_both"
                                  />
                                </a>
                                <a
                                  className="radius-100 p_profile_sub_a edit_icon"
                                  onClick={() => {
                                    this.setState({
                                      registration_institute_name:
                                        r.institute_name,
                                      registration_registration_no:
                                        r.registration_no,
                                      registration_year: r.year,
                                      add_edit_registration_id:
                                        r.registration_id,
                                      open_registration: true,
                                    });
                                  }}
                                  href="javascript:void(0)"
                                >
                                  <img
                                    src={edit_icon}
                                    className="translate_both"
                                  />
                                </a>
                              </div>
                            </div>
                            <h4 className="colorBlack font_16px font700">
                              {r.institute_name}
                            </h4>
                            <h4 className="font_14px font600">{r.year}</h4>
                            <h4 className="font_16px font700">
                              Registration No: {r.registration_no}
                            </h4>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <ProfileLoader />
                  )}
                </section>

                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>
        <Modal
          className="in ssnCancelPop"
          centered="true"
          animation="slide"
          show={this.state.showModalpr_edit}
          onHide={() => {
            this.setState({ showModalpr_edit: false });
          }}
        >
          <Modal.Header className="justify-content-center">
            <Modal.Title className="font600 font_18px colorBlack">
              Edit Profile
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="form_container_cmn">
              {/* <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Select Speciality</Form.Label>
                <Form.Control as="select" multiple onChange={this.handleChangeprofile('speciality')}>
                  {specialities.map(r =>

                    (sel_cat_id.indexOf(r.master_specialities_id) != -1) ?
                      <option selected value={r.master_specialities_id} >{r.specialities_name}</option> :
                      <option value={r.master_specialities_id} >{r.specialities_name}</option>
                  )}
                </Form.Control>
              </Form.Group> */}

              <div class="col-xs-12 form_row_pop">
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>About Me</Form.Label>
                  <Form.Control
                    value={this.state.description}
                    onChange={this.handleChangeprofile("description")}
                    as="textarea"
                    rows="3"
                  />
                </Form.Group>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <a
              href="javascript:void(0)"
              className="radius-40 font500 btnRed cmnBtn btnCmnSmall"
              variant="secondary"
              onClick={() => {
                this.setState({ showModalpr_edit: false });
              }}
            >
              Close
            </a>
            <a href="javascript:void(0)" onClick={(e) => { 
                this.state.is_edit_submitted?this.onSubmit_profile():e.preventDefault()
              }}
              className="radius-40 font500 btnGreen cmnBtn btnCmnSmall"
              variant="secondary">
              Apply
            </a>
          </Modal.Footer>
        </Modal>

        <Modal
          className="in ssnCancelPop"
          centered="true"
          animation="slide"
          show={this.state.showModalprimage_edit}
          onHide={() => {
            this.setState({ showModalprimage_edit: false });
          }}
        >
          <Modal.Header className="justify-content-center">
            <Modal.Title className="font600 font_18px colorBlack">
              Edit Profile Image
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="form_container_cmn">
              <div class="form_container_cmn">
                <div class="col-xs-12 text-center form_row_pop">
                  <div class="radius-100 chooseFile_image_profile">
                    <Loader
                      type="ThreeDots"
                      color="#3393df"
                      height={30}
                      width={30}
                      visible={this.state.is_loader_profile_image}
                    />
                    <img
                      id="chooseFile_image_preview"
                      src={this.state.profile_image}
                      class="object_fit_cover"
                    />
                  </div>
                  <div class="clearfix"></div>

                  <div class="transition6s btnGreen font_16px btnBoxShddwBig chooseFile_btn_profile">
                    <label for="chseImg_profile">Choose file</label>
                    <input
                      hidden
                      type="file"
                      id="chseImg_profile"
                      onChange={this.fileuploadfirebase}
                    />
                  </div>
                </div>
              </div>
              <span className="err_hold" style={{ color: "red" }}>
                {this.state.profileimage_error}
              </span>
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <a
              href="javascript:void(0)"
              className="radius-40 font500 btnRed cmnBtn btnCmnSmall"
              variant="secondary"
              onClick={() => {
                this.setState({ showModalprimage_edit: false });
              }}
            >
              Close
            </a>
            {this.state.is_loader_profile_image == false ? (
              <a
                href="javascript:void(0)"
                onClick={() => {
                  this.onSubmit_profile_image();
                }}
                className="radius-40 font500 btnGreen cmnBtn btnCmnSmall"
                variant="secondary"
              >
                Apply
              </a>
            ) : (
              <a
                href="javascript:void(0)"
                className="radius-40 font500 btnGreen cmnBtn btnCmnSmall"
                variant="secondary"
              >
                Uploading
              </a>
            )}
          </Modal.Footer>
        </Modal>

        <Modal
          className="in ssnCancelPop"
          centered="true"
          animation="slide"
          show={this.state.open_education}
          onHide={() => {
            this.setState({ open_education: false });
          }}
        >
          <Modal.Header className="justify-content-center">
            {this.state.add_edit_education_id == "" ? (
              <Modal.Title className="font600 font_18px colorBlack">
                Add Education
              </Modal.Title>
            ) : (
              <Modal.Title className="font600 font_18px colorBlack">
                Edit Education
              </Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            <div class="form_container_cmn">
              <Form.Group>
                <Form.Label>
                  Degree<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  onChange={this.handleChange("education_degree")}
                  value={this.state.education_degree}
                  type="text"
                  placeholder="Degree"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  College<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  onChange={this.handleChange("education_college")}
                  value={this.state.education_college}
                  type="text"
                  placeholder="College"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  From year<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  onChange={this.handleChange("education_start_year")}
                  value={this.state.education_start_year}
                  min={1900}
                  max={2100}
                  type="number"
                  placeholder="Year"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  To Year<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  onChange={this.handleChange("education_end_year")}
                  value={this.state.education_end_year}
                  min={1900}
                  max={2100}
                  type="number"
                  placeholder="Year"
                />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  onChange={this.handleChange("education_description")}
                  value={this.state.education_description}
                  as="textarea"
                  rows="3"
                />
              </Form.Group>
              <span style={{ color: "red" }}>{this.state.education_error}</span>
              <span style={{ color: "green" }}>{this.state.success_msg}</span>
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <a
              href="javascript:void(0)"
              className="radius-40 font500 btnRed cmnBtn btnCmnSmall"
              variant="secondary"
              onClick={() => {
                this.setState({ open_education: false });
              }}
            >
              Close
            </a>
            <a
              href="javascript:void(0)"
              onClick={() => {
                this.onSubmit_education();
              }}
              className="radius-40 font500 btnGreen cmnBtn btnCmnSmall"
              variant="secondary"
            >
              Apply
            </a>
          </Modal.Footer>
        </Modal>

        <Modal
          className="in ssnCancelPop"
          centered="true"
          animation="slide"
          show={this.state.open_registration}
          onHide={() => {
            this.setState({ open_registration: false });
          }}
        >
          <Modal.Header className="justify-content-center">
            {this.state.add_edit_membership_id == "" ? (
              <Modal.Title className="font600 font_18px colorBlack">
                Add Registration
              </Modal.Title>
            ) : (
              <Modal.Title className="font600 font_18px colorBlack">
                Edit Registration
              </Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            <div class="form_container_cmn">
              <Form.Group>
                <Form.Label>
                  Institute<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  onChange={this.handleChange("registration_institute_name")}
                  value={this.state.registration_institute_name}
                  type="text"
                  placeholder="Institute"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  Registration No.<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  onChange={this.handleChange("registration_registration_no")}
                  value={this.state.registration_registration_no}
                  type="text"
                  placeholder="Registration No."
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Year<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  onChange={this.handleChange("registration_year")}
                  value={this.state.registration_year}
                  min="1850"
                  type="number"
                  placeholder="Year"
                />
              </Form.Group>

              <span style={{ color: "red" }}>
                {this.state.registration_error}
              </span>
              <span style={{ color: "green" }}>{this.state.success_msg}</span>
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <a
              href="javascript:void(0)"
              className="radius-40 font500 btnRed cmnBtn btnCmnSmall"
              variant="secondary"
              onClick={() => {
                this.setState({ open_registration: false });
              }}
            >
              Close
            </a>
            <a
              href="javascript:void(0)"
              onClick={() => {
                this.onSubmit_registration();
              }}
              className="radius-40 font500 btnGreen cmnBtn btnCmnSmall"
              variant="secondary"
            >
              Apply
            </a>
          </Modal.Footer>
        </Modal>

        <Modal
          className="in ssnCancelPop"
          centered="true"
          animation="slide"
          show={this.state.open_membership}
          onHide={() => {
            this.setState({ open_membership: false });
          }}
        >
          <Modal.Header className="justify-content-center">
            {this.state.add_edit_membership_id == "" ? (
              <Modal.Title className="font600 font_18px colorBlack">
                Add Membership
              </Modal.Title>
            ) : (
              <Modal.Title className="font600 font_18px colorBlack">
                Edit Membership
              </Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            <div class="form_container_cmn">
              <Form.Group>
                <Form.Label>
                  Institute<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  onChange={this.handleChange("membership_institute_name")}
                  value={this.state.membership_institute_name}
                  type="text"
                  placeholder="Institute"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  Start Year<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  onChange={this.handleChange("membership_start_year")}
                  value={this.state.membership_start_year}
                  type="number"
                  placeholder="Year"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  End Year<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  onChange={this.handleChange("membership_end_year")}
                  value={this.state.membership_end_year}
                  type="number"
                  id="ender"
                  placeholder="Year"
                />
              </Form.Group>
              {this.state.membership_is_current_member != true ? (
                <Form.Check
                  inline
                  onChange={this.handleChange("membership_is_current_member")}
                  label="Current Member"
                  value="1"
                />
              ) : (
                <Form.Check
                  inline
                  checked
                  onChange={this.handleChange("membership_is_current_member")}
                  label="Currently Member"
                  value="0"
                />
              )}

              <span style={{ color: "red" }}>
                {this.state.membership_error}
              </span>
              <span style={{ color: "green" }}>{this.state.success_msg}</span>
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <a
              href="javascript:void(0)"
              className="radius-40 font500 btnRed cmnBtn btnCmnSmall"
              variant="secondary"
              onClick={() => {
                this.setState({ open_membership: false });
              }}
            >
              Close
            </a>
            <a
              href="javascript:void(0)"
              onClick={() => {
                this.onSubmit_membership();
              }}
              className="radius-40 font500 btnGreen cmnBtn btnCmnSmall"
              variant="secondary"
            >
              Apply
            </a>
          </Modal.Footer>
        </Modal>

        <Modal
          className="in ssnCancelPop"
          centered="true"
          animation="slide"
          show={this.state.open_achievement}
          onHide={() => {
            this.setState({ open_achievement: false });
          }}
        >
          <Modal.Header className="justify-content-center">
            {this.state.add_edit_membership_id == "" ? (
              <Modal.Title className="font600 font_18px colorBlack">
                Add Achievement
              </Modal.Title>
            ) : (
              <Modal.Title className="font600 font_18px colorBlack">
                Edit Achievement
              </Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            <div class="form_container_cmn">
              <Form.Group>
                <Form.Label>
                  Institute<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  onChange={this.handleChange("achievement_institute")}
                  value={this.state.achievement_institute}
                  type="text"
                  placeholder="Institute"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  Start Year<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  onChange={this.handleChange("achievement_year")}
                  value={this.state.achievement_year}
                  min="1850"
                  type="number"
                  placeholder="Year"
                />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>
                  Description <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  onChange={this.handleChange("achievement_description")}
                  value={this.state.achievement_description}
                  as="textarea"
                  rows="3"
                />
              </Form.Group>

              <span style={{ color: "red" }}>
                {this.state.achievement_error}
              </span>
              <span style={{ color: "green" }}>{this.state.success_msg}</span>
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <a
              href="javascript:void(0)"
              className="radius-40 font500 btnRed cmnBtn btnCmnSmall"
              variant="secondary"
              onClick={() => {
                this.setState({ open_achievement: false });
              }}
            >
              Close
            </a>
            <a
              href="javascript:void(0)"
              onClick={() => {
                this.onSubmit_achievement();
              }}
              className="radius-40 font500 btnGreen cmnBtn btnCmnSmall"
              variant="secondary"
            >
              Apply
            </a>
          </Modal.Footer>
        </Modal>
        <Footer history={this.props.history} />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
        />
      </div>
    );
  }
}

export default Profile;
