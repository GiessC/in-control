'use client';

import { goTo } from '@/app/actions';
import AuthService from '@/authentication/AuthService';
import { handleAuthStep } from '@/authentication/helpers/handleAuthStep';
import { Routes } from '@/models/routes/Routes';
import { Center, Paper, Text } from '@mantine/core';
import { Formik, FormikHelpers } from 'formik';
import LoginFormView from './LoginFormView';
import LoginFormValues, { defaultLoginValues } from './formValues';

export const login = async (userAlias: string, password: string) => {
    const authService = new AuthService();
    const nextStepDetails = await authService.login({
        userAlias,
        password,
    });
    if (!nextStepDetails) {
        goTo(Routes.Home);
        return;
    }
    handleAuthStep(nextStepDetails);
};

const onSubmit = async (
    values: LoginFormValues,
    { resetForm }: FormikHelpers<LoginFormValues>,
) => {
    try {
        await login(values.userAlias, values.password);
        resetForm({ values: defaultLoginValues });
    } catch (error: unknown) {
        console.error(error);
    }
};

const LoginForm = () => {
    return (
        <Paper
            className='w-1/2 m-auto'
            shadow='xs'
            radius='md'
        >
            <Center>
                <Text
                    size='xl'
                    className='font-extrabold'
                >
                    Login
                </Text>
            </Center>
            <Formik
                initialValues={defaultLoginValues}
                onSubmit={onSubmit}
            >
                {({ values, handleChange, handleBlur, handleSubmit }) => (
                    <LoginFormView
                        values={values}
                        onSubmit={handleSubmit}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                )}
            </Formik>
        </Paper>
    );
};

export default LoginForm;
