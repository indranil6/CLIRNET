import React from "react";
import YouTube from "react-youtube";
import Modal from 'react-bootstrap/Modal';
// import "./styles.css";

const modalStyles = {
  content: {
    top: "50%", 
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

// Render function for Prismic headless CMS pages
function YouTubePlayer() {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [videoUrl, setVideoUrl] = React.useState("https://www.youtube.com/watch?v=6pcdlnNYZns");
  let videoCode;
  if (videoUrl) {
    videoCode = videoUrl.split("v=")[1].split("&")[0];
  }

  const checkElapsedTime = (e) => {
    console.log(e.target.playerInfo.playerState);
    const duration = e.target.getDuration();
    const currentTime = e.target.getCurrentTime();
    console.log("durarion:"+duration+"currentTime"+currentTime);
    if (currentTime / duration > 0.95) {
      setModalIsOpen(true);
    }
  };

  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  };

  const handleExerciseComplete = () => console.log("Do something");

  return (
    <div>
      <div>
        <h1>Video</h1>
        <div></div>
      </div>
      <div>
        <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
        <div>
          <YouTube
            videoId={videoCode}
            containerClassName="embed embed-youtube"
            onStateChange={(e) => checkElapsedTime(e)}
            opts={opts}
            onReady={(e)=>console.log("on ready"+e.target.value)}                    
            onPlay={(e)=>console.log("Play"+e.target.value)}                     
            onPause={(e)=>console.log("Pause"+e.target.value)}                    
            onEnd={(e)=>console.log("End"+e.target.value)}                       
            onError={(e)=>console.log("Error"+e.target.value)}                                
            onPlaybackRateChange={(e)=>console.log("Playback rate change"+e.target.value)}       
            onPlaybackQualityChange={(e)=>console.log("onPlaybackQualityChange"+e.target.value)}     
          />
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Exercise Completed"
        style={modalStyles}
      >
        <div>
          <h3>Completed the exercise?</h3>
          <button onClick={handleExerciseComplete}>Complete exercise</button>
        </div>
      </Modal>
    </div>
  );
}

export default YouTubePlayer;
