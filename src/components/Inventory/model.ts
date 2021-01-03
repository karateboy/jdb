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
 *        _id:
 *          type: objectId
 *        display:
 *          type: string
 *        customer_code:
 *          type: string
 *        customer_name:
 *          type: string
 *        payment_term:
 *          type: string
 *        sales:
 *          type: string
 *          format: date
 *        create_date:
 *          type: string
 *
 *    Users:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/CustomerSchema'
 */
const InventorySchema: Schema = new Schema(
    {
        seq: String,
        mcid: String,
        material_id: String,
        material_type: String,
        jpo: String,
        invoice_num: String,
        jon: String,
        ptn: String,
        qty: String,
        unit_cost: String,
        instock_datetime: String,
        inventory_datetime: String,
        start_datetime: String,
        end_datetime: String,
        station_id: String,
        personal: String,
        status: String,
    },
    {
        collection: 'jtInventory',
        versionKey: false,
    }
    // tslint:disable-next-line: ter-prefer-arrow-callback
).pre('save', async function (next: NextFunction): Promise<void> {
    return next()
})

export default connections.db.model('InventoryModel', InventorySchema)
