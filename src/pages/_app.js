import Header from '@/components/Header'
import '@/styles/globals.css'
import { useEffect, useState } from 'react'

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
