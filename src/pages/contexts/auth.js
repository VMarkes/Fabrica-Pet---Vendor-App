import { createContext, useState, useEffect } from "react";
import { auth, db } from "../../services/firebaseConnection";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser(){
      const storageUser = localStorage.getItem('@vendorAppPRO')

      if(storageUser){
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }

      setLoading(false);
    }

    loadUser();
  }, [])

  // Fazer login
  async function signIn(email, password){
    setLoadingAuth(true);

    await signInWithEmailAndPassword(auth, email, password)
    .then( async (value) => {
      let uid = value.user.uid;

      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef)

      let data = {
        uid: uid,
        email: value.user.email,
      }

      setUser(data);
      storageUser(data);
      setLoadingAuth(false);
      toast.success("Bem-vindo(a) de volta!")
      navigate("/Home")
    })
    .catch((error) => {
      console.log(error);
      setLoadingAuth(false);
      toast.error("E-mail ou senha incorreto!");
    })

  }

  // Cadastrar novo usuário
  async function signUp(email, password){
    setLoadingAuth(true);

    await createUserWithEmailAndPassword(auth, email, password)
    .then( async (value) => {
      let uid = value.user.uid

      await setDoc(doc(db, "users", uid), {
        email: email,
      })

      .then( () => {
        let data = {
          uid: uid,
          email: value.user.email,
        }

        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
        toast.success("Bem-vindo(a)!")
        navigate("/Home")
      })
      
    })
    .catch((error) => {
      console.log(error);
      setLoadingAuth(false);
    })
  }

  function storageUser(data){
    localStorage.setItem('@vendorAppPRO', JSON.stringify(data))
  }

  async function logOut(){
    await signOut(auth);
    localStorage.removeItem('@vendorAppPRO');
    setUser(null);
  }

  return(
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signUp,
        logOut,
        loadingAuth,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;