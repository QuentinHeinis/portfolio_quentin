import Header from '@/components/Header'
import '@/styles/globals.css'
import { useEffect, useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { initializeApp } from "firebase/app";
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import Lenis from '@studio-freight/lenis'
import { SwitchTransition, Transition } from 'react-transition-group'
import gsap from 'gsap'
import { useRouter } from 'next/router'

function ScrollListener() {
  useLenis(({ scroll }) => {
    // console.log('Current scroll position', scroll)
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


  //lenis setup

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



  const router = useRouter()

  const onPageEnter = (element) => {
    gsap.fromTo(
      element,
      {
        y: 50,
        autoAlpha: 0,
        ease: 'power3.out',
      },
      {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: 'power3.out',
      }
    )
  }

  const onPageExit = (element) => {
    gsap.fromTo(
      element,
      {
        y: 0,
        autoAlpha: 1,
        ease: 'power3.out',
      },
      {
        y: -50,
        autoAlpha: 0,
        duration: 0.5,
        ease: 'power3.inOut',
      }
    )
  }


  return (
    <ReactLenis root>
      <div className='min-h-screen bg-black text-white font-sans'>
        <Header />
        <SwitchTransition>
          <Transition
            key={router.pathname}
            timeout={500}
            in={true}
            onEnter={onPageEnter}
            onExit={onPageExit}
            mountOnEnter={true}
            unmountOnExit={true}>
            <Component {...pageProps} />
          </Transition>
        </SwitchTransition>
      </div>
    </ReactLenis>

  )
}
