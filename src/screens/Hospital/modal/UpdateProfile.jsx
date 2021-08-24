import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import Modal from 'react-bootstrap/Modal';
import Loader from 'react-loader-spinner';
import Searchable from 'react-searchable-dropdown';
import { reactLocalStorage } from 'reactjs-localstorage';
import * as utils from '../utils/utils.js';
import closeIcon from '../../../images/responsive-icon-active.png';
export default function UpdateProfile({ onModalClose }) {
    const [modalVisibility, setModalVisibility] = useState(false);
    const [loader, setLoader] = useState(false);
    const [email, setEmail] = useState(false);
    const [phoneNo, setPhoneNo] = useState(false);
    const [isdCode, setIsdCode] = useState("+91");
    const [otp, setOtp] = useState('');
    const [isOtpSend, setIsOtpSend] = useState(false);
    const [btnName, setBtnName] = useState('Next');
    const [error, setError] = useState('');
    const [updateFlag, setUpdateFlag] = useState('');
    const [disable, setDisable] = useState(false);

    const country_codes = [
        { label: "+91", value: '+91' },
        { label: "+1", value: '+1' },
        { label: "+6", value: '+6' },
        { label: "+977", value: '+977' },
        { label: "+975", value: '+975' },
        { label: "+960", value: '+960' },
        { label: "+61", value: '+61' },
        { label: "+82", value: '+82' },
        { label: "+94", value: '+94' },
        { label: "+95", value: '+95' },
    ];

    const getMobile = () => {
        const mob = reactLocalStorage.get('@ClirnetStore:mobilePrimary', true)
        const phone = reactLocalStorage.get('@ClirnetStore:phoneNumber', true)
        if (phone === true || phone === '' || phone === undefined) {
            if (mob === true || mob === '' || mob === undefined) {
                return '';
            } else {
                return mob;
            }
        } else {
            return phone;
        }
    }

    const getEmail = () => {
        const email = reactLocalStorage.get('@ClirnetStore:email', true)
        if (email === true || email === '' || email == undefined) {
            return '';
        } else {
            return email;
        }
    }

    let checkWhichToUpdate = () => {
        if (getMobile()) {
            setUpdateFlag("phone");
            setModalVisibility(true);
        } else if (getEmail()) {
            setUpdateFlag("email");
            setModalVisibility(true);
        } else {
            setUpdateFlag("false");
        }
    }

    let onRightBtnClick = (btn) => {
        switch (btn.toLowerCase()) {
            case 'next':
                onNextBtnClick();
                break;
            case 'verify':
                onVerifyBtnClick();
                break;
            case 'continue':
                onDoneBtnClick();
                break;
            case 'finish':
                onFinishBtnClick();
                break;
            default:
                setError("Something Went Wrong! Please Reload Page Once");
                break;
        }
    }

    let onFinishBtnClick = () => {
        if (updateFlag == 'email') {
            reactLocalStorage.set('@ClirnetStore:email', email);
        } else if (updateFlag == 'phone') {
            reactLocalStorage.set('@ClirnetStore:mobilePrimary', phoneNo);
            reactLocalStorage.set('@ClirnetStore:phoneNumber', phoneNo);
        } else {
            //  console.log("no data updated in local storage")   
        }
        setModalVisibility(false);
    }

    let onDoneBtnClick = () => {
        let tempIsdCode = '';
        let tempPhoneNo = '';
        let tempEmail = '';
        if (updateFlag == 'phone') {
            tempIsdCode = isdCode;
            tempPhoneNo = phoneNo;
        } else if (updateFlag == "email") {
            tempEmail = email;
        }
        setLoader(true);
        utils.updateProfile(tempIsdCode, tempPhoneNo, tempEmail, "Disscuss And Refer Profile Update").then(data => {
            setLoader(false);
            if (data.status_code == 200 && data.data.status) {
                // setBtnName("Finish");
                setError("Your Profile is Updated Now. Thank You!");
                onFinishBtnClick();
            } else {
                setDisable(false)
                setError("Unable To Update Your Details");
            }
        });
    }

    let onNextBtnClick = () => {
        const phoneNoFormat = /^\d{10}$/;
        const email_regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!email) {
            setError("Please enter your email!");
        } else if (!email_regex.test(email)) {
            setError("Please Enter a Valid Email! Ex: something@mail.com");
        } else if (!phoneNo) {
            setError("Please enter your phone no");
        } else if (!phoneNo.match(phoneNoFormat)) {
            setError("Please Enter a Valid Phone No");
        } else {
            setLoader(true);
            utils.sendOtp(isdCode, phoneNo).then(data => {
                setLoader(false);
                if (data.status_code == 200) {
                    setIsOtpSend(true);
                    setDisable(true); 
                    setBtnName("Verify");
                    setError("We Have Sent An OTP On " + phoneNo + ". Please Verify!");
                } else {
                    setError("Something Went Wrong! Try Again");
                }
            });
        }
    }



    let onVerifyBtnClick = () => {
        if (!otp) {
            setError("Please Enter OTP");
        } else {
            setLoader(true);
            utils.verifyOtp(isdCode, phoneNo, otp).then(data => {
                setLoader(false);
                if (data.status_code == 200) {
                    // setBtnName("Continue");
                    setError("Thanks! You Successfully Verify " + phoneNo + ". Please Wait...");
                    onDoneBtnClick();
                } else {
                    setError("Something Went Wrong! Try Again.");
                }
            });
        }
    }

    let setCssToScreen = () => {
        let abc = document.getElementsByClassName('reg_input_efect');
        console.log("length" + abc.length)
        for (let i = 0; i <= abc.length; i++) {
            let inputValue = $(".regRowCount" + i).val()
            if (inputValue !== '') {
                $(".regRowCount" + i).parent().removeClass('regFormRowWtoHvr').addClass('regFormRowHvr');
            } else {
                $(".regRowCount" + i).parent().removeClass('regFormRowHvr').addClass('regFormRowWtoHvr');
            }
        }
    }

    const onInputChange = input => (val) => {
        setError('')
        switch (input) {
            case "email":
                setEmail(val.target.value);
                break;
            case "phone_no":
                setPhoneNo(val.target.value);
                break;
            case "otp":
                setOtp(val.target.value);
                break;
            default:
                break;
        }
    }


    useEffect(() => {
        setEmail(getEmail());
        setPhoneNo(getMobile());
        checkWhichToUpdate();
        $('.reg_input_efect').val('');
        $(document).on("blur", ".reg_input_efect", function (event) {
            if (this.value == '') {
                $(this).parent().removeClass('regFormRowHvr').addClass('regFormRowWtoHvr');
            }
        })
        $(document).on("focus", ".reg_input_efect", function (event) {
            $(this).parent().removeClass('regFormRowWtoHvr').addClass('regFormRowHvr');
        });
        setTimeout(() => {
            setCssToScreen();
        }, 100);
    }, [])



    return (
        <div>
            <Modal id="root-modal" backdrop={'static'} keyboard={false} className="in dicussRefferDtlsPop dicussRefferWarningPop" centered="true" animation="slide" show={modalVisibility} onHide={() => { setModalVisibility(false);  }}>

                <Modal.Header className="align-items-center justify-content-between">
                    <Modal.Title className="font600 font_16px colorWhite">Warning</Modal.Title>
                    <a href="javascript:void(0)" className="radius-100 dicussRefferDtlsPopclose" variant="secondary" onClick={() => { setModalVisibility(false); onModalClose() }}>
                        <img src={closeIcon} />
                    </a>
                </Modal.Header>
                <Modal.Body>
                    <div class="form_container_cmn">
                        <div class="col-xs-12 form_row_pop">
                            <h3 className="font_14px font500 colorBlack">The Hospital may not be able to reach you as you do not have a mobile number saved. Please update below to continue.</h3>
                            <div className="full_width frmPart">
                                {updateFlag == "email" ?
                                    <div class="full_width form_row">
                                        <div class="full_width form_row_in regFrmRowEffct regFormRowWtoHvr">
                                            <label class="font_14px font600 colorBlack">Email</label>
                                            <input type="email" class="reg_input_efect regRowCount0" disabled={disable} autocomplete="new-password" onChange={onInputChange('email')} value={email} />
                                        </div>
                                    </div> : null}
                                {updateFlag === 'phone' ?
                                    <div class="full_width form_row phoneCodePrnt">
                                        <Searchable
                                            value={isdCode} //if value is not item of options array, it would be ignored on mount
                                            placeholder="Select Country Code" // by default "Search"
                                            notFoundText="No result found" // by default "No result found"
                                            options={country_codes}
                                            className="font500 font_14px"
                                            onSelect={option => {
                                                setIsdCode(option.value);
                                            }}
                                            listMaxHeight={200} //by default 140
                                        />
                                        <div class="full_width form_row_in regFrmRowEffct regFormRowWtoHvr">
                                            <label class="font_14px font600 colorBlack">Mobile No.</label>
                                            <input type="tel" class="reg_input_efect regRowCount1" disabled={disable} maxLength="10" onChange={onInputChange('phone_no')} inputRef={ref => { this.phoneInput = ref; }} value={phoneNo} pattern="[6789][0-9]{9}" />
                                        </div>
                                    </div> : null}
                                {isOtpSend ?
                                    <div class="full_width form_row">
                                        <div class="full_width form_row_in regFrmRowEffct regFormRowWtoHvr">
                                            <label class="font_14px font600 colorBlack">OTP</label>
                                            <input type="text" class="reg_input_efect regRowCount3" onChange={onInputChange('otp')} value={otp} />
                                        </div>
                                    </div> : null
                                }
                                {(error) ?
                                    <div className="full_width text-center mt-2 alert alert-danger">
                                        <label>{error}</label>
                                    </div> : null}
                                <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={40} width={40} visible={loader} />
                                <div class="full_width form_row">
                                    <div class="full_width form_row_in">
                                        <a href="javascript:void(0)" className="radius-6 full_width text-center font500 btnBlue cmnBtn" variant="secondary" onClick={() => { onRightBtnClick(btnName) }}>
                                            {btnName}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </Modal.Body>

            </Modal>
        </div>
    )
}
