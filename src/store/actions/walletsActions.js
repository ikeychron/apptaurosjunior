import { GET, SAVEC, SAVEP } from "../types";

export const getList = token => async dispatch => {
  try {
    const response = await fetch('https://api.staging.tauros.io/api/v1/data/listbalances/', {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      })
    }).then(res => res.json());

    const wallets = response.data.wallets;
    const walletSize = wallets.length;
    let coins = "";

    const walletCopy = wallets.map((wallet, index) => {
      const coin = wallet.coin.toUpperCase();
      coins = coins + coin;

      if (index < walletSize - 1) {
        coins = coins + ",";
      }

      return {
        name: wallet.coin_name,
        coin: coin,
        balances: wallet.balances,
        icon: wallet.coin_icon,
        balance: wallet.balances.available
      };
    });

    dispatch({ type: GET, payload: walletCopy });
    dispatch({ type: SAVEC, payload: coins });
  } catch (error) {
    console.error(error);
  }
};

export const getPrices = coins => async dispatch => {
  const api = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coins}&tsyms=MXN`;

  try {
    const response = await fetch(api, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Apikey 85359fdad20581c28e6cb77c54f406f37e64eec6`
      })
    }).then(res => res.json());

    dispatch({ type: SAVEP, payload: response.RAW });
  } catch (error) {
    console.error(error);
  }
};
