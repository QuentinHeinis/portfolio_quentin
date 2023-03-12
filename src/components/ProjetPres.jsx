import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React, { useState } from 'react'

const ProjetPres = ({ props }) => {
    let projet = props
    const [index, setIndex] = useState(0)
    const [viewDetails, setViewDetails] = useState(false)
    return (
        <div className='flex flex-col'>
            <div className='flex px-5 h-[75vh] pt-10'>
                <div className='w-4/5 h-full'>
                    <img src={projet.images && projet.images[index]} className='max-h-full w-full object-contain h-full' />
                </div>
                <div className='w-1/5 flex flex-col justify-between'>
                    {projet.images?.map((item, i) => (
                        <img key={i} src={item} className={i === index ? 'hidden' : 'block w-full h-1/6 object-contain cursor-pointer'} onClick={() => setIndex(i)} />
                    ))}
                </div>
            </div>
            <div className='flex flex-col w-4/5 mx-auto'>
                <p className='text-[#757575] uppercase text-2xl mt-6'>{projet.type} Project</p>
                <h1 className='text-white uppercase text-4xl'>{projet.title} - {projet.year}</h1>
                <span className='w-full h-[2px] bg-[#757575] my-3'></span>
                <div className="flex w-full justify-between cursor-pointer" onClick={() => { setViewDetails(prev => !prev) }}>
                    <h2 className='text-[#757575] uppercase text-2xl'>Project Description</h2>
                    {viewDetails ? (<span className='text-[#757575] uppercase text-2xl'>01</span>) : (<span className='text-[#757575] uppercase text-2xl'>+</span>)}
                </div>
                {viewDetails && (
                    <div>{projet.desc.split('\\n').map((para) => (
                        <p className='first-letter:uppercase'>{para}</p>
                    ))}</div>
                )}

                <span className='w-full h-[2px] bg-[#757575] my-3'></span>
                <Link href={'/projet/' + projet.id} className="flex justify-end items-center gap-4 text-[#757575]">See More <ArrowRightIcon className='h-3' /></Link>

            </div>
        </div>
    )
}

export default ProjetPres