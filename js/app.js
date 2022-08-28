// Variables

var form = document.querySelector('.form-todo');
var todo_ipt = document.querySelector('.todo-ipt');
var todo_ipt_content = document.querySelector('.todo-ipt').value;
var icon_addList = document.querySelector('.icon-add-list');
var list_todo = document.querySelector('.list-todo');
var list_todo_element = document.querySelectorAll('.list-todo li');
// let tasks = [];
let tasks = [
    {"id": 1, "task": "Complete online JavaScript course"},
    {"id": 2, "task": "Jog around the park 3x"},
    {"id": 3, "task": "10 minutes meditation"},
    {"id": 4, "task": "Read for 1 hour"},
    {"id": 5, "task": "Pick up groceries"},
    {"id": 6, "task": "Complete Todo App on Frontend Mentor"},
];



// Events
loadEventListeners();


function loadEventListeners() {

    todo_ipt.addEventListener('mouseover', showIcon);
    todo_ipt.addEventListener('mouseout', hideIcon);
    icon_addList.addEventListener('mouseover', showIcon);
    form.addEventListener('submit', addList);
    list_todo.addEventListener('click', removeElement);
    list_todo.addEventListener('click', taskComplete);

    document.addEventListener('DOMContentLoaded', load_listHTML);
}


// Functions

// Add list
function addList(e) {

    e.preventDefault();

    // Task user 
    let task = document.querySelector('.todo-ipt').value;

    if (!todo_ipt.value == '') {
        
        lastValue = Object.values(tasks).pop();
        lastValue = lastValue == undefined ? lastValue = 1 : lastValue.id + 1;
        
        const taskObj = {
            id: lastValue,
            task: task
        }

        // Add array tasks
        tasks = [...tasks, taskObj];

        // create Tasks HTML
        create_taskHTML();

        // Refresh count list
        count_elementList();

        form.reset();

    }
    

}

function create_taskHTML() {
    
    cleanHTML();

    if (tasks.length > 0) {

        tasks.forEach(task => {

            // Container element
            let li = document.createElement('li');
            li.classList.add('element');

            // Container text and icon circle element li 
            let div = document.createElement('div');
            div.classList.add('first-element');

            // Text and icon circle element li
            let spanCircle = document.createElement('span');
            let spanList = document.createElement('span');

            spanCircle.classList.add('circle');
            spanList.classList.add('list');

            // Icon delete
            let imgCross = document.createElement('img');
            imgCross.src = "./images/icon-cross.svg";
            imgCross.classList.add('img_cross');

            // Remove element
            imgCross.onclick = () => {
                removeElement(task.id);
                create_taskHTML();
            }

            li.appendChild(div);
            div.appendChild(spanCircle);
            spanList.append(task.task);
            div.appendChild(spanList);
            li.appendChild(imgCross);
            list_todo.appendChild(li);

            
        });
    }
    syncStorage();
    count_elementList();
    
}

// Remove element
function removeElement(id) {

    tasks = tasks.filter ( task => task.id !== id);
    
}


// Task Complete
function taskComplete(e) {

    e.preventDefault();

    let elementTask = e.target.parentElement.parentElement;

    if (e.target.classList.contains('circle') && !e.target.classList.contains('active')) {
        

        elementTask.classList.add('completed');
        e.target.classList.add('active');
        e.target.nextElementSibling.style.textDecoration = 'line-through';
        e.target.nextElementSibling.style.color = '#777A92';
        e.target.style.background = 'linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%));';

        count_elementList();

    } else {
        if (e.target.classList.contains('active') && elementTask.classList.contains('completed')) {

            elementTask.classList.remove('completed');
            e.target.classList.remove('active');
            e.target.nextElementSibling.style.textDecoration = 'initial';
            e.target.nextElementSibling.style.color = '';

            count_elementList();
        }
    }


}

// Add task to localStorage
function syncStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//  Load localStorage to HTML
function load_listHTML() {
    
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    create_taskHTML();
}

// Count list active
count_elementList();

function count_elementList() {

    let elementList = document.querySelector('.item-count-left');
    let listProcess = document.querySelectorAll('li:not(.completed)').length;

    elementList.innerHTML = `${listProcess} items left`;

}

// Show / hide icon list
function showIcon() {
    icon_addList.style.display = 'block';
}

function hideIcon() {
    icon_addList.style.display = 'none';
}


// Clean HTML
function cleanHTML() {
    while (list_todo.firstChild) {
        list_todo.removeChild(list_todo.firstChild);
    }
}