import { AppError } from './app-error'

export class NotFoundError extends AppError {
	constructor(message = 'Recurso não encontrado.', errorCode = 'NOT_FOUND') {
		super(message, 404, errorCode)
	}
}
