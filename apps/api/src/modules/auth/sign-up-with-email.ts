import type { FastifyReply, FastifyRequest } from 'fastify'
import { auth } from '@/lib/auth/auth'
import { forwardWebResponse, toFetchHeaders } from '@/lib/auth/http-utils'
import type { SignUpWithEmailSchema } from './sign-up-with-email-schema'

export async function signUpWithEmailModule(
	request: FastifyRequest<{ Body: SignUpWithEmailSchema }>,
	reply: FastifyReply,
) {
	const { name, email, password } = request.body

	const response = await auth.api.signUpEmail({
		body: {
			name,
			email,
			password,
		},
		asResponse: true,
		headers: toFetchHeaders(request.headers),
	})

	forwardWebResponse(response, reply)

	const data = await response.json()
	return reply.status(response.status).send(data)
}
