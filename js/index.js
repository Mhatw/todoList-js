document.getElementById("date-form").valueAsDate = new Date();
function newTodo(taskInfo) {
  taskInfo = " " + document.getElementById("task-form").value;
  dateInfo = document.getElementById("date-form").value;

  let newTask = document.createElement("div");
  newTask.className = "notification has-background-warning-light";

  let newLabel = document.createElement("label");
  newLabel.className = "checkbox ch";

  let newInput = document.createElement("input");
  newInput.setAttribute("type", "checkbox");
  newInput.setAttribute("id", "checkbox-todo");
  newInput.setAttribute("onclick", "checkTodo(event)");

  let newSpan = document.createElement("span");
  newSpan.className = "tag is-success has-background-grey-dark";
  newSpan.textContent = dateInfo;

  let newButton = document.createElement("button");
  newButton.className = "delete";
  newButton.setAttribute("onclick", "deleteTodo(event)");

  let newBr = document.createElement("br");

  newLabel.textContent = taskInfo;
  newLabel.prepend(newInput);

  newTask.append(newLabel);
  newTask.append(newButton);
  newTask.append(newBr);
  newTask.append(newSpan);

  let todoContainer = document.getElementById("todo-container");
  console.log(taskInfo);
  document.getElementById("submit-button").classList.add("is-loading");
  if (taskInfo == " ") {
    setTimeout(() => {
      alert("You must write something!");
      document.getElementById("submit-button").classList.remove("is-loading");
    }, 500);
  } else {
    setTimeout(() => {
      let defaultEl = document.getElementById("default-todo");
      if (defaultEl) defaultEl.remove();
      document.getElementById("submit-button").classList.remove("is-loading");
      todoContainer.prepend(newTask);
      document.getElementById("task-form").value = "";
    }, 500);
  }
}
// delete method
function deleteTodo(event) {
  if (confirm("Are you sure you want to delete?")) {
    event.target.parentNode.remove();
  }
  let todoContainer = document.getElementById("todo-container");
  if (todoContainer.textContent.trim() === "") {
    let emptyTask = document.createElement("div");
    emptyTask.className = "container";
    let emptyP = document.createElement("p");
    emptyP.className = "container text-custom";
    emptyP.setAttribute("id", "default-todo");
    emptyP.textContent += "Add new todo 😎";
    emptyTask.append(emptyP);
    console.log(emptyTask);
    document.getElementById("todo-container").append(emptyTask);
  }
}

function popUpDelete() {}
function openModal() {
  document.getElementById("modal-js-example").classList.add("is-active");
}
// checked

function checkTodo(event) {
  if (event.target.checked == true) {
    event.target.parentElement.classList.add("checked-todos");
  } else {
    event.target.parentElement.classList.remove("checked-todos");
  }

  console.log(event.target.checked);
}

// modal

document.addEventListener("DOMContentLoaded", () => {
  // Functions to open and close a modal

  function closeModal($el) {
    $el.classList.remove("is-active");
  }

  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener("click", () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button, .modal-close-button"
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) {
      // Escape key
      closeAllModals();
    }
  });
});
