import { collection, doc, getDoc, getDocs, getFirestore, limit, orderBy, query, where } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import OtherProject from '@/components/OtherProject'
import { LinkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Head from 'next/head'
import { easeInOut } from 'framer-motion'


const Detail = ({ data, otherData }) => {
    const router = useRouter()
    const [index, setIndex] = useState(0)
    if (!data) {
        router.push('/')
    }
    useEffect(() => {
        var images = document.querySelectorAll('.image')
        new simpleParallax(images, {
            scale: 1.1,
            transition: easeInOut
        });
    }, [])

    return (


        <div className='overflow-hidden'>

            <Head>
                <title>Projet - {data.title}</title>
            </Head>
            <h1 className='text-white uppercase text-4xl md:text-5xl lg:text-6xl xl:text-7xl w-4/5 mx-auto mt-32 font-antigua'>{data.title} - {data.year}</h1>
            <div className='flex flex-col md:flex-row w-full md:w-4/5  pt-10 gap-4 mx-auto'>
                <img src={data.images && data.images[index]} className='image max-h-full w-full object-contain h-full cursor-none' />
            </div>
            <div className='flex flex-col w-4/5 mx-auto'>
                <div className='flex justify-between'>
                    <p className='text-[#757575] uppercase text-2xl mt-10'>Projet {data.type}</p>
                    <div className="flex justify-between items-center mt-10">
                        {data?.link && <Link href={data.link} className="flex gap-2">Voir le projet <LinkIcon className='h-6' /></Link>}
                    </div>
                </div>
                <div data-aos="fade-up">
                    <div className="flex w-full justify-between mt-10">
                        <h2 className='text-[#757575] uppercase text-2xl'>Langage/Logiciel utilisé</h2>
                        <span className='text-[#757575] uppercase text-2xl'>01</span>
                    </div>
                    <p className='text-lg md:text-2xl pt-6'>{data.langage}</p>
                </div>
                <span className='w-full h-[2px] bg-[#757575] my-6'></span>
                <div data-aos="fade-up">
                    <div className="flex w-full justify-between">
                        <h3 className='text-[#757575] uppercase text-2xl'>Tags</h3>
                        <span className='text-[#757575] uppercase text-2xl'>02</span>
                    </div>
                    <p className='text-lg md:text-2xl flex gap-2 pt-6'>{data.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                    ))}</p>
                </div>
                <span className='w-full h-[2px] bg-[#757575] my-6'></span>
                <div data-aos="fade-up">
                    <div className="flex w-full justify-between">
                        <h3 className='text-[#757575] uppercase text-2xl'>Année</h3>
                        <span className='text-[#757575] uppercase text-2xl'>03</span>
                    </div>
                    <p className='text-lg md:text-2xl pt-6'>{data.year}</p>
                </div>
                <span className='w-full h-[2px] bg-[#757575] my-6'></span>
                <div data-aos="fade-up">
                    <div className="flex w-full justify-between mb-6">
                        <h3 className='text-[#757575] uppercase text-2xl'>Description du projet</h3>
                        <span className='text-[#757575] uppercase text-2xl '>04</span>
                    </div>
                    {data.desc.split('\\n').map((paragraph) => (
                        <p className='text-lg md:text-2xl first-letter:uppercase' key={paragraph}>{paragraph}</p>
                    ))}
                </div>
                <span className='w-full h-[2px] bg-[#757575] my-6'></span>
                <div data-aos="fade-up">
                    <div className="flex w-full justify-between mb-6">
                        <h3 className='text-[#757575] uppercase text-2xl'>Visuels du projet</h3>
                        <span className='text-[#757575] uppercase text-2xl '>05</span>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-10 mx-auto w-full md:w-4/5'>
                {data.images?.map((item, i) => (
                    <div key={i} className={i === index ? 'hidden' : 'flex '}>
                        <img src={item} className='image w-full object-contain cursor-none' />
                    </div>
                ))}
            </div>
            <div className='flex flex-col w-4/5 mx-auto'>
                <span className='w-full h-[2px] bg-[#757575] my-6'></span>
                <p className='text-xl md:text-2xl uppercase'>Copyright &copy; Quentin Heinis</p>
            </div>

            <div data-aos="fade-up">
                <OtherProject props={otherData} />
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
    let otherData = []
    const q = query(collection(firestore, "projets"), where("title", "!=", data.title), limit(1));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) =>
        otherData.push({ id: doc.id, ...doc.data() }
        ))
    const storage = getStorage();
    const spaceRef = ref(storage, otherData[0].images[0]);
    await getDownloadURL(spaceRef)
        .then((url) => {
            otherData[0].images[0] = url;
        })



    return {
        props: { data, otherData }
    }
}

export default Detail