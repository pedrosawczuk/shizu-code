import { APIError } from 'better-auth/api'
import type { FastifyError, FastifyInstance } from 'fastify'
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod'
import { ZodError, z } from 'zod'
import { AppError } from '@/core/errors'

type ErrorResponseBody = {
	code: string
	message: string
	issues?: ReturnType<typeof z.treeifyError> | FastifyError['validation']
}

export function registerErrorHandler(app: FastifyInstance) {
	app.setErrorHandler((error: FastifyError, _request, reply) => {
		const send = (statusCode: number, body: ErrorResponseBody) => {
			return reply.status(statusCode).send(body)
		}

		if (error instanceof AppError) {
			return send(error.statusCode, {
				code: error.errorCode,
				message: error.message,
			})
		}

		if (hasZodFastifySchemaValidationErrors(error)) {
			return send(400, {
				code: 'VALIDATION_ERROR',
				message: 'Falha na validação dos campos enviados.',
				issues: error.validation,
			})
		}

		if (error instanceof ZodError) {
			return send(400, {
				code: 'VALIDATION_ERROR',
				message: 'Falha na validação dos campos enviados.',
				issues: z.treeifyError(error),
			})
		}

		if (error instanceof APIError) {
			const statusCode =
				typeof error.status === 'number'
					? error.status
					: Number(error.status) || 400

			return send(statusCode, {
				code: error.body?.code || 'AUTH_ERROR',
				message: error.message,
			})
		}

		app.log.error(error)

		if (error.statusCode && error.statusCode < 500) {
			return send(error.statusCode, {
				code: error.code || 'BAD_REQUEST',
				message: error.message,
			})
		}

		return send(500, {
			code: 'INTERNAL_SERVER_ERROR',
			message: 'Erro interno do servidor.',
		})
	})
}
