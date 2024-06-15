'use client';

import { Button, Group, Stepper, StepperStepProps } from '@mantine/core';
import { useState } from 'react';
import SignUpForm from '../SignupForm';
import VerifyContactInfoForm from './verifyContactInfo/VerifyContactInfoForm';

const STEP_COUNT = 1;
const BACKABLE_STEPS = [1];

export interface SignupWizardProps {
    className?: string;
}

export interface WizardStep extends StepperStepProps {
    label: string;
    component: React.ComponentType;
}

const SignupWizard = ({ className }: SignupWizardProps) => {
    const [active, setActive] = useState<number>(0);

    const prevStep = () => setActive((prev) => (prev > 0 ? prev - 1 : prev));
    const nextStep = () =>
        setActive((prev) => (prev < STEP_COUNT - 1 ? prev + 1 : prev));

    return (
        <>
            <Stepper
                active={active}
                onStepClick={setActive}
            >
                {/* TODO: Step 1 - create account, Step 2 - verify email or phone number, Step 3 - setup TOTP mfa, Finish - Go to login (warn the user) */}
                <Stepper.Step label='Create an account'>
                    <SignUpForm />
                </Stepper.Step>
                <Stepper.Step label='Verify email or phone number'>
                    <VerifyContactInfoForm />
                </Stepper.Step>
                <Stepper.Step label='Verify email or phone number'>
                    <VerifyContactInfoForm />
                </Stepper.Step>
            </Stepper>
            <Group
                justify='center'
                mt='xl'
            >
                <Button
                    variant='default'
                    onClick={prevStep}
                    disabled={active === 0 || BACKABLE_STEPS.includes(active)}
                >
                    Back
                </Button>
                {active === STEP_COUNT - 1 ? (
                    <Button onClick={nextStep}>Finish</Button>
                ) : (
                    <Button onClick={nextStep}>Next step</Button>
                )}
            </Group>
        </>
    );
};

export default SignupWizard;
