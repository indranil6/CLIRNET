import React from 'react';
import {isMobile} from 'react-device-detect';

import '../../css/mobile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Navbar from 'react-bootstrap/Navbar';
import menuhomeActive from '../../mobImages/nav-home-active.png';
import menuhome from '../../mobImages/nav-home.png';
import menumedwikiActive from '../../mobImages/nav-medwiki-active.png';
import menumedwiki from '../../mobImages/nav-medwiki.png';

import menumoreActive from '../../mobImages/nav-more-active.png';
import menumore from '../../mobImages/nav-more.png';

import menupollsActive from '../../mobImages/nav-pollsQuiz-active.png';
import menupolls from '../../mobImages/nav-pollsQuiz.png';

import menusessionActive from '../../mobImages/nav-session-active.png';
import menusession from '../../mobImages/nav-session.png';
import * as utils from './utils/utils.js';

let currentYear = '';

 class Footer extends React.Component {
  constructor(props) {
    super(props);

    currentYear = this.getYear();
  }

  componentDidMount() {
    currentYear = this.getYear();
  }

  //added by sumit
  getYear(){
    let date = new Date(); 
    let year = date.getFullYear();
    return year;
  }

  render() {  
      return(
      <> 
        {(isMobile)?<FooterMobile history={this.props.history}/>:<FooterDesktop history={this.props.history} date={currentYear}/>}
      </>);
    }
  } 
 export default Footer;

 const FooterDesktop = (props)=>(
  <Navbar fixed="bottom" className="colorWhite text-center fontExo font_14px dskFtr">
    <div className="container">
      <div className="full_width">
      <p>© Copyright CLIRNet Services Private Limited {props.date}. All Rights Reserved.</p>
      </div>
    
    </div>
  </Navbar>
 )

 const FooterMobile = (props)=>(
  <Navbar fixed="bottom" className="mblBtmNavArea">
      <ul className="row font600 fontExo font_20px mblBtmNav">
        <li className="col">
          <a className="hospitals_mobile" href="javascript:void(0)" onClick={utils.redirectToDiscussAndRefer.bind(this, props.history)}>
            <span>
              <img src={menusession} alt="menu" className="translate_both mblBtmIcon"/>
              <img src={menusessionActive} alt="menu" className="translate_both mblBtmIconActive"/>
            </span> 
            Hospitals
          </a>
        </li>
        {/* <li className="col">
          <a className="medwiki_mobile" href="javascript:void(0)">
            <span>
              <img src={menumedwiki} alt="menu" className="translate_both mblBtmIcon"/>
              <img src={menumedwikiActive} alt="menu" className="translate_both mblBtmIconActive"/>
            </span> 
            MedWiki
          </a>
        </li> */}
        <li className="col">
          <a className="dashboard_mobile"  href="javascript:void(0)" onClick={utils.redirectToDashboard.bind(this, props.history)}>
            <span>
              <img src={menuhome} alt="menu" className="translate_both mblBtmIcon"/>
              <img src={menuhomeActive} alt="menu" className="translate_both mblBtmIconActive"/>
            </span> 
            Home
          </a>
        </li>
        {/* <li className="col">
          <a className="survey_mobile" href="javascript:void(0)">
            <span>
              <img src={menupolls} alt="menu" className="translate_both mblBtmIcon"/>
              <img src={menupollsActive} alt="menu" className="translate_both mblBtmIconActive"/>
            </span> 
            Polls &amp; Quizzes
          </a>
        </li> */}
        <li className="col">
          <a className="activities_mobile"  href="javascript:void(0)" onClick={utils.redirectToActivity.bind(this, props.history,'all')}>
            <span>
              <img src={menumore} alt="menu" className="translate_both mblBtmIcon"/>
              <img src={menumoreActive} alt="menu" className="translate_both mblBtmIconActive"/>
            </span> 
            Activities
          </a>
        </li>
      </ul>
  </Navbar>
 )