import { toNodeHandler } from 'better-auth/node'
import fastify from 'fastify'
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { auth } from '@/lib/auth/auth'
import { registerErrorHandler } from '@/lib/http/register-error-handler'
import { authRoutes } from '@/modules/auth/auth-routes'

export const app = fastify({
	logger: true,
	trustProxy: true,
}).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

registerErrorHandler(app)

app.all('/api/auth/*', async (request, reply) => {
	return toNodeHandler(auth)(request.raw, reply.raw)
})

app.register(authRoutes, { prefix: '/auth' })

app.get('/health', () => {
	return { status: 'ok' }
})
