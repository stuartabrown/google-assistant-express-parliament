const util = require('util');
const axios = require("axios");

const {
  dialogflow,
  Permission,
  Suggestions,
} = require('actions-on-google');

// Instantiate the Dialogflow client.
  const app = dialogflow({
    debug: true
  });

const getMPFromPostcode = async (endpoint, postcode) => {
    const response = await axios(endpoint+postcode);
    return response.data;
}

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
app.intent('actions_intent_PERMISSION', async (conv, params, permissionGranted) => {
  if (!permissionGranted) {
    conv.ask(`Ok, no worries. What's your favorite color?`);
    conv.ask(new Suggestions('Blue', 'Red', 'Green'));
  } else {
    // console.log('conv dot data is ---'+ conv.data);
    conv.data.userName = conv.user.name.display;
    conv.data.postcode = conv.device.location.zipCode;
    const MPdata = await getMPFromPostcode(
      'https://api.parliament.uk/query/constituency_lookup_by_postcode.json?postcode=',
      conv.data.postcode
      );

      console.log('HERE IS THE GRAPH ' + util.inspect(MPdata['@graph'], {showHidden: false, depth: null}))
    // console.log('HERE IS THE GRAPH ' + MPdata['@graph']);
    var MPName = MPdata['@graph'][0]['http://example.com/F31CBD81AD8343898B49DC65743F0BDF'];
    var MPConstituency = MPdata['@graph'][0].partyMemberHasPartyMembership.partyMembershipHasParty.partyName;
    var MPURL = MPdata['@context']['@base']+MPdata['@graph']['@id'];
    console.log('HERE IS URL '+MPURL);
    conv.ask(`Thanks, ${conv.data.userName}. Your postcode is `
    + conv.data.postcode
    + ' and your MP name is ' + MPName
    + ' who represents the ' + MPConstituency + ' party.'
    );
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