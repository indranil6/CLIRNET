import React from 'react';
import Loader from 'react-loader-spinner'
import frombg from './images/l_frmBg.png';
import logiInLeft from './images/Web LoginPage.png';
import Timer from 'react-compound-timer'
import $ from 'jquery';
import medwikiicon from './images/medwiki.jpg';
import calbg from './images/l_cal-black.png';
import { reactLocalStorage } from 'reactjs-localstorage';
import AppConfig from '../config/config.js';
import { Scrollbars } from 'react-custom-scrollbars';
const gtag = window.gtag;
const url = AppConfig.apiLoc;

var prev_compendium = [];
var per_cpmp=0;
var location;
var prev_session = [];
var prev_survey = [];
var phone_no = "";
var isd_code=""
class Verify extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      phone_no: '',
      err_msg: "",
      otp: "",
      is_loader: false,
      is_display_call_button:false,
      compendium_view: [],
      prev_session: [],
      prev_survey: [],
      display:0

    };
    //Login Check
   fetch(url+'user/detail', {
      method: 'GET',
      headers: {


        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'

      }
    }).then((response) => response.json()).then((responseJson) => {
      if (responseJson.status_code == "200") {



        this.props.history.push({
          pathname: `/Dashboard`
        })
      }
      else {
        phone_no = props.location.state.phone_no;

        isd_code=props.location.state.isd_code;

      }
    }).catch((error) => {
      this.props.history.push({
        pathname: `/`
      })
    });

    console.log(reactLocalStorage.get('@ClirnetStore:redid', true))
    console.log(reactLocalStorage.get('@ClirnetStore:redtype', true))

  }




  getUtmSource(){
    
    let utmSource = reactLocalStorage.get('@ClirnetStore:utm_source', true);
    if(utmSource == undefined || utmSource == 'undefined' || utmSource == true || utmSource == 'true' || utmSource == ''){

      if(reactLocalStorage.get('@ClirnetStore:redtype', true) != "session" && reactLocalStorage.get('@ClirnetStore:redtype', true) != "medwiki" && reactLocalStorage.get('@ClirnetStore:redtype', true) != "survey" && reactLocalStorage.get('@ClirnetStore:redtype', true) != true && reactLocalStorage.get('@ClirnetStore:redtype', true) != "")
      {
return reactLocalStorage.get('@ClirnetStore:redtype', true);
      }

      else
      {

      

      console.log("utm source not found")
      return 0;
      }
    }else{
      console.log("utm source:"+utmSource);
      return utmSource;
    }
  }


  componentDidMount() {
    window.document.title = "CLIRNET - Verify OTP"
    gtag('config', AppConfig.gtag_measure_id, {
      'page_title': window.document.title,
      'page_location': window.location.href,
      'page_path': window.location.pathname
      });
    var thisobj = this
    //Handle Enter Press
    $(document).keypress(function (event) {
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if (keycode == '13') {
        thisobj.setState({ "is_loader": true });
        thisobj.otp_verify()
      }
    });
    // document.title = "CLIRNet";
    $('.l_reg_input_efect').val('');


    $('.l_reg_input_efect').on('blur', function () {
      if (this.value == '') {
        $(this).parent().removeClass('l_regFormRowHvr').addClass('l_regFormRowWtoHvr');
      }
    }).on('focus', function () {
      $(this).parent().removeClass('l_regFormRowWtoHvr').addClass('l_regFormRowHvr');
    });

    var abc = document.getElementsByClassName('l_reg_input_efect');
    for (var i = 0; i <= abc.length; i++) {
      if ($(".l_regRowCount-" + i).val() !== '') {
        $(".l_regRowCount-" + i).parent().removeClass('l_regFormRowWtoHvr').addClass('l_regFormRowHvr');
      }
    }







    if (reactLocalStorage.get('@ClirnetStore:redtype', true) != "" && reactLocalStorage.get('@ClirnetStore:redid', 0) != "") {

  

      if(reactLocalStorage.get('@ClirnetStore:redtype', true) =='Feeddetail')
      {
        prev_compendium = [];
        prev_session=[];
        fetch(url+'openapi/service?type=comp&type_id=' + reactLocalStorage.get('@ClirnetStore:redid', 0) + '', {
           method: 'GET',
           headers: {

             'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
             'version': 'rjsw 1.1.1'

           }
         }).then((response) => response.json()).then((responseJson) => {
           prev_compendium[0] = responseJson.data;




           this.setState({ "compendium_view": prev_compendium, "share_type": "comp" });

           var len_comp=prev_compendium[0].answer.length;

            per_cpmp=Math.round(len_comp/5);

           console.log(per_cpmp)

           this.setState({"display":1});
         })
      }


      




      if(reactLocalStorage.get('@ClirnetStore:redtype', true) =='Reservesession')
      {
        prev_compendium = [];
        prev_session=[];
        fetch(url+'openapi/service?type=session&type_id=' + reactLocalStorage.get('@ClirnetStore:redid', 0) + '', {
          method: 'GET',
          headers: {

            'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
            'version': 'rjsw 1.1.1'

          }
        }).then((response) => response.json()).then((responseJson) => {

          prev_session[0] = responseJson.data;




          this.setState({ "prev_session": prev_session, "share_type": "session" })
          this.setState({"display":1});


        })
      }
      console.log(reactLocalStorage.get('@ClirnetStore:redirect_url', true))

      if (reactLocalStorage.get('@ClirnetStore:redtype', true) ==='SpqDetails' || reactLocalStorage.get('@ClirnetStore:redtype', true) ==='PollDetails') {


  
        fetch(url+'openapi/service?type=survey&type_id=' + reactLocalStorage.get('@ClirnetStore:redid', 0) + '', {
          method: 'GET',
          headers: {

            'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
            'version': 'rjsw 1.1.1'

          }
        }).then((response) => response.json()).then((responseJson) => {

          prev_survey[0] = responseJson.data;




          this.setState({ "prev_survey": prev_survey, "share_type": "survey" })
          this.setState({"display":1});

        })
      }




     
    }

  }

  
 
  //OTP VErification Function On success Redirect to Dashboard Or Registration
  otp_verify() {


    let has_error = 0;
    if (phone_no === "") {

      has_error = 1;
      this.setState({ "is_loader": false });
      this.setState({ "err_msg": "Phone No not  Present" })
    }



    if (has_error == 0) {
      let utm = this.getUtmSource();
      // let referal_code = getReferalCode();
      let formdata = new FormData();
      formdata.append("isdCode", isd_code)
      formdata.append("phone_no", phone_no)
      formdata.append("otp", this.state.otp)
      formdata.append("utm_source", utm)
      // formdata.append("referal_code", referal_code)  


     fetch(url+'Authrjs/loginotpverify', {
        method: 'POST',
        headers: {

          'version': 'rjsw 1.1.1'

        },
        body: formdata,
      })
        .then((response) => response.json())
        .then((responseJson) => {

          if (responseJson.status_code == "203") {
            this.setState({ "is_loader": false });
            this.setState({ "err_msg": responseJson.message })
          }
          if (responseJson.status_code == "200") {
            this.setState({ "is_loader": false });
            if (responseJson.data.status === 3) {


              //Old User to dashboard and setting values

              reactLocalStorage.set('@ClirnetStore:refreshToken', responseJson.data.refresh_token);
              reactLocalStorage.set('@ClirnetStore:phoneNumber', phone_no);
             fetch(url+'user/detail', {
                method: 'GET',
                headers: {


                  'Authorization': responseJson.data.refresh_token,
                  'version': 'rjsw 1.1.1'

                }
              }).then((response) => response.json()).then((responseJson) => {
                if (responseJson.status_code == "200") {

                  reactLocalStorage.set('@ClirnetStore:user_master_id', responseJson.data.user_master_id);
                  reactLocalStorage.set('@ClirnetStore:user_mem_id', responseJson.data.user_mem_id);
                  reactLocalStorage.set('@ClirnetStore:client_logo', responseJson.data.client_logo);
                  reactLocalStorage.set('@ClirnetStore:user_name', responseJson.data.user_name);
                  reactLocalStorage.set('@ClirnetStore:email', responseJson.data.email);
                  reactLocalStorage.set('@ClirnetStore:mobilePrimary', responseJson.data.mobilePrimary);
                  reactLocalStorage.set('@ClirnetStore:password', responseJson.data.password);
                  reactLocalStorage.set('@ClirnetStore:first_name', responseJson.data.first_name);
                  reactLocalStorage.set('@ClirnetStore:last_name', responseJson.data.last_name);
                  reactLocalStorage.set('@ClirnetStore:profile_image', responseJson.data.profile_image);
                  reactLocalStorage.set('@ClirnetStore:profile_type', responseJson.data.profile_type);
                  

                  var vault = [];
                 fetch(url+'knwlg/myvault', {
                    method: 'GET',
                    headers: {

                      'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
                      'version': 'rjsw 1.1.1'

                    }
                  }).then((response) => response.json()).then((responseJson) => {

                    responseJson.data.map(r => {

                      this.setState({ "is_loader": false });

                      vault.push(r);
                    })


                    reactLocalStorage.set('@ClirnetStore:vault_count', vault.length);


                  }).catch((error) => {
                    this.setState({ "is_loader": false });

                  });

                 
                  if (reactLocalStorage.get('@ClirnetStore:redtype', true) != "" && reactLocalStorage.get('@ClirnetStore:redid', 0) != "" && reactLocalStorage.get('@ClirnetStore:redtype', true) != true && reactLocalStorage.get('@ClirnetStore:redid', 0) != 0) {

                    if(reactLocalStorage.get('@ClirnetStore:redtype', true) != "Feeddetail" && reactLocalStorage.get('@ClirnetStore:redtype', true) != "PollDetails" && reactLocalStorage.get('@ClirnetStore:redtype', true) != "SpqDetails" && reactLocalStorage.get('@ClirnetStore:redtype', true) != "Reservesession" && reactLocalStorage.get('@ClirnetStore:redtype', true) != "GrandRoundsMobile" && reactLocalStorage.get('@ClirnetStore:redtype', true) != "GrandRoundsDesktop"   && reactLocalStorage.get('@ClirnetStore:redtype', true) != "ArchivedVideo")
                    {
                      //alert(reactLocalStorage.get('@ClirnetStore:redtype', true))
                    this.props.history.push({
                      pathname: '/Dashboard'
                    })
                  }

                  else
                  {
                    this.props.history.push({
                      pathname: '/'+reactLocalStorage.get('@ClirnetStore:redtype', true)+'/'+reactLocalStorage.get('@ClirnetStore:redid', 0)+''
                    })
                  }
                  }
                  else {

                   // alert(reactLocalStorage.get('@ClirnetStore:email', true))

                   
                     
                        if(reactLocalStorage.get('@ClirnetStore:redirect_direct_to_session', 0)==1)
                        {
                          reactLocalStorage.set('@ClirnetStore:redirect_direct_to_session', 0);

                          this.props.history.push({
                            pathname: `/Sessions`
                          })
                        }
                        else
                        {
                          if(reactLocalStorage.get('@ClirnetStore:redtype', true)=="CphMobile")
                          {
                            this.props.history.push({
                              pathname: `/CphMobile`
                            })
                          }
                          else
                          {
                        this.props.history.push({
                          pathname: `/Dashboard`
                        })
                      }
                      }
                      

                    


                   


                    
                  }






                }
              }).catch((error) => {
                this.props.history.push({
                  pathname: `/`
                })
              });

            }

            else {

              //New User redirect to registration
              this.props.history.push({
                pathname: `/registrationpartone`,

                state: {
                  phone_no: phone_no
                }
              })
            }


          }

        })
        .catch((error) => {
          this.setState({ "is_loader": false });
          this.props.history.push({
            pathname: `/`
          })
        });
    }

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

  
  //Resend OTP

  resend_otp() {
    let formdata = new FormData();
    formdata.append("isdCode", isd_code)
    formdata.append("phone_no", phone_no)
    this.setState({ "is_loader": true });
    this.setState({"otp":""});

   fetch(url+'Authrjs/login', {
      method: 'POST',
      headers: {


        'version': 'rjsw 1.1.1'

      },
      body: formdata,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status_code == "203") {
          this.setState({ "err_msg": responseJson.message })
        }
        if (responseJson.status_code == "200") {
          this.setState({ "err_msg": 'Otp Sent Again' });
        }
        this.setState({ "is_loader": false });
      })
      .catch((error) => {
        //alert(error)
        this.setState({ "is_loader": false });
        this.setState({ "err_msg": "Something went Wrong" });
      });


  }





  resend_otp_via_call() {
    // let referal_code = getReferalCode();
    let formdata = new FormData();
    formdata.append("isdCode", isd_code)
    formdata.append("phone_no", phone_no)
    // formdata.append("referal_code", referal_code) 
    this.setState({ "is_loader": true });
    this.setState({"otp":""});

   fetch(url+'Authrjs/resendotp', {
      method: 'POST',
      headers: {


        'version': 'rjsw 1.1.1'

      },
      body: formdata,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status_code == "203") {
          this.setState({ "err_msg": responseJson.message })
        }
        if (responseJson.status_code == "200") {
          this.setState({ "err_msg": 'Calling.....' });
        }
        this.setState({ "is_loader": false });
      })
      .catch((error) => {
        //alert(error)
        this.setState({ "is_loader": false });
        this.setState({ "err_msg": "Something went Wrong" });
      });


  }


  //Setting OTP values

  handleChange(e) {

    this.setState({ "otp": e.target.value })
  }




  render() {

    return (
      <div>

        <section className="full_width l_main_body">
          <div className="l_mainBox" >
            
            { (reactLocalStorage.get('@ClirnetStore:redtype', true) != "" && reactLocalStorage.get('@ClirnetStore:redid', 0) != ""  && reactLocalStorage.get('@ClirnetStore:redtype', true) != true && reactLocalStorage.get('@ClirnetStore:redid', 0) != 0 &&(reactLocalStorage.get('@ClirnetStore:redtype', true) == "survey" || reactLocalStorage.get('@ClirnetStore:redtype', true) == "medwiki" || reactLocalStorage.get('@ClirnetStore:redtype', true) == "session")) ?
           <div className="l_leftBox">

             
 {this.state.compendium_view.map((r, index) => (

<div className="full_width l_medWiki_left">

  <div className="full_width l_medwiki_pic">
    {(r.image != "" && r.image != undefined) ?
      <img src={r.image} className="object_fit_cover" /> :
      <img src={medwikiicon} className="object_fit_cover" />}
    <div className="overlay"></div>
  </div>
  <div className="full_width text-left l_medwiki_Body">
    <Scrollbars renderTrackVertical={props => <div {...props} className="track-vertical" />}
      style={{ width: '100%', height: '100%', }}>
      <h4 className="font_16px font700 colorBlack l_medWiki_spec"><span class="font_20px colorBlue">[</span> {r.specialities} <span className="font_20px colorBlue">]</span></h4>
      <div className="clearfix"></div>
      <h2 className="font600 colorBlack font_20px l_medwikiTtl">{r.question}</h2>
      <div className="clearfix"></div>
      <div className="font500 full_width l_medwiki_content">


        <p>{r.answer.substring(0, per_cpmp)}...<span style={{ "color": "#38b49b" }}><a href="javascript:void(0)" onClick={() => { this.nameInput.focus(); }}>Login To Read More</a></span></p>
      </div>
    </Scrollbars>
  </div>

</div>
))}

{this.state.prev_session.map((rses, index) => (

<div className="full_width l_session_left">


  <div className="full_width l_session_top">
    <span className="font600 colorBlack radius-40 l_session_type">{rses[0].ms_cat_name}</span>
    <h3 className="colorBlack font_14px font600 l_session_time"><img src={calbg} /> <span>{rses[0].display_date_format} - {rses[0].display_date}</span></h3>
  </div>
  <div className="full_width text-center l_session_body">
    <Scrollbars renderTrackVertical={props => <div {...props} className="track-vertical" />}
      style={{ width: '100%', height: '100%', }}>
      <h1 className="font_18px colorBlack font600 l_session_topic">{rses[0].session_topic}</h1>
      {rses[0].session_doctor_entities.map(docres =>
        <div>
          <div className="clearfix"></div>
          <div className="radius-100 l_doctor_pic">
            <img src={docres.session_doctor_image} className="object_fit_cover" />
          </div>
          <div className="clearfix"></div>
          <h4 className="font_16px font600 colorBlack l_doc_name">{docres.session_doctor_name}
            <span className="colorGrey font_14px font500">{docres.DepartmentName}</span>
          </h4>
          <div className="clearfix"></div>
          <div className="full_width font500 font_14px">
            <p>{docres.profile}</p></div>
        </div>
      )}
      <div className="full_width l_poweredBy">
        <h3 className="font_16px colorBlack font600 l_poweredByTtl"><span className="l_poweredByGraph l_poweredByGraphLeft"></span> Powered by
   <span className="l_poweredByGraph l_poweredByGraphRight"></span> </h3>
        <img src={rses[0].client_logo} className="l_poweredByLogo" />
      </div>
    </Scrollbars>
  </div>
</div>

))}


{this.state.prev_survey.map((rsuv, index) => (

<div className="full_width l_medWiki_left">

  <div className="full_width l_medwiki_pic">
    {(rsuv.image != "" && rsuv.image != undefined) ?
      <img src={rsuv.image} className="object_fit_cover" /> :
      <img src={medwikiicon} className="object_fit_cover" />}
    <div className="overlay"></div>
  </div>
  <div className="full_width text-left l_medwiki_Body">
    <Scrollbars renderTrackVertical={props => <div {...props} className="track-vertical" />}
      style={{ width: '100%', height: '100%', }}>
      <h4 className="font_16px font700 colorBlack l_medWiki_spec"><span class="font_20px colorBlue">[</span> {rsuv.specialities_name} <span className="font_20px colorBlue">]</span></h4>
      <div className="clearfix"></div>
      <h2 className="font600 colorBlack font_20px l_medwikiTtl">{rsuv.survey_title}</h2>
      <div className="clearfix"></div>
      <div className="font500 full_width l_medwiki_content">


        <p>{rsuv.survey_description}<span style={{ "color": "#38b49b" }}><a href="javascript:void(0)" onClick={() => { this.nameInput.focus(); }}>Login To Read More</a></span></p>
      </div>
    </Scrollbars>
  </div>

</div>
))}

           </div>:
           <div className="l_leftBox">
              <img src={logiInLeft} className="loginGrap translate_both" />
              </div>
              }

            <div className="l_frmPart">
              <div className="overlay"></div>
              <img src={frombg} className="l_frmPart_Bg" />
              <div className="full_width l_rightIn">


                <Scrollbars renderTrackVertical={props => <div {...props} className="track-vertical" />}
                  style={{ width: '100%', height: '100vh', }}>
                  <div className="row align-items-center">
                    <div className="col">
                      <div className="full_width l_frmTtl">
                        <h2 className="colorWhite text-left font700 font_20px">Verify OTP Sent On Your Mobile Number </h2>
                      </div>
                      <div className="full_width l_frmBody">

                        <div className="full_width l_form_row l_regFrmRowEffct l_regFormRowWtoHvr">
                          <label>Verify</label>
                          <input style={{color:'white'}} type="text" value={this.state.otp} maxLength="4" onChange={this.handleChange} className="l_reg_input_efect" pattern="[123456789][0-9]{9}" required />
                          {(this.state.is_display_call_button!=true)?<span className="colorWhite otpTimer">
                          <Timer className="colorWhite font600 font_16px"
    initialTime={15000}
    direction="backward"
    checkpoints={[
      {
          time: 0,
          callback: () => this.setState({"is_display_call_button":true}),
      }
  ]}
    
>
    {() => (
        <React.Fragment>
         0<Timer.Minutes />:
            <Timer.Seconds />
           
        </React.Fragment>
    )}
</Timer>
</span>:null}

                        </div>
                        
                        <span className="err_hold" style={{ "color": "red" }}>{this.state.err_msg}</span>

                        <div className="full_width l_form_row l_form_row_dblBtn">
                          <button onClick={() => { this.setState({ "is_loader": true }); this.otp_verify() }} className="radius-6 font_16px font600 l_frmSubmit">Verify OTP</button>
                          <button onClick={() => { this.setState({ "is_loader": true }); this.resend_otp() }} className="radius-6 font_16px font600 l_frmSubmit">Resend OTP</button>

                        </div>
                        {(this.state.is_display_call_button==true)?
                        <div className="callForOtp">
                          <h3 className="colorWhite font700 font_18px">Did not receive OTP over message?</h3>
                          <a href="javascript:void(0)" onClick={() => { this.setState({ "is_loader": true }); this.resend_otp_via_call() }} className="font600 font_16px colorWhite radius-6 l_frmSubmit callForOtpLink">Get Call Instead</a>
                        </div>:null}
                        <Loader type="ThreeDots" color="#3393df" height={80} width={80} visible={this.state.is_loader} />
                      </div>
                    </div>
                  </div>
                </Scrollbars>
              </div>


            </div>
          </div>

        </section>

      </div>
    );
  }
}

export default Verify;
