// Description: This file is used to create the topics in the kafka broker.
const { kafka } = require('./client');

const init = async () => {
    const admin = kafka.admin();
    console.log('Admin Connecting...');
    await admin.connect();
    console.log('Admin Connected'); 

    console.log('Creating Topics... [rider-updates]');
    await admin.createTopics({
        topics:
        [
            {
                topic : 'rider-updates',
                numPartitions: 2,
            }
        ]
    });
    console.log('Topics Created');

    await admin.disconnect();
    console.log('Admin Disconnected');
};

init().then(() => console.log('Done!')).catch(console.error);