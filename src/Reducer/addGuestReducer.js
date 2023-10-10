const initialState = {
  orders: [],
};

const addGuestReducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case 'ADD':
      return {
        ...state,
        orders: payload,
      };
    case 'DEL':
      return {
        ...state,
        orders: state.orders.filter(order => order.id !== payload),
      };
    default:
      return {
        ...state,
      };
  }
};
export default addGuestReducer;
