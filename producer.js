const { kafka } = require('./client');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const init = async () => {

    const producer = kafka.producer();
    console.log('Producer Connecting...');

    await producer.connect();
    console.log('Producer Connected');

    rl.setPrompt('Enter Message: ');
    rl.prompt();

    rl.on('line', async (message) => {

        const [riderName,location ] = message.split(' ');

        await producer.send({
            topic: 'rider-updates',
            messages: 
            [
                { 
                    partition: location.toLowerCase() === 'karachi' ? 0 : 1, 
                    key: 'rider1', value: JSON.stringify({ name: riderName, location: location }) 
                },
            ],
        }).then(() => console.log('Message Sent')).catch(console.error);
    })

    //console.log('Sending Messages...');

    // await producer.send({
    //     topic: 'rider-updates',
    //     messages: 
    //     [
    //         { 
    //             partition: 0,
    //             key: 'rider1', value: JSON.stringify({ name: 'Hizbullah', location: 'Karachi  ' }) 
    //         },
    //     ],
    // })

    //console.log('Messages Sent');

    // await producer.disconnect();
    // console.log('Producer Disconnected');
}

init().then(() => console.log('Done')).catch(console.error);