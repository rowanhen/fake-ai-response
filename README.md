# 🎭 Fake AI Response

Generate realistic screenshots of popular AI tools. Create fake conversations for mockups, demos, tutorials, and content creation.

![Preview](https://via.placeholder.com/800x400?text=Fake+AI+Response)

## ✨ Features

- **Multiple Skins**: Claude Code (terminal TUI), ChatGPT, Claude.ai, Cursor, Codex CLI, GitHub Copilot
- **Live Preview**: See your fake conversation in real-time
- **Easy Editing**: Add, remove, and reorder messages with a simple editor
- **Role Toggle**: Switch between user and assistant roles per message
- **Dark/Light Mode**: Toggle theme for skins that support it
- **Export Options**: Copy to clipboard or download as PNG
- **Pixel Perfect**: Each skin matches the real tool's appearance

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎨 Available Skins

| Skin | Description | Theme Support |
|------|-------------|---------------|
| Claude Code | Terminal TUI with ❯ prompt | Dark only |
| ChatGPT | OpenAI web interface | Dark/Light |
| Claude.ai | Anthropic web interface | Dark/Light |
| Cursor | IDE chat panel | Dark only |
| Codex CLI | OpenAI terminal interface | Dark only |
| GitHub Copilot | VS Code chat panel | Dark/Light |

## 🛠 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **html2canvas** - Screenshot capture
- **Lucide React** - Icons

## 📦 Deployment

This is a static site - deploy anywhere:

```bash
npm run build
# Deploy the `dist/` folder
```

Works out of the box with:
- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages

## ⚠️ Disclaimer

This tool is for educational and entertainment purposes only. Not affiliated with OpenAI, Anthropic, GitHub, or Cursor. Use responsibly.

## 📄 License

MIT
