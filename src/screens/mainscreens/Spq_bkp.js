import React from "react";
import Loader from "react-loader-spinner";
import $ from "jquery";
import "react-toastify/dist/ReactToastify.css";
import { reactLocalStorage } from "reactjs-localstorage";
import AppConfig from "../config/config.js";
import Header from "./Header";
import Footer from "./Footer";
import surveyTTl from "../../images/surveyTTl.png";
import surveyLefticon1 from "../../images/surveyLeft-icon-1.png";
import surveyLefticon2 from "../../images/surveyLeft-icon-2.png";
import surveyLefticon3 from "../../images/surveyLeft-icon-3.png";
import Masonry from "react-masonry-component";
import { isMobile } from "react-device-detect";   
import QuizCard from "../Cards/QuizCard.js";
import PollCard from "../Cards/PollCard.js";
import SurveyCard from "../Cards/SurveyCard.js";
import Banner from "../mainscreens/Banner";

import PollCardLoader from "../LoadingPlaceholders/PollCardLoader.jsx";
import SpqLoader from "../LoadingPlaceholders/SpqLoader.jsx";

const gtag = window.gtag;

//npm install --save moment react-moment
const pageNames = "Polls & Quizzes";
const url = AppConfig.apiLoc;
var button_val = "poll";
var is_loader = true;
var isCalled = true;
var deafult_popover_index = -1;

var survey_list_data = [];
var poll_list_data = [];
var quiz_list_data = [];
var all_list_data = [];

var fetchForm = 0;

const masonryOptions = {
  transitionDuration: 0,
};

class Spq extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_point: "",
      completed_count: "",
      incomplete_count: "",
      display: false,
      checkedRadio: null,
      rerender: false,
      banner_display: false,
    };
    fetchForm =0;
    isCalled = true;
    button_val = "poll";
    this.display_banner = this.display_banner.bind(this);
  }

  componentDidMount() {
    window.document.title = "CLIRNET - SPQ Feed";
    gtag("config", AppConfig.gtag_measure_id, {
      page_title: window.document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
    button_val = "poll";
    let temp = this;

    $(document).on("click", function (e) {
      let ggg = $(e.target).parents(".popoverExtra").length;
      if (ggg == 0 && !$(e.target).hasClass("popoverExtra")) {
        deafult_popover_index = -1;
        temp.refresh();
      }
    });

    $(".survey_mobile").addClass("active");
    $(".li_survey").attr("id", "survey_cal");
    $(".surveyCollaps").click(function () {
      $(this).toggleClass("surveyCollapsActive");
      $(".surveyLeftBoxArea").slideToggle();
    });

    $(window).bind("load resize", function () {
      if ($(window).innerWidth() <= 991) {
        $(window).scroll(function () {
          var scroll = $(window).scrollTop();
          if (scroll >= 100) {
            $(".surveyCollaps").removeClass("surveyCollapsActive");
            $(".surveyLeftBoxArea").slideUp();
          }
        });
      }
    });

    if(fetchForm == 0){
      is_loader = true;
      this.refresh()
      this.getListByCategory('poll');
    }
    try {
      let position = $(window).scrollTop();
      $(window).scroll(function () { 
        let scroll = $(window).scrollTop();
        var nav = $("#survey-div");
        if (nav.length) {
          if (
            $(window).scrollTop() >=
            $("#survey-div").offset().top +
              $("#survey-div").outerHeight() -
              window.innerHeight
          ) {
            if (scroll > position) {
              console.log("visible");
              if(isCalled){ 
                is_loader = true;
                temp.refresh();
                if(button_val== "all"){
                  temp.getSurveyList();
                }else{
                  temp.getListByCategory(button_val);
                }
              }
            } else {
              console.log(" not visible");  
              // recent_api_call_permission = true;
            }
          }
        }
      });
    } catch (err) {
    }

    this.getUserPoint();
    this.getCompletedCount();
    this.getInCompletedCount();
  }

  is_on_screen(id) {
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

  componentWillUnmount() {
    $("html, body").css({
      overflow: "auto",
      height: "auto",
    });
    button_val = "poll";
    fetchForm = 0;
    survey_list_data = [];
    poll_list_data = [];
    quiz_list_data = [];
    all_list_data = []; 
    is_loader = true;
    isCalled = true;
    $(window).unbind("scroll");
  }

  makeFirstLaterCapital(txt) {
    let modText = txt[0].toUpperCase() + txt.slice(1);
    return modText;
  }

  refresh = () => {
    this.setState({ display: !this.state.display });
  };

  getSurveyList = () => {
    if(isCalled){
      isCalled = false; 
      fetch(url + "survey/list?from="+fetchForm+"&to=5", {
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
          let status_code = responseJson.status_code;
          if (status_code == 200) {
            isCalled = true; 
            is_loader = false;
            fetchForm +=5;
            this.parseListResponse(responseJson, "all");
          }
        })
        .catch((error) => {
          isCalled = true;
          is_loader = false;
          console.log("Error" + error);
        });
    }

  };

  getListByCategory(category) {
    console.log("in getListByCategory"+isCalled);
    if(isCalled){
      isCalled = false;
      fetch(url + "survey/list?category=" + category+"&from="+fetchForm+"&to=5", {
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
          let responseData = responseJson.data;
          isCalled = true;
          is_loader = false;
          fetchForm +=5;
          this.parseListResponse(responseJson, category);
        })
        .catch((error) => {
          isCalled = true;
          is_loader = false;
          console.log("Error" + error);
        });
    }
  }

  setLoaderStatus(arr) {
    // console.log('array length'+arr.length)
    if (arr.length == "" || arr.length == 0 || arr.length == undefined) {
      is_loader = false;
    }
  }

  parseListResponse(responseJson, category) {
    let responseData;
    switch (category) {
      case "all":
        // all_list_data = [];
        responseData = responseJson.data;
        if (!responseData) {
          is_loader = false;
          isCalled = false;
        } else {
          // all_list_data = [...all_list_data, ...responseData];
          // this.refresh();
          responseData.map((r, index) => {
            all_list_data.push(r);
          })
        }
        this.refresh();
        break;
      case "survey":
        // survey_list_data = [];
        responseData = responseJson.data;
        if (!responseData) {
          is_loader = false;
          isCalled = false;
        } else {
          // survey_list_data = responseData;
          responseData.map((r, index) => {
            survey_list_data.push(r);
          })
        }
        this.refresh();
        break;
      case "poll":
        // poll_list_data = [];
        responseData = responseJson.data;
        if (!responseData) {
          is_loader = false;
          isCalled = false;
        } else {
          // poll_list_data = responseData;
          // poll_list_data =  [...poll_list_data, ...responseData];
          responseData.map((r, index) => {
            poll_list_data.push(r);
          })
        }
        this.refresh();
        break;
      case "quiz":
        // quiz_list_data = [];
        responseData = responseJson.data;
        if (!responseData) {
          is_loader = false;
          isCalled = false;
        } else {
          // quiz_list_data = responseData;
          // quiz_list_data =  [...quiz_list_data, ...responseData];
          responseData.map((r, index) => {
            quiz_list_data.push(r);
          })
        }
        this.refresh();
        break;
      case "honorarium":
        break;
      default:
    }
  }

  getCompletedCount = () => {
    // console.log("Get Completed Count");
    fetch(url + "survey/completed_count", {
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
        let responseData = responseJson.data;
        this.setState({ completed_count: responseData });
      })
      .catch((error) => {
        console.log("Error" + error);
      });
  };

  getInCompletedCount = () => {
    // console.log("Get Completed Count");
    fetch(url + "survey/incompleted_count", {
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
        let responseData = responseJson.data;
        this.setState({ incomplete_count: responseData });
      })
      .catch((error) => {
        console.log("Error" + error);
      });
  };

  getUserPoint = () => {
    fetch(url + "survey/userpoint", {
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
        let responseData = responseJson.data;
        // console.log("User point"+ responseData);
        this.setState({ user_point: responseData });
        // console.log('user state point',this.state.user_point)
      })
      .catch((error) => {
        console.log("Error" + error);
      });
  };

  redirect_to_survey_detail = (id) => {
    // console.log("ready to reddirect" + id);
    this.props.history.push({
      pathname: "/SpqDetails/" + id + "",
    });
  };

  redirect_to_completed_list = () => {
    console.log("completed click");
    this.props.history.push({
      pathname: "/SpqCompletedList/",
    });
  };

  redirect_to_user_point = () => {
    console.log("user point click");
    this.props.history.push({
      pathname: "/UserPoint/",
    });
  };

  redirect_to_incompleted_list = () => {
    console.log("user point click");
    this.props.history.push({
      pathname: "/SpqListPending/",
    });
  };

  functionCallCallback = (btn_val) => {
    switch (btn_val) {
      case "all":
        return this.renderAll();
      case "survey":
        return this.renderSurveyList();
      case "poll":
        return this.renderPolls();
      case "quiz":
        return this.renderQuiz();
      case "honorarium":
        return this.renderHonorium();
      default:
        return false;
    }
  };

  tabChangeHandler = (btn_val) => {
    let honoriumCheckboxId = $("#Honorarium-1");
    survey_list_data = [];
    poll_list_data = [];
    quiz_list_data = [];
    all_list_data = []; 
    is_loader = true;
    isCalled = true;
    switch (btn_val) {
      case "all":
        fetchForm = 0;
        honoriumCheckboxId.prop("checked", false);
        button_val = btn_val;
        is_loader = true;
        this.getSurveyList();
        this.refresh();
        break;
      case "survey":
        fetchForm = 0;
        honoriumCheckboxId.prop("checked", false);
        button_val = btn_val;
        is_loader = true;
        this.getListByCategory("survey");
        this.refresh();
        break;
      case "poll":
        fetchForm = 0;
        honoriumCheckboxId.prop("checked", false);
        button_val = btn_val;
        is_loader = true;
        this.getListByCategory("poll");
        this.refresh();
        break;
      case "quiz":
        fetchForm = 0;
        honoriumCheckboxId.prop("checked", false);
        button_val = btn_val;
        is_loader = true;
        this.getListByCategory("quiz"); 
        this.refresh();
        break;
      case "honorarium":
        fetchForm = 0;
        button_val = btn_val;
        isCalled = true;
        this.refresh();
        break;
      default:
    }
  };

  checkBoxChangeHander = () => {
    if ($("#Honorarium-1").prop("checked") == true) {
      this.tabChangeHandler("honorarium");
    } else {
      this.tabChangeHandler("all");
    }
  };

  pointTextValidation(point) {
    if (point <= 1) {
      return " Point";
    } else {
      return " Points";
    }
  }

  setProgressBarClass(progress) {
    if (progress >= 0 && progress <= 33) {
      return " progressBarRed";
    } else if (progress >= 33 && progress <= 66) {
      return " progressBarYellow";
    } else if (progress >= 66 && progress <= 100) {
      return " progressBarGreen";
    } else {
      console.log("progress in else");
      return "";
    }
  }



  renderAll() {
    // console.log('In all list\n'+all_list_data.length)
    return (
      <>
        {/* {(all_list_data.length == '' || all_list_data.length == 0) ?
          <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={80} width={80} visible={is_loader} /> : null} */}
        {all_list_data.length > 0 ? (
          <div className="full_width surveyRightMasonry">
            <Masonry
              className={"dskMasonryCardArea"} // default ''
              elementType={"ul"} // default 'div'
              options={masonryOptions} // default {}
              disableImagesLoaded={false} // default false
              updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
            >
              {all_list_data.map((val, ind) => (
                <>
                  {val.category == "survey" ? (
                     
                    <SurveyCard
                      data={val}
                      status="new"
                      array_index={ind}
                      click={this.redirect_to_survey_detail.bind(
                        this,
                        val.survey_id
                      )}
                      menu_click={this.onMenuClick.bind(this, ind)}
                      deafult_popover_index={deafult_popover_index}
                    />
         
                    
                  ) : null}
                  {val.category == "quiz" ? (
                    
                    <QuizCard
                      data={val}
                      status="new"
                      array_index={ind}
                      click={this.redirect_to_survey_detail.bind(
                        this,
                        val.survey_id
                      )}
                      menu_click={this.onMenuClick.bind(this, ind)}
                      deafult_popover_index={deafult_popover_index}
                    />
               
                  ) : null}
                  {
                    val.category == "poll" ? (
                      
                      <PollCard
                        data={val}
                        status="new"
                        array_index={ind}
                        menu_click={this.onMenuClick.bind(this, ind)}
                        deafult_popover_index={deafult_popover_index}
                      />
                      
                    ) : null
                  }
                </>
              ))}

            </Masonry>
            {is_loader? <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={40} width={40} visible={is_loader} /> :null}
          </div>
        ) : is_loader ? (
          <div className="full_width surveyRightMasonry">
            <Masonry
              className={"dskMasonryCardArea"} // default ''
              elementType={"ul"} // default 'div'
              options={masonryOptions} // default {}
              disableImagesLoaded={false} // default false
              updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
              //imagesLoadedOptions={imagesLoadedOptions}
            >
              <SpqLoader />
              <SpqLoader />
              <SpqLoader />
              <SpqLoader />
              <SpqLoader />
              <SpqLoader />
              <SpqLoader />
            </Masonry>
          </div>
        ) : !is_loader ? (
          <div className="medWikiLeft">
            <div className="full_width alert alert-danger">
              <strong>No Spq Found</strong>
            </div>
          </div>
        ) : null}
      </>
    );
  }

  renderSurveyList = () => {
    // console.log('In survey list\n'+survey_list_data.length)
    return (
      <>
        {/* {(survey_list_data.length == 0) ?
          <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={80} width={80} visible={is_loader} /> : null} */}
        {survey_list_data.length > 0 ? (
          <div className="full_width surveyRightMasonry">
            <Masonry
              className={"dskMasonryCardArea"} // default ''
              elementType={"ul"} // default 'div'
              options={masonryOptions} // default {}
              disableImagesLoaded={false} // default false
              updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
              //imagesLoadedOptions={imagesLoadedOptions} // default {}
            >
              {survey_list_data.map((val, ind) => (
                
                <SurveyCard
                  data={val}
                  status="new"
                  array_index={ind}
                  click={this.redirect_to_survey_detail.bind(
                    this,
                    val.survey_id
                  )}
                  menu_click={this.onMenuClick.bind(this, ind)}
                  deafult_popover_index={deafult_popover_index}
                />
              )
              )}
            </Masonry>
            {is_loader? <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={40} width={40} visible={is_loader} /> :null}
          </div>
        ) : is_loader ? (
          <div className="full_width surveyRightMasonry">
            <Masonry
              className={"dskMasonryCardArea"} // default ''
              elementType={"ul"} // default 'div'
              options={masonryOptions} // default {}
              disableImagesLoaded={false} // default false
              updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
              //imagesLoadedOptions={imagesLoadedOptions}
            >
              <SpqLoader />
              <SpqLoader />
              <SpqLoader />
              <SpqLoader />
              <SpqLoader />
              <SpqLoader />
            </Masonry>
          </div>
        ) : !is_loader ? (
          <div className="medWikiLeft">
            <div className="full_width alert alert-danger">
              <strong>No Survey Found</strong>
            </div>
          </div>
        ) : null}
      </>
    );
  };

  onMenuClick(ind) {
    deafult_popover_index = ind;
    this.refresh();
  }

  renderQuiz = () => {
    // console.log('In render quiz\n'+quiz_list_data.length)
    return (
      <>
        {/* {(quiz_list_data.length == 0) ?
          <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={80} width={80} visible={is_loader} /> : null} */}
        {quiz_list_data.length > 0 ? (
          <div className="full_width surveyRightMasonry">
            <Masonry
              className={"dskMasonryCardArea"} // default ''
              elementType={"ul"} // default 'div'
              options={masonryOptions} // default {}
              disableImagesLoaded={false} // default false
              updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
              //imagesLoadedOptions={imagesLoadedOptions} // default {}
            >
              {quiz_list_data.map((val, ind) => (
              
                <QuizCard
                  data={val}
                  status="new"
                  array_index={ind}
                  click={this.redirect_to_survey_detail.bind(
                    this,
                    val.survey_id
                  )}
                  menu_click={this.onMenuClick.bind(this, ind)}
                  deafult_popover_index={deafult_popover_index}
                />
              )
               )}
            </Masonry>
            {is_loader? <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={40} width={40} visible={is_loader} /> :null}
          </div>
        ) : is_loader ? (
          <div className="full_width surveyRightMasonry" >
            <Masonry
              className={"dskMasonryCardArea"} // default ''
              elementType={"ul"} // default 'div'
              options={masonryOptions} // default {}
              disableImagesLoaded={false} // default false
              updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
              //imagesLoadedOptions={imagesLoadedOptions}
            >
              <SpqLoader />
              <SpqLoader />
              <SpqLoader />
              <SpqLoader />
              <SpqLoader />
              <SpqLoader />
              <SpqLoader />
            </Masonry>
          </div>
        ) : !is_loader ? (
          <div className="medWikiLeft">
            <div className="full_width alert alert-danger">
              <strong>No Quiz Found</strong>
            </div>
          </div>
        ) : null}
      </>
    );
  };

  renderPolls = () => {
    // console.log('in render polls'+poll_list_data.length)
    return (
      <>
        {/* {(poll_list_data.length == 0) ?
          <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={80} width={80} visible={is_loader} /> : null} */}
        {poll_list_data.length > 0 ? (
          <div className="full_width surveyRightMasonry">
            <>
              <Masonry
                className={"dskMasonryCardArea"} // default ''
                elementType={"ul"} // default 'div'
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                //imagesLoadedOptions={imagesLoadedOptions}
              >
                {poll_list_data.map((val, ind) => (
                
                  <PollCard
                    data={val}
                    status="new"
                    array_index={ind}
                    menu_click={this.onMenuClick.bind(this, ind)}
                    deafult_popover_index={deafult_popover_index}
                  />
                   
                ))}
              </Masonry>
            </>
            {is_loader? <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={40} width={40} visible={is_loader} /> :null}
          </div>

        ) : is_loader ? (
          <div className="full_width surveyRightMasonry" >
            <Masonry
              className={"dskMasonryCardArea"} // default ''
              elementType={"ul"} // default 'div'
              options={masonryOptions} // default {}
              disableImagesLoaded={false} // default false
              updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
              //imagesLoadedOptions={imagesLoadedOptions}
            >
              <PollCardLoader />
              <PollCardLoader />
              <PollCardLoader />
              <PollCardLoader />
              <PollCardLoader />
              <PollCardLoader />
            </Masonry>
          </div>
        ) : (
          <>
            {is_loader == false ? (
              <div className="medWikiLeft">
                <div className="full_width alert alert-danger">
                  <strong>No Poll Found</strong>
                </div>
              </div>
            ) : null}
          </>
        )}
      </>
    );
  };

  renderHonorium = () => {
    return (
      <div className="medWikiLeft">
        <div className="full_width alert alert-danger">
          <strong>Honorium Comming soon</strong>
        </div>
      </div>
    );
  };

  display_banner(datam) {
    this.setState({ banner_display: true });
  }

  render() {
    return (
      <div 
        className={
          isMobile == true
            ? "full_width wrap_body mblScreen"
            : "full_width wrap_body dskScreen"
        }
      >
        <Header history={this.props.history} page_name={pageNames} />
        <section className="full_width body_area surveyPageFixation">
          <div className="container">
            {/* {progressInstance} */}
            <div className="row surveyrow">
              <Banner
                type_id={0}
                type={"surveylist"}
                apiresponserecieved={this.display_banner.bind(this)}
                api_call_detail={1}
                api_call={0}
              />
              {this.state.banner_display ? (
                <Banner
                  type_id={0}
                  banner_position={1}
                  unmount_call={1}
                  type={"surveylist"}
                  api_call={1}
                  before_unload_call={1}
                />
              ) : null}
              <section className="text-left full_width survey_p surveyLanding_p" >
                <div className="surveyRight"  id="survey-div">
                  <div className="radius-6  col-12 surveyRight_top">
                    <ul className="font_16px font600">
                      {button_val == "poll" ? (
                        <li className="active">
                          <a
                            onClick={() => this.tabChangeHandler("poll")}
                            href="javascript:void(0);"
                          >
                            Polls
                          </a>
                        </li>
                      ) : (
                        <li>
                          <a
                            onClick={() => this.tabChangeHandler("poll")}
                            href="javascript:void(0);"
                          >
                            Polls
                          </a>
                        </li>
                      )}

                      {button_val == "quiz" ? (
                        <li className="active">
                          <a
                            onClick={() => this.tabChangeHandler("quiz")}
                            href="javascript:void(0);"
                          >
                            Quizzes
                          </a>
                        </li>
                      ) : (
                        <li>
                          <a
                            onClick={() => this.tabChangeHandler("quiz")}
                            href="javascript:void(0);"
                          >
                            Quizzes
                          </a>
                        </li>
                      )}

                      {button_val == "survey" ? (
                        <li className="active">
                          <a
                            onClick={() => this.tabChangeHandler("survey")}
                            href="javascript:void(0);"
                          >
                            Surveys
                          </a>
                        </li>
                      ) : (
                        <li>
                          <a
                            onClick={() => this.tabChangeHandler("survey")}
                            href="javascript:void(0);"
                          >
                            Surveys
                          </a>
                        </li>
                      )}

                      {button_val == "all" ? (
                        <li className="active">
                          <a
                            onClick={() => this.tabChangeHandler("all")}
                            href="javascript:void(0);"
                          >
                            All
                          </a>
                        </li>
                      ) : (
                        <li>
                          <a
                            onClick={() => this.tabChangeHandler("all")}
                            href="javascript:void(0);"
                          >
                            All
                          </a>
                        </li>
                      )}
                    </ul>
                    {/* <div className="float-right surveyHonorarium">
                                                    <div className="cmnCheckBox_row">
                                                        <input  className="form-check-input" onClick={() => this.checkBoxChangeHander()} id="Honorarium-1" type="checkbox" name="Honorarium"/>
                                                        <label className="font600 font_16px colorBlack form-check-label" for="Honorarium-1">Honorarium</label>
                                                    </div>
                                                </div> */}
                  </div>
                  {this.functionCallCallback(button_val)}
                </div>
                <div className="surveyLeft surveyLanding_left_p">
                  {this.state.banner_display ? (
                    <>
                      {isMobile ? null : (
                        <Banner
                          type_id={0}
                          banner_position={3}
                          unmount_call={0}
                          type={"surveylist"}
                          api_call={1}
                          before_unload_call={0}
                        />
                      )}
                    </>
                  ) : null}
                  <div className="full_width">
                    <h2 className="font600 font_20px colorBlack surveyLeftTTl">
                      <a href="javascript:void(0);" className="colorBlack">
                        <img src={surveyTTl} />
                        Polls &amp; Quizzes
                      </a>
                      <div class="surveyCollaps">
                        <span></span>
                      </div>
                    </h2>
                    <div className="full_width surveyLeftBoxArea">
                      <ul>
                        <li>
                          <a
                            href="javascript:void(0);"
                            onClick={this.redirect_to_user_point}
                            className="radius-6"
                          >
                            <div className="radius-100 translate_top surveyLeftBoxIcon">
                              <img
                                src={surveyLefticon1}
                                className="translate_both"
                              />
                            </div>
                            <h4 className="font500 font_16px colorBlack surveyLeftBoxTxt">
                              <span className="font700 font_30px">
                                {this.state.user_point == "" ||
                                this.state.user_point == "NAN" ||
                                this.state.user_point == "nan" ||
                                this.state.user_point == undefined
                                  ? 0
                                  : this.state.user_point}
                              </span>{" "}
                              {this.pointTextValidation(this.state.user_point)}
                            </h4>
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0);"
                            onClick={this.redirect_to_completed_list}
                            className="radius-6"
                          >
                            <div className="radius-100 translate_top surveyLeftBoxIcon">
                              <img
                                src={surveyLefticon2}
                                className="translate_both"
                              />
                            </div>
                            <h4 className="font500 font_16px colorBlack surveyLeftBoxTxt">
                              <span className="font700 font_30px">
                                {this.state.completed_count == ""
                                  ? 0
                                  : this.state.completed_count}
                              </span>{" "}
                              Completed
                            </h4>
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0);"
                            onClick={this.redirect_to_incompleted_list}
                            className="radius-6"
                          >
                            <div className="radius-100 translate_top surveyLeftBoxIcon">
                              <img
                                src={surveyLefticon3}
                                className="translate_both"
                              />
                            </div>
                            <h4 className="font500 font_16px colorBlack surveyLeftBoxTxt">
                              <span className="font700 font_30px">
                                {this.state.incomplete_count == ""
                                  ? 0
                                  : this.state.incomplete_count}
                              </span>{" "}
                              Pending
                            </h4>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {this.state.banner_display ? (
                    <>
                      {isMobile ? null : (
                        <Banner
                          type_id={0}
                          banner_position={4}
                          unmount_call={0}
                          type={"surveylist"}
                          api_call={1}
                          before_unload_call={0}
                        />
                      )}
                    </>
                  ) : null}
                </div>
              </section>
            </div>
          </div>
        </section>
        <Footer history={this.props.history} />
      </div>
    );
  }
}
export default Spq;
