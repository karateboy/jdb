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
const MaterialSchema: Schema = new Schema(
    {
        "active": String,
        "id": String,
        "parent": String,
        "material_code": String,
        "material_type": String,
        "material_label": String,
        "supplier": String,
        "supplier_ref": String,
        "childname": String,
        "cost": String,
        "material_name": String,
        "material_desc": String,
        "material_width": String,
        "material_length": String,
        "pack_unit": String,
        "standard_qty": String,
        "standard_unit": String,
        "store_cell": String,
        "pack_unit_balance": String,
        "standard_unit_balance": String,
        "reserve": String,
        "retention": String,
        "retention_period": String,
        "last_datetime": String,
        "clerk": String,
        "inventory_record": Array
    },
    {
        collection: 'jtMaterial',
        versionKey: false,
    }
    // tslint:disable-next-line: ter-prefer-arrow-callback
).pre('save', async function (next: NextFunction): Promise<void> {
    return next()
})

export default connections.db.model('MaterialModel', MaterialSchema)
