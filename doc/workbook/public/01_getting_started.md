## Lab 1: Getting started 1/7
### Setting up your environment

#### Training on Local system

You should install the following on your system:

- [Node.js](https://nodejs.org/) version LTS
- NPM (It will be installed at the same time as Node.js)
- [Git](https://git-scm.com/)
- IDE (e.g. [Visual Studio Code](https://code.visualstudio.com/))

Unzip the learning materials given by your trainer.

#### Training on Strigo VM

Strigo Lab provides a Windows VM with the following functional environment:

- [Node.js](https://nodejs.org/en/download)
- NPM (installed with Node.js)
- [Git](https://git-scm.com/downloads/win)
- [Visual Studio Code](https://code.visualstudio.com/download) (`"C:\Programs Files\Microsoft VS Code"`)

Note: Software can be installed easily if they are not pre-installed.



## Lab 1: Getting started 2/7
#### Visual Studio Code Extensions

If you use VSCode as your IDE, install the following extensions in addition:

- [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) (optional)
- [Github Theme](https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme) (optional)
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme) (optional)

#### Version control system

- Open the browser and login to your favorite cloud-based version control system (Github, Gitlab, ...)
- Remotely, create a new empty repository named `zenika-ng-website` in which to save your code
- Locally, configure your Git name and email:

```bash
git config --global user.name "<YOUR_NAME>"
git config --global user.email <YOUR_EMAIL>
```



## Lab 1: Getting started 3/7
### Creating and running your Angular application

This app will be used along all labs.

#### Install the Angular CLI globally and create your app with the shell commands

```bash
npm i -g @angular/cli
ng new zenika-ng-website
```

You will be displayed some options for your app.
- Choose "No" for 'zoneless' application
- Choose "CSS" as style preprocessor
- Choose "No" for SSR/SSG/Prerendering



## Lab 1: Getting started 4/7
#### If you can't install the Angular CLI globally, create your app with one of the following shell commands

```bash
npm init @angular zenika-ng-website
```

or:

```bash
npx @angular/cli new zenika-ng-website
```

In this case, to run an Angular CLI command, you will have to use NPM first `npm run ng <command>` instead of just `ng <command>`.

#### Run the Angular dev server

```bash
ng serve # or: `npm start`
```

- Open the Chrome browser and visit: http://localhost:4200.

You should see the app with a placeholder content. 🚀



## Lab 1: Getting started 5/7
### Taking control of your application

Even if we haven't yet studied the main concepts, let's modify the application right away!

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

- Check that the application has been updated correctly in the browser. 🚀



## Lab 1: Getting started 6/7
### Now let's try running the application tests

```bash
ng test # or: `npm test`
```

Because we've modified the application, the tests in `app.spec.ts` fail.

- Fix the test on property `title`
- Fix the test on tag `h1`

### Finally let's build the application for production

```bash
ng build
```

- Open a shell window in `dist/zenika-ng-website/browser/` directory and run the command:

```bash
npx serve --single .
```

This command will download and run the NPM package named [serve](https://www.npmjs.com/package/serve).
Note that this package is not related to the `ng serve` command.

- Open the browser at the URL specified in the console



## Lab 1: Getting started 7/7
### Synchronize your repository

Push your local repository from the command line over *HTTPS* (not SSH).

Here's an example for Github:

```bash
git remote add origin https://github.com/[YOUR_USERNAME]/zenika-ng-website.git
git branch -M main
git push -u origin main
```
