import * as Joi from 'joi'
import UserModel, { IUserModel } from './model'
import UserValidation from './validation'
import { IUserService } from './interface'
import { Types } from 'mongoose'

/**
 * @export
 * @implements {IUserModelService}
 */
const UserService: IUserService = {
    /**
     * @returns {Promise < IUserModel[] >}
     * @memberof UserService
     */
    async findAll(): Promise<IUserModel[]> {
        try {
            return await UserModel.find({})
        } catch (error) {
            throw new Error(error.message)
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */
    async findOne(username: string): Promise<IUserModel> {
        try {
            const validate: Joi.ValidationResult<{
                username: string
            }> = UserValidation.getUser({
                username,
            })

            if (validate.error) {
                throw new Error(validate.error.message)
            }

            return await UserModel.findOne({
                username,
            })
        } catch (error) {
            throw new Error(error.message)
        }
    },

    /**
     * @param {IUserModel} user
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */
    async insert(body: IUserModel): Promise<IUserModel> {
        try {
            const validate: Joi.ValidationResult<IUserModel> = UserValidation.createUser(
                body
            )

            if (validate.error) {
                throw new Error(validate.error.message)
            }

            const user: IUserModel = await UserModel.create(body)

            return user
        } catch (error) {
            throw new Error(error.message)
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */
    async remove(username: string): Promise<IUserModel> {
        try {
            const validate: Joi.ValidationResult<{
                username: string
            }> = UserValidation.removeUser({
                username,
            })

            if (validate.error) {
                throw new Error(validate.error.message)
            }

            const user: IUserModel = await UserModel.findOneAndRemove({
                username
            })

            return user
        } catch (error) {
            throw new Error(error.message)
        }
    },
}

export default UserService
