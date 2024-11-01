import fetch from 'node-fetch';

const universeID = "6730229852"; // Assicurati che questo sia l'ID corretto del tuo gioco

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const response = await fetch(`https://games.roblox.com/v1/games/votes?universeIds=${universeID}`);
            const data = await response.json();

            // Log della risposta per verificare la struttura
            console.log("Dati ricevuti:", JSON.stringify(data, null, 2));

            // Ottieni il conteggio degli upvotes
            const likesCount = data.data[0]?.upVotes || "error";

            // Restituisce il conteggio degli upvotes in formato JSON
            res.status(200).json({ likes: likesCount });
        } catch (error) {
            console.error('Errore nel recupero dei Mi Piace:', error);
            res.status(500).json({ error: 'Errore nel recupero dei dati' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Metodologia ${req.method} non consentita`);
    }
}
