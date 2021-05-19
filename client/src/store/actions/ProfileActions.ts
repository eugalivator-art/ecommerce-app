const ActionTypes = {
  ORDER_ID:"[Profile] OrderId"
};

const orderid = (orderId: number) => {
  return {
    type: ActionTypes.ORDER_ID,
    orderId
  }
  
}

const ProfileActions = {orderid, ActionTypes}

export default ProfileActions;