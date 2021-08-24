import React from 'react';
import Slider from "react-slick";
import ssnTopBgGraphic from '../../mobImages/ssnTopBgGraphic.png';
import ssnTypeExpressCME from '../../mobImages/typeExpressCME.png';
import ssnTypeMasterCast from '../../mobImages/typeMasterCast.png';
import AppConfig from '../config/config.js';
import { reactLocalStorage } from 'reactjs-localstorage';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import $ from 'jquery';
import { InlineShareButtons } from 'sharethis-reactjs';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Share from "../Common/Share.jsx";


const popover = (
    <Popover id="popover-basic">
        <Popover.Title as="h3">Popover right</Popover.Title>
        <Popover.Content>
            And here's some <strong>amazing</strong> content. It's very engaging.
            right?
        </Popover.Content>
    </Popover>
);

const url = AppConfig.apiLoc;
var session_list_data = [];
var deafult_popover_index = -1;
const meetConfig = {
    meetingNumber: '',
    platform_name: '',
    userName: '',
    userEmail: '',
    passWord: '',
};

const mblSessionClient = {
    dots: false,
    infinite: true,
    speed: 300,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
    autoplay: true,
    fade: true,
    cssEase: 'linear'
};
const mblSSnCard = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: '12%',
    autoplay: true,
    responsive: [
        {
            breakpoint: 640,
            settings: {
                centerPadding: '6%',
            }
        },
        {
            breakpoint: 360,
            settings: {
                centerPadding: '5%',
            }
        }
    ]
};

class SessionSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false
        };
        session_list_data = []
    }

    refresh = () => {
        this.setState({ "display": !this.state.display });
    }

    componentDidMount() {
        session_list_data = [];
        this.getSessionSliderData();
        let temp = this

        $(document).on("click", function (e) {
            //popover dissapear func
            let ggg = $(e.target).parents('.popoverExtra').length;
            if (ggg == 0 && !$(e.target).hasClass('popoverExtra')) {
                deafult_popover_index = -1;
                temp.refresh();
            }
        });
    }


    getUserDetail() {
        let first_name = reactLocalStorage.get('@ClirnetStore:first_name', true)
        let last_name = reactLocalStorage.get('@ClirnetStore:last_name', true)
        let email = reactLocalStorage.get('@ClirnetStore:email', true);
        if (first_name == 'true' || first_name == 'undefined') {
            first_name = ''
        }
        if (last_name == 'true' || last_name == 'undefined') {
            last_name = ''
        }
        let full_name = 'Dr. ' + first_name + ' ' + last_name
        if (email == 'true' || email == 'undefined') {
            email = first_name + '@Clirnet.com'
        } else {
            meetConfig.userEmail = email
        }
        meetConfig.userName = full_name
    }


    getMeetingDetails(session_id) {
        ToastsStore.error("Please wait")
        fetch(url + 'knwlgmastersession/getMeetingDetailsBySessionID?id=' + session_id, {
            method: 'GET',
            headers: {
                'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
                'version': 'rjsw 1.1.1'
            },
        }).then((response) => response.json()).then((responseJson) => {
            let status_code = responseJson.status_code;
            let responseData = responseJson.data;
            let session_status;
            if (status_code == 200) {
                meetConfig.platform_name = responseData.platform_name;
                meetConfig.meetingNumber = responseData.meeting_login_id;
                meetConfig.passWord = responseData.meeting_login_password;
                session_status = responseData.session_status;
                if (meetConfig.meetingNumber != null || meetConfig.meetingNumber != '' || meetConfig.meetingNumber != undefined && meetConfig.userEmail != null || meetConfig.userEmail != '' || meetConfig.userEmail != undefined && meetConfig.userName != null || meetConfig.userName != '') {
                    let zoom_url = 'https://developer.clirnet.com/join_webinar/#/Zoom/' + meetConfig.meetingNumber + '/' + meetConfig.userEmail + '/' + meetConfig.userName//http://localhost:3001/join_webinar/#/Zoom/4858799231/sumit@mail.com/Sumit
                    this.JoinMeeting(zoom_url)
                }
                else {
                    ToastsStore.error("Sorry! unable to create meeting link")
                }
            } else {
                ToastsStore.error("unable to fetch meeting details! check network")
            }
            if (session_status == '2' && session_status != 'undefined') {

            } else {
                ToastsStore.error("This session is not live now")
            }
        }).catch((error) => {
            //console.log("Error"+error);
        });
    }

    onViewSessionClick(val) {
        if (val.live_mode == true && val.participant_id != null) {
            this.props.history.push({
                pathname: '/LiveSessionDetails/' + val.session_id + ''
            })
        } else {
            this.props.history.push({
                pathname: '/Reservesession/' + val.session_id + ''
            })
        }
    }

    getSessionSliderData = () => {
        let temp = this;
        fetch(url + 'dashboard/session', {
            method: 'GET',
            headers: {
                'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
                'version': 'rjsw 1.1.1'
            }
        }).then((response) => response.json()).then((responseJson) => {
            let status_code = responseJson.status_code;
            if (status_code == 200) {
                let responseData = responseJson.data;
                session_list_data = responseData;
                responseData.map((r, index) => {
                    //console.log("live mode"+r.live_mode)
                })
                this.refresh();  
                setTimeout(function () { temp.setJqueryOnCard(session_list_data.length) }, 500);
               
            }
            setTimeout(function () {
                if (session_list_data.length == 1) {
                    $(".mblSessionCard").addClass("mblSingleCard");
                } else {
                    $(".mblSessionCard").removeClass("mblSingleCard");
                }
            }, 300);
        }).catch((error) => {
            //console.log("Error"+error);
        });
    }

    sessionCardMenuPopover = (val, ind) => {
        return (
            <div className="mblDotsMenu mblDotsCircle mblDotsMenuSssnCard" data-toggle="popover" data-trigger="focus">
                <div>
                    <span className="mblDotsMenu-dots"></span>
                    <span className="mblDotsMenu-dots"></span>
                    <span className="mblDotsMenu-dots"></span>
                </div>
                <Popover id="popover-basic" placement="bottom-end" className="mblDotsMenuSettings popoverExtra">
                    <Popover.Content>
                        {/* <a href="javascript:void(0)" className="dskDotsMenuSettingsIcon active" >
                      <span>
                      <img src={likeIcon} alt="Like"  className="translate_both dskGrLeftShareImg" />
                      <img src={likeIconActive} alt="Like"  className="translate_both dskGrLeftShareImgActive" />
                      </span>
                      Like
                  </a>
                  <a href="javascript:void(0)" className="dskDotsMenuSettingsIcon">
                      <span>
                  <img src={vaultIcon} alt="Vault" className="translate_both dskGrLeftShareImg" />
                  <img src={vaultIconActive} alt="Vault" className="translate_both dskGrLeftShareImgActive" />
                  </span>
                      Vault
                  </a> */}
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
                                description: val.session_topic + "...",       // (defaults to og:description or twitter:description)
                                title: val.category_name,            // (defaults to og:title or twitter:title)
                                message: '',     // (only for email sharing)
                                subject: '',  // (only for email sharing)
                                username: 'Medwiki view' // (only for twitter sharing)
                            }} /> */}
                        {/* <a href="javascript:void(0)" className="dskDotsMenuNotRelevant">
                Not Relevant for me
            </a> */}
            <Share customClass="dskCphTtlExtra"
                            data={{
                                title: val.session_topic,
                                text: val.session_description,
                                url: val.deeplink,
                            }}
                        />
                    </Popover.Content>
                </Popover>
            </div>
        )
    }

    onMenuClick(ind) {
        deafult_popover_index = ind;
        this.refresh()
    }

    setJqueryOnCard(length) {
        let count = 0
        if (length > 0) {
          count = length - 4
        }
        $(".dskGrMstrDocRowExtra").each(function (i) {
          if (parseInt($(this).find(".dskGrMstrDocBoxSsn").length) != 1) {
            $(this).find(".dskGrMstrDocBoxSsn").addClass("mblGrMstrDocPopShow");
          }
          else {
            $(this).find(".dskGrMstrDocBoxSsn").removeClass("mblGrMstrDocPopShow");
          }
        });

          $(document).on('click', '.dskGrMstrDocPopShow .dskGrMstrDocBoxIn', function () {
            $('.dskGrMstrDocBoxSsn').removeClass("mblGrMstrDocPopShowActive");
            $(this).parent().addClass("mblGrMstrDocPopShowActive");
            $(".dskGrMstrDocProfile").removeClass("mblGrMstrDocProfileShow").fadeOut(300);
            $(this).find('.dskGrMstrDocProfile').addClass('mblGrMstrDocProfileShow').fadeIn(300);
            $(this).parent().addClass("mblGrMstrDocPopShowActive");
          })
    
        $( ".dskGrMstrDocRowExtra" ).each(function( index ) {
            let countcir=$(this).find(".dskGrMstrDocProfileSsn").length;  
             $(this).find(".dskGrMstrDocBoxSsn:nth-child(5)").find(".mblGrMstrDocProfile").remove();
             $(this).find(".dskGrMstrDocBoxSsn:nth-child(5)").find(".dskGrMstrDocBoxInPicSsn").append("<div class='overlay'></div><span id='view-master-doctor' class='dskGrMstrDocCount plus_icon' style='cursor: default;'>+"+(countcir-5)+"</span>");
        });

        var that = this;
       
      }

    // setJqueryOnCard(length) {
    //     let count = 0
    //     if (length > 0) {
    //       count = length - 4
    //     }
    //     $(".dskGrMstrDocRowExtra").each(function (i) {
    //       if (parseInt($(this).find(".dskGrMstrDocBoxSsn").length) != 1) {
    //         $(this).find(".dskGrMstrDocBoxSsn").addClass("dskGrMstrDocPopShow");
    //       }
    //       else {
    //         $(this).find(".dskGrMstrDocBoxSsn").removeClass("dskGrMstrDocPopShow");
    //       }
    //     });

    //       $(document).on('click', '.dskGrMstrDocPopShow .dskGrMstrDocBoxIn', function () {
    //         $('.dskGrMstrDocBoxSsn').removeClass("dskGrMstrDocPopShowActive");
    //         $(this).parent().addClass("dskGrMstrDocPopShowActive");
    //         $(".dskGrMstrDocProfile").removeClass("dskGrMstrDocProfileShow").fadeOut(300);
    //         $(this).find('.dskGrMstrDocProfile').addClass('dskGrMstrDocProfileShow').fadeIn(300);
    //         $(this).parent().addClass("dskGrMstrDocPopShowActive");
    //       })
    
    //     $( ".dskGrMstrDocRowExtra" ).each(function( index ) {
    //         let countcir=$(this).find(".dskGrMstrDocProfileSsn").length;
    //          $(this).find(".dskGrMstrDocBoxSsn:nth-child(5)").find(".dskGrMstrDocProfile").remove();
    //          $(this).find(".dskGrMstrDocBoxSsn:nth-child(5)").find(".dskGrMstrDocBoxInPicSsn").append("<div class='overlay'></div><span id='view-master-doctor' class='dskGrMstrDocCount plus_icon' style='cursor: default;'>+"+(countcir-5)+"</span>");
    //     });

    //     var that = this;
    //     // $(".plus_icon").click(function () {
    //     //   let key_element = parseInt($(this).parent().parent().parent().parent().parent().find('.hidden_span').text());
    //     //   slider_active_elements.map((val, ind) => (
    //     //     slider_active_elements[ind] = false
    //     //   ));
    //     //   slider_active_elements[key_element] = true;
    //     //   // that.refresh()
    //     // });
    //   }

    render() {
        return (
            <section className="full_width mblSession">
                <Slider {...mblSSnCard} className="full_width text-left mblSessionSlider">
                    {(session_list_data != null && session_list_data.length > 0) ?
                        session_list_data.map((val, ind) => (
                            <div className="mblSessionCard">
                                <div className="full_width radius-6 mblSessionCard_link">
                                    <div className="full_width mblSessionTopArea" style={{ "background-color": val.color }}>
                                        <img src={ssnTopBgGraphic} className="object_fit_cover ssnTopBgGraphic" />
                                        <div className="overlay"></div>
                                        <div className="full_width mblSessionTopIn">
                                            <div className="full_width mblSessionTop">
                                                <div className="row align-items-center justify-content-between">
                                                    <div className="colorWhite font_14px font700 mblSessionType">
                                                        {
                                                            (val.category_image == null || val.category_image == '') ?
                                                                null :
                                                                <span className="radius-100 mblSessionTypeIcon">
                                                                    <img src={val.category_image} className="translate_both" />
                                                                </span>
                                                        }
                                                        {val.ms_cat_name}
                                                    </div>
                                                    <div className="mblSessionTopRight">
                                                        <div className="mblSessionTime">
                                                            {(val.live_mode !== true) ?
                                                                <h4 className="colorWhite font_14px font700">{val.start_datetime} | {val.display_date}</h4>
                                                                : null}
                                                            {(val.live_mode === true) ?
                                                                <div className="full_width mblSessionLive">
                                                                    <div className="liveAni">
                                                                        <span className="aniBx"></span>
                                                                        <span className="aniBx"></span>
                                                                        <span className="aniBx"></span>
                                                                    </div>
                                                                    <h4 className="colorWhite font_14px font700">Live</h4>
                                                                </div>
                                                                : null}
                                                        </div>
                                                        {(deafult_popover_index == ind) ? this.sessionCardMenuPopover(val, ind) : null}
                                                        {(deafult_popover_index != ind) ?
                                                            <div onClick={() => { this.onMenuClick(ind) }} className="mblDotsMenu mblDotsCircle mblDotsMenuSssnCard popoverExtra">
                                                                <span className="mblDotsMenu-dots"></span>
                                                                <span className="mblDotsMenu-dots"></span>
                                                                <span className="mblDotsMenu-dots"></span>
                                                            </div> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="clearfix"></div>
                                            <h3 className="colorWhite font_18px font600">{(val.session_topic !== '' || val.session_topic !== null) ? val.session_topic : null}</h3>
                                        </div>
                                    </div>
                                    <div className="full_width mblSessionBttmArea">
                                        {/* <div className="full_width mblSessionDocArea">
                                            {(val.session_doctor_entities.length > 0) ?
                                                val.session_doctor_entities.map((val, ind) => (
                                                    <div className="full_width radius-6 mblSessionDocRow">
                                                        <div className="row align-items-center">
                                                            <div className="radius-100 mblSessionDocPic">
                                                                <img src={val.session_doctor_image} alt="Vault" className="object_fit_cover" />
                                                            </div>
                                                            <div className="full_width mblSessionDocTtl">
                                                                <h4 className="colorBlack font_18px font600">{val.session_doctor_name}</h4>
                                                                <span className="font_12px colorGrey">{val.DepartmentName}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )) : null}
                                        </div> */}

                                        <div className="row dskGrMstrDocRow dskGrMstrDocRowExtra">
                                        {(val.session_doctor_entities.length > 0) ?
                                            val.session_doctor_entities.map((val, ind) => (
                                            <div className="dskGrMstrDocBox dskGrMstrDocBoxSsn">
                                                <div className="full_width dskGrMstrDocBoxIn">
                                                    <div className="row align-items-center">
                                                        <div className="radius-100 dskGrMstrDocBoxInPic dskGrMstrDocBoxInPicSsn">
                                                            <img src={val.session_doctor_image} className="object_fit_cover" />
                                                        </div>
                                                        <div className="font_12px colorGrey font400 dskGrMstrDocBoxContent">
                                                            <h4 className="font_14px colorBlack font600">{val.session_doctor_name}</h4>
                                                            <p>{val.DepartmentName}</p>
                                                        </div>
                                                    </div>
                                                    <div className="radius-6 dskGrMstrDocProfile dskGrMstrDocProfileSsn">
                                                        <img src={val.session_doctor_image} className="object_fit_cover" />
                                                        <div className="overlay"></div>
                                                        <div className="full_width font_12px colorWhite font400 dskGrMstrDocProfileTxt">
                                                            <h4 className="font_14px colorWhite font600">{val.session_doctor_name}</h4>
                                                            <p>{val.DepartmentName}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            )) : null}

                                            {/* <div className="dskGrMstrDocBox">
                                                <div className="full_width dskGrMstrDocBoxIn">
                                                    <div className="row align-items-center">
                                                        <div className="radius-100 dskGrMstrDocBoxInPic">
                                                            <img src="https://doctor.clirnet.com/knowledge/uploads/docimg/thumb/75_75_B657eFa9ff9723eEEF5b453654.jpg" className="object_fit_cover" />
                                                        </div>
                                                        <div className="font_12px colorGrey font400 dskGrMstrDocBoxContent">
                                                            <h4 className="font_14px colorBlack font600">Prof. Dr. Prantar  Chakrabarti</h4>
                                                            <p>Internal Medicine</p>
                                                        </div>
                                                    </div>
                                                    <div className="radius-6 dskGrMstrDocProfile">
                                                        <img src="https://doctor.clirnet.com/knowledge/uploads/docimg/thumb/75_75_B657eFa9ff9723eEEF5b453654.jpg" className="object_fit_cover" />
                                                        <div className="overlay"></div>
                                                        <div className="full_width font_12px colorWhite font400 dskGrMstrDocProfileTxt">
                                                            <h4 className="font_14px colorWhite font600">Prof. Dr. Prantar  Chakrabarti</h4>
                                                            <p>Internal Medicine</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>

                                        <div className="full_width mblSessionbtm">
                                            <div className="text-uppercase colorWhite font_14px fontExo font600 radius-6 mblSessionbtm_a" style={{ "background-color": val.color }}>
                                                <span onClick={() => { this.onViewSessionClick(val) }}>View Session</span>
                                            </div>
                                            <Slider {...mblSessionClient} className="mblSessionClient">
                                                {(val.sponsor_logo !== null || val.sponsor_logo == '') ?
                                                    val.sponsor_logo.split(',').map((val, ind) => (
                                                        <div className="mblSessionClientItem">
                                                            <img src={val} />
                                                        </div>
                                                    )) : null
                                                }
                                            </Slider>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : null
                    }
                </Slider>
            </section>
        );
    }
}
export default SessionSlider;