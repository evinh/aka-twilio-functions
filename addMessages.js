const { auth } = require('strapi-provider-upload-do/lib');

exports.handler = function(context, event, callback) {

    var auth = 'Bearer ' + context.EXT_API_TOK1 + context.EXT_API_TOK2;

    var got = require('got');
    got(context.BASE_URI + '/messages', {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      "Authorization": auth
      },
      json: {
        "data": {
          "FromNumber": event.From,
          "ToNumber": event.To,
          "Body": event.Body,
          "MessageId": event.MessageSid,
          "Direction": event.Direction,
          "caller": event.Caller,
          "CampaignId": event.CampaignId
        }
      },
    })
      .then(function(response) {
        console.log(response.body)
        callback(null, response.body);
      })
      .catch(function(error) {
        console.log(error)
        callback(error);
      });
  }