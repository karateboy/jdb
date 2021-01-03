import { Router } from 'express'
import * as ProductComponent from '../components/Product'
import ProductModel from '../components/Product/model'
import { advancedResults } from '../util/advancedResults'
/**
 * @constant {express.Router}
 */
const router: Router = Router()

/**
 * GET method route
 * @example http://localhost:PORT/v1/products
 *
 * @swagger
 * /v1/products:
 *   get:
 *     description: Get all stored products in Database
 *     tags: ["product"]
 *     security:
 *      - cookieAuth: []
 *     parameters:
 *       'select', 'sort', 'page', 'limit'
 *     responses:
 *       200:
 *         description: An array of products
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/Products'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.route("/").get(advancedResults(ProductModel), ProductComponent.findAll)

/**
 * POST method route
 * @example http://localhost:PORT/v1/products
 *
 * @swagger
 * /v1/products:
 *   post:
 *      description: Create new Product
 *      tags: ["product"]
 *      security:
 *       - cookieAuth: []
 *      requestBody:
 *        description: product creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductSchema'
 *            example:
 *              {
 *                  "printing_seq": [],
 *                  "order_history": [],
 *                  "shipping_record": [],
 *                  "storage_record": [],
 *                  "change_log": [],
 *                  "display": "Y",
 *                  "ptn": "1",
 *                  "product_code": "SK",
 *                  "product_number": "0016",
 *                  "product_spec": "",
 *                  "product_name": "MUAY THAI SIZE 2 CM",
 *                  "paper_code": "OPP#20MK",
 *                  "product_width": "150",
 *                  "product_length": "300",
 *                  "prints": "88",
 *                  "unit": "SHEET",
 *                  "cuts": "1",
 *                  "print_type": "PLATFORM",
 *                  "note": "โต๊ะ 12 ช่อง 6",
 *                  "laminate": "NO",
 *                  "tape_code": "NONE",
 *                  "dicut": "0%",
 *                  "dicut_plate": "0",
 *                  "dicut_type": "NONE",
 *                  "cell": "89",
 *                  "stock": "39",
 *                  "colors": "5",
 *                  "layers": "1",
 *                  "rescreen": "NO",
 *                  "create_date": "2006-04-26",
 *                  "clerk": "pu",
 *                  "ext_ref": "",
 *                  "paper_id": "121",
 *                  "pack": "PACK",
 *                  "pack_size": "1",
 *                  "pack_unit": "",
 *                  "EAN": "N/A",
 *                  "pattern_spec": "0",
 *                  "unit_length": "0",
 *                  "unit_width": "0",
 *                  "unit_price": "0",
 *                  "pcns": "SK_0016"
 *              }
 *      responses:
 *        201:
 *          description: return created product
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/productSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post('/', ProductComponent.create)

/**
 * Update method route
 * @example http://localhost:PORT/v1/products/5e70616f26520000ef0060b1
 *
 * @swagger
 * /v1/products:
 *   put:
 *      description: Update product by Id
 *      tags: ["product"]
 *      security:
 *       - cookieAuth: []
 *      requestBody:
 *        description: update product by request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/productSchema'
 *            example:
 *              {
 *                  "printing_seq": []
 *              }
 *      responses:
 *        201:
 *          description: return created product
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/productSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.route('/:id').put(ProductComponent.update)
/**
 * GET method route
 * @example http://localhost:PORT/v1/products/:id
 *
 * @swagger
 * /v1/products/{id}:
 *  get:
 *    description: Get product by product Id
 *    tags: ["products"]
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      200:
 *        description: return product by id
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/productSchema'
 */
router.get('/:id', ProductComponent.findOne)

/**
 * DELETE method route
 * @example  http://localhost:PORT/v1/products/:id
 *
 * @swagger
 * /v1/products/{id}:
 *  delete:
 *    description: Delete product by Id
 *    tags: ["products"]
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique productId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return deleted product
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/productSchema'
 */
router.delete('/:id', ProductComponent.remove)

/**
 * @export {express.Router}
 */
export default router
