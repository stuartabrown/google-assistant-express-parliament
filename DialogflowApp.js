const {
    dialogflow,
    Permission,
    Suggestions,
    BasicCard
  } = require("actions-on-google");


  // Instantiate the Dialogflow client.
  const app = dialogflow({ debug: true });

  googleApp.intent('Default Welcome Intent', (conv) => {
    conv.ask(new Permission({
      context: 'Hi there, to get to know you better',
      permissions: 'NAME'
    }));
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