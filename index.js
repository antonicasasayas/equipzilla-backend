require("dotenv").config();
const app = require("express")();
const express = require("express");
const PORT = 8080;
const mongoose = require("mongoose");
const Tweet = require("./models/tweet");

// Connect to MongoDB
const dbURI =
  "mongodb+srv://Antoni:H3CjuDuMMpGIdpqB@cluster0.rsjcm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(dbURI)
  .then((result) => console.log("Connected to DB"))
  .catch((error) => console.error(error));

app.listen(PORT, () => console.log(`Listening to server on ${PORT}`));
const Twit = require("twit");

const T = new Twit({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

app.post("/search/:query", (req, res) => {
  const { query } = req.params;
    
  T.get(
    "search/tweets",
    { q: `#${query}`, count: 100 },
    function (err, data, response) {
        data.statuses.forEach(result => {
          let tweet = new Tweet({
            text: result.text,
            user: result.user.name,
          });
          tweet
            .save()
            .then((result) => {
              console.log(result);
            })
            .catch((error) => console.error(error));
        })
        res.send(data)
    }
  );
});
