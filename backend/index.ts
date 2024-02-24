const express = require('express');
const app = express();
const PORT = 5002;

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

try {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
} catch (error) {
  console.error('Error occurred:', error);
}
