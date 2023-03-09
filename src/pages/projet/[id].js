import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import React, { useState } from 'react'
import { useRouter } from 'next/router'

const Detail = ({ data }) => {
    const router = useRouter()
    const [index, setIndex] = useState(0)
    if (!data) {
        router.push('/')
    }

    const [nSelected, setNSelected] = useState(0)
    const next = () => {
        if (nSelected < data.images.length - 1) {
            setNSelected(prev => prev + 1)
        } else {
            setNSelected(0)
        }
    }
    return (
        <div>
            <div className='hidden md:flex px-5 h-[90vh] pt-20'>
                <div className='w-4/5 h-full'>
                    <img src={data.images && data.images[index]} className='max-h-full w-full object-contain h-full' />
                </div>
                <div className='w-1/5 flex flex-col justify-between'>
                    {data.images?.map((item, i) => (
                        <img key={i} src={item} className={i === index ? 'hidden' : 'block w-full h-1/6 object-contain cursor-pointer'} onClick={() => setIndex(i)} />
                    ))}
                </div>
            </div>
            <div className="h-screen lg:h-[90vh] lg:pt-[15vh] w-screen mx-auto lg:w-[90vw]  overflow-hidden relative md:hidden">
                <div className='h-full flex transition-all duration-500' style={{ transform: `translate(-${nSelected * 100}%)` }} >
                    {data.images.map((image) => (
                        <div key={image} className="h-full w-full relative flex items-center justify-center flex-none">
                            <img src={image} className='object-cover h-full w-full lg:w-[90%]' />
                        </div>
                    ))}
                </div>
                <div className='absolute flex bottom-4 gap-2 right-1/2 translate-x-1/2 md:hidden'>
                    {data.images.map((item) => (
                        <span key={item} className='h-3 w-3 bg-white border cursor-pointer rounded-full'></span>
                    ))}
                </div>
            </div>
            <button type='button' onClick={next} className='uppercase text-2xl ml-[10vw] absolute bottom-0 md:hidden'>Next</button>
            <div className='flex flex-col w-4/5 mx-auto'>
                <p className='text-[#757575] uppercase text-2xl mt-10'>{data.type} Project</p>
                <h1 className='text-white uppercase text-4xl mt-10'>{data.title} - {data.year}</h1>
                <div class="flex w-full justify-between mt-24">
                    <h2 className='text-[#757575] uppercase text-2xl'>Language/Software used</h2>
                    <span className='text-[#757575] uppercase text-2xl'>01</span>
                </div>
                <p className='text-2xl pt-6'>{data.langage}</p>
                <span className='w-full h-[2px] bg-[#757575] my-6'></span>
                <div class="flex w-full justify-between">
                    <h3 className='text-[#757575] uppercase text-2xl'>Year</h3>
                    <span className='text-[#757575] uppercase text-2xl'>02</span>
                </div>
                <p className='text-2xl pt-6'>{data.year}</p>
                <span className='w-full h-[2px] bg-[#757575] my-6'></span>
                <div class="flex w-full justify-between mb-6">
                    <h3 className='text-[#757575] uppercase text-2xl'>Project Description</h3>
                    <span className='text-[#757575] uppercase text-2xl '>03</span>
                </div>
                {data.desc.split('\\n').map((paragraph) => (

                    <p className='text-2xl first-letter:uppercase'>{paragraph}</p>
                ))}
                <span className='w-full h-[2px] bg-[#757575] my-6'></span>
                <p className='text-2xl uppercase'>Copyright &copy; Quentin Heinis</p>
            </div>
        </div>
    )
}

export const getServerSideProps = async ({ params: { id } }) => {
    let data = null
    let temp = null
    const firestore = getFirestore();
    const docRef = doc(firestore, "projets", id);
    temp = await getDoc(docRef);

    if (temp.exists()) {
        data = temp.data()
        const storage = getStorage();
        for (let i = 0; i < data.images.length; i++) {
            const spaceRef = ref(storage, data.images[i]);
            await getDownloadURL(spaceRef)
                .then((url) => {
                    data.images[i] = url;
                })
        }
        const spaceRef = ref(storage, data.logo);
        await getDownloadURL(spaceRef)
            .then((url) => {
                data.logo = url;
            })
    }

    return {
        props: { data }
    }
}

export default Detail