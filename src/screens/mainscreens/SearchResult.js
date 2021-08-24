import React from 'react';
import $ from 'jquery';
import 'firebase/storage'
import Loader from 'react-loader-spinner'
import { reactLocalStorage } from 'reactjs-localstorage';
import { InlineShareButtons } from 'sharethis-reactjs';
import AppConfig from '../config/config.js';
import Header from './Header';
import Footer from './Footer';
import Banner from './Banner';
import ReactFlowPlayer from "react-flow-player";
import ReactPlayer from 'react-player';
import { isMobile } from 'react-device-detect';

import Modal from 'react-bootstrap/Modal'
import vaultBttn from '../../images/feedBttm_icon-2.png';
import likeBttn from '../../images/feedBttm_icon-1.png';
import cmmntBttn from '../../images/feedBttm_icon-4.png';
import calenderIcon from '../../images/cal-black.png';
import videoIcon from '../../images/playBTn.png';
import masterconsultlogo from '../../images/session_box_type-3.png';
import mastercirclelogo from '../../images/session_box_type-2.png';
import mastercastlogo from '../../images/session_box_type-1.png';
import Form from 'react-bootstrap/Form';
import Masonry from 'react-masonry-component';
import { Helmet } from "react-helmet";
import Medwikicard from '../Cards/Medwikicard';
import Sessioncard from '../Cards/Sessioncard';
import FeedListLoader from '../LoadingPlaceholders/FeedListLoader.jsx';

const gtag = window.gtag;

var selected_session_popover_index = -1;
const pageNames = "Search"

const masonryOptions = {
  transitionDuration: 0
};
var selected_medwiki_popover_index = -1;

const imagesLoadedOptions = { background: '.my-bg-image-el' }
const url = AppConfig.apiLoc;
const app_url = AppConfig.app_url;
var pagination_val = 0;
var search_result_session = [];
var search_result_comp = [];
var search_result_user = [];
var selected_spec = [];
var compendium_pagination_limit = 0;
var speciality = [];
var prev_compendium = [];
var parse_id = "";
var sub_speciality = [];
var cur_sel_spec = 0
var sub_sub_speciality = []
var cur_sel_subspec = 0
var select_key = 0;
var is_mobile = false;
var thisobj1 = this;
var api_call_pemission = 1;
class SearchResult extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      phone_no: '',
      err_msg: "",
      otp: "",
      search_result_comp: [],
      session_listing_reserved: [],
      session_listing_cme: [],
      viewrefresh: false,
      is_loader: false,
      is_loader_val: false,
      other_on: 0,
      search_text: "",
      search_result_session: [],
      search_result_comp: [],
      search_result_user: [],
      is_searched: false,
      showPopup: false,
      showModal: false,
      rerender: false,
      speciality: [],
      sub_speciality: [],
      sub_sub_speciality: [],
      change_flag: false,
      is_more_spec: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onScroll = this.onScroll.bind(this);
    console.log("constructor" + this.state.search_text);
    this._handleKeyDownsearch = this._handleKeyDownsearch.bind(this);
    reactLocalStorage.set('@ClirnetStore:source', '');

    this.handle_change = this.handle_change.bind(this);

  }

  redirect_to_session_booking(id) {
    this.props.history.push({
      pathname: '/Reservesession/' + id + ''
    })
  }



  handle_change(index, value, type) {
    if (type == 'vault') {

      search_result_comp[index].vault = value;



      this.setState({ "search_result_comp": search_result_comp })
    }


    if (type == 'like') {

      if (value == 0) {
        search_result_comp[index].myrating = false;
        search_result_comp[index].rating = parseInt(search_result_comp[index].rating) - 1;
      }
      else {
        search_result_comp[index].myrating = true;
        search_result_comp[index].rating = parseInt(search_result_comp[index].rating) + parseInt(value);
      }

      this.setState({ "search_result_comp": search_result_comp })



    }

    if (type == 'popover') {


      selected_medwiki_popover_index = index;
      this.setState({ "rerender": !this.state.rerender });



    }

    if (type == 'popover_session') {


      selected_session_popover_index = index;
      this.setState({ "rerender": !this.state.rerender });



    }

  }

  //Select Deselect speciality from Filter
  selectspec(id) {

    if (selected_spec.indexOf(id) != -1) {
      var index = selected_spec.indexOf(id);
      selected_spec.splice(index, 1);

      $("." + id + "id").each(function (index) {

        var index1 = selected_spec.indexOf($(this).val());
        selected_spec.splice(index1, 1);

      });
    }

    else {
      selected_spec.push(id);

      $("." + id + "id").each(function (index) {

        selected_spec.push($(this).val())

      });
    }








    this.setState({ "change_flag": !this.state.change_flag })

    parse_id = selected_spec.join();
    compendium_pagination_limit = 0;
    prev_compendium = [];
    if (parse_id != "") {
      fetch(url + 'knwlg/feed?from=' + compendium_pagination_limit + '&to=10&spIds=' + parse_id + '', {
        method: 'GET',
        headers: {

          'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
          'version': 'rjsw 1.1.1'

        }
      }).then((response) => response.json()).then((responseJson) => {


        responseJson.data.map(r => {

          prev_compendium.push(r);
        })

        this.setState({ "compendium_listing_upcoming": prev_compendium })



        compendium_pagination_limit = compendium_pagination_limit + 10;
        this.setState({ "is_loader": false });
      }).catch((error) => {

      });
    }

    else {
      fetch(url + 'knwlg/feed?from=' + compendium_pagination_limit + '&to=10', {
        method: 'GET',
        headers: {

          'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
          'version': 'rjsw 1.1.1'

        }
      }).then((response) => response.json()).then((responseJson) => {


        responseJson.data.map(r => {

          prev_compendium.push(r);
        })

        this.setState({ "compendium_listing_upcoming": prev_compendium })



        compendium_pagination_limit = compendium_pagination_limit + 10;
        this.setState({ "is_loader": false });
      }).catch((error) => {

      });
    }


  }



  //Get Sub speciality Of articular speciality
  getsubspec(id, spacecal) {


    var that = this;
    fetch(url + 'authnew/getSpecialityNamesByParentID?pid=' + id + '', {
      method: 'GET',
      headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'


      }
    }).then((response) => response.json()).then((responseJson) => {

      var onj = this;
      var html = "";
      responseJson.data.speciality_data.map(r => {



        html = html + '<div  id="param_' + r.id + '" class="lispec_' + r.id + ' canremove space' + spacecal + '"><div class="form-check cmnCheckBox_row"><input onClick="(this)=>this.selectspec_nested(' + r.id + ')" class="form-check-input" type="checkbox" ><label class="form-check-label">' + r.name + '</label></div></div>'

      })

      $(".canremove").remove();

      $(html).insertAfter(".lispec_" + id + "");

      $(".canremove").addClass("phrame");



    }).catch((error) => {

    });
  }


  get_sub_spec(id, step) {
    this.setState({ "is_more_spec": true });

    sub_speciality = [];
    var spacecal = 1;

    var that = this;
    fetch(url + 'authnew/getSpecialityNamesByParentID?pid=' + id + '', {
      method: 'GET',
      headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'


      }
    }).then((response) => response.json()).then((responseJson) => {


      responseJson.data.speciality_data.map(r => {


        sub_speciality.push(r);
      })

      cur_sel_spec = id;
      that.setState({ "sub_speciality": sub_speciality })

      $("." + id + "id").each(function (index) {

        if (selected_spec.indexOf(id) != -1) {

          selected_spec.push($(this).val())
        }

      });


      this.setState({ "is_more_spec": false });


    }).catch((error) => {

    });
  }



  //Set 2 nd lebel sub speciality
  get_sub_sub_spec(id, step) {
    this.setState({ "is_more_spec": true });

    sub_sub_speciality = [];

    var that = this;
    fetch(url + 'authnew/getSpecialityNamesByParentID?pid=' + id + '', {
      method: 'GET',
      headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'


      }
    }).then((response) => response.json()).then((responseJson) => {


      responseJson.data.speciality_data.map(r => {


        sub_sub_speciality.push(r);
      })


      cur_sel_subspec = id;
      that.setState({ "sub_sub_speciality": sub_sub_speciality })
      $("." + id + "id").each(function (index) {

        if (selected_spec.indexOf(id) != -1) {

          selected_spec.push($(this).val())
        }

      });


      this.setState({ "is_more_spec": false });


    }).catch((error) => {

    });
  }

  //on scroll mobile load more data
  onScroll() {
    var tempobj = this;

    if (tempobj.state.search_text != "" && tempobj.state.is_searched == true) {
      if (api_call_pemission == 1) {
        api_call_pemission=0;
      tempobj.get_more_result()
      }
    }
  }
  componentDidMount() {

    api_call_pemission=1;
    window.document.title = "CLIRNET - Search"
    gtag('config', AppConfig.gtag_measure_id, {
			'page_title': window.document.title,
			'page_location': window.location.href,
			'page_path': window.location.pathname
			});
    var that12 = this;
    $(document).on("click", function (e) {
      //popover dissapear func

      let ggg = $(e.target).parents('.tanar').length;

      if (ggg == 0 && !$(e.target).hasClass('tanar')) {
        selected_medwiki_popover_index = -1;
        that12.setState({ "is_loader_val": true });
      }

      let sessgg = $(e.target).parents('.manar').length;

      if (sessgg == 0 && !$(e.target).hasClass('manar')) {
        selected_session_popover_index = -1;
        that12.setState({ "is_loader_val": true });
      }


    });



    var thisobj1 = this

    pagination_val = 0;
    window.scrollTo(0, 0);
    $(document.body).on('touchmove', this.onScroll);
    search_result_comp = [];
    search_result_session = [];
    search_result_user = [];

    //login check




    var tempobj = this
    //load more result for desktop
    $(window).scroll(function () {
      console.log("jjjjjjjj"+api_call_pemission);
      
     
      if (api_call_pemission == 1) {

        console.log("jjjjdddddjjjj"+api_call_pemission);

        api_call_pemission = 0;


        if (tempobj.state.search_text != "" && tempobj.state.is_searched == true) {
          tempobj.get_more_result()
        }

      }
    });






    //first level speciality
    fetch(url + 'authnew/getallspeciality', {
      method: 'GET',
      headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'


      }
    }).then((response) => response.json()).then((responseJson) => {

      responseJson.data.speciality_data.map(r => {

        speciality.push(r);
      })

      this.setState({ "speciality": speciality })


    }).catch((error) => {

    });



    $('.tRright_popClose').on('click', function () {
      $('body').removeClass('right_PopShowBody');
    });
    $('.tRright_popShow').on('click', function () {
      $('body').addClass('right_PopShowBody');
    });










    var thisobjval = this;

    //check opened in mobile or not
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    var element = document.getElementById('text');
    if (isMobile) {

      is_mobile = true;
      thisobjval.setState({ "viewrefresh": !this.state.viewrefresh });

    } else {
      is_mobile = false;
      thisobjval.setState({ "viewrefresh": !this.state.viewrefresh });

    }

  }

  componentWillUnmount() {
    api_call_pemission=1;
    $('html, body').css({
      overflow: 'auto',
      height: 'auto'
    });
    selected_medwiki_popover_index = -1;
    selected_session_popover_index = -1
    $(window).unbind('scroll');
    $('body').removeClass('right_PopShowBody');
    selected_spec = [];
  }


  //function for pagination
  get_more_result() {


    console.log("more result" + this.state.search_text);
    if (this.state.search_text != "") {
      pagination_val = pagination_val + 25;
      this.setState({ "is_loader": true })
      fetch(url + 'search/data?from=' + pagination_val + '&to=25&type=&val=' + this.state.search_text + '&specialities=' + selected_spec.join() + '', {
        method: 'GET',
        headers: {

          'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
          'version': 'rjsw 1.1.1'

        }
      }).then((response) => response.json()).then((responseJson) => {


        this.setState({ "is_searched": true });

        responseJson.data.map(r => {
          search_result_comp.push(r);


        })

        this.setState({ "search_result_comp": search_result_comp })

        this.setState({ "search_result_session": search_result_session, "is_loader": false })

        setTimeout(function () {

          api_call_pemission = 1;
        }, 300);

      }).catch((error) => {
        this.setState({ "is_loader": false })
      });

    }

    else {
      this.setState({ "is_loader": true })
      fetch(url + 'search/data?from=' + pagination_val + '&to=25&type=&val=&specialities=100', {
        method: 'GET',
        headers: {

          'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
          'version': 'rjsw 1.1.1'

        }
      }).then((response) => response.json()).then((responseJson) => {


        this.setState({ "is_searched": true });

        responseJson.data.map(r => {

          search_result_comp.push(r);






        })

        this.setState({ "search_result_comp": search_result_comp });
        setTimeout(function () {

          api_call_pemission = 1;
        }, 300);

        this.setState({ "search_result_session": search_result_session, "is_loader": false })

      }).catch((error) => {
        this.setState({ "is_loader": false })
      });
    }

  }
  //get first reults
  get_search_result() {
    search_result_comp = [];
    search_result_session = [];
    search_result_user = [];
    pagination_val = 0;
    this.setState({ "search_result_comp": [] });

    this.setState({ "search_result_user": [] })

    this.setState({ "search_result_session": [], "is_loader": true })

    if (this.state.search_text != "") {



      this.setState({ "is_loader": true })
      fetch(url + 'search/data?from=' + pagination_val + '&to=25&type=&val=' + this.state.search_text + '&specialities=' + selected_spec.join() + '', {
        method: 'GET',
        headers: {

          'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
          'version': 'rjsw 1.1.1'

        }
      }).then((response) => response.json()).then((responseJson) => {


        this.setState({ "is_searched": true });

        responseJson.data.map(r => {
          search_result_comp.push(r);


        })

        this.setState({ "search_result_comp": search_result_comp });
        setTimeout(function () {

          api_call_pemission = 1;
        }, 300);
        //console.log(this.state.search_result_comp)

        this.setState({ "search_result_session": search_result_session, "is_loader": false })

      }).catch((error) => {
        this.setState({ "is_loader": false })
      });

    }

    else {


      this.setState({ "is_loader": true })
      fetch(url + 'search/data?from=' + pagination_val + '&to=25&type=&val=&specialities=' + selected_spec.join() + '', {
        method: 'GET',
        headers: {

          'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
          'version': 'rjsw 1.1.1'

        }
      }).then((response) => response.json()).then((responseJson) => {


        if (responseJson.status_code == "401") {
          this.props.history.push({
            pathname: `/`
          })
        }

        this.setState({ "is_searched": true });

        responseJson.data.map(r => {
          search_result_comp.push(r);


        })

        this.setState({ "search_result_comp": search_result_comp });
        setTimeout(function () {

          api_call_pemission = 1;
        }, 300);


        this.setState({ "search_result_session": search_result_session, "is_loader": false })

      }).catch((error) => {
        this.setState({ "is_loader": false })
      });

    }
  }
  //set search text
  handleChange(e) {

    this.setState({ "search_text": e.target.value })
  }



  //like
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
        if (responseJson.data.rating == 0) {
          search_result_comp[array_index].myrating = false;
          search_result_comp[array_index].rating = parseInt(search_result_comp[array_index].rating) - 1;
        }
        else {
          search_result_comp[array_index].myrating = true;
          search_result_comp[array_index].rating = parseInt(search_result_comp[array_index].rating) + parseInt(responseJson.data.rating);
        }

        this.setState({ "search_result_comp": search_result_comp })
      })
      .catch((error) => {

      });



  }

  //vaulu remove from vault
  onvaultPress = (item_id, type, array_index, flag) => {
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
        search_result_comp[array_index].vault = responseJson.data;
        if (flag == 0) {
          reactLocalStorage.set('@ClirnetStore:vault_count', (parseInt(reactLocalStorage.get('@ClirnetStore:vault_count', true)) + 1));

        }

        if (flag == 1) {
          reactLocalStorage.set('@ClirnetStore:vault_count', (parseInt(reactLocalStorage.get('@ClirnetStore:vault_count', true)) - 1));
        }

        this.setState({ "search_result_comp": search_result_comp })








      })
      .catch((error) => {

      });



  }

  //redirect to feed detail
  redirect_to_compendium_detail(id) {
    reactLocalStorage.set('@ClirnetStore:source', 'Search result page');
    this.props.history.push({
      pathname: '/Feeddetail/' + id + ''
    })
  }
  //get sub speciality
  getsubspec(id, spacecal) {

    var that = this;
    fetch(url + 'authnew/getSpecialityNamesByParentID?pid=' + id + '', {
      method: 'GET',
      headers: {
        'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
        'version': 'rjsw 1.1.1'


      }
    }).then((response) => response.json()).then((responseJson) => {


      var html = "";
      responseJson.data.speciality_data.map(r => {

        html = html + '<li id="3_' + r.id + '" className="lispec_' + r.id + ' canremove space' + spacecal + '"><a   href="javascript:void(0);">' + r.name + '</a></li>'
      })
      $(".canremove").remove();
      $(html).insertAfter(".lispec_" + id + "");




    }).catch((error) => {

    });
  }

  //enter press search
  _handleKeyDownsearch(e) {

    if (e.key === 'Enter') {

      this.setState({ "is_loader": true });
      this.get_search_result()
    }
  }




  render() {
    var that = this;
    return (

      <div className={isMobile == true ? 'full_width wrap_body mblScreen' : 'full_width wrap_body dskScreen'}>
        <Header history={this.props.history} page_name={pageNames} />
        <section className="full_width body_area">
          <div className="container">
            <div className="row">
              <Banner />
              <section className="full_width searchResult" onKeyDown={this._handleKeyDownsearch}>
                <div className="full_width text-left searchResultSearch">
                  <label className="font_16px colorBlack font700">Search with</label>
                  <div className="searchFrmRow full_width">
                    <Form.Control onChange={this.handleChange} className="font_14px font500 radius-6 searchResultInput" type="text" placeholder="Type Here To Search" />
                    <button className="cmnBtn font_16px tRright_popShow searchFrmRowSpecialty">Specialty Selected ({selected_spec.length}) <span className="float-right">+</span></button>
                    <button className="cmnBtn font_18px btnBlue" onClick={() => { this.get_search_result(); }}>Search</button>
                  </div>
                </div>
                {(this.state.is_loader == true && this.state.search_result_comp.length==0) ?
                  <div className="full_width">
                    <div className="medWikiLeft">
                    <Masonry
                          className={'dskMasonryCardArea'} // default ''
                          elementType={'ul'} // default 'div'
                          options={masonryOptions} // default {}
                          disableImagesLoaded={false} // default false
                          updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                          imagesLoadedOptions={imagesLoadedOptions} // default {}
                        >
<FeedListLoader/>
<FeedListLoader/>
<FeedListLoader/>
<FeedListLoader/>
<FeedListLoader/>
<FeedListLoader/>
<FeedListLoader/>
<FeedListLoader/>

                        </Masonry>
                    </div></div>:null}
                {(this.state.is_searched == true) ?
                  <div className="full_width">
                    <div className="medWikiLeft">
                      {(is_mobile == false) ?
                        <h4 className="font700 colorBlack text-left font_20px searchResultBoxTtl">Search Result</h4> :
                        <h4 className="font700 colorBlack text-left font_20px searchResultBoxTtl">Search Result</h4>}
                      <div className="clearfix"></div>
                      <div>
                        <Masonry
                          className={'dskMasonryCardArea'} // default ''
                          elementType={'ul'} // default 'div'
                          options={masonryOptions} // default {}
                          disableImagesLoaded={false} // default false
                          updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                          imagesLoadedOptions={imagesLoadedOptions} // default {}
                        >
                          {this.state.search_result_comp.map((r, index) => (
                            <div className="col-md-6 col-12 search_ListCards">
                              {(r.type == 'comp') ?
                                <Medwikicard onChangeButton={this.handle_change} history={this.props.history} mobile_device={isMobile} card_data={r} clicked_index={selected_medwiki_popover_index} elem_key={index} custom_class="search_detail" />
                                : null}

                              {(r.type == "session") ?
                                <Sessioncard onChangeButton={this.handle_change} history={this.props.history} mobile_device={isMobile} card_data={r} clicked_index={selected_session_popover_index} elem_key={index} custom_class="search_session_block" />
                                : null}




                              {(is_mobile == false && r.type == "user") ?
                                <div>
                                  {this.state.search_result_user.map((r, index) => (
                                    <div className="full_width ssnDtlsDoc">
                                      <div className="full_width radius-6 ssnDtlsDocIn">
                                        <div className="radius-100 ssnDtlsDocPic">
                                          <img src={r.image} className="object_fit_cover radius-100" />
                                        </div>
                                        <div className="ssnDtlsDocInRight">
                                          <h2 className="colorBlack font700 font_16px ssnDtlsDocName">
                                            {r.doctor_name}
                                            <span className="colorGrey font_12px font600">{r.specialities}</span></h2>
                                          <div className="full_width ssnDtlsDocCont">
                                            {r.description.substr(0, 100)} ....
            </div>
                                          <a href="javascript:void(0);" onClick={() => { select_key = index; this.setState({ "showModal": true }); }} className="colorBlue font700 font_14px">View Details</a>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div> : null}
                            </div>
                          ))}
                        </Masonry>
                      </div>

                      {(is_mobile == false && this.state.search_result_comp.length == 0 && this.state.is_loader == false) ?
                        <div className="full_width alert alert-danger">
                          <strong>No Records Found</strong>
                        </div> : <div>{(is_mobile == true && this.state.search_result_comp.length == 0 && this.state.is_loader == false) ? <div className="full_width alert alert-danger">
                          <strong>No Records Found</strong>
                        </div> : null}</div>}

                    </div>

                  </div>

                  : null}
                <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={80} width={80} visible={this.state.is_loader} />
              </section>


            </div>

          </div>



        </section>
        <Footer history={this.props.history} />




        <div className="right_fix_pop_JS">
          <div className="tRright_popClose right_fixedBg"></div>
          <div className="right_pop transition6s text-left selectSpecialtyPop">
            <div className="bgColorBlue text-left right_popTtl">
              <h2 className="colorWhite font600 font_20px right_popTtlTxt">Select Specialties</h2>
              <a href="javascript:void(0)" className="radius-100 right_popClose tRright_popClose">

                <span className="colorWhite font600 font_14px translate_both" style={{ position: 'absolute' }}>Ok</span>
              </a>
            </div>
            <div className="right_popIn">
              <div class="full_width font600 specialty_comp_right_text">
                {/* <ul>
                {this.state.speciality.map((r, index) => (
                <li className={"lispec_"+r.master_specialities_id}><a onClick = {()=> this.getsubspec(r.master_specialities_id,1 ) } href="javascript:void(0);">{r.specialities_name}</a></li>

                
                ))} 
                </ul> */}
                {this.state.speciality.map((r, index) => (
                  <Form.Group className={"chada feedRightSpecilityPrnt lispec_" + r.master_specialities_id} controlId="formBasicCheckbox">
                    <div className="full_width" style={{ 'position': 'relative' }}>
                      {(selected_spec.indexOf(r.master_specialities_id) != -1) ?
                        <Form.Check checked onClick={() => { this.selectspec(r.master_specialities_id); }} className="cmnCheckBox_row" type="checkbox" label={r.specialities_name + ""} /> :
                        <Form.Check onClick={() => this.selectspec(r.master_specialities_id)} className="cmnCheckBox_row" type="checkbox" label={r.specialities_name + ""} />}


                    </div>
                    {(cur_sel_spec == r.master_specialities_id) ?
                      <div className="full_width" style={{ "margin-top": "10px" }}>

                        {/* <Loader className="loader_cmn" type="ThreeDots" color="#355ed3" height={20} width={20} visible={this.state.is_more_spec} /> */}
                        {this.state.sub_speciality.map((rsub, indexi) => (

                          <div class="canremove">
                            <div class="form-check cmnCheckBox_row">
                              {(selected_spec.indexOf(rsub.id) != -1) ?
                                <input class={r.master_specialities_id + "id form-check-input"} checked onClick={() => this.selectspec(rsub.id)} value={rsub.id} type="checkbox" /> :
                                <input onClick={() => { this.selectspec(rsub.id) }} class={r.master_specialities_id + "id form-check-input"} value={rsub.id} type="checkbox" />}
                              <label class="form-check-label">&nbsp;</label>

                            </div>
                            <a className="font_14px feedRightSpecilityShow" onClick={() => { this.get_sub_sub_spec(rsub.id, 2) }} href="javascript:void(0);">{rsub.name + "(" + rsub.totalNum + ")"}</a>

                            {(cur_sel_subspec == rsub.id) ?
                              <div className="full_width" style={{ "margin-top": "10px" }}>
                                {this.state.sub_sub_speciality.map((rsubsub, indexii) => (
                                  <div class="canremove">
                                    <div class="form-check cmnCheckBox_row">
                                      {(selected_spec.indexOf(rsubsub.id) != -1) ?
                                        <input class={rsub.id + "id form-check-input"} checked onClick={() => this.selectspec(rsubsub.id)} value={rsubsub.id} type="checkbox" /> :
                                        <input onClick={() => { this.selectspec(rsubsub.id); }} class={rsub.id + "id form-check-input"} value={rsubsub.id} type="checkbox" />}
                                      <label class="form-check-label">{rsubsub.name + "(" + rsubsub.totalNum + ")"}</label>
                                    </div>
                                  </div>

                                ))}
                              </div> : null}







                          </div>


                        ))}
                      </div> : null}
                  </Form.Group>
                ))}

              </div>

            </div>
          </div>
        </div>

        {(this.state.search_result_user.length > 0) ?
          <Modal className="in doctorDtlsPop" centered="true" animation="slide" show={this.state.showModal} onHide={() => { this.setState({ "showModal": false }); }}>
            <Modal.Header className="justify-content-center">
              <Modal.Title className="font600 font_20px colorBlack">Doctor Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <div className="radius-100 ssnDtlsDocPic">
                <img src={this.state.search_result_user[select_key].image} className="object_fit_cover radius-100" />
              </div>
              <div className="clearfix"></div>
              <h2 className="colorBlack font700 font_16px ssnDtlsDocName">
                {this.state.search_result_user[select_key].doctor_name}
                <span className="colorGrey font_12px font600">{this.state.search_result_user[select_key].specialities}</span></h2>
              <div className="full_width ssnDtlsDocCont">
                {this.state.search_result_user[select_key].description}
              </div>


            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <a href="javascript:void(0)" className="radius-40 font500 btnRed cmnBtn btnCmnSmall" variant="secondary" onClick={() => { this.setState({ "showModal": false }); }}>
                Close
          </a>

            </Modal.Footer>
          </Modal> : null}
      </div>
    );
  }
}

export default SearchResult;