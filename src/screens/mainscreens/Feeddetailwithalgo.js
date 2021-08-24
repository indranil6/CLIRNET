import React, { Component } from 'react';
import Loader from 'react-loader-spinner'


import 'firebase/storage'
import $ from 'jquery';
import { reactLocalStorage } from 'reactjs-localstorage';

import { InlineShareButtons } from 'sharethis-reactjs';
import ReactFlowPlayer from "react-flow-player";
import ReactPlayer from 'react-player';
import AppConfig from '../config/config.js';

import {isMobile} from 'react-device-detect';
import medwikiicon from '../../images/medWikiNoImage-2.jpg';
import Header from '../mainscreens/Header';
import Footer from '../mainscreens/Footer';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css'; 
import Banner from '../mainscreens/Banner';

import likeBttn from '../../images/feedBttm_icon-1.png';
import vaultBttn from '../../images/feedBttm_icon-2.png';
import masterconsultlogo from '../../images/session_box_type-3.png';
import cmmntBttn from '../../images/feedBttm_icon-4.png';
import calenderIcon from '../../images/cal-black.png';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';
import { Helmet } from "react-helmet";
import Moment from 'react-moment';
import Masonry from 'react-masonry-component';

var prev_compendium = [];
var prev_comment = [];
var banner_call="";
var reporting_json_array=[];
var banner_top_reporting_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Top","duration":0,"type":"comp","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
var banner_bottom_reporting_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Bottom","duration":0,"type":"comp","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
var banner_sidebar_bottom_reporting_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar_Bottom","duration":0,"type":"comp","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
var banner_sidebar_top_reporting_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar_Top","duration":0,"type":"comp","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
var main_cont_wirhout_citation = "";
var citation_text_parsed = [];
let related_comp = [];
const url = AppConfig.apiLoc;

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
var clientLogo = '';
var isSponsored = false;

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
  
var question_no = 0; 
var poll_list_data = [];

const masonryOptions = {
  transitionDuration: 0
};

class Feeddetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      phone_no: '',
      err_msg: "",
      otp: "",
      session_listing_upcoming: [],
      session_listing_cme: [],
      viewrefresh: false,
      is_loader: true,
      is_loader_more: false,
      single_data: {},
      query: "",
      image: "",
      upload_url: "",

      firebase_token: "",
      button_disabled: 0,
      file_name_diaplay: "",
      compendium_view: [],
      comments: [],
      related_comp: [],
      rerender:false,
      source: reactLocalStorage.get('@ClirnetStore:source', true)
    };

    this.myRef = React.createRef()



    clientLogo = '';
    isSponsored = false;
  }

  banner_work(responseJsonban,parsed_comp_id)
  {

   


    

   


    banner_call=responseJsonban.timestamp_added;
    banner_top_reporting_json.timestamp_get=banner_call;
    banner_bottom_reporting_json.timestamp_get=banner_call;
    banner_sidebar_top_reporting_json.timestamp_get=banner_call;
    banner_sidebar_bottom_reporting_json.timestamp_get=banner_call;

   

    for(let inc=0; inc<responseJsonban.data.length; inc++)
    {

      switch(responseJsonban.data[inc].position){
        case 'sidebar - top':

         // banner_sidebar_top_type='video';
           banner_sidebar_top_label=responseJsonban.data[inc].lable;
           banner_sidebar_top_category_id=responseJsonban.data[inc].banner_cat_id;
           //banner_sidebar_top_width='300';
           //banner_sidebar_top_height='200';
           banner_sidebar_top_duration=responseJsonban.data[inc].duration;
           banner_sidebar_top_url_and_redirect=responseJsonban.data[inc].items;
           banner_sidebar_top_type=responseJsonban.data[inc].items[0].format;
           banner_sidebar_top_width=responseJsonban.data[inc].items[0].width;
           banner_sidebar_top_height=responseJsonban.data[inc].items[0].height;
           //banner_sidebar_top_play_key=reactLocalStorage.get('@ClirnetStore:global_sidebar_top_play_key', '0');
           banner_sidebar_top_reporting_json.banner_cat_id=responseJsonban.data[inc].banner_cat_id;
           banner_sidebar_top_reporting_json.type_id=parsed_comp_id;

          
            banner_sidebar_top_video_change_permission=1;

           this.setState({"rerender":!this.state.rerender})

           
           //var videocontainertopmount = document.getElementById('video_top_container');
           //videocontainertopmount.play();
        break;
        case 'sidebar - bottom': 


         banner_sidebar_bottom_type=responseJsonban.data[inc].items[0].format;
         banner_sidebar_bottom_label=responseJsonban.data[inc].lable;
         banner_sidebar_bottom_category_id=responseJsonban.data[inc].banner_cat_id;
         banner_sidebar_bottom_width=responseJsonban.data[inc].items[0].width;
         banner_sidebar_bottom_height=responseJsonban.data[inc].items[0].height;;
         banner_sidebar_bottom_duration=responseJsonban.data[inc].duration;
         banner_sidebar_bottom_url_and_redirect=responseJsonban.data[inc].items;
         //banner_sidebar_bottom_play_key=reactLocalStorage.get('@ClirnetStore:global_sidebar_bottom_play_key', '0');;

         banner_sidebar_bottom_reporting_json.banner_cat_id=responseJsonban.data[inc].banner_cat_id;
         banner_sidebar_bottom_reporting_json.type_id=parsed_comp_id;
          banner_sidebar_bottom_video_change_permission=1;
         
         this.setState({"rerender":!this.state.rerender});

         
                    
        
        break;
        case 'top': 


//   if(responseJsonban.data[inc].format=="video")   
//   {         
// $('html, body').css({
//   overflow: 'hidden',
//   height: '100%'
// });
//   }

         banner_top_type=responseJsonban.data[inc].items[0].format;
         banner_top_label=responseJsonban.data[inc].lable;
         banner_top_category_id=responseJsonban.data[inc].banner_cat_id;
         banner_top_width=responseJsonban.data[inc].items[0].width;
         banner_top_height=responseJsonban.data[inc].items[0].height;
         banner_top_duration=responseJsonban.data[inc].duration;
         banner_top_url_and_redirect=responseJsonban.data[inc].items;
         //banner_top_play_key=reactLocalStorage.get('@ClirnetStore:global_top_play_key', '0');;
          banner_top_video_change_permission=1;
        
         this.setState({"rerender":!this.state.rerender})

         
         banner_top_reporting_json.banner_cat_id=responseJsonban.data[inc].banner_cat_id;
         banner_top_reporting_json.type_id=parsed_comp_id;

        

//videocontainertop.setAttribute('height', banner_top_height);
//videocontainertop.setAttribute('width', banner_top_width);
// videocontainertoptemp.load();
// //videocontainer.setAttribute('poster', newposter); //Changes video poster image
// videocontainertoptemp.play();

         //this.start_timer_top("")
        
        break;
        case 'bottom': 
        
         banner_bottom_type=responseJsonban.data[inc].items[0].format;
         banner_bottom_label=responseJsonban.data[inc].lable;
         banner_bottom_category_id=responseJsonban.data[inc].banner_cat_id;
         banner_bottom_width=responseJsonban.data[inc].items[0].width;
         banner_bottom_height=responseJsonban.data[inc].items[0].height;
         banner_bottom_duration=responseJsonban.data[inc].duration;
         banner_bottom_url_and_redirect=responseJsonban.data[inc].items;

         banner_bottom_reporting_json.banner_cat_id=responseJsonban.data[inc].banner_cat_id;
         banner_bottom_reporting_json.type_id=parsed_comp_id;
        
         //console.log(responseJsonban.data[inc].items)
          banner_bottom_video_change_permission=1;
         
         //banner_bottom_play_key=reactLocalStorage.get('@ClirnetStore:global_bottom_play_key', '0');
         this.setState({"rerender":!this.state.rerender});

         //this.start_timer_bottom("")
        break;
        default: 
        {

        }
    }

      
    }
    
    setTimeout(function(){ 
    
      if(document.getElementById('video_top_container')!='undefined' && document.getElementById('video_top_container')!=null)
      { 
  
        document.getElementById('video_top_container').addEventListener('ended', function(e) {
  
  
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
  
  
           let temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Top","duration":"","type":"comp","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
  if(banner_top_url_and_redirect[banner_top_play_key]!=undefined)
  {
    let vidunsave_top = document.getElementById("video_top_container");
  
    let unsave_durationtop= vidunsave_top.currentTime;
  let durationtop=(unsave_durationtop.toFixed(3))-(banner_top_reporting_json.start_timestamp.toFixed(3));  
  
            temp_json={"start_time":banner_top_reporting_json.start_time,"start_timestamp":"","banner_id":banner_top_url_and_redirect[banner_top_play_key].banner_id,"banner_cat_id":banner_top_reporting_json.banner_cat_id,"position": "Top","duration":durationtop.toFixed(3),"type":"comp","type_id":banner_top_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
          
           reporting_json_array.push(temp_json);
  }
  
          
  
          banner_top_reporting_json.start_time="";
          banner_top_reporting_json.end_time="";
  
          temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Top","duration":"","type":"comp","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
  
  
          console.log(reporting_json_array)
         }
  
  banner_top_play_key=parseInt(banner_top_play_key)+1;

  

  reactLocalStorage.set('@ClirnetStore:global_top_play_key',banner_top_play_key);

  //alert(reactLocalStorage.get('@ClirnetStore:global_top_play_key', '0'))
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
  
  
           let temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Top","duration":"","type":"comp","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
  if(banner_top_url_and_redirect[banner_top_play_key]!=undefined)
  {
    let vidunsave_top = document.getElementById("video_top_container");
  
    let unsave_durationtop= vidunsave_top.currentTime;
  let durationtop=(unsave_durationtop.toFixed(3))-(banner_top_reporting_json.start_timestamp.toFixed(3));  
            temp_json={"start_time":banner_top_reporting_json.start_time,"start_timestamp":"","banner_id":banner_top_url_and_redirect[banner_top_play_key].banner_id,"banner_cat_id":banner_top_reporting_json.banner_cat_id,"position": "Top","duration":durationtop.toFixed(3),"type":"comp","type_id":banner_top_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
          
           reporting_json_array.push(temp_json);
  }
  
          
  
          banner_top_reporting_json.start_time="";
          banner_top_reporting_json.end_time="";
  
          temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Top","duration":"","type":"comp","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
  
  
          console.log(reporting_json_array)
         }
  
  banner_top_play_key=0;
  reactLocalStorage.set('@ClirnetStore:global_top_play_key',0);

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
              
                 let temp_json={"start_time":banner_bottom_reporting_json.start_time,"start_timestamp":"","banner_id":banner_bottom_url_and_redirect[banner_bottom_play_key].banner_id,"banner_cat_id":banner_bottom_reporting_json.banner_cat_id,"position": "Bottom","duration":durationbottom.toFixed(3),"type":"comp","type_id":banner_bottom_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
                
                 reporting_json_array.push(temp_json);
        
                
        
                banner_bottom_reporting_json.start_time="";
                banner_bottom_reporting_json.end_time="";
        
                temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Bottom","duration":"","type":"comp","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
        
        
                console.log(reporting_json_array)
               }
    banner_bottom_play_key=parseInt(banner_bottom_play_key+1);
    reactLocalStorage.set('@ClirnetStore:global_bottom_play_key',banner_bottom_play_key);
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
                 let temp_json={"start_time":banner_bottom_reporting_json.start_time,"start_timestamp":"","banner_id":banner_bottom_url_and_redirect[banner_bottom_play_key].banner_id,"banner_cat_id":banner_bottom_reporting_json.banner_cat_id,"position": "Bottom","duration":durationbottom.toFixed(3),"type":"comp","type_id":banner_bottom_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
                
                 reporting_json_array.push(temp_json);
        
                
        
                banner_bottom_reporting_json.start_time="";
                banner_bottom_reporting_json.end_time="";
        
                temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Bottom","duration":"","type":"comp","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
        
        
                console.log(reporting_json_array)
               }
    
    banner_bottom_play_key=0;
    reactLocalStorage.set('@ClirnetStore:global_bottom_play_key',banner_bottom_play_key);
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
  
  
  
  
  
  
  
  
  
  
  
  
    if(document.getElementById('video_sidebar_top_container')!='undefined' && document.getElementById('video_sidebar_top_container')!=null)
    { 
    
      document.getElementById('video_sidebar_top_container').addEventListener('ended', function(e) {
    
        console.log('The End sidebar_top');
    
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
      let temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar-Top","duration":"","type":"comp","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
  if(banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key]!=undefined)
  {
       temp_json={"start_time":banner_sidebar_top_reporting_json.start_time,"start_timestamp":"","banner_id":banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key].banner_id,"banner_cat_id":banner_sidebar_top_reporting_json.banner_cat_id,"position": "Sidebar-Top","duration":durationsidebartop.toFixed(3),"type":"comp","type_id":banner_sidebar_top_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
     
      reporting_json_array.push(temp_json);
  }
  
     
  
     banner_sidebar_top_reporting_json.start_time="";
     banner_sidebar_top_reporting_json.end_time="";
  
     temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar-Top","duration":"","type":"comp","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
  
  
     console.log(reporting_json_array)
    }
    banner_sidebar_top_play_key=parseInt(banner_sidebar_top_play_key)+1;
    reactLocalStorage.set('@ClirnetStore:global_sidebar_top_play_key',banner_sidebar_top_play_key);

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
  
      let unsave_durationsidebar_top= vidunsave_sidebar_top.currentTime;
  let durationsidebartop=(unsave_durationsidebar_top.toFixed(3))-(banner_sidebar_top_reporting_json.start_timestamp.toFixed(3)); 
      let temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar-Top","duration":"","type":"comp","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
  if(banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key]!=undefined)
  {
       temp_json={"start_time":banner_sidebar_top_reporting_json.start_time,"start_timestamp":"","banner_id":banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key].banner_id,"banner_cat_id":banner_sidebar_top_reporting_json.banner_cat_id,"position": "Sidebar-Top","duration":durationsidebartop.toFixed(3),"type":"comp","type_id":banner_sidebar_top_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
     
      reporting_json_array.push(temp_json);
  }
  
     
  
     banner_sidebar_top_reporting_json.start_time="";
     banner_sidebar_top_reporting_json.end_time="";
  
     temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar-Top","duration":"","type":"comp","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
  
  
     console.log(reporting_json_array)
    }
    
    banner_sidebar_top_play_key=0;
    reactLocalStorage.set('@ClirnetStore:global_sidebar_top_play_key',banner_sidebar_top_play_key);

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
               console.log(parseInt(unix_tmp)+"jjj"+banner_sidebar_bottom_reporting_json.start_timestamp);
                let temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar-bottom","duration":"","type":"comp","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
  
                 if(banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key]!=undefined)
                 {
                  temp_json={"start_time":banner_sidebar_bottom_reporting_json.start_time,"start_timestamp":"","banner_id":banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key].banner_id,"banner_cat_id":banner_sidebar_bottom_reporting_json.banner_cat_id,"position": "Sidebar-bottom","duration":durationsidebarbottom.toFixed(3),"type":"comp","type_id":banner_sidebar_bottom_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
                 }
                 reporting_json_array.push(temp_json);
        
                
        
                 banner_sidebar_bottom_reporting_json.start_time="";
                 banner_sidebar_bottom_reporting_json.end_time="";
        
                temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar-bottom","duration":"","type":"comp","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
        
        
                console.log(reporting_json_array)
               }
    
    banner_sidebar_bottom_play_key=parseInt(banner_sidebar_bottom_play_key)+1;
    reactLocalStorage.set('@ClirnetStore:global_sidebar_bottom_play_key',banner_sidebar_bottom_play_key);
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
           let durationsidebarbottom=(unsave_durationsidebar_bottom.toFixed(3))-(banner_sidebar_bottom_reporting_json.start_timestamp.toFixed(3)); console.log(parseInt(unix_tmp)+"jjj"+banner_sidebar_bottom_reporting_json.start_timestamp);
                let temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar-bottom","duration":"","type":"comp","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
  
                 if(banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key]!=undefined)
                 {
                  temp_json={"start_time":banner_sidebar_bottom_reporting_json.start_time,"start_timestamp":"","banner_id":banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key].banner_id,"banner_cat_id":banner_sidebar_bottom_reporting_json.banner_cat_id,"position": "Sidebar-bottom","duration":durationsidebarbottom.toFixed(3),"type":"comp","type_id":banner_sidebar_bottom_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
                 }
                 reporting_json_array.push(temp_json);
        
                
        
                 banner_sidebar_bottom_reporting_json.start_time="";
                 banner_sidebar_bottom_reporting_json.end_time="";
        
                temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar-bottom","duration":"","type":"comp","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
        
        
                console.log(reporting_json_array)
               }
    banner_sidebar_bottom_play_key=0;
    reactLocalStorage.set('@ClirnetStore:global_sidebar_bottom_play_key',banner_sidebar_bottom_play_key);

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
      
 


  }



  componentDidMount() {

      $(".medwiki_mobile").addClass("active");

    //alert(reactLocalStorage.get('@ClirnetStore:utm_source', true))

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

     setTimeout(function(){ 
      
      $(".feedRow_ans").find("sup").remove();
     }, 1000);

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
      //alert(document.getElementById('video_imagecont_sidebar_bottom'))
if(document.getElementById('video_imagecont_sidebar_bottom')!=undefined && document.getElementById('video_imagecont_sidebar_bottom')!=null)
{
      document.getElementById('video_imagecont_sidebar_bottom').pause();
}

    }
  }

  if(document.getElementById('video_imagecont_sidebar_top')!=undefined)
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

      console.log("hazarddddddddd")


      if(document.getElementById("video_top_container")!=undefined && document.getElementById("video_top_container")!=null)
  {
  var vidunsave_top = document.getElementById("video_top_container");

 var unsave_durationtop= vidunsave_top.currentTime;
 if(unsave_durationtop!=0 && banner_top_reporting_json.start_time!="")
 {


  let today = new Date();
          
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  
 let temp_json={"start_time":banner_top_reporting_json.start_time,"start_timestamp":"","banner_id":banner_top_url_and_redirect[banner_top_play_key].banner_id,"banner_cat_id":banner_top_reporting_json.banner_cat_id,"position": "Top","duration":unsave_durationtop,"type":"comp","type_id":banner_top_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
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
      
      let temp_json={"start_time":banner_bottom_reporting_json.start_time,"start_timestamp":"","banner_id":banner_bottom_url_and_redirect[banner_bottom_play_key].banner_id,"banner_cat_id":banner_bottom_reporting_json.banner_cat_id,"position": "Bottom","duration":unsave_durationbottom,"type":"comp","type_id":banner_bottom_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
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
    
    let temp_json={"start_time":banner_sidebar_bottom_reporting_json.start_time,"start_timestamp":"","banner_id":banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key].banner_id,"banner_cat_id":banner_sidebar_bottom_reporting_json.banner_cat_id,"position": "sidebar_bottom","duration":unsave_durationsidebar_bottom,"type":"comp","type_id":banner_sidebar_bottom_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
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
    
    let temp_json={"start_time":banner_sidebar_top_reporting_json.start_time,"start_timestamp":"","banner_id":banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key].banner_id,"banner_cat_id":banner_sidebar_top_reporting_json.banner_cat_id,"position": "sidebar_top","duration":unsave_durationsidebar_top,"type":"comp","type_id":banner_sidebar_top_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
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

  
     
   



var scrool_freeze=1;



setTimeout(function() {

scrool_freeze=0;

$('html, body').css({
  overflow: 'auto',
  height: 'auto'
});

}, 2000);


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











    // Citation Functionality
    $(document).click(function (event) {

      $(".creta").css("background-color", "white");
      if ($(event.target).text() == "[1]") {
        $('html, body').animate({
          scrollTop: $("#cita_1").offset().top
        }, 200);

        $("#cita_1").css("background-color", "yellow");

        setTimeout(function () { $("#cita_1").css("background-color", "white") }, 2000);
      }
      if ($(event.target).text() == "[2]") {
        $("#cita_2").css("background-color", "yellow");
        $('html, body').animate({
          scrollTop: $("#cita_2").offset().top
        }, 200);


        setTimeout(function () { $("#cita_2").css("background-color", "white") }, 2000);
      }
      if ($(event.target).text() == "[3]") {
        $('html, body').animate({
          scrollTop: $("#cita_3").offset().top
        }, 200);
        $("#cita_3").css("background-color", "yellow");

        setTimeout(function () { $("#cita_3").css("background-color", "white") }, 2000);
      }
      if ($(event.target).text() == "[4]") {
        $('html, body').animate({
          scrollTop: $("#cita_4").offset().top
        }, 200);
        $("#cita_4").css("background-color", "yellow");

        setTimeout(function () { $("#cita_4").css("background-color", "white") }, 2000);
      }
      if ($(event.target).text() == "[5]") {
        $('html, body').animate({
          scrollTop: $("#cita_5").offset().top
        }, 200);
        $("#cita_5").css("background-color", "yellow");

        setTimeout(function () { $("#cita_5").css("background-color", "white") }, 2000);
      }
      if ($(event.target).text() == "[6]") {
        $('html, body').animate({
          scrollTop: $("#cita_6").offset().top
        }, 200);
        $("#cita_6").css("background-color", "yellow");

        setTimeout(function () { $("#cita_6").css("background-color", "white") }, 2000);
      }


    });




    related_comp = [];
    prev_comment = [];

    this.load_all_data()
    $('.li_medwiki').attr('id', 'medwiki_cal');

    //start rendering from top of the page
   
    

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


         let temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Top","duration":"","type":"comp","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
if(banner_top_url_and_redirect[banner_top_play_key]!=undefined)
{
  let vidunsave_top = document.getElementById("video_top_container");

  let unsave_durationtop= vidunsave_top.currentTime;
let durationtop=(unsave_durationtop.toFixed(3))-(banner_top_reporting_json.start_timestamp.toFixed(3));  
          temp_json={"start_time":banner_top_reporting_json.start_time,"start_timestamp":"","banner_id":banner_top_url_and_redirect[banner_top_play_key].banner_id,"banner_cat_id":banner_top_reporting_json.banner_cat_id,"position": "Top","duration":durationtop.toFixed(3),"type":"comp","type_id":banner_top_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
        
         reporting_json_array.push(temp_json);
}

        

        banner_top_reporting_json.start_time="";
        banner_top_reporting_json.end_time="";

        temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Top","duration":"","type":"comp","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};


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
               let temp_json={"start_time":banner_bottom_reporting_json.start_time,"start_timestamp":"","banner_id":banner_bottom_url_and_redirect[banner_bottom_play_key].banner_id,"banner_cat_id":banner_bottom_reporting_json.banner_cat_id,"position": "Bottom","duration":durationbottom.toFixed(3),"type":"comp","type_id":banner_bottom_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
              
               reporting_json_array.push(temp_json);
      
              
      
              banner_bottom_reporting_json.start_time="";
              banner_bottom_reporting_json.end_time="";
      
              temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Bottom","duration":"","type":"comp","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
      
      
              console.log(reporting_json_array)
             }
              
            } else {
      
             if(banner_bottom_reporting_json.start_time==="" || banner_bottom_reporting_json.start_time==undefined)
             {
              let today = new Date();
              let vidunsave_sidebar_top = document.getElementById("video_sidebar_top_container");

              let unsave_durationsidebartop= vidunsave_sidebar_top.currentTime;
              let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
              let unix_tmp = Math.round(+new Date()/1000);
              banner_bottom_reporting_json.start_time=time;
              banner_bottom_reporting_json.start_timestamp=unsave_durationsidebartop;
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
                       let temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar-bottom","duration":"","type":"comp","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};

               if(banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key]!=undefined)
               {
                temp_json={"start_time":banner_sidebar_bottom_reporting_json.start_time,"start_timestamp":"","banner_id":banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key].banner_id,"banner_cat_id":banner_sidebar_bottom_reporting_json.banner_cat_id,"position": "Sidebar-bottom","duration":durationsidebarbottom.toFixed(3),"type":"comp","type_id":banner_sidebar_bottom_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
               }
               reporting_json_array.push(temp_json);
      
              
      
               banner_sidebar_bottom_reporting_json.start_time="";
               banner_sidebar_bottom_reporting_json.end_time="";
      
              temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar-bottom","duration":"","type":"comp","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
      
      
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
          
                   let temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar-Top","duration":"","type":"comp","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
          if(banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key]!=undefined)
          {
                    temp_json={"start_time":banner_sidebar_top_reporting_json.start_time,"start_timestamp":"","banner_id":banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key].banner_id,"banner_cat_id":banner_sidebar_top_reporting_json.banner_cat_id,"position": "Sidebar-Top","duration":durationsidebartop.toFixed(3),"type":"comp","type_id":banner_sidebar_top_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
                  
                   reporting_json_array.push(temp_json);
          }
          
                  
          
                  banner_sidebar_top_reporting_json.start_time="";
                  banner_sidebar_top_reporting_json.end_time="";
          
                  temp_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar-Top","duration":"","type":"comp","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
          
          
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

              banner_top_play_key=parseInt(banner_top_play_key+1);
              reactLocalStorage.set('@ClirnetStore:global_top_play_key',banner_top_play_key);

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
                reactLocalStorage.set('@ClirnetStore:global_top_play_key',banner_top_play_key);

                
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

              banner_sidebar_top_play_key=parseInt(banner_sidebar_top_play_key)+1;
              reactLocalStorage.set('@ClirnetStore:global_sidebar_top_play_key',banner_sidebar_top_play_key);

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
              reactLocalStorage.set('@ClirnetStore:global_sidebar_top_play_key',banner_sidebar_top_play_key);

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
      
              banner_sidebar_bottom_play_key=parseInt(banner_sidebar_bottom_play_key)+1;
              reactLocalStorage.set('@ClirnetStore:global_sidebar_bottom_play_key',banner_sidebar_bottom_play_key);

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
              reactLocalStorage.set('@ClirnetStore:global_sidebar_bottom_play_key',banner_sidebar_bottom_play_key);

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

        banner_bottom_play_key=parseInt(banner_bottom_play_key+1);
        reactLocalStorage.set('@ClirnetStore:global_bottom_play_key',banner_bottom_play_key);

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
        reactLocalStorage.set('@ClirnetStore:global_bottom_play_key',banner_bottom_play_key);
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
  //Load medwiki data
  load_all_data() {
    related_comp = [];
    prev_comment = [];
    var thisobj = this;

    let pageSource = this.state.source;
    if(pageSource == "" || pageSource == undefined){
      pageSource = "Not detected";
    }
    console.log("page source"+pageSource);

    if (this.props.location.pathname.includes("social")) {
      var extrapop = "";
    }
    else {
      var extrapop = "";
    }

    var extrautm="";
    if(reactLocalStorage.get('@ClirnetStore:utm_source', '')!="" && reactLocalStorage.get('@ClirnetStore:utm_source', '')!=undefined && reactLocalStorage.get('@ClirnetStore:utm_source', '')!=null)
    {
       extrautm="&utm_source="+reactLocalStorage.get('@ClirnetStore:utm_source', '')+"";
    }
   fetch(url+'knwlg/feedDetail?type_id=' + this.props.match.params.id + '&btype=1&type=comp' + extrapop + '&source=' + pageSource +''+extrautm+'', {
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
    


     

      prev_compendium[0] = responseJson.data;

      if(responseJson.data.answer.indexOf("Citation") !=-1)
      {
      var citation_text_parsed_temp = responseJson.data.answer.split("Citation");

      citation_text_parsed = citation_text_parsed_temp[1].split("^");

      main_cont_wirhout_citation = citation_text_parsed_temp[0];

      

      // main_cont_wirhout_citation = main_cont_wirhout_citation.replace("[1]", "<span id='tat1'>[1]</span>");
      // main_cont_wirhout_citation = main_cont_wirhout_citation.replace("[2]", "<span className='tat2'>[2]</span>");
      // main_cont_wirhout_citation = main_cont_wirhout_citation.replace("[3]", "<span className='tat3'>[3]</span>");
      // main_cont_wirhout_citation = main_cont_wirhout_citation.replace("[4]", "<span className='tat4'>[4]</span>");
      // main_cont_wirhout_citation = main_cont_wirhout_citation.replace("[5]", "<span className='tat5'>[5]</span>");
      // main_cont_wirhout_citation = main_cont_wirhout_citation.replace("[6]", "<span className='tat6'>[6]</span>");

      // main_cont_wirhout_citation = main_cont_wirhout_citation.replace("[7]", "<span className='tat7'>[7]</span>");
      // main_cont_wirhout_citation = main_cont_wirhout_citation.replace("[8]", "<span className='tat8'>[8]</span>");
      // main_cont_wirhout_citation = main_cont_wirhout_citation.replace("[9]", "<span className='tat9'>[9]</span>");
      // main_cont_wirhout_citation = main_cont_wirhout_citation.replace("[10]", "<span className='tat10'>[10]</span>");



      // main_cont_wirhout_citation = main_cont_wirhout_citation.replace("[11]", "<span id='tat11'>[11]</span>");
      // main_cont_wirhout_citation = main_cont_wirhout_citation.replace("[12]", "<span className='tat12'>[12]</span>");
      // main_cont_wirhout_citation = main_cont_wirhout_citation.replace("[13]", "<span className='tat13'>[13]</span>");
      // main_cont_wirhout_citation = main_cont_wirhout_citation.replace("[14]", "<span className='tat14'>[14]</span>");
      // main_cont_wirhout_citation = main_cont_wirhout_citation.replace("[15]", "<span className='tat15'>[15]</span>");
      // main_cont_wirhout_citation = main_cont_wirhout_citation.replace("[16]", "<span className='tat16'>[16]</span>");

      // main_cont_wirhout_citation = main_cont_wirhout_citation.replace("[17]", "<span className='tat17'>[17]</span>");
      // main_cont_wirhout_citation = main_cont_wirhout_citation.replace("[18]", "<span className='tat8'>[18]</span>");
      // main_cont_wirhout_citation = main_cont_wirhout_citation.replace("[19]", "<span className='tat9'>[19]</span>");
      // main_cont_wirhout_citation = main_cont_wirhout_citation.replace("[20]", "<span className='tat10'>[20]</span>");

      }

      else
      {
        citation_text_parsed =[];
        main_cont_wirhout_citation=responseJson.data.answer;
      }

      ////////////////////---Added by sumit---/////////////////////////
      poll_list_data = []
      poll_list_data = prev_compendium[0].survey 
       
      if(poll_list_data.length != 0){
       poll_list_data.map(r => {
         if(r.survey_id != null && r.json_data != false){
           if(r.sponsor_logo == null || r.sponsor_logo === 'null' || r.sponsor_logo == ''){
             clientLogo = r.client_logo;
           }else{
             isSponsored = true;
             clientLogo = r.sponsor_logo;
           }
           poll_list_data = prev_compendium[0].survey
         }
         else{ 
           poll_list_data = []
         }
       })
      }
      ////////////////////////////////////////////
      this.setState({ "compendium_view": prev_compendium })
      this.setState({ "is_loader": false });


      //Generate Comment data
     fetch(url+'knwlg/nested_comment?type_id=' + prev_compendium[0].type_id + '&type=' + prev_compendium[0].type + '', {
        method: 'GET',
        headers: {

          'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
          'version': 'rjsw 1.1.1'

        }
      }).then((response) => response.json()).then((responseJsoncom) => {



        var final_comment = JSON.parse(responseJsoncom.data);

        final_comment.map(r => {

          prev_comment.push(r);
        })




        this.setState({ "comments": prev_comment })



      }).catch((error) => {

      });


      if (isMobile) {
       var type_id_val=2;

      
    }

    else
    {
      var type_id_val=1;

     
    }

    let unixbannerglobe = Math.round(+new Date()/1000);

    var difference_time=unixbannerglobe-reactLocalStorage.get('@ClirnetStore:banner_call_time', 0);

    

    if (reactLocalStorage.get('@ClirnetStore:global_banner_data', true) != true && difference_time<300) {

      
//alert(unix);
banner_sidebar_top_play_key=reactLocalStorage.get('@ClirnetStore:global_sidebar_top_play_key', '0');
banner_sidebar_bottom_play_key=reactLocalStorage.get('@ClirnetStore:global_sidebar_bottom_play_key', '0');
banner_bottom_play_key=reactLocalStorage.get('@ClirnetStore:global_bottom_play_key', '0');
banner_top_play_key=reactLocalStorage.get('@ClirnetStore:global_top_play_key', '0');
      //console.log(reactLocalStorage.get('@ClirnetStore:global_banner_data', true))

      var that12=this;
      setTimeout(function(){ 

        that12.banner_work(JSON.parse(reactLocalStorage.get('@ClirnetStore:global_banner_data', true)),prev_compendium[0].type_id);



       }, 50);
      
    }


    else
    {
      

      console.log("banner_called")
    


     fetch(url+'banner/dataAlgo?banner_type='+type_id_val+'&content_type_id='+prev_compendium[0].type_id+'&content_type=comp', {
        method: 'GET',
        headers: {

          'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
          'version': 'rjsw 1.1.1'

        }
      }).then((response) => response.json()).then((responseJsonban) => {
        reactLocalStorage.set('@ClirnetStore:global_banner_data', JSON.stringify(responseJsonban));

        reactLocalStorage.set('@ClirnetStore:global_bottom_play_key', 0);
        reactLocalStorage.set('@ClirnetStore:global_sidebar_bottom_play_key', 0);

        reactLocalStorage.set('@ClirnetStore:global_sidebar_top_play_key', 0);

        reactLocalStorage.set('@ClirnetStore:global_top_play_key', 0);

        let unixbanner = Math.round(+new Date()/1000);

        reactLocalStorage.set('@ClirnetStore:banner_call_time', unixbanner);



        this.banner_work(responseJsonban,prev_compendium[0].type_id);

       


      }).catch((error) => {

      });
    }





      var speccs = prev_compendium[0].type_id;
      related_comp = [];
      //Related Compendium
     fetch(url+'knwlg/related?type=comp&speciality=' + speccs + '&type_id=' + prev_compendium[0].type_id + '&from=0&to=10', {
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






    }).catch((error) => {

    });


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



  componentWillUnmount()
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
    
   let temp_json={"start_time":banner_top_reporting_json.start_time,"start_timestamp":"","banner_id":banner_top_url_and_redirect[banner_top_play_key].banner_id,"banner_cat_id":banner_top_reporting_json.banner_cat_id,"position": "Top","duration":unsave_durationtop,"type":"comp","type_id":banner_top_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
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
    
    let temp_json={"start_time":banner_bottom_reporting_json.start_time,"start_timestamp":"","banner_id":banner_bottom_url_and_redirect[banner_bottom_play_key].banner_id,"banner_cat_id":banner_bottom_reporting_json.banner_cat_id,"position": "Bottom","duration":unsave_durationbottom,"type":"comp","type_id":banner_bottom_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
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
  
  let temp_json={"start_time":banner_sidebar_bottom_reporting_json.start_time,"start_timestamp":"","banner_id":banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key].banner_id,"banner_cat_id":banner_sidebar_bottom_reporting_json.banner_cat_id,"position": "sidebar_bottom","duration":unsave_durationsidebar_bottom,"type":"comp","type_id":banner_sidebar_bottom_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
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
  
  let temp_json={"start_time":banner_sidebar_top_reporting_json.start_time,"start_timestamp":"","banner_id":banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key].banner_id,"banner_cat_id":banner_sidebar_top_reporting_json.banner_cat_id,"position": "sidebar_top","duration":unsave_durationsidebar_top,"type":"comp","type_id":banner_sidebar_top_reporting_json.type_id,"end_time":time,"end_timestamp":"","timestamp_get":banner_call};
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


     banner_top_reporting_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Top","duration":0,"type":"comp","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
 banner_bottom_reporting_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Bottom","duration":0,"type":"comp","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
 banner_sidebar_bottom_reporting_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar_Bottom","duration":0,"type":"comp","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
 banner_sidebar_top_reporting_json={"start_time":"","start_timestamp":"","banner_id":"","banner_cat_id":"","position": "Sidebar_Top","duration":0,"type":"comp","type_id":"","end_time":"","end_timestamp":"","timestamp_get":""};
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








 


 
 






  //Like Unlike Function
  onLikeBtnPress = (item_id, type, array_index) => {
    let formdatam = { "type_id": item_id, "type": type }
   fetch(url+'knwlg/save_like', {
      method: 'POST',
      headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'
      },
      body: JSON.stringify(formdatam),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.data.rating == 0) {
          prev_compendium[array_index].myrating = false;
          prev_compendium[array_index].rating = parseInt(prev_compendium[array_index].rating) - 1;
        }
        else {
          prev_compendium[array_index].myrating = true;
          prev_compendium[array_index].rating = parseInt(prev_compendium[array_index].rating) + parseInt(responseJson.data.rating);
        }

        this.setState({ "compendium_view": prev_compendium })
      })
      .catch((error) => {

      });



  }

  //compendium detail from related section
  redirect_to_compendium_detail(id) {
    console.log('clicked')
    reactLocalStorage.set('@ClirnetStore:source','FeedDetails Page');
    this.props.history.push({
      pathname: '/Feeddetailrelated/' + id + '' 
    })
  }

  redirect_to_feed_demo() {
    console.log('clicked')
    this.props.history.push({
      pathname: '/FeedDemo/'  
    })
  }

  //Vault Press Function
  onvaultPress = (item_id, type, array_index, flag) => {
    var thisobjval = this;
    let formdatam = { "postid": item_id, "type": type }
   fetch(url+'knwlg/vault_switching', {
      method: 'POST',
      headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'
      },
      body: JSON.stringify(formdatam),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        prev_compendium[array_index].vault = responseJson.data;

        if (flag == 0) {
          reactLocalStorage.set('@ClirnetStore:vault_count', (parseInt(reactLocalStorage.get('@ClirnetStore:vault_count', true)) + 1));

        }

        if (flag == 1) {
          reactLocalStorage.set('@ClirnetStore:vault_count', (parseInt(reactLocalStorage.get('@ClirnetStore:vault_count', true)) - 1));
        }

        this.setState({ "compendium_view": prev_compendium })





      })
      .catch((error) => {

      });



  }


  //Open Subcomment Section
  opensub(data) {
    $(".off").css("display", "none");
    $(".hh_" + data + "").css("display", "block");
  }
  //Comment Reply Submission 
  submitreply(type_id, type, index, parent_comment) {
    let commentsub = $(".reply_text_" + index + "").val();

    if (commentsub != "") {
      let thisobj = this;
      let parser = {
        type_id: type_id,
        type: type,
        parent_id: parent_comment,
        comment: commentsub
      }
     fetch(url+'knwlg/nested_save_comment', {
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
            $(".reply_text_" + index + "").val("");
            this.load_all_data();
          }

          else {

          }

        })
        .catch((error) => {


        });
    }
  }




  //Comment Submission 
  submitcomment(type_id, type, index, parent_comment) {
    let commentsub = $(".main_comment").val();

    if (commentsub != "") {
      let thisobj = this;
      let parser = {
        type_id: type_id,
        type: type,
        parent_id: 0,
        comment: commentsub
      }
     fetch(url+'knwlg/nested_save_comment', {
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
            $(".main_comment").val("");
            this.load_all_data();
          }

          else {

          }

        })
        .catch((error) => {


        });
    }
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
                          (arrLen == 1)?this.renderLastPoll(r.json_data,r.survey_id,r.point):
                          <> 
                          {(isEven == false && i == arrLen-1)? this.renderPoll(r.json_data,r.survey_id,r.point):
                           this.renderLastPoll(r.json_data,r.survey_id,r.point)} 
                           </>
                          ))} 
                      </Masonry>
                      </> 
                  </div>:null
                  } 
              </>
          )
      }

      renderPoll(dataJson,survey_id,point) { 
        try{                
        let mData = JSON.parse(unescape(dataJson));
        let sData = mData.surveys;
        console.log('in >>>>>>>>>>>>>>>>'+JSON.stringify(sData))
        let arr_new = Object.keys(sData).map(function (k){
        return sData[k]; 
        });
        let question = arr_new[question_no].question;
        let currentOptions = arr_new[question_no].options;
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
        catch(error){ 
           console.log("///////////////////////////Unable to parse Poll id///////////////////"+survey_id);
           return false;
        }  
      }

renderLastPoll(dataJson,survey_id,point) { 
  console.log('render Polls//////////////////////'+point)  
  let mData = JSON.parse(unescape(dataJson));
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
              
                  <h4 className="font_14px colorBlack font700 srvPollsTtl srvPollsTtlPnt">
                  <span class="font_12px colorWhite radius-40 text-center font600 srvPollsPoint">{point} {this.pointTextValidation(point)}</span>
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
                        
                      }
                      </div>
                  </>
                  )}
                  </div> 
                  
              
              </div> 
          </div>
      ) 
}

  render() {
    var that = this;



    return (
      <div className={ isMobile == true ? 'full_width wrap_body mblScreen' : 'full_width wrap_body dskScreen'}>
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
        <Header history={this.props.history} />
        <section className="full_width body_area">
          <div className="container">
          {(banner_top_type==='video')?
          <div onClick={() => { this.banner_click_track(banner_top_url_and_redirect[banner_top_play_key].banner_id,'Feeddetail',prev_compendium[0].type_id,'Top'); }} className="full_width text-center add_area_top   top_banner_div">
            
              <div className="full_width addAreaVideo video_imagecont" id="video_imagecont">
            {(banner_top_url_and_redirect[banner_top_play_key].url!="")?
            <a id="banner_href_top" target="_blank" href={banner_top_url_and_redirect[banner_top_play_key].url}>
            <h4 className="font_10px font500 colorBlack text-right advertisement_ttl">Advertisement</h4>
            <video autoplay="autoplay"  muted defaultMuted playsInline  oncontextmenu="return false;"  preload="auto"   style={{"pointer-events": "none"}} id="video_top_container"  
             width={banner_top_width} height={banner_top_height}  >
            <source id="video_top" src={banner_top_url_and_redirect[banner_top_play_key].image} type="video/mp4"/>
      </video></a>:

<a id="banner_href_top"  href="javascript:void(0)">
<h4 className="font_10px font500 colorBlack text-right advertisement_ttl">Advertisement</h4>
<video autoplay="autoplay" preload="auto"  muted defaultMuted playsInline   style={{"pointer-events": "none"}}  id="video_top_container"   
 width={banner_top_width} height={banner_top_height}  >
<source id="video_top" src={banner_top_url_and_redirect[banner_top_play_key].image} type="video/mp4"/>
</video></a>}

      </div>
     
      </div>:null}

      {(banner_top_type==='image')?
      <div onClick={() => { this.banner_click_track(banner_top_url_and_redirect[banner_top_play_key].banner_id,'Feeddetail',prev_compendium[0].type_id,'Top'); }} className="full_width text-center add_area_top   top_banner_div">
        {(banner_top_url_and_redirect[banner_top_play_key].url!="")?
<a id="banner_href_top" target="_blank" href={banner_top_url_and_redirect[banner_top_play_key].url}>
<h4 className="font_10px font500 colorBlack text-right advertisement_ttl">Advertisement</h4><img id="top_image" src={banner_top_url_and_redirect[banner_top_play_key].image}/></a>:
<a id="banner_href_top" href="javascript:void(0)">
<h4 className="font_10px font500 colorBlack text-right advertisement_ttl">Advertisement</h4><img id="top_image" src={banner_top_url_and_redirect[banner_top_play_key].image}/></a>}

</div>:null}
      
              
      


              <section className="full_width medWiki" id="maincont" ref={this.myRef}>
                <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={80} width={80} visible={this.state.is_loader} />
                {this.state.compendium_view.map((r, index) => (
                  <div className="medWikiLeft">
                    <div className="full_width radius-6 feedRow">
                      <div className="col justify-content-between feedRowTop">
                        <div className="row">
                          <div className="col">
                            {/* <span class="font_14px radius-6 font600 colorBlue feedRow_speciality"><marquee>{r.specialities}</marquee></span> */}
                            <span class="font_14px font600 colorBlack feedRow_date ssnDtl_dateDesk">{r.date}</span>
                          </div>
                          <div className="col-auto">

                          {(r.sponsor_logo!="" && r.sponsor_logo!=undefined && r.sponsor_logo!=null)?
   <a href="javascript:void(0);" className=" feedRow_sponsors">
    
   <span className="font_10px font500 colorBlack">Powered by</span>
   <img src={r.sponsor_logo.split(",")[0]} width="224" height="63" alt="logo" title="clirnet" />
   </a>:
 <a href="javascript:void(0);" className=" feedRow_sponsors">
 <span className="font_10px font500 colorBlack">Powered by</span>
 <img src={r.client_logo} width="224" height="63" alt="logo" title="clirnet" />
 </a>}


                           
                          </div>
                        </div>
                      </div>
                      {/* <span class="font_14px font600 feedRow_date ssnDtl_dateRes">{r.date}</span> */}
                      <div className="full_width feedRow_ttl">
                        {(r.specialities!=null)?
                        <div className="full_width">
                          <span class="font_14px radius-6 font600 colorBlue feedRow_speciality">{r.specialities.replace(/,/g, ", ")}</span>
                        </div>:null}
                        <a href="javascript:void(0);" class="highlightyellow1 font_18px colorBlack font600">{r.question}</a>
                        

                        
                      </div>
                      {(r.image != "" && r.con_type=='text' && r.con_type != undefined) ?
                        <div class="full_width feedRow_Pic">
                          <img className="object_fit_cover" src={r.image} />
                          <div className="overlay"></div>
                        </div> : null}
                        {(r.con_type=='video' && r.vendor=='flow'  && r.con_type != undefined   && r.vendor != undefined) ?
                        <div class="full_width feedRow_Pic">

<video playsInline  loop="true" autoplay="autoplay" controls="true" >
            <source id="video_top" src={r.src} type="video/mp4"/>
      </video>
                          {/* <ReactFlowPlayer
  playerInitScript="http://releases.flowplayer.org/7.2.1/flowplayer.min.js"
  playerId="reactFlowPlayer"
  sources={[
    {
      type: "video/mp4",
      src: r.src
    }
  ]}
  customButton={[
    {
      component: <a id="custom-btn">Custom React Component</a>,
      class: "fp-controls > .fp-volume",
      id: "custom-btn",
      place: "before"
    }
  ]}
/> */}
                         
                        </div> : null}

                         {(r.con_type=='video' && r.vendor=='youtube'  && r.con_type != undefined   && r.vendor != undefined) ?
                        <div class="full_width feedRow_Pic">
                     <ReactPlayer url={'https://www.youtube.com/watch?v='+r.src} width='100%'
           />
                         
                        </div> : null}
                      <div class="full_width font_16px feedRow_ans">
                        {}
                        {/* <p>{ReactHtmlParser(main_cont_wirhout_citation)}</p> */}
<p>{ReactHtmlParser(r.answer_htm)}</p>
                        {/* {(citation_text_parsed.length>0)?
                        <p class="font_18px colorBlack font600" >Citation(s) </p>:null}
                        {citation_text_parsed.map((rcit, indexs) => (
                          <div>
                            {(indexs > 0) ?
                              <p className="creta" id={"cita_" + indexs}>{indexs}: {rcit}</p> : null}
                          </div>
                        ))} */}
                      </div>
                      <div className="full_width feed_footer">
                        <div className="row d-flex align-items-center">
                          {(r.myrating == true) ?
                            <a className="feedFter_left active" onClick={() => this.onLikeBtnPress(r.type_id, r.type, index)} href="javascript:void(0);"><img src={likeBttn} /><span>{r.rating}</span></a> :
                            <a className="feedFter_left" onClick={() => this.onLikeBtnPress(r.type_id, r.type, index)} href="javascript:void(0);"><img src={likeBttn} /><span>{r.rating}</span></a>
                          }
                          {(r.vault == 0) ?
                            <a className="feedFter_left" onClick={() => this.onvaultPress(r.type_id, r.type, index, 0)} href="javascript:void(0);"><img src={vaultBttn} /></a> :
                            <a className="feedFter_left active" onClick={() => this.onvaultPress(r.type_id, r.type, index, 1)} href="javascript:void(0);"><img src={vaultBttn} /></a>}
                          <InlineShareButtons
                            config={{
                              alignment: 'center',  // alignment of buttons (left, center, right)
                              color: 'white',      // set the color of buttons (social, white)
                              enabled: true,        // show/hide buttons (true, false)
                              font_size: 16,        // font size for the buttons
                              labels: 'null',        // button labels (cta, counts, null)
                              language: 'en',       // which language to use (see LANGUAGES)
                              networks: [           // which networks to include (see SHARING NETWORKS)
                                'whatsapp',
                                'messenger',
                                'facebook',
                                'twitter'
                              ],
                              padding: 0,          // padding within buttons (INTEGER)
                              radius: 6,            // the corner radius on each button (INTEGER)
                              show_total: false,
                              size: 30,             // the size of each button (INTEGER)

                              // OPTIONAL PARAMETERS
                              url: r.deeplink, // (defaults to current url)
                              image: 'https://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
                              description: r.answer.substring(0, 100) + "...",       // (defaults to og:description or twitter:description)
                              title: r.question,            // (defaults to og:title or twitter:title)
                              message: '',     // (only for email sharing)
                              subject: '',  // (only for email sharing)
                              username: 'Medwiki view' // (only for twitter sharing)
                            }}
                          />

                          {/* <a className="feedFter_left" href="javascript:void(0);"><img src={shareBttn}/></a> */}
                          <a className="feedFter_left" href="javascript:void(0);"><img src={cmmntBttn} /><span>{r.comment_count}</span></a>

                        </div>
                      </div>
                      
                      {(this.state.comments.length > 0) ?
                        <div className="full_width feedcommentsArea">
                          <>
                          {(this.props.match.params.id == '6268' || this.props.match.params.id == 6268)?
                            <div className="full_width mb-3 ssn_p_BoxTop">
                              <span class="font_12px radius-6 font600 colorBlue feed_right_SsnBoxLive">Live chat</span>
                            </div>:null}
                          </>
                          {this.state.comments.map((r, index) => (
                            <div className="full_width feedcommentsRow">
                              <div className="radius-100 feedcommentsPic">
                                <img className="object_fit_cover" src={r.images} />
                              </div>
                              <h5 className="font_16px font600 colorBlack feedcommentsBy">Dr. {r.last_name}</h5>
                              <p>{r.body}</p>
                              <h6 className="font_14px font600 feedcommentsByBtm"><span><Moment format="MMMM Do YYYY">{r.created_at}</Moment></span></h6>
                              {/* <h6 className="font_14px font600 feedcommentsByBtm"><span>{r.created_at}</span> <a href="javascript:void(0)" onClick={() => { this.opensub(index); }} className="colorBlack append_divv">{(r.children.length > 0) ? <span>{r.children.length}</span> : null} Reply</a></h6> */}
                              <div className={"hh_" + index + " " + "off"} style={{ "display": "none" }}>
                                {r.children.map((rchild, index) => (
                                  <div className="full_width feedcommentsRowReply">
                                    <div className="full_width feedcommentsRow">
                                      <div className="radius-100 feedcommentsPic">
                                        <img className="object_fit_cover" src={rchild.images} /> 
                                      </div>
                                      <h5 className="font_16px font600 colorBlack feedcommentsBy">Dr. {rchild.last_name}</h5>
                                      <p>{rchild.body}</p>
                                      <h6 className="font_14px font600 feedcommentsByBtm"><span><Moment format="MMMM Do YYYY">{rchild.created_at}</Moment></span></h6>
                                    </div>
                                  </div>
                                ))}

                                <div className="full_width feedDtls_comment_frm" >
                                  <Form.Control className={'font_14px' + 'font500 radius-6 feedfooterComment reply_text_' + index} type="text" placeholder="Write a reply here" />
                                  <Form.Control type="submit" value="Submit" onClick={() => this.submitreply(r.type_id, r.type, index, r.commentId)} className="bgColorGreen colorWhite font600 feedDtls_commentSubmit" />
                                </div>


                              </div>
                            </div>
                          ))}


                        </div> : null}

                      <div className="full_width feedDtls_comment">
                        {/* {(this.props.match.params.id == '6268' || this.props.match.params.id == 6268)?
                        <div className="full_width feedDtls_comment_frm">
                          <Form.Control className="font_14px font500 radius-6 feedfooterComment main_comment" type="text" placeholder={(reactLocalStorage.get('@ClirnetStore:first_name', true) == true)?"Write a comment here":"Chat publically as "+ reactLocalStorage.get('@ClirnetStore:first_name', true)+' ...'} />
                          <Form.Control type="submit" onClick={() => this.submitcomment(r.type_id, r.type, 0, 0)} value="Send" className="bgColorGreen colorWhite font600 feedDtls_commentSubmit" />
                        </div>: */}
                        <div className="full_width feedDtls_comment_frm">
                        <Form.Control className="font_14px font500 radius-6 feedfooterComment main_comment" type="text" placeholder="Write a comment here" />
                        <Form.Control type="submit" onClick={() => this.submitcomment(r.type_id, r.type, 0, 0)} value="Submit" className="bgColorGreen colorWhite font600 feedDtls_commentSubmit" />
                      </div>
                      {/* } */} 
                      </div>
                    </div>
                    {/* //////////////////////Added by sumit//////////////////////// */}
                    {(poll_list_data.length == 0)?null:this.renderPolls()}
                    {/* ////////////////////////////////////////////////// */} 
                  </div>
                ))}
                <div className="feed_right_2">
                {(banner_sidebar_top_type==='video' && this.state.related_comp.length > 0)?
                <div onClick={() => { this.banner_click_track(banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key].banner_id,'Feeddetail',prev_compendium[0].type_id,'Sidebar-Top'); }} className="full_width text-center add_area_top sidebar_top_banner_div">
<div className="full_width addAreaVideo video_imagecont_sidebar_top" id="video_imagecont_sidebar_top">
{(banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key].url!="")?
<a id="banner_href_sidebar_top" target="__blank" href={banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key].url}>
<h4 className="font_10px font500 colorBlack text-right advertisement_ttl">Advertisement</h4>
<video playsInline  style={{"pointer-events": "none"}} muted="muted" id="video_sidebar_top_container"   autoplay="autoplay" width={banner_sidebar_top_width} height={banner_sidebar_top_height}  >
<source id="video_sidebar_top" src={banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key].image} type="video/mp4"/>
</video></a>:
<a id="banner_href_sidebar_top"  href="javascript:void(0)">
<h4 className="font_10px font500 colorBlack text-right advertisement_ttl">Advertisement</h4>
<video playsInline  style={{"pointer-events": "none"}} muted="muted" id="video_sidebar_top_container"   autoplay="autoplay" width={banner_sidebar_top_width} height={banner_sidebar_top_height}  >
<source id="video_sidebar_top" src={banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key].image} type="video/mp4"/>
</video></a>}




</div>


{/* <Slider {...settings} className="addSlider">
<div className="full_width adSlider-in">
<img src="https://www.f-covers.com/cover/slick-diagonal-line-pattern-facebook-cover-timeline-banner-for-fb.jpg"/>
</div>
<div className="full_width adSlider-in">
<img src="https://www.bluepixeldesign.co.uk/wp-content/uploads/2015/08/new-slick-banner.jpg"/>
</div>
</Slider> */}
</div>:null}

{(banner_sidebar_top_type==='image' && this.state.related_comp.length > 0)?
      <div onClick={() => { this.banner_click_track(banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key].banner_id,'Feeddetail',prev_compendium[0].type_id,'Sidebar-Top'); }} className="full_width text-center add_area_top   sidebar_top_banner_div">
        {(banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key].url!="")?
<a id="banner_href_sidebar_top" target="_blank" href={banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key].url}>
<h4 className="font_10px font500 colorBlack text-right advertisement_ttl">Advertisement</h4><img id="sidebar_top_image"  src={banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key].image}/></a>:
<a id="banner_href_sidebar_top" href="javascript:void(0)">
<h4 className="font_10px font500 colorBlack text-right advertisement_ttl">Advertisement</h4><img id="sidebar_top_image" src={banner_sidebar_top_url_and_redirect[banner_sidebar_top_play_key].image}/></a>}

</div>:null}

{/* ///////////////////////////////////////////////////////// */}
{(this.props.match.params.id == "6737" ||  this.props.match.params.id == 6737)?  
        <div className="full_width ssn_p_box feed_right_SsnBox">    
                	<div className="full_width radius-6 bgColorWhite ssn_p_boxIn">
                  <div className="full_width ssn_p_BoxTop">
                  <h4 className="font_12px font600 my_session_box_type">
                <img src={masterconsultlogo} width="24" height="24" alt="icon"/>
                     <span className="colorGreen">MasterCast</span>
                     </h4>
                     <span className="font600 colorBlack feed_right_SsnBoxLive">Live</span>
    
 {/* <div className="my_session_box_sponsors">
 <span className="font_12px font600 colorBlack">Powered by</span>
   <a href="javascript:void(0);"><img src="https://doctor.clirnet.com/knowledge/uploads/logo/200-1.png" alt="logo"/></a>
</div> */}
                 
                  </div>

<div className="clearfix"></div>

                    	<h2 className="colorBlack font700 font_14px my_session_box_ttl">Metastatic Colorectal Cancer</h2>
                       
                       
                    	  <div className="full_width session_Row">
                        	<div className="radius-100 session_RowPIc">
                            	<img src="https://doctor.clirnet.com/knowledge/uploads/docimg/thumb/75_75_b01525a9227E7C2961cB100029.png" className="object_fit_cover radius-100"/>
                            </div>
                      <h2 className="colorBlack font700 font_14px session_doctor">Dr. Suman Mallik 
                      <span className="colorGrey font_12px font600">Radiation Oncology</span></h2>
                        </div>
                    	<div className="full_width text-center my_session_box_btns">  
                            <a href="javascript:void(0);"  className="radius-6 full_width cmnBtn btnBlue" onClick={() => { this.redirect_to_feed_demo();}}>Join Now / View Details</a>
                        </div>
                        <div className="full_width text-left feed_footer">
                        <InlineShareButtons
          config={{
            alignment: 'center',  // alignment of buttons (left, center, right)
            color: 'white',      // set the color of buttons (social, white)
            enabled: true,        // show/hide buttons (true, false)
            font_size: 16,        // font size for the buttons
            labels: 'null',        // button labels (cta, counts, null)
            language: 'en',       // which language to use (see LANGUAGES)
            networks: [           // which networks to include (see SHARING NETWORKS)
              'whatsapp',
              'messenger',
              'facebook',
              'twitter'
            ],
            padding: 0,          // padding within buttons (INTEGER)
            radius: 6,            // the corner radius on each button (INTEGER)
            show_total: false,
            size: 30,             // the size of each button (INTEGER)
 
            // // OPTIONAL PARAMETERS
            // url: r.deeplink, // (defaults to current url)
            // image: 'https://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
            // description:r.session_topic,       // (defaults to og:description or twitter:description)
            // title: r.session_topic,            // (defaults to og:title or twitter:title)
            message: '',     // (only for email sharing)
            subject: '',  // (only for email sharing)
            username: 'medwiki view' // (only for twitter sharing)
          }}
        />
        </div>

        <div className="full_width text-center my_session_box_sponsors">
        <span className="font_12px font600 colorBlack">Powered by</span>
          <a href="javascript:void(0);"><img src="https://doctor.clirnet.com/knowledge/uploads/logo/200-1.png" alt="logo"/></a>
        </div>
                    </div>
                </div>:null}
{/* /////////////////////////////////////////////////// */}

<div class="clearfix"></div>
                {(this.state.related_comp.length > 0) ?
                  <div class="full_width radius-6 text-left specialty_comp_right">



                    <h2 class="bgColorBlue font600 colorWhite font600 font_20px specialtyTtl">Related
              </h2>

                    <div class="clearfix"></div>
                    {(this.state.related_comp.length > 0) ?
                      <div class="full_width font600 specialty_comp_right_text">


                        {this.state.related_comp.map(r =>
                          <div className="full_width relatedRow withImg">
                            <a href="javascript:void(0)" onClick={() => { this.redirect_to_compendium_detail(r.type_id); }}>
                              <div className="full_width font_12px relatedRowTop"><span className="colorBlack font600">{r.specialities.replace(/,/g, ", ")}</span> <span className="float-right colorGrey">{r.date}</span></div>
                              <div className="full_width relatedRowIn">
                                {(r.image != "") ?
                                  <div className="radius-6 relatedRowPic">
                                    <img className="object_fit_cover" src={r.image} />
                                  </div> :
                                  <div className="radius-6 relatedRowPic">
                                    <img className="object_fit_cover" src={medwikiicon} />
                                  </div>
                                }

                                <h2 className="font600 transition6s font_12px colorBlack relatedRowTtl">
                                  {/* a. What should be the diagnostic tests for breast cancer?
b. What should be the screening process if the mammography result is negative? */}
                                  {r.question.substring(0, 100)}...
                  </h2>
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



                      </div> :
                      // <div className="col">
                      //   <div class="full_width font600 specialty_comp_right_text"><div className="full_width alert alert-danger">
                      //     <strong>No Matches</strong>
                      //   </div></div></div>
                        null }
                    <div class="clearfix"></div>

                  </div>:null}

                  {(banner_sidebar_bottom_type==='video' && this.state.related_comp.length > 0)?
                  <div onClick={() => { this.banner_click_track(banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key].banner_id,'Feeddetail',prev_compendium[0].type_id,'Sidebar-Bottom'); }} className="full_width text-center add_area_top banner_sidebar_bottom_type">
<div className="full_width addAreaVideo video_imagecont_sidebar_bottom" id="video_imagecont_sidebar_bottom">
{(banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key].url!="")?
<a id="banner_href_sidebar_bottom" target="__blank" href={banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key].url}>
<h4 className="font_10px font500 colorBlack text-right advertisement_ttl">Advertisement</h4>
<video playsInline  style={{"pointer-events": "none"}} muted="muted" id="video_sidebar_bottom_container"   autoplay="autoplay" width={banner_sidebar_bottom_width} height={banner_sidebar_bottom_height}  >
<source id="video_sidebar_bottom" src={banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key].image} type="video/mp4"/>
</video></a>:

<a id="banner_href_sidebar_bottom"  href="javascript:void(0)">
<h4 className="font_10px font500 colorBlack text-right advertisement_ttl">Advertisement</h4>
<video playsInline  style={{"pointer-events": "none"}} muted="muted" id="video_sidebar_bottom_container"  autoplay="autoplay" width={banner_sidebar_bottom_width} height={banner_sidebar_bottom_height}  >
<source id="video_sidebar_bottom" src={banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key].image} type="video/mp4"/>
</video></a>}

</div>


{/* <Slider {...settings} className="addSlider">
<div className="full_width adSlider-in">
<img src="https://www.f-covers.com/cover/slick-diagonal-line-pattern-facebook-cover-timeline-banner-for-fb.jpg"/>
</div>
<div className="full_width adSlider-in">
<img src="https://www.bluepixeldesign.co.uk/wp-content/uploads/2015/08/new-slick-banner.jpg"/>
</div>
</Slider> */}
</div>:null}


{(banner_sidebar_bottom_type==='image' && this.state.related_comp.length > 0)?
      <div onClick={() => { this.banner_click_track(banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key].banner_id,'Feeddetail',prev_compendium[0].type_id,'Sidebar-Bottom'); }} className="full_width text-center add_area_top   banner_sidebar_bottom_type">
       
        {(banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key].url!="")?
<a id="banner_href_sidebar_bottom" target="_blank" href={banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key].url}>
<h4 className="font_10px font500 colorBlack text-right advertisement_ttl">Advertisement</h4>
  <img id="sidebar_bottom_image" src={banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key].image}/></a>:
<a id="banner_href_sidebar_bottom" href="javascript:void(0)"><h4 className="font_10px font500 colorBlack text-right advertisement_ttl">Advertisement</h4><img id="sidebar_bottom_image" src={banner_sidebar_bottom_url_and_redirect[banner_sidebar_bottom_play_key].image}/></a>}

</div>:null}


                </div>


               

              </section>

              {(banner_bottom_type==='video')?
              <div onClick={() => { this.banner_click_track(banner_bottom_url_and_redirect[banner_bottom_play_key].banner_id,'Feeddetail',prev_compendium[0].type_id,'Bottom'); }} className="full_width text-center add_area_top bottom_banner_div">
<div className="full_width addAreaVideo video_imagecont_bottom" id="video_imagecont_bottom">
{(banner_bottom_url_and_redirect[banner_bottom_play_key].url!="")?
<a id="banner_href_bottom" target="__blank" href={banner_bottom_url_and_redirect[banner_bottom_play_key].url}>
<h4 className="font_10px font500 colorBlack text-right advertisement_ttl">Advertisement</h4>
<video playsInline  style={{"pointer-events": "none"}} muted="muted" id="video_bottom_container"   autoplay="autoplay" width={banner_bottom_width} height={banner_bottom_height}  >
<source id="video_bottom" src={banner_bottom_url_and_redirect[banner_bottom_play_key].image} type="video/mp4"/>
</video></a>:
<a id="banner_href_bottom"  href="javascript:void(0)">
<h4 className="font_10px font500 colorBlack text-right advertisement_ttl">Advertisement</h4>
<video playsInline  style={{"pointer-events": "none"}} muted="muted" id="video_bottom_container"  autoplay="autoplay" width={banner_bottom_width} height={banner_bottom_height}  >
<source id="video_bottom" src={banner_bottom_url_and_redirect[banner_bottom_play_key].image} type="video/mp4"/>
</video></a>}
</div>
{/* <Slider {...settings} className="addSlider">
<div className="full_width adSlider-in">
<img src="https://www.f-covers.com/cover/slick-diagonal-line-pattern-facebook-cover-timeline-banner-for-fb.jpg"/>
</div>
<div className="full_width adSlider-in">
<img src="https://www.bluepixeldesign.co.uk/wp-content/uploads/2015/08/new-slick-banner.jpg"/>
</div>
</Slider> */}
</div>:null}



{(banner_bottom_type==='image')?
      <div onClick={() => { this.banner_click_track(banner_bottom_url_and_redirect[banner_bottom_play_key].banner_id,'Feeddetail',prev_compendium[0].type_id,'Bottom'); }} className="full_width text-center add_area_top   bottom_banner_div">
        {(banner_bottom_url_and_redirect[banner_bottom_play_key].url!="")?
<a id="banner_href_bottom" target="_blank" href={banner_bottom_url_and_redirect[banner_bottom_play_key].url}><h4 className="font_10px font500 colorBlack text-right advertisement_ttl">Advertisement</h4><img id="bottom_image" src={banner_bottom_url_and_redirect[banner_bottom_play_key].image}/></a>:
<a id="banner_href_bottom" href="javascript:void(0)"><h4 className="font_10px font500 colorBlack text-right advertisement_ttl">Advertisement</h4><img id="bottom_image" src={banner_bottom_url_and_redirect[banner_bottom_play_key].image}/></a>}

</div>:null}

            </div>

         




        </section>


        <Footer  history={this.props.history}/>  

      </div>

    );
  }
}

export default Feeddetail;
