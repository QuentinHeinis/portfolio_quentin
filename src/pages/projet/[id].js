import { collection, doc, getDoc, getDocs, getFirestore, limit, query, where } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import OtherProject from '@/components/OtherProject'

const Detail = ({ data, otherData }) => {
    console.log(otherData)
    const router = useRouter()
    const [index, setIndex] = useState(0)
    if (!data) {
        router.push('/')
    }
    return (
        <div>
            <div className='flex h-[75vh] w-4/5 mx-auto pt-20 gap-4'>
                <div className='w-4/5 h-full'>
                    <img src={data.images && data.images[index]} className='max-h-full w-full object-contain h-full' />
                </div>
                <div className='w-1/5 flex flex-col justify-center'>
                    {data.images?.map((item, i) => (
                        <img key={i} src={item} className={i === index ? 'hidden' : 'block w-full h-1/6 object-contain cursor-pointer'} onClick={() => setIndex(i)} />
                    ))}
                </div>
            </div>
            <div className='flex flex-col w-4/5 mx-auto'>
                <p className='text-[#757575] uppercase text-2xl mt-10'>{data.type} Project</p>
                <h1 className='text-white uppercase text-4xl mt-10'>{data.title} - {data.year}</h1>
                <div className="flex w-full justify-between mt-24">
                    <h2 className='text-[#757575] uppercase text-2xl'>Language/Software used</h2>
                    <span className='text-[#757575] uppercase text-2xl'>01</span>
                </div>
                <p className='text-2xl pt-6'>{data.langage}</p>
                <span className='w-full h-[2px] bg-[#757575] my-6'></span>
                <div className="flex w-full justify-between">
                    <h3 className='text-[#757575] uppercase text-2xl'>Year</h3>
                    <span className='text-[#757575] uppercase text-2xl'>02</span>
                </div>
                <p className='text-2xl pt-6'>{data.year}</p>
                <span className='w-full h-[2px] bg-[#757575] my-6'></span>
                <div className="flex w-full justify-between mb-6">
                    <h3 className='text-[#757575] uppercase text-2xl'>Project Description</h3>
                    <span className='text-[#757575] uppercase text-2xl '>03</span>
                </div>
                {data.desc.split('\\n').map((paragraph) => (

                    <p className='text-2xl first-letter:uppercase'>{paragraph}</p>
                ))}
                <span className='w-full h-[2px] bg-[#757575] my-6'></span>
                <p className='text-2xl uppercase'>Copyright &copy; Quentin Heinis</p>
            </div>

            <OtherProject props={otherData} />
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