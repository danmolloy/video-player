import { useEffect, useState } from "react";
import VideoControls from "./videoControls";
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function VideoPlayer(props: any) {
  const [videoState, setVideoState] = useState("Loading..")
  const [videoVolume, setVideoVolume] = useState(.5)
  const [videoProgress, setVideoProgress] = useState(0)
  const [videoLength, setVideoLength] = useState(0)
  const [videoSpeed, setVideoSpeed] = useState(1)

  useEffect(() => {
    props.setUp()
  }, [])

  useEffect(() => {
    let video: any = document.getElementById('video');

    video.volume = videoVolume
    video.currentTime = videoProgress
    video.playbackRate = videoSpeed

    video.addEventListener('timeupdate', () => {
      setVideoProgress(video.currentTime)
    })
    video.addEventListener('seeking', () => {
      setVideoState("Loading..")
    })
     video.addEventListener('loadstart', () => {
      setVideoState("Loading..")
     })
     video.addEventListener('seeked', () => {
      setVideoState("Loaded")
    })
     video.addEventListener('loadeddata', () => {
      setVideoState("Loaded!")
      setVideoLength(video.duration)
     })
     video.addEventListener('ended', () => {
      props.setUp(props.indexNum + 1)      
     })
  }, [])



  const playPause = () => {
    let video: any = document.getElementById('video');
    if (video.paused || video.ended) {
      video.play();
    } else {
      video.pause();
    }
  }

  const fullScreen = () => {
    let video: any = document.getElementById('video');
    video.requestFullscreen()
  }


  const changeVolume = (volLevel: number) => {
    let video: any = document.getElementById('video');
    setVideoVolume(volLevel)
    video.volume = volLevel
  }

  const changeProgress = (progressPoint: number) => {
    let video: any = document.getElementById('video');
    setVideoProgress(progressPoint)
    video.currentTime = progressPoint
    
  }

  const setSpeed = (e: number) => {
    let video: any = document.getElementById('video');
    setVideoSpeed(e)
    video.playbackRate = e
  }


  return (
    <div className="title-video-player-div">
      <h1 className="title">{props.getName(props.videoArr[props.indexNum].src)}</h1>
      <div className="video-player-div">
      <video id="video" width="640" height="480">
        <source src={props.videoArr[props.indexNum]} type="video/mp4"/>
        Unfortunately you can not play this video.
      </video>
      <VideoControls
        videoSpeed={videoSpeed}
        setSpeed={(e: number) => setSpeed(e)}
        videoState={videoState}
        indexNum={props.indexNum}
        setUp={(e: any) => props.setUp(e)}
        videoProgress={videoProgress}
        videoVolume={videoVolume}
        videoLength={videoLength}
        playPause={() => playPause()}
        fullScreen={() => fullScreen()}
        changeVolume={(e: any) => changeVolume(e)}
        changeProgress={(e: any) => changeProgress(e)}
        />
        </div>
    </div>
  )
}