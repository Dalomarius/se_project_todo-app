class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._completed = data.completed;
    this._name = data.name;
    this._date = data.date;
    this._id = data.id;
    this._selector = selector;
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._handleDelete(this._completed);
      this._remove();
    });
    this._todoCheckboxEl.addEventListener("change", () => {
      this._toggleCompletion();
      this._handleCheck(this._completed);
    });
  }

  _getTemplate() {
    console.log("getTemplate called");
    console.log("this._selector:", this._selector);

    const templateElement = document.querySelector(this._selector);
    console.log("templateElement found:", templateElement);

    const todoElement = templateElement.content.querySelector(".todo");
    console.log("todoElement found:", todoElement);

    if (!todoElement) {
      console.error("No .todo element found in template content");
      return null;
    }

    return todoElement.cloneNode(true);
  }

  _generateNameEl() {
    this._nameEl = this._todoElement.querySelector(".todo__name");
    this._nameEl.textContent = this._name;
  }

  _generateDueDate() {
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._dueDate = new Date(this._data.date);
    if (!isNaN(this._dueDate)) {
      this._todoDate.textContent = `Due: ${this._dueDate.toLocaleString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )}`;
    }
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _toggleCompletion = () => {
    this._completed = !this._completed;
  };

  _remove = () => {
    this._element.remove();
    this._element = null;
  };

  getView() {
    this._element = this._getTemplate();
    this._todoDeleteBtn = this._element.querySelector(".todo__delete-btn");
    this._generateNameEl();
    this._generateCheckboxEl();
    this._setEventListeners();
    this._generateDueDate();
    return this._todoElement;
  }
}

export default Todo;
