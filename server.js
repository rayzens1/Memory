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

const cards = [1, 3, 3, 1, 2, 1, 2, 3, 1, 3, 1, 2, 3, 3, 2, 2, 3, 2, 1, 2, 3, 1, 3, 3, 3];

app.post('/get-image', (req, res) => {
    const { data } = req.body; // Récupère l'ID de la carte envoyée depuis le frontend
    const carteId = req.body.carteId;
    const imageKeys = Object.keys(images);
    const randomImage = images[imageKeys[cards[carteId+1]]];
    
    res.json({ imagePath: randomImage });
});

// Démarrer le serveur
app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});
