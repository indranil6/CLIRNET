import React from 'react';
import Slider from "react-slick";
import { reactLocalStorage } from 'reactjs-localstorage';
import $ from 'jquery';
import { isMobile } from 'react-device-detect';
import 'firebase/storage';
// import error from '../../desktopImages/error.gif';
import error from '../../desktopImages/error_image.png';
import logoTop from '../../desktopImages/logoTop.png';
const masonryOptions = {
    transitionDuration: 0
};
class PageNotFound extends React.Component {
    redirectToHome(){
        this.props.history.push({
            pathname: '/Dashboard/'
        })
    }
    render() {
        return (
            <div className="full_width">
                <div className="full_width unavailable_p">
                    <div className="full_width unavailable_pIn">
                        <img src={error} alt="error-image"/>
                        <h4 className="font500 text-uppercase font_20px colorBlack">Sorry Page Not Found!</h4>
                        <div className="clearfix"></div>
                        <a className="radius-8 colorWhite unavailable_pBtn" href="javascript:void(0)" onClick={()=>this.redirectToHome()}><span>Back to Home</span></a>
                    </div>
                    <div className="full_width unavailable_ftr">
                        <img src={logoTop} />
                    </div>
                </div>
            </div>
        )
    }
}
export default PageNotFound;