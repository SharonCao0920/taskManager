
import {MongoClient} from 'mongodb';
// const {MongoClient, ConnectionCheckOutStartedEvent} = require('mongodb');   
const mongoUrl = 'mongodb+srv://SharonCao0920:Sharon1990@sfbu.cirid9w.mongodb.net/';
let myDatabase;

export const connectToDatabase = async () => { 
    try{
        const client = new MongoClient(mongoUrl);
        await client.connect();
        myDatabase = client.db('task_manager');
        console.log(myDatabase.collection('tasks'));
        console.log('Connected to MongoDB')
    }  
    catch(error){
        console.error('Failed to connect to Database',error);
    }
    
}

export function getDatabaseClient(){
    return myDatabase;
}