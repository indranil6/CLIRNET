import React from 'react';
import Slider from "react-slick";
import ssnTopBgGraphic from '../../mobImages/ssnTopBgGraphic.png';
import ssnTypeExpressCME from '../../mobImages/typeExpressCME.png';
import ssnTypeMasterCast from '../../mobImages/typeMasterCast.png';
import AppConfig from '../config/config.js';
import { reactLocalStorage } from 'reactjs-localstorage';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import dskSlideSessionBg from '../../desktopImages/dskSlideSessionBg.png';
import blackArrow from '../../desktopImages/blackArrow.png';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import $ from 'jquery';
import { InlineShareButtons } from 'sharethis-reactjs';
import likeIcon from '../../desktopImages/like-black.png';
import likeIconActive from '../../desktopImages/like-active.png';
import vaultIcon from '../../desktopImages/vault-black.png';
import vaultIconActive from '../../desktopImages/vault-active.png';
import Share from "../Common/Share.jsx";

const meetConfig = {
    meetingNumber: '',
    platform_name: '',
    userName: '',
    userEmail: '',
    passWord: '',
};

var deafult_popover_index = -1;
const url = AppConfig.apiLoc;
var session_list_data = [];

const mblSessionClient = {
    dots: false,
    infinite: true,
    speed: 300,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    // adaptiveHeight: true,
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
        let temp = this;

        $(document).on("click", function (e) {
            //popover dissapear func
            let ggg = $(e.target).parents('.popoverExtra').length;
            if (ggg == 0 && !$(e.target).hasClass('popoverExtra')) {
                deafult_popover_index = -1;
                temp.refresh();
            }
        });

    }

    redirectToSessionDetails(session_id, live_mode) {
        this.props.history.push({
            pathname: '/Reservesession/' + session_id + ''
        })
    }
    getSessionSliderData = () => {
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
                this.refresh()
            }
        }).catch((error) => {
            //console.log("Error"+error);
        });
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

    JoinMeeting(url) {
        var win = window.open(url, '_blank');
        if (win) {
            //Browser has allowed it to be opened
            win.focus();
        } else {
            //Browser has blocked it
            alert('Please allow popups for this website');
        }
    }

    sessionCardMenuPopover = (val, ind) => {
        return (
            <div className="dskDotsMenu dskDotsCircle dskDotsMenuSssnCard" data-toggle="popover" data-trigger="focus">
                <div>
                    <span className="dskDotsMenu-dots"></span>
                    <span className="dskDotsMenu-dots"></span>
                    <span className="dskDotsMenu-dots"></span>
                </div>
                <Popover id="popover-basic" placement="bottom-end" className="dskDotsMenuSettings popoverExtra">
                    <Popover.Content>
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

    render() {
        var dskSlideTop = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            // adaptiveHeight: true,
            autoplay: true,
            afterChange: () => {
                if (deafult_popover_index != -1) {
                    deafult_popover_index = -1;
                    this.refresh();
                }
            }
        };
        var dskSessionClient = {
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
        return (
            (session_list_data != null && session_list_data.length > 0) ?
                <section className="full_width dskSlideSession">
                    <Slider {...dskSlideTop} className="full_width text-left dskSlideTop">
                        {(session_list_data != null && session_list_data.length > 0) ?
                            session_list_data.map((val, ind) => (
                                <div className="text-left dskSlideSessionCard">
                                    <div className="full_width radius-6 dskSlideSsnCard_link" style={{ "background-color": val.color }}>
                                        <img src={dskSlideSessionBg} className="object_fit_cover dskSlideBgGraphic" />
                                        <div className="overlay"></div>
                                        <div className="full_width dskSlideIn">
                                            <div className="full_width dskSlideTop">
                                                <div className="row align-items-center justify-content-between">
                                                    <div className="colorWhite font_14px font600 dskSessionType">
                                                        {
                                                            (val.category_image == null || val.category_image == '') ?
                                                                null :
                                                                <span className="radius-100 dskSessionTypeIcon">
                                                                    <img src={val.category_image} className="translate_both" />
                                                                </span>
                                                        }
                                                        {val.ms_cat_name}
                                                    </div>

                                                    <div className="dskSessionTopRight">
                                                        <div className="dskSessionTime">
                                                            {(val.live_mode !== true) ?
                                                                <h4 className="colorWhite font_14px font600">{val.start_datetime} | {val.display_date}</h4>
                                                                : null}
                                                            {(val.live_mode === true) ?
                                                                <div className="full_width mblSessionLive">
                                                                    <div className="liveAni">
                                                                        <span className="aniBx"></span>
                                                                        <span className="aniBx"></span>
                                                                        <span className="aniBx"></span>
                                                                    </div>
                                                                    <h4 className="colorWhite font_14px font600">Live</h4>
                                                                </div>
                                                                : null}
                                                        </div>
                                                        {(deafult_popover_index == ind) ? this.sessionCardMenuPopover(val, ind) : null}
                                                        {(deafult_popover_index != ind) ?
                                                            <div onClick={() => { this.onMenuClick(ind) }} className="dskDotsMenu dskDotsCircle dskDotsMenuSssnCard popoverExtra">
                                                                <span className="dskDotsMenu-dots"></span>
                                                                <span className="dskDotsMenu-dots"></span>
                                                                <span className="dskDotsMenu-dots"></span>
                                                            </div> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="full_width dskSlideSsnBody">
                                                <div className="dskSlideSsnBodyLeft">
                                                    <h3 className="font_22px font600 colorWhite dskSlideSsnBodyLeftTtl" style={{ "cursor": "pointer" }} onClick={() => { this.onViewSessionClick(val) }}>{(val.session_topic == '' || val.session_topic == null) ? null : val.session_topic}</h3>
                                                    <div className="clearfix"></div>
                                                    <div className="full_width dskSlideSsnDoc">
                                                        {(val.session_doctor_entities.length > 0) ?
                                                            val.session_doctor_entities.map((val, ind) => (
                                                                <div className="full_width dskSlideSsnDocRow">
                                                                    <div className="row align-items-center">
                                                                        <div className="radius-6 dskSlideSsnDocPic">
                                                                            <div className="radius-6 dskSlideSsnDocPicBg translate_both"></div>
                                                                            <img src={val.session_doctor_image} alt="Vault" className="object_fit_cover" />
                                                                        </div>
                                                                        <div className="full_width dskSlideSsnDocTtl">
                                                                            <h4 className="colorWhite font_18px font600">{val.session_doctor_name}</h4>
                                                                            <span className="colorWhite font_14px">{val.DepartmentName}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )) : null}
                                                    </div>
                                                </div>
                                                <div className="dskSlideSsnBodyRight">
                                                    {/* {
                           (val.live_mode)? */}
                                                    <div className="colorWhite font_20px font600 radius-40 dskSlideSsn_a" style={{ "background-color": val.color }} onClick={() => { this.onViewSessionClick(val) }}>
                                                        <span>Join Now <img src={blackArrow} /></span>
                                                    </div>
                                                    {/*:null } */}

                                                    <div className="clearfix"></div>
                                                    <Slider {...dskSessionClient} className="dskSessionClient dskSlideSsnClient">
                                                        {(val.sponsor_logo !== null || val.sponsor_logo == '') ?
                                                            val.sponsor_logo.split(',').map((val, ind) => (
                                                                <div className="dskSessionClientItem">
                                                                    <img src={val} />
                                                                </div>
                                                            )) : null
                                                        }
                                                    </Slider>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>)) : null}
                    </Slider>
                </section> : null
        );
    }
}
export default SessionSlider;