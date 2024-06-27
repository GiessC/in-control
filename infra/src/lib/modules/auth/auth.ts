import { Duration, RemovalPolicy } from 'aws-cdk-lib';
import {
    AccountRecovery,
    Mfa,
    UserPool,
    UserPoolClient,
    UserPoolClientIdentityProvider,
    VerificationEmailStyle,
} from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';
import DefaultModuleProps from '../../common/defaultModuleProps';
import Settings from '../../common/settings';

export class AuthModule extends Construct {
    private readonly _settings: Settings;
    public readonly userPool: UserPool;
    public readonly client: UserPoolClient;

    constructor(scope: Construct, id: string, props: DefaultModuleProps) {
        super(scope, id);
        this._settings = props?.settings;
        this.userPool = this.createUserPool(id, this._settings.RemovalPolicy);
        this.client = this.createUserPoolClient(id);
    }

    private createUserPool(
        id: string,
        removalPolicy: RemovalPolicy = RemovalPolicy.DESTROY,
    ): UserPool {
        return new UserPool(this, `${id}-Users`, {
            accountRecovery: AccountRecovery.EMAIL_ONLY,
            deletionProtection: removalPolicy !== RemovalPolicy.DESTROY,
            deviceTracking: {
                challengeRequiredOnNewDevice: true,
                deviceOnlyRememberedOnUserPrompt: true,
            },
            mfa: Mfa.REQUIRED,
            mfaMessage: 'Your MFA verification code for InCtrl is {####}',
            mfaSecondFactor: {
                otp: true,
                sms: false,
            },
            passwordPolicy: {
                minLength: 8,
                requireDigits: true,
                requireLowercase: true,
                requireSymbols: true,
                requireUppercase: true,
            },
            removalPolicy,
            selfSignUpEnabled: true,
            signInAliases: {
                email: true,
                username: true,
            },
            signInCaseSensitive: false,
            standardAttributes: {
                email: {
                    required: true,
                    mutable: true,
                },
            },
            userVerification: {
                emailSubject: 'Welcome to InCtrl! Email Verification',
                emailBody:
                    "We're glad you're joining InCtrl! Please verify your email by clicking {##Verify Email##}",
                emailStyle: VerificationEmailStyle.LINK,
            },
        });
    }

    private createUserPoolClient(id: string) {
        return new UserPoolClient(this, `${id}-Client`, {
            userPool: this.userPool,
            accessTokenValidity: Duration.hours(1),
            authFlows: {
                userSrp: true,
                adminUserPassword: false,
                custom: false,
                userPassword: false,
            },
            authSessionValidity: Duration.minutes(5),
            enableTokenRevocation: true,
            idTokenValidity: Duration.hours(1),
            preventUserExistenceErrors: true,
            refreshTokenValidity: Duration.days(1),
            supportedIdentityProviders: [
                UserPoolClientIdentityProvider.COGNITO,
            ],
            oAuth: {
                callbackUrls: ['https://localhost'],
            },
        });
    }
}
