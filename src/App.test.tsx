import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Todo } from "./companents/Todo";
import { TodoList } from "./companents/TodoList";
import { TaskCountIndicator } from "./companents/TaskCountIndecator";


describe("Todo items render", () => {
    test("desk label render", () => {
        render(<Todo />);
        const deskLabel = screen.getByText(/todos/i);
        expect(deskLabel).toBeInTheDocument();
      });

    test("input event", () => {
        render(<Todo />);
        const input = screen.getByPlaceholderText(/What needs to be done/i);
        expect(input).toMatchSnapshot();
        fireEvent.input(input, {
            EventTarget: {
                value: "new todo!"
            }
        });
        const newTodo = screen.queryAllByText(/new todo!/i);
        expect(newTodo).toBeInTheDocument;
    });

    test("task count indicator render", async () => {
        render(<TaskCountIndicator todos={[]} displayedTasks="All" />);
        const taskCountIndicator = await screen.findByTestId("countIndicator");
        expect(taskCountIndicator).toBeInTheDocument();
    });

    test("todo list render", async () => {
        const fnc = jest.fn();
        render(<TodoList todos={[]} onCompletedTodo={fnc} />);
        const todoList = await screen.findByTestId("todoList");
        expect(todoList).toBeInTheDocument;
    });
    
    test("onComplited render", () => {
        render(<Todo />);
        const btn = screen.getByTestId("complitedBtn");
        const complitedCounter = screen.queryAllByText(/already done/i);
        expect(complitedCounter).toBeNull;
        fireEvent.click(btn);
        expect(complitedCounter).toBeInTheDocument;
    });
});