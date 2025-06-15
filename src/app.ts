import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import packageJson from '../package.json'
import { errorHandler } from './error_handler'
import { routes } from './routes'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setErrorHandler(errorHandler)

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, { origin: '*' })

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'BarberShop API',
      description:
        'The BarberShop API is a RESTful API designed to manage the complete operations of a barbershop. It provides features for appointment scheduling, client management, service catalog control, barber registration, and user authentication. Ideal for integrating with service systems and streamlining daily operations in the beauty and personal care industry.',
      version: packageJson.version,
    },
  },

  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(routes)
