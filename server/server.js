const express = require('express');
const cors = require('cors');
const tasks = require('./tasks');

const PORT = process.ENV_PORT || 3500;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', function(req, res, next) {
  res.send('Hello world!');
});

app.use('/tasks', tasks);

app.listen(PORT, () => {
  console.log(`Server is up! running in port ${PORT}`);
})

