import express from 'express'
import ejs from 'ejs'
import config from './config/index.ts'
import routes from './routes/index.ts'
import cors from 'cors'

const moduleUrl = import.meta.url
const __dirname = new URL('.', moduleUrl).pathname

const app = express()

app.use(express.static(__dirname + '/views'))
app.use(express.static(__dirname + '/data'))

app.engine('html', ejs.__express)
app.set('view engine', 'html')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)

app.listen(config.port, () => {
  console.log('Server is running on http://localhost:3000')
})

export default app
