const {
    dialogflow,
    Permission,
    Suggestions,
    BasicCard
  } = require("actions-on-google");

  const strava = async () => {
    try {
        // fetch data from a url endpoint
        const data = await axios.get("https://www.strava.com/api/v3/activities/2373181785?access_token=ed8c7bfdcac10c2daa7477791cde45b5f51abf5e");
        return data;
      } catch(error) {
        console.log("error", error);
        // appropriately handle the error
      }
}


  // Instantiate the Dialogflow client.
  const app = dialogflow({ debug: true });

  app.intent('Default Welcome Intent', (conv) => {
    conv.ask(new Permission({
      context: 'Hi there, to get to know you better',
      permissions: 'NAME'
    }));
  });

  // Handle the Dialogflow intent named 'actions_intent_PERMISSION'. If user
// agreed to PERMISSION prompt, then boolean value 'permissionGranted' is true.
app.intent('actions_intent_PERMISSION', (conv, params, permissionGranted) => {
    if (!permissionGranted) {
      conv.ask(`Ok, no worries. What's your favorite color?`);
      conv.ask(new Suggestions('Blue', 'Red', 'Green'));
    } else {


      conv.data.userName = conv.user.name.display;
      conv.ask(`Thanks, ${conv.data.userName}. What's your favorite color?`);
      conv.ask(new Suggestions('Blue', 'Red', 'Green'));
    }
  });

  app.intent('favorite color', (conv, {color}) => {
    const luckyNumber = color.length;
    // Respond with the user's lucky number and end the conversation.
    conv.close('Your lucky number is ' + luckyNumber);
});

  // Handlers go here..
//   app.intent("Default Welcome Intent", conv => {
//      // handler for this intent
//   });

//   app.intent("Say_Something_Silly", conv => {
//      // handler for this intent
//   });


  module.exports = app;