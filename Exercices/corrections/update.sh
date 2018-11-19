#!/bin/sh
cd $1
ng update @angular/cli @angular/core
npm install @types/jasmine@latest @types/node@latest codelyzer@latest karma@latest karma-chrome-launcher@latest karma-cli@latest karma-jasmine@latest karma-jasmine-html-reporter@latest jasmine-core@latest jasmine-spec-reporter@latest protractor@latest tslint@latest --save-dev
npm audit fix
npm run build
npm run test -- --watch=false
cd -
