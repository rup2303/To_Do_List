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
let LIST,id;

//get item from local storage
let data=localStorage.getItem("TODO")


//check if data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}
else {
    LIST = []
    id = 0;
}

//clear the local storage

clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

//load list
function loadList(array) {
    array.forEach(element => {
        add_to_do(element.name, element.id, element.done, element.trash);
    });
}

//show todays date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);
// document.getElementById('date').innerHTML+="today"

// add to-do list

function addToDo(toDo,id,done,trash) {
 var txt = document.createElement("div")
    if(trash){
        return;
    }
const DONE= done? CHECK : UNCHECK;
const LINE=done?LINE_THROUGH: "";

  const item = `<li class="item">
  <i class="fa ${DONE} co" job="complete" id="${id}"></i>
  <p class="text ${LINE}">${toDo}</p><i class="fa fa-trash-o de"  job="delete" id="${id}"></i> 
  </li>        
  `;
  txt.innerHTML=item;
  const position = "beforeend";
  list.insertAdjacentElement(position, txt);
}
// addToDo("DFSSDF")
// addToDo("good");
//add an item to the list user hits the enter key
document.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    const toDo = input.value;
    //if input is not empty
    if (toDo) {
      addToDo(toDo);
      LIST.push({
          name:toDo,
          id:id,
          done:false,
          trash:false
      })
    }
    input.value="";
  }
});

//complete to do
function completeToDo(element) {
       
        element.classList.toggle(CHECK);
        element.classList.toggle(UNCHECK);
        element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
        LIST[element.id].done = LIST[element.id].done ? false : true;
        if(status === "active" && LIST[element.id].done){
            element.parentNode.parentNode.removeChild(element.parentNode);
        }
        else if(status === "completed" && !LIST[element.id].done){
            element.parentNode.parentNode.removeChild(element.parentNode);
        }
        else if(LIST[element.id].done){
            var temp = element.parentNode, realParent = element.parentNode.parentNode;
            element.parentNode.parentNode.removeChild(element.parentNode);
            realParent.appendChild(temp);
        }
    }
    
// addToDo("dcfsDf",1,false,false)
//remove to do
function removeToDo(element) {
        element.parentNode.parentNode.removeChild(element.parentNode);
        LIST[element.id].trash = true;
    }

//target items created dynamically
list.addEventListener("click", function (event) {
        const element = event.target;
        const elementJob = element.attributes.job.value;
    
        if (elementJob === 'complete') {
            completeToDo(element);
        } else if (elementJob === 'delete') {
            removeToDo(element);
        }
        else if (elementJob === 'edit') {
            editTodo(element);
        }
    //add item to local storage
        localStorage.setItem("TODO", JSON.stringify(LIST));
    
    }, false);




// const dateElement = document.getElementById('date');
// const clear = document.querySelector('.clear');
// const list = document.getElementById('list');
// const input = document.querySelector('input');
// const addButton = document.querySelector('.fa-plus-circle');
// const show_all = document.querySelector('.All');
// const show_finished = document.querySelector('.fulfill');
// const show_unfinished = document.querySelector('.unfinished');

// const CHECK = "fa-check-circle";
// const UNCHECK = "fa-circle-thin";
// const LINE_THROUGH = "lineThrough";
// const CHANGE = "editable";

// var status = "all", timer = null, delay = 260, click = 0;//double click

// clear.addEventListener("click", function () {
//     localStorage.clear();
//     location.reload();
// });
// /* show time */
// const options = { weekday: 'long', month: 'short', day: 'numeric' };
// const today = new Date();
// dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// let LIST, id;
// let data = localStorage.getItem("TODO");
// //get historical data from localstorage
// if (data) {
//     LIST = JSON.parse(data);
//     id = LIST.length;
//     loadList(LIST);
// }
// else {
//     LIST = []
//     id = 0;
// }

// function loadList(array) {
//     array.forEach(element => {
//         add_to_do(element.name, element.id, element.done, element.trash);
//     });
// }



// function defReload(array, status){
//     if(status === "all"){
//         array.forEach(element=>{
//             add_to_do(element.name, element.id, element.done, element.trash)
//         });
//     }
//     else if(status === "completed"){
//         array.forEach(element => {
//             if (element.done) {
//                 add_to_do(element.name, element.id, element.done, element.trash);
//             }
//         });
//     }
//     else{
//         array.forEach(element => {
//             if (!element.done) {
//                 add_to_do(element.name, element.id, element.done, element.trash);
//             }
//         });
//     }
// }

// show_all.addEventListener("click", function () {
//     var i, list_length = list.childNodes.length;
//     status = "all";
//     for (i = 0; i < list_length; i++) {
//         list.removeChild(list.lastChild);
//     }
//     defReload(LIST,"all");
// });

// show_finished.addEventListener("click", function () {
//     var i, list_length = list.childNodes.length;
//     status = "completed";
//     for (i = 0; i < list_length; i++) {
//         list.removeChild(list.lastChild);
//     }
//     defReload(LIST,"completed");
// });

// show_unfinished.addEventListener("click", function () {
//     var i, list_length = list.childNodes.length;
//     status = "active";
//     for (i = 0; i < list_length; i++) {
//         list.removeChild(list.lastChild);
//     }
//     defReload(LIST,"active");
// });

// input.addEventListener("keypress", function (even) {
//     if (event.keyCode === 13) {
//         const toDo = input.value;
//         if (toDo) {
//             add_to_do(toDo, id, false, false);

//             LIST.push({ name: toDo, id: id, done: false, trash: false });

//             localStorage.setItem("TODO", JSON.stringify(LIST));
//             id++;
//             input.value = "";
//         }
//     }
// });

// addButton.addEventListener('click', function () {
//     const toDo = input.value;
//     if (toDo) {
//         add_to_do(toDo, id, false, false);

//         LIST.push({ name: toDo, id: id, done: false, trash: false });

//         localStorage.setItem("TODO", JSON.stringify(LIST));
//         id++;
//         input.value = "";
//     }
// });

// list.addEventListener("click", function (event) {
//     const element = event.target;
//     const elementJob = element.attributes.job.value;

//     if (elementJob === 'complete') {
//         completeToDo(element);
//     } else if (elementJob === 'delete') {
//         removeToDo(element);
//     }
//     else if (elementJob === 'edit') {
//         editTodo(element);
//     }

//     localStorage.setItem("TODO", JSON.stringify(LIST));

// }, false);

// function completeToDo(element) {
//     element.classList.toggle(UNCHECK);
//     element.classList.toggle(CHECK);
//     element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

//     LIST[element.id].done = LIST[element.id].done ? false : true;
//     if(status === "active" && LIST[element.id].done){
//         element.parentNode.parentNode.removeChild(element.parentNode);
//     }
//     else if(status === "completed" && !LIST[element.id].done){
//         element.parentNode.parentNode.removeChild(element.parentNode);
//     }
//     else if(LIST[element.id].done){
//         var temp = element.parentNode, realParent = element.parentNode.parentNode;
//         element.parentNode.parentNode.removeChild(element.parentNode);
//         realParent.appendChild(temp);
//     }
// }

// function removeToDo(element) {
//     element.parentNode.parentNode.removeChild(element.parentNode);
//     LIST[element.id].trash = true;
// }

// function editTodo(element) {
//     var newTodo, content = element.parentNode.querySelector(".text"), preText;
//     click++;
//     if (click === 1) {
//         timer = setTimeout(function () {
//             click = 0;
//         }, (delay));
//     } else {
//         click = 0;
//         clearTimeout(timer);
//         preText = content.value;
//         content.disabled = false;
//         content.focus();
//         content.onblur = () => {
//             newTodo = content.value;
//             if (preText !== newTodo) {
//                 LIST[element.id].name = newTodo;
//                 localStorage.setItem("TODO", JSON.stringify(LIST));
//             }
//             content.disabled = true;
//         };
//     }

// }
