const Promise = require('bluebird')
const express = require('express')
const redis = require('redis')
const { PORT } = require('./config')
const cors = require('cors')
const responseTime = require('response-time')

const app = express()
app.use(responseTime())
app.use(cors())
app.use(express.json())

const client = redis.createClient()
client.on('error', err => console.log('Error ' + err))
Promise.promisifyAll(redis)

app.get('/api/counter', async (req, res) => {
  try {
    const result = await client.getAsync('counter')
    console.log('result', result)
    res.status(200).json(parseInt(result))
  } catch (error) {
    res.status(404).json({ error: 'Not Found!' })
  }
})

app.post('/api/counter', (req, res) => {
  client.set('counter', req.body.counter, redis.print)
  console.log('COUNTER POST', req.body)
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
