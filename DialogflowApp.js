const {
    dialogflow,
    Permission,
    Suggestions,
    BasicCard
  } = require("actions-on-google");


  // Instantiate the Dialogflow client.
  const app = dialogflow({ debug: true });


  // Handlers go here..
  app.intent("Default Welcome Intent", conv => {
     // handler for this intent
  });

  app.intent("Say_Something_Silly", conv => {
     // handler for this intent
  });


  module.exports = app;