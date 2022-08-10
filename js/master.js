let addTaskBtn = document.getElementById("task-button");
let textInput = document.getElementById("text-input");
let newTasks = document.getElementById("tasks-container");
let delAll = document.querySelector(".delete-all");
let dates = new Date();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let taskArray = [];

// check if there is tasks data in localstorage
if (window.localStorage.getItem("tasks")) {
  newTasks.innerHTML = "";
  taskArray = JSON.parse(window.localStorage.getItem("tasks"));
  pushData(taskArray);
}

addTaskBtn.onclick = () => {
  if (textInput.value != "") {
    pushTasks(textInput);
    textInput.value = "";
    newTasks.innerHTML = "";
    getData();
  }
};

// push the entred data in to the array tasks and after to local storage
function pushTasks(e) {
  let tasks = {
    id: Date.now(),
    title: e.value,
    time: `${days[dates.getDay()]}, ${
      months[dates.getMonth()]
    } ${dates.getDate()}`,
    completed: false,
  };
  taskArray.push(tasks);
  toLocalStorage(taskArray);
}

// store data to local storage
function toLocalStorage(data) {
  window.localStorage.setItem("tasks", JSON.stringify(data));
}

// get data from local storage
function getData() {
  let storedData = JSON.parse(window.localStorage.getItem("tasks"));
  pushData(storedData);
}

// push the data received from local storage in to landing page
function pushData(data) {
  data.forEach((element) => {
    let div = document.createElement("div");
    let date = document.createElement("p");
    let span = document.createElement("span");
    span.innerHTML = `<i class="fa-solid fa-check-double"></i> <i id="delete" class="fa-solid fa-trash-can"></i>`;
    div.innerHTML = element.title;
    div.className = "new-tasks";
    date.className = "date";
    if (element.completed == true) {
      div.className = "new-tasks color";
    }
    date.innerHTML = element.time;
    div.appendChild(date);
    div.setAttribute("task-id", element.id);
    div.appendChild(span);
    newTasks.appendChild(div);
  });
}

// remove the task once or change color once we click on trash/done icone
document.addEventListener("click", function (e) {
  if (e.target.className === "fa-solid fa-trash-can") {
    delLocalStr(e.target.closest("div").getAttribute("task-id"));
    e.target.closest("div").remove();
  }
  if (e.target.className === "fa-solid fa-check-double") {
    e.target.closest("div").classList.toggle("color");
    changeCol(e.target.closest("div").getAttribute("task-id"));
  }
});

// delete the selected task from local storage
function delLocalStr(delTasks) {
  taskArray = taskArray.filter((e) => e.id != delTasks);
  toLocalStorage(taskArray);
}

// change the color for the selected task
function changeCol(col) {
  for (let i = 0; i < taskArray.length; i++) {
    if (taskArray[i].id == col) {
      taskArray[i].completed == false
        ? (taskArray[i].completed = true)
        : (taskArray[i].completed = false);
    }
  }
  toLocalStorage(taskArray);
}

// clear the local storage and tasks container
delAll.addEventListener("click", () => {
  newTasks.innerHTML = "";
  window.localStorage.removeItem("tasks");
  taskArray = [];
});
