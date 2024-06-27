import LoginForm from '@/components/auth/login/LoginForm';
import { Flex } from '@mantine/core';

const Login = () => {
    return (
        <Flex className='w-full h-full'>
            <LoginForm />
        </Flex>
    );
};

export default Login;
