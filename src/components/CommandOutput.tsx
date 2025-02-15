import React from 'react';
import { CommandResult } from '../types';

interface Props {
    result: CommandResult | null;
}

export const CommandOutput: React.FC<Props> = ({ result }) => {
    if (!result) return null;

    return (
        <div className="p-4 bg-gray-900 rounded-lg">
            {result.success ? (
                <pre className="text-green-400 whitespace-pre-wrap font-mono">
                    {result.output}
                </pre>
            ) : (
                <pre className="text-red-400 whitespace-pre-wrap font-mono">
                    Error: {result.error}
                </pre>
            )}
        </div>
    );
}; 