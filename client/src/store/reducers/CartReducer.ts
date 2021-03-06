import { CartType, ProductType } from "../../types";
import { Action } from "redux";
import CartActions from "../actions/CartActions";
type IAction = {
  product: ProductType;
  id: number;
  idno: number;
} & Action;
// state : initialise, immutable
function cartReducer(store: CartType[] = [], action: IAction) {
  switch (action.type) {
    case CartActions.ActionTypes.ADD_TO_CART:
      return [...store, { ...action.product, productQty: 1, productTotalPrice: parseInt(action.product.productSalePrice) }];
    
    case CartActions.ActionTypes.EMPTY_CART:
      return [];
    
    case CartActions.ActionTypes.REMOVE_ITEM:
      return store.filter((prod) => prod.productId !== action.id);
    
    case CartActions.ActionTypes.INCREAMENT:
      return (store.map((prod) => {
        if (prod.productId === action.idno) {
          prod.productQty++
          if (prod.productQty >= 1) {
            prod.productTotalPrice = prod.productQty * parseInt(prod.productSalePrice)
          }
        }
          return prod
        
    }));
    
    case CartActions.ActionTypes.DECREAMENT:
      return (store.map((prod) => {
        if (prod.productId === action.id) {
          prod.productQty--
          if (prod.productQty >= 1) {
            prod.productTotalPrice = prod.productQty * parseInt(prod.productSalePrice)
          }
        }
          return prod
        
      }));
    
    default:
      return store;
  }
}
export default cartReducer;
