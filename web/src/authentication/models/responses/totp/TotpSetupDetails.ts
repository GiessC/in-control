export interface TotpSetupDetails {
    sharedSecret: string;
    getSetupUri(appName: string, accountName?: string): URL;
}
