/**
 * Date : 2026-10-09
 * Auteur : Anthony Pasto
 * Description : Configure Express, Socket.IO et le traitement des commandes MQTT.
 */
const express = require('express');
const http = require('http');
const app = express();
const PORT = 3000;
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);
app.set('io', io);


const index = require('./routes/index');


var mqtt = require('mqtt'); 
var client  = mqtt.connect('mqtt://127.0.0.1:1883');

function prixValide(prix) {
    return /^\d+(?:\.\d{1,2})?$/.test(prix) && Number.isFinite(Number(prix));
}

client.on('connect', function () { 
console.log("MQTT connecté !"); 
}); 
client.subscribe('ITEM/MODULE/#'); 

client.on('message', function (topic, message) {
   const [element, module, action, cible] = topic.toString().split('/');
    const contenu = message.toString().trim();

    

    //const numero = Number(moduleText);

    const [texte, prix] = contenu.split(';');
const commandesMajuscules = ['DELETE', 'NEW', 'MODULE', 'ITEM'];

const commande = commandesMajuscules.includes(texte.toUpperCase())
    ? texte.toUpperCase()
    : texte;

if (element === 'ITEM' && module === 'MODULE' && action === 'MODIFY' && cible === 'ID') {
        const [id, newNom, newPrix] = contenu.split(';');

    if (!prixValide(newPrix)) {
        console.warn(`Modification MQTT refusée : prix invalide (${newPrix})`);
        return;
    }

        fetch('http://localhost:3000/items/modify/id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `id=${encodeURIComponent(id)}&newNom=${encodeURIComponent(newNom)}&newPrix=${encodeURIComponent(newPrix)}`
        })
    }

    if (element === 'ITEM' && module==='MODULE' && action === 'NEW') {

        if (!prixValide(prix)) {
            console.warn(`Ajout MQTT refusé : prix invalide (${prix})`);
            return;
        }

        console.log(`Nouvel item ajouté : texte = ${texte}, prix = ${prix}`);
        fetch('http://localhost:3000/items/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `nom=${texte}&prix=${prix}`
        })
    }

  if (element === 'ITEM' && module==='MODULE' && action === 'DELETE'&& cible === 'ID') {

        const id = contenu.split(';').pop().trim();
        console.log(`Suppression MQTT par ID : ${id}`);
          fetch('http://localhost:3000/items/delete/id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `id=${encodeURIComponent(id)}`
        })
    }

      if (element === 'ITEM' && module==='MODULE' && action === 'DELETE'&& cible === 'NAME') {
        const nom = contenu.split(';').pop().trim();
        console.log(`Suppression MQTT par nom : ${nom}`);
        fetch('http://localhost:3000/items/delete/name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `nom=${encodeURIComponent(nom)}`
        })
    }
 

    console.log(element, module, action, cible);

    
});




app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/items/delete/id', require('./routes/delet'));
app.use('/items/delete/name', require('./routes/sup_nom'));
app.use('/items/modify/id', require('./routes/renommer'));
app.use(index.router);
app.use('/items/add', require('./routes/items'));
app.use('/contacts', require('./routes/contacts'));
app.use((req, res) => res.status(404).render('pages/404', { title: 'Page introuvable' }));
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).render('error');
});


if (require.main === module) server.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));
module.exports = { app };
