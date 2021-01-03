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
const CodeSchema: Schema = new Schema(
    {
        //_id: Schema.Types.ObjectId,
        seq: String,
        code: String,
        code_type: String,
        code_desc: String,
        code_label: String,
        code_label_thai: String,
        code_label_chinese: String,
    },
    {
        collection: 'jtCode',
        versionKey: false,
    }
    // tslint:disable-next-line: ter-prefer-arrow-callback
).pre('save', async function (next: NextFunction): Promise<void> {
    return next()
})

export default connections.db.model('CodeModel', CodeSchema)
