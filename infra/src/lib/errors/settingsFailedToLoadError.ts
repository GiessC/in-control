export class SettingsFailedToLoadError extends Error {
    constructor(settingsFileLocation: string, error: unknown) {
        super(
            `An error occurred while loading settings file: ${settingsFileLocation}\n${error}`,
        );
        this.name = 'SettingsLoadError';
    }
}
