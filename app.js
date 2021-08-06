if(process.env.NODE_ENV==='development'){
  require('dotenv').config()
}
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001
const cors = require('cors')
const index = require('./routes/index')

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

app.use(index);

app.use('/', (req, res) => {
  res.type('html').send(`
  <html>
    <head>
      <title>Are you lost?</title>  
    </head>
    <body>
    <p>It's running fine, don't worry. It's in ${PORT} port</P>
    </body>
  </html>
  `)
})

app.listen(PORT, ()=> console.log('listening on', PORT));