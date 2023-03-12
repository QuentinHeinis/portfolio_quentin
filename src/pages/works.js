import ProjetPres from '@/components/ProjetPres'
import { collection, getDocs, getFirestore, query } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import Head from 'next/head'
import React, { useState } from 'react'


const works = ({ data }) => {
  const [index, setIndex] = useState(0)
  return (
    <div className='flex flex-col gap-6 pb-10'>
      <Head>
        <title>Projets</title>
      </Head>
      {data.map((projet) => (
        <ProjetPres props={projet} key={projet.title} />
      ))}
    </div>
  )
}
export const getServerSideProps = async () => {
  let data = []
  let temp = []
  const firestore = getFirestore()
  let q = query(collection(firestore, "projets"))
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