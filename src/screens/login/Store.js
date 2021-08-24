import React from 'react';
import Loader from 'react-loader-spinner'
import  { withRouter } from 'react-router-dom'
import frombg from './images/l_frmBg.png';
import logiInLeft from './images/Web LoginPage.png';
import $ from 'jquery';
import {reactLocalStorage} from 'reactjs-localstorage';
import { Scrollbars } from 'react-custom-scrollbars';
import MetaTags from 'react-meta-tags';
import AppConfig from '../config/config.js';
import Header from '../mainscreens/Header';
import Form from 'react-bootstrap/Form';
var thisobj1=this
var is_render=0;
const url = AppConfig.apiLoc;

var main_page_type="";

var slug="";
var routes="";
var is_render=0;

class Store extends React.Component {
  constructor(props) {


      super(props);
      this.handleChange = this.handleChange.bind(this);

      this.state = {
        change_flag: false,
        is_loader:false,
        email: '',
      }
      main_page_type=this.props.match.params.type;

      if(this.props.match.params.slug!=undefined && this.props.match.params.slug!=null && this.props.match.params.slug.trim()!="")
      {
       slug =this.props.match.params.slug
 
      }
      routes=main_page_type+"/"+slug;



      fetch(url+'user/detail', {
        method: 'GET',
        headers: {
          
          
          'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
  
          'version': 'rjsw 1.1.1'
          
        }
      }).then((response) => response.json()).then((responseJson) => {
        if(responseJson.status_code=="200")
        {

        
          if(reactLocalStorage.get('@ClirnetStore:email', 0)!=0 && reactLocalStorage.get('@ClirnetStore:email', 0)!="" && reactLocalStorage.get('@ClirnetStore:email', 0)!=undefined && reactLocalStorage.get('@ClirnetStore:email', 0)!=null && reactLocalStorage.get('@ClirnetStore:email', 0)!='undefined' )
     {
       let emailId = reactLocalStorage.get('@ClirnetStore:email', 0);
       let redirect = "https://doctor.clirnet.com/store/wp.php";
       let values= new Array(emailId,routes) 
       let keys= new Array("email","route");
       
       this.openWindowWithPost(redirect,'',keys,values);
      //  this.props.history.push({
      //    pathname: `/Dashboard`
      //  }) 
     }

     else
     {
      is_render=1;

      this.setState({"change_flag":!this.state.change_flag})
      

     

     }



          
        
  
        
      }
    else{
      reactLocalStorage.set('@ClirnetStore:deals_url', routes);
      this.props.history.push({
        pathname: `/`
      }) 
    }
    
    }).catch((error) => {

      reactLocalStorage.set('@ClirnetStore:deals_url', routes);
      this.props.history.push({
        pathname: `/`
      }) 


        
      });

     

  
  }

  componentDidMount() {

    window.document.title = "CLIRNET - Deals"
  }

  openWindowWithPost = (url,name,keys,values) =>
  {





    var postFormStr = "<form method='POST' action='" + url + "'>\n";

    if (keys && values && (keys.length == values.length))
    {
    for (var i=0; i < keys.length; i++)
    {
            postFormStr += "<input type='hidden' name='" + keys[i] + "' value='" + values[i] + "'></input>";
        }
    }

    postFormStr += "</form>";

    var formElement = $(postFormStr);

    $('body').append(formElement);
    $(formElement).submit();


  }

  verify_email() {


    let has_error = 0;
   

   
  

    if(this.state.email!="")
    {
      var reEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
      if (!this.state.email.match(reEmail)) {

        has_error = 1;
        this.setState({ "err_msg": "Please enter valid Email." })
        this.setState({ "is_loader": false });
      }

    }

    else
    {
      has_error = 1;
      this.setState({ "err_msg": "Please enter Email ID." })
      this.setState({ "is_loader": false });
    }





    if (has_error == 0) {

      
  
      let formdata = new FormData();
      formdata.append("type", "email")
      formdata.append("value",this.state.email )
      var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;
  
  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }

     fetch(url+'settings/changemail', {
        method: 'POST',
        headers: {
        
        
          'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
  
          'version': 'rjsw 1.1.1',
          'OS':os
          
        },
        body: formdata,
      })
        .then((response) => response.json())
        .then((responseJson) => {

          // if (responseJson.status_code == "203") {
          //   this.setState({ "err_msg": responseJson.message })
          // }
          if (responseJson.status_code == "200") {



reactLocalStorage.set('@ClirnetStore:email', this.state.email);
let emailId = this.state.email;
let redirect = "https://doctor.clirnet.com/store/wp.php";
let values= new Array(emailId,routes) 
let keys= new Array("email","route");
// console.log("email Id"+emailId)
this.openWindowWithPost(redirect,'',keys,values);
// this.props.history.push({
//   pathname: `/Dashboard`
// }) 




          }
          else
          {
            this.setState({ "err_msg": responseJson.message })
          }
          this.setState({ "is_loader": false });
        })
        .catch((error) => {
          this.setState({ "is_loader": false });
          this.setState({ "err_msg": "Something went Wrong" });
        });
    }

  }

  componentWillMount()
  {

  


    
  }

  handleChange = e => (val) => {

    switch (e) { 
      case 'email':
        this.setState({ "email": val.target.value });
        break;
    

      default:
        {



        }


    }






  }








  render() {

    
  
  return (
     <div>
        {(is_render == 1)?
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
                                                <input type="email" value={this.state.email} type="text" onChange={this.handleChange("email")} className="l_reg_input_efect" placeholder="Email address" required/>
                                            </div>
                                            <span className="err_hold" style={{"color":"red"}}>{this.state.err_msg}</span>
                                            <div className="full_width l_form_row">
                                                <button  onClick={()=>{ this.setState({"is_loader":true}); this.verify_email()}} className="radius-6 font_16px font600 l_frmSubmit">Verify</button>
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
        </div> : null}
    </div> 
  );
  }
}

export default withRouter(Store);
