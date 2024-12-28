import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { toast } from 'react-toastify';
import Header from "../../Header/Header";
import "./newClient.css";

function MyForm({ showHeader = true }) {
  const [razaoSocial, setRazaoSocial] = useState('');
  const [fantasia, setFantasia] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [inscEstadual, setInscEstadual] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [compNumber, setCompNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const handleSave = () => {
    if (razaoSocial.trim() === '' || fantasia.trim() === '' || cnpj.trim() === '' || cep.trim() === '' || street.trim() === '' || number.trim() === '' || neighborhood.trim() === '' || city.trim() === '' || uf.trim() === '' || inscEstadual.trim() === '') {
      toast.error("Preencha todos os campos!", {autoClose: 2000});
    } else {
      // Salve os valores no localStorage
      localStorage.setItem('razaoSocial', razaoSocial);
      localStorage.setItem('fantasia', fantasia);
      localStorage.setItem('cnpj', cnpj);
      localStorage.setItem('inscEstadual', inscEstadual);
      localStorage.setItem('cep', cep);
      localStorage.setItem('street', street);
      localStorage.setItem('number', number);
      localStorage.setItem('compNumber', compNumber);
      localStorage.setItem('neighborhood', neighborhood);
      localStorage.setItem('city', city);
      localStorage.setItem('uf', uf);
    }
  };

  const {register, setValue, setFocus} = useForm();
  
  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    console.log(cep);
    fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
      console.log(data);
      // register({ name: 'address', value: data.logradouro });
      setValue('address', data.logradouro);
      setValue('neighborhood', data.bairro);
      setValue('city', data.localidade);
      setValue('uf', data.uf);
      setFocus('addressNumber');
    });
  }

  return (
    <div className="clientRegister">
      {showHeader && <Header />}
    <div className="new-client">
    <h1>Cadastrar Cliente</h1>
      <Tabs className="form">
        <TabList>
          <Tab>Cliente</Tab>
          <Tab>Endereço</Tab>
        </TabList>

        <TabPanel className="form-tab">
          <Form>
            <Form.Group controlId="razaoSocial">
              <Form.Label>Razão Social: </Form.Label>
              <Form.Control
                type="text"
                value={razaoSocial}
                onChange={(e) => setRazaoSocial(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="fantasia">
              <Form.Label>Fantasia: </Form.Label>
              <Form.Control
                type="text"
                value={fantasia}
                onChange={(e) => setFantasia(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="cnpj">
              <Form.Label>CNPJ: </Form.Label>
              <Form.Control
                type="text"
                as={InputMask}
                mask="99.999.999/9999-99"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Form>
            <Form.Group controlId="inscEstadual">
              <Form.Label>Insc. Estadual: </Form.Label>
              <Form.Control
                type="text"
                value={inscEstadual}
                onChange={(e) => setInscEstadual(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="inscEstadual">
              <Form.Label>E-mail: </Form.Label>
              <Form.Control
                type="text"
                value={inscEstadual}
                onChange={(e) => setInscEstadual(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="inscEstadual">
              <Form.Label>Telefone: </Form.Label>
              <Form.Control
                type="text"
                value={inscEstadual}
                onChange={(e) => setInscEstadual(e.target.value)}
              />
            </Form.Group>
          </Form>
        </TabPanel>

        <TabPanel className="form-tab">
          <Form>
            <Form.Group controlId="cep">
              <Form.Label>CEP: </Form.Label>
              <Form.Control
                type="text"
                as={InputMask}
                mask="99999-999"
                value={cep}
                onBlur={checkCEP}
                onChange={(e) => setCep(e.target.value)}
              />           
            </Form.Group>
            <Form.Group controlId="street">
              <Form.Label>Rua: </Form.Label>
              <Form.Control
                type="text"
                value={street}
                {...register("address" )}
                onChange={(e) => setStreet(e.target.value)}
              />           
            </Form.Group>
            <Form.Group controlId="number">
              <Form.Label>Número: </Form.Label>
              <Form.Control
                type="text"
                {...register("addressNumber" )}
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="compNumber">
              <Form.Label>Complemento: </Form.Label>
              <Form.Control
                type="text"
                {...register("compNumber" )}
                value={compNumber}
                onChange={(e) => setCompNumber(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Form>
            <Form.Group controlId="neighborhood">
              <Form.Label>Bairro: </Form.Label>
              <Form.Control
                type="text"
                {...register("neighborhood" )}
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>Cidade: </Form.Label>
              <Form.Control
                type="text"
                {...register("city" )}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="uf">
              <Form.Label>Estado: </Form.Label>
              <Form.Control
                type="text"
                {...register("uf" )}
                value={uf}
                onChange={(e) => setUf(e.target.value)}
              />
            </Form.Group>
          </Form>
        </TabPanel>
      </Tabs>
      <button className="btn-saveClient" onClick={handleSave}>Salvar</button>
      </div>
    </div>
  );
}

export default MyForm;
