import axios from "axios";
import type {
  CreatePacienteData,
  Paciente,
  UpdatePacienteData,
} from "../types/paciente";
import { API_ENDPOINTS } from "../config/api";

const pacienteService = {
  async get(): Promise<Paciente[]> {
    const request = await axios.get<Paciente[]>(API_ENDPOINTS.PACIENTES);
    return request.data;
  },

  async getById(id: number): Promise<Paciente> {
    const request = await axios.get<Paciente>(
      `${API_ENDPOINTS.PACIENTES}/${id}`
    );
    return request.data;
  },

  async create(data: CreatePacienteData): Promise<Paciente> {
    const request = await axios.post<Paciente>(API_ENDPOINTS.PACIENTES, data);
    return request.data;
  },

  async update(id: number, data: UpdatePacienteData): Promise<Paciente> {
    const request = await axios.patch<Paciente>(
      `${API_ENDPOINTS.PACIENTES}/${id}`,
      data
    );
    return request.data;
  },

  async delete(id: number): Promise<void> {
    await axios.delete(`${API_ENDPOINTS.PACIENTES}/${id}`);
  },
};

export default pacienteService;
