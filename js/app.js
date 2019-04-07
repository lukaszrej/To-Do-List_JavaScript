document.addEventListener("DOMContentLoaded", function () {

    // v a r i a b l e s
    var taskInput = document.getElementById('taskInput');

    var taskList = document.getElementById('taskList');
    var addTaskButton = document.getElementById('addTaskButton');

    var counterDisplay = document.getElementById('toFinish');

    var editButtons = document.getElementsByClassName('edit');
    var completeButton = document.getElementsByClassName('complete');
    var deleteButton = document.getElementsByClassName('close');

    var removeAll = document.getElementById('removeFinishedTasksButton');

    var searchButton = document.querySelector('.searchButton');
    var foundedValue = "";


    // f u n c t i o n s

    // Validate input
    var validateInput = function(inputValue) {
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

        counterDisplay.innerHTML = counter;
    };

    // Edit task
    var editTask = function () {
        for (var i=0; i<editButtons.length; i++) {
            editButtons[i].onclick = function () {

                // non-editable edit-button
                this.setAttribute('contenteditable', 'false');

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
        for (var i=0; i < completeButton.length; i++) {
            completeButton[i].onclick = function () {
                var divText = this.parentElement.parentElement.querySelector('h2');

                var editIcon = this.parentElement.previousElementSibling.querySelector('.edit i');
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
            }
        }
    };

    // Delete an item from the list
    var deleteFromList = function() {
        for (var i = 0; i < deleteButton.length; i++) {
            deleteButton[i].onclick = function() {
                var div = this.parentElement.parentElement;
                div.remove();

                updateCounter();
            }
        }
    };

    // Delete all completed items
    var deleteAllItems = function() {
        removeAll.addEventListener('click', function () {
            var completedLis = taskList.querySelectorAll('.done');

            for (var i=0; i<completedLis.length; i++) {
                completedLis[i].parentElement.parentElement.remove();
            }

            updateCounter();
        });

    };

    // Find task
    var findTask = function() {
        searchButton.addEventListener('click', function(e){
            e.preventDefault();

            var li = taskList.querySelectorAll('li');
            var inputSearchElement = document.querySelector('#search');
            var inputSearchValue = inputSearchElement.value;

            for(var i=0; i<li.length; i++){

                var taskText = li[i].querySelector('.to-do').innerHTML.toLowerCase();

                    if(taskText === inputSearchValue.toLowerCase()){
                        foundedValue = li[i];
                        this.innerHTML = "Show all";
                    }
            }

            taskList.appendChild(foundedValue);
            updateCounter();

        });


    };

    // Sort tasks
    var sortTasks = function() {
        var lis = document.querySelectorAll('.item-container');
        var ul = document.querySelector('#taskList');
        var sortButton = document.querySelector('#sort');

        var oldLis = [];
        for (var i=0; i<lis.length; i++) {
            oldLis.push(lis[i]);

        }
        console.log(lis);


        var labels = [];

        for (var i=0; i<lis.length; i++) {
            // oldLis.push(lis[i]);

            var currentLis = lis[i].querySelector('h2').innerText.toLowerCase();
            labels.push(currentLis);

            var sortedLabels = labels.sort();
        }

        // console.log(oldLis);





        if (sortButton.innerText === 'SORT') {


                for (var i=0; i<sortedLabels.length; i++) {
                    for (var j=0; j<lis.length; j++) {
                        if (sortedLabels[i] === lis[j].querySelector('h2').innerText.toLowerCase()) {
                            ul.appendChild(lis[j]);
                        }
                    }
                    // sortButton.innerHTML = "UNSORT";

                }

                sortButton.innerText = "UNSORT";


            } else if (sortButton.innerText === 'UNSORT') {

            console.log('ej ej')

                for (var i=0; i<lis.length; i++) {

                    oldLis.push(lis[i]);
                    // ul.appendChild(oldLis[i]);
                }

                sortButton.innerText = 'SORT';

        }

    };



    // m a i n


    // Create a new list item
    addTaskButton.addEventListener('click', function () {

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
            var buttonEdit = document.createElement("button");
            buttonEdit.classList.add("edit");
            var editIcon = document.createElement('i');
            editIcon.classList.add("fas", "fa-edit");
            editIcon.style.fontWeight = "300";

            // completeButton
            var completeButton = document.createElement("button");
            completeButton.classList.add('complete');
            var completeIcon = document.createElement('i');
            completeIcon.innerHTML = "done";
            completeIcon.classList.add('material-icons');
            completeButton.addEventListener('click', function () {
                markAsCompleted();
            });

            // deleteButton
            var deleteButton = document.createElement("button");
            deleteButton.classList.add('close');
            var deleteIcon = document.createElement('i');
            deleteIcon.innerHTML = "delete";
            deleteIcon.classList.add('material-icons');
            deleteButton.addEventListener('click', function () {
                deleteFromList();
                updateCounter();
            });

            // creating new li (as container for flexible divs and their content)
            var newLi = document.createElement('li');
            newLi.classList.add('item-container', 'tracking-in-contract');

            // appending
            // appending task title and star/edit buttons to the task
            task.appendChild(taskTitle);
            task.appendChild(buttonEdit);

            // appending icons to the buttons
            buttonEdit.appendChild(editIcon);
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

        markAsCompleted();
        deleteFromList();
        editTask();
        updateCounter();

    });



    var sortButton = document.querySelector('#sort');
    sortButton.addEventListener('click', function () {
        sortTasks();
    });


    findTask();
    deleteAllItems();
    updateCounter();

});
