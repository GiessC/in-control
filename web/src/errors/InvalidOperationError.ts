import BaseError from './BaseError';

export default class InvalidOperationError extends BaseError {
    constructor(message: string, innerError?: Error) {
        super('InvalidOperationError', message, innerError);
    }
}
