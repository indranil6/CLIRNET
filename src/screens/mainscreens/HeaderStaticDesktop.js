import React, {Component} from 'react';
import $ from 'jquery';
import { reactLocalStorage } from 'reactjs-localstorage';
import '../../css/desktop.css';
import '../../css/new-responsive.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, NavItem, NavDropdown} from 'react-bootstrap';
import logoTop from '../../desktopImages/logoTop.png';
import navSearch from '../../desktopImages/navSearch.png';
import navVault from '../../desktopImages/navVault.png';
import navLogout from '../../desktopImages/navLogout.png';


class HeaderDesktopStatic extends React.Component { 

  componentWillMount() {
    document.title = "CLIRNet";
  }
 
  render() {
    return (
      <Navbar expand="lg" fixed="top" className="dskHeader">
        <div className="full_width">
        <div className="full_width dskNav">
        <div className="row align-items-center">
        <Navbar.Brand href="javascript:void(0)">
          <img src={logoTop} alt="CLIRnet" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className=" justify-content-between">
          <Nav className="font_14px col fontExo font500 dskNavMenu">
          <Nav.Link className="limain li_home" href="javascript:void(0)">Home</Nav.Link>
          <Nav.Link className="limain li_covid" href="javascript:void(0)">COVID Peer Hotline</Nav.Link> 
            <Nav.Link className="limain li_session" href="javascript:void(0)" >Live CME</Nav.Link>
            <Nav.Link className="limain li_medwiki" href="javascript:void(0)">MedWiki</Nav.Link>
            <Nav.Link className="limain li_grandround" href="javascript:void(0)">Grand Rounds</Nav.Link>
            <Nav.Link className="limain li_survey" href="javascript:void(0)" >Polls & Quizzes</Nav.Link>
            <Nav.Link className="limain li_telemed" href="javascript:void(0)" >TeleMed Lite</Nav.Link>
          </Nav> 
          <Nav className="dskNavRight align-items-center">
            <Nav.Link href="javascript:void(0)" className="radius-100 dskNavProfile" style={{ 'background-color': '#21c6b1' }}>
            <h5 className="font600 colorWhite font_24px text-uppercase translate_both header_profile_ttl">{this.props.name}</h5>
            </Nav.Link>
            <Nav.Link className="radius-100"> 
                <img src={navSearch} alt="search" className="translate_both" />
            </Nav.Link>
            <Nav.Link className="radius-100 active dskNavVault" > 
                <img src={navVault} alt="search" className="translate_both" />
                {(parseInt(reactLocalStorage.get('@ClirnetStore:vault_count', true)) > 0) ?
                <span className="radius-100 font_12px">{reactLocalStorage.get('@ClirnetStore:vault_count', true)}</span>:null}
            </Nav.Link>
            <Nav.Link className="radius-100" > 
                <img src={navLogout} alt="search" className="translate_both" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </div>
        </div>
      </div> 
    </Navbar>
    );
  } 
}

export default HeaderDesktopStatic;
