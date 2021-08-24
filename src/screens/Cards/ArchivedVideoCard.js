  import React from 'react';
import Slider from "react-slick";
import Popover from 'react-bootstrap/Popover'
import { isMobile } from 'react-device-detect';
import { InlineShareButtons } from 'sharethis-reactjs';
import dskArchiveCardPlay from '../../desktopImages/videoIcon.png';
import angaleWhite from '../../desktopImages/angaleWhite.png';
import likeIcon from '../../desktopImages/like-black.png';
import likeIconActive from '../../desktopImages/like-active.png';
import vaultIcon from '../../desktopImages/vault-black.png';
import vaultIconActive from '../../desktopImages/vault-active.png';
import medwikiicon from '../../images/medwiki.jpg';
import { reactLocalStorage } from 'reactjs-localstorage';
import AppConfig from '../config/config.js';
import Share from '../Common/Share.jsx';
const url = AppConfig.apiLoc;

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

var mblSessionClient = {
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

class ArchivedVideoCard extends React.Component {
  refresh = () => {
    this.setState({ "display": !this.state.display });
  }
  
   onLikeBtnPress = (item_id, type, array_index) => {
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

  onvaultPressvideo = (item_id, type, array_index, flag) => {
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

  arcCardMenuPopoverDesktop = (val, array_index) => {
    return (
      <div className="dskDotsMenu dskDotsCircle mblDotsMenuMedWikiCard" data-toggle="popover" data-trigger="focus">
        <div>
          <span className="dskDotsMenu-dots"></span>
          <span className="dskDotsMenu-dots"></span>
          <span className="dskDotsMenu-dots"></span>
        </div>
        <Popover id={"popover-basic" + array_index} placement="bottom-end" className="dskDotsMenuSettings tanar">
          <Popover.Content>
            <a href="javascript:void(0)" className={(val.myrating == true) ? "dskDotsMenuSettingsIcon active" : "dskDotsMenuSettingsIcon"} onClick={() => this.onLikeBtnPress(val.type_id, 'video_archive', array_index)}>
              <span>

                <img src={likeIconActive} alt="Like" className="translate_both dskGrLeftShareImgActive" />
                <img src={likeIcon} alt="Like" className="translate_both dskGrLeftShareImg" />

              </span>
              Like
            </a>


            {(val.vault == 0) ?
              <a href="javascript:void(0)" onClick={() => this.onvaultPressvideo(val.type_id, 'video_archive', array_index, 1)} className={val.vault == 0 ? 'dskDotsMenuSettingsIcon ' : 'dskDotsMenuSettingsIcon active'} >
                <span>
                  <img src={vaultIcon} alt="Vault" className="translate_both dskGrLeftShareImg" />
                  <img src={vaultIconActive} alt="Vault" className="translate_both dskGrLeftShareImgActive" />
                </span>
					Vault
        </a> :
              <a href="javascript:void(0)" onClick={() => this.onvaultPressvideo(val.type_id, 'video_archive', array_index, 0)} className={val.vault == 0 ? 'dskDotsMenuSettingsIcon ' : 'dskDotsMenuSettingsIcon active'} >
                <span>
                  <img src={vaultIcon} alt="Vault" className="translate_both dskGrLeftShareImg" />
                  <img src={vaultIconActive} alt="Vault" className="translate_both dskGrLeftShareImgActive" />
                </span>
  Vault
</a>}
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
                description: val.question.substring(0, 100) + "...",       // (defaults to og:description or twitter:description)
                title: val.question,            // (defaults to og:title or twitter:title)
                message: '',     // (only for email sharing)
                subject: '',  // (only for email sharing)
                username: 'Medwiki view' // (only for twitter sharing)
              }} /> */}
            {/* <a href="javascript:void(0)" className="dskDotsMenuNotRelevant" onClick={()=>{this.onNotRelevantClick(val.type_id,'gr',array_index)}}>
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
    )
  }


  arcCardMenuPopoverMobile = (val, array_index) => {
    return (
      <div className="mblDotsMenu mblDotsCircle mblDotsMenuSssnCard" data-toggle="popover" data-trigger="focus">
        <div>
          <span className="mblDotsMenu-dots"></span>
          <span className="mblDotsMenu-dots"></span>
          <span className="mblDotsMenu-dots"></span>
        </div>
        <Popover id="popover-basic" placement="bottom-end" className="mblDotsMenuSettings tanar">
          <Popover.Content>
            <a href="javascript:void(0)" className={(val.myrating == true) ? "mblDotsMenuSettingsIcon active" : "mblDotsMenuSettingsIcon"} onClick={() => this.onLikeBtnPress(val.type_id, 'video_archive', array_index)}>
              <span>
                {(val.myrating == true) ?
                  <img src={likeIconActive} alt="Like" className="translate_both mblGrLeftShareImgActive" /> :
                  <img src={likeIcon} alt="Like" className="translate_both mblGrLeftShareImg" />
                }
              </span>
              Like
            </a>
            {(val.vault == 0) ?
              <a href="javascript:void(0)" onClick={() => this.onvaultPressvideo(val.type_id, 'video_archive', array_index, 1)} className={val.vault == 0 ? 'mblDotsMenuSettingsIcon ' : 'mblDotsMenuSettingsIcon active'} >
                <span>
                  <img src={vaultIcon} alt="Vault" className="translate_both mblGrLeftShareImg" />
                  <img src={vaultIconActive} alt="Vault" className="translate_both mblGrLeftShareImgActive" />
                </span>
					Vault
        </a> :
              <a href="javascript:void(0)" onClick={() => this.onvaultPressvideo(val.type_id, 'video_archive', array_index, 0)} className={val.vault == 0 ? 'mblDotsMenuSettingsIcon ' : 'mblDotsMenuSettingsIcon active'} >
                <span>
                  <img src={vaultIcon} alt="Vault" className="translate_both mblGrLeftShareImg" />
                  <img src={vaultIconActive} alt="Vault" className="translate_both mblGrLeftShareImgActive" />
                </span>
  Vault
</a>}



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
                description: val.question.substring(0, 100) + "...",       // (defaults to og:description or twitter:description)
                title: val.question,            // (defaults to og:title or twitter:title)
                message: '',     // (only for email sharing)
                subject: '',  // (only for email sharing)
                username: 'Medwiki view' // (only for twitter sharing)
              }} /> */}
            {/* <a href="javascript:void(0)" className="mblDotsMenuNotRelevant" onClick={()=>{this.onNotRelevantClick(val.type_id,'gr',array_index)}}>
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
    )
  }

  archivedVideoCardDesktop(props) { 
    let val = props.data;
    let ind = props.array_index;
    let deafult_popover_index = props.deafult_popover_index
    return (
      <div className="col-sm-6 mblSessionCard dskArchiveCard dskMasonryCard">
        <div href="javascript:void(0)" className="full_width radius-6 mblSessionCard_link">
          <div className="full_width mblSessionTopArea">
            {(val.image == '' || val.image == null) ?
              <img src={medwikiicon} className="object_fit_cover ssnTopBgGraphic" /> :
              <img src={val.image} className="object_fit_cover ssnTopBgGraphic" />
            }
            <div className="overlay" onClick={() => { this.redirectToArchiveDetail(val.type_id) }} style={{ "cursor": "pointer" }}></div>
            <img src={dskArchiveCardPlay} className="translate_both dskArchiveCardPlay" />
            <div className="full_width mblSessionTopIn">
              <div className="full_width mblSessionTop">
                <div className="row align-items-center justify-content-between">
                  {
                    (val.category_name == '' || val.category_name == null) ? null :
                      <div className="colorWhite font_14px font500 mblSessionType">
                        {(val.category_image == null || val.category_image == '') ?
                          null :
                          <span className="radius-100 mblSessionTypeIcon">
                            <img src={val.category_image} className="translate_both" />
                          </span>
                        }

                        {val.category_name}
                      </div>
                  }
                  <div className="mblSessionTopRight">
                    {(deafult_popover_index == ind) ? this.arcCardMenuPopoverDesktop(val, ind) : null}
                    {(deafult_popover_index != ind) ?
                      <div onClick={() => { props.menu_click(ind) }} className="dskDotsMenu dskDotsCircle mblDotsMenuMedWikiCard tanar">
                        <span className="dskDotsMenu-dots"></span>
                        <span className="dskDotsMenu-dots"></span>
                        <span className="dskDotsMenu-dots"></span>
                      </div> : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="full_width mblSessionBttmArea">
            {
              (val.question == '' || val.question == null) ? null :
                <h3 className="colorBlack font_16px font400 dskArchiveCardTtl">{val.question}</h3>
            }
            <div className="clearfix"></div>
            <div className="full_width mblSessionDocArea">
              {(val.session_doctor_entities.length > 0) ?
                val.session_doctor_entities.map((val, ind) => (
                  <div className="full_width radius-6 mblSessionDocRow">
                    <div className="row align-items-center">
                      <div className="radius-100 mblSessionDocPic">
                        {(val.session_doctor_image != '' || val.session_doctor_image != null) ?
                          <img src={val.session_doctor_image} alt="Vault" className="object_fit_cover" /> :
                          <img src={medwikiicon} alt="Vault" className="object_fit_cover" />}
                      </div>
                      <div className="full_width mblSessionDocTtl">
                        <h4 className="colorBlack font_16px font500">{val.session_doctor_name}</h4>
                        <span className="font_12px colorGrey">{val.DepartmentName}</span>
                      </div>
                    </div>
                  </div>
                )) : null}
              {/* mblSessionDocRow */}
            </div>

            <div className="full_width mblSessionbtm">
              <div className="text-uppercase colorWhite font_14px fontExo font400 radius-6 mblSessionbtm_a" onClick={props.click}>
                <span>View <img src={angaleWhite} /></span>
              </div>
              <Slider {...dskSessionClient} className="dskSessionClient">
                {(val.sponsor_logo !== null || val.sponsor_logo == '') ?
                  val.sponsor_logo.split(',').map((val, ind) => (
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
    )
  }


  archivedVideoCardMobile(props) {
    let val = props.data;
    let ind = props.array_index;
    let deafult_popover_index = props.deafult_popover_index
    return (
      <div className="mblSessionCard mblArchiveCard mblRecentCard">
        <a href="javascript:void(0)" className="full_width radius-6 mblSessionCard_link">
          <div className="full_width mblSessionTopArea">
            {(val.image == '' || val.image == null) ?
              <img src={medwikiicon} className="object_fit_cover ssnTopBgGraphic" /> :
              <img src={val.image} className="object_fit_cover ssnTopBgGraphic" />
            }
            <div className="overlay" onClick={() => { this.redirectToArchiveDetail(val.type_id) }} style={{ "cursor": "pointer" }}></div>
            <img src={dskArchiveCardPlay} className="translate_both mblArchiveCardPlay" />
            <div className="full_width mblSessionTopIn">
              <div className="full_width mblSessionTop">
                <div className="row align-items-center justify-content-between">
                  {
                    (val.category_name == '' || val.category_name == null) ? null :
                      <div className="colorWhite font_14px font500 mblSessionType">
                        {(val.category_image == null || val.category_image == '') ?
                          null :
                          <span className="radius-100 mblSessionTypeIcon">
                            <img src={val.category_image} className="translate_both" />
                          </span>
                        }
                        {val.category_name}
                      </div>
                  }
                  <div className="mblSessionTopRight">
                    {(deafult_popover_index == ind) ? this.arcCardMenuPopoverMobile(val, ind) : null}
                    {(deafult_popover_index != ind) ?
                      <div onClick={() => {props.menu_click(ind)}} className="mblDotsMenu mblDotsCircle mblDotsMenuSssnCard tanar">
                        <span className="mblDotsMenu-dots"></span>
                        <span className="mblDotsMenu-dots"></span>
                        <span className="mblDotsMenu-dots"></span>
                      </div> : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="full_width mblSessionBttmArea">
            {
              (val.question == '' || val.question == null) ? null :
                <h3 className="colorBlack font_16px font400 mblArchiveCardTtl">{val.question}</h3>
            }
            <div className="clearfix"></div>
            <div className="full_width mblSessionDocArea">
              {(val.session_doctor_entities.length > 0) ?
                val.session_doctor_entities.map((val, ind) => (
                  <div className="full_width radius-6 mblSessionDocRow">
                    <div className="row align-items-center">
                      <div className="radius-100 mblSessionDocPic">
                        {(val.session_doctor_image != '' || val.session_doctor_image != null) ?
                          <img src={val.session_doctor_image} alt="Vault" className="object_fit_cover" /> :
                          <img src={medwikiicon} alt="Vault" className="object_fit_cover" />}
                      </div>
                      <div className="full_width mblSessionDocTtl">
                        <h4 className="colorBlack font_16px font500">{val.session_doctor_name}</h4>
                        <span className="font_12px colorGrey">{val.DepartmentName}</span>
                      </div>
                    </div>
                  </div> 
                )) : null}
              {/* mblSessionDocRow */}
            </div>

            <div className="full_width mblSessionbtm">
              <div className="text-uppercase colorWhite font_14px fontExo font400 radius-6 mblSessionbtm_a" onClick={props.click}>
                <span>View <img src={angaleWhite} /></span>
              </div>
              <Slider {...mblSessionClient} className="mblSessionClient">
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
        </a>
      </div>
    )
  }
  
  render() {
    return (
      <>
        {(isMobile)?
          this.archivedVideoCardMobile(this.props):
          this.archivedVideoCardDesktop(this.props)
        }
      </>
    );
  }
}

export default ArchivedVideoCard;
