import { Request, Response } from "express";
import medicoService from "../services/medicoService";

const medicoController = {
  /**
   * Retorna todos os médicos do banco
   * @param _req Request do Express
   * @param res Response do Express
   * @returns Lista de médicos ou erro 500
   */
  async getAllMedicos(_req: Request, res: Response) {
    try {
      const medicos = await medicoService.getAll();
      return res.status(200).json(medicos);
    } catch (error: any) {
      return res.status(500).json({
        message: "Erro interno no servidor.",
      });
    }
  },

  /**
   * Busca um médico pelo ID
   * @param req Request do Express (req.params.id)
   * @param res Response do Express
   * @returns Dados do médico (ou 404 se não encontrado) ou erro 500
   */
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

  /**
   * Cria um novo médico
   * @param req Request do Express (req.body com dados do médico)
   * @param res Response do Express
   * @returns Médico criado (sem campos sensíveis), 409 se conflito ou 500
   */
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

  /**
   * Atualiza um médico existente
   * @param req Request do Express (req.params.id e req.body com dados a atualizar)
   * @param res Response do Express
   * @returns Médico atualizado, 404 se não encontrado, 409 se conflito ou 500
   */
  async updateMedico(req: Request, res: Response) {
    try {
      const medico = await medicoService.update(
        Number(req.params.id),
        req.body,
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

  /**
   * Remove um médico do banco
   * @param req Request do Express (req.params.id)
   * @param res Response do Express
   * @returns Status 204 se removido, 404 se não encontrado ou 500
   */
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
