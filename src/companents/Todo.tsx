import React, { useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Input, Form, Skeleton } from "antd"
;
import { TodoList } from './TodoList';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
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
];

export type TodoType = {
    tadoText: string,
    done: boolean,
    id: string
}

export type DisplayedTasksType = "All" | "Active" | "Complited";

export const Todo = () => {

const [form] = Form.useForm();
const [defaultTodos, setDefaultTodos] = useState<TodoType[]>();
const [displayedTasks, setDisplayedTasks] = useState<DisplayedTasksType>("All");
const [visibleTodolist, setVisibleTodoList] = useState(true);

useEffect(() => {
   setTimeout(() => {
    setDefaultTodos(tasks || []);
   }, 1000);
}, []);

const todos = useMemo(() => {
    switch (displayedTasks) {
        case "All":
            return defaultTodos;
        case "Active":
            return defaultTodos?.filter(item => !item.done);
        case "Complited": 
            return defaultTodos?.filter(item => item.done);
    };
}, [displayedTasks, defaultTodos]);

const onButtonTypeTaskKlick = (activeButton: DisplayedTasksType) => {
    setDisplayedTasks(activeButton);
    
};

const onClear = () => {
    const clearedList = defaultTodos?.filter(item => !item.done);
    console.log("clearedList", clearedList);
    setDefaultTodos(clearedList);
};

const onCompletedTodo = (todoId: string) => {
    const newList = defaultTodos?.map(item => {
        const todo = { ...item };
        if(todo.id === todoId) {
          todo.done = !todo.done
        }
        return todo;
    });
    setDefaultTodos(newList);
};

const onChangeTodos = (e: { newTodo: string }) => {
    console.log("onChangeTodos e", e);
    const newTodo = {
        tadoText: e.newTodo,
        done: false,
        id: uuidv4(),
    }
    todos && setDefaultTodos([...todos, newTodo]);
    form.resetFields();
};

    return (
        <div className="todo-desk">
            <div className="label">todos</div>
            <div className="content-container">
                <div className="input-container">
                    <Button data-testid="hiddTodoListBtn" onClick={() => setVisibleTodoList(!visibleTodolist)} type="text">{visibleTodolist ? <DownOutlined /> : <UpOutlined />}</Button>
                    <Form
                        form={form}
                        onFinish={onChangeTodos}
                    >
                        <Form.Item name="newTodo" rules={[{ required: true, message: "todo must not be an empty string" }]}>
                            <Input disabled={!todos} placeholder="What needs to be done?" />
                        </Form.Item>
                    </Form>
                </div>
                { todos ? <TodoList todos={todos} onCompletedTodo={onCompletedTodo} visibleTodolist={visibleTodolist} /> : <Skeleton />}  
                <div className="todo-desk-footer">
                    <TaskCountIndicator displayedTasks={displayedTasks} todos={todos} />
                    <div className="filter-button-block">
                        <Button disabled={!todos} key="All" onClick={() => onButtonTypeTaskKlick("All")} type={displayedTasks === "All" ? "default" : "text"}>All</Button>
                        <Button disabled={!todos} key="Active" onClick={() => onButtonTypeTaskKlick("Active")} type={displayedTasks === "Active" ? "default" : "text"}>Active</Button>
                        <Button data-testid="complitedBtn" disabled={!todos} key="Complited" onClick={() => onButtonTypeTaskKlick("Complited")} type={displayedTasks === "Complited" ? "default" : "text"}>Complited</Button>
                    </div>
                    <Button disabled={!todos} className="clear-button"onClick={() => onClear()} type="text">Clear complited</Button>
                </div>
            </div>
        </div>
    )
}