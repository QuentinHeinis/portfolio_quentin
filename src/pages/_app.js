import Header from '@/components/Header'
import '@/styles/globals.css'
import { useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";
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
  const [isSSR, setIsSSR] = useState(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])
  if (isSSR) return null
  return (
    <div className='min-h-screen bg-black text-white font-sans'>
      <Header />
      <Component {...pageProps} />
    </div>
  )
}
