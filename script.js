const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const filterTodo = document.getElementById('filter-todo');

function addTask() {
  if (inputBox.value === '') {
    alert('Ketik sesuatu dulu!');
  } else {
    let li = document.createElement('li');
    const inputBox = document.getElementById('input-box');
    const listContainer = document.getElementById('list-container');
    const filterTodo = document.querySelector('.filter-todo');

    function addTask() {
      if (inputBox.value === '') {
        alert('Ketik sesuatu dulu!');
      } else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);
      }
      inputBox.value = '';
      saveData();
    }

    listContainer.addEventListener(
      'click',
      function (e) {
        if (e.target.tagName === 'LI') {
          e.target.classList.toggle('checked');
          saveData();
        } else if (e.target.tagName === 'SPAN') {
          e.target.parentElement.remove();
          saveData();
        }
      },
      false
    );

    function saveData() {
      localStorage.setItem('data', listContainer.innerHTML);
    }

    function showTask() {
      listContainer.innerHTML = localStorage.getItem('data');
      filterTasks(); // Apply filter when loading tasks
    }
    showTask();

    filterTodo.addEventListener('change', filterTasks);

    function filterTasks() {
      const filterValue = filterTodo.value;
      const tasks = listContainer.getElementsByTagName('LI');

      for (let task of tasks) {
        switch (filterValue) {
          case 'All':
            task.style.display = 'list-item';
            break;
          case 'Completed':
            if (task.classList.contains('checked')) {
              task.style.display = 'list-item';
            } else {
              task.style.display = 'none';
            }
            break;
          case 'Uncompleted':
            if (!task.classList.contains('checked')) {
              task.style.display = 'list-item';
            } else {
              task.style.display = 'none';
            }
            break;
        }
      }
    }

    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement('span');
    span.innerHTML = '\u00d7';
    li.appendChild(span);
  }
  inputBox.value = '';
  saveData();
}

listContainer.addEventListener(
  'click',
  function (e) {
    if (e.target.tagName === 'LI') {
      e.target.classList.toggle('checked');
      saveData();
    } else if (e.target.tagName === 'SPAN') {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem('data', listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem('data');
}
showTask();

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
