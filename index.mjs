import FatSecret from "node-fatsecret"

const fatSecret = new FatSecret(
  '1dc8c4e1efc1443e859df4b08fe2a02c',
  'a42f416c7b5e4c54b3a33a26d50f9c9e'
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

(async function () {
  
  // getting recipe
  const {recipe} = await getRecipe('mango')
  console.log('recipes', recipe)
  
  // getting food
  const {food} = await getFood('mango')
  console.log('food', food)
  
})()