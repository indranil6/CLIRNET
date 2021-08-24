import React from 'react';
import begainArrow from '../../../desktopImages/begainArrow.png';
import location from '../../../desktopImages/hospitalCardLocation.png';
import { setDescription } from '../utils/utils.js';

class MedicalCenterCard extends React.Component {

    render() {
        let mData = this.props.data;
        console.log('about_client' + mData.about_client)
        return (
            <div className="col-lg-6 col-12 dskHspltDbCard">
                <div className="full_width radius-8 text-left dskHspltDbCardIn">
                    <div className="row">
                        <div className="radius-100 dskHspltDbCardPic">
                            <div className="radius-100 dskHspltDbCardPicIn">
                                {/* hospital image */}
                                {/* <img src="https://d3frl090092vlr.cloudfront.net/Fortis-Hospital-la-shalimar-bagh.jpg" className="object_fit_cover" /> */}
                                {
                                    (mData.client_logo !== '' || mData.client_logo !== undefined) ? <img src={mData.client_logo} className="translate_both" /> :
                                        <img src="https://d3frl090092vlr.cloudfront.net/Fortis-Hospital-la-shalimar-bagh.jpg" className="object_fit_cover" />
                                }
                            </div>
                        </div>
                        <div className="font_14px font400 dskHspltDbCardRight">
                            <h3 className="colorBlack fontExo font_22px font500">{(mData.client_name == '' || mData.client_name == undefined) ? null : mData.client_name}</h3>
                            <div className="clearfix"></div>
                            {
                                (mData.about_client == '' || mData.about_client == undefined) ? null :
                                    <div className="full_width dskHspltDbCardContent">
                                        <p>{(mData.about_client == '' || mData.about_client == undefined) ? null : setDescription(mData.about_client)}</p>
                                    </div>
                            }
                            <div className="full_width dskHspltDbCardBtm">
                                <div className="row align-items-center justify-content-between">
                                    <h5 className="font_14px dskHspltDbCardLocation"><img src={location} />{(mData.client_city == '' || mData.client_city == undefined) ? null : mData.client_city},{(mData.client_state == '' || mData.client_state == undefined) ? null : ' ' + mData.client_state}</h5>
                                    <div className="radius-8 colorWhite dskHspltDbCardBttn" onClick={this.props.click}>
                                        <span>Select <img src={begainArrow} /></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default MedicalCenterCard;