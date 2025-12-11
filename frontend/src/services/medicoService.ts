import axios from "axios";
import type {
  CreateMedicoData,
  Medico,
  UpdateMedicoData,
} from "../types/medico";
import { API_ENDPOINTS } from "../config/api";

const MedicoService = {
  async get(): Promise<Medico[]> {
    const request = await axios.get<Medico[]>(API_ENDPOINTS.MEDICOS);
    return request.data;
  },

  async create(data: CreateMedicoData): Promise<Medico> {
    const request = await axios.post<Medico>(API_ENDPOINTS.MEDICOS, data);
    return request.data;
  },

  async update(id: number, data: UpdateMedicoData): Promise<Medico> {
    const request = await axios.patch<Medico>(
      `${API_ENDPOINTS.MEDICOS}/${id}`,
      data
    );
    return request.data;
  },

  async delete(id: number): Promise<void> {
    await axios.delete(`${API_ENDPOINTS.MEDICOS}/${id}`);
  },
};

export default MedicoService;
