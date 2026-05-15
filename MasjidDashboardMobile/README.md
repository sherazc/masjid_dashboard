# Masjid Dashboard

## Project Setup

Download and install JDK 21. The way project stands, it does not work in JDK 25

Created jenv's .java-version file with 21 in it.

Set ANDROID_HOME in `.bash_profile` and `.zprofile`

`export ANDROID_HOME=/Users/sheraz/Library/Android/sdk`

`script-clean-all.sh`: Use this script to clean all the cache

## AVD

Download and install Android Studio

Open Device Manager and create a AVD.

`$ANDROID_HOME/emulator/emulator -list-avds`: Use this command to list all AVDs

Update `script-start-avd.sh` with AVD's name

run `script-start-avd.sh` start AVD

## Simulator

Download install XCode

run `script-start-simulator.sh`

## Start Project

`npm install`

`npm run start`

`npm run ios`

`npm run android`
