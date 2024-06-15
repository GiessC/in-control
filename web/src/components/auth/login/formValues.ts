export default interface LoginFormValues {
    userAlias: string;
    password: string;
}

export const defaultLoginValues: LoginFormValues = {
    userAlias: '',
    password: '',
};
