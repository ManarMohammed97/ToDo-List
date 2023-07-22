const inputBox = document.getElementById("input-text");
const listContainer = document.getElementById("list-container");

// Funktion, um einen Task hinzuzufügen
function addTask() {
  if (inputBox.value === "") {
    alert("You must write something");
  } else {
    let liElement = document.createElement("li");
    liElement.textContent = inputBox.value;
    listContainer.appendChild(liElement);
    inputBox.value = "";

    liElement.onclick = function () {
      this.classList.toggle("checked");
      updateLocalStorage();
    };

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    span.className = "close";
    liElement.appendChild(span);

    span.onclick = function (event) {
      event.stopPropagation();
      this.parentElement.remove();
      updateLocalStorage();
    };

    updateLocalStorage();
  }
}

// Event Listener für die Enter-Taste im Eingabefeld
inputBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Funktion, um die Aufgaben in localStorage zu aktualisieren
function updateLocalStorage() {
  const tasks = listContainer.innerHTML;
  localStorage.setItem("tasks", tasks);
}

// Wenn die Seite geladen wird, füge der Liste vorhandene Aufgaben hinzu
window.onload = function () {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    listContainer.innerHTML = savedTasks;
  }

  const taskItems = document.querySelectorAll("li");
  for (const item of taskItems) {
    item.onclick = function () {
      this.classList.toggle("checked");
      updateLocalStorage();
    };

    const closeButton = item.querySelector(".close");
    closeButton.onclick = function (event) {
      event.stopPropagation();
      this.parentElement.remove();
      updateLocalStorage();
    };
  }
};
