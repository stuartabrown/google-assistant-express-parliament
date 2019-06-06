const util = require('util');

const {
    dialogflow
  } = require("actions-on-google");

// Instantiate the Dialogflow client.
  const app = dialogflow({
    debug: true
  });


  // app.intent('Default Welcome Intent', (conv) => {
  // // app.intent('Default Welcome Intent', async (conv) => {
  //   conv.ask(new Permission({
  //     // context: 'Hi there, to get to know you better, you athelete id is '+ data.athlete.id,
  //     context: 'Hi there, to get to know you better, you athelete id is ',
  //     permissions: 'DEVICE_COARSE_LOCATION'
  //   }));
  // });

// Handle the Dialogflow intent named 'Location'.
// The intent collects a parameter named 'color'.
app.intent('Location', (conv, {geocity}) => {
  const luckyNumber = geocity.length;
    // Respond with the user's lucky number and end the conversation.
    conv.close('Your lucky city is not ' + geocity);
});





  module.exports = app;