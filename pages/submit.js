
import Head from 'next/head'
import SubmitScreen from '../screens/LandingFormScreen/SubmitScreen';


export default function Submit() {
	return (
		<>
			<Head>
				<title>CollegePass - Thank You</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
				<link rel='canonical' href='https://www.collegepass.org/about' />
				<meta property='og:url' content='https://www.collegepass.org/terms' />
				<meta property='og:type' content='website' />
				<meta property='og:image' content='' />
				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:image' content='' />
			</Head>
			<main>
				<SubmitScreen></SubmitScreen>
			</main>
		</>
	)
}
