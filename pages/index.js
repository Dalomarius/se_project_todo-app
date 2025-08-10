import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEL = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEL.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (evt) => {
    //TODO move code from submission handler to here
    console.log(evt.target.name.value);
    console.log(evt.target.date.value);
  },
});
addTodoPopup.setEventListeners();

const section = new Section({
  items: [], //pass initial todos
  renderer: () => {
    //TODO generate todo item
    //TODO add it to the todo list
    //TODO refer to the forEach loop in this file
  },
  containerSelector: ".todos__list",
});
// call section instances renderItems method

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
}

// takes in an object representing a todo (with name, date, completed), and then it creates an html element based on that data
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };
  renderTodo(values);
  newTodoValidator.resetValidation();
  addTodoPopup.close();
});

initialTodos.forEach((item) => {
  renderTodo(item);
});

// it takes in an object representing a todo, it calls generateTodo to create and get the html element created from that object
// and then it appends it to the page
function renderTodo(item) {
  // Create handlers
  const handleCheck = (todoId) => {
    console.log("Todo checked:", todoId);
    // Add your check logic here
  };

  const handleDelete = (todoId) => {
    console.log("Todo deleted:", todoId);
    // Add your delete logic here
  };

  // Create Todo instance with all required parameters
  const todo = new Todo(item, "#todo-template", handleCheck, handleDelete);
  return todo.getView();
}

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
