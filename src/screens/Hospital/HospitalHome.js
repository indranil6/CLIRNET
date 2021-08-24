import React from 'react';
import Slider from "react-slick";
import { reactLocalStorage } from 'reactjs-localstorage';
import $ from 'jquery';
import { isMobile } from 'react-device-detect';
import HeaderDesktop from '../mainscreens/HeaderDesktop';
import FooterDesktop from '../mainscreens/FooterDesktop';
import 'firebase/storage';
import searchIcon from '../../desktopImages/navSearch.png';
import filterIcon from '../../desktopImages/filter-black.png';
import Masonry from 'react-masonry-component';
import begainArrow from '../../desktopImages/begainArrow.png';
import location from '../../desktopImages/hospitalCardLocation.png';
import dskHspltDbSliderBg from '../../desktopImages/dskHspltDbSliderBg.jpg';
const masonryOptions = {
    transitionDuration: 0
};
class HospitalHome extends React.Component {
    render() {
        var dskHspltDbSliderArea = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            autoplay: false,
            adaptiveHeight: true
        };


        return (
            <div className="full_width dskScreen">
                <HeaderDesktop history={this.props.history} />
                <div className="full_width hiospitalHome">
                    <div className="container mycontainer">
                        <div className="row">
                            <div className="full_width">
                                <div className="full_width text-left dskHspltDbTop">
                                    <div className="row">
                                        <div className="col-lg-8 col-12 dskHspltDbSlider">

                                            <Slider {...dskHspltDbSliderArea} className="full_width dskHspltDbSliderArea">
                                                <div className="radius-6 dskHspltDbSliderBox">
                                                    <div className="dskHspltDbSliderBoxTag font_16px fontExo colorWhite">Featured</div>
                                                    <div className="overlay"></div>
                                                    <img src={dskHspltDbSliderBg} className="object_fit_cover dskHspltDbSliderBoxBg" />
                                                    <div className="dskHspltDbSliderPic-1">
                                                        <img src="https://www.thehindu.com/news/cities/kolkata/xcnev/article32982113.ece/ALTERNATES/LANDSCAPE_1200/Belle-Vue-Clinic" className="object_fit_cover" />
                                                        <div className="overlay"></div>
                                                    </div>
                                                    <div className="dskHspltDbSliderBoxIn">
                                                        <div className="dskHspltDbSliderPic-2">
                                                            <img src="https://www.thehindu.com/news/cities/kolkata/xcnev/article32982113.ece/ALTERNATES/LANDSCAPE_1200/Belle-Vue-Clinic" className="object_fit_cover" />
                                                        </div>
                                                        <div className="colorWhite font_16px dskHspltDbSliderBoxInRight">
                                                            <h2 className="colorWhite font600 font_30px">Belle Vue Clinic</h2>
                                                            <div className="clearfix"></div>
                                                            <h4 className="font500 font_16px">Kolkata, West Bengal</h4>
                                                            <div className="clearfix"></div>
                                                            <div>
                                                                <p>9, Dr. U. N. Brahmachari Street (Formerly Loudon Street), Elgin, Kolkata, West Bengal 700017</p>
                                                            </div>
                                                            <div className="clearfix"></div>
                                                            <div className="radius-8 colorWhite dskHspltDbCardBttn">
                                                                <span>Select <img src={begainArrow} /></span>
                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                                <div className="radius-6 dskHspltDbSliderBox">
                                                    <div className="dskHspltDbSliderBoxTag font_16px fontExo colorWhite">Featured</div>
                                                    <div className="overlay"></div>
                                                    <img src={dskHspltDbSliderBg} className="object_fit_cover dskHspltDbSliderBoxBg" />
                                                    <div className="dskHspltDbSliderPic-1">
                                                        <img src="https://www.thehindu.com/news/cities/kolkata/xcnev/article32982113.ece/ALTERNATES/LANDSCAPE_1200/Belle-Vue-Clinic" className="object_fit_cover" />
                                                        <div className="overlay"></div>
                                                    </div>
                                                    <div className="dskHspltDbSliderBoxIn">
                                                        <div className="dskHspltDbSliderPic-2">
                                                            <img src="https://www.thehindu.com/news/cities/kolkata/xcnev/article32982113.ece/ALTERNATES/LANDSCAPE_1200/Belle-Vue-Clinic" className="object_fit_cover" />
                                                        </div>
                                                        <div className="colorWhite font_16px dskHspltDbSliderBoxInRight">
                                                            <h2 className="colorWhite font600 font_30px">Belle Vue Clinic</h2>
                                                            <div className="clearfix"></div>
                                                            <h4 className="font500 font_16px">Kolkata, West Bengal</h4>
                                                            <div className="clearfix"></div>
                                                            <div>
                                                                <p>9, Dr. U. N. Brahmachari Street (Formerly Loudon Street), Elgin, Kolkata, West Bengal 700017</p>
                                                            </div>
                                                            <div className="clearfix"></div>
                                                            <div className="radius-8 colorWhite dskHspltDbCardBttn">
                                                                <span>Select <img src={begainArrow} /></span>
                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                                <div className="radius-6 dskHspltDbSliderBox">
                                                    <div className="dskHspltDbSliderBoxTag font_16px fontExo colorWhite">Featured</div>
                                                    <div className="overlay"></div>
                                                    <img src={dskHspltDbSliderBg} className="object_fit_cover dskHspltDbSliderBoxBg" />
                                                    <div className="dskHspltDbSliderPic-1">
                                                        <img src="https://www.thehindu.com/news/cities/kolkata/xcnev/article32982113.ece/ALTERNATES/LANDSCAPE_1200/Belle-Vue-Clinic" className="object_fit_cover" />
                                                        <div className="overlay"></div>
                                                    </div>
                                                    <div className="dskHspltDbSliderBoxIn">
                                                        <div className="dskHspltDbSliderPic-2">
                                                            <img src="https://www.thehindu.com/news/cities/kolkata/xcnev/article32982113.ece/ALTERNATES/LANDSCAPE_1200/Belle-Vue-Clinic" className="object_fit_cover" />
                                                        </div>
                                                        <div className="colorWhite font_16px dskHspltDbSliderBoxInRight">
                                                            <h2 className="colorWhite font600 font_30px">Belle Vue Clinic</h2>
                                                            <div className="clearfix"></div>
                                                            <h4 className="font500 font_16px">Kolkata, West Bengal</h4>
                                                            <div className="clearfix"></div>
                                                            <div>
                                                                <p>9, Dr. U. N. Brahmachari Street (Formerly Loudon Street), Elgin, Kolkata, West Bengal 700017</p>
                                                            </div>
                                                            <div className="clearfix"></div>
                                                            <div className="radius-8 colorWhite dskHspltDbCardBttn">
                                                                <span>Select <img src={begainArrow} /></span>
                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                                <div className="radius-6 dskHspltDbSliderBox">
                                                    <div className="dskHspltDbSliderBoxTag font_16px fontExo colorWhite">Featured</div>
                                                    <div className="overlay"></div>
                                                    <img src={dskHspltDbSliderBg} className="object_fit_cover dskHspltDbSliderBoxBg" />
                                                    <div className="dskHspltDbSliderPic-1">
                                                        <img src="https://www.thehindu.com/news/cities/kolkata/xcnev/article32982113.ece/ALTERNATES/LANDSCAPE_1200/Belle-Vue-Clinic" className="object_fit_cover" />
                                                        <div className="overlay"></div>
                                                    </div>
                                                    <div className="dskHspltDbSliderBoxIn">
                                                        <div className="dskHspltDbSliderPic-2">
                                                            <img src="https://www.thehindu.com/news/cities/kolkata/xcnev/article32982113.ece/ALTERNATES/LANDSCAPE_1200/Belle-Vue-Clinic" className="object_fit_cover" />
                                                        </div>
                                                        <div className="colorWhite font_16px dskHspltDbSliderBoxInRight">
                                                            <h2 className="colorWhite font600 font_30px">Belle Vue Clinic</h2>
                                                            <div className="clearfix"></div>
                                                            <h4 className="font500 font_16px">Kolkata, West Bengal</h4>
                                                            <div className="clearfix"></div>
                                                            <div>
                                                                <p>9, Dr. U. N. Brahmachari Street (Formerly Loudon Street), Elgin, Kolkata, West Bengal 700017 9, Dr. U. N. Brahmachari Street (Formerly Loudon Street), Elgin, Kolkata, West Bengal 700017

                                                                9, Dr. U. N. Brahmachari Street (Formerly Loudon Street), Elgin, Kolkata, West Bengal 700017
                                                                </p>
                                                            </div>
                                                            <div className="clearfix"></div>
                                                            <div className="radius-8 colorWhite dskHspltDbCardBttn">
                                                                <span>Select <img src={begainArrow} /></span>
                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                            </Slider>

                                        </div>
                                        <div className="col-lg-4 col-12 radius-6 dskHspltDbActivities">
                                            <div className="full_width dskHspltDbActivitiesBtn">
                                                <h4 className="font_22px colorBlack font400">Activities</h4>
                                                <a href="#" className="radius-8 colorWhite font400 font_14px">View All</a>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="full_width">
                                                <div className="row dskHspltDbActivitiRow">
                                                    <div className="col-md-6 col-12 dskHspltDbActivitiBx dskHspltDb-activeCases">
                                                        <div className="full_width radius-6 dskHspltDbActivitiBxIn">
                                                            <div className="full_width dskHspltDbActivitiBxCnt">
                                                                <h3 className="font_30px font300 colorWhite">09</h3>
                                                                <div className="clearfix"></div>
                                                                <h5 className="font_16px font300 colorWhite">Active Cases</h5>
                                                                <div className="radius-100 dskHspltDbActivitiBxArrow">
                                                                    <img src={begainArrow} className="translate_both" />
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>

                                                    <div className="col-md-6 col-12 dskHspltDbActivitiBx dskHspltDb-completed">
                                                        <div className="full_width radius-6 dskHspltDbActivitiBxIn">
                                                            <div className="full_width dskHspltDbActivitiBxCnt">
                                                                <h3 className="font_30px font300 colorWhite">123</h3>
                                                                <div className="clearfix"></div>
                                                                <h5 className="font_16px font300 colorWhite">Completed</h5>
                                                                <div className="radius-100 dskHspltDbActivitiBxArrow">
                                                                    <img src={begainArrow} className="translate_both" />
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>
                                                    <div className="col-md-6 col-12 dskHspltDbActivitiBx dskHspltDb-pending">
                                                        <div className="full_width radius-6 dskHspltDbActivitiBxIn">
                                                            <div className="full_width dskHspltDbActivitiBxCnt">
                                                                <h3 className="font_30px font300 colorWhite">02</h3>
                                                                <div className="clearfix"></div>
                                                                <h5 className="font_16px font300 colorWhite">Pending</h5>
                                                                <div className="radius-100 dskHspltDbActivitiBxArrow">
                                                                    <img src={begainArrow} className="translate_both" />
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>
                                                    <div className="col-md-6 col-12 dskHspltDbActivitiBx dskHspltDb-rejected">
                                                        <div className="full_width radius-6 dskHspltDbActivitiBxIn">
                                                            <div className="full_width dskHspltDbActivitiBxCnt">
                                                                <h3 className="font_30px font300 colorWhite">04</h3>
                                                                <div className="clearfix"></div>
                                                                <h5 className="font_16px font300 colorWhite">Rejected</h5>
                                                                <div className="radius-100 dskHspltDbActivitiBxArrow">
                                                                    <img src={begainArrow} className="translate_both" />
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>




                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="full_width dskHspltDbList">
                                    <div className="full_width dskHspltDbListTTlArea">
                                        <div className="row align-items-center justify-content-between">
                                            <h3 className="colorBlack font400 fontExo dskHspltCmnTtl">Medical Centers</h3>
                                            <div className="dskHspltDbListTTlRight">
                                                <div className="dskHspltDbSearch">
                                                    <input type="text" placeholder="Search Medical Center by Name or Location" className="dskHspltDbSearchInput" />
                                                    <button type="submit" className="dskHspltDbSearchBttn"><img src={searchIcon} className="translate_both" /> </button>
                                                </div>
                                                <a href="javascript:void(0)" className="dskHspltDbFilter">
                                                    <img src={filterIcon} className="translate_both" />
                                                </a>

                                            </div>
                                        </div>

                                    </div>

                                    <div className="clearfix"></div>
                                    <Masonry
                                        className={'dskHspltDbListCard'} // default ''
                                        elementType={'ul'} // default 'div'
                                        options={masonryOptions} // default {}
                                        disableImagesLoaded={false} // default false
                                        updateOnEachImageLoad={false}
                                    >
                                        <div className="col-md-6 col-12 dskHspltDbCard">
                                            <div className="full_width radius-8 text-left dskHspltDbCardIn">
                                                <div className="row">

                                                    <div className="radius-100 dskHspltDbCardPic">
                                                        <div className="radius-100 dskHspltDbCardPicIn">
                                                            <img src="https://d3frl090092vlr.cloudfront.net/Fortis-Hospital-la-shalimar-bagh.jpg" className="object_fit_cover" />

                                                            {/* if Logo */}
                                                            {/* <img src="https://1000logos.net/wp-content/uploads/2020/04/Fortis-Logo.png" className="translate_both"/> */}

                                                        </div>
                                                    </div>
                                                    <div className="font_14px font400 dskHspltDbCardRight">
                                                        <h3 className="colorBlack fontExo font_22px font500">AMRI Hospital - Dhakuria</h3>
                                                        <div className="clearfix"></div>
                                                        <div className="full_width dskHspltDbCardContent">
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                        </div>
                                                        <div className="full_width dskHspltDbCardBtm">
                                                            <div className="row align-items-center justify-content-between">
                                                                <h5 className="font_14px dskHspltDbCardLocation"><img src={location} /> Kolkata, West Bengal</h5>
                                                                <div className="radius-8 colorWhite dskHspltDbCardBttn">
                                                                    <span>Select <img src={begainArrow} /></span>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="col-sm-6 col-12 dskHspltDbCard">
                                            <div className="full_width radius-8 text-left dskHspltDbCardIn">
                                                <div className="row">

                                                    <div className="radius-100 dskHspltDbCardPic">
                                                        <div className="radius-100 dskHspltDbCardPicIn">
                                                            {/* hospital image */}
                                                            {/* <img src="https://d3frl090092vlr.cloudfront.net/Fortis-Hospital-la-shalimar-bagh.jpg" className="object_fit_cover" /> */}


                                                            <img src="https://1000logos.net/wp-content/uploads/2020/04/Fortis-Logo.png" className="translate_both" />

                                                        </div>
                                                    </div>
                                                    <div className="font_14px font400 dskHspltDbCardRight">
                                                        <h3 className="colorBlack fontExo font_22px font500">AMRI Hospital - Dhakuria</h3>
                                                        <div className="clearfix"></div>
                                                        <div className="full_width dskHspltDbCardContent">
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                        </div>
                                                        <div className="full_width dskHspltDbCardBtm">
                                                            <div className="row align-items-center justify-content-between">
                                                                <h5 className="font_14px dskHspltDbCardLocation"><img src={location} /> Kolkata, West Bengal</h5>
                                                                <div className="radius-8 colorWhite dskHspltDbCardBttn">
                                                                    <span>Select <img src={begainArrow} /></span>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="col-sm-6 col-12 dskHspltDbCard">
                                            <div className="full_width radius-8 text-left dskHspltDbCardIn">
                                                <div className="row">

                                                    <div className="radius-100 dskHspltDbCardPic">
                                                        <div className="radius-100 dskHspltDbCardPicIn">
                                                            <img src="https://d3frl090092vlr.cloudfront.net/Fortis-Hospital-la-shalimar-bagh.jpg" className="object_fit_cover" />

                                                            {/* if Logo */}
                                                            {/* <img src="https://1000logos.net/wp-content/uploads/2020/04/Fortis-Logo.png" className="translate_both"/> */}

                                                        </div>
                                                    </div>
                                                    <div className="font_14px font400 dskHspltDbCardRight">
                                                        <h3 className="colorBlack fontExo font_22px font500">AMRI Hospital - Dhakuria</h3>
                                                        <div className="clearfix"></div>
                                                        <div className="full_width dskHspltDbCardContent">
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                        </div>
                                                        <div className="full_width dskHspltDbCardBtm">
                                                            <div className="row align-items-center justify-content-between">
                                                                <h5 className="font_14px dskHspltDbCardLocation"><img src={location} /> Kolkata, West Bengal</h5>
                                                                <div className="radius-8 colorWhite dskHspltDbCardBttn">
                                                                    <span>Select <img src={begainArrow} /></span>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="col-sm-6 col-12 dskHspltDbCard">
                                            <div className="full_width radius-8 text-left dskHspltDbCardIn">
                                                <div className="row">

                                                    <div className="radius-100 dskHspltDbCardPic">
                                                        <div className="radius-100 dskHspltDbCardPicIn">
                                                            <img src="https://d3frl090092vlr.cloudfront.net/Fortis-Hospital-la-shalimar-bagh.jpg" className="object_fit_cover" />

                                                            {/* if Logo */}
                                                            {/* <img src="https://1000logos.net/wp-content/uploads/2020/04/Fortis-Logo.png" className="translate_both"/> */}

                                                        </div>
                                                    </div>
                                                    <div className="font_14px font400 dskHspltDbCardRight">
                                                        <h3 className="colorBlack fontExo font_22px font500">AMRI Hospital - Dhakuria</h3>
                                                        <div className="clearfix"></div>
                                                        <div className="full_width dskHspltDbCardContent">
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                        </div>
                                                        <div className="full_width dskHspltDbCardBtm">
                                                            <div className="row align-items-center justify-content-between">
                                                                <h5 className="font_14px dskHspltDbCardLocation"><img src={location} /> Kolkata, West Bengal</h5>
                                                                <div className="radius-8 colorWhite dskHspltDbCardBttn">
                                                                    <span>Select <img src={begainArrow} /></span>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="col-sm-6 col-12 dskHspltDbCard">
                                            <div className="full_width radius-8 text-left dskHspltDbCardIn">
                                                <div className="row">

                                                    <div className="radius-100 dskHspltDbCardPic">
                                                        <div className="radius-100 dskHspltDbCardPicIn">
                                                            <img src="https://d3frl090092vlr.cloudfront.net/Fortis-Hospital-la-shalimar-bagh.jpg" className="object_fit_cover" />

                                                            {/* if Logo */}
                                                            {/* <img src="https://1000logos.net/wp-content/uploads/2020/04/Fortis-Logo.png" className="translate_both"/> */}

                                                        </div>
                                                    </div>
                                                    <div className="font_14px font400 dskHspltDbCardRight">
                                                        <h3 className="colorBlack fontExo font_22px font500">AMRI Hospital - Dhakuria</h3>
                                                        <div className="clearfix"></div>
                                                        <div className="full_width dskHspltDbCardContent">
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                        </div>
                                                        <div className="full_width dskHspltDbCardBtm">
                                                            <div className="row align-items-center justify-content-between">
                                                                <h5 className="font_14px dskHspltDbCardLocation"><img src={location} /> Kolkata, West Bengal</h5>
                                                                <div className="radius-8 colorWhite dskHspltDbCardBttn">
                                                                    <span>Select <img src={begainArrow} /></span>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="col-sm-6 col-12 dskHspltDbCard">
                                            <div className="full_width radius-8 text-left dskHspltDbCardIn">
                                                <div className="row">

                                                    <div className="radius-100 dskHspltDbCardPic">
                                                        <div className="radius-100 dskHspltDbCardPicIn">
                                                            {/* hospital image */}
                                                            {/* <img src="https://d3frl090092vlr.cloudfront.net/Fortis-Hospital-la-shalimar-bagh.jpg" className="object_fit_cover" /> */}


                                                            <img src="https://1000logos.net/wp-content/uploads/2020/04/Fortis-Logo.png" className="translate_both" />

                                                        </div>
                                                    </div>
                                                    <div className="font_14px font400 dskHspltDbCardRight">
                                                        <h3 className="colorBlack fontExo font_22px font500">AMRI Hospital - Dhakuria</h3>
                                                        <div className="clearfix"></div>
                                                        <div className="full_width dskHspltDbCardContent">
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                        </div>
                                                        <div className="full_width dskHspltDbCardBtm">
                                                            <div className="row align-items-center justify-content-between">
                                                                <h5 className="font_14px dskHspltDbCardLocation"><img src={location} /> Kolkata, West Bengal</h5>
                                                                <div className="radius-8 colorWhite dskHspltDbCardBttn">
                                                                    <span>Select <img src={begainArrow} /></span>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="col-sm-6 col-12 dskHspltDbCard">
                                            <div className="full_width radius-8 text-left dskHspltDbCardIn">
                                                <div className="row">

                                                    <div className="radius-100 dskHspltDbCardPic">
                                                        <div className="radius-100 dskHspltDbCardPicIn">
                                                            <img src="https://d3frl090092vlr.cloudfront.net/Fortis-Hospital-la-shalimar-bagh.jpg" className="object_fit_cover" />

                                                            {/* if Logo */}
                                                            {/* <img src="https://1000logos.net/wp-content/uploads/2020/04/Fortis-Logo.png" className="translate_both"/> */}

                                                        </div>
                                                    </div>
                                                    <div className="font_14px font400 dskHspltDbCardRight">
                                                        <h3 className="colorBlack fontExo font_22px font500">AMRI Hospital - Dhakuria</h3>
                                                        <div className="clearfix"></div>
                                                        <div className="full_width dskHspltDbCardContent">
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                        </div>
                                                        <div className="full_width dskHspltDbCardBtm">
                                                            <div className="row align-items-center justify-content-between">
                                                                <h5 className="font_14px dskHspltDbCardLocation"><img src={location} /> Kolkata, West Bengal</h5>
                                                                <div className="radius-8 colorWhite dskHspltDbCardBttn">
                                                                    <span>Select <img src={begainArrow} /></span>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="col-sm-6 col-12 dskHspltDbCard">
                                            <div className="full_width radius-8 text-left dskHspltDbCardIn">
                                                <div className="row">

                                                    <div className="radius-100 dskHspltDbCardPic">
                                                        <div className="radius-100 dskHspltDbCardPicIn">
                                                            <img src="https://d3frl090092vlr.cloudfront.net/Fortis-Hospital-la-shalimar-bagh.jpg" className="object_fit_cover" />

                                                            {/* if Logo */}
                                                            {/* <img src="https://1000logos.net/wp-content/uploads/2020/04/Fortis-Logo.png" className="translate_both"/> */}

                                                        </div>
                                                    </div>
                                                    <div className="font_14px font400 dskHspltDbCardRight">
                                                        <h3 className="colorBlack fontExo font_22px font500">AMRI Hospital - Dhakuria</h3>
                                                        <div className="clearfix"></div>
                                                        <div className="full_width dskHspltDbCardContent">
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                        </div>
                                                        <div className="full_width dskHspltDbCardBtm">
                                                            <div className="row align-items-center justify-content-between">
                                                                <h5 className="font_14px dskHspltDbCardLocation"><img src={location} /> Kolkata, West Bengal</h5>
                                                                <div className="radius-8 colorWhite dskHspltDbCardBttn">
                                                                    <span>Select <img src={begainArrow} /></span>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </Masonry>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <FooterDesktop />
            </div>
        )
    }
}
export default HospitalHome;