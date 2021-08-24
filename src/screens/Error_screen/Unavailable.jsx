import React from 'react';
// import giphy from '../../desktopImages/giphy.gif';
import giphy from '../../desktopImages/giphy_image.png';
import logoTop from '../../desktopImages/logoTop.png';
const masonryOptions = {
    transitionDuration: 0
};
class Unavailable extends React.Component {
    render() {


        return (
            <div className="full_width">
                <div className="full_width unavailable_p">
                    <div className="full_width unavailable_pIn">
                        <img src={giphy} alt="unavailable-image"/> 
                        <h4 className="font500 text-uppercase font_20px colorBlack">Unfortunately this content is unavailable</h4>
                        <div className="clearfix"></div>
                        <a className="radius-8 colorWhite unavailable_pBtn" href="javascript:void(0)"><span>Back to Home</span></a>
                    </div>
                    <div className="full_width unavailable_ftr">
                        <img src={logoTop} />
                    </div>
                </div>
            </div>
        )
    }
}
export default Unavailable;