import React from 'react';
import { TodoType } from './Todo';
import { CheckOutlined } from '@ant-design/icons';
import { Empty, Button } from 'antd';

interface TodoListProps {
    todos: TodoType[];
    onCompletedTodo: (todoId: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onCompletedTodo }) => {
    return (
        <div className="todos">
           {todos.length ? todos.map(item => (
                <div onClick={() => onCompletedTodo(item.id)} id={item.id} key={item.id} className="todo-item">
                    <div className="circle">{item.done && <CheckOutlined />}</div>
                    <div className={item.done ? "tado-text done" : "tado-text"}>{item.tadoText}</div>
                </div>
            )) : <Empty description="empty list" />}
        </div>
    )
}