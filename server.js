// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
 
// Middleware to parse JSON
app.use(express.json());
 
// In-memory user store
let users = [];
 
// CREATE a user
app.post('/users', (req, res) => {
  const user = { id: users.length + 1, ...req.body };
  users.push(user);
  res.status(201).json(user);
});
 
// READ all users
app.get('/users', (req, res) => {
  res.json(users);
});
 
// READ a single user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  res.json(user);
});
 
// UPDATE a user by ID
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
 
  Object.assign(user, req.body);  // Update user with new data
  res.json(user);
});
 
// DELETE a user by ID
app.delete('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).send('User not found');
 
  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser);
});
 
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});