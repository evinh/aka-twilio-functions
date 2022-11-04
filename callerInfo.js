exports.handler = function(context, event, callback) {

    let caller = event.Caller;
    caller = caller.substring(1);
  
    postUrl = context.BASE_URI + '/callers';
    findUrl = context.BASE_URI + '/callers?filters[PhoneNumber][$contains]=' + caller;
    auth = 'Bearer ' + context.EXT_API_TOK1 + context.EXT_API_TOK2;
  
    var got = require('got');
    got(findUrl, {
      responseType: 'json',
      headers: {
      "Authorization": auth
      }
    })
      .then(function(response) {
        const resp = response.body;
        if (typeof resp.data[0] != "undefined") {
          var found = resp.data[0];
          console.log('number found');
          callback(null, found);
        } else {
          got(postUrl, {
            method: "POST",
            responseType: 'json',
            headers: {
            "Content-Type": "application/json",
            "Authorization": auth
            },
            json: {
              "data": {
                "PhoneNumber": event.Caller,
                "smsOptIn": false
              }
            },
          })
          .then(function(response) {
            console.log(response.body.data)
            callback(null, response.body.data);
          })
          .catch(function(error) {
            callback(error)
          });
        }
        
      })
      .catch(function(error) {
        callback(error)
      });
  
  };