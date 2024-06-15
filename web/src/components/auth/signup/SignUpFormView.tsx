import FormViewProps from '@/components/common/FormViewProps';
import { PasswordInput, TextInput } from '@mantine/core';
import { SignUpFormValues } from './SignupForm';

const SignUpFormView = ({
    values,
    onSubmit,
    onChange,
    onBlur,
    ...props
}: FormViewProps<SignUpFormValues>) => {
    return (
        <form
            className={`p-4 ${props.className}`}
            {...props}
            onSubmit={onSubmit}
        >
            <TextInput
                name='username'
                label='Username'
                autoComplete='username'
                value={values.username}
                onChange={onChange}
                onBlur={onBlur}
                withAsterisk
            />
            <PasswordInput
                name='password'
                label='Password'
                autoComplete='current-password'
                value={values.password}
                onChange={onChange}
                onBlur={onBlur}
                withAsterisk
            />
            <PasswordInput
                name='confirmPassword'
                label='Confirm Password'
                autoComplete='current-password'
                value={values.confirmPassword}
                onChange={onChange}
                onBlur={onBlur}
                withAsterisk
            />
        </form>
    );
};

export default SignUpFormView;
