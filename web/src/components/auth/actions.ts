'use server';

import AuthService from '@/authentication/AuthService';

export const login = async (userAlias: string, password: string) => {
    try {
        const authService = new AuthService();
        await authService.login({ userAlias, password });
    } catch (error: unknown) {
        console.error(error);
    }
};
