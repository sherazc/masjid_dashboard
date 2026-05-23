# Masjid Dashboard

## Create project
```bash
npx create-expo-app@latest --template default@sdk-55
npm run reset-project
npx expo install expo-dev-client
npx expo run:ios
npx expo run:android
```

## Add Libraries
```bash
npx expo install @react-native-async-storage/async-storage
npx expo install expo-notifications
npx expo install react-native-svg
npx expo install react-redux
npx expo install redux
```

# mdb-core-js library
Add below in dependencies

`"mdb-core-js": "file:../mdb-core-js"`

Add metro.config.js
```javascript
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const mdbCoreJsRoot = path.resolve(projectRoot, '../mdb-core-js');

const config = getDefaultConfig(projectRoot);

// 1. Watch the local package and the project root
config.watchFolders = [projectRoot, mdbCoreJsRoot];

// 2. Let Metro know where to resolve packages from.
// This includes the project's node_modules and the mdb-core-js project
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(mdbCoreJsRoot, 'node_modules'),
];

// 3. Optional: help Metro resolve the package name directly to its folder
config.resolver.extraNodeModules = {
  'mdb-core-js': mdbCoreJsRoot,
};

// 4. Force Metro to resolve (sub)dependencies only from the `node_modules` of the project root

module.exports = config;

```


## Project Java Setup

Download and install JDK 21. The way project stands, it does not work in JDK 25

Created jenv's .java-version file with 21 in it.

Set ANDROID_HOME in `.bash_profile` and `.zprofile`. I have set it in sheraz_profile

`export ANDROID_HOME=/Users/sheraz/Library/Android/sdk`

`script-clean-all.sh`: Use this script to clean all the cache

## AVD

Download and install Android Studio

Open Device Manager and create a AVD.

`$ANDROID_HOME/emulator/emulator -list-avds`: Use this command to list all AVDs

Update `script-start-avd.sh` with AVD's name

run `script-start-avd.sh` start AVD

## AVD Visual Screen Size

I was unable to visually resize avd with skin. To fix it remove device skin

Android Studio -> Device Manager -> click 3 dots next to device -> Additional settings tab -> Device skin -> [None]

## Simulator

Download install XCode

run `script-start-simulator.sh`

## Start Project

`npm install`

`npx expo run:ios`

`npx expo run:android`
