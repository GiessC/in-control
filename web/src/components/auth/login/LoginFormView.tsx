import FormViewProps from '@/components/common/FormViewProps';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import LoginFormValues from './formValues';

const LoginFormView = ({
    values,
    onSubmit,
    onChange,
    onBlur,
}: FormViewProps<LoginFormValues>) => {
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
            <PasswordInput
                name='password'
                label='Password'
                autoComplete='current-password'
                value={values.password}
                onChange={onChange}
                onBlur={onBlur}
            />
            <Button type='submit'>Login</Button>
        </form>
    );
};

export default LoginFormView;
