const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const os = require('os');

const clinet = new MongoClient(`mongodb+srv://CatLindaSara:<password>@cluster0.nbomujl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)

// Ermittelt die IP-Adresse des lokalen Netzwerkinterfaces
const networkInterfaces = os.networkInterfaces();
const ipAddress = networkInterfaces['Ethernet'][0].address; 

app.get('/hello', async (req, res) => {
    await client.connect();
    const db = client.db('Rezepte-Datenbank')
    const Rezepte = await db.collection('Rezepte').find({}).toArray();
    res.send(Rezepte);
});

app.listen(8000, 'localhost', () => {
    console.log('Server is listening at http://localhost:8000');
});