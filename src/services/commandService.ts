import { CommandResult } from '../types';

declare global {
    interface Window {
        electronAPI: {
            executeCommand: (command: string) => Promise<CommandResult>;
        }
    }
}

export const executeCommand = async (command: string): Promise<CommandResult> => {
    if (!window.electronAPI) {
        throw new Error('Electron API not available');
    }
    
    try {
        return await window.electronAPI.executeCommand(command);
    } catch (error) {
        return {
            success: false,
            output: '',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
    }
}; 