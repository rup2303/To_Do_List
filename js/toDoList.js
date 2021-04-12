//select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Classname
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//variables
let LIST, id;

//get item from local storage
let data = window.localStorage.getItem("TODO");

//check if data is not empty
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
  window.localStorage.setItem("TODO", JSON.stringify(LIST));
}

//clear the local storage

clear.addEventListener("click", ()=> {
  localStorage.clear();
  location.reload();
});

//load list
function loadList(array) {
  array.forEach((element) => {
    addToDo(element.name, element.id, element.done, element.trash);
  });
}

//show todays date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);
// document.getElementById('date').innerHTML+="today"

// add to-do list

function addToDo(toDo, id, done, trash) {
  var txt = document.createElement("div");
  if (trash) {
    return;
  }
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `<li class="item">
  <i class="fa ${DONE} co" job="complete" id="${id}"></i>
  <p class="text ${LINE}">${toDo}</p><i class="fa fa-trash-o de"  job="delete" id="${id}"></i> 
  </li>        
  `;
  txt.innerHTML = item;
  const position = "beforeend";
  list.insertAdjacentElement(position, txt);
}
// addToDo("DFSSDF")
// addToDo("good");
//add an item to the list user hits the enter key
document.addEventListener("keyup",(event)=>{
  if (event.keyCode == 13) {
    const toDo = input.value;
    //if input is not empty
    if (toDo) {
      addToDo(toDo,id,false,false);
    //   console.log(toDo + " " + id);
      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });
      id++;
    }
    // console.log(LIST);
    window.localStorage.setItem("TODO", JSON.stringify(LIST));
    input.value = "";
  }
});

//complete to do
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;

}

//remove to do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
  
}

//target items created dynamically
list.addEventListener(
  "click",
  (event) =>{
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if (elementJob === "complete") {
      completeToDo(element);
    } else if (elementJob === "delete") {
      removeToDo(element);
    
    }
    //add item to local storage
    window.localStorage.setItem("TODO", JSON.stringify(LIST));
  },
  false
);
