interface OllamaResponse {
    response: string;
}

export class AIService {
    private static readonly OLLAMA_API = 'http://localhost:11435/api/generate';
    private static readonly MODEL_NAME = 'codellama';

    // List of commands that require admin privileges
    private static readonly adminCommands = [
        'netsh',
        'net',
        'sc',
        'reg',
        'bcdedit',
        'diskpart',
        'dism',
        'sfc'
    ];

    private static cleanCommand(command: string): string {
        // Remove markdown code blocks and backticks
        let cleaned = command.replace(/```[\s\S]*?```/g, '');
        cleaned = cleaned.replace(/`/g, '');
        cleaned = cleaned.replace(/\n/g, '');
        cleaned = cleaned.trim();

        // Command mappings for Windows
        const commandMappings: { [key: string]: string } = {
            'ls': 'dir',
            'pwd': 'cd',
            'rm': 'del',
            'cp': 'copy',
            'mv': 'move',
            'cat': 'type',
            'clear': 'cls',
            'mkdir': 'md',
            'rmdir': 'rd'
        };

        // Convert Unix commands to Windows
        for (const [unixCmd, winCmd] of Object.entries(commandMappings)) {
            if (cleaned.startsWith(unixCmd + ' ') || cleaned === unixCmd) {
                cleaned = cleaned.replace(unixCmd, winCmd);
                break;
            }
        }

        return cleaned;
    }

    private static requiresAdminPrivileges(command: string): boolean {
        return this.adminCommands.some(cmd => 
            command.toLowerCase().startsWith(cmd.toLowerCase())
        );
    }

    static async generateCommand(userInput: string): Promise<string> {
        try {
            const prompt = `Generate a simple Windows CMD command (not PowerShell) for this request. 
                          Avoid commands that require administrator privileges.
                          Only return the exact command to execute, no explanations or code blocks.
                          Request: "${userInput}"`;
            
            const response = await fetch(this.OLLAMA_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: this.MODEL_NAME,
                    prompt: prompt,
                    stream: false
                })
            });

            const data: OllamaResponse = await response.json();
            const cleanedCommand = this.cleanCommand(data.response);

            // Check if command requires admin privileges
            if (this.requiresAdminPrivileges(cleanedCommand)) {
                throw new Error('This command requires administrator privileges.');
            }

            console.log('Original response:', data.response);
            console.log('Cleaned command:', cleanedCommand);
            return cleanedCommand;
        } catch (error) {
            console.error('Error generating command:', error);
            throw error;
        }
    }

    static async explainCommand(command: string, output: string): Promise<string> {
        try {
            const prompt = `Explain what this Windows CMD command does and its output in simple terms.
                          If there was an error, explain what might have caused it and suggest alternatives.
                          Command: ${command}
                          Output: ${output}`;

            const response = await fetch(this.OLLAMA_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: this.MODEL_NAME,
                    prompt: prompt,
                    stream: false
                })
            });

            const data: OllamaResponse = await response.json();
            return data.response.trim();
        } catch (error) {
            console.error('Error generating explanation:', error);
            throw new Error('Failed to generate explanation');
        }
    }
} 