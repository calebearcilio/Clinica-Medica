import type {
  Consulta,
  CreateConsultaData,
  UpdateConsultaData,
} from "../types/consulta";
import { API_ENDPOINTS } from "../config/apiUrl";
import { api } from "../config/api";

const consultaService = {
  async get(): Promise<Consulta[]> {
    const request = await api.get<Consulta[]>(API_ENDPOINTS.CONSULTAS);
    return request.data;
  },

  async getById(id: number): Promise<Consulta> {
    const request = await api.get<Consulta>(
      `${API_ENDPOINTS.CONSULTAS}/${id}`
    );
    return request.data;
  },

  async create(data: CreateConsultaData): Promise<Consulta> {
    const request = await api.post<Consulta>(API_ENDPOINTS.CONSULTAS, data);
    return request.data;
  },

  async update(id: number, data: UpdateConsultaData): Promise<Consulta> {
    const request = await api.put<Consulta>(
      `${API_ENDPOINTS.CONSULTAS}/${id}`,
      data
    );
    return request.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`${API_ENDPOINTS.CONSULTAS}/${id}`);
  },
};

export default consultaService;
