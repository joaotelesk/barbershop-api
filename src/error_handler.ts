import type { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, replay) => {
  if (error instanceof ZodError) {
    return replay.status(400).send({
      message: ' Validation Error',
      error: error.flatten().fieldErrors,
    })
  }

  console.error(error)
  // TODO: send error to some observability platform

  return replay.status(500).send({ message: 'Internal server error.' })
}
