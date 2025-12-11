import axios from "axios";
import type {
  Consulta,
  CreateConsultaData,
  UpdateConsultaData,
} from "../types/consulta";
import { API_ENDPOINTS } from "../config/api";

const ConsultaService = {
  async get(): Promise<Consulta[]> {
    const request = await axios.get<Consulta[]>(API_ENDPOINTS.CONSULTAS);
    return request.data;
  },

  async getById(id: number): Promise<Consulta> {
    const request = await axios.get<Consulta>(
      `${API_ENDPOINTS.CONSULTAS}/${id}`
    );
    return request.data;
  },

  async create(data: CreateConsultaData): Promise<Consulta> {
    const request = await axios.post<Consulta>(API_ENDPOINTS.CONSULTAS, data);
    return request.data;
  },

  async update(id: number, data: UpdateConsultaData): Promise<Consulta> {
    const request = await axios.patch<Consulta>(
      `${API_ENDPOINTS.CONSULTAS}/${id}`,
      data
    );
    return request.data;
  },

  async delete(id: number): Promise<void> {
    await axios.delete(`${API_ENDPOINTS.CONSULTAS}/${id}`);
  },
};

export default ConsultaService;
