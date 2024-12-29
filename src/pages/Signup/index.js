import React, { useState, useContext } from "react";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import * as C from "./styles";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import img from '../../Logo-FP.png';
import './style.css';

export default function SignUp(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp, loadingAuth } = useContext(AuthContext)

  async function handleSignUp(e){
    e.preventDefault();

    if(email !== '' && password !== ''){
      await signUp(email, password);
    }
  }

  return (
    <C.Container>
      <img className="logo-img" src={img} />
      <C.Label>CADASTRE-SE</C.Label>
      <C.Content>
        <form onSubmit={handleSignUp}>
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
          <Button Text={loadingAuth ? 'Carregando...' : 'Cadastrar'} Type="submit"/>
          <C.LabelSignin>
            Já tem uma conta?
            <C.Strong>
              <Link to="/">&nbsp;Entre</Link>
            </C.Strong>
          </C.LabelSignin>
        </form>
      </C.Content>
    </C.Container>
  );
};