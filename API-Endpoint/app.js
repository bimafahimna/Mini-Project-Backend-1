const express = require('express')
const router = require('./source/routes/main')

const app = express()
const port = 8080


app.use(express.json())
app.use('/',router)

app.listen(port, () => {
  console.log(`API endpoint Bangun Datar dan Bangun Ruang ${port}`)
})



