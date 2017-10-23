Started from Ionics tab template created using ```ionic start CS_453_P2 tabs```

## Install :

```bash
$ sudo npm install -g ionic cordova
$ cd CS_453_P2
$ npm install
# to run as a webapp uncomment CS_453_P2/src/pages/home/home.ts:24
# and comment out CS_453_P2/src/pages/home/home.ts:25
# need to do this because of CORS proxy issues, after this is done run.
ionic serve
```
### Android specific
Need to have SDK tools in path, etc. See ionic docs.
```bash
# to run as android uncomment CS_453_P2/src/pages/home/home.ts:25
# and comment out CS_453_P2/src/pages/home/home.ts:24
# to emulate on android 
ionic cordova emulate
# to build .apk production
ionic cordova compile
```
### Todo
- remove tabs and unused pages
- support search type input (currently defaulted to type=food)
- support keyword search (see api docs)


