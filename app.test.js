const express = require('express');
const bodyParser = require('body-parser');
const app = require('../src/app.js');
const fs = require('fs');
jest.mock('fs');
const request = require('supertest');
const dataFile = '../data/addressBook.json';

test('GET / Return 200', async () => {
    const response = await request(app)
    .get('/')
    .expect('Content-Type', /json/)
    .expect(200);
});

test('DELETE / Return 204', async () => {
    const response = await request(app)
    .delete('/')
    .expect('Content-Type', /json/)
    .expect(204);
});