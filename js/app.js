// Variables

var form = document.querySelector('.form-todo');
var todo_ipt = document.querySelector('.todo-ipt');
var todo_ipt_content = document.querySelector('.todo-ipt').value;
var icon_addList = document.querySelector('.icon-add-list');
var list_todo = document.querySelector('.list-todo');
var list_todo_element = document.querySelectorAll('.list-todo li');


let tasks = [];
// let tasks = [
//     {"id": 1, "task": "Complete online JavaScript course"},
//     {"id": 2, "task": "Jog around the park 3x"},
//     {"id": 3, "task": "10 minutes meditation"},
//     {"id": 4, "task": "Read for 1 hour"},
//     {"id": 5, "task": "Pick up groceries"},
//     {"id": 6, "task": "Complete Todo App on Frontend Mentor"},
// ];




// Events
loadEventListeners();


function loadEventListeners() {

    todo_ipt.addEventListener('mouseover', showIcon);
    todo_ipt.addEventListener('mouseout', hideIcon);
    icon_addList.addEventListener('mouseover', showIcon);
    form.addEventListener('submit', addList);
    list_todo.addEventListener('click', removeElement);

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
            task: task,
            completed: false
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
            spanCircle.onclick = () => {
                
                if (!task.completed) {
                    
                    task.completed = true;
                    syncStorage();
                    style_taskCompleted(spanCircle, spanList);
                    
                
                } else {
                    task.completed = false;
                    syncStorage();
                    style_taskCompleted(spanCircle, spanList);
                    
                }    
            }

            // RESET STYLE ELEMENT AFTER LOADED DOM
            task.completed == true ? style_taskCompleted(spanCircle, spanList) : ''
    


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


// Style tasks completed
function style_taskCompleted(circle, list) {
    
    if (!circle.classList.contains("active") ) {

        circle.classList.add('active');
        list.classList.add('completed_task');

        // STYLE CIRCLE BG & TASK COMPLETED
        count_elementList();
        
    } else {
        circle.classList.remove('active');
        list.classList.remove('completed_task');
        list.style.textDecoration = '';
    
        count_elementList();
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
    let listProcess = document.querySelectorAll('span.circle:not(.active)').length -1;

    elementList.innerHTML = `${listProcess} items left`;

}

// Show / hide icon list
function showIcon() {
    icon_addList.style.display = 'block';
}

function hideIcon() {
    icon_addList.style.display = 'none';
}


darkMode();
// Dark Mode
function darkMode() {

    // const preferenceDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    
    // if (preferenceDarkMode.matches) {
    //     document.body.classList.add('dark-mode');
    // } else {
    //     document.body.classList.remove('dark-mode');
    // }

    // preferenceDarkMode.addEventListener('change', function() {
    //     if (preferenceDarkMode.matches) {
    //         document.body.classList.add('dark-mode');
    //     } else {
    //         document.body.classList.remove('dark-mode');
    //     }
    // })

    const btnDarkMode = document.querySelector('.moon-mode-boton');
    const btnLight = document.querySelector('.light-mode-boton');

    
    btnDarkMode.addEventListener('click', function() {
        
        btnDarkMode.style.display = 'none';
        btnLight.style.display = 'block';
        document.body.classList.toggle('dark-mode');
        
    });

    btnLight.addEventListener('click', function () {
        
        btnLight.style.display = '';
        btnDarkMode.style.display = 'block';
        document.body.classList.toggle('dark-mode');
        
    })
   
}

// Clean HTML
function cleanHTML() {
    while (list_todo.firstChild) {
        list_todo.removeChild(list_todo.firstChild);
    }
}
