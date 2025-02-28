// import client
const { kafka } = require('./client');
const readline = require('readline'); 

const rl = readline.createInterface({ //read user input from terminal and display output
    input: process.stdin,
    output: process.stdout,
});

async function init() {
    const producer = kafka.producer();

    console.log('Connecting producer...');
    await producer.connect();
    console.log('Producer connected successfully');

    rl.setPrompt('> ') //changes prompt to >
    rl.prompt(); //waits for the user to type something 

    rl.on('line', async function(line) { //callback function runs on user's input
        const[riderName, location] = line.split(/\s+/) //splits the user input into two parts
         await producer.send({
           topic: "rider-updates",
           messages: [
             {
               partition: location.toLowerCase() === 'north' ? 0 : 1,
               key: "location-update",
               value: JSON.stringify({ name: riderName, location: location }),
             },
           ],
         });
    }).on('close', async() => {
        await producer.disconnect();
    })
}

init();