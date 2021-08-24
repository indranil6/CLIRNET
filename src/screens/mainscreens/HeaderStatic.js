import React from 'react';
import $ from 'jquery'; 
import { reactLocalStorage } from 'reactjs-localstorage';
import {isMobile} from 'react-device-detect';
import HeaderMobileStatic from './HeaderStaticMobile'; 
import HeaderDesktopStatic from './HeaderStaticDesktop';


var firstnamefirst_letter = ""; 
class HeaderStatic extends React.Component {
  constructor(props) {
    super(props);
    this.setCss(); 
    this.getName(); 
  }

  getName(){
    let auto_auth_name =  reactLocalStorage.get('@ClirnetStore:auto_auth_name', true) 
    firstnamefirst_letter = auto_auth_name.charAt(0)
   }

  setCss(){
    if(isMobile){
      $(".warp_body").addClass("mblScreen"); 
    }else{
      $(".warp_body").removeClass("mblScreen");
      }
  }
  render() {
    let content_type = this.props.content_type
    return (
      <>
        {(isMobile)?<HeaderMobileStatic name={firstnamefirst_letter} page_name={content_type}/>:<HeaderDesktopStatic name={firstnamefirst_letter}/>}
      </>
    );
  }
}

export default HeaderStatic;
