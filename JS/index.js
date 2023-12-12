
//taskManage
//獲取頁面元素
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

let tasks= [];

//處理提交表單事件
function addTask(event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if( taskText !== '') {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(task);
        renderTasks();
        taskInput.value = '';
    }
}

//渲染任務表
function renderTasks(){
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.dataset.id = task.id;

        taskItem.innerHTML = `
            <input type="checkbox" data-id="${task.id}" /> 
            <span>${task.text}</span>
            <button class="delete-btn">刪除</button>
        `;
        
        if (task.completed) {
            taskItem.classList.add('completed');
        }

        taskList.appendChild(taskItem);
    });

    const deleteBtn = document.querySelectorAll('.delete-btn');

    deleteBtn.forEach( button => {
        button.addEventListener('click', deleteTask)
    });
}

//切換任完成的狀態
function toggleTaskCompleted(event) {
    const taskId = parseInt(event.target.parentNode.dataset.id);
    const taskIndex = tasks.findIndex( task => task.id === taskId );

    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    renderTasks();
}

//刪除任務
function deleteTask(event) {
    const taskId = parseInt(event.currentTarget.parentNode.dataset.id);
    console.log('delete task with id', taskId);
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}

//監聽表單提交事件
taskForm.addEventListener('submit', addTask);