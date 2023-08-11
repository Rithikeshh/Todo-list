
let input = document.querySelector('#todo-input');
let todoList = document.querySelector('#todo-list');
let addBtn = document.querySelector('#add-btn');

addBtn.addEventListener('click',()=>{

    if(input.value.trim() == ""){
        alert('Please Enter Something')
        return;
    }
    let listItem = create();
    todoList.appendChild(listItem);
    input.value="";
    saveData()
})

function create(){
    let task = input.value;
    let taskContainer = document.createElement('span');
    taskContainer.innerText = task;

    let checkbox = document.createElement('input');
    checkbox.setAttribute('type','checkbox');
    checkbox.classList.add('mark');

    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerText = 'x';

    let todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');

    todoItem.appendChild(checkbox);
    todoItem.appendChild(taskContainer)
    todoItem.appendChild(deleteBtn)
    return todoItem;

}
todoList.addEventListener('click',markComplete);

function markComplete(event){
    if(event.target.classList.contains('mark')){
        event.target.parentNode.classList.toggle('mark-complete');
        saveData()
    }
    else if(event.target.classList.contains('delete-btn')){
        event.target.parentNode.remove();
        saveData()
    }
    else if(event.target.tagName === "SPAN"){
        let target = event.target.parentNode.firstElementChild;
        
        if(target.checked){
            event.target.parentNode.classList.toggle('mark-complete');
            saveData()
            target.checked = false;
        }
        else{
            event.target.parentNode.classList.toggle('mark-complete');
            saveData()
            target.checked = true;
        }
    }

}

function saveData(){
    localStorage.setItem("data",todoList.innerHTML);
}
function showTask(){
    todoList.innerHTML = localStorage.getItem("data");
    let listItemArr = todoList.childNodes;
    if(listItemArr.length > 0){

        listItemArr.forEach(element => {
            if(element.classList.contains('mark-complete')){
                element.childNodes[0].checked = true;
            }
        })
    }
}
showTask();
