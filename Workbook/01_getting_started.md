## Lab 1: Getting started

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

- Node.js
- NPM
- Git
- Visual Studio Code (`"C:\Programs Files\Microsoft VS Code"`)

#### Visual Studio Code Extensions

If you use VSCode as your IDE, install the following extensions in addition:

- [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
- [Auto import](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport) (optional)
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) (optional)
- [Github Theme](https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme) (optional)
- [vscode-icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons) (optional)

<div class="pb"></div>

#### Version control system

Note: to use "Git Credential Manager", you need to restart the Windows VM once all the programs have been installed.

- Open the browser and login to your favorite cloud-based version control system (Github, Gitlab, ...)
- Remotely, create a new empty repository named `zenika-ng-website` in which to save your code
- Locally, configure your Git name and email:

```shell
git config --global user.name "<YOUR_NAME>"
git config --global user.email <YOUR_EMAIL>
```

<div class="pb"></div>



### Creating and running your Angular application

This app will be used along all labs.

#### Install the Angular CLI globally and create your app with the shell commands

```shell
npm i -g @angular/cli
ng new zenika-ng-website
```

You will be displayed some options for your app.
- Choose "CSS" as style preprocessor
- Choose "No" for SSR/SSG/Prerendering

#### If you can't install the Angular CLI globally, create your app with one of the following shell commands

```shell
npm init @angular zenika-ng-website
```

or:

```shell
npx @angular/cli new zenika-ng-website
```

In this case, to run an Angular CLI command, you will have to use NPM first `npm run ng <command>` instead of just `ng <command>`.

#### Run the Angular dev server

```shell
ng serve
```

or:

```shell
npm start
```

Open the Chrome browser and visit: http://localhost:4200.

You should see the app with a placeholder content. 🚀

<div class="pb"></div>



### Taking control of your application

Even if we haven't yet studied the main concepts, let's modify the application right away!

- Replace the content of `src/app/app.component.html` with:

```html
<h1>Welcome to {{ title }}!</h1>
```

- Add some style in `src/app/app.component.css`:

```css
h1 {
  color: blue;
}
```

- Replace the property `title` in `src/app/app.component.ts` with:

```ts
class AppComponent {
  title = 'my first component';
}
```

- Check that the application has been updated correctly in the browser. 🚀

### Now let's try running the application tests

```shell
ng test
```

or:

```shell
npm test
```

Because we've modified the application, the tests in `app.component.spec.ts` fail.

- Fix the test on property `title`
- Fix the test on tag `h1`

### Finally let's build the application for production

```shell
ng build
```

- Open a shell window in `dist/zenika-ng-website/browser/` directory and run the command:

```shell
npx serve --single .
```

- Open the browser at the URL specified in the console

<div class="pb"></div>



### Synchronize your repository

Push your local repository from the command line over *HTTPS* (not SSH).

Here's an example for Github:

```shell
git remote add origin https://github.com/[YOUR_USERNAME]/zenika-ng-website.git
git branch -M main
git push -u origin main
```

<div class="pb"></div>
