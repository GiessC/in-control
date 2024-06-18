import { RemovalPolicy } from 'aws-cdk-lib';
import path from 'path';
import { object, string } from 'yup';
import { SettingsFailedToLoadError } from '../errors/settingsFailedToLoadError';

const removeEmptyValues = <TReturnType>(object?: object): TReturnType => {
    if (!object) return {} as TReturnType;
    return Object.entries(object).reduce(
        (acc: Record<string, string>, [key, value]) => {
            if (typeof value === 'object') {
                acc[key] = removeEmptyValues(value);
            } else if (value !== '' && value != null) {
                acc[key] = value;
            }
            return acc;
        },
        {},
    ) as TReturnType;
};

export default class Settings {
    private static _instance?: Settings;
    public readonly AwsSettings?: AwsSettings;
    public readonly DomainSettings: DomainSettings;
    public readonly RemovalPolicy?: RemovalPolicy;

    public constructor(
        AwsSettings: AwsSettings | undefined,
        DomainSettings: DomainSettings,
        RemovalPolicy: RemovalPolicy | undefined,
    ) {
        this.AwsSettings = AwsSettings;
        this.DomainSettings = DomainSettings;
        this.RemovalPolicy = RemovalPolicy;
    }

    public static fromJsonOrEnvVars(filename: string): Settings {
        try {
            this._instance = loadSettingsFromJson(filename);
        } catch (error: unknown) {
            if (error instanceof SettingsFailedToLoadError) {
                this._instance = loadSettingsFromEnvVars();
            }
        }
        if (!this._instance) {
            throw new Error('Settings failed to load');
        }
        validateSettings(this._instance);
        return this._instance;
    }

    public static get instance(): Settings {
        if (!this._instance) {
            throw new Error('Settings failed to load');
        }
        return this._instance;
    }
}

export interface AwsSettings {
    readonly Account?: string;
    readonly Profile?: string;
    readonly Region?: string;
}

export interface DomainSettings {
    readonly CertificateArn: string;
    readonly HostedZoneId: string;
    readonly DomainName: string;
}

const SCHEMA = object<Settings>().shape({
    AwsSettings: object<AwsSettings>()
        .shape({
            Profile: string().defined().nonNullable().required(),
            Region: string().defined().nonNullable().required(),
        })
        .optional()
        .notRequired(),
    DomainSettings: object<DomainSettings>()
        .shape({
            CertificateArn: string().defined().nonNullable().required(),
            HostedZoneId: string().defined().nonNullable().required(),
            DomainName: string().defined().nonNullable().required(),
        })
        .defined()
        .nonNullable()
        .required(),
    RemovalPolicy: string()
        .optional()
        .notRequired()
        .oneOf([
            RemovalPolicy.DESTROY,
            RemovalPolicy.RETAIN,
            RemovalPolicy.SNAPSHOT,
            RemovalPolicy.RETAIN_ON_UPDATE_OR_DELETE,
        ]),
});

const validateSettings = (settings: object) => {
    try {
        SCHEMA.validateSync(settings);
    } catch (error: unknown) {
        console.error(error);
        throw error;
    }
};

const loadSettingsFromEnvVars = (): Settings => {
    const AwsSettings: AwsSettings = {
        Account: process.env.AWS_ACCOUNT,
        Profile: process.env.AWS_PROFILE,
        Region: process.env.DEPLOY_REGION,
    };
    const DomainSettings: DomainSettings = {
        CertificateArn: process.env.CERTIFICATE_ARN ?? '',
        HostedZoneId: process.env.HOSTED_ZONE_ID ?? '',
        DomainName: process.env.DOMAIN_NAME ?? '',
    };
    const RemovalPolicy: RemovalPolicy | undefined = process.env
        .REMOVAL_POLICY as RemovalPolicy;
    return new Settings(AwsSettings, DomainSettings, RemovalPolicy);
};

const loadSettingsFromJson = (settingsFile: string): Settings => {
    const settingsFileLocation = path.join(process.cwd(), settingsFile);
    try {
        return require(settingsFileLocation);
    } catch (error: unknown) {
        throw new SettingsFailedToLoadError(settingsFileLocation, error);
    }
};
