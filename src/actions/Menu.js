import * as types from './types'


//MenuScreen
export const addOrder = (order, restaurantname) => {
  return {
    type: types.ADD_ORDER,
    payload: order,
    restaurantname
  }
}

//Cart
export const increaseValue = index => {
  return {
    type: types.INCREASE_VALUE,
    payload: index
  }
}

export const decreaseValue = index => {
  return {
    type: types.DECREASE_VALUE,
    payload: index
  }
}

export const removeOrder = index => {
  return {
    type: types.REMOVE_ORDER,
    payload: index
  }
}
export const checkDuplicateItem = () => {
  return {
    type: types.CHECK_DUPLICATE_ITEM,
  }
}
export const removeCart = () => {
  return {
    type: types.REMOVE_CART,
  }
}