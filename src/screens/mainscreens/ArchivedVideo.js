import React from 'react';
import Header from './Header';
import Footer from './Footer';  
import { InlineShareButtons } from 'sharethis-reactjs';
import Slider from "react-slick";

import likeBttn from '../../images/feedBttm_icon-1.png';
import vaultBttn from '../../images/feedBttm_icon-2.png';
import cmmntBttn from '../../images/feedBttm_icon-4.png';
import Form from 'react-bootstrap/Form';
import AppConfig from '../config/config.js';
import { reactLocalStorage } from 'reactjs-localstorage';
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player';
import {renderVideo} from '../Common/Common.js';
import Moment from 'react-moment';
import $ from 'jquery';
import mastercastlogo from '../../images/session_box_type-1.png';
import {setClientLogoRelated} from '../Common/Common.js';
import {getUtmSource} from '../Common/Common.js';
import {isMobile} from 'react-device-detect';
import * as utils from '../Hospital/utils/utils.js';
import Banner from '../mainscreens/Banner'; 
import ArcVideoSmallCard from '../Cards/ArcVideoSmallCard.js';
import ShareDetailPage from '../Common/ShareDetailPage.jsx'

import RelatedMedwikiLoader from '../LoadingPlaceholders/RelatedMedwikiLoader.jsx';
import SpqDetailsLoader from '../LoadingPlaceholders/SpqDetailsLoader.jsx';

const gtag = window.gtag;


const pageNames = "Live CME"

const url = AppConfig.apiLoc;
var disclaimer = '';
var video_detail_data = [];
var comment_list_arr = [];
var related_video_list = [];
var is_ready = false;
let isApiCallDoneDetail=false;
let isApiCallDoneRelated=false;
var type_id_c = '';
let selected_arc_popover_index = -1;

let VideoJson = {
  type_id: '',
  artist: "",
  cover: "",
  name: "",
  mainUrl: '',//"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  ad: []
}
let readyCounter = 0;

class ArchivedVideo extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      banner_display:false,
      type_id: this.props.match.params.id,
      archive_video_loader:true,
      display:false,
      rerender:false
    } 

     isApiCallDoneDetail=false;
 isApiCallDoneRelated=false;
    is_ready = false
    type_id_c = this.state.type_id

    readyCounter = 0;
     video_detail_data = [];
     comment_list_arr = [];
     related_video_list = [];
     selected_arc_popover_index = -1;
		this.handle_change_arc = this.handle_change_arc.bind(this);
    this.getVideoDetail(this.state.type_id);
    this.getCommentList(this.state.type_id)
    this.getRelatedVideo(this.state.type_id)
  }

  parseFeedResponseData(response) {
    if (response) { 
        let rData = response.data
        if (rData.con_type === "video") {
            VideoJson.type_id = rData.type_id;
            if (rData.question) {
                VideoJson.name = rData.question.substring(0, 30) + '...';
            } else {
                VideoJson.name = 'MedWiki Video';
            }
            VideoJson.artist = rData.client_name;
            console.log("cover" + rData.image)
            if (rData.image) {
                VideoJson.cover = rData.image
            } else {
                VideoJson.cover = "https://www.who.int/images/default-source/departments/epi-win/fitting-masks-video-thumbnail.tmb-549v.png?sfvrsn=2143ad14_2"
            }
            VideoJson.mainUrl = rData.src;
        }
    }
    readyCounter++;
}

  parseAdsResponseData(response) {
    if (response) {     
        let videoAdsArr = []
        let aData = response.data[0]
        if (aData) {
            videoAdsArr = aData.items
            if (videoAdsArr.length > 0) {
                videoAdsArr.map((item) => {
                    VideoJson.ad.push(item)
                });
            }
        }
    }
    readyCounter++;
    this.setState({ display: !this.state.display })
}


display_banner(datam)
{
  this.setState({"banner_display":true})
}

  componentDidMount(){
    window.document.title = "CLIRNET - Archived Video"
    gtag('config', AppConfig.gtag_measure_id, {
			'page_title': window.document.title,
			'page_location': window.location.href,
			'page_path': window.location.pathname
			});
    $(".ses_mobile").addClass("active");

    $('.li_session').attr('id', 'session_cal');
    
    
    window.scrollTo(0, 0); 

    isApiCallDoneDetail=false;
    isApiCallDoneRelated=false;

    selected_arc_popover_index = -1;
    video_detail_data = [];
    comment_list_arr = [];
    related_video_list = [];
    type_id_c = this.state.type_id;
    is_ready = false;

    let that = this;
		$(document).on("click", function (e) {
			let arc_extra = $(e.target).parents('.arc_extra_class').length;
			if (arc_extra == 0 && !$(e.target).hasClass('arc_extra_class')) {
				selected_arc_popover_index = -1;
				that.setState({ "display": false }); 
			}
		});




    // utils.getAds(this.state.type_id, 'video_archive').then(response => {
    //   this.parseAdsResponseData(response)
    // });
  }

  refresh = () => {
    this.setState({ "display": !this.state.display});
  }


   onLikeBtnPress = (item_id, type) => {
    let formdatam = { "type_id": item_id, "type": "video_archive" }
   fetch(url+'knwlg/save_like', { 
      method: 'POST',
      headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'
      },
      body: JSON.stringify(formdatam),
    })
      .then((response) => response.json())
      .then((responseJson) => {
       if(responseJson.status_code == 200){
        if (responseJson.data.like) {
          video_detail_data.rating = responseJson.data.rating
          video_detail_data.myrating = true
        } else {
          video_detail_data.rating = responseJson.data.rating
          video_detail_data.myrating = false
        } 
         this.refresh() 
       } 
      })
      .catch((error) => {
    });
  }

  
  getVideoDetail(id){ 
    let utm = getUtmSource();
    fetch(url+'knwlg/archiveVideoDetail?type_id='+id+'&utm_source='+utm, { 
      method: 'GET',
      headers: {
      'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
      'version': 'rjsw 1.1.1'
      }
      }).then((response) => response.json()).then((responseJson) => {   
        
     isApiCallDoneDetail=true;
     
      if(responseJson.status_code == 200){
        this.parseFeedResponseData(responseJson);
        let responseData = responseJson.data;
        video_detail_data = responseData
        is_ready = true 
      }else{
        alert("Something went wrong! Check Your Internet Connection")
      }
      this.refresh()
      }).catch((error) => {
        
     isApiCallDoneDetail=true;
     this.refresh()
          console.log("Error"+error);
      });
  }

  getRelatedVideo(id){ 
    fetch(url+'knwlg/archiveVideoList?type_id='+id+'&from=0&to=10', { 
      method: 'GET',
      headers: {
      'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
      'version': 'rjsw 1.1.1'
      }
      }).then((response) => response.json()).then((responseJson) => {   
        isApiCallDoneRelated = true;
      if(responseJson.status_code == 200){
        let responseData = responseJson.data;
        related_video_list = responseData 
      }else{
        alert("Something went wrong! Check Your Internet Connection")
      }
      this.setState({archive_video_loader:false})
      // this.refresh()
      }).catch((error) => {
        isApiCallDoneRelated = true;
        this.setState({archive_video_loader:false})
          console.log("Error"+error);
      });
  }

  onvaultPress = (item_id) => {
    var thisobjval = this; 
    let formdatam = { "postid": item_id, "type": 'video_archive' }
   fetch(url+'knwlg/vault_switching', {
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
          video_detail_data.vault = responseJson.data
          reactLocalStorage.set('@ClirnetStore:vault_count', (parseInt(reactLocalStorage.get('@ClirnetStore:vault_count', true)) + 1));
        }
      else {
          video_detail_data.vault = responseJson.data
          reactLocalStorage.set('@ClirnetStore:vault_count', (parseInt(reactLocalStorage.get('@ClirnetStore:vault_count', true)) - 1));
        }
        this.refresh(); 
      })
      .catch((error) => {
      });
  }

  setClientLogo(clientLogo,sponsorLogo){
    let dskSessionClient = {
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

    let mblSessionClient = {
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

if(isMobile==true)
{
  if(sponsorLogo == ''|| sponsorLogo == null || sponsorLogo === 'null' || sponsorLogo === ''){
    return (
      <>
          {/* <a href="javascript:void(0);" className="feedRow_sponsors">
              <span className="font_10px font500 colorBlack">Powered by</span>
              <img src={clientLogo} width="224" height="63" alt="logo"  />
          </a> */}
      </>
      )
}else{
    return (
      <>
          {/* <Slider {...dskSessionClient} className="dskSessionClient">
            {(sponsorLogo !== null || sponsorLogo == '') ?
              sponsorLogo.split(',').map((val, ind) => (
                <div className="dskSessionClientItem">
                  <img src={val} />
                </div>
              )) : null
            }
          </Slider> */}



          <Slider {...mblSessionClient} className="mblSessionClient">
                {(sponsorLogo !== null || sponsorLogo == '') ?
                  sponsorLogo.split(',').map((val, ind) => (
                    <div className="mblSessionClientItem">
                      <img src={val} />
                    </div>
                  )) : null
                }
              </Slider>
      </>
      )
}
}
else
{
    if(sponsorLogo == ''|| sponsorLogo == null || sponsorLogo === 'null' || sponsorLogo === ''){
        return (
          <>
              {/* <a href="javascript:void(0);" className="feedRow_sponsors">
                  <span className="font_10px font500 colorBlack">Powered by</span>
                  <img src={clientLogo} width="224" height="63" alt="logo"  />
              </a> */}
          </>
          )
    }else{
        return (
          <>
              <Slider {...dskSessionClient} className="dskSessionClient">
                {(sponsorLogo !== null || sponsorLogo == '') ?
                  sponsorLogo.split(',').map((val, ind) => (
                    <div className="dskSessionClientItem">
                      <img src={val} />
                    </div>
                  )) : null
                }
              </Slider>
          </>
          )
    }
  }
}

getCommentList(id){
  fetch(url+'knwlg/nested_comment?type_id='+id+'&type=video_archive', { 
    method: 'GET',
    headers: {
    'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
    'version': 'rjsw 1.1.1'
    }
    }).then((response) => response.json()).then((responseJson) => {   
    if(responseJson.status_code == 200){
      let responseData =  JSON.parse(responseJson.data);
      console.log("comment"+responseData)
      responseData.map(r => { 
        comment_list_arr.push(r);
      })

      this.refresh();
    }
    }).catch((error) => {
        console.log("Error"+error);
    });
}

submitreply(type_id, type, index, parent_comment) {
  let commentsub = $(".reply_text_" + index + "").val();

  if (commentsub != "") {
    let thisobj = this;
    let parser = {
      type_id: type_id,
      type: type,
      parent_id: parent_comment,
      comment: commentsub
    }
   fetch(url+'knwlg/nested_save_comment', {
      method: 'POST',
      headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'
      },
      body: JSON.stringify(parser),
      })
      .then((response) => response.json()) 
      .then((responseJson) => {
        if (responseJson.status_code == '200') {
          $(".reply_text_" + index + "").val("");
          comment_list_arr = []
          this.getCommentList(this.state.type_id)
        }
        else {
        }
      })
      .catch((error) => {
      });
  }
}

commentList(comment_list){        
  console.log("comment list"+comment_list) 
  return (
    <div>
      <div className="full_width feedcommentsArea">
        {comment_list.length > 0 ?
        <>
        {comment_list.map((r, index) => ( 
          <div className="full_width feedcommentsRow">
          <div className="radius-100 feedcommentsPic">
            <img className="object_fit_cover" src={r.images} />
          </div>
          <h5 className="font_16px font600 colorBlack feedcommentsBy">Dr. {r.last_name}</h5> 
          <p>{r.body}</p>
          {/* <h6 className="font_14px font600 feedcommentsByBtm"><span><Moment format="MMMM Do YYYY">{r.created_at}</Moment></span></h6> */}
          <h6 className="font_14px font600 feedcommentsByBtm"><span><Moment format="MMMM Do YYYY">{r.created_at}</Moment></span> <a href="javascript:void(0)" onClick={() => { this.opensub(index); }} className="colorBlack append_divv">{(r.children.length > 0) ? <span>{r.children.length}</span> : null} Reply</a></h6>
          <div className={"hh_" + index + " " + "off"} style={{ "display": "none" }}>
            {r.children.map((rchild, index) => (
              <div className="full_width feedcommentsRowReply">
                <div className="full_width feedcommentsRow">
                  <div className="radius-100 feedcommentsPic">
                    <img className="object_fit_cover" src={rchild.images} /> 
                  </div>
                  <h5 className="font_16px font600 colorBlack feedcommentsBy">Dr. {rchild.last_name}</h5>
                  <p>{rchild.body}</p>
                  <h6 className="font_14px font600 feedcommentsByBtm"><span><Moment format="MMMM Do YYYY">{rchild.created_at}</Moment></span></h6>
                </div>
              </div>
            ))}
            <div className="full_width feedDtls_comment_frm" >
              <Form.Control className={'font_14px' + 'font500 radius-6 feedfooterComment reply_text_' + index} type="text" placeholder="Write a reply here" />
              <Form.Control type="submit" value="Submit" onClick={() => this.submitreply(r.type_id, r.type, index, r.commentId)} className="bgColorGreen colorWhite font600 feedDtls_commentSubmit" />
            </div>
          </div>
        </div>
        ))}
        </>:null} 
      </div>  
      <div className="full_width feedDtls_comment">
          <div className="full_width feedDtls_comment_frm">
            <Form.Control className="font_14px font500 radius-6 feedfooterComment main_comment" type="text" placeholder="Write a comment here" />
            <Form.Control type="submit" value="Submit" onClick={() => this.submitcomment(type_id_c, "video_archive")}  className="bgColorGreen colorWhite font600 feedDtls_commentSubmit" />
          </div>
        </div> 
    </div> 
  )
}

submitcomment(type_id, type) { 
  let commentsub = $(".main_comment").val();
  if (commentsub != "") {
    let thisobj = this;
    let parser = {
      type_id: type_id,
      type: type,
      parent_id: 0,
      comment: commentsub
    }
   fetch(url+'knwlg/nested_save_comment', {
      method: 'POST',
      headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'
      },
      body: JSON.stringify(parser),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status_code == '200') { 
          $(".main_comment").val("");
          comment_list_arr = []
          this.getCommentList(this.state.type_id)
        }
        else {
        }
      })
      .catch((error) => {
      });
  }
}

opensub(data) {
  $(".off").css("display", "none");
  $(".hh_" + data + "").css("display", "block");
}


redirectToArchivedVideo(id){
  this.props.history.push ({ 
    pathname: '/ArchivedVideoRelated/'+id  
}) 
}

getRelatedVideoList(id){  
  fetch(url+'knwlg/archiveVideoList?type_id='+id, {  
    method: 'GET',
    headers: { 
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'
        }
        }).then((response) => response.json()).then((responseJson) => {  
        let status_code = responseJson.status_code;
        if(status_code == 200){
            let responseData = responseJson.data;
            related_video_list = responseData;
            this.setState({'archived_video_loader':false})
        }  
        }).catch((error) => {
            console.log("Error"+error);
        });
}

handle_change_arc(index, value, type) {
  if (type == 'vault') { 
    related_video_list[index].vault = value;
    this.setState({ "rerender": !this.state.rerender });
  }
  if (type == 'like') {

    if (value != true) {
      related_video_list[index].myrating = false;
      related_video_list[index].rating = parseInt(related_video_list[index].rating) - 1;
    }
    else {
      related_video_list[index].myrating = true;
      related_video_list[index].rating = parseInt(related_video_list[index].rating) + parseInt(value);
    }
    this.setState({ "rerender": !this.state.rerender });
  }
  if (type == 'popover') {
    selected_arc_popover_index = index;
    this.setState({ "rerender": !this.state.rerender }); 
  }
}

// renderRelatedArchivedVideo(video_list,loader){
//   return( 
//     <div className="feed_right_2">
//        {(this.state.banner_display)?
//        <>{(isMobile)?null: <Banner type_id={this.state.type_id} banner_position={3} unmount_call={0} type={"video_archive"}  api_call={1} before_unload_call={0}/>}</>
//        :null}
//       <div class="full_width radius-6 text-left specialty_comp_right">
//         <h2 class="bgColorBlue font600 colorWhite font600 font_20px specialtyTtl">Related Recorded Sessions</h2>
//           <div class="full_width font600 specialty_comp_right_text">         
//             <div className="full_width relatedRow withImg">
//               {(video_list.length > 0)?
//               <>
//               {video_list.map((r, index) => (
//               // <a href="javascript:void(0)" onClick={() => {this.redirectToArchivedVideo(r.type_id)}}>
//               //   <div className="full_width font_12px relatedRowTop"><span className="colorBlack font600">{r.specialities.replace(/,/g, ", ")}</span> <span className="float-right colorGrey">{r.date}</span></div>
//               //     <div className="full_width relatedRowIn">      
//               //       <div className="radius-6 relatedRowPic">
//               //         {(r.image == "" || r.image == null)?
//               //         <img className="object_fit_cover" src={mastercastlogo} />:
//               //         <img className="object_fit_cover" src={r.image} />
//               //         }
//               //           <div className="overlay"></div>
//               //             <img src={playIcon} className="translate_both" />
//               //           </div>
//               //           <h2 className="font500 transition6s font_12px colorBlack relatedRowTtl"  > {r.question.substring(0, 100)}...</h2>
//               //           <div className="full_width">
//               //             {setClientLogoRelated(r.client_logo,r.sponsor_logo)} 
//               //           </div>
//               //         </div>
//               //       </a>
//               <>
//               <ArcVideoSmallCard onChangeButton={this.handle_change_arc} history={this.props.history} mobile_device={isMobile}  card_data={r} clicked_index={selected_arc_popover_index} elem_key={index} custom_class="dskTrendingMedwikiCard feeddetail_related" />
//               </>
//                     ))} 
//                     </>:
//                     <>
//                       {(loader == true || loader == 'true')?
//                       <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={40} width={40} visible={true} />:
//                         <div className="full_width text-center alert alert-danger">
//                             <strong>No Archived Video Found </strong>
//                         </div>
//                       }
//                     </>}
//                   </div>
//                 </div>
//               <div class="clearfix"></div>
//             </div>
//             {(this.state.banner_display)?<Banner type_id={this.state.type_id} banner_position={4} unmount_call={0} type={"video_archive"}  api_call={1} before_unload_call={0}/>:null}

//           </div> 
//   )
// }

renderRelatedArchivedVideo(video_list,loader){
  return( 
    <div className="feed_right_2">
      {(this.state.banner_display)?
       <>{(isMobile)?null: <Banner type_id={this.state.type_id} banner_position={3} unmount_call={0} type={"video_archive"}  api_call={1} before_unload_call={0}/>}</>
       :null} 
      {video_list.length > 0?<div class="full_width radius-6 text-left specialty_comp_right">
        <h2 class="bgColorBlue font600 colorWhite font600 font_20px specialtyTtl">Related Recorded Sessions</h2>
          <div class="full_width font600 specialty_comp_right_text">         
            <div className="full_width relatedRow withImg">
              {(video_list.length > 0)?
              <>
              {video_list.map((r, index) => (
                <ArcVideoSmallCard onChangeButton={this.handle_change_arc} history={this.props.history} mobile_device={isMobile}  card_data={r} clicked_index={selected_arc_popover_index} elem_key={index} custom_class="dskTrendingMedwikiCard feeddetail_related" />
                    ))} 
                    </>:
                    <>
                      {(loader == true || loader == 'true')?
                      <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={40} width={40} visible={true} />:
                        <div className="full_width text-center alert alert-danger">
                            <strong>No Archived Video Found </strong> 
                        </div>
                      }
                    </>}
                  </div>
                </div>
              <div class="clearfix"></div>
        </div>:!isApiCallDoneRelated?<div class="full_width radius-6 text-left specialty_comp_right">
          <RelatedMedwikiLoader/>
          <RelatedMedwikiLoader/> 
          <RelatedMedwikiLoader/>
          <RelatedMedwikiLoader/>
          <RelatedMedwikiLoader/>
          </div>:null} 
            {(this.state.banner_display)?<Banner type_id={this.state.type_id} banner_position={4} unmount_call={0} type={"video_archive"}  api_call={1} before_unload_call={0}/>:null}
          </div> 
  )
}
  render() {
    return (
      <div className={ isMobile == true ? 'full_width wrap_body mblScreen' : 'full_width wrap_body dskScreen'}>
        <Header history={this.props.history} page_name={pageNames}/> 
              <section className="full_width body_area seeeionPage videoArchive">
            <div className="container">
            <div className="row">
             <Banner type_id={this.state.type_id} type={"video_archive"}  apiresponserecieved={this.display_banner.bind(this)} api_call_detail={1} api_call={0}/> 
             {this.state.banner_display ?  <Banner type_id={this.state.type_id} banner_position={1} unmount_call={1} type={"video_archive"}  api_call={1} before_unload_call={1}/>:null}
              <section className="full_width my_session"> 
              <div className="clearfix"></div>
              {isApiCallDoneDetail?
              <div className="medWikiLeft">
              {(is_ready == 'true' || is_ready == true)?
                <>
                <div className="full_width radius-6 videoArchiveLeftIn">
                             {renderVideo(video_detail_data.con_type,video_detail_data.vendor,video_detail_data.src)}
                              <div className="full_width videoArchiveLeftT-1">
                              <div className="row justify-content-between align-items-center">
                                <div>
                                {(video_detail_data.specialities == '' || video_detail_data.specialities == null)?
                                null:
                                <span class="font_14px radius-6 font600 colorBlue feedRow_speciality">{video_detail_data.specialities.replace(/,/g, ", ")}</span>
                                }
                                {/* {(video_detail_data.date == '' || video_detail_data.date == null)?null:
                                  <span class="font_14px font600 colorBlack feedRow_date ssnDtl_dateDesk">{video_detail_data.date}</span>
                                } */}
                                </div>
                                {this.setClientLogo(video_detail_data.client_logo,video_detail_data.sponsor_logo)}
                                </div>
                                </div>

                                <div className="full_width videoArchiveLeftT-2">
                                  <h3 class="highlightyellow1 font_18px colorBlack font600">{video_detail_data.question}</h3>
                                </div>

                                <div className="full_width videoArchiveLeftT-3">
                              <div className="row  justify-content-between align-items-center">
                              
                                  <div className="feed_footer">
                              <div className="row d-flex align-items-center">
                              {(video_detail_data.myrating == true) ? 
                                <a className="feedFter_left active" onClick={() => this.onLikeBtnPress(video_detail_data.type_id, video_detail_data.type)} href="javascript:void(0);"><img src={likeBttn} /><span>{video_detail_data.rating}</span></a> :
                                <a className="feedFter_left" onClick={() => this.onLikeBtnPress(video_detail_data.type_id, video_detail_data.type)} href="javascript:void(0);"><img src={likeBttn} /><span>{video_detail_data.rating}</span></a>
                              } 
                                {(video_detail_data.vault == 0) ?
                                <a className="feedFter_left" onClick={() => this.onvaultPress(video_detail_data.type_id)} href="javascript:void(0);"><img src={vaultBttn} /></a> :
                                <a className="feedFter_left active" onClick={() => this.onvaultPress(video_detail_data.type_id)} href="javascript:void(0);"><img src={vaultBttn} /></a>}
                                  <ShareDetailPage
                                  data={{
                                    title: video_detail_data.question,
                                    text: video_detail_data.answer,
                                    url: video_detail_data.deeplink,
                                  }}
                                />
                                {/* <a className="feedFter_left" href="javascript:void(0);"><img src={shareBttn}/></a> */}
                                {
                                  (video_detail_data.comment_count == null || video_detail_data.comment_count == '' || video_detail_data.comment_count == 'null')?
                                  <a className="feedFter_left" href="javascript:void(0);" ><img src={cmmntBttn}   style={{"cursor": "default"}}/><span>0</span></a>:
                                  <a className="feedFter_left" href="javascript:void(0);"><img src={cmmntBttn}  style={{"cursor": "default"}}/><span>{video_detail_data.comment_count}</span></a>
                                }
                              </div> 
                            </div>
                            
                              
                                </div>

                                {/* {this.setClientLogo(video_detail_data.client_logo,video_detail_data.sponsor_logo)} */}

                                {/* <a href="javascript:void(0);" className="feedRow_sponsors">
      <span className="font_10px font500 colorBlack">Powered by</span>
      <img src="https://developer.clirnet.com/knowledge/uploads/logo/200-1.png" width="224" height="63" alt="logo"  />
      </a> */}
                                </div>
  
                              {this.commentList (comment_list_arr)}
                            </div> 
                            </>:
                             <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={80} width={80} visible={true} />}
                             
                  </div> :<SpqDetailsLoader/>}
                  {/* ////////////////////////////////////// */}
                  
                  {this.renderRelatedArchivedVideo(related_video_list,this.state.archive_video_loader)}
                  {/* ////////////////////////////////////// */}
                  </section>
            </div> 
            </div> 
          </section> 
          <Footer  history={this.props.history}/>   
        <div>   
      </div>
    </div>
    );} 
}
export default ArchivedVideo;
