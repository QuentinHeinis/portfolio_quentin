import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React, { useState } from 'react'

const ProjetPres = ({ props }) => {
    let projet = props
    const [index, setIndex] = useState(0)
    const [viewDetails, setViewDetails] = useState(false)
    return (
        <div className='flex flex-col items-center'>
            <div className='flex flex-col md:flex-row h-[75vh] w-4/5  pt-10 gap-4'>
                <div className='w-full md:w-4/5 h-full'>
                    <img src={projet.images && projet.images[index]} className='max-h-full w-full object-contain h-full' />
                </div>
                <div className='w-full md:mt-0 gap-1 md:w-1/5  flex md:flex-col justify-center md:gap-10'>
                    {projet.images?.map((item, i) => (
                        <img key={i} src={item} className={i === index ? 'hidden' : 'block w-full max-w-[50%] md:max-w-full object-contain cursor-pointer'} onClick={() => setIndex(i)} />
                    ))}
                </div>
            </div>
            <div className='flex flex-col w-4/5 mx-auto'>
                <p className='text-[#757575] uppercase text-2xl mt-6'>Projet {projet.type}</p>
                <h1 className='text-white uppercase text-4xl'>{projet.title} - {projet.year}</h1>
                <span className='w-full h-[2px] bg-[#757575] my-3'></span>
                <div className="flex w-full justify-between cursor-pointer" onClick={() => { setViewDetails(prev => !prev) }}>
                    <h2 className='text-[#757575] uppercase text-2xl'>Description du projet</h2>
                    {viewDetails ? (<span className='text-[#757575] uppercase text-2xl'>01</span>) : (<span className='text-[#757575] uppercase text-2xl'>+</span>)}
                </div>
                {viewDetails && (
                    <div>{projet.desc.split('\\n').map((para) => (
                        <p className='first-letter:uppercase' key={para}>{para}</p>
                    ))}</div>
                )}

                <span className='w-full h-[2px] bg-[#757575] my-3'></span>
                <Link href={'/projet/' + projet.id} className="flex justify-end items-center gap-4 text-[#757575]">En lire plus<ArrowRightIcon className='h-3' /></Link>

            </div>
        </div>
    )
}

export default ProjetPres