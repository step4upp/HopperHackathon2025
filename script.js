function changeContent(){
    document.getElementById("hello").innerText = "Words words words";
}
fetch("http://localhost:5000/api/foods?q=cheese")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error:", error));
