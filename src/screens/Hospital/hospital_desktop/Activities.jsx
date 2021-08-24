import React from 'react';
import $ from 'jquery';
import Header from '../../mainscreens/Header';
import Footer from '../Footer';
import 'firebase/storage';
import Masonry from 'react-masonry-component';
import ActivityActiveCard from '../cards/ActivityActiveCard.jsx';
import ActivityCompletedCard from '../cards/ActivityCompletedCard.jsx';
import ActivityPendingCard from '../cards/ActivityPendingCard.jsx';
import ActivityRejectedCard from '../cards/ActivityRejectedCard.jsx';
import * as utils from '../utils/utils.js';
import Loader from 'react-loader-spinner';
import Banner from '../../mainscreens/Banner';
import ViewActivity from '../modal/ViewActivity';


const masonryOptions = {
    transitionDuration: 0
};

let pageNames = "Activities"

let showActivityArray = [];
let allActivityArray = [];
let pendingActivityArray = [];
let completedActivityArray = [];
let rejectedActivityArray = [];
let activeActivityArray = [];

let badgeCounter = {
    all: 0,
    active: 0,
    completed: 0,
    pending: 0,
    rejected: 0
}

const ALL_BTN_NAME = 'all';
const PENDING_BTN_NAME = 'pending';
const COMPLTED_BTN_NAME = 'completed';
const ACTIVE_BTN_NAME = 'active';
const REQUESTED_BTN_NAME = 'rejected';

let button_val = ALL_BTN_NAME;
class Activities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false,
            loader_status: true,
            cliked_card_data:'',
            banner_display:false,
            api_call:true
        };
        this.type = this.props.match.params.type
        button_val = ALL_BTN_NAME

        if (this.type) {
            this.checkTab();
        }
    }

    componentWillUnmount() {
        showActivityArray = [];
        allActivityArray = [];
        pendingActivityArray = [];
        completedActivityArray = [];
        rejectedActivityArray = [];
        activeActivityArray = [];
    }

    componentDidMount() {
        window.document.title = "CLIRNET - DnR Activities"

        $('.li_discuss_and_refer').attr('id', 'discuss_and_refer_cal');
        $(".activities_mobile").addClass("active");
        showActivityArray = [];
        allActivityArray = [];
        pendingActivityArray = [];
        completedActivityArray = [];
        rejectedActivityArray = [];
        activeActivityArray = [];

        utils.getActivities(true).then(data => {
            if (data.status_code == 200) {
                this.setState({api_call:false});
                this.parseResponseJson(data)
            } else {
                this.setState({api_call:false});
                utils.redirectToLogin(this.props.history)
            }
        });
    }

    checkTab() {
        let tab = this.type;
        if (tab)
            switch (tab.toLowerCase()) {
                case ALL_BTN_NAME:
                    button_val = ALL_BTN_NAME
                    break;
                case PENDING_BTN_NAME:
                    button_val = PENDING_BTN_NAME
                    break;
                case COMPLTED_BTN_NAME:
                    button_val = COMPLTED_BTN_NAME
                    break;
                case ACTIVE_BTN_NAME:
                    button_val = ACTIVE_BTN_NAME
                    break;
                case REQUESTED_BTN_NAME:
                    button_val = REQUESTED_BTN_NAME
                    break;
                default:
                    button_val = ALL_BTN_NAME
                    break;
            }
        this.refresh()
    }
    parseResponseJson(response) {
        if (response.status_code == 200 && response.data.status == true) {
            if (response.data.data) {
                if (response.data.data.length > 0) {
                    allActivityArray = response.data.data;
                    response.data.data.map((aData) => {
                        if (aData.process_status == 2 || aData.process_status == 3) {
                            activeActivityArray.push(aData);
                        }
                        if (aData.process_status == 4 || aData.process_status == 5) {
                            completedActivityArray.push(aData);
                        }
                        if (aData.process_status == 1) {
                            pendingActivityArray.push(aData);
                        }
                        if (aData.process_status == 8 || aData.process_status == 9 || aData.process_status == 10 || aData.process_status == 11) {
                            rejectedActivityArray.push(aData);
                        }
                    });
                }
            }
            badgeCounter.all = allActivityArray.length;
            badgeCounter.active = activeActivityArray.length;
            badgeCounter.completed = completedActivityArray.length;
            badgeCounter.pending = pendingActivityArray.length;
            badgeCounter.rejected = rejectedActivityArray.length;
            this.onTabChange(button_val);
            this.setState({ 'loader_status': false });
        } else {
            this.setState({ 'loader_status': false });
        }
    }

    onTabChange(selectBtn) {
        // console.log('selectBtn' + selectBtn)
        switch (selectBtn) {
            case ALL_BTN_NAME:
                button_val = selectBtn
                showActivityArray = allActivityArray;
                break;
            case ACTIVE_BTN_NAME:
                button_val = selectBtn
                showActivityArray = activeActivityArray;
                break;
            case COMPLTED_BTN_NAME:
                button_val = selectBtn
                showActivityArray = completedActivityArray;
                break;
            case PENDING_BTN_NAME:
                button_val = selectBtn
                showActivityArray = pendingActivityArray;
                break;
            case REQUESTED_BTN_NAME:
                button_val = selectBtn
                showActivityArray = rejectedActivityArray;
                break;
            default:
                alert("Something went wrong")
                break;
        }
        this.refresh();
    }

    refresh = () => {
        this.setState({ "display": !this.state.display });
    }

    bannerCallback = ()=>{
        this.setState({banner_display: !this.state.banner_display});
    }

    onCardClick(data){ 
        this.setState({cliked_card_data:data})
    }

    onModalClose(){
        // alert("Clicked")
        this.setState({cliked_card_data:''})
    }

    render() {
        return (
            <div className="full_width dskScreen">
                <Header history={this.props.history} page_name={pageNames} />
                <Banner type_id={0} type={"activties"}  apiresponserecieved={this.bannerCallback} api_call_detail={1} api_call={0}/>
                <div className="full_width hspitalActivities">
                    <div className="container mycontainer">
                        <section className="full_width adsArea">
                            <div className="full_width adsFrame">
                                {this.state.banner_display? <Banner type_id={0} banner_position={1} unmount_call={1} type={"activties"} api_call={1} before_unload_call={1} />:null}
                            </div>
                        </section>
                        <ActivityFilter selectedTab={button_val} ontabClick={this.onTabChange.bind(this)} counts={badgeCounter} />
                        <div className="clearfix"></div>
                        {
                            (showActivityArray.length > 0) ?
                                <ActivitiesList 
                                activities={showActivityArray} 
                                history={this.props.history} 
                                click={this.onCardClick.bind(this)}/> :
                                <>
                                {!this.state.loader_status ?  
                                <div className="full_width alert alert-danger">
                                    <strong>No Activities Found</strong>
                                </div>:null}
                                </>
                        }
                        <div className="clearfix"></div>
                        {this.state.banner_display?<Banner type_id={0} banner_position={2} unmount_call={0} type={"activties"} api_call={1} before_unload_call={0} />:null}
                    </div>
                    <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={40} width={40} visible={this.state.loader_status} />
                </div>
                {this.state.cliked_card_data?
                <ViewActivity
                 onCloseModal={this.onModalClose.bind(this)}
                 data={this.state.cliked_card_data}/>:null}   
                <Footer history={this.props.history} />
            </div>
        )
    }
}
export default Activities;

const ActivityFilter = (props) => {
    return (
        <div className="full_width dskHspltActvTTlArea">
            <div className="row align-items-center justify-content-between">
                <h3 className="colorBlack font_24px font400 fontExo dskHspltCmnTtl">Activities</h3>
                <ul className="dskHspltActiveNav">
                    {(props.selectedTab == ALL_BTN_NAME) ?
                        <li className="active"><a href="javascript:void(0)" onClick={props.ontabClick.bind(this, ALL_BTN_NAME)}>All ({(props.counts.all >= 0 && props.counts.all != undefined && props.counts.all != '') ? props.counts.all : 0})</a></li> :
                        <li><a href="javascript:void(0)" onClick={props.ontabClick.bind(this, ALL_BTN_NAME)}>All ({(props.counts.all >= 0 && props.counts.all != undefined && props.counts.all != '') ? props.counts.all : 0})</a></li>
                    }
                    {(props.selectedTab == PENDING_BTN_NAME) ?
                        <li className="active"><a href="javascript:void(0)" onClick={props.ontabClick.bind(this, PENDING_BTN_NAME)}>Pending ({(props.counts.pending >= 0 && props.counts.pending != undefined && props.counts.pending != '') ? props.counts.pending : 0})</a></li> :
                        <li><a href="javascript:void(0)" onClick={props.ontabClick.bind(this, PENDING_BTN_NAME)}>Pending ({(props.counts.pending >= 0 && props.counts.pending != undefined && props.counts.pending != '') ? props.counts.pending : 0})</a></li>
                    }
                    {(props.selectedTab == ACTIVE_BTN_NAME) ?
                        <li className="active"><a href="javascript:void(0)" onClick={props.ontabClick.bind(this, ACTIVE_BTN_NAME)}>Active Cases ({(props.counts.active >= 0 && props.counts.active != undefined && props.counts.active != '') ? props.counts.active : 0})</a></li> :
                        <li><a href="javascript:void(0)" onClick={props.ontabClick.bind(this, ACTIVE_BTN_NAME)}>Active Cases ({(props.counts.active >= 0 && props.counts.active != undefined && props.counts.active != '') ? props.counts.active : 0})</a></li>
                    }
                    {(props.selectedTab == COMPLTED_BTN_NAME) ?
                        <li className="active"><a href="javascript:void(0)" onClick={props.ontabClick.bind(this, COMPLTED_BTN_NAME)}>Completed ({(props.counts.completed >= 0 && props.counts.completed != undefined && props.counts.completed != '') ? props.counts.completed : 0})</a></li> :
                        <li><a href="javascript:void(0)" onClick={props.ontabClick.bind(this, COMPLTED_BTN_NAME)}>Completed ({(props.counts.completed >= 0 && props.counts.completed != undefined && props.counts.completed != '') ? props.counts.completed : 0})</a></li>
                    }
                    {(props.selectedTab == REQUESTED_BTN_NAME) ?
                        <li className="active"><a href="javascript:void(0)" onClick={props.ontabClick.bind(this, REQUESTED_BTN_NAME)}>Rejected ({(props.counts.rejected >= 0 && props.counts.rejected != undefined && props.counts.rejected != '') ? props.counts.rejected : 0})</a></li> :
                        <li><a href="javascript:void(0)" onClick={props.ontabClick.bind(this, REQUESTED_BTN_NAME)}>Rejected ({(props.counts.rejected >= 0 && props.counts.rejected != undefined && props.counts.rejected != '') ? props.counts.rejected : 0})</a></li>
                    }
                </ul>
            </div>
        </div>
    )
}

const ActivitiesList = (props) => (
    <div className="row">
        <div class="full_width">
            <div class="full_width tab-Area">
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
                                    <ActivityActiveCard 
                                    click={props.click.bind(this)} 
                                    data={aData} 
                                    customClass="col-lg-4 col-md-6 col-12 " /> : null
                                }
                                {(aData.process_status == 4 || aData.process_status == 5) ?
                                    <ActivityCompletedCard
                                        data={aData}
                                        click={props.click.bind(this)} 
                                        referClick={utils.updateDiscussToReferStatus.bind(this, props.history, aData.master_referral_discussion_id)}
                                        reDiscussClick={utils.redirectToReferalReinitiate.bind(this, props.history, aData.master_referral_discussion_id)}
                                        customClass="col-lg-4 col-md-6 col-12 " /> : null
                                }
                                {(aData.process_status == 8 || aData.process_status == 9 || aData.process_status == 10 || aData.process_status == 11) ?
                                    <ActivityRejectedCard
                                        data={aData}
                                        click={props.click.bind(this)} 
                                        referClick={utils.updateDiscussToReferStatus.bind(this, props.history, aData.master_referral_discussion_id)}
                                        reDiscussClick={utils.redirectToReferalReinitiate.bind(this, props.history, aData.master_referral_discussion_id)}
                                        customClass="col-lg-4 col-md-6 col-12 " /> : null
                                }
                                {(aData.process_status == 1) ?
                                    <ActivityPendingCard
                                    click={props.click.bind(this)} 
                                    data={aData} 
                                    customClass="col-lg-4 col-md-6 col-12 " /> : null
                                }
                            </>
                        )) :
                        null
                    }
                </Masonry>
            </div>
        </div>
    </div>
)