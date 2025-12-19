import type {
  Consulta,
  CreateConsultaData,
  UpdateConsultaData,
} from "../types/consulta";
import { API_ENDPOINTS } from "../config/apiUrl";
import { api } from "../config/api";

const consultaService = {
  async get(): Promise<Consulta[]> {
    const response = await api.get<Consulta[]>(API_ENDPOINTS.CONSULTAS);
    return response.data;
  },

  async getById(id: number): Promise<Consulta> {
    const response = await api.get<Consulta>(
      `${API_ENDPOINTS.CONSULTAS}/${id}`
    );
    return response.data;
  },

  async create(data: CreateConsultaData): Promise<Consulta> {
    const response = await api.post<Consulta>(API_ENDPOINTS.CONSULTAS, data);
    return response.data;
  },

  async update(id: number, data: UpdateConsultaData): Promise<Consulta> {
    const response = await api.patch<Consulta>(
      `${API_ENDPOINTS.CONSULTAS}/${id}`,
      data
    );
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`${API_ENDPOINTS.CONSULTAS}/${id}`);
  },
};

export default consultaService;
