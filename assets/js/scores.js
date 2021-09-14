// import score from './script.js';
var clear = document.getElementById("done");
var todoList = document.querySelector("#todos-list");

var pontosLocal = JSON.parse(localStorage.getItem('pontos'));

clear.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
});
// The following function renders items in a todo list as <li> elements
function renderTodos() {
    for (var i = 0; i < pontosLocal.length; i++){
        var pontosScored = pontosLocal[i]["initials"] + "    " + pontosLocal[i]["score"];
        var li = document.createElement("li");
        li.textContent = pontosScored;
        todoList.appendChild(li);
    }
}
function init(){
    if(!pontosLocal || pontosLocal === null){
        pontosLocal = [];
    }else{

        renderTodos();
    }
}
init();
