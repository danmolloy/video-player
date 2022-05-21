import type { NextPage } from 'next'
import Hls from 'hls.js'
import { useEffect, useState } from 'react'
import VideoPlayer from '../components/videoPlayer'
import Playlist from '../components/playlist'
import Head from 'next/head'
import Header from '../components/header'


const Home: NextPage = () => {
  const [videoArr, setVideoArr] = useState([
    {
      src: "https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8",
      img: "/image1.png"
    },
    {
    src: "https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/index_0_av.m3u8",
    img: "/image3.png"
  },
    { src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    img: "/image2.png"
  },
  ])
  const [indexNum, setIndexNum] = useState(0)

  const setUp = (index: number | null = null) => {
    let video: any = document.getElementById('video');
    let videoSrc = videoArr[index ? index : 0].src
    
    const mp4Regex = /.mp4$/g;
    const m3u8Regex = /.m3u8$/g;
    
    if (mp4Regex.test(videoSrc)) {
      video.src = videoSrc
      video.type = "video/mp4"
      setIndexNum(index ? index : 0)
    } else if (m3u8Regex.test(videoSrc) && Hls.isSupported()) {
      
      let hls = new Hls();
      
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      setIndexNum(index ? index : 0)

    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc;
    }
  }




  const getName = (url: string) => {
    const fileNameRegex = /(?<=\/)\w+(?=.[a-z0-9$])/gi;
    let fileName = url.match(fileNameRegex)?.pop()?.replace(/_/g, ' ');
    let arr = fileName?.split(" ");
    for (let i = 0; i < arr!.length; i++) {
      arr![i] = arr![i].charAt(0).toUpperCase() + arr![i].slice(1)
    }
    return arr?.toString().replace(/,/g, ' ');
  }

  return (
    <div className="index-div">
      <Head>
        <title>Daniel Molloy's Video Player</title>
      </Head>
      <Header />
      <VideoPlayer 
        getName={(e: string) => getName(e)}
        indexNum={indexNum}
        videoArr={videoArr} 
        setIndexNum={(e: any) => setIndexNum(e)} 
        setUp={(e: any) => setUp(e)}
        />

      <Playlist 
        indexNum={indexNum}
        getName={(e: string) => getName(e)}
        videoArr={videoArr} 
        setUp={(e: any) => setUp(e)}/>
    </div>
  )
}

export default Home
