import React from 'react';
import $ from 'jquery';
import MarqueeText from '../dashboard_mobile/MarqueeText.js';
import { reactLocalStorage } from 'reactjs-localstorage';
import '../../css/mobile.css';
import '../../css/mobileResponsive.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import navVault from '../../mobImages/navVault.png';
import navSearch from '../../mobImages/navSearch.png';
var firstnamefirst_letter = "";

class HeaderMobileStatic extends React.Component {
  componentDidMount() {
    $('#zmmtg-root').remove();
    let auto_auth_name =  reactLocalStorage.get('@ClirnetStore:auto_auth_name', true) 
    firstnamefirst_letter = auto_auth_name.charAt(0)
  } 

  componentWillMount() {
    document.title = "CLIRNet";
  }

  render() {
    return (
      <Navbar fixed="top" className="mblHeader">
        <div className="full_width">
          <div className="full_width mblNav"> 
            <div className="row justify-content-between align-items-center">
            <div className="mblNavLeft"> {/*onClick={() => { this.redirect_to_dashboard(); }}*/}
                <h1 className="font500 colorWhite fontExo text-uppercase mblNavLeftTtl font_24px"> CLIRNET</h1>
            </div> 
              <div className="mblNavRight">
                <ul className="align-items-center">
                  <li><a href="javascript:void(0)"  className="radius-100"><img src={navSearch} alt="search" className="translate_both"/></a></li>
                  <li><a href="javascript:void(0)"  className="radius-100"><img src={navVault} alt="Vault" className="translate_both"/></a></li>
                  <li className="mblNavProfile"><a href="javascript:void(0)" className="radius-100"><h5 className="font600 colorWhite font_30px text-uppercase translate_both header_profile_ttl">{this.props.name}</h5></a></li>
                </ul>  
              </div>
            </div>
          </div>
        </div>   
      </Navbar>
    );
  }
}

export default HeaderMobileStatic;
