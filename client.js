const { Kafka } = require("kafkajs"); //(shorthand) Kafka class exported from kafkajs module
// const Kafka = require('kafkajs').Kafka;

exports.kafka = new Kafka({ //new instance of class Kafka (object)
  clientId: "my-app",
  brokers: ["192.168.0.123:9092"], //connect to kafka broker
});
