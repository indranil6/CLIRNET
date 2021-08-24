import React from 'react';
import Slider from "react-slick";
import { reactLocalStorage } from 'reactjs-localstorage';
import $ from 'jquery';
import { isMobile } from 'react-device-detect';
import HeaderDesktop from '../../mainscreens/HeaderDesktop';
import FooterDesktop from '../../mainscreens/FooterDesktop';
import 'firebase/storage';
import begainArrowBlue from '../../../desktopImages/begainArrowBlue.png';
import begainArrow from '../../../desktopImages/begainArrow.png';
import fileUpload from '../../../desktopImages/fileUpload.png';
import redClose from '../../../desktopImages/redClose.png';
import visibility from '../../../desktopImages/visibility.png';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const masonryOptions = {
    transitionDuration: 0
};

class DiscussForm extends React.Component {
    render() {
        return (
            <div className="full_width dskScreen">
                <HeaderDesktop history={this.props.history} />
                <div className="full_width dskHspitalFormDiscuss">
                    <div className="container mycontainer">
                        <div className="row">
                            <div className="col-xl-8 col-12 dskHspitalFormLeft">
                                <div className="full_width text-left dskHspitalFormLeft_in">
                                    <div className="full_width text-left colorWhite dskHspitalFormTtl">
                                        <div className="full_width dskHspitalFormTtlIn">
                                            <h4 className="font_18px font500">Discuss the case with</h4>
                                            <h3 className="font_30px font600">Belle Vue Clinic <span className="font_14px">Kolkata, West Bengal</span></h3>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
industry's standard dummy text ever since the 1500s, </p>
                                        </div>
                                    </div>
                                    <div className="full_width dskHspitalFormArea">

                                        <h3 className="colorBlack font400 font_24px fontExo dskHspltCmnTtl">Add Case Details</h3>
                                        <div className="clearfix"></div>
                                        <div className="full_width dskHspitalFormBody">
                                            <Form className="font400 font_14px colorBlack">
                                                <Form.Row>
                                                    <Form.Group className="col-sm-6 col-12">
                                                        <Form.Label className="font400 font_14px colorBlack">Case Topic<span className="colorRed">*</span></Form.Label>
                                                        <Form.Control type="Enter Topic" placeholder="Enter email" />
                                                    </Form.Group>
                                                    <Form.Group className="col-sm-6 col-12">
                                                        <Form.Label className="font400 font_14px colorBlack">Patient Name</Form.Label>
                                                        <Form.Control type="Enter Topic" placeholder="Patient Full Name " />
                                                    </Form.Group>

                                                    <Form.Group className="col-sm-6 col-12">
                                                        <Form.Row>
                                                            <Form.Group className="col-9">
                                                                <Form.Label className="font400 font_14px colorBlack">Gender</Form.Label>
                                                                <div className="full_width dskHspitalFormGndrArea">
                                                                    <Form.Check className="dskHspitalFormGndr" checked type="radio" label="Male" name="gender" />
                                                                    <Form.Check className="dskHspitalFormGndr" type="radio" label="Female" name="gender" />
                                                                    <Form.Check className="dskHspitalFormGndr" type="radio" label="Others" name="gender" />
                                                                </div>

                                                            </Form.Group>
                                                            <Form.Group className="col-3">
                                                                <Form.Label className="font400 font_14px colorBlack">Age</Form.Label>
                                                                <Form.Control type="Enter Topic" placeholder="Age" />
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Form.Group>

                                                    <Form.Group className="col-sm-6 col-12">
                                                        <Form.Label className="font400 font_14px colorBlack">Case Condition or Urgency</Form.Label>
                                                        <Form.Control as="select">
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                            <option>5</option>
                                                        </Form.Control>
                                                    </Form.Group>


                                                    <Form.Group className="col-sm-6 col-12">
                                                        <div className="full_width dskHspitalFormDblFile">
                                                            <Form.Label className="font400 font_14px colorBlack">Upload Patient Consent <img src={begainArrow} />
                                                                <span className="fontItalic font_12px font500">
                                                                    <a href="javascript:void(0)">Download Sample Patient Consent</a>
                                                                </span>
                                                            </Form.Label>
                                                            <div className="dskHspitalFormDblFileIN">
                                                                <input type="file" className="dskHsptlFile" />
                                                                <img src={fileUpload} />
                                                                 Choose file
                                                            </div>
                                                        </div>
                                                    </Form.Group>
                                                    <Form.Group className="col-sm-6 col-12 dskHspitalFormFileINBig">

                                                        <div className="dskHspitalFormDblFileIN">
                                                            <input type="file" className="dskHsptlFile" />
                                                            <img src={fileUpload} />
                                                                 Upload Prescription &amp; Case Reports
                                                        </div>

                                                    </Form.Group>
                                                    <Form.Group className="col-12 dskHspitalFormFileShowRow">
                                                        <Form.Row>
                                                            <div className="col-sm-6 col-12 dskHspitalFormFileShow">
                                                                <div className="row">

                                                                    <div className="col-3 dskHspitalFormFileBox">
                                                                        <div className="full_width dskHspitalFormFileBoxIn">
                                                                            <img src="https://media.springernature.com/lw685/springer-static/image/art%3A10.1007%2Fs11042-020-10151-w/MediaObjects/11042_2020_10151_Fig2_HTML.png" className="translate_both" />
                                                                            {/* <div className="transition6s dskHspitalFormFileBoxAction dskHspitalFormFileBoxActionView">
                                                                                <img src={visibility} className="translate_both" />
                                                                            </div> */}
                                                                            <div className="transition6s dskHspitalFormFileBoxAction dskHspitalFormFileBoxActionClose">
                                                                                <img src={redClose} className="translate_both" />
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                    <div className="col-3 dskHspitalFormFileBox">
                                                                        <div className="full_width dskHspitalFormFileBoxIn">
                                                                            <img src="https://media.springernature.com/lw685/springer-static/image/art%3A10.1007%2Fs11042-020-10151-w/MediaObjects/11042_2020_10151_Fig2_HTML.png" className="translate_both" />
                                                                            {/* <div className="transition6s dskHspitalFormFileBoxAction dskHspitalFormFileBoxActionView">
                                                                                <img src={visibility} className="translate_both" />
                                                                            </div> */}
                                                                            <div className="transition6s dskHspitalFormFileBoxAction dskHspitalFormFileBoxActionClose">
                                                                                <img src={redClose} className="translate_both" />
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                    <div className="col-3 dskHspitalFormFileBox">
                                                                        <div className="full_width dskHspitalFormFileBoxIn">
                                                                            <img src="https://media.springernature.com/lw685/springer-static/image/art%3A10.1007%2Fs11042-020-10151-w/MediaObjects/11042_2020_10151_Fig2_HTML.png" className="translate_both" />
                                                                            {/* <div className="transition6s dskHspitalFormFileBoxAction dskHspitalFormFileBoxActionView">
                                                                                <img src={visibility} className="translate_both" />
                                                                            </div> */}
                                                                            <div className="transition6s dskHspitalFormFileBoxAction dskHspitalFormFileBoxActionClose">
                                                                                <img src={redClose} className="translate_both" />
                                                                            </div>

                                                                        </div>
                                                                    </div>


                                                                </div>

                                                            </div>
                                                            <div className="col-sm-6 col-12 dskHspitalFormFileShow">
                                                                <div className="row">
                                                                    <div className="col-3 dskHspitalFormFileBox">
                                                                        <div className="full_width dskHspitalFormFileBoxIn">
                                                                            <img src="https://media.springernature.com/lw685/springer-static/image/art%3A10.1007%2Fs11042-020-10151-w/MediaObjects/11042_2020_10151_Fig2_HTML.png" className="translate_both" />
                                                                            <div className="transition6s dskHspitalFormFileBoxAction dskHspitalFormFileBoxActionView">
                                                                                <img src={visibility} className="translate_both" />
                                                                            </div>
                                                                            {/* <div className="transition6s dskHspitalFormFileBoxAction dskHspitalFormFileBoxActionClose">
                                                                                <img src={redClose} className="translate_both" />
                                                                            </div> */}

                                                                        </div>
                                                                    </div>
                                                                    <div className="col-3 dskHspitalFormFileBox">
                                                                        <div className="full_width dskHspitalFormFileBoxIn">
                                                                            <img src="https://media.springernature.com/lw685/springer-static/image/art%3A10.1007%2Fs11042-020-10151-w/MediaObjects/11042_2020_10151_Fig2_HTML.png" className="translate_both" />
                                                                            {/* <div className="transition6s dskHspitalFormFileBoxAction dskHspitalFormFileBoxActionView">
                                                                                <img src={visibility} className="translate_both" />
                                                                            </div> */}
                                                                            <div className="transition6s dskHspitalFormFileBoxAction dskHspitalFormFileBoxActionClose">
                                                                                <img src={redClose} className="translate_both" />
                                                                            </div>

                                                                        </div>
                                                                    </div>

                                                                </div>


                                                            </div>
                                                        </Form.Row>

                                                    </Form.Group>

                                                    <Form.Group className="col-12">
                                                        <Form.Label>Case Details</Form.Label>
                                                        <Form.Control as="textarea" rows={5} placeholder="Please Write The Case Details  For Reference" />
                                                    </Form.Group>
                                                    <Form.Group className="col-12 text-center">
                                                        <Button className="radius-8 colorWhite dskHspltDbCardBttn">
                                                            <span>Request for Discussion</span>
                                                        </Button>
                                                    </Form.Group>



                                                </Form.Row>
                                            </Form>
                                        </div>


                                    </div>

                                </div>


                            </div>
                            <div className="col-xl-4 col-12 dskHspitalFormRight">
                                <div className="full_width dskRightActivities">
                                    <div className="dskRightActivitiesTtl">
                                        <h3 className="font500 font_18px colorBlack fontExo">Recent Activities</h3>
                                        <a className="colorBlue font_14px" href="javascript:void(0)">View All <img src={begainArrowBlue} /></a>
                                    </div>
                                    <div className="full_width dskRightActivitiesBoxArea">
                                        <div className="row">
                                            <div className="col-12 dskHspltActivitesCard dskHspltActivitesSeaGreen">
                                                <div className="full_width radius-6 text-left dskHspltActivitesCardIn">
                                                    <div className="full_width dskHspltActivitesCardTop">
                                                        <h5 className="colorBlack font400 font_14px dskHspltActivitesTopRight">12 Jan, Dec 21</h5>
                                                        <h4 className="font600 colorBlack font_14px dskHspltActivitesTopRight">Discussion <span className="font400 dskHspltActivitesStts">Ongoing</span></h4>

                                                    </div>
                                                    <h2 className="font_18px colorBlack font500">Covid 19 Checkup</h2>
                                                    <div className="clearfix"></div>
                                                    <h3 className=" font400 colorGrey font_16px">AMRI Hospital Salt Lake, Kolkata WB</h3>
                                                    <div className="clearfix"></div>
                                                    <h3 className=" font400 colorGrey font_16px">Patient Name (34/M)</h3>
                                                    <div className="clearfix"></div>
                                                    <h6 className=" font600 colorBlack font_14px"> 4 Attached   <span className="dskHspltActivitesCondition">Serious</span></h6>
                                                    <div className="clearfix"></div>
                                                    {/* <div className="full_width dskHspltDbCardBttnArea">
                                                        <div className="radius-8 colorWhite dskHspltDbCardBttn">
                                                            <span>Re-discuss <img src={begainArrow} /></span>
                                                        </div>
                                                        <div className="radius-8 colorWhite dskHspltDbCardBttn">
                                                            <span>Refer <img src={begainArrow} /></span>
                                                        </div>
                                                    </div> */}

                                                </div>
                                            </div>

                                            <div className="col-12 dskHspltActivitesCard dskHspltActivitesGreen">
                                                <div className="full_width radius-6 text-left dskHspltActivitesCardIn">
                                                    <div className="full_width dskHspltActivitesCardTop">
                                                        <h5 className="colorBlack font400 font_14px dskHspltActivitesTopRight">12 Jan, Dec 21</h5>
                                                        <h4 className="font600 colorBlack font_14px dskHspltActivitesTopRight">Discussion <span className="font400 dskHspltActivitesStts">Completed</span></h4>

                                                    </div>
                                                    <h2 className="font_18px colorBlack font500">Covid 19 Checkup</h2>
                                                    <div className="clearfix"></div>
                                                    <h3 className=" font400 colorGrey font_16px">AMRI Hospital Salt Lake, Kolkata WB</h3>
                                                    <div className="clearfix"></div>
                                                    <h3 className=" font400 colorGrey font_16px">Patient Name (34/M)</h3>
                                                    <div className="clearfix"></div>
                                                    <h6 className=" font600 colorBlack font_14px"> 4 Attached   <span className="dskHspltActivitesCondition">Serious</span></h6>
                                                    <div className="clearfix"></div>
                                                    <div className="full_width dskHspltDbCardBttnArea">
                                                        <div className="radius-8 colorWhite dskHspltDbCardBttn">
                                                            <span>Re-discuss <img src={begainArrow} /></span>
                                                        </div>
                                                        <div className="radius-8 colorWhite dskHspltDbCardBttn">
                                                            <span>Refer <img src={begainArrow} /></span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="col-12 dskHspltActivitesCard dskHspltActivitesYellow">
                                                <div className="full_width radius-6 text-left dskHspltActivitesCardIn">
                                                    <div className="full_width dskHspltActivitesCardTop">
                                                        <h5 className="colorBlack font400 font_14px dskHspltActivitesTopRight">12 Jan, Dec 21</h5>
                                                        <h4 className="font600 colorBlack font_14px dskHspltActivitesTopRight">Discussion <span className="font400 dskHspltActivitesStts">Request initiated</span></h4>

                                                    </div>
                                                    <h2 className="font_18px colorBlack font500">Covid 19 Checkup</h2>
                                                    <div className="clearfix"></div>
                                                    <h3 className=" font400 colorGrey font_16px">AMRI Hospital Salt Lake, Kolkata WB</h3>
                                                    <div className="clearfix"></div>
                                                    <h3 className=" font400 colorGrey font_16px">Patient Name (34/M)</h3>
                                                    <div className="clearfix"></div>
                                                    <h6 className=" font600 colorBlack font_14px"> 4 Attached   <span className="dskHspltActivitesCondition">Serious</span></h6>
                                                    <div className="clearfix"></div>
                                                    {/* <div className="full_width dskHspltDbCardBttnArea">
                                                        <div className="radius-8 colorWhite dskHspltDbCardBttn">
                                                            <span>Discuss <img src={begainArrow} /></span>
                                                        </div>
                                                        <div className="radius-8 colorWhite dskHspltDbCardBttn">
                                                            <span>Refer <img src={begainArrow} /></span>
                                                        </div>
                                                    </div> */}

                                                </div>
                                            </div>


                                            <div className="col-12 dskHspltActivitesCard dskHspltActivitesRed">
                                                <div className="full_width radius-6 text-left dskHspltActivitesCardIn">
                                                    <div className="full_width dskHspltActivitesCardTop">
                                                        <h5 className="colorBlack font400 font_14px dskHspltActivitesTopRight">12 Jan, Dec 21</h5>
                                                        <h4 className="font600 colorBlack font_14px dskHspltActivitesTopRight">Discussion <span className="font400 dskHspltActivitesStts">Rejected</span></h4>

                                                    </div>
                                                    <h2 className="font_18px colorBlack font500">Covid 19 Checkup</h2>
                                                    <div className="clearfix"></div>
                                                    <h3 className=" font400 colorGrey font_16px">AMRI Hospital Salt Lake, Kolkata WB</h3>
                                                    <div className="clearfix"></div>
                                                    <h3 className=" font400 colorGrey font_16px">Patient Name (34/M)</h3>
                                                    <div className="clearfix"></div>
                                                    <h6 className=" font600 colorBlack font_14px"> 4 Attached   <span className="dskHspltActivitesCondition">Serious</span></h6>
                                                    <div className="clearfix"></div>
                                                    <div className="full_width dskHspltDbCardBttnArea">
                                                        <div className="radius-8 colorWhite dskHspltDbCardBttn">
                                                            <span>Discuss <img src={begainArrow} /></span>
                                                        </div>
                                                        <div className="radius-8 colorWhite dskHspltDbCardBttn">
                                                            <span>Refer <img src={begainArrow} /></span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterDesktop />
            </div >
        )
    }
}
export default DiscussForm;