/** @file app.js @author Anthony @brief Squelette Express et EJS */
const express = require('express');
const app = express();
const PORT = 3000;

const index = require('./routes/index');


var mqtt = require('mqtt'); 
var client  = mqtt.connect('mqtt://127.0.0.1:1883');

client.on('connect', function () { 
console.log("MQTT connecté !"); 
}); 
client.subscribe('MODULE/#'); 
client.publish('MODULE', 'le serveur js vous dit bonjour'); 
client.on('message', function (topic, message) {
    const [prefix, moduleText] = topic.toString().split('/');
    const numero = Number(moduleText);
    const commande = message.toString().trim().toUpperCase();

    if (prefix !== 'MODULE' || !Number.isInteger(numero) || numero < 1 || numero > status.length) {
        return;
    }

    if (commande === 'ON') {
        status[numero - 1] = true;
    } else if (commande === 'OFF') {
        status[numero - 1] = false;
    } else {
        return;
    }

    console.log(`Module ${numero} : ${commande}`);
});




app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/items/delete/id', require('./routes/delet'));
app.use('/items/delete/name', require('./routes/sup_nom'));
app.use(index.router);
app.use('/items/add', require('./routes/items'));
app.use('/contacts', require('./routes/contacts'));
app.use((req, res) => res.status(404).render('pages/404', { title: 'Page introuvable' }));
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).render('error');
});


if (require.main === module) app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));
module.exports = { app };
