import { type StackProps } from 'aws-cdk-lib';
import { type Construct } from 'constructs';
import Settings from '../../../common/settings';
import EnvironmentStack from '../environmentStack';

export interface LocalStackProps extends StackProps {
    test?: boolean;
}

export default class LocalStack extends EnvironmentStack {
    private static readonly SETTINGS_FILES = [
        'settings.json',
        'settings.development.json',
        'settings.local.json',
    ];
    private readonly _settings: Settings;

    constructor(scope: Construct, id: string, props?: LocalStackProps) {
        super(scope, id, props);
        this._settings = Settings.fromJsonFiles(LocalStack.SETTINGS_FILES);
        const env = this.getEnv(this._settings);
        this.createStacks(id, env);
    }

    protected get settings(): Settings {
        return this._settings;
    }
}
