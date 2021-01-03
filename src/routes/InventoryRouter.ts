import { Router } from 'express'
import * as Component from '../components/Inventory'
import Model from '../components/Inventory/model'
import { advancedResults } from '../util/advancedResults'
/**
 * @constant {express.Router}
 */
const router: Router = Router()

/**
 * GET method route
 * @example http://localhost:PORT/v1/inventories
 *
 * @swagger
 * /v1/inventories:
 *   get:
 *     description: Get all stored inventories in Database
 *     tags: ["inventory"]
 *     security:
 *      - cookieAuth: []
 *     parameters:
 *       'select', 'sort', 'page', 'limit'
 *     responses:
 *       200:
 *         description: An array of inventories
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/Inventories'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.route("/").get(advancedResults(Model), Component.findAll)

/**
 * POST method route
 * @example http://localhost:PORT/v1/inventories
 *
 * @swagger
 * /v1/inventories:
 *   post:
 *      description: Create new inventory
 *      tags: ["inventory"]
 *      security:
 *       - cookieAuth: []
 *      requestBody:
 *        description: inventory creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/InventorySchema'
 *            example:
 *              {
 *                  "seq": "1",
 *                  "mcid": "SS0001TV3Z0ZPW0",
 *                  "material_id": "517",
 *                  "material_type": "COATING",
 *                  "jpo": "0",
 *                  "invoice_num": "M40307",
 *                  "jon": "0",
 *                  "ptn": "0",
 *                  "qty": "4000",
 *                  "unit_cost": "0",
 *                  "instock_datetime": "2014-01-31 13:33:56",
 *                  "inventory_datetime": "2014-01-31 13:33:56",
 *                  "start_datetime": "0000-00-00 00:00:00",
 *                  "end_datetime": "2016-11-30 11:49:14",
 *                  "station_id": "",
 *                  "personal": "store",
 *                  "status": "VOID"
 *              }
 *      responses:
 *        201:
 *          description: return created user
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/InventorySchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post('/', Component.create)

/**
 * Update method route
 * @example http://localhost:PORT/v1/inventories/:id
 *
 * @swagger
 * /v1/inventories/:id:
 *   post:
 *      description: Update inventory by id
 *      tags: ["inventory"]
 *      security:
 *       - cookieAuth: []
 *      requestBody:
 *        description: user creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/InventorySchema'
 *            example:
 *              {
 *                  "material_id": "517"
 *              }
 *      responses:
 *        201:
 *          description: return created user
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/InventorySchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.route('/:id').put(Component.update)
/**
 * GET method route
 * @example http://localhost:PORT/v1/inventories/:id
 *
 * @swagger
 * /v1/inventories/{id}:
 *  get:
 *    description: Get inventory by id
 *    tags: ["inventories"]
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique userId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return user by id
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/InventorySchema'
 */
router.get('/:id', Component.findOne)

/**
 * DELETE method route
 * @example  http://localhost:PORT/v1/inventories/:id
 *
 * @swagger
 * /v1/inventories/{id}:
 *  delete:
 *    description: Delete user by userId
 *    tags: ["inventories"]
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique userId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return deleted inventory
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/InventorySchema'
 */
router.delete('/:id', Component.remove)

/**
 * @export {express.Router}
 */
export default router
