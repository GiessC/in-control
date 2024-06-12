import { type StackProps } from 'aws-cdk-lib';
import { type Construct } from 'constructs';
import Settings from '../../../common/settings';
import EnvironmentStack from '../environmentStack';

export default class ProductionStack extends EnvironmentStack {
    private static readonly SETTINGS_FILES = [
        'settings.json',
        'settings.development.json',
        'settings.local.json',
    ];
    private readonly _settings: Settings;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
        this._settings = Settings.fromJsonOrEnvVars(
            ProductionStack.SETTINGS_FILE,
        );
        const env = this.getEnv(this._settings);
        this.createStacks(id, env);
    }

    protected get settings(): Settings {
        return this._settings;
    }
}
