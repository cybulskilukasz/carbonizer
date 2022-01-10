This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.
##Summary
Simple app presenting carbon usage estimates based on provided electricity data in a form of a simple area chart.

I used Recharts as the charting library since it seemed to do the job out of the box with minimum config.

It could definitely be taken further with more complex store, routing, directory structure or styling (I haven't worked with Material UI before and had a hard time achieving what I would like to).
## How to run?

Just to run locally and test, place your API key in `src/app/config.ts`. (Normally unsafe to keep the API key on the client side)

In the project directory, install dependencies and run:

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
