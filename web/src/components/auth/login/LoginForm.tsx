'use client';

import { login } from '@/app/auth/login/actions';
import { Center, Paper, Text } from '@mantine/core';
import { Formik, FormikHelpers } from 'formik';
import LoginFormView from './LoginFormView';

export interface LoginFormValues {
    userAlias: string;
    password: string;
}

const DEFAULT_VALUES: LoginFormValues = {
    userAlias: '',
    password: '',
};

const onSubmit = async (
    values: LoginFormValues,
    { resetForm }: FormikHelpers<LoginFormValues>,
) => {
    try {
        await login(values.userAlias, values.password);
        resetForm({ values: DEFAULT_VALUES });
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
                initialValues={DEFAULT_VALUES}
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
