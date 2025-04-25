import { MongoClient } from 'mongodb'
import dotenv from 'dotenv';

dotenv.config();

export const Mongo = {
    async connect({ mongoConnectionString, mongoDbName }) {
        try {
            const client = new MongoClient(mongoConnectionString)
    
            await client.connect()
            const db = client.db(mongoDbName)

            this.client = client
            this.db = db

            return 'Connected to mongo!'
            
        } catch (error) {
            return { text: 'Error during mongo connection', error }
        }
    }
}