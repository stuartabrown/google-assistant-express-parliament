'use strict';

var express = require('express');
var router = express.Router();
const googleApp = dialogflow({debug: true});
// const {
//   dialogflow,
//   Permission,
//   Suggestions,
//   BasicCard,
// } = require('actions-on-google');

// Instantiate the Dialogflow client.
// const googleApp = dialogflow({debug: true});

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

// Import the Dialogflow module from the Actions on Google client library.
const {dialogflow} = require('actions-on-google');

// Import the firebase-functions package for deployment.
// const functions = require('firebase-functions');

// Instantiate the Dialogflow client.


// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
googleApp.intent('favorite color', (conv, {color}) => {
    const luckyNumber = color.length;
    // Respond with the user's lucky number and end the conversation.
    conv.close('Your lucky number is ' + luckyNumber);
});

// Set the DialogflowApp object to handle the HTTPS POST request.
// exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
