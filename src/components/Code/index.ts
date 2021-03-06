import { HttpError } from '../../config/error'
import CodeModel from './model'
import { NextFunction, Request, Response } from 'express'
import asyncHandler from '../../util/async'
import { AdvanceResponse } from '../../util/advancedResults'

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
        let _id = req.params.id

        const code = await CodeModel.findById(_id)

        if (!code) {
            return next(new HttpError(404, `Code not found with _id of ${_id}`))
        }

        res.status(200).json(code)
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
        const code = await CodeModel.create(body)

        res.status(201).json(code)
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
export const update = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        let _id = req.params.id

        let c = await CodeModel.findById(req.params.id)
        if (!c) {
            return next(
                new HttpError(404, `Code not found with id of ${req.params.id}`)
            )
        }

        const customer = await CodeModel.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true,
        })
        res.status(200).json(customer)
    }
)
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
        let _id = req.params.id

        const customer = await CodeModel.findByIdAndRemove(_id)

        res.status(200).json(customer)
    } catch (error) {
        next(new HttpError(error.message.status, error.message))
    }
}
