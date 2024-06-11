import { AuthStepDetails } from '../AuthStepDetails';

export class ConfirmSignInWithTotpStepDetails extends AuthStepDetails {
    public constructor() {
        super('CONFIRM_SIGN_IN_WITH_TOTP_CODE');
    }
}
