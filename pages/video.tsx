export default function Vid () {

  const setIt = () => {
    let video: any = document.getElementById('videoPlayer');
    video.src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    video.type="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  }

  return (
    <div>
      <p>Hi</p>
      <video id="videoPlayer" controls width="250">

Sorry, your browser doesn't support embedded videos.
</video>
    <button onClick={() => setIt()}>Click</button>
    </div>
  )
}