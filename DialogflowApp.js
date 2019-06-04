// const app = dialogflow({
//   // REPLACE THE PLACEHOLDER WITH THE CLIENT_ID OF YOUR ACTIONS PROJECT
//   clientId: '397558659346-qdr3pufk60c2t2smhmbapu8jb0egt0i4.apps.googleusercontent.com',
// });

// Intent that starts the account linking flow.
// app.intent('Start Signin', (conv) => {
//   conv.ask(new SignIn('To get your account details'));
// });
// Create a Dialogflow intent with the `actions_intent_SIGN_IN` event.
// app.intent('Get Signin', (conv, params, signin) => {
//   if (signin.status === 'OK') {
//     const payload = conv.user.profile.payload;
//     conv.ask(`I got your account details, ${payload.name}. What do you want to do next?`);
//   } else {
//     conv.ask(`I won't be able to save your data, but what do you want to do next?`);
//   }
// });


const util = require('util');

const {
    dialogflow
  } = require("actions-on-google");




  // Instantiate the Dialogflow client.
  const app = dialogflow({
    debug: true
  });


  app.intent('Default Welcome Intent', (conv) => {
  // app.intent('Default Welcome Intent', async (conv) => {
    // const data = await getStravaData();
    // console.log(data.athlete.id);
    conv.ask(new Permission({
      // context: 'Hi there, to get to know you better, you athelete id is '+ data.athlete.id,
      context: 'Hi there, to get to know you better, you athelete id is ',
      permissions: 'DEVICE_COARSE_LOCATION'
    }));
  });

// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
app.intent('Location', (conv, {geo-city}) => {
  const luckyNumber = geo-city.length;
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