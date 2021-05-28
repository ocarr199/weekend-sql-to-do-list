
console.log("js");

$(document).ready(function () {
  console.log("JQ");
  // load to-do list on page load
  getTasks();
  $('#addTaskButton').on('click', postTask)
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
    task: $('addTask').val()
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



