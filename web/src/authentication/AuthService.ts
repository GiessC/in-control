import {
    ConfirmSignUpInput,
    SignInOutput,
    confirmSignIn,
    confirmSignUp,
    signIn,
    signOut,
    signUp,
} from 'aws-amplify/auth';
import { AuthStepDetails } from './models/authSteps/AuthStepDetails';
import { ConfirmSignInWithTotpStepDetails } from './models/authSteps/login/ConfirmSignInWithTotpStepDetails';
import { SetupTotpStepDetails } from './models/authSteps/login/SetupTotpStepDetails';
import { ConfirmSignUpStepDetails } from './models/authSteps/signUp/ConfirmSignUpStepDetails';
import { SignInRequest } from './models/requests/SignInRequest';
import { SignUpRequest } from './models/requests/SignUpRequest';

export default class AuthService {
    public async signUp({
        email,
        phoneNumber,
        username,
        password,
    }: SignUpRequest): Promise<AuthStepDetails | null> {
        try {
            const response = await signUp({
                username,
                password,
                options: {
                    userAttributes: {
                        email,
                        phoneNumber,
                        preferred_username: username,
                    },
                },
            });
            if (response.isSignUpComplete) {
                return null;
            }
            if (response.nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
                return new ConfirmSignUpStepDetails();
            }
            throw new Error(
                'Unexpected response received from authentication service.',
            );
        } catch (error: unknown) {
            // TODO: Better error handling in the entire service
            throw new Error('Failed to sign up');
        }
    }

    public async confirmSignUp(
        request: ConfirmSignUpInput,
    ): Promise<AuthStepDetails | null> {
        try {
            const response = await confirmSignUp(request);
            if (response.isSignUpComplete) {
                return null;
            }
            throw new Error(
                'Unexpected response received from authentication service.',
            );
        } catch {
            throw new Error('Failed to confirm sign up');
        }
    }

    public async signIn({
        userAlias,
        password,
    }: SignInRequest): Promise<AuthStepDetails | null> {
        try {
            const response = await signIn({
                username: userAlias,
                password,
                options: {
                    authFlowType: 'USER_SRP_AUTH',
                },
            });
            if (response.isSignedIn) {
                return null;
            }

            return this.handleSignInNextSteps(response);
        } catch (error: unknown) {
            throw new Error('Failed to sign in');
        }
    }

    public async signOut(): Promise<void> {
        try {
            await signOut();
        } catch (error: unknown) {
            throw new Error('Failed to sign out');
        }
    }

    public async confirmSignInWithTotp(
        code: string,
    ): Promise<AuthStepDetails | null> {
        try {
            const response = await confirmSignIn({
                challengeResponse: code,
            });
            if (response.isSignedIn) {
                return null;
            }
            return this.handleSignInNextSteps(response);
        } catch (error: unknown) {
            throw new Error('Failed to confirm sign in with TOTP');
        }
    }

    private async handleSignInNextSteps({
        nextStep,
    }: SignInOutput): Promise<AuthStepDetails> {
        const { signInStep } = nextStep;
        switch (signInStep) {
            case 'CONFIRM_SIGN_IN_WITH_TOTP_CODE':
                return new ConfirmSignInWithTotpStepDetails();
            case 'CONTINUE_SIGN_IN_WITH_TOTP_SETUP':
                return new SetupTotpStepDetails(nextStep.totpSetupDetails);
            case 'CONFIRM_SIGN_UP':
                throw new Error('Sign up confirmation required');
            default:
                throw new Error(
                    'Unexpected response received from authentication service.',
                );
        }
    }
}
