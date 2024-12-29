import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import Cliente from "../pages/Clientes/Clients";
import NovoCliente from "../pages/newClient/newClient";
import Carrinho from "../pages/Shop/Carrinho";
import MeusPedidos from "../pages/Shop/meus-pedidos";
import { Fragment } from "react";
import Private from "./Private";
import AuthProvider from "../pages/contexts/auth";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";

const Rotas = () => {
   return(
       <BrowserRouter>
            <Fragment>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Signin />} />
                        <Route exact path="/signup" element={<Signup />} />
                        <Route path="*" element={<Signin />} />
                        <Route path="/Home" element={<Private> <Home/> </Private>} />
                        <Route path="/Shop" element={<Private> <Shop /> </Private>} />
                        <Route path="/Clientes" element={<Private> <Cliente /> </Private>} />
                        <Route path="/newClient" element={<Private> <NovoCliente /> </Private>} />
                        <Route path="/meus-pedidos" element={<Private> <MeusPedidos /> </Private>} />
                        <Route path="/Carrinho" element={<Private> <Carrinho /> </Private>} />
                    </Routes>
                </AuthProvider>
            </Fragment>
       </BrowserRouter>
   )
}

export default Rotas;