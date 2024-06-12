import { Routes } from '@/models/routes/Routes';
import Link from 'next/link';

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <Link href={Routes.Auth.Login}>Login</Link>
        </div>
    );
};

export default Home;
