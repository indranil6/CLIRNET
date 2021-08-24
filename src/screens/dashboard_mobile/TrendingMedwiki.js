import React from 'react';
import Slider from "react-slick";
import medwikiicon from '../../images/medWikiNoImage-2.jpg';
import AppConfig from '../config/config.js';
import { isInViewport, setDescription, setSpeciality, specialityPopOver } from '../Common/Common.js';
import playIcon from '../../images/playIcon.png';
import { reactLocalStorage } from 'reactjs-localstorage';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import $ from 'jquery';
import Popover from 'react-bootstrap/Popover'
import likeIcon from '../../desktopImages/like-black.png';
import likeIconActive from '../../desktopImages/like-active.png';
import vaultIcon from '../../desktopImages/vault-black.png';
import vaultIconActive from '../../desktopImages/vault-active.png';
import Share from "../Common/Share.jsx";
import RelatedMedwikiLoader from '../LoadingPlaceholders/RelatedMedwikiLoader.jsx';

const url = AppConfig.apiLoc;
var comp_list_data = [];
var comp_api_call_permission = true;
var fetch_counter = 0;
var fetch_from = 0;
var deafult_popover_index = -1;
var isApiCallDone = false; 
const mblMedWikiClient = {
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

class TrendingMedwiki extends React.Component {
  constructor(props) {
    super(props);
    comp_list_data = [];
    this.state = {
      display: false
    };
    isApiCallDone = false; 
    fetch_counter = 0
  }
  componentDidMount() {
    isApiCallDone = false; 
    fetch_counter = 0
    this.compFetchValidate(0);
    let temp = this

    $(document).on("click", function (e) {
      //popover dissapear func
      let ggg = $(e.target).parents('.popoverExtra').length;
      if (ggg == 0 && !$(e.target).hasClass('popoverExtra')) {
        deafult_popover_index = -1;
        temp.refresh();
      }
    });
  }

  onMenuClick(ind) {
    deafult_popover_index = ind;
    this.refresh()
  }

  refresh = () => {
    this.setState({ "display": !this.state.display });
  }

  compFetchValidate(currentSlide) {
    const medwikiSection = document.querySelector('#mblMedWiki');
    let comp_list_length = comp_list_data.length
    fetch_from = comp_list_length;
    let currentState = (comp_list_length - 1) - currentSlide;
    // //console.log("data::"+comp_list_length+'\n'+isInViewport(medwikiSection)+'\n'+currentState+'\n')
    if (isInViewport(medwikiSection) === true && comp_api_call_permission === true && fetch_counter !== 0 && fetch_from !== undefined && currentState == 0) {
      //console.log('1st block') 
      this.getCompData(fetch_from);
    } if (fetch_counter === 0 || fetch_counter === '0' && comp_api_call_permission == true) {
      //console.log('2nd block') 
      this.getCompData(0);
    } else {
      // //console.log('unable to fetch comp')   
    }
  }

  getCompData(fetch_from) {
    comp_api_call_permission = false;
    fetch(url + 'dashboard/trending?from=' + fetch_from + '&to=10&type=comp', {
      method: 'GET',
      headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'
      }
    }).then((response) => response.json()).then((responseJson) => {
      let status_code = responseJson.status_code;
      isApiCallDone = true; 
      if (status_code == 200) {

        let responseData = responseJson.data;
        if (fetch_counter === 0) {
          fetch_counter++;
        }
        //console.log("comp lengh before"+comp_list_data.length)
        responseData.map((r, index) => {
          comp_list_data.push(r)
        })
        //console.log("comp lengh"+comp_list_data.length)
        comp_api_call_permission = true;
        if (fetch_counter == 1) {
          this.refresh()
        }
        setTimeout(function () {
          if (comp_list_data.length == 1) {
            $(".mblMedWikiCard").addClass("mblSingleCard");
          } else {
            $(".mblMedWikiCard").removeClass("mblSingleCard");
          }
        }, 300);
      }
    }).catch((error) => {
      isApiCallDone = true; 
      comp_api_call_permission = true;
      //console.log("Error"+error);
    });
  }

  redirectToFeedDetail = (id) => {
    this.props.history.push({
      pathname: '/Feeddetail/' + id + ''
    })
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
        if (responseJson.data == 1) {
          comp_list_data[array_index].vault = responseJson.data
          reactLocalStorage.set('@ClirnetStore:vault_count', (parseInt(reactLocalStorage.get('@ClirnetStore:vault_count', 0)) + 1));
        }
        else{
          comp_list_data[array_index].vault = responseJson.data
          reactLocalStorage.set('@ClirnetStore:vault_count', (parseInt(reactLocalStorage.get('@ClirnetStore:vault_count', 0)) - 1));
        }
        // this.refresh();
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
            comp_list_data[arr_index].rating = responseJson.data.rating
            comp_list_data[arr_index].myrating = true
          } else {
            comp_list_data[arr_index].rating = responseJson.data.rating
            comp_list_data[arr_index].myrating = false
          }
        }
        this.refresh()
      })
      .catch((error) => {
      });
  }


  cardMenuPopover = (val, array_index) => {
    return (
      <div className="mblDotsMenu mblDotsMenuMedWikiCard" data-toggle="popover" data-trigger="focus">
        <div>
          <span className="mblDotsMenu-dots"></span>
          <span className="mblDotsMenu-dots"></span>
          <span className="mblDotsMenu-dots"></span>
        </div>
        <Popover id="popover-basic" placement="bottom-end" className="mblDotsMenuSettings popoverExtra">
          <Popover.Content>
            <a href="javascript:void(0)" className={(val.myrating == true) ? "mblDotsMenuSettingsIcon active" : "mblDotsMenuSettingsIcon"} onClick={() => this.onLikeBtnPress(val.type_id, 'comp', array_index)}>
              <span>
                {(val.myrating == true) ?
                  <img src={likeIconActive} alt="Like" className="translate_both mblGrLeftShareImgActive" /> :
                  <img src={likeIcon} alt="Like" className="translate_both mblGrLeftShareImg" />
                }
              </span>
              Like
            </a>
            <a href="javascript:void(0)" className={val.vault == 0 ? 'mblDotsMenuSettingsIcon ' : 'mblDotsMenuSettingsIcon active'} onClick={() => this.onvaultPress(val.type_id, 'comp', array_index)}>
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
                description: val.answer.substring(0, 100) + "...",       // (defaults to og:description or twitter:description)
                title: val.question,            // (defaults to og:title or twitter:title)
                message: '',     // (only for email sharing)
                subject: '',  // (only for email sharing)
                username: 'Medwiki view' // (only for twitter sharing)
              }} /> */}
            {/* <a href="javascript:void(0)" className="dskDotsMenuNotRelevant">
                  Not Relevant for me
              </a> */}
              <Share customClass="dskCphTtlExtra"
              data={{ 
                title: val.question,
                text: val.answer,
                url: val.deeplink,
              }}
            />
          </Popover.Content>
        </Popover>
      </div>
    )
  }
  render() {
    let mblMedWikiSlider = {
      dots: false,
      infinite: true,
      speed: 600,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      centerMode: true,
      centerPadding: '12%',
      autoplay: false,
      afterChange: (currentSlide) => {
        // //console.log("curre"+currentSlide);  
        // this.compFetchValidate(currentSlide)
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
    return (
      <section className="full_width text-left mblMedWiki" id="mblMedWiki">
        {(comp_list_data != null && comp_list_data.length > 0) ?
          <h3 className="font700 fontExo colorBlack font_22px mblMedWikiTtl">Trending MedWikis</h3> : null}
        <div className="clearfix"></div>
        <Slider {...mblMedWikiSlider} className="full_width text-left mblMedWikiSlider">
          {(comp_list_data != null && comp_list_data.length > 0) ?
            comp_list_data.map((val, ind) => (
              <div className="mblMedWikiCard">
                <div className="full_width radius-6 mblMedWikiCard_link">
                  <div className="row align-items-center">
                    <div className="mblMedWikiPic">
                      <div className="radius-6 mblMedWikiPicGraphic" style={{ "background-color": val.color }}></div>
                      {
                        (val.con_type == 'text' && val.image != '') ?
                          <div className="full_width mblMedWikiPicIn">
                            <img src={val.image} className="object_fit_cover" />
                            <div className="overlay"></div>
                          </div> :
                          (val.con_type == 'video' && val.image != '') ?
                            <div className="full_width mblMedWikiPicIn">
                              <img src={val.image} className="object_fit_cover" />
                              <div className="overlay"></div>
                              <img src={playIcon} className="translate_both" />
                            </div> :
                            <div className="full_width mblMedWikiPicIn">
                              <img src={medwikiicon} className="object_fit_cover" />
                              <div className="overlay"></div>
                            </div>
                      }
                    </div>
                    <div className="mblMedWikiContent">
                      <div className="full_width mblMedWikiContentTop">

                        {(val.specialities === null || val.specialities === '') ? null :
                          <div className="colorBlack font_14px font500 radius-6 mblMedWikiSpeacality">
                            {setSpeciality(val.specialities)}
                            {specialityPopOver(val.specialities)}
                          </div>
                        }
                        {(deafult_popover_index == ind) ? this.cardMenuPopover(val, ind) : null}
                        {(deafult_popover_index != ind) ?
                          <div onClick={() => { this.onMenuClick(ind) }} className="mblDotsMenu mblDotsMenuMedWikiCard popoverExtra">
                            <span className="mblDotsMenu-dots"></span>
                            <span className="mblDotsMenu-dots"></span>
                            <span className="mblDotsMenu-dots"></span>
                          </div> : null}
                        {/* {this.cardMenuPopover(val)}   */}
                      </div>
                      <div className="clearfix"></div>
                      <h4 className="font500 colorBlack font_16px mblMedWikiContentTtl" onClick={() => { this.redirectToFeedDetail(val.type_id) }}>
                        {(val.question !== '') ? setDescription(val.question) : null}
                      </h4>
                      <div className="clearfix"></div>
                      <Slider {...mblMedWikiClient} className="mblSessionClient mblMedWikiClient">
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
              </div>
            )) : null} 
        </Slider>
        {comp_list_data.length <= 0 && !isApiCallDone?<> 
          <h3 className="font700 fontExo colorBlack font_22px mblMedWikiTtl">Trending MedWikis</h3>
        <div className="clearfix"></div><div className="full_width text-left mblMedWikiSlider"><RelatedMedwikiLoader/></div></>:null}
      </section>
    );
  }
}
export default TrendingMedwiki;