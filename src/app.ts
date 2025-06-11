import fastifyCors from '@fastify/cors'
import fastify from 'fastify'

export const app = fastify()

app.register(fastifyCors, { origin: '*' })
