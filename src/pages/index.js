import Carrousel from "@/components/Carrousel";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

export default function Home({ data }) {
  return (
    <>
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
