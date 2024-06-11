import { createTheme, MantineProvider } from '@mantine/core';
import { PropsWithChildren } from 'react';

const theme = createTheme({});

const Providers = ({ children }: PropsWithChildren) => {
    return <MantineProvider theme={theme}>{children}</MantineProvider>;
};

export default Providers;
