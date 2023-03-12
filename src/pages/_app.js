import Header from '@/components/Header'
import '@/styles/globals.css'
import { useEffect, useState } from 'react'


//import AOS

import AOS from 'aos';
import 'aos/dist/aos.css';


//import firebase

import { initializeApp } from "firebase/app";
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGE,
  appId: process.env.NEXT_PUBLIC_APPID
};
const app = initializeApp(firebaseConfig)



export default function App({ Component, pageProps }) {

  useEffect(() => {
    AOS.init()
    AOS.refresh()
  }, [])
  return (
    <div className='min-h-screen bg-black text-white font-sans'>
      {/* <ReactLenis root>
      </ReactLenis> */}
      <Header />
      <Component {...pageProps} />
    </div>

  )
}
