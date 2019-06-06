const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({

    token: 'xoxb-634252242342-645032042771-cYCZvT6pPniNhksMCyaInK14',
    name: 'joker'
});

// Start Handler
bot.on('start', () => {
    bot.postMessageToChannel('general', 'Get Ready To Laugh With @Joker!');

});

// Error Handler
bot.on('error', err => console.log(err));

// Message Handler
bot.on('message', data => {
    if(data.type !== 'message'){
        return;
    }
    handleMessage(data.text);
});

// Respond to Data
function handleMessage(message){
    if(message.includes(' chucknorris')){
        chuckJoke();
    } else if(message.includes(' dad')){
        dadJoke();
    } else if(message.includes(' random')){
        randomJoke();
    } else if(message.includes(' help')){
        runHelp();
    }
}

// Tell a Chuck Norris joke
function chuckJoke(){
    axios.get('http://api.icndb.com/jokes/random')
    .then(res => {
        const joke = res.data.value.joke;

        bot.postMessageToChannel(
            'general', 
            `Chuck Norris: ${joke}`
            );
    });
}

// Tell a dad joke
function dadJoke(){
    axios.get('https://icanhazdadjoke.com/slack')
    .then(res => {
        const joke = res.data.attachments[0].text;

        bot.postMessageToChannel(
            'general', 
            `Dad: ${joke}`
            );
    });
}

// Tell a random joke
function randomJoke(){
    const rand = Math.floor(Math.random() * 2) + 1;
    if(rand == 1){
        chuckJoke();
    } else if(rand == 2){
        dadJoke();
    }
}

// Show help text
function runHelp(){
    const params = {
        icon_emoji: ':question:'
    };
    
    bot.postMessageToChannel('general', `Type @Joker with either 'chucknorris', 'dad' or 'random' to get a joke`, params);
}