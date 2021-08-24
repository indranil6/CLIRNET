import React from 'react';
import Loader from 'react-loader-spinner'
import $ from 'jquery';
import Header from '../../mainscreens/Header';
import Footer from '../Footer';
import 'firebase/storage';
import begainArrowBlue from '../../../desktopImages/begainArrowBlue.png';
import begainArrow from '../../../desktopImages/begainArrow.png';
import fileUpload from '../../../desktopImages/fileUpload.png'; 
import visibility from '../../../desktopImages/visibility.png';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import * as utils from '../utils/utils.js';
import Banner from '../../mainscreens/Banner'
import ActivityActiveCard from '../cards/ActivityActiveCard.jsx';
import ActivityCompletedCard from '../cards/ActivityCompletedCard.jsx';
import ActivityPendingCard from '../cards/ActivityPendingCard.jsx';
import ActivityRejectedCard from '../cards/ActivityRejectedCard.jsx';


const masonryOptions = {
    transitionDuration: 0
};
let pageNames = "Re Innitiate"
const hsProfile = {
    hospital_id: '',
    hospital_name: '',
    hospital_city: '',
    hospital_state: '',
    hospital_image: '',
    hospital_address: '',
    hospital_featured_image: ''
}
let hospitalListArray = []
let recentActivityArray = [];

let reInitialiseData = {
    referrer_client_master_id: '',
    operation_type: '',
    action_type: '1',
    pat_first_name: '',
    pat_middle_name: '',
    pat_last_name: '',
    pat_mobile: '',
    calc_pat_age: '',
    pat_gender: '',
    pat_email: '',
    referral_case_subject: '',
    case_detail: '',
    operation_type_name: '',
    case_prescription: [],
    case_reports: []
}

let reinnitializeServerData = {
    master_referral_discussion_id: '',
    operation_type: '',
    action_type: '',
    referred_client_master_id: '',
    case_detail: ''
}
class ReferThankYou extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id;
        this.state = {
            display: false,
            loader_status: true,
            banner_display:false
        };

    }


    componentDidMount(props) {
        window.document.title = "CLIRNET - Reinitiate a Discussion"
        $('.li_discuss_and_refer').attr('id', 'discuss_and_refer_cal');
        $(".hospitals_mobile").addClass("active");
        recentActivityArray = [];
        let id = this.id


        utils.getActivityDetail(id).then(response => {
            if (response.status_code == 200) {
                this.getReInnitialiseData(response.data.data[0])
            } else {
                utils.redirectToLogin(this.props.history)
            }
        });
        utils.getLandingPage().then(data => {
            this.getHospiatlList(data)
        });
    }

    componentWillUnmount() {
        hsProfile.hospital_id = '';
        hsProfile.hospital_name = '';
        hsProfile.hospital_city = '';
        hsProfile.hospital_state = '';
        hsProfile.hospital_image = '';
        hsProfile.hospital_address = '';
        hsProfile.hospital_featured_image = '';
        hsProfile.hospital_about = '';

        hospitalListArray = [];
        recentActivityArray = [];

        reInitialiseData.referrer_client_master_id = ''
        reInitialiseData.operation_type = '';
        reInitialiseData.action_type = '1';
        reInitialiseData.pat_first_name = '';
        reInitialiseData.pat_middle_name = '';
        reInitialiseData.pat_last_name = '';
        reInitialiseData.pat_mobile = '';
        reInitialiseData.calc_pat_age = '';
        reInitialiseData.pat_gender = '';
        reInitialiseData.pat_email = '';
        reInitialiseData.referral_case_subject = '';
        reInitialiseData.case_detail = '';
        reInitialiseData.operation_type_name = '';
        reInitialiseData.case_prescription = [];
        reInitialiseData.case_reports = [];

        reinnitializeServerData.master_referral_discussion_id = '';
        reinnitializeServerData.operation_type = '';
        reinnitializeServerData.action_type = '1';
        reinnitializeServerData.referred_client_master_id = '';
        reinnitializeServerData.case_detail = '';
    }


    getHospiatlList(response) {
        hospitalListArray = [];
        let responseDataArray = []
        if (response.status_code == 200) {
            responseDataArray = response.data.data;
            responseDataArray.map((rData, ind) => {
                hospitalListArray.push(rData)
            });
            this.setState({ 'loader_status': false });
        } else {
            this.setState({ 'loader_status': false });
        }
    }

    getReInnitialiseData(state) {

        if (state) {
            // console.log("from Data"+ unescape(state.case_prescription))
            let full_name = ''
            if (state.pat_first_name && state.pat_middle_name && state.pat_last_name) {
                full_name = state.pat_first_name + ' ' + state.pat_middle_name + ' ' + state.pat_last_name
            } else if (!state.pat_middle_name) {
                full_name = state.pat_first_name + ' ' + state.pat_last_name
            } else {
                full_name = state.pat_first_name + ' ' + state.pat_last_name
            }
            reInitialiseData.referred_client_master_id = state.referred_client_master_id
            reInitialiseData.operation_type = state.operation_type
            reInitialiseData.action_type = state.action_type
            reInitialiseData.pat_full_name = full_name
            reInitialiseData.pat_mobile = state.pat_mobile
            reInitialiseData.calc_pat_age = state.calc_pat_age
            reInitialiseData.pat_gender = state.pat_gender
            reInitialiseData.pat_email = state.pat_email
            reInitialiseData.referral_case_subject = state.referral_case_subject
            reInitialiseData.case_detail = state.case_detail
            reInitialiseData.operation_type_name = state.operation_type_name

            let prescriptionData = JSON.parse(unescape(state.case_prescription))
            let caseReportData = JSON.parse(unescape(state.case_reports))
            reInitialiseData.case_prescription.push(prescriptionData)
            reInitialiseData.case_reports.push(caseReportData)

        } else {
            // console.log("no state found")
            utils.redirectToActivity(this.props.history)
        }
        this.refresh()
        utils.getHospitalProfile(reInitialiseData.referred_client_master_id, 'false').then(data => {
            this.parseResponseJson(data)
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

    onChangeHandler = type => (val) => {
        switch (type) {
            case 'hospitals':
                reInitialiseData.referred_client_master_id = val.target.value
                reinnitializeServerData.referred_client_master_id = val.target.value
                // ToastsStore.warning("Select Hospital"+reInitialiseData.referred_client_master_id)
                break;
            case 'case_condition':
                reInitialiseData.action_type = val.target.value
                reinnitializeServerData.action_type = val.target.value
                break;
            case 'case_details':
                reInitialiseData.case_detail = val.target.value
                reinnitializeServerData.case_detail = val.target.value
                break;
            default:
                break;
        }
        this.refresh()
        // selectedHospital = this.menu.value
    }

    validateDataForSubmission() {
        // ToastsStore.warning("Select Hospital"+reInitialiseData.referred_client_master_id)
        if (!reInitialiseData.referred_client_master_id) {
            ToastsStore.error("Select Hospital")
        } else if (!reInitialiseData.action_type) {
            ToastsStore.error("Something went wrong reload page again")
        } else if (!reInitialiseData.case_detail) {
            ToastsStore.error("Please enter case details")
        } else if (!this.id) {
            ToastsStore.error("Something went wrong reload page again")
        } else {
            reinnitializeServerData.master_referral_discussion_id = this.id
            reinnitializeServerData.operation_type = reInitialiseData.operation_type;
            reinnitializeServerData.action_type = reInitialiseData.action_type;
            reinnitializeServerData.referred_client_master_id = reInitialiseData.referred_client_master_id
            reinnitializeServerData.case_detail = reInitialiseData.case_detail
            utils.submitReInnitiateForms(reinnitializeServerData).then(data => {
                utils.redirectToReferalThankYou(this.props.history, reInitialiseData.referred_client_master_id)
            });
        }
    }
    
    onCardClick(data){ 
        // this.setState({cliked_card_data:data})
    }

    render() {
        // console.log("datas///////////////////"+reInitialiseData.pat_full_name)
        return (
            <div className="full_width dskScreen">
                <Header history={this.props.history} page_name={pageNames} />
                <Banner type_id={this.id} type={"re_initiate_refer"}  apiresponserecieved={this.bannerCallback} api_call_detail={1} api_call={0}/>
                <div className="full_width dskHspitalFormReInitiate">
                    <div className="container mycontainer">
                        <section className="full_width adsArea">
                            <div className="full_width adsFrame">
                            {this.state.banner_display?<Banner type_id={this.id} banner_position={1} unmount_call={1} type={"re_initiate_refer"} api_call={1} before_unload_call={1} />:null}
                            </div>
                        </section>
                        <div className="row">

                            <div className="col-xl-8 col-12 dskHspitalFormLeft">
                                <div className="full_width text-left dskHspitalFormLeft_in">
                                    <div className="full_width text-left colorWhite dskHspitalFormTtl">
                                        <div className="full_width dskHspitalFormTtlIn">
                                            <h4 className="font_18px font500">Re Initiate</h4>
                                        </div>
                                    </div>
                                    <div className="full_width dskHsptlReInitiateSelect">
                                        <Form.Control as="select" onChange={this.onChangeHandler('hospitals')} >
                                            <option value="">Select a Hospital</option>
                                            {(hospitalListArray.length > 0) ?
                                                hospitalListArray.map((rData) => (
                                                    (reInitialiseData.referred_client_master_id == rData.client_master_id) ?
                                                        <option value={rData.client_master_id} selected>{rData.client_name}</option> :
                                                        <option value={rData.client_master_id}>{rData.client_name}</option>
                                                )) : null
                                            }
                                        </Form.Control>
                                    </div>
                                    <div className="full_width dskHspitalFormArea">
                                        {/* <h3 className="colorBlack font400 fontExo dskHspltCmnTtl">Add Case Details</h3> */}
                                        <div className="clearfix"></div>
                                        <div className="full_width dskHspitalFormBody">
                                            <Form className="font400 font_14px colorBlack">
                                                {
                                                    (reInitialiseData.referred_client_master_id) ?
                                                        <>
                                                            <ReInnitiateForm data={reInitialiseData} onFormSubmit={this.validateDataForSubmission.bind(this)} onChangeHandler={this.onChangeHandler.bind(this)} />
                                                        </> :

                                                        <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={40} width={40} visible={this.state.loader_status} />
                                                }
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                                {this.state.banner_display?<Banner type_id={this.id} banner_position={2} unmount_call={0} type={"re_initiate_refer"} api_call={1} before_unload_call={0} />:null}
                            </div>
                            {
                                (recentActivityArray.length > 0) ?
                                    <RecentActivities id={this.id} activities={recentActivityArray} history={this.props.history}  click={this.onCardClick.bind(this)}  banner_display_status={this.state.banner_display}/> : null
                            }

                        </div>
                    </div>
                </div>
                <ToastsContainer store={ToastsStore} />
                <Footer history={this.props.history} />
            </div >
        )
    }
}
export default ReferThankYou;

const ReInnitiateForm = (props) => (
    <Form.Row>
        <Form.Group className="col-sm-6 col-12">
            <Form.Label className="font400 font_14px colorBlack">Case Topic<span className="colorRed">*</span></Form.Label>
            <Form.Control type="Enter Topic" placeholder="case topic" value={props.data.referral_case_subject} />
        </Form.Group>
        <Form.Group className="col-sm-6 col-12">
            <Form.Label className="font400 font_14px colorBlack">Patient Name</Form.Label>
            <Form.Control type="Enter Topic" placeholder="Patient Full Name" value={props.data.pat_full_name} />
        </Form.Group>

        <Form.Group className="col-sm-6 col-12">
            <Form.Row>
                <Form.Group className="col-9">
                    <Form.Label className="font400 font_14px colorBlack">Gender</Form.Label>
                    <div className="full_width dskHspitalFormGndrArea">
                        {((props.data.pat_gender).toLowerCase() == "male") ?
                            <Form.Check className="dskHspitalFormGndr" checked type="radio" label="Male" name="gender" disabled={true} /> :
                            <Form.Check className="dskHspitalFormGndr" type="radio" label="Male" name="gender" disabled={true} />
                        }
                        {((props.data.pat_gender).toLowerCase() == "female") ?
                            <Form.Check className="dskHspitalFormGndr" checked type="radio" label="Female" name="gender" disabled={true} /> :
                            <Form.Check className="dskHspitalFormGndr" type="radio" label="Female" name="gender" disabled={true} />
                        }
                        {((props.data.pat_gender).toLowerCase() == "other") ?
                            <Form.Check className="dskHspitalFormGndr" checked type="radio" label="Others" name="gender" disabled={true} /> :
                            <Form.Check className="dskHspitalFormGndr" type="radio" label="Others" name="gender" disabled={true} />
                        }
                    </div>

                </Form.Group>
                <Form.Group className="col-3">
                    <Form.Label className="font400 font_14px colorBlack">Age</Form.Label>
                    <Form.Control type="Age" placeholder="Age" value={props.data.calc_pat_age} disabled={true} />
                </Form.Group>
            </Form.Row>
        </Form.Group>

        <Form.Group className="col-sm-6 col-12">
            <Form.Label className="font400 font_14px colorBlack">Case Condition or Urgency</Form.Label>
            <Form.Control as="select" onChange={props.onChangeHandler('case_condition')}>
                {(props.data.action_type == 1) ?
                    <option value="1" selected>General</option> :
                    <option value="1">General</option>
                }
                {(props.data.action_type == 2) ?
                    <option value="2" selected>Critical</option> :
                    <option value="2">Critical</option>
                }
                {(props.data.action_type == 3) ?
                    <option value="3" selected>Advance</option> :
                    <option value="3">Advance</option>
                }
            </Form.Control>
        </Form.Group>
        {(props.data.case_reports.length > 0) ?
            <Form.Group className="col-sm-6 col-12">
                <div className="full_width dskHspitalFormDblFile">
                    <Form.Label className="font400 font_14px colorBlack">Patient Consent <img src={begainArrow} />
                    </Form.Label>
                </div>
            </Form.Group> : null}
        {(props.data.case_prescription.length > 0) ?
            <Form.Group className="col-sm-6 col-12 dskHspitalFormFileINBig">
                <div className="full_width dskHspitalFormDblFile">
                    <Form.Label className="font400 font_14px colorBlack">Prescription &amp; Case Reports<img src={begainArrow} /></Form.Label>
                </div>
            </Form.Group> : null}
        {(props.data.case_reports.length > 0 || props.data.case_prescription.length > 0) ?
            <Form.Group className="col-12 dskHspitalFormFileShowRow">
                <Form.Row>
                    <div className="col-sm-6 col-12 dskHspitalFormFileShow">
                        <div className="row">
                            {
                                (props.data.case_reports.length > 0) ?
                                    <>
                                        {
                                            props.data.case_reports.map((rData, ind) => (
                                                <>
                                                    {
                                                        // (rData.type === 'pdf') ?
                                                        <FilePreviewCard data={rData} fileType={rData.type} actionType='edit' cardIndex={ind} />
                                                        // :null
                                                    }
                                                </>
                                            ))
                                        }
                                    </> : null
                            }
                        </div>
                    </div>
                    <div className="col-sm-6 col-12 dskHspitalFormFileShow">
                        <div className="row">
                            {
                                (props.data.case_prescription.length > 0) ?
                                    <>
                                        {
                                            props.data.case_prescription.map((rData, ind) => (
                                                <>
                                                    {
                                                        // (rData.type === 'pdf') ?
                                                        <FilePreviewCard data={rData} fileType={rData.type} actionType='edit' cardIndex={ind} />
                                                        // :null
                                                    }
                                                </>
                                            ))
                                        }
                                    </> : null
                            }
                        </div>
                    </div>
                </Form.Row>
            </Form.Group> : null}
        <Form.Group className="col-12">
            <Form.Label>Case Details</Form.Label>
            <Form.Control as="textarea" rows={5} placeholder="Please Write The Case Details For Reference" value={props.data.case_detail} onChange={props.onChangeHandler('case_details')} />
        </Form.Group>
        <Form.Group className="col-12 text-center">
            <Button className="radius-8 colorWhite dskHspltDbCardBttn" onClick={props.onFormSubmit}>
                <span>Request for Re Innitiate</span>
            </Button>
        </Form.Group>
    </Form.Row>
)

const FilePreviewCard = (props) => (
    <div className="col-3 dskHspitalFormFileBox">
        {/* {alert("url"+props.data[0].url)} */}
        {(props.data[0].fie_type !== 'pdf') ?
            <div className="full_width dskHspitalFormFileBoxIn">
                <img src={props.data[0].url} className="translate_both" />
                <div className="transition6s dskHspitalFormFileBoxAction dskHspitalFormFileBoxActionView" onClick={utils.onPreviewClick.bind(this, props.data[0].url)}>
                    <img src={visibility} className="translate_both" />
                </div>
            </div> :
            <div className="full_width dskHspitalFormFileBoxIn">
                <img src="https://image.flaticon.com/icons/png/512/337/337946.png" className="translate_both" />
                <div className="transition6s dskHspitalFormFileBoxAction dskHspitalFormFileBoxActionView" onClick={utils.onPreviewClick.bind(this, props.data[0].url)}>
                    <img src={visibility} className="translate_both" />
                </div>
            </div>
        }
    </div>
)

const RecentActivities = (props) => (
    <>
        <div className="col-xl-4 col-12 dskHspitalFormRight">
        {props.banner_display_status?<Banner type_id={props.id} banner_position={3} unmount_call={0} type={"re_initiate_refer"} api_call={1} before_unload_call={0} />:null}
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
                                        <ActivityActiveCard data={aData} customClass="col-12" /> : null
                                    }
                                    {(aData.process_status == 4 || aData.process_status == 5) ?
                                        <ActivityCompletedCard
                                            data={aData}
                                            referClick={utils.updateDiscussToReferStatus.bind(this, props.history, aData.master_referral_discussion_id)}
                                            reDiscussClick={utils.redirectToReferalReinitiate.bind(this, props.history, aData.master_referral_discussion_id)}
                                            customClass="col-12" /> : null
                                    }
                                    {(aData.process_status == 8 || aData.process_status == 9 || aData.process_status == 10 || aData.process_status == 11) ?
                                        <ActivityRejectedCard
                                            referClick={utils.updateDiscussToReferStatus.bind(this, props.history, aData.master_referral_discussion_id)}
                                            reDiscussClick={utils.redirectToReferalReinitiate.bind(this, props.history, aData.master_referral_discussion_id)}
                                            data={aData}
                                            customClass="col-12" /> : null
                                    }
                                    {(aData.process_status == 1) ?
                                        <ActivityPendingCard data={aData} customClass="col-12" /> : null
                                    }
                                </>
                            )) : null
                        }
                    </div>
                </div>
                {props.banner_display_status?<Banner type_id={props.id} banner_position={4} unmount_call={0} type={"re_initiate_refer"} api_call={1} before_unload_call={0} />:null}
            </div>
        </div>
    </>
)