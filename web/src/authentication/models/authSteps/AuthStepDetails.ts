export class AuthStepDetails {
    private readonly _name: string;

    protected constructor(name: string) {
        this._name = name;
    }

    public get name(): string {
        return this._name;
    }
}
