'use server';

import InvalidOperationError from '@/errors/InvalidOperationError';
import { Routes } from '@/models/routes/Routes';
import { redirect } from 'next/navigation';
import { AuthStepDetails } from '../models/authSteps/AuthStepDetails';
import { ConfirmSignInWithTotpStepDetails } from '../models/authSteps/login/ConfirmSignInWithTotpStepDetails';
import { SetupTotpStepDetails } from '../models/authSteps/login/SetupTotpStepDetails';
import { ConfirmSignUpStepDetails } from '../models/authSteps/signUp/ConfirmSignUpStepDetails';

export const handleAuthStep = (stepDetails: AuthStepDetails) => {
    if (stepDetails instanceof ConfirmSignUpStepDetails) {
        // Handle confirm sign up step
        redirect(Routes.Auth.SignUp.Confirm);
    }
    if (stepDetails instanceof SetupTotpStepDetails) {
        // Handle setup totp step
        redirect(Routes.Auth.Totp.Setup);
    }
    if (stepDetails instanceof ConfirmSignInWithTotpStepDetails) {
        // Handle confirm sign in with totp step
        redirect(Routes.Auth.Totp.Confirm);
    }
    throw new InvalidOperationError(`Unknown auth step: ${stepDetails.name}`);
};
