import type { NextPage } from "next"
import Hls from "hls.js"
import { useState } from "react"
import VideoPlayer from "../components/videoPlayer"
import Playlist from "../components/playlist"
import Head from "next/head"
import Header from "../components/header"
import useSWR from 'swr'

const fetcher: any = (url: string) => fetch(url).then((res) => res.json())

const Home: NextPage = () => {
  const { data, error } = useSWR("/api/videos", fetcher)
  const [indexNum, setIndexNum] = useState(0)
  
  let hls: any;
  let video: any;

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  const setUp = (index: number) => {
    if (video !== undefined) {
      video.pause()
      video.removeAttribute('src')
      video.removeAttribute('type')
      video.load()
    }
    if (hls !== undefined) {
      hls.destroy()
    } 

    video = document.getElementById("video");
    let videoSrc = data.videos[index].src
    setIndexNum(index)
    const mp4Regex = /.mp4$/g;
    const m3u8Regex = /.m3u8$/g;

    if (mp4Regex.test(videoSrc)) {
      hls = new Hls();
      video.src = videoSrc
      video.type = "video/mp4"
    }  else if (m3u8Regex.test(videoSrc) && Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoSrc;
    }
  }

  const getName = (url: string) => {
    const fileNameRegex = /(?<=\/)\w+(?=.[a-z0-9$])/gi;
    let fileName = url.match(fileNameRegex)?.pop()?.replace(/_/g, " ");
    let arr = fileName?.split(" ");
    for (let i = 0; i < arr!.length; i++) {
      arr![i] = arr![i].charAt(0).toUpperCase() + arr![i].slice(1)
    }
    return arr?.toString().replace(/,/g, " ");
  }

  return (
    <div className="index-div">
      <Head>
        <title>Daniel Molloy Video Player</title>
      </Head>
      <Header />
      <VideoPlayer 
        getName={(e: string) => getName(e)}
        indexNum={indexNum}
        videoArr={data.videos} 
        setUp={(e: any) => setUp(e)}
        />
      <Playlist 
        indexNum={indexNum}
        getName={(e: string) => getName(e)}
        videoArr={data.videos} 
        setUp={(e: any) => setUp(e)}/>
    </div>
  )
}

export default Home
