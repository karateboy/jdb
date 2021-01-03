import { Router } from 'express'
import * as MaterialComponent from '../components/Material'
import MaterialModel from '../components/Material/model'
import { advancedResults } from '../util/advancedResults'
/**
 * @constant {express.Router}
 */
const router: Router = Router()

/**
 * GET method route
 * @example http://localhost:PORT/v1/materials
 *
 * @swagger
 * /v1/materials:
 *   get:
 *     description: Get all stored materials in Database
 *     tags: ["material"]
 *     security:
 *      - cookieAuth: []
 *     parameters:
 *       'select', 'sort', 'page', 'limit'
 *     responses:
 *       200:
 *         description: An array of materials
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/Materials'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.route("/").get(advancedResults(MaterialModel), MaterialComponent.findAll)

/**
 * POST method route
 * @example http://localhost:PORT/v1/materials
 *
 * @swagger
 * /v1/materials:
 *   post:
 *      description: Create new Material
 *      tags: ["material"]
 *      security:
 *       - cookieAuth: []
 *      requestBody:
 *        description: material creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MaterialSchema'
 *            example:
 *              {
 *                  "inventory_record": [],
 *                  "active": "0",
 *                  "id": "2",
 *                  "parent": "0",
 *                  "material_code": "G-TK",
 *                  "material_type": "INK",
 *                  "material_label": "TK",
 *                  "supplier": "DY-TAIWAN",
 *                  "supplier_ref": "TK",
 *                  "childname": "TK",
 *                  "cost": "450",
 *                  "material_name": "VINYL SOLVENT BASED INK SERIES ",
 *                  "material_desc": "VINYL SOLVENT BASED INK SERIES ",
 *                  "material_width": "1",
 *                  "material_length": "1",
 *                  "pack_unit": "CAN",
 *                  "standard_qty": "4",
 *                  "standard_unit": "KG",
 *                  "store_cell": "STORAGE",
 *                  "pack_unit_balance": "0",
 *                  "standard_unit_balance": "0",
 *                  "reserve": "10",
 *                  "retention": "3",
 *                  "retention_period": "YEAR",
 *                  "last_datetime": "2013-04-02 00:00:00",
 *                  "clerk": "cliao"
 *              }
 *      responses:
 *        201:
 *          description: return created material
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/materialSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post('/', MaterialComponent.create)

/**
 * Update method route
 * @example http://localhost:PORT/v1/materials/5e70616f26520000ef0060b1
 *
 * @swagger
 * /v1/materials:
 *   put:
 *      description: Update material by Id
 *      tags: ["material"]
 *      security:
 *       - cookieAuth: []
 *      requestBody:
 *        description: update material by request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/materialSchema'
 *            example:
 *              {
 *                  "active": "0"
 *              }
 *      responses:
 *        201:
 *          description: return created material
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/materialSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.route('/:id').put(MaterialComponent.update)
/**
 * GET method route
 * @example http://localhost:PORT/v1/materials/:id
 *
 * @swagger
 * /v1/materials/{id}:
 *  get:
 *    description: Get material by material Id
 *    tags: ["materials"]
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      200:
 *        description: return material by id
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/materialSchema'
 */
router.get('/:id', MaterialComponent.findOne)

/**
 * DELETE method route
 * @example  http://localhost:PORT/v1/materials/:id
 *
 * @swagger
 * /v1/materials/{id}:
 *  delete:
 *    description: Delete material by Id
 *    tags: ["materials"]
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique materialId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return deleted material
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/materialSchema'
 */
router.delete('/:id', MaterialComponent.remove)

/**
 * @export {express.Router}
 */
export default router
