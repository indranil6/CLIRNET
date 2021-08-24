import React from 'react';
import Header from './Header';
import Footer from './Footer'; 
import $ from 'jquery';
import mCustomScrollbar from 'malihu-custom-scrollbar-plugin';
import { InlineShareButtons } from 'sharethis-reactjs';
import sendPic from '../../images/send.png';
import leftArrow from '../../images/sliderLeftWhite.png';
import cmmntBttn from '../../images/feedBttm_icon-4.png';
import {isMobile} from 'react-device-detect';

import likeBttn from '../../images/feedBttm_icon-1.png';
import vaultBttn from '../../images/feedBttm_icon-2.png';
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css';
require('jquery-mousewheel');
class FeedDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      display:false,
      commentsArr:['test comments'],
      textComment: ''
    }
  }

  refresh = () => {
    this.setState({ "display": !this.state.display});
  }
   
  componentDidMount()
  {     
    $(".videoComments").mCustomScrollbar({theme:'dark'}).mCustomScrollbar("scrollTo","last",{scrollInertia:0});
        
        $(".p_videoBox").removeClass('videoRightShow');
              $(".video_collapse").click(function(){
                $(".p_videoBox").toggleClass('videoRightShow');
              })

     $('#chat-msg-box').keypress(function(event){
      console.log("chat msg click"+event.keyCode)
      if(event.keyCode === 13) { 
       console.log("chat msg click")
       this.onCommentSubmit();
      } 
     })   
  }

    onTextUpdate(e) //for text type question 
    {
      let text = e.target.value; 
      this.setState({'textComment':text})
      this.refresh();
    }

    onCommentSubmit(){
      console.log("chat on comment submit")
      this.state.commentsArr.push(this.state.textComment);
      this.setState({'textComment':''})
    }

    formatDate = (d) =>{
      let date = new Date(d);
      let hours = date.getHours(); 
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? 'pm' : 'am';  
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      let strTime = hours + ':' + minutes + ' ' + ampm;
      console.log("in return date"+date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime) 
      return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
  }

  render() 
  {
    return (
        <div className={ isMobile == true ? 'full_width wrap_body mblScreen' : 'full_width wrap_body dskScreen'}>
          <Header history={this.props.history} />
            <section className="full_width body_area p_videoPageLive">
              <div className="container">
                <div className="row">
                  <div className="full_width text-left radius-6 feedRow p_videoLiveMAin" >
                  <div className="col justify-content-between feedRowTop">
                        <div className="row">
                          <div className="col">
                          <span class="font_12px radius-6 font700 colorBlue feed_right_SsnBoxLive">Live chat</span>
                          </div>
                          <div className="col-auto">
                            <a href="javascript:void(0);" className=" feedRow_sponsors">
                            <span className="font_10px font500 colorBlack">Powered by</span>
                            <img src="https://developer.clirnet.com/knowledge/uploads/logo/200-1.png" width="224" height="63" alt="logo" title="clirnet" />
                            </a>
                          </div>
                        </div>
                      </div>
                      
                      <div className="full_width feedRow_ttl">
                        <div className="full_width">
                          <span class="font_14px radius-6 font600 colorBlue feedRow_speciality">Diabetology, Medicine, Obstetrician, Obstetrics &amp; Gynaecology</span>
                        </div>
                        <a href="javascript:void(0);" class="highlightyellow1 font_18px colorBlack font600">What are the complications of gestational diabetes mellitus?</a> 
                      </div>
                    
                <div className="full_width p_videoBox">
                  <div className="p_videoBoxPlay transition6s">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/R3VMW6fxK6Y"
                 frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                 </div>
                 <div className="video_right transition6s">
                 <div className="video_collapse">
                  <img src={leftArrow} />
						      </div>

                  <div className="full_width video_rightIn">
                  
							<div className="col-12 videoComments">
									<div className="full_width">
                {(this.state.commentsArr.length > 0)?
                  <>
                  {this.state.commentsArr.map((r, index) =>
                    <div className="full_width font_14px colorWhite videoCommentsRow">
                    <div className="radius-100 videoCommentsRowPic">
                      <img src="https://clinicalnotebook.com/wp-content/uploads/2015/04/Doctor-Profile-Pic-Example.png" className="object_fit_cover" />
                    </div>
                      <h4 className="font_14px font600 colorWhite videoCommentBy">1. Ashu Kasera <span className="font_12px font500">1 min ago</span></h4> 
                      <p>{r}</p>		
                      </div>
                  )} 
                  </>:null}		 
							
							</div>
							</div>
							<div className="videoFrm">
									<input type="text" id="chat-msg-box" onChange={this.onTextUpdate.bind(this)} value={this.state.textComment} placeholder="Type your comment" className="videoFrmInput"/>
									<button type="submit"  onClick={this.onCommentSubmit.bind(this)} className="videoFrmSend bgColorBlue"><img src={sendPic} className="translate_both"/></button>
							</div>
							 
				
            </div>


                 </div>
                 </div>
                 <div className="full_width">
                     
                      <div class="full_width font_16px feedRow_ans">
                    
                       <p>Diabetic ketoacidosis, deterioration of diabetic retinopathy and nephropathy, hypoglycaemia due to insulin use are complications of gestational diabetes mellitus (GDM). Other obstetric complications, such as spontaneous abortion, premature birth, preeclampsia, polyhydramnios, and increased maternal distress, can also happen. Moreover, prolonged labour, shoulder dystocia, and perineal injury can also occur. Among complications after delivery are increased risk of infection, puerperal sepsis, and failing lactation. Fetal complications, such as fetal distress, intrauterine fetal death, cardiomegaly, ventricular septal defect, atrial septal defect, neural tube defect, trigonocephaly, spina bifida, meningomyelocele, caudal regression syndrome, macrosomia, intrauterine growth restriction, birth asphyxia, neonatal hypoglycaemia, neonatal hyperbilirubinemia, neonatal hypocalcemia, neonatal polycythemia, and delayed fetal development can also arise. In the first trimester, there can be fetal malformation, growth retardation, and fetal wastage. In the second trimester, there can be fetal cardiomyopathy, polyhydramnios, placental insufficiency, preeclampsia, and the child can have a low intelligence quotient (IQ) in future. In the third trimester, there can be hypoglycaemia, hypocalcemia, hyperbilirubinemia, fetal respiratory distress syndrome, macrosomia, hypomagnesemia, and intrauterine fetal death.</p>

                     
                      </div>
                      <div className="full_width feed_footer">
                        <div className="row d-flex align-items-center">
                          
                            <a className="feedFter_left active" href="javascript:void(0);"><img src={likeBttn} /><span>3</span></a> 
                           
                    
                            <a className="feedFter_left"  href="javascript:void(0);"><img src={vaultBttn} /></a> 
                          <InlineShareButtons
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
                              // url: r.deeplink, // (defaults to current url)
                              // image: 'https://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
                              // description: r.answer.substring(0, 100) + "...",       // (defaults to og:description or twitter:description)
                              // title: r.question,            // (defaults to og:title or twitter:title)
                              // message: '',     // (only for email sharing)
                              // subject: '',  // (only for email sharing)
                              // username: 'Medwiki view' // (only for twitter sharing)
                            }}
                          />
                          <a className="feedFter_left" href="javascript:void(0);"><img src={cmmntBttn} /><span>10</span></a>
                        </div>
                      </div>
                      
                    </div>
                
                    </div> 
                 </div> 
              </div>
            </section>
          <Footer  history={this.props.history}/>     
        <div>   
      </div>
    </div>
  );}
}
export default FeedDemo;
