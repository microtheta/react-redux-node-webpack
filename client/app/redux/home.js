const initialState = { a: 1 };

export default (state=initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'A': {
      return { ...state, a: payload };
    }
    default: {
      return state;
    }
  }
};
