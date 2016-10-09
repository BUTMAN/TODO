from flask import render_template
from flask import Blueprint

from models import Todo


main = Blueprint('todo', __name__)


@main.route('/')
def index():
    todo_list = Todo.query.all()
    print('todo_list', todo_list)
    return render_template('todo_index.html', todos=todo_list)

#
# @main.route('/add', methods=['POST'])
# def add():
#     form = request.form
#     t = Todo(form)
#     print('123', form, t.task)
#     if t.valid():
#         t.save()
#         print('234', t)
#     else:
#         abort(400)
#     return redirect(url_for('.index'))
#
#
# @main.route('/delete/<int:todo_id>')
# def delete(todo_id):
#     t = Todo.query.get(todo_id)
#     t.delete()
#     return redirect(url_for('.index'))
#
#
# @main.route('/edit/<int:todo_id>')
# def edit(todo_id):
#     t = Todo.query.get(todo_id)
#     return render_template('todo_edit.html', todo=t, todo_id=todo_id)
#
#
# @main.route('/update/<int:todo_id>', methods=['POST'])
# def update(todo_id):
#     form = request.form
#     t = Todo.query.get(todo_id)
#     n = Todo(form)
#     if n.valid():
#         t.task = n.task
#         t.save()
#     else:
#         abort(400)
#     return redirect(url_for('.index'))
