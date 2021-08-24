import React from 'react';
import {isMobile} from 'react-device-detect';
import { createBrowserHistory } from "history";
import $ from 'jquery'; 
import HeaderMobile from '../mainscreens/HeaderMobile'; 
import HeaderDesktop from '../mainscreens/HeaderDesktop';

const history = createBrowserHistory() 
 class Header extends React.Component {
  constructor(props) {
    super(props);
    this.reirectToPage()
  }
 
  reirectToPage(){   
    console.log("page name"+this.props.page_name)
    if(isMobile){
      $(".warp_body").addClass("mblScreen"); 
      $(".dskScreen").addClass("mblScreen"); 
      
    }else{
      $(".warp_body").removeClass("mblScreen");
      $(".dskScreen").removeClass("mblScreen");
      }
  }

  componentDidMount(){
    this.reirectToPage()
  }

  
    render() {  
      return( 
      <> 
        {(isMobile)?<HeaderMobile page_name={this.props.page_name} history={this.props.history}/>:<HeaderDesktop  history={this.props.history}/>}
      </>);
    }
  } 
 export default Header;