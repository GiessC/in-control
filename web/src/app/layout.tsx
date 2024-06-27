'use client';

import { ColorSchemeScript } from '@mantine/core';
import '@mantine/core/styles.css';
import { Amplify } from 'aws-amplify';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';
import amplifyConfig from '../config/amplifyConfig';
import './globals.css';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

Amplify.configure(amplifyConfig, {
    ssr: true,
});

const RootLayout = ({ children }: PropsWithChildren) => {
    return (
        <html lang='en'>
            <head>
                <ColorSchemeScript />
            </head>
            <body className={`${inter.className} h-screen w-screen`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
};

export default RootLayout;
