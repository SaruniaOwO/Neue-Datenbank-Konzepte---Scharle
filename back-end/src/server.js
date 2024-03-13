const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const os = require('os');

const app = express();

// CORS aktivieren
app.use(cors());

// Verbindungs-URI zur MongoDB-Datenbank
const uri = 'mongodb+srv://CatLindaSara:TarTarTar@cluster0.nbomujl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

// Ermittelt die IP-Adresse des lokalen Netzwerkinterfaces
const networkInterfaces = os.networkInterfaces();
const ipAddress = networkInterfaces['Ethernet'][0].address;

app.get('/hello', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('Rezepte-Datenbank');
        const Rezepte = await db.collection('Rezepte').find({}).toArray();
        res.send(Rezepte);
    } catch (error) {
        console.error('Fehler beim Abrufen der Rezepte:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

app.listen(8000, 'localhost', () => {
    console.log(`Server is listening at http://localhost:8000`);
});
