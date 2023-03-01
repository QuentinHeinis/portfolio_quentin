import Gestion from '@/components/Gestion'
import Login from '@/components/Login'
import useAuthStore from '@/store/authStore'
import { getFirestore, collection, query, onSnapshot, orderBy, getDocs } from 'firebase/firestore'
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
    const firestore = getFirestore()
    const querySnapshot = await getDocs(collection(firestore, "projets"));
    querySnapshot.forEach((doc) => {
        let tempData = { id: doc.id, ...doc.data() }
        data.push(tempData)
    });
    return {
        props: { data }
    }
}
export default Admin