import { AppError } from './app-error'

export class BadRequestError extends AppError {
	constructor(message = 'Requisição inválida.', errorCode = 'BAD_REQUEST') {
		super(message, 400, errorCode)
	}
}
