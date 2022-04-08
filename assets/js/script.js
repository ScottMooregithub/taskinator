var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompleteEl = document.querySelector("#tasks-complete");

var taskFormhandler = function (event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  if (!taskNameInput || !taskTypeInput) {
    alert("You Need to fill out the task form!");
    return false;
  }

  formEl.reset();

  var isEdit = formEl.hasAttribute("data-task-id");

  //has data attribute so get task id and all functions to complete edit process
  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskName, taskTypeInput, taskId);
  }

  //no data attribut, so create object as normal and pass to createTaskEl function
  else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
    };
    createTaskEl(taskDataObj);
  }

  //package up data as an object
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput,
  };
};

var completeEditTask = function (taskName, taskType, taskId) {
  var taskSelected = document.querySelector(
    ".task-item[data-task-id'" + taskId + "']"
  );

  //set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("sapn.take-type").textContent = taskType;

  alert("Task Updated!");
  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";
};

var createTaskEl = function (taskDataObj) {
  //ceate list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  //add task id as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  // creat a div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  // give it a class name
  taskInfoEl.className = "task-info";

  // add HTML content to div
  taskInfoEl.innerHTML =
    "<h3 class='task-name'>" +
    taskDataObj.name +
    "</h3><span class='task-type'>" +
    taskDataObj.type +
    "</span>";
  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);

  tasksToDoEl.appendChild(listItemEl);

  listItemEl.appendChild(taskInfoEl);

  // add entire lis item to list
  taskToDoEl.appendChild(listItemEl);
  taskIdCounter++;
};
//create edit button
var createTaskActions = function (taskId) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(editButtonEl);

  //create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  var statusSeleftEl = document.createElement("select");
  statusSeleftEl.className = "select-status";
  statusSeleftEl.setAttribute("name", "Status-change");
  statusSeleftEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(statusSeleftEl);

  var statusChoices = ["To Do", "In Progress", "completed"];

  for (var i = 0; i < statusChoices.length; i++) {
    //create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    //apend to select
    statusSeleftEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
};

formEl.addEventListener("submit", taskFormhandler);

var taskButtonHandler = function (event) {
  console.log(event.target);
  var targetEl = event.target;

  //edit button was clicked
  if (targetEl.matches(".edit-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  }

  //delete button was clicked
  if (event.target.matches(".delete-btn")) {
    var taskId = event.target.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

var editTask = function (taskId) {
  console.log("editing task #" + taskId);

  //get task item list
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  // get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  console.log(taskName);

  var taskType = taskSelected.querySelector("span.task-type").textContent;
  console.log(taskType);

  document.querySelector("#save-task").textContent = "Save Task";

  formEl.setAttribute("data-task-id", taskId);
};

var deleteTask = function (taskId) {
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  taskSelected.remove();
};

var taskStatusChangeHandler = function (event) {
  // get the task items id
  var taskId = event.target.getAttribute("data-task-id");

  //get teh currently selected options value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();

  // find the parent task item element basedon the id
  var taskSelected = document.querySelector(
    ".task-item[data-task-id'" + taskId + "']"
  );

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } else if (statusValue === "completed") {
    tasksCompleteEl.appendChild(taskSelected);
  }
};

pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);
