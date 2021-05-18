import axios from "axios";
import constants from "../constants";
import { AddressResponseType, PostResponseType, RegisterResponseType } from "../types";
import StorageService from "./StorageService";


const postOrder = (amount: number ) => {
  const url = `${constants.BASE_URL}/orders`;
  return StorageService.getData("token").then((token) => 
      axios.post(url, { amount }, { headers: { Authorization: `Bearer ${token}` } }))
    .catch((e) => Promise.reject(e.response.data));
};

const postOrderDetail = (prodId: number, orderId:number, quantity:number, amount:number  ) => {
  const url = `${constants.BASE_URL}/orderdetail`;
  return StorageService.getData("token").then((token) => 
      axios.post(url, { prodId, orderId, quantity, amount }, { headers: { Authorization: `Bearer ${token}` } }))
    .catch((e) => Promise.reject(e.response.data));
};

const postAddress = (line1: string, line2: string, city:string, state: string, country:string, pincode:number, orderId:number ) => {
  const url = `${constants.BASE_URL}/address`;
  return StorageService.getData("token").then((token) => 
      axios.post<AddressResponseType>(url, { orderId, line1, line2, city, state, country, pincode }, { headers: { Authorization: `Bearer ${token}` } }))
    .catch((e) => Promise.reject(e.response.data));
};

const postPayment = (paidAmount:number, cardNo:number, cvv:number, expir:number, orderId:number ) => {
    const url = `${constants.BASE_URL}/payment`;
    return StorageService.getData("token").then((token) =>
        axios.post<PostResponseType>(url, {paidAmount, cardNo, cvv, expir, orderId}, { headers: { Authorization: `Bearer ${token}` } }))
        .catch((e) => Promise.reject(e.response.data));
}

// const profile = () => {
//   const url = `${constants.BASE_URL}/auth/profile`;
//   return StorageService.getData("token").then((token) =>
//     axios.get(url, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//   );
// };

export default {postOrder, postAddress, postPayment, postOrderDetail}