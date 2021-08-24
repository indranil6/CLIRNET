import React from 'react'; 
import AppConfig from '../config/config.js';
import $ from 'jquery';
import '../../css/mobile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import {isMobile} from 'react-device-detect';
import packageJson from "../../../package.json";
const appVersion = packageJson.version;
const url = AppConfig.apiLoc;

var currentYear = '';
var phone_no = "";
class FooterDesktop extends React.Component {

  constructor(props) {
    super(props);

    currentYear = this.getYear();
  }

  componentDidMount() {
    currentYear = this.getYear();
    // $('#zmmtg-root').remove();
  }

  //added by sumit
  getYear(){
    let date = new Date(); 
    let year = date.getFullYear();
    return year;
  }


  render() { 

    return (
      <>
      {(window.location.href.indexOf("Profile")!=-1)?
			
        <Navbar fixed="bottom" className="colorWhite text-center fontExo font_14px dskFtr">
       <div className="container">
       <div className="full_width">
      <p>© Copyright CLIRNET Services Private Limited 2021. All Rights Reserved. Version {appVersion}</p>
      </div>
         
      </div>
      </Navbar>:null}
      </>
     
    );
  }
}

export default FooterDesktop;