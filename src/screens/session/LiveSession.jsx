import React, { useState, useEffect } from 'react';
import './css/common.css';
import './css/style.css';
import './css/responsive.css';
import $ from 'jquery';
import Slider from "react-slick";
import mainBackground from './images/mainBg.png';
import exit from './images/exit.png';
import logo from './images/logo.png';
import onWebinerBannerGraph from './images/onWebinerBannerGraph.png';
import send from './images/send.png';
import sanofi_Logo from './images/sanofi_Logo.png';
require('jquery-mousewheel');
import mCustomScrollbar from 'malihu-custom-scrollbar-plugin';
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css';
import VideoPlayer from './VideoPlayer.jsx';
import * as utils from '../session/utils'
import Rectangle from '../LoadingPlaceholders/Rectangle';
import SessionDoctorCard from './SessionDoctorCard.jsx';
import CommentsCard from './CommentsCard';
import ReactHtmlParser from "react-html-parser";
import FeedbackModal from './FeedbackModal.jsx';

export default function LiveSession(props) {
    const [sessionId, setSessionId] = useState(props.match.params.id);
    const [sessionDoctorList, setSessionDoctorList] = useState([]);
    const [sessionTopic, setSessionTopic] = useState('');
    const [sessionDescription, setSessionDescription] = useState('');
    const [disclaimer, setDisclaimer] = useState('');
    const [dataFetched, setDataFetched] = useState(false);
    const [commentsData, setCommentsData] = useState([]);
    const [commentsInput, setCommentsInput] = useState("");
    const [vendorId, setVendorId] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [isIframe, setIsIframe] = useState(false); 

 
    useEffect(() => {

        $(".videoComments").mCustomScrollbar({ theme: 'dark' }).mCustomScrollbar("scrollTo", "last", { scrollInertia: 0 });
        $(".p_videoBox").removeClass('videoRightShow');
        $(".video_collapse").click(function () {
            $(".p_videoBox").toggleClass('videoRightShow');
        });

        setDataFetched(false);
        utils.getSessionDetails(props.match.params.id).then(response => {
            setDataFetched(true);
            if (response.status_code == 200) {
                parseResponseJson(response.data);
            } else {
                //   utils.redirectToLogin(props.history)
            }
        });

        utils.getComments(sessionId).then(response => {
            if (response.status_code == 200) {
                setCommentsData(response.data)
            } else {

            }
        });



        const evtSource = new EventSource("https://developer.clirnet.com/knowledge/ajax/stream");

        evtSource.onmessage = function (event) {
            // const newElement = document.createElement("li");
            // const eventList = document.getElementById("list");

            // newElement.textContent = "message: " + event.data;

            console.log("onmessage::" + event.data)
        }

        evtSource.addEventListener("ping", function (event) {
            // const newElement = document.createElement("li");
            // const eventList = document.getElementById("list");
            const time = JSON.parse(event.data).time;
            // newElement.textContent = "ping at " + time;
            // eventList.appendChild(newElement);

            console.log("ping::", time)
        });


        return () => {
            // alert('componentWillUnmount');
        }
    }, []);



    const onInputChange = (val) => {
        console.log(val.key)
        setCommentsInput(val.target.value);
    }

    const onSendButtonClick = () => {
        const commentsData = {
            comment: commentsInput,
            session_id: sessionId
        }
        utils.submitComments(commentsData).then(response => {
            setDataFetched(true);
            if (response.status_code == 200) {
                setCommentsInput('')

                utils.getComments(sessionId).then(response => {
                    if (response.status_code == 200) {
                        setCommentsData(response.data)
                    } else {

                    }
                });

            } else {

            }
        });

    }


    const parseResponseJson = (data) => {
        let sessionData = data[0];

        if (sessionData.vendor_id && sessionData.vendor_id == 5 || sessionData.vendor_id == 0) {
            setVendorId(sessionData.vendor_id);
            setVideoUrl(sessionData.video_embed_src);
        } else {
            // alert("invalid vendor"+sessionData.vendor_id);
        }

        if (sessionData.video_embed_src) {
            setIsIframe(sessionData.video_embed_src.includes("<iframe"))
        }
        setSessionTopic(sessionData.session_topic);
        setSessionDoctorList(sessionData.session_doctor_entities);
        setSessionDescription(sessionData.session_description);
        setDisclaimer(sessionData.disclaimer);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSendButtonClick()
        }
    }

    const liveDocSlider = {
        dots: false,
        infinite: true,
        speed: 300,
        autoplaySpeed: 2000,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        adaptiveHeight: true,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const bgColor1 = { backgroundColor: "#0856cb", }
    const borderColor1 = { borderColor: "#0856cb", }
    const bgColor2 = { backgroundColor: "#07cbc4", }

    return (
        <div>
            <section className="full_width video-p">
                <section className="full_width p_videoMain">
                    <div className="full_width onWebinerHeader">
                        <a className="onWebinerHeaderLogoLeft" href="javascript:void(0)">
                            <img src={logo} alt="logo" />
                        </a>
                        <a href="javascript:void(0)" className="onWebinerHeaderLogo">
                            <img src={sanofi_Logo} alt="logo" />
                        </a>
                    </div>
                    <section className="full_width onWebinerBanner">
                        <div className="full_width onWebinerBannerIn" style={bgColor1}>
                            <img src={mainBackground} className="object_fit_cover live_bannerBg" alt="background" />
                            <div className="onWebinerBannerGraph">
                                <img src={onWebinerBannerGraph} alt="background" />
                            </div>
                        </div>

                        <div className="full_width live_videoBoxMain_n">
                            <div className="live_container">
                                {/* Ads------------- */}
                                <section className="full_width adsArea">
                                    <div className="full_width adsFrame">
                                        <div class="full_width text-center add_area_top top_banner_div view_image_top">
                                            <a className="banner_href_top"
                                                href="javascript:void(0)"
                                            >
                                                <h4 className="font_10px font500 colorBlack text-right Ad_ttl">
                                                    Ad
                                                </h4>
                                                <img src="https://storage.googleapis.com/medwiki/43_server/images/1626851381_2021-07-14.jpg?v=852" alt="banner" />
                                            </a>
                                        </div>
                                    </div>
                                </section>
                                {/* Ads------------- */}

                                <a href="javascript:void(0)"
                                    className="font_14px font600 p_videoExit radius-6">
                                    <span>Exit</span>
                                    <img src={exit} alt="icon" /></a>
                                <div className="full_width radius-6 live_videoBox">
                                    <div className="p_videoBoxPlay transition6s"> 
                                        {vendorId && isIframe && (vendorId == 5 || vendorId == 0) ? ReactHtmlParser(videoUrl) : <VideoPlayer data={{ src: videoUrl}} />}
                                    </div>
                                    <div className="livevideo_right transition6s">
                                        <div className="full_width video_rightIn">
                                            <div className="full_width videoCommentsTab">
                                                <div className="full_width colorBlack font_12px videoTab_ttl bgColorWhite">
                                                    <h2 className="font_16px font600 colorBlack">Post Your Question(s) Here:</h2>
                                                    <p>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    </p>
                                                </div>
                                                <div className="col-12 videoComments">
                                                    <div className="row align-items-end">
                                                        {commentsData && commentsData.length > 0 ?
                                                            commentsData.map((val, ind) =>
                                                                <CommentsCard name="Sumit" comments={val.comment} />
                                                            ) : null
                                                        }
                                                        {/* <CommentsCard name="Sumit" comments="Lorem Ipsum is simply dummy text of the printing andtypesetting industry"/> */}

                                                        <div className="full_width videoSurveyTab">
                                                            <div className="full_width videoSurveyIn">
                                                                <div className="full_width videoSurveyRow">
                                                                    <h2 className="font_14px font600 colorBlack videoSurveyQsn">The
                                                                        effective treatment of hepatic encephalopathy in compensated
                                                                        cirrhosis
                                                                        involves only administration of Lactulose or Lactitol. compensated
                                                                        cirrhosis
                                                                        involves only administration of Lactulose or Lactitol.</h2>
                                                                    <div className="clearfix"></div>
                                                                    <div className="full_width">
                                                                        <form>
                                                                            <div className="full_width">
                                                                                <div className="checkbox_custom_row">
                                                                                    <input type="radio" name="qs1" id="time1"
                                                                                        className="checkbox_custom" />
                                                                                    <label for="time1"
                                                                                        className="font_14px font500 checkbox_custom_label">Strongly
                                                                                        Agree</label>
                                                                                </div>
                                                                            </div>
                                                                            <div className="full_width">
                                                                                <div className="checkbox_custom_row">
                                                                                    <input type="radio" name="qs1" id="time2"
                                                                                        className="checkbox_custom" />
                                                                                    <label for="time2"
                                                                                        className="font_14px font500 checkbox_custom_label">Agree</label>
                                                                                </div>
                                                                            </div>
                                                                            <div className="full_width">
                                                                                <div className="checkbox_custom_row">
                                                                                    <input type="radio" name="qs1" id="time3"
                                                                                        className="checkbox_custom" />
                                                                                    <label for="time3"
                                                                                        className="font_14px font500 checkbox_custom_label">Neither
                                                                                        Agree nor Disagree</label>
                                                                                </div>
                                                                            </div>
                                                                            <div className="full_width">
                                                                                <div className="checkbox_custom_row">
                                                                                    <input type="radio" name="qs1" id="time4"
                                                                                        className="checkbox_custom" />
                                                                                    <label for="time4"
                                                                                        className="font_14px font500 checkbox_custom_label">Disagree</label>
                                                                                </div>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="videoFrm">
                                                    {/* <form id="addQuestionForm" name="addQuestionForm" action="" method="post"> */}
                                                    <input
                                                        type="text"
                                                        name="comment"
                                                        id="comment"
                                                        placeholder="Type your question"
                                                        className="videoFrmInput"
                                                        onChange={onInputChange}
                                                        onKeyDown={handleKeyDown}
                                                        value={commentsInput}
                                                    />
                                                    <button
                                                        type="submit"
                                                        id="submit"
                                                        name="submit"
                                                        className="videoFrmSend"
                                                        onClick={onSendButtonClick}
                                                        style={bgColor2}>
                                                        <img src={send} className="translate_both" /></button>
                                                    {/* </form> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div class="full_width text-left p_videoBtm">
                        <div class="live_container">
                            {dataFetched && sessionTopic ? <h2 class="colorBlack font_20px font600 p_videoTtl">{sessionTopic}</h2> : !dataFetched ? <Rectangle width="200" height="19" /> : null}
                            {dataFetched && sessionDescription ?
                                <div class="full_width colorBlack font_16px">
                                    <p>{sessionDescription}</p>
                                </div> : !dataFetched ? <Rectangle width="500" height="10" /> : null}
                            {sessionDoctorList && sessionDoctorList.length > 0 ?
                                <Slider {...liveDocSlider} className="full_width liveSsnDocSlider">
                                    {sessionDoctorList.map((val, ind) => <SessionDoctorCard data={val} />)}
                                </Slider> : null}
                            <div class="clearfix"></div>
                            {/* Ads------------- */}
                            <section className="full_width adsArea">
                                <div className="full_width adsFrame">
                                    <div class="full_width text-center add_area_top top_banner_div view_image_top">
                                        <a className="banner_href_top"
                                            href="javascript:void(0)"
                                        >
                                            <h4 className="font_10px font500 colorBlack text-right Ad_ttl">
                                                Ad
                                            </h4>
                                            <img src="https://storage.googleapis.com/medwiki/43_server/images/1626851381_2021-07-14.jpg?v=852" alt="banner" />
                                        </a>
                                    </div>
                                </div>
                            </section>
                            {/* Ads------------- */}
                        </div>
                    </div>
                    <div className="full_width text-left liveSsnFttr">
                        {disclaimer ?
                            <div className="live_container">
                                <div className="full_width font_12px colorWhite font500 december">
                                    <h6 className="font_12px font600"> Disclaimer</h6>
                                    <p>{disclaimer}</p>
                                </div>
                                <div className="full_width poweredBy"> <img src={logo} alt="logo" /></div>
                            </div> : null}
                    </div>
                    <div className="full_width bottomBar"></div>
                    <FeedbackModal />
                </section>
            </section>
        </div>
    );

}
