import React from 'react'; 
import Marquee from "react-fast-marquee";
import { reactLocalStorage } from 'reactjs-localstorage';
import AppConfig from '../config/config.js';
const url = AppConfig.apiLoc;

var marqueeText = undefined
var marqueeUrl = undefined
var marqueeUrlType = undefined
var marquedata=[];
 class MarqueeText extends React.Component {
   
  constructor(props) {
    super(props);
    this.state= {
        display:false
    };
    marquedata = [];

    marqueeText = undefined
    marqueeUrl = undefined
    marqueeUrlType = undefined
  }

  
  onMarqueeClick(url,type){
    switch(type){
      case 'blank':
        this.openurl(url,'_blank')
      break;
      case 'self':
        this.openurl(url,'_self') 
      break;
      default:
        break;
    }
  }
 
 
  openurl(url,type){
    var win = window.open(url, type);  
    if(url != undefined || url != ''){
      if (win) { 
        win.focus();
      } else {
          alert('Please allow popups for this website');
      }   
    }   
  }

    getMarqueeText = () =>{   
      fetch(url+'dashboard/marquee', {   
      method: 'GET',
      headers: { 
      'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
      'version': 'rjsw 1.1.1'
      }
      }).then((response) => response.json()).then((responseJson) => {  
      let status_code = responseJson.status_code;
      if(status_code == 200){
        responseJson.data.map(r => {

          marquedata.push(r);
          })
 
      this.refresh()
      }  
      }).catch((error) => { 
          //console.log("Error"+error);
      });
  } 

  refresh = () => {
    this.setState({ "display": !this.state.display}); 
  }

  componentDidMount(){
    marqueeText = undefined
    marqueeUrl = undefined
    marqueeUrlType = undefined
    this.getMarqueeText()
  }
  componentWillUnmount()
  {
    marquedata=[];
  }



    render() { 
      return(
        <>
        {
          (marquedata.length>0)?
          <div onClick={()=>{this.onMarqueeClick()}}  style={{"cursor":"pointer"}}>
          <Marquee className="colorBlack fontItalic font600 font_14px mblMarquee">
          {marquedata.map((marksing, indexii) => (
            < span onClick={()=>{this.onMarqueeClick(marksing.url,marksing.url_type)}}> {marksing.text}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          ))}
          </Marquee>
          </div>:null
        }
        </>
      );
    }
  } 
 export default MarqueeText;