import React from 'react';
import $ from 'jquery';
import ReactGA from 'react-ga';
import MarqueeText from '../dashboard_mobile/MarqueeText.js';
import { reactLocalStorage } from 'reactjs-localstorage';
import AppConfig from '../config/config.js';
import '../../css/mobile.css';
import '../../css/mobileResponsive.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import {isMobile} from 'react-device-detect';

import navVault from '../../mobImages/navVault.png';
import navSearch from '../../mobImages/navSearch.png';
import { createBrowserHistory } from "history";


var firstnamefirst_letter = "";
const url = AppConfig.apiLoc;
const wordpress_url = AppConfig.wp_url;  
const img_path = AppConfig.img_path + "uploads/";
const history = createBrowserHistory()
ReactGA.initialize('G-CYP74BM1LV');
ReactGA.pageview(window.location.pathname + window.location.search);

var phone_no = "";
class HeaderMobile extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      phone_no: '',
      err_msg: "",
      otp: ""

    };
   fetch(url+'user/detail', {
      method: 'GET',
      headers: {


        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'

      }
    }).then((response) => response.json()).then((responseJson) => {
      if (responseJson.status_code == "200") {


      }
      else {
        this.props.history.push({
          pathname: `/`
        })

      }
    }).catch((error) => {
      this.props.history.push({
        pathname: `/`
      })
    });
    this.redirect_to_session = this.redirect_to_session.bind(this);
    
    if(reactLocalStorage.get('@ClirnetStore:page_reload_for_cph', true)=="1111" && window.location.href.indexOf("Cph")==-1)
		{
	  reactLocalStorage.set('@ClirnetStore:page_reload_for_cph',"2222"); 
			//window.location.reload();
		}
     }

  componentDidMount() {
  
    $('#zmmtg-root').remove();
//Getting first letter of logged in user's name
    firstnamefirst_letter = reactLocalStorage.get('@ClirnetStore:first_name', true);

    if (firstnamefirst_letter != "" && firstnamefirst_letter != true) {

      firstnamefirst_letter = firstnamefirst_letter.substring(0, 1);
    }

    setTimeout(function(){
			if(window.location.href.indexOf("Dashboard")==-1)
			{
			  reactLocalStorage.set('@ClirnetStore:page_reload',"1111"); 
			}
			else
			{
			  reactLocalStorage.set('@ClirnetStore:page_reload',"2222"); 
      }
      

      if(window.location.href.indexOf("Cph")!=-1)
			{
			  reactLocalStorage.set('@ClirnetStore:page_reload_for_cph',"1111"); 
			}
	  
		   }, 500);
    

  }

  componentWillMount() {
    document.title = "CLIRNet";



  }
  redirect_to_dashboard() {

    this.props.history.push({
      pathname: `/Dashboard`
    })
  }


  redirect_to_session() {
    this.props.history.push({
      pathname: `/Sessions`
    })
  }

  redirect_to_feeds() {
    this.props.history.push({
      pathname: `/Feeds`
    })
  }
  redirect_to_grandrounds() {
    this.props.history.push({
      pathname: `/GrandRoundlisting`
    })
  }

  redirect_to_vault() {
    this.props.history.push({
      pathname: `/Vault`
    })
  }

  redirect_to_profile() {
    this.props.history.push({
      pathname: `/Profile`
    })
  }

  redirect_to_search() {


  

    this.props.history.push({
      pathname: `/SearchResult`
    })
  }

  redirect_to_survey() {
    this.props.history.push({  
      pathname: `/Spq` 
    })
  }

  redirect_to_telemed() {
    this.props.history.push({  
      pathname: `/TeleMed`  
    })
  }

  redirect_to_deals() {
    this.props.history.push({ 
      pathname: `/Deals` 
    })
  }

  logout() {
    if (window.confirm('Are You Sure?')) {
      this.logoutFromWp(wordpress_url) 
      reactLocalStorage.set('@ClirnetStore:refreshToken', '');
      reactLocalStorage.set('@ClirnetStore:user_master_id', '');
      reactLocalStorage.set('@ClirnetStore:user_mem_id', '');
      reactLocalStorage.set('@ClirnetStore:client_logo', '');
      reactLocalStorage.set('@ClirnetStore:user_name', '');
      reactLocalStorage.set('@ClirnetStore:email', '');
      reactLocalStorage.set('@ClirnetStore:mobilePrimary', '');
      reactLocalStorage.set('@ClirnetStore:password', '');
      reactLocalStorage.set('@ClirnetStore:first_name', '');
      reactLocalStorage.set('@ClirnetStore:last_name', '');
      reactLocalStorage.set('@ClirnetStore:profile_image', '');
      reactLocalStorage.set('@ClirnetStore:profile_type', '');
      reactLocalStorage.set('@ClirnetStore:vault_count', '0');
      this.props.history.push({
        pathname: `/`
      })
    }
  }

  logoutFromWp(locations) {
    let request = new XMLHttpRequest(); 
    request.open("GET", locations, true);
    request.onload = () => {console.log("load url")}
    request.send();    
  }

  render() {

    return (
      <Navbar fixed="top" className="mblHeader">
        <div className="full_width">
          <div className="full_width mblNav"> 
            <div className="row justify-content-between align-items-center">
            <div className="mblNavLeft"> {/*onClick={() => { this.redirect_to_dashboard(); }}*/}
                <h1 className="font500 colorWhite fontExo text-uppercase mblNavLeftTtl font_22px"> {this.props.page_name}</h1>
            </div>
              <div className="mblNavRight">
                <ul className="align-items-center">
                  <li><a href="javascript:void(0)" onClick={() => { this.redirect_to_search(); }} className="radius-100"><img src={navSearch} alt="search" className="translate_both"/></a></li>
                  <li><a href="javascript:void(0)" onClick={() => { this.redirect_to_vault(); }} className="radius-100"><img src={navVault} alt="Vault" className="translate_both"/></a></li>
                  <li className="mblNavProfile"><a onClick={() => { this.redirect_to_profile(); }} href="javascript:void(0)" className="radius-100"><h5 className="font600 colorWhite font_30px text-uppercase translate_both header_profile_ttl">{firstnamefirst_letter}</h5></a></li>
                </ul>  
              </div>
            </div>


          </div>
          {/* /////////marquee-text/////////// */}
            <MarqueeText/>
          {/* /////////marquee-end/////////// */}
        </div>
        
      </Navbar>

    );
  }
}

export default HeaderMobile;
