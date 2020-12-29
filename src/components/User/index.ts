import { HttpError } from '../../config/error'
import UserModel, { IUserModel } from './model'
import { NextFunction, Request, Response } from 'express'
import asyncHandler from '../../util/async'
import { AdvanceResponse } from '../../util/advancedResults'
import * as Joi from 'joi'
import UserValidation from './validation'

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export const findAll = asyncHandler(
    async (req: Request, res: AdvanceResponse, next: NextFunction) => {
        res.status(200).json(res.advancedResults)
    }
)

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findOne(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        let username = req.params.id
        const validate: Joi.ValidationResult<{
            username: string
        }> = UserValidation.getUser({
            username,
        })

        if (validate.error) {
            throw new Error(validate.error.message)
        }

        const user: IUserModel = await UserModel.findOne({
            username,
        })

        if (!user) {
            return next(
                new HttpError(
                    404,
                    `User not found with username of ${username}`
                )
            )
        }

        res.status(200).json(user)
    } catch (error) {
        next(new HttpError(error.message.status, error.message))
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function create(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        let body = req.body
        const validate: Joi.ValidationResult<IUserModel> = UserValidation.createUser(
            body
        )

        if (validate.error) {
            throw new Error(validate.error.message)
        }

        const user: IUserModel = await UserModel.create(body)

        res.status(201).json(user)
    } catch (error) {
        next(new HttpError(error.message.status, error.message))
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function remove(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        let username = req.params.id
        const validate: Joi.ValidationResult<{
            username: string
        }> = UserValidation.removeUser({
            username,
        })

        if (validate.error) {
            throw new Error(validate.error.message)
        }

        const user: IUserModel = await UserModel.findOneAndRemove({
            username,
        })

        res.status(200).json(user)
    } catch (error) {
        next(new HttpError(error.message.status, error.message))
    }
}
