import express from 'express'
import { StatusCodes } from 'http-status-codes'

export const healthRouter = express.Router()

healthRouter.get('/', async (req, res) => {
  return res.status(StatusCodes.OK).json('API is healthy')
})
