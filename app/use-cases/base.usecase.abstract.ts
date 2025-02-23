// Base error types
export class DomainError {
    constructor(public readonly message: string) {}
}

export class ApplicationError {
    constructor(public readonly message: string) {}
}

// Result with typed errors
export class Result<T, E extends DomainError | ApplicationError> {
    private constructor(
        private readonly _value: T | null,
        private readonly _error: E | null
    ) {}

    public static ok<T, E extends DomainError | ApplicationError>(value: T): Result<T, E> {
        return new Result<T, E>(value, null);
    }

    public static fail<T, E extends DomainError | ApplicationError>(error: E): Result<T, E> {
        return new Result<T, E>(null, error);
    }

    public isSuccess(): boolean {
        return this._error === null;
    }

    public isFailure(): boolean {
        return this._error !== null;
    }

    public getValue(): T {
        if (this._value === null) {
            throw new Error('Cannot get value of a failed result');
        }
        return this._value;
    }

    public getError(): E {
        if (this._error === null) {
            throw new Error('Cannot get error of a successful result');
        }
        return this._error;
    }

    public fold<R>(onSuccess: (value: T) => R, onError: (error: E) => R): R {
        return this._error === null
            ? onSuccess(this._value as T)
            : onError(this._error);
    }
}

export default abstract class UseCase<TRequest, TResponse, E extends DomainError | ApplicationError> {
    abstract execute(request: TRequest): Promise<Result<TResponse, E>>;
}
