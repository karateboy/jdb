import { Router } from 'express'
import * as Component from '../components/Code'
import Model from '../components/Code/model'
import { advancedResults } from '../util/advancedResults'
/**
 * @constant {express.Router}
 */
const router: Router = Router()

/**
 * GET method route
 * @example http://localhost:PORT/v1/codes
 *
 * @swagger
 * /v1/customers:
 *   get:
 *     description: Get all stored customers in Database
 *     tags: ["code"]
 *     security:
 *      - cookieAuth: []
 *  parameters:
 *       'select', 'sort', 'page', 'limit'
 *     responses:
 *       200:
 *         description: An array of codes
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/Code'
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
 * @example http://localhost:PORT/v1/codes
 *
 * @swagger
 * /v1/codes:
 *   post:
 *      description: Create new code
 *      tags: ["customer"]
 *      security:
 *       - cookieAuth: []
 *      requestBody:
 *        description: code creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/codeSchema'
 *            example:
 *              POST http://{{URL}}/v1/codes
 *              body:
 *          {    
 *              "seq": "1",
 *              "code": "red",
 *              "code_type": "PRINT_TYPE",
 *              "code_desc": "PLATFORM",
 *              "code_label": "PLATFORM",
 *              "code_label_thai": "PLATFORM",
 *              "code_label_chinese": "PLATFORM"
 *          }
 *      responses:
 *        201:
 *          description: return created code
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/CodeSchema'
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
 * @example http://localhost:PORT/v1/codes/:_id
 *
 * @swagger
 * /v1/codes:
 *   put:
 *      description: Update Code
 *      tags: ["code"]
 *      security:
 *       - cookieAuth: []
 *      requestBody:
 *        description: update code content
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CodeSchema'
 *            example: set code to "red"
 *              http://{URL}/v1/codes/5e5e0dedb0180000fd006fb1
 *              body:
 *              {
 *                  "code": "red"
 *                }
 *      responses:
 *        201:
 *          description: return created code
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/CodeSchema'
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
 * @example http://localhost:PORT/v1/codes/:id
 *
 * @swagger
 * /v1/codes/{id}:
 *  get:
 *    description: Get code by Id
 *    tags: ["code"]
 *    security:
 *      - cookieAuth: []
 *    parameters:
 
 *    responses:
 *      200:
 *        description: return code by id
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/codeSchema'
 */
router.get('/:id', Component.findOne)

/**
 * DELETE method route
 * @example  http://localhost:PORT/v1/codes/:id
 *
 * @swagger
 * /v1/codes/{id}:
 *  delete:
 *    description: Delete code by Id
 *    tags: ["codes"]
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *    responses:
 *      200:
 *        description: return deleted code
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/codeSchema'
 */
router.delete('/:id', Component.remove)

/**
 * @export {express.Router}
 */
export default router
