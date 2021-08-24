import React from 'react';
import Loader from 'react-loader-spinner'
import  { withRouter } from 'react-router-dom'
import frombg from '../../images/l_frmBg.png';
import logiInLeft from '../../images/Web LoginPage.png';
import $ from 'jquery';
import {reactLocalStorage} from 'reactjs-localstorage';
import { Scrollbars } from 'react-custom-scrollbars';
import AppConfig from '../config/config.js';
import Header from './Header';
import Footer from './Footer';
import Form from 'react-bootstrap/Form';
import {isMobile} from 'react-device-detect';
const gtag = window.gtag;

var thisobj1=this
var is_render = -1;
const url = AppConfig.apiLoc;

class Deals extends React.Component {
  constructor(props) {
      super(props);  
      this.state = {
        email: reactLocalStorage.get('@ClirnetStore:email', true),
        err_msg: "",
        is_loader:false,
        is_refresh:false,
        URL: "https://doctor.clirnet.com/ecom/wp.php"
    };
    this.emailValidation(); 
    this.handleChange = this.handleChange.bind(this);
  }

  emailValidation = () =>
  {
      let email = this.state.email;
      console.log("email validation:" +  reactLocalStorage.get('@ClirnetStore:email', true)+"get"+email);
      if(email =='' || email == "undefined"){
          is_render = 0 
          console.log("in if validations" + is_render);
      }else{
          is_render = 1
          console.log("in else validations" + is_render);
      }
  }

  handleChange(e) {
    this.setState({"err_msg":""}) 
    this.setState({"email":e.target.value})
  }

  

  update_url = (emailId) =>
  { 
      let type = 'email'
      let data =  new FormData();
      data.append("type",type)
      data.append("value", emailId)
      fetch(url+'settings/changemail', { 
      method: 'POST', 
      body: data,
          headers: {
          'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
          'version': 'rjsw 1.1.1'
          }
          }).then((response) => response.json()).then((responseJson) => {    
          let status_code = responseJson.status_code; 
        //   console.log("status code"+status_code);
          if(status_code == 200){
            reactLocalStorage.set('@ClirnetStore:email', emailId);
            this.setState({"email":emailId});
            this.openDeals();
          }
          console.log("responseData"+JSON.stringify(responseJson)+"::"+responseJson.status_code );

          }).catch((error) => {
              console.log("Error"+error);
          });
  }


  otp_send = () =>
  { 
      let type = 'email'
      let emailId = this.state.email
      if( emailId == "" || emailId == undefined ){
          alert("Please enter a valid email address")
          return;
      }
      let data =  new FormData();
      data.append("type",type)
      data.append("value", emailId) 
      fetch(url+'settings/change', { 
      method: 'POST',
      body: data,
          headers: {
          'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
          'version': 'rjsw 1.1.1'
          }
          }).then((response) => response.json()).then((responseJson) => {    
          let status_code = responseJson.status_code; 
          console.log("status code"+status_code);
          if(status_code == 200){
           this.update_url(emailId); 
          }
          console.log("responseData"+JSON.stringify(responseJson)+"::"+responseJson.status_code );

          }).catch((error) => {
              console.log("Error"+error);
          });
  }

  redirect_to_dashboard = () =>{
      console.log("in redirect dashboard")
    this.props.history.push({
        pathname: `/Dashboard`
      }) 
  }
  openDeals = () => {
    let emailId = this.state.email;
    let redirect = this.state.URL;
    let values= new Array(emailId) 
    let keys= new Array("email");
    // console.log("email Id"+emailId)
    this.openWindowWithPost(redirect,'',keys,values);
    this.redirect_to_dashboard();
  }

   openWindowWithPost = (url,name,keys,values) =>
    {
    // console.log("In openWindowWithPost function"+url+"::"+name+"::"+keys+"::"+values);
    var newWindow = window.open(url, name);
    if (!newWindow) return false;
    var html = "";
    html += "<html><head></head><body><form id='formid' method='post' action='" + url +"'>";
    if (keys && values && (keys.length == values.length))
        for (var i=0; i < keys.length; i++)
            html += "<input type='hidden' name='" + keys[i] + "' value='" + values[i] + "'/>";
    html += "</form><script type='text/javascript'>document.getElementById(\"formid\").submit()</sc"+"ript></body></html>";
    newWindow.document.write(html);
    return newWindow;
    }


  render(){
    //   console.log("is_render"+is_render);
    //   if (is_render == 1){
    //       this.openDeals();
    //   }
  return ( 
    <div>
        {(is_render == 0)?
        <div>
            <section className="full_width l_main_body"> 
                <Header history={this.props.history} />
                <div className="l_mainBox">
                    <div className="l_leftBox l_session_left">
                    <img src={logiInLeft} className="loginGrap translate_both"/>
                </div>
                    <div className="l_frmPart">
                        <div className="overlay"></div>
                        <img src={frombg} className="l_frmPart_Bg"/>
                        <div className="full_width l_rightIn">   
                            <Scrollbars renderTrackVertical={props => <div {...props} className="track-vertical"/>}
                                style={{ width: '100%', height: '100vh',}}>
                                <div className="row align-items-center">
                                    <div className="col">
                                        <div className="full_width text-left l_frmTtl">
                                            <h2 className="colorWhite font700 font_20px">Please add your email address</h2>
                                        </div>
                                        <div className="full_width l_frmBody">
                                            <div className="full_width l_form_row l_regFrmRowEffct l_regFormRowWtoHvr">                      
                                                <input type="email" onChange={this.handleChange} className="l_reg_input_efect" placeholder="Email address" required/>
                                            </div>
                                            <span className="err_hold" style={{"color":"red"}}>{this.state.err_msg}</span>
                                            <div className="full_width l_form_row">
                                                <button  onClick={()=>{ this.setState({"is_loader":true}); this.otp_send()}} className="radius-6 font_16px font600 l_frmSubmit">Verify</button>
                                            </div>
                                            <div className="full_width l_form_row">
                                                <h2 className="font500 font_18px colorWhite fontItalic">Enjoy Deals now!</h2>
                                            </div>
                                            <Loader type="ThreeDots" color="#3393df" height={80} width={80} visible={this.state.is_loader} />
                                        </div>
                                    </div>
                                </div>
                            </Scrollbars>
                        </div> 
                    </div>
                </div>
            </section>
        </div> : this.openDeals()}
    </div> 
  );
  }
}
export default Deals;
