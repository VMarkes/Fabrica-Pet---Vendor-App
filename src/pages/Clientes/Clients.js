import React from "react";
import { useState, useEffect } from "react";
import Header from "../../Header/Header";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Modal } from '@mui/material';
import Button from '@mui/material/Button';
import NewClient from "../newClient/newClient";
import Box from '@mui/material/Box';
import { collection, getDocs, orderBy, limit, startAfter, query } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'
import "./Clients.css";

const listRef = collection(db, "clients")

export default function Client() {

    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        async function loadClients(){
            const q = query(listRef, orderBy('razaoSocial', 'desc'), limit(10))

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

            setClients(clients => [...clients, ...lista])
        
        }else{
            setIsEmpty(true);
        }
    }

    if(loading){
        return(
            <div>
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
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Razão Social</th>
                                            <th>Fantasia</th>
                                            <th>CNPJ</th>
                                            <th>Cidade</th>
                                            <th>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clients.map((item, index) => {
                                            return(
                                            <tr key={index}>
                                                <td>{item.nome}</td>
                                                <td>{item.fantasia}</td>
                                                <td>{item.cnpj}</td>
                                                <td>{item.cidade}</td>
                                                <td>{item.uf}</td>

                                            </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}