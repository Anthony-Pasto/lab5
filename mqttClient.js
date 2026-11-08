const mqtt = require('mqtt');
module.exports = mqtt.connect('mqtt://127.0.0.1:1883'); // C1 : connexion MQTT partagée entre les fichiers
