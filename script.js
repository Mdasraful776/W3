// ============================
// ELEMENTS
// ============================

const menuButton = document.getElementById("menuButton");
const sidebar = document.getElementById("sidebar");

const themeButton = document.getElementById("themeButton");

const notificationButton =
    document.getElementById("notificationButton");

const newProjectButton =
    document.getElementById("newProjectButton");

const projectModal =
    document.getElementById("projectModal");

const closeButton =
    document.getElementById("closeButton");

const createProjectButton =
    document.getElementById("createProjectButton");

const projectName =
    document.getElementById("projectName");

const projectList =
    document.getElementById("projectList");

const projectNumber =
    document.getElementById("projectNumber");

const taskInput =
    document.getElementById("taskInput");

const addTaskButton =
    document.getElementById("addTaskButton");

const taskList =
    document.getElementById("taskList");

const taskNumber =
    document.getElementById("taskNumber");

const searchInput =
    document.getElementById("searchInput");

const toast =
    document.getElementById("toast");


// ============================
// SIDEBAR
// ============================

menuButton.addEventListener("click", function () {

    sidebar.classList.toggle("open");

});


// ============================
// DARK MODE
// ============================

function loadTheme() {

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        themeButton.textContent =
            "☀️ Light Mode";

    }

}


themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    const darkMode =
        document.body.classList.contains("dark");

    if (darkMode) {

        themeButton.textContent =
            "☀️ Light Mode";

        localStorage.setItem(
            "theme",
            "dark"
        );

    } else {

        themeButton.textContent =
            "🌙 Dark Mode";

        localStorage.setItem(
            "theme",
            "light"
        );

    }

});


loadTheme();


// ============================
// TOAST
// ============================

let toastTimer;

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function () {

        toast.classList.remove("show");

    }, 2500);

}


// ============================
// NOTIFICATION
// ============================

notificationButton.addEventListener(
    "click",
    function () {

        showToast(
            "You have 3 new notifications 🔔"
        );

    }
);


// ============================
// PROJECT MODAL
// ============================

newProjectButton.addEventListener(
    "click",
    function () {

        projectModal.classList.add("show");

        projectName.focus();

    }
);


closeButton.addEventListener(
    "click",
    function () {

        projectModal.classList.remove("show");

    }
);


projectModal.addEventListener(
    "click",
    function (event) {

        if (event.target === projectModal) {

            projectModal.classList.remove("show");

        }

    }
);


// ============================
// CREATE PROJECT
// ============================

createProjectButton.addEventListener(
    "click",
    function () {

        const name =
            projectName.value.trim();

        if (name === "") {

            showToast(
                "Please enter a project name"
            );

            return;
        }


        const project = document.createElement("div");

        project.className = "project";

        project.innerHTML = `
            <div class="project-left">

                <div class="project-icon">
                    💻
                </div>

                <div>
                    <strong>${name}</strong>
                    <p>New Project</p>
                </div>

            </div>

            <div class="progress-area">

                <span>0%</span>

                <div class="progress">
                    <div style="width: 0%;"></div>
                </div>

            </div>
        `;

        projectList.appendChild(project);


        const currentNumber =
            Number(projectNumber.textContent);

        projectNumber.textContent =
            currentNumber + 1;


        projectName.value = "";

        projectModal.classList.remove("show");

        showToast(
            "Project created successfully!"
        );

    }
);


// ============================
// TASK COUNT
// ============================

function updateTaskNumber() {

    const tasks =
        taskList.querySelectorAll(".task");

    taskNumber.textContent =
        tasks.length;

}


updateTaskNumber();


// ============================
// ADD TASK
// ============================

function addTask() {

    const text =
        taskInput.value.trim();

    if (text === "") {

        showToast(
            "Please enter a task"
        );

        return;
    }


    const task =
        document.createElement("label");

    task.className = "task";

    task.innerHTML = `
        <input type="checkbox">

        <span>${text}</span>
    `;


    taskList.appendChild(task);

    taskInput.value = "";

    updateTaskNumber();

    showToast(
        "Task added successfully!"
    );

}


addTaskButton.addEventListener(
    "click",
    addTask
);


taskInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            addTask();

        }

    }
);


// ============================
// SEARCH
// ============================

searchInput.addEventListener(
    "input",
    function () {

        const searchText =
            searchInput.value.toLowerCase().trim();

        const projects =
            projectList.querySelectorAll(".project");


        projects.forEach(function (project) {

            const projectText =
                project.textContent.toLowerCase();


            if (
                projectText.includes(searchText)
            ) {

                project.style.display = "flex";

            } else {

                project.style.display = "none";

            }

        });

    }
);


// ============================
// KEYBOARD ESCAPE
// ============================

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            projectModal.classList.remove("show");

        }

    }
);