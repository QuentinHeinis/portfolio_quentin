import Header from '@/components/Header'
import '@/styles/globals.css'
import { useEffect, useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { initializeApp } from "firebase/app";
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import Lenis from '@studio-freight/lenis'
import { useRouter } from 'next/router'
import Router from 'next/router';



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

  const [isLoading, setIsLoading] = useState()
  const router = useRouter()

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

    Router.onRouteChangeStart = () => {
      setIsLoading(true)
    }
    Router.onRouteChangeComplete = () => {
      setIsLoading(false)
    }
  }, [])


  return (
    <ReactLenis root>
      <div className='min-h-screen bg-black text-white font-sans'>
        <Header />
        {isLoading ? (
          <>
            <div className="flex items-center h-screen justify-center">
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                  className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span
                >
              </div>
            </div>
          </>
        ) :
          <Component {...pageProps} />
        }
      </div>
    </ReactLenis>

  )
}
