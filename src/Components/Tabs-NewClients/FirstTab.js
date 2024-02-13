import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import "./FirstTab.css";
import InputMask from 'react-input-mask';

function FirstTab({ handleTab2 }) {
  const {register, handleSubmit } = useForm();
  const [cadastro, setCadastro] = useState([]);

  useEffect(() => {
    
  }, [cadastro]);

  const onSubmit = (data) => {
    const novoCadastro = {
      name: data.name,
      razaoSocial: data.razaoSocial,
      cnpj: data.cnpj,
      inscEstadual: data.inscEstadual,
      mail: data.mail,
      phone: data.phone,
      cellphone: data.cellphone
    };

    setCadastro([...cadastro, novoCadastro]);
    localStorage.setItem("cadastro-lojista", JSON.stringify(cadastro));
  }

  const handleButton = () => {
    handleTab2();
  };

  return(
    <div className="cadastro">
      <form className="cadastro-form" onSubmit={handleSubmit(onSubmit)}>
        <ul>
        <h2>Dados do cliente</h2>
          <li>
            <label><b>Nome Fantasia:</b></label>
            <input type="text" {...register("name")} placeholder=" " />
          </li>
          <li>
            <label><b>Razão Social:</b></label>
            <input type="text" {...register("razaoSocial")}/>
          </li>
          <li>
            <label><b>CNPJ:</b></label>
            <InputMask type="text" {...register("cnpj")}  mask="99.999.999/9999-99" maskChar=" " />
          </li>
          <li>
            <label><b>Insc. Estadual:</b></label>
            <input type="text" {...register("InscEstadual")}/>
          </li>
          <li>
            <label><b>E-mail:</b></label>
            <input type="text" {...register("mail")}/>
          </li>
          <li>
            <label><b>Telefone:</b></label>
            <InputMask type="text" {...register("phone")} mask="(99)9999-9999" maskChar=" " />
          </li>
          <li>
            <label><b>Celular:</b></label>
            <InputMask type="text" {...register("cellphone")} mask="(99)99999-9999" maskChar=" " />
          </li>
        <br />
        </ul>
        <button type="submit" onClick={handleButton}>Avançar</button>
      </form>
    </div>
  )
};

export default FirstTab;