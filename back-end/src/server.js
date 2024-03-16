const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const os = require('os');

const app = express();

// CORS aktivieren
app.use(cors());

// Verbindungs-URI zur MongoDB-Datenbank
const uri = 'mongodb+srv://CatLindaSara:TarTarTar@cluster0.nbomujl.mongodb.net/Rezepte?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Verbindung zur Datenbank herstellen und Server starten
async function startServer() {
    try {
        await client.connect();
        console.log('Connected to the database');

        // Server starten, nachdem die Verbindung zur Datenbank hergestellt wurde
        app.listen(8000, () => {
            console.log('Server is listening at http://localhost:8000');
        });
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

startServer();

// API-Endpunkt zum Abrufen aller Rezepte
app.get('/api/recipes', async (req, res) => {
    try {
        const db = client.db('Rezepte');
        const recipes = await db.collection('TEST2').find({}).toArray();
        res.json(recipes);
    } catch (error) {
        console.error('Fehler beim Abrufen der Rezepte:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

// API-Endpunkt zum Abrufen eines spezifischen Rezepts basierend auf seiner ID
app.get('/api/recipes/:recipeId', async (req, res) => {
    try {
        const db = client.db('Rezepte');
        const recipeId = req.params.recipeId;
        const recipe = await db.collection('TEST2').findOne({ recipe_id: parseInt(recipeId) });
        if (!recipe) {
            res.status(404).json({ message: 'Rezept nicht gefunden' });
        } else {
            res.json(recipe);
        }
    } catch (error) {
        console.error('Fehler beim Abrufen des Rezepts:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

