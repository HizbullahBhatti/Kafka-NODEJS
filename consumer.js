const { kafka } = require('./client');

const init = async () => {
    
        const consumer = kafka.consumer({ groupId: 'user-1' });
        console.log('Consumer Connecting...');
    
        await consumer.connect();
        console.log('Consumer Connected');
    
        await consumer.subscribe({ topic: 'rider-updates', fromBeginning: true });
    
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log({
                    partition,
                    offset: message.offset,
                    value: message.value.toString(), 
                });

                console.log(`Topic: ${topic} Partition: ${partition} Message is ${message.value.toString()}`);

            },
        });

        //await consumer.disconnect();
        //console.log('Consumer Disconnected');

}

init().then(() => console.log('Done')).catch(console.error);