const util = require('util');
const axios = require("axios");

const {
  dialogflow,
  Permission,
  Place,
  Table,
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
const MPLookupURLBase = 'https://api.parliament.uk/query/resource.json?uri=';

const getMPData = async (MPLookupURLBase, MPURL) => {
  const response = await axios(MPLookupURLBase+MPURL);
  // console.log('HERE IS THE MP LOOKUP RESPONSE ' + util.inspect(response, {showHidden: false, depth: null}))
  return response.data;
}

app.intent('Default Welcome Intent', (conv) => {
  conv.ask('Hi, welcome to MP checker. I can tell you about your MP and how they voted.');
  conv.ask('Would you like to continue?');
  conv.ask(new Suggestions('Yes', 'No'));
});

app.intent('Default Welcome Intent - yes', (conv, params) => {
  // conv.ask('Great.');
  conv.ask('Great. In order to find your MP I will need to know your location. OK?');
  conv.ask('If you are currently at the location you want to find the MP for, and your happy to share your address, say yes.  If you dont want me to get your location from Google, or you want to find the MP for a different address please say no.');

  conv.ask(new Permission({
        context: 'Can I get your postcode?',
        permissions: [
          // 'NAME',
          'DEVICE_COARSE_LOCATION'
        ]
      }));
      // console.log('This is params -------- '+ util.inspect(params, {showHidden: false, depth: null}))
});

app.intent('Default Welcome Intent - no', (conv, params) => {
  conv.ask('sad face, you said no!');
});


app.intent('actions_intent_PERMISSION', async (conv, params, permissionGranted) => {
  if (!permissionGranted) {
    if(conv.screen) {
      conv.ask('This is a simple table example.')
      conv.ask(new Table({
        dividers: true,
        columns: ['header 1', 'header 2', 'header 3'],
        rows: [
          ['row 1 item 1', 'row 1 item 2', 'row 1 item 3'],
          ['row 2 item 1', 'row 2 item 2', 'row 2 item 3'],
        ],
      }));
    }
    else {
      conv.ask('No screen, no table, thems the breaks.')
    };

  //   const options = {
  //     context: 'To find a place to pick you up',
  //     prompt: 'Where would you like to be picked up?',
  //   };
  //   conv.ask(new Place(options));
  // console.log('HERE IS THE PLACE ' + util.inspect(Place, {showHidden: false, depth: null}));

  //   const {name} = place;
  // if (place.name) conv.ask(`Alright! I'll send the car to ${name}`);
    // app.intent('actions_intent_PERMISSION - no', (conv, params) => {
    //   conv.ask('sad face, you said no to my permission request!');
    // });
    // conv.ask(`Ok, no worries. I'll have to figure out how to get your postcode. follow-up intent I suppose`);
  } else {
    console.log(`******Here is ${permissionGranted} `);
    conv.data.postcode = conv.device.location.zipCode;
    conv.ask(`Ok great - please give me a minute, I have to get data from a few different places.`);

    const MPdata = await getMPFromPostcode(
      'https://api.parliament.uk/query/constituency_lookup_by_postcode.json?postcode=',
      conv.data.postcode
      );

    const MPURL = MPdata['@context']['@base']+MPdata['@graph'][0]['@id'];

    const MoreMPdata = await getMPData(
      'https://api.parliament.uk/query/resource.json?uri=',
      MPURL
      );

    const mnisId = MoreMPdata['@graph'][0].mnisId;

    const MPName = MPdata['@graph'][0]['http://example.com/F31CBD81AD8343898B49DC65743F0BDF'];
    const MPConstituency = MPdata['@graph'][0].partyMemberHasPartyMembership.partyMembershipHasParty.partyName;

    conv.ask(`Using the postcode I was given of ${conv.data.postcode}
     I have found out that your MP name is  ${MPName}.
     They represent the ${MPConstituency} party.
     Their mnisId is  ${mnisId}`);
  }
});



// Handle the Dialogflow intent named 'actions_intent_PERMISSION'. If user
// agreed to PERMISSION prompt, then boolean value 'permissionGranted' is true.
// app.intent('actions_intent_PERMISSION', async (conv, params, permissionGranted) => {
//   if (!permissionGranted) {
//     conv.ask(`Ok, no worries. What's your favorite color?`);
//     conv.ask(new Suggestions('Blue', 'Red', 'Green'));
//   } else {
//     // console.log('conv dot data is ---'+ conv.data);
//     conv.data.userName = conv.user.name.display;
//     conv.data.postcode = conv.device.location.zipCode;
//     const MPdata = await getMPFromPostcode(
//       'https://api.parliament.uk/query/constituency_lookup_by_postcode.json?postcode=',
//       conv.data.postcode
//       );
//       var MPURL = MPdata['@context']['@base']+MPdata['@graph'][0]['@id'];

//       const MoreMPdata = await getMPData(
//         'https://api.parliament.uk/query/resource.json?uri=',
//         MPURL
//         );

//       const mnisId = MoreMPdata['@graph'][0].mnisId;

//       // console.log('HERE IS THE GRAPH ' + util.inspect(MPdata['@graph'], {showHidden: false, depth: null}))
//     // console.log('HERE IS THE GRAPH ' + MPdata['@graph']);
//     var MPName = MPdata['@graph'][0]['http://example.com/F31CBD81AD8343898B49DC65743F0BDF'];
//     var MPConstituency = MPdata['@graph'][0].partyMemberHasPartyMembership.partyMembershipHasParty.partyName;
//     // var MPURL = MPdata['@context']['@base']+MPdata['@graph'][0]['@id'];
//     console.log('HERE IS URL '+MPURL);
//     //https://api.parliament.uk/query/resource.json?uri=https://id.parliament.uk/N83bzqZq
//     conv.ask(`Thanks, ${conv.data.userName}. Your postcode is `
//     + conv.data.postcode
//     + ' and your MP name is ' + MPName
//     + ' who represents the ' + MPConstituency + ' party.'
//     + 'and their mnisId is ' + mnisId
//     );
//     conv.ask(new Suggestions('Blue', 'Red', 'Green'));
//   }
// });

// Handle the Dialogflow intent named 'Location'.
// The intent collects a parameter named 'color'.
app.intent('Location', (conv, {geocity}) => {
  const luckyNumber = geocity.length;
    // Respond with the user's lucky number and end the conversation.
    conv.close('Your lucky city is not ' + geocity);
});


module.exports = app;