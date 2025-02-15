import React from 'react';
import { CommandLog } from '../types';

interface Props {
    logs: CommandLog[];
}

export const CommandLogs: React.FC<Props> = ({ logs }) => {
    return (
        <div className="h-screen fixed top-0 right-0 w-1/3 bg-black bg-opacity-90 text-green-400 p-4 overflow-y-auto font-mono text-sm">
            <h2 className="text-lg font-semibold mb-4 sticky top-0 bg-black bg-opacity-90 py-2">Command History</h2>
            <div className="space-y-4">
                {logs.map((log) => (
                    <div key={log.id} className="border-l-2 border-green-600 pl-3">
                        <div className="text-gray-500 text-xs">
                            {log.timestamp.toLocaleTimeString()}
                        </div>
                        <div className="text-yellow-400">
                            $ {log.input}
                        </div>
                        <div className="text-blue-400">
                            → {log.command}
                        </div>
                        {log.result.success ? (
                            <div className="text-green-400 whitespace-pre-wrap">
                                {log.result.output}
                            </div>
                        ) : (
                            <div className="text-red-400">
                                Error: {log.result.error}
                            </div>
                        )}
                        {log.explanation && (
                            <div className="text-gray-400 text-xs mt-1 border-l border-gray-700 pl-2">
                                {log.explanation}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}; 