import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import useAuthStore from '@/store/authStore';

const Login = () => {
    const { addUser } = useAuthStore()
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const login = (e) => {
        e.preventDefault()
        const auth = getAuth()
        signInWithEmailAndPassword(auth, mail, password)
            .then((userCredential) => {
                const user = userCredential.user;
                addUser(user)
            })
            .catch((error) => {
                console.log(error);
            });

    }
    return (
        <form className='flex h-screen w-screen justify-center items-center '>
            <div className="flex flex-col w-4/5 lg:w-1/2 gap-10 items-center bg-white bg-opacity-50 rounded-lg px-6 py-12">
                <input type="email" onChange={e => setMail(e.target.value)} className='w-2/3 h-10 rounded-full bg-black px-4 py-2' />
                <input type="password" onChange={e => setPassword(e.target.value)} className='w-2/3 h-10 rounded-full bg-black px-4 py-2' />
                <button onClick={e => login(e)} className='flex bg-black px-4 py-2 rounded-full'>Se connecter</button>
            </div>
        </form>
    )
}

export default Login