import { FastifyTypeInstance } from '@/utils/fastifyTypeInstance'

import { Register } from './user/register'

export async function routes(app: FastifyTypeInstance) {
  app.register(Register)
}
