import { initializeApp } from "firebase/app";
import { getAuth,
         GoogleAuthProvider, 
         signInWithRedirect, 
         createUserWithEmailAndPassword,
         signInWithPopup} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyDzHD-uA_7op7I-13UK6PZWhpVHWkaG3qk",
  authDomain: "crwn-clothing-db-f134f.firebaseapp.com",
  projectId: "crwn-clothing-db-f134f",
  storageBucket: "crwn-clothing-db-f134f.appspot.com",
  messagingSenderId: "391764520366",
  appId: "1:391764520366:web:183757970398baf510ac3f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists()) {
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc( userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log('error adding user to database', error.message)
        }
    }
    return userDocRef
}

export const  createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}
