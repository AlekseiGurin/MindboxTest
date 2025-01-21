import React from 'react';
import { TodoType } from './Todo';
import { CheckOutlined } from '@ant-design/icons';

export const TodoItem: React.FC<TodoType> = ({ done, tadoText, id }) => {
    return (
        <div key={id} id={id} className="todo-item">
            <div className="circle">{done && <CheckOutlined />}</div>
            <div className={done ? "tado-text done" : "tado-text"}>{tadoText}</div>
        </div>
    )
}