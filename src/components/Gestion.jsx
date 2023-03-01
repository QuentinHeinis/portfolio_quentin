import useAuthStore from '@/store/authStore'
import React, { useState } from 'react'
import { getFirestore, collection, query, onSnapshot, orderBy } from 'firebase/firestore'

const Gestion = ({ props }) => {
    const [listeProjects, setListeProjects] = useState(props)
    const { removeUser } = useAuthStore()

    return (
        <>
            <button onClick={() => removeUser()} className='pt-40'>se déconnecter</button>
            <div className='w-screen '>
                <table className='mx-auto max-w-full'>
                    <thead className='h-14'>
                        <tr>
                            <td className='border border-white w-28 text-center'>name</td>
                            <td className='border border-white w-28 text-center'>logo</td>
                            <td className='border border-white w-28 text-center'>images</td>
                            <td className='border border-white w-28 text-center'>tags</td>
                            <td className='border border-white w-28 text-center'>type</td>
                            <td className='border border-white w-28 text-center'>description</td>
                            <td className='border border-white w-28 text-center'>n</td>
                        </tr>
                    </thead>
                    <tbody>
                        {listeProjects.map((projet) => (
                            <tr key={projet.id}>
                                <td className='border border-white w-28 text-center'>{projet.name}</td>
                                <td className='border border-white w-28'><img src={projet.logo} alt="" className='max-w-xs mx-auto' /></td>
                                <td className='border border-white w-28 text-center'>{projet.images.map(image => (
                                    <img src={image} key={image} alt="" className='max-w-xs' />
                                ))}</td>
                                <td className='border border-white w-28 text-center'>{projet.tags.map(tag => (
                                    <p key={tag}>{tag}</p>
                                ))}</td>
                                <td className='border border-white w-28 text-center'>{projet.type}</td>
                                <td className='border border-white w-28 text-center'>{projet.desc}</td>
                                <td className='border border-white w-28 text-center'>{projet.n}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Gestion