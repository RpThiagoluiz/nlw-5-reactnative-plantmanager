import axios from "axios";

export const api = axios.create({
  //Nao utilize o localhost, utilize o endereco ip do PC
  //Pegar o ip , e passar a porta
  baseURL: "http://192.168.0.142:3333",
});
