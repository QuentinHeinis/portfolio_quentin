import Link from 'next/link'
import React from 'react'

const OtherProject = ({ props }) => {
  let data = props[0]
  return (
    <div className='w-4/5 mx-auto py-10'>
      <h3 className='text-2xl md:text-5xl uppercase text-center py-10'>En voir davantages ?</h3>
      <Link href={'/projet/' + data.id} className='relative block'>
        <img src={data.images[0]} />
        <div className='flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <p className='uppercase text-center'>{data.type}</p>
          <p className='text-2xl md:text-6xl font-bold font-antigua text-center'>{data.title}</p>
        </div>
      </Link>
    </div>
  )
}

export default OtherProject