import ProjetPres from '@/components/ProjetPres'
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import Head from 'next/head'
import React, { useState } from 'react'


const works = ({ data }) => {
  const [index, setIndex] = useState(0)
  return (
    <div className='pb-10 flex'>
      <Head>
        <title>Projets</title>
      </Head>
      <div className='mt-32 flex flex-col gap-6'>
        <h1 className='text-white uppercase text-4xl md:text-5xl lg:text-6xl xl:text-7xl w-4/5 mx-auto font-antigua'>Mes projets</h1>
        {data.map((projet) => (
          <ProjetPres props={projet} key={projet.title} />
        ))}
      </div>
    </div>
  )
}
export const getServerSideProps = async () => {
  let data = []
  let temp = []
  const firestore = getFirestore()
  let q = query(collection(firestore, "projets"), orderBy('year', 'desc'))
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    temp.push({ id: doc.id, ...doc.data() })
  });
  for (let i = 0; i < temp.length; i++) {
    const storage = getStorage();
    for (let j = 0; j < temp[i].images.length; j++) {
      const spaceRef = ref(storage, temp[i].images[j]);
      await getDownloadURL(spaceRef)
        .then((url) => {
          temp[i].images[j] = url;
        })
    }
    const spaceRef = ref(storage, temp[i].logo);
    await getDownloadURL(spaceRef)
      .then((url) => {
        temp[i].logo = url;
      })
    data.push(temp[i])
  }

  return {
    props: { data }
  }
}
export default works