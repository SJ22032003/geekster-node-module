const express = require('express');
const jokes = require('./data');

const app = express();

const PORT = 8080;

app.get('/jokes', (req, res) => {
  const requiredRandomJokeIndex= Math.floor(Math.random() * jokes.length);
  return res.status(200).json(jokes[requiredRandomJokeIndex]);
});

app.get('/joke/:jokeId', (req, res) => {
  const jokeId = req.params.jokeId; 
  
  if (!Number(jokeId) || Number(jokeId) < 0){
    return res.status(400).json({error: "Invalid joke id"});
  }

  return res.status(200).json(jokes.find(joke => joke.id == jokeId));

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});