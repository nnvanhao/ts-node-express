import path from 'path'
import dotenv from 'dotenv'

const logger = require('pino')()

const environment = (process.env.ENV ??= 'local')

const envVariables = dotenv.config({
  path: path.resolve(`.env.${environment}`),
})

logger.debug(`load env for [${environment}]`)

if (environment === 'local') {
  logger.debug(envVariables)
}

function getEnvVariable(key: string): string {
  const value = process.env[key]
  if (typeof value === 'undefined' || value === '') {
    throw new Error(`Environment variable ${key} is not set or is empty`)
  }
  if (typeof value !== 'string') {
    throw new Error(`Environment variable ${key} is not a string`)
  }
  return value
}

export { getEnvVariable }
