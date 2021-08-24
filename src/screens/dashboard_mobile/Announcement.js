import React from 'react'; 
import announcementBg from '../../mobImages/announcementBg.png';
import announcmentIcon from '../../mobImages/announcmentIcon.png'; 
import announcementClose from '../../mobImages/announcementClose.png';
import { reactLocalStorage } from 'reactjs-localstorage';
import AppConfig from '../config/config.js';
import $ from 'jquery';

import AnnouncementLoader from '../LoadingPlaceholders/AnnouncementLoader.jsx';

const url = AppConfig.apiLoc;

var announcementId  = undefined;
var announcementTitile = undefined;
var announcementDescription = undefined;
var announcementUrl = undefined;
var announcementUrlType = undefined; 

let isApiCallDone = false;
 class Announcement extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
        display:false
    };
    announcementId  = undefined;
    announcementTitile = undefined;
    announcementDescription = undefined;
    announcementUrl = undefined;
    announcementUrlType = undefined;
    
    isApiCallDone = false;
  }

  getAnnouncement = () =>{   
    fetch(url+'dashboard/announcement', {   
    method: 'GET',
    headers: { 
    'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
    'version': 'rjsw 1.1.1'
    }
    }).then((response) => response.json()).then((responseJson) => {  
    let status_code = responseJson.status_code;
    
    isApiCallDone = true;
    if(status_code == 200){
    let responseData = responseJson.data;
    announcementId  = responseData.id;
    announcementTitile = responseData.title;
    announcementDescription = responseData.text;
    announcementUrl = responseData.url;
    announcementUrlType = responseData.url_type; 
    $('#announcement-section').slideDown();  
    this.refresh()
    }  
    }).catch((error) => { 
      isApiCallDone = true;
        //console.log("Error"+error);
    });
  } 
  
  reportAnnouncementClose = () =>{   
    let jsonData = { 
      'type_id': announcementId
    }
    fetch(url+'dashboard/announcementClose', {   
    method: 'POST',
    headers: { 
    'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
    'version': 'rjsw 1.1.1'
    },
    body:JSON.stringify(jsonData),  
    }).then((response) => response.json()).then((responseJson) => {  
    let status_code = responseJson.status_code;
    if(status_code == 200){
    this.getAnnouncement() 
    } else{
      $('#announcement-section').slideDown();  
    } 
    }).catch((error) => { 
        //console.log("Error"+error);
    });
} 


  refresh = () => {
    this.setState({ "display": !this.state.display}); 
  }

  closeAnnouncementClick(){
    $('#announcement-section').slideUp();  
    this.reportAnnouncementClose()
  }

  componentDidMount(){
    announcementId  = undefined
    announcementTitile = undefined
    announcementDescription = undefined 
    announcementUrl = undefined
    announcementUrlType = undefined
    this.getAnnouncement()
  }

  onAnnouncementClick(){
    switch(announcementUrlType){
      case 'blank':
        this.openurl(announcementUrl,'_blank')
      break;
      case 'self':
        this.openurl(announcementUrl,'_self') 
      break;
      default:
        break;
    }
  }

  openurl(url,type){
    var win = window.open(url, type);  
    if(url != undefined || url != ''){
      if (win) { 
        win.focus();
      } else {
          alert('Please allow popups for this website');
      }   
    }   
  }

    render() { 
      return(
        <>
       {!announcementDescription && !isApiCallDone?<section className="full_width mblAnnouncment" id='announcement-section' >
          <div className="full_width mblAnnouncmentIn"><AnnouncementLoader/></div></section>:null}
          <>
          {(announcementDescription === undefined || announcementDescription === null || announcementDescription === '' )?null:
          <section className="full_width mblAnnouncment" id='announcement-section' >
          <div className="full_width mblAnnouncmentIn">
            <div className="radius-100 mblAnnouncmentIcon">
                <img src={announcmentIcon} className="translate_both"/>
            </div>
            <div className="full_width radius-6 mblAnnouncmentCont">
              <div className="radius-100 mblAnnouncmentClose" style={{"cursor":"pointer"}} onClick={this.closeAnnouncementClick.bind(this)}>
                  <img src={announcementClose} className="translate_both" />
              </div>
              <img src={announcementBg} alt="announcement" className="translate_top mblAnnouncmentBg" />
              <div className="full_width font_14px text-left"  onClick={()=>{this.onAnnouncementClick()}}  style={{"cursor":"pointer"}}>
                {/* {(announcementTitile === undefined || announcementTitile === null || announcementTitile === '' )?null:
                 <h3 className="colorBlack font700 fontExo font_20px mblAnnouncmentTtl">{announcementTitile}</h3>}  */}
                <div className="clearfix"></div>
                {(announcementDescription === undefined || announcementDescription === null || announcementDescription === '' )?null:
                 <p>{announcementDescription}</p>
                 } 
              </div>
            </div>
          </div>
        </section>}
        </>
        </>
      )
    }
  } 
 export default Announcement;