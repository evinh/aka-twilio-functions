exports.handler = function(context, event, callback) {

  let eventId = event.EventId;
  let caller = event.From;
  caller = caller.substring(1);

  postUrl = context.BASE_URI + '/event-registrations?populate=event';
  findUrl = context.BASE_URI + '/event-registrations?filters[$and][0][EventId][$eq]=' + eventId + '&filters[$and][1][PhoneNumber][$contains]=' + caller + '&populate=event';
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
        let name = resp.data[0].attributes.event.data.attributes.EventName;
        let location = resp.data[0].attributes.event.data.attributes.Location;
        let map = resp.data[0].attributes.event.data.attributes.MapLink;
        let eventdate = resp.data[0].attributes.event.data.attributes.DateTime;
        var found = {
          "attributes": {
            "Registered": "already",
            "event": {
              "data": {
                "attributes": {
                  "EventName": name,
                  "DateTime": eventdate,
                  "Location": location,
                  "MapLink": map
                }
              }
            }
          }
        };
        console.log('registration found');
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
              "PhoneNumber": event.From,
              "Registered": true,
              "event": event.EventId,
              "EventId": event.EventId,
              "caller": event.Caller
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