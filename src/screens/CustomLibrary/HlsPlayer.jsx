import React from "react";
import $ from 'jquery';
import videojs from 'video.js'
import 'videojs-contrib-quality-levels';
import Loader from 'react-loader-spinner'
import videojsqualityselector from 'videojs-hls-quality-selector';
import 'video.js/dist/video-js.css'; 
import MediaSession from '@mebtte/react-media-session';//npm install --save @mebtte/react-media-session
import * as utils from '../Hospital/utils/utils.js';
import { Timer } from '../Hospital/utils/utils.js';
import Comments from './Comments.jsx';

///////////////////////////not used///////////////////////////////////////////
//import './customPlayer.css'
//npm i videojs-hotkeys
////////////////////////////////////////////////////////////////////
let player = '';

let VideoJSon = {}

let adCurrentTime = 0
let currentTime = 0
let videoCounter = 0
let contentPlaying = "content"
let timer
let videoTitle, videoArtist;

class HlsPlayer extends React.Component {
    constructor(props) {
        super(props);
        VideoJSon = this.props.data
        this.state = {
            skipModal: false,
            display: false,
            video: {
                src: VideoJSon.mainUrl,//"https://player.vimeo.com/external/534791572.m3u8?s=3f1e6542473e0ecaa2fdeae746425ed4d30c43bb",//"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                poster: VideoJSon.cover
            }
        }
    }


    componentDidMount() {
        // alert("data"+JSON.stringify(VideoJSon))
        let temp = this;
        let options = {
            controls: true,
            autoplay: true,
            fluid: true,
            preload: 'auto',
            playbackRates: [1, 1.5, 2],
            controlBar: {
                durationDisplay: true,
                remainingTimeDisplay: true,
                // navigationUI: true,
                CurrentTimeDisplay: true,
                TimeDivider: true,
                progressControl: {
                    seekBar: true
                },
                fullscreenToggle: true,
                playbackRateMenuButton: true,
                volumePanel: {
                    inline: false,
                    vertical: true
                }
            },
            userActions: {
                hotkeys: {

                }
            }
        };

        player = videojs('my-player');

        player.hlsQualitySelector = videojsqualityselector;
        player.hlsQualitySelector({
            displayCurrentQuality: true,
        });

        player.on('ready', function () {
            player.src(VideoJSon.mainUrl)
            player.on('ended', function () {
                // videojs.log('Awww...over so soon?!'+player.currentTime());
                if (contentPlaying == 'ad') {
                    videoCounter++
                    contentPlaying = "content"
                    player.controlBar.progressControl.enable()
                    $(".vjs-play-progress").css({ "background-color": "" });

                    videoTitle = VideoJSon.name
                    videoArtist = VideoJSon.artist
                    temp.setState({ display: !temp.state.display })
                    player.src(VideoJSon.mainUrl)
                    player.currentTime(currentTime)
                } else {
                    alert('in else')
                }
            });

            player.on('play', function () {
                // player.requestFullscreen();
                if (contentPlaying == 'content') {
                    let counter = 0
                    if (VideoJSon.ad.length && VideoJSon.ad.length > 0) {
                        timer = setTimeout(
                            function () {
                                currentTime = player.currentTime();
                                contentPlaying = "ad"
                                // player.controlBar.hide() 
                                player.controlBar.progressControl.disable()
                                $(".vjs-play-progress").css({ "background-color": "yellow" });
                                if (VideoJSon.ad.length == videoCounter) {
                                    videoCounter = 0
                                }
                                videoTitle = VideoJSon.name
                                videoArtist = VideoJSon.artist
                                // videojs.log("video counter"+timer.left())
                                player.src(VideoJSon.ad[videoCounter].image)
                                if (counter != 0) {
                                    clearTimeout(timer)
                                }
                                counter++
                                temp.setState({ display: !temp.state.display })
                            }, 20000)
                    }
                } else {

                }
            });

            player.on('pause', function () {
                if (contentPlaying == "content") {
                    clearTimeout(timer)
                }
                // videojs.log('pause Done');
            });

            player.on('fullscreenchange', function () {
                this.setState({ "skipModal": true })
            })
        })
    }

    componentWillUnmount() {
        currentTime = 0
        videoCounter = 0
        contentPlaying = "content"
        player.dispose();
    }

    onSkipClick() {
        player.src(VideoJSon.mainUrl)
        if (currentTime) {
            player.currentTime(currentTime)
        }
        contentPlaying = "content"
        videoTitle = VideoJSon.name
        videoArtist = VideoJSon.artist

        player.controlBar.progressControl.enable()
        $(".vjs-play-progress").css({ "background-color": "" });
        this.setState({ display: !this.state.display })
        // console.log('currentTime:\n'+currentTime)
    }

    onVisitClick() {
        if (contentPlaying == 'ad') {
            utils.onPreviewClick(VideoJSon.ad[videoCounter].url)
        }
    }

    render() {
        const skipBtn = {
            position: "absolute",
            top: "80%",
            right: "5%",
            padding: "5px",
            backgroundColor: "#000000",
            border: "1px solid black",
        };

        const adDetail = {
            position: "absolute",
            top: "80%",
            left: "5%",
            padding: "5px",
            backgroundColor: "#000000",
            border: "1px solid black",
        };
        return (
            <div className="full_width radius-6 hlsP_videoBox">
                <div className="hlsPlayerVideo">
                    {(VideoJSon.type_id) ?
                        <MediaSession
                            title={videoTitle}
                            artist={videoArtist}
                            artwork={[
                                {
                                    src: this.state.video.poster,
                                    sizes: '512x512',
                                },
                            ]}
                        // album={music.album}
                        // onPlay={onPlay} 
                        // onPause={onPause}
                        // onSeekBackward={onSeekBackward}
                        // onSeekForward={onSeekForward}
                        // onPreviousTrack={onPreviousTrack}
                        // onNextTrack={onNextTrack}
                        >
                            <video
                                id="my-player"
                                className="video-js vjs-default-skin vjs-big-play-centered"
                                controls autoplay="true" preload="none"
                                // data-setup='{ "techOrder": ["youtube", "html5"], "sources": [{ "type": "video/youtube"}] }'
                                type="application/x-mpegURL"
                                poster={this.state.video.poster}>
                                <source src={this.state.video.src}  ></source>{/*type="application/x-mpegURL"*/}
                                <p class="vjs-no-js">
                                    To view this video please enable JavaScript, and consider upgrading to a
                                    web browser that
                        <a href="javascript:void(0)" target="_blank">
                                        supports HTML5 video
                    </a>
                                </p>
                            </video>


                        </MediaSession> :
                        <Loader className="loader_cmn mt-5" type="ThreeDots" color="#355ed3" height={40} width={40} visible={true} />}
                    {
                        (contentPlaying == 'ad') ?
                            <div className="hlsPlayerVideoBtns_area">
                                <h6 className="font_12px colorWhite font500 fontExo hlsPlayerVideoBtns_Ttl">Playing ad</h6>
                                <button onClick={() => this.onSkipClick()} className="hlsPlayerVideoBtn" >
                                    SKIP
                        </button>
                                <button onClick={() => this.onVisitClick()} className="hlsPlayerVideoBtn" >
                                    VISIT
                    </button>
                            </div>
                            : null
                    }
                </div>
                <Comments id={VideoJSon.type_id} />  
            </div>
        );
    }
}
export default HlsPlayer;