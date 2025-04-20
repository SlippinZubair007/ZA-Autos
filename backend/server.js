const express = require('express');
const bodyParser=require('body-parser');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api', taskRoutes);
app.get('/', (req, res) => {
  res.send('Hello from Node.js MVC App!');
});

const PORT =  5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
