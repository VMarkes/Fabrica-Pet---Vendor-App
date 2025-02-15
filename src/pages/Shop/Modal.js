import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import jsPDF from 'jspdf';
import imagePath from '../../Logo-FP.png';
import * as React from 'react';
import { useState } from 'react';
import './Modal.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 25,
  p: 4,
};

const contentStyle = {
  height: '55%',
  overflowY: "scroll",
  borderBottom: "5px solid #1e9ac7",
}

export default function MyModal({ open, onClose, value }) {

  const keys = JSON.parse(value);

  const { client, condP, formaP, coments, discount } = keys;

  const [order, setOrder] = useState(keys || []);

  // Calcula o total de produtos
  const totalProdutos = keys.produtos.reduce((total, item) => {
    if(!keys.produtos || !keys.produtos.length) {
      return 0;
    } else {
      return total + item.quantidade;
    }
  }, 0);

  // Calcula o total
  const totalValor = keys.produtos.reduce((total, item) => {
    const preco = isNaN(item.preco) ? 0 : item.preco;
    if(!keys.produtos || !keys.produtos.length) {
      return 0;
    } else {
      return total + (item.quantidade * preco);
    }
  }, 0);

  // Calcula o total com desconto
  const totalComDesconto = order.produtos.reduce((total, item) => {
    const preco = isNaN(item.price) ? 0 : item.price;
    if(!order.produtos || !order.produtos.length) {
      return 0;
    } else {
      return total + (item.quantidade * preco);
    }
  }, 0);
  
  //Salva PDF
  function gerarPDF() {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
        precision: 2,
    });

    // Adicionar conteúdo ao PDF
    const cart = document.getElementById('modal');
    const cartHTML = cart.innerHTML;
    doc.html(cartHTML, {
      callback: function (doc) {
        const image = new Image();
        image.src = imagePath;
        
          doc.addImage(image, 'PNG', 180, 5, 90, 45);
          doc.setFont('helvetica', 'normal');
          doc.save(`Pedido-${client}.pdf`);
      },
      x: 15,
      y: 40,
      width: 1000,
      windowWidth: 1000,
      html2canvas: { scale: 0.4 },
    });
  }

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <div className='closeBtn'>
          <button className="closeBtn-modal" onClick={onClose}>Fechar</button>
        </div>
        <Typography id="modal" sx={contentStyle}>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {keys.produtos.map(item => (
                <div className="cart-items-modal" key={item.id}>
                  <div className="img-modal">
                      <img className="img-product" src={item.imagem} alt={item.nome} />
                  </div>
                  <div className="content-items-modal">
                      <p><b>Ref.:</b>{item.referencia}</p>
                      <p className="ean"><b>EAN:</b>{item.ean}</p>
                      <p><b>{item.nome} {item.size}</b></p>
                      <p><b>R$</b>{item.preco}</p>
                      <p><b>Quant.:</b>{item.quantidade}</p>
                  </div>
                </div>
            ))}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div className="finalizar-carrinho">
            <div id="carrinho-total" className="carrinho-total">
                  <p><b>Total:</b> R${totalValor.toFixed(2)}</p>
                  <p><b>Total com desconto:</b> R${totalComDesconto.toFixed(2)}</p>
                  <p><b>Porcentagem de desconto aplicada: {discount}%</b></p>
                  <p><b>Total de produtos:</b> {totalProdutos}</p>
              </div>
              <hr />
              <div className="busca-cliente">
                    <form className="busca-cliente-form">
                        <tr>
                            <td className="clientes">
                                <label><b>Cliente: </b>{client}</label>
                            </td>
                        </tr>
                          <div className='btn-payment'>
                              <span>
                                <b>Cond. Pagamento: </b>{condP}
                              </span>
                              <span>
                                <b>Forma de Pagamento: </b>{formaP}
                              </span>
                          </div>
                          <p><b>Comentários: </b>{coments}</p>
                    </form>
                </div>
          </div>
        </Typography>
        </Typography>
        <div className='btns-modal'>
          <button className="editOrder">Editar Pedido</button>
          <button className="gerarPDF" onClick={gerarPDF}>Gerar PDF</button>
          <button className="sendOrder">Enviar pedido</button>
        </div>
      </Box>
    </Modal>
  );
}