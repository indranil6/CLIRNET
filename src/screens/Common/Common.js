
import React,{Component} from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import Form from 'react-bootstrap/Form';
import {decode} from 'html-entities'; 
// import ContentLoader, { Facebook } from "react-content-loader";//npm i react-content-loader 
import ReactPlayer from 'react-player';
import AppConfig from '../config/config.js';
import Moment from 'react-moment';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import { InlineShareButtons } from 'sharethis-reactjs';
import likeIcon from '../../desktopImages/like-black.png';
import likeIconActive from '../../desktopImages/like-active.png';
import vaultIcon from '../../desktopImages/vault-black.png';
import vaultIconActive from '../../desktopImages/vault-active.png';
// import HlsPlayer from '../CustomLibrary/HlsPlayer.jsx';

const url = AppConfig.apiLoc;

export default class Disclaimer extends Component {
  render() { 
    return(<div> 
      {(this.props.val == "" || this.props.val == undefined || this.props.val == "undefined")?
        null:   
        <div className="full_width font_12px disclaimer">
          <h4 className="font600 font_12px colorBlack">Disclaimer</h4>
          <p>{this.props.val}</p> 
        </div>
      }
      </div>);
  }
} 

export const getMobileNO = () =>{ 
  let mob =  reactLocalStorage.get('@ClirnetStore:mobilePrimary',true)
  let phone = reactLocalStorage.get('@ClirnetStore:phoneNumber',true) 
  console.log("mobil no///////////////// "+mob+"phone\n"+phone) 

  if(mob == undefined || mob == "undefined" ){
    if(phone == undefined || phone == 'undefined'){
      return undefined;
    }else{
      return phone;
    }
    return undefined; 
  }else{
    return mob;
  }
} 

export const getEmail = () =>{ 
  let email =  reactLocalStorage.get('@ClirnetStore:email',true) 
  if(email == undefined || email == "undefined" ){
    return undefined; 
  }else{
    return email;
  }
} 

export const getReferalCode =() =>{ 
  let client = reactLocalStorage.get('@ClirnetStore:referal_code', true);
  if(client == undefined || client == 'undefined' || client == true || client == 'true' || client == ''){
    return 0;  
  }else{
    return client;
  }
}

export const getUtmSource = () =>{
  let utmSource = reactLocalStorage.get('@ClirnetStore:utm_source', true);
  if(utmSource == undefined || utmSource == 'undefined' || utmSource == true || utmSource == 'true' || utmSource == ''){
    console.log("utm source not found")
    return 0; 
  }else{
    console.log("utm source:"+utmSource);
    return utmSource;
  }
}

export const specialToString = (str) => 
{ 
  console.log("Str1:://///"+decode(str))   
  return decode(str);
} 

 
export class ImageLoader extends Component {
  render() {  
    return(
    <div>
      {/* <ContentLoader 
      speed={2}
      width={400}
      height={460}
      viewBox="0 0 400 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">  
      <circle cx="31" cy="31" r="15" /> 
      <rect x="58" y="18" rx="2" ry="2" width="140" height="10" /> 
      <rect x="58" y="34" rx="2" ry="2" width="140" height="10" /> 
      <rect x="0" y="60" rx="2" ry="2" width="400" height="400" />
      </ContentLoader>  */}
    </div>
    );
  }
} 
 
export class CommentList1 extends Component {
  render() {  
    console.log("comment list"+JSON.parse(this.props.comment_list)) 
    return (
      <div>
        <div className="full_width feedcommentsArea">
          {this.props.comment_list.length > 0 ?
          <>
          {this.props.comment_list.map((r, index) => (
            <div className="full_width feedcommentsRow">
            <div className="radius-100 feedcommentsPic">
              <img className="object_fit_cover" src={r.images} />
            </div>
            <h5 className="font_16px font600 colorBlack feedcommentsBy">Dr. {r.last_name}</h5>
            <p>{r.body}</p>
            <h6 className="font_14px font600 feedcommentsByBtm"><span><Moment format="MMMM Do YYYY">{r.created_at}</Moment></span></h6>
          </div>
          ))}
          </>:<h1>nothing</h1>} 
        </div> 
        <div className="full_width feedDtls_comment">
          <div className="full_width feedDtls_comment_frm">
            <Form.Control className="font_14px font500 radius-6 feedfooterComment main_comment" type="text" placeholder="Write a comment here" />
            <Form.Control type="submit" value="Submit" className="bgColorGreen colorWhite font600 feedDtls_commentSubmit" />
          </div> 
        </div>
      </div>
    )
  } 
}

export const renderVideo = (con_type,vendor,video_url,videoJson) =>{  

  console.log("vendor//"+con_type) 
  if(con_type=='video' && vendor=='flow'  && con_type != undefined   && vendor != undefined){
    return(
      <div class="full_width feedRow_Pic">
        {/* <HlsPlayer data={videoJson}></HlsPlayer> */}
        <video playsInline  loop="true" autoplay="autoplay" controls="true" >
          <source id="video_top" src={video_url} type="video/mp4"/>
        </video>
        {/* <div className="overlay"></div> */}
      </div>
      )
  }else if(con_type=='video' && vendor=='youtube'  && con_type != undefined   && vendor != undefined){
    return(
      <div class="full_width feedRow_Pic">
        <ReactPlayer url={'https://www.youtube.com/watch?v='+video_url}  controls={true} playing={true} width='100%'/>
        {/* <div className="overlay"></div> */}
      </div> 
    ) 
  }else if(con_type=='video' && vendor=='vimeo'  && con_type != undefined   && vendor != undefined){
    return(
      <div class="full_width feedRow_Pic">
        <ReactPlayer url={video_url}  controls={true} playing={true} width='100%'/>
        {/* <div className="overlay"></div> */}
      </div> 
    ) 
  }
} 
 
export const setClientLogoRelated = (clientLogo,sponsorLogo) =>{ 
    if(sponsorLogo == ''|| sponsorLogo == null || sponsorLogo === 'null' || sponsorLogo === ''){
      return (
        <>
            {/* <a href="javascript:void(0);" className=" full_width relatedRow_sponsors">
                <span className="font_10px font500 colorBlack">Powered by</span>
                <img src={clientLogo} width="224" height="63" alt="logo" title="clirnet" />
            </a> */}
        </>
        )
  }else{
      return (
        <>
            <a href="javascript:void(0);" className="full_width relatedRow_sponsors">
                <span className="font_10px font500 colorBlack">Powered by</span>
                <img src={sponsorLogo} width="224" height="63" alt="logo" title="clirnet" />
            </a>
        </>
        )
  }
} 


export const setClientLogo = (clientLogo,sponsorLogo) =>{ 
  if(sponsorLogo == ''|| sponsorLogo == null || sponsorLogo === 'null' || sponsorLogo === ''){
    return (
      <>
          <a href="javascript:void(0);" className="feedRow_sponsors"> 
              <span className="font_10px font500 colorBlack">Powered by</span>
              <img src={clientLogo} width="224" height="63" alt="logo" title="clirnet" />
          </a>
      </>
      )
}else{
    return (
      <>
          <a href="javascript:void(0);" className="feedRow_sponsors">
              <span className="font_10px font500 colorBlack">Powered by</span>
              <img src={sponsorLogo} width="224" height="63" alt="logo" title="clirnet" />
          </a>
      </>
      )
}
} 

export const isInViewport = (el)=> {
  const rect = el.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)

  );
}


/////////////////////////////////////////redirect -function//////////////////////////
export const setDescription = (str) =>{ 
  // console.log("in set desi")
  let description = str
  if(str.length > 100) {
    description = str.substring(0,100)+'...';
  }
  return description;
}

export const setSpeciality= (str) =>{ 
  // console.log("in set spec")
  return str.split(",")[0] 
}

export const specialityPopOver = (val)=>
{
  let tempdata;
    if(val){
      tempdata = val.substring(val.indexOf(',')+1)
    }
	let popover = (
		<Popover id="popover-basic" className="specialty_popOver">
		  <Popover.Content className="font_12px">
        {tempdata?tempdata.replace(/,/g, ", "):null} 
		  </Popover.Content>
		</Popover>
	  ); 
	return (
        <>
        {
        (val.split(",").length >1)? 
        <OverlayTrigger placement="bottom" rootClose="true" rootCloseEvent="click" trigger="click" delay={{ show: 50, hide: 50 }} overlay={popover}>
        <span className="mblMedWikiSpeacalityDots">
          <span></span>
          <span></span>
          <span></span>
        </span> 
        </OverlayTrigger>:
        null 
        }
       
        </>
		)  
  }

  export  const cardMenuPopover = (val,calback) =>
  { 
	let popover = (
		<Popover id="popover-basic"  className="dskDotsMenuSettings">
		  <Popover.Content>
				<a href="javascript:void(0)" className="dskDotsMenuSettingsIcon active" onClick={this.props.onLikeClick}>
					<span>
					<img src={likeIcon} alt="Like"  className="translate_both dskGrLeftShareImg" />
					<img src={likeIconActive} alt="Like"  className="translate_both dskGrLeftShareImgActive" />
					</span>
					Like
				</a>
				<a href="javascript:void(0)" className="dskDotsMenuSettingsIcon">
					<span>
				<img src={vaultIcon} alt="Vault" className="translate_both dskGrLeftShareImg" />
				<img src={vaultIconActive} alt="Vault" className="translate_both dskGrLeftShareImgActive" />
				</span>
					Vault
				</a>
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
        url: val.deeplink, // (defaults to current url)
        image: 'https://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
        description: val.survey_title.substring(0, 100) + "...",       // (defaults to og:description or twitter:description)
        title: val.survey_description,            // (defaults to og:title or twitter:title)
        message: '',     // (only for email sharing)
        subject: '',  // (only for email sharing)
        username: 'Medwiki view' // (only for twitter sharing)
        }}/>
				<a href="javascript:void(0)" className="dskDotsMenuNotRelevant">
					Not Relevant for me
				</a>
		  </Popover.Content>
		</Popover>
	  );
	return (
    <OverlayTrigger placement="left-start" rootClose="true" rootCloseEvent="click" trigger="click" delay={{ show: 50, hide: 50 }} overlay={popover} >
		  <div className="dskDotsMenu dskDotsCircle mblDotsMenuPllsQzsCard">
				<span></span>
				<span></span>
				<span></span>
			</div>
	  </OverlayTrigger>
		)  
  }

  export function Countdown(options) {
    var timer,
    instance = this,
    seconds = options.seconds || 10,
    updateStatus = options.onUpdateStatus || function () {},
    counterEnd = options.onCounterEnd || function () {};
  
    function decrementCounter() {
      updateStatus(seconds);
      if (seconds === 0) {
        counterEnd();
        instance.stop();
      }
      seconds--;
    }
  
    this.start = function () {
      clearInterval(timer);
      timer = 0;
      seconds = options.seconds;
      timer = setInterval(decrementCounter, 1000);
    };
  
    this.stop = function () {
      clearInterval(timer);
    };
  }

  export const log = (TAG, MESSAGE) =>{
    if(AppConfig.is_production_build){
      return false; 
    }else{
      return console.log(TAG+"::"+MESSAGE); 
    }
  } 

  // export const getRecent = async fetchForm => {
  //   const response = await (
  //     await fetch(url + 'dashboard/trending?from=' + fetch_from + '&to=5&type=all')
  //   ).json();
  //   return response.results;
  // };

  export async function getRecent(fetchForm){
    try {
      const response = await fetch(url + 'dashboard/trending?from=' + fetchForm + '&to=5&type=all', {
        method: 'GET',
        headers: {
          'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
          'version': '1'
        }
      });
      const responseJson = await response.json();
      let status_code = responseJson.status_code;
        return responseJson;
    } catch (error) {
      return false;
    }
}

export function AssociationDescription(props){
  let currentCount = 10;
  let tempDescription = '';  
  let sDescription = props.data;
  tempDescription = sDescription.substring(0, currentCount); 
    return (
      <>
        {tempDescription}
        {currentCount >= sDescription.length?null: 
        <a
          className="font_14px font600"
          href="javascript:void(0);"
          onClick={() => {
            onReadMoreClick(); 
          }}
        >
          &nbsp; Read More
        </a>}
      </>
    );

    function onReadMoreClick(){
      currentCount += 10;
      tempDescription = sDescription.substring(0, currentCount);
      props.onReadMoreClick() 
    }

}

export const getAgent= () =>{ 
  var OSName="Unknown OS";
  if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
  if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
  if (navigator.appVersion.indexOf("IOS")!=-1) OSName="IOS";
  if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
  if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";
  if (navigator.appVersion.indexOf("Android")!=-1) OSName="Android";
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  var device_type="Mobile";
  }
  else
  {
    var device_type="PC";	
  }
  return OSName;  
}

export const openNewTab = (url)=>{ 
  let win = window.open(url, '_blank');  
  if (win) {
      win.focus();
  } else {
      alert('Please allow popups for this website');
  }    
}






