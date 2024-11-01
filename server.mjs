import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000; // Porta del server

// Configura l'ID dell'universo (da sostituire con il tuo UniverseID)
const universeID = "6730229852"; // Assicurati che questo sia l'ID corretto del tuo gioco

// Endpoint per ottenere gli upvotes del gioco
app.get('/likes', async (req, res) => {
    try {
        const response = await fetch(`https://games.roblox.com/v1/games/votes?universeIds=${universeID}`);
        const data = await response.json();

        // Log della risposta per verificare la struttura
        console.log("Dati ricevuti:", JSON.stringify(data, null, 2));

        // Ottieni il conteggio degli upvotes
        const likesCount = data.data[0]?.upVotes || "error";

        // Restituisce il conteggio degli upvotes in formato JSON
        res.json({ likes: likesCount });
    } catch (error) {
        console.error('Errore nel recupero dei Mi Piace:', error);
        res.status(500).json({ error: 'Errore nel recupero dei dati' });
    }
});



// Aggiungi una risposta per la rotta root
app.get('/', (req, res) => {
    res.send('Server funzionante! Accedi a /likes per vedere il conteggio degli upvotes.');
});

// Avvia il server
app.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}/likes`);
});
