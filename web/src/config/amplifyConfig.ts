import { ResourcesConfig } from 'aws-amplify';
import authConfig from './authConfig';

const userPoolClientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID ?? '';
const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID ?? '';

const amplifyConfig: ResourcesConfig = {
    Auth: {
        Cognito: {
            loginWith: {
                email: true,
                phone: false,
                username: true,
            },
            userPoolClientId,
            userPoolId,
            mfa: {
                smsEnabled: false,
                totpEnabled: true,
            },
            passwordFormat: authConfig.passwordRequirements,
            signUpVerificationMethod: 'code',
            userAttributes: {
                email: {
                    required: true,
                },
            },
        },
    },
};

export default amplifyConfig;
