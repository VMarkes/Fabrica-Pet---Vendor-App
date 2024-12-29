import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCZOtQU9KNRE9rkk33KSm3pyKS0OHhAd8o",
    authDomain: "fp-vendorapp.firebaseapp.com",
    projectId: "fp-vendorapp",
    storageBucket: "fp-vendorapp.firebasestorage.app",
    messagingSenderId: "948893194153",
    appId: "1:948893194153:web:48ecb8dc86ae08f3bc16b8",
    measurementId: "G-6TXQ0NFNX6"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  export { auth, db};