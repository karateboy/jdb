import { Router } from 'express'
import { CustomerComponent } from '../components'
import CustomerModel from '../components/Customer/model'
import { advancedResults } from '../util/advancedResults'
/**
 * @constant {express.Router}
 */
const router: Router = Router()

/**
 * GET method route
 * @example http://localhost:PORT/v1/customers
 *
 * @swagger
 * /v1/customers:
 *   get:
 *     description: Get all stored customers in Database
 *     tags: ["customer"]
 *     security:
 *      - cookieAuth: []
 *     parameters:
 *       'select', 'sort', 'page', 'limit'
 *     responses:
 *       200:
 *         description: An array of customers
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/Customers'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.route("/").get(advancedResults(CustomerModel), CustomerComponent.findAll)

/**
 * POST method route
 * @example http://localhost:PORT/v1/customers
 *
 * @swagger
 * /v1/customers:
 *   post:
 *      description: Create new Customer
 *      tags: ["customer"]
 *      security:
 *       - cookieAuth: []
 *      requestBody:
 *        description: customer creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CustomerSchema'
 *            example:
 *              {
 *                  "display": "Y",
 *                  "customer_code": "MAX",
 *                  "customer_name": "บริษัท แม๊กซิส อินเตอร์เนชั่นแนล (ประเทศไทย)จำกัด",
 *                  "payment_term": "60",
 *                  "sales": "",
 *                  "create_date": "2006-04-25",
 *                  "account_type": "A",
 *                  "subPack": "Y"
 *              }
 *      responses:
 *        201:
 *          description: return created customer
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/customerSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post('/', CustomerComponent.create)

/**
 * Update method route
 * @example http://localhost:PORT/v1/customers/5e70616f26520000ef0060b1
 *
 * @swagger
 * /v1/customers:
 *   put:
 *      description: Update customer by Id
 *      tags: ["customer"]
 *      security:
 *       - cookieAuth: []
 *      requestBody:
 *        description: update customer by request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/customerSchema'
 *            example:
 *              {
 *                  "display": "Y"
 *              }
 *      responses:
 *        201:
 *          description: return created customer
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/customerSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.route('/:id').put(CustomerComponent.update)
/**
 * GET method route
 * @example http://localhost:PORT/v1/customers/:id
 *
 * @swagger
 * /v1/customers/{id}:
 *  get:
 *    description: Get customer by customerId
 *    tags: ["s"]
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      200:
 *        description: return customer by id
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/customerSchema'
 */
router.get('/:id', CustomerComponent.findOne)

/**
 * DELETE method route
 * @example  http://localhost:PORT/v1/customers/:id
 *
 * @swagger
 * /v1/customers/{id}:
 *  delete:
 *    description: Delete customer by Id
 *    tags: ["customers"]
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique customerId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return deleted customer
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/customerSchema'
 */
router.delete('/:id', CustomerComponent.remove)

/**
 * @export {express.Router}
 */
export default router
