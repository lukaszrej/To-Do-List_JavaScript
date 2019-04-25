// f u n c t i o n s

// Validate input
var validateInput = function (inputValue) {
    if (inputValue.value === '') {
        alert('Write something!');
        return false;
    } else if (inputValue.value.length < 5 || inputValue.value.length > 100) {
        alert('Be specific, use between 5 to 100 characters to describe your task!');
        return false;
    }

    return true;
};

// Add new list item
var addNewListItem = function (taskInput) {
    var taskList = document.getElementById('taskList');

    if (validateInput(taskInput)) {

        // creating two flexible divs
        var task = document.createElement('div');
        task.classList.add("task");
        var buttonContainer = document.createElement('div');
        buttonContainer.classList.add("buttons");

        // creating text for the task (as taskTitle)
        var taskTitle = document.createElement('h2');
        taskTitle.classList.add('to-do');
        taskTitle.innerHTML = taskInput.value;

        // creating buttons
        // editButton
        var editButton = document.createElement("button");
        editButton.classList.add("edit");
        var editIcon = document.createElement('i');
        editIcon.classList.add("fas", "fa-edit");
        editIcon.style.fontWeight = "300";
        editButton.addEventListener('click', function () {
            editTask(this);
        });

        // completeButton
        var completeButton = document.createElement("button");
        completeButton.classList.add('complete');
        var completeIcon = document.createElement('i');
        completeIcon.innerHTML = "done";
        completeIcon.classList.add('material-icons');
        completeButton.addEventListener('click', function () {
            markAsCompleted(this);
        });

        // deleteButton
        var deleteButton = document.createElement("button");
        deleteButton.classList.add('close');
        var deleteIcon = document.createElement('i');
        deleteIcon.innerHTML = "delete";
        deleteIcon.classList.add('material-icons');
        deleteButton.addEventListener('click', function () {
            deleteFromList(this);
        });

        // creating new li (as container for flexible divs and their content)
        var newLi = document.createElement('li');
        newLi.classList.add('item-container', 'tracking-in-contract');

        // appending
        // appending task title and star/edit buttons to the task
        task.appendChild(taskTitle);
        task.appendChild(editButton);

        // appending icons to the buttons
        editButton.appendChild(editIcon);
        completeButton.appendChild(completeIcon);
        deleteButton.appendChild(deleteIcon);

        // appending sub-button-containers to the button-container
        buttonContainer.appendChild(completeButton);
        buttonContainer.appendChild(deleteButton);

        // appending the button-container and new-task to the list-item
        newLi.appendChild(task);
        newLi.appendChild(buttonContainer);

        // appending list-item to the list
        taskList.appendChild(newLi);

    }

    taskInput.value = "";
    updateCounter();
};

// Count to-dos
var updateCounter = function () {
    var finishedTasksCounter = 0;
    var counter = document.getElementsByClassName('to-do').length;
    var counterElement = document.getElementsByClassName('to-do');
    var counterToDisplay = document.getElementById('toFinish');

    for (var i = 0; i < counter; i++) {
        var counterClasses = counterElement[i].classList;
        for (var j = 0; j < counterClasses.length; j++) {
            if (counterClasses[j] === "done") {
                finishedTasksCounter++;
            }
        }
    }

    counter = counter - finishedTasksCounter;
    counterToDisplay.innerHTML = counter;
};

// Edit task
var editTask = function (button) {

    // non-editable edit-button
    button.setAttribute('contenteditable', 'false');

    // editable / non-editable task
    var div = button.parentElement;

    // allow / don't allow to edit task
    if (button.firstChild.classList.value === "fas fa-edit") {
        // change the icons
        button.firstChild.classList.remove("fa-edit");
        button.firstChild.classList.add("fa-save");
        // make the task editable
        div.setAttribute('contenteditable', 'true');
    } else if (button.firstChild.classList.value === "fas fa-save") {
        // change the icons
        button.firstChild.classList.remove("fa-save");
        button.firstChild.classList.add("fa-edit");
        // make the task non-editable
        div.setAttribute('contenteditable', 'false');
    }

};

// Mark as completed
var markAsCompleted = function (button) {
    var divText = button.parentElement.parentElement.querySelector('h2');

    var editIcon = button.parentElement.previousElementSibling.querySelector('.edit i');
    divText.classList.toggle('done');
    var divTask = divText.parentElement.parentElement;
    if (divTask.firstElementChild.hasAttribute('contenteditable')) {
        divTask.firstElementChild.setAttribute('contenteditable', 'false');
        editIcon.classList.remove('fa-save');
        editIcon.classList.add('fa-edit');
    }

    // if item is marked as completed remove the edit button
    var editButtonToRemove = divText.nextElementSibling;
    editButtonToRemove.classList.toggle('none');

    updateCounter();
};

// Delete an item from the list
var deleteFromList = function (button) {
    var div = button.parentElement.parentElement;
    div.remove();

    updateCounter();
};

// Delete all completed items
var deleteAllItems = function () {
    var taskList = document.getElementById('taskList');
    var completedLis = taskList.querySelectorAll('.done');

    for (var i = 0; i < completedLis.length; i++) {
        completedLis[i].parentElement.parentElement.remove();
    }

    updateCounter();

};

// Find task
var findTask = function (button, oldItemsArray) {
    var taskList = document.getElementById('taskList');
    var li = taskList.querySelectorAll('li');
    var inputSearchElement = document.querySelector('#search');
    var inputSearchValue = inputSearchElement.value;
    var foundedValue = "";

    if (button.innerText === "Find") {
        for (var i = 0; i < li.length; i++) {

            oldItemsArray.push(li[i]);

            var taskText = li[i].querySelector('.to-do').innerHTML.toLowerCase();

            if (taskText === inputSearchValue.toLowerCase()) {
                foundedValue = li[i];
                button.innerHTML = "Show all";
            } else {
                li[i].remove();
            }
        }

        taskList.appendChild(foundedValue);
        updateCounter();

    } else if (button.innerText === "Show all") {
        for (var i = 0; i < oldItemsArray.length; i++) {
            taskList.appendChild(oldItemsArray[i]);
        }

        button.innerHTML = "Find";
        updateCounter();
    }
};

// Sort tasks
var sortTasks = function (button, oldItemsArray) {
    var taskList = document.getElementById('taskList');
    var lis = taskList.querySelectorAll('.item-container');

    if (button.innerText === 'SORT') {
        var labels = [];

        for (var i = 0; i < lis.length; i++) {
            var currentLis = lis[i].querySelector('h2').innerText.toLowerCase();
            labels.push(currentLis);

            var sortedLabels = labels.sort();
        }

        for (var i = 0; i < sortedLabels.length; i++) {
            for (var j = 0; j < lis.length; j++) {

                oldItemsArray.push(lis[i]);

                if (sortedLabels[i] === lis[j].querySelector('h2').innerText.toLowerCase()) {
                    taskList.appendChild(lis[j]);
                }
            }
        }

        button.innerText = "UNSORT";

    } else if (button.innerText === 'UNSORT') {
        for (var i = 0; i < lis.length; i++) {
            lis[i].remove();
        }

        for (var i = 0; i < oldItemsArray.length; i++) {
            taskList.appendChild(oldItemsArray[i]);
        }

        oldItemsArray = [];

        button.innerText = 'SORT';

    }
};


// m a i n
document.addEventListener("DOMContentLoaded", function () {
    // v a r i a b l e s
    var taskInput = document.getElementById('taskInput');
    var addTaskButton = document.getElementById('addTaskButton');
    var searchButton = document.querySelector('.searchButton');
    var sortButton = document.querySelector('#sort');
    var removeAllButton = document.getElementById('removeFinishedTasksButton');
    var oldItems = [];

    // Create a new list item
    addTaskButton.addEventListener('click', function () {
       addNewListItem(taskInput);
    });

    // Sort tasks
    sortButton.addEventListener('click', function () {
        sortTasks(this, oldItems);
    });

    // Search tasks
    searchButton.addEventListener('click', function () {
        var inputSearchElement = document.querySelector('#search');

        if (validateInput(inputSearchElement)) {
            findTask(searchButton, oldItems);
        }
    });

    // Delete all completed items
    removeAllButton.addEventListener('click', function () {
        deleteAllItems();
    });

    updateCounter();

});