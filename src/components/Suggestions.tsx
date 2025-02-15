import React from 'react';
import { Command } from '../types';

interface Props {
    commands: Command[];
    onSelect: (command: Command) => void;
}

export const Suggestions: React.FC<Props> = ({ commands, onSelect }) => {
    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold text-white mb-3">Common Commands</h2>
            <div className="grid grid-cols-2 gap-2">
                {commands.map((cmd) => (
                    <button
                        key={cmd.id}
                        onClick={() => onSelect(cmd)}
                        className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 text-left"
                    >
                        <div className="text-white font-medium">{cmd.description}</div>
                        <div className="text-gray-400 text-sm">{cmd.command}</div>
                    </button>
                ))}
            </div>
        </div>
    );
}; 