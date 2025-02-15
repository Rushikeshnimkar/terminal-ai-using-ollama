export interface Command {
    id: string;
    description: string;
    command: string;
    category: string;
}

export interface CommandResult {
    success: boolean;
    output: string;
    error?: string;
}

export interface CommandHistory {
    input: string;
    command: string;
    output: string;
    timestamp: Date;
}

export interface CommandLog {
    id: string;
    timestamp: Date;
    input: string;
    command: string;
    result: CommandResult;
    explanation?: string;
} 