import React from 'react';
import Loader from 'react-loader-spinner'
import  { withRouter } from 'react-router-dom'
import frombg from './images/l_frmBg.png';
import logiInLeft from './images/Web LoginPage.png';
import $ from 'jquery';
import {reactLocalStorage} from 'reactjs-localstorage';
import { Scrollbars } from 'react-custom-scrollbars';
import MetaTags from 'react-meta-tags';
import AppConfig from '../config/config.js';

import Form from 'react-bootstrap/Form';
var thisobj1=this
var is_render=0;
const url = AppConfig.apiLoc;
const gtag = window.gtag;

class Autologin extends React.Component {
  constructor(props) {


      super(props);
      //alert(url)

      reactLocalStorage.set('@ClirnetStore:redirect_url','');
     
    
    



    reactLocalStorage.set('@ClirnetStore:my_sessions', 0);
  }
  componentDidMount() {
    window.document.title = "CLIRNET - Login (pass)"
    
    gtag('config', AppConfig.gtag_measure_id, {
      'page_title': 'CLIRNET - Login (pass)',
      'page_location': window.location.href,
      'page_path': window.location.pathname
      });
  }
 

  componentWillMount()
  {

    reactLocalStorage.set('@ClirnetStore:refreshToken', this.props.match.params.id);





   fetch(url+'user/detail', {
      method: 'GET',
      headers: {


        'Authorization': this.props.match.params.id,
        'version': 'rjsw 1.1.1'

      }
    }).then((response) => response.json()).then((responseJson) => {
      if (responseJson.status_code == "200") {

        reactLocalStorage.set('@ClirnetStore:user_master_id', responseJson.data.user_master_id);
        reactLocalStorage.set('@ClirnetStore:user_mem_id', responseJson.data.user_mem_id);
        reactLocalStorage.set('@ClirnetStore:client_logo', responseJson.data.client_logo);
        reactLocalStorage.set('@ClirnetStore:user_name', responseJson.data.user_name);
        reactLocalStorage.set('@ClirnetStore:email', responseJson.data.email);
        reactLocalStorage.set('@ClirnetStore:mobilePrimary', responseJson.data.mobilePrimary);
        reactLocalStorage.set('@ClirnetStore:password', responseJson.data.password);
        reactLocalStorage.set('@ClirnetStore:first_name', responseJson.data.first_name);
        reactLocalStorage.set('@ClirnetStore:last_name', responseJson.data.last_name);
        reactLocalStorage.set('@ClirnetStore:profile_image', responseJson.data.profile_image);
        reactLocalStorage.set('@ClirnetStore:profile_type', responseJson.data.profile_type);
        reactLocalStorage.set('@ClirnetStore:phoneNumber', responseJson.data.mobilePrimary);

        var vault = [];
       fetch(url+'knwlg/myvault', {
          method: 'GET',
          headers: {

            'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
            'version': 'rjsw 1.1.1'

          }
        }).then((response) => response.json()).then((responseJson) => {

          responseJson.data.map(r => {

            this.setState({ "is_loader": false });

            vault.push(r);
          })


          reactLocalStorage.set('@ClirnetStore:vault_count', vault.length);


        }).catch((error) => {
          this.setState({ "is_loader": false });

        });


        if (this.props.match.params.redirect_name!="" && this.props.match.params.redirect_name!=undefined) {
          this.props.history.push({
            pathname: '/'+this.props.match.params.redirect_name+'/'+this.props.match.params.redirect_page_id+''
          })
        }
        else {
          this.props.history.push({
            pathname: `/Dashboard`
          })
        }






      }
    }).catch((error) => {
      this.props.history.push({
        pathname: `/`
      })
    });
    
  }








  render() {

    
  
  return (
    <div></div>
  );
  }
}

export default withRouter(Autologin);
