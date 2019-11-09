import React from "react";
import moment from "moment";

// Prop-types
import PropTypes from 'prop-types';

const History = ({ data }) => {
  
  if (data.length > 0) {
    
    return (
      <div>
        <h1 className="text-gray">Mis depositos y retiros</h1>
        <table className="text-light">
          <thead>
            <tr>
              <td>Fecha</td>
              <td>Descripción</td>
              <td>Cantidad</td>
              <td>Estado</td>
            </tr>
          </thead>
          <tbody>
            {data.map((dat, index) => (
              <tr key={index}>
                <td>{moment(dat.created_at).format('LLL')}</td>
                <td>
                  {dat.type.toUpperCase()} {dat.coin.toUpperCase()}
                </td>
                <td>{dat.amount}</td>
                <td>
                  {dat.confirmed ? "Confirmado" : "Pendiente"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <h1 className="text-gray">No tienes transacciones</h1>;
  }
};

History.propTypes = {
  data: PropTypes.array.isRequired
}


export default History;
