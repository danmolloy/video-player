import Image from "next/image";

export default function Playlist(props: any) {

  return (
    <div className="playlist-div">
      <h2 className="p-2">Your Playlist</h2>
      <div className="playlist-items">
        {props.videoArr.map((i: {src: string, img: string}) => (
          <button className={props.videoArr[props.indexNum].src === i ? "playlist-item bg-blue-100" : "playlist-item"} onClick={() => props.setUp(props.videoArr.indexOf(i))} key={i.src}>
            <p>{props.getName(i.src)}</p>
            <Image src={i.img} width={642/3} height={362/3}/>
            </button>
          ))}
        </div>
  </div>
  )
}