# Masjid Dashboard
Masjid Dashboard is SAAS application that provides Prayer Time management for Masjids.

Masjids register them self. Once registered they get
- Prayer time dashboard
- IOS and Android application
- JavaScript widgets to show on Masjids own website
  - Dashboard/TV display fullscreen page.
  - today's prayer time grid
  - Prayer Calendar
  - Jummah prayer schedule
  - Reminder of day

Application is deployed on https://masjiddashboard.com/

and Apple app store and android play

## cdb/api
Contains Spring boot project that is the backend for the UIs

## cdb/container
Contains scripts that I was trying to containerize the application but left that effort in the middle

## cdb/misc
Contains application docs, wireframe, app images's svgs, backups migration scripts and more

## cdb/e2e/cdb-e2e
End to end test written in postman.
Some time the api test need to create and delete data.
cdb-e2e is a spring boot application that is used by postman collection to run end to end tests.

## cdb/infrastructure
Contains deployment scripts and directory structure for the server.

### cdb/infrastructure/sandbox_step1_setup.sh
Run these commands to developer machine to copy below files on server 
- infrastructure files
- Spring boot app.jar
- Mongo DB backup archive gzip file

### cdb/infrastructure/dev/sandbox_step2_init.sh
Run these commands on server to set up the server.

## cdb/ui
Contains the main ReactJS application.
It contains admin panel 
Contains TV display screen

## cdb/widgets
These are multiple ReactJS applications that gets built and copied built files in cdb/ui/public/static before cdb/ui gets deployed.

## MasjidDashboardMobile 
is a react native expo project

### MasjidDashboardMobile/src/app
Contains all the screens

### MasjidDashboardMobile/src/components
Contains components that are used in the screens

### MasjidDashboardMobile/src/services/Constants.ts
has 
const BASE_URL = "https://www.masjiddashboard.com";

and common style

### MasjidDashboardMobile/src/services
I have tried to keep most business logic in services. 
I have tried to keep components and screens clean from business logic.

### MasjidDashboardMobile/src/services/ApiMdb.ts
Has all the api calls.

### Local Development with Simulators (Android/iOS)
To run the mobile app against a local `cdb/api` on a Mac:
1. Ensure the local API is running (usually on port `8085`).
2. The `BASE_URL` in `MasjidDashboardMobile/src/services/Constants.ts` is configured to automatically switch:
    - **Android Emulator**: `http://10.0.2.2:8085`
    - **iOS Simulator**: `http://localhost:8085`
    - This only applies when `__DEV__` is true.
3. For production builds, it will use `https://www.masjiddashboard.com`.

## MDBArchive
Contains previous versions of MasjidDashboardMobile


