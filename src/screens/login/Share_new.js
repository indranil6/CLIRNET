import React from 'react';
import Loader from 'react-loader-spinner'
import { withRouter } from 'react-router-dom'
import frombg from './images/l_frmBg.png';
import medwikiicon from './images/medwiki.jpg';
import pollicon from './images/poll860.jpg';
import calbg from './images/l_cal-black.png';
import $ from 'jquery';
import logiInLeft from './images/Web LoginPage.png';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Scrollbars } from 'react-custom-scrollbars';
import AppConfig from '../config/config.js';
import { Helmet } from "react-helmet"; 
import { getReferalCode} from "../Common/Common.js"; 

var prev_compendium = [];
var per_cpmp=0;
var location;
const url = AppConfig.apiLoc;
var prev_session = [];
var prev_survey = [];
class Share extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.referal_code = this.props.match.params.referal_code;
    this.state = {
      phone_no: '',
      err_msg: "",
      isd_code:"+91",
      tootp: false,
      is_loader: false,
      compendium_view: [],
      share_type: "",
      prev_session: [],
      prev_survey: [],
      display:0,
      login_type:1,
      email:"",
      password:""

    };

    reactLocalStorage.set('@ClirnetStore:referal_code', ''); 
    reactLocalStorage.set('@ClirnetStore:referal_code', this.referal_code);
    reactLocalStorage.set('@ClirnetStore:redirect_url', '');

    //Login Check

    


    this._handleKeyDownshare = this._handleKeyDownshare.bind(this);

    if(this.props.match.params.source !=undefined && this.props.match.params.source !="")
    {

      
      
      reactLocalStorage.set('@ClirnetStore:utm_source', this.props.match.params.source);

      
     
      //reactLocalStorage.set('@ClirnetStore:um_source', responseJson.data.first_name);
    }

    else
    {
      reactLocalStorage.set('@ClirnetStore:utm_source', '');
    }

  }

 

  componentWillUnmount()
  {
    console.log(reactLocalStorage.get('@ClirnetStore:redirect_url', true))
  }

  getUtmSource(){
    
    let utmSource = reactLocalStorage.get('@ClirnetStore:utm_source', true);
    if(utmSource == undefined || utmSource == 'undefined' || utmSource == true || utmSource == 'true' || utmSource == ''){
      console.log("utm source not found")
      return 0;
    }else{
      console.log("utm source:"+utmSource);
      return utmSource;
    }
  }

  componentWillMount()
  {

   
   fetch(url+'user/detail', {
      method: 'GET',
      headers: {


        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'

      }
    }).then((response) => response.json()).then((responseJson) => {
      if (responseJson.status_code == "200") {


       

       
        //Redirect to medwiki  page if logged in
        if (this.props.match.params.type == 'medwiki') {
          this.props.history.push({
            pathname: '/Feeddetail/' + this.props.match.params.id + '/social'
          })
        }

        
        if (this.props.match.params.type != 'medwiki' && this.props.match.params.type != 'session' && this.props.match.params.type != 'survey' ) {

          reactLocalStorage.set('@ClirnetStore:redtype', this.props.match.params.type);

          if(this.props.match.params.id!='undefined' && this.props.match.params.id!=undefined)
          {
          this.props.history.push({
            pathname: '/Dashboard'
          })
        }
        else
        {
          this.props.history.push({
            pathname: '/Dashboard'
          })
        }


        }

        if (this.props.match.params.type == 'session') {
          //Redirect to session reservation page if logged in
          this.props.history.push({
            pathname: '/Reservesession/' + this.props.match.params.id + '/social'
          })
        }

        if (this.props.match.params.type == 'survey') {





          fetch(url+'survey/detail?id='+this.props.match.params.id+'', {
            method: 'GET',
            headers: {
      
      
              'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
              'version': 'rjsw 1.1.1'
      
            }
          }).then((response) => response.json()).then((responseJsons) => {


           if(responseJsons.data[0].category=="poll")
           {
           
            this.props.history.push({
              pathname: '/PollDetails/' + this.props.match.params.id + '/social'
            })

           }

           else
           { 
              this.props.history.push({
            pathname: '/SpqDetails/' + this.props.match.params.id + '/social'
          })
           }



          }).catch((error) => {

          });
        }


      }




      else {
       this.setState({"display":1});

       if (this.props.match.params.type != 'medwiki' && this.props.match.params.type != 'session' && this.props.match.params.type != 'survey') 
{
  reactLocalStorage.set('@ClirnetStore:redtype', this.props.match.params.type);
  if(this.props.match.params.id!='undefined' && this.props.match.params.id!=undefined)
  {
  reactLocalStorage.set('@ClirnetStore:redid', this.props.match.params.id);
  var red_not_id=this.props.match.params.id;
  }

  else
  {
    reactLocalStorage.set('@ClirnetStore:redid', 'NA'); 

    var red_not_id='NA';
  }

  reactLocalStorage.set('@ClirnetStore:redirect_url','/Dashboard');


}

        //Redirect to medwiki share page
        if (this.props.match.params.type == 'medwiki') {
          reactLocalStorage.set('@ClirnetStore:redtype', 'Feeddetail');
          reactLocalStorage.set('@ClirnetStore:redid', this.props.match.params.id);
          prev_compendium = [];
          var extrautm="";
    if(reactLocalStorage.get('@ClirnetStore:utm_source', '')!="" && reactLocalStorage.get('@ClirnetStore:utm_source', '')!=undefined && reactLocalStorage.get('@ClirnetStore:utm_source', '')!=null)
    {
       extrautm="&utm_source="+reactLocalStorage.get('@ClirnetStore:utm_source', '')+"";
    }
         fetch(url+'openapi/service?type=comp&type_id=' + this.props.match.params.id + ''+extrautm+'', {
            method: 'GET',
            headers: {

              'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
              'version': 'rjsw 1.1.1'

            }
          }).then((response) => response.json()).then((responseJson) => {
            prev_compendium[0] = responseJson.data;


            reactLocalStorage.set('@ClirnetStore:redirect_url', '/Feeddetail/' + this.props.match.params.id + '');


            this.setState({ "compendium_view": prev_compendium, "share_type": "comp" });

            var len_comp=prev_compendium[0].answer.length;

             per_cpmp=Math.round(len_comp/5);

            console.log(per_cpmp)

            this.setState({"display":1});
          })
        }

        //Redirect to session share page

        if (this.props.match.params.type == 'session') {
          reactLocalStorage.set('@ClirnetStore:redtype', 'Reservesession');
          reactLocalStorage.set('@ClirnetStore:redid', this.props.match.params.id);
          var extrautm="";
    if(reactLocalStorage.get('@ClirnetStore:utm_source', '')!="" && reactLocalStorage.get('@ClirnetStore:utm_source', '')!=undefined && reactLocalStorage.get('@ClirnetStore:utm_source', '')!=null)
    {
       extrautm="&utm_source="+reactLocalStorage.get('@ClirnetStore:utm_source', '')+"";
    }
         fetch(url+'openapi/service?type=session&type_id=' + this.props.match.params.id + ''+extrautm+'', {
            method: 'GET',
            headers: {

              'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
              'version': 'rjsw 1.1.1'

            }
          }).then((response) => response.json()).then((responseJson) => {

            prev_session[0] = responseJson.data;

            reactLocalStorage.set('@ClirnetStore:redirect_url','/Reservesession/' + this.props.match.params.id + '');



            this.setState({ "prev_session": prev_session, "share_type": "session" })


          })
        }




        if (this.props.match.params.type == 'survey') {
          reactLocalStorage.set('@ClirnetStore:redtype', 'SpqDetails'); 
          reactLocalStorage.set('@ClirnetStore:redid', this.props.match.params.id);
          var extrautm="";
    if(reactLocalStorage.get('@ClirnetStore:utm_source', '')!="" && reactLocalStorage.get('@ClirnetStore:utm_source', '')!=undefined && reactLocalStorage.get('@ClirnetStore:utm_source', '')!=null)
    {
       extrautm="&utm_source="+reactLocalStorage.get('@ClirnetStore:utm_source', '')+"";
    }
         fetch(url+'openapi/service?type=survey&type_id=' + this.props.match.params.id + ''+extrautm+'', {
            method: 'GET',
            headers: {

              'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
              'version': 'rjsw 1.1.1'

            }
          }).then((response) => response.json()).then((responseJson) => {

            prev_survey[0] = responseJson.data;


           if(responseJson.data.category=="poll")
           {
            reactLocalStorage.set('@ClirnetStore:redtype', 'PollDetails');
            
            reactLocalStorage.set('@ClirnetStore:redirect_url','/PollDetails/' + this.props.match.params.id + '');

           }
           else
           {
            reactLocalStorage.set('@ClirnetStore:redtype', 'SpqDetails');
           

           }

           



            this.setState({ "prev_survey": prev_survey, "share_type": "survey" })


          })
        }

      }


    }).catch((error) => {

    });
   
  }

  componentDidMount() {


    reactLocalStorage.set('@ClirnetStore:referal_code', ''); 
    reactLocalStorage.set('@ClirnetStore:referal_code', this.referal_code);
    document.title = "CLIRNet";
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

  }


  handleChangewithparam = e => (val) => {

    switch (e) { 
      case 'email':
        this.setState({ "email": val.target.value });
        break;
      case 'password':
        this.setState({ "password": val.target.value });
        break;
     

      default:
        {



        }


    }







  }

  //Send otp if not logged on on giving phone no
 
  otp_send_or_login_password()
  {
    let has_error=0;
    if(this.state.login_type==1)
    {
   if(this.state.phone_no==="")
   {
     has_error=1;
     this.setState({"is_loader":false});
     this.setState({"err_msg":"Please Enter Phone No."})
   }

   let phoneno = /^\d{10}$/;
   if(this.state.phone_no.match(phoneno))
   {

   }
   else
   {
    has_error=1;
    this.setState({"is_loader":false});
     this.setState({"err_msg":"Please Enter Phone No In Correct Format."}) 
   }

   if(has_error==0)
   {

    let utm = this.getUtmSource();
    // let referal_code = getReferalCode();
    let formdata = new FormData(); 
    formdata.append("isdCode",this.state.isd_code)
    formdata.append("phone_no", this.state.phone_no)
    formdata.append("utm_source", utm)  
    // formdata.append("referal_code", referal_code)  
    
 fetch(url+'Authrjs/login', {
      method: 'POST',
      headers: {
        
        'version': 'rjsw 1.1.1'
         
         },
      body: formdata,
    })
    .then((response) => response.json())
    .then((responseJson) => {
    if(responseJson.status_code=="203")
    {
      this.setState({"err_msg":responseJson.message}) 
      this.setState({"is_loader":false});
    }
    if(responseJson.status_code=="200")
    {
      this.setState({"is_loader":false});
      this.props.history.push({
        pathname: `/otpverify`,
        
        state: {
          phone_no: this.state.phone_no,
          isd_code:this.state.isd_code
        }
        })
      this.setState({"test":1})
    }
    
    })
    .catch((error) => {
      //alert(error)
      this.setState({"is_loader":false});
      this.setState({"err_msg":"Something went Wrong"}) ;
    });
   }
  }

  else
  {


   

    if(this.state.password==="")
   {
     has_error=1;
     this.setState({"is_loader":false});
     this.setState({"err_msg":"Please Enter Password."})
   }

   if(this.state.email==="")
   {
     has_error=1;
     this.setState({"is_loader":false});
     this.setState({"err_msg":"Please Enter Email ID."})
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

   if(has_error==0)
   {
    let utm = this.getUtmSource();
    // let referal_code = getReferalCode(); 
    let formdata = new FormData();
    formdata.append("email",this.state.email)
    formdata.append("password", this.state.password)
    formdata.append("utm_source", utm)    
    // formdata.append("referal_code", referal_code)    
    
 fetch(url+'Authrjs/loginEmail', {
      method: 'POST',
      headers: {
        
        'version': 'rjsw 1.1.1'
         
         },
      body: formdata,
    })
    .then((response) => response.json())
    .then((responseJson) => {
    if(responseJson.status_code=="203")
    {
      this.setState({"err_msg":responseJson.message}) 
      this.setState({"is_loader":false});
    }
    if(responseJson.status_code=="200")
    {
      
      this.setState({ "is_loader": false });
      if (responseJson.data.status === 3) {


        //Old User to dashboard and setting values

        reactLocalStorage.set('@ClirnetStore:refreshToken', responseJson.data.refresh_token);
        
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
            reactLocalStorage.set('@ClirnetStore:phoneNumber', responseJson.data.mobilePrimary);
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
              this.props.history.push({
                pathname: '/' + reactLocalStorage.get('@ClirnetStore:redtype', true) + '/' + reactLocalStorage.get('@ClirnetStore:redid', 0) + '/social'
              })
            }
            else {

             // alert(reactLocalStorage.get('@ClirnetStore:email', true))

              if(reactLocalStorage.get('@ClirnetStore:deals_url', true) != "" && reactLocalStorage.get('@ClirnetStore:deals_url', true) != true && reactLocalStorage.get('@ClirnetStore:email', 0)!=0 && reactLocalStorage.get('@ClirnetStore:email', 0)!="" && reactLocalStorage.get('@ClirnetStore:email', 0)!=undefined && reactLocalStorage.get('@ClirnetStore:email', 0)!=null  && reactLocalStorage.get('@ClirnetStore:email', 0)!='undefined')
              {
                let emailId = reactLocalStorage.get('@ClirnetStore:email', 0);
                let redirect = "https://doctor.clirnet.com/store/wp.php";
                let values= new Array(emailId,reactLocalStorage.get('@ClirnetStore:deals_url', true)) 
                let keys= new Array("email","route");
                // console.log("email Id"+emailId)
                this.openWindowWithPost(redirect,'',keys,values);
                // this.props.history.push({
                //   pathname: `/Dashboard`
                // })
              }

              else
              {
                if(reactLocalStorage.get('@ClirnetStore:email', 0)==0 || reactLocalStorage.get('@ClirnetStore:email', 0)=="" || reactLocalStorage.get('@ClirnetStore:email', 0)==undefined || reactLocalStorage.get('@ClirnetStore:email', 0)==null  || reactLocalStorage.get('@ClirnetStore:email', 0)=='undefined')
                {
                  this.props.history.push({
                    pathname: '/Store/'+reactLocalStorage.get('@ClirnetStore:deals_url', true)+''
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
        this.setState({"is_loader":false});
        this.setState({"err_msg":"Email Not Registered."}) ;
       
      }

    }
    
    })
    .catch((error) => {
      //alert(error)
      this.setState({"is_loader":false});
      this.setState({"err_msg":"Something went Wrong"}) ;
    });
   }

  }
        
  }

  handleChangeisd = e => (val) => {

    this.setState({"err_msg":""}) 
   
    switch(e) {
          case 'isd':
            this.setState({"isd_code":val.target.value});

            
            break;
            
    
          default:
           {
           

            
           }

           
        }
      
      
     
   
}

  //Setting Phone No. Values
  handleChange(e) {

    this.setState({ "phone_no": e.target.value })
  }
  //Handle Enter Press
  _handleKeyDownshare(e) {
    var thisobj1 = this
    if (e.key === 'Enter') {
      this.setState({ "is_loader": true });
      this.otp_send_or_login_password()
    }
  }


  render() {



    return (

      <div>
        {(this.state.display==1)?
      
      <div>
        
      
        {this.state.compendium_view.map((r, index) => (
            <Helmet>
  <meta property="og:url" content={"https://doctor.clirnet.com/services/#/share/medwiki/"+r.type_id} />
<meta property="og:type" content="article" />
<meta property="og:title" content={r.question} />
<meta property="og:description" content={r.answer.substr(0, 100)} />
<meta property="og:image" content={r.image} />
<meta property="og:image:secure_url" content={r.image} />
<meta name="twitter:image" content={r.image} />
<meta name="twitter:title" content={r.question+"|  CLIRNet eConnect  | Powered by CLIRNet"} />
<meta name="twitter:card" content="summary_large_image" />
</Helmet>
 ))}
  
{this.state.prev_survey.map((r, index) => (
            <Helmet>
  <meta property="og:url" content={"https://doctor.clirnet.com/services/#/share/survey/"+r.type_id} />
<meta property="og:type" content="article" />
<meta property="og:title" content={r.survey_title} />
<meta property="og:description" content={r.survey_description.substr(0, 100)} />
<meta property="og:image" content={r.image} />
<meta property="og:image:secure_url" content={r.image} />
<meta name="twitter:image" content={r.image} />
<meta name="twitter:title" content={r.survey_title+"|  CLIRNet eConnect  | Powered by CLIRNet"} />
<meta name="twitter:card" content="summary_large_image" />
</Helmet>
 ))}


  {this.state.prev_session.map((rses, index) => (
            <Helmet>
  <meta property="og:url" content={"https://doctor.clirnet.com/services/#/share/session/"+rses[0].session_id} />
<meta property="og:type" content="article" />
<meta property="og:title" content={rses[0].session_topic} />
<meta property="og:description" content={rses[0].session_topic} />
{rses[0].session_doctor_entities.map(docres =>

  <meta property="og:image" content={docres.session_doctor_image} />
  
)}
{rses[0].session_doctor_entities.map(docres =>

  <meta property="og:image" content={docres.session_doctor_image} />
  
)}
{rses[0].session_doctor_entities.map(docres =>

  <meta property="twitter:image" content={docres.session_doctor_image} />
  
)}
<meta name="twitter:title" content={rses[0].session_topic+"|  CLIRNet eConnect  | Powered by CLIRNet"} />
<meta name="twitter:card" content="summary_large_image" />
</Helmet>
 ))}
          



        <section className="full_width l_main_body sharePageMain">
          <div className="l_mainBox">

            {this.state.compendium_view.map((r, index) => (

              <div className="l_leftBox l_medWiki_left">
              
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

              <div className="l_leftBox l_session_left">
             
              
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

<div className="l_leftBox l_medWiki_left">

  <div className="full_width l_medwiki_pic">
    {(rsuv.image != "" && rsuv.image != undefined) ?
      <img src={rsuv.image} className="object_fit_cover" /> :
      <img src={pollicon} className="object_fit_cover" />}
    <div className="overlay"></div>
  </div>
  <div className="full_width text-left l_medwiki_Body">
    <Scrollbars renderTrackVertical={props => <div {...props} className="track-vertical" />}
      style={{ width: '100%', height: '100%', }}>
        {(rsuv.specialities_name!="" && rsuv.specialities_name!=undefined && rsuv.specialities_name!=null)?
      <h4 className="font_16px font700 colorBlack l_medWiki_spec"><span class="font_20px colorBlue">[</span> {rsuv.specialities_name} <span className="font_20px colorBlue">]</span></h4>:null}
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
{(this.props.match.params.type != 'medwiki' && this.props.match.params.type != 'session' && this.props.match.params.type != 'survey')?
<div className="l_leftBox l_session_left">
        <img src={logiInLeft} className="loginGrap translate_both"/>
      </div>:null}
    

            <div className="l_frmPart " onKeyDown={this._handleKeyDownshare}>
              
        	<div className="overlay"></div>
        	<img src={frombg} className="l_frmPart_Bg"/>
            <div className="full_width l_rightIn">
           
            
            <Scrollbars renderTrackVertical={props => <div {...props} className="track-vertical"/>}
            style={{ width: '100%', height: '100vh',}}>
                <div className="row align-items-center">
                <div className="col">
                <div className="full_width text-left l_frmTtl">
                	<h2 className="colorWhite font700 font_20px">Join the movement now!</h2>
                </div>
                <div className="full_width l_frmBody">
                  {(this.state.login_type==1)?
                  <div className="full_width loginWithMobile">
                    <div className="full_width mobleNoCont">
                    <select onChange={this.handleChangeisd("isd")} className="mobleNoSelect">
                    <option selected  value="1">+91</option>
                    <option  value="+1">+1</option>
                    <option  value="+6">+6</option>
                    <option  value="+977">+977</option>
                    <option  value="+975">+975</option>
                    <option  value="+960">+960</option>
                    <option  value="+61">+61</option>
                    <option  value="+82">+82</option>
                    <option  value="+94">+94</option>
                    <option  value="+95">+95</option>
                    
                    </select>

                    <div className="full_width l_form_row l_regFrmRowEffct l_regFormRowHvr">

                      <label>Mobile Number</label>
                      
                      <input type="text" maxLength="10" onChange={this.handleChange} className="l_reg_input_efect" pattern="[6789][0-9]{9}" required/>
                    </div>
                    </div>

                        <span className="err_hold" style={{"color":"red"}}>{this.state.err_msg}</span>
                        
                        <div className="full_width l_form_row">
                        
                  <button  onClick={()=>{ this.setState({"is_loader":true}); this.otp_send_or_login_password()}} className="radius-6 font_16px font600 l_frmSubmit">Login/Register</button>
                        </div>
                        
                        <div className="full_width">
                          <h3 className="loginDvdr colorBlack font_14px"><span>OR</span></h3>
                          <div className="clearfix"></div>
                          <a href="javascript:void(0)" onClick={()=>{ this.setState({"login_type":2}); this.setState({"err_msg":""})}} className="radius-6 font_16px font600 l_frm2na">Login/Register With Email ID</a>
                        </div>
                        </div>:

                  <div className="full_width loginWithEmail">

                    <div className="full_width l_form_row l_regFrmRowEffct l_regFormRowHvr">

                      <label>Email ID</label>
                      
                      <input type="email" onChange={this.handleChangewithparam("email")} className="l_reg_input_efect" required/>
                    </div>
                    <div className="full_width l_form_row l_regFrmRowEffct l_regFormRowHvr">

                      <label>Password</label>
                      
                      <input type="password" onChange={this.handleChangewithparam("password")} className="l_reg_input_efect" required />
                    </div>

                        <span className="err_hold" style={{"color":"red"}}>{this.state.err_msg}</span>
                        
                        <div className="full_width l_form_row">
                        
                  <button  onClick={()=>{ this.setState({"is_loader":true}); this.otp_send_or_login_password()}} className="radius-6 font_16px font600 l_frmSubmit">Login</button>
                        </div>

                        {/* <div className="full_width l_form_row">
                        <a className="colorWhite font600 l_form_forgot" href="javascript:void(0)">Forgot Password ?</a>
                        </div> */}
                        <div className="full_width l_form_row">
                        <a className="colorWhite font600 l_form_forgot" onClick={()=>{this.props.history.push({pathname: `/Registerwithemail`}) }} href="javascript:void(0)">New User ?</a>
                        </div>
                        <div className="full_width">
                          <h3 className="loginDvdr colorBlack font_14px"><span>OR</span></h3>
                          <div className="clearfix"></div>
                          <a href="javascript:void(0)" onClick={()=>{ this.setState({"login_type":1}); this.setState({"err_msg":""})}}  className="radius-6 font_16px font600 l_frm2na">Login/Register With Mobile No.</a>
                        </div>
                        </div>}
                        <div className="full_width l_form_row">
                        
                	<h2 className="font500 font_18px colorWhite fontItalic">"Exclusive and Free for Doctors"</h2>
                
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

      </div>:null}
      </div>
    );
  }
}

export default Share;
