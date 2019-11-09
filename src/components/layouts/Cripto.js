import React from "react";

// Prop-types
import PropTypes from "prop-types";

const Cripto = ({
  imagen,
  name,
  tagname,
  balance,
  selected,
  onClick,
  price
}) => {
  return (
    <div onClick={onClick}>
      <div className="cripto">
        <div className="cripto-details">
          <img src={imagen} className="img" alt="Imagen de la Criptomoneda" />
          <div className="names">
            <h1>{name}</h1>
            <p className="text-light">{tagname}</p>
          </div>
        </div>
        <div className="prices">
          <p>{balance}</p>
          <p className="text-light">{price ? price : balance} MXN</p>
        </div>
      </div>
      {selected && (
        <div className="btns-cripto">
          <button className="btn">Fondear</button>
          <button className="btn">Enviar</button>
        </div>
      )}
    </div>
  );
};

Cripto.propTypes = {
  imagen: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  tagname: PropTypes.string.isRequired,
  balance: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired
};

export default Cripto;
