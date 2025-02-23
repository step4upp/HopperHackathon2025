// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
// FatSecret API Endpoint
const FATSECRET_API_URL = 'https://platform.fatsecret.com/rest/server.api';

import FatSecret from "node-fatsecret"

const fatSecret = new FatSecret(
    process.env.FATSECRET_CONSUMER_KEY,
  process.env.FATSECRET_CONSUMER_SECRET
)

async function getRecipe(name) {
  const {recipes} = await fatSecret.request({
    method: 'recipes.search',
    search_expression: name,
    max_results: 1,
  })
  return recipes
}

async function getFood(name) {
  const {foods} = await fatSecret.request({
    method: 'foods.search',
    search_expression: name,
    max_results: 1,
  })
  return foods
}

// (async function () {
  
//   // getting recipe
//   const {recipe} = await getRecipe('mango')
//   console.log('recipes', recipe)
  
//   // getting food
//   const {food} = await getFood('mango')
//   console.log('food', food)
  
// })()


// Search for Foods
app.get('/api/foods', async (req, res) => {
    const query = req.query.q || 'apple';
    var response = await getFood(query)
    res.json(JSON.stringify(response));

    // const request_data = {
    //     url: `${FATSECRET_API_URL}?method=foods.search&format=json&search_expression=${query}`,
    //     method: 'GET',
    // };

    // const authHeader = oauth.toHeader(oauth.authorize(request_data));
    // console.log("auth header", authHeader)

    // try {
    //     const response = await axios.get(request_data.url, { headers: authHeader });
    //     res.json(response.data);
    // } catch (error) {
    //     res.status(500).json({ error: error.response ? error.response.data : 'API request failed' });
    // }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
