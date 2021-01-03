import * as connections from '../../config/connection/connection'
import { Schema } from 'mongoose'
import { NextFunction } from 'express'

/**
 * @swagger
 * components:
 *  schemas:
 *    ProductSchema:
 *      required:
 *      properties:
 *          
 *    Users:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/CustomerSchema'
 */
const ProducySchema: Schema = new Schema(
    {
        "display": String,
        "ptn": String,
        "product_code": String,
        "product_number": String,
        "product_spec": String,
        "product_name": String,
        "paper_code": String,
        "product_width": String,
        "product_length": String,
        "prints": String,
        "unit": String,
        "cuts": String,
        "print_type": String,
        "note": String,
        "laminate": String,
        "tape_code": String,
        "dicut": String,
        "dicut_plate": String,
        "dicut_type": String,
        "cell": String,
        "stock": String,
        "colors": String,
        "layers": String,
        "rescreen": String,
        "create_date": String,
        "clerk": String,
        "ext_ref": String,
        "paper_id": String,
        "pack": String,
        "pack_size": String,
        "pack_unit": String,
        "EAN": String,
        "pattern_spec": String,
        "unit_length": String,
        "unit_width": String,
        "unit_price": String,
        "pcns": String,
        "printing_seq": Array,
        "order_history": Array,
        "shipping_record": Array,
        "storage_record": Array,
        "change_log": Array
    },
    {
        collection: 'jtProduct',
        versionKey: false,
    }
    // tslint:disable-next-line: ter-prefer-arrow-callback
).pre('save', async function (next: NextFunction): Promise<void> {
    return next()
})

export default connections.db.model('ProducyModel', ProducySchema)
