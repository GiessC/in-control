import { RemovalPolicy } from 'aws-cdk-lib';
import path from 'path';
import { object, string, type Schema } from 'yup';

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
    readonly AwsSettings?: AwsSettings;
    readonly DomainSettings: DomainSettings;
    readonly RemovalPolicy?: RemovalPolicy;

    private constructor(
        AwsSettings: AwsSettings | undefined,
        DomainSettings: DomainSettings,
        RemovalPolicy: RemovalPolicy | undefined,
    ) {
        this.AwsSettings = AwsSettings;
        this.DomainSettings = DomainSettings;
        this.RemovalPolicy = RemovalPolicy;
    }

    public static fromJsonFiles(filenames: string[]): Settings {
        let settings: Partial<Settings> = {};

        for (const filename of filenames) {
            const newSettings = loadSettings(filename);
            settings = {
                AwsSettings: newSettings.AwsSettings,
                DomainSettings: newSettings.DomainSettings,
                RemovalPolicy: newSettings.RemovalPolicy,
                ...removeEmptyValues(settings),
            };
        }

        try {
            validateSettings(settings);
            this._instance = settings as Settings;
            return this._instance;
        } catch (error: unknown) {
            console.error(error);
            process.exit(1);
        }
    }

    public static get instance(): Settings {
        if (!this._instance) {
            throw new Error('Settings not loaded');
        }
        return this._instance;
    }
}

export interface AwsSettings {
    readonly Account: string;
    readonly Profile: string;
    readonly Region: string;
}

export interface DomainSettings {
    readonly CertificateArn: string;
    readonly HostedZoneId: string;
    readonly DomainName: string;
}

const SCHEMA: Schema = object<Settings>().shape({
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

const loadSettings = (settingsFile: string): Settings => {
    const settingsFileLocation = path.join(process.cwd(), settingsFile);
    try {
        return require(settingsFileLocation);
    } catch (error: unknown) {
        console.error(
            `An error occurred while loading settings file: ${settingsFileLocation}\n${error}\n\nExiting...`,
        );
        process.exit(1);
    }
};
