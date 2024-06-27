import { Routes } from '@/models/routes/Routes';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'In-Ctrl',
    description:
        'InCtrl is an open-source version control system built for ultimate quality control. "Git" in control with InCtrl ',
};

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <Link href={Routes.Auth.Login}>Login</Link>
        </div>
    );
};

export default Home;
