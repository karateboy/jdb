import * as connections from '../../config/connection/connection'
import { Mongoose, Schema } from 'mongoose'
import { NextFunction } from 'express'

/**
 * @swagger
 * components:
 *  schemas:
 *    WorkSchema:
 *      required:
 *      properties:
 *          
 *    Users:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/WorkSchema'
 */
const WorkSchema: Schema = new Schema(
    {
        "jwn": String,
        "ptn": String,
        "pcns": String,
        "product_code": String,
        "jon": String,
        "order_due": String,
        "order_qty": String,
        "work_qty": String,
        "qty_unit": String,
        "print_type": String,
        "work_note": String,
        "entry": String,
        "verify": String,
        "work_progress": String,
        "rework": String,
        "print_length": String,
        "stock_out": String,
        "stock_in": String,
        "stock_status": String,
        "passcode": String,
        "entry_datetime": String,
        "work_type": String,
        "job_qty": String,
        "net_qty": String,
        "qc_qty": String,
        "qc_fail": String,
        "unit_price": String,
        "priority": String,
        "order": Object,
        "order_id": Schema.Types.ObjectId,
        "product": Object,
        "product_id": Schema.Types.ObjectId,
        "shipping_record": Array,
        "work_log": Array
    },
    {
        collection: 'jtWork',
        versionKey: false,
    }
    // tslint:disable-next-line: ter-prefer-arrow-callback
).pre('save', async function (next: NextFunction): Promise<void> {
    return next()
})

export default connections.db.model('WorkModel', WorkSchema)
