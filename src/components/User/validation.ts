import * as Joi from 'joi'
import Validation from '../validation'
import { IUserModel } from './model'

/**
 * @export
 * @class UserValidation
 * @extends Validation
 */
class UserValidation extends Validation {
    /**
     * Creates an instance of UserValidation.
     * @memberof UserValidation
     */
    constructor() {
        super()
    }

    /**
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult<IUserModel >}
     * @memberof UserValidation
     */
    createUser(params: IUserModel): Joi.ValidationResult<IUserModel> {
        const schema: Joi.Schema = Joi.object().keys({
            name: Joi.string().required(),
            username: Joi.string().required(),
        })

        return Joi.validate(params, schema)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
    getUser(body: {
        username: string
    }): Joi.ValidationResult<{
        username: string
    }> {
        const schema: Joi.Schema = Joi.object().keys({
            username: Joi.string().required(),
        })

        return Joi.validate(body, schema)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
    removeUser(body: {
        username: string
    }): Joi.ValidationResult<{
        username: string
    }> {
        const schema: Joi.Schema = Joi.object().keys({
            username: Joi.string().required(),
        })

        return Joi.validate(body, schema)
    }
}

export default new UserValidation()
