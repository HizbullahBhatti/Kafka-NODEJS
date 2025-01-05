const { kafka } = require('./client');

const init = async () => {

    const producer = kafka.producer();
    console.log('Producer Connecting...');

    await producer.connect();
    console.log('Producer Connected');

    console.log('Sending Messages...');

    await producer.send({
        topic: 'rider-updates',
        messages: 
        [
            { 
                partition: 0,
                key: 'rider1', value: JSON.stringify({ name: 'Hizbullah', location: 'Karachi  ' }) 
            },
        ],
    })

    console.log('Messages Sent');

    await producer.disconnect();
    console.log('Producer Disconnected');
}

init().then(() => console.log('Done')).catch(console.error);