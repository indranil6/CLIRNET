import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import moment from 'moment';

let tracking_data = {
  id: "",
  start_time: "",
  end_time: "",
  video_duration: "",
  seekbar_change: [],
  progress: [],
  max_view_duration: ""
}
function VideoPlayer({ data, onVideoEndCallback }) {
  const playerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0.0);
  const [duration, setDuration] = useState(0.0);
  const [extraClass, setextraClass] = useState('');
  const [videoUrl, setvideoUrl] = useState('https://player.vimeo.com/video/575287012?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479');
  const [videoPlayerControl, setvideoPlayerControl] = useState(true);
  const [videoPlay, setvideoPlay] = useState(true);
  const [progressStep, setProgressStep] = useState('progress');

  const progressInterval = 5000;
  const timeFormat = "YYYY-MM-DD HH:mm:ss";
  const getCurrentTime = () => moment(new Date().getTime()).format(timeFormat);
  
  useEffect(() => {
    // clearAllData();
  });

  // timeDifference(from) {
  //   let d2 = new Date();
  //   let d1 = new Date(from);
  //   let seconds = (d2 - d1) / 1000;
  //   // alert("current date:\n"+d2+"\ndifference from:\n"+d1+"\ndiff:\n"+seconds.toString())
  //   return seconds.toString();
  // }

  // runServiceForLiveSession(startTime, endTime) {
  //   console.log("service run");
  //   let startTimeDif = this.timeDifference(startTime);
  //   let endTimeDif = this.timeDifference(endTime);
  //   startTimeDif = Math.round(startTimeDif);
  //   endTimeDif = Math.round(endTimeDif);
  //   let myCounter;

  //   if (startTimeDif >= 0 && endTimeDif <= 0) {
  //     // console.log("live\n"+startTimeDif+"\nend\n"+endTimeDif)
  //     isLive = true;
  //     this.setState({ display: !this.state.display });
  //   } else {
  //     // console.log("not live\n"+startTimeDif+"\nend\n"+endTimeDif)
  //   } 

  const clearAllData = () => {
    tracking_data.id = "";
    tracking_data.start_time = "";
    tracking_data.end_time = "";
    tracking_data.video_duration = "";
    tracking_data.seekbar_change = [];
    tracking_data.progress = [];
    tracking_data.max_view_duration = "";
  }


  const handleStart = (e) => {
    // e.preventDefault();
    tracking_data.video_duration = duration / 60;
    tracking_data.start_time = getCurrentTime();
  }

  const handleEnablePIP = () => {
    console.log('onEnablePIP')
  }

  const handleDisablePIP = () => {
    console.log('onDisablePIP')
  }

  const handleSeekMouseDown = e => {
    console.log('handleSeekMouseDown')
    // this.setState({ seeking: true })
  }

  const handleSeekChange = e => {
    let seekTrackObj = {
      "timestamp": getCurrentTime(),
      "from": currentTime / 60,
      "to": e / 60
    }
    tracking_data.seekbar_change.push(seekTrackObj)
    console.log('handleSeekChange\n', JSON.stringify(tracking_data));
  }

  const handleProgress = e => {
    setCurrentTime(e.playedSeconds);
    if (tracking_data.max_view_duration < currentTime / 60) {
      tracking_data.max_view_duration = currentTime / 60
    }
    let progressTrackObj = {
      "timestamp": getCurrentTime(),
      "progress": JSON.stringify(e)
    }
    tracking_data.progress.push(progressTrackObj)
    console.log('handleProgress\n', JSON.stringify(tracking_data));
  }

  const handleVideoEnd = (e) => {
    tracking_data.end_time = getCurrentTime();
  }

  const handleReady = () => {
    console.log('handleReady\n', JSON.stringify(tracking_data));
  }

  const handlePlay = () => {
    setvideoPlay(true)
  }

  const handlePause = () => {
    setvideoPlay(false)
  }

  return (
    <ReactPlayer
      ref={playerRef}
      width='100%'
      height='100%'
      className={extraClass ? extraClass : "default-session-player"}
      controls={videoPlayerControl}
      playing={videoPlay}
      url={videoUrl}
      onReady={handleReady}
      onStart={handleStart}
      onPlay={handlePlay}
      onEnablePIP={handleEnablePIP}
      onDisablePIP={handleDisablePIP}
      onPause={handlePause}
      onBuffer={() => console.log('onBuffer')}
      onSeek={handleSeekChange}
      onEnded={handleVideoEnd}
      onError={e => console.log('onError', e)}
      onProgress={handleProgress}
      progressInterval={progressInterval}
      onDuration={e => { setDuration(e) }}
    />
  );
}

export default VideoPlayer;