'use server';

import AuthService from '@/authentication/AuthService';
import { handleAuthStep } from '@/authentication/helpers/handleAuthStep';
import { Routes } from '@/models/routes/Routes';
import { redirect } from 'next/navigation';

export const signUp = async (
    username: string,
    password: string,
    email?: string,
    phoneNumber?: string,
) => {
    const authService = new AuthService();
    const nextStepDetails = await authService.signUp({
        username,
        password,
        email,
        phoneNumber,
    });
    if (!nextStepDetails) {
        redirect(Routes.Auth.Login);
    }
    handleAuthStep(nextStepDetails);
};
