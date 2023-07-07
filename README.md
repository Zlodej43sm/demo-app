# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

First launch require `yarn build`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

Don't forget to launch own API https://hub.docker.com/r/stakingrewards/engineering-frontend-challenge or use custom `fakeRequest` i.e;
`src/redux/SpreadsheetSlice/index.ts // search by IS_MOCK_API`


### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### TODO:

- filter by result
- add/remove row
- save cell data on enter
- improve list view + table loader per page view
- add notifications state
- save temp data in localstorage
- more unit tests coverage with actions/behaviour 
- more coming...
