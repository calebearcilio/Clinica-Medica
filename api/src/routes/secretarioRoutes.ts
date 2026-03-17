import { Router } from "express";
import secretarioController from "../controllers/secretarioController";
import { validateBody, validateParams } from "../middlewares/schemaValidation";
import {
  createSecretarioSchema,
  loginSecretarioSchema,
  updateSecretarioSchema,
} from "../schemas/secretarioSchemas";
import { idParamSchema } from "../schemas/idParamSchema";
import { validateAuth } from "../middlewares/authValidation";

const router: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Secretários
 *   description: Gerenciamento de secretários
 */

/**
 * @swagger
 * /secretarios:
 *   get:
 *     summary: Retorna todos os secretários cadastrados no sistema
 *     tags: [Secretários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de secretários
 *       401:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/secretarios", validateAuth, secretarioController.getAllSecretarios);

/**
 * @swagger
 * /secretarios/{id}:
 *   get:
 *     summary: Retorna um secretário pelo ID
 *     tags: [Secretários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Secretário encontrado
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Token inválido ou expirado
 *       404:
 *         description: Secretário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get(
  "/secretarios/:id",
  validateAuth,
  validateParams(idParamSchema),
  secretarioController.getSecretarioById
);

/**
 * @swagger
 * /secretarios:
 *   post:
 *     summary: Adiciona um novo secretário que irá usar o sistema
 *     tags: [Secretários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               telefone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Secretário criado com sucesso
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro interno do servidor
 */
router.post(
  "/secretarios",
  validateBody(createSecretarioSchema),
  secretarioController.createSecretario
);

/**
 * @swagger
 * /secretarios/{id}:
 *   put:
 *     summary: Atualiza informações de um secretário
 *     tags: [Secretários]
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
 *               telefone:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Secretário atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       401:
 *         description: Token inválido ou expirado
 *       404:
 *         description: Secretário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put(
  "/secretarios/:id",
  validateAuth,
  validateParams(idParamSchema),
  validateBody(updateSecretarioSchema),
  secretarioController.updateSecretario
);

/**
 * @swagger
 * /secretarios/{id}:
 *   delete:
 *     summary: Remove um secretário do sistema
 *     tags: [Secretários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Secretário deletado com sucesso
 *       401:
 *         description: Token inválido ou expirado
 *       404:
 *         description: Secretário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete(
  "/secretarios/:id",
  validateAuth,
  validateParams(idParamSchema),
  secretarioController.deleteSecretario
);

/**
 * @swagger
 * /secretarios/login:
 *   post:
 *     summary: Realiza autenticação de um secretário
 *     tags: [Secretários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               keepLogin:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       200:
 *         description: Secretário autenticado com sucesso
 *       400:
 *         description: Erro na requisição
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno do servidor
 */
router.post(
  "/secretarios/login",
  validateBody(loginSecretarioSchema),
  secretarioController.getSecretarioByLogin
);

export default router;
