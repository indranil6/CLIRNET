import React, { Component } from 'react';
import calenderIcon from '../../images/cal.png';
import firebase from 'firebase/app'
import $ from 'jquery';
import medwikiicon from '../../images/medWikiNoImage-2.jpg';

import { reactLocalStorage } from 'reactjs-localstorage';
import AppConfig from '../config/config.js';
import Header from '../mainscreens/Header';
import Footer from '../mainscreens/Footer';
import masterconsultlogo from '../../images/session_box_type-3.png';
import {isMobile} from 'react-device-detect';
import mastercirclelogo from '../../images/session_box_type-2.png';
import Form from 'react-bootstrap/Form';

import "react-toastify/dist/ReactToastify.css";
import { ToastsContainer, ToastsStore } from 'react-toasts';

import Banner from '../mainscreens/Banner';
import Modal from 'react-bootstrap/Modal'
import 'react-toastify/dist/ReactToastify.css';
import Slider from "react-slick";
import Masonry from 'react-masonry-component';
import Loader from 'react-loader-spinner'

require('firebase/auth')
var firebase_config = {
  apiKey: "AIzaSyB4yxW3LklwGsHHMqWQXuR2GCSusqJ8Ubk",
  authDomain: "http://clirnetapp.appspot.com/",
  databaseURL: "https://clirnetapp.firebaseio.com/",
  projectId: "clirnetapp",
  storageBucket: "clirnetapp.appspot.com",
  messagingSenderId: "66526267590"

}

const pageNames = "Live CME"
const meetConfig = { 
  meetingNumber: '',
  platform_name:'',
  userName: '',
  userEmail: '',    
  passWord: '', 
  };  


// firebase.initializeApp(firebase_config);
// const storage = firebase.storage();
const url = AppConfig.apiLoc;
const zoom_root_url = AppConfig.zoom_root_url;
let single_data;
var img_name_temp = "";
let related_comp = [];
var random_str = ""
var sponser_img = ""
var session_queries = [];
var banner_call="";
var reporting_json_array=[];
var banner_top_reporting_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Top","duration":0,"type":"session","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
var banner_bottom_reporting_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Bottom","duration":0,"type":"session","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
var banner_sidebar_bottom_reporting_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar_Bottom","duration":0,"type":"session","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
var banner_sidebar_top_reporting_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar_Top","duration":0,"type":"session","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};

var banner_sidebar_top_type="";
var banner_sidebar_top_label="";
var banner_sidebar_top_category_id="";
var banner_sidebar_top_width="";
var banner_sidebar_top_height="";
var banner_sidebar_top_duration="";
var banner_sidebar_top_url_and_redirect=[];
var banner_sidebar_top_play_key=0;
var banner_sidebar_top_video_change_permission=0;
var banner_sidebar_top_onclick_pause=0;
var myTimer_sidebar_top="";
var timerval_sidebar_top="";
var myTimer_sidebar_top_temp="";
var myTimer_sidebar_top_main=""
var myTimer_small_value_sidebar_top="";
var myTimer_small_value_sidebar_top_temp=""
var top_image_change_time=0;
var sidebar_top_image_change_time=0;
var sidebar_bottom_image_change_time=0;
var bottom_image_change_time=0;

var banner_sidebar_bottom_type="";
var banner_sidebar_bottom_label="";
var banner_sidebar_bottom_category_id="";
var banner_sidebar_bottom_width="";
var banner_sidebar_bottom_height="";
var banner_sidebar_bottom_duration="";
var banner_sidebar_bottom_url_and_redirect=[];
var banner_sidebar_bottom_play_key=0;
var banner_sidebar_bottom_video_change_permission=0;
var banner_sidebar_bottom_onclick_pause=0;
var myTimer_sidebar_bottom="";
var timerval_sidebar_bottom="";
var myTimer_sidebar_bottom_temp="";
var myTimer_sidebar_bottom_main="";
var myTimer_small_value_sidebar_bottom="";
var myTimer_small_value_sidebar_bottom_temp=""


var banner_bottom_type="";
var banner_bottom_label="";
var banner_bottom_category_id="";
var banner_bottom_width="";
var banner_bottom_height="";
var banner_bottom_duration="";
var banner_bottom_url_and_redirect=[];
var banner_bottom_play_key=0;
var banner_bottom_video_change_permission=0;
var banner_bottom_onclick_pause=0;
var myTimer_bottom="";
var timerval_bottom="";
var myTimer_bottom_temp="";
var myTimer_bottom_main="";
var myTimer_small_value_bottom="";
var myTimer_small_value_bottom_temp=""


var banner_top_type="";
var banner_top_label="";
var banner_top_category_id="";
var banner_top_width="";
var banner_top_height="";
var banner_top_duration="";
var banner_top_url_and_redirect=[];
var banner_top_play_key=0;
var banner_top_video_change_permission=0;
var banner_top_onclick_pause=0;
var myTimer_top="";
var timerval_top="";
var myTimer_top_temp="";
var myTimer_top_main="";
var myTimer_small_value_top="";
var myTimer_small_value_top_temp=""
var duration_value_top=0;

var modalImage = "";
var modalName = "";
var modalDepartment = "";
var modalProfile = "";

var question_no = 0;  
var poll_list_data = [];

var clientLogo = '';
var isSponsored = false;

const masonryOptions = {
  transitionDuration: 0
};

class LiveSessionDetails extends React.Component {

  constructor(props) {
    super(props);

    this.uri_id=this.props.match.params.id 
    this.id=this.props.match.params.id 
    this.state = {
      phone_no: '',
      err_msg: "",
      otp: "",
      session_listing_upcoming: [],
      session_listing_cme: [],
      viewrefresh: false,
      is_loader: true,
      is_loader_more: false,
      single_data: [],
      query: "",
      image: "",
      upload_url: "",
      firebase_token: "",
      button_disabled: 0,
      file_name_diaplay: "",
      showModal: false,
      related_comp: [],
      rerender:false,
    };

    clientLogo = '';
    isSponsored = false;

    reactLocalStorage.set('@ClirnetStore:source','');
  }

  componentDidMount(){
    window.document.title = "CLIRNET - Live CME Detail"
  }
  
  redirect_to_session_booking(id) {
    this.props.history.push({
      pathname: '/Reservesession/' + id + ''
    })
  }

  //Generating random string to show image url
  randomString(len, bits) {
    bits = bits || 36;
    var outStr = "", newStr;
    while (outStr.length < len) {
      newStr = Math.random().toString(bits).slice(2);
      outStr += newStr.slice(0, Math.min(newStr.length, (len - outStr.length)));
    }
    return outStr.toUpperCase();
  };


   ////////////////////////////////Added By Sumit////////////////////////////////////////////
   onViewDetailsClick(i){   
    modalImage = this.state.single_data.session_doctor_entities[i].session_doctor_image;
    modalName = this.state.single_data.session_doctor_entities[i].session_doctor_name;
    modalDepartment = this.state.single_data.session_doctor_entities[i].DepartmentName;
    modalProfile = this.state.single_data.session_doctor_entities[i].profile; 
    this.setState({ "showModal": false });
    // console.log("onViewDetailsClick"+i)  
  }
  ///////////////////////////////////////////////////////////////////////////

  componentDidMount() {

    $(".ses_mobile").addClass("active");


    setTimeout(function(){ 
      var video2 = $(".sidebar_top_banner_div video").height();
     $(".sidebar_top_banner_div").height(video2 + 25 + 'px');

     var video1 = $(".top_banner_div video").height();
     $(".top_banner_div").height(video1 + 25 + 'px');

     var video3 = $(".sidebar_bottom_banner_div video").height();
     $(".sidebar_bottom_banner_div").height(video3 + 25 + 'px');

     var video4 = $(".bottom_banner_div video").height();
     $(".bottom_banner_div").height(video4 + 25 + 'px');
     }, 4000);


    var that67=this;

    $(window).blur(function() {

if(document.getElementById('video_top_container')!=undefined)
{

      if( !that67.is_on_screen_top('video_imagecont') ) {

        banner_top_video_change_permission=0;
if(document.getElementById('video_top_container')!=undefined)
{
        document.getElementById('video_top_container').pause();
}

      }
    }

    if(document.getElementById('video_imagecont_bottom')!=undefined)
    {
    
      if( !that67.is_on_screen_bottom('video_imagecont_bottom') ) {

       // alert()

        banner_bottom_video_change_permission=0;
if( document.getElementById('video_imagecont_bottom')!=undefined)
{
        document.getElementById('video_imagecont_bottom').pause();
}

      }
    }

    if(document.getElementById('video_imagecont_sidebar_bottom')!=undefined)
    {

      if( !that67.is_on_screen_sidebar_bottom('video_imagecont_sidebar_bottom') ) {

        banner_sidebar_bottom_video_change_permission=0;
if(document.getElementById('video_imagecont_sidebar_bottom')!=undefined)
{
        document.getElementById('video_imagecont_sidebar_bottom').pause();
}

      }
    }


    if(document.getElementById('video_imagecont_sidebar_top')!=undefined && document.getElementById('video_imagecont_sidebar_top')!=null) 
    {

      if( !that67.is_on_screen_sidebar_top('video_imagecont_sidebar_top') ) {


        banner_sidebar_top_video_change_permission=0;
if(document.getElementById('video_imagecont_sidebar_top')!=this.undefined)
{
        document.getElementById('video_imagecont_sidebar_top').pause();
}

      }
    }




   
      //do something
  });
 

  $(window).focus(function() {
    console.log("focussed")
    if(document.getElementById('video_sidebar_top_container')!=undefined)
    {
    if( that67.is_on_screen_sidebar_top('video_imagecont_sidebar_top') ) {

      banner_sidebar_top_video_change_permission=1;
if( document.getElementById('video_sidebar_top_container')!=undefined)
{

      document.getElementById('video_sidebar_top_container').play();
}

    }
  }


  if(document.getElementById('video_top_container')!=undefined)
    {
    if( that67.is_on_screen_top('video_imagecont') ) {

      banner_top_video_change_permission=1;
if(document.getElementById('video_top_container')!=undefined)
{
      document.getElementById('video_top_container').pause();
}

    }


    } 



    if(document.getElementById('video_imagecont_bottom')!=undefined)
    {
    
      if( that67.is_on_screen_bottom('video_imagecont_bottom') ) {

       // alert()

        banner_bottom_video_change_permission=1;
if( document.getElementById('video_imagecont_bottom')!=undefined)
{
        document.getElementById('video_imagecont_bottom').pause();
}

      }
    }

    if(document.getElementById('video_imagecont_sidebar_bottom')!=undefined)
    {

      if( that67.is_on_screen_sidebar_bottom('video_imagecont_sidebar_bottom') ) {

        banner_sidebar_bottom_video_change_permission=1;
if(document.getElementById('video_imagecont_sidebar_bottom')!=undefined)
{
        document.getElementById('video_imagecont_sidebar_bottom').pause();
}

      }
    }
    //do something
});

   


    window.addEventListener("beforeunload", (ev) => 
    {  

      top_image_change_time=0;
      sidebar_top_image_change_time=0;
      sidebar_bottom_image_change_time=0;
      bottom_image_change_time=0;
      
      if(document.getElementById("video_top_container")!=undefined && document.getElementById("video_top_container")!=null)
      {
      var vidunsave_top = document.getElementById("video_top_container");
    
     var unsave_durationtop= vidunsave_top.currentTime;
     if(unsave_durationtop!=0 && banner_top_reporting_json.start_time!="")
     {
    
    
      let today = new Date();
              
      let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      
     let temp_json={"start_time":banner_top_reporting_json.start_time,"start_timestamp":"","banner_id":banner_top_url_and_redirect[banner_top_play_key].banner_id,"banner_cat_id":banner_top_reporting_json.banner_cat_id,"position": "Top","duration":unsave_durationtop,"type":"session","type_id":banner_top_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
     reporting_json_array.push(temp_json);
     }
    }



  if(document.getElementById("video_bottom_container")!=undefined && document.getElementById("video_bottom_container")!=null)
    {
    var vidunsave_bottom = document.getElementById("video_bottom_container");

   var unsave_durationbottom= vidunsave_bottom.currentTime;
   if(unsave_durationbottom!=0 && banner_bottom_reporting_json.start_time!="")
   {


    let today = new Date();
            
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
    let temp_json={"start_time":banner_bottom_reporting_json.start_time,"start_timestamp":"","banner_id":banner_bottom_url_and_redirect[banner_bottom_play_key].banner_id,"banner_cat_id":banner_bottom_reporting_json.banner_cat_id,"position": "Bottom","duration":unsave_durationbottom,"type":"session","type_id":banner_bottom_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
    reporting_json_array.push(temp_json);
   }
  }


  if(document.getElementById("video_sidebar_bottom_container")!=undefined && document.getElementById("video_sidebar_bottom_container")!=null)
  {
  var vidunsave_sidebar_bottom = document.getElementById("video_sidebar_bottom_container");
  
  var unsave_durationsidebar_bottom= vidunsave_sidebar_bottom.currentTime;
  if(unsave_durationsidebar_bottom!=0 && banner_sidebar_bottom_reporting_json.start_time!="")
  {
  
  
  let today = new Date();
          
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  
  let temp_json={"start_time":banner_sidebar_bottom_reporting_json.start_time,"start_timestamp":"","banner_id":banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key].banner_id,"banner_cat_id":banner_sidebar_bottom_reporting_json.banner_cat_id,"position": "sidebar_bottom","duration":unsave_durationsidebar_bottom,"type":"session","type_id":banner_sidebar_bottom_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
  reporting_json_array.push(temp_json);
  }
  }



  if(document.getElementById("video_sidebar_top_container")!=undefined && document.getElementById("video_sidebar_top_container")!=null)
  {
  var vidunsave_sidebar_top = document.getElementById("video_sidebar_top_container");
  
  var unsave_durationsidebar_top= vidunsave_sidebar_top.currentTime;
  if(unsave_durationsidebar_top!=0 && banner_sidebar_top_reporting_json.start_time!="")
  {
  
  
  let today = new Date();
          
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  
  let temp_json={"start_time":banner_sidebar_top_reporting_json.start_time,"start_timestamp":"","banner_id":banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key].banner_id,"banner_cat_id":banner_sidebar_top_reporting_json.banner_cat_id,"position": "sidebar_top","duration":unsave_durationsidebar_top,"type":"session","type_id":banner_sidebar_top_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
  reporting_json_array.push(temp_json);
  }
  }

      if(reporting_json_array.length>0)
{

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
    
      fetch(url+'banner/addreport', {
        method: 'POST',
        headers: {
          
          
          'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
    
          'version': 'rjsw 1.1.1',
          'OS':os
          
        },
        body: JSON.stringify(reporting_json_array),
      }).then((response) => response.json()).then((responseJson) => {
    
        reporting_json_array=[];
       
    
    }).catch((error) => {
    
    
      reporting_json_array=[];
       
      });
    }
    
    
        ev.preventDefault();
        return ev.returnValue = 'Are you sure you want to close?';
    });

    var ddj_top;
    var ddj_bottom;
    var ddj_sidebar_bottom;

    var ddj_sidebar_top;

    window.scrollTo(0, 0);
var tempthis12=this

  
     
   

    /////////////////////////////////////componentmount function top ends


  

 /////////////////////////////////////componentmount function bottom ends


 var scrool_freeze=1;


  setTimeout(function() {

    scrool_freeze=0;

    $('html, body').css({
      overflow: 'auto',
      height: 'auto'
  });

   }, 6000);


    var thattemp2=this;
    var is_first_time_apply_top=1;

    var is_first_time_apply_down_top=1;
    $(window).scroll(function(){ 
      

    
      // bind window scroll event
      if( $('#video_imagecont').length > 0 ) { // if target element exists in DOM
        var videocontainertopscroll = document.getElementById('video_top_container');
        
          if( thattemp2.is_on_screen_top('video_imagecont') ) {

            

            
            

 if(videocontainertopscroll!=undefined && banner_top_onclick_pause==0)
 { 

  

  if(is_first_time_apply_top==1 && is_first_time_apply_down_top==0)
  {


  
  banner_top_video_change_permission=1;
  
  //tempthis12.start_timer_top(myTimer_small_value_top)
  clearTimeout(myTimer_top_main);

  //thattemp2.start_timer_top(ddj_top)
            videocontainertopscroll.play();
             is_first_time_apply_top=0;
             is_first_time_apply_down_top=1;
  }
 }
             
          }
          
          else {

            if(is_first_time_apply_down_top==1)
            {

              is_first_time_apply_down_top=0;

            is_first_time_apply_top=1

            clearTimeout(myTimer_top_main);
        
            if(myTimer_small_value_top!="")
            {
              var videochtop = $("#video_top_container").get(0);
              if ( videochtop !=undefined && videochtop.paused ) {

              }

              else
              {
          
              ddj_top=myTimer_small_value_top;
              }

                  
                 // tempthis12.start_timer_top(myTimer_small_value_top)
            }
            else
            {
          
              if ( videochtop !=undefined && videochtop.paused ) {
              }

              else
              {
          
              ddj_top=myTimer_small_value_top_temp;
              }
             // tempthis12.start_timer_top(myTimer_small_value_top_temp)
            }

            banner_top_video_change_permission=0;

            if(videocontainertopscroll!=undefined)
            { 
            videocontainertopscroll.pause();
            }
            
            }

           
            
          }
      }
      });

 /////////////////////////////////////componentmount function top ends






      var is_first_time_apply_bottom=0;

    var is_first_time_apply_down_bottom=1;
    $(window).scroll(function(){ // bind window scroll event
      if( $('#video_imagecont_bottom').length > 0 ) {
        
        // if target element exists in DOM
        var videocontainerbottomscroll = document.getElementById('video_bottom_container');
        
          if( thattemp2.is_on_screen_bottom('video_imagecont_bottom') ) {

            

            
            

 if(videocontainerbottomscroll!=undefined && banner_bottom_onclick_pause==0)
 { 

  

  if(is_first_time_apply_bottom==1 && is_first_time_apply_down_bottom==0 && ddj_bottom!="")
  {

    //alert();


  
  banner_bottom_video_change_permission=1;
  
  //tempthis12.start_timer_top(myTimer_small_value_top)
  clearTimeout(myTimer_bottom_main);

  //thattemp2.start_timer_bottom(ddj_bottom)
            videocontainerbottomscroll.play();
             is_first_time_apply_bottom=0;
             is_first_time_apply_down_bottom=1;
  }
 }
             
          }
          
          else {

           

            if(is_first_time_apply_down_bottom==1 && videocontainerbottomscroll!=undefined)
            {

             

              
              is_first_time_apply_down_bottom=0;

            is_first_time_apply_bottom=1

            clearTimeout(myTimer_bottom_main);
        
            if(myTimer_small_value_bottom!="")
            {
              var videochbottom = $("#video_bottom_container").get(0);
              if ( videochbottom !=undefined && videochbottom.paused ) {

              }

              else
              {
          
              ddj_bottom=myTimer_small_value_bottom;
              }

                  
                 // tempthis12.start_timer_top(myTimer_small_value_top)
            }
            else
            {
              
          
              if ( videochbottom !=undefined && videochbottom.paused ) {
              }

              else
              {
                
                if(myTimer_small_value_bottom_temp!="")
                {
          
              ddj_bottom=myTimer_small_value_bottom_temp;
                }

                else
                {
                  ddj_bottom=banner_bottom_duration; 

                  //alert(ddj_bottom)
                }
              }
             // tempthis12.start_timer_top(myTimer_small_value_top_temp)
            }

            banner_bottom_video_change_permission=0;

            if(videocontainerbottomscroll!=undefined)
            {

            videocontainerbottomscroll.pause();
            }
            
            }

           
            
          }
      }
      });















      var is_first_time_apply_sidebar_bottom=0;

var is_first_time_apply_down_sidebar_bottom=1;
$(window).scroll(function(){ // bind window scroll event
  if( $('#video_imagecont_sidebar_bottom').length > 0 ) {


   
    
    // if target element exists in DOM
    var videocontainersidebar_bottomscroll = document.getElementById('video_sidebar_bottom_container');
    
      if( thattemp2.is_on_screen_sidebar_bottom('video_imagecont_sidebar_bottom') ) {

        
       //console.log("present")
        
        

if(videocontainersidebar_bottomscroll!=undefined && banner_sidebar_bottom_onclick_pause==0)
{ 



if(is_first_time_apply_sidebar_bottom==1 && is_first_time_apply_down_sidebar_bottom==0 && ddj_sidebar_bottom!="")
{

//alert();



banner_sidebar_bottom_video_change_permission=1;

//tempthis12.start_timer_top(myTimer_small_value_top)
clearTimeout(myTimer_sidebar_bottom_main);

//thattemp2.start_timer_sidebar_bottom(ddj_sidebar_bottom)
        videocontainersidebar_bottomscroll.play();
         is_first_time_apply_sidebar_bottom=0;
         is_first_time_apply_down_sidebar_bottom=1;
}
}
         
      }
      
      else {

       

        if(is_first_time_apply_down_sidebar_bottom==1 && videocontainersidebar_bottomscroll!=undefined)
        {

        // console.log("param disable")

          
          is_first_time_apply_down_sidebar_bottom=0;

        is_first_time_apply_sidebar_bottom=1

        clearTimeout(myTimer_sidebar_bottom_main);
    
        if(myTimer_small_value_sidebar_bottom!="")
        {
          var videochsidebar_bottom = $("#video_sidebar_bottom_container").get(0);
          if ( videochsidebar_bottom !=undefined && videochsidebar_bottom.paused ) {

          }

          else
          {
      
          ddj_sidebar_bottom=myTimer_small_value_sidebar_bottom;
          }

              
             // tempthis12.start_timer_top(myTimer_small_value_top)
        }
        else
        {
          
      
          if ( videochsidebar_bottom !=undefined && videochsidebar_bottom.paused ) {
          }

          else
          {
            
            if(myTimer_small_value_sidebar_bottom_temp!="")
            {
      
          ddj_sidebar_bottom=myTimer_small_value_sidebar_bottom_temp;
            }

            else
            {
              ddj_sidebar_bottom=banner_sidebar_bottom_duration; 

              //alert(ddj_sidebar_bottom)
            }
          }
         // tempthis12.start_timer_top(myTimer_small_value_top_temp)
        }

        banner_sidebar_bottom_video_change_permission=0;

        if(videocontainersidebar_bottomscroll!=undefined)
        {
        videocontainersidebar_bottomscroll.pause();
        }
        
        }

       
        
      }
  }
  });


      /////////////////////////////////////componentmount function top ends





      var is_first_time_apply_sidebar_top=0;

var is_first_time_apply_down_sidebar_top=1;
$(window).scroll(function(){ // bind window scroll event
  if( $('#video_imagecont_sidebar_top').length > 0 ) {


   
    
    // if target element exists in DOM
    var videocontainersidebar_topscroll = document.getElementById('video_sidebar_top_container');
    
      if( thattemp2.is_on_screen_sidebar_top('video_imagecont_sidebar_top') ) {

        
       console.log("present")
        
        

if(videocontainersidebar_topscroll!=undefined && banner_sidebar_top_onclick_pause==0)
{ 



if(is_first_time_apply_sidebar_top==1 && is_first_time_apply_down_sidebar_top==0 && ddj_sidebar_top!="")
{

//alert();



banner_sidebar_top_video_change_permission=1;

//tempthis12.start_timer_top(myTimer_small_value_top)
clearTimeout(myTimer_sidebar_top_main);

//thattemp2.start_timer_sidebar_top(ddj_sidebar_top)
        videocontainersidebar_topscroll.play();
         is_first_time_apply_sidebar_top=0;
         is_first_time_apply_down_sidebar_top=1;
}
}
         
      }
      
      else {

       

        if(is_first_time_apply_down_sidebar_top==1 && videocontainersidebar_topscroll!=undefined)
        {

        // console.log("param disable")

          
          is_first_time_apply_down_sidebar_top=0;

        is_first_time_apply_sidebar_top=1

        clearTimeout(myTimer_sidebar_top_main);
    
        if(myTimer_small_value_sidebar_top!="")
        {
          var videochsidebar_top = $("#video_sidebar_top_container").get(0);
          if ( videochsidebar_top !=undefined && videochsidebar_top.paused ) {

          }

          else
          {
      
          ddj_sidebar_top=myTimer_small_value_sidebar_top;
          }

              
             // tempthis12.start_timer_top(myTimer_small_value_top)
        }
        else
        {
          
      
          if ( videochsidebar_top !=undefined && videochsidebar_top.paused ) {
          }

          else
          {
            
            if(myTimer_small_value_sidebar_top_temp!="")
            {
      
          ddj_sidebar_top=myTimer_small_value_sidebar_top_temp;
            }

            else
            {
              ddj_sidebar_top=banner_sidebar_top_duration; 

              //alert(ddj_sidebar_top)
            }
          }
         // tempthis12.start_timer_top(myTimer_small_value_top_temp)
        }

        banner_sidebar_top_video_change_permission=0;

       
        videocontainersidebar_topscroll.pause();
        
        }

       
        
      }
  }
  });




    session_queries = [];
    random_str = this.randomString(12, 16) + ".png";
    

    if (this.props.location.pathname.includes("social")) {
      var extrapop = "&source=social";
    }
    else {
      var extrapop = "";
    }
    var extrautm="";
    if(reactLocalStorage.get('@ClirnetStore:utm_source', true)!="" && reactLocalStorage.get('@ClirnetStore:utm_source', true)!=undefined && reactLocalStorage.get('@ClirnetStore:utm_source', true)!=null)
    {
       extrautm="&utm_source="+reactLocalStorage.get('@ClirnetStore:utm_source', true)+"";
    }
    //Fetching Session Detail of given ID
   fetch(url+'knwlgmastersession/sessiondetail?session_id=' + this.props.match.params.id + '' + extrapop + ''+extrautm+'', {
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

      else
      {
    
      

      single_data = responseJson.data;
      if (single_data[0].session_queries != undefined) {
        session_queries = single_data[0].session_queries;
      }

      sponser_img = single_data[0].sponsor_entities.sponsor_logo;
      var speccs = single_data[0].speciality + "," + single_data[0].speciality_id;

        ////////////////////---Added by sumit---/////////////////////////
        poll_list_data = []
        poll_list_data = [{
          "survey_id": "9",
          "category": "poll",
          "point": "1",
          "json_data": "{\"surveys\":{\"question1\":{\"question\":\". Should compassionate use be allowed for unproven drugs or therapies ?\",\"type\":\"single\",\"correctoption\":\"\",\"point\":\"0\",\"options\":[{\"label\":\"Yes, but only if the patient has no other options \",\"value\":0},{\"label\":\"Yes, clinical trials take too long \",\"value\":1},{\"label\":\"No, it unethical to do so \",\"value\":2}]}}}",
          "survey_title": "Poll Based Question 5",
          "deeplink": "https:\/\/clirnet.page.link\/2t2wkCFZGpnB1jPM9",
          "survey_description": "This is poll based question",
          "image": "https:\/\/storage.googleapis.com\/medwiki\/35_server_testing\/video\/1603273269_025_lakare.jpg",
          "specialities_name": "Mood disorder",
          "client_name": "CLIRNet",
          "client_logo": "https:\/\/developer.clirnet.com\/knowledge\/uploads\/logo\/200-1.png",
          "sponsor_name": null,
          "sponsor_logo": null,
          "publishing_date": "2020-10-21 00:00:00"
      }] 
      
        if(poll_list_data.length != 0){
         poll_list_data.map(r => { 
           console.log("json////////////////////////"+r.survey_id+'\n'+r.json_data)
           if(r.survey_id != null && r.json_data != false){
            if(r.sponsor_logo == null || r.sponsor_logo === 'null' || r.sponsor_logo == ''){
              clientLogo = r.client_logo;
            }else{
              isSponsored = true;
              clientLogo = r.sponsor_logo;
            }
            //  poll_list_data = single_data[0].survey; 
           }
           else{
             poll_list_data = []
           }
         })
        }else{
         poll_list_data = [] 
        }
        console.log("poll list dara"+JSON.stringify(poll_list_data)) 
        ////////////////////////////////////////////

      console.log(single_data[0]);
      this.setState({ "single_data": single_data[0] });
      this.setState({ "query": single_data[0].asked_query })
      this.setState({ "upload_url": single_data[0].upload_documents })
      this.setState({ "file_name_diaplay": single_data[0].upload_documents })


      related_comp = [];
     
     fetch(url+'knwlg/related?type=session&type_id=' + this.props.match.params.id + '', {
        method: 'GET',
        headers: {

          'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
          'version': 'rjsw 1.1.1'

        }
      }).then((response) => response.json()).then((responseJson) => {


        responseJson.data.map(r => {

          related_comp.push(r);
        })





        this.setState({ "related_comp": related_comp })

      })






      if (isMobile) {
        var type_id_val=2;
 
       
     }
 
     else
     {
       var type_id_val=1;
 
      
     }
 





      fetch(url+'banner/data?banner_type='+type_id_val+'&content_type_id='+this.props.match.params.id+'&content_type=session', {
        method: 'GET',
        headers: {

          'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
          'version': 'rjsw 1.1.1'

        }
      }).then((response) => response.json()).then((responseJsonban) => {

        console.log(responseJsonban)

        banner_call=responseJsonban.timestamp_added;
        banner_top_reporting_json.timestamp_get=banner_call;
        banner_bottom_reporting_json.timestamp_get=banner_call;
        banner_sidebar_top_reporting_json.timestamp_get=banner_call;
        banner_sidebar_bottom_reporting_json.timestamp_get=banner_call;

       

        for(let inc=0; inc<responseJsonban.data.length; inc++)
        {

          switch(responseJsonban.data[inc].position){
            case 'sidebar - top':
              banner_sidebar_top_type=responseJsonban.data[inc].format;
               banner_sidebar_top_label=responseJsonban.data[inc].lable;
               banner_sidebar_top_category_id=responseJsonban.data[inc].banner_cat_id;
               banner_sidebar_top_width=responseJsonban.data[inc].width;
               banner_sidebar_top_height=responseJsonban.data[inc].height;
               banner_sidebar_top_duration=responseJsonban.data[inc].duration;
               banner_sidebar_top_url_and_redirect=responseJsonban.data[inc].items;
               
               banner_sidebar_top_play_key=0;
               banner_sidebar_top_reporting_json.banner_cat_id=responseJsonban.data[inc].banner_cat_id;
               banner_sidebar_top_reporting_json.type_id=this.props.match.params.id;

              
                banner_sidebar_top_video_change_permission=1;

               this.setState({"rerender":!this.state.rerender})

               console.log(responseJsonban.data[inc].position+"oooooooooooooos")
               //var videocontainertopmount = document.getElementById('video_top_container');
               //videocontainertopmount.play();
            break;
            case 'sidebar - bottom': 


             banner_sidebar_bottom_type=responseJsonban.data[inc].format;
             banner_sidebar_bottom_label=responseJsonban.data[inc].lable;
             banner_sidebar_bottom_category_id=responseJsonban.data[inc].banner_cat_id;
             banner_sidebar_bottom_width=responseJsonban.data[inc].width;
             banner_sidebar_bottom_height=responseJsonban.data[inc].height;
             banner_sidebar_bottom_duration=responseJsonban.data[inc].duration;
             banner_sidebar_bottom_url_and_redirect=responseJsonban.data[inc].items;
             banner_sidebar_bottom_play_key=0;

             banner_sidebar_bottom_reporting_json.banner_cat_id=responseJsonban.data[inc].banner_cat_id;
             banner_sidebar_bottom_reporting_json.type_id=this.props.match.params.id;
              banner_sidebar_bottom_video_change_permission=1;
              console.log(responseJsonban.data[inc].position+"oooooooooooooos")
             this.setState({"rerender":!this.state.rerender});


                        
            
            break;
            case 'top': 

            if(responseJsonban.data[inc].format=="video")   
            {   
            $('html, body').css({
              overflow: 'hidden',
              height: '100%'
          });
        }
             banner_top_type=responseJsonban.data[inc].format;
             banner_top_label=responseJsonban.data[inc].lable;
             banner_top_category_id=responseJsonban.data[inc].banner_cat_id;
             banner_top_width=responseJsonban.data[inc].width;
             banner_top_height=responseJsonban.data[inc].height;
             banner_top_duration=responseJsonban.data[inc].duration;
             banner_top_url_and_redirect=responseJsonban.data[inc].items;
             banner_top_play_key=0;
              banner_top_video_change_permission=1;
            
             this.setState({"rerender":!this.state.rerender})
             console.log(responseJsonban.data[inc].position+"oooooooooooooos")
             
             banner_top_reporting_json.banner_cat_id=responseJsonban.data[inc].banner_cat_id;
             banner_top_reporting_json.type_id=this.props.match.params.id;


   
    //videocontainertop.setAttribute('height', banner_top_height);
    //videocontainertop.setAttribute('width', banner_top_width);
    // videocontainertoptemp.load();
    // //videocontainer.setAttribute('poster', newposter); //Changes video poster image
    // videocontainertoptemp.play();

             //this.start_timer_top("")
            
            break;
            case 'bottom': 
            
             banner_bottom_type=responseJsonban.data[inc].format;
             banner_bottom_label=responseJsonban.data[inc].lable;
             banner_bottom_category_id=responseJsonban.data[inc].banner_cat_id;
             banner_bottom_width=responseJsonban.data[inc].width;
             banner_bottom_height=responseJsonban.data[inc].height;
             banner_bottom_duration=responseJsonban.data[inc].duration;
             banner_bottom_url_and_redirect=responseJsonban.data[inc].items;

             banner_bottom_reporting_json.banner_cat_id=responseJsonban.data[inc].banner_cat_id;
             banner_bottom_reporting_json.type_id=this.props.match.params.id;
            
             //console.log(responseJsonban.data[inc].items)
              banner_bottom_video_change_permission=1;
             
             banner_bottom_play_key=0;
             this.setState({"rerender":!this.state.rerender});
             console.log(responseJsonban.data[inc].position+"oooooooooooooos")

             //this.start_timer_bottom("")
            break;
            default: 
            {

            }
        }

          
        }
        
        setTimeout(function(){ 
      
        if(document.getElementById('video_sidebar_top_container')!='undefined' && document.getElementById('video_sidebar_top_container')!=null)
        { 
    
          console.log('22222222222');
        
          document.getElementById('video_sidebar_top_container').addEventListener('ended', function(e) {
       
            console.log('33333333333');
        
        if(banner_sidebar_top_video_change_permission==1)
         {
        
         if(banner_sidebar_top_play_key<(banner_sidebar_top_url_and_redirect.length-1))
          {
            
        
            var videocontainersidebar_top = document.getElementById('video_sidebar_top_container');
        var videosourcesidebar_top = document.getElementById('video_sidebar_top');
        
        if(banner_sidebar_top_reporting_json.start_time!="" && banner_sidebar_top_reporting_json.start_time!=undefined)
        {
         let today = new Date();
      
         let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          let unix_tmp = Math.round(+new Date()/1000);
          let vidunsave_sidebar_top = document.getElementById("video_sidebar_top_container");
    
          let unsave_durationsidebar_top= vidunsave_sidebar_top.currentTime;
    let durationsidebartop=(unsave_durationsidebar_top.toFixed(3))-(banner_sidebar_top_reporting_json.start_timestamp.toFixed(3)); 
      
          let temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar-Top","duration":"","type":"session","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
      if(banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key]!=undefined)
      {
           temp_json={"start_time":banner_sidebar_top_reporting_json.start_time,"start_timestamp":"","banner_id":banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key].banner_id,"banner_cat_id":banner_sidebar_top_reporting_json.banner_cat_id,"position": "Sidebar-Top","duration":durationsidebartop.toFixed(3),"type":"session","type_id":banner_sidebar_top_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
         
          reporting_json_array.push(temp_json);
      }
      
         
      
         banner_sidebar_top_reporting_json.start_time="";
         banner_sidebar_top_reporting_json.end_time="";
      
         temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar-Top","duration":"","type":"session","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
      
      
        }
        banner_sidebar_top_play_key=banner_sidebar_top_play_key+1;
        if(banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key]!=undefined)
        {
        var newmp4sidebar_top = banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key].image;
        }
        
        
        if(videocontainersidebar_top!=undefined)
        {
    
        
        videocontainersidebar_top.pause();
        
        videosourcesidebar_top.setAttribute('src', newmp4sidebar_top);
        }
        if(banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key]!=undefined)
        {
        
        if(banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key].url!="")
        {
        $("#banner_href_sidebar_top").removeClass("disabled_href");
        $('#banner_href_sidebar_top').attr('target', '_blank');
        var par_url=banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key].url;
        }
        
        else
        {
        $("#banner_href_sidebar_top").addClass("disabled_href");
        
        var par_url="javascript:void(0)";
        }
        
        $("#banner_href_sidebar_top").attr("href", par_url);
        }
        if(videocontainersidebar_top!=undefined)
        {
        videocontainersidebar_top.load();
        
        videocontainersidebar_top.play();
        }
        
          //this.start_timer_sidebar_top("");
        
          }
        
          else
          {
            var videocontainersidebar_top = document.getElementById('video_sidebar_top_container');
        var videosourcesidebar_top = document.getElementById('video_sidebar_top');
        if(banner_sidebar_top_reporting_json.start_time!="" && banner_sidebar_top_reporting_json.start_time!=undefined)
        {
         let today = new Date();
      
         let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          let unix_tmp = Math.round(+new Date()/1000);
      
          let vidunsave_sidebar_top = document.getElementById("video_sidebar_top_container");
    
          let unsave_durationsidebartop= vidunsave_sidebar_top.currentTime;
    let durationsidebartop=(unsave_durationsidebartop.toFixed(3))-(banner_sidebar_top_reporting_json.start_timestamp.toFixed(3));  
          let temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar-Top","duration":"","type":"session","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
      if(banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key]!=undefined)
      {
           temp_json={"start_time":banner_sidebar_top_reporting_json.start_time,"start_timestamp":"","banner_id":banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key].banner_id,"banner_cat_id":banner_sidebar_top_reporting_json.banner_cat_id,"position": "Sidebar-Top","duration":durationsidebartop.toFixed(3),"type":"session","type_id":banner_sidebar_top_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
         
          reporting_json_array.push(temp_json);
      }
      
         
      
         banner_sidebar_top_reporting_json.start_time="";
         banner_sidebar_top_reporting_json.end_time="";
      
         temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar-Top","duration":"","type":"session","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
      
      
         console.log(reporting_json_array)
        }
        
        banner_sidebar_top_play_key=0;
        if(banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key]!=undefined)
        {
        var newmp4sidebar_top = banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key].image;
        }
        
        
        if(videocontainersidebar_top!=undefined)
        {
    
        videocontainersidebar_top.pause();
        
        videosourcesidebar_top.setAttribute('src', newmp4sidebar_top);
        }
        if(banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key]!=undefined)
        {
        
          if(banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key].url!="")
          {
            $("#banner_href_sidebar_top").removeClass("disabled_href");
            $('#banner_href_sidebar_top').attr('target', '_blank');
            var par_url=banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key].url;
          }
        
          else
          {
            $("#banner_href_sidebar_top").addClass("disabled_href");
            var par_url="javascript:void(0)";
          }
        
          
        $("#banner_href_sidebar_top").attr("href", par_url);
        }
        if(videocontainersidebar_top!=undefined)
        {
        videocontainersidebar_top.load();
        
        videocontainersidebar_top.play();
        }
        
        //this.start_timer_sidebar_top("");
        
          }
        }
        
        })
        
        
        }
      
      

        
         
            if(document.getElementById('video_top_container')!='undefined' && document.getElementById('video_top_container')!=null)
            { 
        
              document.getElementById('video_top_container').addEventListener('ended', function(e) {
        
                console.log('The End top');
        
         if(banner_top_video_change_permission==1)
             {
        
             if(banner_top_play_key<(banner_top_url_and_redirect.length-1))
              {
                
        
                var videocontainertop = document.getElementById('video_top_container');
        var videosourcetop = document.getElementById('video_top');
        if(banner_top_reporting_json.start_time!="" && banner_top_reporting_json.start_time!=undefined)
               {
                let today = new Date();
          
                let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                 let unix_tmp = Math.round(+new Date()/1000);
        
        
                 let temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Top","duration":"","type":"session","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
        if(banner_top_url_and_redirect[banner_top_play_key]!=undefined)
        {
          let vidunsave_top = document.getElementById("video_top_container");
      
          let unsave_durationtop= vidunsave_top.currentTime;
      let durationtop=(unsave_durationtop.toFixed(3))-(banner_top_reporting_json.start_timestamp.toFixed(3));   
                  temp_json={"start_time":banner_top_reporting_json.start_time,"start_timestamp":"","banner_id":banner_top_url_and_redirect[banner_top_play_key].banner_id,"banner_cat_id":banner_top_reporting_json.banner_cat_id,"position": "Top","duration":durationtop.toFixed(3),"type":"session","type_id":banner_top_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
                
                 reporting_json_array.push(temp_json);
        }
        
                
        
                banner_top_reporting_json.start_time="";
                banner_top_reporting_json.end_time="";
        
                temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Top","duration":"","type":"session","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
        
        
                console.log(reporting_json_array)
               }
        
        banner_top_play_key=banner_top_play_key+1;
        if(banner_top_url_and_redirect[banner_top_play_key]!=undefined)
        {
        var newmp4top = banner_top_url_and_redirect[banner_top_play_key].image;
        }
        
         
         if(videocontainertop!=undefined)
         {
        
            videocontainertop.pause();
        
            videosourcetop.setAttribute('src', newmp4top);
          }
            if(banner_top_url_and_redirect[banner_top_play_key]!=undefined)
        {
        
          if(banner_top_url_and_redirect[banner_top_play_key].url!="")
          {
            $("#banner_href_top").removeClass("disabled_href");
            $('#banner_href_top').attr('target', '_blank');
            var par_url=banner_top_url_and_redirect[banner_top_play_key].url;
          }
        
          else
          {
            $("#banner_href_top").addClass("disabled_href");
        
            var par_url="javascript:void(0)";
          }
        
            $("#banner_href_top").attr("href", par_url);
        }
        if(videocontainertop!=undefined)
        {
            videocontainertop.load();
            
            videocontainertop.play();
        }
        
              //this.start_timer_top("");
        
              }
        
              else
              {
                var videocontainertop = document.getElementById('video_top_container');
        var videosourcetop = document.getElementById('video_top');
        if(banner_top_reporting_json.start_time!="" && banner_top_reporting_json.start_time!=undefined)
               {
                let today = new Date();
          
                let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                 let unix_tmp = Math.round(+new Date()/1000);
        
        
                 let temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Top","duration":"","type":"session","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
        if(banner_top_url_and_redirect[banner_top_play_key]!=undefined)
        {
          let vidunsave_top = document.getElementById("video_top_container");
      
          let unsave_durationtop= vidunsave_top.currentTime;
      let durationtop=(unsave_durationtop.toFixed(3))-(banner_top_reporting_json.start_timestamp.toFixed(3));  
                  temp_json={"start_time":banner_top_reporting_json.start_time,"start_timestamp":"","banner_id":banner_top_url_and_redirect[banner_top_play_key].banner_id,"banner_cat_id":banner_top_reporting_json.banner_cat_id,"position": "Top","duration":durationtop.toFixed(3),"type":"session","type_id":banner_top_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
                
                 reporting_json_array.push(temp_json);
        }
        
                
        
                banner_top_reporting_json.start_time="";
                banner_top_reporting_json.end_time="";
        
                temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Top","duration":"","type":"session","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
        
        
                console.log(reporting_json_array)
               }
        
        banner_top_play_key=0;
        if(banner_top_url_and_redirect[banner_top_play_key]!=undefined)
        {
        var newmp4top = banner_top_url_and_redirect[banner_top_play_key].image;
        }
        
         
         if(videocontainertop!=undefined)
         {
        
            videocontainertop.pause();
         
            videosourcetop.setAttribute('src', newmp4top);
         }
            if(banner_top_url_and_redirect[banner_top_play_key]!=undefined)
            {
        
              if(banner_top_url_and_redirect[banner_top_play_key].url!="")
              {
                $("#banner_href_top").removeClass("disabled_href");
                $('#banner_href_top').attr('target', '_blank');
                var par_url=banner_top_url_and_redirect[banner_top_play_key].url;
              }
          
              else
              {
                $("#banner_href_top").addClass("disabled_href");
                var par_url="javascript:void(0)";
              }
        
              
            $("#banner_href_top").attr("href", par_url);
            }
            if(videocontainertop!=undefined)
            {
            videocontainertop.load();
           
            videocontainertop.play();
            }
            
            //this.start_timer_top("");
        
              }
            }
        
            })
        
            
          }
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
          if(document.getElementById('video_bottom_container')!='undefined' && document.getElementById('video_bottom_container')!=null)
          { 
          
            document.getElementById('video_bottom_container').addEventListener('ended', function(e) {
          
              console.log('The End bottom');
          
          if(banner_bottom_video_change_permission==1)
           {
          
           if(banner_bottom_play_key<(banner_bottom_url_and_redirect.length-1))
            {
              
          
              var videocontainerbottom = document.getElementById('video_bottom_container');
          var videosourcebottom = document.getElementById('video_bottom');
          
          if(banner_bottom_reporting_json.start_time!="" && banner_bottom_reporting_json.start_time!=undefined)
                     {
                      let today = new Date();
                
                      let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                       let unix_tmp = Math.round(+new Date()/1000);
      
                       let vidunsave_bottom = document.getElementById("video_bottom_container");
      
                       let unsave_durationbottom= vidunsave_bottom.currentTime;
                 let durationbottom=(unsave_durationbottom.toFixed(3))-(banner_bottom_reporting_json.start_timestamp.toFixed(3));
              
              
                       let temp_json={"start_time":banner_bottom_reporting_json.start_time,"start_timestamp":"","banner_id":banner_bottom_url_and_redirect[banner_bottom_play_key].banner_id,"banner_cat_id":banner_bottom_reporting_json.banner_cat_id,"position": "Bottom","duration":durationbottom.toFixed(3),"type":"session","type_id":banner_bottom_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
                      
                       reporting_json_array.push(temp_json);
              
                      
              
                      banner_bottom_reporting_json.start_time="";
                      banner_bottom_reporting_json.end_time="";
              
                      temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Bottom","duration":"","type":"session","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
              
              
                      console.log(reporting_json_array)
                     }
          banner_bottom_play_key=banner_bottom_play_key+1;
          if(banner_bottom_url_and_redirect[banner_bottom_play_key]!=undefined)
          {
          var newmp4bottom = banner_bottom_url_and_redirect[banner_bottom_play_key].image;
          }
          
          
          if(videocontainerbottom!=undefined)
          {
          
          videocontainerbottom.pause();
          
          videosourcebottom.setAttribute('src', newmp4bottom);
          }
          if(banner_bottom_url_and_redirect[banner_bottom_play_key]!=undefined)
          {
          
          if(banner_bottom_url_and_redirect[banner_bottom_play_key].url!="")
          {
          $("#banner_href_bottom").removeClass("disabled_href");
          $('#banner_href_bottom').attr('target', '_blank');
          var par_url=banner_bottom_url_and_redirect[banner_bottom_play_key].url;
          }
          
          else
          {
          $("#banner_href_bottom").addClass("disabled_href");
          
          var par_url="javascript:void(0)";
          }
          
          $("#banner_href_bottom").attr("href", par_url);
          }
          if(videocontainerbottom!=undefined)
          {
          videocontainerbottom.load();
          
          videocontainerbottom.play();
          }
          
            //this.start_timer_bottom("");
          
            }
          
            else
            {
              var videocontainerbottom = document.getElementById('video_bottom_container');
          var videosourcebottom = document.getElementById('video_bottom');
          if(banner_bottom_reporting_json.start_time!="" && banner_bottom_reporting_json.start_time!=undefined)
                     {
                      let today = new Date();
                
                      let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                       let unix_tmp = Math.round(+new Date()/1000);
              
                       let vidunsave_bottom = document.getElementById("video_bottom_container");
      
                       let unsave_durationbottom= vidunsave_bottom.currentTime;
                 let durationbottom=(unsave_durationbottom.toFixed(3))-(banner_bottom_reporting_json.start_timestamp.toFixed(3));        
                       let temp_json={"start_time":banner_bottom_reporting_json.start_time,"start_timestamp":"","banner_id":banner_bottom_url_and_redirect[banner_bottom_play_key].banner_id,"banner_cat_id":banner_bottom_reporting_json.banner_cat_id,"position": "Bottom","duration":durationbottom.toFixed(3),"type":"session","type_id":banner_bottom_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
                      
                       reporting_json_array.push(temp_json);
              
                      
              
                      banner_bottom_reporting_json.start_time="";
                      banner_bottom_reporting_json.end_time="";
              
                      temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Bottom","duration":"","type":"session","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
              
              
                      console.log(reporting_json_array)
                     }
          
          banner_bottom_play_key=0;
          if(banner_bottom_url_and_redirect[banner_bottom_play_key]!=undefined)
          {
          var newmp4bottom = banner_bottom_url_and_redirect[banner_bottom_play_key].image;
          }
          
          
          if(videocontainerbottom!=undefined)
          {
          
          videocontainerbottom.pause();
          
          videosourcebottom.setAttribute('src', newmp4bottom);
          }
          if(banner_bottom_url_and_redirect[banner_bottom_play_key]!=undefined)
          {
          
            if(banner_bottom_url_and_redirect[banner_bottom_play_key].url!="")
            {
              $("#banner_href_bottom").removeClass("disabled_href");
              $('#banner_href_bottom').attr('target', '_blank');
              var par_url=banner_bottom_url_and_redirect[banner_bottom_play_key].url;
            }
          
            else
            {
              $("#banner_href_bottom").addClass("disabled_href");
              var par_url="javascript:void(0)";
            }
          
            
          $("#banner_href_bottom").attr("href", par_url);
          }
          if(videocontainerbottom!=undefined)
          {
          videocontainerbottom.load();
          
          videocontainerbottom.play();
          }
          
          //this.start_timer_bottom("");
          
            }
          }
          
          })
          
          
          }
        
        
        
        
        
        
        
        
         
        
        
        
        
        
        
        
        
        
        
          if(document.getElementById('video_sidebar_bottom_container')!='undefined' && document.getElementById('video_sidebar_bottom_container')!=null)
          { 
          
            document.getElementById('video_sidebar_bottom_container').addEventListener('ended', function(e) {
          
              console.log('The End sidebar_bottom');
          
          if(banner_sidebar_bottom_video_change_permission==1)
           {
          
           if(banner_sidebar_bottom_play_key<(banner_sidebar_bottom_url_and_redirect.length-1))
            {
              
          
              var videocontainersidebar_bottom = document.getElementById('video_sidebar_bottom_container');
          var videosourcesidebar_bottom = document.getElementById('video_sidebar_bottom');
          if(banner_sidebar_bottom_reporting_json.start_time!="" && banner_sidebar_bottom_reporting_json.start_time!=undefined)
                     {
                      let today = new Date();
                
                      let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                       let unix_tmp = Math.round(+new Date()/1000);
                       let vidunsave_sidebar_bottom = document.getElementById("video_sidebar_bottom_container");
      
                       let unsave_durationsidebar_bottom= vidunsave_sidebar_bottom.currentTime;
                 let durationsidebarbottom=(unsave_durationsidebar_bottom.toFixed(3))-(banner_sidebar_bottom_reporting_json.start_timestamp.toFixed(3)); 
                      let temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar-bottom","duration":"","type":"session","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
        
                       if(banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key]!=undefined)
                       {
                        temp_json={"start_time":banner_sidebar_bottom_reporting_json.start_time,"start_timestamp":"","banner_id":banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key].banner_id,"banner_cat_id":banner_sidebar_bottom_reporting_json.banner_cat_id,"position": "Sidebar-bottom","duration":durationsidebarbottom.toFixed(3),"type":"session","type_id":banner_sidebar_bottom_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
                       }
                       reporting_json_array.push(temp_json);
              
                      
              
                       banner_sidebar_bottom_reporting_json.start_time="";
                       banner_sidebar_bottom_reporting_json.end_time="";
              
                      temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar-bottom","duration":"","type":"session","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
              
              
                      console.log(reporting_json_array)
                     }
          
          banner_sidebar_bottom_play_key=banner_sidebar_bottom_play_key+1;
          if(banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key]!=undefined)
          {
          var newmp4sidebar_bottom = banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key].image;
          }
          
          
          if(videocontainersidebar_bottom!=undefined)
          {
          
          videocontainersidebar_bottom.pause();
          
          videosourcesidebar_bottom.setAttribute('src', newmp4sidebar_bottom);
          }
          if(banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key]!=undefined)
          {
          
          if(banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key].url!="")
          {
          $("#banner_href_sidebar_bottom").removeClass("disabled_href");
          $('#banner_href_sidebar_bottom').attr('target', '_blank');
          var par_url=banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key].url;
          }
          
          else
          {
          $("#banner_href_sidebar_bottom").addClass("disabled_href");
          
          var par_url="javascript:void(0)";
          }
          
          $("#banner_href_sidebar_bottom").attr("href", par_url);
          }
          if(videocontainersidebar_bottom!=undefined)
          {
          videocontainersidebar_bottom.load();
          
          videocontainersidebar_bottom.play();
          }
          
            //this.start_timer_sidebar_bottom("");
          
            }
          
            else
            {
              var videocontainersidebar_bottom = document.getElementById('video_sidebar_bottom_container');
          var videosourcesidebar_bottom = document.getElementById('video_sidebar_bottom');
          
          if(banner_sidebar_bottom_reporting_json.start_time!="" && banner_sidebar_bottom_reporting_json.start_time!=undefined)
                     {
                      let today = new Date();
                
                      let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                       let unix_tmp = Math.round(+new Date()/1000);
              
                       let vidunsave_sidebar_bottom = document.getElementById("video_sidebar_bottom_container");
      
                       let unsave_durationsidebar_bottom= vidunsave_sidebar_bottom.currentTime;
                 let durationsidebarbottom=(unsave_durationsidebar_bottom.toFixed(3))-(banner_sidebar_bottom_reporting_json.start_timestamp.toFixed(3)); 
                      let temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar-bottom","duration":"","type":"session","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
        
                       if(banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key]!=undefined)
                       {
                        temp_json={"start_time":banner_sidebar_bottom_reporting_json.start_time,"start_timestamp":"","banner_id":banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key].banner_id,"banner_cat_id":banner_sidebar_bottom_reporting_json.banner_cat_id,"position": "Sidebar-bottom","duration":durationsidebarbottom.toFixed(3),"type":"session","type_id":banner_sidebar_bottom_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
                       }
                       reporting_json_array.push(temp_json);
              
                      
              
                       banner_sidebar_bottom_reporting_json.start_time="";
                       banner_sidebar_bottom_reporting_json.end_time="";
              
                      temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar-bottom","duration":"","type":"session","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
              
              
                     }
          banner_sidebar_bottom_play_key=0;
          if(banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key]!=undefined)
          {
          var newmp4sidebar_bottom = banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key].image;
          }
          
          
          if(videocontainersidebar_bottom!=undefined)
          {
          
          videocontainersidebar_bottom.pause();
          
          videosourcesidebar_bottom.setAttribute('src', newmp4sidebar_bottom);
          }
          if(banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key]!=undefined)
          {
          
            if(banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key].url!="")
            {
              $("#banner_href_sidebar_bottom").removeClass("disabled_href");
              $('#banner_href_sidebar_bottom').attr('target', '_blank');
              var par_url=banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key].url;
            }
          
            else
            {
              $("#banner_href_sidebar_bottom").addClass("disabled_href");
              var par_url="javascript:void(0)";
            }
          
            
          $("#banner_href_sidebar_bottom").attr("href", par_url);
          }
          if(videocontainersidebar_bottom!=undefined)
          {
          videocontainersidebar_bottom.load();
          
          videocontainersidebar_bottom.play();
          }
          
          //this.start_timer_sidebar_bottom("");
          
            }
          }
          
          })
          
          
          }
          
        
        }, 2000);
        
        

     



      }).catch((error) => {

      });
    }

    })

    //generating FCM Token For firebase auth
   fetch(url+'fcm/token', {
      method: 'GET',
      headers: {

        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'

      }
    }).then((response) => response.json()).then((responseJson) => {


      this.setState({ "firebase_token": responseJson.data.token })

    })

    $('.li_session').attr('id', 'session_cal');




    window.setInterval(function(){
      if($("#video_top_container").get(0)!=undefined)
      {
            var video = $("#video_top_container").get(0);
      
            if ( video.paused ) {
      
              if(banner_top_reporting_json.start_time!="" && banner_top_reporting_json.start_time!=undefined)
             {
              let today = new Date();
        
              let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
               let unix_tmp = Math.round(+new Date()/1000);
      
      
               let temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Top","duration":"","type":"session","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
      if(banner_top_url_and_redirect[banner_top_play_key]!=undefined)
      {
        let vidunsave_top = document.getElementById("video_top_container");

        let unsave_durationtop= vidunsave_top.currentTime;
  let durationtop=(unsave_durationtop.toFixed(3))-(banner_top_reporting_json.start_timestamp.toFixed(3));      
                temp_json={"start_time":banner_top_reporting_json.start_time,"start_timestamp":"","banner_id":banner_top_url_and_redirect[banner_top_play_key].banner_id,"banner_cat_id":banner_top_reporting_json.banner_cat_id,"position": "Top","duration":durationtop.toFixed(3),"type":"session","type_id":banner_top_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
              
               reporting_json_array.push(temp_json);
      }
      
              
      
              banner_top_reporting_json.start_time="";
              banner_top_reporting_json.end_time="";
      
              temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Top","duration":"","type":"session","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
      
      
              console.log(reporting_json_array)
             }
              
            } else {
      
             if(banner_top_reporting_json.start_time==="" || banner_top_reporting_json.start_time==undefined)
             {
              let today = new Date();
              let vidunsave_top = document.getElementById("video_top_container");

              let unsave_durationtop= vidunsave_top.currentTime;
              let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
              let unix_tmp = Math.round(+new Date()/1000);
              banner_top_reporting_json.start_time=time;
              banner_top_reporting_json.start_timestamp=unsave_durationtop;
              //console.log(banner_top_reporting_json)
      
             }
                
            }
        
            //return false;
          }
      
      
      
      
      
      
      
      
      
      
          if($("#video_bottom_container").get(0)!=undefined)
            {
                  var video_bottom_track = $("#video_bottom_container").get(0);
            
                  if ( video_bottom_track.paused ) {
            
                    if(banner_bottom_reporting_json.start_time!="" && banner_bottom_reporting_json.start_time!=undefined)
                   {
                    let today = new Date();
              
                    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                     let unix_tmp = Math.round(+new Date()/1000);
                     let vidunsave_bottom = document.getElementById("video_bottom_container");

                    let unsave_durationbottom= vidunsave_bottom.currentTime;
               let durationbottom=(unsave_durationbottom.toFixed(3))-(banner_bottom_reporting_json.start_timestamp.toFixed(3));
            
                     let temp_json={"start_time":banner_bottom_reporting_json.start_time,"start_timestamp":"","banner_id":banner_bottom_url_and_redirect[banner_bottom_play_key].banner_id,"banner_cat_id":banner_bottom_reporting_json.banner_cat_id,"position": "Bottom","duration":durationbottom.toFixed(3),"type":"session","type_id":banner_bottom_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
                    
                     reporting_json_array.push(temp_json);
            
                    
            
                    banner_bottom_reporting_json.start_time="";
                    banner_bottom_reporting_json.end_time="";
            
                    temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Bottom","duration":"","type":"session","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
            
            
                    console.log(reporting_json_array)
                   }
                    
                  } else {
            
                   if(banner_bottom_reporting_json.start_time==="" || banner_bottom_reporting_json.start_time==undefined)
                   {
                    let today = new Date();
                    let vidunsave_bottom = document.getElementById("video_bottom_container");

                    let unsave_durationbottom= vidunsave_bottom.currentTime;
              
                    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    let unix_tmp = Math.round(+new Date()/1000);
                    banner_bottom_reporting_json.start_time=time;
                    banner_bottom_reporting_json.start_timestamp=unsave_durationbottom;
                    //console.log(banner_top_reporting_json)
            
                   }
                      
                  }
              
                  //return false;
                }
      
      
      
      
      
      
      
      
      
      
                if($("#video_sidebar_bottom_container").get(0)!=undefined)
            {
                  var video_sidebar_bottom_track = $("#video_sidebar_bottom_container").get(0);
            
                  if ( video_sidebar_bottom_track.paused ) {
            
                    if(banner_sidebar_bottom_reporting_json.start_time!="" && banner_sidebar_bottom_reporting_json.start_time!=undefined)
                   {
                    let today = new Date();
              
                    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                     let unix_tmp = Math.round(+new Date()/1000);
            
                     let vidunsave_sidebar_bottom = document.getElementById("video_sidebar_bottom_container");

                     let unsave_durationsidebar_bottom= vidunsave_sidebar_bottom.currentTime;  
                     let durationsidebarbottom=(unsave_durationsidebar_bottom.toFixed(3))-(banner_sidebar_bottom_reporting_json.start_timestamp.toFixed(3));
                     
                    let temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar-bottom","duration":"","type":"session","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
      
                     if(banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key]!=undefined)
                     {
                      temp_json={"start_time":banner_sidebar_bottom_reporting_json.start_time,"start_timestamp":"","banner_id":banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key].banner_id,"banner_cat_id":banner_sidebar_bottom_reporting_json.banner_cat_id,"position": "Sidebar-bottom","duration":durationsidebarbottom.toFixed(3),"type":"session","type_id":banner_sidebar_bottom_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
                     }
                     reporting_json_array.push(temp_json);
            
                    
            
                     banner_sidebar_bottom_reporting_json.start_time="";
                     banner_sidebar_bottom_reporting_json.end_time="";
            
                    temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar-bottom","duration":"","type":"session","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
            
            
                    console.log(reporting_json_array)
                   }
                    
                  } else {
            
                   if(banner_sidebar_bottom_reporting_json.start_time==="" || banner_sidebar_bottom_reporting_json.start_time==undefined || banner_sidebar_bottom_reporting_json.start_time=="NaN")
                   {
                    let today = new Date();
                    let vidunsave_sidebar_bottom = document.getElementById("video_sidebar_bottom_container");

                    let unsave_durationsidebar_bottom= vidunsave_sidebar_bottom.currentTime;
                    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    let unix_tmp1 = Math.round(+new Date()/1000);
                    banner_sidebar_bottom_reporting_json.start_time=time;
                    banner_sidebar_bottom_reporting_json.start_timestamp=unsave_durationsidebar_bottom;
                    console.log(banner_sidebar_bottom_reporting_json)
            
                   }
                      
                  }
              
                  //return false;
                }
      
      
                if($("#video_sidebar_top_container").get(0)!=undefined)
                {
                      var video = $("#video_sidebar_top_container").get(0);
                
                      if ( video.paused ) {
                
                        if(banner_sidebar_top_reporting_json.start_time!="" && banner_sidebar_top_reporting_json.start_time!=undefined)
                       {
                        let today = new Date();
                  
                        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                         let unix_tmp = Math.round(+new Date()/1000);
                
                         let vidunsave_sidebar_top = document.getElementById("video_sidebar_top_container");

                         let unsave_durationsidebartop= vidunsave_sidebar_top.currentTime;
                   let durationsidebartop=(unsave_durationsidebartop.toFixed(3))-(banner_sidebar_top_reporting_json.start_timestamp.toFixed(3));                
                         let temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar-Top","duration":"","type":"session","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
                if(banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key]!=undefined)
                {
                          temp_json={"start_time":banner_sidebar_top_reporting_json.start_time,"start_timestamp":"","banner_id":banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key].banner_id,"banner_cat_id":banner_sidebar_top_reporting_json.banner_cat_id,"position": "Sidebar-Top","duration":durationsidebartop.toFixed(3),"type":"session","type_id":banner_sidebar_top_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
                        
                         reporting_json_array.push(temp_json);
                }
                
                        
                
                        banner_sidebar_top_reporting_json.start_time="";
                        banner_sidebar_top_reporting_json.end_time="";
                
                        temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar-Top","duration":"","type":"session","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
                
                
                        console.log(reporting_json_array)
                       }
                        
                      } else {
                
                       if(banner_sidebar_top_reporting_json.start_time==="" || banner_sidebar_top_reporting_json.start_time==undefined)
                       {
                        let today = new Date();
                        let vidunsave_sidebar_top = document.getElementById("video_sidebar_top_container");

                        let unsave_durationsidebartop= vidunsave_sidebar_top.currentTime;
                  
                        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                        let unix_tmp = Math.round(+new Date()/1000);
                        banner_sidebar_top_reporting_json.start_time=time;
                        banner_sidebar_top_reporting_json.start_timestamp=unsave_durationsidebartop;
                        //console.log(banner_top_reporting_json)
                
                       }
                          
                      }
                  
                      //return false;
                    }
      
      
      
      
      
      
          
          }, 500);
      








    window.setInterval(function(){

      if(banner_top_type==='image')
      {
        top_image_change_time=top_image_change_time+1;
        if(banner_top_duration==parseInt(top_image_change_time))
        {
        if(banner_top_play_key<(banner_top_url_and_redirect.length-1))
            {

              banner_top_play_key=banner_top_play_key+1;
      if(banner_top_url_and_redirect[banner_top_play_key]!=undefined)
      {
      let new_img = banner_top_url_and_redirect[banner_top_play_key].image;
      let imagecontainertop = document.getElementById('top_image');
      imagecontainertop.setAttribute('src', new_img);

      }
      
            }

            else
            {

              banner_top_play_key=0;
              if(banner_top_url_and_redirect[banner_top_play_key]!=undefined)
              {
              let new_img = banner_top_url_and_redirect[banner_top_play_key].image;
              let imagecontainertop = document.getElementById('top_image');
              imagecontainertop.setAttribute('src', new_img);
        
              }

            }
            top_image_change_time=0;
      }
    }


      if(banner_sidebar_top_type==='image')
      {
        sidebar_top_image_change_time=sidebar_top_image_change_time+1;
        if(banner_sidebar_top_duration==parseInt(sidebar_top_image_change_time))
        {
        if(banner_sidebar_top_play_key<(banner_sidebar_top_url_and_redirect.length-1))
            {

              banner_sidebar_top_play_key=banner_sidebar_top_play_key+1;
      if(banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key]!=undefined)
      {
      let new_img = banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key].image;
      let imagecontainersidebartop = document.getElementById('sidebar_top_image');
      imagecontainersidebartop.setAttribute('src', new_img);

      }
      
            }

            else
            {

              banner_sidebar_top_play_key=0;
      if(banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key]!=undefined)
      {
      let new_img = banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key].image;
      let imagecontainersidebartop = document.getElementById('sidebar_top_image');
      imagecontainersidebartop.setAttribute('src', new_img);

      }

            }
            sidebar_top_image_change_time=0
          }
      }



      if(banner_sidebar_bottom_type==='image')
      {
        sidebar_bottom_image_change_time=sidebar_bottom_image_change_time+1;
        if(banner_sidebar_bottom_duration==parseInt(sidebar_bottom_image_change_time))
        {
        if(banner_sidebar_bottom_play_key<(banner_sidebar_bottom_url_and_redirect.length-1))
            {
      
              banner_sidebar_bottom_play_key=banner_sidebar_bottom_play_key+1;
      if(banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key]!=undefined)
      {
      let new_img = banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key].image;
      let imagecontainersidebarbottom = document.getElementById('sidebar_bottom_image');
      imagecontainersidebarbottom.setAttribute('src', new_img);
      
      }
      
            }
      
            else
            {
      
              banner_sidebar_bottom_play_key=0;
      if(banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key]!=undefined)
      {
      let new_img = banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key].image;
      let imagecontainersidebarbottom = document.getElementById('sidebar_bottom_image');
      imagecontainersidebarbottom.setAttribute('src', new_img);
      
      }
      
            }

            sidebar_bottom_image_change_time=0
          }
      }


      if(banner_bottom_type==='image')
{
  bottom_image_change_time=bottom_image_change_time+1;
  if(banner_bottom_duration==parseInt(bottom_image_change_time))
  {
  if(banner_bottom_play_key<(banner_bottom_url_and_redirect.length-1))
      {

        banner_bottom_play_key=banner_bottom_play_key+1;
if(banner_bottom_url_and_redirect[banner_bottom_play_key]!=undefined)
{
let new_img = banner_bottom_url_and_redirect[banner_bottom_play_key].image;
let imagecontainerbottom = document.getElementById('bottom_image');
imagecontainerbottom.setAttribute('src', new_img);

}

      }

      else
      {

        banner_bottom_play_key=0;
if(banner_bottom_url_and_redirect[banner_bottom_play_key]!=undefined)
{
let new_img = banner_bottom_url_and_redirect[banner_bottom_play_key].image;
let imagecontainerbottom = document.getElementById('bottom_image');
imagecontainerbottom.setAttribute('src', new_img);

}

      }
      bottom_image_change_time=0;
    }
}
      

    }, 1000);

  }

  banner_click_track(banner_id,content_type,content_type_id,banner_position)
  {

    let formdataban = new FormData();
    formdataban.append("banner_id", banner_id)
    formdataban.append("content_type", content_type)
    formdataban.append("content_type_id", content_type_id)
    formdataban.append("banner_position", banner_position)

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
    fetch(url+'banner/bannerclick', {
      method: 'POST',
      headers: {
        
        
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),

        'version': 'rjsw 1.1.1',
        'OS':os
        
      },
      body:formdataban,
    }).then((response) => response.json()).then((responseJson) => {

      
     
  
  }).catch((error) => {


    
     
    });
  }
 
  //Send session reservation request

  reserve_send() {
    this.setState({ "this.state.button_disabled": 1 })
    var error_flag = 0;

    if (this.state.query == "") {

      this.setState({ "this.state.button_disabled": 0 })

      this.setState({ "err_msg": "Please Enter Your Query." });
    }

    else {
      if (this.state.single_data.my_participant_id == "") {

        let parser = {
          "session_id": this.props.match.params.id,
          "question": this.state.query,
          "my_participant_id": "",
          "attachFilePath": (this.state.upload_url == undefined) ? '' : this.state.upload_url
        }





       fetch(url+'knwlgmastersession/submitquery', {
          method: 'POST',
          headers: {
            'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
            'version': 'rjsw 1.1.1'
          },
          body: JSON.stringify(parser),
        })
          .then((response) => response.json())
          .then((responseJson) => {


            if (responseJson.status_code == '200') {
              reactLocalStorage.set('@ClirnetStore:my_sessions', 1);
              var obr = this;
              setTimeout(function () {
                obr.props.history.push({
                  pathname: `/Sessions`
                })

              }, 100);
            }

            else {
              this.setState({ "err_msg": responseJson.message });
            }

          })
          .catch((error) => {

            this.setState({ "err_msg": "Something went Wrong" });
          });

      }
      else {


        let parser = {
          "session_id": this.props.match.params.id,
          "question": this.state.query,
          "my_participant_id": this.state.single_data.my_participant_id,
          "attachFilePath": this.state.upload_url
        }



        //Edit Session reservation query

       fetch(url+'knwlgmastersession/editquery', {
          method: 'POST',
          headers: {
            'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
            'version': 'rjsw 1.1.1'
          },
          body: JSON.stringify(parser),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status_code == '200') {
              reactLocalStorage.set('@ClirnetStore:my_sessions', 1);
              var obr = this;
              setTimeout(function () {
                obr.props.history.push({
                  pathname: `/Sessions`
                })

              }, 100);

            }

            else {
              this.setState({ "err_msg": responseJson.message });
            }

          })
          .catch((error) => {

            this.setState({ "err_msg": "Something went Wrong" });
          });
      }
    }
  }
  //Redirect to medwiki detail from related listing
  redirect_to_compendium_detail(id) {
    reactLocalStorage.set('@ClirnetStore:source','Session Reservation Section');
    this.props.history.push({
      pathname: '/Feeddetail/' + id + ''
    })
  }
  //Select predefined query
  open_other(text) {
    this.setState({ "query": text });
  }





  componentWillUnmount()
  {

     top_image_change_time=0;
 sidebar_top_image_change_time=0;
 sidebar_bottom_image_change_time=0;
 bottom_image_change_time=0;
    //

    if(document.getElementById("video_top_container")!=undefined && document.getElementById("video_top_container")!=null)
    {
    var vidunsave_top = document.getElementById("video_top_container");

   var unsave_durationtop= vidunsave_top.currentTime;
   if(unsave_durationtop!=0 && banner_top_reporting_json.start_time!="")
   {


    let today = new Date();
            
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
   let temp_json={"start_time":banner_top_reporting_json.start_time,"start_timestamp":"","banner_id":banner_top_url_and_redirect[banner_top_play_key].banner_id,"banner_cat_id":banner_top_reporting_json.banner_cat_id,"position": "Top","duration":unsave_durationtop,"type":"session","type_id":banner_top_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
   reporting_json_array.push(temp_json);
   }
  }



  if(document.getElementById("video_bottom_container")!=undefined && document.getElementById("video_bottom_container")!=null)
    {
    var vidunsave_bottom = document.getElementById("video_bottom_container");

   var unsave_durationbottom= vidunsave_bottom.currentTime;
   if(unsave_durationbottom!=0 && banner_bottom_reporting_json.start_time!="")
   {


    let today = new Date();
            
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
    let temp_json={"start_time":banner_bottom_reporting_json.start_time,"start_timestamp":"","banner_id":banner_bottom_url_and_redirect[banner_bottom_play_key].banner_id,"banner_cat_id":banner_bottom_reporting_json.banner_cat_id,"position": "Bottom","duration":unsave_durationbottom,"type":"session","type_id":banner_bottom_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
    reporting_json_array.push(temp_json);
   }
  }


  if(document.getElementById("video_sidebar_bottom_container")!=undefined && document.getElementById("video_sidebar_bottom_container")!=null)
  {
  var vidunsave_sidebar_bottom = document.getElementById("video_sidebar_bottom_container");
  
  var unsave_durationsidebar_bottom= vidunsave_sidebar_bottom.currentTime;
  if(unsave_durationsidebar_bottom!=0 && banner_sidebar_bottom_reporting_json.start_time!="")
  {
  
  
  let today = new Date();
          
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  
  let temp_json={"start_time":banner_sidebar_bottom_reporting_json.start_time,"start_timestamp":"","banner_id":banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key].banner_id,"banner_cat_id":banner_sidebar_bottom_reporting_json.banner_cat_id,"position": "sidebar_bottom","duration":unsave_durationsidebar_bottom,"type":"session","type_id":banner_sidebar_bottom_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
  reporting_json_array.push(temp_json);
  }
  }



  if(document.getElementById("video_sidebar_top_container")!=undefined && document.getElementById("video_sidebar_top_container")!=null)
  {
  var vidunsave_sidebar_top = document.getElementById("video_sidebar_top_container");
  
  var unsave_durationsidebar_top= vidunsave_sidebar_top.currentTime;
  if(unsave_durationsidebar_top!=0 && banner_sidebar_top_reporting_json.start_time !="")
  {
  
  
  let today = new Date();
          
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  
  let temp_json={"start_time":banner_sidebar_top_reporting_json.start_time,"start_timestamp":"","banner_id":banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key].banner_id,"banner_cat_id":banner_sidebar_top_reporting_json.banner_cat_id,"position": "sidebar_top","duration":unsave_durationsidebar_top,"type":"session","type_id":banner_sidebar_top_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
  reporting_json_array.push(temp_json);
  }
  }


   

    if(reporting_json_array.length>0)
    {

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


    fetch(url+'banner/addreport', {
      method: 'POST',
      headers: {
        
        
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),

        'version': 'rjsw 1.1.1',
        'OS':os
        
      },
      body: JSON.stringify(reporting_json_array),
    }).then((response) => response.json()).then((responseJson) => {

      reporting_json_array=[];
     
  
  }).catch((error) => {


    reporting_json_array=[];
     
    });

  }









     banner_top_reporting_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Top","duration":0,"type":"session","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
 banner_bottom_reporting_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Bottom","duration":0,"type":"session","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
 banner_sidebar_bottom_reporting_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar_Bottom","duration":0,"type":"session","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
 banner_sidebar_top_reporting_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar_Top","duration":0,"type":"session","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
 reporting_json_array=[];
    banner_sidebar_top_type="";
    banner_sidebar_top_label="";
    banner_sidebar_top_category_id="";
    banner_sidebar_top_width="";
    banner_sidebar_top_height="";
    banner_sidebar_top_duration="";
    banner_sidebar_top_url_and_redirect=[];
    banner_sidebar_top_play_key=0;
    banner_sidebar_top_video_change_permission=0;
    banner_sidebar_top_onclick_pause=0;
    myTimer_sidebar_top="";
    clearInterval(myTimer_sidebar_top);
clearTimeout(myTimer_sidebar_top_main);
clearInterval(myTimer_sidebar_top_temp);
myTimer_sidebar_top_main="";
myTimer_sidebar_top_temp=""
timerval_sidebar_top=""
//banner_top_reporting_json={};
   
   
   
    banner_sidebar_bottom_type="";
    banner_sidebar_bottom_label="";
    banner_sidebar_bottom_category_id="";
    banner_sidebar_bottom_width="";
    banner_sidebar_bottom_height="";
    banner_sidebar_bottom_duration="";
    banner_sidebar_bottom_url_and_redirect=[];
    banner_sidebar_bottom_play_key=0;
    banner_sidebar_bottom_video_change_permission=0;
    banner_sidebar_bottom_onclick_pause=0;
    myTimer_sidebar_bottom="";

    clearInterval(myTimer_sidebar_bottom);
clearTimeout(myTimer_sidebar_bottom_main);
clearInterval(myTimer_sidebar_bottom_temp);
myTimer_sidebar_bottom_main="";
myTimer_sidebar_bottom_temp=""
timerval_sidebar_bottom=""
   
   
    banner_bottom_type="";
    banner_bottom_label="";
    banner_bottom_category_id="";
    banner_bottom_width="";
    banner_bottom_height="";
    banner_bottom_duration="";
    banner_bottom_url_and_redirect=[];
    banner_bottom_play_key=0;
    banner_bottom_video_change_permission=0;
    banner_bottom_onclick_pause=0;
    myTimer_bottom="";
    clearInterval(myTimer_bottom);
    clearTimeout(myTimer_bottom_main);
    clearInterval(myTimer_bottom_temp);
    myTimer_bottom_main="";
    myTimer_bottom_temp=""
    timerval_bottom=""
   
   
    banner_top_type="";
    banner_top_label="";
    banner_top_category_id="";
    banner_top_width="";
    banner_top_height="";
    banner_top_duration="";
    banner_top_url_and_redirect=[];
    banner_top_play_key=0;
    banner_top_video_change_permission=0;
    banner_top_onclick_pause=0;
    myTimer_sidebar_top="";
    myTimer_small_value_top="";
    myTimer_small_value_top_temp="";
    clearInterval(myTimer_top);
    clearTimeout(myTimer_top_main);
    clearInterval(myTimer_top_temp);
    myTimer_top="";
    myTimer_top_main="";
    myTimer_top_temp=""
    timerval_top=""

    
   
    
    
  }


  is_on_screen_top(id){

    //alert()

    var temp_is_sc=$("#"+id+"");
    var win = $(window);
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
    var bounds = temp_is_sc.offset();
    if(bounds!=undefined)
    {
    bounds.right = bounds.left + temp_is_sc.outerWidth();
    bounds.bottom = bounds.top + temp_is_sc.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right ||    viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    }
 }

 is_on_screen_bottom(id){

  var temp_is_sc_bottom=$("#"+id+"");
  var win_bottom = $(window);
  var viewport_bottom = {
      top : win_bottom.scrollTop(),
      left : win_bottom.scrollLeft()
  };
  viewport_bottom.right = viewport_bottom.left + win_bottom.width();
  viewport_bottom.bottom = viewport_bottom.top + win_bottom.height();
  var bounds_bottom = temp_is_sc_bottom.offset();
  if(bounds_bottom!=undefined)
  {
  bounds_bottom.right = bounds_bottom.left + temp_is_sc_bottom.outerWidth();
  bounds_bottom.bottom = bounds_bottom.top + temp_is_sc_bottom.outerHeight();

  return (!(viewport_bottom.right < bounds_bottom.left || viewport_bottom.left > bounds_bottom.right ||    viewport_bottom.bottom < bounds_bottom.top || viewport_bottom.top > bounds_bottom.bottom));
  }
}

is_on_screen_sidebar_bottom(id){

  var temp_is_sc_sidebar_bottom=$("#"+id+"");
  var win_sidebar_bottom = $(window);
  var viewport_sidebar_bottom = {
      top : win_sidebar_bottom.scrollTop(),
      left : win_sidebar_bottom.scrollLeft()
  };
  viewport_sidebar_bottom.right = viewport_sidebar_bottom.left + win_sidebar_bottom.width();
  viewport_sidebar_bottom.sidebar_bottom = viewport_sidebar_bottom.top + win_sidebar_bottom.height();
  var bounds_sidebar_bottom = temp_is_sc_sidebar_bottom.offset();
  if(bounds_sidebar_bottom!=undefined)
  {
  bounds_sidebar_bottom.right = bounds_sidebar_bottom.left + temp_is_sc_sidebar_bottom.outerWidth();
  bounds_sidebar_bottom.sidebar_bottom = bounds_sidebar_bottom.top + temp_is_sc_sidebar_bottom.outerHeight();

  return (!(viewport_sidebar_bottom.right < bounds_sidebar_bottom.left || viewport_sidebar_bottom.left > bounds_sidebar_bottom.right ||    viewport_sidebar_bottom.sidebar_bottom < bounds_sidebar_bottom.top || viewport_sidebar_bottom.top > bounds_sidebar_bottom.sidebar_bottom));
  }
}


is_on_screen_sidebar_top(id){

  var temp_is_sc_sidebar_top=$("#"+id+"");
  var win_sidebar_top = $(window);
  var viewport_sidebar_top = {
      top : win_sidebar_top.scrollTop(),
      left : win_sidebar_top.scrollLeft()
  };
  viewport_sidebar_top.right = viewport_sidebar_top.left + win_sidebar_top.width();
  viewport_sidebar_top.sidebar_top = viewport_sidebar_top.top + win_sidebar_top.height();
  var bounds_sidebar_top = temp_is_sc_sidebar_top.offset();
  if(bounds_sidebar_top!=undefined)
  {
  bounds_sidebar_top.right = bounds_sidebar_top.left + temp_is_sc_sidebar_top.outerWidth();
  bounds_sidebar_top.sidebar_top = bounds_sidebar_top.top + temp_is_sc_sidebar_top.outerHeight();

  return (!(viewport_sidebar_top.right < bounds_sidebar_top.left || viewport_sidebar_top.left > bounds_sidebar_top.right ||    viewport_sidebar_top.sidebar_top < bounds_sidebar_top.top || viewport_sidebar_top.top > bounds_sidebar_top.sidebar_top));
  }
}

pointTextValidation(point){
  if(point <= 1){
    return ' Point'
  }else{
    return ' Points'
  }
}

onPollSubmit(arr_new,options,survey_id,point,i)  // for single type questions
      {
          console.log('On poll submit'+'survey_points\n'+point)
          arr_new[0].selectedIndex = i;  
          // if (window.confirm('Do You To Submit Poll?')) {  
              this.submitPollAnswer(survey_id,arr_new,point,i)
              this.setState({checkedRadio: survey_id+i});
          // }
          
      }

      submitPollAnswer(id,answerjson,point,boxIndex)
      { 
          // console.log('dataJson'+'survey_id'+id);
          if(id == null || id == '' || id == undefined || answerjson == null || answerjson == ''|| answerjson == undefined){
              console.log('id or answer can not be empty')
          }else{
          let answerData = { 
              'survey_id': id,  
              'answer_json': JSON.stringify(answerjson)
          }
          fetch(url+'survey/pollAnswer', {  
          method: 'POST',
              headers: {
              'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true), 
              'version': 'rjsw 1.1.1'
              },
              body:JSON.stringify(answerData),  
              }).then((response) => response.json()).then((responseJson) => {  
              // alert('Congrats! You got '+JSON.stringify(responseJson)+' Points')  
              let status_code = responseJson.status_code;
              if(status_code == 200){ 
                  let responseData = responseJson.data;  
                  this.addPoints(id,point) 
                  let name = 'option1'+id
                  let boxId = 'option1'+id+boxIndex

                  $('input[id='+boxId+']').attr("checked",true);
                  $('input[id='+boxId+']').addClass("surveyPollsRadioCheckdF"); 
                  $('input[name='+name+']').attr("disabled",true);  
                  this.getPollAnswer(id,boxIndex);
              } 
              }).catch((error) => {
                  console.log("Error"+error);
              });
          }
      }

      addPoints(id,survey_points)
      {
      if(id == '' || id == undefined){
      //   console.log('addPoints'+id+'::'+survey_points)
      }else{
      let pointsData = {
        'survey_id':id,
        'point':survey_points
      } 
      fetch(url+'survey/addpoint', { 
        method: 'POST',
        body: JSON.stringify(pointsData), 
        headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'
        }
        }).then((response) => response.json()).then((responseJson) => {
         let responseData = responseJson.data;
         let success = responseJson.status_code;
         if(success == 200){
         }
         else{
          alert("Failed to update point");
         }
        }).catch((error) => { 
            console.log("Error"+error);
        });  
      }
    }
    getPollAnswer(id,boxIndex){
      if(id == '' || id == undefined)
      {
      
      }else{    
          fetch(url+'survey/pollResult?id='+id, { 
            method: 'GET', 
            headers: {
            'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
            'version': 'rjsw 1.1.1'
            }
            }).then((response) => response.json()).then((responseJson) => {
             let responseData = responseJson.data;
             let success = responseJson.status_code;
             let parentDivId = '#srvPollResult'+id;
             let boxId = '.srvPollsRadio'+id;
             if(success == 200){
              let _this = this; 
              let eleArr = [];
              let mData = JSON.parse(unescape(responseData)); 
              mData.map(function (i){   
              $(boxId).hide(500, function(){ $(this).remove();});
              let currentOption = i.options
              let selectedIndexPoll = i.selectedIndex;
              let resultOpt = _this.renderPollResult(currentOption,selectedIndexPoll) //ReactHtmlParser("<div class='colorBlue'>hi</div>");
              $(parentDivId).show(500, function(){$(this).html(resultOpt);});

              });    
              this.refresh();  
             } 
             else{
              // alert("Failed to update point");
             }
            }).catch((error) => { 
                console.log("Error"+error);
            });  
      }
  }

    renderPollResult = (currentOptions,selectedIndexPoll)=>{ 
        let opt ='';
            currentOptions.map((options,i)=>
            {  
                if(i == selectedIndexPoll){
                    opt+='<div class="srvPollsProgressBar"><div class="srvPollsProgressBarIn font_12px colorBlue font600 ">'+options.label
                    opt+='<span class="srvPollsProgressBarValue">'+options.vote+'%</span></div><div class="myprogress"><div class="myprogress_bar" style="width:'+options.vote+'%"></div></div></div>' 
                }else{
                    opt+='<div class="srvPollsProgressBar"><div class="srvPollsProgressBarIn font_12px colorBlack font600 ">'+options.label
                    opt+='<span class="srvPollsProgressBarValue">'+options.vote+'%</span></div><div class="myprogress"><div class="myprogress_bar" style="width:'+options.vote+'%"></div></div></div>' 
                }
            })
        return opt;    
    }

    renderPolls = () => 
      {
          let isEven = false; 
          const arrLen = poll_list_data.length;
          if(arrLen % 2 == 0) {
            isEven  = true;
          }
          else { 
            isEven = false
          }
          console.log('in render polls'+poll_list_data.length)
          return(
              <>
                  {(poll_list_data.length == 0)?
                  <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={80} width={80} visible={true} />:null} 
                  {(poll_list_data.length > 0) ?
                  <div  className="full_width surveyRightMasonry">
                      <>
                      <Masonry
                          className={'my-gallery-class'} // default ''
                          elementType={'ul'} // default 'div'
                          options={masonryOptions} // default {}
                          disableImagesLoaded={false} // default false
                          updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                          //imagesLoadedOptions={imagesLoadedOptions} // default {}
                          >  
                          {poll_list_data.map((r, i) => (
                            this.renderPoll(r.json_data,r.survey_id,r.point)
                          // (arrLen == 1)?this.renderLastPoll(r.json_data,r.survey_id,r.point):
                          // <> 
                          // {(isEven == false && i == arrLen-1)?
                          //  this.renderPoll(r.json_data,r.survey_id,r.point)
                          //  :this.renderLastPoll(r.json_data,r.survey_id,r.point)} 
                          //  </>
                          ))} 
                      </Masonry>
                      </> 
                  </div>:null
                  } 
              </>
          )
      }

  
      renderPoll(dataJson,survey_id,point) { 
        // console.log('render Polls'+point)
        let mData = JSON.parse(unescape(dataJson));
        // console.log('in ready polls'+mData)
        let sData = mData.surveys;
        let arr_new = Object.keys(sData).map(function (k){
        return sData[k]; 
        });
        let question = arr_new[question_no].question;
        let type = arr_new[question_no].type;
        let currentOptions = arr_new[question_no].options;
        let correctoption = arr_new[question_no].correctoption;

            return(
                <div className="col-sm-12 col-xs-12 masonryBoxFeed"> 
                    <div className="full_width radius-6 feedRow srvPolls">
                    <span class="font_12px colorWhite radius-40 text-center font600 float-right srvPollsPoint">{point} {this.pointTextValidation(point)}</span>
                    <div className="clearfix"></div>
                        <h4 className="font_14px colorBlack font700 srvPollsTtl srvPollsTtlPnt">
                        
                        <div className="clearfix"></div>
                        {question}   
                        </h4>
                            
                        <div className="clearfix"></div>
                        <div className="full_width srvPollsOptionSet55">  
                        {currentOptions.map((options,i)=>
                        <>  
                            <Form.Check id={"option1"+survey_id+i} className={"srvPollsRadio "+ "srvPollsRadio"+survey_id} type="radio" ref={'ref_' + i} name={"option1"+survey_id} onChange={this.onPollSubmit.bind(this,arr_new,options,survey_id,point,i)}  value={options.value} label={options.label} checked={this.state.checkedRadio == survey_id+i}/>
                            <div id={"srvPollResult"+survey_id}>
                            {
                                // (resultOption != null|| resultOption != undefined)?this.renderPollResult(resultOption):null
                            }
                            </div>
                        </>
                        )}
                        <div className="full_width text-center srvPollPowerBy">
                        {(clientLogo == '' || clientLogo == null)? 
                        <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={40} width={40} visible={true} />:
                        <>
                            <span className="font_10px font500 colorBlack">{(isSponsored == true)?'Powered by':'Powered by'}</span> 
                            <img src={clientLogo} width="224" height="63" alt="logo" title="clirnet" />
                        </>
                        }
                        </div> 
                        </div> 
                    </div> 
                </div>
            ) 
    }

    getMeetingDetails(session_id){ 
      ToastsStore.error("Please wait")
      fetch(url+'knwlgmastersession/getMeetingDetailsBySessionID?id='+session_id, {  
      method: 'GET',
          headers: {
          'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true), 
          'version': 'rjsw 1.1.1'
          },
          }).then((response) => response.json()).then((responseJson) => {  
          let status_code = responseJson.status_code;
          let responseData = responseJson.data;
          let session_status;
          if(status_code == 200){   
              meetConfig.platform_name = responseData.platform_name;
              meetConfig.meetingNumber = responseData.meeting_login_id;
              meetConfig.passWord = responseData.meeting_login_password; 
              session_status = responseData.session_status; 
              if(meetConfig.meetingNumber != null || meetConfig.meetingNumber != '' || meetConfig.meetingNumber != undefined && meetConfig.userEmail != null || meetConfig.userEmail != '' || meetConfig.userEmail != undefined && meetConfig.userName != null || meetConfig.userName != ''){
                  let zoom_url = zoom_root_url+meetConfig.meetingNumber+'/'+meetConfig.userEmail+'/'+meetConfig.userName+'/'+meetConfig.passWord//http://localhost:3001/join_webinar/#/Zoom/4858799231/sumit@mail.com/Sumit
                  this.JoinMeeting(zoom_url)
               }
               else{
                  ToastsStore.error("Sorry! unable to create meeting link")
               }
          }else{ 
              ToastsStore.error("unable to fetch meeting details! check network")
          }
          if(session_status == '2' && session_status != 'undefined'){

          }else{
              ToastsStore.error("This session is not live now")
          }
          }).catch((error) => {
              console.log("Error"+error);
          });
      }

      JoinMeeting(url){ 
        var win = window.open(url, '_blank');  
        if (win) {
            //Browser has allowed it to be opened
            win.focus();
        } else {
            //Browser has blocked it
            alert('Please allow popups for this website');
        }    
    }


    getUserDetail(id){
      let first_name = reactLocalStorage.get('@ClirnetStore:first_name', true)
      let last_name = reactLocalStorage.get('@ClirnetStore:last_name', true)
      let email =  reactLocalStorage.get('@ClirnetStore:email', true);
      if(first_name == 'true' || first_name == 'undefined'){
          first_name = ''
      }
      if(last_name == 'true' || last_name == 'undefined'){
          last_name = ''
      }
      let full_name = 'Dr. '+ first_name + ' ' + last_name
      if(email == 'true' || email == 'undefined'){
          email = first_name+'@Clirnet.com' 
      }else{
          meetConfig.userEmail = email 
      } 
      meetConfig.userName = full_name
      this.getMeetingDetails(id)
  }


    onJoinBtnClick(id){ 
      this.getUserDetail(id)
    }

  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 400,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      autoplay:true,
    };

    return (





      <div className={ isMobile == true ? 'full_width wrap_body mblScreen' : 'full_width wrap_body dskScreen'}>
      
            
 
        <Header history={this.props.history}  page_name={pageNames}/>
        <section className="full_width body_area">
          <div className="container">


            <div className="row">

            <Banner type_id={this.id} banner_position={1} unmount_call={1} type={"LiveSessionDetails"}  api_call={1} before_unload_call={1}/>
              <section className="full_width ssnDtls">
                <div className="medWikiLeft">
                  <div className="full_width radius-6 ssnDtlsMain">
                    <div className="col justify-content-between feedRowTop">
                      <div className="row">
                        <div className="col">
                          <span class="font_14px radius-6 font600 colorBlue ssnDtlType">{(this.state.single_data.ms_cat_name=="MasterCircle")?
          <img src={mastercirclelogo} width="24" height="24" alt="icon"/> :null}
          {(this.state.single_data.ms_cat_name=="MasterConsult")?
          <img src={masterconsultlogo} width="24" height="24" alt="icon"/>:null}


{(this.state.single_data.ms_cat_name=="MasterCircle")?
          <span className="colorGreen"> MasterCircle</span> :null}
          {(this.state.single_data.ms_cat_name=="MasterConsult")?
          <span className="colorGreen"> MasterConsult</span>:null}
            </span>
            {(this.state.single_data.session_status!=4 )?
                          <span class="font_14px font600 feedRow_date ssnDtl_date ssnDtl_dateDesk">
                            <img src={calenderIcon} /> {this.state.single_data.display_date_format}<span> | </span>{this.state.single_data.display_date}</span>:
                            <span class="font_14px font600 feedRow_date ssnDtl_date ssnDtl_dateDesk">Upcoming TBA
                            </span>}
                        </div>
                        <div className="col-auto">
                          {/* {(sponser_img != this.state.single_data.client_logo) ?
                            <div className="feedRow_sponsors">
                              <span className="font_10px font500 colorBlack">Powered by</span>
                              {(sponser_img != "" && sponser_img != undefined) ?
                                <div>
                                  <img src={sponser_img} width="224" height="63" alt="logo" title="clirnet" />
                                  <span className="feedRow_sponsorsDvdr"></span>
                                </div>
                                :
                                null}
                              {(this.state.single_data.client_logo != "" && this.state.single_data.client_logo != undefined) ?
                                <img src={this.state.single_data.client_logo} width="224" height="63" alt="logo" title="clirnet" /> :
                                null}
                            </div> : */}
                            {(this.state.single_data.sponsor_logo !="" && this.state.single_data.sponsor_logo !=null && this.state.single_data.sponsor_logo !=undefined)?
                            <div className="feedRow_sponsors">
 <span className="font_10px font500 colorBlack">Powered by</span>
                              
                                <img src={this.state.single_data.sponsor_logo} width="224" height="63" alt="logo" title="clirnet" /> 
                               
                            </div>:
                            <div className="feedRow_sponsors">
                            <span className="font_10px font500 colorBlack">Powered by</span>
                                                         
                                                           <img src={this.state.single_data.client_logo} width="224" height="63" alt="logo" title="clirnet" /> 
                                                          
                                                       </div>}
                        </div>
                      </div>
                    </div>

                    <span class="font_14px font600 feedRow_date ssnDtl_date ssnDtl_dateRes">
                      <img src={calenderIcon} /> {this.state.single_data.display_date_format}<span> | </span>{this.state.single_data.display_date}</span>
                    
                    {(this.state.single_data.session_status == 2 || this.state.single_data.session_status == '2')?
                    <span className="font600 colorBlack feed_right_SsnBoxLive ml-2 mb-2">Live</span>:null } 
                    <div className="full_width feedRow_ttl">
                      <a href="javascript:void(0);" class="font_18px colorBlack font600">{this.state.single_data.session_topic}</a>
                    </div>


                    
                    <div className="clearfix"></div>
                    <div className="col ssnDtls2nd">
                      <div className="row">
                        {(this.state.single_data.length != 0) ?
                          <div className="col-sm-6 col-12 ssnDtlsDoc">
                            <Slider {...settings}  className="full_width radius-6 text-center ssnDtlsDocIn ssnDtlsDocInSlider">
                            {this.state.single_data.session_doctor_entities.map((single_data,i)=>
                            <div className="ssnDtlsDocInItem">
                              <div className="radius-100 ssnDtlsDocPic">
                                <img src={single_data.session_doctor_image} className="object_fit_cover radius-100" />
                              </div> 
                              <div className="clearfix"></div>
                              <h2 className="colorBlack font700 font_16px ssnDtlsDocName">
                                {single_data.session_doctor_name} 
                                <span className="colorGrey font_12px font600">{single_data.DepartmentName}</span></h2>
                              <div className="full_width ssnDtlsDocCont">
                                {single_data.profile.substring(0, 100)}.... 
                             </div>
                              <a href="javascript:void(0);" onClick={() => {this.onViewDetailsClick(i); this.setState({ "showModal": true });}} className="colorBlue font700 font_14px">View Details</a>
                            </div>)} 
                            </Slider>
                          </div> : null} 

                        <div className="col-sm-6 col-12 ssnDtlsfrm">
                          <div className="full_width ssnDtlsfrmIn">
                            {/* <div className="full_width slotsAvl">
                              <h2 className="font600 font_16px colorBlack">Slots Available :
                     <span> {this.state.single_data.total_booking_left}/{this.state.single_data.total_seat}</span></h2>
                              <ProgressBar now={this.state.single_data.percentage} />
                            </div> */}  
                            <div className="full_width ssnDtlQuery">
                              <h2 className="font600 font_16px colorBlack">Your Query</h2>

                              {session_queries.map((r, index) => (
                                <div className="cmnCheckBox_row cmnRadio_row">
                                  {(r === this.state.query) ?
                                    <input className="form-check-input" checked={true} id="cancelation-1" type="radio" disabled /> :
                                    <input className="form-check-input" id="cancelation-1" type="radio" disabled/>} 
                                  <label className="font600 font_12px colorBlack form-check-label" disabled for="cancelation-1">{r}</label>
                                </div>


                              ))}

                              <Form.Control as="textarea" rows="4" name="body" className="font_14px"
                                value={this.state.query} placeholder="You Don't Set a Query" disabled/>
                              <div className="clearfix"></div>
                              <span style={{ "color": "red" }}>{this.state.err_msg}</span> 
                              {(this.state.single_data.session_status == 2 || this.state.single_data.session_status == '2')?
                              <>
                                <button onClick={() => {this.onJoinBtnClick(this.uri_id);}} className="cmnBtn btnBlue mt-2" type="button">Join Now</button>
                              </>:null}
                            </div> 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* //////////////////////Added by sumit//////////////////////// */}
                  {/* {(poll_list_data.length == 0)?null:
                    <>
                      <h4 className="colorBlack font_18px font600 text-uppercase yourOpinionTtlDtl">Your Opinion</h4> 
                      {this.renderPolls()}
                    </>
                    } */}
                  {/* ////////////////////////////////////////////////// */} 
                  <Banner type_id={this.id} banner_position={2} unmount_call={0} type={"LiveSessionDetails"}  api_call={1} before_unload_call={0}/>
                </div>

                <div className="feed_right_2">
                  {isMobile?null:<Banner type_id={this.id} banner_position={3} unmount_call={0} type={"LiveSessionDetails"}  api_call={1} before_unload_call={0}/>}
                  <div class="full_width radius-6 text-left specialty_comp_right">

                    <h2 class="bgColorBlue font600 colorWhite font600 font_20px specialtyTtl">Related
              </h2>

                    <div class="clearfix"></div>
                    <div class="full_width font600 specialty_comp_right_text">
                      {this.state.related_comp.map(r =>
                        <div className="full_width relatedRow withImg">
                          <a href="javascript:void(0)" onClick={() => { this.redirect_to_compendium_detail(r.type_id); }}>
                            <div className="full_width font_12px relatedRowTop"><span className="colorBlack font600">{r.specialities}</span> <span className="float-right colorGrey">{r.date}</span></div>
                            <div className="full_width relatedRowIn">
                              {(r.image != "") ?
                                <div className="radius-6 relatedRowPic">
                                  <img className="object_fit_cover" src={r.image} />
                                </div> :
                                <div className="radius-6 relatedRowPic">
                                  <img className="object_fit_cover" src={medwikiicon} />
                                </div>
                              }

                              <h2 className="font500 transition6s font_12px colorBlack relatedRowTtl"> {r.question.substring(0, 100)}...</h2>
                              <div className="full_width">
                              {(r.sponsor_logo!="" && r.sponsor_logo!=undefined && r.sponsor_logo!=null)?
   <a href="javascript:void(0);" className="full_width relatedRow_sponsors">
    
   <span className="font_10px font500 colorBlack">Powered by</span>
   <img src={r.sponsor_logo.split(",")[0]} width="224" height="63" alt="logo" title="clirnet" />
   </a>:
 <a href="javascript:void(0);" className="full_width relatedRow_sponsors">
 <span className="font_10px font500 colorBlack">Powered by</span>
 <img src={r.client_logo} width="224" height="63" alt="logo" title="clirnet" />
 </a>}

                         
                            </div>
                            </div>
                          </a>
                        </div>
                      )}






                    </div>
                    <div class="clearfix"></div>

                  </div>
                  <Banner type_id={this.id} banner_position={4} unmount_call={0} type={"LiveSessionDetails"}  api_call={1} before_unload_call={0}/>
                </div>



              </section>

            </div>
           
          </div>



        </section>
        {(this.state.single_data.length != 0) ?
          <Modal className="in doctorDtlsPop" centered="true" animation="slide" show={this.state.showModal} onHide={() => { this.setState({ "showModal": false }); }}>
            <Modal.Header className="justify-content-center">
              <Modal.Title className="font600 font_20px colorBlack">Doctor Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="radius-100 ssnDtlsDocPic">
                <img src={modalImage} className="object_fit_cover radius-100" />
              </div>
              <div className="clearfix"></div>
              <h2 className="colorBlack font700 font_16px ssnDtlsDocName">
                {modalName}
                <span className="colorGrey font_12px font600">{modalDepartment}</span></h2>
              <div className="full_width ssnDtlsDocCont">
                {modalProfile}
              </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <a href="javascript:void(0)" className="radius-40 font500 btnRed cmnBtn btnCmnSmall" variant="secondary" onClick={() => { this.setState({ "showModal": false }); }}>
                Close
          </a>
            </Modal.Footer>
          </Modal> : null}
        <Footer  history={this.props.history}/>  
        <ToastsContainer store={ToastsStore} />
      </div>


    );
  }
}

export default LiveSessionDetails;
