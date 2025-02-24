const express = require('express');
const app = express();

// Définir le dossier contenant les fichiers statiques (HTML, CSS, JS)
app.use(express.static('public'));
app.use(express.json()); // Permet de lire le JSON envoyé par le client à travers les requêtes POST

// Route pour envoyer le fichier HTML lorsque l'utilisateur accède à la racine du site
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/execute-script', (req, res) => {
    const { data } = req.body; // Récupère l'ID de la carte envoyée depuis le frontend

    // Simuler un traitement backend (exécuter un script, manipuler une base de données, etc.)
    const resultat = `Action exécutée pour la carte ${req.body.carteId}`;

    console.log(resultat);

    res.json({ message: resultat });
});

const images = {
    "1": "images/cards/default/card.png",
    "2": "images/cards/default/2p.png",
    "3": "images/cards/default/9p.png",
};

const cardsTemplate = [2, 2, 1, 2, 3, 2, 3, 2, 2, 1, 3, 2, 3, 1, 3, 2, 1, 1, 3, 1, 1, 1, 1, 2, 1, 2, 3, 3, 3, 3, 1, 2, 2, 3, 1, 3];
const cards = cardsTemplate.sort((a, b) => 0.5 - Math.random());
let cardsFind = [];

app.post('/get-image', (req, res) => {
    const { data } = req.body; // Récupère l'ID de la carte envoyée depuis le frontend
    const carteId = req.body.carteId;
    const imageKeys = Object.keys(images);
    const randomImage = images[imageKeys[cards[carteId-1]]];
    
    res.json({ imagePath: randomImage });
});

app.post('/check-card', (req, res) => {
    const { data } = req.body; // Récupère l'ID de la carte envoyée depuis le frontend
    console.log(req.body)
    const firstCardId = req.body.firstCardId;
    const secondCardId = req.body.secondCardId;

    if(cardsFind.includes(firstCardId) || cardsFind.includes(secondCardId)){
        res.json({ status: 'error', message: 'Card already found' });
        return;
    }

    if(firstCardId === secondCardId){
        res.json({ status: 'ok', message: 'Same card', isSame: false });
        return;
    }
    else if(cards[firstCardId-1] === cards[secondCardId-1]){
        res.json({ status: 'ok', isSame: true });
        cardsFind.push(firstCardId-1);
        cardsFind.push(secondCardId-1);
    } else {
        res.json({ status: 'ok', isSame: false });
    }
    console.log(cardsFind)
});

// Démarrer le serveur
app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});
