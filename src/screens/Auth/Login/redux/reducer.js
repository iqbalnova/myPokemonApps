const initialState = {
  _user: {},
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        _user: action.payload,
      };

    default:
      return state;
  }
};
