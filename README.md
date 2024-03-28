# Neue-Datenbank-Konzepte---Scharle

Ausführliche Beschreibung und Screenshots finden Sie in der Dokumentation

Benötigte Installationsdateien:
Verwendung der MongoDB Community Edition
Installation: https://www.mongodb.com/try/download/community

Nach Installation:
1. Vorgeschlagenen Pfad (mongodb://localhost:27017) NICHT verändern, sondern auf "Connect" klicken
2. Datenbank hinzufügen 
--> dazu auf das + auf der linken Seite des installierten GUI (MongoDB Compass)  klicken
--> Database Name: Rezepte
--> Collection Name: Rezepte
3. Daten in Datenbank importieren
--> Auf "Add Data" Button klicken und "Import from JSON or CSV file" wählen
--> Datei mit dem Namen "Rezepte.Rezepte.json" wählen (Datei bei Abgabe in Moodle und im Github-Repository)

Befehle zum Starten des Frontends: (@vue/cli 5.0.8)
1.	npm install
2.	npm run serve
Befehle zum Starten des Backends: (node v20.9.0)
1.	cd back-end
2.	npm install
3.	cd src
4.	node server.js 


