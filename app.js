// Selecting..

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

todoButton.addEventListener('click', function (e) {
  e.preventDefault();

  // Create todo div.
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;

  saveLocalTodos(todoInput.value);
});

// Create a local storage for task.
function saveLocalTodos(todo) {
  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Adding it to the table.
function addTodo(todo) {
  renderTodos();
}

// Deleting it.
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
}

// Fungsi untuk merender daftar todo
function renderTodos() {
  todoTableBody.innerHTML = '';
  const filter = filterTodo.value;
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return todo.status === 'Completed';
    if (filter === 'Uncompleted') return todo.status === 'Uncompleted';
  });

  filteredTodos.forEach((todo) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${todo.text}</td>
        <td>${todo.status}</td>
        <td>
          <button onclick="deleteTodo(${todo.id})"><i class="fas fa-trash-alt"></i></button>
        </td>
      `;
    todoTableBody.appendChild(row);
  });
}
