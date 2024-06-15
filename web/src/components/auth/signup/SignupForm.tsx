'use client';

import { signUp } from '@/app/auth/signup/actions';
import { Center, Paper, PaperProps, Text } from '@mantine/core';
import { Formik, FormikHelpers } from 'formik';
import SignUpFormView from './SignUpFormView';

export interface SignUpFormValues {
    username: string;
    password: string;
    confirmPassword: string;
    email?: string;
    phoneNumber?: string;
}

const DEFAULT_VALUES: SignUpFormValues = {
    username: '',
    password: '',
    confirmPassword: '',
};

const onSubmit = async (
    values: SignUpFormValues,
    { resetForm }: FormikHelpers<SignUpFormValues>,
) => {
    try {
        await signUp(
            values.username,
            values.password,
            values.email,
            values.phoneNumber,
        );
        resetForm({ values: DEFAULT_VALUES });
    } catch (error: unknown) {
        console.error(error);
    }
};

export interface SignUpFormProps extends PaperProps {
    formId?: string;
}

const SignUpForm = ({ formId, ...props }: SignUpFormProps) => {
    return (
        <Paper
            {...props}
            shadow='xs'
            radius='md'
        >
            <Center>
                <Text
                    size='xl'
                    className='font-extrabold'
                >
                    Sign up
                </Text>
            </Center>
            <Formik
                initialValues={DEFAULT_VALUES}
                onSubmit={onSubmit}
            >
                {({ values, handleChange, handleBlur, handleSubmit }) => (
                    <SignUpFormView
                        id={formId}
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

export default SignUpForm;
