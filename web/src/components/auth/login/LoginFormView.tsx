import { Button, TextInput } from '@mantine/core';
import { ChangeEvent, FocusEvent } from 'react';
import { LoginFormValues } from './LoginForm';

export interface LoginFormViewProps {
    values: LoginFormValues;
    onSubmit: () => void;
    onChange: (e: ChangeEvent<unknown>) => void;
    onBlur: (e: FocusEvent<unknown, Element>) => void;
}

const LoginFormView = ({
    values,
    onSubmit,
    onChange,
    onBlur,
}: LoginFormViewProps) => {
    return (
        <form onSubmit={onSubmit}>
            <TextInput
                name='userAlias'
                label='Username / Email / Phone Number'
                placeholder='Enter your username, email, or phone number'
                value={values.userAlias}
                onChange={onChange}
                onBlur={onBlur}
            />
            <TextInput
                name='password'
                type='password'
                label='Password'
                autoComplete='current-password'
                value={values.userAlias}
                onChange={onChange}
                onBlur={onBlur}
            />
            <Button type='submit'>Login</Button>
        </form>
    );
};

export default LoginFormView;
