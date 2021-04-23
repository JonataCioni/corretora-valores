# Corretora de Valores
Projeto Corretora De Valores

# Database
CREATE SCHEMA corretora AUTHORIZATION postgres;

# Configuration
In .ENV file, set database connection config:
DB_TYPE, DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME and DB_SCHEMA

# Comands To Run
1º: yarn install
2º: yarn dev:typeorm migration:run

# Extensions
- Auto CLose Tag
- Auto Import
- Auto Rename tag
- Better Comments
- Bracket Pair Colorizer 2
- Color Highlight
- Color Manager
- Color Picker
- Debugger for Chrome
- Debugger for Firefox
- Docker
- DotENV
- EditorConfig for VSCode
- ESLint
- gitignore
- Guides
- Import Cost
- JavaScript (ES6) code snippets
- Material Icon Theme
- Material Theme Icons
- npm
- npm Intellisense
- Path Intellisense
- Prettier - Code formatter
- Prettier ESLint
- Project Manager
- React-Native/React/Redux snippets for es6/es7
- Remote - Containers
- Settings Sync
- shell-format
- Styled-Components Extractor
- styled-components-snippets
- VS Color Picker
- vscode-icons
- vscode-styled-components
- heroku-cli

# VSCode Config
{
	"editor.renderIndentGuides": false,
	"workbench.iconTheme": "eq-material-theme-icons-light",
	"terminal.integrated.shell.windows": "C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
	"editor.fontFamily": "Fira Code",
	"prettier.endOfLine": "lf",
	"editor.fontSize": 14,
	"editor.fontLigatures": true,
	"editor.renderWhitespace": "all",
	"editor.tabSize": 4,
	"editor.insertSpaces": false,
	"editor.autoClosingQuotes": "always",
	"editor.autoIndent": "full",
	"editor.formatOnSave": true,
	"editor.detectIndentation": false,
	"editor.minimap.enabled": false,
	"autoimport.filesToScan": "*.{js,ts,tsx,jsx,css,json}",
	"autoimport.doubleQuotes": false,
	"autoimport.spaceBetweenBraces": true,
	"autoimport.useSemiColon": true,
	"git.autofetch": true,
	"git.confirmSync": false,
	"explorer.confirmDelete": false,
	"explorer.compactFolders": false,
	"eslint.codeActionsOnSave.mode": "all",
	"eslint.alwaysShowStatus": true,
	"eslint.codeAction.disableRuleComment": {
		"enable": true,
		"location": "separateLine"
	},
	"emmet.syntaxProfiles": {
		"javascript": "jsx"
	},
	"emmet.includeLanguages": {
		"javascript": "javascriptreact"
	},
	"eslint.run": "onSave",
	"eslint.validate": ["javascript", "javascriptreact", "css", "json"],
	"editor.codeActionsOnSave": {
		"source.organizeImports": true,
		"source.fixAll": true,
		"source.fixAll.eslint": true
	},
	"[javascript]": {
		"editor.codeActionsOnSave": { "source.fixAll.eslint": true }
	},
	"[javascriptreact]": {
		"editor.codeActionsOnSave": { "source.fixAll.eslint": true }
	},
	"[typescript]": {
		"editor.codeActionsOnSave": { "source.fixAll.eslint": true }
	},
	"[typescriptreact]": {
		"editor.codeActionsOnSave": { "source.fixAll.eslint": true }
	},
	"eslint.workingDirectories": [
		"./"
	],
	"sync.gist": "jonatacioni",
	"projectManager.git.baseFolders": [
		"F:\\Projetos"
	],
	"files.associations": {
		"*.svg": "xml"
	},
	"editor.linkedEditing": true
}

# launch.json
path: F:\Projetos\CorretoraDeValores\corretora-valores\.vscode\launch.json

{
	// Use IntelliSense to learn about possible attributes.
	// Hover to view descriptions of existing attributes.
	// For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
	"version": "0.2.0",
	"configurations": [
		{
			"type": "node",
			"request": "attach",
			"protocol": "inspector",
			"restart": true,
			"name": "Debug",
			"skipFiles": ["<node_internals>/**"],
			"outFiles": ["${workspaceFolder}/**/*.js"]
		}
	]
}
