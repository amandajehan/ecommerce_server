const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes')
const PORT = process.env.PORT || 3000
const errorHandler = require('./middlewares/errorHandler.js')

app.use(cors())
//body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//routes
app.use(routes)
//error handling
app.use(errorHandler)

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))

module.exports = app