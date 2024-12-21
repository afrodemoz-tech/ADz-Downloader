# ADz-Downloader
A cross-platform desktop application for downloading YouTube videos and playlists, built with Electron and Python.

## Features
- Download single YouTube videos
- Download entire playlists
- Cross-platform support (Windows, Linux, macOS)
- User-friendly interface
- Progress tracking
- Download quality selection
- Open-source under GNU GPLv3

## Installation

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.7 or higher)
- pip (Python package manager)

### Dependencies
1. Install Node.js dependencies:
```bash
npm install
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

### Running from Source
1. Clone the repository:
```bash
git clone https://github.com/yourusername/youtube-downloader.git
cd youtube-downloader
```

2. Install dependencies as described above

3. Start the application:
```bash
npm start
```

### Building Packages

#### Windows
```bash
npm run build:win
```

#### Linux
```bash
npm run build:linux
```

#### macOS
```bash
npm run build:mac
```

## Contributing
We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## Development
- Written in JavaScript (Electron) and Python
- Uses PyQt5 for UI components
- pytube for YouTube interaction

## License
This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- pytube library
- Electron framework
- All contributors

## Support
- Create an issue for bug reports
- Join our discussions for questions
- See wiki for detailed documentation

## Disclaimer
This tool is for personal use only. Please respect YouTube's terms of service and content creators' rights.
