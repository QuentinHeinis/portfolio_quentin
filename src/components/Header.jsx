import Link from 'next/link'
import React, { useState } from 'react'

const Header = () => {
    const [menuOpen, setmenuOpen] = useState(true)
    const switchMenu = () => {
        setmenuOpen((prev) => !prev)
    }
    return (
        <header className='flex justify-between  pt-10 px-4 lg:px-24 w-screen fixed top-0 z-40'>
            <div className='flex lg:items-end flex-col lg:flex-row lg:gap-3'>
                <div className='flex flex-col lg:text-2xl'>
                    <div>
                        QUENTIN Heinis
                    </div>
                    <div>
                        PORTFOLIO 2022/2023
                    </div>
                </div>
                <div className='uppercase text-[#757575] text-xs lg:text-lg'>
                    Web develloper and programmer
                </div>
            </div>
            <div className='h-6 w-10 z-50 flex flex-col justify-between cursor-pointer relative' onClick={switchMenu} >
                <span className={`w-full h-1 bg-red-400 absolute top-0 transition-all duration-500 ${!menuOpen && 'rotate-45 top-1/2'}`} style={menuOpen ? { backgroundColor: 'white', transform: "rotation(90deg)" } : { backgroundColor: 'black' }}></span>
                <span className={`w-full h-1 bg-red-400 absolute bottom-0 transition-all duration-500 ${!menuOpen && 'rotate-[135deg] top-1/2'}`} style={menuOpen ? { backgroundColor: 'white' } : { backgroundColor: 'black' }}></span>
            </div>
            <div className='fixed top-0 bottom-0 right-0 left-0 bg-gray-100 flex flex-wrap justify-between items-center px-20 z-40 text-black uppercase transition-all duration-500' style={menuOpen ? { transform: 'translate(100%)' } : { transform: 'translate(0%)' }}>
                <div className='flex flex-col gap-20'>
                    <Link href="/" onClick={switchMenu}>
                        <div className='flex gap-10 items-center'>
                            <span className='text-xl'>01</span>
                            <div className="relative slash border-b-2 hover:pb-2 flex ">
                                <p className='text-9xl flex gap-4 pb-8 items-end leading-none relative z-10 slash0'>Works <img src="/images/flecheUp.svg" alt="" className='h-12 -translate-y-1/2' /></p>
                                <span className='bg-gray-100 absolute h-0 flex top-1/2 scale-x-110 -translate-y-1/2 w-full z-40 transition-all after:transition-all slash4'></span>

                                <span className='text-9xl flex gap-4 pb-8 items-end leading-none slash absolute top-0 transition-all slash1'>Works <img src="/images/flecheUp.svg" alt="" className='h-12 -translate-y-1/2' /></span>
                                <span className='text-9xl flex gap-4 pb-8 items-end leading-none slash absolute top-0 transition-all slash2'>Works <img src="/images/flecheUp.svg" alt="" className='h-12 -translate-y-1/2' /></span>
                            </div>
                        </div>
                    </Link>
                    <Link href="/" onClick={switchMenu}>
                        <div className='flex gap-10 items-center'>
                            <span className='text-xl'>02</span>
                            <div className="relative slash border-b-2 hover:pb-2 flex ">
                                <p className='text-9xl flex gap-4 pb-8 items-end leading-none relative z-10 slash0'>Contact <img src="/images/flecheUp.svg" alt="" className='h-12 -translate-y-1/2' /></p>
                                <span className='bg-gray-100 absolute h-0 flex top-1/2 scale-x-110 -translate-y-1/2 w-full z-40 transition-all after:transition-all slash4'></span>

                                <span className='text-9xl flex gap-4 pb-8 items-end leading-none slash absolute top-0 transition-all slash1'>Contact <img src="/images/flecheUp.svg" alt="" className='h-12 -translate-y-1/2' /></span>
                                <span className='text-9xl flex gap-4 pb-8 items-end leading-none slash absolute top-0 transition-all slash2'>Contact <img src="/images/flecheUp.svg" alt="" className='h-12 -translate-y-1/2' /></span>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='flex flex-col gap-14'>
                    <Link href='/'>
                        <p className='text-3xl uppercase font-medium'>Contact</p>
                        <span className='text-xl text-gray-400 normal-case'>E-mail</span>
                    </Link>
                    <Link href='/'>
                        <p className='text-3xl uppercase font-medium'>Social media</p>
                        <span className='text-xl text-gray-400 normal-case'>Linkedin</span>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header