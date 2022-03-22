# Init script for Strigo Practice Lab
 
With **Strigo** all the VMs creation & destruction is managed by the platform.
 
You just need to put the content of the [`ubuntu.sh`](./ubuntu.sh) file in the Practice Lab's ubuntu section at the following url : https://app.strigo.io/classes/s5vmaTAnNiqPEzEg7

- add chrome for karma + e2e tests
- add remote vscode listening on port 9999 available in the lab interface and from outside
- increase the watchers limit for tests+dev server
- display a welcome message with vs-code password and public ip/DNS

## Notes for Strigo (Headless server ubuntu)

Corrections is in the directory `/home/ubuntu/.corrections`
Ressources (index.html and server) is in the directory `/home/ubuntu/ressources`s

- replace ng start script with ```ng serve --host 0.0.0.0 --disableHostCheck true```
### Tests :
  - replace in karma.conf.js
``browsers: ['Chrome'],`` with ``browsers: ['ChromeHeadless'],``
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

or open the http://dynamic-url.strigo.io:9876/ in your browser (dynamic url is the one you can find in the lab interface)
### Chapter 7 http :

- Create a file proxy.conf.json in the root of the project :
```json
{
  "/rest/*": {
    "target": "http://localhost:8080",
    "secure": false,
    "logLevel": "debug",
    "changeOrigin": true
  }
}
```
- Change the start script to : ```ng serve --host 0.0.0.0 --disableHostCheck true --proxy-config proxy.conf.json```
- In service use the API_URL to `/rest/` (no need to add http://localhost:8080)

### Télécharger un zip de son code

```bash
sudo apt install zip
DIR_NAME="application"
ZIP_NAME="formation"
mkdir $ZIP_NAME
rsync -av --progress ./$DIR_NAME ./$ZIP_NAME/ --exclude node_modules --exclude .git --exclude .angular
zip -r $ZIP_NAME.zip $ZIP_NAME
echo "http://${PUBLIC_DNS}:8080/$ZIP_NAME.zip"
npx http-server -p 8080
```

