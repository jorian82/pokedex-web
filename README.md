# Pokedex-Web
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.3.

# Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if 
you change any of the source files.

# Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

# App structure
The app is divided into several components, models, helpers and services each folder has its unique function

## Modules
All visible pages are in this folder, each component has its own folder and they are separated by their functionality

## Models
All models used to map the database data into readable elements are in this folder

## Helpers
This folder has crucial elements for the API communication and the token expiring process. It contains:
- An interceptor that handles injecting the jwt token to the request header
- auth guard that watches the access to the only restricted page (Favorites)
- Constants, that hold the url where the api calls are made

## Services
All the files to handle API calls, jwt token storage, authentication, sign in and sign up are stored here


# Executing the app
There are 2 ways to use the UI, one is in developer mode and the other is the standalone form, more suitable for 
deploying to dev, QA and prod environments

## Developer mode instructions
- Clone repo
- Navigate to the app folder
- Execute npm install (Only needed once to load the libraries)
- Change value of constant API_URI in \app\helpers\constants.ts to 'http://localhost:8080'
- Execute npm start
- Navigate to localhost:4200 to land in the main search page

## Standalone instructions
- Clone repo
- Navigate to the app folder
- Execute 'npm install' (Only needed once to load libraries)
- Make sure the value of constant API_URI in \app\helpers\constants.ts is '/api/'
- Execute 'npm run build'
- Once completed copy content if the dist folder to pokedex-api/views folder

