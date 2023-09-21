import { getAuth } from "firebase/auth"

type Message = {
    text: string
    uid: string
    createdAt: Date
    photoURL: string
}
export default function Message({message}: {message: Message}) {
    const {text, uid, photoURL} = message
    const auth = getAuth()
    const messageClass = uid == auth.currentUser!.uid? "sent": "recieved"
    return (<div className={messageClass}>
        {photoURL && <img src={photoURL} alt="user portait"/>}
        {text}
    </div>)
}