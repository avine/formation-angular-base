## TP 1: Start an Angular application

In this first TP, we will initiate our first application **Angular**, which will be reused in the following TPs.

The initialization of this application will be broken down into several stages:

- Creating an Angular project with `@angular/cli`
- Implementation of the main page
- Creating the main component
- Launch the server to test

### Creating the project

The application, which we will implement, will be initialized via the `@angular/cli` tool. This tool will automate:

- creation and configuration of the skeleton of the application
- dependency management


- Download `@angular/cli` using` NPM`. This module requires a recent version of * NodeJS *

- From your console, create a new project using the command `ng new Application --style = scss`

- Look at the structure of the application just created
- dependencies installed
- TypeScript configuration
- the different TypeScript files

- Once this step is complete, you can now launch your application by running the `npm start` command. This command will support the compilation of your sources and the launch of a server.

### Editing the application

Even if we have not yet approached the concepts of the framework, we will make small modifications to take in hand the structure of our application.

- The main component must contain the following HTML code:

```Html
<h1> Welcome to {{title}}! </ h1>
```

- The `{{title}}` variable will be replaced by the contents of the `title` property in the` Application` class. Change the value of this property to include your first name.

- Check that you are getting the latest version of your application in the browser with the title `Welcome to YourName`.
