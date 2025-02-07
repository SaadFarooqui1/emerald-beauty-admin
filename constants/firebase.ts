// import { initializeApp, FirebaseApp } from 'firebase/app'
// import {
//     Messaging,
//     getMessaging,
//     getToken,
//     onMessage,
// } from 'firebase/messaging'
// import 'firebase/auth'

// const firebaseConfig = {
//     apiKey: 'AIzaSyCAbITsb8xhNfHF5wgj5AmXrFjWLQqFLgU',
//     authDomain: 'inabudhabistore.firebaseapp.com',
//     projectId: 'inabudhabistore',
//     storageBucket: 'inabudhabistore.appspot.com',
//     messagingSenderId: '779483022914',
//     appId: '1:779483022914:web:2e733208ba2376f5c60fdb',
// }

// export const app: FirebaseApp = initializeApp(firebaseConfig)

// export const requestForToken = async (): Promise<string | null> => {
//     const messaging: Messaging = getMessaging(app)

//     try {
//         const token = await getToken(messaging, {
//             vapidKey:
//                 ' ',
//         })
//         console.log(token)
//         return token
//     } catch (err) {
//         console.error(err)
//         return null
//     }
// }

export const onScreenNotification = () => {
    // Your implementation for onScreenNotification
}

