import { useEffect, useState } from 'react';
import { BsFillPlayFill, BsPauseFill, BsArrowsFullscreen } from 'react-icons/bs'
import { GoMute, GoUnmute } from 'react-icons/go'
import { BiSkipNext } from 'react-icons/bi'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { MdSpeed } from 'react-icons/md'


export default function VideoControls(props: any) {
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [showSpeed, setShowSpeed] = useState(false)

  useEffect(() => {
    let video: any = document.getElementById('video');
    video.addEventListener('play', () => {
      setVideoPlaying(true)
    })
    video.addEventListener('pause', () => {
      setVideoPlaying(false)
    })
    return () => {
      video.removeEventListener("play",() => {})
      video.removeEventListener("pause",() => {})
    }
  }, [])

  const getMinutes = (num: number) => {
    let flooredNum = Math.floor(num)
    let seconds = flooredNum % 60  
    let minutes = ((flooredNum - seconds) / 60)
    if (seconds < 10) {
      return (`${minutes}:0${seconds}`)
    } else {
      return (`${minutes}:${seconds}`)
    }
    
  }


  return (
    <div className="vid-controls-div">
      <div className='progress-div'>
        <p>{getMinutes(props.videoProgress)}</p>
        <input title="Playback Progress" className="progress-range input-range" type="range" min={0} max={props.videoLength} step={5} value={props.videoProgress} onChange={e => props.changeProgress(Number(e.target.value))}/>
        <p>{getMinutes(props.videoLength)}</p>
      </div>
      <div className='control-btns-div'>
      {props.videoState === "Loading.." 
        ?  <div className="loading-wheel">
              <AiOutlineLoading3Quarters />
            </div>
        : 
        <button title="Play/Pause" onClick={() => props.playPause()} className="control-icons">
          {videoPlaying === true
          ? <BsPauseFill />
          : <BsFillPlayFill />}
        </button>}
        <div className='flex flex-row items-center'>
          <button title="Mute" className="control-icons" onClick={() => {props.videoVolume === 0 ? props.changeVolume(.50) : props.changeVolume(0)}}>
            {props.videoVolume !== 0 
            ? <GoMute />
            : <GoUnmute />}
          </button>
          <input title="Volume" className='volume-control input-range' type="range" min={0} max={1} step={0.01} value={props.videoVolume} onChange={e => props.changeVolume(Number(e.target.value))}/>

        </div>
        <button title="Fullscreen" onClick={() => props.fullScreen()} className="control-icons">
          <BsArrowsFullscreen />
        </button>
        <div className='speed-div'>
          {showSpeed
          && <div className='speed-btn-div'>
            <button title="Playback x.5" className={props.videoSpeed === .5 ? 'speed-btn bg-blue-200':'speed-btn'} onClick={() => props.setSpeed(.5)}>.5</button>
            <button title="Playback x1" className={props.videoSpeed === 1 ? 'speed-btn bg-blue-200':'speed-btn'} onClick={() => props.setSpeed(1)}>1</button>
            <button  title="Playback x2" className={props.videoSpeed === 2 ? 'speed-btn bg-blue-200':'speed-btn'} onClick={() => props.setSpeed(2)}>2</button>
          </div>}
          <button title="Playback Speed" onClick={() => setShowSpeed(!showSpeed)} className="control-icons speed-icon">
            <MdSpeed />
          </button>
        </div>
        <button title="Next Video" onClick={() => props.setUp(props.indexNum + 1)} className="control-icons next-icon">
          <BiSkipNext />
        </button>
      </div>
    </div>
  )
}