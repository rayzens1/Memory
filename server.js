const express = require('express');
const app = express();

// Définir le dossier contenant les fichiers statiques (HTML, CSS, JS)
app.use(express.static('public'));

// Route pour envoyer le fichier HTML lorsque l'utilisateur accède à la racine du site
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Démarrer le serveur
app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});
