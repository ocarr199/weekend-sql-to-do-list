
console.log("js");

$(document).ready(function () {
  console.log("JQ");
  // load to-do list on page load
  getTasks();
  $('#addTaskButton').on('click', postTask)
  $('#showTasks').on('click', '.completedButton', handleComplete)
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
    $('#showTasks').empty();
    for(let task of response){
      console.log(task);
      $('#showTasks').append(`
      <tr> 
          <td> ${task.task}</td>
          <td><button class="completedButton" data-id="${task.id}">Completed</button></td>
          <td><button class="deleteButton" data-id="${task.id}">Delete</button></td>
        </tr>
      `)
    }
 
  }).catch( err => {
    // console log the error
    console.log('Error in GET', err);
  });
} // END getTasks



function postTask() {
  console.log("in postTask");
  //post task to server
  // create new task object
  newTask = {
    task: $('#taskInp').val()
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
    console.log('transfer was not updated');
    alert('there was an error with updating')
})
}



