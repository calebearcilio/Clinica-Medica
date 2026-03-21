import { Request, Response } from "express";
import consultaService from "../services/consultaService";

const consultaController = {
  /**
   * Retorna todas as consultas registradas
   * @param _req Request do Express
   * @param res Response do Express
   * @returns Lista de consultas ou erro 500
   */
  async getAllConsultas(_req: Request, res: Response) {
    try {
      const consultas = await consultaService.getAll();
      res.status(200).json(consultas);
    } catch (error: any) {
      return res.status(500).json({
        message: "Erro interno no servidor.",
      });
    }
  },

  /**
   * Busca uma consulta pelo ID
   * @param req Request do Express (req.params.id)
   * @param res Response do Express
   * @returns Dados da consulta (ou 404 se não encontrada) ou erro 500
   */
  async getConsultaById(req: Request, res: Response) {
    try {
      const consulta = await consultaService.getById(Number(req.params.id));

      if (!consulta) {
        return res.status(404).json({
          message: "Consulta não encontrada.",
        });
      }

      return res.status(200).json(consulta);
    } catch (error: any) {
      return res.status(500).json({
        message: "Erro interno no servidor.",
      });
    }
  },

  /**
   * Cria uma nova consulta
   * @param req Request do Express (req.body com dados da consulta)
   * @param res Response do Express
   * @returns Consulta criada (201), 400 se dados inválidos ou 500
   */
  async createConsulta(req: Request, res: Response) {
    try {
      const consulta = await consultaService.create(req.body);
      return res.status(201).json(consulta);
    } catch (error: any) {
      if (error.message) {
        return res.status(400).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        message: "Erro interno no servidor.",
      });
    }
  },

  /**
   * Atualiza uma consulta existente
   * @param req Request do Express (req.params.id e req.body com os dados a atualizar)
   * @param res Response do Express
   * @returns 204 se atualizado, 404 se não encontrado ou 500
   */
  async updateConsulta(req: Request, res: Response) {
    try {
      const consulta = await consultaService.update(
        Number(req.params.id),
        req.body
      );
      return res.status(204).json(consulta);
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({
          message: "Consulta não encontrada.",
        });
      }
      return res.status(500).json({
        message: "Erro interno no servidor.",
      });
    }
  },

  /**
   * Remove uma consulta do banco
   * @param req Request do Express (req.params.id)
   * @param res Response do Express
   * @returns Status 204 se removido, 404 se não encontrado ou 500
   */
  async deleteConsulta(req: Request, res: Response) {
    try {
      await consultaService.remove(Number(req.params.id));
      return res.status(204).send();
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({
          message: "Consulta não encontrada.",
        });
      }

      return res.status(500).json({
        message: "Erro interno no servidor.",
      });
    }
  },
};
export default consultaController;
