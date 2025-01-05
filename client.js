const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'admin',
    brokers: ['192.168.100.10:9092']
});

module.exports = { kafka };