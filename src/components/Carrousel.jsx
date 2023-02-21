import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Items = ({ num }) => (
    <div className='h-full w-full relative flex items-center justify-center flex-none'>
        <div className="flex flex-col items-center">
            <div className='uppercase'>Identity</div>
            <h2 className='text-3xl font-bold'>Osaka n°{num}</h2>
            <Link href="/" className='bg-black bg-opacity-40 h-10 w-10 rounded-full flex items-center justify-center mt-4'>
                <img src="/images/fleche.svg" alt="" className='' />
                {/* <span className='h-[1px] w-4 bg-white block relative after:h-2 after:w-2  after:border-b after:border-r after:-rotate-45 after:top-1/2 after:right-0 after:-translate-y-1/2 after:absolute after:block '></span> */}
            </Link>
        </div>
        <div className='absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center -z-10'>
            <img src="/images/cach.png" alt="" className='hidden lg:block absolute top-0 -translate-y-2/3' />
            <img src="/images/cach.png" alt="" className='hidden lg:block  absolute bottom-0 translate-y-2/3' />
            <img src="/images/testD.png" alt="" className='object-cover h-full w-full lg:w-[90%]' />
        </div>
    </div>
)
const Carrousel = () => {
    const [nSelected, setNSelected] = useState(0)
    const items = [1, 2, 3, 4]
    useEffect(() => {
        setInterval(() => {
            if (nSelected == 0) { setNSelected(1) }
            if (nSelected == 1) { setNSelected(2) }
            if (nSelected == 2) { setNSelected(3) }
            if (nSelected == 3) { setNSelected(0) }
        }, 5000);
    }, [nSelected])


    return (
        <div className="h-screen lg:h-[90vh] lg:pt-[15vh] w-screen mx-auto lg:w-[90vw]  overflow-hidden relative">
            <div className='h-full flex transition-all duration-500' style={{ transform: `translate(-${nSelected * 100}%)` }} >
                {items.map((item) => (
                    <Items key={item} num={item} />
                ))}
            </div>
            <div className='absolute flex bottom-4 gap-2 right-1/2 translate-x-1/2'>
                {items.map((item) => (
                    <span key={item} className='h-3 w-3 bg-white border rounded-full' style={nSelected == item - 1 ? { backgroundColor: 'rgba(255,255,255,1)' } : { backgroundColor: 'rgba(255,255,255,0.4)' }} onClick={() => { setNSelected(item - 1) }}></span>
                ))}
            </div>
        </div>
    )
}

export default Carrousel