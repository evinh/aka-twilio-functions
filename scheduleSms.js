exports.handler = function(context, event, callback) {
    const client = context.getTwilioClient();
    var timer = event.Timer;
    const sendWhen = new Date(new Date().getTime() + timer * 60000).toISOString();
  
      client.messages.create({
        messagingServiceSid: 'MG834e18fa1929b8f1cab7d8c990c0822d',
        to: event.To,
        body: event.Body,
        scheduleType: 'fixed',
        sendAt: sendWhen,
      }).then(msg => {
        callback(null, msg);
      }).catch(err => callback(err));
  };