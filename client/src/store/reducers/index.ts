import { combineReducers } from "redux";
import { StoreType } from "../../types";
import cartReducer from "./CartReducer";
import currencyReducer from "./CurrencyReducer";
import loadingReducer from "./LoadingReducer";
import userReducer from "./UserReducer";
import profileReducer from "./ProfileReducer"

const rootReducer = combineReducers<StoreType>({
  // data: reducer
  currency: currencyReducer,
  cart: cartReducer,
  userSession: userReducer,
  loading: loadingReducer,
  profile: profileReducer,
});

export default rootReducer;
