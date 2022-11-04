exports.handler = function(context, event, callback) {

    var callerId = event.CallerId;
    var auth = 'Bearer ' + context.EXT_API_TOK1 + context.EXT_API_TOK2;
    var got = require('got');
    got(context.BASE_URI + '/callers/' + callerId, {
      method: "PUT",
      headers: {
      "Content-Type": "application/json",
      "Authorization": auth
      },
      json: {
        "data": {
          "smsOptIn": true
        }
      }
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