const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const request = require('supertest');
const dataFile = './data/addressBook.json';
app.use(bodyParser.json());

app.get('/addresses', (req, res) => {
    fs.readFile(dataFile, (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        res.send(JSON.parse(data));
    });
});

app.get('/addresses/:id', (req, res) => {
    fs.readFile(dataFile, (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        const addresses = JSON.parse(data);
        const address = addresses.find(a => a.id == req.params.id);
        if (!address) {
            res.status(404).send('Address not found');
            return;
        }
        res.send(address);
    });
});

app.post('/addresses', (req, res) => {
    fs.readFile(dataFile, (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        const addresses = JSON.parse(data);
        const newAddress = req.body;
        newAddress.id = addresses.length > 0 ? addresses[addresses.length - 1].id + 1 : 1;
        addresses.push(newAddress);
        fs.writeFile(dataFile, JSON.stringify(addresses), (err) => {
            if (err) {
                res.status(500).send('Error writing file');
                return;
            }
            res.send(newAddress);
        });
    });
});

app.put('/addresses/:id', (req, res) => {
    fs.readFile(dataFile, (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        const addresses = JSON.parse(data);
        const index = addresses.findIndex(a => a.id == req.params.id);
        if (index == -1) {
            res.status(404).send('Address not found');
            return;
        }
        const updatedAddress = req.body;
        updatedAddress.id = req.params.id;
        addresses[index] = updatedAddress;
        fs.writeFile(dataFile, JSON.stringify(addresses), (err) => {
            if (err) {
                res.status(500).send('Error writing file');
                return;
            }
            res.send(updatedAddress);
        });
    });
});

app.delete('/addresses/:id', (req, res) => {
    fs.readFile(dataFile, (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        const addresses = JSON.parse(data);
        const index = addresses.findIndex(a => a.id == req.params.id);
        if (index == -1) {
            res.status(404).send('Address not found');
            return;
        }
        addresses.splice(index, 1);
        fs.writeFile(dataFile, JSON.stringify(addresses), (err) => {
            if (err) {
                res.status(500).send('Error writing file');
                return;
            }
            res.status(204).send();
        });
    });
});