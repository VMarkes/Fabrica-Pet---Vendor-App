import React from "react";
import { useState, useEffect } from "react";
import Header from "../../Header/Header";
import InputMask from 'react-input-mask';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CreateIcon from '@mui/icons-material/Create';
import { Modal } from '@mui/material';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Form from 'react-bootstrap/Form';
import Button from '@mui/material/Button';
import NewClient from "../newClient/newClient";
import Box from '@mui/material/Box';
import { collection, getDocs, orderBy, limit, startAfter, query, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'
import "./Clients.css";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const listRef = collection(db, "clients")

export default function Client() {

    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState();
    const [loadingMore, setLoadingMore] = useState(false);

    const [selectedClient, setSelectedClient] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleEditOpen = () => setEditOpen(true);
    const handleEditClose = () => setEditOpen(false);

    useEffect(() => {
        async function loadClients(){
            const q = query(listRef, orderBy('razaoSocial', 'desc'), limit(1))

            const querySnapshot = await getDocs(q)
            setClients([]);
            await updateState(querySnapshot)

            setLoading(false);

        }

        loadClients();

        return () => {}
    }, [])

    async function updateState(querySnapshot){
        const isCollectionEmpty = querySnapshot.size === 0;

        if(!isCollectionEmpty){
            let lista = [];

            querySnapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    nome: doc.data().razaoSocial,
                    fantasia: doc.data().nomeFantasia,
                    cnpj: doc.data().cnpj,
                    inscEstadual: doc.data().inscEstadual,
                    email: doc.data().email,
                    telefone: doc.data().telefone,
                    cep: doc.data().cep,
                    end: doc.data().rua,
                    endNum: doc.data().numero,
                    compNum: doc.data().compNumero,
                    bairro: doc.data().bairro,
                    cidade: doc.data().cidade,
                    uf: doc.data().estado
                })
            })

            const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
            
            setClients(clients => [...clients, ...lista])
            setLastDocs(lastDoc);
        
        }else{
            setIsEmpty(true);
        }

        setLoadingMore(false);
    }

    async function handleMore(){
        setLoadingMore(true);

        const q = query(listRef, orderBy('razaoSocial', 'desc'), startAfter(lastDocs), limit(1));
        const querySnapshot = await getDocs(q);
        await updateState(querySnapshot);
    }

    if(loading){
        return(
            <div className="client">
                <Header/>
                <div className="client-content">
                    <h1>Clientes</h1>
                    <div className="container">
                        <span style={{ textAlign: "center", fontSize: "25px" }}><b>Buscando clientes...</b></span>
                    </div>
                </div>
            </div>
        )
    }

    const handleEdit = (client) => {
        setSelectedClient(client); // Armazena o cliente selecionado
        handleEditOpen(); // Abre a modal
    };

    const handleEditSave = async (e) => {
        e.preventDefault();
        try {
            const docRef = doc(db, "clients", selectedClient.id);
            await updateDoc(docRef, {
                razaoSocial: selectedClient.nome,
                nomeFantasia: selectedClient.fantasia,
                cnpj: selectedClient.cnpj,
                inscEstadual: selectedClient.inscEstadual,
                email: selectedClient.email,
                telefone: selectedClient.telefone,
                cep: selectedClient.cep,
                end: selectedClient.end,
                endNum: selectedClient.endNum,
                compNum: selectedClient.compNum,
                bairro: selectedClient.bairro,
                cidade: selectedClient.cidade,
                uf: selectedClient.uf
            });
            alert("Cliente atualizado com sucesso!");
            handleEditClose(); // Fecha a modal
            // Atualiza a lista de clientes localmente
            setClients((prevClients) =>
                prevClients.map((client) =>
                    client.id === selectedClient.id ? selectedClient : client
                )
            );
        } catch (error) {
            console.error("Erro ao atualizar cliente:", error);
            alert("Erro ao salvar alterações.");
        }
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        height: '90%',
        bgcolor: 'background.paper',
        border: '2px solid #1e9ac7',
        boxShadow: 24,
        overflow: "scroll",
        p: 4,
    };
   
    return (
        <div className="client">
            <Header />
            <div className="client-content">
                <h1>Clientes</h1>
                {clients.length === 0 ? (
                        <div className="container">
                            <span>Nenhum cliente cadastrado.</span>
                            <Button className='modal-button-client' style={{ backgroundColor: "#1e9ac7", height: "55px", marginTop: "10px" }} variant="contained" onClick={handleOpen}><PersonAddIcon style={{ marginRight: "10px" }}/>Cadastrar Cliente</Button>
                            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                                <Box sx={style}>
                                <div className='closeBtn'>
                                    <button className="closeBtn-modal" onClick={handleClose}>Fechar</button>
                                </div>
                                <div style={{ marginTop: "-80px"}}>
                                    <NewClient showHeader={false}/>
                                </div>
                                </Box>
                            </Modal>
                        </div>
                ) : (
                    <>
                        <div className="container">
                            <Button className='modal-button-client' style={{ backgroundColor: "#1e9ac7", height: "35px", marginBottom: "25px" }} variant="contained" onClick={handleOpen}><PersonAddIcon style={{ marginRight: "10px" }}/>Cadastrar Cliente</Button>
                            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                                <Box sx={style}>
                                <div className='closeBtn'>
                                    <button className="closeBtn-modal" onClick={handleClose}>Fechar</button>
                                </div>
                                <div style={{ marginTop: "-80px"}}>
                                    <NewClient showHeader={false}/>
                                </div>
                                </Box>
                            </Modal>
                            <div className="client-list">
                                <Paper style={{ width: "100%" }}>
                                    <Table>
                                        <TableHead className="th">
                                            <TableRow>
                                                <TableCell style={{ color: "#fff", textAlign: "center" }}><b>Razão Social</b></TableCell>
                                                <TableCell style={{ color: "#fff", textAlign: "center" }}><b>Fantasia</b></TableCell>
                                                <TableCell style={{ color: "#fff", textAlign: "center" }}><b>CNPJ</b></TableCell>
                                                <TableCell style={{ color: "#fff", textAlign: "center" }}><b>Cidade</b></TableCell>
                                                <TableCell style={{ color: "#fff", textAlign: "center" }}><b>Estado</b></TableCell>
                                                <TableCell style={{ color: "#fff", textAlign: "center" }}><b></b></TableCell>
                                            </TableRow>
                                            </TableHead>
                                        <TableBody>
                                            {clients.map((item, index) => {
                                                return(
                                                <TableRow key={index}>
                                                    <TableCell style={{ textAlign: "center" }}>{item.nome}</TableCell>
                                                    <TableCell style={{ textAlign: "center" }}>{item.fantasia}</TableCell>
                                                    <TableCell style={{ textAlign: "center" }}>{item.cnpj}</TableCell>
                                                    <TableCell style={{ textAlign: "center" }}>{item.cidade}</TableCell>
                                                    <TableCell style={{ textAlign: "center" }}>{item.uf}</TableCell>
                                                    <Button
                                                        variant="contained"
                                                        style={{ backgroundColor: "#1e9ac7", marginTop: "0.45rem", height: "2rem" }}
                                                        onClick={() => handleEdit(item)}
                                                    >
                                                        <CreateIcon style={{ width: "1rem" }}/>
                                                    </Button>
                                                </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </Paper>
                            </div>
                            {loadingMore && <h3 style={{ justifySelf: "center", fontSize: "1rem" }}>Buscando mais clientes...</h3>}
                            {!loadingMore && !isEmpty && <Button style={{ marginTop: "30px", border: "1px solid #1e9ac7", width: "30%", justifySelf: "center"  }} onClick={handleMore}>Buscar mais clientes.</Button>}
                        </div>
                    </>
                )}

                <Modal open={editOpen} onClose={handleEditClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <Box sx={style}>
                        <div className='closeBtn'>
                            <button className="closeBtn-modal" onClick={handleEditClose}>Fechar</button>
                        </div>
                        <h1>Editar Cliente</h1>
                        <Tabs className="form-client-edit">
                            <TabList className="tab-list">
                                <Tab>Cliente</Tab>
                                <Tab>Endereço</Tab>
                            </TabList>
                            <div style={{ marginTop: "-80px"}}>
                                {selectedClient && (
                                    <form onSubmit={handleEditSave}>
                                        <TabPanel className="form-tab">
                                            <Form>
                                                <Form.Group controlId="razaoSocial">
                                                    <Form.Label>Razão Social: </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            value={selectedClient.nome}
                                                            onChange={(e) => setSelectedClient({ ...selectedClient, nome: e.target.value })}
                                                        />
                                                </Form.Group>
                                                <Form.Group controlId="fantasia">
                                                    <Form.Label>Fantasia: </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            value={selectedClient.fantasia}
                                                            onChange={(e) => setSelectedClient({ ...selectedClient, fantasia: e.target.value })}
                                                        />
                                                </Form.Group>
                                                <Form.Group controlId="cnpj">
                                                    <Form.Label>CNPJ: </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            value={selectedClient.cnpj}
                                                            onChange={(e) => setSelectedClient({ ...selectedClient, cnpj: e.target.value })}
                                                        />
                                                </Form.Group>
                                            </Form>
                                            <Form>
                                                <Form.Group controlId="inscEstadual">
                                                    <Form.Label>Insc. Estadual: </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            value={selectedClient.inscEstadual}
                                                            onChange={(e) => setSelectedClient({ ...selectedClient, inscEstadual: e.target.value })}
                                                        />
                                                    </Form.Group>
                                                <Form.Group controlId="email">
                                                    <Form.Label>E-mail: </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            value={selectedClient.email}
                                                            onChange={(e) => setSelectedClient({ ...selectedClient, email: e.target.value })}
                                                        />
                                                    </Form.Group>
                                                <Form.Group controlId="phone">
                                                    <Form.Label>Telefone: </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            value={selectedClient.telefone}
                                                            onChange={(e) => setSelectedClient({ ...selectedClient, telefone: e.target.value })}
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
                                                    value={selectedClient.cep}
                                                    onChange={(e) => setSelectedClient({ ...selectedClient, cep: e.target.value })}
                                                />           
                                                </Form.Group>
                                                <Form.Group controlId="street">
                                                <Form.Label>End.: </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={selectedClient.end}
                                                    onChange={(e) => setSelectedClient({ ...selectedClient, end: e.target.value })}
                                                />           
                                                </Form.Group>
                                                <Form.Group controlId="number">
                                                <Form.Label>Número: </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={selectedClient.endNum}
                                                    onChange={(e) => setSelectedClient({ ...selectedClient, endNum: e.target.value })}
                                                />
                                                </Form.Group>
                                                <Form.Group controlId="compNumber">
                                                <Form.Label>Complemento: </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={selectedClient.compNum}
                                                    onChange={(e) => setSelectedClient({ ...selectedClient, compNum: e.target.value })}
                                                />
                                                </Form.Group>
                                            </Form>
                                            <Form>
                                                <Form.Group controlId="neighborhood">
                                                <Form.Label>Bairro: </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={selectedClient.bairro}
                                                    onChange={(e) => setSelectedClient({ ...selectedClient, bairro: e.target.value })}
                                                />
                                                </Form.Group>
                                                <Form.Group controlId="city">
                                                <Form.Label>Cidade: </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={selectedClient.cidade}
                                                    onChange={(e) => setSelectedClient({ ...selectedClient, cidade: e.target.value })}
                                                />
                                                </Form.Group>
                                                <Form.Group controlId="uf">
                                                <Form.Label>Estado: </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={selectedClient.uf}
                                                    onChange={(e) => setSelectedClient({ ...selectedClient, uf: e.target.value })}
                                                />
                                                </Form.Group>
                                            </Form>
                                            </TabPanel>
                                        <button type="submit" className="btn-saveClient">Salvar Alterações</button>
                                    </form>
                                )}
                            </div>
                        </Tabs>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}