import React from 'react';
import vaultIcon from '../../images/vault.png';
import logout from '../../images/logout.png';
import $ from 'jquery';
import ReactGA from 'react-ga';
import { useLocation } from 'react-router-dom'
import searchIcon from '../../images/search.png';
import { reactLocalStorage } from 'reactjs-localstorage';
import AppConfig from '../config/config.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { createBrowserHistory } from "history";
var firstnamefirst_letter = "";
const url = AppConfig.apiLoc;
const wordpress_url = AppConfig.wp_url;  
const img_path = AppConfig.img_path + "uploads/";
const history = createBrowserHistory()
ReactGA.initialize('G-CYP74BM1LV');
ReactGA.pageview(window.location.pathname + window.location.search);
//ReactGA.set({ dimension14: 'Sports' });

var phone_no = "";
class Headernew extends React.Component {

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


     }

  componentDidMount() {
    $('#zmmtg-root').remove();
//Getting first letter of logged in user's name
    firstnamefirst_letter = reactLocalStorage.get('@ClirnetStore:first_name', true);

    if (firstnamefirst_letter != "" && firstnamefirst_letter != true) {

      firstnamefirst_letter = firstnamefirst_letter.substring(0, 1);
    }

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

//Logout Functionality
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
      <Navbar fixed="top" expand="lg" className="headerTop">
        <Navbar.Brand className="logo_top" onClick={() => { this.redirect_to_dashboard(); }} href="javascript:void(0);"><img src={"" + img_path + "logo/" + reactLocalStorage.get('@ClirnetStore:client_logo', true)} width="224" height="63" alt="logo" title="logo" /></Navbar.Brand>
        <div className="forResNavRight">
          <a href="javascript:void(0)" onClick={() => { this.redirect_to_search(); }} className="radius-100 search_top search_top_res">
            <img className="translate_both" src={searchIcon} />
          </a>
          <Navbar.Toggle className="menuIconRes" aria-controls="basic-navbar-nav" />
        </div>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end header_right">

          <a href="javascript:void(0)" onClick={() => { this.redirect_to_profile(); }} className="search_top_res topProfileArea">
            <div className="radius-100 header_profile" style={{ 'background-color': '#21c6b1' }}>
              <h5 className="font600 colorWhite font_30px text-uppercase translate_both header_profile_ttl">{firstnamefirst_letter}</h5>
            </div>
            <span className="font700 font_14px colorBlack">Welcome,<br></br> Dr. {reactLocalStorage.get('@ClirnetStore:first_name', true)} {reactLocalStorage.get('@ClirnetStore:last_name', true)}<span className="font600 font_14px colorBlue">View Profile</span></span>
          </a>

          <Nav className="font600">
            <Nav.Link className="limain li_home" href="javascript:void(0)" onClick={() => { this.redirect_to_dashboard(); }}>Home</Nav.Link>
            <Nav.Link className="limain li_session" href="javascript:void(0)" onClick={() => { this.redirect_to_session(); }}>Session</Nav.Link>
            <Nav.Link className="limain li_medwiki" href="javascript:void(0)" onClick={() => { this.redirect_to_feeds(); }}>MedWiki</Nav.Link>
            <Nav.Link className="limain li_survey" href="javascript:void(0)" onClick={() => { this.redirect_to_survey(); }}>Polls & Quizzes</Nav.Link>
            <Nav.Link className="limain li_telemed" href="javascript:void(0)" onClick={() => { this.redirect_to_telemed(); }}>TeleMed Lite</Nav.Link>
            {/* <Nav.Link className="limain li_deals" href="javascript:void(0)" onClick={() => { this.redirect_to_deals(); }}><span className="bgColorGreen font_10px font700 newItemav ">New</span> Deals</Nav.Link> */}
          </Nav> 
          <a href="javascript:void(0)" onClick={() => { this.redirect_to_search(); }} className="radius-100 search_top search_top_desk">
            <img className="translate_both" src={searchIcon} />
          </a>
          <a href="javascript:void(0)" onClick={() => { this.redirect_to_vault(); }} className="radius-100 noti_vaultTop vault_top">
            <img className="translate_both" src={vaultIcon} />
            {(parseInt(reactLocalStorage.get('@ClirnetStore:vault_count', true)) > 0) ?
              <span className="radius-100 bgColorBlue colorWhite font_12px noti_vaultTop_count">{reactLocalStorage.get('@ClirnetStore:vault_count', true)}</span> : null}
          </a>
         
          <a href="javascript:void(0)" onClick={() => { this.redirect_to_profile(); }} className="radius-100 header_profile search_top_desk" style={{ 'background-color': '#21c6b1' }}>
            <h5 className="font600 colorWhite font_30px text-uppercase translate_both header_profile_ttl">{firstnamefirst_letter}</h5>
          </a>
          <a href="javascript:void(0)" onClick={() => { this.logout(); }} className="radius-100 noti_vaultTop logoutBtn active">
            <img className="translate_both" src={logout} />
          </a>
        </Navbar.Collapse>
      </Navbar>

    );
  }
}

export default Headernew;
