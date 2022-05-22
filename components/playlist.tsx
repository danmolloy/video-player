import Image from "next/image";

type PlaylistProps = {
  videoArr: {src: string, id: number, img: string}[], 
  indexNum: number, 
  setUp: Function, 
  getName: Function
}

export default function Playlist(props: PlaylistProps) {

  return (
    <div className="playlist-div">
      <h2 className="p-2">Your Playlist</h2>
      <div className="playlist-items">
        {props.videoArr.map((i: {src: string, img: string, id: number}) => (
          <button 
          className={props.videoArr[props.indexNum].src === i.src ? "playlist-item bg-blue-100" : "playlist-item"} 
          onClick={() => props.setUp(i.id)} key={i.src}>
            <p>{props.getName(i.src)}</p>
            <Image alt="Video thumbnail" src={i.img} width={642/3} height={362/3}/>
            </button>
          ))}
        </div>
  </div>
  )
}