import * as bcrypt from 'bcrypt'
import * as connections from '../../config/connection/connection'
import * as crypto from 'crypto'
import { Document, Schema } from 'mongoose'
import { NextFunction } from 'express'

/**
 * @export
 * @interface IUserModel
 * @extends {Document}
 */
export interface IUserModel extends Document {
    username: string
    password: string

    comparePassword: (password: string) => Promise<boolean>
}

export type AuthToken = {
    accessToken: string
    kind: string
}

/**
 * @swagger
 * components:
 *  schemas:
 *    UserSchema:
 *      required:
 *        - email
 *        - name
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        passwordResetToken:
 *          type: string
 *        passwordResetExpires:
 *          type: string
 *          format: date
 *        tokens:
 *          type: array
 *    Users:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/UserSchema'
 */
const UserSchema: Schema = new Schema(
    {
        id: String,
        username: {
            type: String,
            unique: true,
            trim: true,
        },
        password: String,
        lastname: String,
        firstname: String,
        worktitle: String,
        language: String,
        startpage: String,
        landing: String,
        timeout: String,
        ipAddress: String,
        station: String,
        station_successor: String,
        station_group: String,
        station_successor_group: String,
        processor: String,
        batch_passcode: String,
        office_link: String,
        floor_link: String,
        logistics: String,
    },
    {
        collection: 'jtUser',
        versionKey: false,
    }
    // tslint:disable-next-line: ter-prefer-arrow-callback
).pre('save', async function (next: NextFunction): Promise<void> {
    /* const user: any = this // tslint:disable-line

    if (!user.isModified('password')) {
        return next()
    }

    try {
        const salt: string = await bcrypt.genSalt(10)

        const hash: string = await bcrypt.hash(user.password, salt)

        user.password = hash
        next()
    } catch (error) {
        return next(error)
    } */

    return next()
})

/**
 * Method for comparing passwords
 */
UserSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    try {
        /* const match: boolean = await bcrypt.compare(
            candidatePassword,
            this.password
        )
        */

        return this.password === candidatePassword
    } catch (error) {
        return error
    }
}

/**
 * Helper method for getting user's gravatar.
 */
UserSchema.methods.gravatar = function (size: number): string {
    if (!size) {
        size = 200
    }
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`
    }
    const md5: string = crypto
        .createHash('md5')
        .update(this.email)
        .digest('hex')

    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`
}

export default connections.db.model<IUserModel>('UserModel', UserSchema)
