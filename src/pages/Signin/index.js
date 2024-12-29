import React, { useState, useContext } from "react";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import * as C from "./styles";
import { Link } from "react-router-dom";
import { AuthContext } from '../contexts/auth';
import img from '../../Logo-FP.png';
import './style.css';

export default function SignIn(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, loadingAuth } = useContext(AuthContext)

  async function handleSignIn(e){
    e.preventDefault();

    if(email !== '' && password !== ''){
      await signIn(email, password);
    }
  }

  return (
    <C.Container>
      <img className="logo-img" src={img} />
      <C.Label>LOGIN</C.Label>
      <C.Content>
        <form onSubmit={handleSignIn}>
          <Input
            type="email"
            placeholder="Digite seu E-mail"
            value={email}
            onChange={(e) => [setEmail(e.target.value)]}
          />

          <Input
            type="password"
            placeholder="Digite sua Senha"
            value={password}
            onChange={(e) => [setPassword(e.target.value)]}
          />
          <Button Text={loadingAuth ? 'Carregando...' : 'Entrar'} Type="submit" />
          <C.LabelSignup>
            Não tem uma conta?
            <C.Strong>
              <Link to="/Signup">&nbsp;Cadastre-se</Link>
            </C.Strong>
          </C.LabelSignup>
        </form>
      </C.Content>      
    </C.Container>
  );
};