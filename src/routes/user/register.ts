import { z } from 'zod'

import { FastifyTypeInstance } from '@/utils/fastifyTypeInstance'

const bodySchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string().min(6),
})

export async function Register(app: FastifyTypeInstance) {
  app.post(
    '/users',
    {
      schema: {
        summary: 'Authenticate user with email and password',
        description:
          'Authenticates a user using email and password credentials. Returns a success response if the credentials are valid, otherwise returns an authentication error.',
        tags: ['users'],
        body: bodySchema,
      },
    },
    async (request, reply) => {
      const reponse = request.body
      console.log(reponse)
      return reply.status(200).send()
    },
  )
}
