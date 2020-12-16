# Init script for Strigo Practice Lab
 
With **Strigo** all the VMs creation & destruction is managed by the platform.
 
You just need to put the content of the [`ubuntu.sh`](./ubuntu.sh) file in the Practice Lab's ubuntu section at the following url : https://app.strigo.io/classes/s5vmaTAnNiqPEzEg7

- add chrome for karma + e2e tests
- add remote vscode listening on port 9999 available in the lab interface and from outside
- increase the watchers limit for tests+dev server
- display a welcome message with vs-code password and public ip/DNS

## Notes for Strigo (Headless server ubuntu)

- replace ng start script with ```ng serve --host 0.0.0.0 --disableHostCheck true```
- replace in karma.conf.js
``browsers: ['ChromeHeadless'],`` with ``browsers: ['ChromeHeadless'],``
- replace in protractor.conf.js 
```
capabilities: {
    browserName: 'chrome',
  },
```
by 
```
capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [ "--headless", "--disable-gpu", "--window-size=800,600" ]
   }
  },
```
