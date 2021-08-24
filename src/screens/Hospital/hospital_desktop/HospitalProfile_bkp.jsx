import React from 'react';
import Slider from "react-slick";
import { reactLocalStorage } from 'reactjs-localstorage';
import $ from 'jquery';
import { isMobile } from 'react-device-detect';
import Header from '../Header';
import Footer from '../Footer';
import 'firebase/storage';
import Masonry from 'react-masonry-component';
import begainArrowBlue from '../../../desktopImages/begainArrowBlue.png';
import begainArrow from '../../../desktopImages/begainArrow.png';
import ssnTopBgGraphic from '../../../desktopImages/ssnTopBgGraphic.png';
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Overlay from 'react-bootstrap/Overlay'

import Loader from 'react-loader-spinner'

import ActivityActiveCard from '../cards/ActivityActiveCard.jsx';
import ActivityCompletedCard from '../cards/ActivityCompletedCard.jsx';
import ActivityPendingCard from '../cards/ActivityPendingCard.jsx';
import ActivityRejectedCard from '../cards/ActivityRejectedCard.jsx';
import { getHospitalProfile, redirectToReferForm, redirectToDiscussForm } from '../utils/utils.js';
import * as utils from '../utils/utils.js';
import { default as RecentDesktop } from '../../dashboard_desktop/Recent'
import { default as RecentMobile } from '../../dashboard_mobile/Recent'

const masonryOptions = {
    transitionDuration: 0
};
let pageNames = "Hospital Profile"
const hsProfile = {
    hospital_id: '',
    hospital_name: '',
    hospital_city: '',
    hospital_state: '',
    hospital_image: '',
    hospital_address: '',
    hospital_featured_image: ''
}

let pastActivitiesArray = [];
class HospitalProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false,
            loader_status: true
        };
        pastActivitiesArray = [];
    }


    componentDidMount() {
        $('.li_discuss_and_refer').attr('id', 'discuss_and_refer_cal');
        $(".hospitals_mobile").addClass("active");	
        pastActivitiesArray = [];
        let id = this.props.match.params.id;
        if(!id){
            utils.redirectToNotFound(this.props.history)
        }
        getHospitalProfile(id, 'true').then(data => {
            if(data.status_code == 200){
                this.parseResponseJson(data)
            }else{
                utils.redirectToNotFound(this.props.history)
            }
           
        });
    }

    componentWillUnmount(){
        pastActivitiesArray = [];
       hsProfile.hospital_id ='';
       hsProfile.hospital_name = '';
       hsProfile.hospital_city = '';
       hsProfile.hospital_state = '';
       hsProfile.hospital_image = '';
       hsProfile.hospital_address = '';
       hsProfile.hospital_featured_image = '';
    }
    refresh = () => {
        // console.log('in refresh')
        this.setState({ "display": !this.state.display });
    }

    parseResponseJson(response) {
        // console.log("response data"+response.data.status)
        if (response.status_code == 200 && response.data.status == true) {
            hsProfile.hospital_id = response.data.client.client_master_id;
            hsProfile.hospital_name = response.data.client.client_name;
            hsProfile.hospital_city = response.data.client.client_city;
            hsProfile.hospital_state = response.data.client.client_state;
            hsProfile.hospital_image = response.data.client.client_logo;
            hsProfile.hospital_address = response.data.client.client_address;
            hsProfile.hospital_featured_image = response.data.client.referral_featured_image;
            if(response.data.data){
                if(response.data.data.length >0){
                    response.data.data.map((aData) => {
                        pastActivitiesArray.push(aData);
                    });
                }
            }
            this.refresh();
        } else {
            this.setState({ 'loader_status': false });
        }
    }

    render() {
        var dskHspltDbSliderArea = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            adaptiveHeight: true
        };

        return (
            <div className="full_width dskScreen">
                <Header history={this.props.history} page_name={pageNames} />
                <div className="full_width hiospitalProfile">
                    <div className="container mycontainer">
                        {(hsProfile.hospital_id) ?
                            <ProfileTop data={hsProfile} history={this.props.history} /> :null
                            // <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={40} width={40} visible={true} />
                        }
                        <div className="clearfix"></div>
                        {(pastActivitiesArray.length > 0) ?
                            <PastActivities profile={hsProfile} history={this.props.history} activities={pastActivitiesArray} /> : null
                            // <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={40} width={40} visible={true} />
                        }
                        {/* Ad section start */}

                        {/* Ad section end*/}
                        <div className="clearfix"></div>
                        <div className="row">
                            <div className="text-left full_width">
                                {/* <h2 className="fontExo font_24px colorBlack font500 text-uppercase">Recommended</h2> */}
                                <div className="clearfix"></div>
                                <div className="text-left full_width hiospitalProfileCards">
                                    {/* Recommended Cards here */}
                                    {(isMobile) ? <RecentMobile history={this.props.history} callbackReciver={this.refresh.bind(this)} /> : <RecentDesktop history={this.props.history} callbackReciver={this.refresh.bind(this)} />}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <Footer history={this.props.history}/>
            </div>
        )
    }
}
export default HospitalProfile;


const ProfileTop = (props) => (
    <div className="row">
        <div className="full_width text-left dskHspltPrflBnr">
            <div className="row">
                <div className="col-lg-8 col-12 dskHspltPrflBnrLft">
                    {(props.data.hospital_featured_image == '' || props.data.hospital_featured_image == null) ?
                        <img src={ssnTopBgGraphic} className="object_fit_cover" />
                        : <img src={props.data.hospital_featured_image} className="object_fit_cover" />}
                    <div className="overlay"></div>
                    <div className="dskHspltPrflBnrLftContent">
                        <div className="font_16px colorWhite">
                            <h3 className="font600 colorWhite font_30px">{props.data.hospital_name}{', ' + props.data.hospital_city}</h3>
                            <h6 className="font_16px">{props.data.hospital_city} {', ' + props.data.hospital_state}</h6>
                            <div className="clearfix"></div>
                            <p>{props.data.hospital_address}</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-12 dskHspltPrflBnrRght">
                    <div className="full_width dskHspltPrflBnrRghtIn">
                        <h2 className="colorWhite font400 font_24px">How would you like to connect <span className="font600">{props.data.hospital_name + ' ,'}{' ' + props.data.hospital_city} ?</span></h2>
                        <div className="clearfix"></div>
                        <div className="full_width dskHspltPrflBnrRghtBtns">
                            <a href="javascript:void(0)" className="radius-6 colorBlue font_16px dskHspltPrflBnrRghtBtns_a" onClick={redirectToDiscussForm.bind(this, props.history, props.data.hospital_id)}>Discuss The Case <img src={begainArrowBlue} /></a>
                            <OverlayTrigger placement="left"
                                overlay={
                                    <Tooltip id="tooltip1" className="font_12px">
                                        You can request for discussion regarding the Case with the {props.data.hospital_name} for the best dioganosis of your Patient
                                    </Tooltip>
                                }
                            >
                                <div className="dskHspltPrflBnrToolTip font_18px font400 transition6s">i</div>
                            </OverlayTrigger>
                        </div>
                        <div className="full_width dskHspltPrflBnrRghtBtns">
                            <a href="javascript:void(0)" className="radius-6 colorBlue font_16px dskHspltPrflBnrRghtBtns_a" onClick={redirectToReferForm.bind(this, props.history, props.data.hospital_id)}>Refer The Patient <img src={begainArrowBlue} /></a>
                            <OverlayTrigger placement="left"
                                overlay={
                                    <Tooltip id="tooltip1" className="font_12px">
                                         You can request a referral of your Patient to the {props.data.hospital_name}
                                    </Tooltip>
                                }
                            >
                                <div className="dskHspltPrflBnrToolTip font_18px font400 transition6s">i</div>
                            </OverlayTrigger>
                        </div>
                        <div className="clearfix"></div>
                        <h6 className="colorWhite font_12px">Note: * You can request for discussion regarding the Case with the {props.data.hospital_name} for the best dioganosis of your Patient
                        ** You can request a referral of your Patient to the {props.data.hospital_name}</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
)


const PastActivities = (props) => (
    <div className="row">
        <div className="full_width text-left dskHspltPrflActv">
            <div className="row align-items-end justify-content-between dskHspltPrflActvTtlArea">
                {(!props.profile.hospital_name) ?
                    <h2 className="fontExo colorBlack font_20px">Past Activities With <span className="font700">{props.profile.hospital_name}{', ' + props.profile.hospital_city}</span> ({props.activities.length} Cases)</h2> : null
                }
                <a className="colorBlue font_16px" href="javascript:void(0)" onClick={utils.redirectToActivity.bind(this, props.history, 'all')}>View All <img src={begainArrowBlue} /></a>
            </div>
            <div className="clearfix"></div>
            <div className="row">
                <div className="full_width">
                    <Masonry
                        className={'dskHspltActivitesUl'} // default ''
                        elementType={'ul'} // default 'div'
                        options={masonryOptions} // default {}
                        disableImagesLoaded={false} // default false
                        updateOnEachImageLoad={false}>
                        {(props.activities.length > 0) ?
                            props.activities.map((aData) => (
                                <>
                                    {(aData.process_status == 2 || aData.process_status == 3) ?
                                        <ActivityActiveCard data={aData} customClass="col-lg-4 col-md-6 col-12 " /> : null
                                    }
                                    {(aData.process_status == 4 || aData.process_status == 5) ?
                                        <ActivityCompletedCard 
                                        data={aData}
                                        referClick={utils.updateDiscussToReferStatus.bind(this,props.history, aData.master_referral_discussion_id)}
                                        reDiscussClick={utils.redirectToReferalReinitiate.bind(this, props.history, aData.master_referral_discussion_id)}
                                        customClass="col-lg-4 col-md-6 col-12 " /> : null
                                    }
                                    {(aData.process_status == 8 || aData.process_status == 9 || aData.process_status == 10 || aData.process_status == 11) ?
                                        <ActivityRejectedCard 
                                        referClick={utils.updateDiscussToReferStatus.bind(this,props.history, aData.master_referral_discussion_id)}
                                        reDiscussClick={utils.redirectToReferalReinitiate.bind(this, props.history, aData.master_referral_discussion_id)}
                                        data={aData} 
                                        customClass="col-lg-4 col-md-6 col-12 " /> : null
                                    }
                                    {(aData.process_status == 1) ?
                                        <ActivityPendingCard 
                                        data={aData} 
                                        customClass="col-lg-4 col-md-6 col-12 " /> : null
                                    }
                                </>
                            )) : <h6>You don't have any past activity</h6>
                        }
                    </Masonry>
                </div>
            </div>
            <div className="clearfix"></div>
        </div>
    </div>
)