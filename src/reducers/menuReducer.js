import * as types from '../actions/types';

const initialState = {
  order: [],
  restaurantname: ''

};

const menuReducer = (state = initialState, action) => {
  const order = [...state.order]
  switch (action.type) {
    case types.ADD_ORDER:
      order.filter((item, index) => {
        if (action.payload.Menuname == item.Menuname && action.payload.order.item == item.order.item) {
          item.amount += action.payload.amount;
          return order
        }
      })
      return {
        ...state,
        order: [...state.order, action.payload],
        restaurantname: action.restaurantname
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
    case types.REMOVE_ORDER:
      order.splice(action.payload, 1)
      return {
        ...state,
        order: order
      };
    case types.CHECK_DUPLICATE_ITEM:
      const unique = order.map((item, index) => item['Menuname'] && item.order['item'])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter(e => order[e]).map(e => order[e]);

      return {
        ...state,
        order: unique
      };
    case types.REMOVE_CART:
      return {
        ...state,
        order: [],
        restaurantname: ''
      };
    default:
      return state;
  }
}

export default menuReducer;