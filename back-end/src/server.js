const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const os = require('os');
const { ObjectId } = require('mongodb');
const bodyParser = require('body-parser');


const app = express();
app.use(express.json());
app.use(bodyParser.json());

// CORS aktivieren
app.use(cors());

// Verbindungs-URI zur MongoDB-Datenbank
const uri = 'mongodb://localhost:27017';
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
        const recipes = await db.collection('Rezepte').find({}).toArray();
        res.json(recipes);
    } catch (error) {
        console.error('Fehler beim Abrufen der Rezepte:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});


// Sucht Rezepte anhand Name
app.get('/api/recipes/search', async (req, res) => {
    try {
        const query = req.query.query; // Der Suchbegriff aus der Anfrage
        console.log('Suchbegriff:', query); // Hier überprüfst du den Wert von query
        const db = client.db('Rezepte');
        const collection = db.collection('Rezepte');
        const SearchResult = await collection.find({ "recipe_name": { $regex: query, $options: "i" } }).toArray();
        res.json(SearchResult); // Sende die Suchergebnisse zurück
    } catch (error) {
        console.error('Fehler bei der Suche:', error);
        res.status(500).json({ message: 'Interner Serverfehler bei der Suche' });
    }
});


// API-Endpunkt zum Abrufen eines spezifischen Rezepts basierend auf seiner ID
app.get('/api/recipes/:recipeId', async (req, res) => {
    try {
        const db = client.db('Rezepte');
        const recipeId = req.params.recipeId;
        const recipe = await db.collection('Rezepte').findOne({ recipe_id: parseInt(recipeId) });
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

app.post('/api/recipes', async (req, res) => {
    try {
        const db = client.db('Rezepte');
        const collection = db.collection('Rezepte');
        
        // Daten für das neue Rezept aus dem Anfragekörper erhalten
        const { recipe_id, recipe_name, ingredients } = req.body; // korrekt, wenn das Frontend ein einzelnes Objekt sendet

        // Das neue Rezeptobjekt erstellen
        const newRecipe = {
            recipe_id: recipe_id,
            recipe_name: recipe_name,
            ingredients: ingredients
        };

        // Das neue Rezept in die Datenbank einfügen
        await collection.insertOne(newRecipe);

        console.log('Rezept erfolgreich erstellt:', newRecipe);
        
        // Erfolgsantwort senden
        res.status(201).json({ message: 'Rezept erfolgreich erstellt', recipe: newRecipe });
    } catch (error) {
        console.error('Fehler beim Erstellen des Rezepts:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

app.delete('/api/recipes/:recipeId', async (req, res) => {
    try {
        const db = client.db('Rezepte');
        const recipeId = req.params.recipeId; // Die ID des zu löschenden Rezepts

        // Überprüfe, ob das Rezept existiert, das du löschen möchtest
        const recipeExists = await db.collection('Rezepte').findOne({ recipe_id: parseInt(recipeId) });
        if (!recipeExists) {
            return res.status(404).json({ message: 'Rezept nicht gefunden' });
        }

        // Lösche das Rezept basierend auf der ID
        await db.collection('Rezepte').deleteOne({ recipe_id: parseInt(recipeId) });
        
        // Antwort senden, dass das Rezept erfolgreich gelöscht wurde
        res.json({ message: 'Rezept erfolgreich gelöscht' });
    } catch (error) {
        console.error('Fehler beim Löschen des Rezepts:', error);
        res.status(500).json({ message: 'Interner Serverfehler beim Löschen' });
    }
});






