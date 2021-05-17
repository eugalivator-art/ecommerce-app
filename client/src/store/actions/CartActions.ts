import { ProductType } from "../../types";

const ActionTypes = {
  ADD_TO_CART: "[Cart] Add to cart",
  REMOVE_ITEM: "[Cart] Remove item",
  INCREAMENT: "[Cart] Increament",
  DECREAMENT: "[Cart] Decreament",
  EMPTY_CART:"[Cart] Empty"
};

const addToCart = (product: ProductType) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    product,
  };
};
const removeItem = (id: number) => {
  return {
    type: ActionTypes.REMOVE_ITEM,
    id,
  };
};

const empty = () => {
  return {
    type:ActionTypes.EMPTY_CART,
  }
}

const increaseQuantity = (idno: number) => {
  return {
    type: ActionTypes.INCREAMENT,
    idno,
  }
}

const decreaseQuantity = (id: number) => {
  return {
    type: ActionTypes.DECREAMENT,
    id,
  }
}
export default { ActionTypes, addToCart, removeItem, increaseQuantity, decreaseQuantity, empty};
