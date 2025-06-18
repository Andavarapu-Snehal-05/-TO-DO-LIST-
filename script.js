let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  const ul = document.getElementById("taskList");
  ul.innerHTML = "";

  taskList.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span onclick="toggleComplete(${index})">${task.text}</span>
      <div class="task-buttons">
        <button onclick="editTask(${index})">✏️</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;
    ul.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(taskList));
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text !== "") {
    taskList.push({ text, completed: false });
    input.value = "";
    renderTasks();
  }
}

function toggleComplete(index) {
  taskList[index].completed = !taskList[index].completed;
  renderTasks();
}

function deleteTask(index) {
  taskList.splice(index, 1);
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit your task", taskList[index].text);
  if (newText !== null && newText.trim() !== "") {
    taskList[index].text = newText.trim();
    renderTasks();
  }
}

renderTasks();
