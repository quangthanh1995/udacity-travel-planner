## Prerequisites (IMPORTANT)

- **Python 3.11.0 or later installed (IMPORTANT)** <i>In case you cannot run the app, please make sure you have already installed Python 3.11.0 on your machine.</i>

- NodeJS 14.21.3 or later installed

## Project Description

This is an app that can help you to planning your trips, using Geonames API, Weatherbit API and Pixabay API. Just type your location for travel, choose "Start date", "End date" and click button "Add Trip" to add a trip to your plan.

## Technologies

- HTML
- SCSS
- JavaScript
- NodeJS (Express)
- Webpack
- Jest
- Supertest
- Workbox
- Babel

## Prerequisites

- **Python 3.11.0 or later installed (IMPORTANT)**
- NodeJS 14.21.3 or later installed

## Dependencies

`"dependencies": {
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "jest-fetch-mock": "^3.0.3",
    "webpack": "^4.35.3",
    "webpack-cli": "^3.3.5"
  },
  "devDependencies": {
    "@babel/core": "^7.13.15",
    "@babel/plugin-transform-modules-commonjs": "^7.13.8",
    "@babel/preset-env": "^7.13.15",
    "babel-loader": "^8.2.2",
    "body-parser": "^1.19.0",
    "clean-webpack-plugin": "^3.0.0",
    "cors": "^2.8.5",
    "css-loader": "^5.2.1",
    "html-webpack-plugin": "^3.2.0",
    "jest": "^26.6.3",
    "mini-css-extract-plugin": "^1.4.1",
    "node-fetch": "^2.6.1",
    "node-sass": "^5.0.0",
    "optimize-css-assets-webpack-plugin": "^5.0.4",
    "sass": "^1.32.8",
    "sass-loader": "^10.1.1",
    "style-loader": "^2.0.0",
    "terser-webpack-plugin": "^4.2.3",
    "webpack-dev-server": "^3.11.2",
    "workbox-webpack-plugin": "^6.1.5"
  }
`

**IMPORTANT NOTE: You need to add an GEONAMES_USER, WEATHERBIT_API_KEY, PIXABAY_API_KEY and PORT using .env file at the root of the project. I will provide these INFO in Submission Details**

## Additional functions

- Use Local Storage to save the data so that when they close, then revisit the page, their information is still there.
- Remove a trip from the list.

## How to run test

If you want to run test, you can run the command `npm run test`

## How to run the app

- Clone the project at [https://github.com/quangthanh1995/udacity-travel-planner](https://github.com/quangthanh1995/udacity-travel-planner)

- Create a .env file at the root of project and paste these info to it:

  GEONAMES_USER=fenav62638

  WEATHERBIT_API_KEY=9035c1c21b4144a2a73565c491efa8af

  PIXABAY_API_KEY=44784056-c7cc7211603ce459298bec4d8

  PORT=8000

- `cd` into your project folder and run these commands:

- `npm install --legacy-peer-deps` <i>(the flag --legacy-peer-deps is NEEDED)</i>

- If you want to run the app in PROD Mode, run these commands:

- `npm run build-prod`

- `npm run start`

- If you want to run the app in DEV Mode, run these commands:

- `npm run build-dev`

- `npm run start`

**ADDITIONAL NOTES:**

- Even Udacity advises learners to install old module versions like in the lecture to avoid dependency conflicts.

- I tried with Node > 14 but there were some weird issues regarding dependency conflicts, so I decided to take the alternative of adding my node_modules to GitHub so reviewers could run the project without re-install node_modules.
