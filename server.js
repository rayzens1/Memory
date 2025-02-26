const express = require('express');
const app = express();

// Définir le dossier contenant les fichiers statiques (HTML, CSS, JS)
app.use(express.static('public'));
app.use(express.json()); // Permet de lire le JSON envoyé par le client à travers les requêtes POST

// Route pour envoyer le fichier HTML lorsque l'utilisateur accède à la racine du site
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/reset', (req, res) => {
    const { data } = req.body; // Récupère l'ID de la carte envoyée depuis le frontend
    resetGame();
    console.log('Game reset');
    
    res.json({ status: "ok" });
});

app.post('/execute-script', (req, res) => {
    const { data } = req.body; // Récupère l'ID de la carte envoyée depuis le frontend

    // Simuler un traitement backend (exécuter un script, manipuler une base de données, etc.)
    const resultat = `Action exécutée pour la carte ${req.body.carteId}`;

    console.log(resultat);

    res.json({ message: resultat });
});

const images = {
    "1": "images/cards/default/1.png",
    "2": "images/cards/default/2.png",
    "3": "images/cards/default/3.png",
    "4": "images/cards/default/4.png",
    "5": "images/cards/default/5.png",
    "6": "images/cards/default/6.png",
    "7": "images/cards/default/7.png",
    "8": "images/cards/default/8.png",
    "9": "images/cards/default/9.png",
    "10": "images/cards/default/10.png",
};

let cardsTemplate = [3, 7, 10, 2, 5, 1, 3, 2, 1, 1, 6, 6, 9, 9, 8, 2, 8, 10, 5, 1, 8, 4, 4, 4, 7, 5, 8, 4, 3, 7, 9, 3, 7, 5, 9, 2];
let cards = shuffle(cardsTemplate);
let cardsFind = [];

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function resetGame(){
    cards = shuffle(cardsTemplate);
    cardsFind = [];
}

resetGame(); // Initialiser le jeu

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
