// f u n c t i o n s

// Validate input
function validateInput(inputValue) {

    if (inputValue.value === '') {
        alert('Write something!');
        return false;
    } else if (inputValue.value.length <5 || inputValue.value.length >100) {
        alert('Be specific, use between 5 to 100 characters to describe your task!');
        return false;
    }

    return true;
};

// Count to-dos
var updateCounter = function () {
    var finishedTasksCounter = 0;
    var counter = document.getElementsByClassName('to-do').length;
    var counterElement = document.getElementsByClassName('to-do');

    for (var i=0; i<counter; i++) {
        var counterClasses = counterElement[i].classList;
        for (var j=0; j<counterClasses.length; j++) {
            if (counterClasses[j] === "done" ) {
                finishedTasksCounter++;
            }
        }
    }

    counter = counter - finishedTasksCounter;

    var counterDisplay = document.getElementById('toFinish');
    counterDisplay.innerHTML = counter;
};

// Rate task
var rateTask = function () {

    var rateButton = document.querySelectorAll('.star_rate');
    var tab = [];

    for (var i=0; i < rateButton.length; i++) {
        rateButton[i].onclick = function () {
            var div = this.parentElement.parentElement;
            div.classList.toggle("important");
        }

    }

};

// Edit task
var editTask = function () {
    var editButtons = document.getElementsByClassName('edit');
    var rateButton = document.querySelectorAll('.star_rate');

    for (var i=0; i<editButtons.length; i++) {
        editButtons[i].onclick = function () {

            // non-editable edit- and rate-buttons
            this.setAttribute('contenteditable', 'false');
            var rateButton = this.previousElementSibling.previousElementSibling;
            rateButton.setAttribute('contenteditable', 'false');

            // editable / non-editable task
            var div = this.parentElement;

            // allow / don't allow to edit task
            if (this.firstChild.classList.value === "fas fa-edit") {
                // change the icons
                this.firstChild.classList.remove("fa-edit");
                this.firstChild.classList.add("fa-save");
                // make the task editable
                div.setAttribute('contenteditable', 'true');
            } else if (this.firstChild.classList.value === "fas fa-save") {
                // change the icons
                this.firstChild.classList.remove("fa-save");
                this.firstChild.classList.add("fa-edit");
                // make the task non-editable
                div.setAttribute('contenteditable', 'false');
            }

        };
    }
};

// Mark as completed
var markAsCompleted = function() {
    var completeButton = document.getElementsByClassName('complete');

    for (var i=0; i < completeButton.length; i++) {
        completeButton[i].onclick = function () {
            var divText = this.parentElement.parentElement.querySelector('h2');

            var editIcon = this.parentElement.previousElementSibling.querySelector('.edit i');
            divText.classList.toggle('done');
            var divTask = divText.parentElement.parentElement;
            if (divTask.firstElementChild.hasAttribute('contenteditable')) {
                divTask.firstElementChild.setAttribute('contenteditable', 'false');
                editIcon.classList.remove('fa-save')
                editIcon.classList.add('fa-edit')
            }

            // var changedIcon = this.firstElementChild;
            //
            // if (changedIcon.innerHTML === "check_circle") {
            //     console.log('ejjjj');
            //     changedIcon.innerHTML = "check_circle_outline";
            // } else {
            //     changedIcon.innerHTML = "check_circle";
            // }

            // if item is marked as completed remove the edit button
            var editButtonToRemove = divText.nextElementSibling;
            editButtonToRemove.classList.toggle('none');

            updateCounter();
        }
    }
};

// Delete an item from the list
var deleteFromList = function() {
    var deleteButton = document.getElementsByClassName('close');

    for (var i = 0; i < deleteButton.length; i++) {
        deleteButton[i].onclick = function() {
            var div = this.parentElement.parentElement;
            div.remove();

            updateCounter();
        }
    }
};

// Delete all completed items
var deletAllItems = function() {
    var removeAll = document.getElementById('removeFinishedTasksButton');
    var taskList = document.getElementById('taskList');

    removeAll.addEventListener('click', function () {
        var lis = taskList.querySelectorAll('.done');

        for (var i=0; i<lis.length; i++) {
            lis[i].parentElement.parentElement.remove();
        }

        updateCounter();
    });

};

// Find task
var findTask = function() {
    var searchButton = document.querySelector('.searchButton');
    var foundedValue = "";

    searchButton.addEventListener('click', function(e){
        var listElements = document.querySelector("#taskList");
        var li = listElements.querySelectorAll('li');
        var inputSearchElement = document.querySelector('#search');
        var inputSearchValue = inputSearchElement.value;

        for(var i=0; i<li.length;i++){

            // var taskText = li[i].innerHTML.toLowerCase();
            var taskText = li[i].querySelector('.to-do').innerHTML.toLowerCase();

                if(taskText === inputSearchValue.toLowerCase()){
                    foundedValue = li[i];
                    console.log(this.innerHTML = "Show all");
                } else {
                    li[i].remove();
                }



        }

        var li = document.querySelectorAll('li');

        // for(var i=0; i<li.length; i++){
        //     li[i].remove();
        //
        // };

        var ul = document.querySelector('ul');

        ul.appendChild(foundedValue);
        console.log(foundedValue);

    });
};



// m a i n

document.addEventListener("DOMContentLoaded", function () {
    var taskList = document.getElementById('taskList');
    var addTaskButton = document.getElementById('addTaskButton');

    editTask();
    markAsCompleted();
    deleteFromList();
    findTask();

    // Find task: working - raw form
    // var searchButton = document.querySelector('.searchButton');
    // var foundedValue = "";
    //
    // searchButton.addEventListener('click', function(e){
    //     var listElements = document.querySelector("#taskList");
    //     var li = listElements.querySelectorAll('.to-do');
    //     var inputSearchElement = document.querySelector('#search');
    //     var inputSearchValue = inputSearchElement.value;
    //
    //     for(var i=0; i<li.length;i++){
    //
    //         var taskText = li[i].innerHTML;
    //
    //         if(taskText === inputSearchValue){
    //          foundedValue = li[i];
    //         }
    //         console.log(e);
    //     }
    //
    //     console.log(foundedValue,'znalezione');
    //
    //     var li = document.querySelectorAll('li');
    //
    //     for(var i=0; i<li.length; i++){
    //         li[i].remove();
    //     };
    //
    //     var ul = document.querySelector('ul');
    //     ul.appendChild(foundedValue);
    //     console.log(foundedValue);
    //
    //     });


    // Create a new list item
    addTaskButton.addEventListener('click', function () {

        var inputValue = document.getElementById('taskInput');

        inputValue.value;

        if (validateInput(inputValue)) {

            // creating two flexible divs
            var task = document.createElement('div');
            task.classList.add("task");
            var buttonContainer = document.createElement('div');
            buttonContainer.classList.add("buttons");

            // creating text for the task (as taskTitle)
            var taskTitle = document.createElement('h2');
            taskTitle.classList.add('to-do');
            taskTitle.innerHTML = inputValue.value;

            // creating buttons
            // starButton
            var starButton = document.createElement('button');
            starButton.classList.add("star_rate");
            var starIcon = document.createElement('i');
            starIcon.innerHTML = "stars";
            starIcon.classList.add('material-icons');

            // editButton
            var buttonEdit = document.createElement("button");
            buttonEdit.classList.add("edit");
            var editIcon = document.createElement('i');
            editIcon.classList.add("fas", "fa-edit");
            editIcon.style.fontWeight = "300";

            // completeButton
            var newButtonComplete = document.createElement("button");
            newButtonComplete.classList.add('complete');
            var completeIcon = document.createElement('i');
            completeIcon.innerHTML = "done";
            completeIcon.classList.add('material-icons');
            newButtonComplete.addEventListener('click', function () {
                markAsCompleted();
            });

            // deleteButton
            var newButtonClose = document.createElement("button");
            newButtonClose.classList.add('close');
            var deleteIcon = document.createElement('i');
            deleteIcon.innerHTML = "delete";
            deleteIcon.classList.add('material-icons');
            newButtonClose.addEventListener('click', function () {
                deleteFromList();
                updateCounter();
            });

            // creating new li (as container for flexible divs and their content)
            var newLi = document.createElement('li');
            newLi.classList.add('item-container', 'tracking-in-contract');

            // appending
            // appending task title and star/edit buttons to the task
            task.appendChild(starButton);
            task.appendChild(taskTitle);
            task.appendChild(buttonEdit);

            // appending icons to the buttons
            starButton.appendChild(starIcon);
            buttonEdit.appendChild(editIcon);
            newButtonComplete.appendChild(completeIcon);
            newButtonClose.appendChild(deleteIcon);

            // appending sub-button-containers to the button-container

            buttonContainer.appendChild(newButtonComplete);
            buttonContainer.appendChild(newButtonClose);

            // appending the button-container and new-task to the list-item
            newLi.appendChild(task);
            newLi.appendChild(buttonContainer);

            // appending list-item to the list
            taskList.appendChild(newLi);

            rateTask();
            markAsCompleted();
            deleteFromList();
        }

        inputValue.value = "";

        updateCounter();
        editTask();

    });

    deletAllItems();
    updateCounter();

});