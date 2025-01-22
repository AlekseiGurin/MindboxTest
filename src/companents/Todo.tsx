import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Input, Form } from "antd"
;
import { TodoItem } from './TodoItem';
import { DownOutlined } from '@ant-design/icons';
import { TaskCountIndicator } from './TaskCountIndecator';

let tasks = [
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

export type DisplayedTasksType = "All" | "Active" | "Complited";

export const Todo = () => {
const [form] = Form.useForm();
const [todos, setTodos] = useState<TodoType[]>(tasks);
const [displayedTasks, setDisplayedTasks] = useState<DisplayedTasksType>("All");

const onButtonTypeTaskKlick = (activeButton: DisplayedTasksType) => {
    setDisplayedTasks(activeButton);
    switch (displayedTasks) {
        case "All":
            setTodos(tasks);
            break;
        case "Active":
            const itemsLeft = tasks.filter(item => !item.done);
            setTodos(itemsLeft);
            break;
        case "Complited": 
            const alreadyDone = tasks.filter(item => item.done);
            setTodos(alreadyDone);
            break;
    };
};

const onClear = () => {
    const clearedList = tasks.filter(item => !item.done);
    console.log("clearedList", clearedList);
    setTodos(clearedList);
};

const onChangeTodos = (e: { newTodo: string }) => {
    console.log("onChangeTodos e", e);
    const newTodo = {
        tadoText: e.newTodo,
        done: false,
        id: uuidv4(),
    }
    setTodos([...todos, newTodo]);
    form.resetFields();
};

console.log("todos", todos)
console.log("tasks", tasks)
    return (
        <div className="todo-desk">
            <div className="label">todos</div>
            <div className="input-container">
                <Button type="text"><DownOutlined /></Button>
                <Form
                    form={form}
                    onFinish={onChangeTodos}
                >
                    <Form.Item name="newTodo" rules={[{ required: true, message: "todo must not be an empty string" }]}>
                        <Input placeholder="What needs to be done?" />
                    </Form.Item>
                </Form>
            </div>
            <div className="todos">
                {todos.map(item =>  <div className="todo-item" key={item.id}>{<TodoItem { ...item } />}</div>)}
            </div>
            <div className="todo-desk-footer">
                <TaskCountIndicator displayedTasks={displayedTasks} tasks={todos} />
                <div className="filter-button-block">
                    <Button onClick={() => onButtonTypeTaskKlick("All")} type={displayedTasks === "All" ? "default" : "text"}>All</Button>
                    <Button onClick={() => onButtonTypeTaskKlick("Active")} type={displayedTasks === "Active" ? "default" : "text"}>Active</Button>
                    <Button onClick={() => onButtonTypeTaskKlick("Complited")} type={displayedTasks === "Complited" ? "default" : "text"}>Complited</Button>
                </div>
                <Button onClick={() => onClear()} type="text">Clear complited</Button>
            </div>
        </div>
    )
}