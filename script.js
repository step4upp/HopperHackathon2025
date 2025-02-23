user_daily_cals = 0;
daily_info = []
// var user_input;
function changeContent(){
    document.getElementById("hello").innerText = "Words words words";
    user_input = document.getElementById("user_input").value
    //user_input = "apple";
    console.log(user_input)
fetch(`http://localhost:5000/api/foods?q=${user_input}`)
    .then(response => response.json())
    .then(data => printSmth(data))
    .catch(error => console.log("Error:", error));
}

function printSmth(data){
    //console.log(typeof data)
    parsed = JSON.parse(data).food
    description = parsed.food_description
    food_name = parsed.food_name
    // console.log(foodDesc);
    console.log(description)
    portion = description.substring(0,description.indexOf(" - "))
    macronutrients = description.substring(description.indexOf(" - ") + 3)
    console.log(portion);
    console.log(macronutrients);
    cals = macronutrients.substring(macronutrients.indexOf("Calories:") + "Calories: ".length, macronutrients.indexOf("kcal"))
    console.log(cals)
    user_daily_cals += parseInt(cals);
    daily_info.push({name: food_name, kcal: cals})
    console.log(daily_info)
    document.getElementById("cal_display").innerText = user_daily_cals
    renderList()
}

function renderList() {
    document.getElementById('list').innerHTML = daily_info.map((meal) => {
      return `<li>${ getDisplayMealInfo(meal) }</li>`;
    }).join('');
}

function getDisplayMealInfo(meal){
    return "Food Item: " + meal.name + " | Calories: " + meal.kcal
}

/*
function refreshData(e) {
  const nameOfAnime = e.target.value;
  const url = `http://localhost:5000/api/foods?q=${nameOfAnime}`;
  fetch(url)
    .then((res) => res.json())
    .then(console.log);
}

const input = document.getElementById("user_input");

input.addEventListener("change", refreshData);
*/