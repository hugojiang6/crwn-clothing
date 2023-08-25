import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBE_z1T1hrnM0escY3LmbocBrNAPhX9cPk',
  authDomain: 'hugo-crwn-clothing-db.firebaseapp.com',
  projectId: 'hugo-crwn-clothing-db',
  storageBucket: 'hugo-crwn-clothing-db.appspot.com',
  messagingSenderId: '985545061592',
  appId: '1:985545061592:web:8bc7ae78ba8cb0e571d3ad',
};
const firebaseApp = initializeApp(firebaseConfig);

// ======================== google登入 ========================
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});
// export const auth = getAuth();
export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// ======================== firestore ========================
export const db = getFirestore();

// ======================== 寫入firestore ========================
export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const CreatedAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, CreatedAt, ...additionalInformation });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  return userDocRef;
};

// ======================== 建立帳號密碼 ========================
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// ======================== EMAIL登入 ========================
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// ======================== 登出 ========================
export const signOutUser = async () => await signOut(auth);

// ======================== 監聽登入狀態 ========================
export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};
