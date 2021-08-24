import React, { useState, useEffect } from 'react';

import './css/common.css';
import './css/style.css';
import './css/responsive.css';
import $ from 'jquery';
import Slider from "react-slick";
import mainBackground from './images/mainBg.png';
import EnterogerminaLogoV4 from './images/EnterogerminaLogoV4.png';
import exit from './images/exit.png';
import arrow_left from './images/arrow_left.png';
import logo from './images/logo.png';
import onWebinerBannerGraph from './images/onWebinerBannerGraph.png';
import send from './images/send.png';
import sanofi_Logo from './images/sanofi_Logo.png';

require('jquery-mousewheel');
import mCustomScrollbar from 'malihu-custom-scrollbar-plugin';
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css';
import VideoPlayer from './VideoPlayer.jsx';
// import Banner from "../mainscreens/Banner";
export default function LiveSession({ data, onCloseModal }) {
    const [modalVisibility, setModalVisibility] = useState(true);


    useEffect(() => {

        $(".videoComments").mCustomScrollbar({ theme: 'dark' }).mCustomScrollbar("scrollTo", "last", { scrollInertia: 0 });


        $(".p_videoBox").removeClass('videoRightShow');
        $(".video_collapse").click(function () {
            $(".p_videoBox").toggleClass('videoRightShow');
        })



    }, [data]);


    useEffect(() => {
        // componentWillUnmount
        return () => {
            alert('componentWillUnmount');
        }
    }, [data]);

    var liveDocSlider = {
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

                                <a href="https://form.jotform.com/210474320450443"
                                    className="font_14px font600 p_videoExit radius-6">
                                    <span>Exit</span>
                                    <img src={exit} alt="icon" /></a>
                                <div className="full_width radius-6 live_videoBox">
                                    <div className="p_videoBoxPlay transition6s">

                                        <VideoPlayer />

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
                                                        <div className="full_width font_12px videoCommentsRow">
                                                            <h4 className="font600 font_14px colorBlack videoCommentBy">Admin</h4>
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                                industry. </p>

                                                        </div>
                                                        <div className="full_width font_12px videoCommentsRow">
                                                            <h4 className="font600 font_14px colorBlack videoCommentBy">Admin</h4>
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                                industry. </p>

                                                        </div>
                                                        <div className="full_width font_12px videoCommentsRow">
                                                            <h4 className="font600 font_14px colorBlack videoCommentBy">Admin</h4>
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                                industry. </p>

                                                        </div>

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
                                                    <form id="addQuestionForm" name="addQuestionForm" action="" method="post">

                                                        <input type="text" name="comment" id="comment"
                                                            placeholder="Type your question" className="videoFrmInput" />
                                                        <button type="submit" id="submit" name="submit" className="videoFrmSend" style={bgColor2}>
                                                            <img src={send}
                                                                className="translate_both" /></button>
                                                    </form>
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
                            <h2 class="colorBlack font_20px font600 p_videoTtl">COVID-19: Management of Dermatology Patients
                                amidst the Pandemic</h2>
                            <div class="full_width colorBlack font_16px">
                                <p>
                                    This session is being conducted by Clirnet Services Pvt. Ltd. It is intended
                                    for use by qualified Healthcare Professionals only. Healthcare
                                    Professionals are advised to use independent clinical judgement and/ or
                                    discretion before using the information provided. Information provided
                                    is for the purpose of information / education only and should not be
                                    construed as medical advice. All sessions are moderated and recorded to
                                    be used for research and information purposes only.</p>

                            </div>

                            <Slider {...liveDocSlider} className="full_width liveSsnDocSlider"  >
                                <div className="text-left liveSsnDocBox">
                                    <div className="full_width liveSsnDocBoxIn">
                                        <div className="liveSsnDocPic">
                                            <span className="liveSsnDocPicGrph1" style={bgColor2}></span>
                                            <span className="liveSsnDocPicGrph2" style={borderColor1}></span>
                                            <div className="full_width liveSsnDocPicIn">
                                                <img src="https://videohive.img.customer.envatousercontent.com/files/370029f5-7f7a-493c-ae07-dc1f13dcd086/inline_image_preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&max-h=8000&max-w=590&s=12df5eb4e292f768036b2dbff034046f" className="object_fit_cover" alt="image" />

                                            </div>


                                        </div>
                                        <div className="full_width liveSsnDocContent">
                                            <h4 className="font_18px colorBlack font600">Dr. Srinivas Kishore</h4>
                                            <p>MBBS, MS – ENT, Practices At Star Hospitals In Banjara Hills, Hyderabad</p>

                                        </div>
                                    </div>
                                </div>
                                <div className="text-left liveSsnDocBox">
                                    <div className="full_width liveSsnDocBoxIn">
                                        <div className="liveSsnDocPic">
                                            <span className="liveSsnDocPicGrph1" style={bgColor2}></span>
                                            <span className="liveSsnDocPicGrph2" style={borderColor1}></span>
                                            <div className="full_width liveSsnDocPicIn">
                                                <img src="https://videohive.img.customer.envatousercontent.com/files/370029f5-7f7a-493c-ae07-dc1f13dcd086/inline_image_preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&max-h=8000&max-w=590&s=12df5eb4e292f768036b2dbff034046f" className="object_fit_cover" alt="image" />

                                            </div>


                                        </div>
                                        <div className="full_width liveSsnDocContent">
                                            <h4 className="font_18px colorBlack font600">Dr. Srinivas Kishore</h4>
                                            <p>MBBS, MS – ENT, Practices At Star Hospitals In Banjara Hills, Hyderabad</p>

                                        </div>
                                    </div>
                                </div>
                                <div className="text-left liveSsnDocBox">
                                    <div className="full_width liveSsnDocBoxIn">
                                        <div className="liveSsnDocPic">
                                            <span className="liveSsnDocPicGrph1" style={bgColor2}></span>
                                            <span className="liveSsnDocPicGrph2" style={borderColor1}></span>
                                            <div className="full_width liveSsnDocPicIn">
                                                <img src="https://videohive.img.customer.envatousercontent.com/files/370029f5-7f7a-493c-ae07-dc1f13dcd086/inline_image_preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&max-h=8000&max-w=590&s=12df5eb4e292f768036b2dbff034046f" className="object_fit_cover" alt="image" />

                                            </div>


                                        </div>
                                        <div className="full_width liveSsnDocContent">
                                            <h4 className="font_18px colorBlack font600">Dr. Srinivas Kishore</h4>
                                            <p>MBBS, MS – ENT, Practices At Star Hospitals In Banjara Hills, Hyderabad</p>

                                        </div>
                                    </div>
                                </div>
                                <div className="text-left liveSsnDocBox">
                                    <div className="full_width liveSsnDocBoxIn">
                                        <div className="liveSsnDocPic">
                                            <span className="liveSsnDocPicGrph1" style={bgColor2}></span>
                                            <span className="liveSsnDocPicGrph2" style={borderColor1}></span>
                                            <div className="full_width liveSsnDocPicIn">
                                                <img src="https://videohive.img.customer.envatousercontent.com/files/370029f5-7f7a-493c-ae07-dc1f13dcd086/inline_image_preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&max-h=8000&max-w=590&s=12df5eb4e292f768036b2dbff034046f" className="object_fit_cover" alt="image" />

                                            </div>


                                        </div>
                                        <div className="full_width liveSsnDocContent">
                                            <h4 className="font_18px colorBlack font600">Dr. Srinivas Kishore</h4>
                                            <p>MBBS, MS – ENT, Practices At Star Hospitals In Banjara Hills, Hyderabad</p>

                                        </div>
                                    </div>
                                </div>
                                <div className="text-left liveSsnDocBox">
                                    <div className="full_width liveSsnDocBoxIn">
                                        <div className="liveSsnDocPic">
                                            <span className="liveSsnDocPicGrph1" style={bgColor2}></span>
                                            <span className="liveSsnDocPicGrph2" style={borderColor1}></span>
                                            <div className="full_width liveSsnDocPicIn">
                                                <img src="https://videohive.img.customer.envatousercontent.com/files/370029f5-7f7a-493c-ae07-dc1f13dcd086/inline_image_preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&max-h=8000&max-w=590&s=12df5eb4e292f768036b2dbff034046f" className="object_fit_cover" alt="image" />

                                            </div>


                                        </div>
                                        <div className="full_width liveSsnDocContent">
                                            <h4 className="font_18px colorBlack font600">Dr. Srinivas Kishore</h4>
                                            <p>MBBS, MS – ENT, Practices At Star Hospitals In Banjara Hills, Hyderabad</p>

                                        </div>
                                    </div>
                                </div>
                            </Slider>



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
                        <div className="live_container">
                            <div className="full_width font_12px colorWhite font500 december">

                                <h6 className="font_12px font600"> Disclaimer</h6>
                                <p>This
                                    session is being conducted by Clirnet Services Pvt. Ltd. It is intended
                                    for use by qualified Healthcare Professionals only. Healthcare
                                    Professionals are advised to use independent clinical judgement and/ or
                                    discretion before using the information provided. Information provided
                                    is for the purpose of information / education only and should not be
                                    construed as medical advice. All sessions are moderated and recorded to
                                    be used for research and information purposes only.</p>
                            </div>
                            <div className="full_width poweredBy"> <img
                                src={logo} alt="logo" />  </div>
                        </div>
                    </div>
                    <div className="full_width bottomBar"></div>
                </section>
            </section>
        </div>


    );

}
