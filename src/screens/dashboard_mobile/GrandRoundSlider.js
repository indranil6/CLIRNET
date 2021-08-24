import React from 'react';
import AppConfig from '../config/config.js';
import $ from 'jquery';
import Slider from "react-slick";
import { reactLocalStorage } from 'reactjs-localstorage';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Modal from 'react-bootstrap/Modal';
import { setSpeciality, setDescription, specialityPopOver } from '../Common/Common.js';
import { isMobile } from 'react-device-detect';
import { InlineShareButtons } from 'sharethis-reactjs';
import likeIcon from '../../desktopImages/like-black.png';
import likeIconActive from '../../desktopImages/like-active.png';
import vaultIcon from '../../desktopImages/vault-black.png';
import vaultIconActive from '../../desktopImages/vault-active.png';
import Share from "../Common/Share.jsx";
import TrandingGrLoader from '../LoadingPlaceholders/TrandingGrLoader.jsx';

let popupShow = false;
const url = AppConfig.apiLoc;
var trending_gr_list_data = [];
var slider_active_elements = []
var deafult_popover_index = -1;
let isApiCallDone = false;
class GrandRoundSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      modal_show: false
    };
    isApiCallDone = false;
    popupShow = false;
    trending_gr_list_data = []
  }

  onClickDetail() {
    popupShow = true;
    this.setState({ "modal_show": true });
  }

  refresh = () => {
    this.setState({ "display": !this.state.display });
  }

  redirectToGrDetail = (id) => {
    if (isMobile) {
      this.props.history.push({
        pathname: '/GrandRoundsMobile/' + id + ''
      })
    }

    else {
      this.props.history.push({
        pathname: '/GrandRoundsDesktop/' + id + ''
      })

    }
  }

  componentDidMount() {
    isApiCallDone = false;
    let temp = this;
    trending_gr_list_data = [];
    this.getTrendingGrData(0);
    
		$(document).on("click", function(e){
      //popover dissapear func
      let ggg=$(e.target).parents('.popoverExtra').length;   
      if(ggg==0 && !$(e.target).hasClass('popoverExtra'))
      {
        deafult_popover_index = -1;
        temp.refresh();
      }  
    });
  }


  setJqueryOnCard(trending_gr_list_data) {
    let count = 0
    if (trending_gr_list_data.length > 0) {
      count = trending_gr_list_data.length - 4
    }
    $(".mblGrMstrDocRow").each(function (i) {
      // //console.log('in each function'+i+'\n'+$(this).find(".mblGrMstrDocBox").length) 
      if (parseInt($(this).find(".mblGrMstrDocBox").length) != 1) {
        $(this).find(".mblGrMstrDocBox").addClass("mblGrMstrDocPopShow");
      }
      else {
        $(this).find(".mblGrMstrDocBox").removeClass("mblGrMstrDocPopShow");
      }
    });

    $(document).on('click', '.mblGrMstrDocPopShow .mblGrMstrDocBoxIn', function () {
      $(".mblGrMstrDocBox").removeClass("mblGrMstrDocPopShowActive");
      $(this).parent().addClass("mblGrMstrDocPopShowActive");
      $(".mblGrMstrDocProfile").removeClass("mblGrMstrDocProfileShow").fadeOut(300);
      $(this).find('.mblGrMstrDocProfile').addClass('mblGrMstrDocProfileShow').fadeIn(300);
    });

    $(document).on('click', '.mblGrMstrDocPopShowActive.mblGrMstrDocPopShow .mblGrMstrDocBoxIn', function () {
      $(this).parent().removeClass("mblGrMstrDocPopShowActive");
      $(this).find('.mblGrMstrDocProfile').removeClass('mblGrMstrDocProfileShow').fadeOut(300);
    });
    
    $( ".mblGrMstrDocRow" ).each(function( index ) {
       
      let countcir=$(this).find(".mblGrMstrDocProfile").length;

       $(this).find(".mblGrMstrDocBox:nth-child(5)").find(".mblGrMstrDocProfile").remove();

       $(this).find(".mblGrMstrDocBox:nth-child(5)").find(".mblGrMstrDocBoxInPic").append("<div class='overlay'></div><span id='view-master-doctor'  class='dskGrMstrDocCount' style='cursor: default;'>+"+(countcir-4)+"</span>");
       // this.refresh()
     });

    //$(".mblGrMstrDocBox:nth-child(5)").find(".mblGrMstrDocProfile").remove();
   // $(".mblGrMstrDocBox:nth-child(5)").find(".mblGrMstrDocBoxInPic").append("<div class='overlay'></div><span id='view-master-doctor'  class='dskGrMstrDocCount plus_icon' style='cursor: default;'>++</span>");
    var that = this;
    $(".plus_icon").click(function () {
      let key_element = parseInt($(this).parent().parent().parent().parent().parent().find('.hidden_span').text());
      slider_active_elements.map((val, ind) => (
        slider_active_elements[ind] = false
      ));
      slider_active_elements[key_element] = true;
      // that.refresh()
      //this.renderModal()
    });
    // this.refresh()
  }
  getTrendingGrData = (fetch_from) => { 

    fetch(url + 'dashboard/trending?from=' + fetch_from + '&to=10&type=gr', {
      method: 'GET',
      headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'
      }
    }).then((response) => response.json()).then((responseJson) => {
      let status_code = responseJson.status_code;
      isApiCallDone = true;
      let temp = this;

      if (status_code == 200) {
        let responseData = responseJson.data;
        trending_gr_list_data = responseData;
        this.refresh()
        setTimeout(function () {
          temp.setJqueryOnCard(trending_gr_list_data);
          //  alert('count array'+JSON.stringify(slider_active_elements))
        }, 500);

        setTimeout(function () {
          trending_gr_list_data.map((val, ind) => (
            slider_active_elements.push(false)
          ));
          //  alert('count array'+JSON.stringify(slider_active_elements))
        }, 500);
        setTimeout(function () {
          if (trending_gr_list_data.length == 1) {
            $(".mblGrCard").addClass("mblSingleCard");
          } else {
            $(".mblGrCard").removeClass("mblSingleCard");
          }
        }, 300);
      }

    }).catch((error) => {
      isApiCallDone = true;
      //console.log("Error"+error);
    });
  }

  onvaultPress = (item_id, type, array_index) => {
    //console.log("on vault press"+item_id+'\n'+type) 
    var thisobjval = this;
    let formdatam = { "postid": item_id, "type": type }
    fetch(url + 'knwlg/vault_switching', {
      method: 'POST',
      headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'
      },
      body: JSON.stringify(formdatam),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.data ==1 ) { 
          trending_gr_list_data[array_index].vault = responseJson.data
          reactLocalStorage.set('@ClirnetStore:vault_count', (parseInt(reactLocalStorage.get('@ClirnetStore:vault_count', 0)) + 1));
          // this.refresh();
        }
        else {
          trending_gr_list_data[array_index].vault = responseJson.data
          reactLocalStorage.set('@ClirnetStore:vault_count', (parseInt(reactLocalStorage.get('@ClirnetStore:vault_count', 0)) - 1));
          // this.refresh();
        }
        this.props.callbackReciver();
      })
      .catch((error) => {
      });
  }

  onLikeBtnPress = (item_id, type, arr_index) => {
    console.log("like btn")
    let formdatam = { "type_id": item_id, "type": type }
    fetch(url + 'knwlg/save_like', {
      method: 'POST',
      headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'
      },
      body: JSON.stringify(formdatam),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status_code == 200) {
          if (responseJson.data.like) {
            trending_gr_list_data[arr_index].rating = responseJson.data.rating
            trending_gr_list_data[arr_index].myrating = true
          } else {
            trending_gr_list_data[arr_index].rating = responseJson.data.rating
            trending_gr_list_data[arr_index].myrating = false
          }
        }
        this.refresh()
      })
      .catch((error) => {
      });
  }


  grCardMenuPopover = (val, array_index) => {
    return (
      <div className="mblDotsMenu mblDotsCircle mblDotsMenuGrCard" data-toggle="popover" data-trigger="focus">
        <div>
          <span className="mblDotsMenu-dots"></span>
          <span className="mblDotsMenu-dots"></span>
          <span className="mblDotsMenu-dots"></span>
        </div>
        <Popover id="popover-basic" placement="bottom-end" className="mblDotsMenuSettings popoverExtra">
          <Popover.Content>
            <a href="javascript:void(0)" className={(val.myrating == true) ? "mblDotsMenuSettingsIcon active" : "mblDotsMenuSettingsIcon"} onClick={() => this.onLikeBtnPress(val.type_id, 'gr', array_index)}>
              <span>
                {(val.myrating == true) ?
                  <img src={likeIconActive} alt="Like" className="translate_both mblGrLeftShareImgActive" /> :
                  <img src={likeIcon} alt="Like" className="translate_both mblGrLeftShareImg" />
                }
              </span>
              Like
            </a>
            <a href="javascript:void(0)" className={val.vault == 0 ? 'mblDotsMenuSettingsIcon ' : 'mblDotsMenuSettingsIcon active'} onClick={() => this.onvaultPress(val.type_id, 'gr', array_index)}>
              <span>
                {(val.vault == 0) ?
                  <img src={vaultIcon} alt="Vault" className="translate_both mblGrLeftShareImg" /> :
                  <img src={vaultIconActive} alt="Vault" className="translate_both mblGrLeftShareImgActive" />}
              </span>
                Vault
            </a>
            {/* <InlineShareButtons
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
                description: val.title + "...",       // (defaults to og:description or twitter:description)
                title: val.title,                // (defaults to og:title or twitter:title)
                message: '',     // (only for email sharing)
                subject: '',  // (only for email sharing)
                username: 'Medwiki view' // (only for twitter sharing)
              }} /> */}
            {/* <a href="javascript:void(0)" className="mblDotsMenuNotRelevant">
            Not Relevant for me
        </a> */}
            <Share customClass="dskCphTtlExtra"
             data={{
               title: val.title,
               text: val.description,
               url: val.deeplink, 
             }}
           />
          </Popover.Content>
        </Popover>
      </div>
    )
  }

  openModal(ind) {

    slider_active_elements.map((val, ind) => (
      slider_active_elements[ind] = false
    ));
    slider_active_elements[ind] = true;
    this.refresh()
  }

  onMenuClick(ind) {
    deafult_popover_index = ind;
    this.refresh()
  }

  render() {
    var mblGrSlider = {
      dots: false,
      infinite: true,
      speed: 600,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: false,
      centerMode: true,
      centerPadding: '12%',
      afterChange: () => {
        if(deafult_popover_index != -1){ 
          deafult_popover_index = -1;
          this.refresh();
        }
      },
      responsive: [
        {
          breakpoint: 640,
          settings: {
            centerPadding: '6%',

          }
        },
        {
          breakpoint: 360,
          settings: {
            centerPadding: '5%',
          }
        }
      ]
    };

    var mblGrClient = {
      dots: false,
      infinite: true,
      speed: 300,
      autoplaySpeed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      adaptiveHeight: true,
      autoplay: true,
      fade: true,
      cssEase: 'linear'
    };
    return (
     isApiCallDone?
        <section className="full_width text-left mblGR">
          {(trending_gr_list_data != null && trending_gr_list_data.length > 0) ?
            <h3 className="font700 fontExo colorBlack font_22px mblGRTtl"> <span>Trending Grand Rounds</span></h3> : null}
          <div className="clearfix"></div>
          <Slider {...mblGrSlider} className="full_width text-left mblGrSlider">
            {(trending_gr_list_data != null && trending_gr_list_data.length > 0) ?
              trending_gr_list_data.map((val, ind) => (
                <div className="mblGrCard" >

                  {/* <Modal className="in dskMasterDoctorPop" centered="true" animation="slide" show={slider_active_elements[ind]} onHide={() => { slider_active_elements[ind] = false; this.refresh(); }}>
                    <Modal.Header className="align-items-center justify-content-between">
                      <Modal.Title className="font600 font_20px colorBlack">Master Doctors</Modal.Title>
                      <a href="javascript:void(0)" className="radius-100 popClose" variant="secondary" onClick={() => { slider_active_elements[ind] = false; this.refresh(); }}>
                        <img src={announcementClose} className="translate_both" />
                      </a>
                    </Modal.Header>
                    <Modal.Body>
                      {val.session_doctor_entities.map((rdoctor, indexdoctor1) => (
                        <div className="text-left dskGrMstrDocBox">
                          <div className="full_width dskGrMstrDocBoxIn">
                            <div className="row align-items-center">
                              <div className="radius-100 dskGrMstrDocBoxInPic">
                                <img src={rdoctor.session_doctor_image} className="object_fit_cover" />

                              </div>
                              <div className="font_12px colorGrey font400 dskGrMstrDocBoxContent">
                                <h4 className="font_14px colorBlack font600">{rdoctor.session_doctor_name}</h4>
                                <p>{rdoctor.DepartmentName}</p>

                              </div>
                            </div>
                            <div className="radius-6 dskGrMstrDocProfile">
                              <img src={rdoctor.session_doctor_image} className="object_fit_cover" />
                              <div className="overlay"></div>
                              <div className="full_width font_12px colorWhite font400 dskGrMstrDocProfileTxt">
                                <h4 className="font_14px colorWhite font600">{rdoctor.session_doctor_name}</h4>
                                <p>{rdoctor.profile}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Modal.Body>
                  </Modal> */}
                  <div className="full_width radius-6 mblGrCard_link">
                    <div className="full_width mblGrPic">
                      <div className="full_width mblGrPicOverBox">
                        <div className="overlay"></div>
                        {(val.image == null || val.image == '') ? null :
                          <img src={val.image} className="object_fit_cover" alt="Grand Rounds" />
                        }

                      </div>



                      <div className="mblGrCardTop">
                        {(val.specialities == '' || val.specialities == null) ? null :
                          <div className="colorBlack font_14px font500 radius-6 mblMedWikiSpeacality">
                            {setSpeciality(val.specialities)}
                            {specialityPopOver(val.specialities)}
                          </div>
                        }
                        {(deafult_popover_index == ind) ? this.grCardMenuPopover(val, ind) : null}
                        {(deafult_popover_index != ind) ?
                          <div onClick={() => { this.onMenuClick(ind) }} className="mblDotsMenu mblDotsCircle mblDotsMenuGrCard popoverExtra">
                            <span className="mblDotsMenu-dots"></span>
                            <span className="mblDotsMenu-dots"></span>
                            <span className="mblDotsMenu-dots"></span>
                          </div> : null}
                        {/* {this.grCardMenuPopover(val)} tt*/}
                      </div>
                    </div>
                    <div className="full_width mblGrContent">
                      {(val.title == null || val.title == '') ? null :
                        <h3 className="font500 colorBlack font_18px mblGrContentTtl" onClick={() => { this.redirectToGrDetail(val.type_id) }}>{val.title}</h3>
                      }
                      <div className="clearfix"></div>
                      <div className="full_width mblGrMstrDoc">
                        <h4 className="font500 fontExo font_16px colorBlack">{val.category_name}</h4>
                        <div className="clearfix"></div>
                        <div className="row mblGrMstrDocRow">
                          {/* <span class="hidden_span">{ind}</span> */}
                          {(val.session_doctor_entities.length > 0) ?
                            val.session_doctor_entities.map((val, ind) => (
                              <div className="mblGrMstrDocBox mblGrMstrDocPopShow">
                                <div className="full_width mblGrMstrDocBoxIn">
                                  <div className="row align-items-center">
                                    <div className="radius-100 mblGrMstrDocBoxInPic">
                                      {
                                        (val.session_doctor_image == null || val.session_doctor_image == '') ? null :
                                          <img src={val.session_doctor_image} className="object_fit_cover" />
                                      }
                                    </div>
                                    <div className="font_12px colorGrey font400 mblGrMstrDocBoxContent">
                                      <h4 className="font_14px colorBlack font600">{val.session_doctor_name}</h4>
                                      <p>{val.DepartmentName}</p>
                                    </div>
                                  </div>
                                  <div className="radius-6 mblGrMstrDocProfile">
                                    {
                                      (val.session_doctor_image == null || val.session_doctor_image == '') ? null :
                                        <img src={val.session_doctor_image} className="object_fit_cover" />
                                    }
                                    <div className="overlay"></div>
                                    <div className="full_width font_12px colorWhite font400 mblGrMstrDocProfileTxt">
                                      <h4 className="font_14px colorWhite font600">{val.session_doctor_name}</h4>
                                      <p>{val.DepartmentName}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )) : null}
                        </div>
                      </div>
                      <div className="clearfix"></div>

                      {(val.description == null || val.description == '') ? null :
                        <h5 className="font400 colorGrey font_14px mblGrContentText">{setDescription(val.description)}</h5>
                      }
                      <div className="clearfix"></div>
                      <Slider {...mblGrClient} className="mblSessionClient mblGrClient">
                        {(val.sponsor_logo !== null || val.sponsor_logo == '') ?
                          val.sponsor_logo.split(',').map((val, ind) => (
                            <div className="mblSessionClientItem">
                              <img src={val} />
                            </div>
                          )) : null
                        }
                      </Slider>
                    </div>
                  </div>
                </div>
              )) : null}
          </Slider>
        </section>:<TrandingGrLoader/> 
    );
  }
}
export default GrandRoundSlider;