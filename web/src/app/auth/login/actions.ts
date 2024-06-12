'use server';

import AuthService from '@/authentication/AuthService';
import { handleAuthStep } from '@/authentication/helpers/handleAuthStep';
import { Routes } from '@/models/routes/Routes';
import { redirect } from 'next/navigation';

export const login = async (userAlias: string, password: string) => {
    const authService = new AuthService();
    const nextStepDetails = await authService.signIn({
        userAlias,
        password,
    });
    if (!nextStepDetails) {
        redirect(Routes.Home);
    }
    handleAuthStep(nextStepDetails);
};
