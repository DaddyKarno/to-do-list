const InputElement = document.getElementById("searchInput");
const addBtn = document.getElementById("addTaskButton");
const listElement = document.getElementById("listTask");
const completeBtn = document.getElementById("cmpltBtn");
const editBool = false;
let test = [];
let notes = [];
function render() {
  listElement.innerHTML = "";
  test = JSON.parse(localStorage.getItem("Note"));
  if (notes.length === 0) {
    listElement.innerHTML = '<p><img src="images/empty.png"></p>';
  }
  if (notes.length > 0) {
    localStorage.setItem("Note", JSON.stringify(notes) || "[]");
  } else if (notes.length === 0) {
    localStorage.setItem("Note", JSON.stringify(notes) || "[]");
  }
  for (let i = 0; i < notes.length; i++) {
    listElement.insertAdjacentHTML("beforeend", getTask(notes[i], i));
  }
}
addBtn.onclick = async function () {
  if (InputElement.value.length === 0) {
    return;
  }
  let newNote = {
    title: InputElement.value,
    completed: false,
  };

  const { ...contact } = newNote;
  const newServerTask = await request("/api/contacts", "POST", contact);
  notes.push(newServerTask);
  render();
  InputElement.value = "";
};
listElement.onclick = async function (event) {
  if (event.target.dataset.index) {
    const index = parseInt(event.target.dataset.index);
    const type = event.target.dataset.type;
    if (type === "deleteBtn") {
      await request(`/api/contacts/${notes.id}`, "DELETE");
      notes.splice(index, 1);
      render();
    } else if (type === "cmpltBtn") {
      notes[index].completed = !notes[index].completed;
      render();
    } else if (type === "editBtn") {
      notes[
        index
      ].title = `<input id="editTask" type="text"></input><button id="confirmBtnId" class="confirmStyle" data-index="${index}" data-type="confirmBtn"></button>`;
      render();
    } else if (type === "confirmBtn") {
      notes[index].title = document.getElementById("editTask").value;
      render();
    }
  }
};
function getTask(note, index) {
  return `
    <li class="listGroup">
    <button class=${
      note.completed ? "completedBtnTrue" : "completedBtnFalse"
    } data-index="${index}" data-type="cmpltBtn"></button>
    <span class=${note.completed ? "completedTasks" : "nameInputTask"}>${
    note.title
  }</span>
    <span>
      <button class="edit" data-index="${index}" data-type="editBtn"></button>
      <button class="delete"data-index="${index}" data-type="deleteBtn"></button>
    </span>
  </li>
      `;
}
async function loadPage() {
  /*  for (let i = 0; i < test.length; i++) {
    notes.push(test[i]);
  } */
  serverNotes = [];
  serverNotes = await request("/api/contacts");
  for (let i = 0; i < serverNotes.length; i++) {
    notes.push(serverNotes[i]);
  }
  render();
}
async function request(url, method = "GET", data = null) {
  try {
    const headers = {};
    let body;
    if (data) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(data);
    }
    const response = await fetch(url, {
      method,
      headers,
      body,
    });
    return await response.json();
  } catch (error) {
    console.warn("Error", error.message);
  }
}
render();
window.onload = loadPage();
