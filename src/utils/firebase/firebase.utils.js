// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
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

// ============ google認證程序 ============
// 建立google認證介面實例
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

// getAuth:取得本機google所有的認證帳號
export const auth = getAuth();

// signInWithPopup:建立登入彈出視窗，並將本機"google所有帳號"和"認證介面"導入彈出視窗
// 選擇認證使用者後，會回傳該認證使用者的訊息
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// ============ firebase ============
// getFirestore:建立db (collection) 模型
export const db = getFirestore();

// 傳入google認證的使用者訊息
export const createUserDocumentFromAuth = async (userAuth) => {
  // doc:建立參照文檔 doc(db, 資料庫名稱, 使用者uid)
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  // getdoc:將參照文檔送至firebase，比對資料是否存在
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const CreatedAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, CreatedAt });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef
};
