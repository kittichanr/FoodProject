import * as types from '../actions/types';



const initialState = {
  order: []
};

const menuReducer = (state = initialState, action) => {
  const order = [...state.order]
  switch (action.type) {
    case types.ADD_ORDER:
      return {
        ...state,
        order: [...state.order, action.payload]
      };
    case types.INCREASE_VALUE:
      
      order[action.payload].amount += 1
      return {
        ...state,
        order: order
      };
    case types.DECREASE_VALUE:
      order[action.payload].amount -= 1
      if (order[action.payload].amount < 1) {
        order.splice(action.payload, 1)
      }
      return {
        ...state,
        order: order
      };
    default:
      return state;
  }
}

export default menuReducer;