import useAuthStore from '@/store/authStore'
import React, { useState } from 'react'
import { getFirestore, collection, addDoc, deleteDoc, doc } from 'firebase/firestore'
import { deleteObject, getStorage, ref, uploadString } from 'firebase/storage'
import { useRouter } from 'next/router'
import { TrashIcon } from '@heroicons/react/24/outline'

const Gestion = ({ props }) => {
    const router = useRouter()
    const [listeProjects, setListeProjects] = useState(props)
    const [AddProject, setAddProject] = useState(true)

    const [imagesData, setimagesData] = useState()
    const [logoData, setlogoData] = useState()
    const [desc, setdesc] = useState('')
    const [title, settitle] = useState('')
    const [langage, setlangage] = useState('')
    const [year, setyear] = useState('')
    const [type, settype] = useState('')
    const [tags, settags] = useState('')
    const [isHomepage, setisHomepage] = useState('')
    const [plink, setplink] = useState('')
    const { removeUser } = useAuthStore()
    const upload = async (e) => {
        e.preventDefault()
        let imagesPath = []
        const storage = getStorage()
        let i = 0
        for (let i = 0; i < imagesData.length; i++) {
            const refStorage = ref(storage, `${title}/` + title + i)
            await uploadString(refStorage, imagesData[i], 'data_url').then((snapshot) => {
                imagesPath.push(snapshot.metadata.fullPath)
            })
        }
        let logoPath = ''
        const refStorage = ref(storage, `${title}/` + title + "Logo")
        await uploadString(refStorage, logoData, 'data_url').then((snapshot) => {
            logoPath = snapshot.metadata.fullPath
        })
        let projet = {
            images: imagesPath,
            logo: logoPath,
            desc: desc.replace("\n", "\\n"),
            title: title,
            langage: langage,
            year: year,
            type: type,
            tags: tags.split('\n'),
            n: isHomepage,
            link: plink
        }
        const db = getFirestore();
        const docRef = await addDoc(collection(db, 'projets'), projet);
        router.push("/projet/" + docRef.id)
    }

    const SetImagesData = (e) => {
        const files = e.target.files
        let images = []
        for (let i = 0; i < files.length; i++) {
            var reader = new FileReader()
            reader.onload = (e) => {
                images.push(e.target.result)
            }
            reader.readAsDataURL(files[i])
        }
        setimagesData(images)
    }
    const SetLogoData = (e) => {
        const files = e.target.files
        var reader = new FileReader()
        reader.onload = (e) => {
            setlogoData(e.target.result)
        }
        reader.readAsDataURL(files[0])
    }
    const removeProjet = async (projet) => {
        if (window.confirm('Tu es sur le point de supprimer le projet ' + projet.title)) {

            const firestore = getFirestore();
            await deleteDoc(doc(firestore, "projets", projet.id));
            const storage = getStorage();
            let docRef = ref(storage, projet.logo);
            await deleteObject(docRef);
            for (let i = 0; i < projet.images.length; i++) {
                let docRef = ref(storage, projet.images[i]);
                await deleteObject(docRef);
            }
            window.location.reload()
        }
    }
    return (
        <div>
            <div className='flex justify-between w-full pt-40 px-14'>
                <button onClick={() => removeUser()} >se déconnecter</button>
                {AddProject ? <button onClick={() => setAddProject(prev => !prev)} >Add</button> :
                    <button onClick={() => setAddProject(prev => !prev)} >Cancel</button>}
            </div>
            {AddProject ?
                <div className='w-screen '>
                    <h1 className='text-2xl text-center pb-10'>Projets</h1>
                    <div className="flex max-w-full overflow-x-scroll px-20">
                        <table className='mx-auto max-w-full'>
                            <thead className='h-14'>
                                <tr>
                                    <td className='border border-white w-28 text-center'>name</td>
                                    <td className='border border-white w-28 text-center'>logo</td>
                                    <td className='border border-white w-28 text-center'>images</td>
                                    <td className='border border-white w-28 text-center'>tags</td>
                                    <td className='border border-white w-28 text-center'>type</td>
                                    <td className='border border-white w-28 text-center'>langage/logiciel</td>
                                    <td className='border border-white w-28 text-center'>description</td>
                                    <td className='border border-white w-28 text-center'>lien</td>
                                    <td className='border border-white w-28 text-center'>n</td>
                                    <td className='border border-white w-28 text-center'>edit</td>

                                </tr>
                            </thead>
                            <tbody>
                                {listeProjects.map((projet) => (
                                    <tr key={projet.id}>
                                        <td className='border border-white w-28 text-center'>{projet.title}</td>
                                        <td className='border border-white w-28'><img src={projet.logo} alt="" className='max-w-xs mx-auto' /></td>
                                        <td className='border border-white w-28 text-center'>{projet.images.map(image => (
                                            <img src={image} key={image} alt="" className='max-w-xs' />
                                        ))}</td>
                                        <td className='border border-white w-28 text-center'>{projet.tags.map(tag => (
                                            <p key={tag}>{tag}</p>
                                        ))}</td>
                                        <td className='border border-white w-28 text-center'>{projet.type}</td>
                                        <td className='border border-white w-28 text-center'>{projet.langage}</td>
                                        <td className='border border-white w-28 text-center'>{projet.desc.replace('\\n', '\n')}</td>
                                        <td className='border border-white w-28 text-center'>{projet.link}</td>
                                        <td className='border border-white w-28 text-center'>{projet.n}</td>
                                        <td className='border border-white w-28'>
                                            <div className='flex justify-center items-center'>
                                                <TrashIcon className='h-10' onClick={() => removeProjet(projet)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div> :
                <div>
                    <h1 className='text-center text-2xl'>Ajouter un projet</h1>
                    <form onSubmit={upload} className="text-black">
                        <div className="flex flex-col w-1/3 gap-3 mx-auto">
                            <div className="flex">
                                <label></label>
                                <input type="file" accept='image/png,image/jpeg,image/webp,image/gif' multiple onChange={SetImagesData} required />
                            </div>
                            <input type="file" accept='image/png,image/jpeg,image/webp,image/gif' onChange={SetLogoData} required />
                            <input type="text" placeholder='Titre' onChange={e => settitle(e.target.value)} required />
                            <input type="text" placeholder='Logiciel/langage' onChange={e => setlangage(e.target.value)} required />
                            <input type="text" placeholder='Année' onChange={e => setyear(e.target.value)} required />
                            <input type="text" placeholder='Type de projet' onChange={e => settype(e.target.value)} required />
                            <textarea placeholder='Description' onChange={e => setdesc(e.target.value)} required></textarea>
                            <textarea placeholder='tags' onChange={e => settags(e.target.value)} required></textarea>
                            <input type="number" placeholder='n' onChange={e => setisHomepage(e.target.value)} />
                            <input type="text" placeholder='Lien du projet' onChange={e => setplink(e.target.value)} />
                                            
                            <button className='bg-white'>Upload</button>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

export default Gestion