import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputMask from 'react-input-mask';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { toast } from 'react-toastify';
import Header from "../../Header/Header";
import "./newClient.css";
import { db } from '../../services/firebaseConnection'
import { addDoc, collection } from 'firebase/firestore'

export default function NewClients({ showHeader = true }){
  const [razaoSocial, setRazaoSocial] = useState('');
  const [fantasia, setFantasia] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [inscEstadual, setInscEstadual] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [compNumber, setCompNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  async function handleRegister(e){
    e.preventDefault();

    if (razaoSocial !== '' && fantasia !== '' && cnpj !== '' && cep !== '' && street !== '' && number !== '' && neighborhood !== '' && city !== '' && uf !== '' && inscEstadual !== '') {
      await addDoc(collection(db, "clients"), {
        razaoSocial: razaoSocial,
        nomeFantasia: fantasia,
        cnpj: cnpj,
        inscEstadual: inscEstadual,
        email: email,
        telefone: phone,
        cep: cep,
        rua: street,
        numero: number,
        compNumero: compNumber,
        bairro: neighborhood,
        cidade: city,
        estado: uf
      })
      .then(() => {
        setRazaoSocial('')
        setFantasia('')
        setCnpj('')
        setInscEstadual('')
        setEmail('')
        setPhone('')
        setCep('')
        setStreet('')
        setNumber('')
        setCompNumber('')
        setNeighborhood('')
        setCity('')
        setUf('')
        toast.success("Cliente Cadastrado com sucesso!")
      })
      .catch((error) => {
        console.log(error)
        toast.error("Erro ao cadastrar cliente.")
      })
      
    }else{
      toast.error("Preencha todos os campos!")
    }

  }

  return (
    <div className="clientRegister">
      {showHeader && <Header />}
    <div className="new-client">
    <h1>Cadastrar Cliente</h1>
      <Tabs className="form">
        <TabList className="tab-list">
          <Tab>Cliente</Tab>
          <Tab>Endereço</Tab>
        </TabList>
        <form onSubmit={handleRegister}>
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
            <Form.Group controlId="email">
              <Form.Label>E-mail: </Form.Label>
              <Form.Control
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Telefone: </Form.Label>
              <Form.Control
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
                onChange={(e) => setCep(e.target.value)}
              />           
            </Form.Group>
            <Form.Group controlId="street">
              <Form.Label>End.: </Form.Label>
              <Form.Control
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />           
            </Form.Group>
            <Form.Group controlId="number">
              <Form.Label>Número: </Form.Label>
              <Form.Control
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="compNumber">
              <Form.Label>Complemento: </Form.Label>
              <Form.Control
                type="text"
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
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>Cidade: </Form.Label>
              <Form.Control
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="uf">
              <Form.Label>Estado: </Form.Label>
              <Form.Control
                type="text"
                value={uf}
                onChange={(e) => setUf(e.target.value)}
              />
            </Form.Group>
          </Form>
        </TabPanel>
        <button type='submit' className="btn-saveClient">Salvar</button>
        </form>
      </Tabs>
      
      </div>
    </div>
  );

}

// export default MyForm;
