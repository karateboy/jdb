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
const CustomerSchema: Schema = new Schema(
    {
        //_id: Schema.Types.ObjectId,
        display: String,
        customer_code: String,
        customer_name: String,
        payment_term: String,
        sales: String,
        create_date: String,
        account_type: String,
        subPack: String
    },
    {
        collection: 'jtCustomer',
        versionKey: false,
    }
    // tslint:disable-next-line: ter-prefer-arrow-callback
).pre('save', async function (next: NextFunction): Promise<void> {
    return next()
})

export default connections.db.model('CustomerModel', CustomerSchema)
