import { ColorSchemeScript } from '@mantine/core';
import '@mantine/core/styles.css';
import { Amplify } from 'aws-amplify';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';
import amplifyConfig from '../config/amplifyConfig';
import './globals.css';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'In-Ctrl',
    description:
        'InCtrl is an open-source version control system built for ultimate quality control. "Git" in control with InCtrl ',
};

Amplify.configure(amplifyConfig);

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
