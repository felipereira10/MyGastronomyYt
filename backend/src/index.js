import path from 'path'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

config({ path: path.resolve(__dirname, '.env') })

import express from 'express'
import cors from 'cors'
import { Mongo } from './database/mongo.js'
import authRouter from './auth/auth.js'
import usersRouter from './routes/users.js'
import platesRouter from './routes/plates.js'
import ordersRouter from './routes/orders.js'

console.log('✅ MONGO_URL:', process.env.MONGO_URL)


async function main() {
    const hostname = 'localhost'
    const port = 3000

    const app = express()

    await Mongo.connect({ 
        mongoConnectionString: process.env.MONGO_URL, 
        mongoDbName: process.env.MONGO_DB_NAME 
    })
    
    
    app.use(express.json())
    app.use(cors())

    app.get('/', (req, res) => {
        res.send({
            success: true, 
            statusCode: 200,
            body: 'Welcome to MyGastronomy!'
        })
    })

    // routes
    app.use('/auth', authRouter)
    app.use('/users', usersRouter)
    app.use('/plates', platesRouter)
    app.use('/orders', ordersRouter)
    
    app.listen(port, () => {
        console.log(`Server running on: http://${hostname}:${port}`)
    })
}

main()