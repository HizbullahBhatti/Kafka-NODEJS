const { kafka } = require('./client');
const group = process.argv[2];

const init = async () => {
    
        const consumer = kafka.consumer({ groupId: group });
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

                console.log(`Group ${group} Topic: ${topic} Partition: ${partition} Message is ${message.value.toString()}`);

            },
        });

        //await consumer.disconnect();
        //console.log('Consumer Disconnected');

}

init().then(() => console.log('Done')).catch(console.error);