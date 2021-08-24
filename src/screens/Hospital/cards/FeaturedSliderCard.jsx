import React from 'react';
import dskHspltDbSliderBg from '../../../desktopImages/dskHspltDbSliderBg.jpg';
import begainArrow from '../../../desktopImages/begainArrow.png';
import ssnTopBgGraphic from '../../../desktopImages/ssnTopBgGraphic.png';

class FeaturedSliderCard extends React.Component {
  render() {
    let fData = this.props.data;
    return (
      <div className="radius-6 dskHspltDbSliderBox">
        <div className="dskHspltDbSliderBoxTag font_16px fontExo colorWhite">Featured</div>
        <div className="overlay"></div>
        {(fData.referral_featured_image == '' || fData.referral_featured_image == undefined || fData.referral_featured_image == null) ?
          <img src={ssnTopBgGraphic} className="object_fit_cover dskHspltDbSliderBoxBg" /> :
          <img src={fData.referral_featured_image} className="object_fit_cover dskHspltDbSliderBoxBg" />
        }
        {(fData.client_logo == '' || fData.client_logo == undefined) ? null :
          <div className="dskHspltDbSliderPic-1">
            <img src={fData.client_logo} className="object_fit_cover" />
            <div className="overlay"></div>
          </div>
        }
        <div className="dskHspltDbSliderBoxIn">
          {(fData.client_logo !== '' || fData.client_logo !== undefined) ?
            <div className="dskHspltDbSliderPic-2">
              <img src={fData.client_logo} className="translate_both" />
            </div> : null}
          <div className="colorWhite font_16px dskHspltDbSliderBoxInRight">
            <h2 className="colorWhite font600 font_30px">{(fData.client_name == '' || fData.client_name == undefined) ? null : fData.client_name}</h2>
            <div className="clearfix"></div>
            <h4 className="font500 font_16px">{(fData.client_city == '' || fData.client_city == undefined) ? null : fData.client_city},{(fData.client_state == '' || fData.client_state == undefined) ? null : ' ' + fData.client_state}</h4>
            <div className="clearfix"></div>
            <div>
              <p>{(fData.client_address == '' || fData.client_address == undefined) ? null : fData.client_address}</p>
            </div>
            <div className="clearfix"></div>
            <div className="radius-8 colorWhite dskHspltDbCardBttn" onClick={this.props.click}>
              <span>Select <img src={begainArrow} /></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default FeaturedSliderCard;