// mongo.js
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const Mongo = {
    client: null,
    db: null,

        // mongo.js
    async connect({ mongoConnectionString, mongoDbName }) {
        try {
            const client = new MongoClient(mongoConnectionString)
            await client.connect()
            this.client = client
            this.db = client.db(dbName)
            return 'Connected to mongo!'
        } catch (error) {
            console.error(error)
            return { text: 'Error during mongo connection', error }
        }
    }
}

export { Mongo }
