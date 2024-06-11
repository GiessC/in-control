import { Center, Paper, Text } from '@mantine/core';

const LoginForm = () => {
    return (
        <Paper
            className='w-1/2 m-auto'
            shadow='xs'
            radius='md'
        >
            <Center>
                <Text size='xl'>Login</Text>
            </Center>
        </Paper>
    );
};

export default LoginForm;
