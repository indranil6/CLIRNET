import React,{ Component } from 'react';
import Loader from 'react-loader-spinner' 
import $ from 'jquery';
import 'firebase/storage'
import Slider from "react-slick";
import { reactLocalStorage } from 'reactjs-localstorage';
import AppConfig from '../config/config.js';
import Header from './Header';
import Footer from './Footer';
import telemedSec2Icon1 from '../../images/telemedSec-2Icon-1.png';
import telemedSec2Icon2 from '../../images/telemedSec-2Icon-2.png';
import telemedSec2Icon3 from '../../images/telemedSec-2Icon-3.png';
import telemedSBnr from '../../images/telemedBanner.jpg';
import telemedPBnnrLogo from '../../images/telemedLOGO.png';
import download from '../../images/telemedDownload.png';
import getLink from '../../images/telemedDownloadLink.png';
import arrow from '../../images/begainArrow.png';
import mobile from '../../images/telemadePhone.png';
import telemedScreen1 from '../../images/telemed-screens-1.jpg';
import telemedScreen2 from '../../images/telemed-screens-2.jpeg';
import telemedScreen3 from '../../images/telemed-screens-3.jpeg';
// import {getMobileNO} from '../Common/Common.js';   
import Modal from 'react-bootstrap/Modal';
import {isMobile} from 'react-device-detect';
import Banner from '../mainscreens/Banner'; 

const gtag = window.gtag;

const pageNames = "Tele Med"
const appStoreUrl = AppConfig.app_store_url;
var phonenoFormat = /^\d{10}$/;   

const url = AppConfig.apiLoc;
class TeleMed extends React.Component
{
  constructor(props){
    super(props); 

    this.state= { 
      is_loader: false, 
      phone_no: '',   
      err_msg:'',
      banner_display:false,
      show_mobile_input_modal:false,
      not_access_modal: false,
      rerender:false,
    };
    // this.checkDevice();
  } 
 
  checkDevice(){
    let mob = this.isMobile();
    // alert("mobile:"+mob)  
    console.log("mob"+mob) 
    if(mob == 'false' || mob == false ){
      console.log("in if")
      this.setState({"not_access_modal": true});  
    }
  }
  componentDidMount() {

    window.document.title = "CLIRNET - Telemed Lite"

    gtag('config', AppConfig.gtag_measure_id, {
			'page_title': window.document.title,
			'page_location': window.location.href,
			'page_path': window.location.pathname
			});

    $('.li_telemed').attr('id', 'telemed_cal');
    
  }

    openNewTab(url){ 
        var win = window.open(url, '_blank');    
        if (win) {
            win.focus();
        } else {
            //Browser has blocked it
            alert('Please allow popups for this website');
        }  
    } 

    sendLink(){
      this.setState({'err_msg':""}); 
      if(this.state.phone_no == '' || this.state.phone_no == 'undefined' ){
        this.setState({'err_msg':'Please enter mobile no'});
      }
      if(!this.state.phone_no.match(phonenoFormat)){ 
        this.setState({'err_msg':'Please Enter mobile no in correct format'});

      }else{  
      this.setState({'err_msg':''});
      let formdata = new FormData();
      formdata.append("mobile_no", this.state.phone_no)
      this.setState({'is_loader': true});

      fetch(url+'autologin/otpsend',{  
        method: 'POST', 
        headers: {
          'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
          'version': 'rjsw 1.1.1'
        }, 
        body: formdata,
        }).then((response) => response.json()).then((responseJson) => {     
        let res_code = responseJson.status_code;
        this.setState({'is_loader': false});
        if(res_code == 200){ 
          this.setState({'err_msg': 'A download link is sent to ******'+this.state.phone_no.slice(this.state.phone_no.length - 4)+' number. Download Now :)'})
          setTimeout(
            () => this.setState({ "show_mobile_input_modal": false }),  
            4000
          );
        }
        else{
          this.setState({'err_msg': 'Unable to send download link'})
        } 
        }).catch((error) => { 
          this.setState({'is_loader': false});
            console.log("Error"+error);
        });
      }  
    } 

  onGetLinkClick(){
    const mobileNo =undefined; // getMobileNO()
    if(mobileNo != undefined || mobileNo != undefined){
      this.setState({ "phone_no": mobileNo }); 
      this.sendLink()
    }else{
      this.setState({ "show_mobile_input_modal": true }); 
    }
  }
 
  isMobile() { 
    let mob = false; 
    if (navigator.userAgent.match(/Android/i) 
    || navigator.userAgent.match(/webOS/i) 
    || navigator.userAgent.match(/iPhone/i)  
    || navigator.userAgent.match(/iPad/i)  
    || navigator.userAgent.match(/iPod/i) 
    || navigator.userAgent.match(/BlackBerry/i) 
    || navigator.userAgent.match(/Windows Phone/i)) 
    { 
    mob = true; 
    } else { 
    mob = false; 
    }
    return mob;  
  } 

  onDownloadClick(){
    this.openNewTab(appStoreUrl);
  }

  onInputChange(val){
    this.setState({"err_msg":''})
    this.setState({"phone_no":val.target.value})
  }

  display_banner(datam)
  {
    this.setState({"banner_display":true})
  }
  componentWillUnmount()
  {
    $('html, body').css({
      overflow: 'auto',
      height: 'auto'
    });
  }
 
    render() {  
      var settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        adaptiveHeight: false,
        autoplay:true
      };
      return (
        <div className={ isMobile == true ? 'full_width wrap_body mblScreen' : 'full_width wrap_body dskScreen'}>   
          <Header history={this.props.history}  page_name={pageNames}/>
            <section className="full_width telemedPBody">
              <div className="container">  
                <div className="row">
                <Banner type_id={0} type={"telmed"}  apiresponserecieved={this.display_banner.bind(this)} api_call_detail={1} api_call={0}/>          
                {this.state.banner_display?<Banner type_id={0} banner_position={1} unmount_call={1} type={"telmed"}  api_call={1} before_unload_call={1}/>:null}
                <div>&nbsp;</div>           
                    <div className="full_width radius-6 telemedPMain">
                      <div className="full_width telemedPBnnr">
                        <img src={telemedSBnr} className="object_fit_cover telemedPBnnrBG"/>
                          <div className="row align-items-center telemedPBnnrContent">
                            <div className="col-md-6 col-12 telemedPBnnrLeft">
                              <div className="row justify-content-center">
                                <div className="telemedPBnnrLeftMain">
                                  <img src={mobile} className="telemedPBnnrLeftMobile"/>
                                  <Slider {...settings} className="telemedPBnnrLeftSlider">
                                    <img src={telemedScreen1} className="object_fit_cover"/>
                                    <img src={telemedScreen2} className="object_fit_cover"/>
                                    <img src={telemedScreen3} className="object_fit_cover"/>
                                  </Slider>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6 col-12 text-left telemedPBnnrRight">
                              <div className="full_width telemedPBnnrRightIn">
                              <img src={telemedPBnnrLogo} className="telemedPBnnrLogo"/>
                              <div className="clearfix"></div>
                              <h3 className="colorWhite font_22px font600">Your Virtual Clinic in Just 2 Mins!</h3>
                              <div className="clearfix"></div>
                              <h4 className="colorWhite font_20px font500">Get a free life-time access.</h4>
                              <div className="clearfix"></div> 
                              <div className="clearfix"></div>
                              <h4 className="colorWhite font_18px font500">TeleMed Lite is available for use on mobile phones only.</h4>
                              <div className="clearfix"></div>
                              <h2 className="colorWhite font_36px text-uppercase font900">DOWNLOAD APP Today</h2>
                              <div className="clearfix"></div>
                              <div className="full_width">
                              <a className="font_16px  font600 telemedPBnnrDownloadBtn" href={appStoreUrl} target="_blank" >Open Now <img src={download} /></a>
                             
                             {/* <a className="font_16px  font600 telemedPBnnrDownloadBtn" href="javascript:void(0)" onClick={() => {this.onGetLinkClick()}}>Get Link <img src={getLink} /></a> */}

                              </div>
                              
                              <div className="clearfix"></div>
                              
                            </div>
                            </div>

                          </div>
                      </div>


                     <div className="full_width font500 font_16px colorBlack telemedSec2">
                      <h2 className="font_20px text-uppercase telemedSec2Ttl">Now enjoy a hassle-free Telemedicine <br/> platform that would ease out:</h2>
                      <div className="clearfix"></div>
                      
                      <div className="row justify-content-center telemedSec2In">
                        <div className="col-md-9 col-12 telemedSec2GRid">
                          <div className="row">

                          
                        <div className="col-sm-4 col-12 telemedSec2Box">
                          <div className="full_width telemedSec2BoxIn">
                            <div className="full_width telemedSec2BoxIcon">
                              <img src={telemedSec2Icon1}  className="translate_both"/>
                            </div>
                            <div className="clearfix"></div>
                            <h4 className="font_16px">Ad-hoc patient <br/> video/audio calls</h4>
                          </div>
                        </div>
                        <div className="col-sm-4 col-12 telemedSec2Box">
                          <div className="full_width telemedSec2BoxIn">
                            <div className="full_width telemedSec2BoxIcon">
                              <img src={telemedSec2Icon2}  className="translate_both"/>
                            </div>
                            <div className="clearfix"></div>
                            <h4 className="font_16px">Patient database <br/> management</h4>
                          </div>
                        </div>
                        <div className="col-sm-4 col-12 telemedSec2Box">
                          <div className="full_width telemedSec2BoxIn">
                            <div className="full_width telemedSec2BoxIcon">
                              <img src={telemedSec2Icon3}  className="translate_both"/>
                            </div>
                            <div className="clearfix"></div>
                            <h4 className="font_16px">Consultation <br/> payment flows</h4>
                          </div>
                        </div>
                        </div>
                        </div>
                      </div>

                    </div>

                      <div className="full_width font500 font_16px colorWhite telemedFtr">
                        <p>Set up your virtual clinic in just 2 mins using tele-medicine lite, browse over 10,000+ MedWiki’s (Medicine’s Wikipedia), engage in group discussions with your peers or, enjoy interesting quizzes &amp; polls. We invite you to join this vibrant community of 150,000+ doctors for a free life-time access.</p>

                      </div>

                    </div>
                </div>
                {this.state.banner_display?<Banner type_id={0} banner_position={2} unmount_call={0} type={"telmed"}  api_call={1} before_unload_call={0}/> :null}
              </div>
            </section>
            {/* //////////////////////////////////////////////////////////////////////////// */}
            
            <Modal id="root-modal"  keyboard={ false } className="in ssnCancelPop" centered="true" animation="slide" show={this.state.show_mobile_input_modal} onHide={() => { this.setState({ "show_mobile_input_modal": false }); }} >
                <Modal.Header className="justify-content-center">
                  <Modal.Title  className="font600 font_18px colorBlack">Please Tell Us Your Mobile No
                  </Modal.Title>
                </Modal.Header>  
              <Modal.Body> 
                <div class="form_container_cmn">
                  <div class="col-xs-12 form_row_pop autoLoginPopFrm">
                      <div className="full_width frmPart">
                        <form>
                          <div className="full_width radius-6 telemedPBnnrInputCont">
                            <input type="text" placeholder="Mobile Number" className="telemedPBnnrInput"  onChange={this.onInputChange.bind(this)} />
                              <button className="telemedPBnnrInputBtn" onClick={() => {this.sendLink()}}>
                              <img src={arrow} className="translate_both"/>
                              </button>
                          </div>
                        </form> 
                      </div>
                  </div>
                  <div className="clearfix"></div>
                  {(this.state.is_loader == true || this.state.is_loader === 'true')? 
                  <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={40} width={40} visible={true} />:null} 
                  <div className="clearfix"></div>
                  {(this.state.err_msg !='')?
                  <div className="full_width text-center mt-2 alert alert-danger">
                    <label>{this.state.err_msg}</label>
                  </div>:null}           
                </div>
              </Modal.Body>
              {/* <Modal.Footer className="justify-content-center">
              <a href="javascript:void(0)" className="radius-40 font500 btnRed cmnBtn btnCmnSmall" variant="secondary"  onClick={() => { this.redirect_to_spq_detail(this.uri_data)}}>
                Cancel
              </a> 
              </Modal.Footer> */}
            </Modal>
            {/* //////////////////////////////////////////////////////////////////////////// */}
            {/* //////////////////////////////////////////////////////////////////////////// */}
            {/* <Modal id="root-modal" backdrop={ 'static' } keyboard={ false } className="in ssnCancelPop" centered="true" animation="slide" show={this.state.not_access_modal} onHide={() => { this.setState({ "not_access_modal": false }); }} >
                <Modal.Header className="justify-content-center">
                  <Modal.Title  className="font600 font_18px colorBlack">Oop's!
                  </Modal.Title>
                </Modal.Header>  
              <Modal.Body> 
                <div class="form_container_cmn">
                  <div class="col-xs-12 form_row_pop autoLoginPopFrm">
                      <div className="full_width frmPart">
                      <h4 className="font_16px">This Page Only For Mobile Device</h4>
                      </div>
                  </div>
                  <div className="clearfix"></div>           
                </div>
              </Modal.Body>
            </Modal> */}

            {/* //////////////////////////////////////////////////////////////////////////// */}
          <Footer  history={this.props.history}/>  
        </div>
      );
    }
  }
export default TeleMed;