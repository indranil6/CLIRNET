// import React from 'react';
// import Loader from 'react-loader-spinner'
// import { reactLocalStorage } from 'reactjs-localstorage';
// import $ from 'jquery';
// import AppConfig from '../config/config.js';
// import medwikiicon from '../../images/medWikiNoImage-2.jpg';
// import deletelogo from '../../images/delete_icon.png';
// import {isMobile} from 'react-device-detect';

// import Header from '../mainscreens/Header';
// import Footer from '../mainscreens/Footer';
// import firebase from 'firebase/app';
// import 'firebase/storage';


// import calenderIcon from '../../images/cal-black.png';
// import masterconsultlogo from '../../images/session_box_type-3.png';
// import pluslogo from '../../images/file_add.png';
// import docDemo from '../../images/doctor_demo2.png';

// import Slider from "react-slick";
// import Collapse from 'react-bootstrap/Collapse';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
// import { ZoomMtg } from "@zoomus/websdk";
// const gtag = window.gtag;

// const zoomMeeting = document.getElementById('zmmtg-root');
// // Add this, never use it client side in production
// const API_KEY = 'Uh-hMduGQJmQcTGOGe-QrA';
// // Add this, never use it client side in production
// const API_SECRET = 'cG1rxzMI9jUoWvMwvdu0PPHVYgdnIkrMpBvl';
// // This can be your Personal Meeting ID
// const MEETING_NUMBER = 4858799231;

// const meetConfig = {
//     apiKey: API_KEY,
//     apiSecret: API_SECRET,
//     meetingNumber: MEETING_NUMBER,
//     userName: 'test user',
//     passWord: '1',
//     leaveUrl: 'https://zoom.us',
//     role: 0
// };

// class Zoom extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = { meetingLaunched: false };
//         this.turnItOff();
//       }
//     // state = {
//     //     meetingLaunched: false;
//     //     this.turnItOff();
//     // }

//     launchMeeting = () => {
        
//         // change state of meeting
//         this.setState({ meetingLaunched: !this.state.meetingLaunched })

//         // generateSignature should only be used in development
//         ZoomMtg.generateSignature({
//             meetingNumber: meetConfig.meetingNumber,
//             apiKey: meetConfig.apiKey, 
//             apiSecret: meetConfig.apiSecret,
//             role: meetConfig.role,
//             success(res) {
//                 console.log('signature', res.result);
//                 ZoomMtg.init({
//                     leaveUrl: 'http://www.zoom.us',
//                     success() {
//                         ZoomMtg.join(
//                             {
//                                 meetingNumber: meetConfig.meetingNumber,
//                                 userName: meetConfig.userName,
//                                 signature: res.result,
//                                 apiKey: meetConfig.apiKey,
//                                 userEmail: 'email@gmail.com',
//                                 passWord: meetConfig.passWord,
//                                 success() {
//                                     console.log('join meeting success');
//                                 },
//                                 error(res) {
//                                     console.log(res);
//                                 }
//                             }
//                         );
//                     },
//                     error(res) {
//                         console.log(res);
//                     }
//                 });
//             }
//         });
//     }
    
//     turnItOn = () => {
//         if (zoomMeeting != null) {
//           zoomMeeting.style.display = 'flex';
//           zoomMeeting.style.height = '100%';
//           zoomMeeting.style.width = '100%';
//           zoomMeeting.style.position = 'fixed';
//           zoomMeeting.style.zIndex = '1';
//           zoomMeeting.style.backgroundColor = 'blue';
//         }
//       }
    
//       turnItOff = () => {
//         if (zoomMeeting != null) {
//           zoomMeeting.style.display = 'none';
//           zoomMeeting.style.height = '0px';
//           zoomMeeting.style.width = '0px';
//           zoomMeeting.style.position = 'relative';
//           zoomMeeting.style.backgroundColor = 'black';
//           zoomMeeting.style.zIndex = '1';
//         }
//       }


//     componentDidMount() {

//         gtag('config', AppConfig.gtag_measure_id, {
// 			'page_title': window.document.title,
// 			'page_location': window.location.href,
// 			'page_path': window.location.pathname
// 			});
//         console.log('checkSystemRequirements');
//         console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));
//         ZoomMtg.setZoomJSLib('node_modules/@zoomus/websdk/dist/lib/', '/av');
//         // ZoomMtg.setZoomJSLib(' https://source.zoom.us/1.7.5/lib/', '/av');
//        // ZoomMtg.setZoomJSLib('https://jssdk.zoomus.cn/1.8.1/lib', '/av');
//         ZoomMtg.preLoadWasm(); 
//         ZoomMtg.prepareJssdk();
//     }

//     render() {
//         if (!this.state.meetingLaunched) {
//             this.turnItOff();
//           } else {
//             this.turnItOn();
//           }
//           console.log('Rendering.');
//           if (zoomMeeting != null) {
//             zoomMeeting.style.height = '500px';
//             zoomMeeting.style.width = '200px';
//             zoomMeeting.style.position = 'relative';
//             zoomMeeting.style.zIndex = '1';
//           }
//         const { meetingLaunched} = this.state;
//         // Displays a button to launch the meeting when the meetingLaunched state is false
//         return (
//             <>
//                 {!meetingLaunched ? 
//                     <button className="launchButton" onClick={this.launchMeeting}>Launch Meeting</button> 
//                 : 
//                 <div id="zmmtg-root" />
//                     // <></>
//                 }
//             </>
//         )
//     }
// }
// export default Zoom;