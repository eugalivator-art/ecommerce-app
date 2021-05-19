import { Action } from "redux";
import ProfileActions from "../actions/ProfileActions";

interface IAction extends Action {
  orderId: number;
}

function userReducer(
  storeData: number = 1,
  action: IAction
): any {
  switch (action.type) {
    case ProfileActions.ActionTypes.ORDER_ID:
      return storeData = action.orderId
    default:
      return storeData;
  }
}
export default userReducer;