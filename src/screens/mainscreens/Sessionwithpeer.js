import React from 'react';
import Button from 'react-bootstrap/Button'
import Loader from 'react-loader-spinner'
//import { Link,BrowserRouter } from 'react-router-dom';
import Popup from "reactjs-popup"
import firebase from 'firebase/app'
import $ from 'jquery';
import  'firebase/storage'
import DatePicker from "react-datepicker";
import {isMobile} from 'react-device-detect';

import "react-datepicker/dist/react-datepicker.css"
import {reactLocalStorage} from 'reactjs-localstorage';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import AppConfig from '../config/config.js';
import {InlineShareButtons} from 'sharethis-reactjs';
import Header from '../mainscreens/Header';
import Footer from '../mainscreens/Footer';
import filterIcon from '../../images/filterIcon.png';
import calenderIcon from '../../images/cal-black.png';
import Banner from '../mainscreens/Banner';
import masterconsultlogo from '../../images/session_box_type-3.png';
import mastercirclelogo from '../../images/session_box_type-2.png';

import mastercastlogo from '../../images/session_box_type-1.png';

import closeIcon from '../../images/close.png';
import filterWhite from '../../images/filter-white.png';
import reload from '../../images/reload.png';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'
var dateFormat = require('dateformat');
const gtag = window.gtag;

const pageNames = "Live CME"

var api_call_pemission=1;
const url = AppConfig.apiLoc;
let button_val="allinone";
var upcoming_session_pagination_limit=0;
var cme_session_pagination_limit=0;
var reserved_session_pagination_limit=0;
var searched_session_pagination_limit=0;
var prev_upcoming_session=[];
var prev_searched_session=[];
var prev_cme_session=[];
var prev_reserved_session=[];
var is_upcoming_block_display=0;
var is_cme_block_display=0;
var is_reserved_block_display=0;
var is_more_upcoming=1;
var is_more_searched=1;
var is_more_cme=1;
var is_more_reserved=1;

var is_more_searched=1;
let booked_session=[];
var is_other_on=0;
var speciality=[];
var selected_spec=[];

var is_searched=0;


class Sessionwithpeer extends React.Component {
 
  constructor(props) {
      super(props);
      
      this.state = {
        phone_no: '',
        err_msg:"",
        otp:"",
        session_listing_upcoming:[],
        session_listing_reserved:[],
        session_listing_searched:[],
        session_listing_cme:[],
        selected_session:0,
        prev_selected_session:0,
        viewrefresh:false,
        is_loader:true,
        is_loader_more:false,
        showPopup: false ,
        other_on:0,
        other_reason:"",
        reason:"",
        cancel_session_id:"",
        cancel_particiment_id:"",
        showModal:false,
        startDate: "",
        endDate: "",
        sel_ses:0,
        is_error:0,
        speciality:[],
        change_flag:true,
        mastercast_search:false,
        mastercircle_search:false,
        masterconsult_search:false,
        search_err:""
        
    };
   
   
    
    
    this.handleDateChange = this.handleDateChange.bind(this);
    this.redirect_to_session_booking = this.redirect_to_session_booking.bind(this);

    this.handleChangeto = this.handleChangeto.bind(this);
    this.handleChangeother = this.handleChangeother.bind(this);
    this.get_search_result = this.get_search_result.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }
  selectspec(id)
  {
    
    if(selected_spec.indexOf(id) != -1)
    { 
      var index=selected_spec.indexOf(id);
      selected_spec.splice(index, 1); 
       // element found
    }

    else
    {
      selected_spec.push(id);
    }

    
this.setState({"change_flag":!this.state.change_flag})



    
  }

  componentWillUnmount()
  {
    //alert();
    $('body').removeClass('right_PopShowBody');
    $(window).unbind('scroll');
  }
  togglePopup() {  
    this.setState({  
         showPopup: !this.state.showPopup  
    });  
     }

     cancel_session(val)
     {
      let has_error=0;
      if(this.state.reason==="")
      {
        has_error=1;
        
        this.setState({"err_msg":"Please Enter Reason Of Cancellation."})
      }

      if(has_error==0)
   {
   let parsers={
      "session_id": this.state.cancel_session_id ,
      "cancelation_reason": this.state.reason ,
      "other_reason": this.state.other_reason ,
      "participant_id": this.state.cancel_particiment_id
    }

    
   fetch(url+'knwlgmastersession/cancelsession', {
      method: 'POST',
      headers: {
         'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'  
         },
      body: JSON.stringify(parsers),
    })
    .then((response) => response.json())
    .then((responseJson) => {
    if(responseJson.status_code=="203")
    {
      this.setState({"err_msg":responseJson.message}) 
    }
    if(responseJson.status_code=="200")
    {
     
      $("#res_"+val+"").remove();
     this.setState({"showModal":false})
     ToastsStore.success("Your Reservation Has Been Cancelled.")

    }
    
    })
    .catch((error) => {
      //alert(error)
      
      this.setState({"err_msg":"Something went Wrong"}) ;
      setTimeout(() => {
        this.setState({ "err_msg": "" });
      }, 3000);
    });
   }
     }

     componentWillMount()
     {
      window.scrollTo(0, 0); 
     }

      onScroll(){
        
        //alert();

        var tempobj=this;

         //alert("scrolled")
         tempobj.setState({"is_loader_more":true})
        
         if(is_searched==0)
         {

          
          
         tempobj.redirect_to_session_type_automatic(button_val);
 
         switch(button_val) {
           case 'allinone':
               upcoming_session_pagination_limit=upcoming_session_pagination_limit+3;
           break;
 
           case 'cme':
               cme_session_pagination_limit=cme_session_pagination_limit+3;
           break;
 
           case 'reserved':
               reserved_session_pagination_limit=reserved_session_pagination_limit+3;
           break;
           default:
          {
          
 
           
          }
         }
       }
 
       else
       {

        


        
         searched_session_pagination_limit=searched_session_pagination_limit+3;
         tempobj.get_search_result_pagination();
       }
      
  }

  componentDidMount()
  {
    window.document.title = "CLIRNET - Select Peer for MS"
    gtag('config', AppConfig.gtag_measure_id, {
			'page_title': window.document.title,
			'page_location': window.location.href,
			'page_path': window.location.pathname
			});
    $(".ses_mobile").addClass("active");


    if(this.props.location.selected_session!=undefined && this.props.location.selected_session!=0)
    {
      
      this.setState({selected_session:this.props.location.selected_session})
      this.setState({prev_selected_session:this.props.location.selected_session})
      
    }

    if(this.props.location.key_file!=undefined)
{
  
  this.setState({upload_url:this.props.location.key_file})
  
}
if(this.props.location.sel_qry!=undefined)
{
  
  this.setState({query:this.props.location.sel_qry})
  
}
    api_call_pemission=1;
    is_searched=0;
    speciality=[]
    selected_spec=[];
    window.scrollTo(0, 0);

    //this.setState({"session_listing_upcoming":[]})

    var tempobj=this;
    $(document.body).on('touchmove', this.onScroll);
  
    $(window).scroll(function() {
      
      if(api_call_pemission==1)
      {
        

        api_call_pemission=0;

      

      

        //alert("scrolled")
        tempobj.setState({"is_loader_more":true})

        if(is_searched==0)
        {
        tempobj.redirect_to_session_type_automatic(button_val);

        switch(button_val) {
          case 'allinone':
              upcoming_session_pagination_limit=upcoming_session_pagination_limit+3;
          break;

          case 'cme':
              cme_session_pagination_limit=cme_session_pagination_limit+3;
          break;

          case 'reserved':
              reserved_session_pagination_limit=reserved_session_pagination_limit+3;
          break;
          default:
         {
         

          
         }
        }
      }

      else
      {

        
       
        searched_session_pagination_limit=searched_session_pagination_limit+3;
        tempobj.get_search_result_pagination();
      }
            
    }  
   });


    is_other_on=0

   upcoming_session_pagination_limit=0;
   searched_session_pagination_limit=0;
 cme_session_pagination_limit=0;
 reserved_session_pagination_limit=0;
 prev_upcoming_session=[];
prev_cme_session=[];
prev_searched_session=[];
prev_reserved_session=[];
is_upcoming_block_display=0;
is_cme_block_display=0;
is_reserved_block_display=0;
is_more_upcoming=1;
is_more_searched=1;
is_more_cme=1;
is_more_reserved=1;
booked_session=[];


var tempobj=this;
    if(reactLocalStorage.get('@ClirnetStore:my_sessions', true)==1)
    {

      //alert();
     
     button_val="reserved";
     //reserved_session_pagination_limit=0;
     tempobj.redirect_to_session_type(button_val);
     reactLocalStorage.set('@ClirnetStore:my_sessions', 0);

    }

    else
    {



    

       fetch(url+'knwlgmastersession/upcomingmastersession?from='+upcoming_session_pagination_limit+'&to=3', {
          method: 'GET',
          headers: {
            //Accept: 'application/json',
            //"cache-control": "no-cache",
            
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
    
          responseJson.data.map(r =>{
         
            prev_upcoming_session.push(r);
          })
          
       console.log(prev_upcoming_session);
        
        
          
        is_upcoming_block_display=1;
        this.setState({"session_listing_upcoming":prev_upcoming_session})
        button_val='allinone'
        //upcoming_session_pagination_limit=upcoming_session_pagination_limit+3;
        this.setState({"is_loader":false});
        //console.log(this.state.session_listing_upcoming[0]);
        }).catch((error) => {
         
        });
      
        upcoming_session_pagination_limit=upcoming_session_pagination_limit+3;
        $('.tRright_popClose').on('click',function(){
          $('body').removeClass('right_PopShowBody');
        });
        $('.tRright_popShow').on('click',function(){
          $('body').addClass('right_PopShowBody');
        });
      }


$('.li_session').attr('id', 'session_cal');





fetch(url+'authnew/getallspeciality', {
  method: 'GET',
  headers: {
    //Accept: 'application/json',
    //"cache-control": "no-cache",
     'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'
   
    
  }
}).then((response) => response.json()).then((responseJson) => {

  responseJson.data.speciality_data.map(r =>{
 
    speciality.push(r);
  })


  this.setState({"speciality":speciality})

  console.log(this.state.speciality)
  
}).catch((error) => {
 
});


  }


  open_other(val)
  {
    if(val=='others')
    {
    is_other_on=1; 
    this.setState({"reason":val});
    this.setState({"other_on":!this.state.other_on});
    }
    else
    {
      is_other_on=0; 
      this.setState({"other_on":!this.state.other_on});
      this.setState({"reason":val});

      this.setState({"other_reason":""});
    }
  }

  handleDateChange(e) {

   
    this.setState({"startDate":e})

    this.setState({"endDate":""})
  }

  handleChangeto(e) {

   
    

    this.setState({"endDate":e})
  }



  redirect_to_session_type(val)
  {
    switch(val) {
        case 'allinone':
           fetch(url+'knwlgmastersession/upcomingmastersession?from='+upcoming_session_pagination_limit+'&to=3', {
                method: 'GET',
                headers: {
                  //Accept: 'application/json',
                  //"cache-control": "no-cache",
                  
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

                responseJson.data.map(r =>{
               
                  prev_upcoming_session.push(r);
                })
                
               if(responseJson.data.length==0)
               {
                is_more_upcoming=0;
               }
               else{
                is_more_upcoming=1;
               }
              
              
                
              is_upcoming_block_display=1;
              is_cme_block_display=0;
              is_reserved_block_display=0;
              button_val='allinone'
              this.setState({"session_listing_upcoming":prev_upcoming_session})
              
              upcoming_session_pagination_limit=upcoming_session_pagination_limit+3;
              this.setState({"is_loader":false});
              this.setState({"is_loader_more":false});
              //console.log(this.state.session_listing_upcoming[0]);
              }).catch((error) => {
               
              });
          break;
          case 'cme':
            
           fetch(url+'knwlgmastersession/upcomingmastersessioncme?from='+cme_session_pagination_limit+'&to=3', {
              method: 'GET',
              headers: {
                //Accept: 'application/json',
                //"cache-control": "no-cache",
                
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
             
              responseJson.data.map(r =>{
               
                prev_cme_session.push(r);
              })
              
              if(responseJson.data.length==0)
              {
               is_more_cme=0;
              }
              else{
               is_more_cme=1;
              }
            
            
              
              is_upcoming_block_display=0;
              is_reserved_block_display=0;
            is_cme_block_display=1;
            cme_session_pagination_limit=cme_session_pagination_limit+3;
            button_val='cme';
            this.setState({"session_listing_cme":prev_cme_session})
            this.setState({"is_loader":false});
            this.setState({"is_loader_more":false});
            //console.log(this.state.session_listing_upcoming[0]);
              
              
            }).catch((error) => {
             
            });
            break;
          case 'reserved':
            reserved_session_pagination_limit=0
            prev_reserved_session=[]
           fetch(url+'knwlgmastersession/bookedmastersession?from='+reserved_session_pagination_limit+'&to=3', {
              method: 'GET',
              headers: {
                //Accept: 'application/json',
                //"cache-control": "no-cache",
                
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

              
              console.log(responseJson.data);
             
              responseJson.data.map(r =>{
               
                prev_reserved_session.push(r);
              })
              
              if(responseJson.data.length==0)
              {
               is_more_reserved=0;
              }
              else{
                is_more_reserved=1;
              }
            
            
              
              is_upcoming_block_display=0;
            is_cme_block_display=0;
            is_reserved_block_display=1;
            reserved_session_pagination_limit=reserved_session_pagination_limit+3;
            button_val='reserved';
            this.setState({"session_listing_reserved":prev_reserved_session})
            this.setState({"is_loader":false});
            this.setState({"is_loader_more":false});
            //console.log(this.state.session_listing_upcoming[0]);
              
              
            }).catch((error) => {
             
            });
            break;
         
  
        default:
         {
         

          
         }

         
      }
  }








  redirect_to_session_type_automatic(val)
  {
    switch(val) {
        case 'allinone':
           fetch(url+'knwlgmastersession/upcomingmastersession?from='+upcoming_session_pagination_limit+'&to=3', {
                method: 'GET',
                headers: {
                  //Accept: 'application/json',
                  //"cache-control": "no-cache",
                  
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

                responseJson.data.map(r =>{
               
                  prev_upcoming_session.push(r);
                })
                
               if(responseJson.data.length==0)
               {
                is_more_upcoming=0;
               }
               else{
                is_more_upcoming=1;
               }
              
               api_call_pemission=1;
                
              is_upcoming_block_display=1;
              is_cme_block_display=0;
              is_reserved_block_display=0;
              button_val='allinone'
              this.setState({"session_listing_upcoming":prev_upcoming_session})
              
              //upcoming_session_pagination_limit=upcoming_session_pagination_limit+3;
              this.setState({"is_loader":false});
              this.setState({"is_loader_more":false});
              //console.log(this.state.session_listing_upcoming[0]);
              }).catch((error) => {
               
              });
          break;
          case 'cme':
           fetch(url+'knwlgmastersession/upcomingmastersessioncme?from='+cme_session_pagination_limit+'&to=3', {
              method: 'GET',
              headers: {
                //Accept: 'application/json',
                //"cache-control": "no-cache",
                
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
              responseJson.data.map(r =>{
               
                prev_cme_session.push(r);
              })
              
              if(responseJson.data.length==0)
              {
               is_more_cme=0;
              }
              else{
               is_more_cme=1;
              }

              api_call_pemission=1;
            
            
              
              is_upcoming_block_display=0;
              is_reserved_block_display=0;
              is_cme_block_display=1;
            //cme_session_pagination_limit=cme_session_pagination_limit+3;
            button_val='cme';
            this.setState({"session_listing_cme":prev_cme_session})
            this.setState({"is_loader":false});
            this.setState({"is_loader_more":false});
            //console.log(this.state.session_listing_upcoming[0]);
              
              
            }).catch((error) => {
             
            });
            break;
          case 'reserved':
           fetch(url+'knwlgmastersession/bookedmastersession?from='+reserved_session_pagination_limit+'&to=3', {
              method: 'GET',
              headers: {
                //Accept: 'application/json',
                //"cache-control": "no-cache",
                
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
             
              responseJson.data.map(r =>{
               
                prev_reserved_session.push(r);
              })

              console.log(prev_reserved_session)
              
              if(responseJson.data.length==0)
              {
               is_more_reserved=0;
              }
              else{
                is_more_reserved=1;
              }
            
              api_call_pemission=1;
              
              is_upcoming_block_display=0;
            is_cme_block_display=0;
            is_reserved_block_display=1;
            //reserved_session_pagination_limit=reserved_session_pagination_limit+3;
            button_val='reserved';
            this.setState({"session_listing_reserved":prev_reserved_session})
            this.setState({"is_loader":false});
            this.setState({"is_loader_more":false});
            //console.log(this.state.session_listing_upcoming[0]);
              
              
            }).catch((error) => {
             
            });
            break;
         
  
        default:
         {
         

          
         }

         
      }
  }

  get_search_result()
  {
    searched_session_pagination_limit=0;
    prev_searched_session=[];
    is_more_searched=0
    this.setState({"is_loader":true});
    this.setState({"search_err":""})
     if(this.state.mastercast_search==false && this.state.mastercircle_search==false && this.state.masterconsult_search==false  && selected_spec.length<=0 && this.state.startDate=="" && this.state.endDate=="")
     {
       this.setState({"search_err":"Plese Select Atleast One Option."})
       this.setState({"is_loader":false});
     }

     else
     {
       
       if((this.state.startDate=="" && this.state.endDate!="")||(this.state.startDate!="" && this.state.endDate==""))
       {
        this.setState({"search_err":"Plese Select Both Dates."})
        this.setState({"is_loader":false});
       }

       else
       {
        
        var fasstartdate="";
        var myDatelast="";
        if(this.state.startDate!="" && this.state.endDate!="")
        {
        
        var fasstartdate="";
       fasstartdate=dateFormat(this.state.startDate, "dd-mm-yyyy")

        var myDatestart=fasstartdate.split("-");
var newDatestart=myDatestart[1]+"/"+myDatestart[0]+"/"+myDatestart[2];


var faslastdate=dateFormat(this.state.endDate, "dd-mm-yyyy")
        
         myDatelast=faslastdate.split("-");
var newDatelast=myDatelast[1]+"/"+myDatelast[0]+"/"+myDatelast[2];
        }

        if(new Date(newDatelast).getTime()<new Date(newDatestart).getTime()) 
        {
          this.setState({"is_loader":false});
          this.setState({"search_err":"Plese Enter Dates Correctly"})
        }

        else
        {
          is_searched=1;
         //alert(this.state.mastercast_search+"hhh"+this.state.masterconsult_search+"hhh"+this.state.mastercircle_search)
        if(this.state.mastercast_search==false && this.state.masterconsult_search==false && this.state.mastercircle_search==false)
            {

             
              
              this.setState({"mastercast_search":true})
              this.setState({"masterconsult_search":true})
              this.setState({"mastercircle_search":true})
            }
var tmobj=this;


            setTimeout(function(){ 
          fasstartdate = fasstartdate + '';
          myDatelast = faslastdate + '';

          
              if(myDatelast==undefined || myDatelast=="undefined")
              {
                //alert(myDatelast)
                myDatelast=""
              }

              if(fasstartdate==undefined || myDatelast=="undefined")
              {
                fasstartdate=""
              }
          //alert(fasstartdate)
          var search_json={
            "short_options":
          {
            
            "shortBySpeakerName":"",
            "shortByAddOn":""
          },
            "filter_options" : {
              "dateTo" : myDatelast ,
              "dateFrom" : fasstartdate, 
              "showMasterCast":tmobj.state.mastercast_search, 
              "showMasterConsult":tmobj.state.masterconsult_search,
              "showMasterCircle":tmobj.state.mastercircle_search,
              "showAvailableSession":true,
              "showUpcomingSession":true,
              "showCompleteSession":false,
              "speakerType":"",
              "specialityIds":selected_spec.join()
            }
              ,"type":"session","from":searched_session_pagination_limit,"to":3
            }


//return;


             fetch(url+'knwlgmastersession/filterSession', {
                method: 'POST',
                headers: {
                   'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'
                   },
                body: JSON.stringify(search_json),
              })
              .then((response) => response.json())
              .then((responseJson) => {

                console.log(responseJson.data)
                responseJson.data.map(r =>{
                  
                  prev_searched_session.push(r);
                 
                })

                if(responseJson.data.length==0)
               {
                is_more_searched=0;
               }
               else{
                is_more_searched=1;
               }
                
               tmobj.setState({"is_loader":false});
                $('body').removeClass('right_PopShowBody');
                tmobj.setState({"session_listing_searched":prev_searched_session})
              })
              .catch((error) => {
                //alert(error)
                tmobj.setState({"is_loader":false});
                tmobj.setState({"err_msg":"Something went Wrong"}) ;
              });
            }, 10);
      }
    

       }
     }
  }

  final_submit()
  {
    if(this.state.selected_session==0)
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
       
        key_file: this.state.upload_url,
        sel_qry:this.state.query ,
        selected_session:this.state.selected_session
         // your data array of objects
      })

    }
  }


  get_search_result_pagination()
  {
    
    this.setState({"is_loader":true});
    this.setState({"search_err":""})
     if(this.state.mastercast_search==false && this.state.mastercircle_search==false && this.state.masterconsult_search==false  && selected_spec.length<=0 && this.state.startDate=="" && this.state.endDate=="")
     {
       this.setState({"search_err":"Plese Select Atleast One Option."})
       this.setState({"is_loader":false});
     }

     else
     {
       if((this.state.startDate=="" && this.state.endDate!="")||(this.state.startDate!="" && this.state.endDate==""))
       {
        this.setState({"search_err":"Plese Select Both Dates."})
        this.setState({"is_loader":false});
       }

       else
       {
        
        var fasstartdate="";
        var myDatelast="";
        if(this.state.startDate!="" && this.state.endDate!="")
        {
        
        var fasstartdate="";
       fasstartdate=dateFormat(this.state.startDate, "dd-mm-yyyy")

        var myDatestart=fasstartdate.split("-");
var newDatestart=myDatestart[1]+"/"+myDatestart[0]+"/"+myDatestart[2];


var faslastdate=dateFormat(this.state.endDate, "dd-mm-yyyy")
        
         myDatelast=faslastdate.split("-");
var newDatelast=myDatelast[1]+"/"+myDatelast[0]+"/"+myDatelast[2];
        }

        if(new Date(newDatelast).getTime()<new Date(newDatestart).getTime()) 
        {
          this.setState({"is_loader":false});
          this.setState({"search_err":"Plese Enter Dates Correctly"})
        }

        else
        {
          is_searched=1;
        //  alert(fasstartdate+"hhh"+myDatelast)
          fasstartdate = fasstartdate + '';
          myDatelast = faslastdate + '';

          
          if(myDatelast==undefined || myDatelast=="undefined")
          {
            //alert(myDatelast)
            myDatelast=""
          }

          if(fasstartdate==undefined || myDatelast=="undefined")
          {
            fasstartdate=""
          }
            if(this.state.mastercast_search==false && this.state.masterconsult_search==false && this.state.mastercircle_search==false)
            {
              
              this.setState({"mastercast_search":true})
              this.setState({"masterconsult_search":true})
              this.setState({"mastercircle_search":true})
            }

            var tmobj=this;


            setTimeout(function(){ 
          //alert(fasstartdate)
          var search_json={
            "short_options":
          {
            
            "shortBySpeakerName":"",
            "shortByAddOn":""
          },
            "filter_options" : {
              "dateTo" : myDatelast ,
              "dateFrom" : fasstartdate, 
              "showMasterCast":tmobj.state.mastercast_search, 
              "showMasterConsult":tmobj.state.masterconsult_search,
              "showMasterCircle":tmobj.state.mastercircle_search,
              "showAvailableSession":true,
              "showUpcomingSession":true,
              "showCompleteSession":false,
              "speakerType":"",
              "specialityIds":selected_spec.join()
            }
              ,"type":"session","from":searched_session_pagination_limit,"to":3
            }


//return;


             fetch(url+'knwlgmastersession/filterSession', {
                method: 'POST',
                headers: {
                   'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'
                   },
                body: JSON.stringify(search_json),
              })
              .then((response) => response.json())
              .then((responseJson) => {
                responseJson.data.map(r =>{
                  
                  prev_searched_session.push(r);
                 
                })

                if(responseJson.data.length==0)
               {
                is_more_searched=0;
               }
               else{
                is_more_searched=1;
               }
               api_call_pemission=1;
               tmobj.setState({"is_loader":false});
                $('body').removeClass('right_PopShowBody');
                tmobj.setState({"session_listing_searched":prev_searched_session})
              })
              .catch((error) => {
                //alert(error)
                tmobj.setState({"is_loader":false});
                tmobj.setState({"err_msg":"Something went Wrong"}) ;
              });
            }, 10);
      }

       }
       
     }
  }
  redirect_to_filt()
  {
    $('body').addClass('right_PopShowBody'); 
  }

  get_part(session_id)
  {
   fetch(url+'knwlgmastersession/sessiondetail?session_id='+session_id+'', {
      method: 'GET',
      headers: {
        //Accept: 'application/json',
        //"cache-control": "no-cache",
        
         'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'
        
      }
    }).then((response) => response.json()).then((responseJson) => {

      this.setState({"cancel_particiment_id":responseJson.data[0].my_participant_id})
     
    })
  }

  handleChangeother(e) {
  
    this.setState({"other_reason":e.target.value})
  }
  

  redirect_to_session_booking(id)
  {
    this.props.history.push({
      pathname: '/Reservesession/'+id+''
      })
  }

  redirect_to_main()
  {
    
    this.setState({startDate:""})
    this.setState({endDate:""})
    selected_spec=[];
    this.setState({mastercast_search:false})
    this.setState({mastercircle_search:false})
    this.setState({masterconsult_search:false})
    is_searched=0;
  
  }



  render() {
    var that = this; 
  return (
    <div className={ isMobile == true ? 'full_width wrap_body mblScreen' : 'full_width wrap_body dskScreen'}>
       {(this.state.is_error==1)?
        <div className="translate_left font_14px font500 text-center colorRed radius-6 p_alertMsg">
  Please Select A Session
</div>:null}
    <Header history={this.props.history}  page_name={pageNames}/>
    <section className="full_width body_area">
      <div className="container">
      <div className="row">
        <Banner/>

        

     
        <div className="clearfix"></div>
        {(is_searched==0)?
        <section className="full_width my_session">
        <div className="clearfix"></div>
        <div className="justify-content-md-center">
            <div className="radius-6 col-sm-10 offset-sm-1  col-xs-12 my_session_top">
              <ul className="font_16px font600">
                {(button_val=='allinone')?
                <li className="active"><a href="javascript:void(0);" onClick={()=>{ this.redirect_to_session_type('allinone'); this.setState({"is_loader":true}); }}>One On One</a></li>:
                <li ><a href="javascript:void(0);" onClick={()=>{ this.redirect_to_session_type('allinone'); this.setState({"is_loader":true}); }}>One On One</a></li>}
                 {(button_val=='cme')?
                <li className="active"><a href="javascript:void(0);" onClick={()=>{ this.redirect_to_session_type('cme'); this.setState({"is_loader":true});}}>CME</a></li>:
                <li ><a href="javascript:void(0);" onClick={()=>{ this.redirect_to_session_type('cme'); this.setState({"is_loader":true});}}>CME</a></li>}
                
              </ul>
              <div className="float-right">
                <a className="radius-100 ssn_filter tRright_popShow ssn_filterDesk" onClick={()=>{ this.redirect_to_filt();}} href="javascript:void(0)">
                  <img className="translate_both" src={filterIcon}/>
                </a>
              </div>
            </div>
          </div>
          <a className="radius-100 bgColorGreen tRright_popShow medWikifilterRes" href="javascript:void(0)"><img className="translate_both" src={filterWhite}/></a> 
            <div className="clearfix"></div>
            
            <div className="full_width ssn_main">
            <Loader className="loader_cmn" type="ThreeDots" color="#3393df" height={80} width={80} visible={this.state.is_loader} />
              {(is_upcoming_block_display==1)?

              <div>
                {(this.state.session_listing_upcoming.length==0 && this.state.is_loader==false)?
                <div className="full_width alert alert-danger">
              <strong>No Records Found</strong>
              </div>:null}
              <div className="ssn_p_add">
                {this.state.session_listing_upcoming.map(r =>
                 
                
                    <div className="col-md-4 col-xs-12 ssn_p_box">
                      
                	<div className="full_width radius-6 bgColorWhite ssn_p_boxIn">
                  <div className="full_width ssn_p_BoxTop">
                  <h4 className="font_12px font600 my_session_box_type"><img src={masterconsultlogo} width="24" height="24" alt="icon"/> <span className="colorGreen">{r.ms_cat_name}</span> </h4>
                  <div className="my_session_box_sponsors">
                    <span className="font_12px font600 colorBlack">Powered by</span>
                      <a href="javascript:void(0);"><img src={r.client_logo} alt="logo"/></a>
                  </div>
                  </div>

{(r.session_status==1)?
                        <div className="full_width colorBlack font600 session_time">
                        <img src={calenderIcon}/>
                            <span>{r.start_datetime} | {r.display_date}</span>
                        </div>:null}

                        {(r.session_status==2)?
                        <div className="full_width colorBlack font600 session_time">
                        <p>Available Now</p>
                        </div>:null}

                        {(r.session_status==4)?
                        <div className="full_width colorBlack font600 session_time">
                        <p>Upcoming TBA</p>
                        </div>:null}

                        <div className="clearfix"></div>

                    	<h2 className="colorBlack font700 font_17px my_session_box_ttl">{r.session_topic}</h2>
                       
                        {r.session_doctor_entities.map(docres => 
                    	  <div className="full_width session_Row">
                        	<div className="radius-100 session_RowPIc">
                            	<img src={docres.session_doctor_image} className="object_fit_cover radius-100"/>
                            </div>
                      <h2 className="colorBlack font700 font_16px session_doctor">{docres.session_doctor_name} 
                      <span className="colorGrey font_12px font600">{docres.DepartmentName}</span></h2>
                        
                        </div>
                         )} 
                        
                        
                        
                    	<div className="full_width text-center my_session_box_btns">
                      {(r.session_id==this.state.selected_session)?
                            <a href="javascript:void(0);"  className="radius-6 full_width cmnBtn btnGreen">Selected</a>:
                            <a href="javascript:void(0);" onClick={()=>{ this.setState({"selected_session":r.session_id})}} className="radius-6 full_width cmnBtn btnBlue">Select</a>}
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
 
            // OPTIONAL PARAMETERS
            url: "https://doctor.clirnet.com/knowledge/share/service/session/"+r.session_id+"", // (defaults to current url)
            image: 'https://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
            description:r.session_topic,       // (defaults to og:description or twitter:description)
            title: r.session_topic,            // (defaults to og:title or twitter:title)
            message: '',     // (only for email sharing)
            subject: 'Welcome to clirnet',  // (only for email sharing)
            username: 'medwiki view' // (only for twitter sharing)
          }}
        />
        </div>
                    </div>
                </div>
                    
                    )} 
                
                
                </div>
               
                

                {(button_val=='allinone' && is_more_upcoming==1)?
                <div>
 <Loader className="loader_cmn" type="ThreeDots" color="#3393df" height={80} width={80} visible={this.state.is_loader_more} />
                
                </div>:null}
                </div>
                :null}




{(is_cme_block_display==1)?<div>
  {(this.state.session_listing_cme.length==0 && this.state.is_loader==false)?
                <div className="full_width alert alert-danger">
                <strong>No Records Found</strong>
              </div>:null}
  <div className="ssn_p_add">
  
                {this.state.session_listing_cme.map(r => 
                    <div className="col-sm-4 col-xs-12 ssn_p_box">
                    <div className="full_width radius-6 bgColorWhite ssn_p_boxIn">

                    <div className="full_width ssn_p_BoxTop">
                  <h4 className="font_12px font600 my_session_box_type">
                    {(r.ms_cat_name=="MasterCircle")?
                    <img src={mastercirclelogo} width="24" height="24" alt="icon"/>:
                    <img src={mastercastlogo} width="24" height="24" alt="icon"/>}
                     <span className="colorGreen">{r.ms_cat_name}</span> </h4>
                  <div className="my_session_box_sponsors">
                    <span className="font_12px font600 colorBlack">Powered by</span>
                      <a href="javascript:void(0);"><img src={r.client_logo} alt="logo"/></a>
                  </div>
                  </div>

                  {(r.session_status==1)?
                        <div className="full_width colorBlack font600 session_time">
                        <img src={calenderIcon}/>
                            <span>{r.start_datetime} | {r.display_date}</span>
                        </div>:null}

                        {(r.session_status==2)?
                        <div className="full_width colorBlack font600 session_time">
                        <p>Available Now</p>
                        </div>:null}

                        {(r.session_status==4)?
                        <div className="full_width colorBlack font600 session_time">
                        <p>Upcoming TBA</p>
                        </div>:null}
                  <div className="clearfix"></div>

                    	<h2 className="colorBlack font700 font_17px my_session_box_ttl">{r.session_topic}</h2>
                      <div className="clearfix"></div>

                          {r.session_doctor_entities.map(docres => 
                        <div className="full_width session_Row">
                        	<div className="radius-100 session_RowPIc">
                            	<img src={docres.session_doctor_image} className="object_fit_cover radius-100"/>
                            </div>
                      <h2 className="colorBlack font700 font_16px session_doctor">{docres.session_doctor_name} 
                      <span className="colorGrey font_12px font600">{docres.DepartmentName}</span></h2>
                      </div>
                      
                      )} 
                        
                          
                        <div className="full_width text-center my_session_box_btns">
                        {(r.session_id==this.state.selected_session)?
                            <a href="javascript:void(0);"  className="radius-6 full_width cmnBtn btnGreen">Selected</a>:
                            <a href="javascript:void(0);" onClick={()=>{ this.setState({"selected_session":r.session_id})}} className="radius-6 full_width cmnBtn btnBlue">Select</a>}
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
 
            // OPTIONAL PARAMETERS
            url: "https://doctor.clirnet.com/knowledge/share/service/session/"+r.session_id+"", // (defaults to current url)
            image: 'https://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
            description:r.session_topic,       // (defaults to og:description or twitter:description)
            title: r.session_topic,            // (defaults to og:title or twitter:title)
            message: '',     // (only for email sharing)
            subject: '',  // (only for email sharing)
            username: 'medwiki view' // (only for twitter sharing)
          }}
        />
        </div>
                      </div>
                  </div>
                    )} 
                
               
                </div>
                
               </div>
                
                
                :null}
                {(button_val=='cme' && is_more_cme==1)?
                <div>
 <Loader className="loader_cmn" type="ThreeDots" color="#3393df" height={80} width={80} visible={this.state.is_loader_more} />

</div>:null} 


{(is_reserved_block_display==1)?

<div className="ssn_p_add">
  
{this.state.session_listing_reserved.map(r => 
    <div className="col-sm-4 col-xs-12 ssn_p_box" id={"res_"+r.session_id}>
    <div className="full_width radius-6 bgColorWhite ssn_p_boxIn">
        <div className="full_width ssn_p_BoxTop">
          
        <h4 className="font_12px font600 my_session_box_type">
        {(r.ms_cat_name=="MasterCircle")?
          <img src={mastercirclelogo} width="24" height="24" alt="icon"/> :null}
          {(r.ms_cat_name=="MasterConsult")?
          <img src={masterconsultlogo} width="24" height="24" alt="icon"/>:null}
           {(r.ms_cat_name=="MasterCast")?
          <img src={mastercastlogo} width="24" height="24" alt="icon"/>:null}
          <span className="colorGreen">{r.ms_cat_name}</span> </h4>
        <div className="my_session_box_sponsors">
        <span className="font_12px font600 colorBlack">Powered by</span>
          <a href="javascript:void(0);"><img src={r.client_logo} alt="logo"/></a>
        </div>
        </div>

        {(r.session_status==1)?
                        <div className="full_width colorBlack font600 session_time">
                        <img src={calenderIcon}/>
                            <span>{r.start_datetime} | {r.display_date}</span>
                        </div>:null}

                        {(r.session_status==2)?
                        <div className="full_width colorBlack font600 session_time">
                        <p>Available Now</p>
                        </div>:null}

                        {(r.session_status==4)?
                        <div className="full_width colorBlack font600 session_time">
                        <p>Upcoming TBA</p>
                        </div>:null}
        <div className="clearfix"></div>
        <h2 className="colorBlack font700 font_17px my_session_box_ttl">{r.session_topic}</h2>
        <div className="clearfix"></div>

          {r.session_doctor_entities.map(docres => 
            <div className="full_width session_Row">
                <div className="radius-100 session_RowPIc">
                    <img src={docres.session_doctor_image} className="object_fit_cover radius-100"/>
                  </div>
            <h2 className="colorBlack font700 font_16px session_doctor">{docres.session_doctor_name} 
            <span className="colorGrey font_12px font600">{docres.DepartmentName}</span></h2>
            </div>
           )} 
          
          
          <div className="full_width text-center my_session_box_btns">
              <a href="javascript:void(0);" onClick={()=>{ this.redirect_to_session_booking(r.session_id);}} className="cmnBtn btnBlue cmnBtnHalf">View Case/Query</a>
              <button onClick={()=>{ this.setState({"showModal":true}); this.setState({"cancel_session_id":r.session_id,"sel_ses":r.session_id}); this.get_part(r.session_id);} } className="cmnBtn btnRed cmnBtnHalf">I can't Attend</button>
          
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
 
            // OPTIONAL PARAMETERS
            url: "https://doctor.clirnet.com/knowledge/share/service/session/"+r.session_id+"", // (defaults to current url)
            image: 'https://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
            description:r.session_topic,       // (defaults to og:description or twitter:description)
            title: r.session_topic,            // (defaults to og:title or twitter:title)
            message: '',     // (only for email sharing)
            subject: '',  // (only for email sharing)
            username: 'medwiki view' // (only for twitter sharing)
          }}
        />
        </div>
         
      </div>
  </div>
      
    
    )} 
    {(this.state.session_listing_reserved.length==0 && this.state.is_loader==false)?
      <div className="full_width alert alert-danger">
      <strong>No Records Found</strong>
    </div>:null}

</div>



:null}
{(button_val=='reserved' && is_more_reserved==1)?
<div>
<Loader className="loader_cmn" type="ThreeDots" color="#3393df" height={80} width={80} visible={this.state.is_loader_more} />

</div>:null} 
            </div>
            <div className="translate_left p_peerSubmit">
              {(this.state.prev_selected_session!=0)?
              <button type="submit" onClick={()=>{this.props.history.push({ pathname: '/dashboard', key_file: this.state.upload_url, sel_qry:this.state.query ,selected_session:this.state.prev_selected_session }) }}  className="cmnBtn font_18px font600 btnRed">Cancel</button>:
              <button type="submit" onClick={()=>{this.props.history.push({ pathname: '/dashboard', key_file: this.state.upload_url, sel_qry:this.state.query,pop_op:1  }) }}  className="cmnBtn font_18px font600 btnRed">Cancel</button>
              }
              <button type="submit" onClick={()=>{ this.final_submit() }} className="cmnBtn font_18px font600 btnBlue">Proceed</button>
          </div>  
            </section>:
      <section className="full_width my_session">
<div className="clearfix"></div>
        
<div className="full_width">
              <div className="float-right filterSsnPBtn">
              <a className="radius-100 ssn_filter" onClick={()=>{ this.redirect_to_main();}} href="javascript:void(0)">
                  <img className="translate_both" src={reload}/>
                </a>
                <a className="radius-100 ssn_filter   tRright_popShow" onClick={()=>{ this.redirect_to_filt();}} href="javascript:void(0)">
                  <img className="translate_both" src={filterIcon}/>
                </a>
              </div>
              
              </div>
          


          <div className="clearfix"></div>
          {/* <Loader className="loader_cmn" type="ThreeDots" color="#3393df" height={80} width={80} visible={this.state.is_loader} /> */}
             

          <div className="full_width ssn_main">
                {(this.state.session_listing_searched.length==0 && this.state.is_loader==false)?
                <div className="full_width alert alert-danger">
              <strong>No Records Found</strong>
              </div>:null}
              <div className="ssn_p_add">
                {this.state.session_listing_searched.map(r =>
                 
                
                    <div className="col-md-4 col-xs-12 ssn_p_box">
                      
                	<div className="full_width radius-6 bgColorWhite ssn_p_boxIn">
                  <div className="full_width ssn_p_BoxTop">
                  <h4 className="font_12px font600 my_session_box_type">
                  {(r.ms_cat_name=="MasterCircle")?
          <img src={mastercirclelogo} width="24" height="24" alt="icon"/> :null}
          {(r.ms_cat_name=="MasterConsult")?
          <img src={masterconsultlogo} width="24" height="24" alt="icon"/>:null}
           {(r.ms_cat_name=="MasterCast")?
          <img src={mastercastlogo} width="24" height="24" alt="icon"/>:null}
                    
                     <span className="colorGreen">{r.ms_cat_name}</span> </h4>
                  <div className="my_session_box_sponsors">
                    <span className="font_12px font600 colorBlack">Powered by</span>
                      <a href="javascript:void(0);"><img src={r.client_logo} alt="logo"/></a>
                  </div>
                  </div>


                  {(r.session_status==1)?
                        <div className="full_width colorBlack font600 session_time">
                        <img src={calenderIcon}/>
                            <span>{r.start_datetime} | {r.display_date}</span>
                        </div>:null}

                        {(r.session_status==2)?
                        <div className="full_width colorBlack font600 session_time">
                        <p>Available Now</p>
                        </div>:null}

                        {(r.session_status==4)?
                        <div className="full_width colorBlack font600 session_time">
                        <p>Upcoming TBA</p>
                        </div>:null}

                        <div className="clearfix"></div>

                    	<h2 className="colorBlack font700 font_17px my_session_box_ttl">{r.session_topic}</h2>
                       
                        {r.session_doctor_entities.map(docres => 
                    	  <div className="full_width session_Row">
                        	<div className="radius-100 session_RowPIc">
                            	<img src={docres.session_doctor_image} className="object_fit_cover radius-100"/>
                            </div>
                      <h2 className="colorBlack font700 font_16px session_doctor">{docres.session_doctor_name} 
                      <span className="colorGrey font_12px font600">{docres.DepartmentName}</span></h2>
                        
                        </div>
                         )} 
                        
                        
                        
                    	<div className="full_width text-center my_session_box_btns"> 
                        {(r.session_id==this.state.selected_session)?
                            <a href="javascript:void(0);"  className="radius-6 full_width cmnBtn btnGreen">Selected</a>:
                            <a href="javascript:void(0);" onClick={()=>{ this.setState({"selected_session":r.session_id})}} className="radius-6 full_width cmnBtn btnBlue">Select</a>}
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
 
            // OPTIONAL PARAMETERS
            url: "https://doctor.clirnet.com/knowledge/share/service/session/"+r.session_id+"", // (defaults to current url)
            image: 'https://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
            description:r.session_topic,       // (defaults to og:description or twitter:description)
            title: r.session_topic,            // (defaults to og:title or twitter:title)
            message: '',     // (only for email sharing)
            subject: '',  // (only for email sharing)
            username: 'medwiki view' // (only for twitter sharing)
          }}
        />
        </div>
                    </div>
                </div>
                    
                    )} 
                
                
                </div>
               
                

                {(is_searched==1 && is_more_searched==1)?
                <div>
 <Loader className="loader_cmn" type="ThreeDots" color="#3393df" height={80} width={80} visible={this.state.is_loader_more} />
                
                </div>:null}
                </div>
                
              </section>}
      
      </div>
      </div> 
    </section>
    <Modal className="in ssnCancelPop" centered="true" animation="slide" show={this.state.showModal} onHide={()=>{ this.setState({"showModal":false});}}>
        <Modal.Header className="justify-content-center">
          <Modal.Title className="font600 font_18px colorBlack">Reason For Cancellation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="full_width">
        
                    <div className="full_width cmnCheckBox_row cmnRadio_row">
                    <input className="form-check-input" checked={(this.state.reason=='Emergency')?true:false} onClick={()=>{ this.open_other('Emergency');}}   id="cancelation-1" type="radio"/>
                    <label className="font600 font_12px colorBlack form-check-label" for="cancelation-1">Emergency</label>
                    </div>
                    <div className="full_width cmnCheckBox_row cmnRadio_row">
                    <input className="form-check-input" checked={(this.state.reason=='notInterested')?true:false}   onClick={()=>{ this.open_other('notInterested');}}   id="cancelation-2" type="radio"/>
                    <label className="font600 font_12px colorBlack form-check-label" for="cancelation-2">Not Interested</label>
                    </div>
                    <div className="full_width cmnCheckBox_row cmnRadio_row">
                    <input className="form-check-input" checked={(this.state.reason=='alreadyAnswered')?true:false}  onClick={()=>{ this.open_other('alreadyAnswered');}}   id="cancelation-3" type="radio"/>
                    <label className="font600 font_12px colorBlack form-check-label" for="cancelation-3">Already Answered</label>
                    </div>
                    <div className="full_width cmnCheckBox_row cmnRadio_row">
                    <input className="form-check-input" checked={(this.state.reason=='outofStation')?true:false}  onClick={()=>{ this.open_other('outofStation');}}     id="cancelation-4" type="radio"/>
                    <label className="font600 font_12px colorBlack form-check-label" for="cancelation-4">Out of Station</label>
                    </div>
                   
                    <div className="full_width cmnCheckBox_row cmnRadio_row">
                    <input checked={(this.state.reason=='others')?true:false}  onClick={()=>{ this.open_other('others');}} className="form-check-input"   id="cancelation-5" type="radio"/>
                    <label className="font600 font_12px colorBlack form-check-label" for="cancelation-5">Others</label>
                    
                    </div>
                    <span className="err_hold" style={{"color":"red"}}>{this.state.err_msg}</span>
                    {(is_other_on==1)?
                    <div className="full_width form_row_pop">
                    <Form.Control onChange={this.handleChangeother} className="full_width font_14px font500 radius-6" value={this.state.other_reason} type="text" placeholder="Type Here.." />
                    </div>:null}
            </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
          <a href="javascript:void(0)" className="radius-40 font500 btnRed cmnBtn btnCmnSmall" variant="secondary" onClick={()=>{ this.setState({"showModal":false});}}>
            Back
          </a>
          <a href="javascript:void(0)" className="radius-40 font500 btnGreen cmnBtn btnCmnSmall" variant="secondary" onClick={()=>{ this.cancel_session(this.state.sel_ses) }}>
            Apply
          </a>
        </Modal.Footer>
      </Modal>
    <Footer  history={this.props.history}/>  

    <div className="right_fix_pop_JS">
    <div className="tRright_popClose right_fixedBg"></div>
    <div className="right_pop transition6s text-left ssnFilterPop">
      <div className="bgColorBlue text-left right_popTtl">
        <h2 className="colorWhite font600 font_20px right_popTtlTxt">Filter</h2>
        <a href="javascript:void(0)" className="radius-100 right_popClose tRright_popClose">
               <img src={closeIcon} className="translate_both"/>
        </a>
      </div>
      <div className="right_popIn">
        <div className="full_width ssnFilterFrmRow">
          <h3 className="font600 colorBlack font_16px ssnFilterFrmTtl">Select Date Range</h3>
            <div className="row justify-content-between ssnFilterDateCont">
            <DatePicker popperPlacement="top-end"
            className="font_14px font500 radius-6 ssnFltrCalenderInp"
        selected={this.state.startDate}
        onChange={this.handleDateChange}
        minDate={new Date()}
      />
                   
                    <span className="ssnFilterDtaeTo">To</span>
                    <DatePicker
            className="font_14px font500 radius-6 ssnFltrCalenderInp"
        selected={this.state.endDate}
        onChange={this.handleChangeto}
        startDate={this.state.startDate}
        minDate={new Date()}
      />
                   
                 </div>
            </div>


            <div className="full_width ssnFilterFrmRow">
            <h3 className="font600 colorBlack font_16px ssnFilterFrmTtl">Select Session Type</h3>
            <div className="full_width">
            <div class="full_width font600">
                {/* <ul>
                {this.state.speciality.map((r, index) => (
                <li className={"lispec_"+r.master_specialities_id}><a onClick = {()=> this.getsubspec(r.master_specialities_id,1 ) } href="javascript:void(0);">{r.specialities_name}</a></li>

                
                ))} 
                </ul> */}
                
                {/* <Form.Group className="feedRightSpecilityPrnt" controlId="formBasicCheckbox">
                {(this.state.mastercast_search==true)?
                  <Form.Check checked onClick = {()=>{this.setState({"mastercast_search":!this.state.mastercast_search})}}  className="cmnCheckBox_row" type="checkbox" label="Mastercast" />:
<Form.Check  onClick = {()=>{this.setState({"mastercast_search":!this.state.mastercast_search})}}  className="cmnCheckBox_row" type="checkbox" label="Mastercast" />}
                
                  
                  
                </Form.Group> */}
                <Form.Group className="feedRightSpecilityPrnt" controlId="formBasicCheckbox">
                 
                 
                {(this.state.masterconsult_search==true)?
                  <Form.Check checked  onClick = {()=>{this.setState({"masterconsult_search":!this.state.masterconsult_search})}} className="cmnCheckBox_row" type="checkbox" label="Masterconsult" />:
                  <Form.Check   onClick = {()=>{this.setState({"masterconsult_search":!this.state.masterconsult_search})}} className="cmnCheckBox_row" type="checkbox" label="Masterconsult" />}

                  
                  
                  
                </Form.Group>
                <Form.Group className="feedRightSpecilityPrnt" controlId="formBasicCheckbox">
                 
                 
                {(this.state.mastercircle_search==true)?
                  <Form.Check checked  onClick = {()=>{this.setState({"mastercircle_search":!this.state.mastercircle_search})}}  className="cmnCheckBox_row" type="checkbox" label="Mastercircle" />:
                  <Form.Check  onClick = {()=>{this.setState({"mastercircle_search":!this.state.mastercircle_search})}}  className="cmnCheckBox_row" type="checkbox" label="Mastercircle" />}
                  
                  
                </Form.Group>
               
          </div>
            </div>
            </div>

            <div className="full_width ssnFilterFrmRow">
            <h3 className="font600 colorBlack font_16px ssnFilterFrmTtl">Speaker Speciality</h3>
            <div className="full_width font600">
            {this.state.speciality.map((r, index) => (
                <Form.Group className={"chada feedRightSpecilityPrnt lispec_"+r.master_specialities_id} controlId="formBasicCheckbox">
                  {(selected_spec.indexOf(r.master_specialities_id) != -1)?
                  <Form.Check checked onClick = {()=>this.selectspec(r.master_specialities_id)}  className="cmnCheckBox_row" type="checkbox" label={r.specialities_name} />:
                  <Form.Check  onClick = {()=>this.selectspec(r.master_specialities_id)}  className="cmnCheckBox_row" type="checkbox" label={r.specialities_name} />}
                  
                </Form.Group>
                ))} 
            </div>
            </div>
            <span style={{"color":"red"}}>{this.state.search_err}</span>
            <a href="javascript:void(0);" onClick = {()=>this.get_search_result()} className="radius-6 full_width text-center font600 btnGreen cmnBtn">Apply</a>


         </div>
    </div>
    </div>
    <ToastsContainer  store={ToastsStore} />
    </div>
  
  );
  }
}

export default Sessionwithpeer;
