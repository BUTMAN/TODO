var api = {}

api.ajax = function(url, method, form, callback) {
  var request = {
    url: url,
    type: method,
    data: form,
    success: function(response){
        var r = JSON.parse(response)
        callback(r)
    },
    error: function(err){
      var r = {
        'success': false,
        message: '网络错误'
      }
      callback(r)
    }
  }
  console.log('123456', request, '123')
  $.ajax(request)
}
api.get = function(url, response) {
    api.ajax(url, 'get', {}, response)
}
api.post = function(url, form, response) {
    api.ajax(url, 'post', form, response)
}


api.todoAdd = function(form, response) {
    var url = '/api/todo/add'
    api.post(url, form, response)
}

api.todoUpdate = function(weiboId, form, response) {
    var url = '/api/todo/update/' + weiboId
    api.post(url, form, response)
    console.log('url', url)
}

api.todoDelete = function(weiboId, response) {
    var url = '/api/todo/delete/' + weiboId
    var form = {}
    api.get(url, response)
}

api.todoComplete = function(weiboId, response) {
    var url = '/api/todo/complete/' + weiboId
    var form = {}
    api.get(url, response)
}