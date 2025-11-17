import { Router } from "express";
import * as medicoController from "../controllers/medicoController";
import { validateBody, validateParams } from "../middlewares/validations";
import {
  createMedicoSchema,
  updateMedicoSchema,
} from "../schemas/medicoSchemas";
import { idParamSchema } from "../schemas/idParamSchema";

const router: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Médicos
 *   description: Gerenciamento de médicos
 */

/**
 * @swagger
 * /medicos:
 *   get:
 *     summary: Retorna todos os médicos cadastrados no banco
 *     tags: [Médicos]
 *     responses:
 *       200:
 *         description: Lista de médicos
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/medicos", medicoController.getAllMedicos);

/**
 * @swagger
 * /medicos/{id}:
 *   get:
 *     summary: Retorna um médico pelo ID
 *     tags: [Médicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Médico encontrado
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Médico não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get(
  "/medicos/:id",
  validateParams(idParamSchema),
  medicoController.getById
);

/**
 * @swagger
 * /medicos:
 *   post:
 *     summary: Cria um novo médico no sistema
 *     tags: [Médicos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - crm
 *               - especialidade
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               crm:
 *                 type: string
 *               especialidade:
 *                 type: string
 *               telefone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Médico criado com sucesso
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro interno do servidor
 */
router.post(
  "/medicos",
  validateBody(createMedicoSchema),
  medicoController.createMedico
);

/**
 * @swagger
 * /medicos/{id}:
 *   put:
 *     summary: Atualiza um médico
 *     tags: [Médicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               crm:
 *                 type: string
 *               especialidade:
 *                 type: string
 *               telefone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Médico atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Médico não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put(
  "/medicos/:id",
  validateParams(idParamSchema),
  validateBody(updateMedicoSchema),
  medicoController.updateMedico
);

/**
 * @swagger
 * /medicos/{id}:
 *   delete:
 *     summary: Deleta um médico
 *     tags: [Médicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Médico deletado com sucesso
 *       404:
 *         description: Médico não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete(
  "/medicos/:id",
  validateParams(idParamSchema),
  medicoController.deleteMedico
);

export default router;
