import React from 'react';
import AppConfig from '../config/config.js';
import $ from 'jquery';
import '../../css/mobile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { isMobile } from 'react-device-detect';
import { reactLocalStorage } from 'reactjs-localstorage';

import menuhomeActive from '../../mobImages/nav-home-active.png';
import menuhome from '../../mobImages/nav-home.png';
import { createBrowserHistory } from "history";
import menumedwikiActive from '../../mobImages/nav-medwiki-active.png';
import menumedwiki from '../../mobImages/nav-medwiki.png';

import menumoreActive from '../../mobImages/nav-more-active.png';
import menumore from '../../mobImages/nav-more.png';

import menupollsActive from '../../mobImages/nav-pollsQuiz-active.png';
import menupolls from '../../mobImages/nav-pollsQuiz.png';


import menusessionActive from '../../mobImages/nav-session-active.png';
import menusession from '../../mobImages/nav-session.png';
const history = createBrowserHistory()

const url = AppConfig.apiLoc;

var currentYear = '';
var phone_no = "";
class FooterMobile extends React.Component {

  constructor(props) {
    super(props);

    currentYear = this.getYear();
  }



  redirect_to_dashboard() {
    if(window.location.href.indexOf("Cph")!=-1)
    {
      reactLocalStorage.set('@ClirnetStore:jugar_url', '/Dashboard');
    }

    if(window.location.href.indexOf("Dashboard")==-1)
    {

  this.props.history.push({
    pathname: `/Dashboard`
  })
}
  }


  redirect_to_session() {
    if(window.location.href.indexOf("Cph")!=-1)
    {
      reactLocalStorage.set('@ClirnetStore:jugar_url', '/Sessions');
    }
    this.props.history.push({
      pathname: `/Sessions`
    })
  }

  redirect_to_feeds() {
    if(window.location.href.indexOf("Cph")!=-1)
    {
      reactLocalStorage.set('@ClirnetStore:jugar_url', '/Feeds');
    }
    this.props.history.push({
      pathname: `/Feeds`
    })
  }
  redirect_to_grandrounds() {
    if(window.location.href.indexOf("Cph")!=-1)
    {
      reactLocalStorage.set('@ClirnetStore:jugar_url', '/GrandRoundlisting');
    }
    this.props.history.push({
      pathname: `/GrandRoundlisting`
    })
  }

  redirect_to_covid() {
    if(window.location.href.indexOf("Cph")!=-1)
    {
      reactLocalStorage.set('@ClirnetStore:jugar_url', '/CphMobile');
    }
    this.props.history.push({
      pathname: '/CphMobile'
    })
  }

  redirect_to_vault() {
    if(window.location.href.indexOf("Cph")!=-1)
    {
      reactLocalStorage.set('@ClirnetStore:jugar_url', '/Vault');
    }
    this.props.history.push({
      pathname: `/Vault`
    })
  }

  redirect_to_profile() {
    if(window.location.href.indexOf("Cph")!=-1)
    {
      reactLocalStorage.set('@ClirnetStore:jugar_url', '/Profile');
    }
    this.props.history.push({
      pathname: `/Profile`
    })
  }

  redirect_to_search() {
    if(window.location.href.indexOf("Cph")!=-1)
    {
      reactLocalStorage.set('@ClirnetStore:jugar_url', '/SearchResult');
    }

    this.props.history.push({
      pathname: `/SearchResult`
    })
  }

  redirect_to_survey() {
    if(window.location.href.indexOf("Cph")!=-1)
    {
      reactLocalStorage.set('@ClirnetStore:jugar_url', '/Spq');
    }
    this.props.history.push({
      pathname: `/Spq`
    })
  }

  redirect_to_telemed() {
    if(window.location.href.indexOf("Cph")!=-1)
    {
      reactLocalStorage.set('@ClirnetStore:jugar_url', '/TeleMed');
    }
    this.props.history.push({
      pathname: `/TeleMed`
    })
  }

  redirect_to_deals() {

    if(window.location.href.indexOf("Cph")!=-1)
    {
      reactLocalStorage.set('@ClirnetStore:jugar_url', '/Deals');
    }
    this.props.history.push({
      pathname: `/Deals`
    })
  }

  componentDidMount() {
    currentYear = this.getYear();
    // $('#zmmtg-root').remove();
  }

  //added by sumit
  getYear() {
    let date = new Date();
    let year = date.getFullYear();
    return year;
  }


  render() {

    return (
      <Navbar fixed="bottom" className="mblBtmNavArea">
        <ul className="row font600 fontExo font_20px mblBtmNav">
          <li className="col">
            <a className="Cph_mobile" href="javascript:void(0)" onClick={() => { this.redirect_to_covid(); }}>
              <span>
                <img src={menumore} alt="menu" className="translate_both mblBtmIcon" />
                <img src={menumoreActive} alt="menu" className="translate_both mblBtmIconActive" />
              </span>
             COVID Peer Hotline
            </a>
          </li>
          <li className="col">
            <a className="ses_mobile" href="javascript:void(0)" onClick={() => { this.redirect_to_session(); }}>
              <span>
                <img src={menusession} alt="menu" className="translate_both mblBtmIcon" />
                <img src={menusessionActive} alt="menu" className="translate_both mblBtmIconActive" />
              </span>
              Live CME
            </a>
          </li>
          <li className="col">
            <a className="medwiki_mobile" href="javascript:void(0)" onClick={() => { this.redirect_to_feeds(); }}>
              <span>
                <img src={menumedwiki} alt="menu" className="translate_both mblBtmIcon" />
                <img src={menumedwikiActive} alt="menu" className="translate_both mblBtmIconActive" />
              </span>
              MedWiki
            </a>
          </li>
          {/* <li className="col">
            <a className="dashboard_mobile"  href="javascript:void(0)" onClick={() => { this.redirect_to_dashboard(); }}>
              <span>
                <img src={menuhome} alt="menu" className="translate_both mblBtmIcon"/>
                <img src={menuhomeActive} alt="menu" className="translate_both mblBtmIconActive"/>
              </span> 
              Home
            </a>
          </li> */}
          <li className="mblBtmMenuHome">
            <a className="dashboard_mobile" href="javascript:void(0)" onClick={() => { this.redirect_to_dashboard(); }}>
              <span>
                <img src={menuhome} alt="menu" className="translate_both mblBtmIcon" />
                <img src={menuhomeActive} alt="menu" className="translate_both mblBtmIconActive" />
              </span>

            </a>
          </li>
          <li className="col">
            <a className="survey_mobile" href="javascript:void(0)" onClick={() => { this.redirect_to_survey(); }}>
              <span>
                <img src={menupolls} alt="menu" className="translate_both mblBtmIcon" />
                <img src={menupollsActive} alt="menu" className="translate_both mblBtmIconActive" />
              </span>
              Polls &amp; Quizzes
            </a>
          </li>
          <li className="col">
            <a className="grandround_mobile" href="javascript:void(0)" onClick={() => { this.redirect_to_grandrounds(); }}>
              <span>
                <img src={menumore} alt="menu" className="translate_both mblBtmIcon" />
                <img src={menumoreActive} alt="menu" className="translate_both mblBtmIconActive" />
              </span>
              Grand Rounds
            </a>
          </li>


        </ul>

      </Navbar>
    );
  }
}

export default FooterMobile;