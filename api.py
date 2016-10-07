from flask import request
from flask import Blueprint

import json

from models import Todo


main = Blueprint('api', __name__)


@main.route('/todo/add', methods=['POST'])
def add():
    form = request.form
    print('form', form)
    t = Todo(form)
    r = {
        'data': []
    }
    print('1333', t)
    if t.valid():
        print('123')
        t.save()
        r['success'] = True
        r['data'] = t.json()
    else:
        print('12333')
        r['success'] = False
        r['message'] = '错了'
    return json.dumps(r, ensure_ascii=False)


@main.route('/todo/delete/<int:todo_id>', methods=['GET'])
def delete(todo_id):
    w = Todo.query.get(todo_id)
    w.delete()
    r = {
        'success': True,
        'data': w.json(),
    }
    return json.dumps(r, ensure_ascii=False)


@main.route('/todo/update/<int:todo_id>', methods=['POST'])
def update(todo_id):
    form = request.form
    w = Todo.query.get(todo_id)
    t = Todo(form)
    r = {
        'data': []
    }
    if t.valid():
        w.task = t.task
        w.save()
        r['success'] = True
        r['data'] = t.json()
        print('3344')
    else:
        r['success'] = False
        message = t.error_message()
        r['message'] = message
        print('4455')
    return json.dumps(r, ensure_ascii=False)


@main.route('/todo/complete/<int:todo_id>', methods=['GET'])
def complete(todo_id):
    w = Todo.query.get(todo_id)
    w.complete()
    print('w.com', w.com, '22')
    w.save()
    r = {
        'success': True,
        'data': w.json(),
    }
    return json.dumps(r, ensure_ascii=False)
