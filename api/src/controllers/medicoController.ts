import { Request, Response } from "express";
import medicoService from "../services/medicoService";

const medicoController = {
  // Buscar todos os médicos
  async getAllMedicos(req: Request, res: Response) {
    try {
      const medicos = await medicoService.getAll();
      return res.status(200).json(medicos);
    } catch (error: any) {
      return res.status(500).json({
        message: "Erro interno no servidor.",
      });
    }
  },

  // Buscar um médico pelo CRM
  async getMedicoById(req: Request, res: Response) {
    try {
      const medico = await medicoService.getById(Number(req.params.id));

      if (!medico) {
        return res.status(404).json({
          message: "Médico(a) não encontrado(a).",
        });
      }

      return res.status(200).json(medico);
    } catch (error: any) {
      return res.status(500).json({
        message: "Erro interno no servidor.",
      });
    }
  },

  // Criar um novo médico
  async createMedico(req: Request, res: Response) {
    try {
      const medico = await medicoService.create(req.body);
      return res.status(201).json(medico);
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

  // Atualizar informações do médico
  async updateMedico(req: Request, res: Response) {
    try {
      const medico = await medicoService.update(
        Number(req.params.id),
        req.body
      );
      return res.status(200).json(medico);
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({
          message: "Médico(a) não encontrado(a).",
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

  // Deletar um médico
  async deleteMedico(req: Request, res: Response) {
    try {
      await medicoService.remove(Number(req.params.id));
      return res.status(204).send();
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({
          message: "Médico(a) não encontrado(a).",
        });
      }

      return res.status(500).json({
        message: "Erro interno no servidor.",
      });
    }
  },
};
export default medicoController;
