import Head from 'next/head'
import NewLandingScreen from '../../screens/NewLandingScreen';

import { useRouter } from 'next/router'

export default function Registration() {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>CollegePass - Registration</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://www.collegepass.org/about" />
        <meta property="og:url" content="https://www.collegepass.org/terms" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="" />
      </Head>
      <main>
        {/* <EventRegistrationSuccessScreen
          eventID={router.query.eventID}
        ></EventRegistrationSuccessScreen> */}
         <div>
      <NewLandingScreen
        eventID={router.query.eventID}
      >
        </NewLandingScreen>
      </div>

      </main>
    </>
  )
}
