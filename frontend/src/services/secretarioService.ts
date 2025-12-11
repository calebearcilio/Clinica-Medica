import axios from "axios";
import type { Secretario } from "../types/secretario";
import { API_ENDPOINTS } from "../config/api";


const secretarioService = {
  async get(): Promise<Secretario[]> {
    const request = await axios.get<Secretario[]>(API_ENDPOINTS.SECRETARIO);
    return request.data;
  },
};

export default secretarioService;
