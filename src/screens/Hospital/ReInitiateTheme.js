import React from 'react';
import Slider from "react-slick";
import { reactLocalStorage } from 'reactjs-localstorage';
import $ from 'jquery';
import { isMobile } from 'react-device-detect';
import HeaderDesktop from '../mainscreens/HeaderDesktop';
import FooterDesktop from '../mainscreens/FooterDesktop';
import 'firebase/storage';
import begainArrowBlue from '../../desktopImages/begainArrowBlue.png';
import begainArrow from '../../desktopImages/begainArrow.png';
import fileUpload from '../../desktopImages/fileUpload.png';
import redClose from '../../desktopImages/redClose.png';
import visibility from '../../desktopImages/visibility.png';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const masonryOptions = {
    transitionDuration: 0
};
class ReferThankYou extends React.Component {
    render() {


        return (
            <div className="full_width dskScreen">
                <HeaderDesktop history={this.props.history} />
                <div className="full_width dskHspitalFormReInitiate">
                    <div className="container mycontainer">
                        <div className="row">
                            <div className="col-md-8 dskHspitalFormLeft">
                                <div className="full_width text-left dskHspitalFormLeft_in">
                                    <div className="full_width text-left colorWhite dskHspitalFormTtl">
                                        <div className="full_width dskHspitalFormTtlIn">
                                            <h4 className="font_18px font500">Re-initiate Referral</h4>

                                        </div>
                                    </div>
                                    <div className="full_width dskHsptlReInitiateSelect">
                                        <Form.Control as="select">
                                            <option>Hospital</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Form.Control>
                                    </div>
                                    <div className="full_width dskHspitalFormArea">

                                        <h3 className="colorBlack font400 fontExo dskHspltCmnTtl">Add Case Details</h3>
                                        <div className="clearfix"></div>
                                        <div className="full_width dskHspitalFormBody">
                                            <Form className="font400 font_14px colorBlack">
                                                Form Area Gose Here
                                             </Form>
                                        </div>


                                    </div>

                                </div>


                            </div>
                            <div className="col-md-4 col-12">
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
export default ReferThankYou;