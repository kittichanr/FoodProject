import * as types from './types'

//MenuScreen
export const addOrder = order => {
    return {
      type: types.ADD_ORDER,
      payload: order
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