
console.log("js");

$(document).ready(function () {
  console.log("JQ");
  // load to-do list on page load
  getTasks();
  $('#addTaskButton').on('click', postTask)
  $('#showTasks').on('click', '.completedButton', handleComplete)
  $(document).on('click', '.deleteButton', handleDelete)

});


// get request to server
function getTasks() {
  console.log("in getTasks");
  // ajax call to server to get tasks
  $.ajax({
    method: 'GET',
    url: '/tasks'
  }).then( response => {
    // console log the response
    console.log(response);
    // clear dom before each append
    $('#showTasks').empty();
    $('#completeTasks').empty();
    // go through all rows in database
    for(let task of response){
      console.log(task.priority);
      // depending on value of task priority appendList will
      // get called with info, warning, or danger which will
      // be used to add different classes for background color
      switch(task.priority){
        case "Low":
          appendList(task, 'info')
          break;
          case "Medium":
            appendList(task, 'warning')
          break;
          case "High":
         appendList(task, 'danger')
            break;
      }
    }
  }).catch( err => {
    // console log the error
    console.log('Error in GET', err);
  });
} // END getTasks

// Function to append items to the DOM
function appendList(task, priorityClass){
    console.log(task.completed);
    // If task hasnt been completed go into current tasks
    // priorityClass is used to set background color
      if(task.completed == false){
        $('#showTasks').append(`
      <tr class="table-${priorityClass}"> 
          <td> ${task.task}</td>
          <td> ${task.priority}</td>
          <td><button class="completedButton" data-id="${task.id}">Completed</button></td>
          <td><button class="deleteButton" data-id="${task.id}">Delete</button></td>
        </tr>
      `)
          // If task has been completed go into completed tasks
      }else if (task.completed == true){
        $('#completeTasks').append(`
        <tr class="completedTask table-success"> 
            <td> ${task.task}</td>
            <td> ${task.priority}</td>
            <td><button class="deleteButton" data-id="${task.id}">Delete</button></td>
          </tr>
        `)
      }
     

}


function postTask() {
  console.log("in postTask");
  //post task to server
  // create new task object
  newTask = {
    task: $('#taskInp').val(),
    priority: $('#priorityInp option:selected').text()
  }

  $.ajax({
    type: 'POST',
    url: '/tasks',
    data: newTask,
    }).then(function(response) {
      console.log('Response from server.', response);
      getTasks();
    }).catch(function(error) {
      console.log('Error in POST', error)
      alert('Unable to add new Task');
    });
}

function handleComplete(){
  let id = $(this).data('id');
  completedTask(id);
}

function completedTask(taskId){
  $.ajax({
    method: 'PUT',
    url: `./tasks/${taskId}`
  }).then( (response) => {
    console.log('task completed update:', response);
    getTasks();
    console.log("completed");
}).catch(err =>{
    console.log('transfer was not updated' + err);
    alert('there was an error with updating')
})
}

function handleDelete(){
  let id = $(this).data('id');
  deleteTask(id)
}

function deleteTask(taskId){
  $.ajax({
    method: 'DELETE',
    url: `/tasks/${taskId}`,
  })
    .then((response) =>{
      console.log(`Deleted task with id ${taskId}`);
      getTasks();
    }).catch(error =>{
      console.log('transfer was not updated' + error);
      alert('there was an error with updating')
  })
}

