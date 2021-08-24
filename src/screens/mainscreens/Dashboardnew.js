import React from 'react';
import Loader from 'react-loader-spinner'
import { reactLocalStorage } from 'reactjs-localstorage';
import $ from 'jquery';
import AppConfig from '../config/config.js';
import medwikiicon from '../../images/medWikiNoImage-2.jpg';
import deletelogo from '../../images/delete_icon.png';
import {isMobile} from 'react-device-detect';

import Headernew from '../mainscreens/Headernew';
import Footernew from '../mainscreens/Footernew';
import firebase from 'firebase/app';
import 'firebase/storage';


import calenderIcon from '../../images/cal-black.png';
import masterconsultlogo from '../../images/session_box_type-3.png';
import pluslogo from '../../images/file_add.png';
import docDemo from '../../images/doctor_demo2.png';

import Slider from "react-slick";
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const gtag = window.gtag;


class Dashboardnew extends React.Component {
 
  constructor(props) {
    super(props);

   
  }





  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      adaptiveHeight: true,
      autoplay:true
    };
    return (
      <div className="full_width warp_body">
        <Headernew history={this.props.history} />
        <section className="full_width body_area">
          


        </section>
        
       
        <Footernew />
      </div>

    );
  }
}

export default Dashboardnew;





