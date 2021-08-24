import React from 'react';
import frombg from './images/l_frmBg.png';
import Registlogo from './images/Registration.jpg';
import Loader from 'react-loader-spinner'
import $ from 'jquery';
import Form from 'react-bootstrap/Form';
import medwikiicon from './images/medwiki.jpg';
import calbg from './images/l_cal-black.png';
import { reactLocalStorage } from 'reactjs-localstorage';
import AppConfig from '../config/config.js';
import { Scrollbars } from 'react-custom-scrollbars';
import { Helmet } from "react-helmet";
import plusIcon from '../../images/add_plus.png';
import editIcon from '../../images/edit_btn_blue.png';
import { getReferalCode } from "../Common/Common.js";
const gtag = window.gtag;


const url = AppConfig.apiLoc;
var phone_no=""
var specialities = [];
var spec_array=[];
var prev_compendium = [];
var prev_survey = [];
var per_cpmp=0;
var location;
var prev_session = [];

var nameall="";

class Registrationpartone extends React.Component {

  constructor(props) {
    super(props);
    //Prevent Direct URL hit

    if (props.location.state != undefined) {
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        phone_no: '',
        err_msg: "",
        first_name: "",
        last_name: "",
        middle_name: "",
        gender: "",
        age: "",
        pincode: "",
        referal: "",
        usertype: 1,
        full_name:"",
        honarific:"Dr.",
        phone_no: props.location.state.phone_no,
        terms: 1,
        is_loader: false,
        speciality: [],
        flag_ch:true,

        email: '',
        compendium_view: [],
        prev_session: [],
        prev_survey:[],
        display:0

      };
      phone_no = props.location.state.phone_no;

    }
    else {

      this.props.history.push({
        pathname: `/`
      })

    }
    //this.isHaveReferalCode();
  }

  isHaveReferalCode(){
    console.log("is referal"+getReferalCode())
    $("#referal_code_input").val('');
    if(getReferalCode() != 0 || getReferalCode() != '0'){
      this.setState({'referal' : getReferalCode()}) 
      $("#referal_code_input").prop( "disabled", true ); 
      $(".regRowCount").removeClass('l_regFormRowWtoHvr').addClass('l_regFormRowHvr'); 
    }else{
      $("#referal_code_input").prop( "disabled", false );
      $(".regRowCount").removeClass('l_regFormRowHvr').addClass('l_regFormRowWtoHvr'); 
    }
  }

  getUtmSource(){
    
    let utmSource = reactLocalStorage.get('@ClirnetStore:utm_source', true);
    if(utmSource == undefined || utmSource == 'undefined' || utmSource == true || utmSource == 'true' || utmSource == ''){

      if(reactLocalStorage.get('@ClirnetStore:redtype', true) != "session" && reactLocalStorage.get('@ClirnetStore:redtype', true) != "medwiki" && reactLocalStorage.get('@ClirnetStore:redtype', true) != "survey" && reactLocalStorage.get('@ClirnetStore:redtype', true) != "gr"  && reactLocalStorage.get('@ClirnetStore:redtype', true) != "archived_video" && reactLocalStorage.get('@ClirnetStore:redtype', true) != true && reactLocalStorage.get('@ClirnetStore:redtype', true) != "")
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

  getAllSpecialities() {

    fetch(url+'authnew/getallspeciality', {
       method: 'GET',
       headers: {
 
         'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
         'version': 'rjsw 1.1.1'
 
       }
     }).then((response) => response.json()).then((responseJson) => {
 
       if (responseJson.status_code == "200") {
 
         responseJson.data.speciality_data.map(r => {
 
           specialities.push(r);
         })
         this.setState({ "is_refresh": !this.state.is_refresh })
       }
 
 
     }).catch((error) => {
 
     });
 
 
 
 
 
   }

  componentDidMount() {
    window.document.title = "CLIRNET - Registration - Page 1"

    this.isHaveReferalCode()
    window.addEventListener("beforeunload", (ev) => 
    {  

      this.props.history.push({
        pathname: `/`
      })


      ev.preventDefault();
      return ev.returnValue = 'Are you sure you want to close?';
    });




    var thisobj = this
    $(document).keypress(function (event) {
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if (keycode == '13') {
        thisobj.setState({ "is_loader": true });
        thisobj.registration()
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

    this.getAllSpecialities();
    
    $('.tRright_popClose').on('click',function(){
      $('body').removeClass('right_PopShowBody');
    });
    $('.l_Specialities_a').on('click',function(){
      $('body').addClass('right_PopShowBody');
    });



    let formdata11 = new FormData();
   
    formdata11.append("phone_no", this.state.phone_no)


    fetch(url+'authdoc/detail', {
      method: 'POST',
      headers: {
        
        'version': 'rjsw 1.1.1'
         
         },
      body: formdata11,
    })
    .then((response) => response.json())
    .then((responseJson) => {
    if(responseJson.status_code=="203")
    {
     
    }
    if(responseJson.status_code=="200")
    {


      if(responseJson.data.first_name!=undefined && responseJson.data.first_name !=null && responseJson.data.first_name!="")
      {
      this.setState({ "first_name": responseJson.data.first_name });

      nameall=nameall+" "+responseJson.data.first_name;
      }

      if(responseJson.data.middle_name!=undefined && responseJson.data.middle_name !=null && responseJson.data.middle_name!="")
      {
      this.setState({ "middle_name": responseJson.data.middle_name });

      nameall=nameall+" "+responseJson.data.middle_name;

      }

      if(responseJson.data.last_name!=undefined && responseJson.data.last_name !=null && responseJson.data.last_name!="")
      {
      this.setState({ "last_name": responseJson.data.last_name });

      nameall=nameall+" "+responseJson.data.last_name;
      }

      if(nameall.trim()!="")
      {
        this.setState({ "full_name": nameall });
        $(".fullnamesss").parent().removeClass('l_regFormRowWtoHvr').addClass('l_regFormRowHvr');

      }

      if(responseJson.data.email_id!=undefined && responseJson.data.email_id !=null && responseJson.data.email_id!="")
      {
      this.setState({ "email": responseJson.data.email_id });
      $(".emailsss").parent().removeClass('l_regFormRowWtoHvr').addClass('l_regFormRowHvr');
      }

      if(responseJson.data.gender!=undefined && responseJson.data.gender !=null && responseJson.data.gender!="")
      {
      if(responseJson.data.gender=="male")
      {
        this.setState({ "gender": "M"});

      }

      if(responseJson.data.gender=="female")
      {
        this.setState({ "gender": "F"});

      }

      if(responseJson.data.gender=="transgender")
      {
        this.setState({ "gender": "T"});

      }
      }

      if(responseJson.data.age!=undefined && responseJson.data.age !=null && responseJson.data.age!="")
      {
      this.setState({ "age": responseJson.data.age });
      $(".agesss").parent().removeClass('l_regFormRowWtoHvr').addClass('l_regFormRowHvr');
      }


      if(responseJson.data.pincode!=undefined && responseJson.data.pincode !=null && responseJson.data.pincode!="")
      {
      this.setState({ "pincode": responseJson.data.pincode });
      $(".pincodesss").parent().removeClass('l_regFormRowWtoHvr').addClass('l_regFormRowHvr');
      }

      if(responseJson.data.speciality!=undefined && responseJson.data.speciality !=null && responseJson.data.speciality!="")
      {
         spec_array = responseJson.data.speciality.split(",");
      }
    
    }
    
    })
    .catch((error) => {
     
    });








    if (reactLocalStorage.get('@ClirnetStore:redtype', true) != "" && reactLocalStorage.get('@ClirnetStore:redid', true) != "" && reactLocalStorage.get('@ClirnetStore:redtype', true) != true && reactLocalStorage.get('@ClirnetStore:redid', 0) != 0) {

      if(reactLocalStorage.get('@ClirnetStore:redtype', true) =='Feeddetail')
      {
        prev_compendium = [];
        prev_session=[];
        prev_survey=[];
        fetch(url+'openapi/service?type=comp&type_id=' + reactLocalStorage.get('@ClirnetStore:redid', true) + '', {
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
        prev_survey=[];
        fetch(url+'openapi/service?type=session&type_id=' + reactLocalStorage.get('@ClirnetStore:redid', true) + '', {
          method: 'GET',
          headers: {

            'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
            'version': 'rjsw 1.1.1'

          }
        }).then((response) => response.json()).then((responseJson) => {

          prev_session[0] = responseJson.data;




          this.setState({ "prev_session": prev_session, "share_type": "session" })


        })
      }


      if (reactLocalStorage.get('@ClirnetStore:redtype', true) =='Surveydetails') {
  
        fetch(url+'openapi/service?type=survey&type_id=' + reactLocalStorage.get('@ClirnetStore:redid', true) + '', {
          method: 'GET',
          headers: {

            'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
            'version': 'rjsw 1.1.1'

          }
        }).then((response) => response.json()).then((responseJson) => {

          prev_survey[0] = responseJson.data;




          this.setState({ "prev_survey": prev_survey, "share_type": "survey" })


        })
      }




     
    }

  }
  randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }


  //Registration Function

  registration() {
    gtag('config', AppConfig.gtag_measure_id, {
      'page_title': 'NORMAL_REGISTRATION',
      'page_location': window.location.href,
      'page_path': window.location.pathname
      });

    let has_error = 0;
    if (this.state.terms == 0) {
      this.setState({ "is_loader": false });
      has_error = 1;
      this.setState({ "err_msg": "Please Accept Terms And Condition." })
    }

    // if (this.state.pincode == "") {
    //   this.setState({ "is_loader": false });
    //   has_error = 1;
    //   this.setState({ "err_msg": "Please Enter Pincode" })
    // }
    // if (this.state.age == "") {
    //   this.setState({ "is_loader": false });
    //   has_error = 1;
    //   this.setState({ "err_msg": "Please Enter Age" })
    // }
    if (this.state.full_name == '') {
      this.setState({ "is_loader": false });
      has_error = 1;
      this.setState({ "err_msg": "Please Enter  Your Name" })
    }

    else
    {
      var namep=[];
       namep=this.state.full_name.trim().split(" ");

      

      if(namep.length==1)
      {
        this.setState({ "is_loader": false });
        has_error = 1;
        this.setState({ "err_msg": "Please Enter the Last Name" })
      }
    }


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

      if(spec_array.length!=0)
      {
        var speciality_val=spec_array.join();
      }

      else
      {
        var speciality_val=""; 
      }
      let fullName = this.state.full_name;
      let data = {
        phone_no: this.state.phone_no, pin: this.state.pincode, name: fullName,
        gender: this.state.gender, age: this.state.age, referal_code: this.state.referal, user_type: this.state.usertype,speciality:speciality_val,honarific:this.state.honarific,email:this.state.email
      }


      
      //var rString = this.randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

      var rString = '';
      let utm = this.getUtmSource(); 
      let formdata = new FormData();
      formdata.append("phone_no", data.phone_no)
      formdata.append("device_id", rString)
      formdata.append("pin", data.pin)
      formdata.append("fcm_id", data.fcm_id)
      formdata.append("name", data.name)
      formdata.append("gender", data.gender)
      formdata.append("speciality", data.speciality)
      formdata.append("honarific", data.honarific)
      formdata.append("email", data.email)
      formdata.append("age", data.age)
      formdata.append("referal_code", data.referal_code)
      formdata.append("user_type", data.user_type)
      formdata.append("device_os", 'Windows')
      formdata.append("utm_source", utm) 
    

     fetch(url+'Authrjs/registrationflow1', {
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
            
            reactLocalStorage.set('@ClirnetStore:referal_code', 0);
            reactLocalStorage.set('@ClirnetStore:refreshToken', responseJson.data.refresh_token);
            reactLocalStorage.set('@ClirnetStore:phoneNumber', data.phone_no);

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

                if (reactLocalStorage.get('@ClirnetStore:redtype', true) != "" && reactLocalStorage.get('@ClirnetStore:redid', true) != "" && reactLocalStorage.get('@ClirnetStore:redtype', true) != true && reactLocalStorage.get('@ClirnetStore:redid', 0) != 0) {
                  if(reactLocalStorage.get('@ClirnetStore:redtype', true) != "Feeddetail" && reactLocalStorage.get('@ClirnetStore:redtype', true) != "PollDetails" && reactLocalStorage.get('@ClirnetStore:redtype', true) != "SpqDetails" && reactLocalStorage.get('@ClirnetStore:redtype', true) != "Reservesession"  && reactLocalStorage.get('@ClirnetStore:redtype', true) != "GrandRoundsMobile" && reactLocalStorage.get('@ClirnetStore:redtype', true) != "GrandRoundsDesktop"  && reactLocalStorage.get('@ClirnetStore:redtype', true) != "ArchivedVideo")
                  {
                  this.props.history.push({
                    pathname: '/Dashboard'
                  })
                }

                else
                {
                  this.props.history.push({
                    pathname: '/'+reactLocalStorage.get('@ClirnetStore:redtype', true)+'/'+reactLocalStorage.get('@ClirnetStore:redid', true)+''
                  })
                }
                }

                else
                {

                  if(reactLocalStorage.get('@ClirnetStore:deals_url', true) != "" && reactLocalStorage.get('@ClirnetStore:deals_url', true) != true && reactLocalStorage.get('@ClirnetStore:email', 0)!=0 && reactLocalStorage.get('@ClirnetStore:email', 0)!="" && reactLocalStorage.get('@ClirnetStore:email', 0)!=undefined && reactLocalStorage.get('@ClirnetStore:email', 0)!=null && reactLocalStorage.get('@ClirnetStore:email', 0)!='undefined')
                  {
                    let emailId = reactLocalStorage.get('@ClirnetStore:email', 0);
                    let redirect = "https://doctor.clirnet.com/store/wp.php";
                    let values= new Array(emailId,reactLocalStorage.get('@ClirnetStore:deals_url', true)) 
                    let keys= new Array("email","route");
                    // console.log("email Id"+emailId)
                    this.openWindowWithPost(redirect,'',keys,values);

                  }

                  else
                  {
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
              }

              else {
                reactLocalStorage.set('@ClirnetStore:refreshToken', '');

                this.props.history.push({
                  pathname: `/`
                })
              }

            }).catch((error) => {

            });






          }
          this.setState({ "is_loader": false });
        })
        .catch((error) => {
          this.setState({ "is_loader": false });
          this.setState({ "err_msg": "Something went Wrong" });
        });
    }

  }

  //Checking Whether User Accepted Terms And Conditions
  check_check() {
    if ($('#terms').prop('checked') == true) {
    //   this.setState({ "terms": 1 });
    // }

    // else {
    //   this.setState({ "terms": 0 });
    // }
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
  //Setting value for all registration parameters
  handleChange = e => (val) => {

    switch (e) { 
      case 'email':
        this.setState({ "email": val.target.value });
        break;
      case 'first_name':
        this.setState({ "first_name": val.target.value });
        break;
      case 'last_name':
        this.setState({ "last_name": val.target.value });
        break;
      case 'middle_name':
        this.setState({ "middle_name": val.target.value });
        break;
      case 'gender':
        this.setState({ "gender": val.target.value });
        break;
      case 'age':
        this.setState({ "age": val.target.value });
        break;
      case 'pincode':
        this.setState({ "pincode": val.target.value });
        break;
      case 'referal':
        this.setState({ "referal": val.target.value });
      case 'usertype':
        this.setState({ "usertype": val.target.value });
        break;

        case 'full_name':
          this.setState({ "full_name": val.target.value });
          break;

          case 'honarific':
            this.setState({ "honarific": val.target.value });
            break;

      default:
        {



        }


    }






  }


  selectspec(id) {


    if (spec_array.indexOf(id) != -1) {
    var index = spec_array.indexOf(id);
    spec_array.splice(index, 1);
   
    this.setState({"flag_ch":!this.state.flag_ch})
  
  
    }
   
    else {
      spec_array.push(id);
   
      this.setState({"flag_ch":!this.state.flag_ch})

  
    }


    console.log(spec_array)
   
   
   
   
   
   
    }




  render() {

    return (
      <div>
        <Helmet>
  
  <meta property="og:url" content="https://doctor.clirnet.com/services/" />
<meta property="og:type" content="article" />
<meta property="og:title" content="CLIRNet Sign up" />
<meta property="og:description" content="CLIRNet is India’s largest live digital CME & Doctor Generated Content (DGC) Platform. We curate and execute over hundreds of live CMEs every month over digital and analogue communication." />
<meta property="og:image" content="https://www.clirnet.com/wp-content/themes/clirnet/fav/android-icon-192x192.png" />
<meta property="og:image:secure_url" content="https://www.clirnet.com/wp-content/themes/clirnet/fav/android-icon-192x192.png" />
<meta name="twitter:image" content="https://www.clirnet.com/wp-content/themes/clirnet/fav/android-icon-192x192.png" />
<meta name="twitter:title" content="CLIRNet Sign up" />
<meta name="twitter:card" content="summary_large_image" />
</Helmet>

        <section className="full_width l_main_body">
          <div className="l_mainBox">
           
           { (reactLocalStorage.get('@ClirnetStore:redtype', true) != "" && reactLocalStorage.get('@ClirnetStore:redid', true) != "" && reactLocalStorage.get('@ClirnetStore:redtype', true) != true && reactLocalStorage.get('@ClirnetStore:redid', 0) != 0 &&(reactLocalStorage.get('@ClirnetStore:redtype', true) == "survey" || reactLocalStorage.get('@ClirnetStore:redtype', true) == "medwiki" ||reactLocalStorage.get('@ClirnetStore:redtype', true) == "session")) ?
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
              <img src={Registlogo} className="loginGrap translate_both" />
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
                        <h2 className="colorWhite font700 font_20px text-left">Create your CLIRNet Account</h2>
                      </div>
                      <div className="full_width font_10px colorWhite l_frmInfo">
                        <span className="font_16px radius-100 bgColorBlue colorWhite l_frmInfoIcon">i</span>
                        <p>This content is for use by Healthcare Professionals (HCP) only. HCP are advised to use independent clinical judgement and/or discretion before using the information.</p>
                      </div>
                      <div className="full_width l_frmBody">

                      <div className="full_width mobleNoCont">
                    <select onChange={this.handleChange("honarific")}  className="mobleNoSelect">
                    <option  value="Dr.">Dr.</option>
                    <option   value="Prof.">Prof.</option>
                    <option   value="Mr.">Mr.</option>
                    <option  value="Mrs.">Mrs.</option>
                    <option  value="Ms.">Ms.</option> 
                    
                    </select>

                    <div className="full_width l_form_row l_regFrmRowEffct l_regFormRowWtoHvr">

                      <label>Full Name<span style={{ "color": "red" }}>*</span></label>
                      
                      <input type="text" value={this.state.full_name}  onChange={this.handleChange("full_name")} className="l_reg_input_efect fullnamesss"  required/>
                    </div>
                    </div>

                        <div class="full_width l_form_row l_regFrmRowEffct l_regFormRowWtoHvr">
                          <label>Email ID<span style={{ "color": "red" }}>*</span></label>
                          <input value={this.state.email} type="text" onChange={this.handleChange("email")} class="l_reg_input_efect emailsss" />
                        </div>
                      
                        {/* <div className="l_form_Gender l_form_row">
                          <label className="colorWhite font500 font_14px">Gender : </label>

                          <div className="l_gender_cont">
                            <div className="checkbox_custom_row">
                              {(this.state.gender == "M") ?
                                <input name="gender" value="M" checked onChange={this.handleChange('gender')} type="radio" className="checkbox_custom" /> :
                                <input name="gender" value="M" onChange={this.handleChange('gender')} type="radio" className="checkbox_custom" />}
                              <label className="checkbox_custom_label">M</label>
                            </div>
                            <div className="checkbox_custom_row">
                              {(this.state.gender == "F") ?
                                <input name="gender" value="F" checked onChange={this.handleChange('gender')} type="radio" className="checkbox_custom" /> :
                                <input name="gender" value="F" onChange={this.handleChange('gender')} type="radio" className="checkbox_custom" />}
                              <label className="checkbox_custom_label">F</label>
                            </div>
                            <div className="checkbox_custom_row">
                              {(this.state.gender == "T") ?
                                <input name="gender" value="T" checked onChange={this.handleChange('gender')} type="radio" className="checkbox_custom" /> :
                                <input name="gender" value="T" onChange={this.handleChange('gender')} type="radio" className="checkbox_custom" />}
                              <label className="checkbox_custom_label">T</label>
                            </div>
                          </div>

                        </div> */}
                        {/* <div className="l_form_Age l_form_row l_regFrmRowEffct l_regFormRowWtoHvr">
                          <label>Age<span style={{ "color": "red" }}>*</span></label>
                          <input type="text" value={this.state.age} onChange={this.handleChange('age')} className="l_reg_input_efect agesss" pattern="[123456789][0-9]{9}" />
                        </div> */}
                        <div className="full_width l_form_row l_regFrmRowEffct l_regFormRowWtoHvr">
                          <label>Pin Code</label>
                          <input type="text" value={this.state.pincode} onChange={this.handleChange('pincode')} className="l_reg_input_efect pincodesss" />
                        </div>

                        {/* <div className="full_width l_form_row l_regFrmRowEffct l_regFormRowWtoHvr">
                            <label>User Type</label>
                        <select onChange={this.handleChange('usertype')} className="l_reg_input_efect">
<option selected value="1">Doctor</option>
<option value="4">Medical Student</option>
<option value="5">Other Healthcare Professional</option>
<option value="6">Not a Healthcare Professional</option>

       </select>
       </div> */}
                        

                        <div class="full_width l_form_row l_Specialities">
                          {/* <Form.Group controlId="exampleForm.ControlSelect2">
                            <Form.Control className="multiSelect" as="select" multiple onChange={this.handleChange('speciality')}>
                              <option value="">Select Specialities</option>
                              {specialities.map(r =>

                                <option value={r.master_specialities_id} >{r.specialities_name}</option>
                              )}
                            </Form.Control>
                          </Form.Group> */}
                          <a className="font_14px radius-6 font600 l_Specialities_a" href="javascript:void(0)">Select Specialities
                          {/* -----------if any Specialities Selected Show "editIcon". If no Selected then Show "plusIcon"-------------- */}

                          {/* <span className="radius-100"><img className="translate_both" src={plusIcon} /></span> */}
                          <span className="radius-100"><img className="translate_both" src={editIcon} /></span>
                          </a>
                          <div className="clearfix"></div>
                          {(spec_array.length !=0)?
                          <div className="full_width text-center font500 font_14px colorWhite l_SpecialitiesSelected">
                            {spec_array.length} Speciality Selected
                          </div>:null}

                        </div>

                        <div className="full_width l_form_row l_regFrmRowEffct l_regFormRowWtoHvr regRowCount">
                          <label>Referral Code</label>
                          <input type="text" value={this.state.referal} onChange={this.handleChange('referal')} className="l_reg_input_efect" id="referal_code_input"/>
                        </div>

                        <div className="full_width l_form_row">
                          <div className="l_termsCondition_row">
                            <input id="terms" checked onClick={() => { this.check_check() }} name="accept_TC" onChange={this.handleChange('terms')} type="checkbox" className="checkbox_custom" />
                            <label className="font500 font_14px checkbox_custom_label">I Accept </label>
                            <a target='_blank' href="https://doctor.clirnet.com/knowledge/registration/terms_page">Terms and Conditions</a>
                          </div>
                        </div>

                        <div className="full_width l_form_row">
                          <span className="err_hold" style={{ "color": "red" }}>{this.state.err_msg}</span>
                          <button onClick={() => { this.setState({ "is_loader": true }); this.registration() }} className="radius-6 font_16px font600 l_frmSubmit">Register Now</button>
                        </div>
                        <Loader type="ThreeDots" color="#3393df" height={80} width={80} visible={this.state.is_loader} />
                      </div>
                    </div>
                  </div>
                </Scrollbars>

              </div>
            </div>

          </div>

          <div className="right_fix_pop_JS">
    <div className="tRright_popClose right_fixedBg"></div>
    <div className="right_pop transition6s text-left ssnFilterPop">
      <div className="bgColorBlue text-left right_popTtl">
        <h2 className="colorWhite font600 font_20px right_popTtlTxt">Select Specialities</h2>
        <a href="javascript:void(0)" className="radius-100 right_popClose tRright_popClose">
               <span className="translate_both colorWhite font600 font_14px ">Ok</span>
        </a>
      </div>
      <div className="right_popIn">

      {specialities.map(r =>

<div className="cmnCheckBox_row">
{(spec_array.indexOf(r.master_specialities_id) != -1) ?
<input checked onClick={() => { this.selectspec(r.master_specialities_id); }}   type="checkbox" className="form-check-input" />:
<input  onClick={() => { this.selectspec(r.master_specialities_id); }}   type="checkbox" className="form-check-input" />}
<label className="font500 font_14px form-check-label">{r.specialities_name} </label>
</div>
)}
               

         </div>
    </div>
    </div>
        </section>

      </div>
    );
  }
}

export default Registrationpartone;
