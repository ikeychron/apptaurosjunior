import { SIGNIN } from '../types';

const initialState = {
  token: ''
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case SIGNIN: {
      return { ...state, token: payload };
    }

    default: {
      return state;
    }
  }
}