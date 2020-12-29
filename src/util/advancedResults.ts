import { NextFunction, Request, Response } from 'express'

export interface AdvanceResponse extends Response {
    advancedResults: {
        success: boolean
        count: any
        pagination: { next: Indicator; prev: Indicator }
        data: any
    }
}

interface Indicator {
    page: number
    limit: number
}

/* export interface Response<ResBody = any> extends core.Response<ResBody> {
  advancedResults: { success: boolean; count: any; pagination: { next: number; prev: number; }; data: any; };
*/
export const advancedResults = (model: any, populate?: string) => async (
    req: Request,
    res: AdvanceResponse,
    next: NextFunction
) => {
    let query

    // Copy req.query
    const reqQuery = { ...req.query }

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit']

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param])

    // Create query string
    let queryStr = JSON.stringify(reqQuery)

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(
        /\b(gt|gte|lt|lte|in)\b/g,
        (match) => `$${match}`
    )

    // Finding resource
    query = model.find(JSON.parse(queryStr))

    // Select Fields
    if (typeof req.query.select === 'string') {
        const fields = req.query.select.split(',').join(' ')
        query = query.select(fields)
    }

    // Sort
    if (typeof req.query.sort === 'string') {
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
    } else {
        query = query.sort('-createdAt')
    }

    // Pagination
    const page =
        typeof req.query.page === 'string' ? parseInt(req.query.page, 10) : 1
    const limit =
        typeof req.query.limit === 'string' ? parseInt(req.query.limit, 10) : 25
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const total = await model.countDocuments(JSON.parse(queryStr))

    query = query.skip(startIndex).limit(limit)

    if (populate) {
        query = query.populate(populate)
    }

    // Executing query
    const results = await query

    console.log(results)
    // Pagination result
    const pagination: {
        next: Indicator
        prev: Indicator
    } = {
        next: { page: 0, limit: 0 },
        prev: { page: 0, limit: 0 },
    }

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit,
        }
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit,
        }
    }

    res.advancedResults = {
        success: true,
        count: results.length,
        pagination,
        data: results,
    }

    next()
}
