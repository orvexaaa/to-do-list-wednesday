const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = "";

    todos.forEach((todo, index) => {
        const li = document.createElement("li");

        if (todo.completed ) {
            li.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type= "checkbox";
        checkbox.checked = todo.completed;
        checkbox.style.flex = "0 0 auto";

        checkbox.addEventListener("change", () => {
            todos[index].completed = checkbox.checked;
            saveTodos();
            renderTodos();
        });

        const span = document.createElement("span");
        span.textContent = todo.text;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Hapus";
        deleteButton.classList.add("delete-btn");

        deleteButton.addEventListener("click", () => {
            todos.splice(index,1);
            saveTodos();
            renderTodos();
        });

        li.append(checkbox, span, deleteButton);
        todoList.appendChild(li);
    });
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const task = input.value.trim();

    if (task === "") return;

    todos.push({
        text: task,
        completed: false
    });

    saveTodos();
    renderTodos();

    input.value = "";
    input.focus();
});

renderTodos();