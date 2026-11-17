import { AppError } from './app-error'

export class UnauthorizedError extends AppError {
	constructor(message = 'Não autorizado.', errorCode = 'UNAUTHORIZED') {
		super(message, 401, errorCode)
	}
}
