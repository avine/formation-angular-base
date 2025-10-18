## Lab 1: Getting started 1/6
### Setting up your environment

The following software must be installed in your environment:

- [Node.js](https://nodejs.org/en/download) *(and NPM which is installed at the same time as Node.js)*
- [Git](https://git-scm.com/downloads)
- [Visual Studio Code](https://code.visualstudio.com/download)

#### Following the course on your Local system

Install the LTS versions of each software.

#### Following the course on Strigo Virtual Machine

The required software should already be installed.

For VSCode, be sure to use the one located at:

```txt
C:\Programs Files\Microsoft VS Code
```

### Application source code

To complete the labs, you'll be using the Angular application provided, for which **ESLint** and **Prettier** are already configured:

```txt
./lab/workspace/zenika-ng-website
```

The details of this configuration are beyond the scope of this course, but you'll find them clearly documented in the `README.md` file in the same directory.

Nevertheless, you will first create a raw Angular application to see for yourself how it works, even if you won't be using it for the rest of the course.

<!-- separator-vertical -->

## Lab 1: Getting started 2/6
### Creating and running an Angular application

#### Install the Angular CLI globally and create the app with the shell commands

```bash
npm i -g @angular/cli
ng new my-first-app
```

You will be displayed some options for the app:
- Choose **"Yes"** for 'zoneless' application
- Choose **"CSS"** for style preprocessor
- Choose **"No"** for SSR/SSG/Prerendering

#### If you can't install the Angular CLI globally, create the app with the following shell command

```bash
npx @angular/cli new my-first-app
```

However, in this case, to run an Angular CLI command, you will have to use NPM first `npm run ng <command>` instead of just `ng <command>`.

#### Run the Angular dev server

```bash
ng serve # or: `npm start`
```

- Open the Chrome browser and visit: http://localhost:4200.

You should see the app with a placeholder content. 🚀

<!-- separator-vertical -->

## Lab 1: Getting started 3/6
### Taking control of the app

Even if we haven't yet studied the main concepts, let's modify the app right away!

- Replace the content of `src/app/app.html` with:

```html
<h1>Welcome to {{ title }}!</h1>
```

- Add some style in `src/app/app.css`:

```css
h1 {
  color: blue;
}
```

- Replace the property `title` in `src/app/app.ts` with:

```ts
class App {
  title = 'my first component';
}
```

- Check that the app has been updated correctly in the browser. 🚀

<!-- separator-vertical -->

## Lab 1: Getting started 4/6
### Now let's try running the app tests

```bash
ng test # or: `npm test`
```

Because we've modified the app, a test in `app.spec.ts` fail!

- Fix the test *"should render title"* by guessing what's wrong

### Finally let's build the app for production

```bash
ng build # or: `npm run build`
```

- Open a Terminal in `dist/my-first-app/browser/` directory and run the command:

```bash
npx serve --single .
```

This command will download and run the NPM package named [serve](https://www.npmjs.com/package/serve).
Note that this package is not related to the `ng serve` command.

- Open the browser at the URL specified in the console to see the production build in action. 🚀

<!-- separator-vertical -->

## Lab 1: Getting started 5/6

Now, you are done with the raw application you've created! 🎉<br />
From now on, you'll be using the Angular application provided:

```txt
./lab/workspace/zenika-ng-website
```

### Version control system

- Open the browser and login to your favorite cloud-based version control system (Github, Gitlab, ...)
- Remotely, create a new empty repository named `zenika-ng-website` in which to save your code
- Locally, configure your Git user **name** and **email**:

```bash
git config --global user.name "<YOUR_NAME>"
git config --global user.email <YOUR_EMAIL>
```

- Open the directory `./lab/workspace/zenika-ng-website` in VSCode

- Run the following commands to create a new Git repository and add your first commit

```bash
git init
git add .
git commit -m "Initial commit"
```

- Finally, push your local repository from the command line over *HTTPS* (not SSH).

Here's an example for Github:

```bash
git remote add origin https://github.com/[YOUR_USERNAME]/zenika-ng-website.git
git branch -M main
git push -u origin main
```

<!-- separator-vertical -->

## Lab 1: Getting started 6/6
### NPM packages

Install your app dependencies with NPM, by running the following command:

```bash
npm i # or: npm install
```

Run the Angular dev server to verify that everything works fine.

```bash
ng serve # or: `npm start`
```

### Visual Studio Code Extensions

If you use VSCode as your IDE, install the following extensions in addition, to improve your developer experience:

- [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) (optional)
- [Github Theme](https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme) (optional)
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme) (optional)
