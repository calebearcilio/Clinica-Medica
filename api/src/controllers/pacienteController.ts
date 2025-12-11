import { Request, Response } from "express";
import pacienteService from "../services/pacienteService";

const pacientController = {
  // Buscar todos os pacientes
  async getAllPacientes(req: Request, res: Response) {
    try {
      const pacientes = await pacienteService.getAll();
      return res.status(200).json(pacientes);
    } catch (error: any) {
      return res.status(500).json({
        message: "Erro interno no servidor.",
      });
    }
  },

  // Busca um paciente pelo ID
  async getPacienteById(req: Request, res: Response) {
    try {
      const paciente = await pacienteService.getById(Number(req.params.id));

      if (!paciente) {
        return res.status(404).json({
          message: "Paciente não encontrado.",
        });
      }

      return res.status(200).json(paciente);
    } catch (error: any) {
      return res.status(500).json({
        message: "Erro interno no servidor.",
      });
    }
  },

  // Criar um novo paciente
  async createPaciente(req: Request, res: Response) {
    try {
      const paciente = await pacienteService.create(req.body);
      return res.status(201).json(paciente);
    } catch (error: any) {
      if (error.code === "P2002") {
        return res.status(409).json({
          message: `${error.meta.target} já está em uso.`,
        });
      }

      return res.status(500).json({
        message: "Erro interno no servidor.",
      });
    }
  },

  // Atualizar informações do paciente
  async updatePaciente(req: Request, res: Response) {
    try {
      const paciente = await pacienteService.update(
        Number(req.params.id),
        req.body
      );
      return res.status(200).json(paciente);
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({
          message: "Paciente não encontrado.",
        });
      }

      if (error.code === "P2002") {
        return res.status(409).json({
          message: `${error.meta.target} já está em uso.`,
        });
      }

      return res.status(500).json({
        message: "Erro interno no servidor.",
      });
    }
  },

  // Deletar um paciente
  async deletePaciente(req: Request, res: Response) {
    try {
      const paciente = await pacienteService.remove(Number(req.params.id));
      return res.status(204).json(paciente);
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({
          message: "Paciente não encontrado.",
        });
      }

      return res.status(500).json({
        message: "Erro interno no servidor.",
      });
    }
  },
};

export default pacientController;
