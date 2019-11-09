import { SAVEP, GET, SAVEC  } from "../types";

const initialState = {
  wallets: [],
  values: {},
  money: ""
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    // Save Coins
    case SAVEC: {
      return { ...state, money: payload };
    }
    // Save Prices
    case SAVEP: {
      return { ...state, values: payload };
    }
    // Get Wallets
    case GET: {
      return { ...state, wallets: payload };
    }

    default: {
      return state;
    }
  }
}
