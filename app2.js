document.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoTableBody = document
    .getElementById('todo-table')
    .querySelector('tbody');
  const filterTodo = document.getElementById('filter-todo');

  let todos = [];

  // Fungsi untuk menambahkan todo ke daftar
  function addTodo(text, status) {
    const todo = {
      id: Date.now(),
      text,
      status,
    };
    todos.push(todo);
    renderTodos();
  }

  // Fungsi untuk menghapus todo dari daftar
  function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    renderTodos();
  }

  // Fungsi untuk mengganti status todo
  function toggleTodoStatus(id) {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      todo.status = todo.status === 'Completed' ? 'Uncompleted' : 'Completed';
    }
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

  // Event listener untuk form submit
  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    const status = filterTodo.value;
    if (text !== '') {
      addTodo(text, status);
      todoInput.value = '';
      todoInput.focus();
    }
  });

  // Event listener untuk filter todo
  filterTodo.addEventListener('change', renderTodos);

  // Membuat fungsi deleteTodo dan toggleTodoStatus global agar bisa diakses dari tombol hapus dan checkbox
  window.deleteTodo = deleteTodo;
  window.toggleTodoStatus = toggleTodoStatus;
});
