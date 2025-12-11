import { Request, Response } from "express";
import secretarioService from "../services/secretarioService";

const secretarioController = {
  /**
   * Retorna todas as instâncias de secretário do banco
   * @param req Request do Express
   * @param res Response do Express
   * @returns Lista de secretários (sem senha) ou erro 500
   */
  async getAllSecretarios(req: Request, res: Response) {
    try {
      const secretarios = await secretarioService.getAll();
      return res.status(200).json(secretarios);
    } catch (error: any) {
      return res.status(500).json({
        message: "Erro interno no servidor.",
      });
    }
  },

  /**
   * Busca um secretário pelo ID
   * @param req Request do Express (req.params.id)
   * @param res Response do Express
   * @returns Dados do secretário (sem senha), erro 404 se não encontrado ou erro 500
   */
  async getSecretarioById(req: Request, res: Response) {
    try {
      const secretario = await secretarioService.getById(Number(req.params.id));

      if (!secretario) {
        return res.status(404).json({
          message: "Secretário(a) não encontrado(a).",
        });
      }

      return res.status(200).json(secretario);
    } catch (error: any) {
      return res.status(500).json({
        message: "Erro interno no servidor.",
      });
    }
  },

  /**
   * Cria um novo secretário no banco
   * @param req Request do Express (req.body com dados do secretário)
   * @param res Response do Express
   * @returns Dados do secretário criado (sem senha), erro 409 se email duplicado ou erro 500
   */
  async createSecretario(req: Request, res: Response) {
    try {
      const secretario = await secretarioService.create(req.body);
      return res.status(201).json(secretario);
    } catch (error: any) {
      if (error.code === "P2002") {
        return res.status(409).json({
          message: "Email já está em uso.",
        });
      }

      return res.status(500).json({
        message: "Erro interno no servidor.",
      });
    }
  },

  /**
   * Atualiza dados de um secretário existente
   * @param req Request do Express (req.params.id e req.body com dados a atualizar)
   * @param res Response do Express
   * @returns Dados atualizados do secretário (sem senha), erro 404 se não encontrado, erro 409 se email duplicado ou erro 500
   */
  async updateSecretario(req: Request, res: Response) {
    try {
      const secretario = await secretarioService.update(
        Number(req.params.id),
        req.body
      );
      return res.status(200).json(secretario);
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({
          message: "Secretário não encontrado.",
        });
      }

      if (error.code === "P2002") {
        return res.status(409).json({
          message: "Email já está em uso.",
        });
      }

      return res.status(500).json({
        message: "Erro interno no servidor.",
      });
    }
  },

  /**
   * Remove um secretário do banco
   * @param req Request do Express (req.params.id)
   * @param res Response do Express
   * @returns Status 204 (sem conteúdo), erro 404 se não encontrado ou erro 500
   */
  async deleteSecretario(req: Request, res: Response) {
    try {
      await secretarioService.remove(Number(req.params.id));
      return res.status(204).send();
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({
          message: "Secretário não encontrado.",
        });
      }

      return res.status(500).json({
        message: "Erro interno no servidor.",
      });
    }
  },
};

export default secretarioController;
