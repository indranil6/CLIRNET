import React from 'react';
import {isMobile} from 'react-device-detect';
import $ from 'jquery'; 
import DashboardMobile from '../mainscreens/DashboardMobile'; 
import DashboardDesktop from '../mainscreens/DashboardDesktop';
 class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    // this.reirectToPage()
  }

  reirectToPage(){  
    console.log("inRedirectFun"+isMobile)
    if(isMobile){
      $(".warp_body").addClass("mblScreen");
      this.redirectToMobileDashboard()}else{
        $(".warp_body").removeClass("mblScreen");
        this.redirectToDesktopDashboard()}
  }

  componentDidMount(){
    this.reirectToPage()
  }

  redirectToDesktopDashboard(){
    this.props.history.push({
      pathname: `/DashboardDesktop`
    })
  }
  redirectToMobileDashboard(){
    this.props.history.push({
      pathname: `/DashboardMobile` 
    })
  }
  
    render() {  
      return(
      <> 
        
      </>);
    }
  } 
 export default Dashboard;