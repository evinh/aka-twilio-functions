exports.handler = function(context, event, callback) {

    let caller = event.From;
    caller = caller.substring(1);
    var auth = 'Bearer ' + context.EXT_API_TOK1 + context.EXT_API_TOK2;
    var got = require('got');
    
    got(context.BASE_URI + '/call-records?filters[$and][0][CampaignId][$eq]=' + event.CampaignId + '&filters[$and][1][FromNumber][$contains]=' + caller + '&fields[0]=FromNumber&pagination=pagination[WithCount]', {
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