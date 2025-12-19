import axios, { AxiosError } from "axios";
import { API_ENDPOINTS } from "../config/api";
import type { Secretario } from "../types/secretario";

type LoginResponse = {
  nome: string;
  email: string;
  telefone?: string;
  token: string;
};

const secretarioService = {
  async get(): Promise<Secretario[]> {
    const response = await axios.get(API_ENDPOINTS.SECRETARIO);
    return response.data;
  },

  async login(
    email: string,
    password: string,
    keepLogin: boolean = false
  ): Promise<LoginResponse> {
    try {
      const secretario = await axios.post<LoginResponse>(API_ENDPOINTS.LOGIN, {
        email: email,
        password: password,
        keepLogin: keepLogin,
      });

      localStorage.setItem("keepLogin", keepLogin.toString());
      if (keepLogin) {
        localStorage.setItem("token", secretario.data.token);
        localStorage.setItem("userName", secretario.data.nome);
        localStorage.setItem("email", secretario.data.email);
      } else {
        sessionStorage.setItem("token", secretario.data.token);
        sessionStorage.setItem("userName", secretario.data.nome);
        sessionStorage.setItem("email", secretario.data.email);
      }

      return secretario.data;
    } catch (error: any) {
      if(error instanceof AxiosError){
        if(error.response){
          throw new Error(error.response.data.message + " Tente novamente.");
        }
        throw new Error("Erro de conexão com o servidor. Tente novamente.");
      }
      throw new Error("Erro ao realizar login. Tente novamente.");
    }
  },

  logout() {
    localStorage.clear();
    sessionStorage.clear();
  },
};

export default secretarioService;
