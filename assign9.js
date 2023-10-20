const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const secretKey = 'SecretKey'; 
app.use(bodyParser.json());

const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];


function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.sendStatus(401); 

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403); 
    req.user = user;
    next();
  });
}


app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) return res.sendStatus(401); 

  const token = jwt.sign({ id: user.id, username: user.username }, secretKey);
  res.json({ token });
});


app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route.' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
