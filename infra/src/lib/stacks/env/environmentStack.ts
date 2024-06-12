import { Environment, Stack } from 'aws-cdk-lib';
import Settings from '../../common/settings';
import CoreStack from '../coreStack';

export interface EnvironmentStackProps {
    readonly env?: Environment;
}

export default abstract class EnvironmentStack extends Stack {
    protected createStacks(id: string, awsEnv?: Environment): void {
        this.createCoreStack(id, awsEnv);
    }

    private createCoreStack(id: string, awsEnv?: Environment): void {
        new CoreStack(this, `${id}-Core`, {
            env: awsEnv,
            settings: this.settings,
        });
    }

    protected getEnv(settings: Settings): Environment {
        return {
            account: settings.AwsSettings?.Account,
            region: settings.AwsSettings?.Region,
        };
    }

    protected abstract get settings(): Settings;
}
