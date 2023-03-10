import Head from 'next/head'
import ModalScreen from '../screens/ModalScreen';

export default function Modal() {
	return (
		<>
			<Head>
				<title>CollegePass - Account</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
				<link rel='canonical' href='https://www.collegepass.org/about' />
				<meta property='og:url' content='https://www.collegepass.org/terms' />
				<meta property='og:type' content='website' />
				<meta property='og:image' content='' />
				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:image' content='' />
			</Head>
			<main className="bg-black">
				<ModalScreen></ModalScreen>
			</main>
		</>
	)
}
