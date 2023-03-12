import Header from '@/components/Header'
import '@/styles/globals.css'
import { useEffect, useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { initializeApp } from "firebase/app";
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import Lenis from '@studio-freight/lenis'

function ScrollListener() {
  useLenis(({ scroll }) => {
    console.log('Current scroll position', scroll)
  })

  return null
}


//config firebase


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
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical', // vertical, horizontal
      gestureDirection: 'vertical', // vertical, horizontal, both
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })



    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    AOS.init()
    AOS.refresh()
  }, [])
  return (
    <ReactLenis root>
      <div className='min-h-screen bg-black text-white font-sans'>
        <Header />
        <Component {...pageProps} />
      </div>
    </ReactLenis>

  )
}
