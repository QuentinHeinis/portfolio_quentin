import Gestion from '@/components/Gestion'
import Login from '@/components/Login'
import useAuthStore from '@/store/authStore'
import { getFirestore, collection, query, getDocs, where } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import React from 'react'

const Admin = ({ data }) => {
    const { userProfile } = useAuthStore()
    return (
        <>
            {userProfile ? <Gestion props={data} /> : <Login />}
        </>
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
export default Admin