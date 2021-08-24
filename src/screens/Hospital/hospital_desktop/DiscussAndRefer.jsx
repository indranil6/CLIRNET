import React from 'react';
import Slider from "react-slick";
import { reactLocalStorage } from 'reactjs-localstorage';
import $ from 'jquery';
import Header from '../../mainscreens/Header';
import Footer from '../Footer';
import 'firebase/storage';
import searchIcon from '../../../desktopImages/navSearch.png';
import filterIcon from '../../../desktopImages/filter-black.png';
import Masonry from 'react-masonry-component';
import begainArrow from '../../../desktopImages/begainArrow.png';
import Loader from 'react-loader-spinner'
import MedicalCenterCard from '../cards/MedicalCenterCard.jsx';
import FeaturedSliderCard from '../cards/FeaturedSliderCard.jsx';
import { getLandingPage, useDebounce, redirectToHospitalProfile } from '../utils/utils.js';
import * as utils from '../utils/utils.js';
import Banner from '../../mainscreens/Banner'

const masonryOptions = {
    transitionDuration: 0
};
let pageNames = "Discuss & Refer"
const dskHspltDbSliderArea = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    adaptiveHeight: true
};

let activityData = undefined;
let featuredSliderData = [];
let medicalCentersData = [];
let tempMedicalCentersData = [];
class DiscussAndRefer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false,
            loader_status: true,
            banner_display:false
        };

        featuredSliderData = [];
        medicalCentersData = [];
        tempMedicalCentersData = [];
        activityData = undefined;
    }

    parseResponseJson(response) {
        let responseDataArray = [];
        if (response.status_code == 200) {
            activityData = response.data.Activities;
            if (response.data.data) {
                if (response.data.data.length > 0) {
                    responseDataArray = response.data.data;
                    responseDataArray.map((rData) => {
                        // console.log('isFea' + rData.is_featured)
                        if (rData.is_featured == 1) {
                            featuredSliderData.push(rData);
                        }
                        medicalCentersData.push(rData);
                        tempMedicalCentersData.push(rData);
                    });
                }
            }
            this.setState({ 'loader_status': false });
        } else {
            this.setState({ 'loader_status': false });
        }
    }
    componentDidMount() {
        window.document.title = "CLIRNET - Discuss and Refer"

        $('.li_discuss_and_refer').attr('id', 'discuss_and_refer_cal');
        $(".hospitals_mobile").addClass("active");
        featuredSliderData = [];
        medicalCentersData = [];
        tempMedicalCentersData = [];
        activityData = undefined;

        getLandingPage().then(data => {
            if (data.status_code == 200) {
                this.parseResponseJson(data)
            } else {
                utils.redirectToLogin(this.props.history)
            }
        });
    }

    onSearchMedicalCenter(e) {
        let term = e.target.value;
        let context = this
        if (tempMedicalCentersData.length > 0) {
            medicalCentersData = context.search(tempMedicalCentersData, term)
            // medicalCentersData = useDebounce((tempMedicalCentersData,term) => context.search(tempMedicalCentersData,term), 1000);
            this.refresh()
        } if (tempMedicalCentersData.length > 0 && term == '') {
            medicalCentersData = tempMedicalCentersData
            this.refresh()
        }
    }

    search(arr, term) {
        // console.log("searching.....")
        return arr.filter(({
            client_name,
            client_city
        }) => {
            return client_name.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                client_city.toLowerCase().indexOf(term.toLowerCase()) > -1
        })
    }

    refresh = () => {
        this.setState({ "display": !this.state.display });
    }

    bannerCallback = ()=>{
        this.setState({banner_display: !this.state.banner_display});
    }

    render() {
        return (
            <div className="full_width dskScreen">
                <Header history={this.props.history} page_name={pageNames} />
                <Banner type_id={0} type={"discuss_and_refer"}  apiresponserecieved={this.bannerCallback} api_call_detail={1} api_call={0}/>
                <div className="full_width hiospitalHome">
                    <div className="container mycontainer">
                        <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={40} width={40} visible={this.state.loader_status} />
                        <div className="row">
                            <div className="full_width">
                                <div className="full_width text-left dskHspltDbTop">
                                    <div className="row">
                                        <section className="full_width adsArea">
                                            <div className="full_width adsFrame">
                                            {this.state.banner_display?<Banner type_id={0} banner_position={1} unmount_call={1} type={"discuss_and_refer"} api_call={1} before_unload_call={1} />:null}
                                            </div>
                                        </section>
                                        <div className="clearfix"></div>
                                        <Featured cardData={featuredSliderData} history={this.props.history} />
                                        {(activityData == undefined) ? null :
                                            <Activities data={activityData} history={this.props.history} />
                                        }
                                    </div>
                                </div>
                                {(tempMedicalCentersData.length > 0) ?
                                    <MedicalCenters cardData={medicalCentersData} onSearch={this.onSearchMedicalCenter.bind(this)} history={this.props.history} />
                                    : null}
                                {this.state.banner_display?<Banner type_id={0} banner_position={2} unmount_call={0} type={"discuss_and_refer"} api_call={1} before_unload_call={0} />:null}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer history={this.props.history} />
            </div>
        )
    }
}
export default DiscussAndRefer;
const Featured = (props) => {
    return (
        <div className="col-lg-8 col-12 dskHspltDbSlider">
            {(props.cardData.length > 0) ?
                <Slider {...dskHspltDbSliderArea} className="full_width dskHspltDbSliderArea">
                    {props.cardData.map((rData) => (
                        <FeaturedSliderCard data={rData} click={redirectToHospitalProfile.bind(this, props.history, rData.client_master_id)} />
                    ))}
                </Slider> : null}
        </div>
    )
}

const Activities = (props) => {
    return (
        <div className="col-lg-4 col-12 radius-6 dskHspltDbActivities">
            <div className="full_width dskHspltDbActivitiesBtn">
                <h4 className="font_22px colorBlack font400">Activities</h4>
                <a href="javascript:void(0);" className="radius-8 colorWhite font400 font_14px" onClick={utils.redirectToActivity.bind(this, props.history, 'all')}>View All</a>
            </div>
            <div className="clearfix"></div>
            <div className="full_width">
                <div className="row dskHspltDbActivitiRow">
                    <div className="col-6 dskHspltDbActivitiBx dskHspltDb-activeCases" onClick={utils.redirectToActivity.bind(this, props.history, 'active')}>
                        <div className="full_width radius-6 dskHspltDbActivitiBxIn">
                            <div className="full_width dskHspltDbActivitiBxCnt">
                                <h3 className="font_30px font300 colorWhite">{(props.data.active == '' || props.data.active == undefined) ? 0 : props.data.active}</h3>
                                <div className="clearfix"></div>
                                <h5 className="font_16px font300 colorWhite">Active Cases</h5>
                                <div className="radius-100 dskHspltDbActivitiBxArrow">
                                    <img src={begainArrow} className="translate_both" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 dskHspltDbActivitiBx dskHspltDb-completed" onClick={utils.redirectToActivity.bind(this, props.history, 'completed')}>
                        <div className="full_width radius-6 dskHspltDbActivitiBxIn">
                            <div className="full_width dskHspltDbActivitiBxCnt">
                                <h3 className="font_30px font300 colorWhite">{(props.data.completed == '' || props.data.completed == undefined) ? 0 : props.data.completed}</h3>
                                <div className="clearfix"></div>
                                <h5 className="font_16px font300 colorWhite">Completed</h5>
                                <div className="radius-100 dskHspltDbActivitiBxArrow">
                                    <img src={begainArrow} className="translate_both" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 dskHspltDbActivitiBx dskHspltDb-pending" onClick={utils.redirectToActivity.bind(this, props.history, 'pending')}>
                        <div className="full_width radius-6 dskHspltDbActivitiBxIn">
                            <div className="full_width dskHspltDbActivitiBxCnt">
                                <h3 className="font_30px font300 colorWhite">{(props.data.pending == '' || props.data.pending == undefined) ? 0 : props.data.pending}</h3>
                                <div className="clearfix"></div>
                                <h5 className="font_16px font300 colorWhite">Pending</h5>
                                <div className="radius-100 dskHspltDbActivitiBxArrow">
                                    <img src={begainArrow} className="translate_both" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 dskHspltDbActivitiBx dskHspltDb-rejected" onClick={utils.redirectToActivity.bind(this, props.history, 'rejected')}>
                        <div className="full_width radius-6 dskHspltDbActivitiBxIn">
                            <div className="full_width dskHspltDbActivitiBxCnt">
                                <h3 className="font_30px font300 colorWhite">{(props.data.rejected == '' || props.data.rejected == undefined) ? 0 : props.data.rejected}</h3>
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
    )
}

const MedicalCenters = (props) => {
    return (
        <div className="full_width dskHspltDbList">
            <div className="full_width dskHspltDbListTTlArea">
                <div className="row align-items-center justify-content-between">
                    <h3 className="colorBlack font400 fontExo font_30px dskHspltCmnTtl">Medical Centers</h3>
                    <div className="dskHspltDbListTTlRight">
                        <div className="dskHspltDbSearch">
                            <input type="text" placeholder="Search Medical Center by Name or Location" className="dskHspltDbSearchInput" onChange={props.onSearch} />
                            <button type="submit" className="dskHspltDbSearchBttn"><img src={searchIcon} className="translate_both" /> </button>
                        </div>
                        {/* <a href="javascript:void(0)" className="dskHspltDbFilter">
                        <img src={filterIcon} className="translate_both" />
                    </a> */}
                    </div>
                </div>
            </div>
            <div className="clearfix"></div>
            <Masonry
                className={'dskHspltDbListCard'} // default ''
                elementType={'ul'} // default 'div'
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false}>
                {(props.cardData.length > 0) ?
                    props.cardData.map((rData) => (
                        <MedicalCenterCard data={rData} click={redirectToHospitalProfile.bind(this, props.history, rData.client_master_id)} />
                    )) : <div className="full_width alert alert-danger">
                        <strong>No Medical Center Found</strong>
                    </div>
                }
            </Masonry>
        </div>
    )
}
