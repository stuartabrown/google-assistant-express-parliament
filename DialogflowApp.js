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
    dialogflow,
    Permission,
    Suggestions,
    SignIn,
    BasicCard
  } = require("actions-on-google");

  const axios = require("axios");


  // Instantiate the Dialogflow client.
  const app = dialogflow({
    debug: true,
    clientId: '397558659346-qdr3pufk60c2t2smhmbapu8jb0egt0i4.apps.googleusercontent.com',
  });

  const getStravaData = async () => {
    const response = await axios("https://www.strava.com/api/v3/activities/2373181785?access_token=ed8c7bfdcac10c2daa7477791cde45b5f51abf5e");
    return response.data;
}
<<<<<<< HEAD
  app.intent('Default Welcome Intent', (conv) => {
  // app.intent('Default Welcome Intent', async (conv) => {
    // const data = await getStravaData();
    // console.log(data.athlete.id);
    conv.ask(new Permission({
      // context: 'Hi there, to get to know you better, you athelete id is '+ data.athlete.id,
      context: 'Hi there, to get to know you better, you athelete id is ',
      permissions: 'NAME'
    }));
=======

  app.intent('Default Welcome Intent', async (conv) => {
    const data = await getStravaData();
    console.log(data.athlete.id);
    conv.ask(new SignIn('To get your account details'));
    // conv.ask(new Permission({
    //   context: 'Hi there, to get to know you better, you athelete id is '+ data.athlete.id,
    //   permissions: 'NAME'
    // }));
>>>>>>> feature/google-sign-in
  });


  app.intent('actions_intent_SIGN_IN', (conv, params, signin) => {
    if (signin.status === 'OK') {
      const payload = conv.user.profile.payload;
      console.log('THIS IS PAYLOAD ' + util.inspect(payload, {showHidden: false, depth: null}))

      // console.log('THIS IS PAYLOAD ' + payload);
      conv.ask(`I got your account details, ${payload.name}. What do you want to do next?`);
    } else {
      conv.ask(`I won't be able to save your data, but what do you want to do next?`);
    }
  });
  // Handle the Dialogflow intent named 'actions_intent_PERMISSION'. If user
// agreed to PERMISSION prompt, then boolean value 'permissionGranted' is true.
app.intent('actions_intent_PERMISSION', (conv, params, permissionGranted) => {
    if (!permissionGranted) {
      conv.ask(`Ok, no worries. What's your favorite color?`);
      conv.ask(new Suggestions('Blue', 'Red', 'Green'));
    } else {

      console.log(conv.user);
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