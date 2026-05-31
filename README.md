# Masjid Dashboard
Masjid Dashboard is SAAS application that provides Prayer Time management for Masjids.

Masjids register them self. Once registered they get
- Prayer time dashboard
- IOS and Android application
- JavaScript widgets to show on Masjids own website
  - today's prayer time grid
  - 

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
Contains deployment scripts

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


## MDBArchive
Contains previous versions of MasjidDashboardMobile


