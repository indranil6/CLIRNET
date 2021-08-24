import React from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';

import Loader from 'react-loader-spinner' 
import AppConfig from '../config/config.js';
import Header from '../mainscreens/Header';
import Footer from '../mainscreens/Footer';
import HlsPlayer from '../CustomLibrary/HlsPlayer.jsx';
import * as utils from './utils/utils.js';


const url = AppConfig.apiLoc;
const api_version = AppConfig.api_version;
let VideoJson = {
    type_id: '',
    artist: "",
    cover: "",
    name: "",
    mainUrl: '',//"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    ad: []
}
let isReady = false;
let pageNames = "Ads Player"
class CustomVideoPlayer extends React.Component {
    constructor(props) {
        super(props);

        this.apiKey = '46336312';
        this.sessionId = "2_MX40NjMzNjMxMn5-MTYxOTYwODYyNjU3OX50cVBNUjhPOFRSMXpFcHFNWVNiMlVwN1N-fg";
        this.token = "T1==cGFydG5lcl9pZD00NjMzNjMxMiZzaWc9ODI1MzRkNmRlODRkODZiMzUyNzhkYWMwMTllMTY5NGFkMWE5OGIxMzpzZXNzaW9uX2lkPTJfTVg0ME5qTXpOak14TW41LU1UWXhPVFl3T0RZeU5qVTNPWDUwY1ZCTlVqaFBPRlJTTVhwRmNIRk5XVk5pTWxWd04xTi1mZyZjcmVhdGVfdGltZT0xNjE5NjEyNDgyJnJvbGU9bW9kZXJhdG9yJm5vbmNlPTE2MTk2MTI0ODIuNzgwNDYxNTcyMzg0MCZleHBpcmVfdGltZT0xNjIwMjE3MjgyJmNvbm5lY3Rpb25fZGF0YT1uYW1lJTNESm9obm55JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9Zm9jdXM=";

        this.state = {
            display: false
        };
    }

    getSessionId() {
        let user_id = reactLocalStorage.get('@ClirnetStore:user_master_id', true)
        if (user_id) {
            let data = { "to_user_master_id": user_id }
            fetch(url + 'tokbox/createSession', {
                method: 'POST',
                headers: {
                    'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
                    'version': api_version
                },
                body: JSON.stringify(data),
            }).then((response) => response.json()).then((responseJson) => {
                let status_code = responseJson.status_code;
                if (status_code == 200) {
                    // console.log('comming for return')
                    return responseJson;
                } else {
                    return false;
                }
            }).catch((error) => {
                return false;
                //console.log("Error"+error);
            });
        } else { return false; }
    }

    createToken() {
        let data = { "sessionID": this.sessionId }
        fetch(url + 'tokbox/createToken', {
            method: 'POST',
            headers: {
                'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
                'version': api_version
            },
            body: JSON.stringify(data),
        }).then((response) => response.json()).then((responseJson) => {
            let status_code = responseJson.status_code;
            if (status_code == 200) {
                // console.log('comming for return')
                return responseJson;
            } else {
                return false;
            }
        }).catch((error) => {
            return false;
            //console.log("Error"+error);
        });
    }

    getHistory() {
        let data = { "connection_sessions_id": 1436 }
        fetch(url + 'tokbox/getHistory', {
            method: 'POST',
            headers: {
                'Authorization': reactLocalStorage.get('@ClirnetStore:refreshToken', true),
                'version': api_version
            },
            body: JSON.stringify(data),
        }).then((response) => response.json()).then((responseJson) => {
            let status_code = responseJson.status_code;
            if (status_code == 200) {
                // console.log('comming for return')
                return responseJson;
            } else {
                return false;
            }
        }).catch((error) => {
            return false;
            //console.log("Error"+error);
        });
    }


    messageObj = (item, key) => {
        //const key = (item.content == 'image' || item.content == 'video' || item.content == 'document') ? "image" : "text";
        this.setState({ messageId: item._id, messageType: key });
        if (key === "text") {
            return {
                _id: item._id,
                //[key]: item.text,
                text: item.text,
                createdAt: item.createdAt,
                //messageType: item.messageType,
                user: {
                    _id: parseInt(this.state.userId),
                    name: this.state.userName,
                    avatar: this.state.avatar
                }
            };
        } else {
            return {
                _id: item._id,
                image: item.image,
                //[keyImage]: item.image,
                fileName: item.fileName,
                uri: item.uri,
                content: item.content,
                thumbnail: item.thumbnail,
                createdAt: item.createdAt,
                //messageType: item.messageType,
                user: {
                    _id: parseInt(this.state.userId),
                    name: this.state.userName,
                    avatar: this.state.avatar
                }
            };

        }
    };

    sendMessageObj = item => {
        return {
            sessionID: this.sessionId,
            to_user_master_id: this.state.user_master_id,
            connection_sessions_id: this.state.connection_session_id,
            message: item,
            type: this.state.messageType
        };
    };

    componentDidMount() {
        isReady = false;
        utils.getFeedDetils(5938).then(response => {
            this.parseFeedResponseData(response)
        });
        // this.getSessionId()
        // this.createToken()
        // this.getHistory()
    }

    parseFeedResponseData(response) {
        if (response) {
            isReady = true;
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
                VideoJson.mainUrl ="https://vimeo.com/event/1166000"// rData.src;
                utils.getAds(5938, 'comp').then(response => {
                    this.parseAdsResponseData(response)
                });
            }
        }
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
        this.setState({ display: !this.state.display })
    }

    render() {
        return (
            <div className="full_width dskScreen"> 
                <Header history={this.props.history} page_name={pageNames} />
                <section className="full_width body_area">
                    <div className="container">
                        {(isReady) ?
                            <HlsPlayer data={VideoJson} />
                            :<Loader className="loader_cmn mt-5" type="ThreeDots" color="#355ed3" height={40} width={40} visible={true} />
                        }
                    </div>
                </section>
                <Footer history={this.props.history}/>
            </div>
        )
    }
}
export default CustomVideoPlayer;