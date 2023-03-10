import Head from 'next/head'
import VimeoVideoScreen from '../../../screens/PlayVideoScreen'
import YoutubeVideoScreen from '../../../screens/PlayVideoScreen/YoutubeScreen'
import { useRouter } from 'next/router'

function PlayVideo() {
  const router = useRouter()

  // console.log('sourcetype', router.query.sourcetype)
  return (
    <>
      <Head>
        <title>CollegePass | Get Into Your Dream Colleg</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {router.query.sourcetype === 'youtube' ? (
          <YoutubeVideoScreen
            title={router.query.title}
            videoID={router.query.videoID}
          ></YoutubeVideoScreen>
        ) : (
          <VimeoVideoScreen
            title={router.query.title}
            videoID={router.query.videoID}
          ></VimeoVideoScreen>
        )}
      </main>
    </>
  )
}

export default PlayVideo
