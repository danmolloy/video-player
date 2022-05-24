// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  videos: {src: string, img: string, id: number, type: string}[]
}

const videos = [
  {
    src: "https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8",
    img: "/image1.png",
    id: 0,
    type: "application/x-mpegURL"
  },
  {
  src: "https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/index_0_av.m3u8",
  img: "/image3.png",
  id: 1,
  type: "application/x-mpegURL"
},
  { src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  img: "/image2.png",
  id: 2,
  type: "video/mp4"
},
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ videos })
}
