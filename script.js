// Selecting HTML elements
const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let todos = [];           
let editIndex = null;     

// Load todos from localStorage when the page loads
function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
        renderTodos();
    }
}

// Save current todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Render the list of todos in the UI
function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
        const li = document.createElement("li");

        // Create task text
        const p = document.createElement("p");
        p.innerText = todo;
        li.appendChild(p);

        // Edit button
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.className = "btn editBtn";
        editBtn.onclick = () => editTodo(index);
        li.appendChild(editBtn);

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.className = "btn deleteBtn";
        deleteBtn.onclick = () => deleteTodo(index);
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    });
}

// Handle adding or updating a todo
function addTodo() {
    const text = inputBox.value.trim();

    if (text === "") {
        alert("Please enter a to-do!");
        return;
    }

    if (editIndex !== null) {
        // Update existing todo
        todos[editIndex] = text;
        editIndex = null;
        addBtn.value = "Add";
    } else {
        // Add new todo
        todos.push(text);
    }

    inputBox.value = "";
    saveTodos();
    renderTodos();
}

// Populate the input field for editing
function editTodo(index) {
    inputBox.value = todos[index];
    inputBox.focus();
    addBtn.value = "Update";
    editIndex = index;
}

// Delete a todo item
function deleteTodo(index) {
    if (confirm("Are you sure you want to delete this to-do?")) {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    }
}

// Event listeners
addBtn.addEventListener("click", addTodo);
document.addEventListener("DOMContentLoaded", loadTodos);
