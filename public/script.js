document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    let i = 0;

    cards.forEach(card => {
        i++;
        card.setAttribute('data-id', i);

        card.addEventListener('click', async () => {
            const carteId = card.getAttribute('data-id');

            try {
                const response = await fetch('/execute-script', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ carteId }),
                });

                const data = await response.json();
                console.log(data.message); // Affiche la réponse du backend

                // Afficher un message sur la carte cliquée
                //card.textContent = `✔️ ${carteId}`;
            } catch (error) {
                console.error('Erreur lors de la requête :', error);
            }
        });
    });
});
