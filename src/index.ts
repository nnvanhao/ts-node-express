import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import pinoRequestMiddleware from 'pino-http'

import './helpers/config'

import { StatusCodes } from 'http-status-codes'
import { healthRouter } from 'routes/health.route'

const logger = require('pino')()
/*
 * Load up and parse configuration details from
 * the `.env` file to the `process.env`
 * object of Node.js
 */
dotenv.config()

/*
 * Create an Express application and get the
 * value of the PORT environment variable
 * from the `process.env`
 */

const app: Express = express()

logger.info('Starting server...')

app.use(
  pinoRequestMiddleware({
    logger,
    redact: {
      paths: [
        'req.headers.cookie',
        'req.headers["set-cookie"]',
        'req.headers.authorization',
      ],
    },
  })
)

app.use(bodyParser.json())
app.use(cors({ origin: '*' }))

// Completely public
app.use('/health', healthRouter)

/* Define a route for the root path ("/")
 using the HTTP GET method */
app.get('/', (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json('NodeJS Server')
})

/* Start the Express app and listen
 for incoming requests on the specified port */
const port = process.env.PORT

app.listen(port, () => {
  logger.info(`[server]: Server is running at http://localhost:${port}`)
})
