'use-strict'
const { WebClient } = require('@slack/web-api');
const { createEventAdapter, SlackEventAdapter } = require('@slack/events-api');

const slackSignSecret = "1342c9a9ee15c483ec2f7460e597bfbe";
const slackToken = "xoxb-3476056560273-3684096216278-QL3763Gbg8LY8tAAx4YK0QB0";
const slackEvents = createEventAdapter(slackSignSecret);

const slackClient = new WebClient(slackToken);
const port = process.env.SLACK_PORT || 3000;

slackEvents.on('app_mention', (event) => {
    console.log(`Got message from user ${event.user}: ${event.text}`);
    try{
        const webClient = new WebClient(slackToken);
        const message = {
            channel: event.channel,
            text:  `Hello from <@${event.user}> <@${event.user}>! :tada:`
        }
        const a = webClient.chat.postMessage(message);
    }catch(err){
        console.log(error);
    }
    // (async(event) => {
    //     try {
    //         await slackClient.chat.postMessage({
    //             channel: event.channel,
    //             text: `HEllO <@${event.user}>! :tada:`
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // })
});
slackEvents.on('error', console.error);
slackEvents.start(port).then(() => {
    console.log(`Server started at on port ${port}`)
});