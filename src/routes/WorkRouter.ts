import { Router } from 'express'
import * as WorkComponent from '../components/Work'
import WorkModel from '../components/Work/model'
import { advancedResults } from '../util/advancedResults'
/**
 * @constant {express.Router}
 */
const router: Router = Router()

/**
 * GET method route
 * @example http://localhost:PORT/v1/works
 *
 * @swagger
 * /v1/works:
 *   get:
 *     description: Get all stored works in Database
 *     tags: ["work"]
 *     security:
 *      - cookieAuth: []
 *     parameters:
 *       'select', 'sort', 'page', 'limit'
 *     responses:
 *       200:
 *         description: An array of works
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/Works'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.route("/").get(advancedResults(WorkModel), WorkComponent.findAll)

/**
 * POST method route
 * @example http://localhost:PORT/v1/works
 *
 * @swagger
 * /v1/works:
 *   post:
 *      description: Create new Work
 *      tags: ["work"]
 *      security:
 *       - cookieAuth: []
 *      requestBody:
 *        description: work creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/WorkSchema'
 *            example:
 *              {
 ...
 *              }
 *      responses:
 *        201:
 *          description: return created work
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/workSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post('/', WorkComponent.create)

/**
 * Update method route
 * @example http://localhost:PORT/v1/works/5e70616f26520000ef0060b1
 *
 * @swagger
 * /v1/works:
 *   put:
 *      description: Update work by Id
 *      tags: ["work"]
 *      security:
 *       - cookieAuth: []
 *      requestBody:
 *        description: update work by request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/workSchema'
 *            example:
 *              {
 *                  "shipping_record": [],
 *              }
 *      responses:
 *        201:
 *          description: return created work
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/workSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.route('/:id').put(WorkComponent.update)
/**
 * GET method route
 * @example http://localhost:PORT/v1/works/:id
 *
 * @swagger
 * /v1/works/{id}:
 *  get:
 *    description: Get work by work Id
 *    tags: ["works"]
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      200:
 *        description: return work by id
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/workSchema'
 */
router.get('/:id', WorkComponent.findOne)

/**
 * DELETE method route
 * @example  http://localhost:PORT/v1/works/:id
 *
 * @swagger
 * /v1/works/{id}:
 *  delete:
 *    description: Delete work by Id
 *    tags: ["works"]
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique workId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return deleted work
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/workSchema'
 */
router.delete('/:id', WorkComponent.remove)

/**
 * @export {express.Router}
 */
export default router
