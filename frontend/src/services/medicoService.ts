import type {
  CreateMedicoData,
  Medico,
  UpdateMedicoData,
} from "../types/medico";
import { API_ENDPOINTS } from "../config/apiUrl";
import { api } from "../config/api";

const medicoService = {
  async get(): Promise<Medico[]> {
    const request = await api.get<Medico[]>(API_ENDPOINTS.MEDICOS);
    return request.data;
  },

  async getById(id: number): Promise<Medico> {
    const request = await api.get<Medico>(`${API_ENDPOINTS.MEDICOS}/${id}`);
    return request.data;
  },

  async create(data: CreateMedicoData): Promise<Medico> {
    const request = await api.post<Medico>(API_ENDPOINTS.MEDICOS, data);
    return request.data;
  },

  async update(id: number, data: UpdateMedicoData): Promise<Medico> {
    const request = await api.put<Medico>(
      `${API_ENDPOINTS.MEDICOS}/${id}`,
      data
    );
    return request.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`${API_ENDPOINTS.MEDICOS}/${id}`);
  },
};

export default medicoService;
