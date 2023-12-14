import express from "express";

import { getLoggerInstance } from "../logger.js";   
import { getDatabaseClient } from "../database.js";
const logger = getLoggerInstance();

export const getData = express.Router();

getData.get('/get-data', async(req, res) => { 
    try {
        const dbClient = getDatabaseClient();
        const collection = await dbClient.collection('tasks').find().toArray(); 
        console.log(collection, "collection");
        logger.info(collection)
        res.send(collection);
    }catch (err) {     
        logger.error(err);
        res.send({"error":err});
    }
});

// Assuming `getData` is your express router
getData.post('/save-data', async(req, res) => { 
    try {
        const dbClient = getDatabaseClient();
        const document = req.body; // Your new data will come from the request body
        const result = await dbClient.collection('tasks').insertOne(document);
        logger.info(`A document was inserted with the _id: ${result.insertedId}`);
        res.status(201).send(result);
    } catch (err) {
        logger.error(err);
        res.status(500).send({"error": err.message});
    }
});
