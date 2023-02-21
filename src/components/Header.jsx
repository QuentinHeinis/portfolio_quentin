import React from 'react'

const Header = () => {
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
            <button className='h-5 w-5 bg-white'>

            </button>
        </header>
    )
}

export default Header