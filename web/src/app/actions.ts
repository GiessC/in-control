import { redirect } from 'next/navigation';

export const goTo = (route: string) => {
    redirect(route);
};
