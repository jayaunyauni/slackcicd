"use-strict";
const { WebClient } = require("@slack/web-api");
const { createEventAdapter, SlackEventAdapter } = require("@slack/events-api");

const slackSignSecret = "1342c9a9ee15c483ec2f7460e597bfbe";
const slackToken = "xoxb-3476056560273-3684096216278-1YYp0MiLXhjC4WTSzQmf0eQb";
const slackEvents = createEventAdapter(slackSignSecret);

const slackClient = new WebClient(slackToken);
const port = process.env.SLACK_PORT || 3000;

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate());
// tomorrow.setHours(09, 48, 0);
slackEvents.on("app_mention", (event) => {
    console.log(event);
  console.log(`Got message from user ${event.user}: ${event.text}`);

  try {
    const webClient = new WebClient(slackToken);
    const message = {
      channel: event.channel,
      text: `Hello from jaya <@${event.user}>! :tada:`,
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "plain_text",
            "text": "Kudos Jaya! 🙌 Chitra said, 'Thank you for helping me in shoutout bot implementation and being the most active person in the team 🙂 '",
            "emoji": true
          }
        }
      ]
    };
    const a = webClient.chat.postMessage(message);
  } catch (error) {
    console.log(error);
  }
});
try{
    const webClient = new WebClient(slackToken);
    const message = {
        channel: 'C03LAJMB3AN',
        text:  `Hello from jaya :tada:`,
        post_at: Math.floor(tomorrow.getTime() / 1000) - 19800
    }
    const a = webClient.chat.scheduleMessage(message);
}catch(error){
    console.log(error);
}
slackEvents.on("error", console.error);
slackEvents.start(port).then(() => {
  console.log(`Server started at on port ${port}`);
});
