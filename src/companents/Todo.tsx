import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Select } from "antd"
;
import { TodoItem } from './TodoItem';

const tasks = [
    {
        tadoText: "Тестовое задание",
        done: false,
        id: uuidv4(),
    },
    {
        tadoText: "Прекрасный код",
        done: true,
        id: uuidv4(),
    },
    {
        tadoText: "Покрытие тестами",
        done: false,
        id: uuidv4(),
    }
]

export type TodoType = {
    tadoText: string,
    done: boolean,
    id: string
}

type DisplayedTasksType = "All" | "Active" | "Complited";

export const Todo = () => {

const [todos, setTodos] = useState<TodoType[]>(tasks);
const [displayedTasks, setDisplayedTasks] = useState<DisplayedTasksType>("All");

const onButtonTypeTaskKlick = (activeButton: DisplayedTasksType) => {
    setDisplayedTasks(activeButton);
}

console.log("todos", todos)
    return (
        <div className="todo-desk">
            <div className="label">todos</div>
            <Select 
                mode="multiple"
                className="todos"
                options={todos.map(item =>  {
                    return {
                        value: item.tadoText,
                        label: <TodoItem { ...item } />
                    }
                } )}
                placeholder="What needs to be done"
            />
            <div className="todo-desk-footer">
                <Button onClick={() => onButtonTypeTaskKlick("All")} type={displayedTasks === "All" ? "default" : "text"}>All</Button>
                <Button onClick={() => onButtonTypeTaskKlick("Active")} type={displayedTasks === "Active" ? "default" : "text"}>Active</Button>
                <Button onClick={() => onButtonTypeTaskKlick("Complited")} type={displayedTasks === "Complited" ? "default" : "text"}>Complited</Button>
            </div>
        </div>
    )
}