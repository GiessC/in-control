import SignupWizard from '@/components/auth/signup/wizard/SignupWizard';
import { Flex } from '@mantine/core';

const Login = () => {
    return (
        <Flex className='w-full h-full'>
            <Flex className='m-auto w-1/2 border rounded p-8'>
                <SignupWizard className='w-full' />
            </Flex>
        </Flex>
    );
};

export default Login;
