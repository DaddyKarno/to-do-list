const InputElement = document.getElementById("searchInput");
const addBtn = document.getElementById("addTaskButton");
const listElement = document.getElementById("listTask");
const completeBtn = document.getElementById("cmpltBtn");
const editBool = false;
let notes = [];
function render() {
  listElement.innerHTML = "";
  if (notes.length === 0) {
    listElement.innerHTML = '<p><img src="images/empty.png"></p>';
  }
  for (let i = 0; i < notes.length; i++) {
    listElement.insertAdjacentHTML("beforeend", getTask(notes[i], i));
  }
  getItems();
}
addBtn.onclick = function () {
  if (InputElement.value.length === 0) {
    return;
  }
  let newNote = {
    title: InputElement.value,
    completed: false,
  };
  notes.push(newNote);
  render();
  InputElement.value = "";
};
listElement.onclick = function (event) {
  if (event.target.dataset.index) {
    const index = parseInt(event.target.dataset.index);
    const type = event.target.dataset.type;
    if (type === "deleteBtn") {
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
      console.log("a");
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
function getItems() {
  localStorage.setItem("Note", JSON.stringify(notes));
}

render();
