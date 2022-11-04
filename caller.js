exports.handler = function(context, event, callback) {
  
    url = context.BASE_URI + '/call-records?filters[FromNumber][$contains]=15127050508&fields[0]=FromNumber&pagination=pagination[WithCount]';
    auth = 'Bearer ' + context.EXT_API_TOK1 + context.EXT_API_TOK2;
  
    var got = require('got');
    got(url, {
      responseType: 'json',
      headers: {
      "Authorization": auth
      }
    })
      .then(function(response) {
         console.log(response.body)
        callback(null, response.body);
      })
      .catch(function(error) {
        callback(error)
      });
  }