import React from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import $ from 'jquery';
import firebase from 'firebase/app'
import Loader from 'react-loader-spinner'

import AppConfig from '../../config/config.js';
import begainArrowBlue from '../../../desktopImages/begainArrowBlue.png';
import begainArrow from '../../../desktopImages/begainArrow.png';
import fileUpload from '../../../desktopImages/fileUpload.png';
import redClose from '../../../desktopImages/redClose.png';
import visibility from '../../../desktopImages/visibility.png';
import Form from 'react-bootstrap/Form';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import * as utils from '../utils/utils.js';
import Button from 'react-bootstrap/Button';
import samplePatConcentFile from '../files/samplePatientConsent.pdf'
import UpdateProfile from '../modal/UpdateProfile.jsx';
import 'firebase/storage';
require('firebase/auth');


var firebase_config = {
    apiKey: "AIzaSyB4yxW3LklwGsHHMqWQXuR2GCSusqJ8Ubk",
    authDomain: "http://clirnetapp.appspot.com/",
    databaseURL: "https://clirnetapp.firebaseio.com/",
    projectId: "clirnetapp",
    storageBucket: "clirnetapp.appspot.com",
    messagingSenderId: "66526267590"
}
// try {
//     firebase.initializeApp(firebase_config);
//     } catch (err) {
//     // not an actual error when we're hot-reloading
//     if (!/already exists/.test(err.message)) {
//     console.error('Firebase initialization error', err.stack)
//     }
// }
const storage = firebase.storage()

let fromDetails = {
    referred_client_master_id: '',
    operation_type: '',
    action_type: '1',
    pat_full_name: '',
    pat_phone_number: '',
    pat_age: '',
    pat_gender: 'Male',
    pat_email: '',
    case_topic: '',
    case_detail: '',
    case_prescription: [],
    case_reports: []
}
let patientCaseFileArr = []
let prescriptionFileArr = []
let phoneNoFormat = /^\d{10}$/;
let nameFormat = /^[a-zA-Z]+( [a-zA-Z]+)+$/;
let support_file_extension_array = ['pdf', 'svg', 'jpg', 'png', 'jpeg'];

let patientCaseUploadCount = 0
let PrescriptionUpoadCount = 0
let isFinished = false;
let nextFileUploadSlot = 0
class CaseDiscussForms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false,
            loader_status: false,
            firebase_token: "",
            submitBtnDisable: false,
            submitClick: false
        };
        fromDetails.referred_client_master_id = this.props.id;
        fromDetails.operation_type = this.props.operation_type;
    }

    componentDidMount() {
        this.clearAllValues()
        fromDetails.action_type = this.menu.value
        utils.getFcmToken().then(data => {
            this.setState({ firebase_token: data })
        });
    }

    componentWillUnmount() {
        this.clearAllValues()
    }

    clearAllValues = () => {
        fromDetails.action_type = '1'
        fromDetails.pat_full_name = ''
        fromDetails.pat_phone_number = ''
        fromDetails.pat_age = ''
        fromDetails.pat_gender = 'Male'
        fromDetails.pat_email = ''
        fromDetails.case_topic = ''
        fromDetails.case_detail = ''
        fromDetails.case_prescription = []
        fromDetails.case_reports = []

        patientCaseUploadCount = 0
        PrescriptionUpoadCount = 0
        isFinished = false;
        nextFileUploadSlot = 0

        patientCaseFileArr = []
        prescriptionFileArr = []
    }

    refresh = () => {
        this.setState({ "display": !this.state.display });
    }

    fileuploadfirebase = file => {
        this.setState({ submitBtnDisable: true })
        this.setState({ loader_status: true })

        let fileType = file.type
        if (fileType == 'application/pdf') {
            fileType = 'pdf'
        } else {
            fileType = 'image'
        }

        let img_name_temp = ''
        let thisobj = this;
        const imageUri = file
        if (imageUri && this.state.firebase_token != "") {
            var unix_time = Math.round(+new Date() / 1000);
            var rand = Math.floor((Math.random() * 100000) + 1)
            img_name_temp = imageUri.name;
            const ext = imageUri.name.split('.').pop(); // Extract image extension
            const filename = `${reactLocalStorage.get('@ClirnetStore:user_mem_id', true) + unix_time + rand}.${ext}`;
            firebase
                .auth()
                .signInWithCustomToken(this.state.firebase_token)
                .then(() => {
                    // Generate unique name
                    const uploadTask = storage.ref(`${AppConfig.imgFolder}${reactLocalStorage.get('@ClirnetStore:user_mem_id', true)}/${filename}`).put(imageUri);
                    uploadTask.on('state_changed', function (snapshot) {
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        // console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED: // or 'paused'
                                // console.log('Upload is paused');
                                break;
                            case firebase.storage.TaskState.RUNNING: // or 'running'
                                // console.log('Upload is running');
                                break;
                        }
                    }, function (error) {
                        //
                    }, function () {
                        storage
                            .ref(`${AppConfig.imgFolder}${reactLocalStorage.get('@ClirnetStore:user_mem_id', true)}`)
                            .child(filename)
                            .getDownloadURL()
                            .then(url => {
                                if (!isFinished) {
                                    if (patientCaseFileArr.length > 0) {
                                        let attchments = {}
                                        attchments["name"] = filename;
                                        attchments["url"] = url;
                                        attchments["fie_type"] = fileType;
                                        fromDetails.case_reports.push(attchments)
                                        patientCaseUploadCount++
                                        if (patientCaseFileArr.length !== patientCaseUploadCount) {
                                            thisobj.fileuploadfirebase(patientCaseFileArr[patientCaseUploadCount])
                                        } else {
                                            isFinished = true
                                        }
                                    } else {
                                        isFinished = true
                                    }
                                }

                                if (isFinished == true) {
                                    if (nextFileUploadSlot != 0) {

                                        let attchments1 = {}
                                        attchments1["name"] = filename;
                                        attchments1["url"] = url;
                                        attchments1["fie_type"] = fileType;
                                        fromDetails.case_prescription.push(attchments1)

                                        PrescriptionUpoadCount++
                                    }
                                    if (prescriptionFileArr.length !== PrescriptionUpoadCount) {
                                        nextFileUploadSlot++
                                        // console.log('patient upload start:::::::::::::::::::')
                                        thisobj.fileuploadfirebase(prescriptionFileArr[PrescriptionUpoadCount])
                                    } else {
                                        utils.submitForms(fromDetails).then(data => {

                                            patientCaseFileArr = []
                                            prescriptionFileArr = []

                                            patientCaseUploadCount = 0
                                            PrescriptionUpoadCount = 0
                                            isFinished = false;
                                            nextFileUploadSlot = 0

                                            thisobj.setState({ submitBtnDisable: false })
                                            thisobj.setState({ loader_status: false })

                                            utils.redirectToReferalThankYou(thisobj.props.history, fromDetails.referred_client_master_id)
                                            // alert('We Recived Your Request For a Discussion'+'\nWe Will Contact You Shortly') 
                                        });
                                        //   console.log('prescription upload finish:::::::::::::::::::')
                                    }
                                }

                                //   console.log('\ncase report\n'+JSON.stringify(fromDetails.case_reports)+'\ncase prescription\n'+JSON.stringify(fromDetails.case_prescription))
                            });
                    });
                })
                .catch(error => thisobj.setState({ submitBtnDisable: false }))
        }
    }

    getMobile = () => {
        const mob = reactLocalStorage.get('@ClirnetStore:mobilePrimary', true)
        const phone = reactLocalStorage.get('@ClirnetStore:phoneNumber', true)
        if (phone === true || phone === '' || phone === undefined) {
            if (mob === true || mob === '' || mob === undefined) {
                return '';
            } else {
                return mob;
            }
            return '';
        } else {
            return phone;
        }
    }

    getEmail = () => {
        const email = reactLocalStorage.get('@ClirnetStore:email', true)
        if (email === true || email === '' || email == undefined) {
            return '';
        } else {
            return email;
        }
    }

    checkWhichToUpdate = () => {
        if (!this.getMobile()) {
            this.setState({ submitClick: true });
        } else if (!this.getEmail()) {
            this.setState({ submitClick: true });
        } else {
            this.validateFormData();
        }
    }

    validateFormData() {
        if (!fromDetails.referred_client_master_id ||
            !fromDetails.operation_type) {
            console.log("Something wrong happen, please reload again" + fromDetails.referred_client_master_id + '\n' +
                fromDetails.operation_type + '\n' +
                fromDetails.action_type + '\n')
        } else {
            if (!fromDetails.case_topic) {
                ToastsStore.error("Please Enter Case Topic")
            }
            else if (!fromDetails.pat_full_name) {
                ToastsStore.error("Please Enter Full Name")

            } else if (!nameFormat.test(fromDetails.pat_full_name)) {
                ToastsStore.error("Please Enter A Valid Name")
            }
            //else if(!fromDetails.pat_phone_number.match(phoneNoFormat)){
            //     alert("enter phone number in correct format")

            // }
            else if (!fromDetails.pat_gender) {
                ToastsStore.error("Please Select gender")

            } else if (!fromDetails.pat_age) {
                ToastsStore.error("Please Enter Age")
            } else if (prescriptionFileArr.length <= 0) {
                ToastsStore.error("Please Select Atleast 1 Prescription")
            }
            else {
                // console.log('validation successfull' + fromDetails.pat_full_name)
                if (patientCaseFileArr.length > 0) {
                    this.fileuploadfirebase(patientCaseFileArr[patientCaseUploadCount])
                } else {
                    this.fileuploadfirebase(prescriptionFileArr[patientCaseUploadCount])
                }

            }
        }
    }
    onUploadPatientCaseChange(e) {
        let extension = e.target.value.substring(e.target.value.lastIndexOf('.') + 1).toLowerCase();
        if (support_file_extension_array.indexOf(extension) <= -1) {
            ToastsStore.error("Please Upload only pdf, jpg, png, jpeg flle");
            return false;
        } else {
            if (patientCaseFileArr.length <= 7) {
                if (e.target.files[0]) {
                    patientCaseFileArr.push(e.target.files[0])
                }
            } else {
                ToastsStore.error('Maximum 8 files is allowed')
            }
        }
        this.refresh();
    }

    onUploadPrescriptionChange(e) {
        let extension = e.target.value.substring(e.target.value.lastIndexOf('.') + 1).toLowerCase();
        if (support_file_extension_array.indexOf(extension) <= -1) {
            ToastsStore.error("Please Upload only pdf, jpg, png, jpeg flle");
            return false;
        } else {
            if (prescriptionFileArr.length <= 7) {
                if (e.target.files[0]) {
                    prescriptionFileArr.push(e.target.files[0])
                }
            } else {
                ToastsStore.error('Maximum 8 files is allowed')
            }
        }
        this.refresh();
    }

    onPreviewClick(ind) {

    }

    onCloseClick(arr, ind) {
        // console.log("close clicked"+ind)
        if (arr.length > 0) {
            // console.log("in if clicked"+arr.length)
            arr.splice(ind, 1);
        } else {
            // console.log("on else clicked")
        }
        this.refresh();
    }

    inputBoxChangeHamdler = type => (val) => {
        // console.log('action aype' + this.menu.value + '\n' + val)
        switch (type) {
            case 'case_topic':
                fromDetails.case_topic = val.target.value
                break;
            case 'patient_name':
                fromDetails.pat_full_name = val.target.value
                break;
            case 'age':
                fromDetails.pat_age = val.target.value
                break;
            case 'case_condition':
                fromDetails.action_type = this.menu.value
                break;
            case 'case_details':
                fromDetails.case_detail = val.target.value
                break;
            case 'mobile':
                fromDetails.pat_phone_number = val.target.value
                break;
            default:
                break;
        }
        this.refresh()
    }

    onGenderChange(val) {
        fromDetails.pat_gender = val
        this.refresh()
    }

    onProfileUpdateModalClose(){
        this.setState({submitClick:false})
    }

    render() {
        return (
            <div className="col-xl-8 col-12  dskHspitalFormLeft">
                <div className="full_width text-left dskHspitalFormLeft_in">
                    <div className="full_width text-left colorWhite dskHspitalFormTtl">
                        <div className="full_width dskHspitalFormTtlIn">
                            <h4 className="font_18px font500">Discuss the case with</h4>
                            <h3 className="font_30px font600">{this.props.propfileDetails.hospital_name} <span className="font_14px">{this.props.propfileDetails.hospital_city}{(this.props.propfileDetails.hospital_state !== null || this.props.propfileDetails.hospital_state !== '' || this.props.propfileDetails.hospital_state !== undefined) ? ',' : null} {this.props.propfileDetails.hospital_state} </span></h3>
                            <p>{this.props.propfileDetails.hospital_address}</p>
                        </div>
                    </div>
                    <div className="full_width dskHspitalFormArea">
                        <h3 className="colorBlack font400 fontExo font_24px dskHspltCmnTtl">Add Case Details</h3>
                        <div className="clearfix"></div>
                        <div className="full_width dskHspitalFormBody">
                            <Form className="font400 font_14px colorBlack">
                                <Form.Row>
                                    <Form.Group className="col-sm-6 col-12">
                                        <Form.Label className="font400 font_14px colorBlack">Case Topic<span className="colorRed">*</span></Form.Label>
                                        <Form.Control type="Enter Topic" placeholder="Enter case topic" value={fromDetails.case_topic} onChange={this.inputBoxChangeHamdler('case_topic')} />
                                    </Form.Group>
                                    <Form.Group className="col-sm-6 col-12">
                                        <Form.Label className="font400 font_14px colorBlack">Patient Name<span className="colorRed">*</span></Form.Label>
                                        <Form.Control type="Enter Topic" placeholder="Patient Full Name " value={fromDetails.pat_full_name} onChange={this.inputBoxChangeHamdler('patient_name')} />
                                    </Form.Group>
                                    <Form.Group className="col-sm-6 col-12">
                                        <Form.Row>
                                            <Form.Group className="col-9">
                                                <Form.Label className="font400 font_14px colorBlack">Gender<span className="colorRed">*</span></Form.Label>
                                                <div className="full_width dskHspitalFormGndrArea">
                                                    {(fromDetails.pat_gender == 'Male') ?
                                                        <Form.Check className="dskHspitalFormGndr" checked type="radio" label="Male" name="gender" onClick={this.onGenderChange.bind(this, 'Male')} /> :
                                                        <Form.Check className="dskHspitalFormGndr" type="radio" label="Male" name="gender" onClick={this.onGenderChange.bind(this, 'Male')} />
                                                    }
                                                    {(fromDetails.pat_gender == 'Female') ?
                                                        <Form.Check className="dskHspitalFormGndr" checked type="radio" label="Female" name="gender" onClick={this.onGenderChange.bind(this, 'Female')} /> :
                                                        <Form.Check className="dskHspitalFormGndr" type="radio" label="Female" name="gender" onClick={this.onGenderChange.bind(this, 'Female')} />
                                                    }
                                                    {(fromDetails.pat_gender == 'Other') ?
                                                        <Form.Check className="dskHspitalFormGndr" checked type="radio" label="Others" name="gender" onClick={this.onGenderChange.bind(this, 'Others')} /> :
                                                        <Form.Check className="dskHspitalFormGndr" type="radio" label="Others" name="gender" onClick={this.onGenderChange.bind(this, 'Others')} />
                                                    }
                                                </div>
                                            </Form.Group>
                                            <Form.Group className="col-3">
                                                <Form.Label className="font400 font_14px colorBlack">Age</Form.Label>
                                                <Form.Control type="Enter Topic" placeholder="Age" value={fromDetails.pat_age} onChange={this.inputBoxChangeHamdler('age')} />
                                            </Form.Group>
                                        </Form.Row>
                                    </Form.Group>
                                    <Form.Group className="col-sm-6 col-12">
                                        <Form.Label className="font400 font_14px colorBlack">Case Condition or Urgency</Form.Label>
                                        <Form.Control as="select" ref={(input) => this.menu = input} onChange={this.inputBoxChangeHamdler('case_condition')}>
                                            <option value="1">General</option>
                                            <option value="2">Critical</option>
                                            <option value="3">Advance</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="col-sm-6 col-12">
                                        <div className="full_width dskHspitalFormDblFile">
                                            <Form.Label className="font400 font_14px colorBlack">Upload Patient Consent <img src={begainArrow} />
                                                <span className="fontItalic font_12px font500">
                                                    <a href={samplePatConcentFile} download="samplePatientConsent.pdf">Download Sample Patient Consent</a>
                                                </span>
                                            </Form.Label>
                                            <div className="dskHspitalFormDblFileIN">
                                                <input type="file" className="dskHsptlFile" accept="image/*,application/pdf" onChange={this.onUploadPatientCaseChange.bind(this)} />
                                                <img src={fileUpload} />
                                                Choose file
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <h5 className="font_12px font600 full_width dkHsptlFrmFileTypes">File Types : PDF, jpeg, jpg, png</h5>
                                    </Form.Group>
                                    <Form.Group className="col-12 dskHspitalFormFileShow hsptlConsentGFileMobile">
                                        <div className="row">
                                            {
                                                (patientCaseFileArr.length > 0) ?
                                                    <>
                                                        {
                                                            patientCaseFileArr.map((rData, ind) => (
                                                                <>
                                                                    {
                                                                        (rData.type === 'application/pdf') ?
                                                                            <FilePreviewCard data={rData} fileType="pdf" actionType='add' cardIndex={ind} previewClick={this.onPreviewClick(this, ind)} closeClick={this.onCloseClick.bind(this, patientCaseFileArr, ind)} /> :
                                                                            <FilePreviewCard data={rData} fileType={rData.type} actionType='add' cardIndex={ind} previewClick={this.onPreviewClick(this, ind)} closeClick={this.onCloseClick.bind(this, patientCaseFileArr, ind)} />
                                                                    }
                                                                </>
                                                            ))
                                                        }
                                                    </> : null
                                            }
                                        </div>
                                    </Form.Group>


                                    <Form.Group className="col-sm-6 col-12 dskHspitalFormFileINBig">
                                        <div className="dskHspitalFormDblFileIN">
                                            <input type="file" className="dskHsptlFile" accept="image/*,application/pdf" onChange={this.onUploadPrescriptionChange.bind(this)} />
                                            <img src={fileUpload} />
                                                Upload Prescription &amp; Case Reports
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="col-12 dskHspitalFormFileShowRow">
                                        <Form.Row>
                                            <div className="col-sm-6 col-12 dskHspitalFormFileShow hsptlConsentGFileDsk">
                                                <div className="row">
                                                    {
                                                        (patientCaseFileArr.length > 0) ?
                                                            <>
                                                                {
                                                                    patientCaseFileArr.map((rData, ind) => (
                                                                        <>
                                                                            {
                                                                                (rData.type === 'application/pdf') ?
                                                                                    <FilePreviewCard data={rData} fileType="pdf" actionType='add' cardIndex={ind} previewClick={this.onPreviewClick(this, ind)} closeClick={this.onCloseClick.bind(this, patientCaseFileArr, ind)} /> :
                                                                                    <FilePreviewCard data={rData} fileType={rData.type} actionType='add' cardIndex={ind} previewClick={this.onPreviewClick(this, ind)} closeClick={this.onCloseClick.bind(this, patientCaseFileArr, ind)} />
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
                                                        (prescriptionFileArr.length > 0) ?
                                                            <>
                                                                {
                                                                    prescriptionFileArr.map((rData, ind) => (
                                                                        <>
                                                                            {
                                                                                (rData.type === 'application/pdf') ?
                                                                                    <FilePreviewCard data={rData} fileType="pdf" actionType='add' cardIndex={ind} previewClick={this.onPreviewClick(this, ind)} closeClick={this.onCloseClick.bind(this, prescriptionFileArr, ind)} /> :
                                                                                    <FilePreviewCard data={rData} fileType={rData.type} actionType='add' cardIndex={ind} previewClick={this.onPreviewClick(this, ind)} closeClick={this.onCloseClick.bind(this, prescriptionFileArr, ind)} />
                                                                            }
                                                                        </>
                                                                    ))
                                                                }
                                                            </> : null
                                                    }
                                                </div>
                                            </div>
                                        </Form.Row>
                                    </Form.Group>
                                    <Form.Group className="col-12">
                                        <Form.Label>Case Details</Form.Label>
                                        <Form.Control as="textarea" rows={5} placeholder="Please Write The Case Details  For Reference" value={fromDetails.inputBoxChangeHamdler} onChange={this.inputBoxChangeHamdler('case_details')} />
                                    </Form.Group>
                                    <Form.Group className="col-12 text-center">
                                        <Button className="radius-8 colorWhite dskHspltDbCardBttn" onClick={this.checkWhichToUpdate.bind(this)} disabled={this.state.submitBtnDisable}>
                                            <span>Request Discussion</span>
                                        </Button>
                                    </Form.Group>
                                </Form.Row>
                            </Form>
                            <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={40} width={40} visible={this.state.loader_status} />
                            {this.state.submitClick ? <UpdateProfile
                             onModalClose={this.onProfileUpdateModalClose.bind(this)} /> : null} 
                        </div>
                    </div>
                </div>
                <ToastsContainer store={ToastsStore} />
            </div>
        )
    }
}
export default CaseDiscussForms;

const FilePreviewCard = (props) => (
    <div className="col-3 dskHspitalFormFileBox">
        {(props.fileType !== 'pdf') ?
            <div className="full_width dskHspitalFormFileBoxIn">
                <img src={URL.createObjectURL(props.data)} className="translate_both" />
                {(props.actionType == 'add') ?
                    <div className="transition6s dskHspitalFormFileBoxAction dskHspitalFormFileBoxActionClose" onClick={props.closeClick.bind(this, props.cardIndex)}>
                        <img src={redClose} className="translate_both" />
                    </div> :
                    <div className="transition6s dskHspitalFormFileBoxAction dskHspitalFormFileBoxActionClose" onClick={props.previewClick.bind(this, props.cardIndex)}>
                        <img src={visibility} className="translate_both" />
                    </div>
                }
            </div> :
            <div className="full_width dskHspitalFormFileBoxIn">
                <img src="https://image.flaticon.com/icons/png/512/337/337946.png" className="translate_both" />
                {(props.actionType == 'add') ?
                    <div className="transition6s dskHspitalFormFileBoxAction dskHspitalFormFileBoxActionClose" onClick={props.closeClick.bind(this, props.cardIndex)}>
                        <img src={redClose} className="translate_both" />
                    </div> :
                    <div className="transition6s dskHspitalFormFileBoxAction dskHspitalFormFileBoxActionClose" onClick={props.previewClick.bind(this, props.cardIndex)}>
                        <img src={visibility} className="translate_both" />
                    </div>
                }
            </div>
        }
    </div>
)