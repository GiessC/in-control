interface IConfig {
    Cognito: {
        UserPoolId: string;
        UserPoolClientId: string;
    };
}

const getConfig = (): IConfig => {
    return {
        Cognito: {
            UserPoolClientId:
                process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID ?? '',
            UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID ?? '',
        },
    };
};

const config = getConfig();

export default config;
