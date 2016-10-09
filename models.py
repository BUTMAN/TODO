from flask import Flask
from flask_sqlalchemy import SQLAlchemy

import time


app = Flask(__name__)
app.secret_key = 'secret key'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todos.db'
db = SQLAlchemy(app)


class Todo(db.Model):
    __tablename__ = 'todos'
    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String())
    created_time = db.Column(db.Integer, default=0)
    com = db.Column(db.String())

    def __repr__(self):
        return u'<ToDo {} {} {}>'.format(self.id, self.task, self.com)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __init__(self, form):
        format = '%m/%d %H:%M:%S'
        v = int(time.time()) + 3600 * 8
        valuegmt = time.gmtime(v)
        dt = time.strftime(format, valuegmt)
        self.task = form.get('task', '')
        self.com = form.get('com', '')
        self.created_time = dt

    def complete(self):
        if self.com == '1':
            self.com = '0'
        elif self.com == '0':
            self.com = '1'
        pass

    def valid(self):
        return len(self.task) > 0

    def json(self):
        d = dict(
            id=self.id,
            task=self.task,
            created_time=self.created_time,
        )
        return d


if __name__ == '__main__':
    db.drop_all()
    db.create_all()
    print('rebuild database')
