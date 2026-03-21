import { Request, Response } from "express";
import pacienteService from "../services/pacienteService";

const pacientController = {
  /**
   * Retorna todos os pacientes do banco
   * @param _req Request do Express
   * @param res Response do Express
   * @returns Lista de pacientes ou erro 500
   */
  async getAllPacientes(_req: Request, res: Response) {
    try {
      const pacientes = await pacienteService.getAll();
      return res.status(200).json(pacientes);
    } catch (error: any) {
      return res.status(500).json({
        message: "Erro interno no servidor.",
      });
    }
  },

  /**
   * Busca um paciente pelo ID
   * @param req Request do Express (req.params.id)
   * @param res Response do Express
   * @returns Dados do paciente (ou 404 se não encontrado) ou erro 500
   */
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

  /**
   * Cria um novo paciente
   * @param req Request do Express (req.body com dados do paciente)
   * @param res Response do Express
   * @returns Paciente criado (sem campos sensíveis), 409 se conflito ou 500
   */
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

  /**
   * Atualiza um paciente existente
   * @param req Request do Express (req.params.id e req.body com dados a atualizar)
   * @param res Response do Express
   * @returns Paciente atualizado, 404 se não encontrado, 409 se conflito ou 500
   */
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

  /**
   * Remove um paciente do banco
   * @param req Request do Express (req.params.id)
   * @param res Response do Express
   * @returns Status 204 se removido, 404 se não encontrado ou 500
   */
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
