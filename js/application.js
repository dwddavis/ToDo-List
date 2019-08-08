
var update = function(){
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=81',
    dataType: 'json',
    success: function (response, textStatus) {
      $('#todo-list').children().remove();

      response.tasks.forEach(function (task){

        $('#todo-list').append("<div class ='row items'><div class='col-xs-1'><input type= 'checkbox'"+ marker(task.completed) +" onclick='markComplete(" + task.completed + ","+task.id+")'></div><div class ='col-xs-8'><p class = 'item'>"+task.content+"</p></div><div class ='col-xs-3'><button onclick='removeItem(" +task.id+ ")'>REMOVE</button></div></div>");
        console.log(marker(task.completed));
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
    update();
    console.log(response);
  },
  error: function (request, textStatus, errorMessage) {
    console.log(errorMessage);
  }
});
}

var removeItem = function (taskID){
  $.ajax({
    type: 'DELETE',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' +taskID+ '?api_key=81',
    success: function (response, textStatus) {
    update();
    console.log(response);
      },
      error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}


var marker = function(done){
  if(done === true){
    return "checked"
  }else{
    return "unchecked"
  }

}


var markComplete = function(status,taskID){
var completer;

    if(status === true){
      completer = 'mark_active'
    }else{
      completer ='mark_complete'
    }


$.ajax({
  type: 'PUT',
  url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + taskID +'/'+completer  +'?api_key=81',
  contentType: 'application/json',
  dataType: 'json',
  data: JSON.stringify({
    task: {
      completed: 'false'
    }
  }),
  success: function (response, textStatus) {
    console.log(response);
    update();
  },
  error: function (request, textStatus, errorMessage) {
    console.log(errorMessage);

  }

});

}


    $(document).ready(function(){
      console.log('dom ready');
      update();
      });









      /**
<div class = 'col-xs-1'></div><input type='checkbox' class='mark-complete' data-id=" + task.id + '"' + (task.completed ? 'checked' : '') + '>
      var completeTask = function(id){

        $.ajax({
        type: 'PUT',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' +id+ '/mark_complete?api_key=81',
        dataType: 'json',

        success: function (response, textStatus) {
          update();
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });
      }


      var activeTask = function (id) {
        $.ajax({
       type: 'PUT',
          url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=81',
          dataType: 'json',
          success: function (response, textStatus) {
            update();
          },
          error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
          }
        });
      }


      $(document).on('change', '.mark-complete', function(){
        if (this.checked){
          completeTask($(this).data('id'));
        }else{
          activeTask($(this).data('id'));
        }
      });*/
