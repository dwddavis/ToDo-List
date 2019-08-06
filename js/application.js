
var update = function(){

  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=81',
    dataType: 'json',
    success: function (response, textStatus) {
      $('#todo-list').children().remove();

      response.tasks.forEach(function (task){
        $('#todo-list').append("<div class ='row items'><div class ='col-xs-9'><p class = 'item'>"+task.content+"</p></div><div class ='col-xs-3'><button onclick='removeItem(" +task.id+ ")'>REMOVE</button></div></div>");

      })
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });

}

var addTask = function(){
  var things = document.querySelector('input').value;

  $.ajax({
  type: 'POST',
  url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=81',
  contentType: 'application/json',
  dataType: 'json',
  data: JSON.stringify({
    task: {
      content: things
    }
  }),
  success: function (response, textStatus) {
    console.log(response);
  },
  error: function (request, textStatus, errorMessage) {
    console.log(errorMessage);
  }
});
update();
}

var removeItem = function (taskID){
  $.ajax({
    type: 'DELETE',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' +taskID+ '?api_key=81',
    success: function (response, textStatus) {
    console.log(response);
      },
      error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
  update();
}



    $(document).ready(function(){
      console.log('dom ready');
      update();
      });
