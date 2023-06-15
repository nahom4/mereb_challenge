const express = require('express')
const persons = require('./schema/personDatabase')
const app = express()

app.set('db', persons)
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/person',require('./routes/person'))

app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
  });

const PORT = process.env.port || 3000
if (require.main === module) {
    app.listen(PORT)
    
}
module.exports = app;