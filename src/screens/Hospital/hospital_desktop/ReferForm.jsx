import React from 'react';
import $ from 'jquery';
import begainArrowBlue from '../../../desktopImages/begainArrowBlue.png';
import Header from '../../mainscreens/Header';
import Footer from '../Footer'; 
import AddCaseForms from '../forms/AddCaseForms.jsx';
import * as utils from '../utils/utils.js';
import Banner from '../../mainscreens/Banner'
import Loader from 'react-loader-spinner'

import ActivityActiveCard from '../cards/ActivityActiveCard.jsx';
import ActivityCompletedCard from '../cards/ActivityCompletedCard.jsx';
import ActivityPendingCard from '../cards/ActivityPendingCard.jsx';
import ActivityRejectedCard from '../cards/ActivityRejectedCard.jsx';


const masonryOptions = {
    transitionDuration: 0
};
let pageNames = "Refer"
const hsProfile = {
    hospital_id: '',
    hospital_name: '',
    hospital_city: '',
    hospital_state: '',
    hospital_image: '',
    hospital_address: '',
    hospital_featured_image: '',
    hospital_about: ''
}
let recentActivityArray = [];
class ReferForm extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id;
        this.state = {
            display: false,
            loader_status: true,
            banner_display:false
        };

    }

    componentDidMount() {
        window.document.title = "CLIRNET - Start a Referral"
        $('.li_discuss_and_refer').attr('id', 'discuss_and_refer_cal');
        $(".hospitals_mobile").addClass("active");
        recentActivityArray = [];
        let id = this.props.match.params.id;
        utils.getHospitalProfile(id, 'true').then(data => {
            if (data.status_code == 200) {
                this.parseResponseJson(data)
            } else {
                utils.redirectToLogin(this.props.history)
            }

        });
    }

    parseResponseJson(response) {
        if (response.status_code == 200 && response.data.status == true) {
            hsProfile.hospital_id = response.data.client.client_master_id;
            hsProfile.hospital_name = response.data.client.client_name;
            hsProfile.hospital_city = response.data.client.client_city;
            hsProfile.hospital_state = response.data.client.client_state;
            hsProfile.hospital_image = response.data.client.client_logo;
            hsProfile.hospital_address = response.data.client.client_address;
            hsProfile.hospital_featured_image = response.data.client.referral_featured_image;
            hsProfile.hospital_about = response.data.client.about_client;
            if (response.data.data) {
                if (response.data.data.length > 0) {
                    response.data.data.map((aData, ind) => {
                        if (ind < 7)
                            recentActivityArray.push(aData);
                    });
                }
            }
            this.refresh();
        } else {
            this.setState({ 'loader_status': false });
        }
    }

    refresh = () => {
        // console.log('in refresh')
        this.setState({ "display": !this.state.display });
    }

    bannerCallback = ()=>{
        this.setState({banner_display: !this.state.banner_display});
    }

    onCardClick(data){ 
        // this.setState({cliked_card_data:data})
    }

    render() {
        return (
            <div className="full_width dskScreen">
                <Header history={this.props.history} page_name={pageNames} />
                <Banner type_id={this.id} type={"refer_form"}  apiresponserecieved={this.bannerCallback} api_call_detail={1} api_call={0}/>
                <div className="full_width dskHspitalFormRefer">
                    <div className="container mycontainer">
                        <section className="full_width adsArea">
                            <div className="full_width adsFrame">
                            {this.state.banner_display?<Banner type_id={this.id} banner_position={1} unmount_call={1} type={"refer_form"} api_call={1} before_unload_call={1} />:null}
                            </div>
                        </section>
                        <div className="row">
                            {
                                (hsProfile.hospital_id) ?
                                    <AddCaseForms data="test" id={this.id} propfileDetails={hsProfile} operation_type={2} history={this.props.history} /> :
                                    <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={40} width={40} visible={true} />
                            }
                            {
                                (recentActivityArray.length > 0) ?
                                    <RecentActivities id={this.id} activities={recentActivityArray} history={this.props.history}  click={this.onCardClick.bind(this)}  banner_display_status={this.state.banner_display}/> : null
                            }
                        </div>
                    </div>
                </div>
                <Footer history={this.props.history} />
            </div >
        )
    }
}
export default ReferForm;

const RecentActivities = (props) => (
    <div className="col-xl-4 col-12 dskHspitalFormRight">

        {props.banner_display_status?<Banner type_id={props.id} banner_position={3} unmount_call={1} type={"refer_form"} api_call={1} before_unload_call={0} />:null}

        <div className="full_width dskRightActivities">
            <div className="dskRightActivitiesTtl">
                <h3 className="font500 font_18px colorBlack fontExo">Recent Activities</h3>
                <a className="colorBlue font_14px" href="javascript:void(0)" onClick={utils.redirectToActivity.bind(this, props.history, 'all')}>View All <img src={begainArrowBlue} /></a>
            </div>
            <div className="full_width dskRightActivitiesBoxArea">
                <div className="row">
                    {(props.activities.length > 0) ?
                        props.activities.map((aData) => (
                            <>
                                {(aData.process_status == 2 || aData.process_status == 3) ?
                                    <ActivityActiveCard 
                                    data={aData} 
                                    click={props.click.bind(this)} 
                                    customClass="col-12" /> : null
                                }
                                {(aData.process_status == 4 || aData.process_status == 5) ?
                                    <ActivityCompletedCard
                                        data={aData}
                                        click={props.click.bind(this)} 
                                        referClick={utils.updateDiscussToReferStatus.bind(this, props.history, aData.master_referral_discussion_id)}
                                        reDiscussClick={utils.redirectToReferalReinitiate.bind(this, props.history, aData.master_referral_discussion_id)}
                                        customClass="col-12" /> : null
                                }
                                {(aData.process_status == 8 || aData.process_status == 9 || aData.process_status == 10 || aData.process_status == 11) ?
                                    <ActivityRejectedCard
                                        click={props.click.bind(this)} 
                                        referClick={utils.updateDiscussToReferStatus.bind(this, props.history, aData.master_referral_discussion_id)}
                                        reDiscussClick={utils.redirectToReferalReinitiate.bind(this, props.history, aData.master_referral_discussion_id)}
                                        data={aData}
                                        customClass="col-12" /> : null
                                }
                                {(aData.process_status == 1) ?
                                    <ActivityPendingCard
                                     data={aData}
                                     click={props.click.bind(this)} 
                                      customClass="col-12" /> : null
                                }
                            </>
                        )) : null
                    }
                </div>
            </div>
            {props.banner_display_status?<Banner type_id={props.id} banner_position={4} unmount_call={0} type={"refer_form"} api_call={1} before_unload_call={0} />:null}
        </div>
    </div>
)
