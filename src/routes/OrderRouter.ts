import { Router } from 'express'
import * as OrderComponent from '../components/Order'
import OrderModel from '../components/Order/model'
import { advancedResults } from '../util/advancedResults'
/**
 * @constant {express.Router}
 */
const router: Router = Router()

/**
 * GET method route
 * @example http://localhost:PORT/v1/orders
 *
 * @swagger
 * /v1/orders:
 *   get:
 *     description: Get all stored orders in Database
 *     tags: ["order"]
 *     security:
 *      - cookieAuth: []
 *     parameters:
 *       'select', 'sort', 'page', 'limit'
 *     responses:
 *       200:
 *         description: An array of orders
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/Orders'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.route("/").get(advancedResults(OrderModel), OrderComponent.findAll)

/**
 * POST method route
 * @example http://localhost:PORT/v1/orders
 *
 * @swagger
 * /v1/orders:
 *   post:
 *      description: Create new Order
 *      tags: ["order"]
 *      security:
 *       - cookieAuth: []
 *      requestBody:
 *        description: order creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/OrderSchema'
 *            example:
 *              {
 *                 "order_item": [
 *                  {
 *                      "work_id": "5ebbacf4c27e00008f003792",
 *                      "jwn": "91791",
 *                      "due_date": "2006-05-05",
 *                      "SKU_code": "IRC-0001",
 *                      "SKU_number": "275",
 *                      "SKU_customer": "",
 *                      "order_qty": "10000",
 *                      "work_qty": "10150",
 *                      "print_type": "PLATFORM",
 *                      "work_type": "#FFF",
 *                      "unit_price": "0",
 *                      "work_progress": "DONE"
 *                  },
 *              ],
 *              "product_codes": ["ABC"],
 *              "shipping_record": [],
 *              "jon": "5",
 *              "customer": "IRC",
 *              "order_number": "PO:4500065291",
 *              "order_note": "",
 *              "order_clerk": "cliao",
 *              "order_datetime": "2006-04-26 16:22:15",
 *              "order_progress": "DONE",
 *              "auth_code": "",
 *              "order_item_count": "6",
 *              "order_item_completed": "6",
 *              "ack_datetime": "0000-00-00 00:00:00",
 *              "order_revision": "0",
 *              "order_log": ""
 *          }
 *      responses:
 *        201:
 *          description: return created order
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/orderSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post('/', OrderComponent.create)

/**
 * Update method route
 * @example http://localhost:PORT/v1/orders/5ebbace9ac6100005c0004e2
 *
 * @swagger
 * /v1/orders:
 *   put:
 *      description: Update order by Id
 *      tags: ["order"]
 *      security:
 *       - cookieAuth: []
 *      requestBody:
 *        description: update order by request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/orderSchema'
 *            example:
 *              {
 *                 "product_codes" : [ "ABC"]
 *              }
 *      responses:
 *        201:
 *          description: return created order
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/orderSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.route('/:id').put(OrderComponent.update)
/**
 * GET method route
 * @example http://localhost:PORT/v1/orders/:id
 *
 * @swagger
 * /v1/orders/{id}:
 *  get:
 *    description: Get order by order Id
 *    tags: ["orders"]
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      200:
 *        description: return order by id
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/orderSchema'
 */
router.get('/:id', OrderComponent.findOne)

/**
 * DELETE method route
 * @example  http://localhost:PORT/v1/orders/:id
 *
 * @swagger
 * /v1/orders/{id}:
 *  delete:
 *    description: Delete order by Id
 *    tags: ["orders"]
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique orderId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return deleted order
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/orderSchema'
 */
router.delete('/:id', OrderComponent.remove)

/**
 * @export {express.Router}
 */
export default router
