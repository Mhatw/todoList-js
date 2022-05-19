document.getElementById("date-form").valueAsDate = new Date();
function newTodo(todo) {
  taskInfo = " " + todo.todo;
  dateInfo = todo.date;
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
  return newTask;
}
// delete method
function deleteTodo(event) {
  if (confirm("Are you sure you want to delete?")) {
    deleteExpense(event);
    renderExpenses(expenses);
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
}

// modal in progress

// document.addEventListener("DOMContentLoaded", () => {
//   // Functions to open and close a modal

//   function closeModal($el) {
//     $el.classList.remove("is-active");
//   }

//   function closeAllModals() {
//     (document.querySelectorAll(".modal") || []).forEach(($modal) => {
//       closeModal($modal);
//     });
//   }

//   // Add a click event on buttons to open a specific modal
//   (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
//     const modal = $trigger.dataset.target;
//     const $target = document.getElementById(modal);

//     $trigger.addEventListener("click", () => {
//       openModal($target);
//     });
//   });

//   // Add a click event on various child elements to close the parent modal
//   (
//     document.querySelectorAll(
//       ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button, .modal-close-button"
//     ) || []
//   ).forEach(($close) => {
//     const $target = $close.closest(".modal");

//     $close.addEventListener("click", () => {
//       closeModal($target);
//     });
//   });

//   // Add a keyboard event to close all modals
//   document.addEventListener("keydown", (event) => {
//     const e = event || window.event;

//     if (e.keyCode === 27) {
//       // Escape key
//       closeAllModals();
//     }
//   });
// });

// local Storage

const form = document.querySelector(".js-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const newTodo = {
    todo: event.target.elements.todoForm.value,
    date: event.target.elements.dateForm.value,
  };
  document.getElementById("submit-button").classList.add("is-loading");
  if (event.target.elements.todoForm.value == "") {
    setTimeout(() => {
      alert("You must write something!");
      document.getElementById("submit-button").classList.remove("is-loading");
    }, 500);
  } else {
    setTimeout(() => {
      let defaultEl = document.getElementById("default-todo");
      if (defaultEl) defaultEl.remove();
      document.getElementById("submit-button").classList.remove("is-loading");
      createExpense(newTodo);
      renderExpenses(expenses);

      document.getElementById("task-form").value = "";
    }, 500);
  }
});

const intialTodos = [
  {
    todo: "Welcome to Todo's app, try to delete this todo if you can",
    date: `${document.getElementById("date-form").value}`,
  },
];

const expenseFromStorage = JSON.parse(localStorage.getItem("expenses"));
const expenses = expenseFromStorage || intialTodos;

function deleteExpense(expense) {
  const index = expenses.indexOf(expense);
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function renderExpenses(expenses) {
  const expensesList = document.getElementById("todo-container");
  expensesList.innerHTML = "";

  expenses.forEach((expense) => {
    console.log(expense);
    const expenseEl = newTodo(expense);
    expensesList.append(expenseEl);
  });
  let todoContainer = document.getElementById("todo-container");
  if (todoContainer.textContent.trim() === "") {
    let emptyTask = document.createElement("div");
    emptyTask.className = "container";
    let emptyP = document.createElement("p");
    emptyP.className = "container text-custom";
    emptyP.setAttribute("id", "default-todo");
    emptyP.textContent += "Add new todo 😎";
    emptyTask.append(emptyP);
    document.getElementById("todo-container").append(emptyTask);
  }
}

renderExpenses(expenses);

function createExpense(expense) {
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function deleteExpense(expense) {
  const index = expenses.indexOf(expense);
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}
