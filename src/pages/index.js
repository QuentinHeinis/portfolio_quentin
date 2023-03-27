import Carrousel from "@/components/Carrousel";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import Head from "next/head";
import Link from "next/link";

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>Quentin Heinis</title>
      </Head>
      <Carrousel props={data} />
      <Link href="/works" className="flex items-center uppercase text-2xl mr-[10vw] right-0 absolute bottom-2 gap-2">Voir tout<ArrowRightCircleIcon className="h-6 rotate-45" /></Link>
    </>
  )

}
export const getServerSideProps = async () => {
  let data = []
  let temp = []
  const firestore = getFirestore()
  let q = query(collection(firestore, "projets"), where("n", "!=", ""))
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
