import { TotpSetupDetails } from '../../responses/totp/TotpSetupDetails';
import { AuthStepDetails } from '../AuthStepDetails';

export class SetupTotpStepDetails extends AuthStepDetails {
    public constructor(setupDetails: TotpSetupDetails) {
        super('CONTINUE_SIGN_IN_WITH_TOTP_SETUP');
    }
}
