class ErrorStringBuilder {
    private _errorString: string;

    public constructor(name: string, message: string = '', error?: BaseError) {
        this._errorString = `An error of type ${name} occurred: ${message}\n${
            error?.toString() ?? ''
        }\n`;
    }

    public AddInnerError(innerError?: Error): this {
        if (!innerError) {
            return this;
        }
        this._errorString += `Inner Error: ${innerError.toString()}\n`;
        return this;
    }

    public Build(): string {
        return this._errorString;
    }
}

export default class BaseError extends Error {
    private _name: string;
    private _message: string;
    private _innerError?: Error;

    constructor(name: string, message: string, innerError?: Error) {
        super(message);
        this._name = name;
        this._message = message;
        this._innerError = innerError;
    }

    public get name(): string {
        return this._name;
    }

    public get message(): string {
        return this._message;
    }

    public get innerError(): Error | undefined {
        return this._innerError;
    }

    public buildString(): string {
        return new ErrorStringBuilder(this._name, this._message)
            .AddInnerError(this._innerError)
            .Build();
    }
}
