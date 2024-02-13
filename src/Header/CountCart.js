import { Badge } from "@mui/material";
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from "react";

export default function CountCart({ }) {

    const [carrinho, setCarrinho] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho'));
        setCarrinho(carrinhoSalvo || []);
      }, []);
    
      //Contador de itens no menu
      useEffect(() => {
        setCount(carrinho.length);
      }, [carrinho]);

      const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: -38,
          border: `2px solid ${theme.palette.background.paper}`,
          padding: '0 4px',
        },
      }));

    return (
        <StyledBadge badgeContent={count} color="error" />
    )
}