import React, { useEffect, useState, Fragment } from "react";

// Redux
import { connect } from "react-redux";
import { getList, getPrices } from "../store/actions/walletsActions";

// Layouts
import Header from "./layouts/Header";
import Cripto from "./layouts/Cripto";
import History from "./layouts/History";

// Prop-types
import PropTypes from "prop-types";

const Home = ({ store, actions }) => {
  // State - Redux
  const { token, money, values } = store;
  let { wallets } = store;

  // State
  const [value, saveValue] = useState(0);
  const [selected, saveWallet] = useState("");
  const [history, saveHistory] = useState([]);

  useEffect(() => {
    if (wallets.length > 0) {
      let valueMXN = 0;
      Object.keys(values).forEach(item => {
        valueMXN = valueMXN + values[item].MXN.PRICE;
      });

      const moneyMXN = wallets.find(item => item.coin === "MXN");
      valueMXN = valueMXN + Number(moneyMXN.balance);

      saveValue(valueMXN);
    }
  }, [values, wallets]);

  useEffect(() => {
    if (selected !== "") {
      const newHistory = async () => {
        const api = `https://api.staging.tauros.io/api/v1/data/transfershistory/?coin=${selected.toLowerCase()}&type=deposits`;

        try {
          saveHistory([]);
          const response = await fetch(api, {
            method: "GET",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: `JWT ${token}`
            })
          }).then(res => res.json());

          const data = response.data;

          if (data && data.transfers) {
            if (data.transfers.length > 0) {
              saveHistory(data.transfers);
            }
          }
        } catch (error) {
          console.error(error);
        }
      };
      newHistory();
    }
  }, [selected]);

  useEffect(() => {
    if (money) {
      actions.getPrices(money);
    }
  }, [money]);

  useEffect(() => {
    actions.getList(token);
  }, []);

  const selectedCripto = coin => () => {
    saveWallet(coin);
  };

  return (
    <Fragment>
      <Header value={value} />
      <main className="container">
        <div className="criptos">
          {wallets.map( (wallet, index) => {
            const { coin, name, balances, icon } = wallet;
            const price = values[coin] ? values[coin].MXN.PRICE : 0;

            return (
              <Cripto
                key={index}
                name={name}
                imagen={icon}
                price={price}
                tagname={coin}
                balance={balances.available}
                selected={selected === coin}
                onClick={selectedCripto(coin)}
              />
            );
          })}
        </div>
        <div className="history">
          <History data={history} />
        </div>
      </main>
    </Fragment>
  );
};

const mapdispatchToProps = dispatch => ({
  actions: {
    getPrices: money => dispatch(getPrices(money)),
    getList: token => dispatch(getList(token))
  }
});

const mapStateToProps = ({ Login, Cripto }) => ({
  store: {
    money: Cripto.money,
    wallets: Cripto.wallets,
    values: Cripto.values,
    token: Login.token
  }
});

Home.propTypes = {
  actions: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  mapdispatchToProps
)(Home);
