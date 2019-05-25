"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const functions = require("firebase-functions");
const axios = require("axios");

// clients
const dialogFlowApp = require("./DialogflowApp");
const expressApp = express().use(bodyParser.json());
// const app = express();
const port = 3000;

const getStravaData = async () => {
    const response = await axios("https://www.strava.com/api/v3/activities/2373181785?access_token=ed8c7bfdcac10c2daa7477791cde45b5f51abf5e");
    return response.data;
}

// EXPRESS APP fulfillment route (POST). The entire dialogFlowApp object (incl its handlers) is the callback handler for this route.
expressApp.post("/", dialogFlowApp);


//  EXPRESS APP test route (GET)
expressApp.get("/", async (req, res) => {
  const data = await getStravaData();
  console.log(data.athlete.id);
  res.send("CONFIRMED RECEIPT OF GET REQUEST. " + data.athlete.id);
});

console.log("hello", process.env.TEST);

expressApp.listen(port, () => console.log(`app listening on port ${port}!`));

//EXPORT two endpoints:  one express app, one dialogflow app
exports.fulfillmentExpressServer = functions.https.onRequest(expressApp);
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(dialogFlowApp);