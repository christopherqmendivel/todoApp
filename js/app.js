// Variables

var form = document.querySelector('.form-todo');
var todo_ipt = document.querySelector('.todo-ipt');
let todo_ipt_content = document.querySelector('.todo-ipt').value;
var icon_addList = document.querySelector('.icon-add-list');
var list_todo = document.querySelector('.list-todo');
var list_todo_element = document.querySelectorAll('.list-todo li');



window.addEventListener('DOMContentLoaded', () => {

    // Events
    loadEventListeners();
    count_elementList();

});


function loadEventListeners() {

    todo_ipt.addEventListener('mouseover', showIcon);
    todo_ipt.addEventListener('mouseout', hideIcon);
    icon_addList.addEventListener('mouseover', showIcon);
    form.addEventListener('submit', addList);
    list_todo.addEventListener('click', removeElement);
    list_todo.addEventListener('click', taskComplete);

}


// Functions

// Add list
function addList(e) {

    e.preventDefault();

    if (!todo_ipt.value == '') {
        let li = document.createElement('li');
        li.classList.add('element');

        let div = document.createElement('div');
        div.classList.add('first-element');

        let spanCircle = document.createElement('span');
        let spanList = document.createElement('span');

        spanCircle.classList.add('circle');
        spanList.classList.add('list');

        let imgCross = document.createElement('img');
        imgCross.src = "../images/icon-cross.svg";
        imgCross.classList.add('img_cross');

        li.appendChild(div);
        div.appendChild(spanCircle);
        spanList.append(todo_ipt.value);
        div.appendChild(spanList);
        li.appendChild(imgCross);
        list_todo.appendChild(li);


        // Refresh count list
        count_elementList();

        form.reset();
    }
}

// Remove element
function removeElement(e) {

    e.target.classList.contains('img_cross') ? e.target.parentElement.remove() : '';

    // Refresh count list
    count_elementList();
}


// Task Complete
function taskComplete(e) {

    let elementTask = e.target.parentElement.parentElement;


    if (e.target.classList.contains('circle') && !e.target.classList.contains('active')) {

        elementTask.classList.add('completed');
        e.target.classList.add('active');
        e.target.nextElementSibling.style.textDecoration = 'line-through';
        e.target.nextElementSibling.style.color = '#777A92';

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


// Count list active
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