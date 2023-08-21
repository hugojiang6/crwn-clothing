// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBE_z1T1hrnM0escY3LmbocBrNAPhX9cPk',
  authDomain: 'hugo-crwn-clothing-db.firebaseapp.com',
  projectId: 'hugo-crwn-clothing-db',
  storageBucket: 'hugo-crwn-clothing-db.appspot.com',
  messagingSenderId: '985545061592',
  appId: '1:985545061592:web:8bc7ae78ba8cb0e571d3ad',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// ======================== google登入 ========================

// 建立認證提供商介面實例
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// getAuth:取得認證
export const auth = getAuth();

// signInWithPopup:建立登入彈出視窗，並將本機"google所有帳號"和"認證介面"導入彈出視窗
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// ======================== 登入資訊存入firestore ========================
// getFirestore:建立db (collection) 模型
export const db = getFirestore();
// 傳入google認證的使用者訊息
export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
  if (!userAuth) return;
  // doc:建立參照文檔 doc(db, 資料庫名稱, 使用者uid)
  const userDocRef = doc(db, 'users', userAuth.uid);
  // getdoc:將參照文檔送至firestore，比對資料是否存在
  const userSnapshot = await getDoc(userDocRef);
  // 如果帳號不存在就建立一筆資料
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

// ======================== 帳號密碼登入 ========================
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(`createUserWithEmailAndPassword: ${error}`);
  }
};
