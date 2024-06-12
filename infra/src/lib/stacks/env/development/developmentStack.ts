import { StackProps } from 'aws-cdk-lib';
import { type Construct } from 'constructs';
import Settings from '../../../common/settings';
import EnvironmentStack from '../environmentStack';

export default class DevelopmentStack extends EnvironmentStack {
    private static readonly SETTINGS_FILES = [
        'settings.development.json',
        'settings.local.json',
    ];
    private readonly _settings: Settings;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
        this._settings = Settings.fromJsonFiles(
            DevelopmentStack.SETTINGS_FILES,
        );
        const env = this.getEnv(this._settings);
        this.createStacks(id, env);
    }

    protected get settings(): Settings {
        return this._settings;
    }
}
