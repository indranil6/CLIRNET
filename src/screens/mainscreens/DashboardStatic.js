import React from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import medwikiicon from '../../images/medWikiNoImage-2.jpg';
import HeaderStatic from '../mainscreens/HeaderStatic';
import Footer from '../mainscreens/Footer';
import calenderIcon from '../../images/cal-black.png';
import masterconsultlogo from '../../images/session_box_type-3.png';
import Slider from "react-slick";
import Form from 'react-bootstrap/Form';
import {isMobile} from 'react-device-detect';

class DashboardStatic extends React.Component {
 
  constructor(props) {
    super(props);
  }

  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      adaptiveHeight: true,
      autoplay:true
    };
    return (
      <div className="full_width warp_body">
        <HeaderStatic/>
        <section className="full_width body_area">
          <div className="container">
            <div className="row">
              <section className="full_width dashboard">
                <div className="medWikiLeft">
                  <div className="full_width text-left searchResultSearch">
                    <h3 className="font_30px colorBlack font700 searchResultSearchTtl">Hi Doctor <span>Start a Discussion</span></h3>
                    <div className="dashboardpoWered">
                      <span className="font_12px font600 colorBlack">Powered by</span>
                     <img src={reactLocalStorage.get('@ClirnetStore:client_logo', true)} alt="logo" />
                    </div> 
                    <div className="full_width searchFrmRow">
                      <Form.Control className="font_14px font500 radius-6 searchResultInput" type="text" placeholder="Type To Search" />
                    </div>
                  </div>
                <div className="full_width radius-6 arngDiscusMain" >   
                <a href="javascript:void(0)" className="full_width font_22px colorBlack font600 arngDiscus_ttl" aria-controls="example-collapse-text">
                      Enter Case to Arrange Peer Discussion
                </a>            
                </div>
                  <div className="full_width">
                    <Slider {...settings} className="dashboardSlider">
                        <div>
                            <div className="home_slider">
                              <div className="col-12 radius-6 home_slider_1">
                                <div className="row">
                                  <div class="col-sm-4 feedRow_Pic">
                                      <img className="object_fit_cover" src={medwikiicon} />
                                    <div className="overlay"></div>
                                  </div>
                                  <div className="col-sm-8 home_slider_Right">
                                    <div className="full_width feedRow_ttl">
                                      <a href="javascript:void(0);" class="font_16px colorBlack font600">a. What is the difference between osteoarthritis, rheumatoid and rheumatic arthritis?...</a>
                                    </div>
                                    <div class="full_width font_14px feedRow_ans">
                                      <p>Patients should be advised to maintain a diary. The input-output chart should be checked after a week. Usually, if the input is around 2L, the output should be around [1]....<a class="font_14px font600" href="javascript:void(0)">&nbsp; More</a></p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div> 
                        </div>
                    </Slider>
                  </div>
                </div>
              <div className="feed_right_2">
                <div class="full_width radius-6 text-left specialty_comp_right">
                  <h2 class="bgColorBlue font600 colorWhite font600 font_20px specialtyTtl">Cases you may like</h2>
                    <div class="clearfix"></div>
                    <div class="full_width font600 specialty_comp_right_text"> 
                        <div className="full_width relatedRow withImg">
                          <a href="javascript:void(0)">
                            <div className="full_width font_12px relatedRowsidebar_top"><span className="colorBlack font700">Diabetology, Medicine, Obstetrician, Gynaecology</span></div>
                            <div className="full_width relatedRowIn">  
                                <div className="radius-6 relatedRowPic">
                                  <img className="object_fit_cover" src={medwikiicon} />
                                </div>
                              <h2 className="font600 transition6s font_14px colorBlack relatedRowTtl">Which one is preferred between oral hypoglycaemic agents (OHA) and insulin for treating gestational diabetes in India?...</h2>
                            </div>
                          </a>
                        </div>
                        <div className="full_width relatedRow withImg">
                          <a href="javascript:void(0)">
                            <div className="full_width font_12px relatedRowsidebar_top"><span className="colorBlack font700">Diabetology, Medicine, Obstetrician, Gynaecology</span></div>
                            <div className="full_width relatedRowIn">  
                                <div className="radius-6 relatedRowPic">
                                  <img className="object_fit_cover" src={medwikiicon} />
                                </div>
                              <h2 className="font600 transition6s font_14px colorBlack relatedRowTtl">Which one is preferred between oral hypoglycaemic agents (OHA) and insulin for treating gestational diabetes in India?...</h2>
                            </div>
                          </a>
                        </div>
                        <div className="full_width relatedRow withImg">
                          <a href="javascript:void(0)">
                            <div className="full_width font_12px relatedRowsidebar_top"><span className="colorBlack font700">Diabetology, Medicine, Obstetrician, Gynaecology</span></div>
                            <div className="full_width relatedRowIn">  
                                <div className="radius-6 relatedRowPic">
                                  <img className="object_fit_cover" src={medwikiicon} />
                                </div>
                              <h2 className="font600 transition6s font_14px colorBlack relatedRowTtl">Which one is preferred between oral hypoglycaemic agents (OHA) and insulin for treating gestational diabetes in India?...</h2>
                            </div>
                          </a>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
} 
export default DashboardStatic;





