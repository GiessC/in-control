export class Routes {
    public static readonly Auth = {
        Index: '/auth',
        Login: '/auth/login',
        SignUp: {
            Index: '/auth/sign-up',
            Confirm: '/auth/sign-up/confirm',
        },
        Totp: {
            Setup: '/auth/totp/setup',
            Confirm: '/auth/totp/confirm',
        },
    };
    public static readonly Home = '/';
}
