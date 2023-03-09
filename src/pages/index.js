import Carrousel from "@/components/Carrousel";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

export default function Home({ data }) {
  return (
    <>
      <div class="flex pt-10 px-4 lg:px-24 w-screen absolute top-0 z-30">
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
      </div>
      <Carrousel props={data} />
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
