document.getElementById("calories").addEventListener("submit", function(event) {
    event.preventDefault();

    const userInput = document.getElementById("userInput").value;

    fetch("http://localhost:5000/api/foods?q=" + userInput)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log("Error:", error));
  
})