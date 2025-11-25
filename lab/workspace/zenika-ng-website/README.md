# ZenikaNgWebsite

This project was generated using the [Angular CLI](https://github.com/angular/angular-cli).

## ESLint

> ESLint statically analyzes your code to quickly find problems.

ESLint was installed and configured by running the Angular schematic:

```bash
ng add angular-eslint
```

Result of the schematic:

- NPM packages installed: `angular-eslint`, `eslint` and `typescript-eslint`

- `eslint.config.js` file added

- `"lint"` section added in the `angular.json` configuration file

## Prettier

> Prettier is an opinionated code formatter.

Prettier was installed and configured manually.

- NPM packages installed as "dev" dependencies:

```bash
npm i -D prettier prettier-plugin-organize-imports eslint-config-prettier
```

- `.prettierignore` file added

```txt
.github/
.vscode/
```

- `package.json` file updated

```json
{
  "prettier": {
    "printWidth": 120,
    "singleQuote": true,
    "plugins": ["prettier-plugin-organize-imports"], // <-- Added line
    "overrides": [
      {
        "files": "*.html",
        "options": { "parser": "angular" }
      }
    ]
  }
}
```

- `eslint.config.js` file updated (adding `eslint-config-prettier`):

```js
...
const eslintConfigPrettier = require('eslint-config-prettier/flat');

module.exports = defineConfig([
  ...,
  eslintConfigPrettier,
]);
```

- `"format"` script added in `package.json` file

```json
{
  "scripts": {
    "format": "prettier --write ."
  }
}
```

## VSCode extensions

If you are using VSCode, you should install the following extensions:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Finally, you should configure VSCode to `"formatOnSave"` using Prettier extension.

## In-depth resources

- [eslint-angular](https://github.com/angular-eslint/angular-eslint)
- [Install Prettier](https://prettier.io/docs/install)
- [Configure ESLint](https://eslint.org/docs/latest/use/configure/)
