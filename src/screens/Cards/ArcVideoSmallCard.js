import React from 'react';
import $ from 'jquery';
import { reactLocalStorage } from 'reactjs-localstorage';
import { setSpeciality, setDescription } from '../Common/Common.js';
import Slider from "react-slick";
import AppConfig from '../config/config.js';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import { InlineShareButtons } from 'sharethis-reactjs';
import likeIcon from '../../desktopImages/like-black.png';
import likeIconActive from '../../desktopImages/like-active.png';
import vaultIcon from '../../desktopImages/vault-black.png';
import vaultIconActive from '../../desktopImages/vault-active.png';
import medwikiicon from '../../images/medwiki.jpg';
import videoIcon from '../../images/playBTn.png';
import ReactPlayer from 'react-player';
import Share from '../Common/Share.jsx';

const url = AppConfig.apiLoc;
var image_url = [];
var value = "";

class ArcVideoSmallCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

  }


  first_spec(spec) {
    var res = spec.split(",")
    return res[0];
  }

  redirect_to_compendium_detail(id,nameclass="") {
    if (window.location.href.includes("/ArchivedVideoRelated")) {

      if(nameclass!="cph_pages_dev")
    {
      reactLocalStorage.set('@ClirnetStore:jugar_url', '/ArchivedVideo/' + id + '');
    }
      this.props.history.push({
        pathname: '/ArchivedVideo/' + id + ''
      })
    }
    else {
      if(nameclass!="cph_pages_dev")
      {
        reactLocalStorage.set('@ClirnetStore:jugar_url', '/ArchivedVideoRelated/' + id + '');
      }
      this.props.history.push({ 
        pathname: '/ArchivedVideoRelated/' + id + ''
      })
    }
      
  }


  popover_view_spec(val) {
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

        <OverlayTrigger placement="right" rootClose="true" rootCloseEvent="click" trigger="click" delay={{ show: 50, hide: 50 }} overlay={popover}>

          <span className="mblMedWikiSpeacalityDots">
            <span></span>
            <span></span>
            <span></span>
          </span>

        </OverlayTrigger>
      </>
    )
  }



  popover_view(val, index) {

    return (
      <>

        <div className="dskDotsMenu dskPollsCardDots dskDotsMenuMedWikiCard">
          <div>
            <span className="dskDotsMenu-dots"></span>
            <span className="dskDotsMenu-dots"></span>
            <span className="dskDotsMenu-dots"></span>
          </div>

          <Popover placement="bottom-end" id={"popover-basic" + index} className="dskDotsMenuSettings arc_extra_class">
            <Popover.Content>
              <a href="javascript:void(0)" onClick={() => this.onLikeBtnPressmedwiki(val.type_id, 'video_archive', index)} className={val.myrating == true ? 'dskDotsMenuSettingsIcon active' : 'dskDotsMenuSettingsIcon'} >
                <span>
                  <img src={likeIcon} alt="Like" className="translate_both dskGrLeftShareImg" />
                  <img src={likeIconActive} alt="Like" className="translate_both dskGrLeftShareImgActive" />
                </span>
					Like
				</a>



              <a href="javascript:void(0)" className={val.vault == 0 ? 'dskDotsMenuSettingsIcon  dynamicclsvault_' + index + '' : 'dskDotsMenuSettingsIcon active dynamicclsvault_' + index + ''} >
                <span>
                  <img src={vaultIcon} alt="Vault" onClick={() => this.onvaultPressMedwiki(val.type_id, 'video_archive', index, 1)} className={"translate_both dskGrLeftShareImg"} />
                  <img src={vaultIconActive} alt="Vault" onClick={() => this.onvaultPressMedwiki(val.type_id, 'video_archive', index, 0)} className={"translate_both dskGrLeftShareImgActive"} />
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
                }}
              /> */}
              {/* <a href="javascript:void(0)" className="dskDotsMenuNotRelevant">
					Not Relevant for me
				</a> */}
         <Share 
              data={{
                title: val.question,
                text: val.answer,
                url: val.deeplink, 
              }}
            />
            </Popover.Content>
          </Popover>
        </div>
      </>
    )
  }



  onvaultPressMedwiki = (item_id, type, array_index, flag) => {
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
        //medwiki_data[array_index].vault = responseJson.data;



        if (responseJson.data == 1) {
          reactLocalStorage.set('@ClirnetStore:vault_count', (parseInt(reactLocalStorage.get('@ClirnetStore:vault_count', 0)) + 1));
          this.props.onChangeButton(array_index, responseJson.data, 'vault');


        }

        if (responseJson.data == 0) {
          reactLocalStorage.set('@ClirnetStore:vault_count', (parseInt(reactLocalStorage.get('@ClirnetStore:vault_count', 0)) - 1));
          this.props.onChangeButton(array_index, responseJson.data, 'vault');


        }




      })
      .catch((error) => {

      });



  }




  onLikeBtnPressmedwiki = (item_id, type, array_index) => {
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
        if (responseJson.data.like != true) {

          this.props.onChangeButton(array_index, responseJson.data.like, 'like');

        }
        else {

          this.props.onChangeButton(array_index, responseJson.data.like, 'like');

        }




      })
      .catch((error) => {

      });



  }



  popover_view_spec_mobile(val) {
    let popover = (
      <Popover id="popover-basic">
        <Popover.Content className="font_12px specialty_popOver">
          {val}
        </Popover.Content>
      </Popover>
    );
    return (
      <>

        <OverlayTrigger placement="right" rootClose="true" rootCloseEvent="click" trigger="click" delay={{ show: 50, hide: 50 }} overlay={popover}>

          <span className="mblMedWikiSpeacalityDots">
            <span className="mblDotsMenu-dots"></span>
            <span className="mblDotsMenu-dots"></span>
            <span className="mblDotsMenu-dots"></span>
          </span>

        </OverlayTrigger>
      </>
    )
  }



  popover_view_mobile(val, index) {

    return (
      <>
        <div className="mblDotsMenu mblDotsMenuMedWikiCard">
          <div>
            <span className="mblDotsMenu-dots"></span>
            <span className="mblDotsMenu-dots"></span>
            <span className="mblDotsMenu-dots"></span>
          </div>
          <Popover placement="bottom-end" id={"popover-basic" + index} className="mblDotsMenuSettings arc_extra_class">
            <Popover.Content>
              <a href="javascript:void(0)" onClick={() => this.onLikeBtnPressmedwiki(val.type_id, 'video_archive', index)} className={val.myrating == true ? 'mblDotsMenuSettingsIcon active' : 'mblDotsMenuSettingsIcon'} >
                <span>
                  <img src={likeIcon} alt="Like" className="translate_both mblGrLeftShareImg" />
                  <img src={likeIconActive} alt="Like" className="translate_both mblGrLeftShareImgActive" />
                </span>
					Like
				</a>



              <a href="javascript:void(0)" className={val.vault == 0 ? 'mblDotsMenuSettingsIcon ' : 'mblDotsMenuSettingsIcon active'} >
                <span>
                  <img src={vaultIcon} alt="Vault" onClick={() => this.onvaultPressMedwiki(val.type_id, 'video_archive', index, 1)} className="translate_both mblGrLeftShareImg" />
                  <img src={vaultIconActive} alt="Vault" onClick={() => this.onvaultPressMedwiki(val.type_id, 'video_archive', index, 0)} className="translate_both mblGrLeftShareImgActive" />
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
                }}
              /> */}
              {/* <a href="javascript:void(0)" className="mblDotsMenuNotRelevant">
					Not Relevant for me
				</a> */}
         <Share
              data={{ 
                title: val.question,
                text: val.answer,
                url: val.deeplink, 
              }}
            />
            </Popover.Content>
          </Popover>
        </div>
      </>
    )
  }


  popover_view_key(index) {
    this.props.onChangeButton(index, 0, 'popover');

  }





  render() {



    var dskSessionClient = {
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
      cssEase: 'linear',
      is_loader: true,
    };


    var mblMedWikiClient = {
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
      <>
        {(this.props.mobile_device == true) ?

          <div className={"mblMedWikiCard mblRecentCard " + this.props.custom_class}>
            <div className="full_width radius-6 mblMedWikiCard_link">
              <div className="row align-items-center">
                <div className="mblMedWikiPic">
                  <div className="radius-6 mblMedWikiPicGraphic" style={{ "background-color": this.props.card_data.color }}></div>
                  <div className="full_width mblMedWikiPicIn">
                    {(this.props.card_data.image != "" && this.props.card_data.image != undefined && this.props.card_data.con_type == 'text' && this.props.card_data.con_type != undefined) ?
                      <img src={this.props.card_data.image} className="object_fit_cover" /> : <>
                        {(this.props.card_data.image == "" && this.props.card_data.con_type == 'text' && this.props.card_data.con_type != undefined) ?
                          <img className="object_fit_cover" src={medwikiicon} /> : null}
                      </>}

                    {(this.props.card_data.con_type == 'video' && this.props.card_data.vendor == 'flow' && this.props.card_data.con_type != undefined && this.props.card_data.vendor != undefined) ?
                      <>
                        <div className="transition6s playBtnVideo">
                          <div className="transition6s translate_both radius-100 playBtnVideoIcon">
                            <img src={videoIcon} className="translate_both" />
                          </div>
                        </div>
                        <img src={this.props.card_data.image} className="arcVideoThumbnail" />
                      </>
                      : null}
                     {(this.props.card_data.con_type == 'video' && this.props.card_data.vendor == 'vimeo' && this.props.card_data.con_type != undefined && this.props.card_data.vendor != undefined) ?
                      <>
                        <div className="transition6s playBtnVideo">
                          <div className="transition6s translate_both radius-100 playBtnVideoIcon">
                            <img src={videoIcon} className="translate_both" />
                          </div>
                        </div>
                        <img src={this.props.card_data.image} className="arcVideoThumbnail" />
                      </>
                      : null}

                    
                    {(this.props.card_data.con_type == 'video' && this.props.card_data.vendor == 'youtube' && this.props.card_data.con_type != undefined && this.props.card_data.vendor != undefined) ?
                      <>
                        <div className="transition6s playBtnVideo">
                          <div className="translate_both transition6s radius-100 playBtnVideoIcon">
                            <img src={videoIcon} className="translate_both" />
                          </div>
                        </div>
                        <img src={this.props.card_data.image} className="arcVideoThumbnail" />
                        {/* <ReactPlayer url={'https://www.youtube.com/watch?v=' + this.props.card_data.src} width='100%'/> */}

                      </> : null}

                    <div className="overlay"></div>
                  </div>
                </div>
                <div className="mblMedWikiContent">
                  <div className="full_width mblMedWikiContentTop">
                    <div className="colorBlack font_14px font500 radius-6 mblMedWikiSpeacality">
                      {this.props.card_data.specialities.split(",")[0]}
                      {(this.props.card_data.specialities.split(',').length > 1) ?
                        this.popover_view_spec_mobile(this.props.card_data.specialities) : null}


                    </div>

                    {(this.props.clicked_index == this.props.elem_key) ?

                      this.popover_view_mobile(this.props.card_data, this.props.elem_key) : null}
                    {(this.props.clicked_index != this.props.elem_key) ?
                      <div onClick={() => { this.popover_view_key(this.props.elem_key) }} className={"mblDotsMenu mblDotsMenuMedWikiCard arc_extra_class " + this.props.elem_key + "_dynamicclass"}>

                        <span className="mblDotsMenu-dots"></span>
                        <span className="mblDotsMenu-dots"></span>
                        <span className="mblDotsMenu-dots"></span>

                      </div> : null}
 

                  </div>
                  <div className="clearfix"></div>
                  <h4 className="font500 colorBlack font_16px mblMedWikiContentTtl">{setDescription(this.props.card_data.question)}...<a className="font_14px font600" href="javascript:void(0);" onClick={() => { this.redirect_to_compendium_detail(this.props.card_data.type_id,this.props.custom_class); }}>&nbsp; View More</a></h4>
                  <div className="clearfix"></div>
                  <Slider {...mblMedWikiClient} className="mblSessionClient mblMedWikiClient">

                    {(this.props.card_data.sponsor_logo !== null || this.props.card_data.sponsor_logo == '') ?
                      this.props.card_data.sponsor_logo.split(',').map((val, ind) => (
                        <div className="mblSessionClientItem">
                          <img src={val} />
                        </div>
                      )) : null
                    }

                  </Slider>
                </div>

              </div>

            </div>
          </div> :
          <div className={this.props.elem_key > 1 ? 'col-sm-6 mblMedWikiCard dskMasonryCard ' + this.props.custom_class + '' : 'col-sm-6 mblMedWikiCard dskMasonryCard ' + this.props.custom_class + ''} >
            <div className="full_width radius-6 mblMedWikiCard_link">
              <div className="row align-items-center">
                <div className="mblMedWikiPic">
                  <div className="mblMedWikiPicGraphic" style={{ "background-color": this.props.card_data.color }}></div>
                  <div className="full_width mblMedWikiPicIn">
                    {(this.props.card_data.image != "" && this.props.card_data.image != undefined && this.props.card_data.con_type == 'text' && this.props.card_data.con_type != undefined) ?
                      <img src={this.props.card_data.image} className="object_fit_cover" /> : <>
                        {(this.props.card_data.image == "" && this.props.card_data.con_type == 'text' && this.props.card_data.con_type != undefined) ?
                          <img className="object_fit_cover" src={medwikiicon} /> : null}
                      </>}

                    {(this.props.card_data.con_type == 'video' && this.props.card_data.vendor == 'flow' && this.props.card_data.con_type != undefined && this.props.card_data.vendor != undefined) ?
                      <>
                        <div className="transition6s playBtnVideo">
                          <div className="transition6s translate_both radius-100 playBtnVideoIcon">
                            <img src={videoIcon} className="translate_both" />
                          </div>
                        </div>
                        <img src={this.props.card_data.image} className="arcVideoThumbnail" />
                      </>
                      : null}

                      {(this.props.card_data.con_type == 'video' && this.props.card_data.vendor == 'vimeo' && this.props.card_data.con_type != undefined && this.props.card_data.vendor != undefined) ?
                      <>
                        <div className="transition6s playBtnVideo">
                          <div className="transition6s translate_both radius-100 playBtnVideoIcon">
                            <img src={videoIcon} className="translate_both" />
                          </div>
                        </div>
                        <img src={this.props.card_data.image} className="arcVideoThumbnail" />
                      </>
                      : null}

                    {(this.props.card_data.con_type == 'video' && this.props.card_data.vendor == 'youtube' && this.props.card_data.con_type != undefined && this.props.card_data.vendor != undefined) ?
                      <>
                        <div className="transition6s playBtnVideo">
                          <div className="translate_both transition6s radius-100 playBtnVideoIcon">
                            <img src={videoIcon} className="translate_both" />
                          </div>
                        </div>
                        <img src={this.props.card_data.image} className="arcVideoThumbnail" />
                        {/* <ReactPlayer url={'https://www.youtube.com/watch?v=' + this.props.card_data.src} width='100%'/> */}
                      </> : null}

                    <div className="overlay"></div>
                  </div>
                </div>
                <div className="mblMedWikiContent">
                  <div className="full_width mblMedWikiContentTop">
                    <div className="colorBlack font_12px font400 radius-6 mblMedWikiSpeacality">

                      {this.props.card_data.specialities.split(",")[0]}
                      {(this.props.card_data.specialities.split(',').length > 1) ?
                        this.popover_view_spec(this.props.card_data.specialities) : null}
                    </div>

                    {(this.props.clicked_index == this.props.elem_key) ?

                      this.popover_view(this.props.card_data, this.props.elem_key) : null}
                    {(this.props.clicked_index != this.props.elem_key) ? 
                      <div onClick={() => { this.popover_view_key(this.props.elem_key) }} data-toggle="popover" data-trigger="focus" className={"dskDotsMenu dskPollsCardDots arc_extra_class dskDotsMenuMedWikiCard " + this.props.elem_key + "_dynamicclass"}>

                        <span className="dskDotsMenu-dots"></span>
                        <span className="dskDotsMenu-dots"></span>
                        <span className="dskDotsMenu-dots"></span>


                      </div> : null}





                  </div>
                  <div className="clearfix"></div>
                  <h4 className="font400 colorBlack font_14px mblMedWikiContentTtl">{setDescription(this.props.card_data.question)}<a className="font_14px font600" href="javascript:void(0);" onClick={() => { this.redirect_to_compendium_detail(this.props.card_data.type_id,this.props.custom_class); }}>&nbsp; View More</a></h4>
                  <div className="clearfix"></div>
                  <Slider {...dskSessionClient} className="dskSessionClient mblMedWikiClient">

                    {(this.props.card_data.sponsor_logo !== null || this.props.card_data.sponsor_logo == '') ?
                      this.props.card_data.sponsor_logo.split(',').map((val, ind) => (
                        <div className="dskSessionClientItem">
                          <img src={val} />
                        </div>
                      )) : null
                    }

                  </Slider>
                </div>

              </div>

            </div>
          </div>

        }
      </>

    );
  }
}
export default ArcVideoSmallCard;
