import { createTheme, MantineProvider } from '@mantine/core';
import { PropsWithChildren } from 'react';

const theme = createTheme({
    fontSizes: {
        xl: '1.875rem',
        lg: '1.625rem',
        md: '1.375rem',
        sm: '1rem',
        xs: '.875rem',
    },
});

const Providers = ({ children }: PropsWithChildren) => {
    return (
        <MantineProvider
            defaultColorScheme='auto'
            theme={theme}
        >
            {children}
        </MantineProvider>
    );
};

export default Providers;
