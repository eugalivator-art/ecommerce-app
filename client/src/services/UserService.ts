import axios from "axios";
import constants from "../constants";
import { LoginResponseType, RegisterResponseType } from "../types";
import StorageService from "./StorageService";

const login = (email: string, password: string) => {
  const url = `${constants.BASE_URL}/auth/login`;
  return axios
    .post<LoginResponseType>(url, { email, password })
    .catch((e) => Promise.reject(e.response.data));
};

const register = (email: string, password: string, name:string) => {
  const url = `${constants.BASE_URL}/auth/register`;
  return axios
    .post<RegisterResponseType>(url, { email, password, name })
    .catch((e) => Promise.reject(e.response.data));
};

const profile = () => {
  const url = `${constants.BASE_URL}/auth/profile`;
  return StorageService.getData("token").then((token) =>
    axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  );
};

const getOrders = () => {
  const url = `${constants.BASE_URL}/auth/orders`;
  return StorageService.getData("token").then((token) =>
    axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  );
}

const getOrderDetails = (oid:number) => {
  const url = `${constants.BASE_URL}/auth/orderdetail`;
  return StorageService.getData("token").then((token) =>
    axios.get(url,  {
      data: {orderId:oid},
      headers: { Authorization: `Bearer ${token}` }
    })
  );
}

const getAddress = () => {
  const url = `${constants.BASE_URL}/auth/address`;
  return StorageService.getData("token").then((token) =>
    axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  );
}

const getPayment = () => {
  const url = `${constants.BASE_URL}/auth/payment`;
  return StorageService.getData("token").then((token) =>
    axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  );
}

export default { login, profile, register, getOrders, getOrderDetails, getAddress, getPayment };
