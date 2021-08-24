import React from 'react';
import AppConfig from '../config/config.js';
import $ from 'jquery';
import {isMobile} from 'react-device-detect';


const url = AppConfig.apiLoc;

var currentYear = '';
var phone_no = "";
class Footernew extends React.Component {

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
      <footer  class="full_width font500 colorWhite text-center page_footer">
        <div class="container">
          <p>© Copyright CLIRNet Services Private Limited {this.getYear()}. All Rights Reserved.</p>
        </div>
      </footer>
    );
  }
}

export default Footernew;