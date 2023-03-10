import Head from 'next/head'
import MyClassScreen from '../screens/MyClassScreen'
import axios from 'axios'
import { APIgetLiveClass, APIgetArchiveClass } from '../config/API'

function MyClass({ upcomingLiveClasses = [], archviedClasses = [] }) {
  return (
    <>
      <Head>
        <title>CollegePass | Get Into Your Dream College</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <MyClassScreen
          upcomingLiveStreams={upcomingLiveClasses}
          recordedLiveStreams={archviedClasses}
        ></MyClassScreen>
      </main>
    </>
  )
}

export default MyClass
export async function getStaticProps() {
  const upcomingLiveClasses = await axios.get(APIgetLiveClass)
  const archivedClasses = await axios.get(APIgetArchiveClass)

  return {
    props: {
      upcomingLiveClasses: upcomingLiveClasses.data.data,
      archviedClasses: archivedClasses.data.data,
    }, // will be passed to the page component as props
    revalidate: 5,
  }
}
