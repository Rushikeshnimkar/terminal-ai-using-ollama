import { useState } from 'react';
import { CommandInput } from './components/CommandInput';
import { CommandOutput } from './components/CommandOutput';
import { CommandLogs } from './components/CommandLogs';
import { executeCommand } from './services/commandService';
import { AIService } from './services/aiService';
import { Command, CommandResult, CommandLog } from './types';
import { v4 as uuidv4 } from 'uuid';

const commonCommands: Command[] = [
    // File System Operations
    {
        id: 'files-1',
        description: 'List files and directories',
        command: 'dir',
        category: 'Files'
    },
    {
        id: 'files-2',
        description: 'Show current directory path',
        command: 'cd',
        category: 'Files'
    },
    {
        id: 'files-3',
        description: 'Create new directory',
        command: 'md new_folder',
        category: 'Files'
    },
    {
        id: 'files-4',
        description: 'Delete empty directory',
        command: 'rd folder_name',
        category: 'Files'
    },
    {
        id: 'files-5',
        description: 'Copy file',
        command: 'copy source.txt destination.txt',
        category: 'Files'
    },

    // System Information
    {
        id: 'sys-1',
        description: 'Show system information',
        command: 'systeminfo',
        category: 'System'
    },
    {
        id: 'sys-2',
        description: 'Show date and time',
        command: 'time /t & date /t',
        category: 'System'
    },
    {
        id: 'sys-3',
        description: 'Show disk space',
        command: 'wmic logicaldisk get size,freespace,caption',
        category: 'System'
    },
    {
        id: 'sys-4',
        description: 'Show running processes',
        command: 'tasklist',
        category: 'System'
    },

    // Network
    {
        id: 'net-1',
        description: 'Show IP configuration',
        command: 'ipconfig',
        category: 'Network'
    },
    {
        id: 'net-2',
        description: 'Test network connection',
        command: 'ping google.com',
        category: 'Network'
    },
    {
        id: 'net-3',
        description: 'Show network statistics',
        command: 'netstat',
        category: 'Network'
    },

    // Utility
    {
        id: 'util-1',
        description: 'Clear screen',
        command: 'cls',
        category: 'Utility'
    },
    {
        id: 'util-2',
        description: 'Show command history',
        command: 'doskey /history',
        category: 'Utility'
    },
    {
        id: 'util-3',
        description: 'Show environment variables',
        command: 'set',
        category: 'Utility'
    }
];

function App() {
    const [result, setResult] = useState<CommandResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [explanation, setExplanation] = useState<string>('');
    const [logs, setLogs] = useState<CommandLog[]>([]);

    const handleCommand = async (input: string) => {
        setIsLoading(true);
        setExplanation('');
        
        try {
            const generatedCommand = await AIService.generateCommand(input);
            console.log('Generated command:', generatedCommand);

            const commandResult = await executeCommand(generatedCommand);
            setResult(commandResult);

            let commandExplanation = '';
            if (commandResult.success) {
                commandExplanation = await AIService.explainCommand(
                    generatedCommand,
                    commandResult.output
                );
                setExplanation(commandExplanation);
            }

            // Add to logs
            const newLog: CommandLog = {
                id: uuidv4(),
                timestamp: new Date(),
                input,
                command: generatedCommand,
                result: commandResult,
                explanation: commandExplanation
            };
            setLogs(prevLogs => [newLog, ...prevLogs]);

        } catch (error) {
            const errorResult = {
                success: false,
                output: '',
                error: error instanceof Error ? error.message : 'An error occurred'
            };
            setResult(errorResult);

            // Add error to logs
            const newLog: CommandLog = {
                id: uuidv4(),
                timestamp: new Date(),
                input,
                command: 'Error generating command',
                result: errorResult
            };
            setLogs(prevLogs => [newLog, ...prevLogs]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="grid grid-cols-3">
                {/* Main content - takes up 2/3 of the screen */}
                <div className="col-span-2 p-6">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl font-bold mb-8 text-center">Terminal Assistant</h1>
                        
                        <div className="space-y-6">
                            <CommandInput 
                                onSubmit={handleCommand}
                                isLoading={isLoading}
                            />

                            {isLoading && (
                                <div className="flex justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                </div>
                            )}

                            {result && (
                                <div className="space-y-4">
                                    <CommandOutput result={result} />
                                    
                                    {explanation && (
                                        <div className="bg-gray-800 rounded-lg p-4">
                                            <h2 className="text-lg font-semibold mb-2">Explanation:</h2>
                                            <p className="text-gray-300">{explanation}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="mt-8">
                                <h2 className="text-xl font-semibold mb-4">Common Commands</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Object.entries(
                                        commonCommands.reduce((acc, cmd) => {
                                            if (!acc[cmd.category]) {
                                                acc[cmd.category] = [];
                                            }
                                            acc[cmd.category].push(cmd);
                                            return acc;
                                        }, {} as Record<string, Command[]>)
                                    ).map(([category, commands]) => (
                                        <div key={category} className="bg-gray-800 rounded-lg p-4">
                                            <h3 className="text-lg font-medium mb-3 text-blue-400">{category}</h3>
                                            <div className="space-y-2">
                                                {commands.map((cmd) => (
                                                    <button
                                                        key={cmd.id}
                                                        onClick={() => handleCommand(cmd.description)}
                                                        className="w-full text-left p-2 hover:bg-gray-700 rounded transition-colors"
                                                    >
                                                        <div className="text-sm font-medium">{cmd.description}</div>
                                                        <div className="text-xs text-gray-400">{cmd.command}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Command logs - takes up 1/3 of the screen */}
                <CommandLogs logs={logs} />
            </div>
        </div>
    );
}

export default App;
