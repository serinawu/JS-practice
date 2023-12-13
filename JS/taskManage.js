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

    if( taskText != '') {
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

        const taskCheckBox = document.createElement('input');
        taskCheckBox.type ='checkbox';
        taskCheckBox.checked = task.completed;
        taskCheckBox.addEventListener('change', toggleTaskCompleted);

        //任務文字
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        
        //刪除按鈕
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '刪除';
        deleteBtn.addEventListener('click', deleteTask);
        
        
        if (task.completed) {
            taskItem.classList.add('completed');
        }

        taskItem.appendChild(taskCheckBox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);
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
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}

//監聽表單提交事件
taskForm.addEventListener('submit', addTask);


//預計改成類似google task
//可以新增子任務
//+拖曳排序
//已完成區 | 自動記數，原本的未完成區移除