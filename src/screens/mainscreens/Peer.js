import React from 'react';
import Loader from 'react-loader-spinner'
import { reactLocalStorage } from 'reactjs-localstorage';
import $ from 'jquery';
import AppConfig from '../config/config.js';
import medwikiicon from '../../images/medWikiNoImage-2.jpg';
import Header from '../mainscreens/Header';
import Footer from '../mainscreens/Footer';
import firebase from 'firebase/app';
import 'firebase/storage';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import {isMobile} from 'react-device-detect';

import closeIcon from '../../images/close.png';
import calenderIcon from '../../images/cal-black.png';
import masterconsultlogo from '../../images/session_box_type-3.png';
import pluslogo from '../../images/file_add.png';
import docDemo from '../../images/doctor_demo2.png';

import Slider from "react-slick";
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
require('firebase/auth')
//const storage = firebase.storage();
const gtag = window.gtag;

const pageNames = "Live CME"

var specialities=[];
const url = AppConfig.apiLoc;
const imgu = AppConfig.img_path;
var trending_data = [];
var prev_compendium = [];
var session_doc_list = [];

class Peer extends React.Component {
 
  constructor(props) {
    super(props);

    this.state = {
      phone_no: '',
      err_msg: "",
      err_msg_bottom:"",
      succ_msg: "",
      otp: "",
      trending_data: [],
      session_doc_list:[],
      button_disabled: 0,
      firebase_token: "",
      showModal:false,
      peer_type:1,
      search_spec:"",
      search_name:"",
      acc_open:false,
      selected_array_key_ses_doc:-1,
      prev_selected_array_key_ses_doc:-1,
      selected_ses_doc:0,
      prev_selected_ses_doc:0,
      readmore_key:-1,
      popup_img:"",
      popup_dep:"",
      popup_des:"",
      popup_description:"",
      popup_name:"",
      query: "",
      image: "",
      is_error:0,
      upload_url:"",
      compendium_listing_upcoming: [],
      is_loader: true,

    };

    this._handleKeyDown = this._handleKeyDown.bind(this);


  }


  componentDidMount() {
    window.document.title = "CLIRNET - AskCLIR"
    gtag('config', AppConfig.gtag_measure_id, {
			'page_title': window.document.title,
			'page_location': window.location.href,
			'page_path': window.location.pathname
			});
    specialities=[]

    if(this.props.location.data!=undefined && this.props.location.key_data!=undefined)
{
  
  this.setState({selected_ses_doc:this.props.location.data})
  this.setState({prev_selected_ses_doc:this.props.location.data})
  this.setState({prev_selected_array_key_ses_doc:this.props.location.key_data})
  
}

if(this.props.location.key_file!=undefined)
{
  
  this.setState({upload_url:this.props.location.key_file})
  
}
if(this.props.location.sel_qry!=undefined)
{
  
  this.setState({query:this.props.location.sel_qry})
  
}

    window.scrollTo(0, 0);
    session_doc_list = [];

    


    $('.li_home').attr('id', 'dashboard_cal');

    this.setState({ "is_loader": true });

    //Check User Logged in
   fetch(url+'user/detail', {
      method: 'GET',
      headers: {


        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'

      }
    }).then((response) => response.json()).then((responseJson) => {
      if (responseJson.status_code == "200") {
       




       fetch(url+'Knwlgmastersession/sessionDoctorsListByClientID', {
          method: 'GET',
          headers: {

            'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
            'version': 'rjsw 1.1.1'

          }
        }).then((response) => response.json()).then((responseJson) => {



          responseJson.data.map(r => {

            session_doc_list.push(r);
          })

          console.log(session_doc_list)

          this.setState({ "session_doc_list": session_doc_list })
          //this.setState({ "is_loader": false });

          this.setState({ "is_loader": false });
        //console.log(this.state.session_doc_list[1].profile_image);


        }).catch((error) => {

        });









      }
      else {
        this.props.history.push({
          pathname: `/`
        })

      }
    }).catch((error) => {
      this.props.history.push({
        pathname: `/`
      })
    });



   fetch(url+'fcm/token', {
      method: 'GET',
      headers: {

        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'

      }
    }).then((response) => response.json()).then((responseJson) => {


      this.setState({ "firebase_token": responseJson.data.token })

    })


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

      }

      else {
        this.props.history.push({
          pathname: `/`
        })
      }


    }).catch((error) => {

    });






$(document).ready(function(){
  $(".arngDiscus_ttl").click(function(){
    $(this).toggleClass("arngDiscus_ttlActive");
    
  });
  $('.tRright_popClose').on('click', function () {
    $('body').removeClass('right_PopShowBody');
  });
  
  
})


  }

  


  read_more()
  {
    $('body').addClass('right_PopShowBody');
  }

  final_submit()
  {
    if(this.state.selected_ses_doc==0)
    {
      this.setState({"is_error":1})

      setTimeout(() => {
        this.setState({ "is_error": 0 });
      }, 3000);

    }

    else
    {
      this.props.history.push({
        pathname: '/dashboard',
        data: this.state.selected_ses_doc,
        key_data:this.state.selected_array_key_ses_doc,
        key_file: this.state.upload_url,
        sel_qry:this.state.query 
         // your data array of objects
      })

    }
  }


  handleChangespec = e => (val) => {

    
      this.setState({"search_spec":val.target.value})
      
     
   
}
handleChangename = e => (val) => {

  this.setState({"search_name":val.target.value})
    
    
   
 
}

search_param()
{
  this.setState({ "err_msg": "" ,"err_msg_bottom":""});
  
  if(this.state.search_spec!="" || this.state.search_name!="")
  {

    
    this.setState({ "session_doc_list": [] })
    session_doc_list = [];
    this.setState({ "is_loader": true });

   fetch(url+'Knwlgmastersession/sessionDoctorsListByClientID?name='+this.state.search_name+'&&spids='+this.state.search_spec+'', {
      method: 'GET',
      headers: {

        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'

      }
    }).then((response) => response.json()).then((responseJson) => {

      if(responseJson.status_code=="401")
      {
        this.props.history.push({
          pathname: `/`
        })
      }
    


if(responseJson.data!=null)
{

      responseJson.data.map(r => {

        session_doc_list.push(r);
      })
    }

      if(session_doc_list.length>0)
      {


      this.setState({ "session_doc_list": session_doc_list })
      this.setState({ "is_loader": false });
      }

      else{

        //alert(session_doc_list)

        this.setState({ "err_msg_bottom": "Nothing Matches Your Search." });
        this.setState({ "is_loader": false });

      }
      //this.setState({ "is_loader": false });

      
    //console.log(this.state.session_doc_list[1].profile_image);


    }).catch((error) => {

    });
  }


  else
  {

    this.setState({ "err_msg": "Please Select Doctor Name Or Speciality" });
    window.scrollTo(0, 0);

    session_doc_list=[];


   fetch(url+'Knwlgmastersession/sessionDoctorsListByClientID', {
      method: 'GET',
      headers: {

        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'

      }
    }).then((response) => response.json()).then((responseJson) => {



      responseJson.data.map(r => {

        session_doc_list.push(r);
      })

      //console.log(session_doc_list)

      this.setState({ "session_doc_list": session_doc_list })
      //this.setState({ "is_loader": false });

      this.setState({ "is_loader": false });
    //console.log(this.state.session_doc_list[1].profile_image);


    }).catch((error) => {

    });

  }
}
  
_handleKeyDown(e) {
  
  if (e.key === 'Enter') {
    
    this.search_param();
  }
}




  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      adaptiveHeight: true
    };
    return (
      <div className={ isMobile == true ? 'full_width wrap_body mblScreen' : 'full_width wrap_body dskScreen'}>
        {(this.state.is_error==1)?
        <div className="translate_left font_14px font500 text-center colorRed radius-6 p_alertMsg">
  Please Select A Doctor
</div>:null}
        <Header history={this.props.history}  page_name={pageNames}/>
        <section className="full_width body_area">
          <div className="container" onKeyDown={this._handleKeyDown}>
            <div className="row">
              {/* <Banner/> */}



              <section className="full_width p_peer">
              {(this.state.err_msg!="")?
              <div className="col-12 text-center"><div class="alert alert-danger" style={{ "display": "inline-block" }}>
    <strong>Oops!</strong> {this.state.err_msg}
</div></div>:null}
              <div className="full_width text-left searchResultSearch">
                  <div className="searchFrmRow full_width">
                    <Form.Control onChange={this.handleChangename()}  className="font_14px font500 radius-6 searchResultInput" type="text" placeholder="Type Doctor Name" />
                    <Form.Control as="select" onChange={this.handleChangespec()} className="font_16px searchFrmRowSpecialty">
                      <option value="">Select Specialty</option>
                      {specialities.map((rr, index) => (
                        <option value={rr.master_specialities_id}>{rr.specialities_name}</option>
                      ))}

                    </Form.Control>
                    <button onClick={()=>{this.search_param()}} className="cmnBtn font_18px btnBlue">Search</button>
                  </div>
                </div>

                <div className="full_width p_peer_in">
                
                <div className="row">
                {(this.state.err_msg_bottom!="")?
<div className="col-12 text-center"><div class="alert alert-danger" style={{ "display": "inline-block" }}>
    <strong>Oops!</strong> {this.state.err_msg_bottom}
</div></div>:null}
                <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={80} width={80} visible={this.state.is_loader} />

              {this.state.session_doc_list.map((r, index) => (
            <div className="col-lg-4 col-md-6 col-12  dbDocPopRow">
               <div className="full_width text-center dbDocPopRowTop radius-6">
                   <div className="radius-100 dbDocPopRowPic">
                     {(r.profile_image=="")?
                         <img src={docDemo} className="object_fit_cover" />:
                         <img src={r.profile_image} className="object_fit_cover" />}
                   </div>
                   <div className="full_width dbDocPopRowCont">
                       <h3 className="font600 font_18px colorBlack dbDocPopRowName">{r.doctor_name} <span className="font_14px colorGrey">{r.subtitle}</span></h3>
              <p>{r.profile.substring(0,50)}....</p>
                       <a onClick={()=>{  this.setState({"popup_img":r.profile_image}); this.setState({"popup_dep":r.subtitle}); this.setState({"popup_des":r.profile}); this.setState({"popup_description":r.description}); this.setState({"popup_name":r.doctor_name}); this.read_more();  }}   href="javascript:void(0);" className="font600 font_14px dbDocPopRowLink tRright_popShow" >Read More</a>
                       {/* {(this.state.readmore_key!=index)?
                      //  <a onClick={()=>{ this.setState({"readmore_key":index});}} href="javascript:void(0);" className="font600 font_14px dbDocPopRowLink" >Read More</a>:null}   
                      // <a  href="javascript:void(0);" className="font600 font_14px dbDocPopRowLink tRright_popShow" >Read More</a>
                      :null}    */}

                   </div>
                   <div className="checkBox">
                     {(this.state.selected_ses_doc==r.sessions_doctors_id)?
                       <a href="javascript:void(0)"><div className="checkBoxIn selected">
                         
                       </div></a>:
                       <a href="javascript:void(0)">
                       <div className="checkBoxIn notSelected"  onClick={()=>{ this.setState({"selected_ses_doc":r.sessions_doctors_id,"selected_array_key_ses_doc":index,"showModal":false,"is_error":0}); }}>
                         
                         </div></a>}
                       </div> 
                  </div>
               
            </div>
        ))}
        </div>
        </div>
        <div className="translate_left p_peerSubmit">
          {(this.state.prev_selected_ses_doc!=0)?
              <button type="submit" onClick={()=>{this.props.history.push({ pathname: '/dashboard',data:this.state.prev_selected_ses_doc, key_file: this.state.upload_url, sel_qry:this.state.query,key_data:this.state.prev_selected_array_key_ses_doc,  }) }}  className="cmnBtn font_18px font600 btnRed">Cancel</button>:
              <button type="submit" onClick={()=>{this.props.history.push({ pathname: '/dashboard', key_file: this.state.upload_url, sel_qry:this.state.query,pop_op:1}) }}  className="cmnBtn font_18px font600 btnRed">Cancel</button>}
              <button type="submit" onClick={()=>{ this.final_submit() }} className="cmnBtn font_18px font600 btnBlue">Select</button>
          </div>              </section>

            </div>

          </div>


        </section>
        
       
        <Footer  history={this.props.history}/>  








        <div className="right_fix_pop_JS db_doctorProfilePOP">
    <div className="tRright_popClose right_fixedBg"></div>
    <div className="right_pop transition6s text-left ssnFilterPop">
      <div className="bgColorBlue text-left right_popTtl">
        <h2 className="colorWhite font600 font_20px right_popTtlTxt">Doctor Profile</h2>
        <a href="javascript:void(0)" className="radius-100 right_popClose tRright_popClose">
               <img src={closeIcon} className="translate_both"/>
        </a>
      </div>
          <div className="right_popIn text-center">
              <div className="radius-100 dbDocPopRowPic">
                 {(this.state.popup_img!="")?
                                                 <img src={this.state.popup_img} className="object_fit_cover radius-100" />:
                                                 <img src={docDemo} className="object_fit_cover radius-100" />}
       
              </div>
              <div className="full_width dbDocPopRowCont">
              <h3 className="font600 font_18px colorBlack dbDocPopRowName">{this.state.popup_name}
 <span className="font_14px colorGrey">{this.state.popup_dep}</span></h3>
              <div className="full_width dbDocPopRowText">
              <p>{this.state.popup_des}</p>
              <p>{ ReactHtmlParser(this.state.popup_description) }</p>
              </div>

          </div>

      </div>
      
    </div>
    </div>
      </div>

    );
  }
}

export default Peer;
