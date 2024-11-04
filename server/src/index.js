import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authController from "./auth/auth.controller.js"
import userController from "./user/user.controller.js"

// import unknownEndPoint from './middleware/unknownEndpoint.js';
const app = express()

dotenv.config()
const port = 2000
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Volatoon api!')
})

app.use('/api/auth/', authController)
app.use('/api/', userController)
app.listen(port, () => {
  console.log(`BreadFinance is listening on port ${port}`)
})