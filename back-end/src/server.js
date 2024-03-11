const express = require('express');
const app = express();
const os = require('os');

// Ermittle die IP-Adresse des lokalen Netzwerkinterfaces
const networkInterfaces = os.networkInterfaces();
const ipAddress = networkInterfaces['Ethernet'][0].address; // Anpassen, falls du ein anderes Interface verwenden möchtest

app.get('/hello', (req, res) => {
    res.send('Hello!');
});

app.listen(8000, 'localhost', () => {
    console.log('Server is listening at http://localhost:8000');
});