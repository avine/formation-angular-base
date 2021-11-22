## Lab 1: Setup an Angular application

For this first lab, we will setup our first **Angular** application, which will be used in the following labs.

The process to setup the application is composed of the following steps:

- Create a new project with `@angular/cli`
- Implement the main page
- Create the main component
- Run the server to test the application

### Create the project

We will use `@angular/cli` to setup an application that provides:

- Application scaffolding and configuration
- Dependencies management

Follow the steps: 
- Download `@angular/cli` with `npm`. This module needs a recent version of *Node.js*

- From the console, run `ng new Application` to create a new application

- Take a look at the structure:
	- Dependencies
	- TypeScript configuration
	- TypeScript files

- Once done, run the application with `ng serve` command. It compiles the sources first and then starts the server.

### First component

Even if we have not studied the main concepts, we will do some changes to take over the application structure.

- The main component will have a placeholder HTML code
- Replace the html by this html code

```html
<h1>This is my first component</h1>
```

- The string above must be hold by the `title` variable from the `Application` class. To display that variable, use the following syntax: `{{title}}`

- Check the application has been updated correctly in the browser.
