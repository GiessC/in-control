import { type StackProps } from 'aws-cdk-lib';
import Settings from './settings';

export default interface DefaultStackProps extends StackProps {
    readonly settings: Settings;
}
