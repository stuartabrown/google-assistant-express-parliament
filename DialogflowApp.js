const util = require('util');

const {
  dialogflow,
  Permission,
  Suggestions,
} = require('actions-on-google');

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

// Handle the Dialogflow intent named 'Default Welcome Intent'.
app.intent('Default Welcome Intent', (conv) => {
  conv.ask(new Permission({
    context: 'Hi there, to get to know you better',
    permissions: [
      'NAME',
      'DEVICE_COARSE_LOCATION'
    ]
  }));
});

// Handle the Dialogflow intent named 'actions_intent_PERMISSION'. If user
// agreed to PERMISSION prompt, then boolean value 'permissionGranted' is true.
app.intent('actions_intent_PERMISSION', (conv, params, permissionGranted) => {
  if (!permissionGranted) {
    conv.ask(`Ok, no worries. What's your favorite color?`);
    conv.ask(new Suggestions('Blue', 'Red', 'Green'));
  } else {
    console.log('conv dot data is ---'+ conv.data);
    conv.data.userName = conv.user.name.display;
    conv.data.postcode = conv.user.device.location.zipcode;
    conv.ask(`Thanks, ${conv.data.userName}. What's your favorite color? Postcode is ` + conv.data.postcode);
    conv.ask(new Suggestions('Blue', 'Red', 'Green'));
  }
});

// Handle the Dialogflow intent named 'Location'.
// The intent collects a parameter named 'color'.
app.intent('Location', (conv, {geocity}) => {
  const luckyNumber = geocity.length;
    // Respond with the user's lucky number and end the conversation.
    conv.close('Your lucky city is not ' + geocity);
});





  module.exports = app;