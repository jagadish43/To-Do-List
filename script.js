document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    let editMode = false;
    let currentTaskItem = null;

    // Function to add a task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            if (editMode) {
                currentTaskItem.querySelector('.task-text').textContent = taskText;
                editMode = false;
                currentTaskItem = null;
                addTaskBtn.textContent = 'Add Task';
            } else {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';

                listItem.innerHTML = `
                    <input type="checkbox" class="task-checkbox">
                    <span class="task-text">${taskText}</span>
                    <div class="task-buttons">
                        <span class="edit-task"><i class="fas fa-edit"></i></span>
                        <span class="remove-task"><i class="fas fa-trash-alt"></i></span>
                    </div>
                `;

                taskList.appendChild(listItem);
            }

            taskInput.value = '';
        }
    }

    // Function to remove a task
    function removeTask(event) {
        if (event.target.closest('.remove-task')) {
            const taskItem = event.target.closest('li');
            taskList.removeChild(taskItem);
        }
    }

    // Function to edit a task
    function editTask(event) {
        if (event.target.closest('.edit-task')) {
            currentTaskItem = event.target.closest('li');
            taskInput.value = currentTaskItem.querySelector('.task-text').textContent;
            editMode = true;
            addTaskBtn.textContent = 'Update Task';
        }
    }

    // Function to mark a task as done
    function toggleTaskCompletion(event) {
        if (event.target.classList.contains('task-checkbox')) {
            const taskItem = event.target.closest('li');
            const taskText = taskItem.querySelector('.task-text');

            if (event.target.checked) {
                taskItem.classList.add('completed');
                taskText.textContent = `Done: ${taskText.textContent}`;
            } else {
                taskItem.classList.remove('completed');
                taskText.textContent = taskText.textContent.replace('Done: ', '');
            }
        }
    }

    // Event Listeners
    addTaskBtn.addEventListener('click', addTask);
    taskList.addEventListener('click', removeTask);
    taskList.addEventListener('click', editTask);
    taskList.addEventListener('change', toggleTaskCompletion);

    // Allow adding or updating tasks by pressing "Enter"
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
