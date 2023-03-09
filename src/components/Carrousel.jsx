import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import Link from 'next/link'
import React, { useState } from 'react'

const Items = ({ id, image, logo, type, name, tags }) => (
    <div className='h-full w-full relative flex items-center justify-center flex-none'>
        <Link href={'/projet/' + id} className="flex flex-col items-center gap-2 cursor-pointer">
            <div className='uppercase'>{type}</div>
            <h2 className='text-6xl font-bold font-antigua'>{name}</h2>
            <div className='uppercase flex gap-4 text-xs'>
                {tags.map((item) => (
                    <p className='border-white border rounded-full px-1 py-1' key={item}>{item}</p>

                ))}
            </div>
            <img src={logo} alt={name + "'s Logo"} className='h-16' />
            {/* <Link href="/" className='bg-red-500 bg-opacity-40 h-16 w-16 px-4 rounded-full flex items-center justify-center mt-4'>
                <img src="/images/fleche.svg" alt="" className='h-full w-full' />
            </Link> */}
        </Link>
        <div className='absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center -z-10'>
            <img src="/images/cach.png" alt="" className='hidden lg:block absolute top-0 -translate-y-2/3' />
            <img src="/images/cach.png" alt="" className='hidden lg:block  absolute bottom-0 translate-y-2/3' />
            <img src={image} alt={'photo du projet ' + name} className='object-cover h-full w-full lg:w-[90%]' />
        </div>
    </div>
)
const Carrousel = ({ props }) => {
    let items = props
    console.log(items)
    const [nSelected, setNSelected] = useState(0)
    const next = () => {
        if (nSelected < items.length - 1) {
            setNSelected(prev => prev + 1)
        } else {
            setNSelected(0)
        }
    }



    return (
        <div>
            <div className="h-screen lg:h-[90vh] lg:pt-[15vh] w-screen mx-auto lg:w-[90vw]  overflow-hidden relative">
                <div className='h-full flex transition-all duration-500' style={{ transform: `translate(-${nSelected * 100}%)` }} >
                    {items.map((item) => (
                        <Items key={item.title} id={item.id} name={item.title} logo={item.logo} type={item.type} tags={item.tags} image={item.images[0]} />
                    ))}
                </div>
                <div className='absolute flex bottom-16 md:bottom-2 gap-2 right-1/2 translate-x-1/2'>
                    {items.map((item) => (
                        <span key={item.title} className='h-3 w-3 bg-white border rounded-full' style={nSelected == item.n ? { backgroundColor: 'rgba(255,255,255,1)' } : { backgroundColor: 'rgba(255,255,255,0.4)' }}></span>
                    ))}
                </div>
            </div>
            <button type='button' onClick={next} className='uppercase text-2xl ml-[10vw] absolute bottom-2'>Next</button>
        </div>
    )
}

export default Carrousel