import { useCollection } from 'react-firebase-hooks/firestore'
import { Firestore, addDoc, collection, limit, orderBy, query, serverTimestamp } from "firebase/firestore"
import Message from '../components/Message'
import Loading from '../components/Loading'
import { FormEvent, useState } from 'react'
import { getAuth } from 'firebase/auth'


export default function Chatroom({db}: {db: Firestore}) {
    const messagesRef = collection(db, "messages")
    const q = query(messagesRef, orderBy('createdAt'), limit(25))

    const [snapshot, loading] = useCollection(q)
    const [formValue, setFormValue] = useState('')

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const { uid, photoURL } = getAuth().currentUser!
        console.log(photoURL)

        await addDoc(messagesRef, {
            text: formValue,
            createdAt: serverTimestamp(),
            uid,
            photoURL
        })

        setFormValue('')
    }

    return (<>
    <h1>Messages</h1>
        {loading && <Loading />}
        {snapshot && snapshot.docs.map(msg => <Message key={msg.id} message={msg.data()}/>)}
        <form onSubmit={handleSubmit}>
            <input value={formValue} onChange={e => setFormValue(e.target.value)} type='text'/>
            <button type='submit'>Submit</button>
        </form>
    </>)
}
