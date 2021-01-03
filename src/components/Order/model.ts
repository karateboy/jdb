import * as connections from '../../config/connection/connection'
import { Schema } from 'mongoose'
import { NextFunction } from 'express'

/**
 * @swagger
 * components:
 *  schemas:
 *    CustomerSchema:
 *      required:
 *      properties:
 *    Users:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/OrderSchema'
 */
const OrderSchema: Schema = new Schema(
    {
        "jon": String,
        "customer": String,
        "order_number": String,
        "order_note": String,
        "order_clerk": String,
        "order_datetime": String,
        "order_progress": String,
        "auth_code": String,
        "order_item_count": String,
        "order_item_completed": String,
        "ack_datetime": String,
        "order_revision": String,
        "order_item": Array,
        "order_log": String,
        "product_codes": Array,
        "new_jobs": Object,
        "shipping_record": Array
    },
    {
        collection: 'jtOrder',
        versionKey: false,
    }
    // tslint:disable-next-line: ter-prefer-arrow-callback
).pre('save', async function (next: NextFunction): Promise<void> {
    return next()
})

export default connections.db.model('OrderModel', OrderSchema)
