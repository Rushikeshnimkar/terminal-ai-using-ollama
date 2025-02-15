# Terminal Assistant

An AI-powered desktop application that helps users interact with the Windows command line using natural language. Built with Electron, React, and CodeLlama.

## Features

- 🤖 Natural language to command conversion
- 💻 Real-time command execution
- 📝 Command explanations and output analysis
- 📋 Command history with detailed logs
- 🎯 Common commands categorized by function
- 🖥️ Native Windows desktop application

## Prerequisites

Before running this application, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [Ollama](https://ollama.ai/) with CodeLlama model
- Windows operating system

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/terminal-assistant.git
cd terminal-assistant
```

2. Install dependencies:
```bash
npm install
```

3. Make sure Ollama is running with CodeLlama:
```bash
ollama pull codellama
ollama serve
```

## Development

To run the application in development mode:
```bash
npm run electron:dev
```

## Building

To create a production build:
```bash
npm run electron:build
```

The installer will be created in the `release` folder.

## Project Structure

```
terminal-assistant/
├── src/                    # Source files
│   ├── components/        # React components
│   ├── services/         # Service layer
│   ├── types/           # TypeScript types
│   └── App.tsx          # Main React component
├── main.ts               # Electron main process
├── preload.ts           # Electron preload script
├── vite.config.ts       # Vite configuration
└── package.json         # Project configuration
```

## Technology Stack

- ⚡ Electron - Desktop application framework
- ⚛️ React - UI framework
- 🎨 TailwindCSS - Styling
- 📝 TypeScript - Type safety
- 🛠️ Vite - Build tool
- 🤖 CodeLlama - AI model
- 🔄 Ollama - AI model serving

## Features in Detail

### Natural Language Processing
- Convert natural language queries into Windows CMD commands
- Intelligent command generation based on user intent
- Error handling and suggestions

### Command Execution
- Secure command execution through Electron
- Real-time output display
- Error handling and recovery

### Command History
- Detailed command logs
- Execution timestamps
- Success/failure status
- Command explanations

### User Interface
- Clean, modern design
- Dark mode
- Categorized command suggestions
- Real-time feedback

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Electron](https://www.electronjs.org/)
- [React](https://reactjs.org/)
- [Ollama](https://ollama.ai/)
- [CodeLlama](https://github.com/facebookresearch/codellama)
