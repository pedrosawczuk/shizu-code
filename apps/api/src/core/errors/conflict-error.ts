import { AppError } from './app-error'

export class ConflictError extends AppError {
	constructor(message = 'Conflito de dados.', errorCode = 'CONFLICT') {
		super(message, 409, errorCode)
	}
}
