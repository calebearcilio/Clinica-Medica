import type {
  CreatePacienteData,
  Paciente,
  UpdatePacienteData,
} from "../types/paciente";
import { API_ENDPOINTS } from "../config/apiUrl";
import { api } from "../config/api";

const pacienteService = {
  async get(): Promise<Paciente[]> {
    const request = await api.get<Paciente[]>(API_ENDPOINTS.PACIENTES);
    return request.data;
  },

  async getById(id: number): Promise<Paciente> {
    const request = await api.get<Paciente>(
      `${API_ENDPOINTS.PACIENTES}/${id}`
    );
    return request.data;
  },

  async create(data: CreatePacienteData): Promise<Paciente> {
    const request = await api.post<Paciente>(API_ENDPOINTS.PACIENTES, data);
    return request.data;
  },

  async update(id: number, data: UpdatePacienteData): Promise<Paciente> {
    const request = await api.put<Paciente>(
      `${API_ENDPOINTS.PACIENTES}/${id}`,
      data
    );
    return request.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`${API_ENDPOINTS.PACIENTES}/${id}`);
  },
};

export default pacienteService;
