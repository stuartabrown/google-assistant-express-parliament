"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const functions = require("firebase-functions");

// clients
const dialogFlowApp = require("./DialogflowApp");
const expressApp = express().use(bodyParser.json());
// const app = express();
const port = 3000;

// EXPRESS APP fulfillment route (POST). The entire dialogFlowApp object (incl its handlers) is the callback handler for this route.
expressApp.post("/", dialogFlowApp);


//  EXPRESS APP test route (GET)
expressApp.get("/", (req, res) => {
  res.send("CONFIRMED RECEIPT OF GET.");
});

console.log("hello", process.env.TEST);

// app.get("/", (req, res) => res.send("Hello World!"));
// app.get("/query", (req, res) => {
//   console.log(req.query);
//   res.json(req.query);
// });
// app.get("/path/:id", (req, res) => {
//   console.log(req.params.id);
//   res.send(`the path param you entered was: ${req.params.id}`);
// });

expressApp.listen(port, () => console.log(`app listening on port ${port}!`));

//EXPORT two endpoints:  one express app, one dialogflow app
exports.fulfillmentExpressServer = functions.https.onRequest(expressApp);
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(dialogFlowApp);