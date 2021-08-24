import React, { Component, createRef, useRef, useEffect } from "react";
import { reactLocalStorage } from 'reactjs-localstorage';
import Moment from 'react-moment';
import $ from 'jquery';
import AppConfig from '../config/config';
import Loader from 'react-loader-spinner';

const url = AppConfig.apiLoc;
let commentsData = []
let timer;
let fetchCounter = 0;
class Comments extends Component {
    chatContainer = React.createRef();
    constructor(props) {
        super(props);
        this.id = this.props.id
        this.state = {
            display: false,
            loader: false
        }
        fetchCounter = 0;
    }

    refreshComponent() {
        this.setState({ display: !this.state.display }) 
    }

    componentDidMount() {
        let temp = this;
        if(fetchCounter == 0){ 
            temp.getComments()
        }
        timer =  window.setInterval(function(){
            console.log("comments fetch")
            temp.getComments()
        }, 120000); 
    
        var input = $("#commentInput");
        input.on("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                $("#commentSubmitBtn").click();
            }
        });
    }

    scrollToBottom = () => {
        this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    componentWillUnmount() {
        if(timer){
            clearInterval(timer)
        }
    }

    scrollToMyRef = () => {
        const scroll =
            this.chatContainer.current.scrollHeight -
            this.chatContainer.current.clientHeight;
        this.chatContainer.current.scrollTo(0, scroll);
    };

    getComments() {
        this.setState({ loader: true })
        fetch(url + 'knwlg/nested_comment?type_id=' + this.id + '&type=gr', {
            method: 'GET',
            headers: {
                'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
                'version': 'rjsw 1.1.1'
            }
        }).then((response) => response.json()).then((responseJson) => {
            let status_code = responseJson.status_code;
            if (status_code == 200) {
                fetchCounter++
                this.setState({ loader: false })
                if (responseJson.data) {
                    let tempResData = JSON.parse(responseJson.data);
                    if(tempResData){
                        if (tempResData.length > 0) {
                            commentsData = []
                            tempResData.map(r => {
                                console.log("commentid\n"+commentsData.includes(r.commentId)+"\nc\n"+r.commentId)
                                // if (!commentsData.includes(r.commentId)) {
                                    commentsData.push(r);
                                // }
                            })
                        }
                    }
                    this.setState({ display: !this.state.display }, () => this.scrollToMyRef())
                }
            } else {
                return false;
            }
        }).catch((error) => {
            this.setState({ loader: false })
            console.log("Error" + error);
        });
    }

    submitcomment(type_id, type) {
        let commentsub = $(".commentInput").val();
        if (commentsub != "") {
            this.setState({ loader: true })
            this.scrollToMyRef()
            let thisobj = this;
            let parser = {
                type_id: type_id,
                type: type,
                parent_id: 0,
                comment: commentsub
            }
            $(".commentInput").val("");
            fetch(url + 'knwlg/nested_save_comment', {
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
                        this.setState({ loader: false })
                        this.getComments();
                    }
                    else {

                    }
                })
                .catch((error) => {
                    this.setState({ loader: false })
                });
        }
    }

    render() {
        return (

            <div className="hls_Pvideo_right text-left transition6s">
                <div className="full_width hls_Pvideo_rightTtl">
                    <h4 className="font500 font_16px colorBlack">Questions &amp; Answers</h4>
                </div>
                <div className="col-12  hls_PvideoComments" ref={this.chatContainer}>
                    <div className="row align-items-end">
                        <div className="full_width" id="comment_cont">

                            {(commentsData.length > 0) ?
                                commentsData.map((r, index) => (
                                    <div className="full_width font_12px hls_PvideoCommentsRow">
                                        <h4 className="font600 font_14px colorBlack hls_PvideoCommentBy">Dr. {r.last_name}</h4>{/*<span className="font_12px font500"><Moment format="MMMM Do YYYY">{r.created_at}</Moment></span> */}
                                        <p>{r.body}</p>
                                    </div>
                                )) :
                                <div className="full_width alert alert-danger text-center">
                                    <strong>No one Ask Any Questions Yet! Do You have any?</strong>
                                </div>}
                            {/* <Loader className="loader_cmn mt-5" type="ThreeDots" color="#355ed3" height={40} width={40} visible={this.state.loader} /> */}
                        </div>
                    </div>
                </div>
                <div class="full_width hls_PvideoFrm">
                    <input type="text" id="commentInput" className="hls_PvideoFrmInput commentInput" placeholder="Write a comment here" />
                    <input type="submit" id="commentSubmitBtn" className="hls_PvideoFrmSend" value="" onClick={() => this.submitcomment(this.id, 'gr')} />
                </div>
            </div>

        );
    }
}
export default Comments;
