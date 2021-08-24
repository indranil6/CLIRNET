import React from 'react';
import {isMobile} from 'react-device-detect';
import FooterMobile from '../mainscreens/FooterMobile'; 
import FooterDesktop from '../mainscreens/FooterDesktop';
 class Footer extends React.Component {
    render() {  
      return(
      <> 
        {(isMobile)?<FooterMobile history={this.props.history}/>:<FooterDesktop history={this.props.history}/>}
      </>);
    }
  } 
 export default Footer;