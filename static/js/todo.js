var log = function() {
  console.log(arguments)
}

var todoTemplate = function(todo) {
    var w = todo
    var t = `
        <div class="todo-cell">
            <div>
                <!--<div>Todo-id: ${ w.id }</div>-->
                <div class="pure-u-1-3 fl">${ w.created_time }</div>
                <div class="complete todo-content pure-u-1-3">${ w.task }</div>
                <div class="pure-u-1-3 fr">
                    <button class="todo-delete de pure-button pa" data-id="${ w.id }">Delete</button>
                    <button class="todo-edit ed pure-button pa" data-id="${ w.id }">Edit</button>
                    <button class="todo-complete pure-button pa" data-id="${ w.id }">Complete</button>
                </div>
            </div>
            <div class="xqgl hide pure-form">
                <input class="profile-uuru" id="id-edit-todo" type="text" placeholder="edit todo" value="${ w.task }" style="padding: 3px 6px;">
                <!--<br>-->
                <button class="todo-update pure-button pa" data-id="${ w.id }">更改</button>
            </div>
        </div>
    `
    return t
}

var bindEventTodoAdd = function() {
    $('#id-button-todo-add').on('click', function(){
      var todo = $('#id-input-todo').val()
      var com = $('#id-input-todo-com').val()
      var form = {
        task: todo,
        com: com,
      }
      console.log('todo-form', todo, '11', form, '22')

      var response = function(r) {
          console.log('成功', arguments)
          log(r)
          if(r.success) {
              var w = r.data
              var a = $('.todo-container')
              console.log('456', w, '11', a, '22')
              $('.todo-container').append(todoTemplate(w))
              $('#id-input-todo').val('')
              console.log('123', a)
              alertify.success('添加成功');
          } else {
              alertify.error(r.message);
//              alert(r.message)
          }
      }
      api.todoAdd(form, response)
    })
}

var bindEventTodoDelete = function() {
    $('body').on('click', '.todo-delete', function(){
      var todoId = $(this).data('id')
      var todoCell = $(this).closest('.todo-cell')

      var response = function(r) {
          if(r.success) {
              console.log('成功123', arguments)
              $(todoCell).slideUp()
          } else {
              console.log('错误', arguments)
              alertify.error('删除失败');
          }
      }
      api.todoDelete(todoId, response)
    })
}

var bindEventTodoEdit = function() {
    $('body').on('click', '.todo-edit', function(){
        var button = $(this)
        var todoId = $(this).data('id')
        var todoCell = button.closest('.todo-cell')
        var uurukd = todoCell.find('.xqgl')
        uurukd.slideToggle()

    })
}

var bindEventTodoUpdate = function() {
    $('body').on('click', '.todo-update', function(){
        var button = $(this)
        var todoId = $(this).data('id')
        var todoCell = button.closest('.todo-cell')
        var todoNew = todoCell.find('#id-edit-todo').val()
        var todoContent = todoCell.find('.todo-content').text( todoNew )
        var xqgl = todoCell.find('.xqgl')
        var form = {
            task: todoNew,
        }
        console.log('form-new-todo', form)
        var response = function(r) {
            if(r.success) {
                console.log('456')
                var w = r.data
                var a = $('.todo-container')
                console.log('123', a)
                alertify.success('修改成功');
//                alert("修改成功")
                $(xqgl).slideUp()
            } else {
                // 失败，弹出提示
                alertify.error(r.message);
//                alert(r.message)
            }
        }

        api.todoUpdate(todoId, form, response)
    })
}

var bindEventTodoComplete = function() {
    $('body').on('click', '.todo-complete', function(){
        var button = $(this)
        var todoId = $(this).data('id')
        var todoCell = button.closest('.todo-cell')
        var Mask = todoCell.find('.complete')
        var Edit = todoCell.find('.ed')
        var Delete = todoCell.find('.de')
        if(Mask.hasClass('line')){
            Mask.removeClass('line')
            Edit.removeClass('pure-button-disabled')
            Delete.removeClass('pure-button-disabled')
            Edit.addClass('todo-edit')
            Delete.addClass('todo-delete')
            button.text( 'Complete' )
        }
        else{
            Mask.addClass('line')
            Edit.addClass('pure-button-disabled')
            Delete.addClass('pure-button-disabled')
            Edit.removeClass('todo-edit')
            Delete.removeClass('todo-delete')
            button.text( 'Refresh ' )
        }

        var response = function(r) {
            if(r.success) {
                console.log('成功123', arguments)
//                alert("11成功")
            } else {
                console.log('错误', arguments)
                alert("22失败")
            }
        }

          api.todoComplete(todoId, response)
    })
}


var bindEvents = function() {
    bindEventTodoAdd()
    bindEventTodoDelete()
    bindEventTodoEdit()
    bindEventTodoUpdate()
    bindEventTodoComplete()
}

$(document).ready(function(){
    bindEvents()
})
